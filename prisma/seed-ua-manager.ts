import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SOURCE_ROLE = "user-acquisition-specialist";
const TARGET_ROLE = "ua-manager";

// Clones all Chapter/Lesson/Quiz/QuizQuestion, Person, and Resource rows
// from SOURCE_ROLE to TARGET_ROLE. Additive-only: never deletes or modifies
// existing data, and skips anything that already exists so it is safe to re-run.

function deriveNewSlug(sourceSlug: string): string {
  const stripped = sourceSlug.startsWith("uas-") ? sourceSlug.slice(4) : sourceSlug;
  return `uam-${stripped}`;
}

async function cloneChapters() {
  const chapters = await prisma.chapter.findMany({
    where: { role: SOURCE_ROLE },
    orderBy: { order: "asc" },
    include: {
      lessons: { orderBy: { order: "asc" } },
      quiz: { include: { questions: { orderBy: { order: "asc" } } } },
    },
  });

  for (const chapter of chapters) {
    const newSlug = deriveNewSlug(chapter.slug);
    const existing = await prisma.chapter.findUnique({ where: { slug: newSlug } });
    if (existing) {
      console.log(`  Skipping chapter "${newSlug}" — already exists.`);
      continue;
    }

    const newChapter = await prisma.chapter.create({
      data: {
        order: chapter.order,
        slug: newSlug,
        title: chapter.title,
        description: chapter.description,
        role: TARGET_ROLE,
        lessons: {
          create: chapter.lessons.map((l) => ({
            order: l.order,
            slug: l.slug,
            title: l.title,
            content: l.content,
          })),
        },
      },
    });

    if (chapter.quiz) {
      await prisma.quiz.create({
        data: {
          chapterId: newChapter.id,
          title: chapter.quiz.title,
          questions: {
            create: chapter.quiz.questions.map((q) => ({
              order: q.order,
              question: q.question,
              options: q.options,
              correctAnswer: q.correctAnswer,
            })),
          },
        },
      });
    }

    console.log(`  Cloned chapter "${newSlug}" (${chapter.lessons.length} lessons${chapter.quiz ? ", quiz" : ""}).`);
  }
}

async function clonePeople() {
  const existing = await prisma.person.count({ where: { role: TARGET_ROLE } });
  if (existing > 0) {
    console.log(`  Skipping people — ${TARGET_ROLE} already has ${existing}.`);
    return;
  }
  const people = await prisma.person.findMany({ where: { role: SOURCE_ROLE } });
  for (const p of people) {
    await prisma.person.create({
      data: {
        name: p.name,
        description: p.description,
        url: p.url,
        platform: p.platform,
        category: p.category,
        order: p.order,
        role: TARGET_ROLE,
      },
    });
  }
  console.log(`  Cloned ${people.length} Person rows.`);
}

async function cloneResources() {
  const sourceResources = await prisma.resource.findMany({ where: { role: SOURCE_ROLE } });
  for (const r of sourceResources) {
    const existing = await prisma.resource.findFirst({
      where: { role: TARGET_ROLE, youtubeUrl: r.youtubeUrl },
    });
    if (existing) {
      console.log(`  Skipping video "${r.title}" — already exists.`);
      continue;
    }
    await prisma.resource.create({
      data: {
        title: r.title,
        description: r.description,
        youtubeUrl: r.youtubeUrl,
        category: r.category,
        order: r.order,
        role: TARGET_ROLE,
      },
    });
    console.log(`  Cloned video "${r.title}".`);
  }
}

async function main() {
  console.log(`Cloning role "${SOURCE_ROLE}" → "${TARGET_ROLE}" (additive-only)...`);
  await cloneChapters();
  await clonePeople();
  await cloneResources();
  console.log("Done.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

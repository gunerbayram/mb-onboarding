import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const SOURCE_ROLE = "creative-strategist";
const TARGET_ROLE = "marketing-content-creator";

// Copies the Creative Strategist's Resources tab (Videos + People & Channels)
// to Marketing Content Creator. Additive-only: skips a table entirely if the
// target role already has any rows in it, so it is safe to re-run.

async function copyResources() {
  const existing = await prisma.resource.count({ where: { role: TARGET_ROLE } });
  if (existing > 0) {
    console.log(`  Skipping videos — ${TARGET_ROLE} already has ${existing}.`);
    return;
  }
  const source = await prisma.resource.findMany({ where: { role: SOURCE_ROLE } });
  for (const r of source) {
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
  }
  console.log(`  Copied ${source.length} videos.`);
}

async function copyPeople() {
  const existing = await prisma.person.count({ where: { role: TARGET_ROLE } });
  if (existing > 0) {
    console.log(`  Skipping people — ${TARGET_ROLE} already has ${existing}.`);
    return;
  }
  const source = await prisma.person.findMany({ where: { role: SOURCE_ROLE } });
  for (const p of source) {
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
  console.log(`  Copied ${source.length} people/channels.`);
}

async function main() {
  console.log(`Copying Resources tab from "${SOURCE_ROLE}" to "${TARGET_ROLE}" (additive-only)...`);
  await copyResources();
  await copyPeople();
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

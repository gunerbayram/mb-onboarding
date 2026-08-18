import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Adds a "1-on-1 Meeting with the Founder" chapter as the final chapter for
// the given roles, mirroring the Creative Strategist chapter's structure but
// with prep content tailored to what each role should actually review.
// Additive-only for new chapters; for chapters that already exist (from an
// earlier run), it corrects the lesson content in place rather than skipping,
// since this content was only just introduced and carries no real progress.

const DESCRIPTION =
  "The final step of your onboarding — a direct session with the Founder to align on the company vision, product values, and your role's strategy.";

const LESSON_TITLE = "Preparing for the 1-on-1 Meeting";
const LESSON_SLUG = "preparing-for-the-founder-meeting";

const TARGETS: Array<{ role: string; slug: string; content: string }> = [
  {
    role: "user-acquisition-specialist",
    slug: "uas-1on1-meeting-with-founder",
    content: `## 1-on-1 Meeting with the Founder

The final step of your onboarding is a 1-on-1 meeting with the Founder. This session is designed to give you deep insights into the company's growth priorities, the core value of our products, and the nuances of our acquisition strategy directly from the source.

To make the most of this meeting, you are expected to come prepared. This is not just a listening session; it is an interactive discussion. Before the meeting, you must:

**Review Current Campaign Performance:** Look at our active campaigns across Meta and TikTok. Identify which channels, geos, and creatives are currently driving the strongest — and weakest — results.

**Explore the Products:** Download and use our subscription-based apps. Understand the onboarding flow, the paywall, and the core features that drive trial starts and paid conversion.

**Prepare Your Questions:** Write down specific questions regarding acquisition priorities, budget allocation, attribution, or the metrics that matter most right now. If something in our current performance data doesn't make sense to you, or if you have a hypothesis you'd like to validate, this is the right moment to ask.

The goal of this meeting is to leave with full clarity on what the company stands for, who we are acquiring, and which growth decisions will move the needle.`,
  },
  {
    role: "ua-manager",
    slug: "uam-1on1-meeting-with-founder",
    content: `## 1-on-1 Meeting with the Founder

The final step of your onboarding is a 1-on-1 meeting with the Founder. This session is designed to give you deep insights into the company's growth strategy, the core value of our products, and the reasoning behind current budget and channel priorities directly from the source.

To make the most of this meeting, you are expected to come prepared. This is not just a listening session; it is an interactive discussion. Before the meeting, you must:

**Review the Growth Portfolio:** Study current spend allocation across channels, LTV:CAC by cohort, and the biggest funnel bottlenecks. Identify where you would make a different call, and why.

**Prepare Your Questions:** Write down specific questions regarding growth priorities for the next quarter, how budget trade-offs are made, and which markets or channels the company is betting on next. If something about current performance doesn't make sense to you, or if you have a hypothesis about where growth is being left on the table, this is the right moment to ask.

The goal of this meeting is to leave with full clarity on what the company stands for, how growth decisions get made, and where you can have the biggest impact.`,
  },
  {
    role: "marketing-content-creator",
    slug: "mcc-1on1-meeting-with-founder",
    content: `## 1-on-1 Meeting with the Founder

The final step of your onboarding is a 1-on-1 meeting with the Founder. This session is designed to give you deep insights into the company's vision, the core value of our products, and the nuances of our creative strategy directly from the source.

To make the most of this meeting, you are expected to come prepared. This is not just a listening session; it is an interactive discussion. Before the meeting, you must:

**Review Existing Creatives:** Analyze our current top-performing and underperforming assets. Identify the customer tensions, hooks, and formats we are currently using, and where the portfolio may be missing diversity.

**Explore the Products:** Download and use our subscription-based apps. Understand the user flow, the paywalls, and the core features so your creative work stays product-truthful.

**Prepare Your Questions:** Write down specific questions regarding the products, the target customer, or the creative strategy. If something in our current creatives doesn't make sense to you, or if you have a concept you'd like to validate, this is the right moment to ask.

The goal of this meeting is to leave with full clarity on what the company stands for, who we are talking to, and what kind of creative work will move the needle.`,
  },
];

async function main() {
  console.log('Seeding "1-on-1 Meeting with the Founder" chapters with role-specific content...');

  for (const target of TARGETS) {
    const existingChapter = await prisma.chapter.findUnique({
      where: { slug: target.slug },
      include: { lessons: true },
    });

    if (existingChapter) {
      const lesson = existingChapter.lessons[0];
      if (lesson) {
        await prisma.lesson.update({
          where: { id: lesson.id },
          data: { title: LESSON_TITLE, content: target.content },
        });
        console.log(`  Updated lesson content for "${target.role}" (${target.slug}).`);
      }
      continue;
    }

    const lastChapter = await prisma.chapter.findFirst({
      where: { role: target.role },
      orderBy: { order: "desc" },
    });
    const nextOrder = (lastChapter?.order ?? 0) + 1;

    await prisma.chapter.create({
      data: {
        order: nextOrder,
        slug: target.slug,
        title: "1-on-1 Meeting with the Founder",
        description: DESCRIPTION,
        role: target.role,
        lessons: {
          create: [
            {
              order: 1,
              slug: LESSON_SLUG,
              title: LESSON_TITLE,
              content: target.content,
            },
          ],
        },
      },
    });

    console.log(`  Created "${target.slug}" for "${target.role}" at order ${nextOrder}.`);
  }

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

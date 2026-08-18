import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Adds quizzes to the already-seeded "marketing-content-creator" chapters,
// from the uploaded "Jr. Marketing Content Creator — Quizzes" PDF.
// Additive-only: skips any chapter that already has a quiz, so it is safe to re-run.
const quizzes: Array<{
  chapterSlug: string;
  title: string;
  questions: Array<{ order: number; question: string; options: string[]; correctAnswer: number }>;
}> = [
  {
    "chapterSlug": "mcc-the-performance-creative-mindset",
    "title": "Chapter 1 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "A creator says: \"This video should perform because it took three days to shoot and edit.\" What is the strongest response under the curriculum's performance-creative mindset?",
        "options": [
          "High-production assets should always receive more budget than simple assets.",
          "Production effort is relevant only if it improves customer relevance, message clarity, credibility, or the quality of learning.",
          "Any asset that required more than one day should be treated as an exploration asset.",
          "Expensive production proves that the brand takes the product seriously."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "Which handoff is most useful to the UA team?",
        "options": [
          "\"New video attached. Please launch it today.\"",
          "\"This is our best-looking video this month.\"",
          "\"Exploration concept: users who struggle with consistency. We are testing a direct-to-camera hook with product-demo proof; the learning question is whether simplicity framing earns qualified attention.\"",
          "\"This version has a different font and higher production quality.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 3,
        "question": "An ad receives high attention but users appear confused about what the product does. Which creative-quality dimension is most clearly weak?",
        "options": [
          "Visual attention",
          "Message clarity",
          "Production effort",
          "Delivery volume"
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "A winning creative is built around the frustration of repeatedly failing to maintain a routine. Which is the best intelligent iteration?",
        "options": [
          "Change the product name, hook, problem, format, proof, talent, CTA, and offer all at once.",
          "Keep the routine-frustration concept, but test a new first-frame hook and a different visual setting to learn which entry point earns more relevant attention.",
          "Re-export the identical asset with a slightly brighter colour grade.",
          "Produce a more cinematic version because the original looks inexpensive."
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "Which statement best reflects customer-first creative thinking?",
        "options": [
          "\"We should choose the trendiest format and then find a product message that fits it.\"",
          "\"We should start with what looks original and use customer insight only if the creative feels weak.\"",
          "\"We should identify the customer tension or desired outcome first, then choose an execution that makes the message easier to understand.\"",
          "\"We should avoid customer research because strong creators can rely on instinct.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 6,
        "question": "Before handing an asset to UA, which question is the least useful?",
        "options": [
          "\"What one message should the viewer remember?\"",
          "\"What customer problem makes this message relevant?\"",
          "\"What would we learn if this asset receives a strong or weak response?\"",
          "\"Can we make this look more expensive than the competitor's ad?\""
        ],
        "correctAnswer": 3
      }
    ]
  },
  {
    "chapterSlug": "mcc-understanding-the-customer-and-product-truth",
    "title": "Chapter 2 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "Which option correctly distinguishes a feature, a benefit, and a customer outcome?",
        "options": [
          "Feature: \"Feel confident.\" Benefit: \"Daily guided sessions.\" Outcome: \"The app includes reminders.\"",
          "Feature: \"The app includes guided daily sessions.\" Benefit: \"It makes the next step easier to understand.\" Outcome: \"The user feels more consistent in building a routine.\"",
          "Feature: \"Stop failing at routines.\" Benefit: \"The app changes your life.\" Outcome: \"The product has a clear interface.\"",
          "Feature, benefit, and outcome are interchangeable when the script is short."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "A user review says: \"I kept downloading plans but never knew what to do each day, so I gave up.\" Which is the strongest creative insight?",
        "options": [
          "\"People like downloading plans.\"",
          "\"The product should promise that everyone will succeed.\"",
          "\"Unclear next steps may create a consistency barrier; a message about simple daily guidance could be worth testing.\"",
          "\"The user is not part of the target audience because they gave up.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 3,
        "question": "Which statement is an inference, not an observation or a hypothesis?",
        "options": [
          "\"Seven recent reviews mention that users stopped after the first week.\"",
          "\"Early drop-off may be connected to users finding it difficult to maintain a routine.\"",
          "\"A three-step onboarding creative will increase paid conversion by 20%.\"",
          "\"Two support tickets asked where to find the daily plan.\""
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "Which creative response best addresses the objection \"I do not have time for another complicated routine\" while remaining product-truthful?",
        "options": [
          "\"Use this app once and your routine will be permanently fixed.\"",
          "\"You are too busy because you are doing routines the wrong way.\"",
          "\"Show the actual first daily step, explain the realistic time commitment, and show how guided structure reduces planning friction.\"",
          "\"Avoid mentioning time because users may think the product is difficult.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 5,
        "question": "A creator has one powerful interview quote but no other evidence. What is the most appropriate use of it?",
        "options": [
          "Treat it as proof that all users have the same problem.",
          "Use it as a possible lead, then look for supporting evidence in reviews, surveys, support data, or product behaviour.",
          "Ignore it because one customer can never provide useful insight.",
          "Turn it into a universal claim without mentioning the product."
        ],
        "correctAnswer": 1
      },
      {
        "order": 6,
        "question": "Which is the best Jobs-to-be-Done statement?",
        "options": [
          "\"People aged 25-44 need a better app.\"",
          "\"When I have tried to build a routine several times and stopped, I want a simple daily next step so I can feel consistent rather than overwhelmed.\"",
          "\"The product has notifications and lessons.\"",
          "\"Everyone wants to improve.\""
        ],
        "correctAnswer": 1
      }
    ]
  },
  {
    "chapterSlug": "mcc-from-insight-to-message-system",
    "title": "Chapter 3 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "In the System of Ideas, what comes directly after identifying the customer gap or tension (\"For What\")?",
        "options": [
          "The final export setting",
          "The audience context (\"For Who\")",
          "The media budget",
          "The campaign optimisation event"
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "Which option correctly identifies a hook rather than an angle, concept, or execution?",
        "options": [
          "\"Small daily structure beats relying on motivation.\"",
          "\"The 30-second daily reset challenge.\"",
          "\"If you always quit after day three, your routine may be the problem.\"",
          "\"A creator speaks directly to camera over a split-screen app demonstration.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 3,
        "question": "Why is it risky to change every part of an ad at once?",
        "options": [
          "It makes the asset too expensive to export.",
          "The team may get a result but cannot tell which change created the response or what learning should be reused.",
          "Platforms reject ads with more than one changed variable.",
          "It always lowers CTR."
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "Which message architecture sequence best supports a coherent performance creative?",
        "options": [
          "CTA -> unrelated visual -> product name -> tension",
          "Tension -> credible promise or reframe -> product truth -> proof -> CTA",
          "Product feature list -> long disclaimer -> no CTA",
          "Trendy sound -> celebrity reference -> generic urgency"
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "A team wants three ads for different audience contexts. Which approach shows real audience-specific relevance?",
        "options": [
          "Use the exact same ad and replace the age range in the file name.",
          "Keep product truth constant but change the customer situation, entry tension, proof, language, and visual world when the motivation or barrier differs.",
          "Change only the logo colour for each audience.",
          "Create unrelated promises for each audience, even if the product cannot fulfil them."
        ],
        "correctAnswer": 1
      },
      {
        "order": 6,
        "question": "A creator has a new message but uses the same familiar creator, setting, story flow, and visual format as BAU. What is the most accurate classification?",
        "options": [
          "Automatically a completely new concept",
          "A possible message variation, but not necessarily sufficient visual or conceptual diversity to count as new discovery",
          "A guaranteed winner because new copy is always new creative",
          "A production error that should never be launched"
        ],
        "correctAnswer": 1
      }
    ]
  },
  {
    "chapterSlug": "mcc-creative-research-competition-and-market-context",
    "title": "Chapter 4 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "What is the primary purpose of competitor creative research?",
        "options": [
          "Find the highest-performing competitor ad and reproduce it as closely as possible.",
          "Build a library of category patterns, customer tensions, proof mechanisms, visual conventions, and potential message gaps.",
          "Avoid producing any creative until every competitor has been analysed.",
          "Prove that the company's existing creative is better than the competition."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "A competitor's ad uses a \"30-day challenge\" and earns strong engagement. What is the best next question for a creator?",
        "options": [
          "\"Which exact font and transition should we copy?\"",
          "\"Can we use the same headline with our logo?\"",
          "\"What customer mechanism may make a defined time frame compelling, and can our product truth support a distinct version of that mechanism?\"",
          "\"Can we claim that our product delivers results in fewer than 30 days?\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 3,
        "question": "Which item is least useful in a competitor creative library?",
        "options": [
          "Customer problem or tension being addressed",
          "Proof mechanism used in the asset",
          "Whether the creator personally likes the competitor brand's logo",
          "Visual execution and format"
        ],
        "correctAnswer": 2
      },
      {
        "order": 4,
        "question": "Which statement best separates a pattern from a copy?",
        "options": [
          "\"A creator talking directly to camera is a copyable mechanism.\"",
          "\"A challenge frame can be a reusable mechanism; recreating another brand's exact script, visual identity, and creator is copying.\"",
          "\"All competitor ads should be copied because users already understand the format.\"",
          "\"Patterns are only useful when they include the competitor's exact offer.\""
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "Which brief element turns research into a usable creative decision?",
        "options": [
          "A folder containing every screenshot collected during research",
          "A list of every competitor in the category",
          "A stated customer tension, category observation, creative hypothesis, visual direction, and learning plan",
          "A statement that the team should \"make something different\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 6,
        "question": "A team observes that most competitors use transformation-style messages, but customer reviews repeatedly ask for a simpler first step. Which is the strongest creative hypothesis?",
        "options": [
          "\"We should use a more dramatic transformation claim than competitors.\"",
          "\"A product-truthful creative that makes the first step feel simpler may fill an under-served category need.\"",
          "\"We should ignore reviews because competitor ads are more important.\"",
          "\"We should produce the same transformation creative with a new actor.\""
        ],
        "correctAnswer": 1
      }
    ]
  },
  {
    "chapterSlug": "mcc-creative-diversity-discovery-and-portfolio-thinking",
    "title": "Chapter 5 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "What is the main purpose of the 70/20/10 creative portfolio framework?",
        "options": [
          "Require exactly ten ads in every campaign.",
          "Protect a deliberate balance between improving proven directions, exploring promising new concepts, and testing a small number of unconventional ideas.",
          "Allocate 70% of production time to static ads, 20% to video, and 10% to UGC.",
          "Decide which team member is responsible for each creative type."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "Which asset is most likely to count as a genuinely new concept?",
        "options": [
          "A BAU video with the same message and visual style but a different subtitle colour.",
          "The same hook and actor, with a new final CTA.",
          "A different customer tension, a new proof mechanism, and a visually distinct storytelling format.",
          "The same static ad exported in a different file size."
        ],
        "correctAnswer": 2
      },
      {
        "order": 3,
        "question": "A five-asset exploration batch contains one concept with five nearly identical hook variations. What is the main problem?",
        "options": [
          "The batch contains too much visual and conceptual diversity.",
          "The batch may be useful for narrow optimisation, but it is weak as an exploration batch because it does not offer enough distinct concepts or executions.",
          "The batch cannot be launched on Meta.",
          "Hooks should never be varied."
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "Why should a creator sometimes produce both static and video executions of a concept?",
        "options": [
          "Platforms require every idea to have every format.",
          "Static and video can make the same message easier to understand in different ways and create additional delivery/attention opportunities.",
          "Video is always superior, but static assets are needed only for compliance.",
          "Static and video should never share the same message."
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "Which field is most important in a creative batch handoff when the asset is an exploration concept?",
        "options": [
          "The creator's favourite music choice",
          "The concept label, customer problem, variable or execution, and expected learning",
          "The number of hours used for editing",
          "A statement that the asset is \"high quality\""
        ],
        "correctAnswer": 1
      },
      {
        "order": 6,
        "question": "A creative team has only produced iterations of last month's winner for several weeks. What portfolio risk is most likely?",
        "options": [
          "The team may lose the ability to discover new customer segments, messages, or visual directions as the existing winner fatigues.",
          "The team will have too many new concepts to evaluate.",
          "The platform will automatically reject all iterations.",
          "The product will stop needing creative."
        ],
        "correctAnswer": 0
      }
    ]
  },
  {
    "chapterSlug": "mcc-intelligent-iteration-and-creative-learning",
    "title": "Chapter 6 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "A creative performed well. What is the best first step before producing variations?",
        "options": [
          "Assume the most visible visual element caused the result.",
          "Deconstruct the asset into customer tension, message, hook, proof, visual world, product clarity, and CTA; then form competing explanations.",
          "Produce ten identical copies immediately.",
          "Move the entire next month's budget to the asset."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "Which is a high-leverage iteration variable?",
        "options": [
          "A one-pixel spacing adjustment in the caption",
          "Changing the hook and first visual while preserving the core customer tension",
          "Renaming the export file",
          "Removing the product from the creative"
        ],
        "correctAnswer": 1
      },
      {
        "order": 3,
        "question": "What is the purpose of an iteration tree?",
        "options": [
          "To make a creative brief look more complex.",
          "To document the root concept, what is known, what remains constant, the branch variable, the hypothesis, and the decision rule.",
          "To guarantee that every variation will outperform the original.",
          "To replace performance feedback from UA."
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "An exploration ad has strong attention and delivery but weak downstream conversion. What is the strongest conclusion?",
        "options": [
          "The concept is proven to be profitable.",
          "The hook should be copied into every future ad without changes.",
          "The asset has shown potential, but the team must investigate expectation, product clarity, proof, and destination continuity before deciding what to test next.",
          "The creative must be immediately retired because it did not beat BAU on the first run."
        ],
        "correctAnswer": 2
      },
      {
        "order": 5,
        "question": "Why should a new concept not be retired solely because one individual asset underperformed in its first launch?",
        "options": [
          "Every new concept will eventually become a winner if it runs long enough.",
          "One asset may have weak execution, hook, proof, or launch context; the relevant unit of learning can be the concept across multiple executions and retests.",
          "Retesting removes the need for performance measurement.",
          "Historical winners should never be used as reference points."
        ],
        "correctAnswer": 1
      },
      {
        "order": 6,
        "question": "Which response to a fatigued winner is most intelligent?",
        "options": [
          "Re-export the same asset and hope the result returns.",
          "Preserve the core customer tension, then create a documented set of hook, proof, and visual-execution branches while also protecting some new-concept exploration.",
          "Stop all creative production until the winner recovers.",
          "Change every element in every next asset so the team has maximum variety."
        ],
        "correctAnswer": 1
      }
    ]
  },
  {
    "chapterSlug": "mcc-scripts-visual-storytelling-and-production",
    "title": "Chapter 7 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "What is the best description of a performance-creative script?",
        "options": [
          "A list of dialogue only; visual choices are made during editing.",
          "A decision document that plans attention, customer tension, product truth, proof, visual beats, and CTA.",
          "A document used only when the creator is filming with professional equipment.",
          "A way to make every creative sound the same."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "Which hook is most likely to create a healthy expectation for a product that offers simple daily guidance?",
        "options": [
          "\"This one trick will permanently fix your life today.\"",
          "\"If you always stop after a few days, the problem may be that you do not have a simple next step.\"",
          "\"Watch this because everyone is doing it.\"",
          "\"We know exactly what is wrong with your routine.\""
        ],
        "correctAnswer": 1
      },
      {
        "order": 3,
        "question": "A script claims that the product is \"the easiest solution\" but provides no demonstration, explanation, or credible support. Which component is most clearly missing?",
        "options": [
          "Proof",
          "Export settings",
          "Audience targeting",
          "Batch naming"
        ],
        "correctAnswer": 0
      },
      {
        "order": 4,
        "question": "What is the best reason to create both a static and creator-video version of the same concept?",
        "options": [
          "The team must always create two formats for legal reasons.",
          "Different formats can make the same message and proof easier to understand in different ways, creating meaningful creative variation.",
          "Static formats always have lower production quality than video.",
          "Creator videos should never include product information."
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "Before investing in a high-production shoot for an uncertain Go Wild concept, what should the creator ask?",
        "options": [
          "\"Can we make this more expensive than the last winner?\"",
          "\"What learning value does this added effort create, and could a simpler prototype test the core hypothesis first?\"",
          "\"Will the platform automatically favour a cinematic asset?\"",
          "\"Can we remove product truth so the video feels more artistic?\""
        ],
        "correctAnswer": 1
      },
      {
        "order": 6,
        "question": "Which quality-assurance action is required before handing an asset to UA?",
        "options": [
          "Confirm that the creator's preferred music is included.",
          "Confirm product depiction, claims, permissions, readable text, correct export, and clear version naming.",
          "Remove all product references to make the ad feel more native.",
          "Change the hook after the asset has already been handed off without updating the documentation."
        ],
        "correctAnswer": 1
      }
    ]
  },
  {
    "chapterSlug": "mcc-working-with-ua-launch-and-feedback",
    "title": "Chapter 8 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "Which creative-to-UA handoff is incomplete?",
        "options": [
          "Asset name, concept, hook, format, customer problem, changed variable, claim note, and expected learning.",
          "A folder link labelled \"new stuff\" with no context about the asset.",
          "A handoff card that states the portfolio lane and intended customer tension.",
          "A brief explaining whether the asset is optimisation or exploration."
        ],
        "correctAnswer": 1
      },
      {
        "order": 2,
        "question": "An ad receives strong CTR but weak trial-start quality. What is the most appropriate first interpretation?",
        "options": [
          "The creative is definitely a winner because CTR is high.",
          "The creative may be earning curiosity, but it may also be creating the wrong expectation or failing to connect its promise to the product and destination.",
          "The product has no value.",
          "The team should immediately copy the hook into every creative."
        ],
        "correctAnswer": 1
      },
      {
        "order": 3,
        "question": "What is the strongest next-batch response to the observation \"The creative has attention, but the product arrives too late and users seem confused\"?",
        "options": [
          "\"Make it more engaging.\"",
          "\"Keep the tension that earned attention, introduce product truth earlier, and test a clearer product-demo proof.\"",
          "\"Remove the product entirely because users like the opening.\"",
          "\"Produce five copies with different fonts.\""
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "Why should a creative learning log group assets by concept rather than only by file name?",
        "options": [
          "It makes the spreadsheet look more professional.",
          "It allows the team to see how a customer/message territory develops across hooks, executions, and outcomes, rather than losing learning in isolated files.",
          "It eliminates the need for UA feedback.",
          "It guarantees that each concept will scale."
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "Which statement is an observation rather than a hypothesis?",
        "options": [
          "\"The direct-to-camera format is the reason this concept converted.\"",
          "\"The hook likely attracted users who expected a different product experience.\"",
          "\"This asset received more qualified trial starts than the other two assets in the batch.\"",
          "\"Changing the proof should solve the conversion problem.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 6,
        "question": "A creator receives feedback that an exploration concept produced low delivery in one launch. What is the least appropriate response?",
        "options": [
          "Review whether the concept was distinct, whether the hook and execution were clear, and whether a different version could test the same idea better.",
          "Check if the asset's concept, message, and execution were documented well enough to learn from the result.",
          "Immediately label the underlying concept worthless and never revisit it, without reviewing execution or launch context.",
          "Discuss with UA whether there were any useful signals or measurement limitations."
        ],
        "correctAnswer": 2
      }
    ]
  },
  {
    "chapterSlug": "mcc-creative-quality-and-product-trust",
    "title": "Chapter 9 Quiz",
    "questions": [
      {
        "order": 1,
        "question": "Which claim is most consistent with product truth?",
        "options": [
          "\"Guaranteed results for everyone in seven days.\"",
          "\"This product cures the underlying condition permanently.\"",
          "\"A guided daily structure designed to make the next step clearer and easier to follow.\"",
          "\"We know exactly what personal problem you have.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 2,
        "question": "Why is fear- or shame-based creative risky in a sensitive category?",
        "options": [
          "It always has low CTR.",
          "It may create attention at the expense of user trust, product expectation, customer quality, and long-term brand/platform health.",
          "It is more expensive to produce.",
          "It cannot contain a CTA."
        ],
        "correctAnswer": 1
      },
      {
        "order": 3,
        "question": "A creator wants to use a user review in an ad. Which check is most important?",
        "options": [
          "Whether the quote is dramatic enough to create a strong hook.",
          "Whether the review is real, accurately represented, appropriately permitted, and not presented as a guaranteed outcome.",
          "Whether the user's name can be made larger than the product name.",
          "Whether the quote can be edited until it sounds like a product claim."
        ],
        "correctAnswer": 1
      },
      {
        "order": 4,
        "question": "Which element is required in the final end-to-end creative case?",
        "options": [
          "A claim that the creator can predict the next winner.",
          "Customer evidence, a System of Ideas, a differentiated creative portfolio, a production-ready pack, UA handoff details, a learning plan, and trust/QA checks.",
          "Only a finished video with strong visual effects.",
          "A list of competitors without an original concept."
        ],
        "correctAnswer": 1
      },
      {
        "order": 5,
        "question": "During the founder or creative-lead review, which answer shows the strongest level of creative reasoning?",
        "options": [
          "\"I chose this because it is trending.\"",
          "\"I chose this because it took the longest to produce.\"",
          "\"The strongest observation is that users repeatedly describe a specific barrier; my concept tests a product-truthful reframe, and the most uncertain element is whether the proof type is credible enough.\"",
          "\"I cannot explain the concept until it has been launched.\""
        ],
        "correctAnswer": 2
      },
      {
        "order": 6,
        "question": "What does it mean to complete the Jr. Marketing Content Creator curriculum successfully?",
        "options": [
          "The creator has memorised every popular Meta ad format.",
          "The creator has produced the most expensive asset in the team library.",
          "The creator can turn a real customer/product context into a documented, differentiated, product-truthful creative batch; hand it off with a learning objective; and use feedback to propose the next intelligent iteration.",
          "The creator has copied enough competitor ads to fill a swipe file."
        ],
        "correctAnswer": 2
      }
    ]
  }
];

async function main() {
  console.log("Seeding quizzes for marketing-content-creator chapters (additive-only)...");

  for (const q of quizzes) {
    const chapter = await prisma.chapter.findUnique({
      where: { slug: q.chapterSlug },
      include: { quiz: true },
    });
    if (!chapter) {
      console.log(`  Skipping "${q.chapterSlug}" — chapter not found.`);
      continue;
    }
    if (chapter.quiz) {
      console.log(`  Skipping "${q.chapterSlug}" — quiz already exists.`);
      continue;
    }

    await prisma.quiz.create({
      data: {
        chapterId: chapter.id,
        title: q.title,
        questions: {
          create: q.questions.map((qq) => ({
            order: qq.order,
            question: qq.question,
            options: JSON.stringify(qq.options),
            correctAnswer: qq.correctAnswer,
          })),
        },
      },
    });

    console.log(`  Created quiz for "${q.chapterSlug}" (${q.questions.length} questions).`);
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

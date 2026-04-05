import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.resourceNote.deleteMany();
  await prisma.resourceProgress.deleteMany();
  await prisma.resource.deleteMany();
  await prisma.person.deleteMany();
  await prisma.quizAttempt.deleteMany();
  await prisma.lessonProgress.deleteMany();
  await prisma.user.deleteMany();
  await prisma.quizQuestion.deleteMany();
  await prisma.quiz.deleteMany();
  await prisma.lesson.deleteMany();
  await prisma.chapter.deleteMany();

  // ── Chapter 1 ──────────────────────────────────────────────────────────────
  const chapter1 = await prisma.chapter.create({
    data: {
      order: 1,
      slug: "intro-to-performance-marketing",
      title: "Introduction to Performance Marketing and Creative Strategy",
      description: "Understand the Creative Strategist role, the marketing funnel, and the core KPIs that drive every decision.",
      role: "creative-strategist",
      lessons: {
        create: [
          {
            order: 1,
            slug: "who-is-a-creative-strategist",
            title: "Who is a Creative Strategist and What Do They Do?",
            content: `## Who is a Creative Strategist and What Do They Do?

A Creative Strategist is the bridge between data and creativity. In the past, advertising was purely about making things look "pretty" or "aesthetic." Today, in the world of performance marketing, a beautiful ad is useless if it doesn't convert. Your primary goal is not just to design, but to understand user psychology, platform dynamics (like TikTok vs. Meta), and performance metrics to develop strategies that maximize conversion rates.

In this role, you will work closely with the **Media Buying (User Acquisition)** team. Think of it this way: Media Buyers decide *who* sees the ad and *when* they see it (targeting and bidding), while you decide *what* they see and *what they are told* (the creative and the message).

A successful creative strategy is a continuous loop: you conduct deep research, formulate a hypothesis, produce the creative, test it, analyze the data, and iterate based on the results.`,
          },
          {
            order: 2,
            slug: "the-marketing-funnel",
            title: "The Marketing Funnel and the Role of Creatives",
            content: `## The Marketing Funnel and the Role of Creatives

The customer journey — from never having heard of your app to becoming a paying subscriber — is typically visualized as a funnel. The user's intent changes drastically at each stage, and your creative messaging must adapt accordingly.

### Top of Funnel (Awareness)
At this stage, the user doesn't know your brand and might not even realize they have a problem your app solves. The goal here is to grab attention and educate. Broad-appeal User-Generated Content (UGC) videos, relatable memes, or strong visual hooks that highlight a common frustration work best here. You are casting a wide net.

### Middle of Funnel (Consideration)
The user is now aware of their problem and is actively looking for solutions. They might be comparing your app with competitors. Here, your creatives need to prove why your product is the best choice. Product demos, feature comparisons, and "How it works" videos are highly effective.

### Bottom of Funnel (Conversion)
The user is ready to buy but needs a final push. They already know your brand. At this stage, direct Call-to-Action (CTA) static ads, urgency-driven messages (e.g., "Limited time offer"), or strong social proof (e.g., "Join 10,000+ users") are the most effective tools to close the sale.`,
          },
          {
            order: 3,
            slug: "core-performance-metrics",
            title: "Core Performance Metrics (KPIs)",
            content: `## Core Performance Metrics (KPIs)

To measure success and optimize your creatives, you must speak the language of data. Here are the foundational Key Performance Indicators (KPIs) every Creative Strategist must know:

**CTR (Click-Through Rate)**
The percentage of people who clicked on your ad after seeing it. A high CTR indicates that your ad is engaging, visually appealing, and relevant to the audience.

**CPA (Cost Per Acquisition)**
The average amount of money spent to acquire one new paying user or subscriber. This is the ultimate metric; your overarching goal is always to lower the CPA.

**ROAS (Return on Ad Spend)**
The revenue generated for every dollar spent on advertising. If you spend $1 and make $3, your ROAS is 3.0.

**Hook Rate**
Specifically for video ads, this is the percentage of people who watch the first 3 seconds of your video. It measures your ad's ability to "stop the scroll" and grab immediate attention.

**Hold Rate (or Retention Rate)**
The percentage of people who watch the entire video (or a significant portion of it). While the Hook Rate measures initial attention, the Hold Rate measures how compelling your storytelling and pacing are.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: chapter1.id,
      title: "Chapter 1 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the primary goal of a Creative Strategist in performance marketing?",
            options: JSON.stringify([
              "To create the most aesthetically pleasing and artistic designs possible.",
              "To manage ad budgets and adjust platform bidding settings.",
              "To bridge data and creativity by developing ad concepts that maximize conversion rates.",
              "To write the code for the app's landing pages.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 2,
            question: "Which type of creative is generally most effective at the Bottom of the Funnel (Conversion stage)?",
            options: JSON.stringify([
              "A 3-minute documentary about the founder's childhood.",
              "A direct Call-to-Action (CTA) static ad with an urgency-driven message.",
              "A broad, educational blog post about industry trends.",
              "A highly abstract, brand-awareness billboard design.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 3,
            question: "Which metric specifically measures a video ad's ability to grab immediate attention and 'stop the scroll'?",
            options: JSON.stringify([
              "Hold Rate",
              "Cost Per Acquisition (CPA)",
              "Return on Ad Spend (ROAS)",
              "Hook Rate",
            ]),
            correctAnswer: 3,
          },
        ],
      },
    },
  });

  // ── Chapter 2 ──────────────────────────────────────────────────────────────
  const chapter2 = await prisma.chapter.create({
    data: {
      order: 2,
      slug: "customer-research",
      title: "Customer Research and Gathering Insights",
      description: "Learn how to build deep customer personas, mine social platforms for real voice-of-customer data, and analyze competitors to find your winning angle.",
      role: "creative-strategist",
      lessons: {
        create: [
          {
            order: 1,
            slug: "personas-and-pain-points",
            title: "Understanding the Target Audience: Personas and Pain Points",
            content: `## Understanding the Target Audience: Personas and Pain Points

An effective ad speaks directly to the customer's pain points and desires. Understanding *why* users buy a product is the foundation of all messaging. When building customer personas, you must go beyond basic demographics (age, gender, location) and dive deep into **psychographics**: their daily struggles, fears, desires, and objections.

People don't buy products; they buy a better version of themselves or a solution to a frustrating problem. For example, people don't buy a meditation app because they want to listen to audio tracks; they buy it because they are stressed, cannot sleep, and want peace of mind.

Identifying these deep-rooted motivations is what transforms a generic ad into a high-converting one.`,
          },
          {
            order: 2,
            slug: "social-listening",
            title: "Social Listening and Research Tools",
            content: `## Social Listening and Research Tools

The best way to find out what customers truly think is to listen to where they talk among themselves. Platforms like **Reddit**, **Quora**, **Amazon product reviews**, comments under competitor ads, and **TikTok trends** are goldmines for unfiltered customer feedback.

This process is called **Social Listening**. Your goal is to find the **"Voice of Customer" (VoC)** — the exact words and phrases your target audience uses to describe their problems.

If a Reddit user complains, *"I'm tired of fitness apps that assume I have 2 hours a day to work out,"* you use that exact phrasing in your ad script: *"Tired of fitness apps that assume you have 2 hours a day?"*

Hearing their own words makes users instantly empathize with your brand, significantly boosting conversion rates.`,
          },
          {
            order: 3,
            slug: "competitor-analysis",
            title: "Competitor Analysis and Market Positioning",
            content: `## Competitor Analysis and Market Positioning

Knowing what your competitors are doing allows you to find gaps in the market. Tools like the **Meta Ad Library** (Facebook Ad Library) and **TikTok Creative Center** allow you to see the exact ads your competitors are currently running.

When analyzing competitors, ask yourself:
- What formats are they using heavily?
- What hooks are they relying on?
- What value propositions are they highlighting?

The goal is **not** to copy them. If everyone is shouting the same message, they all blend together. Your goal is to identify what they are missing or under-emphasizing, and use that to develop unique **"angles"** that differentiate your app and make it stand out in a crowded feed.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: chapter2.id,
      title: "Chapter 2 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the main advantage of using the 'Voice of Customer' (VoC) approach in ad copywriting?",
            options: JSON.stringify([
              "It ensures the ad copy sounds highly corporate and professional.",
              "It allows you to use the exact words customers use to describe their problems, creating instant empathy.",
              "It automatically bypasses the ad platform's review process.",
              "It eliminates the need for visual design in your ads.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "Which of the following is a primary tool used to see the exact ads your competitors are currently running?",
            options: JSON.stringify([
              "Google Analytics",
              "Adobe Premiere Pro",
              "Meta Ad Library",
              "Mailchimp",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "Why are platforms like Reddit and Quora valuable for customer research?",
            options: JSON.stringify([
              "Because advertising on them is completely free.",
              "Because they only attract high-income users.",
              "Because users share unfiltered, honest feedback and discuss their real pain points.",
              "Because visual content goes viral faster on these platforms than on TikTok.",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // ── Chapter 3 ──────────────────────────────────────────────────────────────
  const chapter3 = await prisma.chapter.create({
    data: {
      order: 3,
      slug: "ad-formats-and-creative-diversity",
      title: "Ad Formats and Creative Diversity",
      description: "Master static ads, video/UGC formats, and the concept of angle testing to keep performance high and avoid ad fatigue.",
      role: "creative-strategist",
      lessons: {
        create: [
          {
            order: 1,
            slug: "static-ads-and-design-psychology",
            title: "Static Ads and Design Psychology",
            content: `## Static Ads and Design Psychology

Static ads (single-image graphics) are incredibly powerful for rapid testing and delivering a clear, concise message. They are often cheaper to produce and can be highly effective, especially at the Bottom of the Funnel.

The anatomy of a high-converting static ad consists of four elements:
1. An eye-catching visual
2. A readable and persuasive headline
3. A clear Call-to-Action (CTA)
4. A trust-building element (like a 5-star rating or a customer quote)

When designing, you must respect **visual hierarchy**. The user's eye should be intentionally guided from the most important message (the hook/headline) down to the CTA. Using contrasting colors to make the CTA pop and keeping the design uncluttered (avoiding text-heavy images) are fundamental principles for static ad success.`,
          },
          {
            order: 2,
            slug: "video-ads-and-ugc",
            title: "Video Ads and UGC (User-Generated Content)",
            content: `## Video Ads and UGC (User-Generated Content)

Video ads, particularly UGC, are the backbone of modern performance marketing. UGC outperforms traditional, high-production studio commercials because it is **"authentic."** Users have developed "ad blindness" — they scroll past anything that looks like a polished TV commercial.

UGC works because it looks native to the platform; it feels like a recommendation from a friend or a trusted creator rather than a corporate pitch.

Beyond standard UGC, other highly effective video formats include:
- **Founder Ads** — where the creator of the app speaks directly to the camera, building immense trust
- **Fast-paced product demos** — that visually prove the app's value within seconds`,
          },
          {
            order: 3,
            slug: "creative-diversity-and-angle-testing",
            title: "Creative Diversity and Angle Testing",
            content: `## Creative Diversity and Angle Testing

Relying on a single ad format or a single message to sell your product will inevitably lead to **"ad fatigue"** — the point where your audience has seen the ad so many times they stop clicking, and your CPA skyrockets.

**Creative Diversity** means developing different "angles" that appeal to different user motivations.

For example, if you are marketing a language-learning app, you shouldn't just say "Learn Spanish." You should test multiple angles:
- **Angle A:** "Boost your career with a second language"
- **Angle B:** "Travel confidently without feeling lost"
- **Angle C:** "Keep your brain sharp with daily exercises"

By combining different angles with different formats (Static, UGC, Animation), you continuously reach new audience segments and maintain high performance over time.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: chapter3.id,
      title: "Chapter 3 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "Why does User-Generated Content (UGC) often outperform high-production studio commercials in performance marketing?",
            options: JSON.stringify([
              "Because UGC always costs absolutely nothing to produce.",
              "Because UGC feels more authentic, native to the platform, and builds trust like a friend's recommendation.",
              "Because social media algorithms ban studio commercials.",
              "Because UGC videos are always shorter than 5 seconds.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "What does 'Creative Diversity' mean in the context of ad strategy?",
            options: JSON.stringify([
              "Using every single color in the rainbow in one static ad.",
              "Running the exact same video ad but changing the background music every day.",
              "Developing different angles and formats to appeal to various user motivations and prevent ad fatigue.",
              "Hiring creators from different countries to read the exact same script.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "What is the primary purpose of 'visual hierarchy' in a static ad design?",
            options: JSON.stringify([
              "To make the ad look as complex and artistic as possible.",
              "To intentionally guide the user's eye from the most important message down to the Call-to-Action (CTA).",
              "To ensure the brand logo is the largest element on the screen.",
              "To reduce the file size of the image.",
            ]),
            correctAnswer: 1,
          },
        ],
      },
    },
  });

  // ── Chapter 4 ──────────────────────────────────────────────────────────────
  const chapter4 = await prisma.chapter.create({
    data: {
      order: 4,
      slug: "scriptwriting-and-hooks",
      title: "Scriptwriting and Hook Strategies",
      description: "Learn how to craft irresistible hooks, structure Direct Response scripts, and apply psychological triggers that drive conversions.",
      role: "creative-strategist",
      lessons: {
        create: [
          {
            order: 1,
            slug: "the-anatomy-of-a-hook",
            title: "The Anatomy and Importance of a Hook",
            content: `## The Anatomy and Importance of a Hook

The **"Hook"** is the first 3 seconds of a video ad, and it is arguably the most critical component of your entire creative strategy. Its sole purpose is to "stop the scroll." If the hook fails, the rest of your meticulously crafted video doesn't matter because no one will see it.

Hooks can be:
- **Visual** — an unusual object, a sudden movement, a weird camera angle
- **Auditory/Textual** — a bold statement, a controversial question, calling out a specific audience

Successful hook formulas often rely on curiosity or challenging norms. Examples include:
- *"Stop doing X if you want Y"*
- *"The secret the fitness industry is hiding from you"*
- *"I tried every productivity app so you don't have to"*`,
          },
          {
            order: 2,
            slug: "direct-response-script-structures",
            title: "Direct Response Script Structures",
            content: `## Direct Response Script Structures

An effective video ad script doesn't just entertain; it takes the viewer on a logical and emotional journey that ends in a conversion. The classic Direct Response script structure follows a proven sequence:

1. **The Hook** — Grab attention immediately and stop the scroll.

2. **The Problem** — Empathize with the viewer by clearly stating the pain point they are experiencing. Make them feel understood.

3. **The Solution (Your Product)** — Introduce your app as the ultimate hero that solves this specific problem. Show, don't just tell (use visual demos).

4. **Social Proof** — Validate your claims by showing that others have successfully used your product (testimonials, user reviews, "As seen on" badges).

5. **The Call-to-Action (CTA)** — Tell the viewer exactly what to do next with clear instructions (e.g., "Tap the link below to download for free today").`,
          },
          {
            order: 3,
            slug: "psychological-triggers",
            title: "Psychological Triggers",
            content: `## Psychological Triggers

Integrating psychological persuasion techniques into your ad copy and scripts can significantly boost conversion rates. When used ethically, these triggers tap into fundamental human behaviors:

**FOMO (Fear Of Missing Out) & Urgency**
Phrases like *"Offer ends tonight"* or *"Limited spots available"* compel users to act immediately rather than procrastinating.

**Authority**
Featuring expert opinions, doctor recommendations, or recognizable brand logos builds instant credibility.

**Social Proof**
Highlighting that *"Over 50,000 people have downloaded this app"* leverages the human tendency to follow the crowd.

**Reciprocity**
Offering something of value for free upfront (like a free 7-day trial or a free guide) increases the likelihood that the user will commit to a purchase later.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: chapter4.id,
      title: "Chapter 4 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the sole purpose of the 'Hook' in a video ad?",
            options: JSON.stringify([
              "To list all the technical features of the product.",
              "To stop the user from scrolling and grab their immediate attention in the first 3 seconds.",
              "To display the brand's legal disclaimers.",
              "To ask the user for their credit card information.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "Which of the following represents the correct sequence of a classic Direct Response video script?",
            options: JSON.stringify([
              "Product Price → Brand Logo → Hook → Problem",
              "Solution → Call-to-Action → Problem → Hook",
              "Hook → Problem → Solution → Social Proof → Call-to-Action",
              "Social Proof → Hook → Call-to-Action → Problem",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "The phrase 'Only 3 hours left to claim your 50% discount!' utilizes which psychological trigger?",
            options: JSON.stringify([
              "Authority",
              "Reciprocity",
              "Urgency & FOMO",
              "Social Proof",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // ── Chapter 5 ──────────────────────────────────────────────────────────────
  const chapter5 = await prisma.chapter.create({
    data: {
      order: 5,
      slug: "testing-analysis-optimization",
      title: "Testing, Analysis, and Optimization",
      description: "Build a data-driven testing process, learn to diagnose creative problems from metrics, and scale winning concepts through smart iteration.",
      role: "creative-strategist",
      lessons: {
        create: [
          {
            order: 1,
            slug: "ab-testing-and-variable-isolation",
            title: "The Logic of A/B Testing and Variable Isolation",
            content: `## The Logic of A/B Testing and Variable Isolation

Creative strategy must be driven by data, not assumptions. When testing ads scientifically, **"variable isolation"** is crucial.

If you launch a new ad where you have changed the visual, the headline, and the CTA all at once, and the ad performs well, you won't know which change caused the success.

In a proper A/B test, **you change only one variable at a time**. For example:
- You run two identical videos where the only difference is the first 3 seconds (the hook)
- Or you run two identical static images with different background colors

This isolated testing allows you to definitively identify what works and build a playbook of proven tactics.`,
          },
          {
            order: 2,
            slug: "reading-data-and-diagnosing-problems",
            title: "Reading the Data and Diagnosing Problems",
            content: `## Reading the Data and Diagnosing Problems

Performance metrics act as a diagnostic tool, telling you exactly where your ad is failing.

**Low Hook Rate**
Your first 3 seconds are boring or irrelevant. You need to test more aggressive or curious hooks immediately.

**High Hook Rate, Low Hold Rate**
Your hook successfully grabbed attention, but the middle of your video is dragging, confusing, or fails to deliver on the hook's promise. You need to improve the pacing or storytelling.

**High CTR, Low Conversion Rate (CVR)**
Your ad is getting clicks, but people aren't buying or downloading. This usually indicates a "disconnect" between the ad's promise and the landing page/app store page, or it means the pricing is a barrier.`,
          },
          {
            order: 3,
            slug: "scaling-winners-and-iteration",
            title: "Scaling Winners and Iteration",
            content: `## Scaling Winners and Iteration

When you finally find a high-performing ad concept (a **"winner"**), your job is to extend its lifespan and maximize its value. To prevent ad fatigue, you shouldn't just abandon a winner when its performance starts to dip. Instead, you use **"iteration."**

Iteration means taking a proven concept and making small tweaks to create fresh variations. For example:
- Take a winning UGC video but have a **different creator** film the same script
- Keep the same video and test **5 completely different text hooks** on the screen
- Take the core message of a winning static ad and **turn it into a video script**

This approach allows you to scale your budget efficiently using concepts you already know the audience loves.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: chapter5.id,
      title: "Chapter 5 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "Why is 'variable isolation' crucial when conducting an A/B test?",
            options: JSON.stringify([
              "To make the test finish faster.",
              "To save money on ad spend.",
              "To definitively identify exactly which specific change caused the increase or decrease in performance.",
              "To confuse the competitor's tracking tools.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 2,
            question: "If a video ad has a very high Hook Rate but a very low Hold Rate, what is the most likely problem?",
            options: JSON.stringify([
              "The first 3 seconds are great, but the rest of the video is boring or fails to deliver on the hook's promise.",
              "The target audience is completely wrong.",
              "The hook is terrible and needs to be replaced immediately.",
              "The product is too cheap.",
            ]),
            correctAnswer: 0,
          },
          {
            order: 3,
            question: "When you find a 'winning' (high-performing) video ad, what is the best strategy to prevent ad fatigue and scale it?",
            options: JSON.stringify([
              "Immediately pause the ad and look for a completely new concept.",
              "Iterate on the winner by making small tweaks, such as testing new hooks on the same video or using a different creator for the same script.",
              "Reduce the ad budget to zero.",
              "Change the video to black and white and re-upload it.",
            ]),
            correctAnswer: 1,
          },
        ],
      },
    },
  });

  // ── Chapter 6 ──────────────────────────────────────────────────────────────
  await prisma.chapter.create({
    data: {
      order: 6,
      slug: "1on1-meeting-with-founder",
      title: "1-on-1 Meeting with the Founder",
      description: "The final step of your onboarding — a direct session with the Founder to align on the company vision, product values, and creative strategy.",
      role: "creative-strategist",
      lessons: {
        create: [
          {
            order: 1,
            slug: "preparing-for-the-founder-meeting",
            title: "Preparing for the 1-on-1 Meeting",
            content: `## 1-on-1 Meeting with the Founder

The final step of your onboarding is a 1-on-1 meeting with the Founder. This session is designed to give you deep insights into the company's vision, the core value of our products, and the nuances of our marketing strategy directly from the source.

To make the most of this meeting, you are expected to come prepared. This is not just a listening session; it is an interactive discussion. Before the meeting, you must:

**Review Existing Creatives:** Analyze our current top-performing and underperforming ads. Identify patterns, hooks, and formats we are currently using.

**Explore the Products:** Download and use our subscription-based apps. Understand the user flow, the paywalls, and the core features.

**Prepare Your Questions:** Write down specific questions regarding the products, the target audience, or the creative strategy. If something in our current ads doesn't make sense to you, or if you have ideas you'd like to validate, this is the right moment to ask.

The goal of this meeting is to leave with full clarity on what the company stands for, who we are talking to, and what kind of creative work will move the needle.`,
          },
        ],
      },
    },
  });

  // Seed users
  await prisma.user.create({
    data: {
      name: "Admin",
      email: "admin@company.com",
      passwordHash: await bcrypt.hash("admin123", 10),
      role: "creative-strategist",
      language: "tr",
      isAdmin: true,
    },
  });

  await prisma.user.create({
    data: {
      name: "Alex Johnson",
      email: "alex@company.com",
      passwordHash: await bcrypt.hash("alex123", 10),
      role: "creative-strategist",
      language: "tr",
      isAdmin: false,
    },
  });

  // Resources — all 41 Fraser Cottrell videos
  await prisma.resource.createMany({
    data: [
      // Strategy & Framework
      { order: 1,  category: "Strategy & Framework",       title: "Every Ad Creative Type EXPLAINED",                                        description: "A map of all ad formats (UGC, static, founder, VSL, podcast) matched to funnel stages.",                                                               youtubeUrl: "https://www.youtube.com/watch?v=FWWp6NcVo3Q" },
      { order: 2,  category: "Strategy & Framework",       title: "How to make Meta Ad Creatives (in 2026)",                                 description: "The 5 pillars of ad strategy: psychology, customer research, funnel stages, format selection, and ideation.",                                          youtubeUrl: "https://www.youtube.com/watch?v=gP-68LmgAQ4" },
      { order: 3,  category: "Strategy & Framework",       title: "My $300M Meta Ads Strategy (copy & scale)",                               description: "The Research → Ideation → Production → Test loop; why creative strategy matters more than media buying.",                                              youtubeUrl: "https://www.youtube.com/watch?v=-q2lqfNysUs" },
      { order: 4,  category: "Strategy & Framework",       title: "I Ranked Every Meta Ad Creative Type (stop wasting $$$)",                 description: "Ranking all video ad formats by cost, ease of production, and scalability.",                                                                           youtubeUrl: "https://www.youtube.com/watch?v=DPvFnflNEYQ" },
      { order: 5,  category: "Strategy & Framework",       title: "Copy This NEW Meta Ads Strategy (Post Andromeda)",                        description: "Why creative diversity matters post-Andromeda; the Persona, Message, Hook, and Format levers.",                                                        youtubeUrl: "https://www.youtube.com/watch?v=CPWoW09WCCo" },
      { order: 6,  category: "Strategy & Framework",       title: "Static Ads vs UGC in 2026 | What Actually Scales Now",                   description: "The strategic balance between the two core formats; using low-cost statics to find the winning message.",                                             youtubeUrl: "https://www.youtube.com/watch?v=_BuCO3Jf-K0" },
      // Hooks & Scripting
      { order: 7,  category: "Hooks & Scripting",          title: "I made 10,000 Ads, These are the Money Making Hooks",                    description: "10 hook techniques and the psychology behind them; how to control the first 3 seconds of an ad.",                                                      youtubeUrl: "https://www.youtube.com/watch?v=opWKMc6iavo" },
      { order: 8,  category: "Hooks & Scripting",          title: "My $450M Hook Strategy (copy and scale)",                                description: "Building hooks by funnel stage; curiosity, myth-busting, and list techniques.",                                                                       youtubeUrl: "https://www.youtube.com/watch?v=93gJ8_qvOQg" },
      { order: 9,  category: "Hooks & Scripting",          title: "How to Write Winning Meta Ad Scripts ($450M Spent)",                     description: "5-step script formula: hook, problem-solution narrative, product demo, CTA.",                                                                         youtubeUrl: "https://www.youtube.com/watch?v=KKp3rA0QK9A" },
      { order: 10, category: "Hooks & Scripting",          title: "How to Write Winning Meta Ad Scripts ($300M Spent)",                     description: "The Villain-Hero framework: positioning your product as the hero and the problem as the villain.",                                                     youtubeUrl: "https://www.youtube.com/watch?v=4o46eGI6XwQ" },
      { order: 11, category: "Hooks & Scripting",          title: "10 Psychological Triggers to Get Your Ads Watched",                      description: "Integrating 10 psychological triggers — FOMO, social proof, price anchoring, authority — into ad creative.",                                           youtubeUrl: "https://www.youtube.com/watch?v=oVpT0GnGY8Q" },
      // Static Ad Production
      { order: 12, category: "Static Ad Production",       title: "Static Ads Masterclass 2026 (Full Guide)",                               description: "Core principles of static ads: readability, objection handling, social proof; production with CreativeOS and ChatGPT.",                              youtubeUrl: "https://www.youtube.com/watch?v=2BrGawWj1aI" },
      { order: 13, category: "Static Ad Production",       title: "Static Ads Ultimate Guide | The Easiest Ads to Scale FAST",              description: "Customer research + AI copywriting + Canva/CreativeOS design + A/B test workflow.",                                                                   youtubeUrl: "https://www.youtube.com/watch?v=HXox1I6QQvQ" },
      { order: 14, category: "Static Ad Production",       title: "I Tested 500 Static Ads, Here's What Actually Scales in 2026",           description: "6 high-converting static ad formats; bold colors, AI visuals, and customer review integration.",                                                      youtubeUrl: "https://www.youtube.com/watch?v=TouPE2n7mzo" },
      // Video & UGC Production
      { order: 15, category: "Video & UGC Production",     title: "How to Make Meta Ad Creatives (even if you are a beginner)",             description: "Comprehensive beginner guide covering ad creatives alongside ROAS/CPA/CTR metrics.",                                                                   youtubeUrl: "https://www.youtube.com/watch?v=tVXjXJSEjeA" },
      { order: 16, category: "Video & UGC Production",     title: "I made 10,000+ Ads (These Are the Money Makers)",                        description: "The 10 most effective video ad formats: UGC, founder ads, podcast-style interviews.",                                                                 youtubeUrl: "https://www.youtube.com/watch?v=bNMeFhW6YmA" },
      { order: 17, category: "Video & UGC Production",     title: "Why Some Ads Are IMPOSSIBLE to Skip",                                    description: "4-step framework for unskippable ads: visual structure, color theory, social proof, message layering.",                                               youtubeUrl: "https://www.youtube.com/watch?v=GCugREdurJk" },
      { order: 18, category: "Video & UGC Production",     title: "How to make Founder Ads that actually convert in 2026",                  description: "Building trust in founder ads: personal story, scriptwriting, and recording techniques.",                                                             youtubeUrl: "https://www.youtube.com/watch?v=Ry7KQFZaPGA" },
      { order: 19, category: "Video & UGC Production",     title: "Do THIS To Make Founder Ads That Actually Convert",                      description: "Founder ad structure (hook + problem + CTA) and ChatGPT prompts for AI-assisted scriptwriting.",                                                      youtubeUrl: "https://www.youtube.com/watch?v=3Aw5-kVfufc" },
      // AI-Powered Ad Creation
      { order: 20, category: "AI-Powered Ad Creation",     title: "How I Make Ai Ads That Actually Work (My Exact Workflow)",               description: "Building a brand profile with ChatGPT Deep Research + Claude Projects; generating hooks and scripts with AI.",                                          youtubeUrl: "https://www.youtube.com/watch?v=EqhboKbkESQ" },
      { order: 21, category: "AI-Powered Ad Creation",     title: "The New Way to Make Ai UGC in 2026",                                     description: "End-to-end UGC production with Claude + Arcads + Nano Banana; script → AI avatar → B-roll → edit workflow.",                                           youtubeUrl: "https://www.youtube.com/watch?v=ahwbstiCVpQ" },
      { order: 22, category: "AI-Powered Ad Creation",     title: "Google's Nano Banana Update Changed Ai Ad Creatives Forever",            description: "Using Gemini to swap product backgrounds, edit visuals, and rapidly generate SKU variations.",                                                        youtubeUrl: "https://www.youtube.com/watch?v=BkNZVaQboQQ" },
      { order: 23, category: "AI-Powered Ad Creation",     title: "How I Make Ai Ad Creatives FAST (Poppy Ai)",                             description: "Ad research, competitor analysis, and brand-guideline-compliant content generation with Poppy AI.",                                                    youtubeUrl: "https://www.youtube.com/watch?v=wP0fEPGAsRs" },
      { order: 24, category: "AI-Powered Ad Creation",     title: "How I Make Ai UGC Creatives That Look Real (Arcads + Sora 2)",           description: "Realistic UGC production with Sora 2 + Arcads; combining AI footage with editing software.",                                                           youtubeUrl: "https://www.youtube.com/watch?v=lDtQRWhLXn4" },
      { order: 25, category: "AI-Powered Ad Creation",     title: "How I Make Ai UGC Creatives FAST (with Arcads)",                         description: "Creating AI avatars with Arcads, configuring voiceovers, and integrating B-roll footage.",                                                            youtubeUrl: "https://www.youtube.com/watch?v=hxfTY7nkmHA" },
      { order: 26, category: "AI-Powered Ad Creation",     title: "How I Make High-Performing Ads Faster Using AI (Poppy Ai)",              description: "Rapid ad ideation and production optimization with Poppy AI.",                                                                                       youtubeUrl: "https://www.youtube.com/watch?v=wXe0B2XZTGI" },
      { order: 27, category: "AI-Powered Ad Creation",     title: "I Made This Pixar Style Ad in 30 Minutes Using AI (MaxFusion)",          description: "3D animation-style ad production with Maxfusion; LLM prompt engineering + Premiere Pro post-production.",                                             youtubeUrl: "https://www.youtube.com/watch?v=cv9GbhtGLCc" },
      { order: 28, category: "AI-Powered Ad Creation",     title: "The Ai UGC Bubble Was NOT Real (you've been lied to)",                   description: "Correctly positioning AI as a productivity tool; why strategy and emotional understanding must stay human-led.",                                         youtubeUrl: "https://www.youtube.com/watch?v=A_e_9v_Sy0I" },
      // Research & Data
      { order: 29, category: "Research & Data",            title: "How I Turn Reddit Threads Into High-Converting Ad Ideas",                 description: "Extracting unfiltered customer insights and pain points from Reddit; AI-assisted UGC script generation.",                                              youtubeUrl: "https://www.youtube.com/watch?v=RpNcnKS2WYc" },
      { order: 30, category: "Research & Data",            title: "How to Analyze Facebook Ads Data the Right Way in 2025",                 description: "Interpreting CPA, Hook Rate, Hold Rate, CTR metrics; diagnosing creative problems and building test strategies.",                                      youtubeUrl: "https://www.youtube.com/watch?v=E_iKdQEtUi0" },
      // Ad Analysis & QA
      { order: 31, category: "Ad Analysis & QA",           title: "I Audited 7 Worst Ad Creatives (Don't make these mistakes)",             description: "A 'what not to do' guide using real ads: bad casting, poor audio quality, wrong audience targeting.",                                                  youtubeUrl: "https://www.youtube.com/watch?v=PRKp0sSUb2c" },
      { order: 32, category: "Ad Analysis & QA",           title: "Can You Spot the Winning Ad? (Most People Can't)",                       description: "How social proof, UGC effect, and psychological pricing impact ad performance — through real A/B test results.",                                        youtubeUrl: "https://www.youtube.com/watch?v=7c0aEpo8-bg" },
      { order: 33, category: "Ad Analysis & QA",           title: "The Only Meta Ad Creative Workflow You'll Ever Need",                    description: "A systematic creative engine that tests hook, format, and angle as independent variables.",                                                            youtubeUrl: "https://www.youtube.com/watch?v=_FMXAlfgYQo" },
      { order: 34, category: "Ad Analysis & QA",           title: "This Ad Format Is Secretly CRUSHING (But Not for the Reason You Think)", description: "Advanced creative strategies, VSL usage, and finding new winning concepts through data-driven testing.",                                               youtubeUrl: "https://www.youtube.com/watch?v=oZFiSUkJEPE" },
      // UGC & Creator Management
      { order: 35, category: "UGC & Creator Management",   title: "How to Find the Right UGC Creators in 2026",                             description: "UGC creator selection criteria: credibility, message delivery, audience fit; recruitment platforms.",                                               youtubeUrl: "https://www.youtube.com/watch?v=xB4jykCt_yU" },
      { order: 36, category: "UGC & Creator Management",   title: "Whitelisting Ads vs Partnership Ads (EXPLAINED)",                        description: "Strategic differences between Whitelisting and Partnership Ads; technical setup in Meta Business Manager.",                                           youtubeUrl: "https://www.youtube.com/watch?v=q_PsIjZl6e4" },
      { order: 37, category: "UGC & Creator Management",   title: "The $100 Ad I'd Run If I Had to Start From Scratch",                     description: "End-to-end campaign on a tight budget: goal setting, format selection, Reddit research, CapCut/Canva production.",                                   youtubeUrl: "https://www.youtube.com/watch?v=-4Y4Rb770uE" },
      { order: 38, category: "UGC & Creator Management",   title: "These Are THE BEST ADS Of The YEAR (Copy Them)",                         description: "Analysis of the year's best ads through the lens of hooks, social proof, and organic feel.",                                                          youtubeUrl: "https://www.youtube.com/watch?v=W1PADr1kjGk" },
      { order: 39, category: "Strategy & Framework",       title: "Copy Headway's $100M+ Web2App Funnel Strategy (That Converts Like Crazy)", description: "A breakdown of the high-converting web-to-app funnel strategy behind Headway's $100M+ growth.",                                                      youtubeUrl: "https://www.youtube.com/watch?v=ELt0hjABIqY" },
      { order: 40, category: "AI-Powered Ad Creation",     title: "This AI Creative Company is INSANE",                                      description: "An inside look at an AI-native creative company pushing the boundaries of what's possible with AI ad production.",                                     youtubeUrl: "https://www.youtube.com/watch?v=gJrKogm75xg" },
      { order: 41, category: "Strategy & Framework",       title: "Meta's Andromeda & GEM: Clearly Explained",                               description: "A clear explanation of Meta's Andromeda and GEM updates and what they mean for creative strategy and ad targeting.",                                  youtubeUrl: "https://www.youtube.com/watch?v=x1b4h42HTG8" },
    ],
  });

  // People / Channels to Follow
  await prisma.person.createMany({
    data: [
      // Creative Strategy & Ad Creatives
      {
        order: 1,
        name: "Fraser Cottrell",
        description: "Meta ad creatives, hook strategies, static ads, UGC frameworks.",
        url: "https://www.youtube.com/@FraserCottrell",
        platform: "youtube",
        category: "Creative Strategy & Ad Creatives",
      },
      {
        order: 2,
        name: "Dara Denney",
        description: "Creative strategy, Facebook/Meta ads, data-driven creative analysis.",
        url: "https://www.youtube.com/@DaraDenney",
        platform: "youtube",
        category: "Creative Strategy & Ad Creatives",
      },
      {
        order: 3,
        name: "Alex Greifeld",
        description: "DTC creative strategy, testing & iteration, data-driven growth.",
        url: "https://linkedin.com/in/alexandra-greifeld",
        platform: "linkedin",
        category: "Creative Strategy & Ad Creatives",
      },
      {
        order: 4,
        name: "Joanna Wiebe",
        description: "Conversion copywriting, founder of Copyhackers — essential reading for any strategist.",
        url: "https://x.com/copyhackers",
        platform: "twitter",
        category: "Creative Strategy & Ad Creatives",
      },
      {
        order: 5,
        name: "Harry Dry",
        description: "Marketing Examples — bite-sized breakdowns of the world's best marketing campaigns.",
        url: "https://x.com/harrydry",
        platform: "twitter",
        category: "Creative Strategy & Ad Creatives",
      },
      {
        order: 6,
        name: "Romain Torres",
        description: "AI-powered UGC production, founder of Arcads.",
        url: "https://linkedin.com/in/romain-torres-arcads",
        platform: "linkedin",
        category: "Creative Strategy & Ad Creatives",
      },
      {
        order: 7,
        name: "Marcus Burke",
        description: "Paid social, Meta ad strategy, creative testing frameworks.",
        url: "https://linkedin.com/in/marcusburke",
        platform: "linkedin",
        category: "Creative Strategy & Ad Creatives",
      },
      // Mobile User Acquisition & Performance Marketing
      {
        order: 8,
        name: "Kirill Makarov",
        description: "Mobile UA, paid acquisition, app growth strategy.",
        url: "https://linkedin.com/in/kmakarof",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
      },
      {
        order: 9,
        name: "Vasyl Sergiienko",
        description: "Mobile UA, Meta & TikTok ads, app marketing.",
        url: "https://linkedin.com/in/vasyl-sergienko",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
      },
      {
        order: 10,
        name: "Eric Seufert",
        description: "Mobile ad tech, platform dynamics (ATT, privacy), sharp takes on the ad ecosystem via Mobile Dev Memo.",
        url: "https://x.com/eric_seufert",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
      },
      {
        order: 11,
        name: "Shamanth Rao",
        description: "Mobile UA strategy, founder of RocketShip HQ, host of \"The Mobile User Acquisition Show\" podcast.",
        url: "https://linkedin.com/in/shamanthrao",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
      },
      {
        order: 12,
        name: "Thomas Petit",
        description: "Independent mobile growth consultant, UA & subscription app specialist.",
        url: "https://x.com/Thomasbcn",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
      },
    ],
  });

  console.log("✅ Database seeded successfully!");
  console.log(`  • ${await prisma.user.count()} users (admin: admin@company.com/admin123, örnek: alex@company.com/alex123)`);
  console.log(`  • ${await prisma.chapter.count()} chapters`);
  console.log(`  • ${await prisma.lesson.count()} lessons`);
  console.log(`  • ${await prisma.quiz.count()} quizzes`);
  console.log(`  • ${await prisma.quizQuestion.count()} quiz questions`);
  console.log(`  • ${await prisma.resource.count()} resources`);
  console.log(`  • ${await prisma.person.count()} people to follow`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

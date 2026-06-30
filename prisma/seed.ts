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

  // ── Growth Manager Chapters ────────────────────────────────────────────────

  // GM Chapter 1
  const gmChapter1 = await prisma.chapter.create({
    data: {
      order: 1,
      slug: "gm-growth-mindset-subscription-fundamentals",
      title: "Growth Mindset & Subscription App Fundamentals",
      description: "Understand the startup mindset shift, the subscription business model, and the core financial metrics that drive every growth decision.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "growth-mindset-startup-vs-corporate",
            title: "Growth Mindset & Startup vs Corporate Culture",
            content: `## Growth Mindset & Startup vs Corporate Culture

Before diving into funnels, metrics, or ad platforms, there is one shift that matters more than any technical skill: how you think and how you work.

Large organizations and early-stage startups operate on fundamentally different principles. The rules that made you successful in a corporate environment can quietly work against you here — not because they are wrong, but because the context has changed.

## The Core Difference: Certainty vs Speed

In a corporate environment, the system rewards certainty. You gather requirements, align stakeholders, document decisions, run approvals, and then execute. Moving carefully reduces risk. Mistakes are costly because they affect large systems, large teams, and sometimes regulatory obligations.

In a startup, the system rewards speed of learning. You form a hypothesis, test it quickly, read the result, and move on. The biggest risk is not making a mistake — it is spending three weeks preparing a perfect plan for something that turns out to be the wrong problem entirely.

This is not a minor adjustment. It is a different operating system.

> The goal is not to be right. The goal is to find out what is right, as fast as possible.

## What Changes in Practice

**Data will never be perfect — and that is fine.** In banking or telecoms, data integrity is a compliance requirement. Here, dashboards will sometimes have gaps, attribution will be imperfect, and numbers will occasionally conflict. Your job is not to wait for clean data. It is to make the best decision you can with the data available, move, and correct course when new information arrives.

**You will not always be given a task.** In a corporate role, work comes to you through a structured backlog or a manager's request. Here, you are expected to look at the business, identify what is broken or underperforming, and propose what to do about it — without being asked.

**Speed of iteration beats depth of preparation.** A well-structured 10-page analysis delivered in two weeks is less valuable than a clear one-page hypothesis tested in two days.

**Ownership means the outcome, not the task.** When a metric is not moving, the work is not done. Keep going until it moves, or until you have a clear and evidence-based reason why it cannot.

## Corporate Reflex vs Startup Alternative

| Corporate Reflex | Startup Alternative |
|---|---|
| "I need more data before I can recommend anything." | "Here is my best hypothesis based on what we have. Let's test it." |
| "This needs sign-off from three people before we proceed." | "I'll move forward and flag if something unexpected comes up." |
| "The brief wasn't clear enough for me to start." | "I'll make assumptions explicit, start, and align as I go." |
| "I delivered what was asked of me." | "The metric didn't move — what else can I try?" |

## Key Takeaways

**Move fast and correct.** A decision made today with 70% of the information is almost always better than a decision made next week with 90%. The remaining 10% rarely changes the outcome, but the delay always has a cost.

**Find the problem, don't wait for it.** Your value is not measured by how well you execute assigned tasks. It is measured by whether you noticed the right things, asked the right questions, and took action before being asked.

**Own the outcome.** When a metric is not moving, the work is not done.`,
          },
          {
            order: 2,
            slug: "subscription-app-business-fundamentals",
            title: "Subscription App Business Fundamentals",
            content: `## Subscription App Business Fundamentals

The business model of a subscription app is fundamentally different from e-commerce, gaming, or traditional software sales. In e-commerce, you optimize for a single transaction. In a subscription business, the initial transaction is just the beginning of the relationship.

## The Renewal Economy

The core engine of a subscription business is recurring revenue. When a user subscribes, they are not buying a product outright; they are renting access to value over time.

Our financial health is not determined by how many people download the app today, but by how many people continue to pay for it month after month, or year after year.

If you spend $10 to acquire a user, and they pay $5 for their first month, you are losing money on day one. You only become profitable if that user stays subscribed for month three and beyond. This is why **retention is the ultimate metric** in a subscription business. A high acquisition rate with a high churn rate is a leaky bucket — you will eventually run out of money to buy new users.

## The Growth Funnel

Every step in the user journey is an opportunity for optimization:

| Stage | What Happens | Key Question |
|---|---|---|
| Impression | User sees our ad on Meta or TikTok. | Is the creative hook strong enough? |
| Install | User downloads the app from the App Store. | Does the App Store page build trust? |
| Onboarding | User opens the app and answers initial questions. | Are we demonstrating value quickly? |
| Paywall | User is presented with subscription options. | Is the pricing clear and compelling? |
| Trial Started | User begins a free trial. | Did they commit to exploring the app? |
| Trial Converted | Trial ends, user pays for the first period. | Did they find the "Aha! Moment" during the trial? |
| Renewal | User stays subscribed for the next period. | Is the app providing ongoing value? |

As a Growth Manager, your job is to identify which step in this funnel is the current bottleneck, and run experiments to widen it.

## The "Aha! Moment"

The "Aha! Moment" is the exact point in the user journey where they suddenly understand the core value of the product. It is the moment they say, "Oh, I get it, this is why I need this."

In a subscription app, if a user does not experience the Aha! Moment during their free trial, they will not convert to a paid subscription. A significant part of your role involves analyzing product analytics to determine what actions correlate with high conversion, and then redesigning the onboarding flow to push users toward those actions faster.`,
          },
          {
            order: 3,
            slug: "monetization-ltv-roas-paywall",
            title: "Monetization — LTV, ROAS & Paywall Strategy",
            content: `## Monetization — LTV, ROAS & Paywall Strategy

To make decisions about where to spend money and how to price our product, we rely on a specific set of financial metrics.

## LTV (Lifetime Value)

LTV is the total amount of revenue we expect a single user to generate over their entire relationship with our app. It is a predictive metric, calculated based on historical retention data.

If a user pays $10/month and stays for an average of 6 months, their LTV is **$60**.

LTV is the ceiling for how much we can spend to acquire a user. If LTV is $60, and we spend $70 to acquire them, the business is unsustainable.

## CAC (Customer Acquisition Cost)

CAC is the total cost of acquiring a new paying subscriber. It includes ad spend, agency fees, and sometimes the cost of producing creatives.

The relationship between LTV and CAC is the pulse of the business. A healthy subscription app typically aims for an **LTV:CAC ratio of 3:1 or higher**. This means that for every $1 spent on marketing, the company expects to make $3 in lifetime revenue.

## ROAS (Return on Ad Spend)

While LTV looks at the long-term value, ROAS measures the immediate efficiency of our advertising campaigns:

> ROAS = (Revenue from Ad Campaign / Cost of Ad Campaign) × 100

If we spend $1,000 on a Meta campaign and it generates $1,500 in revenue, the ROAS is 150% (or 1.5x).

In subscription apps, we often look at **Day 0 ROAS** (revenue generated on the exact day the user installed) and **Day 30 ROAS** (revenue generated after the first month). Day 0 ROAS is critical for cash flow, as it dictates how quickly we can reinvest money back into ads.

## Paywall Strategy

The paywall is the single most important screen in the app. Optimizing the paywall can have a more immediate impact on revenue than any other product change.

Key elements of a successful paywall strategy:

**Pricing Psychology:** Showing a yearly subscription as "$4.99/month, billed annually at $59.99" is often more effective than simply stating "$59.99/year".

**Trial Length:** Offering a 3-day vs 7-day vs 14-day trial changes the conversion dynamics. A shorter trial forces a faster decision, while a longer trial gives more time to build habits.

**Social Proof:** Displaying reviews, ratings, or "Join 100,000+ users" on the paywall builds trust at the moment of purchase.

**Clarity of Value:** The paywall must clearly articulate what features are locked behind the subscription. Vague promises lead to high drop-offs.

## Hands-on Task

Log into Metabase. Find the dashboard tracking our core financial metrics. Identify the average CAC and LTV for the last 30 days. Calculate the current LTV:CAC ratio. Is it healthy based on the 3:1 benchmark? Prepare a one-paragraph summary of your findings.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: gmChapter1.id,
      title: "Chapter 1 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the fundamental difference between how a startup and a large corporation measure success?",
            options: JSON.stringify([
              "Startups focus on headcount growth; corporations focus on revenue.",
              "Startups reward speed of learning and iteration; corporations reward careful execution within a defined system.",
              "Startups always have more data available; corporations rely on intuition.",
              "Startups require formal approval for every decision; corporations do not.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "If a user pays $8/month and stays subscribed for an average of 5 months, what is their LTV?",
            options: JSON.stringify([
              "$8",
              "$13",
              "$40",
              "$5",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "What does a healthy LTV:CAC ratio of 3:1 mean for a subscription app?",
            options: JSON.stringify([
              "For every $3 spent on marketing, the company makes $1 in lifetime revenue.",
              "The company needs 3 months to recover its acquisition costs.",
              "For every $1 spent on marketing, the company expects to earn $3 in lifetime revenue.",
              "The company spends 3x more on product development than on marketing.",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // GM Chapter 2
  const gmChapter2 = await prisma.chapter.create({
    data: {
      order: 2,
      slug: "gm-data-analytics-attribution",
      title: "Data Analytics & Attribution",
      description: "Master Amplitude for product analytics, Metabase for business intelligence, and AppsFlyer for mobile attribution in the post-ATT world.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "product-analytics-amplitude",
            title: "Product Analytics — Amplitude",
            content: `## Product Analytics — Amplitude

Data is the foundation of every decision a Growth Manager makes. While financial data tells us how much money we are making, product analytics tells us why we are making it (or why we are not). For product analytics, our primary tool is **Amplitude**.

## Event-Based Analytics

Unlike traditional web analytics (like Google Analytics) which focus on page views and sessions, Amplitude is an **event-based platform**. An "event" is any distinct action a user takes inside the app.

Examples of events:
- \`App_Opened\`
- \`Onboarding_Started\`
- \`Paywall_Viewed\`
- \`Subscription_Purchased\`
- \`Workout_Completed\`

Every event carries **properties** (metadata). For example, the \`Subscription_Purchased\` event might have properties like \`Plan_Type\` (Annual/Monthly) or \`Price\` ($59.99). Understanding this structure is crucial for building accurate reports.

## Funnel Analysis

A Funnel chart in Amplitude shows the conversion rate across a defined sequence of events. It answers the question: **"Where are we losing users?"**

If you build a funnel from \`App_Installed → Onboarding_Completed → Paywall_Viewed → Trial_Started\`, Amplitude will show you the exact percentage of users who drop off at each step. Identifying the step with the steepest drop-off tells you exactly where to focus your optimization efforts.

## Cohort Analysis

A cohort is a group of users who share a common characteristic or experience within a defined time period. For example:
- "Users who installed the app in January" → an **acquisition cohort**
- "Users who completed their first workout" → a **behavioral cohort**

Cohort analysis allows you to compare different groups. Do users who install via TikTok retain better than users who install via Meta? Do users who complete the onboarding quiz convert to paid subscriptions at a higher rate than those who skip it?

## Retention Charts

Retention charts show how often users return to the app after their initial use. The classic "Retention Curve" typically drops sharply in the first few days and then levels off. If the curve never levels off and eventually hits zero, the product has a fundamental retention problem that no amount of marketing can fix.`,
          },
          {
            order: 2,
            slug: "business-intelligence-metabase",
            title: "Business Intelligence — Metabase",
            content: `## Business Intelligence — Metabase

While Amplitude is for understanding user behavior, **Metabase** is our Business Intelligence (BI) tool, used for understanding the financial and operational health of the company.

## The Role of Metabase

Metabase connects directly to our underlying databases. It is where we track the metrics that matter to the executive team and investors: Revenue, Active Subscribers, Churn Rate, and overall CAC/LTV.

Think of it this way:
- **Amplitude** = the micro view (what did user ID 12345 click on?)
- **Metabase** = the macro view (how much revenue did we generate in Q3?)

## Visual Query Builder vs SQL

Metabase offers a visual interface that allows you to build complex reports without writing code. You can filter, group, and aggregate data using dropdown menus.

However, if you're comfortable with SQL, you can write raw queries directly against the database to create highly customized dashboards.

## Key Dashboards to Master

When you first log into Metabase, focus on understanding these core dashboards:

**Executive Summary:** High-level metrics like MRR (Monthly Recurring Revenue), ARR (Annual Recurring Revenue), and total active subscribers.

**Marketing Performance:** Spend, CAC, and ROAS broken down by channel and campaign.

**Subscription Health:** Trial conversion rates, renewal rates, and churn analysis.

Your goal is not just to read these dashboards, but to be able to **identify anomalies**. If MRR suddenly dips on a Tuesday, you need to know how to drill down into the data to find out why.`,
          },
          {
            order: 3,
            slug: "mobile-attribution-mmp",
            title: "Mobile Attribution & MMP (AppsFlyer, Adapty)",
            content: `## Mobile Attribution & MMP (AppsFlyer, Adapty)

If a user clicks an ad on Facebook, installs the app, and buys a subscription three days later, how do we know that the Facebook ad deserves the credit? This is the problem of **attribution**.

## The Role of an MMP

A **Mobile Measurement Partner (MMP)**, such as AppsFlyer, acts as an independent referee between the app and the ad networks.

When a user clicks an ad, the ad network sends a signal to the MMP. When the user installs the app, the MMP's SDK inside the app sends a signal back. The MMP matches the click to the install and attributes the conversion to the correct campaign.

This allows us to see exactly which ads, ad sets, and campaigns are driving the most valuable users, enabling us to allocate our budget efficiently.

## Adapty and Revenue Tracking

While AppsFlyer handles install attribution, **Adapty** manages the complex logic of in-app purchases and subscriptions across iOS and Android. Adapty tracks when a trial starts, when it converts, when a subscription renews, and when a user cancels.

By integrating Adapty with our MMP and Amplitude, we can connect revenue data back to the original acquisition source. We can say with certainty: "Campaign X generated 1,000 installs, 100 trials, and $5,000 in recurring revenue."

## The Post-ATT World and SKAdNetwork (SKAN)

Attribution used to be exact, relying on device identifiers like the **IDFA** (Identifier for Advertisers). In 2021, Apple introduced **App Tracking Transparency (ATT)**, requiring apps to ask users for permission to track them. Most users say no.

This broke traditional attribution. In response, Apple introduced **SKAdNetwork (SKAN)**, a privacy-preserving attribution framework. SKAN provides conversion data, but it is delayed (by 24–48 hours) and aggregated (you cannot tie a conversion to a specific user).

As a Growth Manager, you must understand that iOS attribution is no longer an exact science. It involves probabilistic modeling and signal processing. You will often see discrepancies between what Meta claims it drove and what AppsFlyer reports. Navigating this ambiguity is a core part of modern UA.

## Hands-on Task

Log into Amplitude. Build a funnel chart tracking the journey from \`App_Installed\` to \`Trial_Started\` for the last 14 days. Identify the step with the largest percentage drop-off. Write down two hypotheses for why users are abandoning the app at that specific point.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: gmChapter2.id,
      title: "Chapter 2 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the key difference between Amplitude and Metabase in terms of their purpose?",
            options: JSON.stringify([
              "Amplitude is for mobile apps only; Metabase is for web only.",
              "Amplitude provides micro-level user behavior data; Metabase provides macro-level financial and operational data.",
              "Amplitude handles payments; Metabase handles advertising.",
              "They are identical tools used for the same purpose.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "What is the primary role of a Mobile Measurement Partner (MMP) like AppsFlyer?",
            options: JSON.stringify([
              "To design mobile app user interfaces.",
              "To host the mobile app on servers.",
              "To act as an independent referee that attributes conversions to the correct ad campaign.",
              "To manage user account passwords and authentication.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "Why are iOS attribution numbers often imprecise after Apple's App Tracking Transparency (ATT) update?",
            options: JSON.stringify([
              "Apple banned all third-party analytics tools entirely.",
              "Most users deny tracking permission, so the privacy-preserving SKAdNetwork provides delayed, aggregated data rather than individual-level tracking.",
              "Amplitude stopped supporting iOS devices.",
              "Android users generate more data, making iOS data unreliable by comparison.",
            ]),
            correctAnswer: 1,
          },
        ],
      },
    },
  });

  // GM Chapter 3
  const gmChapter3 = await prisma.chapter.create({
    data: {
      order: 3,
      slug: "gm-user-acquisition-paid-channels",
      title: "User Acquisition — Paid Channels",
      description: "Learn Meta Ads strategy, conversion measurement in the post-ATT world, web-to-app funnels, and how to run competitive intelligence.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "meta-ads-fundamentals-bid-strategy",
            title: "Meta Ads — Fundamentals, Bid Strategy & Creatives",
            content: `## Meta Ads — Fundamentals, Bid Strategy & Creatives

User Acquisition (UA) is the engine that drives a subscription app's growth. If you cannot acquire users profitably, the business cannot scale. Meta (Facebook and Instagram) remains the most powerful and consistent channel for mobile app UA.

## The Meta Ecosystem and Campaign Structure

Meta's ad platform is structured in three tiers:

- **Campaign:** Defines the objective (e.g., App Installs, App Events).
- **Ad Set:** Defines the targeting (who sees the ad), budget, schedule, and placement.
- **Ad:** The actual creative (video, image, text) the user sees.

A typical structure might involve one Campaign optimizing for "Purchases", containing multiple Ad Sets targeting different broad audiences or lookalikes, each containing 3–5 different Ads to test which creative performs best.

## Bid Strategies

How you tell Meta to spend your money is your **bid strategy**:

**Lowest Cost (Auto-Bidding):** Meta tries to get you the most conversions possible for your budget, regardless of the cost per conversion. Good for volume and learning.

**Cost Cap:** You tell Meta the maximum average cost you are willing to pay for a conversion. Meta will try to get as many conversions as possible while staying under that cap. If it cannot find cheap enough conversions, it will stop spending your budget.

**ROAS Goal (Value Optimization):** You tell Meta to target users who are likely to spend more money, aiming for a specific Return on Ad Spend.

## Creative Fundamentals

In modern UA, targeting is largely automated by Meta's algorithms. The primary lever you have to influence performance is the **creative**.

A strong creative does two things: it grabs attention immediately (the **Hook**), and it qualifies the user — ensuring that the people who click are actually interested in the product, not just entertained by the video.

You will work closely with the Creative Strategy team to develop hypotheses, script videos, and test different angles. A winning creative can cut your acquisition costs in half overnight.`,
          },
          {
            order: 2,
            slug: "meta-ads-conversion-measurement",
            title: "Meta Ads — Conversion Measurement & Signal Processing",
            content: `## Meta Ads — Conversion Measurement & Signal Processing

Running ads is only half the battle; measuring their impact accurately is the other half. As discussed in Chapter 2, Apple's ATT framework fundamentally changed how measurement works on iOS.

## The Importance of Signals

Meta's algorithm is a machine learning model. It needs data (signals) to learn who is most likely to convert. If you do not feed it high-quality signals, it cannot optimize your campaigns.

Signals include events like app installs, trial starts, and purchases. The more data Meta receives about these events, the better it becomes at finding similar users.

## Conversions API (CAPI) and Server-to-Server Tracking

Historically, the Meta Pixel or the Facebook SDK inside an app sent data directly from the user's device to Meta. With ad blockers and privacy restrictions, device-side tracking is increasingly unreliable.

The solution is the **Conversions API (CAPI)**. Instead of relying on the user's device, CAPI allows our servers to send conversion data directly to Meta's servers. This ensures that even if a user blocks tracking on their phone, we can still securely pass the conversion data back to Meta to optimize our campaigns.

## Signal Loss and Data Discrepancies

Because of SKAdNetwork (SKAN) on iOS, you will experience "signal loss." Meta will not receive data for every single conversion.

Consequently, the numbers you see in the Meta Ads Manager will almost never match the numbers you see in AppsFlyer or Metabase. Meta relies heavily on statistical modeling to estimate the conversions it cannot track directly.

Your job is not to force the numbers to match perfectly. Your job is to:
1. Understand the baseline discrepancy
2. Look for directional trends
3. Use a "Source of Truth" (usually AppsFlyer or Metabase) to make final budget decisions`,
          },
          {
            order: 3,
            slug: "web-to-app-funnels",
            title: "Web-to-App Funnels & Web Subscriptions",
            content: `## Web-to-App Funnels & Web Subscriptions

While the App Store and Google Play are the traditional entry points for mobile apps, relying solely on them has two major drawbacks:
- **The 30% Tax:** Apple and Google take a 15–30% cut of all subscription revenue generated through their platforms.
- **Limited Tracking:** App store policies restrict how much data you can collect during the purchase process.

To bypass these limitations, many subscription apps are moving toward **Web-to-App Funnels**.

## How Web-to-App Works

Instead of sending ad traffic directly to the App Store, we send users to a web landing page:

1. User clicks an ad on Instagram.
2. User lands on our mobile website.
3. User completes an onboarding quiz on the web.
4. User purchases the subscription via Stripe on the web.
5. User is prompted to download the app and log in.

## The Advantages

**Higher Margins:** Stripe's payment processing fees (~3%) are significantly lower than Apple/Google's 30% cut.

**Better Measurement:** Because the transaction happens on the web, we can use traditional tracking pixels and CAPI, completely bypassing Apple's SKAdNetwork limitations. This provides near-100% accurate attribution.

**More Control:** We control the entire checkout experience, allowing for more aggressive A/B testing of pricing, upsells, and paywall designs without waiting for app store reviews.

## The Disadvantages

The main challenge of web-to-app is the "friction" of forcing users to download the app after they have already paid. Some users will pay on the web but never install the app, leading to high early churn. **Optimizing the transition from web checkout to app install is a critical focus area.**`,
          },
          {
            order: 4,
            slug: "competitive-analysis-market-intelligence",
            title: "Competitive Analysis & Market Intelligence",
            content: `## Competitive Analysis & Market Intelligence

Growth does not happen in a vacuum. You are competing for the same users and the same ad inventory as dozens of other apps in your category.

## Why Monitor Competitors?

Monitoring competitors is not about copying them; it is about understanding the market baseline and identifying gaps.

**Creative Intelligence:** What angles are competitors testing heavily? If a competitor runs a specific ad format for three months, it is likely profitable for them.

**Pricing Strategy:** Are competitors moving toward weekly, monthly, or annual plans? Are they offering deep discounts?

**Feature Positioning:** How are they positioning their app in the App Store? What features are they highlighting in their screenshots?

## Tools of the Trade

We use tools like **Sensor Tower** and **Data.ai** to estimate competitor revenue, download volumes, and keyword rankings.

For creative intelligence, the **Meta Ad Library** and **TikTok Creative Center** are invaluable. They allow you to see every active ad a competitor is currently running.

## The Proactive Growth Manager

A strong Growth Manager does not wait for performance to drop before looking at the market. You should establish a **routine of checking competitor activity weekly**. If a competitor suddenly spikes in the App Store rankings, you need to investigate why and determine if there is a strategy we need to counter or adapt.

## Hands-on Task

Use the Meta Ad Library to search for three direct competitors in our app category. Review their active ads. Identify the primary "hook" or angle they are using in their most frequently run videos. Prepare a short brief comparing their creative strategy to ours. Are they highlighting a pain point we are ignoring?`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: gmChapter3.id,
      title: "Chapter 3 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the main advantage of a Web-to-App funnel over a direct App Store campaign?",
            options: JSON.stringify([
              "It guarantees a higher number of downloads.",
              "It bypasses Apple/Google's 15–30% revenue cut and provides better attribution data.",
              "It is required by Apple's App Store guidelines.",
              "It eliminates the need for a mobile app entirely.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "What does a 'Cost Cap' bid strategy tell Meta to do?",
            options: JSON.stringify([
              "Spend the entire budget as fast as possible for maximum reach.",
              "Only show ads to the cheapest possible audience segments.",
              "Acquire conversions while staying under a specified maximum average cost per conversion.",
              "Automatically lower bids whenever a competitor outbids you.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "What is the primary challenge of a Web-to-App funnel that growth managers must optimize?",
            options: JSON.stringify([
              "Web pages load slower than the App Store on mobile devices.",
              "Stripe charges higher processing fees than Apple and Google.",
              "The friction of requiring users to download the app after they have already paid on the web.",
              "Google Play does not support web-based subscription purchases.",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // GM Chapter 4
  const gmChapter4 = await prisma.chapter.create({
    data: {
      order: 4,
      slug: "gm-onboarding-funnel-optimization",
      title: "Onboarding & Funnel Optimization",
      description: "Understand the psychology behind high-converting onboarding flows and build a rigorous A/B testing process to improve conversion rates.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "app-onboarding-user-psychology",
            title: "App Onboarding & User Psychology",
            content: `## App Onboarding & User Psychology

Getting a user to download the app is expensive. If they open it once, get confused, and delete it, that marketing spend is entirely wasted. **The onboarding flow is the bridge between acquisition and monetization.**

## The Purpose of Onboarding

Onboarding is not a tutorial on how to use the app's buttons. Its purpose is to **sell the value of the product** and guide the user to the "Aha! Moment" as quickly as possible.

A great onboarding flow achieves three psychological goals:

**Builds Trust:** It looks professional, asks relevant questions, and assures the user their data is safe.

**Creates Commitment:** By asking the user to invest time (e.g., answering a quiz about their goals), they become psychologically invested in seeing the result. This is known as the **"IKEA Effect"** — we value things more when we help build them.

**Personalizes the Experience:** It uses the user's inputs to tailor the final pitch. If a user says their goal is "weight loss," the paywall should highlight weight loss, not muscle gain.

## Ad-to-Funnel Consistency

A common mistake is a disconnect between the ad and the app. If a Meta ad promises a "7-day meditation challenge for anxiety," but the app onboarding immediately asks about "fitness goals," the user will feel misled and drop off.

The message, visuals, and promise must remain consistent from the first ad impression all the way to the paywall.

## Touching Pain Points

Effective onboarding reminds the user why they downloaded the app in the first place. It gently agitates their pain point (e.g., "Struggling to sleep through the night?") and immediately presents the app as the tailored solution.`,
          },
          {
            order: 2,
            slug: "ab-testing-cro",
            title: "A/B Testing & Conversion Rate Optimization (CRO)",
            content: `## A/B Testing & Conversion Rate Optimization (CRO)

You cannot guess what will improve onboarding or paywall conversion rates. You have to test it. **A/B testing is the scientific method applied to product growth.**

## The Logic of Variable Isolation

An A/B test compares two versions of a screen (Version A and Version B) to see which performs better.

The golden rule of A/B testing is **variable isolation**: you must only change one thing at a time. If you change the headline, the button color, and the price all in the same test, and conversion goes up, you will not know which change caused the improvement.

## Statistical Significance

If Version A gets 10 conversions out of 100 users (10%), and Version B gets 12 conversions out of 100 users (12%), is Version B better?

Not necessarily. With such a small sample size, the difference could be pure chance. **Statistical significance** is a mathematical calculation that tells you how confident you can be that the result is real and not a fluke. We typically aim for **95% statistical significance** before declaring a winner.

Until a test reaches significance, you must resist the urge to stop it early, even if one version looks like it is winning.

## Prioritizing Tests with the ICE Framework

You will always have more ideas for tests than traffic to run them. Prioritization is key. The **ICE framework** scores each test on three dimensions:

- **Impact:** If this test works, how big of a difference will it make to revenue?
- **Confidence:** How sure are we that this hypothesis is correct? (Based on data or past tests)
- **Ease:** How much engineering effort is required to build this test?

A test with high potential impact, high confidence, and low engineering effort should be run immediately.

## Hands-on Task

Review the current app onboarding flow step-by-step. Identify one screen where you suspect users might be dropping off or experiencing friction. Design an A/B test to fix it. Write down:
- The Hypothesis (e.g., "If we change X to Y, then Z will happen because...")
- The exact variable you will isolate.
- The primary metric you will use to measure success.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: gmChapter4.id,
      title: "Chapter 4 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the 'IKEA Effect' in the context of app onboarding?",
            options: JSON.stringify([
              "Making the app interface look like an IKEA product catalog.",
              "The psychological phenomenon where users value things more when they actively help build them — like completing an onboarding quiz.",
              "Building a flat-pack feature set that users assemble themselves.",
              "Using minimalist Scandinavian design principles in the UI.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "What does 'statistical significance' tell you in an A/B test?",
            options: JSON.stringify([
              "Which version looks better aesthetically to the design team.",
              "The total revenue generated by each version during the test.",
              "How confident you can be that the observed result is real and not due to random chance.",
              "Whether the test should be stopped after exactly one day.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "According to the ICE framework, what three dimensions are used to prioritize A/B tests?",
            options: JSON.stringify([
              "Impressions, Clicks, and Engagement",
              "Investment, Cost, and Expected Return",
              "Impact, Confidence, and Ease",
              "Insight, Creative, and Execution",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // GM Chapter 5
  const gmChapter5 = await prisma.chapter.create({
    data: {
      order: 5,
      slug: "gm-organic-growth-retention",
      title: "Organic Growth & Retention",
      description: "Build sustainable organic growth through ASO, leverage Apple Search Ads for high-intent users, and fight churn through lifecycle marketing.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "aso-app-store-optimization",
            title: "ASO (App Store Optimization)",
            content: `## ASO (App Store Optimization)

While paid acquisition (Meta, TikTok) is crucial for scaling, **organic acquisition is the foundation of a sustainable business**. Organic users cost nothing to acquire and typically have higher retention rates. App Store Optimization (ASO) is how we maximize organic traffic.

## What is ASO?

ASO is the SEO (Search Engine Optimization) of the mobile app world. It is the process of improving an app's visibility in the Apple App Store and Google Play Store.

The goal is twofold:
- **Discoverability:** Ranking higher when users search for specific keywords (e.g., "workout tracker" or "meditation app").
- **Conversion:** Persuading the user to download the app once they land on our store page.

## The Levers of ASO

**App Title & Subtitle:** These carry the most weight in search algorithms. They must include high-volume, relevant keywords while still sounding natural to a human reader.

**Keyword Field (iOS):** A hidden field where we input specific terms we want to rank for.

**Screenshots & Video:** These do not affect search rankings directly, but they are the biggest drivers of conversion rate. They must clearly communicate the app's value proposition within the first 3 seconds.

**Ratings & Reviews:** Apps with higher ratings rank better and convert better. Prompting users to rate the app at the right moment (e.g., right after they complete a successful action) is a critical growth tactic.

ASO is not a "set it and forget it" task. It requires **continuous monitoring** of keyword rankings, competitor updates, and A/B testing of screenshots.`,
          },
          {
            order: 2,
            slug: "apple-search-ads-organic-synergy",
            title: "Apple Search Ads (ASA) & Organic Synergy",
            content: `## Apple Search Ads (ASA) & Organic Synergy

**Apple Search Ads (ASA)** allows us to bid on keywords so our app appears at the top of the search results in the App Store.

## The Power of Intent

Unlike Meta or TikTok ads, which interrupt a user who is scrolling through their feed (low intent), ASA targets users who are **actively searching for a solution** (high intent). If someone searches for "back pain relief exercises," they are highly motivated to download an app that solves that problem right now.

Because of this high intent, ASA often yields the **highest trial conversion rates and LTV** of any acquisition channel.

## The Synergy with ASO

ASA and ASO work together in a reinforcing loop:

- Running ASA campaigns helps us discover which keywords actually drive paying subscribers, not just cheap installs. We can then integrate those proven keywords into our organic ASO strategy.
- Conversely, a strong organic ranking and high App Store conversion rate (driven by good ASO) can lower our ASA acquisition costs, as Apple rewards relevant, high-converting apps.

The best growth managers treat ASA and ASO as a unified strategy, not two separate channels.`,
          },
          {
            order: 3,
            slug: "retention-churn-management",
            title: "Retention & Churn Management",
            content: `## Retention & Churn Management

In Chapter 1, we established that retention is the ultimate metric in a subscription business. If users do not stay, the business fails. Managing retention means actively fighting **churn** (the rate at which users cancel their subscriptions).

## Voluntary vs. Involuntary Churn

Churn falls into two distinct categories, and they require completely different solutions:

**Voluntary Churn (Active Cancellation):** The user actively goes into their settings and cancels the subscription. They do this because they no longer find value in the product, or they found a cheaper alternative.
- *Solution:* Improve the core product, send re-engagement push notifications, offer personalized content, or provide a "pause" option instead of cancellation.

**Involuntary Churn (Passive Cancellation):** The user wanted to stay subscribed, but the payment failed. This happens due to expired credit cards, insufficient funds, or bank declines.
- *Solution:* Implement **Dunning Management** — automatically retrying the payment card at optimal times, sending emails prompting the user to update their billing info, and offering grace periods.

## Lifecycle Marketing and CRM

We do not just wait for users to churn; we proactively manage their lifecycle:

**Trial to Paid:** During the 7-day free trial, we send targeted emails and push notifications highlighting premium features to ensure they convert.

**Engagement:** If a user hasn't opened the app in 5 days, an automated push notification reminds them to return.

**Win-back:** If a user cancels, we can target them 30 days later with a discounted offer to win them back.

## Hands-on Task

Review our current automated email or push notification sequence for users in their Free Trial period. Does the messaging align with the core value proposition of the app? Propose one new email or push notification to be added to the sequence to increase trial-to-paid conversion.`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: gmChapter5.id,
      title: "Chapter 5 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "What is the primary goal of ASO (App Store Optimization)?",
            options: JSON.stringify([
              "To improve the app's loading speed and reduce crashes.",
              "To maximize organic traffic by improving discoverability in search results and conversion rate on the store page.",
              "To reduce the app's file size for faster downloads.",
              "To prevent competitors from copying the app's features.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "Why does Apple Search Ads (ASA) typically yield higher trial conversion rates than Meta ads?",
            options: JSON.stringify([
              "ASA is significantly cheaper per install than Meta ads.",
              "ASA users are exclusively iPhone owners who spend more money.",
              "ASA targets users who are actively searching for a solution right now (high intent), not passively scrolling a feed.",
              "Meta ads are restricted from targeting app installs in most countries.",
            ]),
            correctAnswer: 2,
          },
          {
            order: 3,
            question: "What is 'involuntary churn' and how is it different from voluntary churn?",
            options: JSON.stringify([
              "Involuntary churn is when a user cancels; voluntary churn is when a payment fails.",
              "They are the same thing — both refer to users who stop paying.",
              "Involuntary churn occurs when a payment fails (e.g., expired card); voluntary churn is when a user actively cancels their subscription.",
              "Involuntary churn only applies to annual subscribers who forget they signed up.",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // GM Chapter 6
  const gmChapter6 = await prisma.chapter.create({
    data: {
      order: 6,
      slug: "gm-operations-tools",
      title: "Operations & Tools",
      description: "Understand the payment infrastructure (Stripe, Xero), customer support as a growth channel, and how AI workflows accelerate your output.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "payments-subscription-management",
            title: "Payments & Subscription Management",
            content: `## Payments & Subscription Management

While the App Store and Google Play handle a large portion of our transactions, our web-to-app funnels rely on direct payment processing. Understanding how this infrastructure works is essential for managing revenue and reducing involuntary churn.

## Stripe: The Engine of Web Subscriptions

We use **Stripe** as our primary payment gateway for web subscriptions. Stripe handles the secure capture of credit card details, the processing of the transaction, and the recurring billing logic.

Key concepts in Stripe you need to understand:

**Subscription Management:** How plans are created, upgraded, downgraded, and canceled.

**Fees:** Stripe charges a processing fee (typically around 2.9% + 30¢ per successful card charge). This must be factored into your LTV and CAC calculations.

**Disputes and Chargebacks:** Sometimes users forget they subscribed and ask their bank to reverse the charge. This is a "chargeback." Stripe charges a penalty fee for every chargeback, and if our chargeback rate gets too high, we risk losing our merchant account. Managing customer expectations and providing easy cancellation paths are critical to keeping dispute rates low.

## Xero and Financial Operations

**Xero** is our accounting software. While you will not be an accountant, you need to understand how the revenue generated in Stripe and the App Stores flows into Xero for official financial reporting. Ensuring that marketing spend data aligns with recognized revenue is a shared responsibility between Growth and Finance.`,
          },
          {
            order: 2,
            slug: "customer-support-success-workflows",
            title: "Customer Support & Success Workflows",
            content: `## Customer Support & Success Workflows

Growth is not just about acquiring users; it is about keeping them happy. **Customer Support is often the first line of defense against churn** and a goldmine of product insights.

## Support as a Growth Channel

When a user submits a support ticket, they are experiencing friction. How we handle that friction determines whether they churn or become a loyal advocate.

**Refund Requests:** A user asking for a refund is an opportunity to save the relationship. Can we offer a free month? Can we solve the technical issue they encountered?

**Feature Requests:** If 50 users request the same feature via support tickets, that is a strong signal for the product roadmap.

## Workflows and Automation

As the user base scales, we cannot answer every ticket manually. We rely on workflows:

**Self-Service:** Building robust FAQs and Help Centers so users can solve common problems (like "How do I cancel?") without contacting us.

**Automated Routing:** Using AI or rule-based systems to route urgent technical issues to engineering, while handling basic billing questions automatically.

Your role involves analyzing support ticket data to identify **recurring issues** that are causing drop-offs in the funnel, and working with the product team to eliminate them.`,
          },
          {
            order: 3,
            slug: "moovbuddy-ai-workflows",
            title: "MoovBuddy AI Workflows",
            content: `## MoovBuddy AI Workflows

We leverage Artificial Intelligence not just in our product, but in how we operate as a company. Understanding these internal workflows will make you significantly faster and more effective.

## Internal AI Applications

We use AI to automate repetitive tasks and scale our output without scaling our headcount linearly. Current workflows include:

**AI Content Creation:** Generating variations of ad copy, email subject lines, and blog posts for SEO.

**AI Job Applicant Review:** Parsing resumes and filtering candidates based on predefined criteria.

**AI Podcast Generation:** Converting written content into audio formats for broader distribution.

## The Growth Application

As a Growth Manager, you should constantly be looking for ways to apply AI to your own workflows:
- Can you use ChatGPT to quickly analyze a CSV of user reviews and extract the top three pain points?
- Can you use an image generation tool to mock up ad creative concepts before requesting them from the design team?
- Can you build an automated report that surfaces anomalies in your key metrics every morning?

**The goal is to use AI to increase your iteration speed.**

## Hands-on Task

Log into our customer support platform. Filter the tickets from the last 7 days for the keyword "cancel" or "refund". Read through 10 of these tickets. What is the most common reason users are giving for wanting to leave? How could we address this in the onboarding flow or product experience?`,
          },
        ],
      },
    },
  });

  await prisma.quiz.create({
    data: {
      chapterId: gmChapter6.id,
      title: "Chapter 6 Quiz",
      questions: {
        create: [
          {
            order: 1,
            question: "Why is managing chargebacks a critical concern in Stripe-based subscription businesses?",
            options: JSON.stringify([
              "Chargebacks automatically trigger refunds for all active subscribers.",
              "Too many chargebacks can result in losing the merchant account entirely, plus Stripe charges a penalty fee for each chargeback.",
              "Chargebacks increase Stripe's monthly processing fees for all transactions.",
              "Stripe reports excessive chargebacks directly to the App Store.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 2,
            question: "How can customer support data serve as a valuable growth tool?",
            options: JSON.stringify([
              "By automatically deleting negative reviews before they are published.",
              "By identifying recurring issues (e.g., 50 users requesting the same feature) that signal product roadmap priorities and funnel friction points.",
              "By blocking users who submit more than three support tickets per month.",
              "By raising prices for users who contact support frequently.",
            ]),
            correctAnswer: 1,
          },
          {
            order: 3,
            question: "What is the primary goal of leveraging AI workflows as a Growth Manager?",
            options: JSON.stringify([
              "To replace the entire growth team with autonomous AI agents.",
              "To generate fully autonomous marketing campaigns without any human oversight.",
              "To increase iteration speed by automating repetitive tasks, enabling more experiments in less time.",
              "To avoid hiring any additional team members regardless of business growth.",
            ]),
            correctAnswer: 2,
          },
        ],
      },
    },
  });

  // GM Chapter 7 — 14 structured 1-on-1 sessions with team members (no quiz)
  await prisma.chapter.create({
    data: {
      order: 7,
      slug: "gm-1on1-sessions",
      title: "1-on-1 Sessions with the Team",
      description: "14 structured knowledge-transfer sessions with each team member, covering every key business area from subscription fundamentals to AI workflows.",
      role: "growth-manager",
      lessons: {
        create: [
          {
            order: 1,
            slug: "gm-session-1-subscription-fundamentals",
            title: "Session 1: Subscription App Business Fundamentals — Güner",
            content: `## Session 1: Subscription App Business Fundamentals

**Presenter:** Güner

**Objective:** Establish the foundational mental model of the subscription economy before touching any tool or data.

## Key Topics

**The Renewal Economy:** Why retention matters more than acquisition. The concept of the "leaky bucket" — a high acquisition rate with a high churn rate is unsustainable no matter how much you spend on ads.

**The Growth Funnel:** Walk through the full user journey from Impression to Renewal. What happens at each stage, and why each step matters for the business.

**Our Core Metrics:** A high-level overview of our specific targets for Trial Conversion Rate, Month 1 Retention, and Churn. Where we stand today vs. where we want to be.

**The "Aha! Moment":** What is the core action a user must take in our app to realize its value? How long does it currently take them to get there, and why does that matter?

**Historical Context:** Walk through the key decisions that shaped our current business model. What was the biggest growth unlock we have experienced so far?

## Practical Element

Discuss the historical evolution of our app. Review a before/after comparison of a key metric that improved after a major product or growth decision.`,
          },
          {
            order: 2,
            slug: "gm-session-2-web-to-app",
            title: "Session 2: Web-to-App, Web Subscriptions & Web Funnels — Güner",
            content: `## Session 2: Web-to-App, Web Subscriptions & Web Funnels

**Presenter:** Güner

**Objective:** Understand why we bypass the App Store and how our web funnels operate — this is a critical and distinctive part of our distribution strategy.

## Key Topics

**Why Web-to-App?** The margin advantage (Stripe's ~3% fee vs. Apple's 15–30% cut) and the measurement advantage (bypassing SKAdNetwork entirely for perfect attribution).

**The Web Funnel Architecture:** The full user journey step by step: Ad Click → Landing Page → Quiz → Web Paywall → Stripe Checkout → App Download prompt.

**The Friction Point:** The drop-off that happens after web purchase but before app install. How we currently mitigate this, and what we have tried.

**A/B Testing on Web:** How we run experiments on the web funnel compared to the native app. The key differences in speed and flexibility.

## Practical Element

Go through the live web funnel together as a user. Identify the specific psychological triggers and design choices on the quiz and paywall pages.`,
          },
          {
            order: 3,
            slug: "gm-session-3-metabase",
            title: "Session 3: Business Intelligence & Marketing Analytics (Metabase) — Elif",
            content: `## Session 3: Business Intelligence & Marketing Analytics (Metabase)

**Presenter:** Elif

**Objective:** Understand our financial source of truth and how to pull macro-level reports before diving into behavioral analytics.

## Key Topics

**Data Infrastructure:** How data flows from Stripe, Adapty, and AppsFlyer into our database and then into Metabase. You don't need to understand the engineering, but you need to know where the data comes from and how fresh it is.

**Core Dashboards:** Walk through the 3 most important Metabase dashboards the executive team reviews every week. What each metric means, and what a healthy vs. unhealthy number looks like.

**Calculating LTV & CAC:** The exact Metabase queries or dashboards we use to calculate LTV and CAC. This is the math you will use to evaluate every campaign decision.

**SQL vs. Visual Builder:** How to use the visual query builder for quick questions, and where the complex SQL queries live for deeper analysis.

## Practical Element

Open Metabase and filter the main revenue dashboard to show only revenue from the US market for the last 30 days.`,
          },
          {
            order: 4,
            slug: "gm-session-4-amplitude-firebase",
            title: "Session 4: Product Analytics (Amplitude & Firebase) — Elif",
            content: `## Session 4: Product Analytics (Amplitude & Firebase)

**Presenter:** Elif

**Objective:** Learn how to track user behavior inside the app to identify drop-offs and retention issues.

## Key Topics

**Event Architecture:** Our event taxonomy. The 5 most important events we track, what each event name means, and what properties it carries.

**Amplitude Fundamentals — Three Core Charts:**
- **Funnel Chart:** Build the core onboarding-to-purchase funnel live and see where the biggest drop-off is.
- **Retention Chart:** Read our retention curve and understand what a healthy vs. unhealthy curve looks like.
- **Cohort Analysis:** Compare the behavior of users from two different acquisition channels.

**Firebase vs. Amplitude:** Why we use both. What Firebase is used for specifically (e.g., Crashlytics, basic logging) versus Amplitude (deep behavioral analysis).

## Practical Element

Take the mouse and build a funnel in Amplitude comparing the conversion rate of iOS users vs. Android users.`,
          },
          {
            order: 5,
            slug: "gm-session-5-attribution-mmp",
            title: "Session 5: Mobile Attribution, MMP, Adapty & AppsFlyer — Elif",
            content: `## Session 5: Mobile Attribution, MMP, Adapty & AppsFlyer

**Presenter:** Elif

**Objective:** Understand how we track where our users come from and how we connect revenue back to ad spend.

## Key Topics

**The Basics of Attribution:** The role of an MMP (AppsFlyer) vs. an in-app purchase SDK (Adapty). Why we need both, and how they talk to each other.

**AppsFlyer Walkthrough:** The main dashboard. Where to look to see campaign-level installs. The difference between click-through and view-through attribution.

**Adapty Walkthrough:** How Adapty tracks trial starts, conversions, and renewals. How Adapty communicates with AppsFlyer and Amplitude.

**The Post-ATT Reality:** SKAdNetwork (SKAN) explained simply. How much signal loss we are seeing on iOS, and how we make decisions when AppsFlyer data and Meta data don't match.

**Common Pitfalls:** The most common attribution bugs or data discrepancies we encounter, and how we handle them.

## Practical Element

Open AppsFlyer and trace the journey of one recent successful Meta campaign from impression to attributed install.`,
          },
          {
            order: 6,
            slug: "gm-session-6-meta-measurement",
            title: "Session 6: Meta Ads — Conversion Measurement & Signal Processing — Furkan",
            content: `## Session 6: Meta Ads — Conversion Measurement & Signal Processing

**Presenter:** Furkan

**Objective:** Understand the technical side of how Meta knows a conversion happened — this is the foundation for understanding why our campaigns perform the way they do.

## Key Topics

**The Signal Problem:** Why device-side tracking (Pixels/SDKs) is losing effectiveness due to iOS privacy restrictions and ad blockers.

**Conversions API (CAPI):** How our server sends data back to Meta. Why Event Match Quality is important for campaign performance. What happens to our campaigns when signal quality drops.

**Offline Conversions:** How we handle recurring subscription events (Month 2, Month 3 renewals) and send them back to Meta to optimize for LTV rather than just Day0 revenue.

**Data Discrepancies:** Why Meta Ads Manager numbers will never perfectly match our database, and how to handle that ambiguity in practice when making budget decisions.

## Practical Element

Open Meta Events Manager. Review the health and Event Match Quality of our primary purchase events via CAPI.`,
          },
          {
            order: 7,
            slug: "gm-session-7-meta-creative-strategy",
            title: "Session 7: Meta Ads — Creative Strategy, Fundamentals & Bid Strategy — Damla",
            content: `## Session 7: Meta Ads — Creative Strategy, Fundamentals & Bid Strategy

**Presenter:** Damla

**Objective:** Understand our philosophy on ad creatives, how we structure campaigns, and how we buy media on Meta.

## Key Topics

**Campaign Architecture:** How we structure our Meta accounts. The difference between CBO and ABO, and when we use broad targeting vs. lookalikes.

**Bid Strategies:** When we use lowest cost, cost cap, or value optimization (ROAS bidding). The trade-offs of each approach.

**Creative Philosophy:** What makes a winning ad for our app. The anatomy of our best creatives — the Hook, the Body, and the CTA — and why each element matters.

**Creative Testing Framework:** How we test new concepts without wasting budget. How we decide when to kill an ad and when to scale it.

## Practical Element

Open Meta Ads Manager. Look at the top 3 spending ads of the last 7 days and break down why each one is working.`,
          },
          {
            order: 8,
            slug: "gm-session-8-competitor-analysis",
            title: "Session 8: Competitor Analysis, Market Intelligence & Sensor Tower — Damla",
            content: `## Session 8: Competitor Analysis, Market Intelligence & Sensor Tower

**Presenter:** Damla

**Objective:** Learn how to monitor the market and spot opportunities or threats before they impact our performance.

## Key Topics

**Our Competitor Landscape:** Our top 3 direct competitors. Our unique value proposition compared to each of them.

**Sensor Tower Walkthrough:** How to estimate competitor revenue, download volumes, and keyword rankings. What this data tells us, and what its limitations are.

**Creative Intelligence:** How to use the Meta Ad Library to review competitor ads. What they are testing right now, and what that tells us about what is working in the market.

**Building a Routine:** How often to check competitor activity. What signals should trigger an immediate investigation.

## Practical Element

Pick one competitor. Find their most active ad in the Meta Ad Library and analyze their current positioning strategy together.`,
          },
          {
            order: 9,
            slug: "gm-session-9-monetization",
            title: "Session 9: Monetization — LTV, ROAS & Day0 Revenue — Damla",
            content: `## Session 9: Monetization — LTV, ROAS & Day0 Revenue

**Presenter:** Damla

**Objective:** Understand the financial math that dictates our growth speed and media buying decisions.

## Key Topics

**The Math of Growth:** Our specific LTV:CAC targets. What our payback period is, and why it matters for how aggressively we can spend on ads.

**Day0 Revenue vs. LTV:** Why Day0 revenue is so critical for our cash flow. How Day0 ROAS predicts Day30 ROAS, and how we use this relationship to make campaign decisions.

**Paywall Strategy:** How we price our plans. What A/B tests we have run on the paywall recently, and what the results were.

**Forecasting:** How we project future revenue based on current cohort performance. The model we use.

## Practical Element

Review a recent cohort's performance. See how we project their 6-month LTV based on their Day 7 retention and Day0 revenue data.`,
          },
          {
            order: 10,
            slug: "gm-session-10-onboarding-cro",
            title: "Session 10: Onboarding (App & Web), User Psychology & CRO — Yusuf Kireççi",
            content: `## Session 10: Onboarding (App & Web), User Psychology & CRO

**Presenter:** Yusuf Kireççi

**Objective:** Understand the psychology behind our onboarding flow and how we optimize the path to the paywall.

## Key Topics

**Ad-to-Funnel Consistency:** Why the promise made in the Meta ad must exactly match the first screen of the onboarding. Examples of good and bad consistency from our own campaigns or competitors.

**User Psychology:** How we build trust during onboarding. How we use the "IKEA Effect" — making users invest effort via a quiz — to increase paywall conversion. How we touch pain points effectively.

**Conversion Rate Optimization (CRO):** Our A/B testing framework. How we isolate variables. How we decide what to test next. How we read results without stopping a test too early.

## Practical Element

Review the results of the most recent A/B test run on the onboarding flow or paywall. Discuss together why the winning variant performed better.`,
          },
          {
            order: 11,
            slug: "gm-session-11-asa-aso",
            title: "Session 11: ASA, ASO & Organic Growth — Görkem",
            content: `## Session 11: ASA, ASO & Organic Growth

**Presenter:** Görkem

**Objective:** Understand our organic acquisition strategy and how Apple Search Ads complements paid channels.

## Key Topics

**App Store Optimization (ASO) Basics:** How we choose our keywords. The impact of our title, subtitle, and screenshots on conversion rates. How often we update these.

**Apple Search Ads (ASA):** How we structure our ASA campaigns. The difference between brand, generic, and competitor keyword bidding.

**The Synergy:** How running ASA helps our organic ASO rankings. How we use ASA performance data to improve our organic keyword strategy.

**Historical Context:** What organic growth initiatives we have tried over the last year. What worked, what failed, and why.

## Practical Element

Open App Store Connect. Review the conversion rate of our App Store product page over the last 30 days and identify one element that could be A/B tested.`,
          },
          {
            order: 12,
            slug: "gm-session-12-payments-stripe",
            title: "Session 12: Payments, Stripe, Subscription Management & Xero — Furkan",
            content: `## Session 12: Payments, Stripe, Subscription Management & Xero

**Presenter:** Furkan

**Objective:** Understand the operational backend of how money moves and how involuntary churn happens — this directly impacts the LTV numbers you will work with daily.

## Key Topics

**Stripe Walkthrough:** The Stripe dashboard. How we create products, prices, and coupons. Where we see revenue in real time.

**Subscription Lifecycles:** The difference between active, past due, canceled, and unpaid subscription statuses, and what each means for our revenue reporting.

**Dunning & Involuntary Churn:** What happens when a credit card fails. Our dunning logic — retries, grace periods, and recovery emails — and our current recovery rate.

**Disputes & Chargebacks:** Our current chargeback rate. How we handle disputes to protect our merchant account.

**Xero Integration:** How Stripe payouts sync to Xero for accounting purposes.

## Practical Element

Find a user in Stripe whose payment failed recently. Trace the automated steps the system took to try and recover the payment.`,
          },
          {
            order: 13,
            slug: "gm-session-13-customer-support",
            title: "Session 13: Customer Support & Service Workflows — Elif",
            content: `## Session 13: Customer Support & Service Workflows

**Presenter:** Elif

**Objective:** Understand the qualitative feedback loop — what users are complaining about and how that directly impacts churn and product decisions.

## Key Topics

**The Support Stack:** The tool we use for support. How it is structured, and who handles what type of ticket.

**Common Friction Points:** The top 3 reasons users contact support. These are the exact problems that, if solved in the product, would reduce churn.

**Refund & Cancellation Policy:** How we handle refund requests. Whether we have save offers when someone tries to cancel, and how effective they are.

**Feedback to Product:** How a recurring complaint in support turns into a product fix or an onboarding change. Who is responsible for closing this loop.

## Practical Element

Look at the last 10 support tickets related to "cancellation" together. Discuss whether there is a pattern that could be solved in the app's UI or onboarding flow.`,
          },
          {
            order: 14,
            slug: "gm-session-14-ai-workflows",
            title: "Session 14: MoovBuddy AI Workflows — Görkem",
            content: `## Session 14: MoovBuddy AI Workflows

**Presenter:** Görkem

**Objective:** Understand how we use AI internally to scale operations and how you can leverage it to move faster in your own role.

## Key Topics

**AI for Content Creation:** How we generate ad copy, email sequences, or SEO content using AI. The prompts and tools we use, and the quality control process.

**AI for HR & Operations:** How we use AI to review job applicants and what the workflow looks like.

**AI Podcast Generation:** The workflow for creating AI-generated podcasts from written content.

**Growth Applications:** Specifically how you can use AI to speed up your work — analyzing CSVs of user reviews, writing SQL queries for Metabase, or mocking up ad creative concepts before requesting them from the design team.

## Practical Element

Run a live prompt in ChatGPT or Claude to analyze a sample of recent App Store reviews and extract the top 3 user complaints.`,
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

  // People / Channels to Follow — Creative Strategist
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
        role: "creative-strategist",
      },
      {
        order: 2,
        name: "Dara Denney",
        description: "Creative strategy, Facebook/Meta ads, data-driven creative analysis.",
        url: "https://www.youtube.com/@DaraDenney",
        platform: "youtube",
        category: "Creative Strategy & Ad Creatives",
        role: "creative-strategist",
      },
      {
        order: 3,
        name: "Alex Greifeld",
        description: "DTC creative strategy, testing & iteration, data-driven growth.",
        url: "https://linkedin.com/in/alexandra-greifeld",
        platform: "linkedin",
        category: "Creative Strategy & Ad Creatives",
        role: "creative-strategist",
      },
      {
        order: 4,
        name: "Joanna Wiebe",
        description: "Conversion copywriting, founder of Copyhackers — essential reading for any strategist.",
        url: "https://x.com/copyhackers",
        platform: "twitter",
        category: "Creative Strategy & Ad Creatives",
        role: "creative-strategist",
      },
      {
        order: 5,
        name: "Harry Dry",
        description: "Marketing Examples — bite-sized breakdowns of the world's best marketing campaigns.",
        url: "https://x.com/harrydry",
        platform: "twitter",
        category: "Creative Strategy & Ad Creatives",
        role: "creative-strategist",
      },
      {
        order: 6,
        name: "Romain Torres",
        description: "AI-powered UGC production, founder of Arcads.",
        url: "https://linkedin.com/in/romain-torres-arcads",
        platform: "linkedin",
        category: "Creative Strategy & Ad Creatives",
        role: "creative-strategist",
      },
      {
        order: 7,
        name: "Marcus Burke",
        description: "Paid social, Meta ad strategy, creative testing frameworks.",
        url: "https://linkedin.com/in/marcusburke",
        platform: "linkedin",
        category: "Creative Strategy & Ad Creatives",
        role: "creative-strategist",
      },
      // Mobile User Acquisition & Performance Marketing
      {
        order: 8,
        name: "Kirill Makarov",
        description: "Mobile UA, paid acquisition, app growth strategy.",
        url: "https://linkedin.com/in/kmakarof",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
        role: "creative-strategist",
      },
      {
        order: 9,
        name: "Vasyl Sergiienko",
        description: "Mobile UA, Meta & TikTok ads, app marketing.",
        url: "https://linkedin.com/in/vasyl-sergienko",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
        role: "creative-strategist",
      },
      {
        order: 10,
        name: "Eric Seufert",
        description: "Mobile ad tech, platform dynamics (ATT, privacy), sharp takes on the ad ecosystem via Mobile Dev Memo.",
        url: "https://x.com/eric_seufert",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
        role: "creative-strategist",
      },
      {
        order: 11,
        name: "Shamanth Rao",
        description: "Mobile UA strategy, founder of RocketShip HQ, host of \"The Mobile User Acquisition Show\" podcast.",
        url: "https://linkedin.com/in/shamanthrao",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
        role: "creative-strategist",
      },
      {
        order: 12,
        name: "Thomas Petit",
        description: "Independent mobile growth consultant, UA & subscription app specialist.",
        url: "https://x.com/Thomasbcn",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
        role: "creative-strategist",
      },
    ],
  });

  // People / Channels to Follow — Growth Manager
  await prisma.person.createMany({
    data: [
      // Subscription App & Growth
      {
        order: 1,
        name: "Jacob Eiting",
        description: "The definitive voice on subscription app economics, paywalls, and LTV metrics. CEO of RevenueCat.",
        url: "https://x.com/jacob_eiting",
        platform: "twitter",
        category: "Subscription App & Growth",
        role: "growth-manager",
      },
      {
        order: 2,
        name: "Lenny Rachitsky",
        description: "The gold standard for product-led growth, onboarding teardowns, and A/B testing frameworks. Author of Lenny's Newsletter.",
        url: "https://x.com/lennysan",
        platform: "twitter",
        category: "Subscription App & Growth",
        role: "growth-manager",
      },
      {
        order: 3,
        name: "Brian Balfour",
        description: "The creator of modern growth frameworks; essential for understanding growth loops and retention models. Founder of Reforge.",
        url: "https://linkedin.com/in/bbalfour",
        platform: "linkedin",
        category: "Subscription App & Growth",
        role: "growth-manager",
      },
      {
        order: 4,
        name: "Elena Verna",
        description: "Brilliant insights on B2B/B2C growth, monetization strategies, and organizational design for growth teams. Growth Advisor.",
        url: "https://linkedin.com/in/elenaverna",
        platform: "linkedin",
        category: "Subscription App & Growth",
        role: "growth-manager",
      },
      // Mobile UA & Performance Marketing
      {
        order: 5,
        name: "Thomas Petit",
        description: "One of the sharpest minds in mobile growth, particularly strong on SKAN, attribution, and paid UA strategy. Independent consultant.",
        url: "https://x.com/Thomasbcn",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
        role: "growth-manager",
      },
      {
        order: 6,
        name: "Eric Seufert",
        description: "Essential for understanding macro shifts in the digital economy, ATT privacy impacts, and quantitative marketing. Founder of Mobile Dev Memo.",
        url: "https://x.com/eric_seufert",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
        role: "growth-manager",
      },
      {
        order: 7,
        name: "Shamanth Rao",
        description: "Excellent tactical insights on user acquisition, creative testing, and interviews with top growth leaders via his podcast. CEO of RocketShip HQ.",
        url: "https://linkedin.com/in/shamanthrao",
        platform: "linkedin",
        category: "Mobile UA & Performance Marketing",
        role: "growth-manager",
      },
      {
        order: 8,
        name: "Savannah Sanchez",
        description: "Great breakdowns of winning Meta and TikTok ad creatives. Paid Social Consultant.",
        url: "https://x.com/savannah_rae",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
        role: "growth-manager",
      },
      {
        order: 9,
        name: "Barry Hott",
        description: "Known for his \"ugly ads work\" philosophy and practical creative testing advice. Growth Consultant.",
        url: "https://x.com/BarryHott",
        platform: "twitter",
        category: "Mobile UA & Performance Marketing",
        role: "growth-manager",
      },
      // Creative Strategy & Ad Creatives
      {
        order: 10,
        name: "Dara Denney",
        description: "The best resource for understanding how to structure direct-response ad creatives and hooks. Performance Creative Expert.",
        url: "https://www.youtube.com/@DaraDenney",
        platform: "youtube",
        category: "Creative Strategy & Ad Creatives",
        role: "growth-manager",
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

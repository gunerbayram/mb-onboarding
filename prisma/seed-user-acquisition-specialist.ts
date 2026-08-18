import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const ROLE = "user-acquisition-specialist";

// Generated from the uploaded curriculum + quiz markdown files.
// This script is additive-only: it never deletes anything, and it
// skips any chapter whose slug already exists so it is safe to re-run.
const chapters: Array<{
  order: number;
  slug: string;
  title: string;
  description: string;
  role: string;
  lessons: Array<{ order: number; slug: string; title: string; content: string }>;
  quiz: {
    title: string;
    questions: Array<{ order: number; question: string; options: string[]; correctAnswer: number }>;
  };
}> = [
  {
    "order": 1,
    "slug": "uas-adapting-to-the-startup-environment",
    "title": "Adapting to the Company and the Startup Environment",
    "description": "Before learning ad platforms, metrics, or attribution, a UA person must understand the operating system of the company. This chapter establishes the working standards expected from the role: ownership, speed, evidence-based judgment, and a clear grasp of the consumer subscription-app business.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "startup-mindset-and-leaving-corporate-reflexes-behind",
        "title": "Startup Mindset and Leaving Corporate Reflexes Behind",
        "content": "## Startup Mindset and Leaving Corporate Reflexes Behind\n\n*Why This Lesson Exists*\n\nLarge organisations and startups reward different behaviours. In a corporate environment, work is often divided into clear functions, decisions move through multiple stakeholders, and the cost of an error can be high because systems are large and regulated. In a performance-driven startup, the central risk is often the opposite: moving too slowly, waiting too long for certainty, or failing to test a potentially valuable idea.\n\nThis does not mean that process, precision, or risk awareness are unimportant. It means that the UA person must learn to use them proportionately. A campaign that needs a small, controlled test should not require a large project plan. A material budget increase, a major tracking change, or a pricing test, however, should be treated with appropriate care.\n\nThe goal is **disciplined speed**: make the best decision possible with the evidence available, define the downside, set a check-in point, and learn from the result.\n\n### A, B, and C Player Standards\n\nThe distinction between an A, B, and C player is not a personality judgement. It is a way to describe the level of ownership, learning speed, and impact a person brings to the team.\n\n| Standard | Typical behaviour | Example in a UA role |\n| --- | --- | --- |\n| **A Player** | Spots problems before being asked, investigates independently, presents a recommendation, and owns the follow-up. | Notices that trial starts from one geo dropped 25%, checks spend, attribution, creative delivery, and the funnel, then proposes the first diagnostic action. |\n| **B Player** | Completes assigned work reliably but usually waits for direction before looking beyond the task. | Pulls the requested campaign report accurately, but does not flag that one campaign is distorting the blended CAC. |\n| **C Player** | Waits for precise instructions, provides activity without an outcome, and repeatedly raises issues without progressing them. | Says “Meta performance is down” without quantifying the problem, checking likely causes, or proposing a next step. |\n\nThe target is not perfection. The target is to develop A-player habits: curiosity, speed, judgment, responsibility, and the ability to turn a vague problem into a structured next action.\n\n### The Best Synthesis of Speed and Perfectionism\n\nPerfectionism becomes harmful when it delays learning. It is valuable when it protects the quality of a decision that is difficult to reverse. A UA person must distinguish between these two situations.\n\nUse the following rule of thumb:\n\n| Decision type | Appropriate standard | Examples |\n| --- | --- | --- |\n| **Reversible and low-risk** | Move with roughly 70–80% confidence, then measure. | Launching a low-budget creative test; changing ad copy; reviewing a new audience hypothesis. |\n| **Costly or difficult to reverse** | Verify carefully, ask for review, document the reasoning. | Increasing spend materially; changing conversion events; publishing a new web-payment flow; altering pricing. |\n| **Unclear** | Reduce uncertainty with the smallest useful diagnostic step. | A revenue decline: first split by geo, platform, campaign, and event before forming a conclusion. |\n\nThe principle is simple: **do not use the need for more information as a reason not to start learning.** When evidence is incomplete, define the smallest action that produces better evidence.\n\n### Taking Action and Creating Momentum\n\nA UA person is not only responsible for completing tasks. They are responsible for making the team’s understanding sharper and its execution faster. This starts with well-framed communication.\n\nWhen escalating an issue, avoid statements such as:\n\n> “Performance looks bad. I am checking it.”\n\nInstead, use an evidence-led structure:\n\n> “US iOS trial-start CPA increased 18% yesterday. Spend and CPM are stable, but paywall-view-to-trial conversion declined. My current hypothesis is that the issue is funnel-side rather than creative-side. I am checking the relevant Amplitude funnel and recent releases; I will share an update by 15:00.”\n\nThis type of communication does three things. It states the observed fact, separates fact from hypothesis, and gives the team confidence that the issue has an owner and a next step.\n\n### Practical Exercise\n\nChoose one recent performance change from the business: a spike, a drop, or an unexpected difference between campaigns. Write a short **Issue Brief** using the following structure:\n\n| Section | Required content |\n| --- | --- |\n| **Observed fact** | What changed? Include the metric, magnitude, time period, and relevant segment. |\n| **Likely impact** | Why does it matter? State the expected impact on CAC, revenue, trial conversion, or LTV. |\n| **Initial hypotheses** | List 2–3 plausible explanations without presenting them as facts. |\n| **First diagnostic step** | What data will you check first, and why? |\n| **Recommendation or next update** | State the immediate action or when you will return with a decision. |\n\n---\n"
      },
      {
        "order": 2,
        "slug": "learning-and-decision-making-discipline",
        "title": "Learning and Decision-Making Discipline",
        "content": "## Learning and Decision-Making Discipline\n\n*Why This Lesson Exists*\n\nPerformance marketing creates a constant stream of information: campaign results, creative feedback, dashboard movements, competitor activity, attribution discrepancies, and user behaviour data. Without a learning system, this information becomes noise. The role requires a repeatable way to preserve what the team learns, challenge weak assumptions, and make better decisions over time.\n\nThe point of learning is not to collect frameworks or repeat industry terminology. The point is to improve the next decision.\n\n### Preserve Learnings, Then Challenge Them\n\nEvery test, campaign, and analysis should create an explicit learning. A learning is stronger than an observation because it describes a pattern, condition, or causal explanation that can inform future work.\n\n| Weak note | Strong learning |\n| --- | --- |\n| “Creative B won.” | “For cold US iOS traffic, a hook that names the pain point in the first two seconds produced a stronger click-to-install rate than the benefit-led hook, while downstream trial conversion stayed stable.” |\n| “TikTok did poorly.” | “TikTok acquisition was unprofitable for this audience and offer under the current creative set. We cannot conclude that the channel is unprofitable until we test native creator-style creatives and a separate landing-page message.” |\n| “Annual paywall was better.” | “The annual-first paywall increased Day0 revenue for users who completed the quiz, but we still need a longer retention window before claiming it improves LTV.” |\n\nLearnings must be stored in a form that the team can find and reuse. At a minimum, every learning should include the date, context, hypothesis, implementation, result, confidence level, and what should happen next.\n\nHowever, a past learning is not a permanent rule. A principle that was true for one product, geo, audience, or creative angle may not transfer cleanly to another. Good operators respect evidence but remain willing to challenge it.\n\n### Evidence-Based Hypotheses at a Conceptual Level\n\nA hypothesis is a specific and testable explanation of why an outcome may change. It is not a prediction without reasoning and it is not a vague idea such as “let’s test a new creative.”\n\nA useful hypothesis follows this structure:\n\n> **If** we change **X**, **then** metric **Y** will change by direction **Z**, **because** mechanism **M** affects user behaviour in this context.\n\nFor example:\n\n> “If we replace the generic opening of the Meta video with a pain-point-first hook for users concerned about pelvic health, then the click-to-install rate will increase, because the audience will identify the relevance of the app earlier and self-select into the funnel.”\n\nA good hypothesis has five qualities.\n\n| Quality | What it means | Diagnostic question |\n| --- | --- | --- |\n| **Specific** | It names the intervention and the expected metric movement. | What exactly will change? |\n| **Grounded** | It relies on data, user insight, competitor observation, or a documented principle. | What evidence makes this plausible? |\n| **Testable** | It can be evaluated against a clear control or baseline. | What result would support or reject it? |\n| **Scoped** | It identifies the audience, platform, market, or funnel stage. | For whom and where should this be true? |\n| **Actionable** | It leads to a concrete next test or decision. | What will we do if the result is positive or negative? |\n\n### Separate Facts, Interpretations, and Decisions\n\nJunior operators often make two opposite errors. Some hesitate because the data does not provide absolute certainty. Others turn a single observation into a strong conclusion too quickly. The solution is to separate three layers of thinking.\n\n| Layer | Definition | Example |\n| --- | --- | --- |\n| **Fact** | A directly observed, accurately measured data point. | Trial-start conversion from UK iOS traffic declined from 18.2% to 14.7% week over week. |\n| **Interpretation** | A possible explanation that still requires validation. | The decline may be related to the latest onboarding release. |\n| **Decision** | The action taken given the current evidence and risk level. | Compare the funnel by app version; if the pattern is confirmed, roll back the release or isolate the changed step. |\n\nThis discipline makes communication clearer and prevents opinions from being presented as data.\n\n### Decision Log: The Team Memory\n\nA simple decision log prevents the same questions from being solved repeatedly and helps the team evaluate the quality of its reasoning, not only the outcome.\n\n| Field | Description |\n| --- | --- |\n| **Date and owner** | Who made the decision and when? |\n| **Decision** | What was approved, changed, paused, or tested? |\n| **Context** | Which app, geo, platform, campaign, or funnel stage does it apply to? |\n| **Evidence** | What data, user feedback, or market information supported it? |\n| **Expected outcome** | Which metric should move, in what direction, and over what period? |\n| **Risk and guardrails** | What could go wrong? What metric would trigger intervention? |\n| **Result and learning** | What happened, what did we learn, and what should be repeated or avoided? |\n\n### Practical Exercise\n\nReview one completed campaign or experiment. Convert its result into one well-written learning and one follow-up hypothesis. Use the following template:\n\n> **Context:**\n>\n> **Original hypothesis:**\n>\n> **What changed:**\n>\n> **Observed result:**\n>\n> **Learning, including confidence level:**\n>\n> **What this does *not* prove:**\n>\n> **Next hypothesis or decision:**\n\n---\n"
      },
      {
        "order": 3,
        "slug": "business-model-context-the-nuances-of-a-consumer",
        "title": "Business-Model Context: The Nuances of a Consumer App Business",
        "content": "## Business-Model Context: The Nuances of a Consumer App Business\n\n*Why This Lesson Exists*\n\nA UA person cannot evaluate acquisition properly without understanding the underlying business model. The role is not to buy the cheapest installs or generate the highest click-through rate. The role is to acquire users whose future contribution is greater than the cost of acquiring them.\n\nConsumer subscription apps are different from ecommerce, lead generation, and one-time-purchase businesses. The customer relationship continues after the first payment, and its economics depend on trial conversion, retention, renewal behaviour, refunds, chargebacks, payment failures, and the cost of serving the user over time.\n\n### The Consumer Subscription Value Chain\n\nThe business can be understood as a connected value chain. A weakness at any stage can make strong performance at an earlier stage meaningless.\n\n| Stage | Core question | Example metric | Why the UA Specialist should care |\n| --- | --- | --- |\n| **Impression** | Are we reaching a relevant audience efficiently? | CPM, reach, frequency | Poor creative-audience fit increases the cost of all downstream results. |\n| **Click / install** | Does the ad earn enough qualified interest? | CTR, CPC, CPI | Cheap traffic is not valuable if it does not activate or pay. |\n| **Onboarding** | Do users understand the value proposition and progress to the paywall? | Completion rate, activation rate | An onboarding problem can falsely look like an acquisition problem. |\n| **Paywall / trial** | Do users see sufficient value to start a subscription? | Paywall-to-trial conversion, Day0 revenue | This is the first direct signal of monetization quality. |\n| **Conversion** | Do trial users become paying subscribers? | Trial-to-paid conversion | Trial volume alone can overstate campaign quality. |\n| **Retention / renewal** | Do paying users remain subscribed and gain value? | D7/D30 retention, renewal rate, churn | Retention determines whether early revenue becomes sustainable LTV. |\n\nThe important mental model is that UA does not end when the user installs. Acquisition quality is validated by downstream behaviour and revenue.\n\n### Why “Cheap” Is Not Always Profitable\n\nA campaign can achieve a low CPI while destroying profitability. For example, a broad audience may click and install cheaply but have low intent, poor onboarding completion, and weak trial conversion. A second campaign may have a higher CPI but deliver users who convert and retain at a much higher rate.\n\nThe correct question is not:\n\n> “Which campaign gives us the cheapest install?”\n\nIt is:\n\n> “Which campaign acquires incremental users with an expected lifetime value that exceeds their fully loaded acquisition cost, within an acceptable payback period?”\n\nThis is why a UA person should progressively learn to read campaign performance through a downstream lens: install → onboarding → trial → revenue → retention.\n\n### Consumer Behaviour Is Contextual\n\nConsumer-app behaviour varies by market, language, platform, audience, motivation, and time. A message that works in the US may fail in another geography. An annual offer may convert well for one user segment and poorly for another. A creative that drives high CTR on TikTok may not produce qualified intent in Meta.\n\nWhen analysing a result, always ask what context the result belongs to:\n\n- Which app, product promise, and user problem are we discussing?\n- Which platform, geo, language, and device are involved?\n- Which creative angle and landing/onboarding message were shown?\n- Is the result driven by a short-term event, an audience change, or a persistent pattern?\n- What downstream metric confirms whether the traffic was genuinely valuable?\n\n### The Unit-Economics Mindset\n\nEven at a junior level, you should view every activity through basic unit economics. A simple conceptual model is:\n\n> **Expected contribution from an acquired user = expected lifetime revenue − variable costs of acquiring and serving that user.**\n\nThe exact company model may include platform fees, payment processing, refunds, support cost, taxes, and other variables. You do not need to calculate every detail manually on day one. You do need to understand that reported revenue is not the same as profit and that early ROAS is a proxy that must be checked against later cohort behaviour.\n\n### Practical Exercise\n\nChoose one campaign and map its performance through the full value chain. Use the template below. Where information is missing, state the gap rather than guessing.\n\n| Funnel stage | Metric | Current value | Interpretation | Next question |\n| --- | --- | --- | --- | --- |\n| Impression |  |  |  |  |\n| Click / install |  |  |  |  |\n| Onboarding |  |  |  |  |\n| Paywall / trial |  |  |  |  |\n| Paid conversion |  |  |  |  |\n| Retention / renewal |  |  |  |  |\n\n---\n\n### Chapter 1 Completion Check\n\nBy the end of this chapter, the UA person should be able to explain the following in their own words:\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Startup ownership** | Raises a performance issue with facts, hypotheses, and a proposed next step rather than waiting for detailed instruction. |\n| **Learning discipline** | Writes a testable hypothesis and distinguishes between a fact, an interpretation, and a decision. |\n| **Consumer-app business context** | Explains why low CPI or high CTR alone is not sufficient evidence of valuable acquisition. |\n| **Full-funnel thinking** | Maps a campaign from impression to renewal and identifies the data needed to judge quality. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 1 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "A campaign’s cost per trial rises by 18% in one geo. Which response best reflects **A-player ownership**?",
          "options": [
            "Wait for the weekly performance meeting because the manager may already be investigating.",
            "Report that “performance is down” and ask the team what to do next.",
            "Quantify the movement, check the earliest funnel stage where the divergence appears, form initial hypotheses, and propose the next diagnostic action.",
            "Immediately pause every campaign in the geo without checking data completeness or downstream performance."
          ],
          "correctAnswer": 2
        },
        {
          "order": 2,
          "question": "Which situation most clearly requires a **higher evidence threshold and review** before action?",
          "options": [
            "Testing a new ad-copy variation with a limited discovery budget.",
            "Comparing two hooks in a low-risk creative test.",
            "Making a material budget increase after one promising day of data.",
            "Reviewing a competitor’s active ads in the Meta Ad Library."
          ],
          "correctAnswer": 2
        },
        {
          "order": 3,
          "question": "Which statement is the strongest hypothesis?",
          "options": [
            "“Let’s test a new creative because the current one is boring.”",
            "“If we use a pain-point-first hook for cold US iOS traffic, install-to-trial conversion will improve because users will recognise the app’s relevance earlier.”",
            "“TikTok probably does not work for this app.”",
            "“We should make the paywall better.”"
          ],
          "correctAnswer": 1
        },
        {
          "order": 4,
          "question": "Which of the following is an **interpretation**, rather than a fact or a decision?",
          "options": [
            "“UK iOS trial-start conversion declined from 18.2% to 14.7% week over week.”",
            "“The decline may be related to the latest onboarding release.”",
            "“We will compare conversion by app version before deciding whether to roll back the release.”",
            "“The dashboard refresh completed at 09:00 UTC.”"
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "Why is a low CPI not sufficient evidence that a campaign is valuable?",
          "options": [
            "CPI is only available on Android.",
            "Install costs do not matter in subscription businesses.",
            "Cheap installs can still produce weak onboarding completion, trial conversion, retention, and lifetime value.",
            "A low CPI always means that attribution is broken."
          ],
          "correctAnswer": 2
        },
        {
          "order": 6,
          "question": "What is the primary purpose of a decision log?",
          "options": [
            "To record only successful campaigns for leadership updates.",
            "To preserve the decision context, evidence, expected result, actual outcome, and reusable learning.",
            "To avoid needing dashboards in the future.",
            "To replace all campaign documentation with one spreadsheet."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 2,
    "slug": "uas-data-analytics-and-attribution",
    "title": "Data Analytics and Attribution",
    "description": "A UA person must be able to read the data chain behind a performance result. This does not mean becoming a data engineer. It means knowing what question to ask, where to look, how to separate a real signal from noise, and when an apparent campaign problem may actually be a funnel, tracking, or reporting problem.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "product-analytics-logic",
        "title": "Product Analytics Logic",
        "content": "## Product Analytics Logic\n\n*Event-Based Thinking, Funnels, Cohorts, and Retention Charts*\n\n### Why This Lesson Exists\n\nA consumer app does not directly tell us why users succeed, fail, convert, or churn. It records user actions. Product analytics converts those actions into an understanding of behaviour.\n\nThe fundamental unit of product analytics is an **event**. An event represents a meaningful user action, such as opening the app, completing an onboarding step, viewing a paywall, starting a trial, or completing a workout. Events can include properties that add context, such as app version, platform, country, onboarding variant, subscription product, creative identifier, or acquisition channel.\n\nThe core question is not “What happened in the dashboard?” It is:\n\n> “What did a specific group of users do, in what sequence, under which conditions, and how did that behaviour relate to value creation?”\n\n### Event Thinking: Build From Behaviour, Not Screens\n\nWeak event design records that a user opened a screen. Strong event design records the behaviour that matters to the business. A screen view can be useful, but it does not necessarily tell us whether the user understood, progressed, or received value.\n\n| Weak event framing | Strong event framing | Why it is stronger |\n| --- | --- | --- |\n| `onboarding_screen_3_viewed` | `onboarding_step_completed` with `step_name` | Distinguishes progress from exposure and permits comparison across steps. |\n| `paywall_viewed` | `paywall_viewed` with `paywall_variant`, `product_order`, and `source` | Enables analysis of the specific commercial experience shown. |\n| `app_opened` | `value_action_completed` with relevant activity properties | Better represents whether the user experienced the product’s core value. |\n| `purchase` | `trial_started` and `subscription_converted` | Separates initial intent from a lasting paid outcome. |\n\nFor every important event, ask four questions:\n\n| Question | Example |\n| --- | --- |\n| **What behaviour does this represent?** | A user consciously starts a free trial. |\n| **Why does it matter?** | It is an early monetisation signal and a step toward paid conversion. |\n| **What context must be captured?** | Paywall variant, subscription product, platform, geo, acquisition source. |\n| **What decision could this event inform?** | Whether a paywall test improved trial-start conversion for a specific segment. |\n\n### Reading a Funnel Correctly\n\nA funnel is a defined sequence of events. It answers how many users progress from a starting action to a desired downstream action and where they stop progressing.\n\nA core subscription-app funnel might look like this:\n\n> Install → First Open → Onboarding Started → Onboarding Completed → Paywall Viewed → Trial Started → Trial Converted → Renewal\n\nA funnel should be interpreted stage by stage, not only through its final conversion rate.\n\n| Funnel question | What it reveals | Example response |\n| --- | --- | --- |\n| Where is the largest percentage drop? | The first candidate for diagnosis. | Users may abandon a long or unclear onboarding step. |\n| Where is the largest *absolute* user loss? | The highest-volume potential opportunity. | A modest drop early in a large funnel can affect more users than a large late-stage drop. |\n| Is the drop new or persistent? | Whether the issue could be a release, campaign, seasonality, or structural problem. | A sudden decline after a release requires a different response from a stable long-term gap. |\n| Does the drop exist in every segment? | Whether the cause is general or segment-specific. | Only Android users decline, suggesting a platform or version issue. |\n\nA funnel does not prove causation by itself. It provides the location of the problem. The next step is to segment, compare time periods, and inspect the experience or tracking around that step.\n\n### Cohorts: Compare Like With Like\n\nA cohort is a group of users who share a meaningful common characteristic. The most common cohort is an acquisition cohort: users who installed, started a trial, or paid for the first time in the same day, week, or month.\n\nCohort analysis prevents blended averages from hiding important changes. If the company acquired more low-intent traffic in the last week, the blended conversion rate may decline even if the product itself did not change.\n\nUseful cohort dimensions include:\n\n| Cohort dimension | Example question |\n| --- | --- |\n| **Acquisition date** | Are users acquired in the latest week converting differently from prior weeks? |\n| **Channel / campaign** | Does Meta campaign A retain better than TikTok campaign B? |\n| **Creative** | Does a pain-point creative bring higher-intent users than a benefit-led creative? |\n| **Platform / app version** | Did Android users on version X show a new onboarding issue? |\n| **Geo / language** | Is a pricing offer working differently in the US and Germany? |\n| **Paywall / onboarding variant** | Did the new variant improve trial conversion without reducing later conversion quality? |\n\nA cohort comparison must use equivalent maturity. Do not compare the D30 retention of a January cohort with the D7 retention of a March cohort as if they carry the same meaning.\n\n### Retention Curves: Value Over Time\n\nRetention analysis asks whether users return or continue receiving value after acquisition. The definition of a retained user must match the product’s value model. For some apps, an app open may be enough for a basic view. For a health or fitness app, a completed value action may be more meaningful.\n\n| Retention measure | What it can tell us | Limitation |\n| --- | --- | --- |\n| **D1 retention** | Immediate onboarding quality and early expectation alignment. | Does not prove long-term product value. |\n| **D7 retention** | Whether a user has found a recurring reason to return. | May be influenced by push notifications or a short programme. |\n| **D30 retention** | A stronger signal of sustained product usage. | Requires time to mature and lower-volume cohorts. |\n| **Renewal retention** | Whether users believe the subscription continues to be worth paying for. | May be affected by payment failures as well as voluntary churn. |\n\nA healthy retention curve generally declines quickly early on and then starts to flatten as the most engaged users remain. The shape matters as much as a single percentage. A sudden cliff after a specific day often suggests a product, programme, notification, or subscription-lifecycle issue that needs investigation.\n\n### Practical Exercise\n\nIn Amplitude or the relevant product analytics tool, build the following three views for the same acquisition period:\n\n| Analysis | Required segments | Question to answer |\n| --- | --- | --- |\n| **Onboarding funnel** | iOS vs. Android | Which step has the largest drop, and does the problem differ by platform? |\n| **Trial-start cohort** | Meta vs. TikTok | Which channel produces the stronger trial-start rate? |\n| **D7 retention curve** | Two major geos or two major creatives | Does the higher-volume source also produce stronger early retention? |\n\nWrite one factual observation, one plausible interpretation, and one next diagnostic question for each analysis.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "business-intelligence-reading-metabase-mcp-dashboards",
        "title": "Business Intelligence — Reading Metabase MCP Dashboards",
        "content": "## Business Intelligence — Reading Metabase MCP Dashboards\n\n*Ask the Right Question Before Building a Query*\n\n### Why This Lesson Exists\n\nMetabase and internal dashboards can answer many questions quickly. They can also produce convincing but misleading answers when the question is vague, the metric definition is unclear, or the filters are wrong.\n\nThe UA person does not need to build every complex dashboard. They must know how to turn a business concern into a precise analytical question and read the resulting output critically.\n\n### Start With a Decision, Not a Dashboard\n\nBefore opening Metabase, define the decision the analysis should inform. This prevents browsing dashboards without a purpose.\n\n| Weak request | Better analytical question | Decision it supports |\n| --- | --- | --- |\n| “How is Meta doing?” | “For US iOS users acquired through Meta in the last seven complete days, how did Day0 revenue per install and trial-start rate compare with the prior seven complete days?” | Whether to investigate, hold spend, or adjust a campaign. |\n| “Show me LTV.” | “What is projected D90 LTV by acquisition campaign for cohorts that have reached at least D14 maturity?” | Which campaigns can be scaled within target payback rules. |\n| “Did the test work?” | “Did onboarding variant B improve paywall-view-to-trial conversion for the assigned population without worsening D7 retention?” | Whether to roll out, iterate, or stop the variant. |\n\nA good question specifies the population, metric, comparison period, segmentation, and the decision to be made.\n\n### Understand the Data Path\n\nA dashboard is only as reliable as its source data and definitions. At a conceptual level, the flow often looks like this:\n\n> Ad platforms / MMP / app analytics / payment systems → data warehouse or database → transformed tables → Metabase dashboard or query.\n\nThe UA person should know the answers to these questions for the company’s core dashboards:\n\n| Question | Why it matters |\n| --- | --- |\n| What is the source of this metric? | Meta-reported spend, MMP-attributed installs, payment-system revenue, or internal calculated data may differ. |\n| How frequently does it refresh? | Today’s revenue or spend may be incomplete. |\n| What timezone does it use? | Day-level comparisons can be misleading across systems with different timezones. |\n| How is the metric defined? | “Revenue” might mean gross, net of refunds, recognised, or cash-collected revenue. |\n| Is the value estimated or mature? | LTV projections and recent retention numbers should not be read like fully matured outcomes. |\n\n### Core UA Dashboard Views\n\nThe exact dashboard names will vary, but the UA person should become fluent in a stable set of views.\n\n| Dashboard view | Purpose | Weekly question it should answer |\n| --- | --- | --- |\n| **Spend and acquisition performance** | Monitor spend, impressions, installs, and cost. | Where are we spending, and which segments changed materially? |\n| **Funnel conversion** | Connect acquisition to onboarding, paywall, and trial outcomes. | Is a CPA movement caused by traffic quality or a funnel issue? |\n| **Revenue and LTV** | Evaluate monetisation and long-term quality. | Is early performance likely to meet the profitability threshold? |\n| **Cohort retention** | Check whether acquired users stay engaged or subscribed. | Are newer cohorts retaining differently from historical cohorts? |\n| **Refund / chargeback / payment health** | Detect revenue-quality and customer-experience risks. | Is reported revenue being eroded by refunds or failed payments? |\n\n### Correct Dashboard Reading Sequence\n\nWhen a top-line metric changes, use a consistent sequence rather than jumping to a conclusion.\n\n1. **Confirm the number is real.** Check refresh status, timezone, and whether the current day is partial.\n2. **Quantify the change.** State the baseline, current value, absolute change, percentage change, and relevant period.\n3. **Segment the movement.** Break it down by platform, geo, channel, campaign, creative, app version, or funnel step.\n4. **Identify the earliest point of divergence.** Did the change begin at spend, click, install, onboarding, trial, revenue, or retention?\n5. **Compare with a control or prior baseline.** Determine whether the movement is unique to a segment or business-wide.\n6. **Form a bounded hypothesis.** Do not claim a cause until the available evidence supports it.\n7. **Define the smallest useful next action.** Investigate, pause, test, escalate, or monitor.\n\n### Practical Exercise\n\nUse the main revenue or marketing dashboard to answer this question:\n\n> “Which one of our top three geos had the largest deterioration in Day0 revenue per install in the last full week compared with the prior full week, and at which funnel stage does the divergence first appear?”\n\nPrepare a one-page analysis containing the precise filters used, the result, the likely impact, two hypotheses, and the next step.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "cohort-and-retention-analysis",
        "title": "Cohort and Retention Analysis",
        "content": "## Cohort and Retention Analysis\n\n*D1, D7, D30 and Segment Breakdowns*\n\n### Why This Lesson Exists\n\nBlended averages can hide the quality of newer acquisition. Cohort analysis allows the team to see whether users acquired on a certain day, through a particular channel, in a specific geo, or with a specific creative behave differently over time.\n\nThe core rule is:\n\n> **Do not judge a cohort before it has had time to mature for the metric you are reading.**\n\n### Core Time Windows\n\n| Window | Primary use | Typical diagnostic question |\n| --- | --- | --- |\n| **D0** | Immediate intent and monetisation. | Did users start a trial or generate initial revenue after seeing this funnel? |\n| **D1** | First return and expectation alignment. | Did the onboarding and first-use experience create enough motivation to come back? |\n| **D7** | Early habit formation and programme engagement. | Do users see enough ongoing value to continue engaging? |\n| **D30** | More sustained usage or subscription quality. | Is the cohort still active or subscribed after the initial novelty? |\n| **Renewal date** | Commercial persistence. | Are users renewing when the billing cycle completes? |\n\nThe correct window depends on the decision. A creative test may use D0 and D1 as early indicators, but it should not be declared a long-term winner solely because it generated cheap Day0 trials.\n\n### Segmenting Cohorts for UA Decisions\n\nA UA-focused cohort analysis should usually begin with the following breakdowns:\n\n| Segment | Why it matters |\n| --- | --- |\n| **Platform** | iOS and Android can differ in payment behaviour, tracking, app experience, and user intent. |\n| **Geo / language market** | Purchasing power, cultural relevance, pricing, and creative response may differ materially. |\n| **Channel / network** | Meta and TikTok may deliver different user profiles and downstream quality. |\n| **Campaign / ad set** | Helps identify whether performance differences are driven by delivery strategy. |\n| **Creative / angle** | Shows whether the promise made in the ad attracts users who later convert and retain. |\n| **Onboarding or paywall variant** | Validates whether a funnel experiment changes downstream commercial behaviour. |\n\nAvoid cutting the data into so many segments that the sample becomes too small. Start broad, identify the largest contribution to the movement, and then drill down.\n\n### Reading Cohorts Without Fooling Yourself\n\nCommon interpretation errors include:\n\n| Error | Why it is misleading | Better approach |\n| --- | --- | --- |\n| Comparing cohorts of different maturity | A D30 number cannot exist yet for a new cohort. | Compare the same lifecycle day across cohorts. |\n| Treating a small cohort as a durable trend | A few users can move a percentage dramatically. | Check volume, confidence, and repetition across periods. |\n| Ignoring traffic mix changes | Blended performance can change because the channel mix changed. | Compare like-for-like segments and track mix shifts. |\n| Using a single metric | A high trial rate can still lead to poor paid conversion or retention. | Read a chain of metrics from acquisition to renewal. |\n| Concluding causation from correlation | A creative and a retention change may move together for another reason. | Use controlled tests or deeper segmentation before making a claim. |\n\n### Practical Exercise\n\nSelect two acquisition cohorts with the same maturity window. Compare them in a table across D0, D1, D7, and D30 where available. Split by platform, geo, and creative or campaign.\n\nConclude with:\n\n1. Which cohort appears to have higher immediate intent?\n2. Which cohort appears to have better downstream quality?\n3. What is the strongest evidence for the difference?\n4. What additional data would you need before changing budget allocation?\n\n---\n"
      },
      {
        "order": 4,
        "slug": "statistical-significance-literacy",
        "title": "Statistical Significance Literacy",
        "content": "## Statistical Significance Literacy\n\n*Is It a Difference or Just Noise?*\n\n### Why This Lesson Exists\n\nEvery metric moves. The difficult question is whether the movement reflects a real underlying difference or ordinary random variation. A UA person does not need to become a statistician, but they must avoid declaring winners, losers, or trends from unstable data.\n\n### Three Conditions Before Trusting a Difference\n\nA result becomes more credible when it has all three of the following:\n\n| Condition | Meaning | Example question |\n| --- | --- | --- |\n| **Sufficient sample** | Enough users, impressions, or conversions are included for the metric’s variability. | Are we judging a 2% difference from 20 trials or 2,000 trials? |\n| **Appropriate comparison** | The groups are comparable except for the intended variable. | Did both variants run at the same time, in the same geo, for the same audience type? |\n| **Meaningful effect size** | The difference is large enough to matter commercially, not only mathematically. | Even if conversion improved, does it change revenue enough to justify rollout? |\n\n### A Practical Mental Model\n\nWhen interpreting a test or campaign result, ask:\n\n1. **How much data is behind this result?**\n2. **How volatile is this metric normally?**\n3. **Could a traffic-mix, budget, seasonality, or product change explain the difference?**\n4. **Is the observed effect meaningful for profit or user value?**\n5. **What would make us change our mind?**\n\nStatistical significance is not a permission slip to stop thinking. A statistically convincing result can still be commercially unimportant, badly instrumented, or non-transferable to another audience.\n\n### Confidence Intervals and Directional Learning\n\nWhere dashboards or experimentation tools provide confidence intervals, learn to read them as a range of plausible values rather than a single guaranteed truth. Wider intervals indicate more uncertainty. Narrower intervals typically come from more data or lower variability.\n\nSometimes the correct action is not to wait for a fully conclusive result. If a test is low-risk and the directional evidence is consistent with strong prior learnings, the team may choose to iterate. If a change affects pricing, tracking, or material budget, the evidence threshold should be higher.\n\n### Practical Exercise\n\nReview a recent A/B test or campaign comparison. Answer the following:\n\n| Question | Your answer |\n| --- | --- |\n| What was the primary metric? |  |\n| How many users or conversion opportunities were included? |  |\n| What was the observed difference? |  |\n| What alternative explanations are possible? |  |\n| Is the result directionally interesting, decision-ready, or inconclusive? |  |\n| What is the safest next action? |  |\n\n---\n"
      },
      {
        "order": 5,
        "slug": "anomaly-detection",
        "title": "Anomaly Detection",
        "content": "## Anomaly Detection\n\n*Spikes, Zero Conversions, and Geographic or Temporal Inconsistencies*\n\n### Why This Lesson Exists\n\nA large part of day-to-day UA work is noticing when a number is unexpectedly wrong. An anomaly may be a genuine performance change, a tracking problem, a payment issue, an app-release bug, a dashboard delay, or a normal calendar effect. The goal is not to panic. The goal is to diagnose systematically.\n\n### Common Anomaly Types\n\n| Anomaly | Example | Possible causes |\n| --- | --- | --- |\n| **Spend spike or collapse** | Spend doubles or falls near zero unexpectedly. | Budget setting, campaign status, payment issue, bid constraint, platform delivery change. |\n| **Zero or near-zero conversions** | A campaign receives clicks but no trial starts. | Tracking break, landing-page failure, payment outage, audience mismatch, normal low volume. |\n| **Conversion-rate discontinuity** | Paywall-to-trial conversion drops sharply in one day. | App release, paywall configuration, price issue, experiment allocation, event tracking. |\n| **Geo inconsistency** | One country suddenly has much worse performance than comparable markets. | Localised content, pricing, payment method, platform outage, creative mismatch. |\n| **Time-of-day pattern** | A metric declines only during certain hours. | Timezone mismatch, batch process, daily budget exhaustion, reporting delay. |\n| **Attribution discrepancy** | MMP installs and platform-reported installs diverge significantly. | Attribution windows, SKAN delay, configuration, consent change, data freshness. |\n\n### The Anomaly Triage Process\n\nUse the following order. It prevents time being wasted on a false alarm.\n\n| Step | Question | Example action |\n| --- | --- | --- |\n| **1. Validate** | Is the data complete and correctly filtered? | Check refresh time, date range, timezone, and dashboard status. |\n| **2. Quantify** | How large is the change, and where does it begin? | Compare current vs. baseline by day, geo, platform, and funnel stage. |\n| **3. Scope** | Is it isolated or widespread? | Determine whether the issue affects one app version, geo, network, or the entire business. |\n| **4. Correlate** | What changed at the same time? | Check app releases, campaigns, pricing, payment systems, experiments, and tracking changes. |\n| **5. Contain** | Is immediate action needed to limit loss? | Pause a broken campaign, alert the owner, or cap spend while diagnosing. |\n| **6. Document** | What did we observe and what was resolved? | Add the issue and fix to the decision log. |\n\n### Practical Exercise\n\nCreate an **Anomaly Checklist** for the team’s daily performance review. It should include the exact threshold or condition that triggers investigation for spend, CPI, trial starts, revenue, funnel conversion, and tracking health.\n\n---\n"
      },
      {
        "order": 6,
        "slug": "from-raw-data-to-ad-hoc-analysis",
        "title": "From Raw Data to Ad-Hoc Analysis",
        "content": "## From Raw Data to Ad-Hoc Analysis\n\n*Excel, SQL, and Python*\n\n### Why This Lesson Exists\n\nDashboards are built for recurring questions. Ad-hoc analysis is how the team answers new questions quickly. A UA person should be able to inspect a CSV export, clean a simple dataset, calculate summary metrics, and communicate limitations without needing an analyst for every question.\n\nThe goal is not to replace the data team. The goal is to reduce the time between a question and an informed first answer.\n\n### Choose the Right Tool\n\n| Tool | Best use case | Example UA task |\n| --- | --- | --- |\n| **Excel / Google Sheets** | Fast exploratory work, small-to-medium files, pivot tables, charting. | Compare campaign spend, trial starts, and Day0 revenue by geo. |\n| **SQL** | Repeatable analysis directly against structured company data. | Retrieve all users from a cohort and calculate trial-to-paid conversion by campaign. |\n| **Python** | Larger datasets, repeatable data cleaning, joining files, or deeper analysis. | Combine MMP and subscription exports, detect outliers, or automate a recurring report. |\n\nA UA person should begin with the simplest tool that can answer the question reliably. Do not use Python to answer a question that a pivot table can answer in ten minutes. Do not rely on a spreadsheet if the same query should become a recurring, reproducible dashboard.\n\n### Ad-Hoc Analysis Workflow\n\n1. **Write the question first.** State the decision the analysis should inform.\n2. **Inspect the data dictionary.** Understand every column, event definition, date format, and currency field.\n3. **Check data quality.** Look for missing values, duplicates, unusual zeros, inconsistent naming, and timezone issues.\n4. **Create the smallest useful summary.** Start with totals by day, geo, platform, campaign, or creative.\n5. **Segment only when needed.** Drill down based on the pattern, not curiosity alone.\n6. **Document assumptions.** State attribution window, cohort date, currency conversion, and any exclusions.\n7. **Share a decision-oriented conclusion.** Do not only send a spreadsheet; explain what it means and what should happen next.\n\n### Practical Exercise\n\nTake a recent campaign export and create a pivot table with the following structure:\n\n| Dimension | Metrics |\n| --- | --- |\n| Geo, platform, campaign, and creative | Spend, impressions, clicks, installs, trial starts, Day0 revenue, CPI, cost per trial, and Day0 ROAS |\n\nIdentify one segment that looks strong on an early metric but weak on a downstream metric. Explain why this distinction matters.\n\n---\n"
      },
      {
        "order": 7,
        "slug": "attribution-fundamentals",
        "title": "Attribution Fundamentals",
        "content": "## Attribution Fundamentals\n\n*MMP Logic and the Post-ATT / SKAN Environment*\n\n### Why This Lesson Exists\n\nAttribution is the process of assigning credit for an install, conversion, or revenue event to a marketing touchpoint. It is essential for UA because ad platforms optimise toward the signals they receive. But attribution is never a perfect reconstruction of reality. It is a measurement system with rules, windows, privacy limits, delays, and modelled elements.\n\nA UA person must learn to use attribution data confidently without treating it as absolute truth.\n\n### The Role of Each System\n\n| System | Primary role | Question it helps answer |\n| --- | --- | --- |\n| **Ad network** | Delivers ads and reports platform-side engagement and attributed outcomes. | What does Meta or TikTok believe it generated and optimised toward? |\n| **MMP** | Independently measures mobile acquisition and attributes app events under defined rules. | Which media source receives credit for an install or app event? |\n| **Product analytics** | Understands what users do inside the product. | What did the acquired users do after installation? |\n| **Subscription / payment platform** | Records commercial lifecycle events. | Did the user start, convert, renew, refund, or fail payment? |\n| **Business-intelligence layer** | Joins data sources into the company’s reporting logic. | What is the best available view of profitability and cohort quality? |\n\nNo single tool is always “the truth.” Different systems may show different valid numbers because they use different attribution windows, event definitions, timezones, privacy rules, and reporting dates.\n\n### Attribution Models at a Conceptual Level\n\n| Concept | Meaning | Why it matters |\n| --- | --- | --- |\n| **Click-through attribution** | Credit is assigned after a user clicks an ad and converts within a configured window. | Usually closer to a direct response relationship, but still depends on the rules. |\n| **View-through attribution** | Credit is assigned after an impression without a click, if conversion follows within a window. | Can be useful for awareness effects but should be interpreted carefully. |\n| **Deterministic attribution** | Attribution based on a direct, privacy-permitted identifier or match. | Usually more precise when available. |\n| **Probabilistic or modelled attribution** | Attribution inferred from available signals or statistical models. | More common under privacy restrictions; useful but less individually certain. |\n| **Attribution window** | The allowed time between touchpoint and conversion. | Changing it can materially change reported platform performance. |\n\n### Post-ATT and SKAN: The Practical Implication\n\nApp Tracking Transparency reduces the availability of user-level tracking for users who do not consent. SKAdNetwork provides privacy-preserving, aggregated attribution signals for iOS campaigns. The important operational consequence is not that measurement has disappeared. It is that measurement is less immediate, less granular, and more dependent on aggregation and modelling.\n\nThis means the UA person should:\n\n- Expect discrepancies between platform reports, MMP reports, and internal revenue dashboards.\n- Avoid reacting to a single incomplete day of iOS data.\n- Use cohort maturity, blended business performance, and consistent comparison windows.\n- Understand which conversion events are available to each platform and whether those signals are timely and reliable.\n- Escalate suspected tracking or configuration changes quickly, especially when anomalies affect all campaigns simultaneously.\n\n### Practical Exercise\n\nChoose one campaign and compare its performance in the ad network, the MMP, and the internal BI dashboard. Record the reported installs, trials, and revenue where available. For each discrepancy, list at least one plausible explanation before deciding that any system is “wrong.”\n\n---\n\n### Chapter 2 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Event-based thinking** | Explains the user behaviour represented by a key event and the decision it supports. |\n| **Funnel literacy** | Builds and interprets an onboarding-to-trial funnel without confusing the location of a problem with its cause. |\n| **Dashboard discipline** | Turns a vague concern into a precisely filtered business question. |\n| **Cohort analysis** | Compares equivalent cohorts and avoids immature or blended comparisons. |\n| **Statistical literacy** | States when a result is directional, decision-ready, or inconclusive. |\n| **Anomaly diagnosis** | Uses a structured process before escalating an abnormal metric. |\n| **Attribution awareness** | Explains why MMP, ad-network, and internal data can differ without treating any single source as infallible. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 2 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Which event design is most useful for analysing onboarding progression?",
          "options": [
            "screen_viewed",
            "onboarding_step_completed with a step_name property",
            "app_opened without any properties",
            "purchase_successful only"
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "A funnel shows a large drop from paywall view to trial start. What can the funnel alone tell you?",
          "options": [
            "The paywall design definitely caused the drop.",
            "The exact creative responsible for the drop.",
            "The location of a potential problem that requires further segmentation and diagnosis.",
            "That the campaign should be paused immediately."
          ],
          "correctAnswer": 2
        },
        {
          "order": 3,
          "question": "Which cohort comparison is valid for evaluating D7 retention?",
          "options": [
            "Compare the D7 retention of a January cohort with the D30 retention of a February cohort.",
            "Compare D7 retention for two cohorts that have both reached at least seven days of maturity.",
            "Compare the current day’s D7 retention with yesterday’s D0 trial-start rate.",
            "Compare all-time retention against one campaign’s weekly CTR."
          ],
          "correctAnswer": 1
        },
        {
          "order": 4,
          "question": "Which is the best way to begin a Metabase analysis?",
          "options": [
            "Browse every dashboard until a pattern appears.",
            "Start with the decision to be made, then define the population, metric, time period, comparison, and segmentation required.",
            "Export every available table into a spreadsheet.",
            "Ask for a dashboard before identifying the business question."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "A dashboard suddenly shows zero trial starts for all geos. What should be the first step in anomaly triage?",
          "options": [
            "Conclude that all ads have stopped working.",
            "Validate whether the data is complete, refreshed, correctly filtered, and using the expected timezone.",
            "Increase campaign budget to restore volume.",
            "Change the paywall immediately."
          ],
          "correctAnswer": 1
        },
        {
          "order": 6,
          "question": "Why might an ad platform, an MMP, and an internal BI dashboard report different conversion totals?",
          "options": [
            "Only one system can ever be correct.",
            "They may use different attribution windows, event definitions, timezones, privacy rules, and reporting dates.",
            "Internal BI dashboards never include purchase data.",
            "MMPs do not track installs."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 3,
    "slug": "uas-funnel-analysis-and-optimisation",
    "title": "Funnel Analysis and Optimisation",
    "description": "A UA person must learn to see growth as one connected system, not a collection of channel metrics. This chapter teaches how to map the journey from an ad impression to subscription renewal, diagnose where value is lost, segment the problem correctly, and propose disciplined conversion experiments.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "full-funnel-mapping",
        "title": "Full-Funnel Mapping",
        "content": "## Full-Funnel Mapping\n\n*Impression → Install → Onboarding → Paywall → Trial → Converted → Renewal*\n\n### Why This Lesson Exists\n\nUA quality cannot be judged at the top of the funnel alone. A campaign may produce cheap impressions, low-cost clicks, or even cheap installs while attracting users who do not understand the product, start a trial, convert to paid, or renew. Conversely, a more expensive campaign may be more profitable because the users it attracts have stronger intent and retention.\n\nThe full-funnel map is the shared language that connects media buying, creative, onboarding, monetisation, retention, and customer support.\n\n### The Core Consumer Subscription Funnel\n\n| Stage | User behaviour | Core metrics | Common question |\n| --- | --- | --- | --- |\n| **Impression** | A potential user sees an ad. | CPM, reach, frequency, thumb-stop rate where available. | Are we buying attention efficiently from a relevant audience? |\n| **Click / landing-page visit** | The user engages with the ad or arrives on the funnel. | CTR, CPC, landing-page view rate. | Does the creative promise generate qualified curiosity? |\n| **Install / app open** | The user downloads or opens the app. | CPI, install rate, first-open rate. | Is the ad-to-product transition smooth and accurately tracked? |\n| **Onboarding** | The user answers questions, completes steps, or receives a plan. | Step completion, onboarding completion, activation rate. | Do users understand why they should continue? |\n| **Paywall view** | The user sees the commercial offer. | Paywall view rate, time to paywall. | Are enough qualified users reaching the offer? |\n| **Trial start** | The user accepts an introductory offer. | Trial-start rate, cost per trial, Day0 revenue. | Is the offer relevant, clear, and trusted? |\n| **Paid conversion** | A trial user becomes a paying subscriber. | Trial-to-paid conversion, cost per paid subscriber. | Were trial users genuinely high intent? |\n| **Renewal** | A subscriber continues beyond the initial billing cycle. | Renewal rate, voluntary churn, involuntary churn. | Does the user continue to perceive ongoing value? |\n\nEach stage is connected mathematically. For example:\n\n> **Cost per trial = Cost per install ÷ install-to-trial conversion rate.**\n\nIf cost per trial rises, the cause may be a more expensive install, lower onboarding completion, weaker paywall conversion, or a combination. Never assume the cause from the final metric alone.\n\n### Build a Funnel Map Before Diagnosing\n\nBefore analysing performance, define the exact events, data source, and owner for each stage. This avoids debates caused by inconsistent definitions.\n\n| Stage | Event / definition | Primary data source | Main owner(s) |\n| --- | --- | --- | --- |\n| Ad impression and spend | Platform-reported delivery | Meta / TikTok Ads Manager | UA |\n| Install and source | Attributed app install | MMP | UA / analytics |\n| Onboarding progression | Defined in-app events | Amplitude / product analytics | Product / growth |\n| Trial start and paid conversion | Subscription lifecycle event | Adapty / payment system / BI | Growth / finance |\n| Renewal, churn, refund | Subscription and payment status | Subscription platform / BI | Growth / customer operations |\n\nThis map should live in one visible place. If a metric cannot be located in the map, either the measurement is missing or the definition is unclear.\n\n### Identify the Highest-Leverage Leak\n\nDo not automatically prioritise the stage with the highest percentage drop. A late-stage conversion might have a high percentage loss but affect very few users. A smaller drop early in a high-volume funnel may create a larger commercial opportunity.\n\nPrioritise the leak based on three factors:\n\n| Factor | Meaning | Example |\n| --- | --- | --- |\n| **Volume affected** | Number of users entering the stage. | A 3-point drop in onboarding completion affects thousands of incoming users. |\n| **Magnitude of the gap** | Difference between current and expected or benchmark performance. | Paywall-to-trial conversion fell from 15% to 10%. |\n| **Downstream value** | Expected revenue or retention impact if improved. | Improving trial quality may create more long-term LTV than increasing raw trial volume. |\n\nA simple prioritisation approach is to estimate the number of incremental downstream conversions that would result from a realistic improvement at each stage. This does not need to be exact to be useful; it creates a more commercial conversation than “the drop is biggest here.”\n\n### Practical Exercise\n\nCreate a one-page full-funnel map for one app and one primary acquisition path. Include the current conversion rate at each stage, the weekly user volume, the data source, and the owner. Identify the top two potential leaks and explain why they are commercially important.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "segmented-funnel-analysis",
        "title": "Segmented Funnel Analysis",
        "content": "## Segmented Funnel Analysis\n\n*Platform, Language Market, Campaign, and Creative Breakdowns*\n\n### Why This Lesson Exists\n\nA blended funnel can hide the real source of a problem. An apparent business-wide decline may be caused by a single country, one app version, a particular creative angle, or a specific campaign. Conversely, a segment that appears strong at the top of the funnel may be weak once later quality is considered.\n\nThe purpose of segmentation is not to produce more tables. It is to identify the dimensions that explain a meaningful performance difference.\n\n### Core Segments for UA Work\n\n| Segment | What it can reveal | Typical action if it diverges |\n| --- | --- | --- |\n| **Platform** | Different app behaviour, pricing, payment methods, or release issues on iOS vs. Android. | Check version distribution, event instrumentation, store flow, and platform-specific UX. |\n| **Geo / language market** | Cultural relevance, purchasing power, localisation, pricing, or payment differences. | Review localised creative, pricing, copy, payment options, and support feedback. |\n| **Channel** | Different audience intent and delivery mechanisms across Meta, TikTok, ASA, and others. | Evaluate channel quality through downstream conversion and retention, not CPI alone. |\n| **Campaign / ad set** | Delivery strategy, audience, placement, or bid differences. | Compare campaign settings and traffic quality; avoid changing multiple variables at once. |\n| **Creative / angle** | The promise in the ad can attract different types of users. | Link creative messages to onboarding consistency and downstream cohort quality. |\n| **Funnel variant** | Different onboarding, paywall, or pricing experiences. | Assess controlled test results using the intended experiment population. |\n\n### Drill-Down Sequence\n\nWhen investigating a movement, start with a broad comparison and move toward the smallest segment that explains it. A useful sequence is:\n\n> Overall business → channel → platform → geo → campaign → creative → funnel variant → app version or event detail.\n\nDo not start at the deepest level unless there is a specific reason. Deep segmentation too early can lead to accidental pattern-finding in small samples.\n\n### Example Diagnosis\n\nSuppose the blended cost per trial increased by 20% week over week. A disciplined breakdown might reveal:\n\n| Layer | Finding | Interpretation |\n| --- | --- | --- |\n| Overall | Cost per trial +20% | Confirmed top-line problem. |\n| Channel | Meta stable; TikTok +55% | Problem concentrated in TikTok. |\n| Platform | TikTok iOS +70%; Android stable | Likely iOS-specific or campaign-mix issue. |\n| Geo | US iOS +80%; other geos stable | Problem concentrated in one market. |\n| Creative | New benefit-led creative has high spend and lower install-to-trial rate | Possible traffic-quality or promise-alignment issue. |\n| Funnel | Onboarding completion stable; paywall-to-trial down | Problem is more likely commercial-message fit than app onboarding. |\n\nThis is not proof that the new creative caused the decline, but it creates a strong, testable direction for the next action.\n\n### Practical Exercise\n\nChoose one currently important funnel metric, such as cost per trial or trial-start rate. Segment it by platform, geo, channel, campaign, and creative. Create a short diagnosis stating:\n\n1. The largest contributing segment to the total movement.\n2. The earliest funnel stage at which this segment diverges.\n3. The two most plausible explanations.\n4. The next action required to validate or mitigate the issue.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "leading-versus-lagging-metrics",
        "title": "Leading versus Lagging Metrics",
        "content": "## Leading versus Lagging Metrics\n\n*Why This Lesson Exists*\n\nA subscription business needs time to know whether a cohort truly retains and generates profitable lifetime value. A UA team cannot wait months before making every decision. Leading metrics provide faster feedback; lagging metrics validate long-term quality.\n\nThe mistake is not using leading metrics. The mistake is treating them as the final outcome.\n\n### Definitions\n\n| Metric type | Definition | Examples |\n| --- | --- | --- |\n| **Leading metric** | A relatively early signal that may predict later success or failure. | CTR, CPI, onboarding completion, paywall view rate, trial-start rate, Day0 revenue. |\n| **Lagging metric** | A later outcome that confirms sustained commercial or product value. | Trial-to-paid conversion, D30 retention, renewal rate, realised LTV, payback period. |\n\n### How to Use Them Together\n\nEach decision should identify the fastest credible signal and the final validation metric.\n\n| Decision | Early signal | Validation metric | Risk of relying on the early signal alone |\n| --- | --- | --- | --- |\n| New creative angle | CTR, landing-page rate, install-to-trial rate | Trial conversion, D7 retention, revenue per install | The ad may attract clicks without qualified users. |\n| Onboarding variant | Onboarding completion, paywall view rate | Trial start, D7 engagement, paid conversion | More users may finish onboarding without being more likely to pay. |\n| New price point | Day0 revenue, trial start | Trial-to-paid, refund rate, renewal, LTV | A short-term revenue increase may harm long-term conversion or trust. |\n| New acquisition channel | CPI, trial-start CPA | Retention, LTV, payback | Cheap traffic may be low intent or non-incremental. |\n\nA good UA operator sets **guardrails**. For example, a creative can be scaled on strong early trial economics, but only up to a controlled spend level until D7 or D30 quality confirms the early signal.\n\n### Practical Exercise\n\nFor each of the following initiatives, define one leading metric, one lagging metric, and one guardrail metric:\n\n| Initiative | Leading metric | Lagging metric | Guardrail |\n| --- | --- | --- | --- |\n| New Meta creative |  |  |  |\n| New TikTok campaign |  |  |  |\n| New onboarding flow |  |  |  |\n| Annual-first paywall |  |  |  |\n\n---\n"
      },
      {
        "order": 4,
        "slug": "the-onboarding-funnel-and-notification-activation-sequence",
        "title": "The Onboarding Funnel and Notification / Activation Sequence",
        "content": "## The Onboarding Funnel and Notification / Activation Sequence\n\n*The 14-Day Kegel Men Onboarding Example*\n\n### Why This Lesson Exists\n\nFor many subscription apps, onboarding is the bridge between the promise made in the ad and the value the user expects to receive. It should not be viewed as a series of screens to complete. It is a sequence that establishes relevance, trust, momentum, and an early path to value.\n\nThe Kegel Men example should be used as a practical case study. The exact screens, programme, and notification logic may change, but the analytical principles remain the same.\n\n### The Onboarding Job to Be Done\n\nA strong onboarding journey must usually achieve five things:\n\n| Job | What the user should feel or understand | Example mechanism |\n| --- | --- | --- |\n| **Recognition** | “This product understands my specific situation.” | Personalised questions, language that reflects the user’s goal or pain point. |\n| **Credibility** | “This is trustworthy and could help me.” | Clear explanation, relevant proof, realistic outcomes, transparent offer. |\n| **Investment** | “I have already put effort into creating my plan.” | Quiz answers, goal selection, personal plan creation. |\n| **Momentum** | “I know what to do next.” | A clear first action, immediate programme preview, simple next-step CTA. |\n| **Commercial readiness** | “The subscription offer matches the value I expect.” | Paywall shown after value framing, appropriate plan and trial structure. |\n\n### Map the 14-Day Activation Sequence\n\nThe product team should map the user journey beyond the purchase or trial event. For the Kegel Men onboarding example, the learner should understand the planned path from the first session through the first two weeks.\n\n| Lifecycle point | Desired user behaviour | Potential metric | Possible intervention if weak |\n| --- | --- | --- | --- |\n| **Day 0** | Complete onboarding, understand plan, start first value action. | Onboarding completion; first-session completion; trial start. | Simplify the flow; improve value framing; adjust paywall timing. |\n| **Day 1** | Return and complete or continue the programme. | D1 return; second-session completion. | Reminder notification; clearer first-day goal; reduce friction. |\n| **Day 3–5** | Begin forming a routine and seeing relevance. | Active days; programme progress; notification interaction. | Personalised encouragement; progress feedback; relevant education. |\n| **Day 7** | Recognise progress and maintain commitment. | D7 retention; session completion; support contacts. | Progress summary; new goal prompt; troubleshoot common blockers. |\n| **Day 14** | Continue using the app with an established habit. | D14 retention; value-action frequency; churn risk signals. | Re-engagement sequence; content refresh; habit reinforcement. |\n\nThe purpose of notifications is not simply to increase opens. The purpose is to help the user take the next valuable action. A notification that increases opens but creates annoyance, opt-outs, or no meaningful activity is not successful.\n\n### Analyse the Activation Sequence\n\nWhen a cohort has weak early retention, ask:\n\n1. Did the user reach the intended value action on Day 0?\n2. Did the right notification or in-app prompt reach the user at the right time?\n3. Was the message personalised to their stated goal and stage?\n4. Did the product make progress visible and rewarding?\n5. Is the problem more acute for one acquisition source, geo, platform, or onboarding variant?\n\n### Practical Exercise\n\nMap the current Kegel Men journey from ad impression to Day 14. For each touchpoint, record the intended user behaviour, current metric, message or experience shown, and the biggest known risk. Identify one activation hypothesis that could improve Day 1 or Day 7 retention.\n\n---\n"
      },
      {
        "order": 5,
        "slug": "funnel-visualisation",
        "title": "Funnel Visualisation",
        "content": "## Funnel Visualisation\n\n*Sankey Diagrams and Decision Tables*\n\n### Why This Lesson Exists\n\nA funnel analysis is only useful if stakeholders can understand where users are lost and what should happen next. The correct visualisation depends on the question. Do not use a complex chart because it looks sophisticated; use a visual that makes the decision clearer.\n\n### When to Use a Table\n\nA table is often the best choice when the audience needs exact numbers, comparison across segments, or a concise action recommendation.\n\n| Funnel stage | Current volume | Conversion from prior step | Change vs. prior week | Main segment driving change | Next action |\n| --- | --- | --- | --- | --- | --- |\n| Install |  |  |  |  |  |\n| Onboarding complete |  |  |  |  |  |\n| Paywall viewed |  |  |  |  |  |\n| Trial started |  |  |  |  |  |\n| Trial converted |  |  |  |  |  |\n\nUse this format for weekly reporting, problem diagnosis, and test-readout documents.\n\n### When to Use a Sankey Diagram\n\nA Sankey diagram is useful when the central question is how users flow across multiple paths or branches. For example, it can show which onboarding paths users take, where they abandon, or which subscription products they select.\n\nA Sankey diagram is less useful when the data is small, the funnel is strictly linear, or the audience needs exact conversion percentages. In those cases, a table or conventional funnel chart is clearer.\n\n### Visualisation Quality Checklist\n\nBefore sharing a funnel visualisation, check the following:\n\n| Check | Why it matters |\n| --- | --- |\n| The date range and cohort definition are visible. | Prevents confusion about data maturity and comparability. |\n| Every stage has a consistent definition. | Ensures that no stage compares incompatible events. |\n| The relevant segment is stated. | A chart for all users can hide a material platform or geo issue. |\n| The main insight is written in one sentence. | The audience should not have to infer the conclusion themselves. |\n| The recommended next action is explicit. | Analysis should lead to a decision, not only observation. |\n\n### Practical Exercise\n\nCreate either a funnel table or Sankey visual for one user journey. Add a one-sentence title that states the insight and a one-sentence recommended next action. Ask a teammate to review it: if they cannot explain the key issue in 30 seconds, simplify the visual.\n\n---\n"
      },
      {
        "order": 6,
        "slug": "app-onboarding-and-user-psychology",
        "title": "App Onboarding and User Psychology",
        "content": "## App Onboarding and User Psychology\n\n*The Aha! Moment and Ad-to-Funnel Consistency*\n\n### Why This Lesson Exists\n\nAn ad creates an expectation. The onboarding experience must immediately confirm that expectation, make the product feel relevant, and lead the user toward an early experience of value. When the ad promise and the funnel experience are inconsistent, users may still install but are less likely to convert or remain engaged.\n\n### The Aha! Moment\n\nThe **Aha! Moment** is the point at which a user first understands or experiences why the product is valuable to them. It is not necessarily a single screen. It can be a combination of personalisation, a relevant plan, a first completed activity, or visible progress.\n\nFor a health app, the Aha! Moment might occur when the user sees a personalised programme that makes them believe the app can address their specific goal. The job of onboarding is to move the user there quickly without reducing credibility or overwhelming them.\n\n### Ad-to-Funnel Consistency\n\n| Ad promise | Funnel continuation | Risk if inconsistent |\n| --- | --- | --- |\n| “Build a stronger pelvic floor in minutes a day.” | The first onboarding screen acknowledges the goal, asks relevant questions, and presents a manageable plan. | The user feels misled or does not see the relevance of the experience. |\n| “A private routine for men’s health.” | The app communicates privacy, discretion, and personalised support immediately. | The user encounters generic messaging and drops before the paywall. |\n| “See a plan built around your goal.” | The quiz visibly contributes to the plan displayed before the offer. | The quiz feels like friction rather than personalisation. |\n\nThe task is not to repeat the ad word for word. The task is to maintain a coherent narrative from attention to value.\n\n### Trust, Motivation, and Friction\n\nOnboarding conversion is influenced by several psychological factors:\n\n| Factor | Strong implementation | Weak implementation |\n| --- | --- | --- |\n| **Relevance** | Uses the user’s selected goal and language to frame the programme. | Shows generic benefit statements that could apply to anyone. |\n| **Trust** | Provides transparent terms, credible framing, and clear expectations. | Uses exaggerated promises or hides commercial terms. |\n| **Commitment** | Lets users make small, meaningful choices that shape their plan. | Creates lengthy questions with no visible benefit. |\n| **Clarity** | Makes the next step obvious and explains the benefit of acting. | Uses ambiguous CTAs and unclear progress. |\n| **Friction control** | Asks only for information that meaningfully improves the experience. | Adds unnecessary fields, permissions, or delays before value. |\n\n### Practical Exercise\n\nChoose one top-performing ad and one underperforming ad. Compare the first three screens of the funnel each user sees after engaging. Identify where the promise is reinforced, weakened, or contradicted. Write one hypothesis to improve consistency for the underperforming path.\n\n---\n"
      },
      {
        "order": 7,
        "slug": "a-b-testing-and-conversion-rate-optimisation",
        "title": "A/B Testing and Conversion Rate Optimisation",
        "content": "## A/B Testing and Conversion Rate Optimisation\n\n*Variable Isolation, Significance in Practice, and ICE Prioritisation*\n\n### Why This Lesson Exists\n\nConversion-rate optimisation is not random design iteration. It is a structured process for improving a user journey through disciplined experimentation. The junior standard is to understand what is being tested, why it is being tested, how success is judged, and what can and cannot be concluded from the result.\n\n### Variable Isolation\n\nA test should ideally change one meaningful variable at a time. If a team changes the hook, onboarding copy, paywall design, and price at once, it may learn whether the combined package performs differently, but it will not know why.\n\n| Test design | What it can teach | Limitation |\n| --- | --- | --- |\n| **Single-variable test** | Whether one specific change improved the defined metric. | May be slower to discover high-performing combinations. |\n| **Multi-variable package test** | Whether a coherent new experience outperforms the old experience. | Cannot isolate which element created the effect. |\n| **Sequential test** | Whether learning from one test can inform the next. | Requires a documented learning loop and consistent measurement. |\n\nUse a package test when the whole experience must work together. Use single-variable tests when the team needs a clear causal learning.\n\n### Test Brief Template\n\nEvery experiment should start with a brief before implementation.\n\n| Field | Required content |\n| --- | --- |\n| **Problem** | What user or business problem are we trying to solve? |\n| **Hypothesis** | “If X, then Y, because Z.” |\n| **Population** | Which platform, geo, traffic source, or user segment is included? |\n| **Control and variant** | What exactly differs between the experiences? |\n| **Primary metric** | The main success metric. |\n| **Secondary metrics** | Useful supporting evidence. |\n| **Guardrails** | Metrics that must not materially worsen. |\n| **Sample and duration** | How much traffic or time is required before reading the result? |\n| **Decision rule** | What result leads to rollout, iteration, pause, or no decision? |\n\n### ICE Prioritisation\n\nWhen many ideas are available, use a simple prioritisation framework. ICE scores an opportunity on **Impact**, **Confidence**, and **Ease**.\n\n| Criterion | Question | Score guidance |\n| --- | --- | --- |\n| **Impact** | If this works, how much could it improve a relevant business metric? | Prioritise the biggest reachable bottlenecks. |\n| **Confidence** | How strong is the evidence that it will work? | Higher when supported by data, user research, or repeated learnings. |\n| **Ease** | How quickly and cheaply can it be implemented and measured? | Higher for simple, reversible tests with clear instrumentation. |\n\nICE is not a substitute for judgment. It is a shared way to make trade-offs visible and avoid prioritising only the most exciting idea.\n\n### Practical Exercise\n\nCreate an ICE backlog containing five funnel or onboarding hypotheses. For each, state the problem, hypothesis, primary metric, impact score, confidence score, ease score, and proposed next action. Review the top-ranked idea with the team before launch.\n\n---\n\n### Chapter 3 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Full-funnel thinking** | Maps acquisition performance from impression to renewal and identifies the highest-leverage leak. |\n| **Segmentation** | Identifies the segment that explains a blended movement without over-cutting the sample. |\n| **Metric judgment** | Uses early indicators for speed while retaining downstream validation metrics and guardrails. |\n| **Activation understanding** | Explains how onboarding, notifications, and early value moments influence D1/D7 behaviour. |\n| **CRO discipline** | Writes a test brief with a single clear hypothesis, metrics, guardrails, and a decision rule. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 3 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Which approach best identifies the **highest-leverage funnel leak**?",
          "options": [
            "Always choose the stage with the highest percentage drop.",
            "Prioritise based on affected volume, size of the gap, and expected downstream commercial value.",
            "Always begin with the last stage because it is closest to revenue.",
            "Focus only on the stage owned by the UA team."
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "Blended cost per trial rises by 20%. Which drill-down sequence is most appropriate?",
          "options": [
            "Creative → app version → campaign → overall business.",
            "Overall business → channel → platform → geo → campaign → creative → funnel variant.",
            "Paywall → renewal → install → creative.",
            "Immediately split data into every possible segment."
          ],
          "correctAnswer": 1
        },
        {
          "order": 3,
          "question": "Which is the best classification of a **leading metric** for a new creative test?",
          "options": [
            "D30 retention.",
            "Renewal rate.",
            "Trial-start rate.",
            "Realised lifetime value after six months."
          ],
          "correctAnswer": 2
        },
        {
          "order": 4,
          "question": "What is the primary purpose of an onboarding notification sequence?",
          "options": [
            "Maximise notification opens regardless of user behaviour.",
            "Encourage the user to take the next meaningful value action at the right time.",
            "Replace the need for a usable product.",
            "Send the same message to every user every day."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "When is a Sankey diagram most useful?",
          "options": [
            "When the question is how users move across multiple paths or branches in a journey.",
            "When the audience needs one exact number for a linear funnel step.",
            "When the available data has no stage definitions.",
            "When only a daily spend total is being reported."
          ],
          "correctAnswer": 0
        },
        {
          "order": 6,
          "question": "Why should an A/B test isolate variables where possible?",
          "options": [
            "So that no user can see the control experience.",
            "So that a performance difference can be more confidently connected to the intended change.",
            "So that the variant always receives more traffic.",
            "So that the team can avoid defining a hypothesis."
          ],
          "correctAnswer": 1
        },
        {
          "order": 7,
          "question": "In an ICE prioritisation framework, which factor reflects how strongly existing data or user insight supports an idea?",
          "options": [
            "Impact",
            "Confidence",
            "Ease",
            "Frequency"
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 4,
    "slug": "uas-pricing-analysis",
    "title": "Pricing Analysis",
    "description": "Pricing is not a finance-only decision. In a subscription app, the price, trial structure, billing cadence, and offer presentation shape conversion, Day0 revenue, refunds, retention, LTV, and the amount the business can profitably spend to acquire a user. This chapter gives the UA person the commercial vocabulary and analytical discipline to support pricing decisions without treating price as an isolated funnel metric.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "subscription-pricing-building-blocks",
        "title": "Subscription Pricing Building Blocks",
        "content": "## Subscription Pricing Building Blocks\n\n*Trial Length, Weekly / Monthly / Annual Mix*\n\n### Why This Lesson Exists\n\nA subscription offer is a package of multiple decisions, not merely a number shown on a paywall. The trial length, price, billing period, offer hierarchy, introductory terms, and renewal conditions all influence what type of user starts a trial and whether they become a healthy long-term subscriber.\n\n### The Main Components of an Offer\n\n| Component | Definition | Main behavioural effect |\n| --- | --- | --- |\n| **Trial length** | The time before the first paid charge. | Reduces initial friction but can attract users with weak commitment if misaligned with time-to-value. |\n| **Billing cadence** | Weekly, monthly, quarterly, annual, or another recurring period. | Shapes perceived affordability, commitment, renewal timing, and expected LTV. |\n| **Price point** | The amount charged at each billing event. | Directly affects willingness to start and the value captured from converters. |\n| **Plan ordering** | Which plan is default, highlighted, or listed first. | Influences the user’s reference point and choice architecture. |\n| **Introductory offer** | Discount, free trial, or limited-time offer. | Can increase conversion, but may affect refund behaviour and long-term quality. |\n| **Renewal terms** | Price and cadence after the introductory period. | Determines future value and must be communicated transparently. |\n\nA pricing offer should be evaluated as a complete commercial experience. For example, an annual plan may produce higher Day0 revenue, but the user’s willingness to choose it depends on the perceived value, confidence, price presentation, trial structure, and audience context.\n\n### The Trade-Off Between Friction and Quality\n\nMore generous trials and lower entry prices can increase trial starts. They may also reduce commitment or create a larger group of users who cancel before or immediately after billing. Conversely, a higher-friction offer may reduce volume but improve quality.\n\n| Offer change | Potential upside | Potential risk |\n| --- | --- | --- |\n| Longer free trial | More trial starts; lower immediate barrier. | More low-intent users; longer time before revenue confirmation. |\n| Shorter trial | Faster feedback and payment confirmation. | Lower trial-start rate if users do not have time to experience value. |\n| Weekly plan emphasis | Lower apparent commitment; more accessible price point. | Higher churn, more payment failures, and weaker long-term value. |\n| Annual plan emphasis | Higher Day0 revenue; stronger cash flow; potentially higher commitment. | Lower conversion if the upfront commitment is too high. |\n| Discounted introductory price | Stronger initial conversion. | Can anchor users to lower perceived value or increase discount-seeking behaviour. |\n\nThere is no universally correct mix. The right structure depends on the app’s time-to-value, product category, audience purchasing power, channel, geography, and existing cohort data.\n\n### The Pricing Funnel\n\nA price does not only affect the moment of payment. It can affect every stage of the journey.\n\n| Funnel stage | Pricing-related question |\n| --- | --- |\n| **Creative / ad** | Does the advertisement set an expectation that the offer supports? |\n| **Onboarding** | Has the user seen enough relevant value before encountering the price? |\n| **Paywall view** | Are the offer, billing cadence, trial terms, and savings clear? |\n| **Trial start** | Does the entry offer reduce friction without lowering user quality too much? |\n| **Trial conversion** | Has the user experienced sufficient value before the first charge? |\n| **Renewal** | Do users believe the ongoing price remains justified by the value received? |\n| **Refund / support** | Are the commercial terms transparent enough to avoid surprise and distrust? |\n\n### Practical Exercise\n\nFor the app’s current paywall, document the complete offer structure in one table: trial length, every plan and price, default selection, introductory terms, renewal terms, and any geo-specific variation. Then answer: what behaviour is each component intended to encourage?\n\n---\n"
      },
      {
        "order": 2,
        "slug": "ltv-cac-balance-and-the-profitability-effect-of",
        "title": "LTV:CAC Balance and the Profitability Effect of Pricing",
        "content": "## LTV:CAC Balance and the Profitability Effect of Pricing\n\n*Why This Lesson Exists*\n\nThe amount the company can spend on user acquisition is constrained by the future value of the acquired user. Pricing affects that value directly through revenue per subscriber and indirectly through conversion, churn, refunds, and payment behaviour.\n\nThe UA person should understand the relationship well enough to avoid simplistic decisions such as “a higher price is always better” or “more trials always means more profitable growth.”\n\n### Core Definitions\n\n| Metric | Conceptual definition | Why it matters to UA |\n| --- | --- | --- |\n| **CAC** | Cost required to acquire a customer or subscriber under the company’s definition. | Indicates how much paid acquisition costs. |\n| **LTV** | Expected net value generated by a user or customer over their lifetime. | Determines whether acquisition spending can be justified. |\n| **LTV:CAC** | Ratio of expected lifetime value to acquisition cost. | A high-level indicator of unit-economic health. |\n| **Payback period** | Time required for contribution from a cohort to recover its acquisition cost. | Determines how aggressively the company can reinvest cash in growth. |\n| **Day0 revenue / ROAS** | Revenue attributable at or shortly after acquisition relative to spend. | A fast but incomplete early signal of monetisation quality. |\n\nA simple conceptual relationship is:\n\n> **Expected LTV = probability of trial start × probability of paid conversion × expected net revenue over paid lifetime.**\n\nPricing can influence every part of this relationship. A lower price could raise trial starts but lower revenue per paid user. An annual-first offer could increase Day0 revenue but reduce trial starts. The correct choice depends on the *net* impact on expected LTV and payback, not a single conversion metric.\n\n### Pricing Scenarios and UA Implications\n\n| Scenario | Immediate metric likely to improve | Downstream risk or question | UA implication |\n| --- | --- | --- | --- |\n| Lower annual price | Paywall-to-trial conversion. | Does increased conversion offset lower revenue per payer and possible weaker retention? | Recalculate expected LTV and acceptable CAC. |\n| Higher weekly price | Day0 revenue per converter. | Does it reduce trial starts or increase early churn and refunds? | Monitor volume, paid conversion, refund rate, and renewal quality. |\n| Annual plan as default | Day0 revenue and cash collection. | Does it discourage price-sensitive but valuable users? | Analyse effects by geo and acquisition source. |\n| Longer trial | Trial-start rate. | Does it delay revenue, increase cancellations, or reduce paid conversion? | Use D0–D14 engagement and eventual conversion as guardrails. |\n\n### Gross Revenue Is Not the Same as Economic Value\n\nWhen discussing LTV and profitability, clarify whether the number includes or excludes factors such as platform fees, payment-processing fees, tax, refunds, chargebacks, promotional discounts, customer support cost, and other variable costs.\n\nA UA person may not own the full financial model, but they should never assume that gross price equals net contribution. When reporting a result, use the company’s agreed definition and state it clearly.\n\n### Practical Exercise\n\nSelect two current subscription plans. For each, map the logic from paywall view to expected lifetime value. List the assumptions required, including trial-start rate, trial-to-paid rate, refund rate, renewal behaviour, and relevant fees. Identify which assumption has the highest impact on the final LTV estimate.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "market-based-pricing",
        "title": "Market-Based Pricing",
        "content": "## Market-Based Pricing\n\n*Purchasing-Power Parity Logic and Nine Language Markets*\n\n### Why This Lesson Exists\n\nUsers in different markets can face different purchasing power, price expectations, payment preferences, legal environments, and cultural perceptions of value. A price that converts well in one language market may create unnecessary friction or leave value uncaptured in another.\n\nMarket-based pricing is not simply a currency conversion exercise. It is a commercial and behavioural decision that should be evaluated against local performance data.\n\n### What Purchasing-Power Parity Means in Practice\n\nPurchasing-power parity, or PPP, is a conceptual way to recognise that the same nominal price represents a different financial burden across markets. In app pricing, the operational question is:\n\n> “For this target user in this market, does the offer feel proportionate to the value and to local alternatives?”\n\nThis does not mean every market should have a unique price. It means the team should actively examine whether a global price is creating avoidable conversion or retention differences.\n\n### Factors to Consider by Market\n\n| Factor | Why it can change performance |\n| --- | --- |\n| **Purchasing power** | A price may be affordable in one market and prohibitively high in another. |\n| **Currency and price ending** | Local currency and familiar price points can affect clarity and trust. |\n| **Payment preference** | Some markets rely more heavily on specific cards, wallets, or store billing. |\n| **Competitive reference points** | Local alternatives may establish a different expected price range. |\n| **Language and localisation quality** | Poor translation can reduce perceived value or create legal/commercial confusion. |\n| **Product relevance** | The problem, solution framing, and willingness to pay may vary by culture or user need. |\n| **Channel and creative mix** | Users arriving through a particular angle may respond differently to price. |\n\n### Analytical Framework for Nine Language Markets\n\nUse a repeatable scorecard instead of reacting only to volume or raw revenue.\n\n| Market | Price / plan mix | Trial-start rate | Trial-to-paid rate | Refund / chargeback rate | D7 / D30 retention | Revenue per install | Key interpretation |\n| --- | --- | --- | --- | --- | --- | --- | --- |\n| Market 1 |  |  |  |  |  |  |  |\n| Market 2 |  |  |  |  |  |  |  |\n| Market 3 |  |  |  |  |  |  |  |\n\nCompare equivalent cohorts and ensure the channel mix is considered. A market with weaker conversion may also receive different traffic, see different creatives, or have a different app-store payment experience.\n\n### Guardrails for Local Pricing Tests\n\nA local price change should have more than one success metric. If a lower price increases trial starts but reduces revenue per install, the net effect may be negative. Suggested guardrails include:\n\n| Primary goal | Supporting metrics | Guardrail metrics |\n| --- | --- | --- |\n| Improve trial-start rate | Paywall engagement; install-to-paywall rate. | Revenue per install; refund rate; paid conversion. |\n| Improve Day0 revenue | Annual-plan share; paid conversion. | Trial-start rate; early cancellation; support complaints. |\n| Improve long-term LTV | Renewal rate; retention by cohort. | Chargebacks; regional customer-support volume; CAC change. |\n\n### Practical Exercise\n\nBuild a pricing scorecard for the company’s nine language markets using the most recent mature cohorts. Identify one market that is a candidate for deeper pricing research. Write the evidence, competing explanations, and a cautious first test proposal.\n\n---\n"
      },
      {
        "order": 4,
        "slug": "price-a-b-test-design-and-result-interpretation",
        "title": "Price A/B Test Design and Result Interpretation",
        "content": "## Price A/B Test Design and Result Interpretation\n\n*Why This Lesson Exists*\n\nPrice tests can be highly valuable and highly risky. They affect revenue, user trust, refund behaviour, platform configuration, and the meaning of historical comparisons. A clean test requires careful setup, transparent terms, defined success criteria, and appropriate review before launch.\n\n### What Can Be Tested\n\n| Test variable | Example | Main question |\n| --- | --- | --- |\n| **Price point** | $39.99/year vs. $49.99/year. | Does the higher price increase revenue per install enough to offset conversion loss? |\n| **Plan order / default** | Annual-first vs. monthly-first. | Does choice architecture change plan mix and total value? |\n| **Trial length** | 3-day vs. 7-day trial. | Does the additional time improve paid conversion and retention? |\n| **Savings framing** | “Save 60%” vs. “Less than $X per week.” | Which value explanation improves informed conversion? |\n| **Offer framing** | Free trial vs. introductory discount. | Which entry path produces stronger long-term cohort quality? |\n\n### Test Design Principles\n\n| Principle | What it requires |\n| --- | --- |\n| **Clear hypothesis** | State the expected behavioural mechanism, not just a desired revenue result. |\n| **One interpretable change** | Isolate the price variable where possible. If more changes are bundled, document that the result is package-level. |\n| **Controlled allocation** | Assign comparable users to control and variant through a reliable experiment mechanism. |\n| **Transparent terms** | Ensure users can understand price, trial, renewal, and cancellation terms. |\n| **Appropriate duration** | Run long enough to include sufficient traffic and relevant commercial events. |\n| **Downstream readout** | Include paid conversion, refunds, retention, and renewal where maturity permits. |\n| **Rollback plan** | Define how the team will respond if a guardrail deteriorates materially. |\n\n### Result Interpretation\n\nA price test should not be called a winner simply because it produced higher Day0 revenue. Use a layered scorecard.\n\n| Metric layer | Example metrics | Why it matters |\n| --- | --- | --- |\n| **Exposure and reach** | Assigned users; paywall views. | Confirms that the comparison population is meaningful. |\n| **Initial conversion** | Trial-start rate; plan selection; checkout completion. | Shows immediate response to the offer. |\n| **Early commercial value** | Day0 revenue per install; Day0 ROAS. | Indicates fast monetisation impact. |\n| **Quality guardrails** | Refunds; support contacts; cancellation rate; app engagement. | Protects user trust and detects low-quality conversion. |\n| **Long-term validation** | Trial-to-paid; retention; renewal; LTV. | Determines whether the test creates durable value. |\n\n### Practical Exercise\n\nWrite a complete test brief for one price or paywall-order hypothesis. Include the hypothesis, population, control, variant, primary metric, guardrails, maturity window, stakeholders who must review it, and the decision rules for rollout, iteration, or rollback.\n\n---\n"
      },
      {
        "order": 5,
        "slug": "competitor-pricing-benchmarking",
        "title": "Competitor Pricing Benchmarking",
        "content": "## Competitor Pricing Benchmarking\n\n*Why This Lesson Exists*\n\nCompetitor research provides context, not a price recommendation. A competitor may charge more because it has stronger brand equity, a different target audience, a more mature product, a different channel mix, or a different monetisation model. The purpose of benchmarking is to understand the market’s offer architecture and identify questions worth testing.\n\n### What to Benchmark\n\n| Dimension | What to capture | Why it matters |\n| --- | --- | --- |\n| **Price points** | Trial, weekly, monthly, annual, lifetime, and regional prices where visible. | Establishes the commercial range users may encounter. |\n| **Trial structure** | Duration, price after trial, and consent / cancellation messaging. | Shows how competitors balance friction and commitment. |\n| **Plan hierarchy** | Default plan, highlighted plan, savings labels, and price framing. | Reveals choice-architecture patterns. |\n| **Paywall message** | Value proposition, proof, urgency, and privacy language. | Connects commercial offer to user motivation. |\n| **Feature access** | What is free, paid, gated, or included in each tier. | Helps explain price differences through perceived value. |\n| **Retention offer** | Discounts, win-back offers, or cancellation flows if observable. | Indicates how the competitor protects revenue quality. |\n| **Geo variation** | Differences across relevant language markets. | Identifies local-price or local-message adaptation. |\n\n### Benchmarking Discipline\n\nDo not copy a competitor’s price because it appears successful. Instead, write a structured observation:\n\n> “Competitor X places the annual plan first, communicates weekly-equivalent savings, and offers a short trial in Market Y. This may indicate that the category can support annual commitment when the plan’s value is framed in weekly terms. We do not yet know whether their retention, refund rate, or paid acquisition economics support this approach.”\n\nThis distinction protects the team from converting external observation into unsupported certainty.\n\n### Practical Exercise\n\nBuild a benchmark table for three direct competitors in one target market. Summarise their plan structure, trial, price framing, value proposition, and visible cancellation or refund messaging. Finish with three specific hypotheses that could be explored in the company’s own funnel.\n\n---\n\n### Chapter 4 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Offer literacy** | Documents and explains the full structure of an app’s subscription offer. |\n| **Unit-economic thinking** | Explains why a change in price must be judged through LTV, CAC, and payback rather than conversion alone. |\n| **Market awareness** | Compares equivalent market cohorts and proposes a cautious local-pricing research question. |\n| **Experimentation discipline** | Writes a price-test brief with metrics, guardrails, transparency, and rollout criteria. |\n| **Competitive judgment** | Uses competitor pricing to generate hypotheses rather than copy decisions. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 4 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Which statement best describes a subscription offer?",
          "options": [
            "It is only the price displayed on the paywall.",
            "It is a package including price, trial length, billing cadence, plan hierarchy, introductory terms, and renewal conditions.",
            "It is the same as an app-store listing.",
            "It only affects users after they have converted to paid."
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "A longer free trial increases trial starts. What is the most important follow-up question?",
          "options": [
            "Did the trial start rate increase by more than 1%?",
            "Does the longer trial also improve paid conversion, retention, and expected LTV enough to justify the delayed revenue and potential lower-intent volume?",
            "Can the team remove all cancellation information from the paywall?",
            "Does the app need a new icon?"
          ],
          "correctAnswer": 1
        },
        {
          "order": 3,
          "question": "Why should pricing decisions be evaluated through LTV:CAC and payback rather than only paywall conversion?",
          "options": [
            "Price never changes revenue per payer.",
            "A price can affect conversion, revenue per user, refunds, churn, and the company’s ability to reinvest in acquisition.",
            "CAC is only relevant for ecommerce businesses.",
            "Paywall conversion cannot be measured."
          ],
          "correctAnswer": 1
        },
        {
          "order": 4,
          "question": "What is the most appropriate first step when investigating whether a market needs a local pricing test?",
          "options": [
            "Convert the US price into the local currency and launch it immediately.",
            "Compare equivalent cohorts by market, including trial starts, paid conversion, refunds, retention, revenue per install, traffic mix, and local context.",
            "Copy the lowest competitor price.",
            "Remove annual plans from every market."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "Which metric is the strongest example of a **pricing-test guardrail**?",
          "options": [
            "The number of slides in the weekly presentation.",
            "Refund rate or early cancellation rate.",
            "The number of active competitors.",
            "The app icon’s colour."
          ],
          "correctAnswer": 1
        },
        {
          "order": 6,
          "question": "What is the best use of competitor pricing research?",
          "options": [
            "Copy the price and plan hierarchy of the largest competitor.",
            "Use competitor observations to understand market offer structures and generate hypotheses that must be validated with internal data and tests.",
            "Assume every active competitor ad is profitable.",
            "Replace internal cohort data with app-store screenshots."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 5,
    "slug": "uas-user-acquisition-paid-channels",
    "title": "User Acquisition: Paid Channels",
    "description": "This chapter introduces the working mechanics of paid acquisition for a consumer subscription app. The goal is not to turn a UA person into an autonomous media buyer overnight. The goal is to build a sound mental model of Meta and TikTok campaign structure, bidding, conversion signals, web-to-app flows, and market intelligence so that the learner can support decisions with the right questions and analysis.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "meta-and-tiktok-ads-fundamentals",
        "title": "Meta and TikTok Ads Fundamentals",
        "content": "## Meta and TikTok Ads Fundamentals\n\n*Campaign Structure and Bid Strategies*\n\n### Why This Lesson Exists\n\nMeta and TikTok are not simply interfaces for launching ads. They are machine-learning systems that use available signals to decide whom to show an ad to and how aggressively to compete in an auction. A UA person must understand how account structure and bid choices affect the system’s ability to learn.\n\nThe key principle is:\n\n> **The platform can optimise only toward the objective and signal it receives, and it can learn only from the data and budget available to it.**\n\n### Account Structure: The Hierarchy\n\nAlthough interfaces change, both platforms generally organise advertising activity through a hierarchy.\n\n| Level | Main purpose | Typical decisions |\n| --- | --- | --- |\n| **Account** | Financial, permissions, pixel/SDK, and overall business setup. | Payment method, user access, data-source connection, account-level restrictions. |\n| **Campaign** | High-level marketing objective and budget logic. | App promotion, conversion objective, budget allocation approach, high-level geo split. |\n| **Ad set / ad group** | Delivery conditions and audience logic. | Geo, placement, optimisation event, bid strategy, audience, schedule. |\n| **Ad / creative** | The message and experience shown to the user. | Video, static, hook, copy, CTA, landing URL, tracking parameters. |\n\nWhen reading performance, begin by identifying which level is most likely responsible for the movement. A creative-level issue requires a different response from a campaign-budget or conversion-event issue.\n\n### Meta and TikTok: Same Objective, Different Native Behaviour\n\n| Dimension | Meta | TikTok | UA implication |\n| --- | --- | --- | --- |\n| **User context** | Users often consume a mixed feed of personal, community, and commercial content. | Users expect fast, entertainment-led, creator-style content. | A creative that works on Meta may feel too polished or too slow on TikTok. |\n| **Creative expectation** | Can support both polished direct-response creative and native-looking executions. | Strongly rewards fast, culturally native, hook-first creative. | Test channel-native executions rather than cloning an asset. |\n| **Audience approach** | Broad targeting can work well when conversion signals are sufficient. | Delivery often depends heavily on creative and optimisation-event feedback. | Avoid assuming an audience strategy transfers perfectly across platforms. |\n| **Measurement reality** | Uses platform reporting, MMP, modelled signals, and server-side signals where available. | Similar need for multiple measurement views; the details differ by implementation. | Compare like-for-like windows and use internal cohort quality as validation. |\n\nThe shared lesson is that the creative and the conversion event are often more important than overly complicated interest targeting.\n\n### Campaign-Structure Principles\n\nA good structure makes it easy to learn, control risk, and understand performance. It should avoid both extremes: scattering budget across too many small ad sets and placing incompatible markets, objectives, or offers inside one opaque structure.\n\n| Principle | Why it matters | Junior UA question to ask |\n| --- | --- | --- |\n| **Clear purpose per campaign** | Separates testing, scaling, retargeting, or geo-specific activity. | What is this campaign supposed to learn or achieve? |\n| **Sufficient budget per learning unit** | Small fragmented budgets can prevent meaningful delivery and comparison. | Does each ad set have enough volume to produce a credible signal? |\n| **Comparable audience conditions** | Enables fair comparison of creative or bidding decisions. | Are we changing audience, bid, creative, and geo at the same time? |\n| **Consistent naming** | Improves reporting, auditing, and handover. | Can we understand the campaign’s app, geo, objective, and test purpose from its name? |\n| **Controlled creative lifecycle** | Prevents fatigue and avoids losing track of test status. | Is this creative in discovery, early test, scale, refresh, or retirement? |\n\n### Bid Strategies\n\nBidding tells the platform how aggressively the advertiser is willing to compete in the auction and what cost or value constraint matters.\n\n| Strategy | Core idea | Best suited for | Main risk |\n| --- | --- | --- | --- |\n| **Lowest cost / maximise volume** | Let the platform seek the most results for available budget. | Early exploration or when scale and learning matter more than tight cost control. | Costs can rise if auction conditions change or signal quality weakens. |\n| **Cost cap / cost control** | Aim to keep cost around a desired threshold. | When a credible target CPA exists and delivery volume is still important. | Too restrictive a cap can limit spend or trap delivery in narrow inventory. |\n| **Bid cap** | Limit the maximum auction bid. | More advanced control when auction mechanics and value are well understood. | Can sharply restrict delivery and increase volatility. |\n| **Value / ROAS optimisation** | Optimise toward users expected to generate higher value. | When high-quality value signals are available and sufficiently mature. | Weak or delayed value signals can mislead the algorithm. |\n\nThe junior standard is not to change bids automatically when performance moves. First determine whether the movement is due to creative, audience mix, measurement, funnel conversion, budget pace, seasonality, or genuine auction pressure.\n\n### Practical Exercise\n\nOpen one active Meta campaign and one active TikTok campaign. For each, document the objective, optimisation event, geos, budget, audience logic, bid strategy, active creatives, and the decision it is meant to support. Identify one structural difference between the campaigns and explain why it exists.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "conversion-measurement-and-signal-processing",
        "title": "Conversion Measurement and Signal Processing",
        "content": "## Conversion Measurement and Signal Processing\n\n*CAPI, Signal Loss, and Platform Mechanics*\n\n### Why This Lesson Exists\n\nPlatforms make optimisation decisions based on conversion signals. If the signal is late, incomplete, duplicated, poorly matched, or disconnected from business value, campaign performance can deteriorate even when the creative and audience are unchanged.\n\nA UA person must be able to recognise the difference between a delivery problem and a measurement problem, and know when to bring in the appropriate technical or analytics owner.\n\n### The Signal Chain\n\nA simplified signal path looks like this:\n\n> User sees or clicks an ad → user visits web or installs app → user completes a meaningful event → event is recorded → event is sent to analytics / MMP / ad network → ad network uses the signal to optimise future delivery.\n\nAt any point, the chain can fail or become incomplete.\n\n| Signal stage | Example failure | Possible symptom |\n| --- | --- | --- |\n| **Ad click / landing** | Broken deep link or incorrect URL parameter. | Low install or app-open rate after clicks. |\n| **In-app event** | Event is not fired after a release. | Paywall or trial events suddenly disappear in analytics. |\n| **Server-side event** | CAPI configuration or payload issue. | Platform reports fewer purchase events or lower event quality. |\n| **Identity matching** | Consent, browser, or identifier limitations. | More discrepancy between platform and internal reporting. |\n| **Event selection** | Platform optimises on a weak proxy. | Cheap early events but poor paid conversion or LTV. |\n\n### Client-Side and Server-Side Signals\n\n| Signal type | What it means | Strength | Limitation |\n| --- | --- | --- | --- |\n| **Client-side** | Event is sent from a browser or mobile device. | Immediate and close to user interaction. | Can be affected by privacy controls, ad blockers, app restrictions, and connectivity. |\n| **Server-side** | Event is sent from the company’s backend or trusted server environment. | More resilient for commercial events and can include richer validated data. | Requires correct implementation, event matching, deduplication, and governance. |\n\nConversions API, often called CAPI in a Meta context, is a server-side approach for providing conversion events to the platform. It does not remove all measurement uncertainty. It improves the reliability and completeness of available signals when implemented correctly.\n\n### Event Quality and Optimisation Value\n\nAn event should be chosen based on its relationship to business value and its availability at sufficient volume and speed.\n\n| Optimisation event | Advantage | Limitation |\n| --- | --- | --- |\n| **Install** | High volume; fast feedback. | May optimise toward low-intent users. |\n| **Onboarding complete** | Closer to product engagement. | Still may not correlate strongly with revenue. |\n| **Trial start** | Commercially meaningful early event. | Can be delayed and may include low-intent trial users. |\n| **Subscription conversion / purchase** | More strongly tied to revenue. | Lower volume and longer feedback loop. |\n| **Renewal / value event** | Closest to long-term quality. | Often too delayed or sparse for direct platform optimisation. |\n\nThe correct event can differ by account maturity, volume, channel, geo, and business objective. A UA person should understand the trade-off rather than assume that the deepest event is always best.\n\n### Signal Loss and the Post-Privacy Environment\n\nSignals can be lost or delayed due to user consent choices, app-tracking restrictions, browser behaviour, operating-system privacy rules, cookies, ad blockers, and differences in reporting logic. This is why platform-reported conversions, MMP-attributed conversions, and internal revenue may not match exactly.\n\nA useful operating response is to triangulate:\n\n| Question | Appropriate source or comparison |\n| --- | --- |\n| Did spend and platform delivery change? | Ad-platform reporting. |\n| Did attributed installs or app events change? | MMP and product analytics. |\n| Did real trials, revenue, or payment outcomes change? | Subscription platform and BI layer. |\n| Did the full business move or only one reporting system? | Compare across the above sources. |\n\n### Practical Exercise\n\nCreate a signal map for the company’s main acquisition path. For each conversion event used in advertising, document the event name, system where it originates, system where it is sent, expected delay, key quality risk, and current owner. Highlight one potential single point of failure.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "web-to-app-funnels-and-web-subscriptions",
        "title": "Web-to-App Funnels and Web Subscriptions",
        "content": "## Web-to-App Funnels and Web Subscriptions\n\n*Why This Lesson Exists*\n\nA web-to-app funnel can create advantages in experimentation speed, measurement, pricing control, and payment economics. It also introduces a critical handoff: users who have paid or subscribed on the web must successfully install, open, and activate the app without losing context or trust.\n\nThe UA person should be able to analyse this path as one connected funnel rather than treating web conversion and app engagement as separate businesses.\n\n### The Typical Web-to-App Journey\n\n> Ad impression → click → landing page → quiz or pre-sell flow → web paywall → payment / checkout → account or access confirmation → app download → first app open → entitlement recognition → first value action\n\nEach stage can lose users. The handoff after payment is especially important because the user has already expressed commercial intent; a failure here represents both a poor user experience and lost lifetime value.\n\n### Why Businesses Use Web-to-App Flows\n\n| Potential advantage | What it can enable | Operational question |\n| --- | --- | --- |\n| **Experiment speed** | Faster web-copy, quiz, pricing, and paywall iterations. | Are experiments properly tagged and connected to later app behaviour? |\n| **Measurement flexibility** | More direct web-event visibility than some native flows. | Are web and app identities joined reliably? |\n| **Payment economics** | Different fee structure and payment options relative to native stores. | Are fees, refunds, taxes, and support processes understood? |\n| **Offer control** | Greater flexibility in plan presentation and landing-page messaging. | Are terms transparent and consistent with the app experience? |\n| **Funnel personalisation** | Quiz answers can inform the experience before and after purchase. | Does personalisation genuinely improve value or create unnecessary friction? |\n\n### Analyse the Web-to-App Handoff\n\nKey questions include:\n\n| Stage | Diagnostic question |\n| --- | --- |\n| **Checkout completion** | Are users dropping before payment due to trust, price, payment method, or technical friction? |\n| **Download prompt** | Is the next step clear immediately after purchase? |\n| **App install** | What share of purchasers installs the app, and how quickly? |\n| **First open / login** | Does the app recognise the user’s entitlement without confusion? |\n| **Activation** | Do web purchasers complete their first meaningful action at the same rate as native purchasers? |\n| **Support / refunds** | Are support tickets or refunds concentrated at a particular handoff point? |\n\n### Web-to-App Measurement Table\n\n| Stage | Metric | Source | Common issue to investigate |\n| --- | --- | --- | --- |\n| Landing-page visit | Landing-page view rate | Web analytics / ad platform | Slow page, message mismatch, invalid traffic. |\n| Quiz start / completion | Quiz completion rate | Web analytics | Too many questions, unclear reason to continue. |\n| Paywall view / checkout | Paywall-to-checkout rate | Web analytics | Poor offer framing, price shock, low trust. |\n| Payment completion | Checkout completion rate | Payment system | Payment-method friction, technical errors, failed authentication. |\n| App install / open | Purchaser-to-first-open rate | Deep-link / app analytics | Unclear download journey, lost credentials, entitlement issue. |\n| First value action | Activation rate | Product analytics | App experience does not continue the web promise. |\n\n### Practical Exercise\n\nComplete the live web-to-app flow as a test user, or review a recorded session. Document every screen, message, event, and handoff. Identify three points at which a paid user could become confused or abandon the journey, and propose one measurement or UX improvement for each.\n\n---\n"
      },
      {
        "order": 4,
        "slug": "competitor-analysis-and-market-intelligence",
        "title": "Competitor Analysis and Market Intelligence",
        "content": "## Competitor Analysis and Market Intelligence\n\n*Pricing Trends, Feature Positioning, and Geo Context*\n\n### Why This Lesson Exists\n\nMarket intelligence helps the UA team understand the promises, offers, formats, and user expectations present in the category. It should improve the quality of internal hypotheses, not replace internal data or lead to blind imitation.\n\nThe UA person should develop a regular habit of observing the market and translating observations into testable questions.\n\n### What to Monitor\n\n| Area | What to observe | Why it matters |\n| --- | --- | --- |\n| **Creative angles** | Pain points, claims, hooks, formats, creator styles, and calls to action. | Reveals category messages competing for the user’s attention. |\n| **Feature positioning** | What outcome or mechanism competitors emphasise. | Helps distinguish product value propositions and find gaps. |\n| **Pricing and offer design** | Trial, plan hierarchy, discounts, paywall copy, and annual savings framing. | Provides commercial context and input for pricing hypotheses. |\n| **App-store presence** | Keywords, screenshots, ratings, updates, and review themes. | Indicates organic strategy and user-perceived strengths or weaknesses. |\n| **Geo localisation** | Language, cultural references, price display, and local proof. | Shows how competitors adapt the value proposition by market. |\n| **User feedback** | Reviews, social comments, complaints, and questions. | Reveals unmet needs, trust gaps, and potential funnel friction. |\n\n### Separate Observation from Inference\n\nA strong competitive note has three levels:\n\n| Level | Example |\n| --- | --- |\n| **Observation** | “Competitor A has run five new UGC-style Meta ads in the past two weeks, all opening with a direct pain-point question.” |\n| **Inference** | “The category may be finding this hook format effective for cold traffic, or the competitor may be rapidly searching for a scalable angle.” |\n| **Internal question** | “Should we test a pain-point-first UGC concept for our US male audience while holding the offer and landing page constant?” |\n\nThe inference must remain tentative until internal tests and data support it.\n\n### A Lightweight Intelligence Routine\n\n| Frequency | Activity | Expected output |\n| --- | --- | --- |\n| **Weekly** | Review active competitor ads and notable new creative formats. | Three observations and one potential creative or funnel hypothesis. |\n| **Biweekly** | Review app-store changes, ratings, reviews, and pricing/offer updates. | Short competitor update with possible user-insight themes. |\n| **Monthly** | Summarise category patterns by geo and platform. | Market-intelligence snapshot for growth and creative teams. |\n| **Ad hoc** | Investigate a new entrant, sudden competitor scale, or relevant platform trend. | Decision-oriented brief: what changed, why it may matter, what to test or monitor. |\n\n### Practical Exercise\n\nChoose one direct competitor. Prepare a one-page intelligence brief containing: their target audience; three recurring creative messages; visible plan and trial structure; app-store positioning; two recurring review themes; and one hypothesis the company could test without copying the competitor.\n\n---\n\n### Chapter 5 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Platform structure** | Reads a Meta or TikTok campaign by account, campaign, ad set / ad group, and creative level. |\n| **Bid awareness** | Explains the reason for a bid choice and the trade-off between cost control, delivery, and learning. |\n| **Signal literacy** | Maps an optimisation event from user action to platform feedback and identifies likely failure points. |\n| **Web-to-app thinking** | Analyses the complete journey from web acquisition through app activation. |\n| **Market intelligence** | Separates external observation from internal inference and proposes a testable question. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 5 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "What is the most accurate description of Meta and TikTok advertising platforms?",
          "options": [
            "Static tools that show ads equally to every selected user.",
            "Machine-learning systems that use objectives, signals, budgets, audiences, and creative inputs to make delivery decisions.",
            "Spreadsheet tools used only for reporting.",
            "Platforms where targeting matters but creative and conversion events do not."
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "At which campaign-hierarchy level would you typically define a creative’s hook, video, copy, CTA, and destination URL?",
          "options": [
            "Account level.",
            "Campaign level.",
            "Ad set or ad group level.",
            "Ad or creative level."
          ],
          "correctAnswer": 3
        },
        {
          "order": 3,
          "question": "What is a major risk of fragmenting a small budget across many ad sets or ad groups?",
          "options": [
            "The platform may not receive enough volume in each learning unit to deliver or compare performance meaningfully.",
            "All users will automatically see the same ad.",
            "It eliminates the need for campaign naming conventions.",
            "It guarantees a lower CPM."
          ],
          "correctAnswer": 0
        },
        {
          "order": 4,
          "question": "Which statement best explains the role of a conversion event in paid acquisition?",
          "options": [
            "It is a decorative label in a dashboard.",
            "It is a signal sent to a platform that helps it optimise future delivery toward a chosen user action.",
            "It is only relevant after a user renews for the third time.",
            "It replaces all need for internal BI reporting."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "Why might a company use a web-to-app funnel?",
          "options": [
            "To eliminate the need for app activation.",
            "To gain experimentation, measurement, payment, and offer-control flexibility while still ensuring a reliable app-install and entitlement handoff.",
            "To ensure no user can access the mobile app.",
            "To avoid needing customer support."
          ],
          "correctAnswer": 1
        },
        {
          "order": 6,
          "question": "A partner reports strong installs, but users from that partner have weak trial starts, D7 retention, and projected LTV. What is the best interpretation?",
          "options": [
            "The partner is automatically successful because installs are high.",
            "The partner may be delivering low-quality acquisition, so it should be evaluated through downstream cohort quality rather than install volume alone.",
            "The internal product analytics tool must be deleted.",
            "Trial conversion does not matter for subscription apps."
          ],
          "correctAnswer": 1
        },
        {
          "order": 7,
          "question": "Which sequence best separates competitor research from unsupported assumptions?",
          "options": [
            "Observe a competitor ad → copy it exactly → scale it.",
            "Observe a repeated category pattern → form a tentative inference → create an internally testable hypothesis.",
            "Ignore all competitors because only internal data matters.",
            "Treat every competitor’s active ad as evidence of profitable scale."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 6,
    "slug": "uas-creative-strategy-for-visual-platforms",
    "title": "Creative Strategy for Visual Platforms",
    "description": "In Meta and TikTok acquisition, creative is not merely an asset produced by another team. It is a major input into audience selection, platform delivery, user expectation, and downstream conversion quality. This chapter teaches the UA person how to classify creatives, analyse their structure, identify fatigue, investigate competitors, and turn performance observations into clear creative-test requests.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "creative-format-taxonomy",
        "title": "Creative Format Taxonomy",
        "content": "## Creative Format Taxonomy\n\n*UGC, Motion, Static, and Hook-First Executions*\n\n### Why This Lesson Exists\n\nCreative formats are not interchangeable containers. Each format creates a different expectation, pace, level of trust, and mode of attention. A creative taxonomy helps the team compare like with like and avoid vague conclusions such as “UGC works” or “static is dead.”\n\nThe question is not only which asset won. It is:\n\n> “Which combination of format, hook, message, proof, offer, and platform context produced the result, for which audience, and at which stage of the funnel?”\n\n### Core Format Types\n\n| Format | Description | Typical strength | Typical risk |\n| --- | --- | --- | --- |\n| **UGC / creator-style video** | A person speaks or demonstrates in a natural, relatable style. | Can feel credible, personal, and native to social feeds. | Can become repetitive, low-trust, or overly scripted if not executed authentically. |\n| **Motion graphic / explainer** | Uses animation, visual text, product UI, or designed transitions. | Can communicate a mechanism or product benefit clearly. | May feel too polished or slow for a short-form feed if the hook is weak. |\n| **Static image** | Single visual with copy, proof, product image, or before/after-style framing where compliant. | Fast to produce and test; can communicate a focused message. | Limited narrative space; performance may decline quickly in fast-scrolling placements. |\n| **Hook-first montage** | Opens with a strong visual or verbal interruption, then moves quickly into proof and benefit. | Designed to win the first seconds of attention. | Can create a mismatch if the opening overpromises relative to the product. |\n| **Demo / product walkthrough** | Shows how the app works or what the user receives. | Reduces ambiguity and supports high-intent users. | May be too functional to earn initial attention without a strong problem frame. |\n| **Testimonial / social proof** | Communicates a user outcome, quote, review, or expert perspective. | Can increase trust and reduce perceived risk. | Must be credible, compliant, and specific enough to feel real. |\n\nA format should be tagged alongside the angle and hook. For example, “UGC” alone is not a useful insight. “UGC, pain-point-first hook, private-solution angle, app-demo body, annual-plan CTA” is an analysable creative unit.\n\n### Creative Metadata\n\nEvery creative should be catalogued with metadata that supports later analysis.\n\n| Field | Example |\n| --- | --- |\n| Creative ID | `KM_US_META_UGC_PAIN_001` |\n| Platform | Meta or TikTok |\n| Geo / language | US English |\n| Format | UGC, motion, static, demo, etc. |\n| Hook type | Pain point, curiosity, result, mistake, question, social proof. |\n| Angle | Privacy, confidence, health goal, convenience, expert guidance. |\n| Primary message | “Build a daily routine in minutes.” |\n| CTA | Start trial, see your plan, take the quiz. |\n| Funnel path | App install or web quiz / web subscription. |\n| Lifecycle status | Discovery, early test, scale, refresh, sleeping winner, retired. |\n\nThis structure makes it possible to find patterns without relying on memory or subjective impressions.\n\n### Format Is Not the Same as Message\n\nThe same message can be expressed in multiple formats. This is important because a result could be driven by the message rather than the visual execution.\n\n| Message | UGC execution | Motion execution | Static execution |\n| --- | --- | --- | --- |\n| Private health support | Creator shares a personal concern and solution. | Animated explanation of a discreet guided routine. | Simple headline and phone visual highlighting privacy. |\n| Progress in minutes a day | Creator demonstrates routine and describes habit. | Fast timer-based product demo. | Time-saving benefit with clear visual hierarchy. |\n| Personalised plan | User explains quiz-to-plan journey. | Visual flow from answers to plan. | “Your plan, built around your goal” with product screenshot. |\n\nWhen testing, decide whether the goal is to test a new message, a new format, a new hook, or a new proof mechanism. Do not treat all differences as one variable.\n\n### Practical Exercise\n\nTake ten recent creatives and classify them using the metadata table. Identify the two most commonly used format-angle combinations and the two combinations that are missing. Propose one new combination worth testing.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "the-hook-body-and-cta-anatomy",
        "title": "The Hook, Body, and CTA Anatomy",
        "content": "## The Hook, Body, and CTA Anatomy\n\n*Why This Lesson Exists*\n\nMost paid-social creatives have a simple narrative job: stop attention, establish relevance, create belief, and direct a next action. The Hook–Body–CTA model is a practical way to analyse whether the creative performs each job.\n\n### The Hook\n\nThe hook earns the next second of attention. It can be verbal, visual, textual, or a combination. A hook should be relevant to the target user and aligned with the message the funnel will continue.\n\n| Hook type | Example structure | What it can trigger |\n| --- | --- | --- |\n| **Pain-point hook** | “Do you feel like…” | Recognition and emotional relevance. |\n| **Question hook** | “What if your daily routine could…” | Curiosity and self-reflection. |\n| **Mistake hook** | “Most people get this wrong…” | Attention through correction or fear of missing out. |\n| **Result hook** | “I noticed a difference after…” | Aspiration and outcome curiosity. |\n| **Contrarian hook** | “You do not need…” | Pattern interruption and reappraisal. |\n| **Demonstration hook** | Immediate product or action visual. | Fast comprehension and specificity. |\n| **Social-proof hook** | “Thousands of users…” or a credible review. | Trust and category validation. |\n\nA hook should not create empty curiosity. It should attract the people who are most likely to find the product valuable. A high CTR with weak downstream quality often indicates that the hook is broad, misleading, or disconnected from the offer.\n\n### The Body\n\nThe body develops the claim made in the hook. It should establish one or more of the following: mechanism, relevance, proof, product clarity, ease, trust, or differentiated value.\n\n| Body element | Purpose | Example question |\n| --- | --- | --- |\n| **Problem elaboration** | Makes the user feel understood. | Have we described a real and specific struggle? |\n| **Mechanism** | Explains how the product addresses the problem. | Does the user understand what the app actually does? |\n| **Proof** | Increases believability. | Is there credible demonstration, social proof, or product evidence? |\n| **Objection handling** | Reduces resistance. | Have we addressed time, privacy, complexity, or cost concerns? |\n| **Product demonstration** | Makes the experience tangible. | Can the user picture the first action they will take? |\n\nThe body should not try to tell every product story at once. A focused creative usually makes one primary promise and supports it with a small number of credible points.\n\n### The CTA\n\nThe CTA tells the user what to do and why they should do it now. A strong CTA is clear, proportionate to the commitment requested, and consistent with the actual next step.\n\n| CTA type | Use case | Example |\n| --- | --- | --- |\n| **Low-friction exploration** | Quiz or plan-building flow. | “See your personalised plan.” |\n| **Trial initiation** | Offer is ready to be presented. | “Start your free trial.” |\n| **Product discovery** | Demo or educational entry point. | “See how the routine works.” |\n| **Outcome-led** | The benefit is clear and realistic. | “Start building a stronger daily habit.” |\n\nIf the ad says “Get your personalised plan” but the landing page immediately asks for payment without delivering plan context, the CTA-to-funnel relationship is weak.\n\n### Creative Scorecard\n\nUse a structured review before interpreting performance.\n\n| Dimension | Review question | Rating guidance |\n| --- | --- | --- |\n| **Clarity** | Can a new viewer understand the message quickly? | Is the core claim unmistakable? |\n| **Relevance** | Does the intended audience recognise their problem or goal? | Is the target user clear? |\n| **Credibility** | Does the ad provide sufficient reason to believe the claim? | Does it sound truthful and supportable? |\n| **Attention** | Does the opening earn continued viewing? | Is the first frame or phrase specific and native to the platform? |\n| **Flow** | Does the body logically support the hook? | Is there a coherent narrative rather than a list of claims? |\n| **Funnel consistency** | Does the next step deliver the same promise? | Is ad-to-funnel alignment explicit? |\n\n### Practical Exercise\n\nChoose three active ads. For each, write the hook, body promise, proof mechanism, and CTA. Then compare performance across CTR, CPI, install-to-trial conversion, and Day0 revenue. Identify whether the strongest top-of-funnel creative is also the strongest downstream-quality creative.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "creative-fatigue-detection-and-rotation-logic",
        "title": "Creative-Fatigue Detection and Rotation Logic",
        "content": "## Creative-Fatigue Detection and Rotation Logic\n\n*Why This Lesson Exists*\n\nA creative can perform well and still stop performing well. The same audience may see an asset repeatedly, the novelty may decline, competitors may shift category expectations, or the platform may exhaust the most responsive portion of the delivery pool. This is creative fatigue.\n\nThe response is not automatically “turn it off.” The response is to identify the cause, preserve the learning, and decide whether to refresh, rotate, reduce, or reposition the asset.\n\n### Possible Signs of Fatigue\n\n| Signal | Possible interpretation | What to check before deciding |\n| --- | --- | --- |\n| Frequency rises while CTR declines | The audience is seeing the asset too often. | Audience size, spend change, placement mix, seasonal demand. |\n| CPM rises and delivery slows | Auction competitiveness or relevance may have weakened. | Broader account-level CPM, competitor activity, bid changes. |\n| CTR remains stable but conversion drops | The ad may still attract attention but traffic quality or funnel alignment may have changed. | Landing-page and onboarding conversion; app release; paywall. |\n| A creative loses share of spend | Platform may have identified better alternatives or signal quality changed. | New competing creatives, campaign changes, optimisation event. |\n| Performance falls only in one geo or platform | Fatigue may be local or execution-specific. | Local creative relevance, language, placement, and frequency. |\n\nFatigue is a diagnosis, not a label. Always compare the creative to the account, market, and funnel context before attributing a decline to repetition.\n\n### Lifecycle Stages\n\n| Stage | Purpose | Typical operating rule |\n| --- | --- | --- |\n| **Discovery** | Test a new concept with controlled risk. | Limited budget, clear success signal, document the angle and hook. |\n| **Early test** | Validate whether the early result persists beyond a small sample. | Compare against a relevant baseline and check funnel quality. |\n| **Scale** | Increase budget while monitoring efficiency and downstream guardrails. | Increase deliberately; avoid changing too many variables. |\n| **Refresh** | Preserve a validated message while replacing stale execution elements. | Keep the angle; change hook, creator, edit, proof, or visual opening. |\n| **Sleeping winner** | A past winner is paused but stored for potential reuse. | Retain metadata, performance history, and reuse conditions. |\n| **Retired** | No longer a useful testing or scaling asset. | Preserve the learning before removal. |\n\n### Rotation Logic\n\nRotation should be proactive. The creative pipeline must contain new concepts before current winners fully decay. A balanced pipeline usually includes:\n\n- New concepts that test a different user problem, message, or belief.\n- Variations that refresh an existing proven concept.\n- Adaptations of winners for a new geo, audience, or platform.\n- Controlled re-tests of sleeping winners under changed conditions.\n\nThe exact volume will depend on budget and channel maturity. The operating principle is constant: do not let a single winning asset become the entire acquisition strategy.\n\n### Practical Exercise\n\nCreate a creative-lifecycle board for the current active portfolio. For each asset, assign a lifecycle status, record its primary angle and hook, show the last significant performance movement, and specify the next action: scale, refresh, monitor, pause, or re-test.\n\n---\n"
      },
      {
        "order": 4,
        "slug": "sleeping-winner-reactivation-logic",
        "title": "Sleeping-Winner Reactivation Logic",
        "content": "## Sleeping-Winner Reactivation Logic\n\n*Why This Lesson Exists*\n\nAn asset that stopped receiving spend is not necessarily a failed idea. A “sleeping winner” is a creative that previously demonstrated valuable performance but is currently inactive or under-delivering. It may work again when placed in a different context, refreshed, or reintroduced to a new audience.\n\nThe goal is not to endlessly recycle old creatives. The goal is to preserve and intelligently reuse validated market learning.\n\n### Why a Winner Might Stop Working\n\n| Cause | What it means | Potential reactivation approach |\n| --- | --- | --- |\n| **Audience fatigue** | The relevant audience has seen the asset too often. | Reintroduce after a rest period, in a new geo, or to a new audience pool. |\n| **Creative competition** | Newer assets outperform it in the same campaign. | Keep as a benchmark; test a refreshed execution of the same core idea. |\n| **Format decay** | The platform or user culture has shifted away from the execution style. | Preserve the message but rebuild in a more native format. |\n| **Funnel mismatch** | The downstream experience changed since the creative won. | Re-test only after checking ad-to-funnel consistency. |\n| **Seasonal context** | The message was especially relevant at a certain time. | Reintroduce in an appropriate seasonal or behavioural window. |\n| **Budget or delivery change** | The creative was deprioritised for structural rather than conceptual reasons. | Test in a cleaner structure with controlled allocation. |\n\n### Reactivation Decision Framework\n\nBefore reactivating a sleeping winner, answer:\n\n1. What exactly was the creative’s historical strength: CTR, trial quality, Day0 revenue, retention, or a combination?\n2. In which geo, platform, audience, and funnel did it win?\n3. What changed since it was last active?\n4. Is the core message still strategically relevant?\n5. Should we re-run the original, create a refresh, or use it only as a creative brief reference?\n6. What is the controlled test budget and the decision rule?\n\n### Practical Exercise\n\nSelect one past winning creative. Create a reactivation brief containing its historic performance context, original hook and angle, suspected reason for decline, what has changed in the environment, and a proposed refresh or re-test plan.\n\n---\n"
      },
      {
        "order": 5,
        "slug": "competitor-creative-discovery",
        "title": "Competitor-Creative Discovery",
        "content": "## Competitor-Creative Discovery\n\n*Foreplay, Meta / TikTok Ad Library, and Pattern Extraction*\n\n### Why This Lesson Exists\n\nCompetitor creative discovery gives the team a view of the category’s active messages, formats, and testing velocity. It can reveal patterns that are worth investigating, but it should never replace original thinking or internal validation.\n\nThe objective is to identify **patterns**, not to collect isolated ads.\n\n### Research Sources\n\n| Source | What it is useful for | Limitation |\n| --- | --- | --- |\n| **Meta Ad Library** | Publicly visible active ads from advertisers. | Does not reveal exact spend, conversion quality, or historical performance. |\n| **TikTok Creative / Ad Library tools** | Current or recently observed TikTok advertiser activity, where available. | Visibility and detail can vary by market and tool. |\n| **Foreplay or creative-intelligence tools** | Organising, saving, tagging, and comparing creative examples. | Tool data should be treated as research input, not proof of business success. |\n| **App stores and landing pages** | Full message context after the ad click. | May not reflect the exact experience used for every campaign. |\n| **User reviews and social comments** | Real user language, complaints, motivations, and objections. | Individual comments are anecdotal; look for repeated themes. |\n\n### Pattern Extraction Framework\n\nWhen reviewing a creative, do not only save it. Tag it and extract the strategic pattern.\n\n| Field | Example observation |\n| --- | --- |\n| Target user | Men seeking a discreet daily health routine. |\n| Primary problem | Embarrassment, lack of time, lack of confidence. |\n| Hook type | Direct question about a specific symptom or concern. |\n| Format | Creator selfie video with captions. |\n| Proof mechanism | Personal testimonial plus in-app demo. |\n| Offer / CTA | Take a quiz to see a personalised plan. |\n| Platform-native feature | Fast cuts, informal language, captions, trend-adjacent audio. |\n| Internal relevance | Potential fit with private-solution angle; needs compliant and product-true adaptation. |\n\nA useful pattern is repeated across multiple competitors, variations, or markets. A one-off creative could be an experiment that failed, a niche campaign, or a non-scalable idea.\n\n### Practical Exercise\n\nBuild a swipe file of 20 category-relevant ads. Tag each one by format, hook, angle, proof, CTA, platform, and apparent target audience. Summarise the three most repeated patterns and propose one differentiated concept that uses a category insight without copying an individual ad.\n\n---\n"
      },
      {
        "order": 6,
        "slug": "platform-native-differences",
        "title": "Platform-Native Differences",
        "content": "## Platform-Native Differences\n\n*TikTok Organic Feel versus Meta Polished Production*\n\n### Why This Lesson Exists\n\nThe same visual asset can create different reactions across platforms because users bring different expectations to each environment. A creative that feels natural and entertaining on TikTok may look under-produced on Meta. A polished brand-style asset that performs on Meta may feel like an interruption on TikTok.\n\nThis does not mean one platform always wants one format. It means the creative team should adapt the execution to the platform while preserving the underlying message and product truth.\n\n### Practical Comparison\n\n| Element | TikTok tendency | Meta tendency | Testing implication |\n| --- | --- | --- | --- |\n| **Opening** | Immediate interruption, fast context, creator-style language. | Can support direct-response opening, visual proof, or clearer benefit framing. | Test distinct first 1–3 seconds rather than only resizing the video. |\n| **Pacing** | Often fast, conversational, and edit-heavy. | Can support both rapid and more explanatory pacing depending on placement and audience. | Match pace to the user’s attention context and product complexity. |\n| **Production feel** | Native, informal, authentic, sometimes deliberately imperfect. | Can accommodate more polished visual hierarchy and explicit sales framing. | Avoid assuming premium production always increases trust. |\n| **Text and captions** | Often central to comprehension and native style. | Important but may compete with a more established visual layout. | Ensure readability, compliant claims, and a clear hierarchy. |\n| **Social context** | Content discovery and entertainment are central. | Social proof, direct response, and brand familiarity can all matter. | Test message-expression differences, not only visual decoration. |\n\n### Preserve the Strategic Core, Adapt the Execution\n\nSuppose the strategic message is “a discreet personalised routine for men’s health.”\n\n| Platform | Possible execution |\n| --- | --- |\n| **TikTok** | Creator-led first-person story, a fast question hook, natural dialogue, captions, brief app view, and quiz CTA. |\n| **Meta** | Clear problem-benefit opening, strong visual proof or product demo, more explicit plan value, and a direct CTA. |\n\nBoth executions should lead to the same product truth. The difference is how that truth earns attention and trust in the platform context.\n\n### Practical Exercise\n\nChoose one proven strategic angle. Produce or brief two platform-native variations: one for TikTok and one for Meta. For each, specify the first three seconds, format, hook, body proof, CTA, and the downstream metric that will validate quality.\n\n---\n\n### Chapter 6 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Creative classification** | Tags an asset by format, hook, angle, proof, CTA, platform, and lifecycle status. |\n| **Narrative analysis** | Explains how the hook, body, and CTA work together or where the creative breaks down. |\n| **Performance interpretation** | Connects top-funnel creative performance to downstream funnel quality. |\n| **Lifecycle management** | Identifies likely fatigue, refresh, scale, or sleeping-winner reactivation actions. |\n| **Competitive research** | Extracts repeated category patterns without treating competitor activity as proof. |\n| **Platform adaptation** | Briefs different TikTok and Meta executions while preserving a common strategic message. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 6 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Why should creative assets be tagged by more than just format?",
          "options": [
            "Format is the only reason an ad can perform well.",
            "A taxonomy including hook, angle, proof, CTA, platform, geo, and lifecycle status allows the team to identify patterns and compare like with like.",
            "Tags prevent any creative from being launched.",
            "Only design teams need to understand creative metadata."
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "What is the primary job of a creative hook?",
          "options": [
            "Explain every feature of the product in detail.",
            "Earn the next second of attention from the relevant audience while setting up a promise the funnel can continue.",
            "Replace the need for a clear CTA.",
            "Increase frequency as quickly as possible."
          ],
          "correctAnswer": 1
        },
        {
          "order": 3,
          "question": "A creative has strong CTR but weak install-to-trial conversion. What is one plausible explanation?",
          "options": [
            "The creative may be generating attention without attracting sufficiently qualified users or may be misaligned with the landing or onboarding experience.",
            "Strong CTR always guarantees strong LTV.",
            "The campaign must have perfect attribution.",
            "The CTA does not matter."
          ],
          "correctAnswer": 0
        },
        {
          "order": 4,
          "question": "Which is the most disciplined response to suspected creative fatigue?",
          "options": [
            "Turn off all ads immediately without checking other signals.",
            "Diagnose whether the change is driven by frequency, creative novelty, auction conditions, funnel conversion, platform, or geo before deciding to refresh, rotate, reduce, or pause.",
            "Duplicate the creative into every campaign.",
            "Ignore it because all creative performance declines are temporary."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "What is a “sleeping winner”?",
          "options": [
            "A creative that has never received any spend.",
            "A past asset that showed valuable performance but is currently inactive or under-delivering and may be worth refreshing or re-testing in a new context.",
            "A campaign that must always be scaled immediately.",
            "A competitor’s ad that has not been copied yet."
          ],
          "correctAnswer": 1
        },
        {
          "order": 6,
          "question": "What is the best way to adapt a strategic message across TikTok and Meta?",
          "options": [
            "Resize the same ad without changing the first seconds, pace, or presentation style.",
            "Preserve the product truth and strategic message, but create platform-native executions that match each audience’s attention context.",
            "Use polished production only on both platforms.",
            "Use creator-style content only on both platforms."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 7,
    "slug": "uas-data-driven-hypothesis-development",
    "title": "Data-Driven Hypothesis Development",
    "description": "A UA person must learn to turn observations into disciplined actions. This chapter provides a repeatable system for writing hypotheses, designing tests, choosing what to test first, and converting outcomes into durable team learning.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "hypothesis-writing-discipline",
        "title": "Hypothesis-Writing Discipline",
        "content": "## Hypothesis-Writing Discipline\n\n*“If We Do X, Then Y Will Happen, Because Z”*\n\n### Why This Lesson Exists\n\nWithout a written hypothesis, teams often launch changes that cannot be interpreted. They may say that a new creative, funnel, price, or audience “worked” without knowing which behaviour changed, why it may have changed, or whether the result should transfer to a different context.\n\nA hypothesis forces clarity before execution.\n\n### The Core Formula\n\n> **If** we change **X** for **this population**, **then** metric **Y** will move in direction **Z**, **because** mechanism **M** affects user behaviour in this context.\n\n| Component | Definition | Example |\n| --- | --- | --- |\n| **X: Intervention** | The specific thing that will change. | Replace the generic opening with a pain-point-first hook. |\n| **Population** | The users, platform, geo, or traffic segment affected. | Cold Meta traffic in US iOS. |\n| **Y: Metric** | The metric expected to respond. | Install-to-trial conversion. |\n| **Z: Direction / magnitude** | Expected direction and, where appropriate, a meaningful threshold. | Increase without reducing Day0 revenue per install. |\n| **M: Mechanism** | The behavioural explanation. | Earlier relevance helps the intended audience self-select into the funnel. |\n\n### Weak and Strong Hypotheses\n\n| Weak statement | Why it is weak | Stronger version |\n| --- | --- | --- |\n| “Let’s test UGC.” | No target behaviour, audience, or mechanism. | “For TikTok cold traffic, a creator-style UGC opening will improve hold rate and install rate because it better matches the native content context.” |\n| “The paywall should be simpler.” | “Simpler” is subjective and lacks a measurable outcome. | “Removing the second plan-comparison block will improve paywall-to-trial conversion for new users because the current layout may overload users before they understand the primary offer.” |\n| “Germany needs cheaper pricing.” | Assumes cause before analysis. | “German Android users have lower trial-start rates but similar onboarding completion; test a locally adapted annual price framing because the current offer may create disproportionate price friction.” |\n| “Pause this campaign.” | Action without explanation or decision criteria. | “Pause this campaign if cost per trial remains above the agreed threshold after the current observation window, because the decline is concentrated in the creative set and no downstream-quality upside is visible.” |\n\n### Evidence Types\n\nA hypothesis can be informed by several forms of evidence. Stronger confidence comes from multiple supporting sources, but no hypothesis needs perfect proof before a low-risk test.\n\n| Evidence type | Example | Appropriate confidence level |\n| --- | --- | --- |\n| **Funnel data** | Paywall view rate is stable but paywall-to-trial conversion fell after a copy change. | Medium to high if instrumentation is reliable. |\n| **Cohort data** | One creative angle brings stronger D7 retention across repeated cohorts. | Medium; check sample and traffic mix. |\n| **User feedback** | Support tickets repeatedly mention confusion about trial billing. | Medium; validate with funnel behaviour. |\n| **Competitor observation** | Several category competitors use a similar value frame. | Low to medium; useful for ideation, not proof. |\n| **Product insight** | The product team identifies a new value moment users reach late. | Medium; test whether surfacing it earlier changes conversion. |\n| **Prior experiment** | A related test produced a consistent result in the same market. | Higher, but still validate transferability. |\n\n### Practical Exercise\n\nWrite three hypotheses from three different sources: one from a dashboard observation, one from competitor research, and one from user feedback. For each, label the evidence type and confidence level. Review whether the mechanism is plausible and whether the metric genuinely tests the hypothesis.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "test-design",
        "title": "Test Design",
        "content": "## Test Design\n\n*Control Group, Duration, and Sample Size*\n\n### Why This Lesson Exists\n\nA hypothesis becomes useful only when it is tested in a way that produces interpretable evidence. A weak test can waste budget, create false confidence, or make a correct idea appear wrong.\n\nThe UA person should know how to request or support a test design that gives the team a fair comparison.\n\n### Core Components of a Test\n\n| Component | Required question | Example |\n| --- | --- | --- |\n| **Control** | What is the current baseline experience? | Existing Meta creative or current paywall. |\n| **Variant** | What is changing? | Same body and CTA, but a new pain-point-first hook. |\n| **Population** | Who is included and excluded? | New US iOS users from Meta cold traffic. |\n| **Allocation** | How are users or spend distributed? | Random 50/50 assignment or defined controlled campaign split. |\n| **Primary metric** | What determines success? | Trial starts per install. |\n| **Secondary metrics** | What helps interpretation? | CTR, CPI, paywall-view rate, Day0 revenue per install. |\n| **Guardrails** | What must not worsen materially? | Refund rate, crash rate, policy risk, retention quality. |\n| **Duration / sample** | When will we read the result? | After sufficient conversion opportunities and at least one complete delivery cycle. |\n| **Decision rule** | What happens under each result? | Roll out, iterate, pause, or continue collecting evidence. |\n\n### Control Groups and Fair Comparisons\n\nA control group represents the current experience against which the variant is judged. The core purpose is to isolate the intended change from unrelated changes in traffic, seasonality, product releases, or market conditions.\n\n| Comparison problem | Why it creates ambiguity | Better approach |\n| --- | --- | --- |\n| Variant runs this week; control data is from last month. | Seasonality, budget, audience, or app changes may differ. | Run both variants concurrently when possible. |\n| Variant targets US; control targets all geos. | Different market economics make the comparison invalid. | Use the same or carefully matched population. |\n| New creative also uses a new landing page and new price. | A result cannot be attributed to one change. | Test a single variable or document it as a package test. |\n| Variant gets much more spend. | Delivery conditions and learning differ. | Set a deliberate allocation and record it. |\n\n### Duration and Sample Size at a Practical Level\n\nThe correct duration depends on traffic volume, expected conversion rate, variability, and the decision’s risk. A high-volume CTR test can provide early feedback quickly. A price or retention test may require more time because paid conversion and renewal mature later.\n\nUse this operating logic:\n\n| Decision type | Evidence threshold | Why |\n| --- | --- | --- |\n| Low-risk creative variation | Directional early signal plus downstream guardrails. | Easy to iterate and reverse. |\n| Campaign budget increase | Stable performance across enough delivery and conversion volume. | Scaling can create meaningful spend risk. |\n| Paywall or pricing change | Stronger statistical and commercial evidence; longer maturity. | Affects user trust, revenue, and later behaviour. |\n| Tracking / optimisation-event change | Technical validation plus controlled performance monitoring. | Can affect every campaign and reporting system. |\n\nDo not end a test because the first day looks exciting or disappointing. Define the earliest read point before launch, then investigate only if a guardrail indicates a material risk.\n\n### Practical Exercise\n\nCreate a test-design table for a proposed creative test and a proposed paywall test. Explain why the paywall test requires different duration, downstream metrics, and review standards.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "prioritisation-frameworks",
        "title": "Prioritisation Frameworks",
        "content": "## Prioritisation Frameworks\n\n*ICE and PIE*\n\n### Why This Lesson Exists\n\nA growth team always has more possible tests than capacity. Prioritisation makes the trade-offs explicit. It prevents the loudest opinion, newest idea, or easiest implementation from consuming all attention.\n\n### ICE: Impact, Confidence, Ease\n\n| Criterion | Question | Example scoring logic |\n| --- | --- | --- |\n| **Impact** | If this works, how much could it affect a relevant business metric? | Higher when it targets a large, valuable, measurable funnel leak. |\n| **Confidence** | How strong is the evidence that it will work? | Higher when supported by data, repeated learnings, or direct user insight. |\n| **Ease** | How quickly and cheaply can it be implemented and evaluated? | Higher for simple, reversible changes with good instrumentation. |\n\nA simple score can be calculated as the average or product of these ratings, but the exact formula matters less than the quality of the reasoning. Teams should add notes rather than only numbers.\n\n### PIE: Potential, Importance, Ease\n\nPIE is similar but can be useful for funnel optimisation. It asks:\n\n| Criterion | Meaning |\n| --- | --- |\n| **Potential** | How much improvement could the page, stage, or channel realistically have? |\n| **Importance** | How much traffic, revenue, or strategic value passes through it? |\n| **Ease** | How difficult is it to implement and measure the change? |\n\n### Avoid Mechanical Prioritisation\n\nA scoring framework should support judgment, not replace it. Consider the following additional factors:\n\n| Factor | Why it can override a simple score |\n| --- | --- |\n| **Strategic learning value** | A test may clarify an important unknown even if its immediate impact is modest. |\n| **Risk of delay** | A tracking issue or a sudden funnel decline may need immediate action. |\n| **Dependency** | A low-scoring technical task may unlock multiple higher-impact tests. |\n| **Policy or user-trust risk** | Some ideas should not proceed despite potential revenue upside. |\n| **Capacity and ownership** | An easy test without a clear owner is not actually easy. |\n\n### Practical Exercise\n\nBuild an ICE or PIE backlog containing at least eight ideas across creative, campaign structure, onboarding, pricing, and retention. Include the evidence, primary metric, and one sentence explaining the score. Select the top three and explain why they deserve capacity now.\n\n---\n"
      },
      {
        "order": 4,
        "slug": "the-iteration-loop",
        "title": "The Iteration Loop",
        "content": "## The Iteration Loop\n\n*Result → Learning → New Hypothesis*\n\n### Why This Lesson Exists\n\nThe value of experimentation compounds only when findings are preserved and used. A team that runs many tests but does not document learnings repeats work, forgets context, and mistakes random wins for principles.\n\nThe growth loop is:\n\n> **Observation → Hypothesis → Test → Result → Learning → Next hypothesis or decision.**\n\n### Test Readout Structure\n\nUse the same structure for every completed test.\n\n| Section | Required content |\n| --- | --- |\n| **Context** | App, platform, geo, date range, audience, and baseline. |\n| **Hypothesis** | The pre-registered “If X, then Y, because Z” statement. |\n| **Implementation** | What exactly ran? Include control, variant, allocation, and any deviations. |\n| **Result** | Primary metric, secondary metrics, guardrails, volume, and maturity. |\n| **Interpretation** | What the evidence supports and what it does not support. |\n| **Learning** | The reusable insight, with confidence level and scope. |\n| **Decision** | Roll out, scale, refresh, iterate, pause, or collect more evidence. |\n| **Follow-up** | The next hypothesis, owner, and expected decision date. |\n\n### Learning Categories\n\n| Result type | Correct response |\n| --- | --- |\n| **Clear winner** | Roll out or scale carefully; test transferability by geo, platform, or audience if relevant. |\n| **Clear loser** | Stop or roll back; record why it may have failed and whether the underlying idea deserves a different execution. |\n| **Inconclusive** | Check sample, implementation, instrumentation, and effect size; decide whether more data is worth the opportunity cost. |\n| **Mixed result** | Identify the trade-off, such as improved trials but weaker retention; use a commercial decision framework. |\n| **Unexpected result** | Investigate whether the outcome reveals a new mechanism, measurement issue, or segment-specific opportunity. |\n\n### The “What This Does Not Prove” Habit\n\nOne of the most valuable habits in a growth team is stating what a test did *not* prove. It reduces overgeneralisation.\n\nFor example:\n\n> “This creative improved US iOS trial starts under the current Meta campaign setup. It does not prove that the same hook will improve TikTok performance, that it will retain better after D7, or that the benefit-led angle is universally weaker.”\n\nThis is not caution for its own sake. It makes subsequent testing more precise.\n\n### Practical Exercise\n\nWrite a test readout for a past campaign or funnel experiment. Include a clear conclusion, one reusable learning, one limitation, and one next hypothesis. Share it with a teammate and ask whether they can identify the action that follows from the readout.\n\n---\n\n### Chapter 7 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Hypothesis quality** | Writes a specific, contextual, evidence-based “If X, then Y, because Z” hypothesis. |\n| **Test design** | Defines control, variant, population, metrics, guardrails, sample, and decision rule. |\n| **Prioritisation** | Uses ICE or PIE transparently while applying strategic judgment. |\n| **Learning loop** | Produces a test readout that distinguishes result, interpretation, learning, limitation, and next action. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 7 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Which hypothesis is most complete?",
          "options": [
            "“The landing page needs improvement.”",
            "“If we shorten the web quiz from eight questions to five for cold UK Meta traffic, checkout-start rate will increase because users will encounter less pre-paywall friction without losing the key personalisation inputs.”",
            "“The weekly plan is bad.”",
            "“Let’s run more tests.”"
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "What is the main purpose of a control group in an experiment?",
          "options": [
            "To ensure the variant receives all available traffic.",
            "To provide a comparable baseline so that the effect of the intended change can be evaluated.",
            "To prevent any user from seeing the current experience.",
            "To make statistical significance unnecessary."
          ],
          "correctAnswer": 1
        },
        {
          "order": 3,
          "question": "Why might a pricing test require a longer and more cautious readout than a new creative-hook test?",
          "options": [
            "Pricing cannot be measured with data.",
            "Pricing can affect paid conversion, refunds, retention, user trust, and renewal behaviour, which may require more time to mature.",
            "Creative tests are always more expensive than pricing tests.",
            "The test population does not matter for price tests."
          ],
          "correctAnswer": 1
        },
        {
          "order": 4,
          "question": "In the ICE framework, what does **Ease** represent?",
          "options": [
            "The expected commercial impact if the idea succeeds.",
            "The strength of existing evidence supporting the idea.",
            "The relative effort, complexity, and speed of implementation and measurement.",
            "The number of competitors using the idea."
          ],
          "correctAnswer": 2
        },
        {
          "order": 5,
          "question": "A test improves trial starts but increases refunds and reduces early retention. What is the most appropriate classification?",
          "options": [
            "Clear winner because the primary metric improved.",
            "Clear loser because no metric improved.",
            "Mixed result that requires commercial interpretation using downstream quality and guardrails.",
            "Inconclusive because refunds never matter."
          ],
          "correctAnswer": 2
        },
        {
          "order": 6,
          "question": "Why should every test readout include “What this does not prove”?",
          "options": [
            "To make conclusions less useful.",
            "To prevent the team from generalising a result beyond its actual context, population, metric maturity, and implementation.",
            "To avoid recording the test outcome.",
            "To ensure every test is repeated immediately."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 8,
    "slug": "uas-subscription-app-business-understanding",
    "title": "Subscription App Business Understanding",
    "description": "User acquisition operates inside a broader subscription-business system. This chapter equips the UA person with the commercial, platform, policy, and portfolio context required to make responsible decisions and communicate accurately with product, finance, customer support, and leadership.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "the-core-metric-set",
        "title": "The Core Metric Set",
        "content": "## The Core Metric Set\n\n*MRR, ARPU, LTV, Churn, and Trial-to-Paid Conversion*\n\n### Why This Lesson Exists\n\nSubscription businesses use a connected metric system. No individual number is enough to describe business health. A team can increase trial volume while reducing paid conversion. It can increase MRR while acquisition costs outpace the added value. It can report strong Day0 revenue while retention deteriorates.\n\nThe UA person needs a practical definition of each metric and an understanding of how the metrics interact.\n\n### Core Metrics\n\n| Metric | Practical definition | What it reveals | Common misuse |\n| --- | --- | --- | --- |\n| **MRR** | Monthly recurring revenue, usually representing the normalised recurring value of active subscriptions. | Current recurring-revenue base and growth trend. | Treating MRR growth as proof of profitable acquisition without considering CAC or churn. |\n| **ARPU** | Average revenue per user over a defined period. | Revenue intensity of a user base or segment. | Comparing ARPU across cohorts with unequal maturity or different definitions of “user.” |\n| **LTV** | Expected net value generated by a user or subscriber over their lifecycle. | Long-term cohort quality and the acquisition cost the business can support. | Treating an immature or unvalidated projection as realised revenue. |\n| **Churn** | Users or revenue lost over a defined period through cancellation, non-renewal, or payment failure. | Retention risk and the sustainability of the revenue base. | Combining voluntary and involuntary churn without understanding the cause. |\n| **Trial-to-paid conversion** | Share of trial users who become paying subscribers. | Quality of trial users, trial experience, and commercial fit. | Viewing it alone without trial volume, price, retention, or refund context. |\n| **Revenue per install** | Revenue generated relative to acquired installs. | Acquisition quality across campaigns, creatives, or geos. | Reading it too early without recognising cohort maturity. |\n| **Payback period** | Time taken for a cohort’s contribution to recover acquisition cost. | Cash efficiency and capacity to reinvest in growth. | Ignoring refund, fee, or retention assumptions behind the calculation. |\n\n### How the Metrics Connect\n\nA simple subscription-business chain can be illustrated as:\n\n> Spend → installs → trial starts → paid subscribers → recurring revenue → retention / renewal → LTV → allowable acquisition cost.\n\nThe relationship means that a shift in one metric can change the meaning of others.\n\n| Observation | Possible positive interpretation | Possible hidden risk |\n| --- | --- |\n| Trial-start rate rises | Offer or onboarding may be more compelling. | Users may be lower intent; paid conversion or refunds may worsen. |\n| ARPU rises | Plan mix or price may be improving. | Volume may fall, or only a subset of users may choose a more expensive plan. |\n| Churn falls | Product value, lifecycle messaging, or payment recovery may be improving. | Cohort mix may have changed; verify comparable groups. |\n| MRR rises | Active subscriber base is expanding. | Spend or discounts may have increased faster than sustainable value. |\n| CAC falls | Creative or channel efficiency may have improved. | Lower-cost traffic may be less valuable downstream. |\n\n### Voluntary and Involuntary Churn\n\n| Churn type | What it means | Typical owner or response |\n| --- | --- | --- |\n| **Voluntary churn** | User actively cancels or chooses not to renew. | Product value, pricing, onboarding, lifecycle messaging, customer support. |\n| **Involuntary churn** | Payment fails or subscription is lost without an explicit cancellation choice. | Payment system, dunning, card updater, billing communication, support. |\n\nUA must care about both. A campaign that looks strong on trial starts may produce users who voluntarily churn quickly. Revenue performance may also be weakened by payment-recovery failures that are not caused by acquisition but materially affect LTV.\n\n### Practical Exercise\n\nCreate a one-page “metric tree” for one app. Begin with recurring revenue or LTV and show the upstream drivers: paid conversion, trial start, onboarding completion, install volume, spend, and retention. Add the owner and data source for each node.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "app-store-and-google-play-ecosystem-dynamics",
        "title": "App Store and Google Play Ecosystem Dynamics",
        "content": "## App Store and Google Play Ecosystem Dynamics\n\n*Commission, Proceeds, IAP, and Subscription Models*\n\n### Why This Lesson Exists\n\nNative app distribution takes place within platform ecosystems. App Store and Google Play rules, payment mechanics, reporting structures, store listings, and review processes influence what offers can be shown, how revenue is collected, and how the user journey should be designed.\n\nThe UA person does not need to become a legal or platform-policy expert. They must understand the commercial and operational implications well enough to avoid designing campaigns or funnels that conflict with the actual purchase path.\n\n### Native Subscription Models\n\n| Model | Description | Primary commercial consideration |\n| --- | --- | --- |\n| **In-app purchase subscription** | User subscribes through the Apple App Store or Google Play billing system. | Platform-defined billing environment, platform commission/proceeds, and native subscription lifecycle. |\n| **Web subscription with app access** | User purchases on the web and accesses the app through an account or entitlement. | Web checkout, payment processing, identity handoff, entitlement recognition, and policy compliance. |\n| **Hybrid model** | The business uses both native and web routes in appropriate contexts. | Requires clear reporting, user-support processes, and coherent entitlement logic. |\n\nThe correct model depends on the business, platform policies, product experience, geography, payment strategy, and measurement needs. The UA Specialist should always know which route a given campaign is sending users toward.\n\n### Commission and Proceeds\n\nThe user-facing price and the company’s net proceeds are not necessarily the same. Platform commissions, taxes, payment-processing fees, refunds, and chargebacks can affect net revenue. When analysing campaign profitability, use the company’s agreed net-revenue or contribution definition rather than assuming listed subscription price equals revenue retained.\n\n### Store Listing as Part of the Funnel\n\nThe app-store page can be a conversion surface, not merely a technical listing. A user may encounter the page after a paid click, through organic search, or as part of a web-to-app handoff.\n\n| Listing element | Role in user decision |\n| --- | --- |\n| **App name and subtitle** | Communicate category, value, and searchable terms. |\n| **Icon** | Creates recognition and first-impression trust. |\n| **Screenshots and previews** | Explain the outcome, product experience, and relevance. |\n| **Ratings and reviews** | Provide social proof and reveal user concerns. |\n| **Description** | Supports deeper understanding, trust, and feature context. |\n| **Localisation** | Improves clarity and cultural fit in language markets. |\n\nA campaign with a clear ad and landing experience can still lose users if the store listing feels unrelated, low-trust, or poorly localised.\n\n### Practical Exercise\n\nReview the company’s App Store and Google Play listings as if you were a first-time user from one target market. Compare the store-page promise to one active ad and the first in-app onboarding screen. Record any message, visual, or language mismatch.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "platform-policy-constraints",
        "title": "Platform-Policy Constraints",
        "content": "## Platform-Policy Constraints\n\n*ATT, Consent Flows, and Review-Guideline Risks*\n\n### Why This Lesson Exists\n\nPaid acquisition and monetisation operate within privacy, advertising, and app-store policy boundaries. A campaign or funnel may produce attractive short-term metrics while creating review, compliance, account, or user-trust risk. Responsible growth requires knowing when to involve the appropriate product, legal, privacy, or platform-policy owner.\n\nThis lesson provides operational awareness. It is not legal advice and it does not replace current platform-policy review.\n\n### Privacy and Consent\n\nUser consent and privacy controls can affect what data can be collected, linked, and used for attribution. The exact requirements and implementations vary by platform, geography, and data practice.\n\n| Area | Practical UA question |\n| --- | --- |\n| **App-tracking consent** | What share of users can be measured at user level, and how does this affect campaign reporting? |\n| **Cookie or web consent** | Does the landing page collect and send data only after appropriate consent? |\n| **Personal data in event payloads** | Are events configured so that sensitive or unnecessary information is not sent to ad platforms? |\n| **Health-related context** | Does creative, onboarding, or targeting handle sensitive user concerns responsibly and within applicable rules? |\n| **Data retention and access** | Who can access campaign, user, and revenue data, and for what purpose? |\n\nWhen in doubt, pause and ask the designated owner. Do not assume that a technically possible tracking or targeting approach is acceptable.\n\n### App Review and Commercial Transparency\n\nSubscription apps should make commercial terms understandable. The exact requirements can change, but the operating standard should always be clear and honest communication.\n\n| Risk area | Practical standard |\n| --- | --- |\n| **Trial terms** | State the trial duration, price after trial, billing cadence, and cancellation route clearly. |\n| **Paywall claims** | Avoid unsupported, exaggerated, or misleading outcome claims. |\n| **Health / wellbeing claims** | Use approved language; do not create a diagnosis, guarantee, or unsupported medical promise. |\n| **Functionality access** | Ensure product behaviour matches what is represented in the store listing and offer. |\n| **Cancellation and refund support** | Provide users with understandable ways to manage subscriptions and seek help. |\n| **Creative-to-product consistency** | Do not use an ad promise that the app or funnel cannot substantiate. |\n\n### Review-Guideline Risk Signals\n\nEscalate promptly if you notice any of the following:\n\n- An ad or paywall makes a claim that has not been approved or cannot be supported.\n- A web funnel, app experience, and store listing describe different offers or product capabilities.\n- Subscription terms are difficult to understand or appear only after the user has committed.\n- A tracking or data-sharing change involves sensitive information or a new external partner.\n- A campaign uses sensitive personal attributes, targeting logic, or language that could create privacy or discrimination concerns.\n\n### Practical Exercise\n\nPerform a “user-trust audit” on one active path: ad → landing or app onboarding → paywall → subscription confirmation → cancellation information. List any place where a reasonable user may be surprised, confused, or unable to understand the commercial terms. Escalate observations; do not independently alter policy-sensitive elements.\n\n---\n"
      },
      {
        "order": 4,
        "slug": "portfolio-logic",
        "title": "Portfolio Logic",
        "content": "## Portfolio Logic\n\n*Shared Infrastructure as a Scale Advantage*\n\n### Why This Lesson Exists\n\nAn app studio or multi-app business can create scale not only by acquiring users for more than one product, but also by sharing knowledge, systems, and operational infrastructure across apps. A strong learning in one app can accelerate a second app if the context is understood. A shared service can reduce repeated work. A validated process can improve speed and quality.\n\nThe UA person should learn to recognise what is reusable and what remains product-specific.\n\n### Examples of Shared Infrastructure\n\n| Shared capability | Potential scale advantage | What must still be validated per app |\n| --- | --- | --- |\n| **Analytics and dashboards** | Common metric definitions, faster reporting, reusable cohort views. | Event taxonomy and value actions may differ. |\n| **Notification infrastructure** | Faster lifecycle experimentation and operational consistency. | Message relevance, timing, and user goals are product-specific. |\n| **Onboarding frameworks** | Reusable quiz, plan, paywall, and experiment components. | Product promise and Aha! Moment must remain authentic. |\n| **Customer support operations** | Shared processes for cancellations, refunds, and feedback loops. | Category-specific issues and tone require adaptation. |\n| **Creative production process** | Shared testing cadence, metadata, briefing, and performance feedback. | Angle, audience, platform fit, and category sensitivity differ. |\n| **Payment and subscription systems** | Shared reporting, dunning, entitlement, and finance processes. | Offer configuration, tax, market, and platform rules may vary. |\n| **Competitive intelligence** | Shared tools, research methods, and category-pattern recognition. | Direct competitors and user motivations remain app-specific. |\n\n### Transfer Learning Carefully\n\nA portfolio advantage becomes harmful when teams copy a result without considering context. Use a transfer checklist:\n\n| Question | Why it matters |\n| --- | --- |\n| Did the original test address a similar user problem? | A message that works for one motivation may be irrelevant to another. |\n| Is the audience comparable? | Demographic, cultural, and purchase-intent differences can change outcomes. |\n| Is the platform and funnel path similar? | TikTok vs. Meta or native vs. web paths can alter behaviour. |\n| Is the product promise equally credible? | Copying a value frame without product support damages trust. |\n| Which mechanism is transferable? | Transfer the learning principle, not necessarily the exact asset. |\n\n### Practical Exercise\n\nIdentify one recent win from another product in the portfolio. Write a transfer brief containing: the original context; the hypothesised mechanism; the differences in your app’s audience, promise, and funnel; and a safe adaptation test.\n\n---\n\n### Chapter 8 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Metric fluency** | Explains how MRR, ARPU, LTV, churn, and trial-to-paid conversion interact. |\n| **Platform awareness** | Identifies the subscription route and store-surface implications for a campaign. |\n| **Policy awareness** | Recognises when privacy, subscription transparency, or claim-related concerns require escalation. |\n| **Portfolio thinking** | Transfers a learning through a contextual adaptation rather than copying an asset or result. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 8 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Which metric most directly represents the share of trial users who become paying subscribers?",
          "options": [
            "CPM.",
            "Trial-to-paid conversion.",
            "CTR.",
            "Frequency."
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "What is the difference between voluntary and involuntary churn?",
          "options": [
            "Voluntary churn is caused by ad fatigue; involuntary churn is caused by low CTR.",
            "Voluntary churn occurs when a user cancels or does not renew; involuntary churn occurs when payment fails without an explicit cancellation choice.",
            "They are two names for the same metric.",
            "Involuntary churn only happens on Android."
          ],
          "correctAnswer": 1
        },
        {
          "order": 3,
          "question": "Why should a UA person know whether a campaign sends users to a native in-app subscription path or a web-to-app subscription path?",
          "options": [
            "The route affects measurement, payment, user handoff, offer design, support, and commercial reporting.",
            "It does not affect user experience or revenue.",
            "It only changes the ad’s font.",
            "It eliminates the need to track app activation."
          ],
          "correctAnswer": 0
        },
        {
          "order": 4,
          "question": "Which observation should be escalated for appropriate policy, privacy, or legal review rather than changed independently?",
          "options": [
            "A creative’s CTR declines modestly after several weeks.",
            "A campaign proposes using a sensitive personal attribute or new tracking data that has not been reviewed.",
            "A dashboard needs a clearer chart title.",
            "A competitor launches a new static ad."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "What is the correct way to use a successful learning from another app in the portfolio?",
          "options": [
            "Copy the creative and funnel exactly because it already won elsewhere.",
            "Transfer the underlying mechanism only after considering product promise, audience, platform, geo, and funnel differences, then test a safe adaptation.",
            "Ignore the learning because every app is completely unrelated.",
            "Apply it globally without measurement."
          ],
          "correctAnswer": 1
        },
        {
          "order": 6,
          "question": "Which statement best describes LTV in a subscription business?",
          "options": [
            "It is the listed price of the annual plan.",
            "It is the expected net value generated by a user or subscriber over their lifecycle.",
            "It is the cost of one ad impression.",
            "It is identical to MRR."
          ],
          "correctAnswer": 1
        }
      ]
    }
  },
  {
    "order": 9,
    "slug": "uas-conversion-quality-network-optimisation",
    "title": "Conversion Quality and Optimisation Across Ad Networks",
    "description": "A UA person must understand that acquisition performance is not only about the volume of attributed conversions. It is about the quality, reliability, and economic value of those conversions. This chapter introduces attribution models, conversion-quality diagnosis, privacy-aware optimisation, campaign-versus-network decision-making, and a disciplined framework for evaluating new media partners.",
    "role": "user-acquisition-specialist",
    "lessons": [
      {
        "order": 1,
        "slug": "attribution-models",
        "title": "Attribution Models",
        "content": "## Attribution Models\n\n*Impression / Click-Based, Probabilistic, and Deterministic Attribution*\n\n### Why This Lesson Exists\n\nDifferent attribution models assign credit in different ways. Understanding the model is necessary before comparing channel performance, interpreting platform reports, or deciding whether a network deserves more budget.\n\nAttribution is a measurement convention. It provides a useful decision signal, but it is not a complete representation of all causal influence on a user’s decision.\n\n### Touchpoint-Based Attribution\n\n| Model | How it assigns credit | Strength | Limitation |\n| --- | --- | --- |\n| **Click-through attribution** | Gives credit when a user clicks an ad and completes a later action within the relevant window. | Often offers a clearer direct-response relationship than view-through attribution. | Still depends on window length, identity availability, and other concurrent touchpoints. |\n| **View-through attribution** | Gives credit when a user sees an ad, does not click, and later converts within a defined window. | Can capture some influence of impression-led advertising. | Can overstate credit if the user would have converted anyway. |\n| **Last-touch attribution** | Gives all credit to the most recent eligible touchpoint. | Simple and easy to operationalise. | Ignores earlier interactions that may have created awareness or intent. |\n| **Multi-touch attribution** | Distributes credit across more than one touchpoint. | Recognises more complex user journeys. | Requires modelling assumptions and may be difficult to apply consistently. |\n| **Incrementality measurement** | Estimates conversions that would not have occurred without the marketing activity. | Closer to causal business impact. | More complex, may require experiments, holdouts, or geo tests. |\n\nA UA person should know which model is being used in a report. Comparing a platform’s view-through attribution with an MMP’s click-based view without alignment can create false conclusions.\n\n### Deterministic and Probabilistic Attribution\n\n| Attribution type | Definition | Practical implication |\n| --- | --- | --- |\n| **Deterministic** | Uses a direct, permitted identifier or exact match to connect a touchpoint with a conversion. | Generally more precise when available, but limited by consent and privacy restrictions. |\n| **Probabilistic** | Infers a likely match from available non-direct signals and statistical logic. | Can recover useful insight where direct identifiers are unavailable, but includes greater uncertainty. |\n| **Modelled / aggregated** | Uses aggregate data and modelling to estimate outcomes under privacy constraints. | Useful for optimisation and directional comparison, but should not be treated as user-level truth. |\n\nThe correct operating response is not to reject modelled data. It is to understand its uncertainty and validate major decisions through multiple evidence sources.\n\n### Attribution Windows\n\nAn attribution window is the time allowed between an impression or click and a conversion. Longer windows can increase reported conversions; shorter windows may undercount slower decision journeys. The window should be understood before comparing campaigns, networks, or time periods.\n\n| Question | Why it matters |\n| --- | --- |\n| What is the click-through window? | Changes the number of conversions credited after a click. |\n| What is the view-through window? | Determines the potential influence assigned to impressions. |\n| Is the window consistent across platforms? | Inconsistent windows can make reported ROAS incomparable. |\n| Which date is used for reporting: click date, install date, or event date? | Affects cohort analysis and daily-trend interpretation. |\n| Has the window or model recently changed? | May create an apparent performance change that is measurement-only. |\n\n### Practical Exercise\n\nChoose two active channels. For each, document the attribution model, click-through window, view-through window where applicable, reporting timezone, and primary source used in leadership reporting. Identify one reason their reported ROAS may not be directly comparable.\n\n---\n"
      },
      {
        "order": 2,
        "slug": "conversion-quality-signals",
        "title": "Conversion-Quality Signals",
        "content": "## Conversion-Quality Signals\n\n*Partner / DSP Overlap Analysis*\n\n### Why This Lesson Exists\n\nA network can appear to deliver conversions while contributing little incremental value. It may be receiving credit for users already likely to convert through another channel, capturing low-quality traffic, or reporting outcomes that fail to translate into retention and revenue.\n\nConversion quality should therefore be evaluated across the full funnel and, where possible, with overlap and incrementality awareness.\n\n### Define Conversion Quality\n\nA high-quality conversion is not merely an attributed install or trial. It is a user who progresses toward meaningful product value and durable commercial contribution at an acceptable cost.\n\n| Signal layer | Example metric | Quality question |\n| --- | --- | --- |\n| **Delivery quality** | Viewability, click quality, invalid-traffic indicators where available. | Did the network generate genuine opportunities for engagement? |\n| **Acquisition quality** | Install-to-first-open, onboarding completion. | Did acquired users genuinely enter the product experience? |\n| **Commercial quality** | Trial start, paid conversion, Day0 revenue per install. | Did users show willingness to pay? |\n| **Behavioural quality** | D1/D7 engagement, value-action completion. | Did users find ongoing product value? |\n| **Revenue quality** | Refund rate, renewal, net revenue, projected LTV. | Did early revenue become durable contribution? |\n| **Measurement quality** | Attribution completeness, event match, discrepancy stability. | Can we trust the signal enough to make a budget decision? |\n\n### Partner / DSP Overlap: Conceptual Framework\n\nWhen multiple partners claim credit for similar users or overlapping conversion windows, apparent performance may overstate the incremental contribution of each partner. An overlap analysis is a way to investigate whether the same user populations, geos, time periods, or conversion patterns are being credited across sources.\n\nThe UA person does not need to run a complex causal model independently. They should understand the questions that an overlap analysis raises:\n\n| Question | Why it matters |\n| --- | --- |\n| Do multiple partners receive credit for conversions in the same geo and period? | May indicate overlapping reach or different attribution rules. |\n| Does a new partner’s reported conversion volume coincide with a decline in another source without improving total business outcomes? | May suggest credit reallocation rather than net growth. |\n| Do partner-attributed users differ in downstream retention and LTV? | Helps distinguish volume from economically valuable acquisition. |\n| Does total blended performance improve when the partner is active? | A higher-level check on incremental business impact. |\n| Can a holdout, geo split, or budget test estimate causal contribution? | Provides more robust evidence than attribution claims alone. |\n\n### Practical Quality-Comparison Table\n\n| Partner / network | Spend | Attributed installs | Trial-start rate | D7 retention | Day0 revenue / install | Refund rate | Projected LTV | Confidence in measurement |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n| Partner A |  |  |  |  |  |  |  |  |\n| Partner B |  |  |  |  |  |  |  |  |\n| Partner C |  |  |  |  |  |  |  |  |\n\nUse the table to create questions, not to declare a winner automatically. Differences in target geo, audience, creative, price, and attribution method must be accounted for before a decision.\n\n### Practical Exercise\n\nCompare two media partners or campaigns using the table above. Identify one indicator of strong conversion quality, one indicator of possible measurement or quality risk, and one next analysis that would improve confidence.\n\n---\n"
      },
      {
        "order": 3,
        "slug": "privacy-driven-attribution",
        "title": "Privacy-Driven Attribution",
        "content": "## Privacy-Driven Attribution\n\n*SKAdNetwork and Its Effect on Optimisation Strategy*\n\n### Why This Lesson Exists\n\nPrivacy changes have reduced the availability of immediate, user-level data for some mobile advertising environments. Privacy-preserving measurement systems, such as SKAdNetwork on iOS, rely more on aggregated and delayed signals. This changes the rhythm of optimisation and the degree of certainty available in campaign-level reporting.\n\nThe UA person must learn not to overreact to incomplete short-term data and not to confuse a less granular signal with no signal at all.\n\n### Practical Implications of Privacy-Constrained Measurement\n\n| Change in measurement | Operational implication |\n| --- | --- |\n| **Less user-level visibility** | Segment and individual-journey analysis may be limited for non-consenting users. |\n| **Delayed reporting** | Same-day decisions can be misleading; use mature windows and scheduled read points. |\n| **Aggregated outcomes** | Campaign-level conclusions may be less precise, especially at low volume. |\n| **Coarse conversion value** | Teams must decide which early events best represent later user value. |\n| **Modelled platform reporting** | Platform data can remain useful but should be triangulated with internal cohorts and blended outcomes. |\n\n### Optimisation Under Signal Constraints\n\n| Operating habit | Why it matters |\n| --- | --- |\n| Use stable comparison windows rather than reacting to hourly or partial-day iOS results. | Reduces false decisions caused by reporting delay. |\n| Optimise toward an event that is both meaningful and sufficiently available. | A high-value but sparse event may not give the platform enough learning signal. |\n| Maintain consistent event and conversion-value mapping. | Frequent uncontrolled changes make trend interpretation difficult. |\n| Use creative and geo-level learning alongside platform reporting. | Helps detect genuine user-response patterns when attribution is less granular. |\n| Validate large budget moves against internal revenue and cohort behaviour. | Prevents overreliance on any single platform model. |\n\n### Escalation Signals\n\nEscalate to the relevant tracking or technical owner if you observe:\n\n- A sudden, broad disappearance of iOS conversions across campaigns.\n- A material divergence between platform, MMP, and internal data that begins on a specific date.\n- A release, consent-flow change, or event-mapping update that coincides with reporting shifts.\n- A conversion event that drops to zero or becomes implausibly high.\n- A planned campaign or funnel change that depends on a new tracking implementation.\n\n### Practical Exercise\n\nCreate a “mature data” calendar for the key iOS metrics used by the team. For each metric, record expected reporting delay, earliest sensible read point, final validation window, and the internal source used for longer-term confirmation.\n\n---\n"
      },
      {
        "order": 4,
        "slug": "campaign-level-versus-network-level-optimisation",
        "title": "Campaign-Level versus Network-Level Optimisation",
        "content": "## Campaign-Level versus Network-Level Optimisation\n\n*Why This Lesson Exists*\n\nA campaign can underperform while the network remains valuable, and a network can appear strong because one campaign or creative temporarily carries the result. Budget decisions should be made at the level where the evidence is strong enough and the action is appropriately scoped.\n\n### The Decision Levels\n\n| Level | Typical decision | Evidence required |\n| --- | --- | --- |\n| **Creative** | Refresh, pause, re-test, or scale an asset. | Creative-level delivery and downstream-quality data. |\n| **Ad set / ad group** | Adjust audience, bid, placement, or budget allocation. | Segment-level performance with sufficient volume. |\n| **Campaign** | Change structure, objective, budget, or optimisation event. | Campaign-level stability, clear diagnosis, and awareness of spillover effects. |\n| **Geo / market** | Enter, exit, localise, or alter pricing/offer. | Cohort economics, market context, and operational feasibility. |\n| **Network** | Scale, reduce, pause, or onboard a channel. | Blended quality, incrementality confidence, operational cost, and strategic fit. |\n\n### Avoid Common Scope Errors\n\n| Error | Why it happens | Better response |\n| --- | --- | --- |\n| Pausing a network because one creative fails | Performance is visible at the asset level and feels urgent. | Diagnose the creative, campaign, and network separately. |\n| Scaling a network because one campaign has high ROAS | A local winner is mistaken for scalable network economics. | Test replication across budgets, creatives, geos, and mature cohorts. |\n| Increasing budget after a short-term spike | Platforms can show volatile delivery and attribution. | Use pre-defined scale steps and guardrails. |\n| Solving a funnel problem with bid changes | The final CPA rises, so media buying is blamed. | Find the earliest funnel stage of divergence before acting. |\n| Treating a network’s attribution report as full incremental truth | Reported credit is easier to access than causal evidence. | Compare against internal cohorts, blended business metrics, and controlled tests. |\n\n### Scaling Protocol\n\nA controlled scaling protocol should include:\n\n| Step | Requirement |\n| --- | --- |\n| **1. Define the success signal** | State the relevant CPA, ROAS, revenue-per-install, or LTV threshold and maturity window. |\n| **2. Verify quality** | Confirm the result is not driven only by cheap early events. |\n| **3. Identify capacity** | Check creative pipeline, audience size, geo opportunity, funnel readiness, and operational support. |\n| **4. Increase deliberately** | Use planned increments rather than uncontrolled jumps, especially when signal quality is uncertain. |\n| **5. Monitor guardrails** | Track efficiency, retention, refunds, tracking health, and marginal performance. |\n| **6. Document learning** | Record where scaling held, where it deteriorated, and what limited the next step. |\n\n### Practical Exercise\n\nTake one current campaign that has recently performed well. Create a scale/no-scale recommendation. State the decision level, success signal, maturity status, expected risk, scale step, guardrails, and review date.\n\n---\n"
      },
      {
        "order": 5,
        "slug": "framework-for-evaluating-a-new-dsp-or-ad",
        "title": "Framework for Evaluating a New DSP or Ad Network",
        "content": "## Framework for Evaluating a New DSP or Ad Network\n\n*Why This Lesson Exists*\n\nA new partner can create incremental reach, introduce a valuable audience, or diversify channel risk. It can also consume time, create tracking complexity, overlap with existing activity, or produce low-quality attributed conversions. A disciplined evaluation process protects the team from both excessive caution and costly optimism.\n\n### Evaluation Areas\n\n| Area | Questions to answer |\n| --- | --- |\n| **Strategic fit** | Does the network reach a relevant audience, geo, platform, or inventory type that we cannot efficiently access elsewhere? |\n| **Commercial model** | What are the pricing, minimum spend, fee, contract, credit, and payment terms? |\n| **Measurement compatibility** | Can it integrate with the MMP, send required events, and support transparent reporting? |\n| **Attribution approach** | What windows, models, and claimed conversions does it use? Are they comparable to existing partners? |\n| **Inventory quality** | What placements, publishers, fraud controls, brand-safety, and traffic-quality assurances exist? |\n| **Optimisation capability** | Can it optimise toward the events and geos that matter to the business? |\n| **Creative requirements** | What formats, asset volumes, localisation, and production requirements are needed? |\n| **Operational load** | Who will own setup, reporting, creative refresh, troubleshooting, and partner management? |\n| **Incrementality potential** | What test design could show whether the partner adds net value rather than reattributing existing demand? |\n| **Exit criteria** | What result would cause us to reduce, pause, or end the test? |\n\n### Pilot-Test Brief\n\nEvery new network should have a written pilot brief before spend begins.\n\n| Field | Required content |\n| --- | --- |\n| **Business question** | What opportunity or uncertainty is this pilot designed to address? |\n| **Target market and audience** | Define the app, geo, platform, and user segment. |\n| **Funnel path and offer** | State web or app route, onboarding, and commercial offer. |\n| **Optimisation event** | Identify the event the partner will receive and its expected quality. |\n| **Budget and duration** | Set a controlled spend cap and a review schedule. |\n| **Primary success metric** | Use a business-relevant metric, not only the partner’s report. |\n| **Quality guardrails** | Include refunds, retention, fraud, support, and tracking checks. |\n| **Measurement plan** | Specify MMP, internal BI, attribution windows, and any holdout or geo comparison. |\n| **Owner and dependencies** | Assign accountable owners across UA, analytics, creative, product, and finance as needed. |\n| **Decision rule** | Define criteria for scale, iterate, pause, or reject. |\n\n### Practical Exercise\n\nCreate a pilot brief for one hypothetical new DSP or ad network. Include a comparison against the company’s existing channel mix and explain how you would distinguish incremental value from attribution overlap.\n\n---\n\n### Chapter 9 Completion Check\n\n| Competency | Demonstrated by |\n| --- | --- |\n| **Attribution-model literacy** | Explains why two channels or reports cannot be compared without aligning model, window, and reporting date. |\n| **Conversion-quality analysis** | Evaluates a partner through acquisition, commercial, behavioural, revenue, and measurement-quality signals. |\n| **Privacy-aware optimisation** | Uses mature windows and triangulation under privacy-constrained mobile measurement. |\n| **Decision scope** | Separates creative, campaign, geo, and network-level decisions. |\n| **Partner evaluation** | Produces a controlled pilot brief with business metrics, guardrails, measurement plan, and exit criteria. |\n"
      }
    ],
    "quiz": {
      "title": "Chapter 9 Quiz",
      "questions": [
        {
          "order": 1,
          "question": "Why can two ad networks’ reported ROAS not always be compared directly?",
          "options": [
            "ROAS is never useful for UA decisions.",
            "They may use different attribution models, windows, reporting dates, timezones, and privacy-related measurement methods.",
            "Every network reports in a different currency by law.",
            "Only one network can report revenue."
          ],
          "correctAnswer": 1
        },
        {
          "order": 2,
          "question": "What is the main limitation of view-through attribution?",
          "options": [
            "It only applies to clicks.",
            "It may give a network credit for a conversion that could have happened without the impression.",
            "It prevents any conversion from being measured.",
            "It can never be used for awareness activity."
          ],
          "correctAnswer": 1
        },
        {
          "order": 3,
          "question": "Which combination provides the strongest view of conversion quality for a media partner?",
          "options": [
            "Impressions and CPM only.",
            "Attributed installs, trial-start rate, retention, refund rate, revenue per install, projected LTV, and measurement confidence.",
            "Number of creatives uploaded.",
            "Click-through rate only."
          ],
          "correctAnswer": 1
        },
        {
          "order": 4,
          "question": "What is a key operating implication of privacy-constrained mobile attribution?",
          "options": [
            "Same-day iOS performance should always determine budget decisions.",
            "Teams should use mature comparison windows, choose meaningful yet sufficiently available events, and validate material decisions with internal cohort data.",
            "Attribution is no longer useful in any form.",
            "The only valid metric is click-through rate."
          ],
          "correctAnswer": 1
        },
        {
          "order": 5,
          "question": "A single campaign on a network has poor performance. What is the best immediate conclusion?",
          "options": [
            "The entire network must be permanently paused.",
            "The campaign, creative, geo, funnel, measurement, and network context should be separated before making a network-level decision.",
            "All creative should be replaced with competitor ads.",
            "The internal BI dashboard is wrong."
          ],
          "correctAnswer": 1
        },
        {
          "order": 6,
          "question": "Which element is essential in a new DSP or ad-network pilot brief?",
          "options": [
            "A promise to scale regardless of performance.",
            "A controlled budget, clear business question, meaningful success metric, quality guardrails, measurement plan, and exit criteria.",
            "Only the partner’s reported CPI target.",
            "A large global launch on day one."
          ],
          "correctAnswer": 1
        },
        {
          "order": 7,
          "question": "What would be the most useful sign that a new partner may be reattributing rather than adding incremental growth?",
          "options": [
            "The partner reports conversions while total blended business outcomes do not improve and another source loses credited volume at the same time.",
            "The partner sends a weekly status email.",
            "The partner uses a different creative format.",
            "The partner has a lower frequency than Meta."
          ],
          "correctAnswer": 0
        }
      ]
    }
  }
];

async function main() {
  console.log(`Seeding role "${ROLE}" (additive-only — existing data is never deleted)...`);

  for (const ch of chapters) {
    const existing = await prisma.chapter.findUnique({ where: { slug: ch.slug } });
    if (existing) {
      console.log(`  Skipping "${ch.slug}" — already exists.`);
      continue;
    }

    const chapter = await prisma.chapter.create({
      data: {
        order: ch.order,
        slug: ch.slug,
        title: ch.title,
        description: ch.description,
        role: ch.role,
        lessons: {
          create: ch.lessons.map((l) => ({
            order: l.order,
            slug: l.slug,
            title: l.title,
            content: l.content,
          })),
        },
      },
    });

    await prisma.quiz.create({
      data: {
        chapterId: chapter.id,
        title: ch.quiz.title,
        questions: {
          create: ch.quiz.questions.map((q) => ({
            order: q.order,
            question: q.question,
            options: JSON.stringify(q.options),
            correctAnswer: q.correctAnswer,
          })),
        },
      },
    });

    console.log(`  Created "${ch.slug}" (${ch.lessons.length} lessons, ${ch.quiz.questions.length} quiz questions).`);
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

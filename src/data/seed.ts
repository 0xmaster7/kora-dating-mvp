import {
  ChatThread,
  DemoAccount,
  KoraState,
  MatchProfile,
  MixerEvent,
} from "@/types/kora";

export const DEMO_ACCOUNTS: DemoAccount[] = [
  {
    id: "demo-aarav",
    name: "Aarav Kulkarni",
    email: "aarav.kulkarni@gmail.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=900&q=85",
    role: "Senior Software Engineer",
    company: "Atlassian",
    companyDomain: "@atlassian.com",
    city: "Bengaluru",
    age: 27,
    gradYear: 2021,
    college: "NIT Surathkal",
    elitmusId: "EL-2021-88412",
  },
  {
    id: "demo-meera",
    name: "Meera Nair",
    email: "meera.nair@gmail.com",
    avatarUrl:
      "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=900&q=85",
    role: "Staff Product Designer",
    company: "Razorpay",
    companyDomain: "@razorpay.com",
    city: "Bengaluru",
    age: 26,
    gradYear: 2022,
    college: "IIIT Hyderabad",
    elitmusId: "EL-2022-41905",
  },
];

export const MATCH_POOL: MatchProfile[] = [
  {
    id: "m-ananya",
    name: "Ananya Deshmukh",
    age: 26,
    role: "Backend Engineer · Stripe",
    company: "Stripe",
    companyDomain: "@stripe.com",
    city: "Bengaluru",
    gradYear: 2021,
    college: "COEP Pune",
    relocation: "Open to Bengaluru or Mumbai",
    photoUrl:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 94,
    compatibilitySummary:
      "Aligned on deliberate career pacing, staying close to family in India, and quiet Sunday mornings.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 96, note: "India-first long term" },
      { label: "Work–Life Rhythm", score: 92, note: "Weeknights offline by 8 PM" },
      { label: "Relationship Intent", score: 94, note: "Intentional, slow-burn" },
    ],
    about:
      "Builds payments infrastructure by day and hunts down old-school filter coffee spots in Malleshwaram on weekends. Big fan of long walks, Marathi theatre, and people who text back with full sentences.",
    lookingFor: "Something steady, curious, and unhurried.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "I’d stay in India. Having parents a two-hour flight away matters more to me than optimizing for a foreign postcode—and Bengaluru already gives me the work I want.",
      q2: "It’s Sunday 9 AM: early morning walk & filter coffee, or sleeping in until noon?",
      q2Answer:
        "Cubbon Park at 8:30 AM, then CTR benne dosa before the queue gets ridiculous. Naps are strictly for 3 PM.",
    },
    sampleReplies: [
      "Wait, CTR before 9 AM is honestly the ultimate green flag. Have you tried the filter coffee at Brahmin’s recently?",
      "Totally agree on the India-first call. A two-hour flight to Pune beats a 16-hour layover any day.",
    ],
  },
  {
    id: "m-kavya",
    name: "Kavya Menon",
    age: 25,
    role: "Product Manager · Swiggy",
    company: "Swiggy",
    companyDomain: "@swiggy.in",
    city: "Bengaluru",
    gradYear: 2022,
    college: "NIT Calicut",
    relocation: "Rooted in Bengaluru",
    photoUrl:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 91,
    compatibilitySummary:
      "Strong match on communication directness, shared Indiranagar neighborhood rhythm, and curiosity.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 90, note: "Settled in Bengaluru" },
      { label: "Work–Life Rhythm", score: 89, note: "High energy weekdays, calm weekends" },
      { label: "Relationship Intent", score: 94, note: "Looking for a real partner" },
    ],
    about:
      "Former systems engineer who wandered into product because I kept asking why we were building things. Currently learning pottery badly and keeping four monstera plants barely alive.",
    lookingFor: "Kindness, dry humour, and shared curiosity.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "Maybe 2 years abroad for the experience if we’re both excited about it, then back to Bengaluru or Kochi. Roots matter more as I hit my late twenties.",
      q2: "What’s a quiet ritual that makes an ordinary weekday feel good?",
      q2Answer:
        "A 40-minute phone-free walk after 7 PM with a podcast, followed by cooking something simple instead of ordering in.",
    },
    sampleReplies: [
      "Love your take on the weekday ritual. My monstera plants would probably appreciate me spending less time on Slack too.",
      "Should we put our coffee opinions to the test this Saturday in Indiranagar?",
    ],
  },
  {
    id: "m-diya",
    name: "Diya Chatterjee",
    age: 26,
    role: "ML Research Engineer · Google",
    company: "Google",
    companyDomain: "@google.com",
    city: "Bengaluru",
    gradYear: 2021,
    college: "IIT Kharagpur",
    relocation: "Open to Bengaluru or Hyderabad",
    photoUrl:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 89,
    compatibilitySummary:
      "Shared analytical temperament, appreciation for quiet spaces, and aligned 3-year life horizon.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 88, note: "Flexible across South India" },
      { label: "Work–Life Rhythm", score: 91, note: "Deep work + unplugged weekends" },
      { label: "Relationship Intent", score: 89, note: "Long-term partnership" },
    ],
    about:
      "Spends weekdays evaluating language models and weekends rereading Jhumpa Lahiri or cycling around Lalbagh. Will happily debate whether Kolkata biryani needs the aloo (it does).",
    lookingFor: "Warmth, intellectual honesty, and zero games.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "Staying in India. The research work here is finally world-class, and I’d rather be around for my parents’ Sundays than chase a marginal bump in savings.",
      q2: "How do you usually handle disagreements when you’re both tired after work?",
      q2Answer:
        "Call a 20-minute truce, eat dinner first, then talk it out calmly. Nothing good ever comes from arguing on an empty stomach at 10 PM.",
    },
    sampleReplies: [
      "The 20-minute dinner truce has saved so many conversations. Also, I’m standing firm on the Kolkata biryani aloo.",
      "Glad our answers lined up—what are you reading right now?",
    ],
  },
  {
    id: "m-rohan",
    name: "Rohan Iyer",
    age: 27,
    role: "Applied AI Engineer · Microsoft",
    company: "Microsoft",
    companyDomain: "@microsoft.com",
    city: "Hyderabad",
    gradYear: 2020,
    college: "BITS Pilani",
    relocation: "Open to Bengaluru or Hyderabad",
    photoUrl:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 93,
    compatibilitySummary:
      "High alignment on relocation flexibility, steady emotional maturity, and shared weekend pace.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 95, note: "Happy in Hyderabad or BLR" },
      { label: "Work–Life Rhythm", score: 91, note: "Balanced, no weekend hustle" },
      { label: "Relationship Intent", score: 93, note: "Ready to build a life" },
    ],
    about:
      "Works on search ranking in Hyderabad, runs half-marathons at an aggressively average pace, and makes a genuinely dependable sambar. Prefers one great dinner over five loud parties.",
    lookingFor: "An easygoing teammate for the next decade.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "Stay in India, ideally within a quick flight of Chennai and Bengaluru. Life here feels richer when your people are close.",
      q2: "Ideal first date that isn’t a loud bar?",
      q2Answer:
        "A slow bookstore browse followed by filter coffee or South Indian tiffin where you can actually hear each other think.",
    },
    sampleReplies: [
      "Bookstore + tiffin is unbeatable. Any favourite indie bookshop you keep going back to?",
      "Appreciate how thoughtful your answer was—rare to see that on a dating app.",
    ],
  },
  {
    id: "m-siddharth",
    name: "Siddharth Rao",
    age: 27,
    role: "Systems Engineer · Flipkart",
    company: "Flipkart",
    companyDomain: "@flipkart.com",
    city: "Pune",
    gradYear: 2021,
    college: "VNIT Nagpur",
    relocation: "Open to Pune or Bengaluru",
    photoUrl:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 88,
    compatibilitySummary:
      "Complementary career trajectories, grounded family values, and love for weekend road trips.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 87, note: "Pune / BLR corridor" },
      { label: "Work–Life Rhythm", score: 90, note: "Calm, predictable schedule" },
      { label: "Relationship Intent", score: 88, note: "Serious, low-drama" },
    ],
    about:
      "Distributed systems nerd who escapes to the Sahyadris whenever Pune gets too loud. Trying to master sourdough and failing gracefully every other Sunday.",
    lookingFor: "Someone grounded who laughs easily.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "I’d stay in India. You can always travel abroad three weeks a year without giving up the everyday warmth of home.",
      q2: "What’s something you’ve changed your mind about since graduating?",
      q2Answer:
        "Used to think career speed was everything. At 27, I care way more about who I’m sharing Tuesday evenings with.",
    },
    sampleReplies: [
      "Tuesday evenings really are the real test of compatibility, aren’t they?",
      "If you’re ever in Pune—or when I’m next in Bengaluru—coffee is on me.",
    ],
  },
  {
    id: "m-niharika",
    name: "Niharika Joshi",
    age: 25,
    role: "Frontend Architect · Postman",
    company: "Postman",
    companyDomain: "@postman.com",
    city: "Bengaluru",
    gradYear: 2023,
    college: "DAIICT Gandhinagar",
    relocation: "Bengaluru or Remote India",
    photoUrl:
      "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 90,
    compatibilitySummary:
      "Craft-oriented mindset, similar aesthetic sensibilities, and aligned preference for deep 1-on-1 conversations.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 91, note: "Remote-friendly India" },
      { label: "Work–Life Rhythm", score: 89, note: "Creative mornings, quiet nights" },
      { label: "Relationship Intent", score: 90, note: "Thoughtful & steady" },
    ],
    about:
      "Obsesses over typography, micro-interactions, and finding the best pour-over in Koramangala. Shoots 35mm film on trips and still sends physical postcards to close friends.",
    lookingFor: "Warm curiosity and shared creative energy.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "Remote from India is the sweet spot. I love being close to my sister in Ahmedabad while building global software.",
      q2: "What’s a green flag that instantly puts you at ease?",
      q2Answer:
        "Someone who listens without waiting for their turn to speak, and is polite to café staff when it’s busy.",
    },
    sampleReplies: [
      "Sending postcards is my favourite tiny rebellion against algorithmic feeds. Glad you liked the prompt!",
      "Have you been to Araku or Subko lately? Would love to hear your verdict.",
    ],
  },
  {
    id: "m-kabir",
    name: "Kabir Malhotra",
    age: 28,
    role: "Founding Engineer · FinTech",
    company: "Setu",
    companyDomain: "@setu.co",
    city: "Gurugram (NCR)",
    gradYear: 2020,
    college: "DTU Delhi",
    relocation: "Open to NCR or Bengaluru",
    photoUrl:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 87,
    compatibilitySummary:
      "Matched on ambition without burnout, transparent communication, and long-term outlook.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 85, note: "Open to BLR next year" },
      { label: "Work–Life Rhythm", score: 86, note: "Startup energy, protected Sundays" },
      { label: "Relationship Intent", score: 91, note: "Intentional & direct" },
    ],
    about:
      "Building open-banking rails in NCR and slowly plotting a move back to Bengaluru for the weather. Plays badminton twice a week and makes decent Kashmiri kahwa.",
    lookingFor: "Honest conversation and a real partnership.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "India, hands down. Building in Indian fintech right now is way too interesting to leave, and family dinners are non-negotiable.",
      q2: "Sunday afternoon: museum & quiet lunch, or spontaneous drive?",
      q2Answer:
        "Quiet lunch in Lodhi Colony followed by a walk. Spontaneous drives sound great until you hit expressway traffic.",
    },
    sampleReplies: [
      "Lodhi Colony in winter is honestly undefeated. How’s Bengaluru treating you this week?",
      "Respect the honesty in your prompt answer—so refreshing.",
    ],
  },
  {
    id: "m-vikram",
    name: "Vikramaditya Sen",
    age: 26,
    role: "Data Engineer · Amazon",
    company: "Amazon",
    companyDomain: "@amazon.com",
    city: "Hyderabad",
    gradYear: 2022,
    college: "Jadavpur University",
    relocation: "Open to Hyderabad or Bengaluru",
    photoUrl:
      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=900&q=85",
    compatibilityScore: 86,
    compatibilitySummary:
      "Shared appreciation for calm routines, financial prudence, and thoughtful humor.",
    compatibilityBreakdown: [
      { label: "Relocation & Roots", score: 88, note: "Hyderabad / BLR" },
      { label: "Work–Life Rhythm", score: 85, note: "Structured weekdays" },
      { label: "Relationship Intent", score: 86, note: "Looking for long-term" },
    ],
    about:
      "Designs streaming pipelines at Amazon and spends evenings cooking Bengali comfort food or playing acoustic guitar badly. Always down for a quiet rooftop coffee.",
    lookingFor: "Someone kind, curious, and emotionally steady.",
    prompts: {
      q1: "2x hike to move abroad vs. staying near family in India — what’s your call?",
      q1Answer:
        "Stay in India. Money compounds, but time with parents doesn’t.",
      q2: "What’s a book or film you always recommend?",
      q2Answer:
        "Satyajit Ray’s Apu Trilogy if you want cinema, or ‘When Breath Becomes Air’ if you want perspective.",
    },
    sampleReplies: [
      "‘Money compounds, time with parents doesn’t’—glad that resonated with you too.",
      "What’s your comfort movie when a sprint week gets chaotic?",
    ],
  },
];

export const CLOSURE_NOTES: string[] = [
  "I really enjoyed getting to know you, though I don’t feel the romantic spark I’m looking for. Wishing you all the best ahead.",
  "Thank you for the thoughtful conversation! I’m going to focus my energy on another connection right now, and wanted to let you know respectfully.",
  "It’s been lovely chatting with you, though I sense we’re looking for slightly different rhythms right now. Take good care.",
];

export const CITY_MIXERS: MixerEvent[] = [
  {
    id: "mix-blr",
    city: "Bengaluru",
    neighborhood: "Indiranagar · 12th Main",
    title: "Thursday Supper Table",
    dateLabel: "Thu, 11 Dec · 7:30 PM",
    seatsTotal: 8,
    seatsRemaining: 2,
    priceInr: 1200,
    cohorts: "2020–2023 Verified Grads",
  },
  {
    id: "mix-pune",
    city: "Pune",
    neighborhood: "Koregaon Park · Lane 6",
    title: "Sunday Filter Coffee & Books",
    dateLabel: "Sun, 14 Dec · 10:30 AM",
    seatsTotal: 8,
    seatsRemaining: 3,
    priceInr: 850,
    cohorts: "2020–2023 Verified Grads",
  },
  {
    id: "mix-hyd",
    city: "Hyderabad",
    neighborhood: "Jubilee Hills · Rd 45",
    title: "Intimate 8-Seat Tasting Dinner",
    dateLabel: "Sat, 20 Dec · 8:00 PM",
    seatsTotal: 8,
    seatsRemaining: 4,
    priceInr: 1200,
    cohorts: "2020–2023 Verified Grads",
  },
];

export function createInitialThreads(): ChatThread[] {
  const rohan = MATCH_POOL.find((m) => m.id === "m-rohan")!;
  const niharika = MATCH_POOL.find((m) => m.id === "m-niharika")!;

  return [
    {
      id: "thread-niharika",
      matchId: niharika.id,
      matchName: niharika.name,
      matchRole: niharika.role,
      matchCity: niharika.city,
      matchGradYear: niharika.gradYear,
      matchPhotoUrl: niharika.photoUrl,
      status: "active",
      unlockedAt: "Yesterday · 8:14 PM",
      sharedPrompts: {
        q1: niharika.prompts.q1,
        myA1: "Staying in India for sure—being a short flight from family beats a bigger package abroad.",
        theirA1: niharika.prompts.q1Answer,
        q2: niharika.prompts.q2,
        myA2: "Zero performative small talk, and someone who actually remembers little details.",
        theirA2: niharika.prompts.q2Answer,
      },
      messages: [
        {
          id: "msg-n-1",
          sender: "system",
          text: "Shared prompt completed · Photos unblurred for both of you.",
          timestamp: "Yesterday · 8:14 PM",
        },
        {
          id: "msg-n-2",
          sender: "match",
          text: "Loved your answer on staying close to family. Also, Koramangala pour-over debates are my favourite way to spend a Saturday.",
          timestamp: "Yesterday · 8:19 PM",
        },
        {
          id: "msg-n-3",
          sender: "me",
          text: "Same here! Have you tried the new seasonal roast at Maverick & Farmer yet?",
          timestamp: "Yesterday · 8:26 PM",
        },
        {
          id: "msg-n-4",
          sender: "match",
          text: "Not yet—it’s been sitting on my saved list for two weeks. Should we go this weekend?",
          timestamp: "Today · 10:05 AM",
        },
      ],
    },
    {
      id: "thread-rohan",
      matchId: rohan.id,
      matchName: rohan.name,
      matchRole: rohan.role,
      matchCity: rohan.city,
      matchGradYear: rohan.gradYear,
      matchPhotoUrl: rohan.photoUrl,
      status: "active",
      unlockedAt: "2 days ago · 7:42 PM",
      sharedPrompts: {
        q1: rohan.prompts.q1,
        myA1: "India long-term—Bengaluru or Hyderabad feels like the right balance of work and family.",
        theirA1: rohan.prompts.q1Answer,
        q2: rohan.prompts.q2,
        myA2: "Quiet bookstore browse followed by filter coffee where we can actually hear each other.",
        theirA2: rohan.prompts.q2Answer,
      },
      messages: [
        {
          id: "msg-r-1",
          sender: "system",
          text: "Shared prompt completed · Photos unblurred for both of you.",
          timestamp: "2 days ago · 7:42 PM",
        },
        {
          id: "msg-r-2",
          sender: "match",
          text: "Okay, we literally gave the same bookstore + filter coffee answer. Blossoms or Champaca?",
          timestamp: "2 days ago · 7:55 PM",
        },
        {
          id: "msg-r-3",
          sender: "me",
          text: "Champaca for the calm balcony, Blossoms when I want to lose two hours in the stacks.",
          timestamp: "2 days ago · 8:12 PM",
        },
      ],
    },
  ];
}

export function createInitialState(): KoraState {
  const now = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return {
    view: "landing",
    activeTab: "drop",
    account: null,
    onboardingStep: 1,
    verifiedElitmus: false,
    verifiedAt: null,
    dpdpConsent: {
      matchingProfile: true,
      verifiedAlumniBadge: true,
      zeroAdsNoJobCrossover: true,
      updatedAt: `Today, ${now}`,
    },
    consentLog: [
      {
        id: "log-init",
        timestamp: `Today, ${now}`,
        action: "DPDP Privacy Baseline Initialized",
        detail: "Zero ad-tracking & zero job-portal data crossover enforced by default.",
      },
    ],
    shieldedDomains: ["@atlassian.com"],
    shieldedColleges: [],
    dropBatchOffset: 0,
    passedMatchIds: [],
    unlockedMatchIds: ["m-niharika", "m-rohan"],
    threads: createInitialThreads(),
    selectedThreadId: "thread-niharika",
    isPro: false,
    rsvpedMixerIds: [],
    erasedBanner: false,
  };
}

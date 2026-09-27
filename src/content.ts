// All site copy lives here. Components read from this module and never hard-code text,
// so a copy change (a new project, an edited bio line) never touches component code.

export type ProjectCategory = "Client" | "Group" | "Academic" | "Infrastructure" | "Freelance";

export interface Project {
  slug: string;
  name: string;
  category: ProjectCategory;
  role: string;
  description: string;
  stack: string[];
  repoUrl: string | null;
  liveUrl: string | null;
  featured: boolean;
  /** Replaces the Live Project button entirely, e.g. "Live since 2025". */
  badge?: string;
  /** Gallery-style card: render no repo/live buttons at all. */
  hideButtons?: boolean;
  /** Owner note surfaced only in dev/CMS contexts, never rendered to visitors. */
  ownerNote?: string;
}

export type ProblemStepIcon = "write" | "match" | "send";

export const problemBox = {
  title: "What's slowing your work down?",
  intro: "Tell me about the job that eats your day. It takes a minute, and you don't need to open your email.",
  steps: [
    { icon: "write", title: "Describe it in plain words", text: "No forms, no jargon. Just what's slow or annoying." },
    { icon: "match", title: "See what I've already built", text: "Projects that solved something similar pop up as you type." },
    { icon: "send", title: "Send it in one tap", text: "It lands in my inbox. Leave a contact only if you want a reply." },
  ] satisfies { icon: ProblemStepIcon; title: string; text: string }[],
  placeholder: "e.g. We take orders on WhatsApp and keep losing track of who paid",
  matchesTitle: "Things I've already built that might help:",
  contactLabel: "Want a reply? Leave a phone number or email (optional)",
  contactPlaceholder: "0712 345 678 or you@example.com",
  send: "Send it to Rich",
  sending: "Sending...",
  sent: "Got it, thank you. I read every one.",
  sentWithContact: "Got it, thank you. I'll be in touch.",
  error: "That didn't go through.",
  privacy: "By sending, you agree I can read it and reply. Nothing is shared.",
  privacyMore: "What happens to it?",
  privacyNote: [
    "I only get what you type here: your message and, if you add one, a phone number or email.",
    "It's emailed to me through Resend, a mail service based in the US, so it leaves Kenya on the way. It isn't saved on this website, sold, or shared, and I only use it to reply to you.",
    "Want it deleted? Email me and I'll delete it from my inbox. This follows Kenya's Data Protection Act, 2019.",
  ],
};

export const homeCopy = {
  aboutTeaser: "I find the slow, messy way something gets done, and build the app that makes it fast.",
  servicesTitle: "What I can do for you",
  journeyEyebrow: "12 stops and counting",
  journeyTitle: "Take the full journey",
};

export const footerLine =
  "Ambitious by nature and methodical by practice. Open to freelance work.";

/** Browser-tab titles, one per page. */
export const pageTitles = {
  home: "Rich Maina | Developer in Nairobi",
  story: "Story | Rich Maina",
  projects: "All projects | Rich Maina",
  about: "About | Rich Maina",
  contact: "Contact | Rich Maina",
  notFound: "Page not found | Rich Maina",
};

export const notFoundCopy = {
  title: "This stop isn't on the map",
  text: "The page you're looking for doesn't exist, or it moved.",
  button: "Back to the start",
};

export const contactIntro =
  "Got a job that still runs on paper, phone calls, or a very busy WhatsApp group? Tell me what's slow, and I'll tell you how I'd fix it.";

export const contacts = {
  email: "richmaina0@gmail.com",
  phone: "0727 305 152",
  github: "https://github.com/Atthespice",
  location: "Nairobi, Kenya",
};

export interface Service {
  title: string;
  description: string;
}

export const services: Service[] = [
  {
    title: "Apps & websites",
    description:
      "If your business runs on a notebook and a WhatsApp group, I'll build the system that runs it " +
      "instead: websites and web apps with M-Pesa and SMS built in.",
  },
  {
    title: "Internet & Wi-Fi setup",
    description:
      "Routers, cables, and Wi-Fi that reaches every room. I built, and still run, a network that " +
      "keeps 30 people online across three floors.",
  },
  {
    title: "Tech support",
    description:
      "Slow laptop, broken install, confusing setup. I fix it and explain it, so you can get back to work.",
  },
  {
    title: "Branding & design",
    description:
      "Logos, posters, and vehicle wraps people remember, made in Photoshop, Lightroom, and Canva.",
  },
  {
    title: "Social media & content",
    description:
      "Photos, videos, and a posting plan that keeps a page alive. I run the pages for two Nairobi institutions.",
  },
];

export interface Certification {
  title: string;
  detail: string;
}

export const certifications: Certification[] = [
  { title: "Full-Stack Development Certificate", detail: "Safaricom Power Learn Project, graduated July 2025" },
  { title: "Cybersecurity Certificate (in progress)", detail: "Cyber Shujaa, expected Dec 2026" },
  { title: "Silver Prize, 16th International Standards Olympiad (2021)", detail: "Sponsored by KEBS" },
  {
    title: "County-Level Winner, Kenya Science & Engineering Fair",
    detail: "Health innovation (diabetes management)",
  },
  { title: "Volunteer Coding Instructor & Science Mentor", detail: "Thika High School (Feb–Apr 2026)" },
];

export interface EducationEntry {
  title: string;
  detail: string;
}

export const education: EducationEntry[] = [
  { title: "Diploma in Information Technology", detail: "KCA University, Nairobi (Sep 2024 – Dec 2026, expected)" },
  { title: "KCSE", detail: "Thika High School (2020–2023)" },
];

export interface TechGroup {
  title: string;
  items: string[];
}

export const techStack: TechGroup[] = [
  { title: "Frontend", items: ["React", "Vite", "TypeScript", "JavaScript", "HTML/CSS", "Tailwind CSS", "Framer Motion"] },
  {
    title: "Backend & data",
    items: [
      "Node.js",
      "Express",
      "MongoDB",
      "Supabase (PostgreSQL, Auth)",
      "SQLite",
      "REST APIs",
      "Zod",
      "PHP",
      "MySQL/MariaDB",
      "PDO",
      "Guzzle",
    ],
  },
  {
    title: "Integrations",
    items: ["Africa's Talking SMS", "WhatsApp Business API", "Safaricom Daraja (M-Pesa)", "OpenAI API"],
  },
  { title: "Mobile", items: ["Flutter", "Dart", "SQLite (drift)", "fl_chart", "local_auth"] },
  {
    title: "DevOps & testing",
    items: [
      "Docker",
      "Git/GitHub",
      "Vercel",
      "PWA/service workers",
      "Vitest",
      "Playwright",
      "Python",
      "pytest",
      "GitHub Actions",
    ],
  },
  {
    title: "Networking",
    items: ["MikroTik RouterOS (DHCP, NAT, firewall, bandwidth mgmt)", "LAN design & cabling", "IP subnetting", "Switch deployment"],
  },
  { title: "Creative", items: ["Photoshop", "Lightroom", "Premiere Pro", "Canva"] },
];

export const projects: Project[] = [
  {
    slug: "bidii-driving-school-mis",
    name: "Bidii Driving School MIS",
    category: "Client",
    role: "Client · Academic capstone",
    description:
      "Full management information system for a Nairobi driving school: student registration, " +
      "NTSA PDL/IDL licence tracking, fee management in KES, and SMS notifications, backed " +
      "by a 40-page IEEE/ISO-standard SRS.",
    stack: ["React", "Vite", "Supabase", "PostgreSQL", "Auth", "Africa's Talking SMS"],
    repoUrl: null,
    liveUrl: null,
    featured: true,
  },
  {
    slug: "residential-isp",
    name: "Residential ISP: 3 Floors, 30 Users",
    category: "Infrastructure",
    role: "Live infrastructure",
    description:
      "Designed, installed, and operate building-wide internet and Wi-Fi infrastructure on a " +
      "300 Mbps uplink: MikroTik hEX (DHCP, NAT, firewall), three cascaded switches, and " +
      "distributed Wi-Fi access points across all floors on a structured 192.168.10.0/24 " +
      "subnet, with ongoing first-line support. A growing residential ISP operation, live " +
      "since Jan 2025.",
    stack: ["MikroTik RouterOS", "LAN design", "IP subnetting"],
    repoUrl: null,
    liveUrl: null,
    featured: true,
    badge: "Live since 2025",
  },
  {
    slug: "katiba-os",
    name: "Katiba OS",
    category: "Group",
    role: "Group personal project",
    description:
      "A legal workflow platform for East Africa, starting with Kenya. Turns scattered " +
      "evidence (voice notes, M-Pesa records, invoices, chats) into organized, " +
      "evidence-linked case files that a human legal professional reviews and approves. " +
      "Flagship Justice Engine works end-to-end: bilingual intake (English/Kiswahili, with " +
      "voice), evidence-linked timelines with confidence scoring, allow-listed legal " +
      "citations, and a downloadable PDF preparation pack. Built with a human-approval " +
      "gate: the AI never files or decides anything on its own.",
    stack: [
      "React 19",
      "TypeScript",
      "Vite",
      "Express 5",
      "Zod",
      "SQLite",
      "Recharts",
      "PWA",
      "Flutter",
      "OpenAI API",
      "Vitest",
      "Playwright",
    ],
    repoUrl: null,
    liveUrl: "https://katibaos.njajisamson.workers.dev",
    featured: true,
    ownerNote: "Repo is on GitHub. Insert the URL here.",
  },
  {
    slug: "ai-powered-helpdesk",
    name: "AI-Powered Helpdesk",
    category: "Group",
    role: "Personal/portfolio build",
    description:
      "Ticket management system with AI assistance: intake via email, web form, and chat; " +
      "AI classification, summaries, and draft-only suggested replies that an agent must " +
      "review and approve; priority levels with SLA due-by tracking; admin and agent roles.",
    stack: ["TypeScript", "Docker", "Node.js"],
    repoUrl: "https://github.com/Atthespice/helpdesk",
    liveUrl: null,
    featured: false,
  },
  {
    slug: "mwirigo-emergency-reporting-system",
    name: "Mwirigo Emergency Reporting System",
    category: "Academic",
    role: "Collaborative academic build",
    description:
      "Digital emergency platform for the Mwirigo community: residents report fires, medical " +
      "crises, and security incidents instantly with GPS location, replacing manual " +
      "phone-and-word-of-mouth coordination, so responders can verify, dispatch, and " +
      "coordinate from one place.",
    stack: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/Atthespice/mwirigo-emergency-reporting-system",
    liveUrl: null,
    featured: false,
    ownerNote: "Adjust credit line if needed: proposal authored with Venessa Nyaboke.",
  },
  {
    slug: "safaricom-plp-mern-capstone",
    name: "Safaricom PLP: MERN Capstone",
    category: "Academic",
    role: "Academic (Power Learn Project)",
    description:
      "Full-stack MERN application built during the Safaricom Power Learn Project full-stack " +
      "program (MongoDB, Express, React, Node.js).",
    stack: ["MongoDB", "Express", "React", "Node.js"],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    ownerNote: "Add one sentence on what the app does, and insert the repo URL, before launch.",
  },
  {
    slug: "brand-and-media",
    name: "Brand & Media: Bidii + Best Kenya College",
    category: "Freelance",
    role: "Freelance",
    description:
      "Vehicle wrap mockups, promotional graphics and marketing collateral, plus official " +
      "social media management for two Nairobi institutions (2024 – present).",
    stack: ["Photoshop", "Lightroom", "Premiere Pro", "Canva"],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    hideButtons: true,
  },
  {
    slug: "unadoo",
    name: "Unadoo: Local Expense & Habit Analytics",
    category: "Group",
    role: "Personal build (in development)",
    description:
      "A local-first, offline Android app that parses M-Pesa SMS into a categorized expense " +
      "ledger, tracks self-defined habits on a calendar, and mines both datasets for " +
      "effect-size-gated spend/habit correlations. No cloud, no account, and nothing leaves " +
      "the phone. It's sideloaded by design, since SMS-read permissions rule out Play Store distribution.",
    stack: ["Flutter", "Dart", "SQLite (drift)", "fl_chart", "local_auth", "WorkManager"],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    badge: "In development",
    ownerNote:
      "Update stack/status as build phases progress. Full spec lives in UNADOO_PLAN.md in the Unadoo project folder, not this repo.",
  },
  {
    slug: "nyumbani",
    name: "Nyumbani",
    category: "Client",
    role: "Client · Rental management SaaS",
    description:
      "A private, invite-only rental management platform for Kenyan landlords: per-tenant " +
      "rent across multiple buildings, M-Pesa payment reconciliation against a unique " +
      "account reference per lease, OTP-verified tenant self-registration, photo-based " +
      "maintenance tracking, and an arrears overview with automated SMS reminders.",
    stack: ["React", "Vite", "TypeScript", "Supabase (PostgreSQL, Auth)", "Tailwind CSS", "React Router"],
    repoUrl: null,
    liveUrl: "https://nyumbani-8jusljhtu-at-the-spice.vercel.app/",
    featured: false,
    badge: "Private by invitation",
    ownerNote:
      "Deployment Protection was disabled on this URL 2026-07-19, confirmed working: it loads the real landing page, not a Vercel login screen.",
  },
  {
    slug: "wealth-track",
    name: "Wealth Track",
    category: "Group",
    role: "Personal build (in active build)",
    description:
      "Personal, single-user finance PWA. Reverses a plan from a financial-freedom target, splits every " +
      "income by an adaptive ratio, logs each allocation to a permanent ledger, and separates Kenyan " +
      "from global investment research. Fed by Unadoo's own expense export.",
    stack: ["PHP", "MySQL/MariaDB", "React", "Vite", "TypeScript", "Tailwind CSS"],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    badge: "Personal & private, in build",
    ownerNote: "No public live link by design: handles real personal financial data. Repo is private.",
  },
  {
    slug: "dobi-go",
    name: "Dobi Go",
    category: "Client",
    role: "Client · Live pilot (Zimmerman, Nairobi)",
    description:
      "Pickup-and-delivery laundry platform. A customer PWA with phone/OTP sign-in and live order " +
      "tracking, an ops console with a weather-driven sun-dry estimate, and a delivery-agent app where " +
      "a drop-off closes only on photo evidence plus a real-time M-Pesa payment.",
    stack: ["PHP", "MySQL", "PDO", "Guzzle", "PWA", "WhatsApp Business API", "Safaricom Daraja (M-Pesa)"],
    repoUrl: null,
    liveUrl: null,
    featured: false,
    badge: "Live pilot, Zimmerman",
    ownerNote: "No public live link: real customer orders and payments. Not yet pushed to a GitHub repo.",
  },
  {
    slug: "loophole",
    name: "LoopHole",
    category: "Group",
    role: "Group · Hackathon build (feature-complete)",
    description:
      "Breaks a security guard function before an attacker does. Takes a check meant to block bad " +
      "input, uses an AI model to find an input that slips past it, proves the break is real by " +
      "running the code, and shows the one line that closes the hole.",
    stack: ["Python", "pytest", "GitHub Actions"],
    repoUrl: "https://github.com/Atthespice/LoopHole",
    liveUrl: null,
    featured: false,
    badge: "Run locally, see README",
  },
  {
    slug: "track-my-kid",
    name: "TrackMyKid",
    category: "Client",
    role: "Client · Live product (Jendie Automobiles)",
    description:
      "Shows Kenyan parents exactly where the school van is and sends an instant alert the moment " +
      "their child boards, arrives, or is dropped home.",
    stack: ["HTML", "CSS", "JavaScript"],
    repoUrl: null,
    liveUrl: "https://trackmykid.co.ke",
    featured: false,
  },
];

export const projectCategories: ProjectCategory[] = ["Client", "Group", "Academic", "Infrastructure", "Freelance"];


// --- "A world through my lens": the globe section right after the Home hero. ---

export type HeroCalloutIcon = "apps" | "ai" | "place";

export const worldSection = {
  title: "A world through my lens",
  tagline: "Everyone has an idea. I turn it into reality.",
  globeLabel: "Start the journey: see everything I've built",
  tapTitle: "Tap the globe",
  tapText: "Fly into my projects",
  problemButton: "Tell me your problem",
  cta: "See what I've built",
  callouts: [
    { icon: "apps", title: "Apps for real problems", text: "Rent, laundry, school vans" },
    { icon: "ai", title: "AI that does the busywork", text: "A person always has the final say" },
    { icon: "place", title: "Built in Nairobi", text: "For Kenyan businesses first" },
  ] satisfies { icon: HeroCalloutIcon; title: string; text: string }[],
};

// --- Story: the road map on /story. Plain, first-person wording throughout. ---
// See NARRATIVE_REVAMP_SPEC.md for the concept this implements.

export type ScreenshotStatus = "ready" | "pending" | "text-only";
export type ChapterStatus = "live" | "building" | "done";

export const chapterStatusLabels: Record<ChapterStatus, string> = {
  live: "Live",
  building: "In progress",
  done: "Finished",
};

export interface ChapterBeats {
  problem: string;
  built: string;
  now: string;
}

export interface Chapter {
  number: number;
  /** Plain-language title shown on the map and the book page. */
  chapterTitle: string;
  /** References Project.slug. Usually one; the "Two school projects" stop has two. */
  projectSlugs: string[];
  status: ChapterStatus;
  beats: ChapterBeats;
  stat?: { value: string; label: string };
  screenshotStatus: ScreenshotStatus;
}

export const chapters: Chapter[] = [
  {
    number: 1,
    chapterTitle: "Internet for my building",
    projectSlugs: ["residential-isp"],
    status: "live",
    beats: {
      problem: "The building I live in had no reliable internet.",
      built:
        "I planned it, ran the cables, and set up Wi-Fi across all three floors myself, from the main " +
        "router down to every access point.",
      now:
        "30 people use it every day. It's been running since January 2025, and I'm the one they call " +
        "when something breaks.",
    },
    stat: { value: "30 people", label: "online since Jan 2025" },
    screenshotStatus: "pending",
  },
  {
    number: 2,
    chapterTitle: "Design and social media",
    projectSlugs: ["brand-and-media"],
    status: "live",
    beats: {
      problem: "Two schools in Nairobi needed to look good online and on the road, but nobody was handling it.",
      built:
        "I designed their vehicle wraps, posters, and marketing material, and I run their social media " +
        "pages: planning, photos, video, and posting.",
      now: "Still doing it, since 2024.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 3,
    chapterTitle: "A system for a driving school",
    projectSlugs: ["bidii-driving-school-mis"],
    status: "building",
    beats: {
      problem: "A driving school in Nairobi kept track of students, licences, and fees on paper.",
      built:
        "I wrote a full plan for the system first, then started building it: student sign-up, licence " +
        "tracking, fee records in shillings, and SMS reminders.",
      now: "In progress, for a real client.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 4,
    chapterTitle: "Two school projects",
    projectSlugs: ["mwirigo-emergency-reporting-system", "safaricom-plp-mern-capstone"],
    status: "done",
    beats: {
      problem:
        "In Mwirigo, people reported fires and emergencies by phone and word of mouth, so help was slow " +
        "to arrive. And my coding course needed a final project that proved I could build a full app.",
      built:
        "With Venessa Nyaboke, I built a site where residents report an emergency with their location, " +
        "so responders see it all in one place. For the course, I built a complete web app, from the " +
        "database to the screen.",
      now: "Both finished.",
    },
    screenshotStatus: "text-only",
  },
  {
    number: 5,
    chapterTitle: "A helpdesk with AI help",
    projectSlugs: ["ai-powered-helpdesk"],
    status: "done",
    beats: {
      problem: "When support requests pile up, it's hard to know which ones matter most.",
      built:
        "A support ticket system where AI sorts requests, summarises them, and drafts replies. A person " +
        "always reads and approves a reply before it's sent.",
      now: "Finished. It's the first project where I used AI to do real work, with a human always in charge.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 6,
    chapterTitle: "An app for landlords",
    projectSlugs: ["nyumbani"],
    status: "live",
    beats: {
      problem:
        "Landlords with several buildings track rent in notebooks and WhatsApp chats, and struggle to " +
        "match M-Pesa payments to the right tenant.",
      built:
        "A private app where landlords see every tenant's rent, M-Pesa payments are matched " +
        "automatically, tenants sign up with a code, repairs are logged with photos, and late payers get " +
        "SMS reminders.",
      now: "Live. Landlords join by invitation only.",
    },
    screenshotStatus: "ready",
  },
  {
    number: 7,
    chapterTitle: "A private money tracker",
    projectSlugs: ["unadoo"],
    status: "building",
    beats: {
      problem: "I wanted to see where my money goes without giving an app my messages or my bank details.",
      built:
        "An Android app that reads my M-Pesa messages, sorts my spending into categories, tracks my " +
        "habits, and shows me how the two connect. Everything stays on my phone.",
      now:
        "In progress. It installs directly, not from the Play Store, because Google limits apps that read SMS.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 8,
    chapterTitle: "My savings planner",
    projectSlugs: ["wealth-track"],
    status: "building",
    beats: {
      problem: "Most budgeting apps assume the same salary every month. My income isn't like that.",
      built:
        "A personal planner that starts from a savings goal and works backwards, splits every payment I " +
        "receive into set portions, and keeps a permanent record of where each shilling went. It gets my " +
        "spending data straight from my money tracker.",
      now:
        "In progress, for my use only, so there's no public link. I've already tested it against common " +
        "scams and fixed what I found.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 9,
    chapterTitle: "A laundry delivery app",
    projectSlugs: ["dobi-go"],
    status: "live",
    beats: {
      problem:
        "A laundry business in Zimmerman ran pickups and deliveries on phone calls and paper, so orders got lost.",
      built:
        "Customers book a pickup and follow their order on their phone. The shop gets a dashboard that " +
        "even estimates drying time from the weather. Drivers can only close a delivery with a photo and " +
        "an M-Pesa payment.",
      now: "Running now with its first laundry, Maggy's in Zimmerman. More laundries are next.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 10,
    chapterTitle: "A tool that tests security",
    projectSlugs: ["loophole"],
    status: "done",
    beats: {
      problem: "Code meant to keep attackers out often has gaps the person who wrote it can't see.",
      built:
        "A tool that uses AI to find a way past a piece of security code, runs it to prove the gap is " +
        "real, and shows the one-line fix.",
      now: "Finished, and built to present at a hackathon.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 11,
    chapterTitle: "School van tracking",
    projectSlugs: ["track-my-kid"],
    status: "live",
    beats: {
      problem: "Parents put their children on a school van every morning with no way of knowing where it is.",
      built:
        "TrackMyKid shows parents where the van is and sends an alert the moment their child gets on, " +
        "arrives at school, or gets home. Built for Jendie Automobiles.",
      now: "Live.",
    },
    screenshotStatus: "pending",
  },
  {
    number: 12,
    chapterTitle: "Legal help, organised",
    projectSlugs: ["katiba-os"],
    status: "live",
    beats: {
      problem:
        "People with legal problems have their evidence scattered across voice notes, M-Pesa messages, " +
        "receipts, and chats.",
      built:
        "A platform that gathers that evidence into one clear case file, in English or Kiswahili, even " +
        "from voice notes. A real legal professional reviews everything. The AI never decides or files " +
        "anything by itself.",
      now: "Working from start to finish, with a live demo.",
    },
    screenshotStatus: "ready",
  },
];

/**
 * The road map is split into short parts (like worlds in a level map) so it never
 * becomes one endless scroll. Adding a project: add its chapter above, then put its
 * number in the latest part, or start a new part once that one has about four stops.
 */
export interface StoryPart {
  number: number;
  title: string;
  blurb: string;
  chapterNumbers: number[];
}

export const storyParts: StoryPart[] = [
  {
    number: 1,
    title: "First steps",
    blurb: "Where it started: hands-on work for the people around me.",
    chapterNumbers: [1, 2, 3, 4],
  },
  {
    number: 2,
    title: "Real products",
    blurb: "Apps that real people and real money depend on.",
    chapterNumbers: [5, 6, 7, 8],
  },
  {
    number: 3,
    title: "Bigger problems",
    blurb: "Businesses, families, and justice.",
    chapterNumbers: [9, 10, 11, 12],
  },
];

export interface StoryEpilogue {
  title: string;
  paragraphs: string[];
  teaser: string;
}

export const storyEpilogue: StoryEpilogue = {
  title: "What ties it all together",
  paragraphs: [
    "These projects aren't separate. I build them all with the same system, which I call Rich OS: a " +
      "shared set of plans and habits for how I scope a project, check it for security problems, and ship it.",
    "I also keep a research library of 121 Kenyan apps and websites, from M-Pesa to eCitizen, noting what " +
      "they do well, what makes people trust them, and which scams to watch out for. My newer projects " +
      "are checked against it before they go live.",
  ],
  teaser:
    "Next launch: helping traders in markets like Gikomba sell online, straight from WhatsApp, with no " +
    "middlemen. Nothing live yet. Ask me about it.",
};

// --- About page: short, interactive sections instead of one long bio. ---

export interface BeforeAfter {
  label: string;
  before: string;
  after: string;
  /** Story stop this came from, so the card can link to it. */
  chapterNumber: number;
}

export const aboutPage = {
  eyebrow: "About me",
  headline: "I make slow things fast.",
  intro:
    "I'm Mwangi Rich Maina, a developer, network builder, and designer from Nairobi. I look for the " +
    "jobs people still do the hard way, on paper, over phone calls, in endless WhatsApp threads, and " +
    "I build the app that does it for them.",

  beforeAfterTitle: "Before and after",
  beforeAfterHint: "Flip the switch to see what changed.",
  beforeAfter: [
    {
      label: "Collecting rent",
      before: "A notebook, a WhatsApp group, and guessing which M-Pesa payment belongs to which tenant.",
      after: "Payments matched to tenants automatically. Late payers get an SMS reminder.",
      chapterNumber: 6,
    },
    {
      label: "Laundry pickups",
      before: "Phone calls, paper slips, and orders that went missing.",
      after: "Book a pickup, follow the order, pay when it arrives. Nothing gets lost.",
      chapterNumber: 9,
    },
    {
      label: "The school van",
      before: "Parents with no way of knowing where the van is, or if their child got on.",
      after: "An alert the moment their child boards, arrives, or gets home.",
      chapterNumber: 11,
    },
    {
      label: "Building Wi-Fi",
      before: "Three floors and no reliable internet.",
      after: "30 people online every day, since January 2025.",
      chapterNumber: 1,
    },
  ] satisfies BeforeAfter[],

  processTitle: "How I work",
  process: [
    {
      title: "Plan it",
      text: "I map the real workflow first, with the people who do it. My driving school system started as a 40-page plan.",
    },
    {
      title: "Build it",
      text: "Simple tools that fit how people already work: M-Pesa, SMS, WhatsApp, the phone in their pocket.",
    },
    {
      title: "Try to break it",
      text: "Before launch I think like a scammer and an attacker, then fix everything I find.",
    },
    {
      title: "Ship it and stay",
      text: "I don't vanish after launch. When the building Wi-Fi drops, I'm still the one they call.",
    },
  ],

  statsTitle: "By the numbers",
  stats: [
    { value: chapters.length, label: "projects on my road map" },
    { value: 30, label: "people online on a network I built" },
    { value: 121, label: "Kenyan apps I've studied for ideas" },
    { value: 2, label: "institutions whose social media I run" },
  ],

  toolboxTitle: "My toolbox",
  toolboxHint: "Open a drawer.",

  trophiesTitle: "Trophies and training",

  nowEyebrow: "$RICH earnings report",
  nowTitle: "What's coming next",
  nowPriceLabel: "Price today",
  now: [
    "Taking Dobi Go from one laundry to many.",
    "Studying cybersecurity with Cyber Shujaa, finishing December 2026.",
    "Finishing my IT diploma at KCA University, December 2026.",
  ],

  ctaTitle: "Got a messy workflow?",
  ctaText: "Tell me what's slow. I'll tell you how I'd fix it.",
  ctaButton: "Let's talk",
};

// --- $RICH: the "invest in me" ticker on Home, with a pill in the navbar on every page. ---
// The price isn't made up: it's rebuilt from the Story stops above, so it only goes up
// when a real project moves. Change a chapter's status and the chart follows.

export const investTicker = {
  symbol: "$RICH",
  name: "Rich Maina",
  exchange: "Nairobi",
  eyebrow: "Invest in me",
  title: "Get in early",
  intro:
    "Bitcoin was cheap once, too. My price is built from real work: every project on my road map " +
    "moves it. Drag across the chart to see what moved it and when.",
  startLabel: "Where I started",
  /** Index points each Story stop adds, by status. */
  moves: { live: 40, done: 25, building: 15 } satisfies Record<ChapterStatus, number>,
  startPrice: 100,
  howTitle: "What moves the price",
  howItems: [
    { status: "live", text: "It goes live and people use it" },
    { status: "done", text: "It's finished and handed over" },
    { status: "building", text: "It's being built right now" },
  ] satisfies { status: ChapterStatus; text: string }[],
  sinceStart: "since stop 1",
  investTitle: "How to buy in",
  invest: [
    { kind: "hire", title: "Hire me", text: "Bring a project. Pays off for both of us." },
    { kind: "problem", title: "Send a problem", text: "Tell me what's slow. It costs nothing." },
    { kind: "share", title: "Share my site", text: "One WhatsApp share is a strong buy signal." },
  ] satisfies { kind: "hire" | "problem" | "share"; title: string; text: string }[],
  shareText: "Check out Rich Maina's work, a developer in Nairobi who makes slow things fast:",
  disclaimer:
    "Just for fun. $RICH isn't a coin, share or token, and I will never ask you to send money to " +
    "\"invest\". If anyone does in my name, it's a scam.",
  pillLabel: "See my $RICH chart",
  /** Dashed "coming next" point after the last stop. Priced as if it goes live. */
  upcoming: {
    label: "Coming next: Gikomba traders selling on WhatsApp",
    note: "Not live yet. Worth +40 the day it launches.",
    link: "Read about it",
  },
  storyMove: "moved $RICH",
};

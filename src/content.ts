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

export const heroTagline =
  "A full-stack developer and creative technologist building software, networks, and brands that businesses in Nairobi run on.";

export const aboutFull =
  "I'm Mwangi Rich Maina, a full-stack developer, network operator, and designer based in " +
  "Nairobi. I currently operate a live 30-user residential internet service on MikroTik " +
  "infrastructure and am building a complete management information system for a real " +
  "driving school client. I'm a certified full-stack developer (Safaricom Power Learn " +
  "Project) with cybersecurity training in progress. What sets my work apart is planning: " +
  "I take a client's problem end-to-end, scoping it properly, building it well, and " +
  "communicating clearly at every step. Big ideas, disciplined execution.";

export const footerLine =
  "Ambitious by nature and methodical by practice. Open to freelance work.";

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
    title: "Web Development",
    description:
      "Full-stack builds with React, Vite, Node.js and Supabase, from student registration " +
      "systems to REST and SMS API integrations that businesses run on.",
  },
  {
    title: "Networking & ISP Setup",
    description:
      "MikroTik RouterOS configuration, LAN design, cabling and switch deployment. I design, " +
      "install and operate networks, including a live 30-user, 300 Mbps building network " +
      "with full Wi-Fi distribution.",
  },
  {
    title: "IT Support",
    description:
      "Hardware and software diagnostics, OS installation and maintenance, and patient " +
      "first-line user support that keeps people working instead of waiting.",
  },
  {
    title: "Brand & Graphic Design",
    description:
      "Brand identities, vehicle wrap mockups and marketing collateral in Photoshop, " +
      "Lightroom and Canva. Visuals built to be remembered on the street.",
  },
  {
    title: "Social Media & Content",
    description:
      "Planning, photography, videography and page management that grow engagement. " +
      "Currently running official pages for two Nairobi institutions.",
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
    items: ["Node.js", "Express", "MongoDB", "Supabase (PostgreSQL, Auth)", "SQLite", "REST APIs", "Zod"],
  },
  { title: "Integrations", items: ["Africa's Talking SMS", "Safaricom Daraja (M-Pesa)", "OpenAI API"] },
  { title: "Mobile", items: ["Flutter", "Dart", "SQLite (drift)", "fl_chart", "local_auth"] },
  { title: "DevOps & testing", items: ["Docker", "Git/GitHub", "Vercel", "PWA/service workers", "Vitest", "Playwright"] },
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
];

export const projectCategories: ProjectCategory[] = ["Client", "Group", "Academic", "Infrastructure", "Freelance"];

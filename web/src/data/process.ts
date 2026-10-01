export type Path = "vhi" | "hse" | "private";

export const pathOrder: Path[] = ["vhi", "hse", "private"];

export function parsePath(value: string | null): Path {
  return value === "vhi" || value === "hse" || value === "private" ? value : "private";
}

export type PathProfile = {
  label: string;
  short: string;
  wait: string;
  waitDays: number;
  cost: string;
  costNote: string;
  referral: string;
  phone: string;
  phoneLabel: string;
  bookStep: string;
};

export const profiles: Record<Path, PathProfile> = {
  vhi: {
    label: "I have Vhi",
    short: "Vhi member",
    wait: "about 10 days",
    waitDays: 10,
    cost: "Vhi benefit",
    costNote: "Claim under your Consultant benefit — check your Table of Benefits.",
    referral: "No GP letter needed. Call the Vhi line or request a call back.",
    phone: "+35312248111",
    phoneLabel: "01 224 8111",
    bookStep: "Call the dedicated Vhi line or request a call back. We book your nearest clinic — usually within about 10 days.",
  },
  hse: {
    label: "HSE / GP referred",
    short: "HSE or GP referral",
    wait: "set by your hospital",
    waitDays: 21,
    cost: "No charge",
    costNote: "Public pathway — your HSE hospital or GP refers you and there is nothing to pay.",
    referral: "Your GP or hospital sends the referral (Healthlink, Healthmail, email or post).",
    phone: "+35312248100",
    phoneLabel: "01 224 8100",
    bookStep: "Your GP or HSE hospital refers you to us. We call you to arrange the nearest clinic — no waiting-list letter, no queue.",
  },
  private: {
    label: "Paying myself",
    short: "Private patient",
    wait: "within 4 weeks",
    waitDays: 28,
    cost: "€309",
    costNote: "All-in: nurse scan, consultant diagnosis, results call and prescription if needed. Same price for medical-card holders.",
    referral: "Self-referral is fine — no GP letter required.",
    phone: "+35312248100",
    phoneLabel: "01 224 8100",
    bookStep: "Request a call back or ring us. Self-referrals are welcome — you don’t need a GP letter. Appointments are usually within 4 weeks.",
  },
};

export type StepId = "book" | "scan" | "review" | "results" | "next";

export type Step = {
  id: StepId;
  number: string;
  title: string;
  lead: string;
  youDo: string;
  weDo: string;
  duration: string;
};

export const steps: Step[] = [
  {
    id: "book",
    number: "01",
    title: "Book in minutes",
    lead: "Tell us who you are and where you live. We do the rest.",
    youDo: "Give us your name, number and the area of skin you’re worried about.",
    weDo: "We call you back, confirm your pathway and book the closest of our six clinics.",
    duration: "A 5-minute call",
  },
  {
    id: "scan",
    number: "02",
    title: "Nurse scan at your local clinic",
    lead: "A registered nurse photographs the area with specialist dermoscopy cameras.",
    youDo: "Point out up to three areas you want examined and share your medical history.",
    weDo: "We take high-definition microscopic and macroscopic images — the same detail a consultant sees in person.",
    duration: "About 20 minutes",
  },
  {
    id: "review",
    number: "03",
    title: "Consultant dermatologist reviews",
    lead: "Your images and history go straight to an Irish-registered consultant.",
    youDo: "Nothing — you’re already home.",
    weDo: "A consultant on the Medical Council Specialist Register examines the images and writes your diagnosis and treatment plan.",
    duration: "Days, not months",
  },
  {
    id: "results",
    number: "04",
    title: "Your results, explained",
    lead: "You get an SMS link to your results and a call from our medical team.",
    youDo: "Open the secure link, or take the call from our GP or nurse.",
    weDo: "We talk you through the consultant’s report and send a copy to your GP if you want.",
    duration: "Usually well inside 30 days",
  },
  {
    id: "next",
    number: "05",
    title: "The right next step",
    lead: "One of three outcomes — and we organise whichever one you need.",
    youDo: "Choose your pharmacy, or say yes to a follow-up if one is recommended.",
    weDo: "We send prescriptions, or refer you directly to the right consultant or hospital department.",
    duration: "Handled for you",
  },
];

export type Outcome = {
  id: string;
  title: string;
  summary: string;
  detail: string;
};

export const outcomes: Outcome[] = [
  {
    id: "clear",
    title: "All clear",
    summary: "No treatment needed.",
    detail:
      "You and your GP receive a discharge letter, and an SMS gives you a direct link to view and keep your results.",
  },
  {
    id: "prescription",
    title: "Prescription",
    summary: "Sent to your pharmacy.",
    detail:
      "Our GP calls to discuss the consultant’s recommendation, then sends a valid prescription to your chosen pharmacy. Medical-card holders can have it transcribed onto a GMS prescription.",
  },
  {
    id: "followup",
    title: "Follow-up",
    summary: "Biopsy, removal or face-to-face.",
    detail:
      "If the consultant recommends a procedure or an in-person consultation, we refer you automatically to the most appropriate consultant or hospital department — you don’t start again at the back of a queue.",
  },
];

export type WaitBar = {
  id: string;
  label: string;
  sub: string;
  days: number;
  tone: "slow" | "fast" | "vhi";
  path?: Path;
};

export const waitBars: WaitBar[] = [
  { id: "public", label: "Public hospital list", sub: "Deirdre, Dublin — waited over a year", days: 365, tone: "slow" },
  { id: "private", label: "AllView private", sub: "Usually within 4 weeks", days: 28, tone: "fast", path: "private" },
  { id: "hse", label: "AllView HSE / GP referred", sub: "Booked after your hospital or GP refers you", days: 21, tone: "fast", path: "hse" },
  { id: "story", label: "GP to melanoma surgery", sub: "A real AllView patient", days: 17, tone: "fast" },
  { id: "vhi", label: "AllView for Vhi members", sub: "Dedicated line", days: 10, tone: "vhi", path: "vhi" },
];

export type ChecklistItem = { id: string; text: string; paths?: Path[] };

export const checklist: ChecklistItem[] = [
  { id: "areas", text: "Decide which areas (up to three) you want the nurse to scan." },
  { id: "meds", text: "Bring a list of the medications you take." },
  { id: "vhi-number", text: "Have your Vhi membership number to hand.", paths: ["vhi"] },
  { id: "referral", text: "Bring your GP or hospital referral letter if you have a copy.", paths: ["hse"] },
  { id: "payment", text: "Payment of €309 is taken at the clinic — keep the receipt for your insurer and Revenue.", paths: ["private"] },
  { id: "unwell", text: "If you have an infectious illness on the day, call us to rearrange." },
  { id: "expect", text: "Remember: you meet the nurse, not the consultant, on the day — that is how it stays fast." },
];

export type Faq = { q: string; a: string };

export const faqs: Faq[] = [
  {
    q: "Will I see the consultant in person?",
    a: "Not at the first visit. A nurse images your skin, and the consultant dermatologist reviews those images remotely. If a face-to-face consultation or procedure is needed, we refer you straight to one.",
  },
  {
    q: "Is a photo really as good as being examined?",
    a: "Dermoscopy is image-based by nature, so it suits digital review. Studies — and the American Academy of Dermatology — find teledermatology as accurate as a face-to-face skin exam when used appropriately.",
  },
  {
    q: "Is this a full-body skin check?",
    a: "No. Tell the nurse which areas (up to three) concern you. If the consultant thinks a full skin exam is warranted, they will ask you to attend one.",
  },
  {
    q: "Who are the consultants?",
    a: "Only consultant dermatologists on the Medical Council of Ireland’s Specialist Register use the AllView platform. All are registered with the private insurers.",
  },
  {
    q: "What age do you see?",
    a: "Patients aged 16 and over.",
  },
  {
    q: "Can I claim on insurance or tax?",
    a: "Yes. Private patients get a receipt for their insurer and for Revenue medical-expense relief. Vhi members claim under their Consultant benefit — check your Table of Benefits.",
  },
];

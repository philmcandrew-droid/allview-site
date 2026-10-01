export type ChapterId = "wait" | "method" | "partners" | "proof";

export const chapters: {
  id: ChapterId;
  label: string;
  kicker: string;
  title: string;
  body: string;
  points: string[];
}[] = [
  {
    id: "wait",
    label: "The wait",
    kicker: "Why we exist",
    title: "Hospital lists keep growing. Skin cancer does not wait.",
    body: "Nearly half of people on Irish dermatology waiting lists have already waited more than six months. Almost one in five have waited more than 18 months. AllView was built to take people off those lists — with the cooperation of hospitals.",
    points: [
      "Nearly 50% wait more than six months",
      "Nearly 20% wait more than 18 months",
      "A nurse scan locally, a consultant diagnosis in days",
    ],
  },
  {
    id: "method",
    label: "The method",
    kicker: "How we work",
    title: "Nurse-led imaging. Irish consultant diagnosis.",
    body: "Formerly DermView, we run a national network of clinics and a clinical communications platform. A registered nurse takes dermoscopy images; a consultant on the Medical Council Specialist Register writes the plan. If surgery is needed, we refer you on — you do not start again at the back of a queue.",
    points: [
      "Specialist-registered consultant dermatologists",
      "Prescriptions sent to your pharmacy or GP",
      "Results portal, SMS and a results call",
    ],
  },
  {
    id: "partners",
    label: "The partners",
    kicker: "Who uses us",
    title: "Vhi members and HSE hospitals are our key clients.",
    body: "Vhi members get a dedicated 10-day pathway. HSE hospitals and the NTPF use us as an approved supplier to take public patients off waiting lists. Private patients self-refer for €309.",
    points: [
      "Vhi — covered consultant pathway, line 01 224 8111",
      "HSE Framework and NTPF panel agreements",
      "Six clinics: Dublin, Cork, Galway, Waterford",
    ],
  },
  {
    id: "proof",
    label: "The proof",
    kicker: "How we are held to it",
    title: "ISO certified. Awarded with the hospitals we serve.",
    body: "Clinical governance, internal audits and a multidisciplinary team report to our Clinician Governance and Safety Committee. Quality and information security are certified. Awards are shared with the hospitals we partner — Beaumont, St James’s and others.",
    points: [
      "ISO 9001:2015 quality management",
      "ISO/IEC 27001:2013 information security",
      "Charity partner: Purple House",
    ],
  },
];

export const awards: { year: string; title: string; detail: string }[] = [
  {
    year: "2024",
    title: "Irish Healthcare Centre Awards",
    detail: "Recognised again for operational excellence in outpatient care.",
  },
  {
    year: "2024",
    title: "Operational Excellence Awards",
    detail: "National award for running a high-volume teledermatology service.",
  },
  {
    year: "2024",
    title: "Irish Healthcare Awards",
    detail: "Shortlisted and awarded among Ireland’s hospital and community services.",
  },
  {
    year: "2023",
    title: "Hospital Project of the Year",
    detail: "Beaumont Hospital in partnership with AllView Healthcare.",
  },
  {
    year: "2022",
    title: "Hospital Project of the Year",
    detail: "St James’s Hospital in partnership with DermView (now AllView).",
  },
  {
    year: "2022",
    title: "HSE Digital Health",
    detail: "Named one of Ireland’s first 25 Irish digital health solutions.",
  },
  {
    year: "2022",
    title: "Outpatient Initiative of the Year",
    detail: "Irish Healthcare Awards — for cutting the wait to a consultant.",
  },
];

export const awardYears = ["2024", "2023", "2022"] as const;

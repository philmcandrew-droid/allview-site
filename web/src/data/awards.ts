export type AwardStatus = "Winner" | "Shortlisted" | "Highly commended";

export type Award = {
  year: "2024" | "2023" | "2022";
  status: AwardStatus;
  title: string;
  detail: string;
  image: string;
  imageAlt: string;
  partners?: { src: string; alt: string }[];
};

/** Labels and pictures from https://allview.ie/about-us/awards/ */
export const awards: Award[] = [
  {
    year: "2024",
    status: "Winner",
    title: "Irish Healthcare Centre Awards",
    detail: "Best Use of Information Technology",
    image: "/media/IHCA.svg",
    imageAlt: "Irish Healthcare Centre Awards",
  },
  {
    year: "2024",
    status: "Winner",
    title: "Operational Excellence Awards",
    detail: "Best Use of Technology in Operations",
    image: "/media/best-use-technology-2024.jpg",
    imageAlt: "Best Use of Technology in Operations, 2024",
  },
  {
    year: "2024",
    status: "Winner",
    title: "Irish Healthcare Awards",
    detail: "Medical Technology Product or Service of the Year",
    image: "/media/iha-2024-winner.jpg",
    imageAlt: "Irish Healthcare Awards 2024 winner",
  },
  {
    year: "2023",
    status: "Winner",
    title: "Operational Excellence Awards",
    detail: "Operational Excellence in Healthcare",
    image: "/media/operational-excellence-2023.jpg",
    imageAlt: "Operational Excellence in Healthcare, 2023",
  },
  {
    year: "2023",
    status: "Winner",
    title: "Irish Healthcare Awards",
    detail: "Hospital Project of the Year, Beaumont Hospital in partnership with AllView Healthcare",
    image: "/media/iha-2023-winner.jpg",
    imageAlt: "Irish Healthcare Awards 2023 winner",
  },
  {
    year: "2022",
    status: "Winner",
    title: "HSE",
    detail: "One of Ireland’s first 25 Irish digital health solutions",
    image: "/media/HSE-logo.svg",
    imageAlt: "HSE",
  },
  {
    year: "2022",
    status: "Winner",
    title: "Irish Healthcare Awards",
    detail: "An Duais Mhór",
    image: "/media/iha-2022-winner.png",
    imageAlt: "Irish Healthcare Awards 2022 winner",
  },
  {
    year: "2022",
    status: "Winner",
    title: "Irish Healthcare Awards",
    detail: "Outpatient Initiative of the Year",
    image: "/media/iha-2022-winner.png",
    imageAlt: "Irish Healthcare Awards 2022 winner",
  },
  {
    year: "2022",
    status: "Winner",
    title: "HealthTech Innovation Awards",
    detail: "Most Innovative Product",
    image: "/media/HealtTech-Ireland-logo.svg",
    imageAlt: "HealthTech Ireland",
  },
  {
    year: "2022",
    status: "Winner",
    title: "CEO Monthly",
    detail: "CEO of the Year: Eoin O’Reilly",
    image: "/media/SEO-Monthly-logo.svg",
    imageAlt: "CEO Monthly",
  },
  {
    year: "2022",
    status: "Shortlisted",
    title: "Future Health Summit",
    detail: "Innovation Award",
    image: "/media/Future-Health-Summit-logo.svg",
    imageAlt: "Future Health Summit",
  },
  {
    year: "2022",
    status: "Shortlisted",
    title: "QiC Dermatology",
    detail: "Dermatology in Practice",
    image: "/media/QiC-Dermatology-logo.svg",
    imageAlt: "QiC Dermatology",
  },
  {
    year: "2022",
    status: "Highly commended",
    title: "Irish Healthcare Awards",
    detail: "Hospital Project of the Year, St James’s Hospital in partnership with DermView",
    image: "/media/iha-2022-commended.png",
    imageAlt: "Irish Healthcare Awards 2022, highly commended",
    partners: [
      { src: "/media/DermView-Logo.svg", alt: "DermView" },
      { src: "/media/st-james-hospital-logo.svg", alt: "St James’s Hospital" },
    ],
  },
];

export const awardYears = ["2024", "2023", "2022"] as const;

export type MediaItem = { src: string; alt: string };

export type MediaLayout = "stack" | "icons" | "photos";

export type MediaBlock = {
  title: string;
  layout: MediaLayout;
  items: MediaItem[];
};

const impactCharts: MediaBlock = {
  title: "Waiting lists and what happens after a scan",
  layout: "stack",
  items: [
    {
      src: "/media/Dermatology-List-Prorgression-Sep-23.svg",
      alt: "Dermatology waiting-list progression, September 2023",
    },
    {
      src: "/media/Dermatology-Waiting-Lists-by-Hospitals-Sep-23.svg",
      alt: "Dermatology waiting lists by hospital, September 2023",
    },
    {
      src: "/media/Pathways-Following-Scan.svg",
      alt: "Pathways following a scan",
    },
  ],
};

/** Pictures from the matching page on allview.ie. */
export const sectionMedia: Record<string, MediaBlock[]> = {
  "/about-us": [impactCharts],
  "/about-us/impact": [impactCharts],
  "/about-us/our-team": [
    {
      title: "The team",
      layout: "icons",
      items: [
        { src: "/media/Medical-Team-Icon.svg", alt: "Medical team" },
        { src: "/media/Support-Team-Icon.svg", alt: "Support team" },
        { src: "/media/Purple-House-Logo-2.svg", alt: "Purple House" },
      ],
    },
    {
      title: "Mission, vision and values",
      layout: "stack",
      items: [{ src: "/media/AllView-Mission-Vision-Values.svg", alt: "AllView mission, vision and values" }],
    },
  ],
  "/about-us/careers": [
    {
      title: "What the role includes",
      layout: "icons",
      items: [
        { src: "/media/Flexible-Working-01.svg", alt: "Flexible working" },
        { src: "/media/Private-Medical-Insurance-01-1.svg", alt: "Private medical insurance" },
        { src: "/media/free-parking.svg", alt: "Free parking" },
        { src: "/media/Food-Allowance-01-1.svg", alt: "Food allowance" },
        { src: "/media/Pension-01-1.svg", alt: "Pension" },
        { src: "/media/Employee-Discount-01-1.svg", alt: "Employee discount" },
        { src: "/media/Company-Events-01-1.svg", alt: "Company events" },
        { src: "/media/Bike-to-Work-01-1.svg", alt: "Bike to work" },
        { src: "/media/Death-in-Service-01-1.svg", alt: "Death in service" },
      ],
    },
  ],
  "/about-us/technology": [
    {
      title: "How the service is built",
      layout: "icons",
      items: [
        { src: "/media/Waiting-Icon.svg", alt: "Waiting lists" },
        { src: "/media/Team-Icon.svg", alt: "Clinical team" },
        { src: "/media/Doctor-Icon.svg", alt: "Consultant" },
        { src: "/media/European_Commission.svg", alt: "European Commission" },
        { src: "/media/HSE-logo.svg", alt: "HSE" },
      ],
    },
    {
      title: "Certified",
      layout: "photos",
      items: [
        { src: "/media/iso-9001.jpg", alt: "ISO 9001 quality management certificate" },
        { src: "/media/iso-27001.jpg", alt: "ISO 27001 information security certificate" },
      ],
    },
    {
      title: "Awards 2022",
      layout: "icons",
      items: [
        { src: "/media/HSE-logo.svg", alt: "HSE" },
        { src: "/media/iha-2022-winner.png", alt: "Irish Healthcare Awards 2022 winner" },
        { src: "/media/HealtTech-Ireland-logo.svg", alt: "HealthTech Ireland" },
        { src: "/media/SEO-Monthly-logo.svg", alt: "CEO Monthly" },
        { src: "/media/Future-Health-Summit-logo.svg", alt: "Future Health Summit" },
        { src: "/media/QiC-Dermatology-logo.svg", alt: "QiC Dermatology" },
        { src: "/media/iha-2022-commended.png", alt: "Irish Healthcare Awards 2022, highly commended" },
        { src: "/media/DermView-Logo.svg", alt: "DermView" },
        { src: "/media/st-james-hospital-logo.svg", alt: "St James’s Hospital" },
      ],
    },
  ],
};

export const topicMedia: Record<string, MediaBlock[]> = {
  process: [
    {
      title: "Insurers patients use",
      layout: "icons",
      items: [
        { src: "/brand/vhi.svg", alt: "Vhi" },
        { src: "/media/Laya-Healthcare.svg", alt: "Laya Healthcare" },
        { src: "/media/Irish-Life-Health-Logo.svg", alt: "Irish Life Health" },
      ],
    },
  ],
  telederm: [
    {
      title: "Clinics and imaging",
      layout: "photos",
      items: [
        { src: "/media/lucan.jpg", alt: "AllView clinic" },
        { src: "/media/clinic-scan-1.jpg", alt: "Nurse-led skin imaging" },
        { src: "/media/clinic-scan-2.jpg", alt: "Consultant review of skin images" },
      ],
    },
  ],
  skin: [
    {
      title: "Types of skin cancer",
      layout: "stack",
      items: [{ src: "/media/Skin-Cancers-Types.svg", alt: "Types of skin cancer" }],
    },
    {
      title: "In clinic",
      layout: "photos",
      items: [
        { src: "/media/skin-clinic-1.jpg", alt: "Skin clinic" },
        { src: "/media/dermatology-05.jpg", alt: "Dermatology consultation" },
        { src: "/media/medical-team-03.jpg", alt: "AllView clinical team" },
      ],
    },
  ],
};

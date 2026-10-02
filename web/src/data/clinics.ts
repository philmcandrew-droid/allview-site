export type City = "Dublin" | "Cork" | "Galway" | "Waterford";

export type Clinic = {
  id: string;
  name: string;
  city: City;
  building: string;
  address: string;
  eircode: string;
  lat: number;
  lng: number;
  phone: string;
  phoneLabel: string;
  notes: string[];
  /** Official clinic photograph from allview.ie, when the file is still published. */
  photo?: string;
};

export const cities: City[] = ["Dublin", "Cork", "Galway", "Waterford"];

export const MAIN_PHONE = "+35312248100";
export const VHI_PHONE = "+35312248111";

export const clinics: Clinic[] = [
  {
    id: "carrickmines",
    name: "AllView Carrickmines",
    city: "Dublin",
    building: "The Hyde Building",
    address: "Suite 11–13, The Hyde Building, The Park, Carrickmines, Dublin 18",
    eircode: "D18 YX22",
    lat: 53.2504414,
    lng: -6.1832133,
    phone: MAIN_PHONE,
    phoneLabel: "01 224 8100",
    notes: [
      "Head office and South Dublin clinic. Entrance is opposite the Vhi 360 Health Centre. Buzz 12, then go to the 1st floor.",
      "Free parking in the retail park for 3 hours. Park outside AIB or O’Brien’s Wines and walk to the front of the Hyde Building.",
      "Driving: M50 Exit 15 (Cornelscourt / Kilternan), along Glenamuck Road into Carrickmines retail park, then left at PowerCity.",
      "Luas Green Line to Ballyogan Wood — about a 6 minute walk. Bus 63 stops at The Park (stop 7360).",
    ],
    photo: "/clinics/carrickmines.jpg",
  },
  {
    id: "vhi-360",
    name: "Vhi 360 Health Centre",
    city: "Dublin",
    building: "The Hampstead Building",
    address: "The Hampstead Building, Carrickmines Park, Dublin 18",
    eircode: "D18 R6HX",
    lat: 53.2507968,
    lng: -6.1840848,
    phone: VHI_PHONE,
    phoneLabel: "01 224 8111",
    notes: [
      "Dermatology clinic for Vhi members, on the 4th floor of the Vhi 360 Health Centre.",
    ],
    photo: "/clinics/vhi-360.jpg",
  },
  {
    id: "docklands",
    name: "AllView Dublin City",
    city: "Dublin",
    building: "Hanover Medical Centre",
    address: "5 Lazer Lane, Dublin Docklands, Dublin 2",
    eircode: "D02 RF77",
    lat: 53.3451723,
    lng: -6.2384595,
    phone: MAIN_PHONE,
    phoneLabel: "01 224 8100",
    notes: ["Inside the Hanover Medical Centre, a short stroll from the city centre."],
    photo: "/clinics/docklands.webp",
  },
  {
    id: "cork",
    name: "AllView Cork",
    city: "Cork",
    building: "Langford Hall Consultants Clinic",
    address: "12 Langford Row, off Infirmary Road, Cork",
    eircode: "T12 VF9F",
    lat: 51.8927332,
    lng: -8.4673066,
    phone: MAIN_PHONE,
    phoneLabel: "01 224 8100",
    notes: ["Inside Langford Hall Medical Centre, Langford Hall Consultants Clinic."],
  },
  {
    id: "galway",
    name: "AllView Galway",
    city: "Galway",
    building: "The Consultant Suites",
    address: "Harris House, Small Business IDA, Tuam Road, Galway",
    eircode: "H91 RK5Y",
    lat: 53.2885313,
    lng: -9.0220177,
    phone: MAIN_PHONE,
    phoneLabel: "01 224 8100",
    notes: ["Inside The Consultant Suites, Harris House."],
    photo: "/clinics/galway.jpg",
  },
  {
    id: "waterford",
    name: "AllView Waterford",
    city: "Waterford",
    building: "Waterford Medical Centre",
    address: "Kilbarry Shopping Centre, Tramore Road, Waterford",
    eircode: "X91 A212",
    lat: 52.2465068,
    lng: -7.1212293,
    phone: MAIN_PHONE,
    phoneLabel: "01 224 8100",
    notes: ["Inside the Waterford Medical Centre at Kilbarry Shopping Centre."],
    photo: "/clinics/waterford.webp",
  },
];

export function directionsUrl(clinic: Clinic): string {
  const destination = encodeURIComponent(`${clinic.address}, ${clinic.eircode}`);
  return `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
}

export function embedUrl(clinic: Clinic): string {
  return `https://www.google.com/maps?q=${clinic.lat},${clinic.lng}&z=16&output=embed`;
}

/** Great-circle distance in kilometres. */
export function distanceKm(aLat: number, aLng: number, bLat: number, bLng: number): number {
  const toRad = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const h =
    Math.sin(dLat / 2) ** 2 + Math.cos(toRad(aLat)) * Math.cos(toRad(bLat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

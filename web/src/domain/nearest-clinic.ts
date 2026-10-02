import { clinics, distanceKm, type Clinic } from "../data/clinics";

export function rankClinics(lat: number, lng: number, list: Clinic[] = clinics): Clinic[] {
  return [...list].sort(
    (a, b) => distanceKm(lat, lng, a.lat, a.lng) - distanceKm(lat, lng, b.lat, b.lng),
  );
}

export function nearestClinic(lat: number, lng: number, list: Clinic[] = clinics): Clinic {
  const ranked = rankClinics(lat, lng, list);
  if (ranked.length === 0) {
    throw new Error("No clinics to rank");
  }
  return ranked[0];
}

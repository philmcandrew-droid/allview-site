import {
  Bus,
  Car,
  Check,
  Copy,
  Crosshair,
  Elevator,
  MapPin,
  NavigationArrow,
  Phone,
} from "@phosphor-icons/react";
import { useMemo, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { IrelandMap } from "../components/IrelandMap";
import {
  cities,
  clinics,
  directionsUrl,
  distanceKm,
  embedUrl,
  type City,
  type Clinic,
} from "../data/clinics";
import { rankClinics } from "../domain/nearest-clinic";

type CityFilter = City | "all";
type Coords = { lat: number; lng: number };
type LocateState = "idle" | "locating" | "done" | "denied" | "unsupported";

function parseCity(value: string | null): CityFilter {
  return cities.find((c) => c.toLowerCase() === value?.toLowerCase()) ?? "all";
}

function noteIcon(note: string) {
  if (/park/i.test(note)) return <Car aria-hidden size={18} />;
  if (/bus/i.test(note)) return <Bus aria-hidden size={18} />;
  if (/floor/i.test(note)) return <Elevator aria-hidden size={18} />;
  return <MapPin aria-hidden size={18} />;
}

function formatKm(km: number): string {
  return km < 10 ? `${km.toFixed(1)} km` : `${Math.round(km)} km`;
}

function ClinicPhoto({ clinic, className }: { clinic: Clinic; className: string }) {
  if (!clinic.photo) {
    return (
      <div aria-hidden="true" className={`grid place-items-center bg-navy p-2 text-center text-white ${className}`}>
        <p className="font-ui text-xs font-semibold leading-tight">{clinic.city}</p>
      </div>
    );
  }
  return <img alt="" aria-hidden="true" className={`object-cover ${className}`} loading="lazy" src={clinic.photo} />;
}

export function LocationsPage() {
  const [params, setParams] = useSearchParams();
  const city = parseCity(params.get("city"));
  const [coords, setCoords] = useState<Coords | null>(null);
  const [locate, setLocate] = useState<LocateState>("idle");
  const [copied, setCopied] = useState<string | null>(null);
  const detailRef = useRef<HTMLElement>(null);

  const visible = useMemo(() => {
    const list = city === "all" ? clinics : clinics.filter((c) => c.city === city);
    if (!coords) return list;
    return rankClinics(coords.lat, coords.lng, list);
  }, [city, coords]);

  const requested = params.get("clinic");
  const selected: Clinic =
    visible.find((c) => c.id === requested) ?? clinics.find((c) => c.id === requested) ?? visible[0] ?? clinics[0];

  function setCity(next: CityFilter) {
    const nextParams = new URLSearchParams(params);
    if (next === "all") nextParams.delete("city");
    else nextParams.set("city", next.toLowerCase());
    nextParams.delete("clinic");
    setParams(nextParams, { replace: true });
  }

  function select(clinic: Clinic, matchCounty = false) {
    const nextParams = new URLSearchParams(params);
    if (matchCounty) nextParams.set("city", clinic.city.toLowerCase());
    nextParams.set("clinic", clinic.id);
    setParams(nextParams, { replace: true });
    // On phones the map/details sit above the list, so bring them back into view.
    if (window.matchMedia("(max-width: 1023px)").matches) {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      detailRef.current?.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "start" });
    }
  }

  function locateMe() {
    if (!("geolocation" in navigator)) {
      setLocate("unsupported");
      return;
    }
    setLocate("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setLocate("done");
        const nextParams = new URLSearchParams(params);
        nextParams.delete("city");
        nextParams.delete("clinic");
        setParams(nextParams, { replace: true });
      },
      () => setLocate("denied"),
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 300000 },
    );
  }

  async function copyEircode(clinic: Clinic) {
    try {
      await navigator.clipboard.writeText(clinic.eircode);
      setCopied(clinic.id);
      window.setTimeout(() => setCopied(null), 1800);
    } catch {
      setCopied(null);
    }
  }

  const distanceFor = (clinic: Clinic) =>
    coords ? formatKm(distanceKm(coords.lat, coords.lng, clinic.lat, clinic.lng)) : null;

  return (
    <main id="main" tabIndex={-1} className="mx-auto max-w-6xl px-5 pb-32 pt-10 outline-none lg:pb-16 lg:pt-16">
      <h1 className="font-display text-4xl text-navy">Find a clinic</h1>
      <p className="mt-3 max-w-xl text-muted">
        Six clinics across Ireland. Pick a county on the map or use your location — then call or get directions in one
        tap.
      </p>

      <div className="mt-8">
        <IrelandMap
          activeCity={city}
          selectedCity={selected.city}
          selectedClinicId={selected.id}
          onCity={setCity}
          onClinic={(id) => {
            const clinic = clinics.find((item) => item.id === id);
            if (clinic) select(clinic, true);
          }}
        />
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div
          className="scrollbar-hide -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0"
          role="group"
          aria-label="Filter by county"
        >
          {(["all", ...cities] as CityFilter[]).map((option) => {
            const active = city === option;
            return (
              <button
                key={option}
                aria-pressed={active}
                className={`min-h-11 shrink-0 rounded-full border px-4 font-ui text-sm font-semibold transition-colors ${
                  active
                    ? "border-navy bg-navy text-white"
                    : "border-line bg-paper text-navy hover:border-navy"
                }`}
                type="button"
                onClick={() => setCity(option)}
              >
                {option === "all" ? "All clinics" : option}
              </button>
            );
          })}
        </div>
        <button
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-cyan bg-sky px-4 font-ui text-sm font-semibold text-navy transition-colors hover:border-navy disabled:opacity-60"
          disabled={locate === "locating"}
          type="button"
          onClick={locateMe}
        >
          <Crosshair aria-hidden size={18} />
          {locate === "locating" ? "Finding you…" : coords ? "Sorted by distance" : "Use my location"}
        </button>
      </div>
      {locate === "denied" || locate === "unsupported" ? (
        <p className="mt-2 text-sm text-muted" role="status">
          We couldn’t read your location — pick a county above instead.
        </p>
      ) : null}

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* Map + selected clinic — first on mobile so the tap target is visible immediately */}
        <section
          ref={detailRef}
          className="order-1 scroll-mt-28 lg:order-2 lg:sticky lg:top-32 lg:self-start"
          aria-label="Selected clinic"
        >
          <div className="overflow-hidden rounded-2xl border border-line bg-paper shadow-md">
            {selected.photo ? (
              <img
                alt={`Photograph of ${selected.name}`}
                className="aspect-[16/9] w-full object-cover"
                src={selected.photo}
              />
            ) : (
              <div className="flex aspect-[16/9] items-end bg-navy p-5 text-white">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.16em] text-cyan">{selected.city}</p>
                  <p className="mt-1 font-ui text-xl font-semibold">{selected.building}</p>
                </div>
              </div>
            )}
            <iframe
              key={selected.id}
              allowFullScreen
              className="aspect-[4/3] w-full border-0 sm:aspect-[16/10]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={embedUrl(selected)}
              title={`Map showing ${selected.name}`}
            />
            <div className="p-5">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{selected.city}</p>
              <h2 className="mt-1 font-ui text-2xl font-semibold text-navy">{selected.name}</h2>
              <p className="mt-1 text-sm text-muted">{selected.building}</p>

              <address className="mt-4 not-italic">
                <p className="text-navy">{selected.address}</p>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-sky px-2 py-1 font-mono text-sm text-navy">{selected.eircode}</span>
                  <button
                    className="inline-flex min-h-11 items-center gap-1 rounded-md px-2 font-ui text-sm font-semibold text-navy hover:bg-sky"
                    type="button"
                    onClick={() => copyEircode(selected)}
                  >
                    {copied === selected.id ? <Check aria-hidden size={16} /> : <Copy aria-hidden size={16} />}
                    {copied === selected.id ? "Copied" : "Copy Eircode"}
                  </button>
                </div>
              </address>

              <ul className="mt-4 space-y-2 text-sm text-muted">
                {selected.notes.map((note) => (
                  <li key={note} className="flex gap-2">
                    <span className="mt-0.5 shrink-0 text-navy">{noteIcon(note)}</span>
                    <span>{note}</span>
                  </li>
                ))}
                <li className="flex gap-2">
                  <span className="mt-0.5 shrink-0 text-navy">
                    <Phone aria-hidden size={18} />
                  </span>
                  <span>Mon–Fri, 9am–5pm. Appointments are booked by phone or call-back — not walk-in.</span>
                </li>
              </ul>

              <div className="mt-5 hidden gap-3 sm:flex">
                <a
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-navy px-5 font-ui font-semibold text-white transition-colors hover:bg-navy-deep"
                  href={`tel:${selected.phone}`}
                >
                  <Phone aria-hidden size={18} weight="fill" /> Call {selected.phoneLabel}
                </a>
                <a
                  className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full border border-navy bg-paper px-5 font-ui font-semibold text-navy transition-colors hover:bg-sky"
                  href={directionsUrl(selected)}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <NavigationArrow aria-hidden size={18} weight="fill" /> Directions
                </a>
              </div>
              <p className="mt-3 text-xs text-muted">
                Apple Maps may not recognise Eircodes — paste the full address if the pin looks wrong.
              </p>
              <Link
                className="mt-4 inline-flex min-h-11 items-center font-ui text-sm font-semibold text-navy underline decoration-cyan decoration-2 underline-offset-4"
                to="/book"
              >
                Book an appointment here
              </Link>
            </div>
          </div>
        </section>

        {/* Clinic list */}
        <section className="order-2 lg:order-1" aria-label="Clinic list">
          <p className="mb-3 font-ui text-sm font-semibold text-muted" aria-live="polite">
            {visible.length} {visible.length === 1 ? "clinic" : "clinics"}
            {city !== "all" ? ` in ${city}` : ""}
            {coords ? " · nearest first" : ""}
          </p>
          <ul className="space-y-3">
            {visible.map((clinic) => {
              const active = clinic.id === selected.id;
              const km = distanceFor(clinic);
              return (
                <li key={clinic.id}>
                  <button
                    aria-pressed={active}
                    className={`tile w-full text-left transition-shadow ${
                      active ? "ring-2 ring-navy shadow-md" : "hover:shadow-md"
                    }`}
                    type="button"
                    onClick={() => select(clinic)}
                  >
                    <div className="flex items-start gap-3">
                      <ClinicPhoto clinic={clinic} className="h-20 w-24 shrink-0 rounded-xl" />
                      <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">{clinic.city}</p>
                        <h3 className="mt-1 font-ui text-lg font-semibold text-navy">{clinic.name}</h3>
                        <p className="mt-1 text-sm text-muted">{clinic.address}</p>
                      </div>
                      {km ? (
                        <span className="shrink-0 rounded-full bg-sky px-3 py-1 font-mono text-xs text-navy">{km}</span>
                      ) : null}
                    </div>
                    <p className="mt-3 inline-flex items-center gap-1 font-ui text-sm font-semibold text-navy">
                      <MapPin aria-hidden size={16} /> {active ? "Shown on map" : "Show on map"}
                    </p>
                      </div>
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      </div>

      {/* Mobile action bar: always-reachable Call / Directions for the selected clinic */}
      <div
        className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 px-4 pt-3 backdrop-blur sm:hidden"
        style={{ paddingBottom: "calc(0.75rem + env(safe-area-inset-bottom))" }}
      >
        <p className="truncate text-center font-ui text-xs font-semibold text-muted">{selected.name}</p>
        <div className="mt-2 grid grid-cols-2 gap-3">
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-navy font-ui font-semibold text-white"
            href={`tel:${selected.phone}`}
          >
            <Phone aria-hidden size={18} weight="fill" /> Call
          </a>
          <a
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-navy bg-paper font-ui font-semibold text-navy"
            href={directionsUrl(selected)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <NavigationArrow aria-hidden size={18} weight="fill" /> Directions
          </a>
        </div>
      </div>
    </main>
  );
}

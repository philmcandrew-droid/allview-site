import { useState } from "react";
import { clinics, type City } from "../data/clinics";
import { irelandCounties, irelandPins, irelandView } from "../data/ireland-map";

const countyCity = {
  "IE-D": "Dublin",
  "IE-CO": "Cork",
  "IE-G": "Galway",
  "IE-WD": "Waterford",
} as const satisfies Record<string, City>;

type CountyId = keyof typeof countyCity;

function isCountyId(id: string): id is CountyId {
  return id in countyCity;
}

type IrelandMapProps = {
  activeCity: City | "all";
  selectedCity: City;
  selectedClinicId: string;
  onCity: (city: City) => void;
  onClinic: (clinicId: string) => void;
};

export function IrelandMap({ activeCity, selectedCity, selectedClinicId, onCity, onClinic }: IrelandMapProps) {
  const [hover, setHover] = useState<string | null>(null);

  return (
    <figure className="overflow-hidden rounded-[28px] border border-line bg-paper shadow-md">
      <figcaption className="border-b border-line px-5 py-4">
        <h2 className="font-ui text-lg font-semibold text-navy">Clinics on the map of Ireland</h2>
        <p className="mt-1 text-sm text-muted">
          Choose Dublin, Cork, Galway or Waterford. Green pins are the clinic sites on the original AllView map.
          The Vhi 360 clinic sits beside the Carrickmines pin.
        </p>
      </figcaption>
      <div className="bg-[#f7fbff] px-3 py-4 sm:px-8">
        <svg
          aria-label="Map of Ireland. Dublin, Cork, Galway and Waterford have AllView clinics."
          className="mx-auto h-auto w-full max-w-md"
          role="group"
          viewBox={`0 0 ${irelandView.width} ${irelandView.height}`}
        >
          {irelandCounties.map((county) => {
            const city = isCountyId(county.id) ? countyCity[county.id] : null;
            const linked = city !== null;
            const active = city !== null && (activeCity === city || selectedCity === city || hover === county.id);
            return (
              <path
                key={county.id}
                aria-label={linked ? `${county.name}, show clinics` : undefined}
                aria-pressed={linked ? activeCity === city : undefined}
                className={linked ? "cursor-pointer focus:outline-none focus-visible:stroke-navy" : undefined}
                d={county.d}
                fill={active ? "#60cbe8" : "#d8edfa"}
                role={linked ? "button" : "presentation"}
                stroke="#1f4387"
                strokeWidth={0.6}
                tabIndex={linked ? 0 : undefined}
                onBlur={() => setHover(null)}
                onClick={() => {
                  if (city) onCity(city);
                }}
                onFocus={() => {
                  if (linked) setHover(county.id);
                }}
                onKeyDown={(event) => {
                  if (!city) return;
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onCity(city);
                  }
                }}
                onMouseEnter={() => {
                  if (linked) setHover(county.id);
                }}
                onMouseLeave={() => setHover(null)}
              >
                <title>{county.name}</title>
              </path>
            );
          })}
          {irelandPins.map((pin) => {
            const selected = pin.id === selectedClinicId;
            const name = clinics.find((clinic) => clinic.id === pin.id)?.name ?? pin.id;
            return (
              <g key={pin.id}>
                <circle
                  aria-label={`Show ${name}`}
                  className="cursor-pointer focus:outline-none"
                  cx={pin.x}
                  cy={pin.y}
                  fill="transparent"
                  r={12}
                  role="button"
                  tabIndex={0}
                  onClick={() => onClinic(pin.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onClinic(pin.id);
                    }
                  }}
                >
                  <title>{name}</title>
                </circle>
                <circle
                  cx={pin.x}
                  cy={pin.y}
                  fill={selected ? "#002f87" : "#0aac16"}
                  pointerEvents="none"
                  r={selected ? 6.5 : 4.5}
                  stroke="#ffffff"
                  strokeWidth={1.4}
                />
              </g>
            );
          })}
        </svg>
      </div>
    </figure>
  );
}

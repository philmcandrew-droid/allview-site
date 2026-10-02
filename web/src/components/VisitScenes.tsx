type SceneProps = { title: string };

const base = {
  className: "h-full w-full",
  fill: "none",
  viewBox: "0 0 640 400",
} as const;

export function SceneBook({ title }: SceneProps) {
  return (
    <svg {...base} aria-label={title} role="img">
      <rect fill="#f0f8ff" height="400" rx="20" width="640" />
      <circle cx="520" cy="70" fill="#60cbe8" opacity="0.35" r="90" />
      <circle cx="80" cy="340" fill="#7d1690" opacity="0.12" r="110" />
      <rect fill="#ffffff" height="220" rx="24" stroke="#d5def0" strokeWidth="2" width="168" x="86" y="90" />
      <rect fill="#002f87" height="188" rx="16" width="136" x="102" y="106" />
      <circle cx="170" cy="126" fill="#60cbe8" r="4" />
      <rect fill="#ffffff" height="10" rx="5" width="72" x="134" y="168" />
      <rect fill="#60cbe8" height="10" rx="5" width="48" x="146" y="190" />
      <text fill="#ffffff" fontFamily="Poppins, sans-serif" fontSize="13" fontWeight="600" textAnchor="middle" x="170" y="232">
        01 224 8100
      </text>
      <rect fill="#ffffff" height="168" rx="18" stroke="#d5def0" strokeWidth="2" width="200" x="340" y="116" />
      <rect fill="#002f87" height="36" rx="18" width="200" x="340" y="116" />
      <text fill="#ffffff" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="600" textAnchor="middle" x="440" y="139">
        This week
      </text>
      {[0, 1, 2, 3, 4].map((col) =>
        [0, 1, 2].map((row) => (
          <rect
            fill={row === 1 && col === 2 ? "#60cbe8" : "#f0f8ff"}
            height="22"
            key={`${col}-${row}`}
            rx="6"
            width="26"
            x={356 + col * 34}
            y={168 + row * 30}
          />
        )),
      )}
    </svg>
  );
}

export function SceneScan({ title }: SceneProps) {
  return (
    <svg {...base} aria-label={title} role="img">
      <rect fill="#f0f8ff" height="400" rx="20" width="640" />
      <rect fill="#ffffff" height="220" rx="16" stroke="#d5def0" strokeWidth="2" width="280" x="48" y="90" />
      <rect fill="#002f87" height="28" width="280" x="48" y="90" />
      <circle cx="188" cy="200" fill="#d5def0" r="48" />
      <circle cx="188" cy="190" fill="#7d1690" opacity="0.35" r="18" />
      <rect fill="#002f87" height="36" rx="18" width="72" x="152" y="236" />
      <rect fill="#ffffff" height="200" rx="16" stroke="#002f87" strokeWidth="3" width="160" x="400" y="100" />
      <circle cx="480" cy="200" fill="none" r="46" stroke="#60cbe8" strokeWidth="6" />
      <circle cx="480" cy="200" fill="#7d1690" opacity="0.25" r="18" />
      <rect fill="#002f87" height="18" rx="4" width="48" x="456" y="268" />
      <path d="M360 210 H400" stroke="#002f87" strokeLinecap="round" strokeWidth="4" />
    </svg>
  );
}

export function SceneReview({ title }: SceneProps) {
  return (
    <svg {...base} aria-label={title} role="img">
      <rect fill="#191383" height="400" rx="20" width="640" />
      <rect fill="#002f87" height="200" rx="12" width="240" x="56" y="80" />
      <circle cx="140" cy="170" fill="#7d1690" opacity="0.5" r="36" />
      <circle cx="176" cy="158" fill="#60cbe8" opacity="0.7" r="22" />
      <rect fill="#002f87" height="200" rx="12" width="240" x="344" y="80" />
      <rect fill="#60cbe8" height="8" rx="4" width="160" x="384" y="120" />
      <rect fill="#ffffff" height="8" opacity="0.35" rx="4" width="184" x="384" y="144" />
      <rect fill="#ffffff" height="8" opacity="0.25" rx="4" width="140" x="384" y="168" />
      <rect fill="#ffffff" height="8" opacity="0.25" rx="4" width="168" x="384" y="192" />
      <circle cx="320" cy="320" fill="#60cbe8" r="28" />
      <rect fill="#f0f8ff" height="36" rx="18" width="120" x="260" y="302" />
    </svg>
  );
}

export function SceneResults({ title }: SceneProps) {
  return (
    <svg {...base} aria-label={title} role="img">
      <rect fill="#f0f8ff" height="400" rx="20" width="640" />
      <rect fill="#ffffff" height="240" rx="28" stroke="#d5def0" strokeWidth="2" width="150" x="90" y="80" />
      <rect fill="#002f87" height="200" rx="18" width="118" x="106" y="100" />
      <rect fill="#60cbe8" height="44" rx="10" width="94" x="118" y="148" />
      <path d="M132 170 l10 10 18-20" stroke="#002f87" strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" />
      <rect fill="#ffffff" height="72" rx="16" stroke="#d5def0" strokeWidth="2" width="240" x="310" y="120" />
      <text fill="#002f87" fontFamily="Poppins, sans-serif" fontSize="15" fontWeight="600" x="330" y="150">
        Your results are ready
      </text>
      <text fill="#4a5f8a" fontFamily="Poppins, sans-serif" fontSize="13" x="330" y="172">
        Secure link · we’ll call you
      </text>
      <rect fill="#ffffff" height="72" rx="16" stroke="#d5def0" strokeWidth="2" width="240" x="310" y="208" />
      <circle cx="346" cy="244" fill="#7d1690" r="16" />
      <text fill="#002f87" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="600" x="374" y="240">
        Medical team
      </text>
      <text fill="#4a5f8a" fontFamily="Poppins, sans-serif" fontSize="12" x="374" y="258">
        Explains the report
      </text>
    </svg>
  );
}

export function SceneNext({ title }: SceneProps) {
  return (
    <svg {...base} aria-label={title} role="img">
      <rect fill="#f0f8ff" height="400" rx="20" width="640" />
      {[
        { x: 48, label: "All clear", fill: "#60cbe8" },
        { x: 236, label: "Prescription", fill: "#002f87" },
        { x: 424, label: "Follow-up", fill: "#7d1690" },
      ].map((door) => (
        <g key={door.label}>
          <rect fill="#ffffff" height="220" rx="20" stroke="#d5def0" strokeWidth="2" width="168" x={door.x} y="90" />
          <rect fill={door.fill} height="8" width="168" x={door.x} y="90" />
          <circle cx={door.x + 84} cy="180" fill={door.fill} opacity="0.2" r="32" />
          <text
            fill="#002f87"
            fontFamily="Poppins, sans-serif"
            fontSize="16"
            fontWeight="600"
            textAnchor="middle"
            x={door.x + 84}
            y="260"
          >
            {door.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

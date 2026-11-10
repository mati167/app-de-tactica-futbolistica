/** Football (7-a-side style) pitch markings drawn as an SVG overlay. */
export default function Field() {
  const line = "rgba(255,255,255,0.85)"
  const sw = 3

  return (
    <svg
      className="field-lines"
      viewBox="0 0 1050 680"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" stroke={line} strokeWidth={sw}>
        {/* outer boundary */}
        <rect x={20} y={20} width={1010} height={640} />

        {/* halfway line */}
        <line x1={525} y1={20} x2={525} y2={660} />

        {/* center circle + spot */}
        <circle cx={525} cy={340} r={90} />
        <circle cx={525} cy={340} r={3} fill={line} stroke="none" />

        {/* left penalty + goal areas */}
        <rect x={20} y={170} width={165} height={340} />
        <rect x={20} y={250} width={60} height={180} />
        <circle cx={130} cy={340} r={3} fill={line} stroke="none" />
        <path d="M185 268.8 A 90 90 0 0 1 185 411.2" />

        {/* right penalty + goal areas */}
        <rect x={865} y={170} width={165} height={340} />
        <rect x={970} y={250} width={60} height={180} />
        <circle cx={920} cy={340} r={3} fill={line} stroke="none" />
        <path d="M865 268.8 A 90 90 0 0 0 865 411.2" />

        {/* goals */}
        <rect x={6} y={290} width={14} height={100} />
        <rect x={1030} y={290} width={14} height={100} />

        {/* corner arcs */}
        <path d="M20 32 A 12 12 0 0 1 32 20" />
        <path d="M1018 20 A 12 12 0 0 1 1030 32" />
        <path d="M32 660 A 12 12 0 0 1 20 648" />
        <path d="M1030 648 A 12 12 0 0 1 1018 660" />
      </g>
    </svg>
  )
}

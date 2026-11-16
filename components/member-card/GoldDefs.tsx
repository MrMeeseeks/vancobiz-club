/**
 * Every gold pattern used by the member cards, defined ONCE per page.
 * Cards reference these by id (<use href="#vbc-...">, fill="url(#vbc-...)").
 * WordPress port: paste this <svg> once near the top of the page (see README).
 *
 * All motifs are original, built from plain geometry:
 *  - foil: diagonal gold gradient
 *  - rays: 120 hairlines from the centre
 *  - guilloche: concentric rings + two interlaced ellipse rosettes
 *  - frame: a band of linked lozenges with beads between them
 */

const RAYS = 120;
const RINGS = Array.from({ length: 52 }, (_, i) => 66 + i * 4.5);
const ROSETTE_A = 30;
const ROSETTE_B = 20;

export default function GoldDefs() {
  return (
    <svg aria-hidden="true" focusable="false" width="0" height="0" style={{ position: "absolute", width: 0, height: 0, overflow: "hidden" }}>
      <defs>
        <linearGradient id="vbc-foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A6A1F" />
          <stop offset="0.22" stopColor="#C9A24B" />
          <stop offset="0.46" stopColor="#F3D98B" />
          <stop offset="0.54" stopColor="#FFC66B" />
          <stop offset="0.74" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#7A5C19" />
        </linearGradient>

        <radialGradient id="vbc-glow" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0" stopColor="#FFF4D2" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#F3D98B" stopOpacity="0.15" />
          <stop offset="1" stopColor="#8A6A1F" stopOpacity="0" />
        </radialGradient>

        {/* Edge darkening for depth */}
        <radialGradient id="vbc-vignette" cx="0.5" cy="0.5" r="0.75">
          <stop offset="0.45" stopColor="#3D2E0B" stopOpacity="0" />
          <stop offset="1" stopColor="#3D2E0B" stopOpacity="0.55" />
        </radialGradient>

        {/* Engraved bezel around the medallion, centred on (0,0) */}
        <g id="vbc-bezel" fill="none">
          <circle r="75" stroke="#5E4714" strokeOpacity="0.55" strokeWidth="0.8" />
          <circle r="70" stroke="#FFF4D2" strokeWidth="2.4" strokeDasharray="0 5.5" strokeLinecap="round" strokeOpacity="0.85" />
          <circle r="66" stroke="#5E4714" strokeOpacity="0.6" strokeWidth="0.8" />
        </g>

        {/* Corner ornament for the top-left inner corner; mirrored for the others */}
        <g id="vbc-corner" fill="none">
          <path d="M18 46 A28 28 0 0 1 46 18" stroke="#5E4714" strokeWidth="1" strokeOpacity="0.7" />
          <path d="M18 38 A20 20 0 0 1 38 18" stroke="#FFF4D2" strokeWidth="0.8" strokeOpacity="0.7" />
          <path d="M18 30 A12 12 0 0 1 30 18" stroke="#5E4714" strokeWidth="0.8" strokeOpacity="0.7" />
          <path d="M26 20 L31 25 L26 30 L21 25 Z" fill="#FFF4D2" fillOpacity="0.75" stroke="#5E4714" strokeWidth="0.6" transform="translate(-1 -1)" />
        </g>

        {/* Rays, centred on (0,0) */}
        <g id="vbc-rays">
          {Array.from({ length: RAYS }, (_, i) => {
            const a = (i / RAYS) * Math.PI * 2;
            const r0 = 62;
            const r1 = i % 2 ? 260 : 320;
            return (
              <line
                key={i}
                x1={(Math.cos(a) * r0).toFixed(2)}
                y1={(Math.sin(a) * r0).toFixed(2)}
                x2={(Math.cos(a) * r1).toFixed(2)}
                y2={(Math.sin(a) * r1).toFixed(2)}
                stroke={i % 2 ? "#FFF4D2" : "#6F5418"}
                strokeOpacity={i % 2 ? 0.32 : 0.38}
                strokeWidth="0.6"
              />
            );
          })}
        </g>

        {/* Guilloche engraving, centred on (0,0) */}
        <g id="vbc-guilloche" fill="none">
          {RINGS.map((r) => (
            <circle key={r} r={r} stroke="#6F5418" strokeOpacity="0.28" strokeWidth="0.45" />
          ))}
          {Array.from({ length: ROSETTE_A }, (_, i) => (
            <ellipse
              key={`a${i}`}
              rx="118"
              ry="44"
              transform={`rotate(${(i * 180) / ROSETTE_A})`}
              stroke="#FFF4D2"
              strokeOpacity="0.38"
              strokeWidth="0.45"
            />
          ))}
          {Array.from({ length: ROSETTE_B }, (_, i) => (
            <ellipse
              key={`b${i}`}
              rx="82"
              ry="70"
              transform={`rotate(${(i * 180) / ROSETTE_B + 4.5})`}
              stroke="#6F5418"
              strokeOpacity="0.32"
              strokeWidth="0.4"
            />
          ))}
        </g>

        {/* Ornamental border: linked lozenges with beads, 12px repeat */}
        <pattern id="vbc-border-motif" width="12" height="12" patternUnits="userSpaceOnUse">
          <rect width="12" height="12" fill="#7A5C19" />
          <path d="M6 1.6 L10.4 6 L6 10.4 L1.6 6 Z" fill="none" stroke="#F3D98B" strokeWidth="0.8" />
          <path d="M6 4 L8 6 L6 8 L4 6 Z" fill="#C9A24B" />
          <circle cx="0" cy="6" r="1" fill="#FFF4D2" />
          <circle cx="12" cy="6" r="1" fill="#FFF4D2" />
        </pattern>

        {/* 400x240 frame band (outer rect minus inner rect), with hairline edges */}
        <g id="vbc-frame">
          <path
            d="M0 0H400V240H0Z M12 12V228H388V12Z"
            fillRule="evenodd"
            fill="url(#vbc-border-motif)"
          />
          <rect x="0.75" y="0.75" width="398.5" height="238.5" fill="none" stroke="#FFF4D2" strokeOpacity="0.6" strokeWidth="1.5" />
          <rect x="12" y="12" width="376" height="216" fill="none" stroke="#5E4714" strokeWidth="1.2" />
          <rect x="15" y="15" width="370" height="210" fill="none" stroke="#FFF4D2" strokeOpacity="0.45" strokeWidth="0.6" />
          <use href="#vbc-corner" />
          <use href="#vbc-corner" transform="translate(400 0) scale(-1 1)" />
          <use href="#vbc-corner" transform="translate(0 240) scale(1 -1)" />
          <use href="#vbc-corner" transform="translate(400 240) scale(-1 -1)" />
        </g>
      </defs>
    </svg>
  );
}

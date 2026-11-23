/* ── SVG Pixel Art Assets ───────────────────────── */

/* Pixel Heart SVG */
export const PixelHeartSVG = ({ size = 24, color = '#F4A6C1', outline = '#725B82' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated' }}>
    <rect x="1" y="4" width="4" height="2" fill={color} />
    <rect x="11" y="4" width="4" height="2" fill={color} />
    <rect x="0" y="6" width="6" height="4" fill={color} />
    <rect x="10" y="6" width="6" height="4" fill={color} />
    <rect x="2" y="10" width="12" height="2" fill={color} />
    <rect x="4" y="12" width="8" height="2" fill={color} />
    <rect x="6" y="14" width="4" height="1" fill={color} />
    {/* Outline */}
    <rect x="1" y="3" width="5" height="1" fill={outline} />
    <rect x="10" y="3" width="5" height="1" fill={outline} />
    <rect x="0" y="4" width="1" height="6" fill={outline} />
    <rect x="15" y="4" width="1" height="6" fill={outline} />
    <rect x="1" y="10" width="1" height="1" fill={outline} />
    <rect x="14" y="10" width="1" height="1" fill={outline} />
  </svg>
);

/* Pixel Star SVG */
export const PixelStarSVG = ({ size = 12, color = '#DCCBFF' }) => (
  <svg width={size} height={size} viewBox="0 0 8 8" style={{ imageRendering: 'pixelated' }}>
    <rect x="3" y="0" width="2" height="2" fill={color} />
    <rect x="3" y="6" width="2" height="2" fill={color} />
    <rect x="0" y="3" width="2" height="2" fill={color} />
    <rect x="6" y="3" width="2" height="2" fill={color} />
    <rect x="2" y="2" width="4" height="4" fill={color} />
  </svg>
);

/* Pixel Flower SVG */
export const PixelFlowerSVG = ({ size = 24, petalColor = '#F4A6C1', centerColor = '#FFE082', stemColor = '#7BC47A' }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 16 24" style={{ imageRendering: 'pixelated' }}>
    {/* Stem */}
    <rect x="7" y="13" width="2" height="11" fill={stemColor} />
    {/* Petals */}
    <rect x="6" y="4" width="4" height="4" fill={petalColor} />
    <rect x="6" y="9" width="4" height="4" fill={petalColor} />
    <rect x="1" y="6" width="4" height="4" fill={petalColor} />
    <rect x="11" y="6" width="4" height="4" fill={petalColor} />
    {/* Center */}
    <rect x="6" y="6" width="4" height="4" fill={centerColor} />
    <rect x="7" y="5" width="2" height="6" fill={centerColor} />
    <rect x="5" y="7" width="6" height="2" fill={centerColor} />
  </svg>
);

/* Pixel Cloud SVG */
export const PixelCloudSVG = ({ width = 40, color = 'rgba(255,255,255,0.9)' }) => (
  <svg width={width} height={width * 0.5} viewBox="0 0 40 20" style={{ imageRendering: 'pixelated' }}>
    <rect x="8" y="8" width="24" height="12" fill={color} />
    <rect x="4" y="12" width="32" height="8" fill={color} />
    <rect x="12" y="4" width="8" height="6" fill={color} />
    <rect x="22" y="6" width="8" height="6" fill={color} />
  </svg>
);

/* Pixel Character SVG */
export const PixelCharacterSVG = ({ size = 32 }) => (
  <svg width={size} height={size * 1.5} viewBox="0 0 16 24" style={{ imageRendering: 'pixelated' }}>
    {/* Hair */}
    <rect x="4" y="0" width="8" height="3" fill="#725B82" />
    <rect x="3" y="1" width="10" height="4" fill="#A88BE8" />
    <rect x="2" y="2" width="12" height="2" fill="#A88BE8" />
    {/* Face */}
    <rect x="3" y="4" width="10" height="8" fill="#FFD6C0" />
    {/* Eyes */}
    <rect x="5" y="6" width="2" height="2" fill="#725B82" />
    <rect x="9" y="6" width="2" height="2" fill="#725B82" />
    {/* Blush */}
    <rect x="4" y="8" width="2" height="1" fill="#F4A6C1" />
    <rect x="10" y="8" width="2" height="1" fill="#F4A6C1" />
    {/* Mouth */}
    <rect x="6" y="10" width="4" height="1" fill="#D4A0A0" />
    {/* Body */}
    <rect x="4" y="12" width="8" height="6" fill="#DCCBFF" />
    {/* Arms */}
    <rect x="1" y="13" width="3" height="4" fill="#DCCBFF" />
    <rect x="12" y="13" width="3" height="4" fill="#DCCBFF" />
    {/* Legs */}
    <rect x="4" y="18" width="3" height="6" fill="#725B82" />
    <rect x="9" y="18" width="3" height="6" fill="#725B82" />
  </svg>
);

/* Large Pixel Bouquet SVG */
export const PixelBouquetSVG = ({ size = 220 }) => {
  const s = size / 220;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 220 242" style={{ imageRendering: 'pixelated' }}>
      {/* === STEMS === */}
      <rect x="104" y="140" width="8" height="80" fill="#5AAF59" />
      <rect x="80" y="150" width="6" height="70" fill="#7BC47A" />
      <rect x="130" y="145" width="6" height="75" fill="#7BC47A" />
      <rect x="58" y="160" width="5" height="65" fill="#7BC47A" />
      <rect x="154" y="158" width="5" height="67" fill="#7BC47A" />
      <rect x="40" y="168" width="4" height="58" fill="#A8D5A2" />
      <rect x="174" y="166" width="4" height="60" fill="#A8D5A2" />

      {/* === LEAVES === */}
      <rect x="90" y="175" width="14" height="8" fill="#5AAF59" />
      <rect x="112" y="168" width="14" height="8" fill="#7BC47A" />
      <rect x="68" y="182" width="12" height="7" fill="#7BC47A" />
      <rect x="142" y="178" width="12" height="7" fill="#5AAF59" />

      {/* === RIBBON / WRAP === */}
      <rect x="70" y="210" width="76" height="20" fill="#F4A6C1" />
      <rect x="74" y="206" width="68" height="10" fill="#DCCBFF" />
      <rect x="98" y="202" width="20" height="12" fill="#F8BBD0" />
      {/* Ribbon bow */}
      <rect x="90" y="198" width="14" height="8" fill="#F4A6C1" />
      <rect x="112" y="198" width="14" height="8" fill="#F4A6C1" />
      <rect x="102" y="202" width="12" height="6" fill="#DCCBFF" />

      {/* === FLOWER: CENTER LARGE (Rose - deep pink) === */}
      <rect x="94" y="80" width="28" height="28" fill="#E91E63" />
      <rect x="90" y="88" width="36" height="20" fill="#EC407A" />
      <rect x="98" y="76" width="20" height="10" fill="#F06292" />
      <rect x="98" y="104" width="20" height="6" fill="#AD1457" />
      <rect x="102" y="84" width="12" height="20" fill="#F48FB1" />
      <rect x="98" y="88" width="20" height="12" fill="#E91E63" />
      <rect x="102" y="90" width="12" height="8" fill="#F8BBD0" />
      {/* Outline */}
      <rect x="90" y="76" width="36" height="2" fill="#725B82" />
      <rect x="90" y="108" width="36" height="2" fill="#725B82" />
      <rect x="88" y="78" width="2" height="30" fill="#725B82" />
      <rect x="128" y="78" width="2" height="30" fill="#725B82" />

      {/* === FLOWER: LEFT MEDIUM (Lavender) === */}
      <rect x="62" y="96" width="22" height="22" fill="#CE93D8" />
      <rect x="58" y="102" width="30" height="14" fill="#BA68C8" />
      <rect x="66" y="92" width="14" height="8" fill="#E1BEE7" />
      <rect x="66" y="114" width="14" height="4" fill="#8E24AA" />
      <rect x="68" y="98" width="10" height="14" fill="#F3E5F5" />
      <rect x="64" y="100" width="18" height="10" fill="#CE93D8" />
      {/* Outline */}
      <rect x="58" y="92" width="30" height="2" fill="#725B82" />
      <rect x="58" y="118" width="30" height="2" fill="#725B82" />
      <rect x="56" y="94" width="2" height="24" fill="#725B82" />
      <rect x="90" y="94" width="2" height="24" fill="#725B82" />

      {/* === FLOWER: RIGHT MEDIUM (Pink) === */}
      <rect x="132" y="90" width="22" height="22" fill="#F48FB1" />
      <rect x="128" y="96" width="30" height="14" fill="#F06292" />
      <rect x="136" y="86" width="14" height="8" fill="#FCE4EC" />
      <rect x="136" y="108" width="14" height="4" fill="#C2185B" />
      <rect x="138" y="92" width="10" height="14" fill="#FFFFFF" />
      <rect x="134" y="94" width="18" height="10" fill="#F48FB1" />
      {/* Outline */}
      <rect x="128" y="86" width="30" height="2" fill="#725B82" />
      <rect x="128" y="112" width="30" height="2" fill="#725B82" />
      <rect x="126" y="88" width="2" height="24" fill="#725B82" />
      <rect x="160" y="88" width="2" height="24" fill="#725B82" />

      {/* === FLOWER: FAR LEFT (Yellow) === */}
      <rect x="34" y="110" width="18" height="18" fill="#FFD54F" />
      <rect x="30" y="116" width="26" height="10" fill="#FFCA28" />
      <rect x="38" y="106" width="10" height="6" fill="#FFF9C4" />
      <rect x="38" y="124" width="10" height="4" fill="#F57F17" />
      <rect x="40" y="110" width="8" height="12" fill="#FFF9C4" />
      {/* Outline */}
      <rect x="30" y="106" width="26" height="2" fill="#725B82" />
      <rect x="30" y="128" width="26" height="2" fill="#725B82" />
      <rect x="28" y="108" width="2" height="20" fill="#725B82" />
      <rect x="58" y="108" width="2" height="20" fill="#725B82" />

      {/* === FLOWER: FAR RIGHT (Peach/Coral) === */}
      <rect x="164" y="104" width="18" height="18" fill="#FFAB91" />
      <rect x="160" y="110" width="26" height="10" fill="#FF8A65" />
      <rect x="168" y="100" width="10" height="6" fill="#FFE0B2" />
      <rect x="168" y="118" width="10" height="4" fill="#D84315" />
      <rect x="170" y="104" width="8" height="12" fill="#FFE0B2" />
      {/* Outline */}
      <rect x="160" y="100" width="26" height="2" fill="#725B82" />
      <rect x="160" y="122" width="26" height="2" fill="#725B82" />
      <rect x="158" y="102" width="2" height="20" fill="#725B82" />
      <rect x="188" y="102" width="2" height="20" fill="#725B82" />

      {/* === SMALL ACCENT FLOWERS === */}
      {/* Top left accent */}
      <rect x="50" y="80" width="12" height="12" fill="#F4A6C1" />
      <rect x="46" y="84" width="20" height="6" fill="#F8BBD0" />
      <rect x="54" y="76" width="6" height="6" fill="#FFFFFF" />
      <rect x="56" y="82" width="4" height="8" fill="#FFE082" />

      {/* Top right accent */}
      <rect x="154" y="74" width="12" height="12" fill="#CE93D8" />
      <rect x="150" y="78" width="20" height="6" fill="#E1BEE7" />
      <rect x="158" y="70" width="6" height="6" fill="#FFFFFF" />
      <rect x="160" y="76" width="4" height="8" fill="#FFE082" />

      {/* Baby's breath / tiny fillers */}
      {[46,62,74,142,158,170,180].map((x, i) => (
        <rect key={i} x={x} y={68 + (i % 3) * 8} width="4" height="4" fill="#FFFFFF" opacity="0.9" />
      ))}
      {[52,80,164,174].map((x, i) => (
        <rect key={i} x={x} y={72 + (i % 2) * 6} width="3" height="3" fill="#F8BBD0" opacity="0.8" />
      ))}

      {/* === SPARKLES === */}
      <rect x="92" y="66" width="2" height="6" fill="#FFE082" opacity="0.8" />
      <rect x="89" y="69" width="8" height="2" fill="#FFE082" opacity="0.8" />
      <rect x="130" y="60" width="2" height="6" fill="#DCCBFF" opacity="0.8" />
      <rect x="127" y="63" width="8" height="2" fill="#DCCBFF" opacity="0.8" />
      <rect x="68" y="72" width="2" height="4" fill="#F4A6C1" opacity="0.7" />
      <rect x="66" y="74" width="6" height="2" fill="#F4A6C1" opacity="0.7" />
      <rect x="150" y="68" width="2" height="4" fill="#FFD54F" opacity="0.7" />
      <rect x="148" y="70" width="6" height="2" fill="#FFD54F" opacity="0.7" />
    </svg>
  );
};

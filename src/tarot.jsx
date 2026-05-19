import { useState } from "react";

// ── 로컬 타로 이미지 경로 ────────────────────────────────────
const CARD_IMAGES = {
  0:  "/tarot/ar00.png",
  1:  "/tarot/ar01.png",
  2:  "/tarot/ar02.png",
  3:  "/tarot/ar03.png",
  4:  "/tarot/ar04.png",
  5:  "/tarot/ar05.png",
  6:  "/tarot/ar06.png",
  7:  "/tarot/ar07.png",
  8:  "/tarot/ar08.png",
  9:  "/tarot/ar09.png",
  10: "/tarot/ar10.png",
  11: "/tarot/ar11.png",
  12: "/tarot/ar12.png",
  13: "/tarot/ar13.png",
  14: "/tarot/ar14.png",
  15: "/tarot/ar15.png",
  16: "/tarot/ar16.png",
  17: "/tarot/ar17.png",
  18: "/tarot/ar18.png",
  19: "/tarot/ar19.png",
  20: "/tarot/ar20.png",
  21: "/tarot/ar21.png",
};

// ── 카드 뒷면 SVG ────────────────────────────────────────────
function CardBack({ width, height }) {
  return (
    <svg width={width} height={height} viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bgGrad" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stopColor="#1e0a3c"/>
          <stop offset="100%" stopColor="#08050f"/>
        </radialGradient>
        <pattern id="dotPat" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
          <circle cx="4" cy="4" r="0.4" fill="#c8a96e" opacity="0.25"/>
        </pattern>
      </defs>
      {/* 배경 */}
      <rect width="80" height="120" fill="url(#bgGrad)" rx="5"/>
      <rect width="80" height="120" fill="url(#dotPat)" rx="5"/>
      {/* 테두리 이중 */}
      <rect x="3" y="3" width="74" height="114" fill="none" stroke="#c8a96e" strokeWidth="1" rx="4"/>
      <rect x="6" y="6" width="68" height="108" fill="none" stroke="#c8a96e" strokeWidth="0.4" rx="3" opacity="0.5"/>
      {/* 중앙 큰 별 */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={i}
          x1={40 + 18*Math.cos(i*45*Math.PI/180)}
          y1={60 + 18*Math.sin(i*45*Math.PI/180)}
          x2={40 + 26*Math.cos(i*45*Math.PI/180)}
          y2={60 + 26*Math.sin(i*45*Math.PI/180)}
          stroke="#c8a96e" strokeWidth="0.8" opacity="0.7"
        />
      ))}
      <circle cx="40" cy="60" r="18" fill="none" stroke="#c8a96e" strokeWidth="0.6" opacity="0.5"/>
      <circle cx="40" cy="60" r="10" fill="none" stroke="#c8a96e" strokeWidth="0.4" opacity="0.4"/>
      {/* 중앙 달 + 별 */}
      <circle cx="40" cy="60" r="6" fill="none" stroke="#f5c842" strokeWidth="0.8" opacity="0.8"/>
      <circle cx="43" cy="58" r="4.5" fill="#08050f" opacity="0.9"/>
      {/* 네 귀퉁이 장식 */}
      {[[10,16],[70,16],[10,104],[70,104]].map(([x,y],i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="3" fill="none" stroke="#c8a96e" strokeWidth="0.6" opacity="0.6"/>
          <line x1={x-5} y1={y} x2={x+5} y2={y} stroke="#c8a96e" strokeWidth="0.4" opacity="0.4"/>
          <line x1={x} y1={y-5} x2={x} y2={y+5} stroke="#c8a96e" strokeWidth="0.4" opacity="0.4"/>
        </g>
      ))}
      {/* 상단 텍스트 */}
      <text x="40" y="13" textAnchor="middle" fill="#c8a96e" fontSize="4.5" fontFamily="serif" opacity="0.7" letterSpacing="1">✦  T A R O T  ✦</text>
      {/* 하단 텍스트 */}
      <text x="40" y="112" textAnchor="middle" fill="#c8a96e" fontSize="4.5" fontFamily="serif" opacity="0.7" letterSpacing="1">✦  T A R O T  ✦</text>
      {/* 빛나는 점들 */}
      {[[20,30],[60,30],[15,60],[65,60],[20,90],[60,90],[40,35],[40,85]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="0.8" fill="#f5c842" opacity={0.2 + (i%3)*0.1}/>
      ))}
    </svg>
  );
}

// ── CardArt 컴포넌트 (실제 이미지) ──────────────────────────
function CardArt({ cardId, size = "md", reversed = false }) {
  const sizes = { lg: [100,150], md: [60,90], sm: [46,69] };
  const [w, h] = sizes[size] || sizes.md;
  const src = CARD_IMAGES[cardId];
  return (
    <div style={{ width: w, height: h, flexShrink: 0, borderRadius: "4px", overflow: "hidden", transform: reversed ? "rotate(180deg)" : "none", transition: "transform 0.3s", boxShadow: "0 4px 16px rgba(0,0,0,0.5)" }}>
      <img
        src={src}
        alt={`tarot card ${cardId}`}
        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        onError={(e) => { e.target.style.display = "none"; }}
      />
    </div>
  );
}

// ── (구) SVG 데이터 — 더 이상 사용 안 함 ─────────────────────
const CARD_SVG = {
  0: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="40" cy="22" r="8" fill="none" stroke="#f5c842" strokeWidth="1"/>{[0,45,90,135,180,225,270,315].map((a,i)=><line key={i} x1={40+10*Math.cos(a*Math.PI/180)} y1={22+10*Math.sin(a*Math.PI/180)} x2={40+13*Math.cos(a*Math.PI/180)} y2={22+13*Math.sin(a*Math.PI/180)} stroke="#f5c842" strokeWidth="0.8"/>)}<circle cx="40" cy="50" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="57" x2="40" y2="78" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="63" x2="32" y2="70" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="63" x2="52" y2="60" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="78" x2="34" y2="90" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="78" x2="46" y2="90" stroke="#c8a96e" strokeWidth="1"/><line x1="52" y1="60" x2="58" y2="48" stroke="#c8a96e" strokeWidth="1"/><circle cx="58" cy="46" r="3" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><path d="M20 95 L30 88 L50 92 L60 95" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><text x="40" y="108" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE FOOL</text><text x="40" y="116" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">0</text></svg>),
  1: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M26 18 Q32 12 40 18 Q48 24 54 18 Q60 12 54 18 Q48 24 40 18 Q32 12 26 18" fill="none" stroke="#f5c842" strokeWidth="1"/><circle cx="40" cy="38" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="45" x2="40" y2="68" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="52" x2="28" y2="58" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="52" x2="52" y2="48" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="68" x2="33" y2="80" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="68" x2="47" y2="80" stroke="#c8a96e" strokeWidth="1"/><line x1="52" y1="48" x2="56" y2="32" stroke="#c8a96e" strokeWidth="1"/><line x1="54" y1="30" x2="58" y2="30" stroke="#f5c842" strokeWidth="1.5"/><rect x="20" y="72" width="40" height="18" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><text x="26" y="84" fill="#f5c842" fontSize="6">♦</text><text x="34" y="84" fill="#f5c842" fontSize="6">♣</text><text x="42" y="84" fill="#f5c842" fontSize="6">♥</text><text x="50" y="84" fill="#f5c842" fontSize="6">⚔</text><text x="40" y="106" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">MAGICIAN</text><text x="40" y="115" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">I</text></svg>),
  2: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M28 20 Q40 12 52 20" fill="none" stroke="#f5c842" strokeWidth="1"/><circle cx="40" cy="16" r="4" fill="none" stroke="#f5c842" strokeWidth="0.8"/><line x1="20" y1="35" x2="20" y2="80" stroke="#c8a96e" strokeWidth="1.5"/><line x1="60" y1="35" x2="60" y2="80" stroke="#c8a96e" strokeWidth="1.5"/><text x="20" y="33" textAnchor="middle" fill="#f5c842" fontSize="6">B</text><text x="60" y="33" textAnchor="middle" fill="#f5c842" fontSize="6">J</text><circle cx="40" cy="40" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="47" x2="40" y2="72" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="55" x2="30" y2="62" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="55" x2="50" y2="62" stroke="#c8a96e" strokeWidth="1"/><rect x="32" y="63" width="16" height="10" fill="none" stroke="#f5c842" strokeWidth="0.8"/><text x="40" y="70" textAnchor="middle" fill="#f5c842" fontSize="5">TORA</text><text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="5.5" fontFamily="serif">HIGH PRIESTESS</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">II</text></svg>),
  3: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/>{[0,1,2,3,4,5,6,7,8,9,10,11].map((i)=><circle key={i} cx={40+14*Math.cos(i*30*Math.PI/180)} cy={18+6*Math.sin(i*30*Math.PI/180)} r="1.2" fill="#f5c842"/>)}<circle cx="40" cy="38" r="8" fill="none" stroke="#c8a96e" strokeWidth="1"/><ellipse cx="40" cy="60" rx="18" ry="14" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="26" y1="58" x2="18" y2="72" stroke="#c8a96e" strokeWidth="1"/><line x1="54" y1="58" x2="62" y2="72" stroke="#c8a96e" strokeWidth="1"/><line x1="55" y1="38" x2="65" y2="25" stroke="#c8a96e" strokeWidth="1"/><circle cx="65" cy="23" r="3" fill="none" stroke="#f5c842" strokeWidth="0.8"/>{[20,30,40,50,60].map((x,i)=><circle key={i} cx={x} cy={88} r="2" fill="none" stroke="#c8a96e" strokeWidth="0.6"/>)}<text x="40" y="104" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">EMPRESS</text><text x="40" y="113" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">III</text></svg>),
  4: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M26 22 L26 15 L33 20 L40 13 L47 20 L54 15 L54 22 Z" fill="none" stroke="#f5c842" strokeWidth="1"/><circle cx="40" cy="35" r="8" fill="none" stroke="#c8a96e" strokeWidth="1"/><rect x="24" y="43" width="32" height="28" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="24" y1="55" x2="16" y2="52" stroke="#c8a96e" strokeWidth="1"/><line x1="56" y1="55" x2="64" y2="52" stroke="#c8a96e" strokeWidth="1"/><line x1="24" y1="71" x2="22" y2="82" stroke="#c8a96e" strokeWidth="1"/><line x1="56" y1="71" x2="58" y2="82" stroke="#c8a96e" strokeWidth="1"/><line x1="16" y1="52" x2="12" y2="40" stroke="#c8a96e" strokeWidth="1"/><circle cx="64" cy="50" r="4" fill="none" stroke="#f5c842" strokeWidth="0.8"/><path d="M14 90 L25 75 L36 90" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><path d="M44 90 L58 72 L72 90" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><text x="40" y="104" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">EMPEROR</text><text x="40" y="113" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">IV</text></svg>),
  5: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><rect x="30" y="10" width="20" height="5" fill="none" stroke="#f5c842" strokeWidth="0.8"/><rect x="28" y="15" width="24" height="5" fill="none" stroke="#f5c842" strokeWidth="0.8"/><rect x="26" y="20" width="28" height="5" fill="none" stroke="#f5c842" strokeWidth="0.8"/><circle cx="40" cy="37" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="44" x2="40" y2="70" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="52" x2="30" y2="58" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="52" x2="50" y2="58" stroke="#c8a96e" strokeWidth="1"/><line x1="25" y1="44" x2="25" y2="68" stroke="#c8a96e" strokeWidth="1.2"/><line x1="21" y1="50" x2="29" y2="50" stroke="#c8a96e" strokeWidth="1"/><line x1="21" y1="56" x2="29" y2="56" stroke="#c8a96e" strokeWidth="1"/><circle cx="28" cy="75" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="52" cy="75" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="28" y1="80" x2="28" y2="92" stroke="#c8a96e" strokeWidth="0.8"/><line x1="52" y1="80" x2="52" y2="92" stroke="#c8a96e" strokeWidth="0.8"/><line x1="15" y1="35" x2="15" y2="85" stroke="#c8a96e" strokeWidth="1.2"/><line x1="65" y1="35" x2="65" y2="85" stroke="#c8a96e" strokeWidth="1.2"/><text x="40" y="104" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">HIEROPHANT</text><text x="40" y="113" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">V</text></svg>),
  6: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="40" cy="18" r="7" fill="none" stroke="#f5c842" strokeWidth="1"/><path d="M25 22 Q20 15 28 18" fill="none" stroke="#f5c842" strokeWidth="1"/><path d="M55 22 Q60 15 52 18" fill="none" stroke="#f5c842" strokeWidth="1"/>{[0,30,60,90,120,150,180,210,240,270,300,330].map((a,i)=><line key={i} x1={40+9*Math.cos(a*Math.PI/180)} y1={18+9*Math.sin(a*Math.PI/180)} x2={40+12*Math.cos(a*Math.PI/180)} y2={18+12*Math.sin(a*Math.PI/180)} stroke="#f5c842" strokeWidth="0.6"/>)}<circle cx="28" cy="55" r="6" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="28" y1="61" x2="28" y2="80" stroke="#c8a96e" strokeWidth="1"/><circle cx="52" cy="55" r="6" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="52" y1="61" x2="52" y2="80" stroke="#c8a96e" strokeWidth="1"/><circle cx="52" cy="45" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.6"/><line x1="28" y1="45" x2="28" y2="36" stroke="#c8a96e" strokeWidth="0.8"/><path d="M22 36 Q28 28 34 36" fill="none" stroke="#f5c842" strokeWidth="0.8"/><text x="40" y="101" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">THE LOVERS</text><text x="40" y="110" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">VI</text></svg>),
  7: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M32 16 L35 10 L40 8 L45 10 L48 16" fill="none" stroke="#f5c842" strokeWidth="1"/><rect x="18" y="38" width="44" height="32" fill="none" stroke="#c8a96e" strokeWidth="1.2"/><path d="M30 44 Q40 38 50 44" fill="none" stroke="#f5c842" strokeWidth="1"/><circle cx="40" cy="28" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="35" x2="40" y2="50" stroke="#c8a96e" strokeWidth="1"/><circle cx="26" cy="76" r="8" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="54" cy="76" r="8" fill="none" stroke="#c8a96e" strokeWidth="1"/><ellipse cx="26" cy="90" rx="8" ry="4" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="22" cy="87" r="3" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><ellipse cx="54" cy="90" rx="8" ry="4" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="58" cy="87" r="3" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><text x="40" y="108" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">CHARIOT</text><text x="40" y="116" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">VII</text></svg>),
  8: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M26 18 Q32 12 40 18 Q48 24 54 18 Q60 12 54 18 Q48 24 40 18 Q32 12 26 18" fill="none" stroke="#f5c842" strokeWidth="1"/><circle cx="40" cy="38" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="45" x2="40" y2="68" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="53" x2="28" y2="58" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="53" x2="52" y2="58" stroke="#c8a96e" strokeWidth="1"/><ellipse cx="40" cy="78" rx="22" ry="12" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="26" cy="70" r="8" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><path d="M18 68 Q22 62 26 65 Q30 62 34 68" fill="none" stroke="#c8a96e" strokeWidth="0.6"/><line x1="28" y1="58" x2="24" y2="68" stroke="#c8a96e" strokeWidth="0.8"/><line x1="52" y1="58" x2="34" y2="68" stroke="#c8a96e" strokeWidth="0.8"/><text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">STRENGTH</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">VIII</text></svg>),
  9: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/>{[0,1,2,3,4,5].map(i=><line key={i} x1={55+8*Math.cos(i*60*Math.PI/180)} y1={28+8*Math.sin(i*60*Math.PI/180)} x2={55+12*Math.cos(i*60*Math.PI/180)} y2={28+12*Math.sin(i*60*Math.PI/180)} stroke="#f5c842" strokeWidth="1"/>)}<circle cx="55" cy="28" r="5" fill="none" stroke="#f5c842" strokeWidth="0.8"/><rect x="50" y="33" width="10" height="14" fill="none" stroke="#f5c842" strokeWidth="0.8"/><path d="M53 33 Q55 28 57 33" fill="none" stroke="#f5c842" strokeWidth="0.6"/><circle cx="32" cy="38" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><path d="M18 88 Q20 55 25 50 Q30 45 32 45 Q38 45 42 50 Q46 55 48 88" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="18" y1="88" x2="16" y2="52" stroke="#c8a96e" strokeWidth="1"/><path d="M14 90 L28 68 L42 90" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><path d="M38 90 L55 60 L72 90" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><text x="40" y="104" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">HERMIT</text><text x="40" y="113" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">IX</text></svg>),
  10: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="40" cy="52" r="28" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="40" cy="52" r="20" fill="none" stroke="#c8a96e" strokeWidth="0.6"/><circle cx="40" cy="52" r="8" fill="none" stroke="#f5c842" strokeWidth="1"/>{[0,45,90,135].map((a,i)=><line key={i} x1={40+8*Math.cos(a*Math.PI/180)} y1={52+8*Math.sin(a*Math.PI/180)} x2={40+20*Math.cos(a*Math.PI/180)} y2={52+20*Math.sin(a*Math.PI/180)} stroke="#c8a96e" strokeWidth="0.8"/>)}<text x="40" y="36" textAnchor="middle" fill="#f5c842" fontSize="5">T</text><text x="56" y="54" textAnchor="middle" fill="#f5c842" fontSize="5">A</text><text x="40" y="70" textAnchor="middle" fill="#f5c842" fontSize="5">R</text><text x="24" y="54" textAnchor="middle" fill="#f5c842" fontSize="5">O</text><text x="40" y="104" textAnchor="middle" fill="#c8a96e" fontSize="5.5" fontFamily="serif">WHEEL OF FORTUNE</text><text x="40" y="113" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">X</text></svg>),
  11: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M30 18 L33 12 L40 10 L47 12 L50 18" fill="none" stroke="#f5c842" strokeWidth="1"/><circle cx="40" cy="30" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="37" x2="40" y2="68" stroke="#c8a96e" strokeWidth="1"/><line x1="24" y1="40" x2="56" y2="40" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="37" x2="40" y2="40" stroke="#c8a96e" strokeWidth="1"/><line x1="24" y1="40" x2="20" y2="48" stroke="#c8a96e" strokeWidth="0.8"/><line x1="20" y1="48" x2="28" y2="48" stroke="#c8a96e" strokeWidth="0.8"/><line x1="56" y1="40" x2="52" y2="48" stroke="#c8a96e" strokeWidth="0.8"/><line x1="52" y1="48" x2="60" y2="48" stroke="#c8a96e" strokeWidth="0.8"/><line x1="58" y1="40" x2="64" y2="22" stroke="#c8a96e" strokeWidth="1.2"/><line x1="60" y1="28" x2="68" y2="28" stroke="#c8a96e" strokeWidth="1"/><line x1="15" y1="22" x2="15" y2="80" stroke="#c8a96e" strokeWidth="1.2"/><line x1="65" y1="22" x2="65" y2="80" stroke="#c8a96e" strokeWidth="1.2"/><line x1="40" y1="68" x2="32" y2="82" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="68" x2="48" y2="82" stroke="#c8a96e" strokeWidth="1"/><text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">JUSTICE</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XI</text></svg>),
  12: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><line x1="24" y1="88" x2="24" y2="25" stroke="#c8a96e" strokeWidth="1.5"/><line x1="56" y1="88" x2="56" y2="25" stroke="#c8a96e" strokeWidth="1.5"/><line x1="24" y1="35" x2="56" y2="35" stroke="#c8a96e" strokeWidth="1.5"/>{[26,30,34,38,42,46,50,54].map((x,i)=><line key={i} x1={x} y1={25} x2={x} y2={i%2===0?18:20} stroke="#c8a96e" strokeWidth="0.6"/>)}<line x1="40" y1="35" x2="40" y2="42" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="40" cy="50" r="7" fill="none" stroke="#f5c842" strokeWidth="1"/><line x1="40" y1="57" x2="40" y2="74" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="64" x2="30" y2="58" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="64" x2="50" y2="58" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="74" x2="33" y2="68" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="74" x2="47" y2="68" stroke="#c8a96e" strokeWidth="1"/><text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="6" fontFamily="serif">HANGED MAN</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XII</text></svg>),
  13: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><ellipse cx="40" cy="24" rx="9" ry="10" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="36" cy="23" r="2" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="44" cy="23" r="2" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><path d="M35 30 Q40 28 45 30" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><rect x="28" y="34" width="24" height="26" fill="none" stroke="#c8a96e" strokeWidth="1"/><ellipse cx="40" cy="72" rx="20" ry="10" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="22" cy="66" r="6" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="28" y1="80" x2="24" y2="90" stroke="#c8a96e" strokeWidth="1"/><line x1="36" y1="82" x2="32" y2="92" stroke="#c8a96e" strokeWidth="1"/><line x1="44" y1="82" x2="48" y2="92" stroke="#c8a96e" strokeWidth="1"/><line x1="52" y1="80" x2="56" y2="90" stroke="#c8a96e" strokeWidth="1"/><line x1="52" y1="34" x2="52" y2="18" stroke="#c8a96e" strokeWidth="0.8"/><path d="M52 18 L64 22 L52 26" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><text x="40" y="104" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">DEATH</text><text x="40" y="113" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XIII</text></svg>),
  14: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="60" cy="20" r="6" fill="none" stroke="#f5c842" strokeWidth="0.8"/>{[0,45,90,135,180,225,270,315].map((a,i)=><line key={i} x1={60+7*Math.cos(a*Math.PI/180)} y1={20+7*Math.sin(a*Math.PI/180)} x2={60+10*Math.cos(a*Math.PI/180)} y2={20+10*Math.sin(a*Math.PI/180)} stroke="#f5c842" strokeWidth="0.6"/>)}<path d="M18 45 Q14 35 22 38 Q18 30 26 35" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><path d="M62 45 Q66 35 58 38 Q62 30 54 35" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="40" cy="38" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="45" x2="40" y2="70" stroke="#c8a96e" strokeWidth="1"/><rect x="22" y="52" width="10" height="14" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><rect x="48" y="52" width="10" height="14" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><path d="M32 56 Q40 50 48 56" fill="none" stroke="#c8a96e" strokeWidth="0.8" strokeDasharray="2,1"/><line x1="40" y1="53" x2="30" y2="60" stroke="#c8a96e" strokeWidth="0.8"/><line x1="40" y1="53" x2="50" y2="60" stroke="#c8a96e" strokeWidth="0.8"/><ellipse cx="40" cy="82" rx="20" ry="6" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="40" y1="70" x2="38" y2="78" stroke="#c8a96e" strokeWidth="0.8"/><line x1="40" y1="70" x2="42" y2="78" stroke="#c8a96e" strokeWidth="0.8"/><text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">TEMPERANCE</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XIV</text></svg>),
  15: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M28 22 L24 10 L32 18" fill="none" stroke="#c8a96e" strokeWidth="1"/><path d="M52 22 L56 10 L48 18" fill="none" stroke="#c8a96e" strokeWidth="1"/><path d="M20 40 Q10 30 14 42 Q10 38 16 48" fill="none" stroke="#c8a96e" strokeWidth="1"/><path d="M60 40 Q70 30 66 42 Q70 38 64 48" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="40" cy="30" r="10" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="36" cy="28" r="2" fill="#c8a96e"/><circle cx="44" cy="28" r="2" fill="#c8a96e"/><path d="M34 35 Q40 38 46 35" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><polygon points="40,18 44,24 50,24 46,28 48,34 40,30 32,34 34,28 30,24 36,24" fill="none" stroke="#f5c842" strokeWidth="0.7"/><circle cx="26" cy="68" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="26" y1="73" x2="26" y2="85" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="54" cy="68" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="54" y1="73" x2="54" y2="85" stroke="#c8a96e" strokeWidth="0.8"/><line x1="26" y1="85" x2="40" y2="88" stroke="#c8a96e" strokeWidth="0.8"/><line x1="54" y1="85" x2="40" y2="88" stroke="#c8a96e" strokeWidth="0.8"/><rect x="35" y="85" width="10" height="6" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><text x="40" y="102" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE DEVIL</text><text x="40" y="111" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XV</text></svg>),
  16: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><path d="M55 12 L48 30 L54 30 L44 52" fill="none" stroke="#f5c842" strokeWidth="1.5"/><rect x="26" y="40" width="28" height="46" fill="none" stroke="#c8a96e" strokeWidth="1.2"/><path d="M28 35 L30 28 L35 33 L40 25 L45 33 L50 28 L52 35" fill="none" stroke="#f5c842" strokeWidth="1"/><rect x="34" y="50" width="8" height="10" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><rect x="34" y="66" width="8" height="10" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><circle cx="22" cy="58" r="4" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="22" y1="62" x2="18" y2="72" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="58" cy="65" r="4" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="58" y1="69" x2="62" y2="78" stroke="#c8a96e" strokeWidth="0.8"/>{[30,36,42,48,54].map((x,i)=><path key={i} d={`M${x} 40 Q${x+2} 35 ${x+4} 40`} fill="none" stroke="#f5c842" strokeWidth="0.8"/>)}<text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE TOWER</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XVI</text></svg>),
  17: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/>{[0,1,2,3,4,5,6,7].map(i=><line key={i} x1={40+10*Math.cos(i*45*Math.PI/180)} y1={22+10*Math.sin(i*45*Math.PI/180)} x2={40+16*Math.cos(i*45*Math.PI/180)} y2={22+16*Math.sin(i*45*Math.PI/180)} stroke="#f5c842" strokeWidth="1.2"/>)}<circle cx="40" cy="22" r="6" fill="none" stroke="#f5c842" strokeWidth="1"/>{[[16,14],[64,14],[10,35],[70,35],[16,50],[64,50],[10,60]].map(([x,y],i)=><circle key={i} cx={x} cy={y} r="2" fill="#f5c842" opacity="0.6"/>)}<circle cx="40" cy="52" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="59" x2="40" y2="74" stroke="#c8a96e" strokeWidth="1"/><line x1="28" y1="60" x2="22" y2="72" stroke="#c8a96e" strokeWidth="0.8"/><ellipse cx="20" cy="74" rx="5" ry="3" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><line x1="52" y1="60" x2="58" y2="72" stroke="#c8a96e" strokeWidth="0.8"/><ellipse cx="60" cy="74" rx="5" ry="3" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><line x1="40" y1="60" x2="30" y2="66" stroke="#c8a96e" strokeWidth="0.8"/><line x1="40" y1="60" x2="50" y2="66" stroke="#c8a96e" strokeWidth="0.8"/><text x="40" y="100" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE STAR</text><text x="40" y="109" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XVII</text></svg>),
  18: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="40" cy="22" r="12" fill="none" stroke="#c8a96e" strokeWidth="1"/><circle cx="46" cy="20" r="9" fill="#0d0820"/><rect x="10" y="55" width="14" height="32" fill="none" stroke="#c8a96e" strokeWidth="1"/><path d="M10 55 L17 48 L24 55" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><rect x="56" y="55" width="14" height="32" fill="none" stroke="#c8a96e" strokeWidth="1"/><path d="M56 55 L63 48 L70 55" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><ellipse cx="26" cy="72" rx="7" ry="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="21" cy="68" r="4" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><ellipse cx="54" cy="72" rx="7" ry="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="59" cy="68" r="4" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><ellipse cx="40" cy="86" rx="14" ry="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><text x="40" y="101" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE MOON</text><text x="40" y="110" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XVIII</text></svg>),
  19: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="40" cy="24" r="14" fill="none" stroke="#f5c842" strokeWidth="1.2"/>{[0,22.5,45,67.5,90,112.5,135,157.5,180,202.5,225,247.5,270,292.5,315,337.5].map((a,i)=><line key={i} x1={40+15*Math.cos(a*Math.PI/180)} y1={24+15*Math.sin(a*Math.PI/180)} x2={40+(i%2===0?20:18)*Math.cos(a*Math.PI/180)} y2={24+(i%2===0?20:18)*Math.sin(a*Math.PI/180)} stroke="#f5c842" strokeWidth={i%2===0?"1":"0.6"}/>)}<circle cx="40" cy="62" r="7" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="69" x2="40" y2="84" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="74" x2="30" y2="78" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="74" x2="50" y2="78" stroke="#c8a96e" strokeWidth="1"/><ellipse cx="40" cy="94" rx="16" ry="6" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="26" cy="90" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><text x="40" y="110" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE SUN</text><text x="40" y="118" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XIX</text></svg>),
  20: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><circle cx="40" cy="16" r="7" fill="none" stroke="#f5c842" strokeWidth="1"/><path d="M26 22 Q20 14 28 18" fill="none" stroke="#f5c842" strokeWidth="1"/><path d="M54 22 Q60 14 52 18" fill="none" stroke="#f5c842" strokeWidth="1"/><line x1="40" y1="23" x2="40" y2="35" stroke="#c8a96e" strokeWidth="0.8"/><path d="M36 28 Q28 25 24 30 Q28 35 36 33" fill="none" stroke="#f5c842" strokeWidth="1"/><line x1="40" y1="12" x2="55" y2="12" stroke="#c8a96e" strokeWidth="0.8"/><line x1="48" y1="8" x2="48" y2="16" stroke="#c8a96e" strokeWidth="0.8"/><rect x="14" y="72" width="16" height="12" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="22" cy="68" r="4" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="22" y1="72" x2="22" y2="80" stroke="#c8a96e" strokeWidth="0.7"/><rect x="32" y="68" width="16" height="14" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="40" cy="62" r="5" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="40" y1="67" x2="40" y2="76" stroke="#c8a96e" strokeWidth="0.7"/><rect x="50" y="72" width="16" height="12" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><circle cx="58" cy="68" r="4" fill="none" stroke="#c8a96e" strokeWidth="0.8"/><line x1="58" y1="72" x2="58" y2="80" stroke="#c8a96e" strokeWidth="0.7"/><path d="M10 88 Q20 84 30 88 Q40 92 50 88 Q60 84 70 88" fill="none" stroke="#c8a96e" strokeWidth="0.7"/><text x="40" y="103" textAnchor="middle" fill="#c8a96e" fontSize="6.5" fontFamily="serif">JUDGEMENT</text><text x="40" y="112" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XX</text></svg>),
  21: (<svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg"><rect width="80" height="120" fill="#0d0820" rx="4"/><rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/><ellipse cx="40" cy="52" rx="26" ry="34" fill="none" stroke="#c8a96e" strokeWidth="1.2"/><ellipse cx="40" cy="52" rx="22" ry="30" fill="none" stroke="#c8a96e" strokeWidth="0.4"/><path d="M26 20 Q40 16 54 20" fill="none" stroke="#f5c842" strokeWidth="1.2"/><path d="M26 84 Q40 88 54 84" fill="none" stroke="#f5c842" strokeWidth="1.2"/><circle cx="40" cy="42" r="6" fill="none" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="48" x2="40" y2="64" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="55" x2="30" y2="50" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="55" x2="50" y2="60" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="64" x2="34" y2="74" stroke="#c8a96e" strokeWidth="1"/><line x1="40" y1="64" x2="48" y2="72" stroke="#c8a96e" strokeWidth="1"/><text x="40" y="106" textAnchor="middle" fill="#c8a96e" fontSize="7" fontFamily="serif">THE WORLD</text><text x="40" y="115" textAnchor="middle" fill="#c8a96e" fontSize="5" fontFamily="serif">XXI</text></svg>),
};

function CardArt({ cardId, size = "md" }) {
  const w = size === "lg" ? 100 : size === "md" ? 80 : 60;
  const h = size === "lg" ? 150 : size === "md" ? 120 : 90;
  return (
    <div style={{ width: w, height: h, flexShrink: 0 }}>
      {CARD_SVG[cardId] || (
        <svg viewBox="0 0 80 120" xmlns="http://www.w3.org/2000/svg">
          <rect width="80" height="120" fill="#0d0820" rx="4"/>
          <rect x="4" y="4" width="72" height="112" fill="none" stroke="#c8a96e" strokeWidth="0.8" rx="3"/>
          <text x="40" y="65" textAnchor="middle" fill="#c8a96e" fontSize="20">✦</text>
        </svg>
      )}
    </div>
  );
}

// ── 타로 카드 데이터 (22장 메이저 아르카나) ─────────────────
const CARDS = [
  {
    id: 0, name: "광대", nameEn: "The Fool", emoji: "🃏", number: "0",
    upright: { title: "새로운 시작", desc: "두려움 없이 새로운 출발을 맞이할 때예요. 무한한 가능성이 당신 앞에 펼쳐져 있어요. 직관을 믿고 첫 발을 내딛어보세요." },
    reversedMeaning: { title: "무모함 경고", desc: "충동적인 결정은 잠시 멈추세요. 준비 없이 뛰어들면 후회할 수 있어요. 계획을 세운 후 행동하세요." },
  },
  {
    id: 1, name: "마법사", nameEn: "The Magician", emoji: "🎩", number: "I",
    upright: { title: "의지와 창조력", desc: "당신 안에 모든 능력이 있어요. 집중하면 무엇이든 현실로 만들 수 있는 시기예요. 자신감을 가지고 행동하세요." },
    reversedMeaning: { title: "재능 낭비", desc: "가진 능력을 제대로 발휘하지 못하고 있어요. 에너지가 분산되어 있을 수 있어요. 집중력을 되찾으세요." },
  },
  {
    id: 2, name: "여사제", nameEn: "The High Priestess", emoji: "🌙", number: "II",
    upright: { title: "직관과 내면의 지혜", desc: "논리보다 직관을 믿어야 할 때예요. 숨겨진 진실이 조금씩 드러나고 있어요. 내면의 목소리에 귀 기울이세요." },
    reversedMeaning: { title: "내면 무시", desc: "중요한 신호를 놓치고 있을 수 있어요. 겉으로 보이는 것에만 집중하지 마세요. 직관을 다시 신뢰하세요." },
  },
  {
    id: 3, name: "여황제", nameEn: "The Empress", emoji: "🌸", number: "III",
    upright: { title: "풍요와 창조", desc: "풍요로운 시기가 찾아왔어요. 창의적인 에너지가 넘쳐흐르고 있어요. 자연스럽게 성장하도록 두세요." },
    reversedMeaning: { title: "창의력 고갈", desc: "자기 자신을 너무 방치하고 있어요. 내면을 돌보는 시간이 필요해요. 쉬어가는 것도 성장이에요." },
  },
  {
    id: 4, name: "황제", nameEn: "The Emperor", emoji: "👑", number: "IV",
    upright: { title: "권위와 안정", desc: "강한 기반 위에 서 있는 시기예요. 리더십을 발휘할 좋은 타이밍이에요. 책임감 있는 결정이 빛을 발해요." },
    reversedMeaning: { title: "통제 과잉", desc: "지나친 통제욕이 문제를 만들고 있어요. 유연성을 갖추고 다른 사람의 의견도 들어보세요." },
  },
  {
    id: 5, name: "교황", nameEn: "The Hierophant", emoji: "⛪", number: "V",
    upright: { title: "전통과 신뢰", desc: "검증된 방법이 지금 상황에 맞아요. 멘토나 조언자의 도움을 받는 것도 좋아요. 전통에서 지혜를 찾으세요." },
    reversedMeaning: { title: "관습 탈피", desc: "기존 방식에 갇혀 있어요. 새로운 시각으로 접근해보세요. 규칙을 재검토할 때예요." },
  },
  {
    id: 6, name: "연인", nameEn: "The Lovers", emoji: "💕", number: "VI",
    upright: { title: "사랑과 조화", desc: "중요한 선택의 기로에 서 있어요. 마음과 가치관에 따라 결정하세요. 진정한 연결과 조화를 이룰 때예요." },
    reversedMeaning: { title: "관계의 불균형", desc: "가치관 충돌이나 관계에서 불화가 있을 수 있어요. 솔직한 대화가 필요한 시기예요." },
  },
  {
    id: 7, name: "전차", nameEn: "The Chariot", emoji: "⚡", number: "VII",
    upright: { title: "승리와 의지", desc: "강한 의지력으로 장애물을 극복할 수 있어요. 목표를 향해 거침없이 나아갈 때예요. 자기 통제가 승리의 열쇠예요." },
    reversedMeaning: { title: "방향 상실", desc: "에너지가 사방으로 흩어지고 있어요. 목표를 다시 정하고 집중하세요. 무모한 돌진은 피하세요." },
  },
  {
    id: 8, name: "힘", nameEn: "Strength", emoji: "🦁", number: "VIII",
    upright: { title: "내면의 힘", desc: "폭력이나 강압이 아닌 부드러운 힘이 더 강해요. 인내와 용기로 어려움을 이겨낼 수 있어요. 자신을 믿으세요." },
    reversedMeaning: { title: "자기 의심", desc: "자신감이 떨어져 있어요. 내면의 두려움이 행동을 막고 있어요. 작은 것부터 자신감을 쌓아가세요." },
  },
  {
    id: 9, name: "은둔자", nameEn: "The Hermit", emoji: "🕯️", number: "IX",
    upright: { title: "내면 탐구", desc: "혼자만의 시간이 필요한 시기예요. 내면을 들여다보고 진정한 지혜를 찾을 때예요. 고독이 선물이 될 수 있어요." },
    reversedMeaning: { title: "고립 경고", desc: "지나친 고독이 오히려 해가 되고 있어요. 세상과 다시 연결될 시간이 됐어요. 도움을 청하는 것도 용기예요." },
  },
  {
    id: 10, name: "운명의 바퀴", nameEn: "Wheel of Fortune", emoji: "🎡", number: "X",
    upright: { title: "행운의 전환", desc: "상황이 좋은 방향으로 바뀌고 있어요. 변화의 흐름을 타세요. 운명이 당신 편이에요." },
    reversedMeaning: { title: "불운의 사이클", desc: "나쁜 운이 돌아오고 있을 수 있어요. 하지만 바퀴는 계속 돌아요. 지금의 어려움도 곧 지나가요." },
  },
  {
    id: 11, name: "정의", nameEn: "Justice", emoji: "⚖️", number: "XI",
    upright: { title: "공정한 결과", desc: "정직하고 공정한 결과가 기다리고 있어요. 진실은 반드시 드러나요. 올바른 선택을 하면 좋은 결과가 따라와요." },
    reversedMeaning: { title: "불공정", desc: "부당한 일을 경험하고 있거나 스스로 불공정한 행동을 하고 있어요. 양심에 따라 행동하세요." },
  },
  {
    id: 12, name: "매달린 사람", nameEn: "The Hanged Man", emoji: "🙃", number: "XII",
    upright: { title: "관점의 전환", desc: "잠시 멈추고 다른 시각으로 바라볼 때예요. 희생이 더 큰 이득을 가져올 수 있어요. 기다림 속에 지혜가 있어요." },
    reversedMeaning: { title: "희생 거부", desc: "필요한 변화를 미루고 있어요. 손해가 두려워 결정을 내리지 못하고 있어요. 용기 있는 결단이 필요해요." },
  },
  {
    id: 13, name: "죽음", nameEn: "Death", emoji: "🌑", number: "XIII",
    upright: { title: "끝과 새로운 시작", desc: "죽음 카드는 실제 죽음이 아니에요. 낡은 것이 끝나고 새로운 시작이 찾아와요. 변화를 두려워하지 마세요." },
    reversedMeaning: { title: "변화 저항", desc: "끝내야 할 것을 붙잡고 있어요. 변화에 저항하면 성장이 멈춰요. 놓아주는 용기가 필요해요." },
  },
  {
    id: 14, name: "절제", nameEn: "Temperance", emoji: "🌊", number: "XIV",
    upright: { title: "균형과 조화", desc: "균형 잡힌 접근이 필요해요. 극단을 피하고 중용을 찾으세요. 인내심을 갖고 천천히 나아가면 돼요." },
    reversedMeaning: { title: "과잉과 불균형", desc: "지나침이 문제예요. 극단적인 행동이나 생각이 문제를 키우고 있어요. 균형을 되찾으세요." },
  },
  {
    id: 15, name: "악마", nameEn: "The Devil", emoji: "🔗", number: "XV",
    upright: { title: "집착과 속박", desc: "무언가에 묶여 있다고 느끼고 있어요. 하지만 그 사슬은 스스로 끊을 수 있어요. 두려움과 집착에서 벗어나세요." },
    reversedMeaning: { title: "해방", desc: "오랜 속박에서 벗어나고 있어요. 나쁜 습관이나 관계를 끊을 힘이 생겼어요. 자유를 향해 나아가세요." },
  },
  {
    id: 16, name: "탑", nameEn: "The Tower", emoji: "⚡", number: "XVI",
    upright: { title: "갑작스러운 변화", desc: "예상치 못한 변화나 충격이 올 수 있어요. 하지만 무너진 자리에 더 나은 것이 세워져요. 변화를 받아들이세요." },
    reversedMeaning: { title: "피할 수 없는 변화", desc: "피하려 했던 변화가 결국 찾아오고 있어요. 저항하면 더 힘들어요. 변화의 흐름에 몸을 맡기세요." },
  },
  {
    id: 17, name: "별", nameEn: "The Star", emoji: "⭐", number: "XVII",
    upright: { title: "희망과 영감", desc: "어두운 터널 끝에 빛이 보여요. 희망을 잃지 마세요. 치유와 회복의 시기가 찾아왔어요." },
    reversedMeaning: { title: "희망 상실", desc: "믿음과 희망이 흔들리고 있어요. 스스로를 너무 가혹하게 대하고 있어요. 작은 빛에 집중해보세요." },
  },
  {
    id: 18, name: "달", nameEn: "The Moon", emoji: "🌕", number: "XVIII",
    upright: { title: "환상과 불안", desc: "보이는 것이 전부가 아닐 수 있어요. 불확실성과 두려움이 있지만 지나가는 시기예요. 직관을 믿으세요." },
    reversedMeaning: { title: "혼란 해소", desc: "오랜 혼란이 걷히기 시작해요. 진실이 드러나고 있어요. 명확해지는 시간이 다가왔어요." },
  },
  {
    id: 19, name: "태양", nameEn: "The Sun", emoji: "☀️", number: "XIX",
    upright: { title: "기쁨과 성공", desc: "밝고 긍정적인 에너지가 넘쳐요. 성공과 행복이 함께해요. 자신감을 갖고 앞으로 나아가세요." },
    reversedMeaning: { title: "일시적 흐림", desc: "일시적으로 에너지가 떨어지고 있어요. 하지만 태양은 다시 떠올라요. 잠시 쉬어가도 괜찮아요." },
  },
  {
    id: 20, name: "심판", nameEn: "Judgement", emoji: "📯", number: "XX",
    upright: { title: "각성과 재탄생", desc: "과거를 돌아보고 새로운 자신으로 거듭날 때예요. 중요한 결단의 시간이 왔어요. 소명에 응답하세요." },
    reversedMeaning: { title: "자기 비판", desc: "과거의 실수에 너무 얽매여 있어요. 자신을 용서하고 앞으로 나아갈 시간이에요." },
  },
  {
    id: 21, name: "세계", nameEn: "The World", emoji: "🌍", number: "XXI",
    upright: { title: "완성과 성취", desc: "하나의 사이클이 완성되었어요. 노력의 결실을 맺을 때예요. 성공과 성취감이 함께해요." },
    reversedMeaning: { title: "미완성", desc: "아직 마무리하지 못한 일이 있어요. 조금만 더 인내하세요. 완성은 가까이 있어요." },
  },
];

const TOPICS = [
  { id: "love", label: "💕 연애·관계", question: "연애와 관계에 대해" },
  { id: "work", label: "💼 직업·커리어", question: "직업과 커리어에 대해" },
  { id: "money", label: "💰 재물·운", question: "재물과 금전운에 대해" },
  { id: "today", label: "🌟 오늘의 운세", question: "오늘 하루에 대해" },
  { id: "mind", label: "🧘 마음·내면", question: "내 마음과 내면에 대해" },
];

const SPREADS = [
  { id: "one", label: "1장 뽑기", sub: "지금 이 순간의 메시지", count: 1, positions: ["현재"] },
  { id: "three", label: "3장 뽑기", sub: "과거·현재·미래", count: 3, positions: ["과거", "현재", "미래"] },
  { id: "cross", label: "5장 뽑기", sub: "상황·장애·조언·결과·핵심", count: 5, positions: ["현재 상황", "장애물", "조언", "결과", "핵심"] },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function drawCards(count) {
  const shuffled = shuffle(CARDS);
  return shuffled.slice(0, count).map(card => ({
    ...card,
    reversed: Math.random() > 0.5,
  }));
}

const CARD_BACKS = ["✦", "◈", "✧", "⋆", "◇"];

export default function TarotApp() {
  const [step, setStep] = useState("intro"); // intro | topic | spread | shuffle | reveal | result
  const [topic, setTopic] = useState(null);
  const [spread, setSpread] = useState(null);
  const [drawnCards, setDrawnCards] = useState([]);
  const [revealedIdx, setRevealedIdx] = useState([]);
  const [shuffling, setShuffling] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleShuffle = () => {
    setShuffling(true);
    const cards = drawCards(spread.count);
    setTimeout(() => {
      setDrawnCards(cards);
      setShuffling(false);
      setStep("reveal");
    }, 2000);
  };

  const handleReveal = (idx) => {
    if (revealedIdx.includes(idx)) return;
    const newRevealed = [...revealedIdx, idx];
    setRevealedIdx(newRevealed);
    if (newRevealed.length === drawnCards.length) {
      setTimeout(() => setStep("result"), 600);
    }
  };

  const handleShare = async () => {
    const text = drawnCards.map((c, i) =>
      `${spread.positions[i]}: ${c.name} (${c.reversed ? "역방향" : "정방향"}) - ${c.reversed ? c.reversed.title : c.upright.title}`
    ).join("\n");
    const full = `🔮 타로 카드 결과\n주제: ${topic.question}\n\n${text}`;
    if (navigator.share) {
      try { await navigator.share({ title: "타로 카드", text: full }); } catch {}
    } else {
      await navigator.clipboard.writeText(full);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const restart = () => {
    setStep("intro"); setTopic(null); setSpread(null);
    setDrawnCards([]); setRevealedIdx([]); setShuffling(false);
  };

  return (
    <div style={{ minHeight: "100vh", background: "#08050f", fontFamily: "'Noto Serif KR', serif", position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&family=Noto+Sans+KR:wght@300;400;500&display=swap');
        @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg);opacity:.2} 50%{transform:translateY(-20px) rotate(5deg);opacity:.6} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
        @keyframes popIn { 0%{transform:scale(.8) rotate(-5deg);opacity:0} 70%{transform:scale(1.05) rotate(1deg)} 100%{transform:scale(1) rotate(0deg);opacity:1} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        @keyframes shuffle1 { 0%{transform:translateX(0) rotate(0deg)} 25%{transform:translateX(-30px) rotate(-8deg)} 50%{transform:translateX(20px) rotate(5deg)} 75%{transform:translateX(-10px) rotate(-3deg)} 100%{transform:translateX(0) rotate(0deg)} }
        @keyframes shuffle2 { 0%{transform:translateX(0) rotate(0deg)} 25%{transform:translateX(25px) rotate(6deg)} 50%{transform:translateX(-20px) rotate(-4deg)} 75%{transform:translateX(15px) rotate(3deg)} 100%{transform:translateX(0) rotate(0deg)} }
        @keyframes cardFlip { 0%{transform:rotateY(0deg)} 50%{transform:rotateY(90deg)} 100%{transform:rotateY(0deg)} }
        @keyframes glow { 0%,100%{box-shadow:0 0 15px rgba(180,130,255,0.2)} 50%{box-shadow:0 0 40px rgba(180,130,255,0.5),0 0 60px rgba(100,50,200,0.2)} }
        @keyframes starTwinkle { 0%,100%{opacity:.3;transform:scale(1)} 50%{opacity:1;transform:scale(1.3)} }
        .fade-up { animation: fadeUp .5s ease both; }
        .pop-in { animation: popIn .5s cubic-bezier(.34,1.56,.64,1) both; }
        .topic-btn { transition: all .2s; cursor: pointer; }
        .topic-btn:hover { transform: translateX(6px); }
        .card-back:hover { transform: translateY(-8px) !important; cursor: pointer; }
      `}</style>

      {/* 배경 별 */}
      <div style={{ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, pointerEvents: "none", zIndex: 0 }}>
        {Array.from({ length: 40 }, (_, i) => (
          <div key={i} style={{ position: "absolute", left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: `${1 + Math.random() * 2}px`, height: `${1 + Math.random() * 2}px`, borderRadius: "50%", background: "#fff", animation: `starTwinkle ${2 + Math.random() * 3}s ${Math.random() * 3}s infinite ease-in-out` }} />
        ))}
        <div style={{ position: "absolute", top: "-200px", left: "50%", transform: "translateX(-50%)", width: "800px", height: "800px", borderRadius: "50%", background: "radial-gradient(circle, rgba(100,50,200,0.06), transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-100px", left: "20%", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(180,100,255,0.05), transparent 70%)" }} />
      </div>

      <div style={{ position: "relative", zIndex: 1, maxWidth: "460px", margin: "0 auto", padding: "0 20px 80px" }}>

        {/* ── INTRO ── */}
        {step === "intro" && (
          <div className="fade-up" style={{ textAlign: "center", paddingTop: "60px" }}>
            <div style={{ fontSize: "0.68rem", color: "#9d6fd4", letterSpacing: "0.4em", marginBottom: "20px", fontFamily: "'Noto Sans KR'" }}>TAROT CARD READING</div>

            <div style={{ position: "relative", width: "120px", height: "180px", margin: "0 auto 28px", perspective: "600px" }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "12px", transform: `rotate(${(i - 1) * 5}deg) translateY(${(i - 1) * -4}px)`, boxShadow: "0 8px 32px rgba(0,0,0,0.5)", overflow: "hidden", animation: i === 1 ? "glow 2s ease-in-out infinite" : "none" }}>
                  <CardBack width={120} height={180} />
                </div>
              ))}
            </div>

            <h1 style={{ fontSize: "2rem", fontWeight: 900, color: "#f0e6ff", lineHeight: 1.2, marginBottom: "10px" }}>
              타로 카드<br />
              <span style={{ background: "linear-gradient(90deg, #c084fc, #818cf8, #f472b6)", backgroundSize: "200%", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 3s linear infinite" }}>오늘의 메시지</span>
            </h1>
            <p style={{ color: "#6b5a8a", fontSize: "0.88rem", lineHeight: 1.7, marginBottom: "36px", fontFamily: "'Noto Sans KR'" }}>
              22장의 메이저 아르카나가<br />당신에게 전하는 이야기
            </p>

            <div style={{ background: "rgba(180,130,255,0.05)", border: "1px solid rgba(180,130,255,0.15)", borderRadius: "16px", padding: "18px", marginBottom: "28px", textAlign: "left", fontFamily: "'Noto Sans KR'" }}>
              {["정방향 — 카드의 본래 의미", "역방향 — 에너지가 약해지거나 반전된 의미", "3가지 스프레드 방식 선택 가능"].map((t, i) => (
                <div key={i} style={{ display: "flex", gap: "10px", marginBottom: i < 2 ? "10px" : 0, alignItems: "flex-start" }}>
                  <span style={{ color: "#c084fc", fontSize: "0.65rem", marginTop: "3px" }}>✦</span>
                  <span style={{ color: "#8a7aaa", fontSize: "0.82rem" }}>{t}</span>
                </div>
              ))}
            </div>

            <button onClick={() => setStep("topic")} style={{ width: "100%", padding: "17px", background: "linear-gradient(135deg, #6d28d9, #9333ea)", border: "none", borderRadius: "14px", color: "#fff", fontFamily: "'Noto Serif KR', serif", fontSize: "1.05rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 32px rgba(109,40,217,0.4)", letterSpacing: "0.05em", animation: "glow 2s ease-in-out infinite" }}>
              🔮 카드 뽑기 시작
            </button>
          </div>
        )}

        {/* ── TOPIC ── */}
        {step === "topic" && (
          <div className="fade-up" style={{ paddingTop: "52px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "0.68rem", color: "#9d6fd4", letterSpacing: "0.2em", marginBottom: "8px", fontFamily: "'Noto Sans KR'" }}>STEP 1</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f0e6ff" }}>무엇이 궁금하세요?</h2>
              <p style={{ color: "#6b5a8a", fontSize: "0.82rem", marginTop: "6px", fontFamily: "'Noto Sans KR'" }}>주제를 선택하면 더 깊은 해석이 가능해요</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {TOPICS.map(t => (
                <button key={t.id} className="topic-btn" onClick={() => { setTopic(t); setStep("spread"); }} style={{ padding: "18px 20px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,130,255,0.15)", borderRadius: "14px", color: "#c8b8e8", fontFamily: "'Noto Serif KR', serif", fontSize: "0.95rem", textAlign: "left", cursor: "pointer", display: "flex", alignItems: "center", gap: "12px" }}>
                  <span style={{ fontSize: "1.2rem" }}>{t.label.split(" ")[0]}</span>
                  <span>{t.label.split(" ").slice(1).join(" ")}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── SPREAD ── */}
        {step === "spread" && (
          <div className="fade-up" style={{ paddingTop: "52px" }}>
            <div style={{ textAlign: "center", marginBottom: "28px" }}>
              <div style={{ fontSize: "0.68rem", color: "#9d6fd4", letterSpacing: "0.2em", marginBottom: "8px", fontFamily: "'Noto Sans KR'" }}>STEP 2</div>
              <h2 style={{ fontSize: "1.5rem", fontWeight: 700, color: "#f0e6ff" }}>스프레드 선택</h2>
              <p style={{ color: "#6b5a8a", fontSize: "0.82rem", marginTop: "6px", fontFamily: "'Noto Sans KR'" }}>몇 장을 뽑을까요?</p>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              {SPREADS.map(s => (
                <button key={s.id} className="topic-btn" onClick={() => { setSpread(s); setStep("shuffle"); }} style={{ padding: "20px 22px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(180,130,255,0.15)", borderRadius: "16px", color: "#f0e6ff", fontFamily: "'Noto Serif KR', serif", fontSize: "1rem", textAlign: "left", cursor: "pointer" }}>
                  <div style={{ fontWeight: 700, marginBottom: "4px" }}>{s.label}</div>
                  <div style={{ fontSize: "0.78rem", color: "#6b5a8a", fontFamily: "'Noto Sans KR'" }}>{s.sub}</div>
                  <div style={{ display: "flex", gap: "6px", marginTop: "10px" }}>
                    {s.positions.map(p => (
                      <span key={p} style={{ background: "rgba(180,130,255,0.1)", border: "1px solid rgba(180,130,255,0.2)", borderRadius: "999px", padding: "2px 8px", fontSize: "0.68rem", color: "#c084fc", fontFamily: "'Noto Sans KR'" }}>{p}</span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ── SHUFFLE ── */}
        {step === "shuffle" && (
          <div className="fade-up" style={{ paddingTop: "52px", textAlign: "center" }}>
            <div style={{ fontSize: "0.68rem", color: "#9d6fd4", letterSpacing: "0.2em", marginBottom: "20px", fontFamily: "'Noto Sans KR'" }}>STEP 3</div>
            <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f0e6ff", marginBottom: "8px" }}>마음을 집중하세요</h2>
            <p style={{ color: "#6b5a8a", fontSize: "0.82rem", marginBottom: "8px", fontFamily: "'Noto Sans KR'" }}>{topic?.question} 질문하며</p>
            <p style={{ color: "#9d6fd4", fontSize: "0.82rem", marginBottom: "40px", fontFamily: "'Noto Sans KR'" }}>카드를 섞어주세요</p>

            {/* 카드 덱 */}
            <div style={{ position: "relative", width: "120px", height: "180px", margin: "0 auto 40px", perspective: "600px" }}>
              {[0, 1, 2, 3, 4].map(i => (
                <div key={i} style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, borderRadius: "12px", transform: `rotate(${(i - 2) * 3}deg) translateY(${(i - 2) * -3}px)`, animation: shuffling ? `${i % 2 === 0 ? "shuffle1" : "shuffle2"} .5s ${i * 0.08}s ease-in-out infinite` : "none", boxShadow: "0 4px 20px rgba(0,0,0,0.4)", overflow: "hidden" }}>
                  <CardBack width={120} height={180} />
                </div>
              ))}
            </div>

            {!shuffling ? (
              <button onClick={handleShuffle} style={{ padding: "16px 48px", background: "linear-gradient(135deg, #6d28d9, #9333ea)", border: "none", borderRadius: "14px", color: "#fff", fontFamily: "'Noto Serif KR', serif", fontSize: "1rem", fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(109,40,217,0.4)", animation: "glow 2s ease-in-out infinite" }}>
                ✨ 카드 섞기
              </button>
            ) : (
              <div>
                <p style={{ color: "#c084fc", fontSize: "0.88rem", fontFamily: "'Noto Sans KR'", marginBottom: "8px" }}>카드를 섞는 중...</p>
                <div style={{ display: "flex", justifyContent: "center", gap: "6px" }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#c084fc", animation: `starTwinkle 0.6s ${i * 0.2}s ease-in-out infinite` }} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── REVEAL ── */}
        {step === "reveal" && (
          <div className="fade-up" style={{ paddingTop: "44px" }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <h2 style={{ fontSize: "1.3rem", fontWeight: 700, color: "#f0e6ff", marginBottom: "6px" }}>카드를 한 장씩 뒤집어보세요</h2>
              <p style={{ color: "#6b5a8a", fontSize: "0.8rem", fontFamily: "'Noto Sans KR'" }}>{revealedIdx.length} / {drawnCards.length}장 공개됨</p>
            </div>

            <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              {drawnCards.map((card, idx) => (
                <div key={idx} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
                  <span style={{ fontSize: "0.68rem", color: "#9d6fd4", fontFamily: "'Noto Sans KR'", letterSpacing: "0.05em" }}>{spread.positions[idx]}</span>
                  <div
                    className={!revealedIdx.includes(idx) ? "card-back" : ""}
                    onClick={() => handleReveal(idx)}
                    style={{
                      width: drawnCards.length === 1 ? "140px" : drawnCards.length <= 3 ? "110px" : "80px",
                      height: drawnCards.length === 1 ? "210px" : drawnCards.length <= 3 ? "165px" : "120px",
                      background: revealedIdx.includes(idx)
                        ? `linear-gradient(160deg, ${card.reversed ? "#2a0a0a" : "#0a1a2a"}, ${card.reversed ? "#1a0505" : "#050d15"})`
                        : "linear-gradient(160deg, #2a1a4a, #1a0d30)",
                      border: `1px solid ${revealedIdx.includes(idx) ? (card.reversed ? "rgba(255,100,100,0.3)" : "rgba(100,180,255,0.3)") : "rgba(180,130,255,0.3)"}`,
                      borderRadius: "12px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: revealedIdx.includes(idx) ? "default" : "pointer",
                      transform: "none",
                      transition: "all 0.4s ease",
                      boxShadow: revealedIdx.includes(idx) ? `0 8px 24px ${card.reversed ? "rgba(255,100,100,0.15)" : "rgba(100,180,255,0.15)"}` : "0 4px 16px rgba(0,0,0,0.4)",
                      animation: revealedIdx.includes(idx) ? "popIn .4s ease both" : "none",
                    }}
                  >
                    {revealedIdx.includes(idx) ? (
                      <CardArt cardId={card.id} size={drawnCards.length === 1 ? "lg" : drawnCards.length <= 3 ? "md" : "sm"} reversed={card.reversed} />
                    ) : (
                      <CardBack width={drawnCards.length === 1 ? 100 : drawnCards.length <= 3 ? 80 : 60} height={drawnCards.length === 1 ? 150 : drawnCards.length <= 3 ? 120 : 90} />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── RESULT ── */}
        {step === "result" && (
          <div style={{ paddingTop: "36px" }}>
            <div className="fade-up" style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{ fontSize: "0.68rem", color: "#9d6fd4", letterSpacing: "0.2em", marginBottom: "8px", fontFamily: "'Noto Sans KR'" }}>✦ 카드 해석 ✦</div>
              <h2 style={{ fontSize: "1.4rem", fontWeight: 700, color: "#f0e6ff", marginBottom: "4px" }}>{topic?.question}</h2>
              <p style={{ color: "#6b5a8a", fontSize: "0.78rem", fontFamily: "'Noto Sans KR'" }}>{spread.label} · {spread.sub}</p>
            </div>

            {drawnCards.map((card, idx) => {
              const meaning = card.reversed ? card.reversedMeaning : card.upright;
              return (
                <div key={idx} className="fade-up" style={{ background: card.reversed ? "rgba(60,15,15,0.85)" : "rgba(15,20,50,0.85)", border: `1px solid ${card.reversed ? "rgba(255,120,120,0.35)" : "rgba(120,160,255,0.35)"}`, borderRadius: "20px", padding: "20px", marginBottom: "12px", animationDelay: `${idx * 0.1}s` }}>
                  {/* 카드 헤더 */}
                  <div style={{ display: "flex", alignItems: "center", gap: "14px", marginBottom: "14px" }}>
                    <div style={{ flexShrink: 0, transform: card.reversed ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>
                      <CardArt cardId={card.id} size="sm" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "0.68rem", color: "#b0a0cc", fontFamily: "'Noto Sans KR'", fontWeight: 500 }}>{spread.positions[idx]}</span>
                        <span style={{ fontSize: "0.62rem", background: card.reversed ? "rgba(255,100,100,0.25)" : "rgba(100,150,255,0.25)", color: card.reversed ? "#ffaaaa" : "#aaccff", padding: "2px 8px", borderRadius: "999px", fontFamily: "'Noto Sans KR'", fontWeight: 600 }}>{card.reversed ? "역방향 ▼" : "정방향 ▲"}</span>
                      </div>
                      <div style={{ fontSize: "1.1rem", fontWeight: 700, color: "#ffffff", marginBottom: "4px" }}>{card.name}</div>
                      <div style={{ fontSize: "0.8rem", color: card.reversed ? "#ffbbbb" : "#aaddff", fontFamily: "'Noto Sans KR'", fontWeight: 600 }}>{meaning.title}</div>
                    </div>
                  </div>
                  {/* 해석 */}
                  <p style={{ color: "#ddd0f0", fontSize: "0.88rem", lineHeight: 1.85, margin: 0, fontFamily: "'Noto Sans KR'" }}>{meaning.desc}</p>
                </div>
              );
            })}

            {/* 종합 메시지 */}
            <div className="fade-up" style={{ background: "rgba(180,130,255,0.05)", border: "1px solid rgba(180,130,255,0.2)", borderRadius: "16px", padding: "20px", marginBottom: "16px", animationDelay: `${drawnCards.length * 0.1 + 0.1}s` }}>
              <div style={{ fontSize: "0.68rem", color: "#c084fc", marginBottom: "12px", fontFamily: "'Noto Sans KR'", fontWeight: 700, letterSpacing: "0.1em" }}>✦ 종합 메시지</div>
              {(() => {
                const uprightCount = drawnCards.filter(c => !c.reversed).length;
                const reversedCount = drawnCards.filter(c => c.reversed).length;
                const total = drawnCards.length;
                const cardNames = drawnCards.map(c => c.name).join(", ");
                const topicLabel = topic?.question || "지금 이 순간";

                let mainMsg = "";
                let actionMsg = "";
                let closingMsg = "";

                if (uprightCount === total) {
                  mainMsg = `뽑힌 카드 ${total}장이 모두 정방향으로 나왔어요. ${cardNames}이(가) 함께 강력한 긍정의 메시지를 전하고 있어요. 지금 이 시기는 에너지가 활발하게 흐르고 있으며, 당신이 향하고 있는 방향이 맞다는 신호예요.`;
                  actionMsg = `${topicLabel}에 관해서 두려움 없이 앞으로 나아가도 좋을 때예요. 카드들이 모두 같은 방향을 가리키고 있다는 건 드문 일이에요. 지금 내리는 결정과 행동들이 좋은 결실로 이어질 가능성이 높아요.`;
                  closingMsg = "용기 있게 한 걸음 내딛어보세요. 우주가 당신 편이에요.";
                } else if (reversedCount === total) {
                  mainMsg = `${total}장 모두 역방향으로 나왔어요. ${cardNames}이(가) 전하는 메시지는 지금 당장 행동하기보다 잠시 멈추고 내면을 돌아보라는 신호예요. 에너지가 안으로 향하고 있어요.`;
                  actionMsg = `${topicLabel}에 관해서는 서두르지 않는 것이 좋겠어요. 막혀있다고 느끼거나 상황이 뜻대로 되지 않는다면, 그것은 더 준비가 필요하다는 신호일 수 있어요. 지금은 내면의 목소리에 귀 기울이며 재정비하는 시간을 가져보세요.`;
                  closingMsg = "모든 시련은 성장의 씨앗이에요. 지금의 멈춤이 더 큰 도약을 위한 준비예요.";
                } else if (uprightCount > reversedCount) {
                  mainMsg = `전반적으로 긍정적인 흐름 속에서 일부 주의해야 할 부분도 보여요. ${cardNames} — 이 카드들의 조합은 당신이 올바른 방향으로 가고 있지만, 놓치고 있는 부분도 있다는 것을 알려줘요.`;
                  actionMsg = `${topicLabel}에 관해서는 자신감을 가져도 좋지만, 역방향으로 나온 카드가 경고하는 부분도 함께 살펴보세요. 전진과 성찰을 균형있게 유지하는 것이 지금 당신에게 필요한 태도예요.`;
                  closingMsg = "빛과 그림자를 모두 받아들이는 지혜가 당신을 더 단단하게 만들어줄 거예요.";
                } else {
                  mainMsg = `변화와 성찰이 필요한 시기임을 카드들이 이야기하고 있어요. ${cardNames} — 역방향 카드가 많다는 것은 에너지가 내면으로 향하고 있다는 뜻이에요. 지금은 외부 행동보다 내면의 작업이 더 중요한 시기예요.`;
                  actionMsg = `${topicLabel}에 관해서는 지금 당장 결론을 내리려 하지 마세요. 무언가 해결되지 않은 감정이나 상황이 있다면 그것을 먼저 들여다보는 것이 우선이에요. 인내심을 갖고 기다리면 자연스럽게 길이 열릴 거예요.`;
                  closingMsg = "가장 어두운 밤이 지나면 새벽이 와요. 지금의 성찰이 내일의 지혜가 될 거예요.";
                }

                return (
                  <div>
                    <p style={{ color: "#c8b8e8", fontSize: "0.86rem", lineHeight: 1.85, margin: "0 0 10px", fontFamily: "'Noto Sans KR'" }}>{mainMsg}</p>
                    <p style={{ color: "#9d8fbb", fontSize: "0.84rem", lineHeight: 1.85, margin: "0 0 12px", fontFamily: "'Noto Sans KR'" }}>{actionMsg}</p>
                    <div style={{ borderTop: "1px solid rgba(180,130,255,0.15)", paddingTop: "12px" }}>
                      <p style={{ color: "#c084fc", fontSize: "0.82rem", lineHeight: 1.7, margin: 0, fontFamily: "'Noto Serif KR', serif", fontStyle: "italic", textAlign: "center" }}>✦ {closingMsg} ✦</p>
                    </div>
                    <p style={{ color: "#4a3a6a", fontSize: "0.72rem", lineHeight: 1.6, margin: "10px 0 0", fontFamily: "'Noto Sans KR'" }}>타로 카드는 미래를 예언하는 것이 아니라, 지금 이 순간 내면의 지혜를 일깨워주는 도구예요. 결국 모든 선택과 방향은 당신 안에 있어요.</p>
                  </div>
                );
              })()}
            </div>

            <button onClick={handleShare} style={{ width: "100%", padding: "15px", background: copied ? "#16a34a" : "linear-gradient(135deg, #6d28d9, #9333ea)", border: "none", borderRadius: "13px", color: "#fff", fontFamily: "'Noto Serif KR', serif", fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", marginBottom: "10px", transition: "background .3s", boxShadow: "0 8px 24px rgba(109,40,217,0.3)" }}>
              {copied ? "✓ 복사됐어요!" : "📤 결과 공유하기"}
            </button>
            <button onClick={restart} style={{ width: "100%", padding: "13px", background: "transparent", border: "1px solid rgba(180,130,255,0.15)", borderRadius: "13px", color: "#6b5a8a", fontFamily: "'Noto Sans KR', sans-serif", fontSize: "0.88rem", cursor: "pointer" }}>
              다시 뽑기
            </button>
            <p style={{ color: "#2a1a3a", fontSize: "0.7rem", textAlign: "center", marginTop: "14px", fontFamily: "'Noto Sans KR'" }}>재미로 즐기는 콘텐츠예요 🔮</p>
          </div>
        )}
      </div>
    </div>
  );
}

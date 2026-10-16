import React from 'react';

// Original Hero outline, before the interactive flower snaps its nodes to the page grid.
const contour='M120 130 C20 140 20 60 75 65 C45 0 140 0 140 65 C200 5 235 95 165 115 C230 160 160 210 135 155 C80 215 35 160 120 130Z';
const nodes=[[65,84],[88,44],[112,67],[151,81],[179,91],[146,114],[109,102],[76,113],[119,137],[156,153],[112,163],[87,151],[59,101],[166,132],[95,78],[132,89]];
// Fixed ink knockouts: irregular, non-repeating flecks, with no gradient or filter.
const grain=Array.from({length:270},(_,i)=>{
  const x=25+((i*73.31+i*i*1.17)%181),y=14+((i*47.73+i*i*.53)%180);
  return <circle key={i} cx={x} cy={y} r={i%11===0?1.25:i%3===0?.65:.32} fill="black"/>;
});

export default function AboutStudy() {
  return <div className="about-study" aria-label="Flower study: graphic, visual, 3D and motion">
    <svg viewBox="0 0 180 228" fill="none" aria-hidden="true">
      <defs><mask id="botanical-ink" maskUnits="userSpaceOnUse" x="20" y="0" width="200" height="220"><path d={contour} fill="white"/>{grain}</mask></defs>
      <g transform="translate(10 29) scale(.72)">
        <path d="M120 130 Q145 200 112 250 M125 195 Q175 165 180 190 Q160 217 125 211" stroke="#E78267" strokeWidth="1.3"/>
        <path d={contour} fill="#EB957C" mask="url(#botanical-ink)"/>
        <g stroke="#FFF9EE" strokeWidth=".85"><path d="M65 84 95 78 109 102 146 114 M88 44 112 67 M76 113 87 151 112 163 M151 81 179 91 M119 137 156 153"/></g>
        <g fill="#FFF9EE">{nodes.map(([cx,cy],i)=><circle key={i} cx={cx} cy={cy} r={i%4===0?2.5:2}/>)}</g>
        <path d="M123 74 H131 M127 70 V78" stroke="#FFF9EE" strokeWidth=".65"/>
      </g>
      <g className="botanical-guides" strokeWidth=".6"><path d="M2 29 H43 L57 89 M178 31 H139 L119 87 M2 193 H53 L73 138 M178 199 H149 L122 139"/><path d="M88 182 V210" strokeDasharray="2 4"/></g>
      <g className="botanical-labels"><text x="2" y="22">01 / GRAPHIC</text><text x="178" y="22" textAnchor="end">02 / VISUAL</text><text x="2" y="209">03 / 3D</text><text x="178" y="215" textAnchor="end">04 / MOTION</text></g>
    </svg>
  </div>;
}

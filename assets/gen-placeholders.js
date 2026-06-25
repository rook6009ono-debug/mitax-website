/* プレースホルダー画像（SVG）一括生成スクリプト
   実行: node assets/gen-placeholders.js
   ※ 本番では assets/images/ 内の各ファイルを実写真に差し替えてください。 */
const fs = require("fs");
const path = require("path");

const outDir = path.join(__dirname, "images");
fs.mkdirSync(outDir, { recursive: true });

function svg({ c1, c2, ac, label, sub, dim }) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${label} 写真プレースホルダー">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${c1}"/>
      <stop offset="1" stop-color="${c2}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.7" cy="0.25" r="0.9">
      <stop offset="0" stop-color="${ac}" stop-opacity="0.35"/>
      <stop offset="1" stop-color="${ac}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1600" height="1000" fill="url(#bg)"/>
  <rect width="1600" height="1000" fill="url(#glow)"/>
  <g fill="none" stroke="#ffffff" stroke-opacity="0.10" stroke-width="2.5">
    <path d="M0,640 C 240,560 420,740 660,650 C 900,560 1100,740 1340,650 C 1460,610 1540,650 1600,630"/>
    <path d="M0,720 C 260,650 460,810 700,720 C 940,630 1140,810 1380,720 C 1480,690 1560,720 1600,705"/>
    <path d="M0,560 C 220,500 400,640 640,560 C 880,480 1080,640 1320,560 C 1450,525 1540,555 1600,540"/>
  </g>
  <g fill="none" stroke="${ac}" stroke-opacity="0.18" stroke-width="2.5">
    <path d="M0,800 C 280,730 480,880 760,800 C 1020,725 1220,880 1480,800 C 1540,785 1580,795 1600,790"/>
  </g>
  <g transform="translate(800,430)">
    <rect x="-78" y="-58" width="156" height="120" rx="16" fill="none" stroke="#ffffff" stroke-opacity="0.55" stroke-width="4"/>
    <circle cx="-34" cy="-18" r="16" fill="#ffffff" fill-opacity="0.6"/>
    <path d="M-66,52 L-12,4 L24,34 L60,-8 L78,52 Z" fill="#ffffff" fill-opacity="0.45"/>
  </g>
  <g text-anchor="middle" font-family="'Outfit','Helvetica Neue',Arial,sans-serif">
    <text x="800" y="600" fill="#ffffff" fill-opacity="0.92" font-size="46" font-weight="700" letter-spacing="6">${label}</text>
    <text x="800" y="660" fill="#ffffff" fill-opacity="0.7" font-size="27" font-weight="400" font-family="'Noto Sans JP',sans-serif">${sub}</text>
    <text x="800" y="712" fill="${ac}" fill-opacity="0.95" font-size="23" font-weight="500" letter-spacing="2">${dim}</text>
  </g>
</svg>`;
}

// カラーパレット
const NAVY = { c1: "#0a2540", c2: "#16487a", ac: "#4faee0" };
const DEEP = { c1: "#061a30", c2: "#103a5e", ac: "#82c7ec" };
const BLUE = { c1: "#1773b8", c2: "#2a93d5", ac: "#bfe2f6" };
const TEAL = { c1: "#0e3a55", c2: "#1f7fb0", ac: "#9ad7f0" };
const STEEL = { c1: "#0c2c4a", c2: "#1c5f93", ac: "#7ec8ec" };

const items = [
  // メインビジュアル系
  { file: "hero.svg",         ...DEEP,  label: "MAIN VISUAL",  sub: "TOPページ メイン写真",       dim: "推奨 1920 × 1080px 以上" },
  { file: "recruit-hero.svg", ...BLUE,  label: "RECRUIT",      sub: "採用ページ メイン写真",       dim: "推奨 1920 × 1080px 以上" },
  { file: "cta.svg",          ...NAVY,  label: "BACKGROUND",   sub: "CTA背景 写真",                dim: "推奨 1920 × 800px" },
  { file: "about.svg",        ...STEEL, label: "ABOUT",        sub: "会社・チーム写真",            dim: "推奨 1200 × 1000px" },
  { file: "message.svg",      ...NAVY,  label: "MESSAGE",      sub: "代表者の写真（縦長）",        dim: "推奨 900 × 1100px" },
  { file: "recruit-life.svg", ...TEAL,  label: "WORK STYLE",   sub: "働く環境の写真",              dim: "推奨 1200 × 900px" },

  // 事業内容（5つ）
  { file: "biz-1.svg", ...NAVY,  label: "BUSINESS 01", sub: "給排水・衛生設備工事", dim: "推奨 1200 × 825px" },
  { file: "biz-2.svg", ...STEEL, label: "BUSINESS 02", sub: "空調・工場設備工事",   dim: "推奨 1200 × 825px" },
  { file: "biz-3.svg", ...BLUE,  label: "BUSINESS 03", sub: "リフォーム工事",       dim: "推奨 1200 × 825px" },
  { file: "biz-4.svg", ...TEAL,  label: "BUSINESS 04", sub: "イベント事業",         dim: "推奨 1200 × 825px" },
  { file: "biz-5.svg", ...DEEP,  label: "BUSINESS 05", sub: "排水管洗浄工事",       dim: "推奨 1200 × 825px" },

  // 施工実績（6つ）
  { file: "work-1.svg", ...DEEP,  label: "WORKS 01", sub: "施工実績 写真", dim: "推奨 1200 × 900px" },
  { file: "work-2.svg", ...STEEL, label: "WORKS 02", sub: "施工実績 写真", dim: "推奨 1200 × 900px" },
  { file: "work-3.svg", ...BLUE,  label: "WORKS 03", sub: "施工実績 写真", dim: "推奨 1200 × 900px" },
  { file: "work-4.svg", ...TEAL,  label: "WORKS 04", sub: "施工実績 写真", dim: "推奨 1200 × 900px" },
  { file: "work-5.svg", ...NAVY,  label: "WORKS 05", sub: "施工実績 写真", dim: "推奨 1200 × 900px" },
  { file: "work-6.svg", ...STEEL, label: "WORKS 06", sub: "施工実績 写真", dim: "推奨 1200 × 900px" },

  // 社員（縦 4:5）
  { file: "person-1.svg", ...STEEL, label: "STAFF 01", sub: "社員写真（縦 4:5）", dim: "推奨 800 × 1000px" },
  { file: "person-2.svg", ...BLUE,  label: "STAFF 02", sub: "社員写真（縦 4:5）", dim: "推奨 800 × 1000px" },
  { file: "person-3.svg", ...TEAL,  label: "STAFF 03", sub: "社員写真（縦 4:5）", dim: "推奨 800 × 1000px" },
  { file: "person-4.svg", ...DEEP,  label: "STAFF 04", sub: "社員写真（縦 4:5）", dim: "推奨 800 × 1000px" },
];

items.forEach((it) => {
  const markup = svg(it);
  fs.writeFileSync(path.join(outDir, it.file), markup, "utf8");
});

console.log("Generated " + items.length + " placeholder SVGs in assets/images/");

const fs = require("fs");
const path = require("path");

// Failai, kuriuos taisom
const roots = [path.join(process.cwd(), "src"), path.join(process.cwd(), "public")];
const exts  = new Set([".js",".jsx",".ts",".tsx",".css",".html"]);

// Tipinės UTF-8→latin1 „mojibake“ sekos -> teisingi LT simboliai
const MAP = {
  "Ä…":"\u0105","Ä„":"\u0104", // ą Ą
  "Ä�":"\u010D","ÄŒ":"\u010C", // č Č
  "Ä™":"\u0119","Ä˜":"\u0118", // ę Ę
  "Ä—":"\u0117","Ä–":"\u0116", // ė Ė
  "Ä¯":"\u012F","Ä®":"\u012E", // į Į
  "Å¡":"\u0161","Å ":"\u0160", // š Š
  "Å³":"\u0173","Å²":"\u0172", // ų Ų
  "Å«":"\u016B","Åª":"\u016A", // ū Ū
  "Å¾":"\u017E","Å½":"\u017D", // ž Ž
  "Ã„":"Ä","Ã¤":"ä","Ã…":"Å","Ã¥":"å", // apsauga nuo tarpinių būsenų
  "Â ":" ", "Â·":"·", // NBSP ir pan.
  "â€“":"-","â€”":"-",
  "â€ž":"\u201E","â€œ":"\u201C","â€�":"\u201D","â€™":"'","â€˜":"'","â€¢":"•"
};

function fixText(s){
  // nuimame BOM jei yra
  if (s.charCodeAt(0) === 0xFEFF) s = s.slice(1);
  // pabandome atstatyti, jei UTF-8 baitai buvo perskaityti kaip latin1/CP1252
  const asLatin1 = Buffer.from(s, "latin1").toString("utf8");
  // parenkam variantą, kuriame daugiau LT raidžių
  const score = t => (t.match(/[ĄČĘĖĮŠŲŪŽąćęėįšųūž]/g)||[]).length;
  let best = score(asLatin1) >= score(s) ? asLatin1 : s;

  // papildoma pakopa: per MAP
  for (const [bad, good] of Object.entries(MAP)) {
    best = best.split(bad).join(good);
  }
  return best;
}

function walk(dir){
  for (const name of fs.readdirSync(dir)) {
    const p = path.join(dir, name);
    const st = fs.statSync(p);
    if (st.isDirectory()) walk(p);
    else if (exts.has(path.extname(p))) {
      const raw = fs.readFileSync(p, "utf8");
      const fixed = fixText(raw);
      if (fixed !== raw) {
        fs.writeFileSync(p, fixed, { encoding: "utf8" }); // UTF-8 be BOM
        console.log("fixed:", p);
      }
    }
  }
}

for (const r of roots) if (fs.existsSync(r)) walk(r);

console.log("Done. Jei naršyklė atidaryta – padaryk Hard Reload (Ctrl+F5).");

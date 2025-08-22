export const ORGS_KEY = "dnsb-orgs-v1";
export function readOrgs(){ try{ const raw = localStorage.getItem(ORGS_KEY); return raw ? JSON.parse(raw) : []; }catch(_){ return []; } }
export function writeOrgs(list){ try{ localStorage.setItem(ORGS_KEY, JSON.stringify(Array.isArray(list)? list : [])); }catch(_){ } }
export function exportJSON(state){
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `dnsb-mini-${new Date().toISOString().slice(0,10)}.json`;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 0); // kodÃ„â€”l: atlaisvinti URL
}

export async function importJSON(setState){
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = ".json,application/json";
  inp.onchange = async () => {
    const file = inp.files?.[0];
    if (!file) return;
    try{
      const obj = JSON.parse(await file.text());
      if (!obj || typeof obj !== "object" || !("settings" in obj)) throw new Error("Neteisingas failas");
      setState(() => obj);
    }catch(e){
      alert("Nepavyko importuoti: " + (e?.message || e));
    }
  };
  inp.click();
}

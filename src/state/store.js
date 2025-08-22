const STORAGE_KEY = "dnsb-mini-state-v7";

const seedState = {
  role: "",
  selectedOrgId: "",
  orgs: [
    { id: "org1", name: "DNSB „Aušros 5“" }
  ],
  owners: [],
  flats: [],
  tariffs: []
};

export const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const obj = raw ? JSON.parse(raw) : null;
    if (obj && typeof obj === "object") return obj;
  } catch {}
  return seedState;
};

export const saveState = (s) => {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
};

export const resetState = () => {
  saveState(seedState);
  return seedState;
};
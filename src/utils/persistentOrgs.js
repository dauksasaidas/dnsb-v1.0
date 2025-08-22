import React from "react";

// Stabilus raktas – jo nekeičiam, kad sąrašas niekada „neišgaruotų“
export const ORGS_KEY   = "dnsb-orgs-v1";
export const TRASH_KEY  = "dnsb-orgs-trash-v1";
export const BACKUP_KEY = "dnsb-orgs-v1.bak";

export const loadOrgs = () => {
  try { return JSON.parse(localStorage.getItem(ORGS_KEY) || "[]"); }
  catch { return []; }
};

export const saveOrgs = (arr) => {
  const clean = Array.isArray(arr) ? arr.filter(Boolean) : [];
  const json  = JSON.stringify(clean);
  localStorage.setItem(ORGS_KEY, json);
  localStorage.setItem(BACKUP_KEY, json); // mini atsarginė
};

export const loadTrash = () => {
  try { return JSON.parse(localStorage.getItem(TRASH_KEY) || "[]"); }
  catch { return []; }
};
export const saveTrash = (arr) => {
  const json = JSON.stringify(Array.isArray(arr) ? arr : []);
  localStorage.setItem(TRASH_KEY, json);
};

// De-dupe pagal id; paskutinis laimi
export const mergeOrgs = (a = [], b = []) => {
  const m = new Map();
  [...a, ...b].forEach(o => {
    if (!o || !o.id) return;
    m.set(o.id, { ...(m.get(o.id) || {}), ...o });
  });
  return [...m.values()];
};

// Pagrindinis hook'as – įsijungia per vieną eilutę App.jsx
export const usePersistentOrgs = (state, setState) => {
  // 1) Paleidimo metu: sujungiam state.orgs su tuo, kas yra naršyklėje
  React.useEffect(() => {
    const stored  = loadOrgs();
    const inState = state?.orgs || state?.dnsbList || [];

    if (stored.length === 0 && inState.length > 0) {
      saveOrgs(inState);
    } else if (stored.length > 0 && inState.length === 0) {
      setState(s => ({ ...s, orgs: stored }));
    } else if (stored.length > 0 && inState.length > 0) {
      const merged = mergeOrgs(inState, stored);
      const changeS = merged.length !== inState.length;
      const changeL = merged.length !== stored.length;
      if (changeS) setState(s => ({ ...s, orgs: merged }));
      if (changeL) saveOrgs(merged);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // tik kartą

  // 2) Kiekvieno pasikeitimo metu – ĮRAŠOM, bet niekada neužrašom ne-tuščio sąrašo tuščiu
  React.useEffect(() => {
    const cur = state?.orgs || [];
    const stored = loadOrgs();
    if (cur.length === 0 && stored.length > 0) {
      // apsauga: nekasom ne-tuščio persistent sąrašo su tuščiu state.orgs
      return;
    }
    saveOrgs(cur);
  }, [state?.orgs]);
};
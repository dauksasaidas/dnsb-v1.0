import React from "react";

const KEY = "dnsb-orgs-v1";

const read = () => {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); }
  catch { return []; }
};

const write = (arr) => {
  const safe = Array.isArray(arr) ? arr.filter(Boolean) : [];
  localStorage.setItem(KEY, JSON.stringify(safe));
};

export default function OrgsPersist({ state, setState }) {
  const hadNonEmpty = React.useRef(false);

  const stateOrgs = Array.isArray(state?.orgs) ? state.orgs : [];
  const stateDnsb = Array.isArray(state?.dnsbList) ? state.dnsbList : [];

  const merged = React.useMemo(() => {
    const m = new Map();
    [...stateOrgs, ...stateDnsb].filter(Boolean).forEach(o => {
      const id = o?.id || o?.name || JSON.stringify(o);
      m.set(id, { ...(m.get(id) || {}), ...o });
    });
    return [...m.values()];
  }, [stateOrgs, stateDnsb]);

  // 1) Startuojant: jei state tuščias, o storage turi - užpildom abu laukus.
  React.useEffect(() => {
    const stored = read();
    if (merged.length === 0 && stored.length > 0) {
      setState(s => ({ ...s, orgs: stored, dnsbList: stored }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 2) Sekam ar kada nors buvo ne-tuščia šiame seanse.
  React.useEffect(() => {
    if (merged.length > 0) hadNonEmpty.current = true;
  }, [merged.length]);

  // 3) Įrašom pokyčius, bet niekada neperrašom ne-tuščio storage tuščiu sąrašu.
  React.useEffect(() => {
    const stored = read();
    if (merged.length === 0 && stored.length > 0) return; // write-barjeras
    write(merged);
  }, [merged]);

  // 4) „Saugiklis“: jeigu sesijos metu netikėtai tapo tuščia – atstatom iš storage.
  React.useEffect(() => {
    const stored = read();
    if (hadNonEmpty.current && merged.length === 0 && stored.length > 0) {
      setState(s => ({ ...s, orgs: stored, dnsbList: stored }));
    }
  }, [merged.length]);

  return null;
}
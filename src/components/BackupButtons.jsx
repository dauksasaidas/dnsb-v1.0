import React from "react";
import { exportJSON, importJSON } from "../utils/io";
import { mergeOrgs, writeOrgs } from "../utils/orgsStore";

export default function BackupButtons({ state, setState }) {
  const onExport = () => exportJSON(state);

  const onImport = () => {
    importJSON(async (obj) => {
      try {
        const imported = obj && typeof obj === "object" ? obj : {};
        const mergedOrgs = mergeOrgs(state.orgs || [], imported.orgs || []);
        writeOrgs(mergedOrgs);
        setState(s => ({ ...s, ...(imported || {}), orgs: mergedOrgs }));
        alert("Duomenys importuoti ir DNSB sąrašas sulietas.");
      } catch (e) {
        alert("Importo klaida: " + (e?.message || e));
      }
    });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-2 flex gap-2">
      <button onClick={onExport} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Eksportuoti</button>
      <button onClick={onImport} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Importuoti</button>
    </div>
  );
}

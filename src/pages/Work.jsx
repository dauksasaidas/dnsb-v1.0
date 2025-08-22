import React, { useState } from "react";
import { T } from "../const/texts";
import Flats from "./work/Flats";
import Tariffs from "./work/Tariffs";
import Meters from "./work/Meters";
import Payments from "./work/Payments";
import Reports from "./work/Reports";
import Settings from "./work/Settings";

export default function Work({ state, setState }) {
  const tabs = [
    { id:"flats",    label:T.work.tabs.flats,    el:<Flats state={state} setState={setState}/> },
    { id:"tariffs",  label:T.work.tabs.tariffs,  el:<Tariffs state={state} setState={setState}/> },
    { id:"meters",   label:T.work.tabs.meters,   el:<Meters state={state} setState={setState}/> },
    { id:"payments", label:T.work.tabs.payments, el:<Payments state={state} setState={setState}/> },
    { id:"reports",  label:T.work.tabs.reports,  el:<Reports state={state} setState={setState}/> },
    { id:"settings", label:T.work.tabs.settings, el:<Settings state={state} setState={setState}/> },
  ];
  const [active, setActive] = useState(tabs[0].id);
  const current = tabs.find(t => t.id === active) || tabs[0];

  return (
    <main style={{ padding:16 }}>
      <h2 style={{ margin:"8px 0 12px" }}>{T.work.title}</h2>
      <nav style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:12 }}>
        {tabs.map(t => (
          <button key={t.id}
            onClick={() => setActive(t.id)}
            style={{
              padding:"6px 10px", borderRadius:8, border:"1px solid #D1D5DB",
              background: t.id===active ? "#111827" : "#fff",
              color: t.id===active ? "#fff" : "#111827", cursor:"pointer"
            }}>
            {t.label}
          </button>
        ))}
      </nav>
      <section style={{ background:"#fff", border:"1px solid #E5E7EB", borderRadius:12, padding:12 }}>
        {current.el}
      </section>
    </main>
  );
}
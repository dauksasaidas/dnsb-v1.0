import React from "react";
import { T } from "../const/texts";

export default function Header({ state, onReset }) {
  const org = state.orgs?.find(o => o.id === state.selectedOrgId);
  return (
    <header style={{padding:"12px 16px", background:"#111827", color:"#fff", display:"flex", alignItems:"center", justifyContent:"space-between"}}>
      <h1 style={{margin:0, fontSize:18}}>{T.appTitle}</h1>
      <div style={{display:"flex", gap:8, alignItems:"center"}}>
        <span style={{background:"#4B5563", padding:"4px 8px", borderRadius:999}} title={T.header.role}>
          {state.role || "—"}
        </span>
        <span style={{background:"#374151", padding:"4px 8px", borderRadius:999}} title={T.header.org}>
          {org?.name || "Neparinktas DNSB"}
        </span>
        <button onClick={onReset} style={{marginLeft:8, padding:"4px 8px"}}>Išvalyti</button>
      </div>
    </header>
  );
}
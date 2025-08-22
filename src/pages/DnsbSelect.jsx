import React, { useState } from "react";
import { T } from "../const/texts";

export default function DnsbSelect({ orgs, onSelect, onCreate }) {
  const [name, setName] = useState("");
  return (
    <main style={{padding:16}}>
      <h2 style={{marginTop:0}}>{T.orgs.title}</h2>

      {orgs.length > 0 ? (
        <ul>
          {orgs.map(o => (
            <li key={o.id} style={{margin:"6px 0"}}>
              <button onClick={() => onSelect(o.id)}>{T.orgs.select} – {o.name}</button>
            </li>
          ))}
        </ul>
      ) : (
        <p>Nėra DNSB įrašų – sukurkite naują.</p>
      )}

      <div style={{marginTop:16, display:"flex", gap:8, alignItems:"center"}}>
        <input
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder={T.orgs.orgName}
          style={{padding:"6px 8px", minWidth:260}}
        />
        <button disabled={!name.trim()} onClick={() => { onCreate(name.trim()); setName(""); }}>
          {T.orgs.create}
        </button>
      </div>
    </main>
  );
}
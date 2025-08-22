import React, { useState } from "react";
import { T } from "../../const/texts";
const mkId = () => Math.random().toString(36).slice(2);

export default function Flats({ state, setState }) {
  const [nr, setNr] = useState("");
  const [area, setArea] = useState("");
  const add = () => {
    if (!nr.trim()) return;
    const id = mkId();
    const flat = { id, nr: nr.trim(), area: Number(area) || 0 };
    setState(s => ({ ...s, flats:[...s.flats, flat] }));
    setNr(""); setArea("");
  };
  const remove = (id) => setState(s => ({ ...s, flats: s.flats.filter(f => f.id !== id) }));

  return (
    <div>
      <h3 style={{marginTop:0}}>{T.work.tabs.flats}</h3>
      <div style={{display:"flex", gap:8, marginBottom:12}}>
        <input value={nr} onChange={e=>setNr(e.target.value)} placeholder="Butas / Nr." style={{padding:"6px 8px"}}/>
        <input value={area} onChange={e=>setArea(e.target.value)} placeholder="Plotas m²" style={{padding:"6px 8px"}}/>
        <button onClick={add}>Pridėti</button>
      </div>
      {state.flats.length === 0 ? <p>Dar nėra butų.</p> : (
        <table style={{width:"100%", borderCollapse:"collapse"}}>
          <thead>
            <tr><th style={{textAlign:"left"}}>Butas</th><th style={{textAlign:"left"}}>m²</th><th></th></tr>
          </thead>
          <tbody>
            {state.flats.map(f=>(
              <tr key={f.id}>
                <td>{f.nr}</td><td>{f.area}</td>
                <td><button onClick={()=>remove(f.id)}>Šalinti</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
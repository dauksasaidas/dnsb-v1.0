import React, { useState } from "react";
import { T } from "../../const/texts";
const mkId = () => Math.random().toString(36).slice(2);

export default function Tariffs({ state, setState }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const add = () => {
    if (!title.trim()) return;
    const id = mkId();
    const t = { id, title: title.trim(), price: Number(price) || 0 };
    setState(s => ({ ...s, tariffs:[...s.tariffs, t] }));
    setTitle(""); setPrice("");
  };
  const remove = (id) => setState(s => ({ ...s, tariffs: s.tariffs.filter(t => t.id !== id) }));

  return (
    <div>
      <h3 style={{marginTop:0}}>{T.work.tabs.tariffs}</h3>
      <div style={{display:"flex", gap:8, marginBottom:12}}>
        <input value={title} onChange={e=>setTitle(e.target.value)} placeholder="Pavadinimas" style={{padding:"6px 8px"}}/>
        <input value={price} onChange={e=>setPrice(e.target.value)} placeholder="Kaina" style={{padding:"6px 8px"}}/>
        <button onClick={add}>Pridėti</button>
      </div>
      {state.tariffs.length === 0 ? <p>Dar nėra tarifų.</p> : (
        <ul>
          {state.tariffs.map(t=>(
            <li key={t.id} style={{margin:"4px 0"}}>
              {t.title}: {t.price}
              <button onClick={()=>remove(t.id)} style={{marginLeft:8}}>Šalinti</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
import React from "react";
import { T } from "../const/texts";

export default function Auth({ onPick }) {
  return (
    <main style={{padding:16}}>
      <h2 style={{marginTop:0}}>{T.auth.title}</h2>
      <p>{T.auth.pickRole}:</p>
      <div style={{display:"flex", gap:8, flexWrap:"wrap"}}>
        <button onClick={() => onPick(T.roles.accountant)}>🏦 {T.roles.accountant}</button>
        <button onClick={() => onPick(T.roles.chair)}>🏠 {T.roles.chair}</button>
        <button onClick={() => onPick(T.roles.resident)}>👤 {T.roles.resident}</button>
      </div>
    </main>
  );
}
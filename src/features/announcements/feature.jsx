import React, { useState } from "react";
import { registerFeature } from "../../modular/registry";
import { Section, Button, Input } from "../../ui";

function Announcements(){
  const [items, setItems] = useState([]);
  const [text, setText] = useState("");
  return (
    <div className="grid gap-3">
      <Section title="Skelbimai">
        <div className="flex gap-2">
          <Input placeholder="Naujas skelbimas..." value={text} onChange={e=>setText(e.target.value)} />
          <Button onClick={()=>{ if(!text.trim()) return; setItems([{ id: Date.now(), text }, ...items]); setText(""); }}>Pridėti</Button>
        </div>
      </Section>
      <Section title="Visi skelbimai">
        <ul className="list-disc pl-5">
          {items.map(i => <li key={i.id} className="py-1">{i.text}</li>)}
        </ul>
      </Section>
    </div>
  );
}

registerFeature({
  id: "announcements",
  label: "Skelbimai",
  roles: ["accountant","manager","resident"],
  component: Announcements,
});
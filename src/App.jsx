import { filterDnsbByRole, filterTabsByRole, canEdit, ROLES } from "./utils/rbac";
import React, {useEffect, useState, useRef} from "react";
import Header from "./components/Header";
import Auth from "./pages/Auth";
import DnsbSelect from "./pages/DnsbSelect";
import Work from "./pages/Work";
import { loadState, saveState, resetState } from "./state/store";
import BackupButtons from "./components/BackupButtons";
  
// --- cookie helper (session)
const setRoleCookie = (role) => {
  document.cookie = 'dnsb-role=' + encodeURIComponent(role) + '; path=/; SameSite=Lax';
};
const uuid = () => Math.random().toString(36).slice(2) + Date.now().toString(36);

export default function App() {
  // === Navigacijos mygtukai (Atgal / Atsijungti)
  const goBack = () => {
    if (state?.activeOrgId) {
      setState(s => ({ ...s, activeOrgId: "" }));
    } else {
      try { if (typeof setRoleCookie === "function") setRoleCookie(""); } catch(_) {}
      setState(s => ({ ...s, role: "", activeOrgId: "" }));
    }
  };
  const logout = () => {
    try { if (typeof setRoleCookie === "function") setRoleCookie(""); } catch(_) {}
    setState(s => ({ ...s, role: "", activeOrgId: "" }));
  };
  const [state, setState] = useState(() => loadState());
  useEffect(() => { saveState(state); }, [state]);

  const handleReset   = () => setState(resetState());
  const pickRole      = (role) => setState(s => ({ ...s, role }));
  const selectOrg     = (id)   => setState(s => ({ ...s, selectedOrgId: id }));
  const createOrg     = (name) => setState(s => {
    const id = uuid();
    return { ...s, orgs: [...s.orgs, { id, name }], selectedOrgId: id };
  });

  return (
    <div style={{background:"#f3f4f6", minHeight:"100vh"}}>
      <Header state={state} onReset={handleReset}/>
      <div className="flex gap-2 px-4 mt-2">
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => setState(s => ({ ...s, view: 'dnsb' }))}>
          ATGAL
        </button>
        <button className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300"
                onClick={() => { document.cookie = 'dnsb-role=; path=/; Max-Age=0; SameSite=Lax'; setState(s => ({ ...s, role:'', view:'auth', activeOrgId:'' })); }}>
          ATSIJUNGTI
        </button>
      </div>
      <div className="px-4 py-2 flex gap-2">
        <button onClick={goBack} className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300">Atgal</button>
        <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600">Atsijungti</button>
      </div>
      <BackupButtons state={state} setState={setState} />
      
      <BackupButtons state={state} setState={setState} />
{!state.role && <Auth onPick={pickRole} />}
      {state.role && !state.selectedOrgId && (
        <DnsbSelect orgs={state.orgs} onSelect={selectOrg} onCreate={createOrg} />
      )}
      {state.role && state.selectedOrgId && (
        <Work state={state} setState={setState} />
      )}
    </div>
  );
}
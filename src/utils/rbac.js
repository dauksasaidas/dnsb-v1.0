export const ROLES = {
  ACCOUNTANT: "Buhalteris",
  CHAIR: "Namo pirmininkas",
  RESIDENT: "Gyventojas",
};

export const isAccountant = (state) => state?.role === ROLES.ACCOUNTANT;
export const isViewer     = (state) => state?.role === ROLES.CHAIR || state?.role === ROLES.RESIDENT;

/** DNSB sąrašo ribojimas pagal rolę */
export function filterDnsbByRole(state, list) {
  if (!Array.isArray(list)) return [];
  if (isAccountant(state)) return list;
  const id = state?.assignedOrgId || state?.orgMeta?.id; // jei priskirta — rodome tik tą
  return id ? list.filter(o => o.id === id) : [];
}

/** Tab'ų ribojimas pagal rolę: buhalteriui – viskas; kitiems – tik ataskaitos */
export function filterTabsByRole(role, tabs) {
  if (!Array.isArray(tabs)) return [];
  if (role === ROLES.ACCOUNTANT) return tabs;
  const allowed = new Set(["reports"]); // paliekam tik ataskaitas
  return tabs.filter(t => allowed.has(t.id));
}

/** Ar leidžiama redaguoti (mygtukai, įvedimo laukai ir pan.) */
export function canEdit(state) {
  return isAccountant(state);
}
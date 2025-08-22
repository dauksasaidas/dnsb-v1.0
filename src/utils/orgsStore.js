export const ORG_KEY = "dnsb-orgs-v1";

export function readOrgs() {
  try {
    const x = JSON.parse(localStorage.getItem(ORG_KEY) || "[]");
    return Array.isArray(x) ? x : [];
  } catch {
    return [];
  }
}

export function writeOrgs(orgs) {
  try {
    localStorage.setItem(ORG_KEY, JSON.stringify(Array.isArray(orgs) ? orgs : []));
  } catch {}
}

export function mergeOrgs(a = [], b = []) {
  const byId = new Map();
  [...a, ...b].forEach(o => { if (o && o.id) byId.set(o.id, { ...byId.get(o.id), ...o }); });
  return [...byId.values()];
}

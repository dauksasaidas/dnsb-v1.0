import React from "react";

/**
 * Registruoja naują modulį (feature), kad jis atsirastų kaip papildomas tab'as.
 * feature: { id, label, roles?: string[], component: ReactComponent }
 */
export function registerFeature(feature){
  if(!feature || !feature.id) return;
  const bag = (window.DNSB_FEATURES ||= []);
  if (bag.find(f => f.id === feature.id)) return; // apsauga nuo dublikatų
  bag.push(feature);
}

/**
 * Grąžina paruoštus tab’us pagal rolę (component paduodamas kaip React elementas).
 */
export function getPluginTabs(role){
  const list = window.DNSB_FEATURES || [];
  return list
    .filter(f => !role || (Array.isArray(f.roles) ? f.roles.includes(role) : true))
    .map(f => ({ id: f.id, label: f.label, component: React.createElement(f.component) }));
}

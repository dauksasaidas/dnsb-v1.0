import React from "react";

export const Label = ({ children }) => <label className="text-sm text-gray-700">{children}</label>;
export const Input = (p) => <input {...p} className={`border rounded-xl px-3 py-2 w-full ${p.className??""}`} />;
export const Select = (p) => <select {...p} className={`border rounded-xl px-3 py-2 w-full ${p.className??""}`}>{p.children}</select>;
export function Button(p){
  const { variant="primary", className="", ...rest } = p;
  const base="px-3 py-2 rounded-xl text-sm font-medium border";
  const styles={primary:"bg-black text-white border-black",secondary:"bg-gray-100 text-gray-900 border-gray-300",ghost:"bg-transparent text-gray-800 border-transparent hover:bg-gray-100"};
  return <button {...rest} className={`${base} ${styles[variant]} ${className}`} />;
}
export const Badge = ({children}) => <span className="text-xs rounded-full bg-gray-100 px-2 py-1 border border-gray-200">{children}</span>;
export const Section = ({ title, children, actions }) => (
  <div className="bg-white rounded-2xl shadow p-3 md:p-4 mb-6">
    <div className="flex items-center justify-between mb-3">
      <h2 className="text-xl font-semibold">{title}</h2>
      <div className="flex gap-2">{actions}</div>
    </div>
    {children}
  </div>
);
export const Table = ({children}) => (<div className="overflow-x-auto -mx-2 sm:mx-0"><table className="min-w-[640px] sm:min-w-0 w-full text-sm border-separate border-spacing-y-1">{children}</table></div>);
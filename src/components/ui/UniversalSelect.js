import React from 'react';

const formLabelClass = "block text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1";

const UniversalSelect = ({ wrapperId, name, value, label, options, onChange, placeholder, classNameAddon = "", disabled = false }) => (
    <div className={`relative group ${label ? '' : 'mt-0'}`}>
        {label && <label className={formLabelClass}>{label}</label>}
        <div className="relative">
            <select 
                id={wrapperId} name={name} value={value} onChange={onChange} disabled={disabled}
                className={`block w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 ${disabled ? 'cursor-not-allowed text-slate-500 opacity-80' : 'cursor-pointer hover:border-slate-300'} ${value ? 'text-slate-800' : 'text-slate-400 font-medium'} ${classNameAddon}`}
            >
                <option value="" disabled>{placeholder}</option>
                {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </select>
            <div className={`absolute inset-0 rounded-2xl pointer-events-none z-0 ${disabled ? 'bg-slate-50/70' : 'bg-white'}`}></div>
            <div className={`absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-0 ${disabled ? 'text-slate-300' : 'text-slate-400 group-focus-within:text-blue-500 transition-colors'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
        </div>
    </div>
);

export default UniversalSelect;
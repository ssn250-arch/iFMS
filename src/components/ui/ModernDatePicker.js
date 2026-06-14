import React from 'react';

const formLabelClass = "block text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1";

const ModernDatePicker = ({ wrapperId, name, value, label, onChange, min, slim = false }) => {
    const displayDate = value ? value.split('-').reverse().join('/') : "Pilih Tarikh";
    
    return (
        <div className="relative group w-full">
            {label && <label className={slim ? "block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1" : formLabelClass}>{label}</label>}
            <div className="relative">
                <div id={wrapperId} className={`flex items-center w-full ${slim ? 'rounded-xl bg-slate-50/50 hover:bg-slate-100 border-transparent py-2.5 px-3' : 'rounded-2xl bg-white border border-slate-200 pl-[42px] pr-4 py-3.5 shadow-sm'} text-[14px] md:text-[15px] font-semibold ${value ? 'text-slate-800' : 'text-slate-400 font-medium'} transition-all duration-300 group-hover:border-slate-300 group-focus-within:border-blue-500 group-focus-within:ring-[4px] group-focus-within:ring-blue-500/10`}>
                    <div className={`${slim ? 'mr-2 text-slate-400' : 'absolute left-4 text-slate-400'} group-focus-within:text-blue-500 transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={slim ? "16" : "18"} height={slim ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                    </div>
                    <span>{displayDate}</span>
                </div>
                <input type="date" name={name} value={value} min={min} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            </div>
        </div>
    );
};

export default ModernDatePicker;
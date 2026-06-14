import React from 'react';

const formLabelClass = "block text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1";

const ModernTimePicker = ({ wrapperId, name, value, label, onChange, slim = false }) => {
    const displayTime = value ? value : "Pilih Masa";
    
    return (
        <div className="relative group w-full">
            {label && <label className={slim ? "block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1" : formLabelClass}>{label}</label>}
            <div className="relative">
                <div id={wrapperId} className={`flex items-center w-full ${slim ? 'rounded-xl bg-slate-50/50 hover:bg-slate-100 border-transparent py-2.5 px-3' : 'rounded-2xl bg-white border border-slate-200 pl-[42px] pr-4 py-3.5 shadow-sm'} text-[14px] md:text-[15px] font-semibold ${value ? 'text-slate-800' : 'text-slate-400 font-medium'} transition-all duration-300 group-hover:border-slate-300 group-focus-within:border-blue-500 group-focus-within:ring-[4px] group-focus-within:ring-blue-500/10`}>
                    <div className={`${slim ? 'mr-2 text-slate-400' : 'absolute left-4 text-slate-400'} group-focus-within:text-blue-500 transition-colors`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width={slim ? "16" : "18"} height={slim ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                    </div>
                    <span>{displayTime}</span>
                </div>
                <input type="time" name={name} value={value} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
            </div>
        </div>
    );
};

export default ModernTimePicker;
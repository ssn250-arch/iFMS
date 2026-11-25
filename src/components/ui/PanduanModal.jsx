import React, { useState, useEffect } from 'react';

const stepsData = [
    {
        id: 1,
        title: 'Pilih Modul Borang',
        desc: 'Pilih modul borang yang bersesuaian dari menu utama di halaman ini mengikut urusan rasmi anda.',
        tag: 'Langkah 01 • Mula',
        badgeBg: 'bg-blue-100 text-blue-700',
        activeRing: 'ring-blue-500/30 border-blue-500 bg-blue-50/60',
        iconBg: 'bg-blue-600 text-white shadow-blue-500/30',
    },
    {
        id: 2,
        title: 'Lengkapkan Maklumat (*)',
        desc: 'Lengkapkan semua maklumat yang diwajibkan (*) mengikut turutan seksyen bagi membuka kunci bahagian seterusnya.',
        tag: 'Langkah 02 • Pengisian',
        badgeBg: 'bg-indigo-100 text-indigo-700',
        activeRing: 'ring-indigo-500/30 border-indigo-500 bg-indigo-50/60',
        iconBg: 'bg-indigo-600 text-white shadow-indigo-500/30',
    },
    {
        id: 3,
        title: 'Tandatangan Digital',
        desc: 'Turunkan tandatangan digital anda menggunakan tetikus, skrin sentuh, atau muat naik gambar tandatangan.',
        tag: 'Langkah 03 • Pengesahan',
        badgeBg: 'bg-purple-100 text-purple-700',
        activeRing: 'ring-purple-500/30 border-purple-500 bg-purple-50/60',
        iconBg: 'bg-purple-600 text-white shadow-purple-500/30',
    },
    {
        id: 4,
        title: 'Jana & Muat Turun PDF',
        desc: 'Klik butang Jana & Muat Turun. Fail PDF berformat rasmi ADTEC akan terus dijana dan disimpan ke peranti anda.',
        tag: 'Langkah 04 • Selesai',
        badgeBg: 'bg-emerald-100 text-emerald-700',
        activeRing: 'ring-emerald-500/30 border-emerald-500 bg-emerald-50/60',
        iconBg: 'bg-emerald-600 text-white shadow-emerald-500/30',
    },
];

const PanduanModal = ({ isOpen, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // Reset langkah, kunci skrol belakang & fungsi butang ESC
    useEffect(() => {
        if (!isOpen) return;
        setActiveStep(0);
        setIsAutoPlay(true);
        document.body.style.overflow = 'hidden';

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, onClose]);

    // Auto-advance langkah setiap 4.5 saat
    useEffect(() => {
        if (!isOpen || !isAutoPlay) return;
        const timer = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % stepsData.length);
        }, 4500);
        return () => clearInterval(timer);
    }, [isOpen, isAutoPlay]);

    if (!isOpen) return null;

    const current = stepsData[activeStep];

    const handleStepClick = (index) => {
        setActiveStep(index);
        setIsAutoPlay(false);
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in"
        >
            {/* Kontena Responsif: Mobile (penuh kemas), Tablet (max-w-2xl), Laptop/Desktop (max-w-4xl) */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '86dvh' }}
                className="relative w-full max-w-lg sm:max-w-2xl lg:max-w-4xl max-h-[86vh] flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.35)] overflow-hidden animate-slide-up"
            >
                {/* HEADER MODAL (KEKAL DI ATAS / STICKY) */}
                <div className="shrink-0 relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 border-b border-slate-100 bg-white/95 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2">
                                <h2 className="text-base sm:text-xl lg:text-2xl font-extrabold text-slate-900 tracking-tight truncate">
                                    Panduan Penggunaan
                                </h2>
                                <span className="hidden md:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60">
                                    Interaktif
                                </span>
                            </div>
                            <p className="text-[11px] sm:text-[13px] font-semibold text-slate-500 truncate">
                                4 langkah mudah menjana dokumen rasmi
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                        <button
                            type="button"
                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                                isAutoPlay
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/70'
                            }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                            {isAutoPlay ? 'Auto-Demo' : 'Manual'}
                        </button>

                        {/* Butang Batal / Tutup Jelas untuk Mobile & Desktop */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="inline-flex items-center gap-1.5 px-3 py-2 sm:p-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs transition-all active:scale-95 border border-red-100"
                            aria-label="Tutup panduan"
                        >
                            <span className="sm:hidden">Tutup</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* BODY MODAL (BOLEH SKROL LANCAR DI MOBILE & TABLET, 2 KOLUM DI LAPTOP/DESKTOP) */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain grid grid-cols-1 lg:grid-cols-12">
                    {/* KOLUM KIRI: SENARAI LANGKAH */}
                    <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 border-b lg:border-b-0 lg:border-r border-slate-100 space-y-2.5 sm:space-y-3">
                        {stepsData.map((step, idx) => {
                            const isActive = idx === activeStep;
                            const isCompleted = idx < activeStep;

                            return (
                                <div key={step.id} className="relative">
                                    {idx < stepsData.length - 1 && (
                                        <div
                                            className={`hidden sm:block absolute left-[23px] top-12 w-[2px] h-5 transition-colors duration-500 ${
                                                isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                                            }`}
                                        />
                                    )}

                                    <button
                                        type="button"
                                        onClick={() => handleStepClick(idx)}
                                        className={`w-full text-left p-3 sm:p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3 group ${
                                            isActive
                                                ? `ring-[3px] shadow-sm ${step.activeRing}`
                                                : 'border-slate-200/70 bg-white hover:bg-slate-50/90 hover:border-slate-300'
                                        }`}
                                    >
                                        <div
                                            className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shrink-0 mt-0.5 transition-all duration-300 ${
                                                isActive
                                                    ? `${step.iconBg} shadow-md scale-105`
                                                    : isCompleted
                                                    ? 'bg-emerald-100 text-emerald-700'
                                                    : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                            }`}
                                        >
                                            {isCompleted ? (
                                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                            ) : (
                                                step.id
                                            )}
                                        </div>

                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-center justify-between gap-2">
                                                <h3 className={`text-sm sm:text-[15px] font-extrabold ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                                    {step.title}
                                                </h3>
                                                {isActive && (
                                                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${step.badgeBg}`}>
                                                        Aktif
                                                    </span>
                                                )}
                                            </div>
                                            <p className={`text-xs sm:text-[13px] leading-relaxed mt-1 ${isActive ? 'text-slate-600 font-medium' : 'text-slate-400 line-clamp-1'}`}>
                                                {step.desc}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>

                    {/* KOLUM KANAN: SIMULASI VISUAL */}
                    <div className="lg:col-span-6 p-4 sm:p-6 lg:p-8 bg-slate-50/80 flex flex-col justify-between relative overflow-hidden">
                        <div
                            className="absolute inset-0 opacity-40 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            }}
                        />

                        <div className="relative z-10 flex items-center justify-between mb-3">
                            <span className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider ${current.badgeBg}`}>
                                {current.tag}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">
                                {activeStep + 1} / {stepsData.length}
                            </span>
                        </div>

                        <div className="relative z-10 my-auto py-2">
                            {activeStep === 0 && (
                                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-md animate-slide-up">
                                    <div className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 mb-2.5">
                                        Menu Utama iFMS
                                    </div>
                                    <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                                        <div className="relative p-3 sm:p-3.5 rounded-2xl border-2 border-blue-500 bg-blue-50/70">
                                            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                            </div>
                                            <div className="text-xs font-extrabold text-slate-800">Tugas Rasmi</div>
                                            <div className="text-[10px] font-semibold text-blue-600 mt-0.5">Dipilih ✓</div>
                                            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md animate-bounce">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l16 11-7 2 4 7-3 1.5-4-7-6 4.5z"/></svg>
                                            </div>
                                        </div>
                                        <div className="p-3 sm:p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 opacity-60">
                                            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                                            </div>
                                            <div className="text-xs font-extrabold text-slate-600">Borang Pelepasan</div>
                                            <div className="text-[10px] font-semibold text-slate-400 mt-0.5">Modul lain</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeStep === 1 && (
                                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-md animate-slide-up space-y-2.5">
                                    <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl bg-emerald-50/70 border border-emerald-200">
                                        <div className="flex items-center gap-2">
                                            <span className="w-5 h-5 rounded-md bg-emerald-500 text-white flex items-center justify-center text-[11px] font-bold">✓</span>
                                            <span className="text-xs font-extrabold text-slate-800">1. Maklumat Pegawai</span>
                                        </div>
                                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">LENGKAP</span>
                                    </div>
                                    <div className="p-3 rounded-xl bg-indigo-50/60 border-2 border-indigo-400">
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-xs font-extrabold text-indigo-900">2. Maklumat Tugasan <span className="text-red-500">*</span></span>
                                            <span className="text-[10px] font-bold text-indigo-600 animate-pulse">Sedang diisi...</span>
                                        </div>
                                        <div className="bg-white px-3 py-1.5 rounded-lg border border-indigo-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                                            <span>JTM Putrajaya</span>
                                            <span className="w-1.5 h-3.5 bg-indigo-600 animate-ping rounded-full" />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {activeStep === 2 && (
                                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-md animate-slide-up">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-xs font-extrabold text-slate-800">Ruangan Tandatangan <span className="text-red-500">*</span></span>
                                        <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2 py-0.5 rounded-full">Sentuh / Tetikus</span>
                                    </div>
                                    <div className="relative h-28 sm:h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-purple-300 flex items-center justify-center overflow-hidden">
                                        <svg viewBox="0 0 260 90" className="w-48 sm:w-56 h-20 sm:h-24 text-slate-800">
                                            <path
                                                d="M25,65 C40,20 55,15 60,55 C65,75 80,25 95,45 C105,60 115,35 130,50 C145,62 165,30 190,48 C205,58 220,42 238,46"
                                                fill="none"
                                                stroke="currentColor"
                                                strokeWidth="3.5"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="animate-draw-sign"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            )}

                            {activeStep === 3 && (
                                <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-md animate-slide-up text-center">
                                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-600 mb-2 animate-float-badge">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <path d="M12 18v-6" />
                                            <path d="m9 15 3 3 3-3" />
                                        </svg>
                                    </div>
                                    <div className="text-xs sm:text-sm font-extrabold text-slate-900">Borang_Rasmi_ADTEC.pdf</div>
                                    <div className="text-[11px] font-semibold text-emerald-600 mt-0.5 mb-3">Format Rasmi • Sedia Disimpan</div>
                                    <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold">
                                        ✓ Berjaya Dimuat Turun
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="relative z-10 mt-3 flex gap-1.5">
                            {stepsData.map((s, idx) => (
                                <button
                                    key={s.id}
                                    type="button"
                                    onClick={() => handleStepClick(idx)}
                                    className={`h-1.5 rounded-full transition-all duration-500 ${
                                        idx === activeStep ? 'flex-[2] bg-slate-900' : idx < activeStep ? 'flex-1 bg-emerald-500' : 'flex-1 bg-slate-300'
                                    }`}
                                    aria-label={`Langkah ${s.id}`}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* FOOTER MODAL (KEKAL DI BAWAH / STICKY) */}
                <div className="shrink-0 relative z-10 px-4 sm:px-6 lg:px-8 py-3.5 sm:py-4 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                        <button
                            type="button"
                            disabled={activeStep === 0}
                            onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                            className="px-3 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 transition-all"
                        >
                            ← Sebelum
                        </button>
                        {activeStep < stepsData.length - 1 && (
                            <button
                                type="button"
                                onClick={() => handleStepClick(activeStep + 1)}
                                className="px-3 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
                            >
                                Seterusnya →
                            </button>
                        )}
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="hidden sm:inline-flex px-4 py-2 rounded-xl text-xs font-extrabold border border-slate-200 text-slate-600 hover:bg-slate-100 transition-all"
                        >
                            Batal
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 sm:px-6 py-2 sm:py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-[13px] font-extrabold shadow-md transition-all active:scale-95"
                        >
                            Faham & Tutup
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PanduanModal;
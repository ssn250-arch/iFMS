import React, { useState, useEffect } from 'react';

const stepsData = [
    {
        id: 1,
        title: 'Pilih Modul Borang',
        shortTitle: 'Pilih Modul',
        desc: 'Pilih modul borang yang bersesuaian dari menu utama di halaman ini mengikut urusan rasmi anda.',
        tag: 'Langkah 01 • Mula',
        accent: 'blue',
        badgeBg: 'bg-blue-100 text-blue-700',
        activeRing: 'ring-blue-500/30 border-blue-500 bg-blue-50/60',
        iconBg: 'bg-blue-600 text-white shadow-blue-500/30',
    },
    {
        id: 2,
        title: 'Lengkapkan Maklumat (*)',
        shortTitle: 'Isi Butiran',
        desc: 'Lengkapkan semua maklumat yang diwajibkan (*) mengikut turutan seksyen bagi membuka kunci bahagian seterusnya.',
        tag: 'Langkah 02 • Pengisian',
        accent: 'indigo',
        badgeBg: 'bg-indigo-100 text-indigo-700',
        activeRing: 'ring-indigo-500/30 border-indigo-500 bg-indigo-50/60',
        iconBg: 'bg-indigo-600 text-white shadow-indigo-500/30',
    },
    {
        id: 3,
        title: 'Tandatangan Digital',
        shortTitle: 'Tandatangan',
        desc: 'Turunkan tandatangan digital anda menggunakan tetikus, skrin sentuh, atau muat naik gambar tandatangan.',
        tag: 'Langkah 03 • Pengesahan',
        accent: 'purple',
        badgeBg: 'bg-purple-100 text-purple-700',
        activeRing: 'ring-purple-500/30 border-purple-500 bg-purple-50/60',
        iconBg: 'bg-purple-600 text-white shadow-purple-500/30',
    },
    {
        id: 4,
        title: 'Jana & Muat Turun PDF',
        shortTitle: 'Jana PDF',
        desc: 'Klik butang Jana & Muat Turun. Fail PDF berformat rasmi ADTEC akan terus dijana dan disimpan ke peranti anda.',
        tag: 'Langkah 04 • Selesai',
        accent: 'emerald',
        badgeBg: 'bg-emerald-100 text-emerald-700',
        activeRing: 'ring-emerald-500/30 border-emerald-500 bg-emerald-50/60',
        iconBg: 'bg-emerald-600 text-white shadow-emerald-500/30',
    },
];

const PanduanModal = ({ isOpen, onClose }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [isAutoPlay, setIsAutoPlay] = useState(true);

    // Reset ke langkah 1 setiap kali modal dibuka
    useEffect(() => {
        if (isOpen) {
            setActiveStep(0);
            setIsAutoPlay(true);
        }
    }, [isOpen]);

    // Auto-advance langkah setiap 4.5 saat jika AutoPlay aktif
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
        setIsAutoPlay(false); // Hentikan auto-play bila pengguna kawal manual
    };

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-md animate-fade-in"
        >
            {/* Kontena Utama Modal (Glassmorphism 2026) */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-4xl rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.25)] overflow-hidden transition-all duration-500 animate-slide-up"
            >
                {/* Efek cahaya lembut latar */}
                <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* HEADER MODAL */}
                <div className="relative z-10 px-6 sm:px-8 pt-6 pb-5 border-b border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-lg shadow-blue-500/25">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Panduan Penggunaan
                                </h2>
                                <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-50 text-blue-600 border border-blue-200/60">
                                    Aliran Interaktif
                                </span>
                            </div>
                            <p className="text-xs sm:text-[13px] font-semibold text-slate-500 mt-0.5">
                                Ikuti 4 langkah mudah untuk menjana dokumen rasmi anda
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Butang Auto-Tour */}
                        <button
                            type="button"
                            onClick={() => setIsAutoPlay(!isAutoPlay)}
                            title={isAutoPlay ? 'Hentikan Auto-Play' : 'Mainkan Auto-Play'}
                            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-bold border transition-all ${
                                isAutoPlay
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-slate-100 text-slate-500 border-slate-200 hover:bg-slate-200/70'
                            }`}
                        >
                            <span className={`w-1.5 h-1.5 rounded-full ${isAutoPlay ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                            {isAutoPlay ? 'Auto-Demo' : 'Manual'}
                        </button>

                        {/* Butang Tutup */}
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition-all active:scale-90"
                            aria-label="Tutup panduan"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* BODY: GRID 2 KOLUM (KIRI: FLOW STEPPER, KANAN: SIMULASI VISUAL) */}
                <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12">
                    
                    {/* KOLUM KIRI: SENARAI LANGKAH BERANGKAI */}
                    <div className="lg:col-span-6 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-100">
                        <div className="relative space-y-3">
                            {stepsData.map((step, idx) => {
                                const isActive = idx === activeStep;
                                const isCompleted = idx < activeStep;

                                return (
                                    <div key={step.id} className="relative">
                                        {/* Garisan penyambung menegak antara langkah */}
                                        {idx < stepsData.length - 1 && (
                                            <div
                                                className={`absolute left-[23px] top-12 w-[2px] h-5 transition-colors duration-500 ${
                                                    isCompleted ? 'bg-emerald-400' : 'bg-slate-200'
                                                }`}
                                            />
                                        )}

                                        <button
                                            type="button"
                                            onClick={() => handleStepClick(idx)}
                                            className={`w-full text-left p-3.5 sm:p-4 rounded-2xl border transition-all duration-300 flex items-start gap-3.5 group ${
                                                isActive
                                                    ? `ring-[3px] shadow-sm ${step.activeRing}`
                                                    : 'border-slate-200/70 bg-white hover:bg-slate-50/90 hover:border-slate-300'
                                            }`}
                                        >
                                            {/* Nombor / Ikon Status */}
                                            <div
                                                className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs flex-shrink-0 mt-0.5 transition-all duration-300 ${
                                                    isActive
                                                        ? `${step.iconBg} shadow-md scale-105`
                                                        : isCompleted
                                                        ? 'bg-emerald-100 text-emerald-700'
                                                        : 'bg-slate-100 text-slate-500 group-hover:bg-slate-200'
                                                }`}
                                            >
                                                {isCompleted ? (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                        <polyline points="20 6 9 17 4 12" />
                                                    </svg>
                                                ) : (
                                                    step.id
                                                )}
                                            </div>

                                            {/* Teks Langkah */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between gap-2">
                                                    <h3 className={`text-[15px] font-extrabold transition-colors ${isActive ? 'text-slate-900' : 'text-slate-700'}`}>
                                                        {step.title}
                                                    </h3>
                                                    {isActive && (
                                                        <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${step.badgeBg}`}>
                                                            Aktif
                                                        </span>
                                                    )}
                                                </div>
                                                <p className={`text-[13px] leading-relaxed mt-1 transition-all duration-300 ${isActive ? 'text-slate-600 font-medium' : 'text-slate-400 line-clamp-1'}`}>
                                                    {step.desc}
                                                </p>
                                            </div>
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* KOLUM KANAN: PENTAS SIMULASI VISUAL INTERAKTIF */}
                    <div className="lg:col-span-6 p-6 sm:p-8 bg-slate-50/80 flex flex-col justify-between relative overflow-hidden">
                        {/* Corak Dot-Grid Halus */}
                        <div
                            className="absolute inset-0 opacity-40 pointer-events-none"
                            style={{
                                backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
                                backgroundSize: '20px 20px',
                            }}
                        />

                        {/* Header Pentas */}
                        <div className="relative z-10 flex items-center justify-between mb-4">
                            <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider ${current.badgeBg}`}>
                                {current.tag}
                            </span>
                            <span className="text-xs font-mono font-bold text-slate-400">
                                {activeStep + 1} / {stepsData.length}
                            </span>
                        </div>

                        {/* Kotak Animasi Mengikut Langkah Aktif */}
                        <div className="relative z-10 my-auto py-4">
                            
                            {/* VISUAL LANGKAH 1: PILIH MODUL */}
                            {activeStep === 0 && (
                                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-lg shadow-slate-200/50 animate-slide-up">
                                    <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mb-3">
                                        Menu Utama iFMS
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="relative p-3.5 rounded-2xl border-2 border-blue-500 bg-blue-50/70 shadow-sm">
                                            <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                                            </div>
                                            <div className="text-xs font-extrabold text-slate-800">Tugas Rasmi</div>
                                            <div className="text-[10px] font-semibold text-blue-600 mt-0.5">Dipilih ✓</div>
                                            {/* Ikon Kursor Klik */}
                                            <div className="absolute -bottom-2 -right-2 w-7 h-7 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md animate-bounce">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M4 2l16 11-7 2 4 7-3 1.5-4-7-6 4.5z"/></svg>
                                            </div>
                                        </div>
                                        <div className="p-3.5 rounded-2xl border border-slate-200 bg-slate-50/60 opacity-60">
                                            <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-500 flex items-center justify-center mb-2">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/></svg>
                                            </div>
                                            <div className="text-xs font-extrabold text-slate-600">Laporan / Lain</div>
                                            <div className="text-[10px] font-semibold text-slate-400 mt-0.5">Modul lain</div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* VISUAL LANGKAH 2: LENGKAPKAN MAKLUMAT (*) */}
                            {activeStep === 1 && (
                                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-lg shadow-slate-200/50 animate-slide-up space-y-3">
                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-6 h-6 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-xs font-bold">✓</span>
                                            <span className="text-xs font-extrabold text-slate-800">1. Maklumat Pegawai</span>
                                        </div>
                                        <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">LENGKAP</span>
                                    </div>

                                    <div className="p-3.5 rounded-2xl bg-indigo-50/60 border-2 border-indigo-400">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-extrabold text-indigo-900">2. Maklumat Tugasan <span className="text-red-500">*</span></span>
                                            <span className="text-[10px] font-bold text-indigo-600 animate-pulse">Sedang diisi...</span>
                                        </div>
                                        <div className="bg-white px-3 py-2 rounded-xl border border-indigo-200 text-xs font-bold text-slate-700 flex items-center justify-between">
                                            <span>JTM Putrajaya</span>
                                            <span className="w-1.5 h-4 bg-indigo-600 animate-ping rounded-full" />
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between p-3 rounded-2xl bg-slate-100/80 border border-slate-200 opacity-60">
                                        <div className="flex items-center gap-2.5">
                                            <span className="w-6 h-6 rounded-lg bg-slate-300 text-slate-600 flex items-center justify-center text-xs">🔒</span>
                                            <span className="text-xs font-bold text-slate-600">3. Pelepasan Tugas</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400">Auto-Buka</span>
                                    </div>
                                </div>
                            )}

                            {/* VISUAL LANGKAH 3: TANDATANGAN DIGITAL */}
                            {activeStep === 2 && (
                                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-lg shadow-slate-200/50 animate-slide-up">
                                    <div className="flex items-center justify-between mb-2.5">
                                        <span className="text-xs font-extrabold text-slate-800">
                                            Ruangan Tandatangan <span className="text-red-500">*</span>
                                        </span>
                                        <span className="text-[10px] font-extrabold text-purple-700 bg-purple-100 px-2.5 py-0.5 rounded-full">
                                            Sentuh / Tetikus
                                        </span>
                                    </div>
                                    <div className="relative h-32 rounded-2xl bg-slate-50 border-2 border-dashed border-purple-300 flex items-center justify-center overflow-hidden">
                                        {/* Animasi SVG Tandatangan Dilukis */}
                                        <svg viewBox="0 0 260 90" className="w-56 h-24 text-slate-800">
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
                                        <div className="absolute bottom-2.5 right-3 text-[10px] font-bold text-slate-400">
                                            Atau muat naik imej lutsinar
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* VISUAL LANGKAH 4: JANA & MUAT TURUN PDF */}
                            {activeStep === 3 && (
                                <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-lg shadow-slate-200/50 animate-slide-up text-center">
                                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 mb-3 animate-float-badge shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                                            <polyline points="14 2 14 8 20 8" />
                                            <path d="M12 18v-6" />
                                            <path d="m9 15 3 3 3-3" />
                                        </svg>
                                    </div>
                                    <div className="text-sm font-extrabold text-slate-900">
                                        Borang_Rasmi_ADTEC.pdf
                                    </div>
                                    <div className="text-[11px] font-semibold text-emerald-600 mt-0.5 mb-4">
                                        Format Rasmi • Sedia Disimpan
                                    </div>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 text-white text-xs font-extrabold shadow-md shadow-emerald-500/25">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12" /></svg>
                                        Berjaya Dimuat Turun
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Bar Kemajuan Bawah Pentas */}
                        <div className="relative z-10 mt-4">
                            <div className="flex gap-1.5">
                                {stepsData.map((s, idx) => (
                                    <button
                                        key={s.id}
                                        type="button"
                                        onClick={() => handleStepClick(idx)}
                                        className={`h-1.5 rounded-full transition-all duration-500 ${
                                            idx === activeStep
                                                ? 'flex-[2] bg-slate-900'
                                                : idx < activeStep
                                                ? 'flex-1 bg-emerald-500'
                                                : 'flex-1 bg-slate-300/80 hover:bg-slate-400'
                                        }`}
                                        aria-label={`Langkah ${s.id}`}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* FOOTER MODAL: NAVIGASI & BUTANG FAHAM */}
                <div className="relative z-10 px-6 sm:px-8 py-4 bg-white border-t border-slate-100 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                        <button
                            type="button"
                            disabled={activeStep === 0}
                            onClick={() => handleStepClick(Math.max(0, activeStep - 1))}
                            className="px-3.5 py-2 rounded-xl text-xs font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                        >
                            ← Sebelum
                        </button>
                        {activeStep < stepsData.length - 1 && (
                            <button
                                type="button"
                                onClick={() => handleStepClick(activeStep + 1)}
                                className="px-3.5 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-800 transition-all"
                            >
                                Seterusnya →
                            </button>
                        )}
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-blue-600 text-white text-xs sm:text-[13px] font-extrabold shadow-lg shadow-slate-900/15 transition-all active:scale-95 flex items-center gap-2"
                    >
                        <span>Faham & Mula Guna</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12" />
                            <polyline points="12 5 19 12 12 19" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PanduanModal;
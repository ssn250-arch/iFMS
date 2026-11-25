import React, { useState, useEffect } from 'react';

const HubungiModal = ({ isOpen, onClose }) => {
    const [copiedField, setCopiedField] = useState(null);

    useEffect(() => {
        if (!isOpen) return;
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

    if (!isOpen) return null;

    const now = new Date();
    const day = now.getDay();
    const hour = now.getHours();
    const isOfficeOpen = day >= 1 && day <= 5 && hour >= 8 && hour < 17;

    const handleCopy = (text, fieldKey) => {
        navigator.clipboard.writeText(text);
        setCopiedField(fieldKey);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const fullAddress = "Kolej Teknologi Termaju (ADTEC), Jabatan Tenaga Manusia, Kampus Sandakan, Batu 5 Jalan Sibuga, 90000 Sandakan, Sabah.";
    const googleMapsUrl = "https://www.google.com/maps/search/?api=1&query=ADTEC+Sandakan+Batu+5+Jalan+Sibuga";

    return (
        <div
            onClick={onClose}
            className="fixed inset-0 z-[999] flex items-center justify-center p-3 sm:p-5 md:p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in"
        >
            {/* Kontena Responsif: Mobile (max-w-lg), Tablet/Laptop/Desktop (max-w-xl) */}
            <div
                onClick={(e) => e.stopPropagation()}
                style={{ maxHeight: '86dvh' }}
                className="relative w-full max-w-lg sm:max-w-xl max-h-[86vh] flex flex-col rounded-[1.5rem] sm:rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.35)] overflow-hidden animate-slide-up"
            >
                {/* HEADER MODAL (STICKY) */}
                <div className="shrink-0 relative z-10 px-4 sm:px-7 py-4 sm:py-5 border-b border-slate-100 bg-white/95 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25 shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div className="min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-base sm:text-xl font-extrabold text-slate-900 tracking-tight">
                                    Hubungi Kami
                                </h2>
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                                        isOfficeOpen
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                                            : 'bg-slate-100 text-slate-500 border-slate-200'
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isOfficeOpen ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                                    {isOfficeOpen ? 'Pejabat Buka' : 'Tutup'}
                                </span>
                            </div>
                            <p className="text-[11px] sm:text-[13px] font-semibold text-slate-500 truncate">
                                Saluran rasmi & bantuan teknikal iFMS
                            </p>
                        </div>
                    </div>

                    {/* Butang Batal / Tutup Jelas */}
                    <button
                        type="button"
                        onClick={onClose}
                        className="inline-flex items-center gap-1.5 px-3 py-2 sm:p-2.5 rounded-full bg-red-50 hover:bg-red-100 text-red-600 font-extrabold text-xs transition-all active:scale-95 border border-red-100 shrink-0"
                        aria-label="Tutup"
                    >
                        <span className="sm:hidden">Tutup</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* BODY MODAL (BOLEH SKROL JIKA SKRIN KECIL) */}
                <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-7 space-y-3.5 sm:space-y-4">
                    {/* KAD 1: ALAMAT */}
                    <div className="p-4 sm:p-5 rounded-2xl sm:rounded-3xl bg-slate-50/90 border border-slate-200/80">
                        <div className="flex items-start gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center shrink-0 mt-0.5">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                    <circle cx="12" cy="10" r="3" />
                                </svg>
                            </div>
                            <div>
                                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                                    Lokasi Kampus
                                </span>
                                <h3 className="text-sm sm:text-[15px] font-extrabold text-slate-900 mt-0.5">
                                    Kolej Teknologi Termaju (ADTEC)
                                </h3>
                                <p className="text-xs sm:text-[13px] font-medium text-slate-600 leading-relaxed mt-1">
                                    Jabatan Tenaga Manusia, Kampus Sandakan, Batu 5 Jalan Sibuga, 90000 Sandakan, Sabah.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3 border-t border-slate-200/60">
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                            >
                                Buka Google Maps
                            </a>
                            <button
                                type="button"
                                onClick={() => handleCopy(fullAddress, 'alamat')}
                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all active:scale-95"
                            >
                                {copiedField === 'alamat' ? '✓ Alamat Disalin' : 'Salin Alamat'}
                            </button>
                        </div>
                    </div>

                    {/* KAD 2 & 3: TELEFON & EMEL (1 Kolum di Mobile kecil, 2 Kolum di Tablet/Desktop) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="p-4 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><rect width="14" height="20" x="5" y="2" rx="2"/><path d="M12 18h.01"/></svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('089-240500', 'tel')}
                                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600"
                                >
                                    {copiedField === 'tel' ? '✓ Disalin' : 'Salin'}
                                </button>
                            </div>
                            <div className="mt-2.5">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Talian Pejabat</div>
                                <a href="tel:089240500" className="text-sm sm:text-base font-extrabold text-slate-900 hover:text-blue-600 block mt-0.5">
                                    089-240500
                                </a>
                            </div>
                        </div>

                        <div className="p-4 rounded-2xl sm:rounded-3xl bg-white border border-slate-200/80 flex flex-col justify-between">
                            <div className="flex items-center justify-between">
                                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('ilpsdk@jtm.gov.my', 'email')}
                                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600"
                                >
                                    {copiedField === 'email' ? '✓ Disalin' : 'Salin'}
                                </button>
                            </div>
                            <div className="mt-2.5">
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">E-mel Rasmi</div>
                                <a href="mailto:ilpsdk@jtm.gov.my" className="text-sm sm:text-[15px] font-extrabold text-slate-900 hover:text-emerald-600 block mt-0.5 truncate">
                                    ilpsdk@jtm.gov.my
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* KAD 4: PORTAL RASMI */}
                    <a
                        href="https://adtecsandakan.gov.my"
                        target="_blank"
                        rel="noreferrer"
                        className="group p-4 rounded-2xl sm:rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300">Laman Web Rasmi</div>
                                <div className="text-sm sm:text-[15px] font-extrabold">adtecsandakan.gov.my</div>
                            </div>
                        </div>
                        <span className="text-xs font-bold bg-white/10 group-hover:bg-white group-hover:text-blue-700 px-2.5 py-1.5 rounded-full transition-all">
                            ↗
                        </span>
                    </a>
                </div>

                {/* FOOTER MODAL (STICKY) */}
                <div className="shrink-0 relative z-10 px-4 sm:px-7 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2 text-xs text-slate-500 font-semibold">
                    <span className="truncate">Isnin – Jumaat • 8:00 PG – 5:00 PTG</span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-extrabold transition-all active:scale-95 shrink-0"
                    >
                        Batal / Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HubungiModal;
import React, { useState } from 'react';

const HubungiModal = ({ isOpen, onClose }) => {
    const [copiedField, setCopiedField] = useState(null);

    if (!isOpen) return null;

    // Semak status waktu operasi pejabat (Isnin - Jumaat, 8:00 AM - 5:00 PM)
    const now = new Date();
    const day = now.getDay(); // 0 = Ahad, 6 = Sabtu
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
            className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-slate-900/50 backdrop-blur-md animate-fade-in"
        >
            {/* Kontena Utama Glassmorphism 2026 */}
            <div
                onClick={(e) => e.stopPropagation()}
                className="relative w-full max-w-xl rounded-[2rem] bg-white/95 backdrop-blur-2xl border border-white shadow-[0_25px_70px_-15px_rgba(15,23,42,0.25)] overflow-hidden transition-all duration-500 animate-slide-up"
            >
                {/* Efek cahaya lembut latar */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

                {/* HEADER MODAL */}
                <div className="relative z-10 px-6 sm:px-8 pt-6 pb-5 border-b border-slate-100 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3.5">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-600 to-blue-600 text-white flex items-center justify-center shadow-lg shadow-indigo-500/25">
                            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                            </svg>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 flex-wrap">
                                <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
                                    Hubungi Kami
                                </h2>
                                {/* Lencana Status Operasi Live */}
                                <span
                                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${
                                        isOfficeOpen
                                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200/80'
                                            : 'bg-slate-100 text-slate-500 border-slate-200'
                                    }`}
                                >
                                    <span className={`w-1.5 h-1.5 rounded-full ${isOfficeOpen ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'}`} />
                                    {isOfficeOpen ? 'Pejabat Buka' : 'Luar Waktu Pejabat'}
                                </span>
                            </div>
                            <p className="text-xs sm:text-[13px] font-semibold text-slate-500 mt-0.5">
                                Saluran rasmi & bantuan teknikal sistem iFMS
                            </p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-600 flex items-center justify-center transition-all active:scale-90 flex-shrink-0"
                        aria-label="Tutup"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                {/* BODY: BENTO GRID INTERAKTIF */}
                <div className="relative z-10 p-6 sm:p-8 space-y-4">
                    
                    {/* KAD 1: ALAMAT UTAMA + BUTANG PETA & SALIN */}
                    <div className="group p-5 rounded-3xl bg-slate-50/90 hover:bg-white border border-slate-200/80 hover:border-indigo-200 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-start justify-between gap-3">
                            <div className="flex items-start gap-3.5">
                                <div className="w-10 h-10 rounded-2xl bg-indigo-100/80 text-indigo-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                                        <circle cx="12" cy="10" r="3" />
                                    </svg>
                                </div>
                                <div>
                                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600">
                                        Lokasi Kampus
                                    </span>
                                    <h3 className="text-[15px] font-extrabold text-slate-900 mt-0.5">
                                        Kolej Teknologi Termaju (ADTEC)
                                    </h3>
                                    <p className="text-[13px] font-medium text-slate-600 leading-relaxed mt-1">
                                        Jabatan Tenaga Manusia, Kampus Sandakan,<br />
                                        Batu 5 Jalan Sibuga, 90000 Sandakan, Sabah.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Butang Tindakan Pantas Alamat */}
                        <div className="flex flex-wrap items-center gap-2 mt-4 pt-3.5 border-t border-slate-200/60">
                            <a
                                href={googleMapsUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="3 11 22 2 13 21 11 13 3 11"/></svg>
                                Buka Google Maps
                            </a>
                            <button
                                type="button"
                                onClick={() => handleCopy(fullAddress, 'alamat')}
                                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-all active:scale-95"
                            >
                                {copiedField === 'alamat' ? (
                                    <span className="text-emerald-600 font-extrabold">✓ Alamat Disalin</span>
                                ) : (
                                    <>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                                        Salin Alamat
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* KAD 2 & 3: TELEFON & E-MEL (2 KOLUM) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Telefon */}
                        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 hover:border-blue-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
                                        <path d="M12 18h.01" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('089-240500', 'tel')}
                                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-blue-50 text-slate-600 hover:text-blue-600 transition-colors"
                                >
                                    {copiedField === 'tel' ? '✓ Disalin' : 'Salin'}
                                </button>
                            </div>
                            <div className="mt-3">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Talian Pejabat</div>
                                <a href="tel:089240500" className="text-base font-extrabold text-slate-900 hover:text-blue-600 transition-colors block mt-0.5">
                                    089-240500
                                </a>
                            </div>
                        </div>

                        {/* E-mel */}
                        <div className="p-4 rounded-3xl bg-white border border-slate-200/80 hover:border-emerald-300 shadow-sm hover:shadow-md transition-all flex flex-col justify-between">
                            <div className="flex items-start justify-between gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round">
                                        <rect width="20" height="16" x="2" y="4" rx="2" />
                                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                    </svg>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleCopy('ilpsdk@jtm.gov.my', 'email')}
                                    className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 transition-colors"
                                >
                                    {copiedField === 'email' ? '✓ Disalin' : 'Salin'}
                                </button>
                            </div>
                            <div className="mt-3">
                                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">E-mel Rasmi</div>
                                <a href="mailto:ilpsdk@jtm.gov.my" className="text-[15px] font-extrabold text-slate-900 hover:text-emerald-600 transition-colors block mt-0.5 truncate">
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
                        className="group p-4 rounded-3xl bg-gradient-to-r from-slate-900 to-slate-800 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-3.5">
                            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
                                    <path d="M2 12h20" />
                                </svg>
                            </div>
                            <div>
                                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-blue-100">
                                    Laman Web Rasmi
                                </div>
                                <div className="text-[15px] font-extrabold tracking-tight">
                                    adtecsandakan.gov.my
                                </div>
                            </div>
                        </div>
                        <div className="w-9 h-9 rounded-full bg-white/10 group-hover:bg-white group-hover:text-blue-700 flex items-center justify-center transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="7" y1="17" x2="17" y2="7" />
                                <polyline points="7 7 17 7 17 17" />
                            </svg>
                        </div>
                    </a>
                </div>

                {/* FOOTER MODAL */}
                <div className="relative z-10 px-6 sm:px-8 py-4 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-semibold">
                    <span>Isnin – Jumaat • 8:00 PG – 5:00 PTG</span>
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-extrabold transition-all active:scale-95"
                    >
                        Tutup
                    </button>
                </div>
            </div>
        </div>
    );
};

export default HubungiModal;
import React, { useState } from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const PlaneTakeoffIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M6.36 17.4 4 17l-2-4 1.1-.55a2 2 0 0 1 1.8 0l.17.1a2 2 0 0 0 1.8 0L8 12 5 6l.9-.45a2 2 0 0 1 2.09.2l4.02 3a2 2 0 0 0 2.1.2l4.19-2.06a2.41 2.41 0 0 1 1.73-.17L21 7a1.4 1.4 0 0 1 .87 1.99l-.38.76c-.23.46-.6.84-1.07 1.08L7.58 17.2a2 2 0 0 1-1.22.18Z"/></svg>
);

const PlaneLandingIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"><path d="M2 22h20"/><path d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"/></svg>
);

const SwapIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
);

// Senarai Lapangan Terbang Popular & Domestik Malaysia (Gaya AirAsia/MAS)
const AIRPORT_LIST = [
    { code: 'SDK', city: 'Sandakan', name: 'Lapangan Terbang Sandakan', state: 'Sabah', popular: true },
    { code: 'KUL', city: 'Kuala Lumpur', name: 'KLIA / KLIA2', state: 'Selangor', popular: true },
    { code: 'BKI', city: 'Kota Kinabalu', name: 'Lapangan Terbang Antarabangsa KK', state: 'Sabah', popular: true },
    { code: 'TWU', city: 'Tawau', name: 'Lapangan Terbang Tawau', state: 'Sabah', popular: true },
    { code: 'LDU', city: 'Lahad Datu', name: 'Lapangan Terbang Lahad Datu', state: 'Sabah', popular: false },
    { code: 'LBU', city: 'Labuan', name: 'Lapangan Terbang Labuan', state: 'WP Labuan', popular: false },
    { code: 'KCH', city: 'Kuching', name: 'Lapangan Terbang Antarabangsa Kuching', state: 'Sarawak', popular: true },
    { code: 'MYY', city: 'Miri', name: 'Lapangan Terbang Miri', state: 'Sarawak', popular: false },
    { code: 'SBW', city: 'Sibu', name: 'Lapangan Terbang Sibu', state: 'Sarawak', popular: false },
    { code: 'BTU', city: 'Bintulu', name: 'Lapangan Terbang Bintulu', state: 'Sarawak', popular: false },
    { code: 'PEN', city: 'Pulau Pinang', name: 'Lapangan Terbang Antarabangsa Penang', state: 'Pulau Pinang', popular: true },
    { code: 'JHB', city: 'Johor Bahru', name: 'Lapangan Terbang Antarabangsa Senai', state: 'Johor', popular: true },
    { code: 'KBR', city: 'Kota Bharu', name: 'Lapangan Terbang Sultan Ismail Petra', state: 'Kelantan', popular: false },
    { code: 'TGG', city: 'Kuala Terengganu', name: 'Lapangan Terbang Sultan Mahmud', state: 'Terengganu', popular: false },
    { code: 'AOR', city: 'Alor Setar', name: 'Lapangan Terbang Sultan Abdul Halim', state: 'Kedah', popular: false },
    { code: 'LGK', city: 'Langkawi', name: 'Lapangan Terbang Antarabangsa Langkawi', state: 'Kedah', popular: false },
    { code: 'KUA', city: 'Kuantan', name: 'Lapangan Terbang Sultan Haji Ahmad Shah', state: 'Pahang', popular: false },
    { code: 'IPH', city: 'Ipoh', name: 'Lapangan Terbang Sultan Azlan Shah', state: 'Perak', popular: false },
    { code: 'SZB', city: 'Subang', name: 'Lapangan Terbang Sultan Abdul Aziz Shah', state: 'Selangor', popular: true },
];

const AIRLINES = [
    { id: 'AIRASIA', name: 'AirAsia', tag: 'AK / D7', color: 'border-red-500 bg-red-50/70 text-red-700', dot: 'bg-red-500' },
    { id: 'MAS', name: 'Malaysia Airlines', tag: 'MH', color: 'border-blue-600 bg-blue-50/70 text-blue-800', dot: 'bg-blue-600' },
    { id: 'BATIK', name: 'Batik Air', tag: 'OD', color: 'border-indigo-500 bg-indigo-50/70 text-indigo-800', dot: 'bg-indigo-600' },
    { id: 'FIREFLY', name: 'Firefly', tag: 'FY', color: 'border-orange-500 bg-orange-50/70 text-orange-800', dot: 'bg-orange-500' },
];

const FormTiket = ({
    formData, handleChange, setFormData, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    malaysiaAirports, getAirportName, setRoute, isPegawaiComplete, isTiketInfoComplete, isTiketFlightComplete, isTandatanganComplete,
    shakeSection, canvasRef, startDrawing, draw, stopDrawing, clearSignature, handleSignatureUpload
}) => {
    // State untuk Modal Pemilih Lapangan Terbang (Ala AirAsia/MAS)
    const [airportModal, setAirportModal] = useState({ open: false, field: '', label: '' });
    const [searchQuery, setSearchQuery] = useState('');

    const openAirportPicker = (field, label) => {
        setSearchQuery('');
        setAirportModal({ open: true, field, label });
    };

    const selectAirport = (code) => {
        setFormData(prev => {
            const updated = { ...prev, [airportModal.field]: code };
            // Auto-kemaskini laluan balik jika user ubah Pergi L1 dan laluan balik belum diisi
            if (airportModal.field === 'flightPergiDari' && !prev.flightBalikKe) {
                updated.flightBalikKe = code;
            }
            if (airportModal.field === 'flightPergiKe' && !prev.flightBalikDari) {
                updated.flightBalikDari = code;
            }
            return updated;
        });
        setAirportModal({ open: false, field: '', label: '' });
    };

    const swapRoute = (dariField, keField) => {
        setFormData(prev => ({
            ...prev,
            [dariField]: prev[keField],
            [keField]: prev[dariField]
        }));
    };

    const autoMirrorReturn = () => {
        setFormData(prev => ({
            ...prev,
            flightBalikDari: prev.flightPergiKe || 'KUL',
            flightBalikKe: prev.flightPergiDari || 'SDK',
            ...(prev.flightType === 'multi' ? {
                flightBalikLeg2Dari: prev.flightPergiLeg2Ke || '',
                flightBalikLeg2Ke: prev.flightPergiLeg2Dari || ''
            } : {})
        }));
    };

    const getAirportDetails = (code) => {
        if (!code) return { city: 'Pilih Lokasi', name: 'Klik untuk pilih lapangan terbang' };
        const upper = code.toUpperCase();
        const found = AIRPORT_LIST.find(a => a.code === upper);
        if (found) return found;
        const fallbackName = getAirportName ? getAirportName(upper) : '';
        return { city: upper, name: fallbackName || 'Kod Lapangan Terbang' };
    };

    const filteredAirports = AIRPORT_LIST.filter(a =>
        a.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        a.state.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Komponen Kad Segmen Penerbangan Moden (Ala Boarding Pass / App AirAsia)
    const renderFlightLegCard = ({
        badge,
        title,
        accentColor = 'cyan',
        tarikhName,
        masaName,
        dariName,
        keName,
        dariPlaceholder,
        kePlaceholder,
        showAutoMirror = false
    }) => {
        const dariInfo = getAirportDetails(formData[dariName]);
        const keInfo = getAirportDetails(formData[keName]);
        const isAmber = accentColor === 'amber';

        return (
            <div className={`mb-5 rounded-3xl border transition-all overflow-hidden ${isAmber ? 'bg-amber-50/40 border-amber-200/80' : 'bg-slate-50/80 border-slate-200/90'}`}>
                {/* Header Kad Tiket */}
                <div className={`px-5 py-3 flex items-center justify-between border-b ${isAmber ? 'bg-amber-100/50 border-amber-200/60' : 'bg-white border-slate-100'}`}>
                    <div className="flex items-center gap-2.5">
                        <span className={`px-2.5 py-1 rounded-lg text-[11px] font-extrabold uppercase tracking-wider ${isAmber ? 'bg-amber-500 text-white' : 'bg-slate-900 text-white'}`}>
                            {badge}
                        </span>
                        <span className="text-xs font-bold text-slate-600">{title}</span>
                    </div>
                    {showAutoMirror && (
                        <button
                            type="button"
                            onClick={autoMirrorReturn}
                            className="text-xs font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 px-3 py-1.5 rounded-xl transition-all active:scale-95 flex items-center gap-1.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
                            Sama Macam Pergi
                        </button>
                    )}
                </div>

                {/* Bahagian Pilihan Laluan (DARI ⇄ KE) Ala App Penerbangan */}
                <div className="p-4 sm:p-5">
                    <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
                        {/* Kotak DARI */}
                        <div
                            onClick={() => openAirportPicker(dariName, `${title} — Berlepas Dari`)}
                            className="group bg-white hover:bg-cyan-50/40 border-2 border-slate-200/90 hover:border-cyan-500 rounded-2xl p-4 cursor-pointer transition-all shadow-sm flex flex-col justify-between"
                        >
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                <span className="flex items-center gap-1.5 text-slate-500"><PlaneTakeoffIcon /> Dari (Berlepas)</span>
                                <span className="text-cyan-600 opacity-80 group-hover:opacity-100">Tukar</span>
                            </div>
                            <div className="flex items-baseline gap-2.5 my-0.5">
                                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                                    {formData[dariName] || dariPlaceholder}
                                </span>
                                <span className="text-sm font-bold text-slate-700 truncate">
                                    {dariInfo.city}
                                </span>
                            </div>
                            <div className="text-[11px] font-medium text-slate-400 truncate">
                                {dariInfo.name}
                            </div>
                        </div>

                        {/* Butang Swap Tengah (Terapung antara DARI dan KE) */}
                        <button
                            type="button"
                            onClick={(e) => {
                                e.stopPropagation();
                                swapRoute(dariName, keName);
                            }}
                            title="Tukar arah pergi & balik"
                            className="sm:absolute sm:left-1/2 sm:top-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 z-10 mx-auto -my-1.5 sm:my-0 w-10 h-10 rounded-full bg-white hover:bg-cyan-600 text-slate-600 hover:text-white border-2 border-slate-200 hover:border-cyan-600 shadow-md flex items-center justify-center transition-all active:scale-90"
                        >
                            <SwapIcon />
                        </button>

                        {/* Kotak KE */}
                        <div
                            onClick={() => openAirportPicker(keName, `${title} — Destinasi Ke`)}
                            className="group bg-white hover:bg-cyan-50/40 border-2 border-slate-200/90 hover:border-cyan-500 rounded-2xl p-4 cursor-pointer transition-all shadow-sm flex flex-col justify-between sm:pl-7"
                        >
                            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                                <span className="flex items-center gap-1.5 text-slate-500"><PlaneLandingIcon /> Ke (Destinasi)</span>
                                <span className="text-cyan-600 opacity-80 group-hover:opacity-100">Tukar</span>
                            </div>
                            <div className="flex items-baseline gap-2.5 my-0.5">
                                <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900">
                                    {formData[keName] || kePlaceholder}
                                </span>
                                <span className="text-sm font-bold text-slate-700 truncate">
                                    {keInfo.city}
                                </span>
                            </div>
                            <div className="text-[11px] font-medium text-slate-400 truncate">
                                {keInfo.name}
                            </div>
                        </div>
                    </div>

                    {/* Garisan Putus-Putus Ala Boarding Pass */}
                    <div className="my-4 border-t-2 border-dashed border-slate-200/90"></div>

                    {/* Tarikh & Masa Penerbangan */}
                    <div className="grid grid-cols-2 gap-3">
                        <div className="bg-white border border-slate-200/90 rounded-2xl px-3.5 py-2.5 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                                Tarikh Penerbangan
                            </label>
                            <input
                                type="date"
                                name={tarikhName}
                                value={formData[tarikhName]}
                                onChange={handleChange}
                                className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-800 focus:outline-none"
                            />
                        </div>
                        <div className="bg-white border border-slate-200/90 rounded-2xl px-3.5 py-2.5 focus-within:border-cyan-500 focus-within:ring-2 focus-within:ring-cyan-500/20 transition-all">
                            <label className="block text-[11px] font-extrabold text-slate-400 uppercase tracking-wider mb-1">
                                Waktu Berlepas
                            </label>
                            <input
                                type="time"
                                name={masaName}
                                value={formData[masaName]}
                                onChange={handleChange}
                                className="w-full bg-transparent text-sm sm:text-base font-bold text-slate-800 focus:outline-none"
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            {/* MODAL CARIAN LAPANGAN TERBANG (GAYA AIRASIA / MAS) */}
            {airportModal.open && (
                <div
                    onClick={() => setAirportModal({ open: false, field: '', label: '' })}
                    className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fade-in"
                >
                    <div
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white w-full sm:max-w-lg rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-100 overflow-hidden flex flex-col max-h-[85vh]"
                    >
                        {/* Header Modal */}
                        <div className="px-6 py-4 bg-slate-900 text-white flex items-center justify-between">
                            <div>
                                <p className="text-[11px] font-bold text-cyan-400 uppercase tracking-wider">Pilih Lapangan Terbang</p>
                                <h3 className="text-base font-extrabold">{airportModal.label}</h3>
                            </div>
                            <button
                                type="button"
                                onClick={() => setAirportModal({ open: false, field: '', label: '' })}
                                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Kotak Carian Pantas */}
                        <div className="p-4 border-b border-slate-100 bg-slate-50">
                            <div className="relative">
                                <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
                                <input
                                    type="text"
                                    autoFocus
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Cari bandar, negeri atau kod (cth: Sandakan, KUL, KK)..."
                                    className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-2xl text-sm font-semibold text-slate-800 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/20"
                                />
                            </div>
                        </div>

                        {/* Senarai Lapangan Terbang */}
                        <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
                            {filteredAirports.length > 0 ? (
                                filteredAirports.map((airport) => {
                                    const isSelected = formData[airportModal.field] === airport.code;
                                    return (
                                        <button
                                            key={airport.code}
                                            type="button"
                                            onClick={() => selectAirport(airport.code)}
                                            className={`w-full text-left px-4 py-3 rounded-2xl flex items-center justify-between transition-all ${
                                                isSelected
                                                    ? 'bg-cyan-50 border-2 border-cyan-500'
                                                    : 'hover:bg-slate-50 border-2 border-transparent'
                                            }`}
                                        >
                                            <div className="pr-3">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-extrabold text-slate-800 text-sm">{airport.city}</span>
                                                    <span className="text-[11px] font-semibold text-slate-400">• {airport.state}</span>
                                                    {airport.popular && !searchQuery && (
                                                        <span className="text-[10px] font-bold bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full">Popular</span>
                                                    )}
                                                </div>
                                                <div className="text-xs text-slate-500 mt-0.5">{airport.name}</div>
                                            </div>
                                            <span className={`px-3 py-1.5 rounded-xl font-black text-sm tracking-widest ${
                                                isSelected ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700'
                                            }`}>
                                                {airport.code}
                                            </span>
                                        </button>
                                    );
                                })
                            ) : (
                                <div className="p-6 text-center">
                                    <p className="text-sm font-bold text-slate-600 mb-3">Tiada dalam senarai? Guna kod IATA manual:</p>
                                    {searchQuery.trim().length === 3 && (
                                        <button
                                            type="button"
                                            onClick={() => selectAirport(searchQuery.trim().toUpperCase())}
                                            className="bg-cyan-600 text-white font-bold px-5 py-2.5 rounded-xl text-sm shadow-md"
                                        >
                                            Guna Kod "{searchQuery.trim().toUpperCase()}"
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* 1. MAKLUMAT DESTINASI */}
            <div id="section-tiketInfo" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tiketInfo ? 'border-slate-100 ring-[3px] ring-cyan-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tiketInfo' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('tiketInfo')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.tiketInfo ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30' : (isTiketInfoComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isTiketInfoComplete && !expanded.tiketInfo ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m12 18-7-7 7-7"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Destinasi {isTiketInfoComplete && !expanded.tiketInfo && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tiketInfo && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTiketInfoComplete ? formData.tujuan : 'Wajib dilengkapkan dahulu'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.tiketInfo && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div className="md:col-span-2 relative z-20">
                                <label className={formLabelClass}>Tujuan Penerbangan <span className="text-red-500">*</span></label>
                                <input type="text" name="tujuan" value={formData.tujuan} onChange={handleChange} className={`${formInputClass} relative z-20`} placeholder="Mesyuarat / Kursus / Bengkel dll" />
                            </div>
                            <div className="md:col-span-2 relative z-20">
                                <label className={formLabelClass}>Tempat / Lokasi Dituju <span className="text-red-500">*</span></label>
                                <input type="text" name="tempat" value={formData.tempat} onChange={handleChange} className={`${formInputClass} relative z-20`} placeholder="Cth: JTM Putrajaya" />
                            </div>
                            <div className="relative z-0">
                                <label className={formLabelClass}>Tarikh Pergi <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhPergi" value={formData.tarikhPergi} onChange={handleChange} className={`${formInputClass} relative z-0`} />
                            </div>
                            <div className="relative z-0">
                                <label className={formLabelClass}>Tarikh Balik <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhBalik" value={formData.tarikhBalik} min={formData.tarikhPergi} onChange={handleChange} className={`${formInputClass} relative z-0`} />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('tiketInfo', 'tiket')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 2. BUTIRAN PENERBANGAN (REKA BENTUK MODEN ALA AIRASIA / MAS) */}
            <div id="section-tiket" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isTiketInfoComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tiket ? 'border-slate-100 ring-[3px] ring-cyan-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tiket' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isTiketInfoComplete && toggleSection('tiket')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTiketInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isTiketInfoComplete ? 'bg-slate-200 text-slate-500' : (expanded.tiket ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30' : (isTiketFlightComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'))}`}>
                            {!isTiketInfoComplete ? <LockIcon /> : (isTiketFlightComplete && !expanded.tiket ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <PlaneTakeoffIcon />)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Butiran Penerbangan {isTiketFlightComplete && !expanded.tiket && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tiket && isTiketInfoComplete && (
                                <p className="text-[13px] text-slate-500 font-semibold mt-0.5">
                                    {isTiketFlightComplete ? `${formData.flightPergiDari || 'SDK'} ⇄ ${formData.flightPergiKe || 'KUL'}` : 'Pilih laluan & jadual penerbangan'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {expanded.tiket && isTiketInfoComplete && (
                    <div className="p-5 md:p-8 pt-3 border-t border-slate-100 bg-white animate-slide-up">
                        {/* Segmented Tab Switcher (Ala App Penerbangan) */}
                        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1.5 mb-6">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, flightType: 'single' }))}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                                    formData.flightType === 'single'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                ✈️ Penerbangan Terus
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, flightType: 'multi' }))}
                                className={`flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all ${
                                    formData.flightType === 'multi'
                                        ? 'bg-white text-slate-900 shadow-sm'
                                        : 'text-slate-500 hover:text-slate-700'
                                }`}
                            >
                                🔄 Transit (Multi-Leg)
                            </button>
                        </div>

                        {/* KAD PERGI (L1) */}
                        {renderFlightLegCard({
                            badge: 'Pergi • L1',
                            title: 'Penerbangan Pergi',
                            accentColor: 'cyan',
                            tarikhName: 'flightPergiTarikh',
                            masaName: 'flightPergiMasa',
                            dariName: 'flightPergiDari',
                            keName: 'flightPergiKe',
                            dariPlaceholder: 'SDK',
                            kePlaceholder: 'KUL'
                        })}

                        {/* KAD PERGI TRANSIT (L2) */}
                        {formData.flightType === 'multi' && renderFlightLegCard({
                            badge: 'Pergi • L2',
                            title: 'Penerbangan Sambungan (Transit)',
                            accentColor: 'amber',
                            tarikhName: 'flightPergiLeg2Tarikh',
                            masaName: 'flightPergiLeg2Masa',
                            dariName: 'flightPergiLeg2Dari',
                            keName: 'flightPergiLeg2Ke',
                            dariPlaceholder: 'KUL',
                            kePlaceholder: 'JHB'
                        })}

                        {/* KAD BALIK (L1) */}
                        {renderFlightLegCard({
                            badge: 'Balik • L1',
                            title: 'Penerbangan Balik',
                            accentColor: 'cyan',
                            tarikhName: 'flightBalikTarikh',
                            masaName: 'flightBalikMasa',
                            dariName: 'flightBalikDari',
                            keName: 'flightBalikKe',
                            dariPlaceholder: 'KUL',
                            kePlaceholder: 'SDK',
                            showAutoMirror: true
                        })}

                        {/* KAD BALIK TRANSIT (L2) */}
                        {formData.flightType === 'multi' && renderFlightLegCard({
                            badge: 'Balik • L2',
                            title: 'Penerbangan Sambungan Balik',
                            accentColor: 'amber',
                            tarikhName: 'flightBalikLeg2Tarikh',
                            masaName: 'flightBalikLeg2Masa',
                            dariName: 'flightBalikLeg2Dari',
                            keName: 'flightBalikLeg2Ke',
                            dariPlaceholder: 'JHB',
                            kePlaceholder: 'KUL'
                        })}

                        {/* PILIHAN SYARIKAT PENERBANGAN VISUAL (GAYA APP MODEN) */}
                        <div className="mt-7 pt-6 border-t border-slate-100">
                            <label className="block text-xs font-extrabold text-slate-500 uppercase tracking-wider mb-3">
                                Pilih Syarikat Penerbangan
                            </label>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-6">
                                {AIRLINES.map((airline) => {
                                    const active = formData.kodSyarikat === airline.id;
                                    return (
                                        <button
                                            key={airline.id}
                                            type="button"
                                            onClick={() => setFormData(prev => ({ ...prev, kodSyarikat: airline.id }))}
                                            className={`p-3.5 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                                                active
                                                    ? `${airline.color} shadow-sm scale-[1.01]`
                                                    : 'bg-white border-slate-200/80 hover:border-slate-300 text-slate-600'
                                            }`}
                                        >
                                            <div className="flex items-center justify-between mb-1.5">
                                                <span className={`w-2.5 h-2.5 rounded-full ${active ? airline.dot : 'bg-slate-300'}`}></span>
                                                <span className="text-[10px] font-black opacity-70">{airline.tag}</span>
                                            </div>
                                            <div className="text-xs sm:text-[13px] font-extrabold leading-tight">
                                                {airline.name}
                                            </div>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* No Ahli Enrich / AirAsia Rewards */}
                            <div>
                                <label className={formLabelClass}>
                                    No. Ahli <span className="text-slate-400 font-normal lowercase">(Enrich / AirAsia Rewards ID)</span>
                                </label>
                                <input
                                    type="text"
                                    name="enrichId"
                                    value={formData.enrichId}
                                    onChange={handleChange}
                                    className={formInputClass}
                                    placeholder="Kosongkan jika tiada"
                                />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('tiket', 'tandatangan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. TANDATANGAN PEMOHON */}
            <div id="section-tandatangan" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isTiketFlightComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tandatangan ? 'border-slate-100 ring-[3px] ring-cyan-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isTiketFlightComplete && toggleSection('tandatangan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTiketFlightComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isTiketFlightComplete ? 'bg-slate-200 text-slate-500' : (expanded.tandatangan ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30' : (isTandatanganComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'))}`}>
                            {!isTiketFlightComplete ? <LockIcon /> : (isTandatanganComplete && !expanded.tandatangan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Tandatangan <span className="hidden sm:inline">Pemohon</span> <span className="text-[11px] font-bold text-slate-400 ml-1 bg-slate-100 px-2 py-0.5 rounded-full uppercase">(Pilihan)</span></h2>
                            {!expanded.tandatangan && isTiketFlightComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTandatanganComplete ? 'Tandatangan telah direkodkan' : 'Boleh dikosongkan (optional)'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.tandatangan && isTiketFlightComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                        <div className="bg-blue-50/50 rounded-2xl p-4 sm:p-6 border border-blue-100 relative z-20">
                            {isTandatanganComplete ? (
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="w-full max-w-sm h-48 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
                                        <img src={formData.tandatangan} alt="Tandatangan" className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <button onClick={clearSignature} className="text-red-500 hover:text-red-700 text-[13px] font-bold py-2 px-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors">Padam & Lukis Semula</button>
                                </div>
                            ) : (
                                <div className="flex flex-col space-y-4">
                                    <div className="relative w-full h-48 bg-white border-2 border-dashed border-slate-300 rounded-xl overflow-hidden touch-none hover:border-cyan-400 transition-colors">
                                        <canvas ref={canvasRef} onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} onTouchStart={startDrawing} onTouchMove={draw} onTouchEnd={stopDrawing} className="w-full h-full cursor-crosshair touch-none" />
                                        <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 text-slate-400 bg-white/80 px-2 py-1 rounded-lg text-xs font-bold shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path><path d="M2 2l7.586 7.586"></path><circle cx="11" cy="11" r="2"></circle></svg> Lukis di sini
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">ATAU</span>
                                        <div className="h-px bg-slate-200 flex-1"></div>
                                    </div>
                                    <div>
                                        <label htmlFor="signature-upload" className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-cyan-400 hover:bg-cyan-50 text-slate-600 hover:text-cyan-600 font-bold py-3 px-4 rounded-xl cursor-pointer transition-all text-[13px] shadow-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                                            Muat Naik Gambar (Latar Putih)
                                        </label>
                                        <input id="signature-upload" type="file" accept="image/*" onChange={handleSignatureUpload} className="hidden" />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('tandatangan', 'jana')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Selesai <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormTiket;

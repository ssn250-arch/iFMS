import React, { useState } from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const AIRPORT_LIST = [
    { code: 'SDK', city: 'Sandakan', state: 'Sabah', name: 'Lapangan Terbang Sandakan' },
    { code: 'BKI', city: 'Kota Kinabalu', state: 'Sabah', name: 'Lapangan Terbang Antarabangsa KK' },
    { code: 'TWU', city: 'Tawau', state: 'Sabah', name: 'Lapangan Terbang Tawau' },
    { code: 'LDU', city: 'Lahad Datu', state: 'Sabah', name: 'Lapangan Terbang Lahad Datu' },
    { code: 'LBU', city: 'Labuan', state: 'WP Labuan', name: 'Lapangan Terbang Labuan' },
    { code: 'KUL', city: 'Kuala Lumpur (KLIA 1/2)', state: 'Selangor / KL', name: 'Lapangan Terbang Antarabangsa KL' },
    { code: 'SZB', city: 'Subang', state: 'Selangor', name: 'Lapangan Terbang Sultan Abdul Aziz Shah' },
    { code: 'PEN', city: 'Pulau Pinang', state: 'Pulau Pinang', name: 'Lapangan Terbang Antarabangsa Bayan Lepas' },
    { code: 'JHB', city: 'Johor Bahru', state: 'Johor', name: 'Lapangan Terbang Antarabangsa Senai' },
    { code: 'KCH', city: 'Kuching', state: 'Sarawak', name: 'Lapangan Terbang Antarabangsa Kuching' },
    { code: 'MYY', city: 'Miri', state: 'Sarawak', name: 'Lapangan Terbang Miri' },
    { code: 'SBW', city: 'Sibu', state: 'Sarawak', name: 'Lapangan Terbang Sibu' },
    { code: 'BTU', city: 'Bintulu', state: 'Sarawak', name: 'Lapangan Terbang Bintulu' },
    { code: 'KBR', city: 'Kota Bharu', state: 'Kelantan', name: 'Lapangan Terbang Sultan Ismail Petra' },
    { code: 'TGG', city: 'Kuala Terengganu', state: 'Terengganu', name: 'Lapangan Terbang Sultan Mahmud' },
    { code: 'KUA', city: 'Kuantan', state: 'Pahang', name: 'Lapangan Terbang Sultan Haji Ahmad Shah' },
    { code: 'AOR', city: 'Alor Setar', state: 'Kedah', name: 'Lapangan Terbang Sultan Abdul Halim' },
    { code: 'LGK', city: 'Langkawi', state: 'Kedah', name: 'Lapangan Terbang Antarabangsa Langkawi' },
    { code: 'IPH', city: 'Ipoh', state: 'Perak', name: 'Lapangan Terbang Sultan Azlan Shah' },
    { code: 'MKZ', city: 'Melaka', state: 'Melaka', name: 'Lapangan Terbang Antarabangsa Melaka' }
];

const AIRLINES = [
    { id: 'AIRASIA', name: 'AirAsia', badge: 'AK', color: 'bg-red-600' },
    { id: 'MAS', name: 'Malaysia Airlines', badge: 'MH', color: 'bg-blue-800' },
    { id: 'BATIK', name: 'Batik Air', badge: 'OD', color: 'bg-purple-800' },
    { id: 'FIREFLY', name: 'Firefly', badge: 'FY', color: 'bg-orange-500' }
];

const FormTiket = ({
    formData, handleChange, setFormData, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    getAirportName, isPegawaiComplete, isTiketInfoComplete, isTiketFlightComplete, isTandatanganComplete,
    shakeSection, canvasRef, startDrawing, draw, stopDrawing, clearSignature, handleSignatureUpload
}) => {
    const [activeAirportField, setActiveAirportField] = useState(null);
    const [searchAirport, setSearchAirport] = useState('');

    const getCityByCode = (code) => {
        if (!code) return 'Pilih Destinasi';
        const found = AIRPORT_LIST.find(a => a.code === code.toUpperCase());
        return found ? found.city : (getAirportName ? getAirportName(code) : code);
    };

    const openAirportPicker = (e, fieldName) => {
        e.preventDefault();
        e.stopPropagation();
        setSearchAirport('');
        setActiveAirportField(fieldName);
    };

    const selectAirport = (code) => {
        if (!activeAirportField) return;
        const cleanCode = code.trim().toUpperCase().slice(0, 3);
        setFormData(prev => {
            const updated = { ...prev, [activeAirportField]: cleanCode };
            if (activeAirportField === 'flightPergiDari' && !prev.flightBalikKe) {
                updated.flightBalikKe = cleanCode;
            }
            if (activeAirportField === 'flightPergiKe' && !prev.flightBalikDari) {
                updated.flightBalikDari = cleanCode;
            }
            return updated;
        });
        setActiveAirportField(null);
    };

    const swapRoute = (e, leg) => {
        e.preventDefault();
        e.stopPropagation();
        if (leg === 'pergi1') {
            setFormData(prev => ({
                ...prev,
                flightPergiDari: prev.flightPergiKe,
                flightPergiKe: prev.flightPergiDari
            }));
        } else if (leg === 'balik1') {
            setFormData(prev => ({
                ...prev,
                flightBalikDari: prev.flightPergiKe || prev.flightBalikKe,
                flightBalikKe: prev.flightPergiDari || prev.flightBalikDari
            }));
        } else if (leg === 'pergi2') {
            setFormData(prev => ({
                ...prev,
                flightPergiLeg2Dari: prev.flightPergiLeg2Ke,
                flightPergiLeg2Ke: prev.flightPergiLeg2Dari
            }));
        } else if (leg === 'balik2') {
            setFormData(prev => ({
                ...prev,
                flightBalikLeg2Dari: prev.flightBalikLeg2Ke,
                flightBalikLeg2Ke: prev.flightBalikLeg2Dari
            }));
        }
    };

    const handleSafeDateChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const updated = { ...prev, [name]: value };
            // Elak konflik tarikh balik tertinggal di belakang tarikh pergi
            if (name === 'tarikhPergi' && prev.tarikhBalik && value > prev.tarikhBalik) {
                updated.tarikhBalik = value;
            }
            if (name === 'flightPergiTarikh' && prev.flightBalikTarikh && value > prev.flightBalikTarikh) {
                updated.flightBalikTarikh = value;
            }
            return updated;
        });
    };

    const openNativePicker = (e) => {
        try {
            if (typeof e.currentTarget.showPicker === 'function') {
                e.currentTarget.showPicker();
            }
        } catch (_) {
            // Abaikan jika pelayar tidak menyokong showPicker
        }
    };

    const filteredAirports = AIRPORT_LIST.filter(a =>
        a.code.toLowerCase().includes(searchAirport.toLowerCase()) ||
        a.city.toLowerCase().includes(searchAirport.toLowerCase()) ||
        a.state.toLowerCase().includes(searchAirport.toLowerCase())
    );

    const renderRouteSelector = (label, dariField, keField, onSwap, isBalik = false) => (
        <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-sm relative z-30 isolate">
            <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400">{label}</span>
                {isBalik && (
                    <button
                        type="button"
                        onClick={onSwap}
                        className="relative z-30 text-[11px] font-bold text-cyan-700 bg-cyan-50 hover:bg-cyan-100 active:scale-95 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg>
                        Salin Terbalik dari Pergi
                    </button>
                )}
            </div>

            <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
                {/* BUTANG DARI */}
                <button
                    type="button"
                    onClick={(e) => openAirportPicker(e, dariField)}
                    className="relative z-30 text-left p-3 rounded-xl bg-slate-50 hover:bg-cyan-50/60 border border-slate-200/80 hover:border-cyan-400 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 cursor-pointer"
                >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Dari</div>
                    <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
                        {formData[dariField] || '---'}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                        {getCityByCode(formData[dariField])}
                    </div>
                </button>

                {/* BUTANG TUKAR (SWAP) */}
                <button
                    type="button"
                    onClick={onSwap}
                    title="Tukar Destinasi"
                    className="relative z-30 w-9 h-9 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-cyan-600 hover:bg-cyan-600 hover:text-white hover:border-cyan-600 transition-all active:rotate-180 cursor-pointer"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 3 4 7l4 4"/><path d="M4 7h16"/><path d="m16 21 4-4-4-4"/><path d="M20 17H4"/></svg>
                </button>

                {/* BUTANG KE */}
                <button
                    type="button"
                    onClick={(e) => openAirportPicker(e, keField)}
                    className="relative z-30 text-right p-3 rounded-xl bg-slate-50 hover:bg-cyan-50/60 border border-slate-200/80 hover:border-cyan-400 transition-all active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-cyan-500/30 cursor-pointer"
                >
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Ke</div>
                    <div className="text-xl sm:text-2xl font-black text-slate-800 tracking-tight mt-0.5">
                        {formData[keField] || '---'}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-500 truncate mt-0.5">
                        {getCityByCode(formData[keField])}
                    </div>
                </button>
            </div>
        </div>
    );

    return (
        <>
            {/* KUNCI CSS: Halang ikon kalendar/jam daripada melimpah keluar menutupi input lain */}
            <style>{`
                .safe-date-input {
                    position: relative !important;
                    overflow: hidden !important;
                    z-index: 1 !important;
                    display: block !important;
                    width: 100% !important;
                    box-sizing: border-box !important;
                }
                .safe-date-input::-webkit-calendar-picker-indicator {
                    position: static !important;
                    inset: auto !important;
                    width: auto !important;
                    height: auto !important;
                    margin: 0 !important;
                    padding: 0 2px !important;
                    opacity: 0.75 !important;
                    cursor: pointer !important;
                }
            `}</style>

            {/* TIKET INFO */}
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
                            <div className="md:col-span-2 relative z-30">
                                <label className={formLabelClass}>Tujuan Penerbangan <span className="text-red-500">*</span></label>
                                <input type="text" name="tujuan" value={formData.tujuan} onChange={handleChange} className={`${formInputClass} relative z-30`} placeholder="Mesyuarat / Kursus / Bengkel dll" />
                            </div>
                            <div className="md:col-span-2 relative z-30">
                                <label className={formLabelClass}>Tempat / Lokasi Dituju <span className="text-red-500">*</span></label>
                                <input type="text" name="tempat" value={formData.tempat} onChange={handleChange} className={`${formInputClass} relative z-30`} placeholder="Cth: JTM Putrajaya" />
                            </div>
                            <div className="relative z-10 overflow-hidden isolate">
                                <label className={formLabelClass}>Tarikh Pergi <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhPergi" value={formData.tarikhPergi} onChange={handleSafeDateChange} onClick={openNativePicker} className={`${formInputClass} safe-date-input`} />
                            </div>
                            <div className="relative z-10 overflow-hidden isolate">
                                <label className={formLabelClass}>Tarikh Balik <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhBalik" value={formData.tarikhBalik} min={formData.tarikhPergi} onChange={handleSafeDateChange} onClick={openNativePicker} className={`${formInputClass} safe-date-input`} />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end relative z-30">
                            <button type="button" onClick={() => nextSection('tiketInfo', 'tiket')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* FLIGHT TIKET */}
            <div id="section-tiket" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isTiketInfoComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tiket ? 'border-slate-100 ring-[3px] ring-cyan-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tiket' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isTiketInfoComplete && toggleSection('tiket')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTiketInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isTiketInfoComplete ? 'bg-slate-200 text-slate-500' : (expanded.tiket ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30' : (isTiketFlightComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'))}`}>
                            {!isTiketInfoComplete ? <LockIcon /> : (isTiketFlightComplete && !expanded.tiket ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Butiran Penerbangan {isTiketFlightComplete && !expanded.tiket && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tiket && isTiketInfoComplete && (
                                <p className="text-[13px] text-slate-500 font-semibold mt-0.5">
                                    {formData.flightPergiDari && formData.flightPergiKe
                                        ? `${formData.flightPergiDari} ✈ ${formData.flightPergiKe}`
                                        : 'Isi jadual penerbangan anda'}
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {expanded.tiket && isTiketInfoComplete && (
                    <div className="p-5 md:p-8 pt-3 border-t border-slate-100 bg-white animate-slide-up">
                        {/* Segmented Pill Toggle */}
                        <div className="bg-slate-100 p-1.5 rounded-2xl flex gap-1.5 mb-6 relative z-30">
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, flightType: 'single' }))}
                                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${formData.flightType === 'single' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                ✈ Penerbangan Terus
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData(prev => ({ ...prev, flightType: 'multi' }))}
                                className={`flex-1 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer ${formData.flightType === 'multi' ? 'bg-white text-cyan-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                ⇄ Transit (Multi-Leg)
                            </button>
                        </div>

                        {/* KAD PERGI (L1) */}
                        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-cyan-50/30 rounded-3xl border border-slate-200/80 space-y-4 isolate">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
                                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Penerbangan Pergi (L1)</h4>
                            </div>

                            {renderRouteSelector('Laluan Pergi', 'flightPergiDari', 'flightPergiKe', (e) => swapRoute(e, 'pergi1'))}

                            <div className="grid grid-cols-2 gap-3 pt-1 isolate">
                                <div className="relative z-10 overflow-hidden rounded-xl">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tarikh Pergi</label>
                                    <input
                                        type="date"
                                        name="flightPergiTarikh"
                                        value={formData.flightPergiTarikh}
                                        onChange={handleSafeDateChange}
                                        onClick={openNativePicker}
                                        className={`${formInputClass} safe-date-input bg-white text-sm`}
                                        style={{ padding: '10px 12px' }}
                                    />
                                </div>
                                <div className="relative z-10 overflow-hidden rounded-xl">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Masa Berlepas</label>
                                    <input
                                        type="time"
                                        name="flightPergiMasa"
                                        value={formData.flightPergiMasa}
                                        onChange={handleChange}
                                        onClick={openNativePicker}
                                        className={`${formInputClass} safe-date-input bg-white text-sm`}
                                        style={{ padding: '10px 12px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* KAD PERGI TRANSIT (L2) */}
                        {formData.flightType === 'multi' && (
                            <div className="mb-6 p-4 sm:p-5 bg-amber-50/50 rounded-3xl border border-amber-200/80 space-y-4 isolate">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                    <h4 className="font-extrabold text-amber-800 text-sm uppercase tracking-wide">Pergi Transit (L2)</h4>
                                </div>

                                {renderRouteSelector('Laluan Transit Pergi', 'flightPergiLeg2Dari', 'flightPergiLeg2Ke', (e) => swapRoute(e, 'pergi2'))}

                                <div className="grid grid-cols-2 gap-3 pt-1 isolate">
                                    <div className="relative z-10 overflow-hidden rounded-xl">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tarikh Transit</label>
                                        <input type="date" name="flightPergiLeg2Tarikh" value={formData.flightPergiLeg2Tarikh} onChange={handleChange} onClick={openNativePicker} className={`${formInputClass} safe-date-input bg-white text-sm`} style={{ padding: '10px 12px' }} />
                                    </div>
                                    <div className="relative z-10 overflow-hidden rounded-xl">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Masa Transit</label>
                                        <input type="time" name="flightPergiLeg2Masa" value={formData.flightPergiLeg2Masa} onChange={handleChange} onClick={openNativePicker} className={`${formInputClass} safe-date-input bg-white text-sm`} style={{ padding: '10px 12px' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* KAD BALIK (L1) */}
                        <div className="mb-6 p-4 sm:p-5 bg-gradient-to-br from-slate-50 to-indigo-50/30 rounded-3xl border border-slate-200/80 space-y-4 isolate">
                            <div className="flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                                <h4 className="font-extrabold text-slate-800 text-sm uppercase tracking-wide">Penerbangan Balik (L1)</h4>
                            </div>

                            {renderRouteSelector('Laluan Balik', 'flightBalikDari', 'flightBalikKe', (e) => swapRoute(e, 'balik1'), true)}

                            <div className="grid grid-cols-2 gap-3 pt-1 isolate">
                                <div className="relative z-10 overflow-hidden rounded-xl">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tarikh Balik</label>
                                    <input
                                        type="date"
                                        name="flightBalikTarikh"
                                        value={formData.flightBalikTarikh}
                                        min={formData.flightPergiTarikh}
                                        onChange={handleSafeDateChange}
                                        onClick={openNativePicker}
                                        className={`${formInputClass} safe-date-input bg-white text-sm`}
                                        style={{ padding: '10px 12px' }}
                                    />
                                </div>
                                <div className="relative z-10 overflow-hidden rounded-xl">
                                    <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Masa Balik</label>
                                    <input
                                        type="time"
                                        name="flightBalikMasa"
                                        value={formData.flightBalikMasa}
                                        onChange={handleChange}
                                        onClick={openNativePicker}
                                        className={`${formInputClass} safe-date-input bg-white text-sm`}
                                        style={{ padding: '10px 12px' }}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* KAD BALIK TRANSIT (L2) */}
                        {formData.flightType === 'multi' && (
                            <div className="mb-6 p-4 sm:p-5 bg-amber-50/50 rounded-3xl border border-amber-200/80 space-y-4 isolate">
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                                    <h4 className="font-extrabold text-amber-800 text-sm uppercase tracking-wide">Balik Transit (L2)</h4>
                                </div>

                                {renderRouteSelector('Laluan Transit Balik', 'flightBalikLeg2Dari', 'flightBalikLeg2Ke', (e) => swapRoute(e, 'balik2'))}

                                <div className="grid grid-cols-2 gap-3 pt-1 isolate">
                                    <div className="relative z-10 overflow-hidden rounded-xl">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Tarikh Transit</label>
                                        <input type="date" name="flightBalikLeg2Tarikh" value={formData.flightBalikLeg2Tarikh} onChange={handleChange} onClick={openNativePicker} className={`${formInputClass} safe-date-input bg-white text-sm`} style={{ padding: '10px 12px' }} />
                                    </div>
                                    <div className="relative z-10 overflow-hidden rounded-xl">
                                        <label className="block text-[11px] font-bold text-slate-500 uppercase mb-1">Masa Transit</label>
                                        <input type="time" name="flightBalikLeg2Masa" value={formData.flightBalikLeg2Masa} onChange={handleChange} onClick={openNativePicker} className={`${formInputClass} safe-date-input bg-white text-sm`} style={{ padding: '10px 12px' }} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* PILIHAN SYARIKAT PENERBANGAN VISUAL */}
                        <div className="mt-6 border-t border-slate-100 pt-6 space-y-5 relative z-30">
                            <div>
                                <label className={formLabelClass}>Syarikat Penerbangan Pilihan</label>
                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2">
                                    {AIRLINES.map((airline) => {
                                        const isSelected = formData.kodSyarikat === airline.id;
                                        return (
                                            <button
                                                key={airline.id}
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, kodSyarikat: airline.id }))}
                                                className={`relative z-30 p-3 rounded-2xl border-2 text-left transition-all flex items-center gap-2.5 cursor-pointer ${isSelected ? 'border-cyan-500 bg-cyan-50/70 shadow-sm' : 'border-slate-200/80 bg-white hover:bg-slate-50'}`}
                                            >
                                                <span className={`w-8 h-8 rounded-xl ${airline.color} text-white font-black text-xs flex items-center justify-center shrink-0`}>
                                                    {airline.badge}
                                                </span>
                                                <span className={`text-xs font-extrabold leading-tight ${isSelected ? 'text-cyan-900' : 'text-slate-700'}`}>
                                                    {airline.name}
                                                </span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="relative z-30">
                                <label className={formLabelClass}>No. Ahli <span className="text-slate-400 font-normal lowercase">(Enrich / AirAsia Rewards ID)</span></label>
                                <input type="text" name="enrichId" value={formData.enrichId} onChange={handleChange} className={`${formInputClass} relative z-30`} placeholder="Kosongkan jika tiada" />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end relative z-30">
                            <button type="button" onClick={() => nextSection('tiket', 'tandatangan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* POP-UP MODAL PILIHAN LAPANGAN TERBANG (AIRASIA / MAS STYLE) */}
            {activeAirportField && (
                <div
                    className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4"
                    onClick={() => setActiveAirportField(null)}
                >
                    <div
                        className="bg-white w-full sm:max-w-md rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] animate-slide-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
                            <div>
                                <h3 className="font-black text-slate-800 text-base">
                                    {activeAirportField.includes('Dari') ? 'Pilih Lapangan Terbang Berlepas' : 'Pilih Destinasi Ketibaan'}
                                </h3>
                                <p className="text-xs text-slate-500 font-medium">Cari nama bandar, negeri atau kod IATA</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => setActiveAirportField(null)}
                                className="w-8 h-8 rounded-full bg-slate-200/80 hover:bg-slate-300 flex items-center justify-center text-slate-600 font-bold cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="p-4 border-b border-slate-100 bg-white">
                            <input
                                type="text"
                                autoFocus
                                value={searchAirport}
                                onChange={(e) => setSearchAirport(e.target.value)}
                                placeholder="Taip cth: Sandakan, KK, KLIA, SDK..."
                                className="w-full px-4 py-3 rounded-xl bg-slate-100 border border-slate-200 focus:bg-white focus:border-cyan-500 focus:outline-none text-sm font-semibold text-slate-800"
                            />
                        </div>

                        <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
                            {filteredAirports.map((airport) => {
                                const isCurrent = formData[activeAirportField] === airport.code;
                                return (
                                    <button
                                        key={airport.code}
                                        type="button"
                                        onClick={() => selectAirport(airport.code)}
                                        className={`w-full p-3.5 rounded-2xl flex items-center justify-between text-left transition-all cursor-pointer ${isCurrent ? 'bg-cyan-50 border border-cyan-300' : 'hover:bg-slate-50 border border-transparent'}`}
                                    >
                                        <div>
                                            <div className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                                                {airport.city}
                                                <span className="text-[11px] font-semibold text-slate-400">• {airport.state}</span>
                                            </div>
                                            <div className="text-xs text-slate-500 mt-0.5">{airport.name}</div>
                                        </div>
                                        <span className={`px-2.5 py-1 rounded-lg font-black text-xs tracking-wider ${isCurrent ? 'bg-cyan-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
                                            {airport.code}
                                        </span>
                                    </button>
                                );
                            })}
                            {filteredAirports.length === 0 && (
                                <div className="text-center py-6 space-y-3">
                                    <p className="text-sm text-slate-400 font-medium">Tiada dalam senarai.</p>
                                    {searchAirport.trim().length >= 2 && (
                                        <button
                                            type="button"
                                            onClick={() => selectAirport(searchAirport)}
                                            className="px-4 py-2 bg-cyan-600 text-white text-xs font-bold rounded-xl shadow-sm hover:bg-cyan-700 cursor-pointer"
                                        >
                                            Guna Kod Manual: &quot;{searchAirport.trim().toUpperCase().slice(0, 3)}&quot;
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* TANDATANGAN */}
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
                        <div className="bg-blue-50/50 rounded-2xl p-4 sm:p-6 border border-blue-100 relative z-30">
                            {isTandatanganComplete ? (
                                <div className="flex flex-col items-center justify-center space-y-4">
                                    <div className="w-full max-w-sm h-48 bg-white border border-slate-200 rounded-xl overflow-hidden flex items-center justify-center p-4">
                                        <img src={formData.tandatangan} alt="Tandatangan" className="max-w-full max-h-full object-contain" />
                                    </div>
                                    <button type="button" onClick={clearSignature} className="text-red-500 hover:text-red-700 text-[13px] font-bold py-2 px-4 rounded-xl border border-red-200 hover:bg-red-50 transition-colors cursor-pointer">Padam & Lukis Semula</button>
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
                        <div className="mt-8 flex justify-end relative z-30">
                            <button type="button" onClick={() => nextSection('tandatangan', 'jana')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer">
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
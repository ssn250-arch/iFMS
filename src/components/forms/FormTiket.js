import React from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormTiket = ({
    formData, handleChange, setFormData, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    malaysiaAirports, getAirportName, setRoute, isPegawaiComplete, isTiketInfoComplete, isTiketFlightComplete, isTandatanganComplete,
    shakeSection, canvasRef, startDrawing, draw, stopDrawing, clearSignature, handleSignatureUpload
}) => {
    return (
        <>
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
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Tujuan Penerbangan <span className="text-red-500">*</span></label>
                                <input type="text" name="tujuan" value={formData.tujuan} onChange={handleChange} className={formInputClass} placeholder="Mesyuarat / Kursus / Bengkel dll" />
                            </div>
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Tempat / Lokasi Dituju <span className="text-red-500">*</span></label>
                                <input type="text" name="tempat" value={formData.tempat} onChange={handleChange} className={formInputClass} placeholder="Cth: JTM Putrajaya" />
                            </div>
                            <div>
                                <label className={formLabelClass}>Tarikh Pergi <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhPergi" value={formData.tarikhPergi} onChange={handleChange} className={formInputClass} />
                            </div>
                            <div>
                                <label className={formLabelClass}>Tarikh Balik <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhBalik" value={formData.tarikhBalik} min={formData.tarikhPergi} onChange={handleChange} className={formInputClass} />
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

            {/* FLIGHT TIKET */}
            <div id="section-tiket" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isTiketInfoComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tiket ? 'border-slate-100 ring-[3px] ring-cyan-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tiket' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isTiketInfoComplete && toggleSection('tiket')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTiketInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isTiketInfoComplete ? 'bg-slate-200 text-slate-500' : (expanded.tiket ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30' : (isTiketFlightComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'))}`}>
                            {!isTiketInfoComplete ? <LockIcon /> : (isTiketFlightComplete && !expanded.tiket ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Butiran Penerbangan {isTiketFlightComplete && !expanded.tiket && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tiket && isTiketInfoComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTiketFlightComplete ? 'Penerbangan Lengkap' : 'Isi jadual penerbangan anda'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.tiket && isTiketInfoComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                        <div className="flex gap-4 mb-6">
                            <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.flightType === 'single' ? 'bg-cyan-50 border-cyan-500 text-cyan-700 font-bold' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                <input type="radio" name="flightType" value="single" checked={formData.flightType === 'single'} onChange={handleChange} className="hidden" />
                                <span>Penerbangan Terus</span>
                            </label>
                            <label className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.flightType === 'multi' ? 'bg-cyan-50 border-cyan-500 text-cyan-700 font-bold' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
                                <input type="radio" name="flightType" value="multi" checked={formData.flightType === 'multi'} onChange={handleChange} className="hidden" />
                                <span>Transit (Multi-Leg)</span>
                            </label>
                        </div>

                        {/* Pergi L1 */}
                        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase">Pergi (L1)</h4>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh</label>
                                    <input type="date" name="flightPergiTarikh" value={formData.flightPergiTarikh} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Masa</label>
                                    <input type="time" name="flightPergiMasa" value={formData.flightPergiMasa} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Dari</label>
                                    <input type="text" name="flightPergiDari" value={formData.flightPergiDari} onChange={handleChange} maxLength="3" placeholder="SDK" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    <div className="text-[10px] text-slate-400 mt-1 truncate">{getAirportName(formData.flightPergiDari)}</div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Ke</label>
                                    <input type="text" name="flightPergiKe" value={formData.flightPergiKe} onChange={handleChange} maxLength="3" placeholder="KUL" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    <div className="text-[10px] text-slate-400 mt-1 truncate">{getAirportName(formData.flightPergiKe)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Pergi L2 */}
                        {formData.flightType === 'multi' && (
                            <div className="mb-6 p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                                <h4 className="font-bold text-amber-700 mb-3 text-sm uppercase">Pergi Transit (L2)</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh</label>
                                        <input type="date" name="flightPergiLeg2Tarikh" value={formData.flightPergiLeg2Tarikh} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Masa</label>
                                        <input type="time" name="flightPergiLeg2Masa" value={formData.flightPergiLeg2Masa} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Dari</label>
                                        <input type="text" name="flightPergiLeg2Dari" value={formData.flightPergiLeg2Dari} onChange={handleChange} maxLength="3" placeholder="KUL" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Ke</label>
                                        <input type="text" name="flightPergiLeg2Ke" value={formData.flightPergiLeg2Ke} onChange={handleChange} maxLength="3" placeholder="JHB" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Balik L1 */}
                        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 relative">
                            <h4 className="font-bold text-slate-700 mb-3 text-sm uppercase">Balik (L1)</h4>
                            <button onClick={() => setRoute('SDK', 'KUL')} className="absolute top-4 right-4 text-xs font-bold text-blue-600 bg-blue-100 hover:bg-blue-200 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21 16-4 4-4-4"/><path d="M17 20V4"/><path d="m3 8 4-4 4 4"/><path d="M7 4v16"/></svg> Auto-Terbalik</button>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh</label>
                                    <input type="date" name="flightBalikTarikh" value={formData.flightBalikTarikh} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Masa</label>
                                    <input type="time" name="flightBalikMasa" value={formData.flightBalikMasa} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Dari</label>
                                    <input type="text" name="flightBalikDari" value={formData.flightBalikDari} onChange={handleChange} maxLength="3" placeholder="KUL" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    <div className="text-[10px] text-slate-400 mt-1 truncate">{getAirportName(formData.flightBalikDari)}</div>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-slate-500 mb-1">Ke</label>
                                    <input type="text" name="flightBalikKe" value={formData.flightBalikKe} onChange={handleChange} maxLength="3" placeholder="SDK" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    <div className="text-[10px] text-slate-400 mt-1 truncate">{getAirportName(formData.flightBalikKe)}</div>
                                </div>
                            </div>
                        </div>

                        {/* Balik L2 */}
                        {formData.flightType === 'multi' && (
                            <div className="mb-6 p-4 bg-amber-50/50 rounded-2xl border border-amber-100">
                                <h4 className="font-bold text-amber-700 mb-3 text-sm uppercase">Balik Transit (L2)</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Tarikh</label>
                                        <input type="date" name="flightBalikLeg2Tarikh" value={formData.flightBalikLeg2Tarikh} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Masa</label>
                                        <input type="time" name="flightBalikLeg2Masa" value={formData.flightBalikLeg2Masa} onChange={handleChange} className={formInputClass} style={{padding: '10px'}} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Dari</label>
                                        <input type="text" name="flightBalikLeg2Dari" value={formData.flightBalikLeg2Dari} onChange={handleChange} maxLength="3" placeholder="JHB" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold text-slate-500 mb-1">Ke</label>
                                        <input type="text" name="flightBalikLeg2Ke" value={formData.flightBalikLeg2Ke} onChange={handleChange} maxLength="3" placeholder="KUL" className={`${formInputClass} text-center uppercase tracking-widest`} style={{padding: '10px'}} />
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mt-6 border-t border-slate-100 pt-6">
                            <div>
                                <label className={formLabelClass}>Syarikat Penerbangan</label>
                                <div className="relative">
                                    <select name="kodSyarikat" value={formData.kodSyarikat} onChange={handleChange} className={`${formInputClass} appearance-none`}>
                                        <option value="">Pilih Penerbangan...</option>
                                        <option value="MAS">Malaysia Airlines (MAS)</option>
                                        <option value="AIRASIA">AirAsia</option>
                                        <option value="FIREFLY">Firefly</option>
                                        <option value="BATIK">Batik Air</option>
                                        <option value="MYAIRLINE">MYAirline</option>
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                                </div>
                            </div>
                            <div>
                                <label className={formLabelClass}>No. Ahli <span className="text-slate-400 font-normal lowercase">(Enrich/BIG ID)</span></label>
                                <input type="text" name="enrichId" value={formData.enrichId} onChange={handleChange} className={formInputClass} placeholder="Kosongkan jika tiada" />
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

            {/* TANDATANGAN */}
            <div id="section-tandatangan" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isTiketFlightComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tandatangan ? 'border-slate-100 ring-[3px] ring-cyan-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isTiketFlightComplete && toggleSection('tandatangan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTiketFlightComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isTiketFlightComplete ? 'bg-slate-200 text-slate-500' : (expanded.tandatangan ? 'bg-cyan-600 text-white shadow-md shadow-cyan-500/30' : (isTandatanganComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-cyan-50 text-cyan-600'))}`}>
                            {!isTiketFlightComplete ? <LockIcon /> : (isTandatanganComplete && !expanded.tandatangan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Tandatangan <span className="hidden sm:inline">Pemohon</span> {isTandatanganComplete && !expanded.tandatangan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tandatangan && isTiketFlightComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTandatanganComplete ? 'Tandatangan telah direkodkan' : 'Ruangan tandatangan digital'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.tandatangan && isTiketFlightComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                        <div className="bg-blue-50/50 rounded-2xl p-4 sm:p-6 border border-blue-100 relative">
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
                            <button onClick={() => nextSection('tandatangan', 'jana')} disabled={!isTandatanganComplete} className={`font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ${isTandatanganComplete ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
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
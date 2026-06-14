import React from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormAkujanji = ({
    formData, expanded, toggleSection, nextSection, formLabelClass, peperiksaanRoles,
    handleCheckboxPeranan, isPegawaiComplete, isPerananComplete, isTandatanganComplete,
    canvasRef, startDrawing, draw, stopDrawing, clearSignature, handleSignatureUpload, shakeSection
}) => {
    return (
        <>
            {/* PERANAN PEPERIKSAAN */}
            <div id="section-peranan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.peranan ? 'border-slate-100 ring-[3px] ring-indigo-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'peranan' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('peranan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.peranan ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : (isPerananComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isPerananComplete && !expanded.peranan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Peranan Peperiksaan {isPerananComplete && !expanded.peranan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.peranan && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isPerananComplete ? `${formData.perananPeperiksaan.length} peranan dipilih` : 'Sila tandakan peranan anda'}</p>}
                        </div>
                    </div>
                    {isPegawaiComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.peranan ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.peranan && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <label className={formLabelClass}>Sila tandakan ruangan yang berkenaan <span className="text-red-500">*</span></label>
                        <div id="wrap-peranan" className="mt-4 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-4 sm:p-6 transition-all duration-300">
                            <div className="flex flex-col gap-3">
                                {peperiksaanRoles.map((role, idx) => (
                                    <label key={idx} className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.perananPeperiksaan.includes(role) ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                        <input 
                                            type="checkbox" 
                                            checked={formData.perananPeperiksaan.includes(role)} 
                                            onChange={() => handleCheckboxPeranan(role)} 
                                            className="custom-checkbox flex-shrink-0" 
                                        />
                                        <span className={`text-[14px] sm:text-[15px] font-bold ${formData.perananPeperiksaan.includes(role) ? 'text-indigo-700' : 'text-slate-600'}`}>{role}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('peranan', 'tandatangan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* TANDATANGAN DIGITAL */}
            <div id="section-tandatangan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPerananComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tandatangan ? 'border-slate-100 ring-[3px] ring-purple-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPerananComplete && toggleSection('tandatangan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPerananComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPerananComplete ? 'bg-slate-200 text-slate-500' : (expanded.tandatangan ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' : (isTandatanganComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'))}`}>
                            {!isPerananComplete ? <LockIcon /> : (isTandatanganComplete && !expanded.tandatangan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Tandatangan Digital {isTandatanganComplete && !expanded.tandatangan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tandatangan && isPerananComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTandatanganComplete ? 'Tandatangan telah disimpan' : 'Sila lukis atau muat naik sign'}</p>}
                        </div>
                    </div>
                    {isPerananComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.tandatangan ? 'rotate-180 bg-purple-50 text-purple-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.tandatangan && isPerananComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div id="wrap-tandatangan" className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-4 sm:p-6 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                <label className={formLabelClass}>Sila lukis tandatangan anda <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <input 
                                        type="file" 
                                        accept="image/*" 
                                        onChange={handleSignatureUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
                                    />
                                    <button className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 hover:border-purple-400 hover:text-purple-600 text-[12px] font-bold text-slate-600 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                        Atau Muat Naik Gambar
                                    </button>
                                </div>
                            </div>

                            <div className="relative">
                                <canvas 
                                    ref={canvasRef}
                                    onMouseDown={startDrawing}
                                    onMouseMove={draw}
                                    onMouseUp={stopDrawing}
                                    onMouseLeave={stopDrawing}
                                    onTouchStart={startDrawing}
                                    onTouchMove={draw}
                                    onTouchEnd={stopDrawing}
                                    className="signature-pad w-full h-[200px]"
                                ></canvas>
                                
                                {formData.tandatangan && (
                                    <div className="absolute inset-0 z-20 pointer-events-none flex items-center justify-center bg-white/50 backdrop-blur-[2px] rounded-xl border-2 border-emerald-400">
                                        <img src={formData.tandatangan} alt="Tandatangan" className="max-h-[80%] max-w-[80%] object-contain opacity-90 drop-shadow-md" />
                                        <div className="absolute top-3 right-3 bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-bold flex items-center gap-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Disimpan
                                        </div>
                                    </div>
                                )}
                            </div>
                            
                            <div className="flex justify-between items-center mt-3">
                                <p className="text-[11px] font-semibold text-slate-400 max-w-[60%] leading-tight">
                                    *Jika muat naik gambar, pastikan berlatar belakang putih. Sistem akan automatik menjadikannya lutsinar (transparent).
                                </p>
                                <button 
                                    onClick={clearSignature}
                                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[12px] font-bold rounded-lg transition-colors flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                                    Padam
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('tandatangan', 'jana')} className="bg-purple-600 hover:bg-purple-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_10px_20px_rgba(168,85,247,0.25)] transition-all active:scale-95 flex items-center gap-2">
                                Selesai <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormAkujanji;
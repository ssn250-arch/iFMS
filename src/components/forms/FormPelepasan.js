import React from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormPelepasan = ({
    formData, handleChange, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    pegawaiDatabase, isPegawaiComplete, isPelepasanInfoComplete, isPenggantiComplete, isTandatanganComplete,
    handlePenggantiChange, shakeSection, canvasRef, startDrawing, draw, stopDrawing, clearSignature, handleSignatureUpload
}) => {
    return (
        <>
            {/* PELEPASAN INFO */}
            <div id="section-pelepasanInfo" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.pelepasanInfo ? 'border-slate-100 ring-[3px] ring-rose-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'pelepasanInfo' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('pelepasanInfo')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.pelepasanInfo ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30' : (isPelepasanInfoComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isPelepasanInfoComplete && !expanded.pelepasanInfo ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M16 13l-4-4-4 4"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Tugas <span className="hidden sm:inline">Ditinggalkan</span> {isPelepasanInfoComplete && !expanded.pelepasanInfo && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.pelepasanInfo && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isPelepasanInfoComplete ? formData.subjek : 'Wajib dilengkapkan dahulu'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.pelepasanInfo && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Lokasi Semasa Tugas <span className="text-red-500">*</span></label>
                                <input type="text" name="tempat" value={formData.tempat} onChange={handleChange} className={formInputClass} placeholder="Cth: ADTEC Sandakan / Luar Kawasan" />
                            </div>
                            <div>
                                <label className={formLabelClass}>Subjek / Tugas Ditinggalkan <span className="text-red-500">*</span></label>
                                <input type="text" name="subjek" value={formData.subjek} onChange={handleChange} className={formInputClass} placeholder="Cth: Kelas Kimpalan 1A" />
                            </div>
                            <div>
                                <label className={formLabelClass}>Semester / Kumpulan</label>
                                <input type="text" name="semester" value={formData.semester} onChange={handleChange} className={formInputClass} placeholder="Cth: Sem 2 / Kump B" />
                            </div>
                            <div>
                                <label className={formLabelClass}>Tarikh Mula Pelepasan <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhGantiDari" value={formData.tarikhGantiDari} onChange={handleChange} className={formInputClass} />
                            </div>
                            <div>
                                <label className={formLabelClass}>Tarikh Tamat Pelepasan <span className="text-red-500">*</span></label>
                                <input type="date" name="tarikhGantiHingga" value={formData.tarikhGantiHingga} min={formData.tarikhGantiDari} onChange={handleChange} className={formInputClass} />
                            </div>
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Catatan</label>
                                <textarea name="catatanTugas" value={formData.catatanTugas} onChange={handleChange} className={`${formInputClass} min-h-[100px] resize-none`} placeholder="Sebarang nota tambahan..." />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('pelepasanInfo', 'pengganti')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* PENGGANTI INFO */}
            <div id="section-pengganti" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isPelepasanInfoComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.pengganti ? 'border-slate-100 ring-[3px] ring-rose-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'pengganti' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isPelepasanInfoComplete && toggleSection('pengganti')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPelepasanInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPelepasanInfoComplete ? 'bg-slate-200 text-slate-500' : (expanded.pengganti ? 'bg-rose-600 text-white shadow-md shadow-rose-500/30' : (isPenggantiComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'))}`}>
                            {!isPelepasanInfoComplete ? <LockIcon /> : (isPenggantiComplete && !expanded.pengganti ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Pengganti {isPenggantiComplete && !expanded.pengganti && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.pengganti && isPelepasanInfoComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isPenggantiComplete ? formData.namaPengganti : 'Pilih rakan tugas pengganti'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.pengganti && isPelepasanInfoComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Nama Pengganti <span className="text-red-500">*</span></label>
                                <div className="relative">
                                    <select name="namaPengganti" value={formData.namaPengganti} onChange={handlePenggantiChange} className={`${formInputClass} appearance-none cursor-pointer relative z-10 ${formData.namaPengganti ? 'text-slate-800' : 'text-slate-400 font-medium'}`}>
                                        <option value="" disabled>-- Pilih Pengganti --</option>
                                        <option value="TIADA PENGGANTI" className="font-bold text-red-600">-- TIADA PENGGANTI --</option>
                                        {[...pegawaiDatabase].sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                            <option key={idx} value={p.nama}>{p.nama} ({p.bahagian})</option>
                                        ))}
                                    </select>
                                    <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                                </div>
                            </div>
                            {formData.namaPengganti !== "TIADA PENGGANTI" && (
                                <>
                                    <div>
                                        <label className={formLabelClass}>Bahagian / Unit <span className="text-red-500">*</span></label>
                                        <input type="text" name="bahagianPengganti" value={formData.bahagianPengganti} onChange={handleChange} className={formInputClass} placeholder="Cth: Unit Komputer" />
                                    </div>
                                    <div>
                                        <label className={formLabelClass}>No. Telefon <span className="text-red-500">*</span></label>
                                        <input type="text" name="noTelPengganti" value={formData.noTelPengganti} onChange={handleChange} className={formInputClass} placeholder="01X-XXXXXXX" />
                                    </div>
                                </>
                            )}
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('pengganti', 'tandatangan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* TANDATANGAN */}
            <div id="section-tandatangan" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border overflow-hidden transition-all duration-500 ${!isPenggantiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tandatangan ? 'border-slate-100 ring-[3px] ring-blue-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isPenggantiComplete && toggleSection('tandatangan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPenggantiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPenggantiComplete ? 'bg-slate-200 text-slate-500' : (expanded.tandatangan ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : (isTandatanganComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'))}`}>
                            {!isPenggantiComplete ? <LockIcon /> : (isTandatanganComplete && !expanded.tandatangan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Tandatangan <span className="hidden sm:inline">Pemohon</span> {isTandatanganComplete && !expanded.tandatangan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tandatangan && isPenggantiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTandatanganComplete ? 'Tandatangan telah direkodkan' : 'Ruangan tandatangan digital'}</p>}
                        </div>
                    </div>
                </div>
                {expanded.tandatangan && isPenggantiComplete && (
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
                                    <div className="relative w-full h-48 bg-white border-2 border-dashed border-slate-300 rounded-xl overflow-hidden touch-none hover:border-blue-400 transition-colors">
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
                                        <label htmlFor="signature-upload" className="w-full flex items-center justify-center gap-2 bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50 text-slate-600 hover:text-blue-600 font-bold py-3 px-4 rounded-xl cursor-pointer transition-all text-[13px] shadow-sm">
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

export default FormPelepasan;
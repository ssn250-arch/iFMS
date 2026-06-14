import React from 'react';
import ModernDatePicker from '../ui/ModernDatePicker';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormLaporan = ({
    formData, handleChange, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    isPegawaiComplete, isLaporanInfoComplete, isLaporanSoalanComplete, isTandatanganComplete,
    canvasRef, startDrawing, draw, stopDrawing, clearSignature, handleSignatureUpload, shakeSection
}) => {
    return (
        <>
            {/* MAKLUMAT PEPERIKSAAN */}
            <div id="section-laporanInfo" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.laporanInfo ? 'border-slate-100 ring-[3px] ring-orange-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'laporanInfo' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('laporanInfo')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.laporanInfo ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30' : (isLaporanInfoComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-orange-50 text-orange-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isLaporanInfoComplete && !expanded.laporanInfo ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Peperiksaan {isLaporanInfoComplete && !expanded.laporanInfo && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.laporanInfo && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isLaporanInfoComplete ? `Sesi ${formData.sesiPeperiksaan}` : 'Sila isi sesi & tarikh'}</p>}
                        </div>
                    </div>
                    {isPegawaiComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.laporanInfo ? 'rotate-180 bg-orange-50 text-orange-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.laporanInfo && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div>
                                <label className={formLabelClass}>Sesi Peperiksaan <span className="text-red-500">*</span></label>
                                <input id="wrap-sesiPeperiksaan" type="text" name="sesiPeperiksaan" value={formData.sesiPeperiksaan} onChange={handleChange} className={formInputClass} placeholder="Contoh: 1/2026" />
                            </div>
                            <div>
                                <ModernDatePicker name="tarikhPeperiksaan" value={formData.tarikhPeperiksaan} label={<>Tarikh Peperiksaan <span className="text-red-500">*</span></>} onChange={handleChange} />
                            </div>
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Nama Pengawas Lain / Pengawas Bersama (Pilihan)</label>
                                <input type="text" name="namaPengawasLain" value={formData.namaPengawasLain} onChange={handleChange} className={formInputClass} placeholder="Contoh: En. Ali bin Abu" />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('laporanInfo', 'laporanSoalan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* STATUS & SOAL SELIDIK */}
            <div id="section-laporanSoalan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isLaporanInfoComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.laporanSoalan ? 'border-slate-100 ring-[3px] ring-red-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'laporanSoalan' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isLaporanInfoComplete && toggleSection('laporanSoalan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isLaporanInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isLaporanInfoComplete ? 'bg-slate-200 text-slate-500' : (expanded.laporanSoalan ? 'bg-red-500 text-white shadow-md shadow-red-500/30' : (isLaporanSoalanComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'))}`}>
                            {!isLaporanInfoComplete ? <LockIcon /> : (isLaporanSoalanComplete && !expanded.laporanSoalan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Status & Cadangan {isLaporanSoalanComplete && !expanded.laporanSoalan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.laporanSoalan && isLaporanInfoComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isLaporanSoalanComplete ? 'Status peperiksaan direkod' : 'Sila jawab soalselidik'}</p>}
                        </div>
                    </div>
                    {isLaporanInfoComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.laporanSoalan ? 'rotate-180 bg-red-50 text-red-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.laporanSoalan && isLaporanInfoComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="flex flex-col gap-6">
                            {/* Soalan 1 */}
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <p className="font-bold text-[15px] text-slate-800 mb-4">1. Bilangan kertas soalan dan jawapan mencukupi?</p>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${formData.q1Status === 'YA' ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="q1Status" value="YA" checked={formData.q1Status === 'YA'} onChange={handleChange} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.q1Status === 'YA' ? 'border-emerald-500' : 'border-slate-300'}`}>
                                            {formData.q1Status === 'YA' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                                        </div>
                                        <span className="font-bold text-[13px]">YA</span>
                                    </label>
                                    <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${formData.q1Status === 'TIDAK' ? 'bg-red-50 border-red-400 text-red-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="q1Status" value="TIDAK" checked={formData.q1Status === 'TIDAK'} onChange={handleChange} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.q1Status === 'TIDAK' ? 'border-red-500' : 'border-slate-300'}`}>
                                            {formData.q1Status === 'TIDAK' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                                        </div>
                                        <span className="font-bold text-[13px]">TIDAK</span>
                                    </label>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${formData.q1Status === 'TIDAK' ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <input type="text" name="q1Catatan" value={formData.q1Catatan} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500" placeholder="Nyatakan sebab (Contoh: Kurang 5 helai OMR)" />
                                </div>
                            </div>

                            {/* Soalan 2 */}
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <p className="font-bold text-[15px] text-slate-800 mb-4">2. Kesalahan cetakan kertas soalan?</p>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${formData.q2Status === 'YA' ? 'bg-red-50 border-red-400 text-red-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="q2Status" value="YA" checked={formData.q2Status === 'YA'} onChange={handleChange} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.q2Status === 'YA' ? 'border-red-500' : 'border-slate-300'}`}>
                                            {formData.q2Status === 'YA' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                                        </div>
                                        <span className="font-bold text-[13px]">YA (Ada ralat)</span>
                                    </label>
                                    <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${formData.q2Status === 'TIDAK' ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="q2Status" value="TIDAK" checked={formData.q2Status === 'TIDAK'} onChange={handleChange} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.q2Status === 'TIDAK' ? 'border-emerald-500' : 'border-slate-300'}`}>
                                            {formData.q2Status === 'TIDAK' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                                        </div>
                                        <span className="font-bold text-[13px]">TIDAK (Tiada ralat)</span>
                                    </label>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${formData.q2Status === 'YA' ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <input type="text" name="q2Catatan" value={formData.q2Catatan} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500" placeholder="Nyatakan kesalahan (Contoh: Muka surat 3 kabur)" />
                                </div>
                            </div>

                            {/* Soalan 3 */}
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <p className="font-bold text-[15px] text-slate-800 mb-4">3. Peperiksaan berjalan lancar?</p>
                                <div className="flex flex-wrap gap-4 mb-3">
                                    <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${formData.q3Status === 'YA' ? 'bg-emerald-50 border-emerald-400 text-emerald-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="q3Status" value="YA" checked={formData.q3Status === 'YA'} onChange={handleChange} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.q3Status === 'YA' ? 'border-emerald-500' : 'border-slate-300'}`}>
                                            {formData.q3Status === 'YA' && <div className="w-2 h-2 rounded-full bg-emerald-500"></div>}
                                        </div>
                                        <span className="font-bold text-[13px]">YA</span>
                                    </label>
                                    <label className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border-2 cursor-pointer transition-colors ${formData.q3Status === 'TIDAK' ? 'bg-red-50 border-red-400 text-red-700' : 'bg-white border-slate-200 hover:border-slate-300'}`}>
                                        <input type="radio" name="q3Status" value="TIDAK" checked={formData.q3Status === 'TIDAK'} onChange={handleChange} className="hidden" />
                                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${formData.q3Status === 'TIDAK' ? 'border-red-500' : 'border-slate-300'}`}>
                                            {formData.q3Status === 'TIDAK' && <div className="w-2 h-2 rounded-full bg-red-500"></div>}
                                        </div>
                                        <span className="font-bold text-[13px]">TIDAK</span>
                                    </label>
                                </div>
                                <div className={`transition-all duration-300 overflow-hidden ${formData.q3Status === 'TIDAK' ? 'max-h-32 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                                    <input type="text" name="q3Catatan" value={formData.q3Catatan} onChange={handleChange} className="w-full bg-white border border-slate-300 rounded-xl px-4 py-2.5 text-[13px] focus:outline-none focus:border-blue-500" placeholder="Nyatakan masalah (Contoh: Gangguan bekalan elektrik)" />
                                </div>
                            </div>

                            <div className="mt-2">
                                <label className={formLabelClass}>Cadangan Tambahan (Pilihan)</label>
                                <textarea name="cadanganPeperiksaan" value={formData.cadanganPeperiksaan} onChange={handleChange} className={`${formInputClass} min-h-[100px] resize-none`} placeholder="Nyatakan sebarang cadangan untuk penambahbaikan..." />
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('laporanSoalan', 'tandatangan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* TANDATANGAN */}
            <div id="section-tandatangan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isLaporanSoalanComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tandatangan ? 'border-slate-100 ring-[3px] ring-purple-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isLaporanSoalanComplete && toggleSection('tandatangan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isLaporanSoalanComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isLaporanSoalanComplete ? 'bg-slate-200 text-slate-500' : (expanded.tandatangan ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' : (isTandatanganComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'))}`}>
                            {!isLaporanSoalanComplete ? <LockIcon /> : (isTandatanganComplete && !expanded.tandatangan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Tandatangan Digital {isTandatanganComplete && !expanded.tandatangan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tandatangan && isLaporanSoalanComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTandatanganComplete ? 'Tandatangan telah disimpan' : 'Sila lukis atau muat naik sign'}</p>}
                        </div>
                    </div>
                    {isLaporanSoalanComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.tandatangan ? 'rotate-180 bg-purple-50 text-purple-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.tandatangan && isLaporanSoalanComplete && (
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

export default FormLaporan;
import React, { useState, useEffect, useRef } from 'react';
import ModernDatePicker from '../ui/ModernDatePicker';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormPascaKursus = ({
    formData, handleChange, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    isPegawaiComplete, isKursusComplete, isPenilaianComplete, shakeSection, calculateDays
}) => {

    const jumlahHariKursus = calculateDays(formData.kursusDari, formData.kursusHingga);

    // ================= LOGIK ACCORDION & AUTO-ADVANCE =================
    const [activePart, setActivePart] = useState('2');
    
    // ✅ KEMAS KINI: Gunakan useRef supaya sistem tak auto-close berulang kali
    const advancedRef = useRef({ '2': false });

    const isP2Complete = formData.pk1a > 0 && formData.pk1b > 0 && formData.pk1c > 0 && formData.pk1d > 0;
    const isP3Complete = formData.pkCadangan.trim() !== '';

    useEffect(() => {
        if (expanded.penilaian) {
            if (activePart === '2' && isP2Complete && !advancedRef.current['2']) {
                advancedRef.current['2'] = true;
                setTimeout(() => setActivePart('3'), 400);
            }
        }
    }, [formData, expanded.penilaian, activePart, isP2Complete]);

    const togglePart = (part) => setActivePart(activePart === part ? null : part);

    const renderHeader = (id, title, isComplete) => (
        <div onClick={() => togglePart(id)} className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${activePart === id ? 'bg-purple-100 text-purple-800 border-b border-purple-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            <h3 className="font-extrabold">{title}</h3>
            <div className="flex items-center gap-3">
                {/* ✅ KEMAS KINI: Teks "Tekan untuk semak" dipaparkan bila dah siap tutup */}
                {isComplete && activePart !== id && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Tekan untuk semak / ubah</span>}
                {isComplete && <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                <svg className={`w-5 h-5 transition-transform duration-300 ${activePart === id ? 'rotate-180 text-purple-600' : 'text-slate-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
        </div>
    );

    const RatingRow = ({ label, name }) => (
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-slate-100/50 gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-xl">
            <span className="text-[14px] font-semibold text-slate-700 md:w-3/5 leading-relaxed">{label}</span>
            <div className="flex gap-2 md:w-2/5 justify-end">
                {[1, 2, 3].map((val) => {
                    const isSelected = formData[name] === val;
                    return (
                        <label key={val} className={`w-12 h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all duration-300 transform active:scale-90 ${isSelected ? 'bg-purple-500 border-purple-600 text-white font-bold shadow-md shadow-purple-500/30' : 'bg-white border-slate-200 text-slate-500 hover:border-purple-300 hover:text-purple-500'}`}>
                            <input type="radio" name={name} value={val} checked={isSelected} onChange={(e) => handleChange({ target: { name, value: parseInt(e.target.value) } })} className="hidden" />
                            {val}
                        </label>
                    );
                })}
            </div>
        </div>
    );

    return (
        <>
            {/* MAKLUMAT KURSUS & PENYELIA */}
            <div id="section-kursus" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.kursus ? 'border-slate-100 ring-[3px] ring-purple-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'kursus' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('kursus')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.kursus ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' : (isKursusComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isKursusComplete && !expanded.kursus ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Penyelia & Kursus {isKursusComplete && !expanded.kursus && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.kursus && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isKursusComplete ? formData.kursusNama : 'Sila lengkapkan butiran kursus'}</p>}
                        </div>
                    </div>
                </div>

                {expanded.kursus && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Nama Kursus <span className="text-red-500">*</span></label>
                                <input type="text" name="kursusNama" value={formData.kursusNama} onChange={handleChange} className={formInputClass} placeholder="Contoh: Kursus Keselamatan Pekerjaan" />
                            </div>
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Penyedia Latihan <span className="text-red-500">*</span></label>
                                <input type="text" name="penyediaLatihan" value={formData.penyediaLatihan} onChange={handleChange} className={formInputClass} placeholder="Contoh: NIOSH" />
                            </div>
                            
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <ModernDatePicker name="kursusDari" value={formData.kursusDari} label={<>Tarikh Mula <span className="text-red-500">*</span></>} onChange={handleChange} />
                                </div>
                                <div>
                                    <ModernDatePicker name="kursusHingga" value={formData.kursusHingga} label={<>Tarikh Tamat <span className="text-red-500">*</span></>} min={formData.kursusDari} onChange={handleChange} />
                                    {jumlahHariKursus > 0 && <p className="text-xs font-bold text-purple-500 mt-2 ml-2">Tempoh: {jumlahHariKursus} hari</p>}
                                </div>
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Tempat Kursus <span className="text-red-500">*</span></label>
                                <input type="text" name="tempatKursus" value={formData.tempatKursus} onChange={handleChange} className={formInputClass} placeholder="Contoh: Hotel Sandakan" />
                            </div>
                            <div className="md:col-span-2 pt-4 border-t border-slate-100">
                                <h3 className="font-extrabold text-slate-700 mb-4 uppercase text-sm">Maklumat Penyelia</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                                    <div>
                                        <label className={formLabelClass}>Nama Penyelia <span className="text-red-500">*</span></label>
                                        <input type="text" name="namaPenyelia" value={formData.namaPenyelia} onChange={handleChange} className={formInputClass} placeholder="Nama Penyelia Anda" />
                                    </div>
                                    <div>
                                        <label className={formLabelClass}>Jawatan / Gred <span className="text-red-500">*</span></label>
                                        <input type="text" name="jawatanPenyelia" value={formData.jawatanPenyelia} onChange={handleChange} className={formInputClass} placeholder="Contoh: PPLV DV10" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('kursus', 'penilaian')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* PENILAIAN 3 BULAN DENGAN ACCORDION */}
            <div id="section-penilaian" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isKursusComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.penilaian ? 'border-slate-100 ring-[3px] ring-purple-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'penilaian' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isKursusComplete && toggleSection('penilaian')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isKursusComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isKursusComplete ? 'bg-slate-200 text-slate-500' : (expanded.penilaian ? 'bg-purple-500 text-white shadow-md shadow-purple-500/30' : (isPenilaianComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'))}`}>
                            {!isKursusComplete ? <LockIcon /> : (isPenilaianComplete && !expanded.penilaian ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Skor Penilaian {isPenilaianComplete && !expanded.penilaian && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.penilaian && isKursusComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isPenilaianComplete ? 'Semua soalan telah dijawab' : 'Sila jawab penilaian impak (Skala 1-3)'}</p>}
                        </div>
                    </div>
                </div>

                {expanded.penilaian && isKursusComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 mb-6 flex items-center justify-between">
                            <div className="text-[12px] font-bold text-purple-800 uppercase tracking-wide">Petunjuk Skala:</div>
                            <div className="text-[12px] font-semibold text-slate-600 flex gap-4">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> 1: Tidak Setuju</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> 2: Setuju</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> 3: Amat Setuju</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Seksyen 2 */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === '2' ? 'border-purple-300 shadow-md shadow-purple-100' : 'border-slate-200'}`}>
                                {renderHeader('2', '2. Faedah diperolehi oleh pegawai', isP2Complete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === '2' ? 'max-h-[1000px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <RatingRow label="a. Dapat membantu pegawai menjalankan tugas dengan lebih berkesan" name="pk1a" />
                                    <RatingRow label="b. Dapat meningkatkan pengetahuan pegawai dalam menjalankan tugas" name="pk1b" />
                                    <RatingRow label="c. Dapat meningkatkan kemahiran pegawai dalam menjalankan tugas" name="pk1c" />
                                    <RatingRow label="d. Dapat meningkatkan keyakinan kemahiran pegawai menyebarkan pengetahuan/kemahiran kepada orang lain" name="pk1d" />
                                </div>
                            </div>

                            {/* Seksyen 3 */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === '3' ? 'border-purple-300 shadow-md shadow-purple-100' : 'border-slate-200'}`}>
                                {renderHeader('3', '3. Cadangan Lanjutan', isP3Complete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === '3' ? 'max-h-[500px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <textarea name="pkCadangan" value={formData.pkCadangan} onChange={handleChange} className={`${formInputClass} min-h-[100px] resize-none`} placeholder="Nyatakan sebarang cadangan untuk kursus lanjutan (sekiranya ada)..." />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('penilaian', 'jana')} disabled={!isPenilaianComplete} className={`font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ${isPenilaianComplete ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95' : 'bg-slate-300 text-slate-500 cursor-not-allowed'}`}>
                                {isPenilaianComplete ? 'Selesai' : 'Lengkapkan Borang'} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default FormPascaKursus;
import React, { useState, useEffect, useRef } from 'react';
import ModernDatePicker from '../ui/ModernDatePicker';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormLepasKursus = ({
    formData, handleChange, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    isPegawaiComplete, isKursusComplete, isPenilaianComplete, shakeSection, calculateDays
}) => {

    const jumlahHariKursus = calculateDays(formData.kursusDari, formData.kursusHingga);

    // ================= LOGIK ACCORDION & AUTO-ADVANCE =================
    const [activePart, setActivePart] = useState('A');
    
    // Gunakan useRef supaya sistem tidak auto-close secara berulang kali
    const advancedRef = useRef({ A: false, B: false, C: false, D: false });

    const isAComplete = formData.lkA1 > 0 && formData.lkA2 > 0 && formData.lkA3 > 0 && formData.lkA4 > 0;
    const isBComplete = formData.lkB1 > 0 && formData.lkB2 > 0 && formData.lkB3 > 0 && formData.lkB4 > 0 && formData.lkB5 > 0;
    const isCComplete = formData.lkC1 > 0 && formData.lkC2 > 0 && formData.lkC3 > 0;
    
    // lkD3a (Penginapan) dijadikan pilihan (tidak wajib)
    const isDComplete = formData.lkD1 > 0 && formData.lkD2a > 0 && formData.lkD2b > 0 && formData.lkD2c > 0 && formData.lkD3b > 0 && formData.lkD3c > 0 && formData.lkD3d > 0;
    const isEComplete = formData.lkRumusan.trim() !== '';

    useEffect(() => {
        if (expanded.penilaian) {
            if (activePart === 'A' && isAComplete && !advancedRef.current.A) {
                advancedRef.current.A = true;
                setTimeout(() => setActivePart('B'), 400);
            } else if (activePart === 'B' && isBComplete && !advancedRef.current.B) {
                advancedRef.current.B = true;
                setTimeout(() => setActivePart('C'), 400);
            } else if (activePart === 'C' && isCComplete && !advancedRef.current.C) {
                advancedRef.current.C = true;
                setTimeout(() => setActivePart('D'), 400);
            } else if (activePart === 'D' && isDComplete && !advancedRef.current.D) {
                advancedRef.current.D = true;
                setTimeout(() => setActivePart('E'), 400);
            }
        }
    }, [formData, expanded.penilaian, activePart, isAComplete, isBComplete, isCComplete, isDComplete]);

    const togglePart = (part) => setActivePart(activePart === part ? null : part);

    const renderHeader = (id, title, isComplete) => (
        <div onClick={() => togglePart(id)} className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${activePart === id ? 'bg-blue-100 text-blue-800 border-b border-blue-200' : 'bg-slate-50 text-slate-700 hover:bg-slate-100'}`}>
            <h3 className="font-extrabold">{title}</h3>
            <div className="flex items-center gap-3">
                {isComplete && activePart !== id && <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider hidden sm:block">Tekan untuk semak / ubah</span>}
                {isComplete && <div className="bg-emerald-100 text-emerald-600 p-1 rounded-full"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>}
                <svg className={`w-5 h-5 transition-transform duration-300 ${activePart === id ? 'rotate-180 text-blue-600' : 'text-slate-400'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </div>
        </div>
    );

    const RatingRow = ({ label, name, max = 5, optional = false }) => (
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-slate-100/50 gap-4 hover:bg-slate-50/50 transition-colors px-2 rounded-xl">
            <span className="text-[14px] font-semibold text-slate-700 md:w-1/2 leading-relaxed">
                {label} {optional && <span className="text-xs font-normal text-slate-400">(Pilihan)</span>}
            </span>
            <div className="flex gap-2 md:w-1/2 justify-end">
                {[...Array(max)].map((_, i) => {
                    const val = i + 1;
                    const isSelected = formData[name] === val;
                    return (
                        <label key={val} className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all duration-300 transform active:scale-90 ${isSelected ? 'bg-blue-500 border-blue-600 text-white font-bold shadow-md shadow-blue-500/30' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300 hover:text-blue-500'}`}>
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
            {/* MAKLUMAT KURSUS */}
            <div id="section-kursus" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.kursus ? 'border-slate-100 ring-[3px] ring-blue-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'kursus' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('kursus')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.kursus ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : (isKursusComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isKursusComplete && !expanded.kursus ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Kursus {isKursusComplete && !expanded.kursus && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.kursus && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isKursusComplete ? formData.kursusNama : 'Sila isi nama & tempoh kursus'}</p>}
                        </div>
                    </div>
                </div>

                {expanded.kursus && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Nama Kursus <span className="text-red-500">*</span></label>
                                <input type="text" name="kursusNama" value={formData.kursusNama} onChange={handleChange} className={formInputClass} placeholder="Contoh: Kursus Kepimpinan Berkesan" />
                            </div>
                            
                            <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <ModernDatePicker name="kursusDari" value={formData.kursusDari} label={<>Mula Kursus (Dari) <span className="text-red-500">*</span></>} onChange={handleChange} />
                                </div>
                                <div>
                                    <ModernDatePicker name="kursusHingga" value={formData.kursusHingga} label={<>Tamat Kursus (Hingga) <span className="text-red-500">*</span></>} min={formData.kursusDari} onChange={handleChange} />
                                    {jumlahHariKursus > 0 && <p className="text-xs font-bold text-blue-500 mt-2 ml-2">Tempoh: {jumlahHariKursus} hari</p>}
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

            {/* PENILAIAN DENGAN ACCORDION */}
            <div id="section-penilaian" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isKursusComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.penilaian ? 'border-slate-100 ring-[3px] ring-amber-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'penilaian' ? 'animate-shake border-red-400' : ''} mt-5`}>
                <div onClick={() => isKursusComplete && toggleSection('penilaian')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isKursusComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isKursusComplete ? 'bg-slate-200 text-slate-500' : (expanded.penilaian ? 'bg-amber-500 text-white shadow-md shadow-amber-500/30' : (isPenilaianComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'))}`}>
                            {!isKursusComplete ? <LockIcon /> : (isPenilaianComplete && !expanded.penilaian ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Skor Penilaian {isPenilaianComplete && !expanded.penilaian && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.penilaian && isKursusComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isPenilaianComplete ? 'Semua soalan telah dijawab' : 'Sila jawab semua soalan (Skala 1-5)'}</p>}
                        </div>
                    </div>
                </div>

                {expanded.penilaian && isKursusComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 mb-6 flex items-center justify-between">
                            <div className="text-[12px] font-bold text-blue-800 uppercase tracking-wide">Petunjuk Skala:</div>
                            <div className="text-[12px] font-semibold text-slate-600 flex gap-4">
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span> 1-2: Tidak Memuaskan</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-amber-400"></span> 3: Sederhana</span>
                                <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> 4-5: Memuaskan</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {/* Seksyen A */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === 'A' ? 'border-blue-300 shadow-md shadow-blue-100' : 'border-slate-200'}`}>
                                {renderHeader('A', 'A. Meningkatkan Pengetahuan', isAComplete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === 'A' ? 'max-h-[1000px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <RatingRow label="1. Tahap pemahaman anda terhadap kursus" name="lkA1" />
                                    <RatingRow label="2. Pengetahuan yang diperolehi setelah mengikuti kursus ini" name="lkA2" />
                                    <RatingRow label="3. Bolehkah anda mempraktikkan kemahiran yang diperolehi" name="lkA3" />
                                    <RatingRow label="4. Kemahiran menyelesaikan masalah berkaitan kursus" name="lkA4" />
                                </div>
                            </div>

                            {/* Seksyen B */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === 'B' ? 'border-blue-300 shadow-md shadow-blue-100' : 'border-slate-200'}`}>
                                {renderHeader('B', 'B. Keberkesanan Kursus', isBComplete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === 'B' ? 'max-h-[1000px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <RatingRow label="1. Keberkesanan kursus yang diikuti secara keseluruhan" name="lkB1" />
                                    <RatingRow label="2. Tahap pemahaman selepas mengikuti kursus" name="lkB2" />
                                    <RatingRow label="3. Adakah jangkamasa kursus sesuai" name="lkB3" />
                                    <RatingRow label="4. Objektif sebenar kursus tercapai" name="lkB4" />
                                    <RatingRow label="5. Adakah kaedah penyampaian dan latihan sesuai" name="lkB5" />
                                </div>
                            </div>

                            {/* Seksyen C */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === 'C' ? 'border-blue-300 shadow-md shadow-blue-100' : 'border-slate-200'}`}>
                                {renderHeader('C', 'C. Faedah kepada Jabatan', isCComplete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === 'C' ? 'max-h-[1000px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <RatingRow label="1. Sejauh manakah kursus ini berfaedah kepada Jabatan" name="lkC1" />
                                    <RatingRow label="2. Adakah tugas sekarang sesuai dengan kursus yang diikuti" name="lkC2" />
                                    <RatingRow label="3. Adakah kursus ini dapat meningkatkan kemahiran kepada tugas semasa" name="lkC3" />
                                </div>
                            </div>

                            {/* Seksyen D */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === 'D' ? 'border-blue-300 shadow-md shadow-blue-100' : 'border-slate-200'}`}>
                                {renderHeader('D', 'D. Keberkesanan Penyedia Latihan', isDComplete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === 'D' ? 'max-h-[1500px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <RatingRow label="1. Pensyarah yang berpengalaman (Penyampaian Latihan)" name="lkD1" />
                                    <div className="font-bold text-[13px] text-blue-600 bg-blue-50 px-3 py-2 rounded-lg mt-4 mb-2">2. Perhubungan semasa berkursus di antara peserta:</div>
                                    <RatingRow label="a. Pensyarah" name="lkD2a" />
                                    <RatingRow label="b. Peserta" name="lkD2b" />
                                    <RatingRow label="c. Penganjur / Pengurusan Institut Latihan" name="lkD2c" />
                                    <div className="font-bold text-[13px] text-blue-600 bg-blue-50 px-3 py-2 rounded-lg mt-4 mb-2">3. Kemudahan yang diberikan:</div>
                                    
                                    {/* Penginapan tidak diwajibkan */}
                                    <RatingRow label="a. Penginapan (sekiranya berkaitan)" name="lkD3a" optional={true} />
                                    <RatingRow label="b. Kemudahan Asas" name="lkD3b" />
                                    <RatingRow label="c. Nota dan alat bantuan mengajar" name="lkD3c" />
                                    <RatingRow label="d. Makan dan minum" name="lkD3d" />
                                </div>
                            </div>

                            {/* Seksyen E */}
                            <div className={`border rounded-2xl overflow-hidden transition-all duration-300 ${activePart === 'E' ? 'border-blue-300 shadow-md shadow-blue-100' : 'border-slate-200'}`}>
                                {renderHeader('E', 'E. Rumusan dan Cadangan', isEComplete)}
                                <div className={`transition-all duration-500 bg-white ${activePart === 'E' ? 'max-h-[500px] opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <textarea name="lkRumusan" value={formData.lkRumusan} onChange={handleChange} className={`${formInputClass} min-h-[100px] resize-none`} placeholder="Nyatakan rumusan atau cadangan anda berkenaan kursus ini..." />
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
export default FormLepasKursus;
import React from 'react';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormLepasKursus = ({
    formData, handleChange, expanded, toggleSection, nextSection, formInputClass, formLabelClass,
    isPegawaiComplete, isKursusComplete, isPenilaianComplete, shakeSection
}) => {

    const RatingRow = ({ label, name, max = 5 }) => (
        <div className="flex flex-col md:flex-row md:items-center justify-between py-4 border-b border-slate-100 gap-4">
            <span className="text-[14px] font-semibold text-slate-700 md:w-1/2">{label}</span>
            <div className="flex gap-2 md:w-1/2 justify-end">
                {[...Array(max)].map((_, i) => {
                    const val = i + 1;
                    const isSelected = formData[name] === val;
                    return (
                        <label key={val} className={`w-10 h-10 flex items-center justify-center rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'bg-blue-50 border-blue-500 text-blue-700 font-bold' : 'bg-white border-slate-200 text-slate-500 hover:border-blue-300'}`}>
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
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Tempoh Kursus <span className="text-red-500">*</span></label>
                                <input type="text" name="kursusTempoh" value={formData.kursusTempoh} onChange={handleChange} className={formInputClass} placeholder="Contoh: 3 Hari (12 - 14 Okt 2026)" />
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

            {/* PENILAIAN */}
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
                        <div className="bg-blue-50/50 p-4 rounded-2xl border border-blue-100 mb-6">
                            <p className="text-[12px] font-bold text-blue-800 uppercase tracking-wide mb-2">Petunjuk Skala:</p>
                            <p className="text-[13px] text-slate-600"><strong>1-2:</strong> Tidak memuaskan / Tidak boleh &nbsp;&nbsp;|&nbsp;&nbsp; <strong>3:</strong> Memuaskan / Sederhana &nbsp;&nbsp;|&nbsp;&nbsp; <strong>4-5:</strong> Sangat memuaskan / Boleh</p>
                        </div>

                        <div className="space-y-8">
                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-extrabold text-slate-800 mb-2">A. Meningkatkan Pengetahuan</h3>
                                <RatingRow label="1. Tahap pemahaman anda terhadap kursus" name="lkA1" />
                                <RatingRow label="2. Pengetahuan yang diperolehi setelah mengikuti kursus ini" name="lkA2" />
                                <RatingRow label="3. Bolehkah anda mempraktikkan kemahiran yang diperolehi" name="lkA3" />
                                <RatingRow label="4. Kemahiran menyelesaikan masalah berkaitan kursus" name="lkA4" />
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-extrabold text-slate-800 mb-2">B. Keberkesanan Kursus</h3>
                                <RatingRow label="1. Keberkesanan kursus yang diikuti secara keseluruhan" name="lkB1" />
                                <RatingRow label="2. Tahap pemahaman selepas mengikuti kursus" name="lkB2" />
                                <RatingRow label="3. Adakah jangkamasa kursus sesuai" name="lkB3" />
                                <RatingRow label="4. Objektif sebenar kursus tercapai" name="lkB4" />
                                <RatingRow label="5. Adakah kaedah penyampaian dan latihan sesuai" name="lkB5" />
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-extrabold text-slate-800 mb-2">C. Faedah kepada Jabatan</h3>
                                <RatingRow label="1. Sejauh manakah kursus ini berfaedah kepada Jabatan" name="lkC1" />
                                <RatingRow label="2. Adakah tugas sekarang sesuai dengan kursus yang diikuti" name="lkC2" />
                                <RatingRow label="3. Adakah kursus ini dapat meningkatkan kemahiran kepada tugas semasa" name="lkC3" />
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-extrabold text-slate-800 mb-2">D. Keberkesanan Penyedia Latihan</h3>
                                <RatingRow label="1. Pensyarah yang berpengalaman (Penyampaian Latihan)" name="lkD1" />
                                <p className="font-bold text-[13px] text-slate-500 mt-4 mb-2">2. Perhubungan semasa berkursus di antara peserta:</p>
                                <RatingRow label="a. Pensyarah" name="lkD2a" />
                                <RatingRow label="b. Peserta" name="lkD2b" />
                                <RatingRow label="c. Penganjur / Pengurusan Institut Latihan" name="lkD2c" />
                                <p className="font-bold text-[13px] text-slate-500 mt-4 mb-2">3. Kemudahan yang diberikan:</p>
                                <RatingRow label="a. Penginapan (sekiranya berkaitan)" name="lkD3a" />
                                <RatingRow label="b. Kemudahan Asas" name="lkD3b" />
                                <RatingRow label="c. Nota dan alat bantuan mengajar" name="lkD3c" />
                                <RatingRow label="d. Makan dan minum" name="lkD3d" />
                            </div>

                            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                                <h3 className="font-extrabold text-slate-800 mb-2">E. Rumusan dan cadangan</h3>
                                <textarea name="lkRumusan" value={formData.lkRumusan} onChange={handleChange} className={`${formInputClass} min-h-[100px] resize-none`} placeholder="Nyatakan rumusan atau cadangan anda..." />
                            </div>
                        </div>
                        
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('penilaian', 'jana')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Selesai <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};
export default FormLepasKursus;
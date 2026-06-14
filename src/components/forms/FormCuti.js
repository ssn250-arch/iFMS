import React from 'react';
import UniversalSelect from '../ui/UniversalSelect';
import ModernDatePicker from '../ui/ModernDatePicker';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const FormCuti = ({
    formData, handleChange, expanded, toggleSection, nextSection,
    formInputClass, formLabelClass, pegawaiDatabase, isPegawaiComplete,
    isCutiComplete, calculateDays, handleCutiPenggantiChange, shakeSection, isCutiGantiComplete
}) => {
    return (
        <div id="section-cuti" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.cuti ? 'border-slate-100 ring-[3px] ring-emerald-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'cuti' ? 'animate-shake border-red-400' : ''}`}>
            <div onClick={() => isPegawaiComplete && toggleSection('cuti')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                <div className="flex items-center gap-4">
                    <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.cuti ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' : (isCutiComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-50 text-emerald-600'))}`}>
                        {!isPegawaiComplete ? <LockIcon /> : (isCutiComplete && !expanded.cuti ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>)}
                    </div>
                    <div>
                        <h2 className="text-lg font-extrabold text-slate-800">Maklumat Permohonan Cuti {isCutiComplete && !expanded.cuti && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                        {!expanded.cuti && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{formData.ketuaSokongan ? `Sokongan: ${formData.ketuaSokongan}` : 'Sila isi jenis dan tarikh cuti'}</p>}
                    </div>
                </div>
                {isPegawaiComplete && (
                    <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.cuti ? 'rotate-180 bg-emerald-50 text-emerald-600' : 'text-slate-400'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                )}
            </div>

            {expanded.cuti && isPegawaiComplete && (
                <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                        <div className="md:col-span-2">
                            <UniversalSelect 
                                wrapperId="wrap-jenisCuti"
                                name="jenisCuti" 
                                value={formData.jenisCuti} 
                                label={<>Jenis Cuti <span className="text-red-500">*</span></>} 
                                options={["Cuti Rehat", "Cuti Kecemasan", "Cuti Tanpa Rekod", "Cuti Ganti"]} 
                                onChange={handleChange} 
                            />
                        </div>
                        <div>
                            <ModernDatePicker name="cutiDari" value={formData.cutiDari} label={<>Mula Cuti (Dari) <span className="text-red-500">*</span></>} onChange={handleChange} />
                        </div>
                        <div>
                            <ModernDatePicker name="cutiHingga" value={formData.cutiHingga} label={<>Tamat Cuti (Hingga) <span className="text-red-500">*</span></>} min={formData.cutiDari} onChange={handleChange} />
                            {calculateDays(formData.cutiDari, formData.cutiHingga) > 0 && <p className="text-xs font-bold text-emerald-500 mt-2 ml-2">Jumlah Cuti: {calculateDays(formData.cutiDari, formData.cutiHingga)} hari</p>}
                        </div>

                        <div className="md:col-span-2">
                            <label className={formLabelClass}>Catatan (Pilihan)</label>
                            <input type="text" name="catatanCuti" value={formData.catatanCuti} onChange={handleChange} className={formInputClass} placeholder="Contoh: Cuti Ganti / Cuti Sakit" />
                        </div>

                        {/* Maklumat Pengganti untuk Cuti Ganti / Cuti Tanpa Rekod */}
                        {(formData.jenisCuti === 'Cuti Ganti' || formData.jenisCuti === 'Cuti Tanpa Rekod') && (
                            <div className="md:col-span-2 mt-4 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-6">
                                <h3 className="text-[14px] font-extrabold uppercase text-slate-500 mb-5 tracking-wide">
                                    Maklumat Pegawai Pengganti {formData.jenisCuti === 'Cuti Ganti' ? '(Cuti Ganti)' : '(Cuti Tanpa Rekod)'}
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <label className={formLabelClass}>Nama Pengganti <span className="text-red-500">*</span></label>
                                        <div className="relative">
                                            <select 
                                                id="wrap-cutiPenggantiNama"
                                                name="cutiPenggantiNama" 
                                                value={formData.cutiPenggantiNama} 
                                                onChange={handleCutiPenggantiChange}
                                                className={`block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 cursor-pointer ${formData.cutiPenggantiNama ? 'text-slate-800' : 'text-slate-400 font-medium'}`}
                                            >
                                                <option value="" disabled>-- Sila Pilih Pengganti --</option>
                                                {pegawaiDatabase.filter(p => p.nama !== formData.nama && p.bahagian === formData.bahagian).sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                                    <option key={`cutiGanti-${idx}`} value={p.nama}>{p.nama} ({p.bahagian})</option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <label className={formLabelClass}>Bahagian</label>
                                        <input type="text" name="cutiPenggantiBahagian" value={formData.cutiPenggantiBahagian} onChange={handleChange} className={formInputClass} readOnly />
                                    </div>
                                    <div>
                                        <label className={formLabelClass}>No. Telefon</label>
                                        <input id="wrap-cutiPenggantiNoTel" type="text" name="cutiPenggantiNoTel" value={formData.cutiPenggantiNoTel} onChange={handleChange} className={formInputClass} placeholder="Contoh: 01X-XXXXXXX" />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className={formLabelClass}>Tugas / Subjek Ditinggalkan <span className="text-red-500">*</span></label>
                                        <input id="wrap-cutiPenggantiTugas" type="text" name="cutiPenggantiTugas" value={formData.cutiPenggantiTugas} onChange={handleChange} className={formInputClass} placeholder="Contoh: Mengajar Kelas TKR 3" />
                                    </div>
                                </div>
                            </div>
                        )}
                        
                        <div className="md:col-span-2 mt-4 pt-6 border-t border-slate-100">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className={formLabelClass}>Ketua Bahagian/Unit<span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select 
                                            id="wrap-ketuaSokongan"
                                            name="ketuaSokongan" 
                                            value={formData.ketuaSokongan} 
                                            onChange={handleChange}
                                            className={`block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 cursor-pointer ${formData.ketuaSokongan ? 'text-slate-800' : 'text-slate-400 font-medium'}`}
                                        >
                                            <option value="" disabled>-- Sila Pilih --</option>
                                            {[...pegawaiDatabase].filter(p => p.nama !== formData.nama).sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                                <option key={`ketua-${idx}`} value={p.nama}>{p.nama} ({p.jawatan})</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <label className={formLabelClass}>Pegawai Pelulus<span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select 
                                            id="wrap-pegawaiPelulus"
                                            name="pegawaiPelulus" 
                                            value={formData.pegawaiPelulus} 
                                            onChange={handleChange}
                                            className={`block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 cursor-pointer ${formData.indigo700 ? 'text-slate-800' : 'text-slate-400 font-medium'}`}
                                        >
                                            <option value="" disabled>-- Sila Pilih --</option>
                                            {[...pegawaiDatabase].filter(p => p.nama !== formData.nama).sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                                <option key={`pelulus-${idx}`} value={p.nama}>{p.nama} ({p.jawatan})</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <p className="text-[12px] text-slate-400 mt-3 ml-2 font-medium">Borang akan menjana ruangan tandatangan secara automatik untuk ketua sokongan dan pelulus.</p>
                        </div>
                    </div>
                    <div className="mt-8 flex justify-end">
                        <button onClick={() => nextSection('cuti', 'jana')} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-xl shadow-[0_10px_20px_rgba(16,185,129,0.25)] transition-all active:scale-95 flex items-center gap-2">
                            Selesai <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormCuti;
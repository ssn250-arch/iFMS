import React from 'react';
import UniversalSelect from '../ui/UniversalSelect';
import ModernDatePicker from '../ui/ModernDatePicker';
import ModernTimePicker from '../ui/ModernTimePicker';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
);

const PlaneTakeoffIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.3c-.2.5.1 1.1.6 1.2l6.2 1.5-3.3 3.3-3.2-.8c-.4-.1-.8.1-1 .5l-.8 1.6c-.2.4 0 .9.4 1.1l4.8 2.4 2.4 4.8c.2.4.7.6 1.1.4l1.6-.8c.4-.2.6-.6.5-1l-.8-3.2 3.3-3.3 1.5 6.2c.1.5.7.8 1.2.6l3.3-1.2c.5-.2.8-.6.7-1.1z"/></svg>
);

const PlaneLandingIcon = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className} style={{transform: "scaleX(-1)"}}><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.3c-.2.5.1 1.1.6 1.2l6.2 1.5-3.3 3.3-3.2-.8c-.4-.1-.8.1-1 .5l-.8 1.6c-.2.4 0 .9.4 1.1l4.8 2.4 2.4 4.8c.2.4.7.6 1.1.4l1.6-.8c.4-.2.6-.6.5-1l-.8-3.2 3.3-3.3 1.5 6.2c.1.5.7.8 1.2.6l3.3-1.2c.5-.2.8-.6.7-1.1z"/></svg>
);

const quickTemplates = [
    { label: "Mesyuarat", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, tujuan: "Menghadiri Mesyuarat Rasmi", perjalanan: "Kereta Sendiri" },
    { label: "Kursus", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>, tujuan: "Menghadiri Kursus/Latihan", perjalanan: "Kapal Terbang" },
    { label: "Lawatan", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>, tujuan: "Lawatan Sambil Belajar", perjalanan: "Kereta Jabatan" },
    { label: "Bengkel", icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>, tujuan: "Menghadiri Bengkel", perjalanan: "Lain-lain" }
];

const FormTugas = ({
    formData, handleChange, setFormData, expanded, toggleSection, nextSection,
    formInputClass, formLabelClass, pegawaiDatabase, malaysiaAirports, getAirportName,
    setRoute, isPegawaiComplete, isTugasComplete, isPenggantiComplete, isTiketComplete,
    jumlahHari, isGantiDateLocked, setIsGantiDateLocked, handlePenggantiChange, shakeSection
}) => {
    return (
        <>
            {/* 2. BUTIRAN TUGAS */}
            <div id="section-tugas" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tugas ? 'border-slate-100 ring-[3px] ring-indigo-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tugas' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isPegawaiComplete && toggleSection('tugas')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.tugas ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : (isTugasComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'))}`}>
                            {!isPegawaiComplete ? <LockIcon /> : (isTugasComplete && !expanded.tugas ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Maklumat Tugasan {isTugasComplete && !expanded.tugas && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.tugas && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{formData.tempat || 'Sila isi tugasan'}</p>}
                        </div>
                    </div>
                    {isPegawaiComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.tugas ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.tugas && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="mb-8">
                            <label className={formLabelClass}>Isi Pantas Tugasan (Pilihan)</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-3">
                                {quickTemplates.map((t, idx) => (
                                    <button 
                                        key={idx} 
                                        onClick={() => setFormData(prev => ({ ...prev, tujuan: t.tujuan, caraPerjalanan: t.perjalanan }))}
                                        className="flex flex-col items-center justify-center p-3 rounded-2xl bg-white border border-slate-200 hover:border-indigo-400 hover:bg-indigo-50 hover:text-indigo-700 transition-all text-slate-600 font-bold text-[13px] gap-2 active:scale-95 shadow-sm"
                                    >
                                        <div className="text-indigo-500">{t.icon}</div>
                                        <span>{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Perihal Tugas / Tujuan <span className="text-red-500">*</span></label>
                                <textarea id="wrap-tujuan" name="tujuan" value={formData.tujuan} onChange={handleChange} className={`${formInputClass} min-h-[100px] resize-none`} placeholder="Nyatakan tujuan perjalanan rasmi anda..." />
                            </div>
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Tempat / Lokasi <span className="text-red-500">*</span></label>
                                <input id="wrap-tempat" type="text" name="tempat" value={formData.tempat} onChange={handleChange} className={formInputClass} placeholder="Contoh: JTM Putrajaya" />
                            </div>
                            <div>
                                <ModernDatePicker name="tarikhPergi" value={formData.tarikhPergi} label={<>Tarikh Pergi <span className="text-red-500">*</span></>} onChange={handleChange} />
                            </div>
                            <div>
                                <ModernDatePicker name="tarikhBalik" value={formData.tarikhBalik} label={<>Tarikh Balik <span className="text-red-500">*</span></>} min={formData.tarikhPergi} onChange={handleChange} />
                                {jumlahHari > 0 && <p className="text-xs font-bold text-indigo-500 mt-2 ml-2">Tempoh: {jumlahHari} hari</p>}
                            </div>

                            <div className="md:col-span-2 pt-4 border-t border-slate-100">
                                <UniversalSelect 
                                    name="caraPerjalanan" 
                                    value={formData.caraPerjalanan} 
                                    label="Cara Perjalanan Pilihan" 
                                    options={["Kereta Sendiri", "Kereta Jabatan", "Kereta Rasmi Jawatan", "Kapal Terbang", "Lain-lain"]} 
                                    onChange={handleChange} 
                                    placeholder="Sila Pilih" 
                                />
                            </div>

                            <div className={`md:col-span-2 transition-all duration-500 overflow-hidden ${formData.caraPerjalanan === 'Kereta Sendiri' ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
                                <div className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-6 mt-2">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className={formLabelClass}>No. Kenderaan (Sendiri)</label>
                                            <input type="text" name="noKenderaan" value={formData.noKenderaan} onChange={handleChange} className={formInputClass} placeholder="Contoh: ABC 1234" />
                                        </div>
                                        <div>
                                            <label className={formLabelClass}>Anggaran Kilometer (Sehala)</label>
                                            <input type="number" name="km" value={formData.km} onChange={handleChange} className={formInputClass} placeholder="Cth: 150" />
                                        </div>
                                    </div>

                                    <div className="mt-6">
                                        <label className="block text-[13px] font-extrabold text-slate-800 mb-3">Jika perjalanan melebihi 240km, sila tandakan sebab (Boleh tanda lebih dari satu):</label>
                                        <div className="space-y-3">
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input type="checkbox" name="sebab1" checked={formData.sebab1} onChange={handleChange} className="custom-checkbox mt-0.5 flex-shrink-0" />
                                                <span className="text-[14px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Dikehendaki menjalankan tugas dibeberapa tempat di sepanjang perjalanan</span>
                                            </label>
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input type="checkbox" name="sebab2" checked={formData.sebab2} onChange={handleChange} className="custom-checkbox mt-0.5 flex-shrink-0" />
                                                <span className="text-[14px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Adalah mustahak dan terpaksa bagi seseorang pegawai berkenderaan sendiri</span>
                                            </label>
                                            <label className="flex items-start gap-3 cursor-pointer group">
                                                <input type="checkbox" name="sebab3" checked={formData.sebab3} onChange={handleChange} className="custom-checkbox mt-0.5 flex-shrink-0" />
                                                <span className="text-[14px] font-semibold text-slate-600 group-hover:text-slate-900 transition-colors">Membawa pegawai lain sebagai penumpang yang juga menjalankan tugas rasmi</span>
                                            </label>
                                        </div>
                                    </div>

                                    <div className="mt-6 pt-5 border-t border-slate-200">
                                        <label className="block text-[13px] font-extrabold text-slate-800 mb-3">Pilihan Tuntutan (Jika kenderaan sendiri):</label>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.tuntutanBatu ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                                                <input type="checkbox" name="tuntutanBatu" checked={formData.tuntutanBatu} onChange={handleChange} className="custom-checkbox flex-shrink-0" />
                                                <span className={`text-[14px] font-bold ${formData.tuntutanBatu ? 'text-blue-700' : 'text-slate-600'}`}>Elaun Hitungan Batu</span>
                                            </label>
                                            <label className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${formData.tuntutanGantian ? 'bg-blue-50 border-blue-500' : 'bg-white border-slate-200 hover:border-blue-300'}`}>
                                                <input type="checkbox" name="tuntutanGantian" checked={formData.tuntutanGantian} onChange={handleChange} className="custom-checkbox flex-shrink-0" />
                                                <span className={`text-[14px] font-bold ${formData.tuntutanGantian ? 'text-blue-700' : 'text-slate-600'}`}>Gantian Tambang Penerbangan</span>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('tugas', 'pengganti')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 3. TUGAS SEMENTARA PENGGANTI */}
            <div id="section-pengganti" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isTugasComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.pengganti ? 'border-slate-100 ring-[3px] ring-emerald-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'pengganti' ? 'animate-shake border-red-400' : ''}`}>
                <div onClick={() => isTugasComplete && toggleSection('pengganti')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTugasComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                    <div className="flex items-center gap-4">
                        <div className={`p-2.5 rounded-xl transition-colors ${!isTugasComplete ? 'bg-slate-200 text-slate-500' : (expanded.pengganti ? 'bg-emerald-600 text-white shadow-md shadow-emerald-500/30' : (isPenggantiComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-emerald-50 text-emerald-600'))}`}>
                            {!isTugasComplete ? <LockIcon /> : (isPenggantiComplete && !expanded.pengganti ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>)}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">Pelepasan Tugas Sementara {isPenggantiComplete && !expanded.pengganti && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                            {!expanded.pengganti && isTugasComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{formData.namaPengganti || 'Wajib pilih nama pengganti atau Tiada Pengganti'}</p>}
                        </div>
                    </div>
                    {isTugasComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.pengganti ? 'rotate-180 bg-emerald-50 text-emerald-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    )}
                </div>

                {expanded.pengganti && isTugasComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-6 relative mb-8">
                            <h3 className="text-[14px] font-extrabold uppercase text-slate-500 mb-5 tracking-wide">Maklumat Pegawai Pengganti</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className={formLabelClass}>Nama Pengganti <span className="text-red-500">*</span></label>
                                    <div className="relative">
                                        <select 
                                            id="wrap-namaPengganti"
                                            onChange={handlePenggantiChange} 
                                            value={formData.namaPengganti}
                                            className={`block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 cursor-pointer ${formData.namaPengganti ? 'text-slate-800' : 'text-slate-400 font-medium'}`}
                                        >
                                            <option value="" disabled>-- Sila Pilih Pengganti --</option>
                                            <option value="TIADA PENGGANTI">-- TIADA PENGGANTI (TUGAS PEJABAT SAHAJA) --</option>
                                            {pegawaiDatabase.filter(p => p.nama !== formData.nama && p.bahagian === formData.bahagian).sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                                <option key={`sama-${idx}`} value={p.nama}>{p.nama}</option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className={`transition-all duration-500 overflow-hidden md:col-span-2 ${(formData.namaPengganti && formData.namaPengganti !== 'TIADA PENGGANTI') ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-1">
                                        <div>
                                            <label className={formLabelClass}>Bahagian</label>
                                            <input type="text" name="bahagianPengganti" value={formData.bahagianPengganti} onChange={handleChange} className={formInputClass} readOnly />
                                        </div>
                                        <div>
                                            <label className={formLabelClass}>No. Telefon</label>
                                            <input type="text" name="noTelPengganti" value={formData.noTelPengganti} onChange={handleChange} className={formInputClass} placeholder="Contoh: 01X-XXXXXXX" />
                                        </div>
                                        <div className="md:col-span-2">
                                            <UniversalSelect 
                                                name="jenisAmbilAlih" 
                                                value={formData.jenisAmbilAlih} 
                                                label="Jenis Ambil Alih Tugas" 
                                                options={["Ambil alih subjek / tugas sepenuhnya", "Ambil alih kawalan kelas / tugas"]} 
                                                onChange={handleChange} 
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7 mb-8">
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Subjek / Tugas Ditinggalkan <span className="text-red-500">*</span></label>
                                <input id="wrap-subjek" type="text" name="subjek" value={formData.subjek} onChange={handleChange} className={formInputClass} placeholder="Contoh: Mengajar Amali / Tiada" />
                            </div>
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Semester / Kumpulan / Unit / Bahagian</label>
                                <input type="text" name="semester" value={formData.semester} onChange={handleChange} className={formInputClass} placeholder="Contoh: Sem 2 / Kump B / Unit ICT" />
                            </div>

                            <div className="md:col-span-2 flex items-center justify-end gap-3 mb-[-15px]">
                                <span className="text-[12px] font-bold text-slate-500">
                                    {isGantiDateLocked ? '🔒 Tarikh ikut tugasan' : '🔓 Tarikh bebas'}
                                </span>
                                <button
                                    type="button"
                                    onClick={() => setIsGantiDateLocked(!isGantiDateLocked)}
                                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${isGantiDateLocked ? 'bg-slate-300' : 'bg-emerald-500'}`}
                                >
                                    <span className={`inline-block h-5 w-5 transform rounded-full bg-white shadow-md transition-transform ${isGantiDateLocked ? 'translate-x-1' : 'translate-x-6'}`}></span>
                                </button>
                            </div>
                            
                            <div>
                                <ModernDatePicker name="tarikhGantiDari" value={formData.tarikhGantiDari} label="Tarikh Ganti (Dari)" onChange={handleChange} />
                            </div>
                            <div>
                                <ModernDatePicker name="tarikhGantiHingga" value={formData.tarikhGantiHingga} label="Tarikh Ganti (Hingga)" min={formData.tarikhGantiDari} onChange={handleChange} />
                            </div>
                            
                            <div className="md:col-span-2">
                                <label className={formLabelClass}>Catatan Tugasan (Pilihan)</label>
                                <input type="text" name="catatanTugas" value={formData.catatanTugas || ''} onChange={handleChange} className={formInputClass} placeholder="Contoh: Modul 1 / Pelajar berada di Bengkel" />
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button onClick={() => nextSection('pengganti', formData.caraPerjalanan === 'Kapal Terbang' ? 'tiket' : 'jana')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                {formData.caraPerjalanan === 'Kapal Terbang' ? 'Ke Tiket Penerbangan' : 'Selesai'} <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* 4. TIKET PENERBANGAN */}
            <div id="section-tiket" className={`transition-all duration-700 overflow-hidden ${formData.caraPerjalanan === 'Kapal Terbang' ? 'max-h-[3000px] opacity-100 mt-5' : 'max-h-0 opacity-0 m-0'}`}>
                <div className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isTugasComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tiket ? 'border-slate-100 ring-[3px] ring-sky-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tiket' ? 'animate-shake border-red-400' : ''}`}>
                    <div onClick={() => isTugasComplete && toggleSection('tiket')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isTugasComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl transition-colors ${!isTugasComplete ? 'bg-slate-200 text-slate-500' : (expanded.tiket ? 'bg-sky-600 text-white shadow-md shadow-sky-500/30' : (isTiketComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-sky-50 text-sky-600'))}`}>
                                {!isTugasComplete ? <LockIcon /> : (isTiketComplete && !expanded.tiket ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/><path d="m11 2 9 9"/><path d="m15 2 5 5-5 5"/></svg>)}
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-slate-800">Tiket Penerbangan {isTiketComplete && !expanded.tiket && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                                {!expanded.tiket && isTugasComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTiketComplete ? 'Maklumat penerbangan lengkap' : 'Sila isi maklumat penerbangan'}</p>}
                            </div>
                        </div>
                        {isTugasComplete && (
                            <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.tiket ? 'rotate-180 bg-sky-50 text-sky-600' : 'text-slate-400'}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            </div>
                        )}
                    </div>

                    {expanded.tiket && isTugasComplete && (
                        <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up bg-slate-50/50">
                            <div className="flex flex-wrap gap-2 mb-8 justify-center">
                                <button onClick={() => setRoute('SDK', 'KUL')} className="px-4 py-2 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[13px] font-bold rounded-full transition-all shadow-sm active:scale-95">SDK ⇄ KUL</button>
                                <button onClick={() => setRoute('SDK', 'BKI')} className="px-4 py-2 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[13px] font-bold rounded-full transition-all shadow-sm active:scale-95">SDK ⇄ BKI</button>
                                <button onClick={() => setRoute('BKI', 'KUL')} className="px-4 py-2 bg-white border border-slate-200 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-700 text-slate-600 text-[13px] font-bold rounded-full transition-all shadow-sm active:scale-95">BKI ⇄ KUL</button>
                            </div>

                            <div className="bg-white p-4 rounded-2xl border border-slate-200 mb-6 shadow-sm">
                                <div className="flex items-center gap-4 justify-center">
                                    <label className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${formData.flightType === 'single' ? 'bg-sky-100 border-sky-400 text-sky-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                        <input type="radio" name="flightType" value="single" checked={formData.flightType === 'single'} onChange={handleChange} className="hidden" />
                                        <span className="font-bold">Sektor Tunggal (Terus)</span>
                                    </label>
                                    <label className={`flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all ${formData.flightType === 'multi' ? 'bg-sky-100 border-sky-400 text-sky-700 shadow-sm' : 'bg-slate-50 border-slate-200 text-slate-500'}`}>
                                        <input type="radio" name="flightType" value="multi" checked={formData.flightType === 'multi'} onChange={handleChange} className="hidden" />
                                        <span className="font-bold">Dua Sektor (Contoh SDK-KUL, KUL-PEN)</span>
                                    </label>
                                </div>
                            </div>

                            {/* KAD TIKET PERGI */}
                            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden mb-8 relative">
                                <div className="ticket-cutout left"></div>
                                <div className="ticket-cutout right"></div>
                                <div className="bg-sky-50 px-6 py-4 flex items-center justify-between border-b border-sky-100">
                                    <div className="flex items-center gap-2 text-sky-700 font-extrabold tracking-wide">
                                        <PlaneTakeoffIcon className="w-5 h-5" /> 
                                        <span>PERGI (DEPARTURE)</span>
                                    </div>
                                    <div className="px-3 py-1 bg-sky-600 text-white text-[10px] font-bold rounded-full shadow-sm tracking-widest">OUTBOUND</div>
                                </div>

                                <div className="p-6 md:p-8">
                                    {/* Leg 1 Pergi */}
                                    <div className="mb-6 border-b border-slate-100 pb-6">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-3">Leg 1</div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-[40%] text-left group">
                                                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Dari (Origin) <span className="text-red-500">*</span></label>
                                                <div id="wrap-flightPergiDari" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                    <div className={`flight-input text-4xl sm:text-5xl w-full transition-colors ${formData.flightPergiDari ? 'text-slate-800' : 'text-slate-200'}`}>
                                                        {formData.flightPergiDari || "---"}
                                                    </div>
                                                    <select name="flightPergiDari" value={formData.flightPergiDari} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                        <option value="" disabled>Pilih</option>
                                                        {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-sky-600 transition-colors">{getAirportName(formData.flightPergiDari)}</div>
                                            </div>
                                            <div className="flex-1 flex justify-center items-center px-4 relative">
                                                <div className="w-full h-[2px] bg-transparent border-t-2 border-dashed border-slate-300"></div>
                                                <div className="absolute bg-white px-3 text-sky-400">
                                                    <PlaneTakeoffIcon className="w-6 h-6 text-sky-500 transform hover:scale-110 transition-transform cursor-pointer" />
                                                </div>
                                            </div>
                                            <div className="w-[40%] text-right group">
                                                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Ke (Destination) <span className="text-red-500">*</span></label>
                                                <div id="wrap-flightPergiKe" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                    <div className={`flight-input text-4xl sm:text-5xl text-right w-full transition-colors ${formData.flightPergiKe ? 'text-slate-800' : 'text-slate-200'}`}>
                                                        {formData.flightPergiKe || "---"}
                                                    </div>
                                                    <select name="flightPergiKe" value={formData.flightPergiKe} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                        <option value="" disabled>Pilih</option>
                                                        {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-sky-600 transition-colors">{getAirportName(formData.flightPergiKe)}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <ModernDatePicker name="flightPergiTarikh" value={formData.flightPergiTarikh} label="Tarikh Berlepas" onChange={handleChange} slim={true} />
                                            <ModernTimePicker wrapperId="wrap-flightPergiMasa" name="flightPergiMasa" value={formData.flightPergiMasa} label={<>Masa Pergi <span className="text-red-500">*</span></>} onChange={handleChange} slim={true} />
                                        </div>
                                    </div>

                                    {/* Leg 2 Pergi (Multi Sektor) */}
                                    {formData.flightType === 'multi' && (
                                        <div className="pt-4">
                                            <div className="text-xs font-bold text-slate-400 uppercase mb-3">Leg 2</div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-[40%] text-left group">
                                                    <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Dari (Origin) <span className="text-red-500">*</span></label>
                                                    <div id="wrap-flightPergiLeg2Dari" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                        <div className={`flight-input text-4xl sm:text-5xl w-full transition-colors ${formData.flightPergiLeg2Dari ? 'text-slate-800' : 'text-slate-200'}`}>
                                                            {formData.flightPergiLeg2Dari || "---"}
                                                        </div>
                                                        <select name="flightPergiLeg2Dari" value={formData.flightPergiLeg2Dari} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                            <option value="" disabled>Pilih</option>
                                                            {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-sky-600 transition-colors">{getAirportName(formData.flightPergiLeg2Dari)}</div>
                                                </div>
                                                <div className="flex-1 flex justify-center items-center px-4 relative">
                                                    <div className="w-full h-[2px] bg-transparent border-t-2 border-dashed border-slate-300"></div>
                                                    <div className="absolute bg-white px-3 text-sky-400">
                                                        <PlaneTakeoffIcon className="w-6 h-6 text-sky-500 transform hover:scale-110 transition-transform cursor-pointer" />
                                                    </div>
                                                </div>
                                                <div className="w-[40%] text-right group">
                                                    <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Ke (Destination) <span className="text-red-500">*</span></label>
                                                    <div id="wrap-flightPergiLeg2Ke" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                        <div className={`flight-input text-4xl sm:text-5xl text-right w-full transition-colors ${formData.flightPergiLeg2Ke ? 'text-slate-800' : 'text-slate-200'}`}>
                                                            {formData.flightPergiLeg2Ke || "---"}
                                                        </div>
                                                        <select name="flightPergiLeg2Ke" value={formData.flightPergiLeg2Ke} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                            <option value="" disabled>Pilih</option>
                                                            {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-sky-600 transition-colors">{getAirportName(formData.flightPergiLeg2Ke)}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <ModernDatePicker name="flightPergiLeg2Tarikh" value={formData.flightPergiLeg2Tarikh} label="Tarikh Berlepas Leg 2" onChange={handleChange} slim={true} />
                                                <ModernTimePicker wrapperId="wrap-flightPergiLeg2Masa" name="flightPergiLeg2Masa" value={formData.flightPergiLeg2Masa} label={<>Masa Pergi Leg 2 <span className="text-red-500">*</span></>} onChange={handleChange} slim={true} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* KAD TIKET BALIK */}
                            <div className="bg-white rounded-[24px] shadow-sm border border-slate-200 overflow-hidden mb-8 relative">
                                <div className="ticket-cutout left"></div>
                                <div className="ticket-cutout right"></div>
                                <div className="bg-indigo-50 px-6 py-4 flex items-center justify-between border-b border-indigo-100">
                                    <div className="flex items-center gap-2 text-indigo-700 font-extrabold tracking-wide">
                                        <PlaneLandingIcon className="w-5 h-5" /> 
                                        <span>BALIK (RETURN)</span>
                                    </div>
                                    <div className="px-3 py-1 bg-indigo-600 text-white text-[10px] font-bold rounded-full shadow-sm tracking-widest">INBOUND</div>
                                </div>

                                <div className="p-6 md:p-8">
                                    {/* Leg 1 Balik */}
                                    <div className="mb-6 border-b border-slate-100 pb-6">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-3">Leg 1</div>
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="w-[40%] text-left group">
                                                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Dari (Origin) <span className="text-red-500">*</span></label>
                                                <div id="wrap-flightBalikDari" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                    <div className={`flight-input text-4xl sm:text-5xl w-full transition-colors ${formData.flightBalikDari ? 'text-slate-800' : 'text-slate-200'}`}>
                                                        {formData.flightBalikDari || "---"}
                                                    </div>
                                                    <select name="flightBalikDari" value={formData.flightBalikDari} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                        <option value="" disabled>Pilih</option>
                                                        {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-indigo-600 transition-colors">{getAirportName(formData.flightBalikDari)}</div>
                                            </div>
                                            <div className="flex-1 flex justify-center items-center px-4 relative">
                                                <div className="w-full h-[2px] bg-transparent border-t-2 border-dashed border-slate-300"></div>
                                                <div className="absolute bg-white px-3 text-indigo-400">
                                                    <PlaneLandingIcon className="w-6 h-6 text-indigo-500 transform hover:scale-110 transition-transform cursor-pointer" />
                                                </div>
                                            </div>
                                            <div className="w-[40%] text-right group">
                                                <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Ke (Destination) <span className="text-red-500">*</span></label>
                                                <div id="wrap-flightBalikKe" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                    <div className={`flight-input text-4xl sm:text-5xl text-right w-full transition-colors ${formData.flightBalikKe ? 'text-slate-800' : 'text-slate-200'}`}>
                                                        {formData.flightBalikKe || "---"}
                                                    </div>
                                                    <select name="flightBalikKe" value={formData.flightBalikKe} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                        <option value="" disabled>Pilih</option>
                                                        {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                    </select>
                                                </div>
                                                <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-indigo-600 transition-colors">{getAirportName(formData.flightBalikKe)}</div>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <ModernDatePicker name="flightBalikTarikh" value={formData.flightBalikTarikh} label="Tarikh Pulang" min={formData.flightPergiTarikh} onChange={handleChange} slim={true} />
                                            <ModernTimePicker wrapperId="wrap-flightBalikMasa" name="flightBalikMasa" value={formData.flightBalikMasa} label={<>Masa Balik <span className="text-red-500">*</span></>} onChange={handleChange} slim={true} />
                                        </div>
                                    </div>

                                    {/* Leg 2 Balik (Multi Sektor) */}
                                    {formData.flightType === 'multi' && (
                                        <div className="pt-4">
                                            <div className="text-xs font-bold text-slate-400 uppercase mb-3">Leg 2</div>
                                            <div className="flex items-center justify-between mb-4">
                                                <div className="w-[40%] text-left group">
                                                    <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Dari (Origin) <span className="text-red-500">*</span></label>
                                                    <div id="wrap-flightBalikLeg2Dari" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                        <div className={`flight-input text-4xl sm:text-5xl w-full transition-colors ${formData.flightBalikLeg2Dari ? 'text-slate-800' : 'text-slate-200'}`}>
                                                            {formData.flightBalikLeg2Dari || "---"}
                                                        </div>
                                                        <select name="flightBalikLeg2Dari" value={formData.flightBalikLeg2Dari} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                            <option value="" disabled>Pilih</option>
                                                            {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-indigo-600 transition-colors">{getAirportName(formData.flightBalikLeg2Dari)}</div>
                                                </div>
                                                <div className="flex-1 flex justify-center items-center px-4 relative">
                                                    <div className="w-full h-[2px] bg-transparent border-t-2 border-dashed border-slate-300"></div>
                                                    <div className="absolute bg-white px-3 text-indigo-400">
                                                        <PlaneLandingIcon className="w-6 h-6 text-indigo-500 transform hover:scale-110 transition-transform cursor-pointer" />
                                                    </div>
                                                </div>
                                                <div className="w-[40%] text-right group">
                                                    <label className="text-[11px] uppercase tracking-widest text-slate-400 font-bold mb-2 block">Ke (Destination) <span className="text-red-500">*</span></label>
                                                    <div id="wrap-flightBalikLeg2Ke" className="relative cursor-pointer rounded-xl transition-all duration-300 border border-transparent">
                                                        <div className={`flight-input text-4xl sm:text-5xl text-right w-full transition-colors ${formData.flightBalikLeg2Ke ? 'text-slate-800' : 'text-slate-200'}`}>
                                                            {formData.flightBalikLeg2Ke || "---"}
                                                        </div>
                                                        <select name="flightBalikLeg2Ke" value={formData.flightBalikLeg2Ke} onChange={handleChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer">
                                                            <option value="" disabled>Pilih</option>
                                                            {malaysiaAirports.map(apt => <option key={apt.code} value={apt.code}>{apt.code} - {apt.name}</option>)}
                                                        </select>
                                                    </div>
                                                    <div className="text-[13px] font-semibold text-slate-500 mt-2 truncate w-full group-hover:text-indigo-600 transition-colors">{getAirportName(formData.flightBalikLeg2Ke)}</div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                <ModernDatePicker name="flightBalikLeg2Tarikh" value={formData.flightBalikLeg2Tarikh} label="Tarikh Pulang Leg 2" onChange={handleChange} slim={true} />
                                                <ModernTimePicker wrapperId="wrap-flightBalikLeg2Masa" name="flightBalikLeg2Masa" value={formData.flightBalikLeg2Masa} label={<>Masa Balik Leg 2 <span className="text-red-500">*</span></>} onChange={handleChange} slim={true} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* MAKLUMAT TAMBAHAN */}
                            <div className="bg-white border border-slate-200 rounded-[20px] p-6 shadow-sm relative overflow-hidden">
                                <div className="absolute top-0 left-0 w-1 h-full bg-slate-300"></div>
                                <h3 className="text-[13px] font-extrabold uppercase text-slate-500 mb-5 tracking-wide flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                    Maklumat Syarikat & Keahlian
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className={formLabelClass}>Syarikat Pilihan</label>
                                        <input type="text" name="kodSyarikat" value={formData.kodSyarikat} onChange={handleChange} className={formInputClass} placeholder="Contoh: MAS / AIR ASIA" />
                                    </div>
                                    <div>
                                        <label className={formLabelClass}>Enrich / BIG ID (Ahli)</label>
                                        <input type="text" name="enrichId" value={formData.enrichId} onChange={handleChange} className={formInputClass} placeholder="No. Ahli jika ada" />
                                    </div>
                                </div>
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={() => nextSection('tiket', 'jana')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                    Selesai <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default FormTugas;
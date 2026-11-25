import React from 'react';
import ModernDatePicker from '../ui/ModernDatePicker';

const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const FormLaporan = ({
    formData,
    handleChange,
    expanded,
    toggleSection,
    nextSection,
    formInputClass,
    formLabelClass,
    isPegawaiComplete,
    isLaporanInfoComplete,
    isLaporanSoalanComplete,
    isTandatanganComplete,
    canvasRef,
    startDrawing,
    draw,
    stopDrawing,
    clearSignature,
    handleSignatureUpload,
    shakeSection
}) => {
    const currentYear = new Date().getFullYear();
    const quickSesi = [`1/${currentYear}`, `2/${currentYear}`];

    const setFieldValue = (name, value) => {
        handleChange({ target: { name, value, type: 'text' } });
    };

    return (
        <>
            {/* SEKSYEN 1: MAKLUMAT PENILAIAN AKHIR */}
            <div
                id="section-laporanInfo"
                className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${
                    !isPegawaiComplete
                        ? 'border-slate-200/50 opacity-60 grayscale-[20%]'
                        : expanded.laporanInfo
                        ? 'border-slate-100 ring-[3px] ring-blue-500/20'
                        : 'border-slate-100 hover:shadow-md'
                } ${shakeSection === 'laporanInfo' ? 'animate-shake border-red-400' : ''}`}
            >
                <div
                    onClick={() => isPegawaiComplete && toggleSection('laporanInfo')}
                    className={`px-6 py-5 flex items-center justify-between transition-colors ${
                        !isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`p-2.5 rounded-xl transition-colors ${
                                !isPegawaiComplete
                                    ? 'bg-slate-200 text-slate-500'
                                    : expanded.laporanInfo
                                    ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30'
                                    : isLaporanInfoComplete
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-blue-50 text-blue-600'
                            }`}
                        >
                            {!isPegawaiComplete ? (
                                <LockIcon />
                            ) : isLaporanInfoComplete && !expanded.laporanInfo ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                                    <line x1="16" y1="2" x2="16" y2="6"></line>
                                    <line x1="8" y1="2" x2="8" y2="6"></line>
                                    <line x1="3" y1="10" x2="21" y2="10"></line>
                                </svg>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">
                                Maklumat Penilaian Akhir{' '}
                                {isLaporanInfoComplete && !expanded.laporanInfo && (
                                    <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Lengkap
                                    </span>
                                )}
                            </h2>
                            {!expanded.laporanInfo && isPegawaiComplete && (
                                <p className="text-[13px] text-slate-500 font-semibold mt-0.5">
                                    {isLaporanInfoComplete
                                        ? `Sesi ${formData.sesiPeperiksaan} • Tarikh Laporan: ${formData.tarikhPeperiksaan.split('-').reverse().join('/')}`
                                        : 'Sesi, senarai pengawas & tarikh laporan'}
                                </p>
                            )}
                        </div>
                    </div>
                    {isPegawaiComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.laporanInfo ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    )}
                </div>

                {expanded.laporanInfo && isPegawaiComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div className="mb-5 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                            <div>
                                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">Pusat Peperiksaan</span>
                                <span className="text-[14px] font-extrabold text-slate-700">ADTEC JTM KAMPUS SANDAKAN, SABAH</span>
                            </div>
                            <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-lg bg-blue-100 text-blue-700 uppercase">Lampiran 6</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <label className="text-[13px] font-bold uppercase tracking-wider text-slate-500 ml-1">
                                        Sesi Peperiksaan <span className="text-red-500">*</span>
                                    </label>
                                    <div className="flex items-center gap-1.5">
                                        {quickSesi.map((sesi) => (
                                            <button
                                                key={sesi}
                                                type="button"
                                                onClick={() => setFieldValue('sesiPeperiksaan', sesi)}
                                                className={`px-2.5 py-0.5 rounded-lg text-[11px] font-bold transition-all ${
                                                    formData.sesiPeperiksaan === sesi
                                                        ? 'bg-blue-600 text-white shadow-sm'
                                                        : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                                                }`}
                                            >
                                                {sesi}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <input
                                    type="text"
                                    name="sesiPeperiksaan"
                                    value={formData.sesiPeperiksaan}
                                    onChange={handleChange}
                                    placeholder="Contoh: 1/2026 atau 2/2026"
                                    className={formInputClass}
                                />
                            </div>

                            <div className="relative z-20">
                                <ModernDatePicker
                                    wrapperId="wrap-tarikhPeperiksaan"
                                    label={<>Tarikh Laporan / Peperiksaan <span className="text-red-500">*</span></>}
                                    name="tarikhPeperiksaan"
                                    value={formData.tarikhPeperiksaan}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="mt-6">
                            <label className={formLabelClass}>
                                Pengawas Peperiksaan Tambahan <span className="text-slate-400 font-semibold normal-case">(Pilihan — selain Ketua Pengawas)</span>
                            </label>
                            <textarea
                                name="namaPengawasLain"
                                rows="2"
                                value={formData.namaPengawasLain}
                                onChange={handleChange}
                                placeholder="Taip nama pengawas lain (pisahkan dengan koma atau baris baharu jika lebih seorang)"
                                className={formInputClass}
                            />
                            <p className="text-[11px] font-semibold text-slate-400 mt-1.5 ml-1">
                                *Nama anda ({formData.nama || 'Ketua Pengawas'}) akan dimasukkan secara automatik pada baris pertama ruangan Pengawas Peperiksaan & Ketua Pengawas.
                            </p>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => isLaporanInfoComplete && nextSection('laporanInfo', 'laporanSoalan')}
                                disabled={!isLaporanInfoComplete}
                                className={`font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ${
                                    isLaporanInfoComplete
                                        ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                Seterusnya
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* SEKSYEN 2: LAPORAN PERLAKSANAAN & CADANGAN (LAMPIRAN 6) */}
            <div
                id="section-laporanSoalan"
                className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${
                    !isLaporanInfoComplete
                        ? 'border-slate-200/50 opacity-60 grayscale-[20%]'
                        : expanded.laporanSoalan
                        ? 'border-slate-100 ring-[3px] ring-indigo-500/20'
                        : 'border-slate-100 hover:shadow-md'
                } ${shakeSection === 'laporanSoalan' ? 'animate-shake border-red-400' : ''}`}
            >
                <div
                    onClick={() => isLaporanInfoComplete && toggleSection('laporanSoalan')}
                    className={`px-6 py-5 flex items-center justify-between transition-colors ${
                        !isLaporanInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`p-2.5 rounded-xl transition-colors ${
                                !isLaporanInfoComplete
                                    ? 'bg-slate-200 text-slate-500'
                                    : expanded.laporanSoalan
                                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                                    : isLaporanSoalanComplete
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-indigo-50 text-indigo-600'
                            }`}
                        >
                            {!isLaporanInfoComplete ? (
                                <LockIcon />
                            ) : isLaporanSoalanComplete && !expanded.laporanSoalan ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9 11l3 3L22 4" />
                                    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">
                                Semakan Kertas Soalan, Kelancaran & Cadangan{' '}
                                {isLaporanSoalanComplete && !expanded.laporanSoalan && (
                                    <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Lengkap
                                    </span>
                                )}
                            </h2>
                            {!expanded.laporanSoalan && isLaporanInfoComplete && (
                                <p className="text-[13px] text-slate-500 font-semibold mt-0.5">
                                    1. Kertas Soalan & Jawapan • 2. Perjalanan Penilaian • 3. Cadangan
                                </p>
                            )}
                        </div>
                    </div>
                    {isLaporanInfoComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.laporanSoalan ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    )}
                </div>

                {expanded.laporanSoalan && isLaporanInfoComplete && (
                    <div className="p-6 md:p-8 pt-4 border-t border-slate-100 animate-slide-up space-y-6">
                        {/* BAHAGIAN 1: BILANGAN KERTAS SOALAN DAN JAWAPAN */}
                        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-5">
                            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-indigo-700">
                                1. Bilangan Kertas Soalan dan Jawapan
                            </h3>

                            {/* Item 1 (i) */}
                            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className="text-[15px] font-bold text-slate-800">
                                        i. Kuantiti kertas soalan mencukupi <span className="text-red-500">*</span>
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {['YA', 'TIDAK'].map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFieldValue('q1Status', opt)}
                                                className={`px-5 py-2 rounded-xl text-[13px] font-extrabold border-2 transition-all ${
                                                    formData.q1Status === opt
                                                        ? opt === 'YA'
                                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                                            : 'bg-rose-600 border-rose-600 text-white shadow-sm'
                                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                            >
                                                {opt === 'YA' ? 'Ya' : 'Tidak'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {formData.q1Status === 'TIDAK' && (
                                    <div className="mt-3 pt-3 border-t border-slate-100">
                                        <label className="block text-[12px] font-bold text-rose-600 mb-1.5">
                                            Jika tidak, sila nyatakan:
                                        </label>
                                        <textarea
                                            name="q1Catatan"
                                            rows="2"
                                            value={formData.q1Catatan}
                                            onChange={handleChange}
                                            placeholder="Nyatakan kekurangan kertas soalan / jawapan..."
                                            className={formInputClass}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Item 1 (ii) - Jika YA, sila nyatakan */}
                            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className="text-[15px] font-bold text-slate-800">
                                        ii. Kesalahan cetakan kertas soalan <span className="text-red-500">*</span>
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {['YA', 'TIDAK'].map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFieldValue('q2Status', opt)}
                                                className={`px-5 py-2 rounded-xl text-[13px] font-extrabold border-2 transition-all ${
                                                    formData.q2Status === opt
                                                        ? opt === 'YA'
                                                            ? 'bg-amber-500 border-amber-500 text-white shadow-sm'
                                                            : 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                            >
                                                {opt === 'YA' ? 'Ya' : 'Tidak'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {formData.q2Status === 'YA' && (
                                    <div className="mt-3 pt-3 border-t border-slate-100">
                                        <label className="block text-[12px] font-bold text-amber-600 mb-1.5">
                                            Jika ya, sila nyatakan:
                                        </label>
                                        <textarea
                                            name="q2Catatan"
                                            rows="2"
                                            value={formData.q2Catatan}
                                            onChange={handleChange}
                                            placeholder="Nyatakan butiran kesalahan cetakan kertas soalan..."
                                            className={formInputClass}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BAHAGIAN 2: PERJALANAN PENILAIAN AKHIR */}
                        <div className="bg-slate-50/80 border border-slate-200 rounded-2xl p-5 space-y-4">
                            <h3 className="text-[13px] font-extrabold uppercase tracking-wider text-indigo-700">
                                2. Perjalanan Penilaian Akhir
                            </h3>

                            {/* Item 2 (i) */}
                            <div className="bg-white rounded-xl p-4 border border-slate-200/80 shadow-sm">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                    <span className="text-[15px] font-bold text-slate-800">
                                        i. Kelancaran <span className="text-red-500">*</span>
                                    </span>
                                    <div className="flex items-center gap-2 shrink-0">
                                        {['YA', 'TIDAK'].map((opt) => (
                                            <button
                                                key={opt}
                                                type="button"
                                                onClick={() => setFieldValue('q3Status', opt)}
                                                className={`px-5 py-2 rounded-xl text-[13px] font-extrabold border-2 transition-all ${
                                                    formData.q3Status === opt
                                                        ? opt === 'YA'
                                                            ? 'bg-emerald-600 border-emerald-600 text-white shadow-sm'
                                                            : 'bg-rose-600 border-rose-600 text-white shadow-sm'
                                                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:border-slate-300'
                                                }`}
                                            >
                                                {opt === 'YA' ? 'Ya' : 'Tidak'}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                {formData.q3Status === 'TIDAK' && (
                                    <div className="mt-3 pt-3 border-t border-slate-100">
                                        <label className="block text-[12px] font-bold text-rose-600 mb-1.5">
                                            Jika tidak, sila nyatakan:
                                        </label>
                                        <textarea
                                            name="q3Catatan"
                                            rows="2"
                                            value={formData.q3Catatan}
                                            onChange={handleChange}
                                            placeholder="Nyatakan gangguan / isu sepanjang penilaian akhir..."
                                            className={formInputClass}
                                        />
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* BAHAGIAN 3: CADANGAN */}
                        <div>
                            <label className={formLabelClass}>
                                3. Cadangan <span className="text-slate-400 font-semibold normal-case">(Jika ada)</span>
                            </label>
                            <textarea
                                name="cadanganPeperiksaan"
                                rows="3"
                                value={formData.cadanganPeperiksaan}
                                onChange={handleChange}
                                placeholder="Masukkan cadangan penambahbaikan pengurusan penilaian akhir (jika ada)..."
                                className={formInputClass}
                            />
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => isLaporanSoalanComplete && nextSection('laporanSoalan', 'tandatangan')}
                                disabled={!isLaporanSoalanComplete}
                                className={`font-bold py-3 px-6 rounded-xl shadow-md transition-all flex items-center gap-2 ${
                                    isLaporanSoalanComplete
                                        ? 'bg-slate-900 hover:bg-slate-800 text-white active:scale-95'
                                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                }`}
                            >
                                Seterusnya
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="5" y1="12" x2="19" y2="12"></line>
                                    <polyline points="12 5 19 12 12 19"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* SEKSYEN 3: TANDATANGAN KETUA PENGAWAS (PILIHAN) */}
            <div
                id="section-tandatangan"
                className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${
                    !isLaporanSoalanComplete
                        ? 'border-slate-200/50 opacity-60 grayscale-[20%]'
                        : expanded.tandatangan
                        ? 'border-slate-100 ring-[3px] ring-purple-500/20'
                        : 'border-slate-100 hover:shadow-md'
                } ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''}`}
            >
                <div
                    onClick={() => isLaporanSoalanComplete && toggleSection('tandatangan')}
                    className={`px-6 py-5 flex items-center justify-between transition-colors ${
                        !isLaporanSoalanComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'
                    }`}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`p-2.5 rounded-xl transition-colors ${
                                !isLaporanSoalanComplete
                                    ? 'bg-slate-200 text-slate-500'
                                    : expanded.tandatangan
                                    ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30'
                                    : isTandatanganComplete
                                    ? 'bg-emerald-50 text-emerald-600'
                                    : 'bg-purple-50 text-purple-600'
                            }`}
                        >
                            {!isLaporanSoalanComplete ? (
                                <LockIcon />
                            ) : isTandatanganComplete && !expanded.tandatangan ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                    <path d="m15 5 4 4" />
                                </svg>
                            )}
                        </div>
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-800">
                                Tandatangan <span className="hidden sm:inline">Ketua Pengawas</span>{' '}
                                <span className="text-[11px] font-bold text-slate-400 ml-1 bg-slate-100 px-2 py-0.5 rounded-full uppercase">
                                    (Pilihan)
                                </span>
                                {isTandatanganComplete && !expanded.tandatangan && (
                                    <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                                        Diisi
                                    </span>
                                )}
                            </h2>
                            {!expanded.tandatangan && isLaporanSoalanComplete && (
                                <p className="text-[13px] text-slate-500 font-semibold mt-0.5">
                                    {isTandatanganComplete ? 'Tandatangan digital telah disimpan' : 'Boleh dikosongkan untuk tandatangan manual (optional)'}
                                </p>
                            )}
                        </div>
                    </div>
                    {isLaporanSoalanComplete && (
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.tandatangan ? 'rotate-180 bg-purple-50 text-purple-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                        </div>
                    )}
                </div>

                {expanded.tandatangan && isLaporanSoalanComplete && (
                    <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                        <div id="wrap-tandatangan" className="bg-slate-50 border border-slate-200 rounded-[1.5rem] p-4 sm:p-6 transition-all duration-300">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
                                <label className={formLabelClass}>Lukis tandatangan Ketua Pengawas (Pilihan)</label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleSignatureUpload}
                                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                    />
                                    <button
                                        type="button"
                                        className="w-full sm:w-auto px-4 py-2 bg-white border border-slate-300 hover:border-purple-400 hover:text-purple-600 text-[12px] font-bold text-slate-600 rounded-xl transition-all flex items-center justify-center gap-2 shadow-sm"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                            <polyline points="17 8 12 3 7 8" />
                                            <line x1="12" y1="3" x2="12" y2="15" />
                                        </svg>
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
                                            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                                <polyline points="20 6 9 17 4 12"></polyline>
                                            </svg>
                                            Disimpan
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-between items-center mt-3">
                                <p className="text-[11px] font-semibold text-slate-400 max-w-[65%] leading-tight">
                                    *Jika dibiarkan kosong, ruangan tandatangan pada PDF akan kekal kosong untuk ditandatangani secara manual selepas dicetak.
                                </p>
                                <button
                                    type="button"
                                    onClick={clearSignature}
                                    className="px-3 py-1.5 bg-red-50 hover:bg-red-100 text-red-600 text-[12px] font-bold rounded-lg transition-colors flex items-center gap-1"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" />
                                        <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                                        <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                                    </svg>
                                    Padam
                                </button>
                            </div>
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button
                                type="button"
                                onClick={() => nextSection('tandatangan', 'jana')}
                                className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
                            >
                                Selesai
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <polyline points="20 6 9 17 4 12"></polyline>
                                </svg>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default FormLaporan;
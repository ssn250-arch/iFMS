import React, { useState, useEffect } from 'react';

const SplashScreen = ({ isLoading, logo }) => {
    const [progress, setProgress] = useState(0);
    const [shouldRender, setShouldRender] = useState(true);

    // Simulasi peratusan pintar yang bergerak lancar ikut status loading sebenar
    useEffect(() => {
        if (!isLoading) {
            setProgress(100);
            const hideTimer = setTimeout(() => setShouldRender(false), 800);
            return () => clearTimeout(hideTimer);
        }

        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 92) return prev; // Tunggu sehingga aset sebenar siap
                const step = prev < 50 ? 9 : prev < 80 ? 4 : 1;
                return Math.min(prev + step, 92);
            });
        }, 120);

        return () => clearInterval(interval);
    }, [isLoading]);

    if (!shouldRender) return null;

    // Teks status dinamik ikut peratusan
    const getStatusText = () => {
        if (progress < 35) return 'Menghubungkan sistem...';
        if (progress < 75) return 'Memuatkan modul borang...';
        if (progress < 100) return 'Menyediakan antaramuka...';
        return 'Sistem sedia digunakan';
    };

    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-slate-50/95 backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isLoading
                    ? 'opacity-100 scale-100 blur-0'
                    : 'opacity-0 scale-110 blur-md pointer-events-none'
            }`}
        >
            {/* Latar Belakang Micro Dot-Grid (Gaya Spatial UI 2026) */}
            <div
                className="absolute inset-0 opacity-[0.35] pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(#94a3b8 1px, transparent 1px)',
                    backgroundSize: '28px 28px',
                }}
            />

            {/* Aurora Mesh Gradients Bergerak */}
            <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-gradient-to-br from-blue-500/25 via-indigo-400/20 to-transparent blur-3xl animate-aurora pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-[460px] h-[460px] rounded-full bg-gradient-to-tr from-teal-400/25 via-emerald-400/20 to-transparent blur-3xl animate-aurora-delayed pointer-events-none" />

            {/* Kad Tengah Glassmorphism */}
            <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-md">
                
                {/* Badge Status Atas */}
                <div className="mb-8 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/70 backdrop-blur-md border border-slate-200/80 shadow-sm">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <span className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
                        Portal Digital Rasmi
                    </span>
                </div>

                {/* Bekas Logo dengan Orbital Conic Glow Ring */}
                <div className="relative mb-8 group">
                    {/* Lingkaran Cahaya Berputar */}
                    <div
                        className="absolute -inset-[3px] rounded-[28px] opacity-80 blur-[2px] animate-orbit"
                        style={{
                            background: 'conic-gradient(from 0deg, transparent 0%, #2563eb 25%, #14b8a6 50%, #6366f1 75%, transparent 100%)',
                        }}
                    />
                    
                    {/* Kotak Kaca Logo */}
                    <div className="relative w-24 h-24 rounded-[26px] bg-white/95 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-blue-900/10 border border-white overflow-hidden">
                        {/* Efek Kilauan Shimmer */}
                        <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent animate-shimmer pointer-events-none" />
                        
                        {logo ? (
                            <img src={logo} alt="Logo iFMS" className="h-14 w-auto object-contain relative z-10 drop-shadow-sm" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-blue-600 relative z-10">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                        )}
                    </div>
                </div>

                {/* Tipografi Moden */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
                        iFMS
                        <span className="ml-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-teal-500">
                            ADTEC
                        </span>
                    </h1>
                    <p className="text-xs sm:text-sm font-semibold text-slate-500 tracking-wide mt-1.5">
                        JTM Kampus Sandakan
                    </p>
                </div>

                {/* Progress Bar Pintar + Kaunter Peratus */}
                <div className="w-64 sm:w-72">
                    <div className="flex items-center justify-between text-[11px] font-bold mb-2 px-0.5">
                        <span className="text-slate-500 transition-all duration-300">
                            {getStatusText()}
                        </span>
                        <span className="font-mono text-blue-700 tabular-nums">
                            {progress}%
                        </span>
                    </div>

                    <div className="h-1.5 w-full bg-slate-200/80 rounded-full overflow-hidden p-[1px] shadow-inner">
                        <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-teal-400 transition-all duration-300 ease-out relative overflow-hidden"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer Minimalis di Bawah */}
            <div className="absolute bottom-8 text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400">
                i-Form Management System • v1.0
            </div>
        </div>
    );
};

export default SplashScreen;
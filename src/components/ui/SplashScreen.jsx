import React from 'react';

const SplashScreen = ({ isLoading, logo }) => {
    return (
        <div
            className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-slate-50 transition-all duration-700 ease-in-out ${
                isLoading ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
        >
            {/* Kesan cahaya lembut di belakang */}
            <div className="absolute w-72 h-72 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute w-72 h-72 bg-emerald-400/15 rounded-full blur-3xl animate-pulse delay-300"></div>

            {/* Kotak Logo dengan efek ping halus */}
            <div className="relative z-10 flex flex-col items-center">
                <div className="relative mb-6">
                    <div className="absolute inset-0 rounded-3xl bg-blue-500/20 animate-ping"></div>
                    <div className="relative p-5 bg-white rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100">
                        {logo ? (
                            <img src={logo} alt="Logo iFMS" className="h-16 w-auto object-contain" />
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="text-blue-600">
                                <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                        )}
                    </div>
                </div>

                {/* Tajuk Sistem */}
                <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">
                    iFMS <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">ADTEC Sandakan</span>
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1.5 mb-6">
                    Menyediakan Sistem...
                </p>

                {/* Progress Bar Moden */}
                <div className="w-52 h-1.5 bg-slate-200/80 rounded-full overflow-hidden">
                    <div className="w-1/2 h-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-full animate-loading-bar"></div>
                </div>
            </div>
        </div>
    );
};

export default SplashScreen;
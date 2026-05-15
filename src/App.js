import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import './index.css';

const formInputClass = "block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold text-slate-800 shadow-sm transition-all duration-300 placeholder:text-slate-400 placeholder:font-medium focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 hover:border-slate-300";
        const formLabelClass = "block text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1";
        
        const unitOptions = [
            "Pengurusan Tertinggi", "BKKL", "BPPA", "BPPL", "CESS", "BPSM", 
            "Unit Kewangan", "Unit Perkhidmatan", "Unit Pentadbiran", 
            "TE", "TKR", "TELCOM", "TPPU", "TAUTO", "TKIM", "TFSLOG"
        ];

        const peperiksaanRoles = [
            "Penggubal Soalan/Skema Jawapan",
            "AJK Pemilihan Soalan/Skema Jawapan",
            "AJK Pemurnian/Pengesahan Soalan/Skema Jawapan",
            "AJK Persiapan Soalan",
            "Ketua Pengawas/Pengawas Peperiksaan",
            "Pemeriksa Kertas Jawapan",
            "Pembawa soalan/Skema Jawapan",
            "Penyimpan Soalan/Skema Jawapan",
            "Pelupus Kertas Soalan"
        ];

        // DATABASE PEGAWAI ADTEC SANDAKAN
        const pegawaiDatabase = [
            { nama: "Ts. Azmi Rahman bin Mat Zuini", bahagian: "Pengurusan Tertinggi", jawatan: "PLV DV13", noTel: "" },
            { nama: "Ts. Suhaidi bin Mustar", bahagian: "Pengurusan Tertinggi", jawatan: "PLV DV12", noTel: "" },
            { nama: "Ts. Joey Eriksen Teo", bahagian: "Pengurusan Tertinggi", jawatan: "PLV DV10", noTel: "" },
            { nama: "Jaikol bin Udar", bahagian: "BKKL", jawatan: "PLV DV9", noTel: "" },
            { nama: "Muhaidi bin Mohamad", bahagian: "BKKL", jawatan: "PPLV DV8", noTel: "" },
            { nama: "Roshayati binti Mohammad", bahagian: "BKKL", jawatan: "PPLV DV7", noTel: "" },
            { nama: "Norashikin Binti Ariffin", bahagian: "BPPA", jawatan: "PLV DV10", noTel: "" },
            { nama: "Adiniah Binti Muhamad Radzai", bahagian: "BPPA", jawatan: "PPLV DV7", noTel: "" },
            { nama: "Hazrudy bin Ahmad Nasaruddin", bahagian: "BPPA", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Norhadzla binti Abd Halim", bahagian: "BPPA", jawatan: "PT (Operasi) N2", noTel: "" },
            { nama: "Tc. Mohd Radznan bin Malek", bahagian: "BPPA", jawatan: "PPLV DV2", noTel: "" },
            { nama: "Andrew Bin Arih", bahagian: "CESS", jawatan: "PLV DV10", noTel: "" },
            { nama: "Juraini binti Sahid", bahagian: "CESS", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Billy Anak Rejap", bahagian: "CESS", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Richard Joanes", bahagian: "BPSM", jawatan: "PPP DG9", noTel: "" },
            { nama: "Shaharul bin Abu Talib", bahagian: "BPSM", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Nasri bin Kipple", bahagian: "BPSM", jawatan: "PPTM FA6", noTel: "" },
            { nama: "Anamary binti Madyusah", bahagian: "BPSM", jawatan: "PP S2", noTel: "" },
            { nama: "Noraini binti Sukri", bahagian: "Unit Perkhidmatan", jawatan: "PT (Operasi) N2", noTel: "" },
            { nama: "Rohana binti Ahmad", bahagian: "Unit Perkhidmatan", jawatan: "PT (Operasi) N2", noTel: "" },
            { nama: "Roha binti Awang Latif", bahagian: "Unit Perkhidmatan", jawatan: "PT (Operasi) N2", noTel: "" },
            { nama: "Zuliza binti Roslan", bahagian: "Unit Perkhidmatan", jawatan: "SUP N2", noTel: "" },
            { nama: "Nadzihah binti Ahmad", bahagian: "Unit Pentadbiran", jawatan: "PPP DG9", noTel: "" },
            { nama: "Hafizulhaq bin Hatib", bahagian: "Unit Pentadbiran", jawatan: "PPPP DG5", noTel: "" },
            { nama: "Rusyieni @ Wendy Binti Payah", bahagian: "Unit Pentadbiran", jawatan: "PT (Operasi) N2", noTel: "" },
            { nama: "Japri Bin Patomdang", bahagian: "Unit Pentadbiran", jawatan: "KPT N2", noTel: "" },
            { nama: "Muhammad Alinafiah bin Sabril", bahagian: "Unit Pentadbiran", jawatan: "PO N1", noTel: "" },
            { nama: "Nazriati binti Nasib", bahagian: "Unit Pentadbiran", jawatan: "PO N1", noTel: "" },
            { nama: "Ismail Bin Muin", bahagian: "Unit Pentadbiran", jawatan: "PO N1", noTel: "" },
            { nama: "Satria binti Murtala", bahagian: "Unit Kewangan", jawatan: "PA W5", noTel: "" },
            { nama: "Aslinah binti Aldan", bahagian: "Unit Kewangan", jawatan: "KPT (KEW) W2", noTel: "" },
            { nama: "Sakinah binti Pitungut", bahagian: "Unit Kewangan", jawatan: "PO N1", noTel: "" },
            { nama: "Anzari bin Mohd Daud", bahagian: "TE", jawatan: "PLV DV9", noTel: "" },
            { nama: "Mohammad Nasir bin Awang", bahagian: "TE", jawatan: "PPLV DV8", noTel: "" },
            { nama: "Abdul Hamid bin Sakmud @ Abdullah", bahagian: "TE", jawatan: "PPLV DV7", noTel: "" },
            { nama: "Muhalis bin Nonchi", bahagian: "TE", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Omrei bin Okong", bahagian: "TE", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Mohd Hairi bin Mohd Shah", bahagian: "TE", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Ts. Muhammad Haziq bin Hamzah", bahagian: "TELCOM", jawatan: "PLV DV9", noTel: "" },
            { nama: "Isabella Francis Xavier", bahagian: "TELCOM", jawatan: "PPLV DV7", noTel: "" },
            { nama: "Mohd Hafizul bin Ibrahim Apani", bahagian: "TELCOM", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Mohamad Sali bin Saleh", bahagian: "TELCOM", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Ts. Nurzharfan bin Rafei Bui", bahagian: "TKR", jawatan: "PLV DV10", noTel: "" },
            { nama: "Nazry bin Yusof", bahagian: "TKR", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Ts. Syed Mohd Yusri bin Syed Yusoff", bahagian: "TKR", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Ts. Muhammad Hifzan bin Salimun", bahagian: "TKR", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Mohd Hakimin Mohd Hussin", bahagian: "TPPU", jawatan: "PLV DV9", noTel: "" },
            { nama: "Tc. Silvester bin Lawai", bahagian: "TPPU", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Ahmad Fadhlullah bin Rusaidi", bahagian: "TPPU", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Tc. Ng Vui Chien", bahagian: "TPPU", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Ibrahim bin Lamusa", bahagian: "TPPU", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Haslinda binti Bohari", bahagian: "TAUTO", jawatan: "PLV DV10", noTel: "" },
            { nama: "Darman bin Daming", bahagian: "TAUTO", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Mohd Nur Fitri bin Jamil", bahagian: "TAUTO", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Tc. Mohd Sabri bin Mohd Sarif", bahagian: "TAUTO", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Azryzan bin Besri", bahagian: "TAUTO", jawatan: "PPLV DV2", noTel: "" },
            { nama: "Norashsikin binti Mohd Arsad", bahagian: "TKIM", jawatan: "PLV DV10", noTel: "" },
            { nama: "Jamludin bin Assat", bahagian: "TKIM", jawatan: "PPLV DV7", noTel: "" },
            { nama: "Tc. Johannes Belili", bahagian: "TKIM", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Asriyani binti Seraila", bahagian: "TFSLOG", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Mohd Azrul Anuar bin Othman", bahagian: "TFSLOG", jawatan: "PPLV DV6", noTel: "" },
            { nama: "Azwie bin Jafri", bahagian: "TFSLOG", jawatan: "PPLV DV5", noTel: "" },
            { nama: "Lynn Noell Ending", bahagian: "TFSLOG", jawatan: "PPLV DV5", noTel: "" }
        ];

        const UniversalSelect = ({ wrapperId, name, value, label, options, onChange, placeholder, classNameAddon = "", disabled = false }) => (
            <div className={`relative group ${label ? '' : 'mt-0'}`}>
                {label && <label className={formLabelClass}>{label}</label>}
                <div className="relative">
                    <select 
                        id={wrapperId} name={name} value={value} onChange={onChange} disabled={disabled}
                        className={`block w-full rounded-2xl border border-slate-200 bg-transparent px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 ${disabled ? 'cursor-not-allowed text-slate-500 opacity-80' : 'cursor-pointer hover:border-slate-300'} ${value ? 'text-slate-800' : 'text-slate-400 font-medium'} ${classNameAddon}`}
                    >
                        <option value="" disabled>{placeholder}</option>
                        {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                    </select>
                    <div className={`absolute inset-0 rounded-2xl pointer-events-none z-0 ${disabled ? 'bg-slate-50/70' : 'bg-white'}`}></div>
                    <div className={`absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none z-0 ${disabled ? 'text-slate-300' : 'text-slate-400 group-focus-within:text-blue-500 transition-colors'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                </div>
            </div>
        );

        const ModernDatePicker = ({ wrapperId, name, value, label, onChange, min, slim = false }) => {
            const displayDate = value ? value.split('-').reverse().join('/') : "Pilih Tarikh";
            return (
                <div className="relative group w-full">
                    {label && <label className={slim ? "block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1" : formLabelClass}>{label}</label>}
                    <div className="relative">
                        <div id={wrapperId} className={`flex items-center w-full ${slim ? 'rounded-xl bg-slate-50/50 hover:bg-slate-100 border-transparent py-2.5 px-3' : 'rounded-2xl bg-white border border-slate-200 pl-[42px] pr-4 py-3.5 shadow-sm'} text-[14px] md:text-[15px] font-semibold ${value ? 'text-slate-800' : 'text-slate-400 font-medium'} transition-all duration-300 group-hover:border-slate-300 group-focus-within:border-blue-500 group-focus-within:ring-[4px] group-focus-within:ring-blue-500/10`}>
                            <div className={`${slim ? 'mr-2 text-slate-400' : 'absolute left-4 text-slate-400'} group-focus-within:text-blue-500 transition-colors`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={slim ? "16" : "18"} height={slim ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            </div>
                            <span>{displayDate}</span>
                        </div>
                        <input type="date" name={name} value={value} min={min} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    </div>
                </div>
            );
        };

        const ModernTimePicker = ({ wrapperId, name, value, label, onChange, slim = false }) => {
            const displayTime = value ? value : "Pilih Masa";
            return (
                <div className="relative group w-full">
                    {label && <label className={slim ? "block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1" : formLabelClass}>{label}</label>}
                    <div className="relative">
                        <div id={wrapperId} className={`flex items-center w-full ${slim ? 'rounded-xl bg-slate-50/50 hover:bg-slate-100 border-transparent py-2.5 px-3' : 'rounded-2xl bg-white border border-slate-200 pl-[42px] pr-4 py-3.5 shadow-sm'} text-[14px] md:text-[15px] font-semibold ${value ? 'text-slate-800' : 'text-slate-400 font-medium'} transition-all duration-300 group-hover:border-slate-300 group-focus-within:border-blue-500 group-focus-within:ring-[4px] group-focus-within:ring-blue-500/10`}>
                            <div className={`${slim ? 'mr-2 text-slate-400' : 'absolute left-4 text-slate-400'} group-focus-within:text-blue-500 transition-colors`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width={slim ? "16" : "18"} height={slim ? "16" : "18"} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                            </div>
                            <span>{displayTime}</span>
                        </div>
                        <input type="time" name={name} value={value} onChange={onChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" />
                    </div>
                </div>
            );
        };

        const malaysiaAirports = [
            { code: 'KUL', name: 'Kuala Lumpur (KLIA)' },
            { code: 'SZB', name: 'Subang (Skypark)' },
            { code: 'SDK', name: 'Sandakan' },
            { code: 'BKI', name: 'Kota Kinabalu' },
            { code: 'TWU', name: 'Tawau' },
            { code: 'LDU', name: 'Lahad Datu' },
            { code: 'KCH', name: 'Kuching' },
            { code: 'MYY', name: 'Miri' },
            { code: 'BTU', name: 'Bintulu' },
            { code: 'SBW', name: 'Sibu' },
            { code: 'PEN', name: 'Pulau Pinang' },
            { code: 'JHB', name: 'Johor Bahru (Senai)' },
            { code: 'LGK', name: 'Langkawi' },
            { code: 'KBR', name: 'Kota Bharu' },
            { code: 'TGG', name: 'Kuala Terengganu' },
            { code: 'KUA', name: 'Kuantan' },
            { code: 'AOR', name: 'Alor Setar' },
            { code: 'LBU', name: 'Labuan' },
            { code: 'IPH', name: 'Ipoh' },
            { code: 'SIN', name: 'Singapura (Changi)' },
            { code: 'BPN', name: 'Balikpapan' },
            { code: 'JED', name: 'Jeddah' }
        ];

        function App() {
            const [activeForm, setActiveForm] = useState(null); // 'tugas', 'cuti', or 'akujanji'
            const today = new Date().toISOString().split('T')[0];
            const [formData, setFormData] = useState({
                // Pegawai
                nama: '', jawatan: '', bahagian: '', noKp: '', noTel: '', noKenderaan: '',
                // Tugas
                tujuan: '', tempat: '', tarikhPergi: today, tarikhBalik: today, km: '', caraPerjalanan: 'Kereta Sendiri', 
                sebab1: false, sebab2: false, sebab3: false, tuntutanBatu: false, tuntutanGantian: false,
                // Tugas Pengganti
                subjek: '', semester: '', tarikhGantiDari: today, tarikhGantiHingga: today, catatanTugas: '', namaPengganti: '', bahagianPengganti: '', noTelPengganti: '', jenisAmbilAlih: 'Ambil alih subjek / tugas sepenuhnya',
                // Penerbangan
                flightPergiTarikh: today, flightPergiMasa: '', flightPergiDari: '', flightPergiKe: '',
                flightBalikTarikh: today, flightBalikMasa: '', flightBalikDari: '', flightBalikKe: '', kodSyarikat: '', enrichId: '',
                // Cuti
                jenisCuti: 'Cuti Rehat', cutiDari: today, cutiHingga: today, catatanCuti: '', ketuaSokongan: '', pegawaiPelulus: '',
                // Akujanji Integriti (Baru)
                perananPeperiksaan: [], tandatangan: null,
                // Laporan Pelaksanaan Peperiksaan (Baru)
                sesiPeperiksaan: '', tarikhPeperiksaan: today, namaPengawasLain: '',
                q1Status: 'YA', q1Catatan: '', q2Status: 'TIDAK', q2Catatan: '', q3Status: 'YA', q3Catatan: '', cadanganPeperiksaan: ''
            });

            const [preloadedLogo, setPreloadedLogo] = useState(null);
            const [isLogoLoading, setIsLogoLoading] = useState(true);
            const [isKnownStaff, setIsKnownStaff] = useState(false);
            const [isEditingAutoFields, setIsEditingAutoFields] = useState(false);
            const [isGantiDateLocked, setIsGantiDateLocked] = useState(true);

            // Signature Pad Refs
            const canvasRef = useRef(null);
            const isDrawing = useRef(false);
            const lastPos = useRef({ x: 0, y: 0 });

            useEffect(() => {
                setIsKnownStaff(pegawaiDatabase.some(p => p.nama === formData.nama));
            }, [formData.nama]);

            useEffect(() => {
                const fetchAndConvertLogo = async () => {
                    setIsLogoLoading(true);
                    const googleDriveId = '13wsfzp971_SOrR41-BvWnmYGXc7m1O7n';
                    
                    const urlsToTry = [
                        `https://images.weserv.nl/?url=drive.google.com/uc?id=${googleDriveId}&output=jpg`,
                        `https://api.allorigins.win/raw?url=${encodeURIComponent('https://drive.google.com/uc?export=view&id=' + googleDriveId)}`,
                        `https://upload.wikimedia.org/wikipedia/commons/thumb/2/26/Coat_of_arms_of_Malaysia.svg/200px-Coat_of_arms_of_Malaysia.svg.png`
                    ];

                    let logoLoaded = false;
                    for (let url of urlsToTry) {
                        try {
                            const img = new Image();
                            img.crossOrigin = "Anonymous";
                            
                            await new Promise((resolve, reject) => {
                                img.onload = () => resolve();
                                img.onerror = () => reject(new Error("Gagal muat turun dari: " + url));
                                img.src = url + (url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
                            });
                            
                            const canvas = document.createElement('canvas');
                            canvas.width = img.width;
                            canvas.height = img.height;
                            const ctx = canvas.getContext('2d');
                            ctx.fillStyle = '#FFFFFF';
                            ctx.fillRect(0, 0, canvas.width, canvas.height);
                            ctx.drawImage(img, 0, 0);
                            
                            setPreloadedLogo(canvas.toDataURL('image/jpeg', 1.0));
                            logoLoaded = true;
                            break;
                        } catch (e) {
                            console.warn(e.message);
                        }
                    }
                    
                    setIsLogoLoading(false);
                };
                
                fetchAndConvertLogo();

                const savedData = localStorage.getItem("pegawaiData");
                const savedFlight = localStorage.getItem("flightInfo");
                let updates = {};
                if (savedData) updates = { ...updates, ...JSON.parse(savedData) };
                if (savedFlight) updates = { ...updates, ...JSON.parse(savedFlight) };
                
                if (Object.keys(updates).length > 0) {
                    setFormData(prev => ({ ...prev, ...updates }));
                }
            }, []);

            useEffect(() => {
                if (formData.nama || formData.jawatan || formData.bahagian || formData.noKp || formData.noTel) {
                    const pegawaiInfo = {
                        nama: formData.nama, jawatan: formData.jawatan, bahagian: formData.bahagian, 
                        noKp: formData.noKp, noTel: formData.noTel
                    };
                    localStorage.setItem("pegawaiData", JSON.stringify(pegawaiInfo));
                }
            }, [formData.nama, formData.jawatan, formData.bahagian, formData.noKp, formData.noTel]);

            useEffect(() => {
                if (!isEditingAutoFields) {
                    const selected = pegawaiDatabase.find(p => p.nama === formData.nama);
                    if (selected) {
                        setFormData(prev => {
                            const newPhone = selected.noTel || prev.noTel;
                            if (prev.jawatan !== selected.jawatan || prev.bahagian !== selected.bahagian || prev.noTel !== newPhone) {
                                return { ...prev, jawatan: selected.jawatan, bahagian: selected.bahagian, noTel: newPhone };
                            }
                            return prev;
                        });
                    }
                }
            }, [formData.nama, isEditingAutoFields]);

            useEffect(() => {
                if (formData.kodSyarikat || formData.enrichId) {
                    localStorage.setItem("flightInfo", JSON.stringify({
                        kodSyarikat: formData.kodSyarikat,
                        enrichId: formData.enrichId
                    }));
                }
            }, [formData.kodSyarikat, formData.enrichId]);

            useEffect(() => {
                if (isGantiDateLocked) {
                    setFormData(prev => ({
                        ...prev,
                        tarikhGantiDari: prev.tarikhPergi,
                        tarikhGantiHingga: prev.tarikhBalik,
                        flightPergiTarikh: prev.tarikhPergi,
                        flightBalikTarikh: prev.tarikhBalik
                    }));
                } else {
                    setFormData(prev => ({
                        ...prev,
                        flightPergiTarikh: prev.tarikhPergi,
                        flightBalikTarikh: prev.tarikhBalik
                    }));
                }
            }, [formData.tarikhPergi, formData.tarikhBalik, isGantiDateLocked]);


            const [expanded, setExpanded] = useState({ pegawai: true, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false });
            const [notification, setNotification] = useState({ show: false, message: '', type: '' });
            const [isGenerating, setIsGenerating] = useState(false);
            const [shakeSection, setShakeSection] = useState(null);

            const isPegawaiComplete = formData.nama.trim() !== '' && formData.jawatan.trim() !== '' && formData.bahagian.trim() !== '' && formData.noKp.trim() !== '' && (activeForm === 'akujanji' || activeForm === 'laporan' || formData.noTel.trim() !== '');
            
            const isTugasComplete = formData.tujuan.trim() !== '' && formData.tempat.trim() !== '' && formData.tarikhPergi !== '' && formData.tarikhBalik !== '';
            const isPenggantiComplete = formData.namaPengganti.trim() !== '' && formData.subjek.trim() !== '';
            const isPergiComplete = formData.flightPergiDari.length === 3 && formData.flightPergiKe.length === 3 && formData.flightPergiMasa;
            const isBalikComplete = formData.flightBalikDari.length === 3 && formData.flightBalikKe.length === 3 && formData.flightBalikMasa;
            const isTiketComplete = formData.caraPerjalanan === 'Kapal Terbang' ? (isPergiComplete && isBalikComplete) : true;
            
            // Validation Cuti
            const isCutiComplete = formData.jenisCuti !== '' && formData.cutiDari !== '' && formData.cutiHingga !== '' && formData.ketuaSokongan !== '' && formData.pegawaiPelulus !== '';

            // Validation Akujanji
            const isPerananComplete = formData.perananPeperiksaan.length > 0;
            const isTandatanganComplete = formData.tandatangan !== null;

            // Validation Laporan Peperiksaan
            const isLaporanInfoComplete = formData.sesiPeperiksaan.trim() !== '' && formData.tarikhPeperiksaan !== '';
            const isLaporanSoalanComplete = formData.q1Status !== '' && formData.q2Status !== '' && formData.q3Status !== '';

            const isAllComplete = activeForm === 'cuti' 
                ? (isPegawaiComplete && isCutiComplete)
                : activeForm === 'akujanji' 
                    ? (isPegawaiComplete && isPerananComplete && isTandatanganComplete)
                    : activeForm === 'laporan'
                        ? (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete && isTandatanganComplete)
                        : (isPegawaiComplete && isTugasComplete && isPenggantiComplete && isTiketComplete);

            let progressWidth = 0;
            if (activeForm === 'cuti') {
                if (isPegawaiComplete) progressWidth += 50;
                if (isCutiComplete) progressWidth += 50;
            } else if (activeForm === 'akujanji') {
                if (isPegawaiComplete) progressWidth = 33.33;
                if (isPegawaiComplete && isPerananComplete) progressWidth = 66.66;
                if (isPegawaiComplete && isPerananComplete && isTandatanganComplete) progressWidth = 100;
            } else if (activeForm === 'laporan') {
                if (isPegawaiComplete) progressWidth = 25;
                if (isPegawaiComplete && isLaporanInfoComplete) progressWidth = 50;
                if (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete) progressWidth = 75;
                if (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete && isTandatanganComplete) progressWidth = 100;
            } else if (activeForm === 'tugas') {
                if (isPegawaiComplete) progressWidth = 33.33;
                if (isPegawaiComplete && isTugasComplete) progressWidth = 66.66;
                if (isPegawaiComplete && isTugasComplete && isPenggantiComplete) {
                    progressWidth = isTiketComplete ? 100 : 85; 
                }
            }

            const s1Done = isPegawaiComplete;
            const s2Done = activeForm === 'akujanji' ? (isPegawaiComplete && isPerananComplete) : activeForm === 'laporan' ? (isPegawaiComplete && isLaporanInfoComplete) : (isPegawaiComplete && isTugasComplete);
            const s3Done = activeForm === 'akujanji' ? (isAllComplete) : activeForm === 'laporan' ? (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete) : (isPegawaiComplete && isTugasComplete && isPenggantiComplete);
            const s4Done = (activeForm === 'tugas' || activeForm === 'laporan') ? isAllComplete : false;

            const showNotification = (message, type = 'success') => {
                setNotification({ show: true, message, type });
                setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
            };

            const toggleSection = (section) => {
                if (section !== 'pegawai' && !isPegawaiComplete) {
                    showNotification("Sila lengkapkan Maklumat Pegawai terlebih dahulu.", "error");
                    document.getElementById('section-pegawai')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setShakeSection('pegawai');
                    setTimeout(() => setShakeSection(null), 500);
                    return;
                }
                if (activeForm === 'tugas' && (section === 'pengganti' || section === 'tiket') && !isTugasComplete) {
                    showNotification("Sila lengkapkan Maklumat Tugasan terlebih dahulu.", "error");
                    document.getElementById('section-tugas')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setShakeSection('tugas');
                    setTimeout(() => setShakeSection(null), 500);
                    return;
                }
                if (activeForm === 'akujanji' && section === 'tandatangan' && !isPerananComplete) {
                    showNotification("Sila pilih sekurang-kurangnya satu Peranan Peperiksaan.", "error");
                    document.getElementById('section-peranan')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    setShakeSection('peranan');
                    setTimeout(() => setShakeSection(null), 500);
                    return;
                }
                if (activeForm === 'laporan') {
                    if (section === 'laporanSoalan' && !isLaporanInfoComplete) {
                        showNotification("Sila lengkapkan Maklumat Peperiksaan terlebih dahulu.", "error");
                        document.getElementById('section-laporanInfo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setShakeSection('laporanInfo');
                        setTimeout(() => setShakeSection(null), 500);
                        return;
                    }
                    if (section === 'tandatangan' && !isLaporanSoalanComplete) {
                        showNotification("Sila lengkapkan Status & Cadangan terlebih dahulu.", "error");
                        document.getElementById('section-laporanSoalan')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        setShakeSection('laporanSoalan');
                        setTimeout(() => setShakeSection(null), 500);
                        return;
                    }
                }
                
                setExpanded(prev => ({
                    pegawai: section === 'pegawai' ? !prev.pegawai : false,
                    tugas: section === 'tugas' ? !prev.tugas : false,
                    pengganti: section === 'pengganti' ? !prev.pengganti : false,
                    tiket: section === 'tiket' ? !prev.tiket : false,
                    cuti: section === 'cuti' ? !prev.cuti : false,
                    peranan: section === 'peranan' ? !prev.peranan : false,
                    tandatangan: section === 'tandatangan' ? !prev.tandatangan : false,
                    laporanInfo: section === 'laporanInfo' ? !prev.laporanInfo : false,
                    laporanSoalan: section === 'laporanSoalan' ? !prev.laporanSoalan : false
                }));
            };

            const validateSection = (sectionName) => {
                let requiredFields = [];
                
                if (sectionName === 'pegawai') {
                    requiredFields = [
                        { id: 'wrap-nama', val: formData.nama, name: 'Nama Penuh' },
                        { id: 'wrap-jawatan', val: formData.jawatan, name: 'Jawatan' },
                        { id: 'wrap-bahagian', val: formData.bahagian, name: 'Bahagian/Unit' },
                        { id: 'wrap-noKp', val: formData.noKp, name: 'No. Kad Pengenalan' }
                    ];
                    if (activeForm !== 'akujanji' && activeForm !== 'laporan') {
                        requiredFields.push({ id: 'wrap-noTel', val: formData.noTel, name: 'No. Telefon' });
                    }
                } else if (sectionName === 'tugas') {
                    requiredFields = [
                        { id: 'wrap-tujuan', val: formData.tujuan, name: 'Perihal Tugas / Tujuan' },
                        { id: 'wrap-tempat', val: formData.tempat, name: 'Tempat / Lokasi' }
                    ];
                } else if (sectionName === 'pengganti') {
                    requiredFields = [
                        { id: 'wrap-namaPengganti', val: formData.namaPengganti, name: 'Nama Pengganti' },
                        { id: 'wrap-subjek', val: formData.subjek, name: 'Subjek / Tugas Ditinggalkan' }
                    ];
                } else if (sectionName === 'tiket' && formData.caraPerjalanan === 'Kapal Terbang') {
                    requiredFields = [
                        { id: 'wrap-flightPergiDari', val: formData.flightPergiDari, name: 'Dari (Laluan Pergi)' },
                        { id: 'wrap-flightPergiKe', val: formData.flightPergiKe, name: 'Ke (Laluan Pergi)' },
                        { id: 'wrap-flightPergiMasa', val: formData.flightPergiMasa, name: 'Masa Pergi' },
                        { id: 'wrap-flightBalikDari', val: formData.flightBalikDari, name: 'Dari (Laluan Balik)' },
                        { id: 'wrap-flightBalikKe', val: formData.flightBalikKe, name: 'Ke (Laluan Balik)' },
                        { id: 'wrap-flightBalikMasa', val: formData.flightBalikMasa, name: 'Masa Balik' }
                    ];
                } else if (sectionName === 'cuti') {
                    requiredFields = [
                        { id: 'wrap-jenisCuti', val: formData.jenisCuti, name: 'Jenis Cuti' },
                        { id: 'wrap-ketuaSokongan', val: formData.ketuaSokongan, name: 'Ketua Sokongan' },
                        { id: 'wrap-pegawaiPelulus', val: formData.pegawaiPelulus, name: 'Pegawai Pelulus' }
                    ];
                } else if (sectionName === 'peranan') {
                    if (formData.perananPeperiksaan.length === 0) {
                        requiredFields = [{ id: 'wrap-peranan', val: '', name: 'Peranan Peperiksaan' }];
                    }
                } else if (sectionName === 'tandatangan') {
                     if (!formData.tandatangan) {
                        requiredFields = [{ id: 'wrap-tandatangan', val: '', name: 'Tandatangan Digital' }];
                     }
                } else if (sectionName === 'laporanInfo') {
                    requiredFields = [
                        { id: 'wrap-sesiPeperiksaan', val: formData.sesiPeperiksaan, name: 'Sesi Peperiksaan' }
                    ];
                }

                for (let field of requiredFields) {
                    if (!field.val || (typeof field.val === 'string' && field.val.trim() === '')) {
                        showNotification(`Ruangan tertinggal: ${field.name}`, "error");
                        
                        if (!expanded[sectionName]) {
                            setExpanded(prev => ({
                                pegawai: false, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false,
                                [sectionName]: true
                            }));
                        }
                        
                        setTimeout(() => {
                            const el = document.getElementById(field.id);
                            if (el) {
                                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                const input = (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT') ? el : el.querySelector('input, select, textarea');
                                if (input) input.focus();
                                
                                el.classList.add('animate-shake', 'border-red-500', 'ring-[3px]', 'ring-red-500/30');
                                setTimeout(() => el.classList.remove('animate-shake', 'border-red-500', 'ring-[3px]', 'ring-red-500/30'), 2500);
                            } else {
                                document.getElementById(`section-${sectionName}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            }
                        }, 200);
                        
                        return false;
                    }
                }
                return true;
            };

            const validateAll = () => {
                if (!validateSection('pegawai')) return false;
                
                if (activeForm === 'cuti') {
                    if (!validateSection('cuti')) return false;
                } else if (activeForm === 'akujanji') {
                    if (!validateSection('peranan')) return false;
                    if (!validateSection('tandatangan')) return false;
                } else if (activeForm === 'laporan') {
                    if (!validateSection('laporanInfo')) return false;
                    if (!validateSection('laporanSoalan')) return false;
                    if (!validateSection('tandatangan')) return false;
                } else if (activeForm === 'tugas') {
                    if (!validateSection('tugas')) return false;
                    if (!validateSection('pengganti')) return false;
                    if (formData.caraPerjalanan === 'Kapal Terbang' && !validateSection('tiket')) return false;
                }
                return true;
            };

            const validateAndScroll = () => {
                return validateAll();
            };

            const nextSection = (current, nextSectionName) => {
                if (!validateSection(current)) return;
                
                if (activeForm === 'tugas') {
                    if (nextSectionName === 'tiket' && formData.caraPerjalanan !== 'Kapal Terbang') {
                        nextSectionName = 'jana';
                    }
                }

                setExpanded({
                    pegawai: nextSectionName === 'pegawai',
                    tugas: nextSectionName === 'tugas',
                    pengganti: nextSectionName === 'pengganti',
                    tiket: nextSectionName === 'tiket',
                    cuti: nextSectionName === 'cuti',
                    peranan: nextSectionName === 'peranan',
                    tandatangan: nextSectionName === 'tandatangan',
                    laporanInfo: nextSectionName === 'laporanInfo',
                    laporanSoalan: nextSectionName === 'laporanSoalan'
                });

                if (nextSectionName === 'jana') {
                    setTimeout(() => {
                        const btn = document.getElementById('jana-button-container');
                        if (btn) btn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 200);
                }
            };

            const formatIC = (val) => {
                const v = val.replace(/\D/g, '').substring(0, 12);
                const match = v.match(/^(\d{0,6})(\d{0,2})(\d{0,4})$/);
                return match ? (!match[2] ? match[1] : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ''}`) : val;
            };

            const formatPhone = (val) => {
                const v = val.replace(/\D/g, '').substring(0, 11);
                const match = v.match(/^(\d{0,3})(\d{0,8})$/);
                return match ? (!match[2] ? match[1] : `${match[1]}-${match[2]}`) : val;
            };

            const handleChange = (e) => {
                let { name, value, type, checked } = e.target;
                if (name === 'noKp') value = formatIC(value);
                if (name === 'noTel') value = formatPhone(value);
                if (name === 'noTelPengganti') value = formatPhone(value);
                
                if (['flightPergiDari', 'flightPergiKe', 'flightBalikDari', 'flightBalikKe'].includes(name)) {
                    value = value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
                }
                
                setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
            };

            const handleCheckboxPeranan = (role) => {
                setFormData(prev => {
                    const isSelected = prev.perananPeperiksaan.includes(role);
                    let newRoles = [];
                    if (isSelected) {
                        newRoles = prev.perananPeperiksaan.filter(r => r !== role);
                    } else {
                        newRoles = [...prev.perananPeperiksaan, role];
                    }
                    return { ...prev, perananPeperiksaan: newRoles };
                });
            };

            const handlePenggantiChange = (e) => {
                const selectedName = e.target.value;
                if (!selectedName) {
                    setFormData(prev => ({ ...prev, namaPengganti: '', bahagianPengganti: '', noTelPengganti: '' }));
                    return;
                }
                if (selectedName === "TIADA PENGGANTI") {
                    setFormData(prev => ({ ...prev, namaPengganti: 'TIADA PENGGANTI', bahagianPengganti: '-', noTelPengganti: '-' }));
                    return;
                }
                const p = pegawaiDatabase.find(x => x.nama === selectedName);
                if (p) {
                    setFormData(prev => ({ ...prev, namaPengganti: p.nama, bahagianPengganti: p.bahagian, noTelPengganti: p.noTel || '' }));
                }
            };

            const toggleAutoFieldsEdit = () => {
                if (isEditingAutoFields) {
                    const selected = pegawaiDatabase.find(p => p.nama === formData.nama);
                    if (selected) {
                        setFormData(prev => ({
                            ...prev,
                            jawatan: selected.jawatan,
                            bahagian: selected.bahagian,
                            noTel: selected.noTel || prev.noTel
                        }));
                    }
                }
                setIsEditingAutoFields(!isEditingAutoFields);
            };

            const getAirportName = (code) => {
                if (!code || code.length !== 3) return 'Pilih';
                const found = malaysiaAirports.find(a => a.code === code);
                return found ? found.name : 'Airport';
            };

            const setRoute = (dari, ke) => {
                setFormData(prev => ({ ...prev, flightPergiDari: dari, flightPergiKe: ke, flightBalikDari: ke, flightBalikKe: dari }));
            };

            const calculateDays = (start, end) => {
                if (!start || !end) return 0;
                const diffTime = new Date(end).getTime() - new Date(start).getTime();
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
                return diffDays > 0 ? diffDays : 0;
            };

            const jumlahHari = calculateDays(formData.tarikhPergi, formData.tarikhBalik);

            const getJSPDF = () => window.jspdf && window.jspdf.jsPDF ? window.jspdf.jsPDF : null;
            const val = (text) => (text && text.toString().trim() !== '') ? text : '-';

            // ================== LOGIK TANDATANGAN DIGITAL ==================
            
            // Setup canvas untuk melukis
            useEffect(() => {
                if (expanded.tandatangan && canvasRef.current) {
                    const initCanvas = () => {
                        const canvas = canvasRef.current;
                        if (!canvas) return;
                        const ctx = canvas.getContext('2d');
                        
                        // Supaya canvas responsive tapi lukisan tajam (DPI Scaling resolusi tinggi)
                        const rect = canvas.parentElement.getBoundingClientRect();
                        const dpr = window.devicePixelRatio || 1;
                        
                        canvas.width = rect.width * dpr;
                        canvas.height = 200 * dpr; // Tinggi statik 200px di UI
                        ctx.scale(dpr, dpr);
                        
                        ctx.lineCap = 'round';
                        ctx.lineJoin = 'round';
                        ctx.lineWidth = 3;
                        ctx.strokeStyle = '#0f172a'; // Warna dakwat (slate-900)
                    };

                    initCanvas();

                    // Event listener untuk memastikan kanvas responsif jika peranti diputar (rotate)
                    window.addEventListener('resize', initCanvas);
                    return () => window.removeEventListener('resize', initCanvas);
                }
            }, [expanded.tandatangan]);

            const getCoordinates = (e) => {
                const canvas = canvasRef.current;
                const rect = canvas.getBoundingClientRect();
                let clientX, clientY;
                if (e.touches && e.touches.length > 0) {
                    clientX = e.touches[0].clientX;
                    clientY = e.touches[0].clientY;
                } else {
                    clientX = e.clientX;
                    clientY = e.clientY;
                }
                return {
                    x: clientX - rect.left,
                    y: clientY - rect.top
                };
            };

            const startDrawing = (e) => {
                isDrawing.current = true;
                const coords = getCoordinates(e);
                lastPos.current = coords;
                
                const ctx = canvasRef.current.getContext('2d');
                ctx.beginPath();
                ctx.moveTo(coords.x, coords.y);
                ctx.lineTo(coords.x, coords.y); // Letak titik sekiranya pengguna hanya klik
                ctx.stroke();
            };

            const draw = (e) => {
                if (!isDrawing.current) return;
                
                // Halang skrin daripada tertatal (scroll) sewaktu sign di telefon
                if (e.cancelable) e.preventDefault();
                
                const coords = getCoordinates(e);
                const ctx = canvasRef.current.getContext('2d');
                
                // Lukisan garisan yang pantas & smooth
                ctx.beginPath();
                ctx.moveTo(lastPos.current.x, lastPos.current.y);
                ctx.lineTo(coords.x, coords.y);
                ctx.stroke();
                
                lastPos.current = coords;
            };

            const stopDrawing = () => {
                if(isDrawing.current) {
                    isDrawing.current = false;
                    saveSignature();
                }
            };

            const clearSignature = () => {
                const canvas = canvasRef.current;
                if(canvas) {
                    const ctx = canvas.getContext('2d');
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                }
                setFormData(prev => ({ ...prev, tandatangan: null }));
            };

            // Fungsi Auto-Crop (Potong kanvas supaya sign sentiasa center & tidak ada ruang kosong)
            const cropCanvas = (sourceCanvas) => {
                const ctx = sourceCanvas.getContext('2d');
                const imageData = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height);
                const data = imageData.data;

                let minX = sourceCanvas.width, minY = sourceCanvas.height, maxX = 0, maxY = 0;
                let hasPixels = false;

                // Loop setiap piksel untuk mencari lokasi dakwat
                for (let y = 0; y < sourceCanvas.height; y++) {
                    for (let x = 0; x < sourceCanvas.width; x++) {
                        const alpha = data[(y * sourceCanvas.width + x) * 4 + 3];
                        if (alpha > 5) { // Jika ada dakwat
                            minX = Math.min(minX, x);
                            minY = Math.min(minY, y);
                            maxX = Math.max(maxX, x);
                            maxY = Math.max(maxY, y);
                            hasPixels = true;
                        }
                    }
                }

                if (!hasPixels) return null;

                // Tambah padding (ruang lega) sikit pada potongan
                const padding = 15;
                minX = Math.max(0, minX - padding);
                minY = Math.max(0, minY - padding);
                maxX = Math.min(sourceCanvas.width, maxX + padding);
                maxY = Math.min(sourceCanvas.height, maxY + padding);

                const width = maxX - minX;
                const height = maxY - minY;

                const croppedCanvas = document.createElement('canvas');
                croppedCanvas.width = width;
                croppedCanvas.height = height;
                const croppedCtx = croppedCanvas.getContext('2d');
                croppedCtx.putImageData(ctx.getImageData(minX, minY, width, height), 0, 0);

                return croppedCanvas.toDataURL('image/png');
            };

            const saveSignature = () => {
                const canvas = canvasRef.current;
                if(canvas) {
                    const croppedImage = cropCanvas(canvas);
                    if (croppedImage) {
                        setFormData(prev => ({ ...prev, tandatangan: croppedImage }));
                    }
                }
            };

            // Muat Naik dan Auto Transparent Dibaiki (Biar Warna Asal dan Buang Putih Sahaja)
            const handleSignatureUpload = (e) => {
                const file = e.target.files[0];
                if (!file) return;

                const reader = new FileReader();
                reader.onload = (event) => {
                    const img = new Image();
                    img.onload = () => {
                        const tempCanvas = document.createElement('canvas');
                        const ctx = tempCanvas.getContext('2d');
                        tempCanvas.width = img.width;
                        tempCanvas.height = img.height;
                        ctx.drawImage(img, 0, 0);
                        
                        const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
                        const data = imageData.data;
                        
                        for (let i = 0; i < data.length; i += 4) {
                            const r = data[i];
                            const g = data[i+1];
                            const b = data[i+2];
                            
                            // Gunakan formula Luminance untuk mengira kecerahan sebenar piksel
                            const brightness = (r * 0.299 + g * 0.587 + b * 0.114);
                            
                            // Jika latar belakang bukan gelap (abu-abu/cerah), buang (Alpha = 0)
                            // Nilai 130 disetkan untuk membuang kesan bayang-bayang kelabu dari kamera
                            if (brightness > 130) {
                                data[i+3] = 0; 
                            } else {
                                // Jadikan dakwat hitam pekat untuk kualiti PDF yang lebih jelas
                                data[i] = 15;     // R
                                data[i+1] = 23;   // G
                                data[i+2] = 42;   // B
                                data[i+3] = 255;  // Alpha (Solid)
                            }
                        }
                        
                        ctx.putImageData(imageData, 0, 0);
                        
                        // Potong automatik selepas buang latar belakang
                        const croppedImage = cropCanvas(tempCanvas);
                        
                        if (croppedImage) {
                            setFormData(prev => ({ ...prev, tandatangan: croppedImage }));
                            showNotification("Tandatangan berjaya dimuat naik & dioptimumkan.");
                        } else {
                            showNotification("Tandatangan tidak dapat dikesan.", "error");
                        }
                    };
                    img.src = event.target.result;
                };
                reader.readAsDataURL(file);
            };

            // ================== PENJANAAN PDF ==================
            
            // --- 1. BORANG TUGAS RASMI ---
            const generateForm1 = (doc, logoImgBase64) => {
                doc.setFont("helvetica"); doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text("LAMPIRAN A", 190, 15, { align: 'right' });
                
                let currentY = 18; 
                if(logoImgBase64) { 
                    doc.addImage(logoImgBase64, 'JPEG', 92.5, currentY, 25, 20); 
                    currentY += 25; 
                } else { 
                    currentY += 10; 
                }

                doc.setFontSize(10); doc.text("JABATAN TENAGA MANUSIA", 105, currentY, { align: 'center' }); currentY += 6;
                doc.text("BORANG KEBENARAN MENJALANKAN TUGASAN RASMI DILUAR IBU PEJABAT", 105, currentY, { align: 'center' }); currentY += 4.5;
                doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.text("( Borang ini hendaklah diisi sebelum memulakan perjalanan )", 105, currentY, { align: 'center' }); currentY += 10;
                
                doc.setFontSize(9);
                doc.text("1.", 18, currentY); doc.text("Nama Pemohon", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.nama), 78, currentY); currentY += 6;
                doc.text("2.", 18, currentY); doc.text("Jawatan", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.jawatan), 78, currentY); currentY += 6;
                doc.text("3.", 18, currentY); doc.text("Bahagian/Unit", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.bahagian), 78, currentY); currentY += 6;
                doc.text("4.", 18, currentY); doc.text("No. Pendaftaran/Jenis Kenderaan", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.noKenderaan), 78, currentY); currentY += 6;

                doc.text("5.", 18, currentY); doc.text("Butiran Tugasan :", 28, currentY); currentY += 4.5;
                doc.text("(Gunakan Lampiran sekiranya ruangan tidak mencukupi)", 28, currentY);

                const tPergiFormat = formData.tarikhPergi ? formData.tarikhPergi.split('-').reverse().join('/') : '';
                const tBalikFormat = formData.tarikhBalik ? formData.tarikhBalik.split('-').reverse().join('/') : '';

                autoTable(doc,{
                    startY: currentY + 3, margin: { left: 18, right: 18 },
                    head: [['Tempat', 'Perihal Tugas', 'Tarikh Pergi', 'Tarikh Balik', 'Kilometer\nSehala (km)']],
                    body: [ [val(formData.tempat), val(formData.tujuan), val(tPergiFormat), val(tBalikFormat), val(formData.km)] ],
                    theme: 'grid', headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3 },
                    bodyStyles: { textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3, minCellHeight: 12 }, styles: { font: 'helvetica', fontSize: 8.5 }
                });

                currentY = doc.lastAutoTable.finalY + 8;

                const drawBigCheckbox = (x, y, isChecked, text1, text2 = null) => {
                    doc.setDrawColor(0); doc.setLineWidth(0.3); doc.rect(x, y - 4.5, 6.5, 6.5); 
                    if (isChecked) { doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.text("/", x + 1.8, y + 1.5); doc.setFontSize(9); doc.setFont("helvetica", "normal"); }
                    if (text1) doc.text(text1, x + 10, y + 0.5); if (text2) doc.text(text2, x + 10, y + 4.5);
                };

                doc.text("6.", 18, currentY); doc.text("Cara Perjalanan:", 28, currentY); currentY += 7;
                drawBigCheckbox(28, currentY, formData.caraPerjalanan === 'Kereta Rasmi Jawatan', "Kereta Rasmi Jawatan"); drawBigCheckbox(85, currentY, formData.caraPerjalanan === 'Kapal Terbang', "Kapal Terbang"); drawBigCheckbox(135, currentY, formData.caraPerjalanan === 'Lain-lain', "Lain-lain (Sila nyatakan)"); currentY += 7;
                drawBigCheckbox(28, currentY, formData.caraPerjalanan === 'Kereta Sendiri', "Kereta Sendiri"); drawBigCheckbox(85, currentY, formData.caraPerjalanan === 'Kereta Jabatan', "Kereta Jabatan"); doc.setLineWidth(0.4); doc.line(135, currentY + 1.5, 185, currentY + 1.5); currentY += 10;

                doc.text("7.", 18, currentY); doc.text("Jika ", 28, currentY); doc.setFont("helvetica", "bold"); doc.text("perjalanan melebihi 240 kilometer", 35, currentY); 
                let txtW = doc.getTextWidth("perjalanan melebihi 240 kilometer"); doc.setFont("helvetica", "normal");
                doc.text(", Kelulusan menggunakan kenderaan sendiri bagi perjalanan melebihi 240", 35 + txtW, currentY); currentY += 4.5;
                doc.text("kilometer (Pekeliling Perbendaharaan WP 1.4, Para 5.7.4). Sebab-sebab menggunakan kenderaan sendiri:", 28, currentY); currentY += 7;
                drawBigCheckbox(28, currentY, formData.sebab1, "Dikehendaki menjalankan tugas dibeberapa tempat di sepanjang perjalanan;"); currentY += 7;
                drawBigCheckbox(28, currentY, formData.sebab2, "Adalah mustahak dan terpaksa bagi seseorang pegawai berkenderaan sendiri; dan"); currentY += 7;
                drawBigCheckbox(28, currentY, formData.sebab3, "Adalah mustahak dan terpaksa membawa pegawai lain sebagai penumpang yang juga menjalankan tugas"); currentY += 4.5; doc.text("rasmi.", 38, currentY); currentY += 9;
                
                doc.text("8.", 18, currentY); doc.text("Jika menggunakan kenderaan sendiri, tuntutan yang akan dibuat adalah:", 28, currentY); currentY += 7;
                drawBigCheckbox(28, currentY, formData.tuntutanBatu, "Elaun hitungan batu/ tuntutan bekalan bahan api"); currentY += 8;
                drawBigCheckbox(28, currentY, formData.tuntutanGantian, "Gantian Tambang Kapal Terbang/Keretapi", "(Mengikut kelayakan bagi perjalanan melebihi 240 kilometer)"); currentY += 12;

                doc.text("Tarikh : ................................................................", 28, currentY); doc.text("(Tandatangan Pemohon)", 165, currentY + 4, { align: 'center' }); currentY += 9;
                doc.setFont("helvetica", "bold"); doc.text("SOKONGAN", 28, currentY); doc.setFont("helvetica", "normal"); currentY += 5; doc.text("Permohonan ini disokong / tidak disokong.", 28, currentY); currentY += 9;
                doc.text("Tarikh : ................................................................", 28, currentY); doc.text("(Tandatangan & Cop Penyokong)", 165, currentY + 4, { align: 'center' }); currentY += 9;
                doc.setFont("helvetica", "bold"); doc.text("KELULUSAN*", 28, currentY); doc.setFont("helvetica", "normal"); currentY += 5; doc.text("Permohonan ini diluluskan / tidak diluluskan.", 28, currentY); currentY += 9;
                doc.text("Tarikh : ................................................................", 28, currentY); doc.text("(Tandatangan & Cop Pelulus)", 165, currentY + 4, { align: 'center' }); currentY += 10;
                doc.setFontSize(7.5); doc.text("*Nota: Dalam keadaan tiada pelulus, maka pegawai yang menjalankan tugas pelulus boleh memberikan kelulusan ke atas permohonan ini.", 14, currentY);
            };

            const generateForm2 = (doc, logoImgBase64) => {
                doc.setFont("helvetica"); doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text("LAMPIRAN 7", 190, 15, { align: 'right' });
                
                let currentY = 12;
                if(logoImgBase64) { 
                    doc.addImage(logoImgBase64, 'JPEG', 92.5, currentY, 25, 20); 
                    currentY += 25; 
                } else { 
                    currentY += 18; 
                }

                doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text("JABATAN TENAGA MANUSIA", 105, currentY, { align: 'center' }); currentY += 5;
                const text1 = "ADTEC : "; const text2 = "ADTEC JTM KAMPUS SANDAKAN"; const totalWidth = doc.getTextWidth(text1 + text2); const startX = 105 - (totalWidth / 2);
                doc.text(text1 + text2, 105, currentY, { align: 'center' }); doc.line(startX + doc.getTextWidth(text1), currentY + 1, startX + totalWidth, currentY + 1); currentY += 8;
                doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.text("BORANG PELEPASAN TUGAS SEMENTARA", 105, currentY, { align: 'center' });

                const tGantiDariFormat = formData.tarikhGantiDari ? formData.tarikhGantiDari.split('-').reverse().join('/') : '';
                const tGantiHinggaFormat = formData.tarikhGantiHingga ? formData.tarikhGantiHingga.split('-').reverse().join('/') : '';
                
                let teksMasaGanti = '-';
                if (tGantiDariFormat && tGantiHinggaFormat) {
                    teksMasaGanti = `DARI: ${tGantiDariFormat}\nHINGGA: ${tGantiHinggaFormat}`;
                } else if (tGantiDariFormat || tGantiHinggaFormat) {
                    teksMasaGanti = tGantiDariFormat || tGantiHinggaFormat;
                }

                const upperVal = (text) => val(text).toUpperCase();

                autoTable(doc, {
                    startY: currentY + 5, margin: { left: 10, right: 10 }, theme: 'grid',
                    styles: { font: 'helvetica', fontSize: 8.5, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.2, valign: 'middle', cellPadding: 2.5 },
                    columnStyles: { 0: { cellWidth: 45 }, 1: { cellWidth: 55 }, 2: { cellWidth: 30 }, 3: { cellWidth: 42 }, 4: { cellWidth: 18, halign: 'center' } },
                    body: [
                        [{ content: 'BAHAGIAN A: MAKLUMAT PEMOHON', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
                        [ { content: 'NAMA PEGAWAI:' }, { content: upperVal(formData.nama) }, { content: 'Sebab', colSpan: 2, styles: { fillColor: [215, 205, 170], halign: 'center' } }, { content: 'Sila\nTanda (/)', styles: { fillColor: [215, 205, 170], halign: 'center' } } ],
                        [ { content: 'BAHAGIAN:' }, { content: upperVal(formData.bahagian) }, { content: 'CUTI REHAT /-SAKIT / KECEMASAN', colSpan: 2 }, { content: '' } ],
                        [ { content: 'NO. TELEFON (H/P):' }, { content: upperVal(formData.noTel) }, { content: 'KURSUS / TUGAS RASMI', colSpan: 2 }, { content: '/', styles: { halign: 'center', fontStyle: 'bold' } } ],
                        [ { content: 'LOKASI SEMASA TUGAS:' }, { content: upperVal(formData.tempat) }, { content: 'LAIN-LAIN (SILA NYATAKAN)', colSpan: 2 }, { content: '' } ],
                        [{ content: 'BAHAGIAN B: MAKLUMAT KELAS / TUGAS YANG DI TINGGAL', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
                        [ { content: 'SUBJEK / TUGAS:' }, { content: upperVal(formData.subjek) }, { content: 'CATATAN:\n\n' + upperVal(formData.catatanTugas), colSpan: 3, rowSpan: 2, styles: { valign: 'top' } } ],
                        [ { content: 'SEMESTER /\nKUMPULAN / UNIT /\nBAHAGIAN:' }, { content: upperVal(formData.semester) } ],
                        [ { content: 'TARIKH, HARI &\nMASA YANG\nPERLU DIGANTI:' }, { content: upperVal(teksMasaGanti) }, { content: 'TANDATANGAN &\nTARIKH:', styles: { valign: 'top' } }, { content: '', colSpan: 2 } ],
                        [{ content: 'BAHAGIAN C: MAKLUMAT PEGAWAI PENGGANTI', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
                        [ { content: 'NAMA PEGAWAI:' }, { content: upperVal(formData.namaPengganti) }, { content: 'Tugas', colSpan: 2, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }, { content: 'Sila Tanda\n(/)', styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } } ],
                        [ { content: 'BAHAGIAN:' }, { content: upperVal(formData.bahagianPengganti) }, { content: 'Ambil alih subjek / tugas sepenuhnya:', colSpan: 2, rowSpan: 2 }, { content: formData.jenisAmbilAlih === 'Ambil alih subjek / tugas sepenuhnya' ? '/' : '', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' } } ],
                        [ { content: 'NO. TELEFON (H/P):' }, { content: upperVal(formData.noTelPengganti) } ],
                        [ { content: 'TANDATANGAN &\nTARIKH' }, { content: '' }, { content: 'Ambil alih kawalan kelas / tugas', colSpan: 2 }, { content: formData.jenisAmbilAlih === 'Ambil alih kawalan kelas / tugas' ? '/' : '', styles: { halign: 'center', fontStyle: 'bold' } } ],
                        [{ content: 'BAHAGIAN D : UNTUK KELULUSAN KETUA BAHAGIAN / KETUA JABATAN', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
                        [ { content: 'NAMA,\nTANDATANGAN &\nTARIKH' }, { content: '' }, { content: 'CATATAN:\n\n\n\n\n', colSpan: 3, styles: { valign: 'top' } } ]
                    ]
                });
            };

            const generateForm3 = (doc) => {
                doc.setFont("helvetica"); doc.setDrawColor(0); doc.setLineWidth(0.3); doc.rect(130, 15, 65, 12);
                doc.setFontSize(9); doc.text("NO.WARAN :", 132, 20); doc.text("RUJ.TIKET :", 132, 25);
                doc.setFontSize(12); doc.setFont("helvetica", "normal");
                const title1 = "BORANG TEMPAHAN TIKET KAPAL TERBANG ADTEC JTM KAMPUS"; const title2 = "SANDAKAN";
                doc.text(title1, 105, 35, { align: 'center' }); doc.text(title2, 105, 42, { align: 'center' });
                const t1Width = doc.getTextWidth(title1); const t2Width = doc.getTextWidth(title2);
                doc.line(105 - t1Width/2, 36, 105 + t1Width/2, 36); doc.line(105 - t2Width/2, 43, 105 + t2Width/2, 43);

                const drawSectionHeader = (text, y, width) => {
                    doc.setFillColor(210, 210, 210); doc.rect(15, y - 5, width, 7, 'F'); doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text(text, 17, y);
                };

                const upperVal = (text) => val(text).toUpperCase();

                drawSectionHeader("A. MAKLUMAT DESTINASI", 55, 60); doc.setFontSize(9); doc.text("TUJUAN", 15, 65); doc.text(":", 42, 65); doc.line(45, 65, 195, 65); doc.text(upperVal(formData.tujuan), 47, 64);
                doc.setFontSize(8); doc.setFont("helvetica", "italic"); doc.text("(Mesyuarat/Kursus/Seminar/Bengkel Kerja/Lain-lain)", 120, 69, {align: 'center'});
                doc.text("* Sila sertakan salinan surat/memo yang berkaitan", 120, 73, {align: 'center'}); doc.setFont("helvetica", "normal"); doc.setFontSize(9);
                doc.text("TEMPAT/ LOKASI", 15, 82); doc.text(":", 42, 82); doc.line(45, 82, 195, 82); doc.text(upperVal(formData.tempat), 47, 81);
                
                const tPergiFormat = formData.tarikhPergi ? formData.tarikhPergi.split('-').reverse().join('/') : '';
                const tBalikFormat = formData.tarikhBalik ? formData.tarikhBalik.split('-').reverse().join('/') : '';

                doc.text("TARIKH/ TEMPOH", 15, 90); doc.text(":", 42, 90); doc.text("DARI:", 45, 90); doc.line(55, 90, 85, 90); doc.text(val(tPergiFormat), 57, 89);
                doc.text("HINGGA:", 90, 90); doc.line(105, 90, 135, 90); doc.text(val(tBalikFormat), 107, 89);

                drawSectionHeader("B. MAKLUMAT PEMOHON", 102, 60);
                doc.text("NAMA PEGAWAI", 15, 112); doc.text(":", 58, 112); doc.line(61, 112, 195, 112); doc.text(upperVal(formData.nama), 63, 111);
                doc.text("NO. KAD PENGENALAN", 15, 120); doc.text(":", 58, 120); doc.line(61, 120, 195, 120); doc.text(upperVal(formData.noKp), 63, 119);
                doc.text("NO. TEL PEGAWAI", 15, 128); doc.text(":", 58, 128); doc.line(61, 128, 110, 128); doc.text(upperVal(formData.noTel), 63, 127);
                doc.text("T/TANGAN :", 118, 128); 

                // Letak Imej Tandatangan Pemohon
                if (formData.tandatangan) {
                    try {
                        doc.addImage(formData.tandatangan, 'PNG', 140, 115, 40, 20);
                    } catch(e) {}
                }
                doc.line(138, 128, 195, 128);

                drawSectionHeader("C. MAKLUMAT TIKET PENERBANGAN", 140, 75);
                const fPTFormat = formData.flightPergiTarikh ? formData.flightPergiTarikh.split('-').reverse().join('/') : '';
                const fBTFormat = formData.flightBalikTarikh ? formData.flightBalikTarikh.split('-').reverse().join('/') : '';

                autoTable(doc, {
                    startY: 145, margin: { left: 15, right: 15 }, theme: 'grid',
                    headStyles: { fillColor: [210, 210, 210], textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3 },
                    bodyStyles: { textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3 },
                    columnStyles: { 0: { fillColor: [210, 210, 210], fontStyle: 'bold', cellWidth: 18 }, 1: { cellWidth: 28 }, 2: { cellWidth: 28 }, 3: { cellWidth: 28 }, 4: { cellWidth: 28 }, 5: { cellWidth: 'auto' } },
                    head: [['', 'TARIKH', 'MASA', 'DARI', 'KE', 'CATATAN']],
                    body: [
                        ['PERGI', val(fPTFormat), upperVal(formData.flightPergiMasa), upperVal(formData.flightPergiDari), upperVal(formData.flightPergiKe), '*Waran Jabatan / Beli sendiri'],
                        ['BALIK', val(fBTFormat), upperVal(formData.flightBalikMasa), upperVal(formData.flightBalikDari), upperVal(formData.flightBalikKe), '*Waran Jabatan / Beli sendiri']
                    ]
                });

                let currentY = doc.lastAutoTable.finalY + 8;
                doc.setFontSize(9); doc.text("KELAYAKAN TAMBANG:", 15, currentY); doc.text("** B/H/Y", 60, currentY); currentY += 8;
                doc.text("HARGA TAMBANG", 15, currentY); doc.text(":", 50, currentY); doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY);
                doc.text("KOD JENIS", 100, currentY); doc.text(":", 135, currentY); doc.rect(140, currentY - 4, 45, 6); doc.text(upperVal(formData.kodSyarikat), 142, currentY); currentY += 8;
                doc.text("CUKAI AIRPORT", 15, currentY); doc.text(":", 50, currentY); doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY);
                doc.text("MAS / AIR ASIA", 100, currentY); doc.text(":", 135, currentY); doc.rect(140, currentY - 4, 45, 6); currentY += 8;
                doc.text("CUKAI PERKHIDMATAN", 15, currentY); doc.text(":", 50, currentY); doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY);
                doc.text("ENRICH / BIG ID", 100, currentY); doc.text(":", 135, currentY); doc.rect(140, currentY - 4, 45, 6); doc.text(upperVal(formData.enrichId), 142, currentY); currentY += 8;
                doc.setFont("helvetica", "bold"); doc.text("JUMLAH", 15, currentY); doc.text(":", 50, currentY); doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY); doc.setFont("helvetica", "normal"); currentY += 12;

                drawSectionHeader("D. PENGESAHAN PENYERAHAN TIKET", currentY, 90); currentY += 7;
                doc.setFontSize(9); doc.text("Laporan sebelum meninggalkan pejabat", 15, currentY);
                
                let rightBox1Y = currentY - 5;
                doc.rect(110, rightBox1Y, 85, 25);
                doc.text("Baki Peruntukan : RM", 113, rightBox1Y + 5); doc.text("Baki Perbelanjaan : RM", 113, rightBox1Y + 10); doc.text("Tarikh:", 113, rightBox1Y + 15);
                doc.text("Tandatangan :", 140, rightBox1Y + 20); doc.line(162, rightBox1Y + 20, 190, rightBox1Y + 20); doc.text("(CC (Kew) / PA)", 162, rightBox1Y + 24);

                currentY += 8; doc.text("1.   Persediaan", 15, currentY); doc.rect(55, currentY - 4, 35, 6); doc.setFontSize(8); doc.setFont("helvetica", "italic"); doc.text("** Sudah/Belum", 55, currentY + 5); doc.setFontSize(9); doc.setFont("helvetica", "normal");
                currentY += 12; doc.text("2.   Makluman KJ/KB", 15, currentY); doc.rect(55, currentY - 4, 35, 6); doc.setFontSize(8); doc.setFont("helvetica", "italic"); doc.text("** Sudah/Belum", 55, currentY + 5); doc.setFontSize(9); doc.setFont("helvetica", "normal");

                let rightBox2Y = rightBox1Y + 28; doc.rect(110, rightBox2Y, 85, 40);
                doc.text("Diluluskan Oleh :", 113, rightBox2Y + 5);
                doc.text("Tandatangan", 113, rightBox2Y + 15); doc.text(":", 135, rightBox2Y + 15); doc.line(138, rightBox2Y + 15, 190, rightBox2Y + 15);
                doc.text("Nama/Jawatan", 113, rightBox2Y + 25); doc.text(":", 135, rightBox2Y + 25); doc.line(138, rightBox2Y + 25, 190, rightBox2Y + 25); doc.text("(Pengarah / Penolong Pengarah)", 142, rightBox2Y + 29);
                doc.text("Tarikh", 113, rightBox2Y + 36); doc.text(":", 135, rightBox2Y + 36); doc.line(138, rightBox2Y + 36, 170, rightBox2Y + 36);

                currentY += 8; doc.text("3.   Laporan apabila kembali :", 15, currentY); currentY += 6;
                doc.text("3.1 Tarikh Kembali", 20, currentY); doc.line(50, currentY, 90, currentY); currentY += 6;
                doc.text("3.2 Lapor Kepada", 20, currentY); doc.line(50, currentY, 90, currentY); currentY += 8;
                doc.setFontSize(7); doc.text("Nota: Para A dan B - diisi oleh pemohon", 15, currentY); doc.text("         Para C dan D - untuk kegunaan pejabat", 15, currentY + 3); doc.text("         ** Potong mana yang tidak berkenaan", 15, currentY + 6);
            };

            // --- 2. BORANG CUTI MANUAL ---
            const generateFormCuti = (doc) => {
                doc.setFont("helvetica", "normal"); doc.setFontSize(9);
                doc.text("Surat Pekeliling Am bil.3 Tahun 1990", 195, 12, { align: 'right' });

                doc.setFont("helvetica", "bold"); doc.setFontSize(11);
                doc.text("PERMOHONAN CUTI REHAT/KECEMASAN/TANPA REKOD", 105, 20, { align: 'center' });

                doc.setLineWidth(0.4); doc.line(15, 24, 195, 24); doc.setLineWidth(0.2);

                doc.setFont("helvetica", "normal"); doc.setFontSize(10);
                
                const ketua = pegawaiDatabase.find(p => p.nama === formData.ketuaSokongan);
                const ketuaNama = ketua ? ketua.nama : formData.ketuaSokongan;
                const ketuaJawatan = ketua ? ketua.jawatan : '';

                let currentY = 32;
                doc.text("Kepada:", 15, currentY);
                if (ketuaNama) doc.text(ketuaNama, 65, currentY-1, {align: 'center'});
                doc.line(32, currentY, 98, currentY);
                doc.setFont("helvetica", "bold"); 
                if (ketuaJawatan) doc.text(ketuaJawatan, 65, currentY+4, {align: 'center'}); 
                doc.setFont("helvetica", "normal");

                const jumlahHariCuti = calculateDays(formData.cutiDari, formData.cutiHingga);
                const cDariFormat = formData.cutiDari ? formData.cutiDari.split('-').reverse().join('/') : '';
                const cHinggaFormat = formData.cutiHingga ? formData.cutiHingga.split('-').reverse().join('/') : '';

                currentY = 46;
                doc.text("Saya memohon kebenaran cuti rehat / kecemasan / tanpa rekod selama", 15, currentY);
                if (jumlahHariCuti > 0) doc.text(jumlahHariCuti.toString(), 133, currentY-1, {align: 'center'});
                doc.line(126, currentY, 140, currentY);
                doc.text("hari mulai daripada/pada", 143, currentY);
                
                currentY = 54;
                if (cDariFormat) doc.text(cDariFormat, 35, currentY-1, {align: 'center'});
                doc.line(15, currentY, 55, currentY);
                doc.text("hingga", 60, currentY);
                if (cHinggaFormat) doc.text(cHinggaFormat, 92, currentY-1, {align: 'center'});
                doc.line(75, currentY, 110, currentY);

                currentY = 66;
                doc.text("Catatan:", 15, currentY);
                if(formData.catatanCuti) {
                    doc.text(formData.catatanCuti.toUpperCase(), 32, currentY);
                }

                doc.text("Tandatangan Pemohon:", 85, currentY); doc.line(125, currentY, 185, currentY);
                currentY += 7;
                doc.text("Nama", 85, currentY); doc.text(":", 120, currentY); 
                if(formData.nama) doc.text(formData.nama, 125, currentY-1); 
                doc.line(125, currentY, 185, currentY);
                currentY += 7;
                doc.text("Jawatan", 85, currentY); doc.text(":", 120, currentY); 
                if(formData.jawatan) doc.text(formData.jawatan, 125, currentY-1); 
                doc.line(125, currentY, 185, currentY);
                currentY += 7;
                doc.text("Tarikh", 85, currentY); doc.text(":", 120, currentY); 
                doc.text(val(today.split('-').reverse().join('/')), 125, currentY-1); 
                doc.line(125, currentY, 185, currentY);

                currentY += 8;
                doc.setLineWidth(0.4); doc.line(15, currentY, 195, currentY); doc.setLineWidth(0.2);
                
                const pelulus = pegawaiDatabase.find(p => p.nama === formData.pegawaiPelulus);
                const pelulusNama = pelulus ? pelulus.nama : formData.pegawaiPelulus;

                currentY += 8;
                doc.text("Kepada:", 15, currentY);
                if (pelulusNama) doc.text(pelulusNama, 63.5, currentY-1, {align: 'center'});
                doc.line(32, currentY, 95, currentY);
                currentY += 4;
                doc.text("( Kepada yang meluluskan cuti )", 63.5, currentY, {align: 'center'});

                currentY += 10;
                doc.text("Permohonan cuti diatas * disokong/tidak disokong", 15, currentY);
                currentY += 10;
                doc.text("Tarikh:", 15, currentY); doc.line(28, currentY, 75, currentY);
                doc.line(115, currentY, 190, currentY);
                currentY += 4;
                doc.text("( Tandatangan Ketua Bahagian/Unit )", 152.5, currentY, {align: 'center'});

                currentY += 10;
                doc.text("Permohonan cuti diatas * diluluskan/tidak diluluskan", 15, currentY);
                currentY += 10;
                doc.text("Tarikh:", 15, currentY); doc.line(28, currentY, 75, currentY);
                doc.line(115, currentY, 190, currentY);
                currentY += 4;
                doc.text("( Tandatangan Pegawai Yang Meluluskan Cuti )", 152.5, currentY, {align: 'center'});

                currentY += 8;
                doc.setLineWidth(0.8); doc.line(15, currentY, 195, currentY); doc.setLineWidth(0.2);

                currentY += 6;
                doc.setFont("helvetica", "bold"); doc.text("Untuk Kegunaan Pejabat", 105, currentY, {align: 'center'}); doc.setFont("helvetica", "normal");
                currentY += 7;
                doc.text("Baki cuti pemohon _______ hari. ( Diisi dan ditandatangan ringkas sebelum borang diserah kepada", 15, currentY);
                doc.text("pemohon.", 15, currentY+5);
                currentY += 11;
                doc.text("Pemohon diberitahu dan cuti direkod. (Tindakan ini hendaklah diambil setelah cuti diluluskan).", 15, currentY);
                
                currentY += 10;
                doc.text("Tarikh: ____________________", 15, currentY);
                doc.line(135, currentY, 190, currentY);
                
                currentY += 4;
                doc.text("Nota: * Potong yang tidak berkenaan", 15, currentY);
                doc.text("b.p Pegawai Pentadbiran", 162.5, currentY, {align: 'center'}); 

                currentY += 6;
                doc.text("**Keterangan mengenai cuti yang diambil .", 25, currentY);

                currentY += 6;
                doc.setLineWidth(0.4); doc.line(15, currentY, 195, currentY); doc.setLineWidth(0.2);

                currentY += 8;
                doc.setFont("helvetica", "bold"); doc.text("Kepada:", 15, currentY); doc.setFont("helvetica", "normal");
                doc.line(32, currentY, 125, currentY);
                currentY += 4;
                doc.text("( Nama Pemohon )", 78.5, currentY, {align: 'center'});

                currentY += 8;
                doc.text("Permohonan cuti tuan/ puan telah diluluskan selama", 15, currentY);
                doc.line(98, currentY, 115, currentY);
                doc.text("hari dari", 118, currentY);
                doc.line(132, currentY, 160, currentY);
                doc.text("hingga", 163, currentY);
                doc.line(175, currentY, 195, currentY);

                currentY += 8;
                doc.text("Baki cuti rehat", 15, currentY);
                doc.line(40, currentY, 60, currentY);
                doc.text("hari.", 63, currentY);

                currentY += 14; 
                doc.setLineWidth(0.3);
                doc.line(140, currentY, 195, currentY);
                doc.setLineWidth(0.2);
                currentY += 4;
                doc.setFontSize(11); 
                doc.text("b.p Pegawai Pentadbiran", 167.5, currentY, {align: 'center'});

                currentY += 8;
                doc.setFontSize(8.5);
                doc.text("Nota: Pemakluman mengenai kelulusan cuti tuan / puan adalah seperti yang disenaraikan di papan putih di Bahagian Pentadbiran.", 15, currentY);
            };

            // --- 3. BORANG AKUJANJI INTEGRITI (BARU) ---
            const generateFormAkujanji = (doc, logoImgBase64) => {
                doc.setFont("helvetica", "bold"); doc.setFontSize(10);
                doc.text("LAMPIRAN 11", 190, 15, { align: 'right' });

                let currentY = 25;
                if(logoImgBase64) { 
                    doc.addImage(logoImgBase64, 'JPEG', 92.5, currentY, 25, 20); 
                    currentY += 25; 
                } else { 
                    currentY += 10; 
                }

                doc.setFontSize(10); doc.text("JABATAN TENAGA MANUSIA", 105, currentY, { align: 'center' });
                
                currentY += 15;
                doc.setFontSize(11); doc.text("SURAT AKUJANJI INTEGRITI PEPERIKSAAN AKHIR JTM", 105, currentY, { align: 'center' });

                currentY += 15;
                doc.setFont("helvetica", "normal"); doc.setFontSize(10);
                
                // Paragraph 1 (Teks di atas garisan titik-titik berterusan)
                doc.text("Adalah saya,", 15, currentY);

                doc.setLineWidth(0.4);
                doc.setLineDashPattern([1, 2], 0); // Putus-putus titik
                doc.line(38, currentY, 188, currentY); 
                doc.setLineDashPattern([], 0); // Reset untuk lukis teks biasa
                
                doc.text(val(formData.nama).toUpperCase(), 113, currentY - 1.5, { align: 'center' });
                doc.text(",", 190, currentY);
                
                currentY += 10;
                doc.text("No. Kad Pengenalan", 15, currentY);

                // Justify "yang bertugas" ke margin kanan (x: 190)
                doc.text("yang bertugas", 190, currentY, { align: 'right' });
                
                // Kira ruang automatik untuk garisan supaya bersambung kemas
                let textBertugasW = doc.getTextWidth("yang bertugas");
                let line2End = 190 - textBertugasW - 3;
                let line2Start = 49;
                let line2Center = line2Start + ((line2End - line2Start) / 2);

                doc.setLineDashPattern([1, 2], 0);
                doc.line(line2Start, currentY, line2End, currentY);
                doc.setLineDashPattern([], 0);

                doc.text(val(formData.noKp), line2Center, currentY - 1.5, { align: 'center' });

                currentY += 10;
                doc.text("sebagai", 15, currentY);

                doc.setLineDashPattern([1, 2], 0);
                doc.line(30, currentY, 100, currentY);
                doc.setLineDashPattern([], 0);

                doc.text(val(formData.jawatan).toUpperCase(), 65, currentY - 1.5, { align: 'center' });
                doc.text("di", 103, currentY);
                
                let tempatStr = "ADTEC JTM KAMPUS SANDAKAN";
                doc.setLineDashPattern([1, 2], 0);
                doc.line(108, currentY, 188, currentY);
                doc.setLineDashPattern([], 0);

                doc.text(tempatStr, 148, currentY - 1.5, { align: 'center' });
                doc.text(",", 190, currentY);

                currentY += 10;
                doc.text("yang terlibat secara langsung dalam mengendalikan Peperiksaan Akhir JTM sebagai:", 15, currentY);

                // Jadual Peranan
                currentY += 10;
                let tableData = peperiksaanRoles.map(role => {
                    const isTicked = formData.perananPeperiksaan.includes(role);
                    return [isTicked ? '/' : '', role];
                });

                autoTable({
                    startY: currentY,
                    margin: { left: 20, right: 20 },
                    theme: 'grid',
                    body: tableData,
                    columnStyles: { 
                        0: { cellWidth: 15, halign: 'center', fontStyle: 'bold', fontSize: 12 }, 
                        1: { cellWidth: 'auto' } 
                    },
                    styles: { font: 'helvetica', fontSize: 10, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.3, minCellHeight: 8, valign: 'middle' }
                });

                currentY = doc.lastAutoTable.finalY + 5;
                doc.text("(Tanda /  pada ruangan yang berkenaan dan potong yang tidak berkenaan)", 105, currentY, { align: 'center' });

                // Paragraph 2
                currentY += 15;
                const p2 = "berjanji bahawasanya saya akan menjaga segala kerahsiaan yang berkaitan dengan aktiviti-aktiviti peperiksaan jabatan ini. Saya faham bahawa jika saya membocor maklumat-maklumat berkaitan peperiksaan ini atau melanggar integriti dengan apa cara sekali pun kepada mana-mana pihak maka saya boleh dikenakan tindakan di bawah Akta Rahsia Rasmi 1972.";
                const splitP2 = doc.splitTextToSize(p2, 175);
                doc.text(splitP2, 15, currentY, { align: 'justify', maxWidth: 175 });

                // Bahagian Tandatangan
                currentY += 35;
                doc.text("Yang Benar :", 15, currentY);
                doc.text("Disaksikan oleh :", 120, currentY);

                currentY += 25;
                
                // Letak Imej Tandatangan jika ada
                if (formData.tandatangan) {
                    try {
                        // Saiz dikecilkan sedikit dan kedudukan Y dilaras agar ngam di atas garisan
                        doc.addImage(formData.tandatangan, 'PNG', 17, currentY - 18, 40, 18);
                    } catch(e) {
                        console.warn("Gagal render tandatangan:", e);
                    }
                }

                // Guna titik-titik bagi menggantikan garisan supaya nampak seperti borang manual
                doc.text("..................................................................", 15, currentY);
                doc.text("..................................................................", 120, currentY);

                currentY += 8;
                doc.text("Nama : " + val(formData.nama), 15, currentY);
                doc.text("Nama :", 120, currentY);

                currentY += 8;
                doc.text("Tarikh : " + val(today.split('-').reverse().join('/')), 15, currentY);
                doc.text("Tarikh :", 120, currentY);
            };

            // --- 4. BORANG LAPORAN PEPERIKSAAN ---
            const generateFormLaporan = (doc, logoImgBase64) => {
                doc.setFont("helvetica", "bold"); doc.setFontSize(10);
                doc.text("LAMPIRAN 12", 190, 15, { align: 'right' });

                let currentY = 25;
                if(logoImgBase64) { 
                    doc.addImage(logoImgBase64, 'JPEG', 92.5, currentY, 25, 20); 
                    currentY += 25; 
                } else { 
                    currentY += 10; 
                }

                doc.setFontSize(10); doc.text("JABATAN TENAGA MANUSIA", 105, currentY, { align: 'center' });
                currentY += 6;
                doc.text("LAPORAN PELAKSANAAN PEPERIKSAAN AKHIR", 105, currentY, { align: 'center' });
                
                currentY += 15;
                doc.setFont("helvetica", "normal"); doc.setFontSize(10);
                
                doc.text("PUSAT PEPERIKSAAN", 15, currentY); doc.text(":", 60, currentY); doc.text("KOLEJ TEKNOLOGI TERMAJU (ADTEC) JTM", 63, currentY); currentY += 5;
                doc.text("KAMPUS SANDAKAN, SABAH", 63, currentY); currentY += 7;
                
                doc.text("SESI", 15, currentY); doc.text(":", 60, currentY); doc.text(val(formData.sesiPeperiksaan).toUpperCase(), 63, currentY); currentY += 7;
                
                const tDate = formData.tarikhPeperiksaan ? formData.tarikhPeperiksaan.split('-').reverse().join('/') : '';
                doc.text("TARIKH PEPERIKSAAN", 15, currentY); doc.text(":", 60, currentY); doc.text(tDate, 63, currentY); currentY += 7;
                
                doc.text("NAMA PENGAWAS", 15, currentY); doc.text(":", 60, currentY); 
                const allPengawas = formData.namaPengawasLain ? `${val(formData.nama).toUpperCase()} / ${val(formData.namaPengawasLain).toUpperCase()}` : val(formData.nama).toUpperCase();
                
                const splitPengawas = doc.splitTextToSize(allPengawas, 130);
                doc.text(splitPengawas, 63, currentY);
                currentY += (splitPengawas.length * 5) + 5;

                doc.autoTable({
                    startY: currentY,
                    margin: { left: 15, right: 15 },
                    theme: 'grid',
                    head: [['BIL', 'PERKARA', 'YA', 'TIDAK', 'Nyatakan jika tidak']],
                    body: [
                        ['1.', 'Bilangan kertas soalan dan jawapan mencukupi', formData.q1Status === 'YA' ? '/' : '', formData.q1Status === 'TIDAK' ? '/' : '', formData.q1Catatan.toUpperCase()],
                        ['2.', 'Kesalahan cetakan kertas soalan', formData.q2Status === 'YA' ? '/' : '', formData.q2Status === 'TIDAK' ? '/' : '', formData.q2Catatan.toUpperCase()],
                        ['3.', 'Peperiksaan berjalan lancar', formData.q3Status === 'YA' ? '/' : '', formData.q3Status === 'TIDAK' ? '/' : '', formData.q3Catatan.toUpperCase()],
                    ],
                    headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3 },
                    bodyStyles: { textColor: [0, 0, 0], lineColor: [0,0,0], lineWidth: 0.3, minCellHeight: 12, valign: 'middle' },
                    columnStyles: { 
                        0: { cellWidth: 10, halign: 'center' }, 
                        1: { cellWidth: 70 }, 
                        2: { cellWidth: 15, halign: 'center', fontStyle: 'bold' }, 
                        3: { cellWidth: 15, halign: 'center', fontStyle: 'bold' }, 
                        4: { cellWidth: 'auto' } 
                    },
                    styles: { font: 'helvetica', fontSize: 9 }
                });

                currentY = doc.lastAutoTable.finalY + 10;
                doc.setFont("helvetica", "bold"); doc.text("4. Cadangan (jika ada)", 15, currentY); doc.setFont("helvetica", "normal");
                currentY += 6;
                if(formData.cadanganPeperiksaan) {
                    const splitCadangan = doc.splitTextToSize(formData.cadanganPeperiksaan.toUpperCase(), 180);
                    doc.text(splitCadangan, 15, currentY);
                    currentY += (splitCadangan.length * 5) + 10;
                } else {
                    doc.text("...................................................................................................................................................................................", 15, currentY);
                    currentY += 6;
                    doc.text("...................................................................................................................................................................................", 15, currentY);
                    currentY += 15;
                }

                doc.text("Disediakan oleh Ketua Pengawas :", 15, currentY);
                currentY += 25;
                
                if (formData.tandatangan) {
                    try {
                        doc.addImage(formData.tandatangan, 'PNG', 15, currentY - 18, 40, 18);
                    } catch(e) {}
                }
                
                doc.text("..................................................................", 15, currentY);
                currentY += 6;
                doc.text("Nama : " + val(formData.nama).toUpperCase(), 15, currentY);
                currentY += 6;
                doc.text("Jawatan : " + val(formData.jawatan).toUpperCase(), 15, currentY);
                currentY += 6;
                doc.text("Tarikh : " + tDate, 15, currentY);
            };

            const handleGenerateAll = () => {
                const jsPDFClass = getJSPDF();
                
                if(!jsPDFClass) {
                    showNotification("Sistem sedang memuatkan modul PDF. Sila tunggu sebentar...", "error");
                    return;
                }
                
                if (isLogoLoading) {
                    showNotification("Sistem sedang memuatkan logo Jata Negara. Sila cuba sebentar lagi...", "error");
                    return;
                }

                if (!validateAndScroll()) return;
                
                setIsGenerating(true);

                setTimeout(() => {
                    try {
                        const doc = new jsPDFClass({ format: 'a4' });
                        
                        if (activeForm === 'cuti') {
                            generateFormCuti(doc);
                            const namaFail = formData.nama ? `Borang_Cuti_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_Cuti.pdf';
                            doc.save(namaFail);
                            showNotification("Borang Cuti (Manual) berjaya dijana!");
                        } else if (activeForm === 'akujanji') {
                            generateFormAkujanji(doc, preloadedLogo);
                            const namaFail = formData.nama ? `Akujanji_Peperiksaan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Akujanji_Peperiksaan.pdf';
                            doc.save(namaFail);
                            showNotification("Surat Akujanji Integriti berjaya dijana!");
                        } else if (activeForm === 'laporan') {
                            generateFormLaporan(doc, preloadedLogo);
                            const namaFail = formData.nama ? `Laporan_Peperiksaan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Laporan_Peperiksaan.pdf';
                            doc.save(namaFail);
                            showNotification("Laporan Pelaksanaan Peperiksaan berjaya dijana!");
                        } else {
                            generateForm1(doc, preloadedLogo);
                            
                            const isTugasGanti = formData.subjek.trim() !== '' || formData.namaPengganti.trim() !== '';
                            if (isTugasGanti && formData.namaPengganti !== 'TIADA PENGGANTI') {
                                doc.addPage();
                                generateForm2(doc, preloadedLogo);
                            }

                            if (formData.caraPerjalanan === 'Kapal Terbang') {
                                doc.addPage();
                                generateForm3(doc); 
                            }
                            
                            const namaFail = formData.nama ? `Borang_TugasRasmi_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_TugasRasmi.pdf';
                            doc.save(namaFail);
                            showNotification("Semua dokumen rasmi berjaya disatukan ke dalam 1 fail PDF!");
                        }
                        setIsGenerating(false);

                        // ===== LOGIK AUTO RESET SELEPAS BERJAYA JANA =====
                        setTimeout(() => {
                            setFormData(prev => ({
                                ...prev,
                                // Kekalkan profil (nama, jawatan, bahagian, nokp, notel), reset ruangan borang sahaja
                                tujuan: '', tempat: '', tarikhPergi: today, tarikhBalik: today, km: '', caraPerjalanan: 'Kereta Sendiri', 
                                sebab1: false, sebab2: false, sebab3: false, tuntutanBatu: false, tuntutanGantian: false, noKenderaan: '',
                                subjek: '', semester: '', tarikhGantiDari: today, tarikhGantiHingga: today, catatanTugas: '', namaPengganti: '', bahagianPengganti: '', noTelPengganti: '', jenisAmbilAlih: 'Ambil alih subjek / tugas sepenuhnya',
                                flightPergiTarikh: today, flightPergiMasa: '', flightPergiDari: '', flightPergiKe: '',
                                flightBalikTarikh: today, flightBalikMasa: '', flightBalikDari: '', flightBalikKe: '', kodSyarikat: '', enrichId: '',
                                jenisCuti: 'Cuti Rehat', cutiDari: today, cutiHingga: today, catatanCuti: '', ketuaSokongan: '', pegawaiPelulus: '',
                                perananPeperiksaan: [], tandatangan: null,
                                sesiPeperiksaan: '', tarikhPeperiksaan: today, namaPengawasLain: '', q1Status: 'YA', q1Catatan: '', q2Status: 'TIDAK', q2Catatan: '', q3Status: 'YA', q3Catatan: '', cadanganPeperiksaan: ''
                            }));
                            
                            // Padam kanvas tandatangan
                            const canvas = canvasRef.current;
                            if(canvas) {
                                const ctx = canvas.getContext('2d');
                                ctx.clearRect(0, 0, canvas.width, canvas.height);
                            }
                            
                            // Kembali ke halaman utama dan reset section yang terbuka
                            setActiveForm(null); 
                            setExpanded({ pegawai: true, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false });
                            
                            showNotification("Borang telah direset untuk permohonan baharu.", "success");
                        }, 2500); // Tunggu 2.5 saat sebelum reset
                        
                    } catch (error) {
                        console.error(error);
                        setIsGenerating(false);
                        showNotification("Ralat berlaku semasa menjana fail.", "error");
                    }
                }, 150);
            };

            const LockIcon = () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
            );

            const EditIcon = () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>
            );
            
            const UnlockIcon = () => (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>
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

            if (activeForm === null) {
                return (
                    <div className="min-h-screen relative flex flex-col justify-center overflow-hidden px-4 sm:px-6 animate-slide-up">
                        <div className="fixed top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] pointer-events-none"></div>
                        <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] pointer-events-none"></div>

                        <div className="max-w-5xl mx-auto w-full relative z-10 pt-10 pb-16">
                            <div className="text-center mb-12">
                                <div className="inline-flex items-center justify-center p-4 bg-white rounded-[2rem] mb-8 shadow-xl shadow-slate-200/50 border border-slate-100 transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                                    {isLogoLoading ? (
                                        <div className="w-16 h-16 rounded-full border-[4px] border-slate-100 border-t-blue-600 animate-spin"></div>
                                    ) : preloadedLogo ? (
                                        <img src={preloadedLogo} alt="Logo" className="h-20 w-auto object-contain drop-shadow-sm" />
                                    ) : (
                                        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-blue-600"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
                                    )}
                                </div>
                                <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-6">
                                    i-Form Management System (iFMS) <br />
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500">ADTEC JTM Kampus Sandakan</span>
                                </h1>
                                <p className="text-[17px] md:text-xl text-slate-500 font-semibold max-w-2xl mx-auto mb-12 leading-relaxed">
                                    Sistem pengurusan dan penjanaan dokumen rasmi secara digital, pantas dan sistematik.
                                </p>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                                    <button 
                                        onClick={() => { setActiveForm('tugas'); setExpanded({...expanded, cuti: false, peranan: false, tandatangan: false, tugas: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }}
                                        className="w-full px-6 py-5 bg-slate-900 hover:bg-slate-800 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <div className="bg-slate-700 p-3 rounded-2xl group-hover:bg-slate-600 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                        </div>
                                        <span>Borang Tugas Rasmi</span>
                                    </button>
                                    
                                    <button 
                                        onClick={() => { setActiveForm('akujanji'); setExpanded({...expanded, tugas: false, tiket: false, cuti: false, pengganti: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }}
                                        className="w-full px-6 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <div className="bg-indigo-500 p-3 rounded-2xl group-hover:bg-indigo-400 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                                        </div>
                                        <span>Surat Akujanji Peperiksaan</span>
                                    </button>

                                    <button 
                                        onClick={() => { setActiveForm('laporan'); setExpanded({...expanded, tugas: false, peranan: false, tandatangan: false, cuti: false, pengganti: false, tiket: false, pegawai: true}); }}
                                        className="w-full px-6 py-5 bg-amber-500 hover:bg-amber-400 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <div className="bg-amber-400 p-3 rounded-2xl group-hover:bg-amber-300 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                                        </div>
                                        <span>Laporan Peperiksaan</span>
                                    </button>

                                    <button 
                                        onClick={() => { setActiveForm('cuti'); setExpanded({...expanded, tugas: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }}
                                        className="w-full px-6 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group"
                                    >
                                        <div className="bg-emerald-500 p-3 rounded-2xl group-hover:bg-emerald-400 transition-colors">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg>
                                        </div>
                                        <span>Borang Cuti (Manual)</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto px-4 mt-12">
                                <div className="bg-white/70 backdrop-blur-xl border border-white p-7 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-blue-100/80 text-blue-600 rounded-2xl flex items-center justify-center mb-5 border border-blue-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                                    </div>
                                    <h3 className="text-[17px] font-extrabold text-slate-800 mb-2.5">Penjanaan PDF Automatik</h3>
                                    <p className="text-[14px] text-slate-500 font-semibold leading-relaxed">Format Lampiran JTM rasmi disusun dan dijanakan terus tanpa perlu aplikasi luaran.</p>
                                </div>
                                <div className="bg-white/70 backdrop-blur-xl border border-white p-7 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-indigo-100/80 text-indigo-600 rounded-2xl flex items-center justify-center mb-5 border border-indigo-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                                    </div>
                                    <h3 className="text-[17px] font-extrabold text-slate-800 mb-2.5">Tandatangan Digital Pintar</h3>
                                    <p className="text-[14px] text-slate-500 font-semibold leading-relaxed">Lukis terus di skrin atau muat naik gambar sign. Sistem automatik buang latar belakang.</p>
                                </div>
                                <div className="bg-white/70 backdrop-blur-xl border border-white p-7 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_15px_40px_rgb(0,0,0,0.08)] transition-all transform hover:-translate-y-1">
                                    <div className="w-14 h-14 bg-emerald-100/80 text-emerald-600 rounded-2xl flex items-center justify-center mb-5 border border-emerald-200">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect><line x1="12" y1="18" x2="12.01" y2="18"></line></svg>
                                    </div>
                                    <h3 className="text-[17px] font-extrabold text-slate-800 mb-2.5">Mesra Peranti</h3>
                                    <p className="text-[14px] text-slate-500 font-semibold leading-relaxed">Antara muka adaptif yang berfungsi cemerlang dari desktop, tablet hinggalah ke pintar anda.</p>
                                </div>
                            </div>
                            
                            <div className="text-center mt-12 opacity-80 hover:opacity-100 transition-opacity">
                                <p className="text-[13px] font-bold text-slate-500 tracking-wide">&copy; 2026 Kolej Teknologi Termaju Jabatan Tenaga Manusia (ADTEC) Kampus Sandakan. Hak cipta terpelihara.</p>
                            </div>
                        </div>
                    </div>
                );
            }

            return (
                <div className="pb-12 relative min-h-screen">
                    <div className="absolute top-6 left-4 md:left-6 z-50 animate-slide-up">
                        <button 
                            onClick={() => setActiveForm(null)} 
                            className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-[13px] font-extrabold text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:shadow-md shadow-sm transition-all group"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                            <span className="hidden sm:block">Halaman Utama</span>
                        </button>
                    </div>

                    <header className="relative pt-16 pb-10 px-6 max-w-3xl mx-auto text-center">
                        <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 text-white shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 ${activeForm === 'cuti' ? 'bg-emerald-600 shadow-emerald-500/30' : activeForm === 'akujanji' ? 'bg-indigo-600 shadow-indigo-500/30' : activeForm === 'laporan' ? 'bg-amber-500 shadow-amber-500/30' : 'bg-blue-600 shadow-blue-500/30'}`}>
                            {activeForm === 'cuti' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                            ) : activeForm === 'akujanji' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                            ) : activeForm === 'laporan' ? (
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                            )}
                        </div>
                        <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                            {activeForm === 'cuti' ? 'Borang Cuti Manual' : activeForm === 'akujanji' ? 'Surat Akujanji Peperiksaan' : activeForm === 'laporan' ? 'Laporan Peperiksaan Akhir' : 'Borang Tugas Rasmi'} <br />
                            <span className={`text-transparent bg-clip-text bg-gradient-to-r ${activeForm === 'cuti' ? 'from-emerald-600 to-teal-500' : activeForm === 'akujanji' ? 'from-indigo-600 to-purple-600' : activeForm === 'laporan' ? 'from-amber-500 to-orange-600' : 'from-blue-600 to-indigo-600'}`}>ADTEC JTM Kampus Sandakan</span>
                        </h1>
                        <p className="mt-4 text-[16px] md:text-lg text-slate-500 font-medium max-w-xl mx-auto">
                            Lengkapkan maklumat langkah demi langkah. Sistem akan menjana lampiran PDF secara automatik.
                        </p>
                    </header>

                    {/* PROGRESS BAR */}
                    <div className="max-w-[800px] mx-auto px-6 mb-10 relative z-20">
                        <div className="relative">
                            <div className="absolute top-5 left-0 w-full h-1.5 bg-slate-200/60 rounded-full -translate-y-1/2"></div>
                            <div className={`absolute top-5 left-0 h-1.5 rounded-full bg-gradient-to-r transition-all duration-1000 ease-out -translate-y-1/2 ${activeForm === 'cuti' ? 'from-blue-500 to-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]' : activeForm === 'akujanji' ? 'from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]' : activeForm === 'laporan' ? 'from-amber-400 via-orange-500 to-purple-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]' : 'from-blue-500 via-indigo-500 via-teal-500 to-emerald-500 shadow-[0_0_10px_rgba(99,102,241,0.4)]'}`} style={{ width: `${progressWidth}%` }}></div>
                            
                            {activeForm === 'cuti' ? (
                                <div className="relative flex justify-between items-start">
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s1Done ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 ring-[5px] ring-[#f8fafc]' : 'bg-white text-blue-600 border-[2.5px] border-blue-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-blue-500/20'}`}>
                                            {s1Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '1'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s1Done ? 'text-blue-600' : 'text-blue-600'}`}>Pegawai</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s4Done ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/40 ring-[5px] ring-[#f8fafc]' : (s1Done ? 'bg-white text-emerald-600 border-[2.5px] border-emerald-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-emerald-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s4Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '2'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s4Done ? 'text-emerald-600' : (s1Done ? 'text-emerald-600' : 'text-slate-400')}`}>Maklumat Cuti</span>
                                    </div>
                                </div>
                            ) : activeForm === 'akujanji' ? (
                                <div className="relative flex justify-between items-start">
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s1Done ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 ring-[5px] ring-[#f8fafc]' : 'bg-white text-blue-600 border-[2.5px] border-blue-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-blue-500/20'}`}>
                                            {s1Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '1'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s1Done ? 'text-blue-600' : 'text-blue-600'}`}>Pegawai</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s2Done ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-[5px] ring-[#f8fafc]' : (s1Done ? 'bg-white text-indigo-600 border-[2.5px] border-indigo-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-indigo-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s2Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '2'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s2Done ? 'text-indigo-600' : (s1Done ? 'text-indigo-600' : 'text-slate-400')}`}>Peranan</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s3Done ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/40 ring-[5px] ring-[#f8fafc]' : (s2Done ? 'bg-white text-purple-600 border-[2.5px] border-purple-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-purple-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s3Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '3'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s3Done ? 'text-purple-600' : (s2Done ? 'text-purple-600' : 'text-slate-400')}`}>Selesai</span>
                                    </div>
                                </div>
                            ) : activeForm === 'laporan' ? (
                                <div className="relative flex justify-between items-start">
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s1Done ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-lg shadow-amber-500/40 ring-[5px] ring-[#f8fafc]' : 'bg-white text-amber-600 border-[2.5px] border-amber-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-amber-500/20'}`}>
                                            {s1Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '1'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s1Done ? 'text-amber-600' : 'text-amber-600'}`}>Pegawai</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s2Done ? 'bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/40 ring-[5px] ring-[#f8fafc]' : (s1Done ? 'bg-white text-orange-600 border-[2.5px] border-orange-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-orange-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s2Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '2'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s2Done ? 'text-orange-600' : (s1Done ? 'text-orange-600' : 'text-slate-400')}`}>Maklumat</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s3Done ? 'bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg shadow-red-500/40 ring-[5px] ring-[#f8fafc]' : (s2Done ? 'bg-white text-red-600 border-[2.5px] border-red-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-red-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s3Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '3'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s3Done ? 'text-red-600' : (s2Done ? 'text-red-600' : 'text-slate-400')}`}>Status</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s4Done ? 'bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-lg shadow-purple-500/40 ring-[5px] ring-[#f8fafc]' : (s3Done ? 'bg-white text-purple-600 border-[2.5px] border-purple-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-purple-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s4Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '4'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s4Done ? 'text-purple-600' : (s3Done ? 'text-purple-600' : 'text-slate-400')}`}>Selesai</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="relative flex justify-between items-start">
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s1Done ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg shadow-blue-500/40 ring-[5px] ring-[#f8fafc]' : 'bg-white text-blue-600 border-[2.5px] border-blue-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-blue-500/20'}`}>
                                            {s1Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '1'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s1Done ? 'text-blue-600' : 'text-blue-600'}`}>Pegawai</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s2Done ? 'bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-lg shadow-indigo-500/40 ring-[5px] ring-[#f8fafc]' : (s1Done ? 'bg-white text-indigo-600 border-[2.5px] border-indigo-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-indigo-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s2Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '2'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s2Done ? 'text-indigo-600' : (s1Done ? 'text-indigo-600' : 'text-slate-400')}`}>Tugasan</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s3Done ? 'bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-lg shadow-teal-500/40 ring-[5px] ring-[#f8fafc]' : (s2Done ? 'bg-white text-teal-600 border-[2.5px] border-teal-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-teal-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s3Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '3'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s3Done ? 'text-teal-600' : (s2Done ? 'text-teal-600' : 'text-slate-400')}`}>Pengganti</span>
                                    </div>
                                    <div className="flex flex-col items-center gap-2.5 group">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-[14px] transition-all duration-500 z-10 ${s4Done ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-lg shadow-emerald-500/40 ring-[5px] ring-[#f8fafc]' : (s3Done ? 'bg-white text-emerald-600 border-[2.5px] border-emerald-500 ring-[5px] ring-[#f8fafc] shadow-md shadow-emerald-500/20' : 'bg-white text-slate-400 border-2 border-slate-200')}`}>
                                            {s4Done ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : '4'}
                                        </div>
                                        <span className={`text-[11px] font-extrabold uppercase tracking-widest transition-colors ${s4Done ? 'text-emerald-600' : (s3Done ? 'text-emerald-600' : 'text-slate-400')}`}>Selesai</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {notification.show && (
                        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
                            <div className={`px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${notification.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-700' : 'bg-emerald-50/90 border-emerald-200 text-emerald-700'}`}>
                                {notification.type === 'error' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
                                )}
                                <span className="font-bold text-[14px]">{notification.message}</span>
                            </div>
                        </div>
                    )}

                    {isLogoLoading && (
                        <div className="max-w-[800px] mx-auto px-4 mb-4">
                            <div className="flex items-center justify-center gap-3 bg-amber-50/90 border border-amber-200 rounded-2xl px-5 py-3 animate-pulse-slow">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                <span className="text-[13px] font-bold text-amber-700">Memuatkan aset borang (Jata Negara)...</span>
                            </div>
                        </div>
                    )}

                    <div className="max-w-[800px] mx-auto px-4 space-y-5 relative z-10">
                        
                        {/* 1. MAKLUMAT PEGAWAI (Digunakan untuk semua form) */}
                        <div id="section-pegawai" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden transition-all duration-500 ${expanded.pegawai ? 'ring-[3px] ring-blue-500/20' : 'hover:shadow-md'} ${shakeSection === 'pegawai' ? 'animate-shake border-red-400' : ''}`}>
                            <div onClick={() => toggleSection('pegawai')} className="cursor-pointer px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className={`p-2.5 rounded-xl transition-colors ${expanded.pegawai ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : (isPegawaiComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600')}`}>
                                        {isPegawaiComplete && !expanded.pegawai ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                                        )}
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-extrabold text-slate-800">Maklumat Pegawai {isPegawaiComplete && !expanded.pegawai && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                                        {!expanded.pegawai && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{formData.nama || 'Wajib dilengkapkan dahulu'}</p>}
                                    </div>
                                </div>
                                <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.pegawai ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-400'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                </div>
                            </div>
                            
                            {expanded.pegawai && (
                                <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                                        <div className="md:col-span-2">
                                            <label className={formLabelClass}>Nama Penuh <span className="text-red-500">*</span></label>
                                            <div className="relative">
                                                <select 
                                                    id="wrap-nama"
                                                    name="nama" 
                                                    value={formData.nama} 
                                                    onChange={handleChange}
                                                    className={`block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 hover:border-slate-300 appearance-none cursor-pointer relative z-10 ${formData.nama ? 'text-slate-800' : 'text-slate-400 font-medium'}`}
                                                >
                                                    <option value="" disabled>-- Sila Pilih Nama Anda --</option>
                                                    {[...pegawaiDatabase].sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                                        <option key={idx} value={p.nama}>{p.nama} ({p.bahagian})</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div>
                                            <label className={formLabelClass}>
                                                Jawatan <span className="text-red-500">*</span> 
                                                {isKnownStaff && (
                                                    <button 
                                                        type="button"
                                                        onClick={toggleAutoFieldsEdit}
                                                        className={`ml-2 normal-case font-bold text-[10px] px-2 py-0.5 rounded-md border transition-all ${isEditingAutoFields ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-blue-50 text-blue-500 border-blue-100 hover:bg-blue-100'}`}
                                                        title={isEditingAutoFields ? "Kembali ke data rasmi" : "Edit data secara manual"}
                                                    >
                                                        {isEditingAutoFields ? <span className="flex items-center gap-1"><UnlockIcon /> Tutup Edit</span> : <span className="flex items-center gap-1"><EditIcon /> Edit</span>}
                                                    </button>
                                                )}
                                            </label>
                                            <input 
                                                id="wrap-jawatan"
                                                type="text" 
                                                name="jawatan" 
                                                value={formData.jawatan} 
                                                onChange={handleChange} 
                                                className={`${formInputClass} ${isKnownStaff && !isEditingAutoFields ? 'bg-slate-50/70 text-slate-500 border-slate-200 cursor-not-allowed opacity-80' : ''}`} 
                                                placeholder="Contoh: Pengajar" 
                                                readOnly={isKnownStaff && !isEditingAutoFields} 
                                            />
                                        </div>
                                        
                                        <div>
                                            <UniversalSelect 
                                                wrapperId="wrap-bahagian"
                                                name="bahagian" 
                                                value={formData.bahagian} 
                                                label={<>Bahagian / Unit <span className="text-red-500">*</span> {isKnownStaff && !isEditingAutoFields && <span className="text-blue-500 ml-2 normal-case font-bold text-[10px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">Auto-isi</span>}</>} 
                                                options={unitOptions} 
                                                onChange={handleChange} 
                                                placeholder="Pilih Unit" 
                                                disabled={isKnownStaff && !isEditingAutoFields} 
                                            />
                                        </div>
                                        
                                        <div>
                                            <label className={formLabelClass}>No. Kad Pengenalan <span className="text-red-500">*</span></label>
                                            <input id="wrap-noKp" type="text" name="noKp" value={formData.noKp} onChange={handleChange} className={formInputClass} placeholder="000000-00-0000" />
                                        </div>
                                        {(activeForm !== 'akujanji' && activeForm !== 'laporan') && (
                                            <div>
                                                <label className={formLabelClass}>No. Telefon <span className="text-red-500">*</span></label>
                                                <input id="wrap-noTel" type="text" name="noTel" value={formData.noTel} onChange={handleChange} className={formInputClass} placeholder="01X-XXXXXXX" />
                                            </div>
                                        )}
                                    </div>
                                    <div className="mt-8 flex justify-end">
                                        <button onClick={() => nextSection('pegawai', activeForm === 'cuti' ? 'cuti' : activeForm === 'akujanji' ? 'peranan' : activeForm === 'laporan' ? 'laporanInfo' : 'tugas')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                            Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* SEKSYEN KHAS UNTUK BORANG CUTI */}
                        {activeForm === 'cuti' && (
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
                                                    options={["Cuti Rehat", "Cuti Kecemasan", "Cuti Tanpa Rekod"]} 
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
                                                                className={`block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold shadow-sm transition-all duration-300 focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 appearance-none relative z-10 cursor-pointer ${formData.pegawaiPelulus ? 'text-slate-800' : 'text-slate-400 font-medium'}`}
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
                        )}

                        {/* SEKSYEN KHAS UNTUK AKUJANJI INTEGRITI */}
                        {activeForm === 'akujanji' && (
                            <>
                                {/* PERANAN PEPERIKSAAN */}
                                <div id="section-peranan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPegawaiComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.peranan ? 'border-slate-100 ring-[3px] ring-indigo-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'peranan' ? 'animate-shake border-red-400' : ''}`}>
                                    <div onClick={() => isPegawaiComplete && toggleSection('peranan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPegawaiComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-xl transition-colors ${!isPegawaiComplete ? 'bg-slate-200 text-slate-500' : (expanded.peranan ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30' : (isPerananComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-indigo-50 text-indigo-600'))}`}>
                                                {!isPegawaiComplete ? <LockIcon /> : (isPerananComplete && !expanded.peranan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-extrabold text-slate-800">Peranan Peperiksaan {isPerananComplete && !expanded.peranan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                                                {!expanded.peranan && isPegawaiComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isPerananComplete ? `${formData.perananPeperiksaan.length} peranan dipilih` : 'Sila tandakan peranan anda'}</p>}
                                            </div>
                                        </div>
                                        {isPegawaiComplete && (
                                            <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.peranan ? 'rotate-180 bg-indigo-50 text-indigo-600' : 'text-slate-400'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        )}
                                    </div>

                                    {expanded.peranan && isPegawaiComplete && (
                                        <div className="p-6 md:p-8 pt-2 border-t border-slate-100 animate-slide-up">
                                            <label className={formLabelClass}>Sila tandakan ruangan yang berkenaan <span className="text-red-500">*</span></label>
                                            <div id="wrap-peranan" className="mt-4 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-4 sm:p-6 transition-all duration-300">
                                                <div className="flex flex-col gap-3">
                                                    {peperiksaanRoles.map((role, idx) => (
                                                        <label key={idx} className={`flex items-center gap-4 p-3 rounded-xl border-2 cursor-pointer transition-all ${formData.perananPeperiksaan.includes(role) ? 'bg-indigo-50 border-indigo-400' : 'bg-white border-slate-200 hover:border-indigo-300'}`}>
                                                            <input 
                                                                type="checkbox" 
                                                                checked={formData.perananPeperiksaan.includes(role)} 
                                                                onChange={() => handleCheckboxPeranan(role)} 
                                                                className="custom-checkbox flex-shrink-0" 
                                                            />
                                                            <span className={`text-[14px] sm:text-[15px] font-bold ${formData.perananPeperiksaan.includes(role) ? 'text-indigo-700' : 'text-slate-600'}`}>{role}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            
                                            <div className="mt-8 flex justify-end">
                                                <button onClick={() => nextSection('peranan', 'tandatangan')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                                    Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* TANDATANGAN DIGITAL */}
                                <div id="section-tandatangan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isPerananComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.tandatangan ? 'border-slate-100 ring-[3px] ring-purple-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'tandatangan' ? 'animate-shake border-red-400' : ''}`}>
                                    <div onClick={() => isPerananComplete && toggleSection('tandatangan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isPerananComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-xl transition-colors ${!isPerananComplete ? 'bg-slate-200 text-slate-500' : (expanded.tandatangan ? 'bg-purple-600 text-white shadow-md shadow-purple-500/30' : (isTandatanganComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-purple-50 text-purple-600'))}`}>
                                                {!isPerananComplete ? <LockIcon /> : (isTandatanganComplete && !expanded.tandatangan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>)}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-extrabold text-slate-800">Tandatangan Digital {isTandatanganComplete && !expanded.tandatangan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                                                {!expanded.tandatangan && isPerananComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isTandatanganComplete ? 'Tandatangan telah disimpan' : 'Sila lukis atau muat naik sign'}</p>}
                                            </div>
                                        </div>
                                        {isPerananComplete && (
                                            <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.tandatangan ? 'rotate-180 bg-purple-50 text-purple-600' : 'text-slate-400'}`}>
                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                                            </div>
                                        )}
                                    </div>

                                    {expanded.tandatangan && isPerananComplete && (
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
                        )}

                        {/* SEKSYEN KHAS UNTUK LAPORAN PEPERIKSAAN */}
                        {activeForm === 'laporan' && (
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

                                {/* STATUS & CADANGAN (Laporan) */}
                                <div id="section-laporanSoalan" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border overflow-hidden transition-all duration-500 ${!isLaporanInfoComplete ? 'border-slate-200/50 opacity-60 grayscale-[20%]' : (expanded.laporanSoalan ? 'border-slate-100 ring-[3px] ring-red-500/20' : 'border-slate-100 hover:shadow-md')} ${shakeSection === 'laporanSoalan' ? 'animate-shake border-red-400' : ''}`}>
                                    <div onClick={() => isLaporanInfoComplete && toggleSection('laporanSoalan')} className={`px-6 py-5 flex items-center justify-between transition-colors ${!isLaporanInfoComplete ? 'bg-slate-50/50 cursor-not-allowed' : 'bg-white hover:bg-slate-50 cursor-pointer'}`}>
                                        <div className="flex items-center gap-4">
                                            <div className={`p-2.5 rounded-xl transition-colors ${!isLaporanInfoComplete ? 'bg-slate-200 text-slate-500' : (expanded.laporanSoalan ? 'bg-red-500 text-white shadow-md shadow-red-500/30' : (isLaporanSoalanComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'))}`}>
                                                {!isLaporanInfoComplete ? <LockIcon /> : (isLaporanSoalanComplete && !expanded.laporanSoalan ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>)}
                                            </div>
                                            <div>
                                                <h2 className="text-lg font-extrabold text-slate-800">Status & Cadangan {isLaporanSoalanComplete && !expanded.laporanSoalan && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                                                {!expanded.laporanSoalan && isLaporanInfoComplete && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{isLaporanSoalanComplete ? `Status peperiksaan direkod` : 'Sila jawab soalselidik'}</p>}
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
                                                {/* Q1 */}
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

                                                {/* Q2 */}
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

                                                {/* Q3 */}
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

                                {/* TANDATANGAN DIGITAL (Didaur semula) */}
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
                                            {/* Reuse same tandatangan content structure */}
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
                        )}

                        {/* SEKSYEN TUGAS RASMI: 2. BUTIRAN TUGAS */}
                        {activeForm === 'tugas' && (
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
                        )}

                        {/* SEKSYEN TUGAS RASMI: 3. TUGAS SEMENTARA PENGGANTI */}
                        {activeForm === 'tugas' && (
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
                        )}

                        {/* SEKSYEN TUGAS RASMI: 4. TIKET PENERBANGAN */}
                        {activeForm === 'tugas' && (
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
                                                    <div className="flex items-center justify-between mb-8">
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

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                                                        <ModernDatePicker name="flightPergiTarikh" value={formData.flightPergiTarikh} label="Tarikh Berlepas" onChange={handleChange} slim={true} />
                                                        <ModernTimePicker wrapperId="wrap-flightPergiMasa" name="flightPergiMasa" value={formData.flightPergiMasa} label={<>Masa Pergi <span className="text-red-500">*</span></>} onChange={handleChange} slim={true} />
                                                    </div>
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
                                                    <div className="flex items-center justify-between mb-8">
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

                                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-slate-100 pt-6">
                                                        <ModernDatePicker name="flightBalikTarikh" value={formData.flightBalikTarikh} label="Tarikh Pulang" min={formData.flightPergiTarikh} onChange={handleChange} slim={true} />
                                                        <ModernTimePicker wrapperId="wrap-flightBalikMasa" name="flightBalikMasa" value={formData.flightBalikMasa} label={<>Masa Balik <span className="text-red-500">*</span></>} onChange={handleChange} slim={true} />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* MAKLUMAT TAMBAHAN (Syarikat & Keahlian) */}
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
                        )}

                        {/* ★★★ BUTANG JANA DENGAN STATUS LOGO ★★★ */}
                        <div id="jana-button-container" className="mt-12 mb-16 animate-slide-up" style={{animationDelay: '0.5s'}}>
                            <button 
                                onClick={handleGenerateAll}
                                disabled={isGenerating || isLogoLoading}
                                className={`group relative w-full flex items-center justify-center gap-4 py-5 px-8 rounded-3xl overflow-hidden transition-all duration-300 ${isGenerating || isLogoLoading ? 'bg-slate-300 cursor-not-allowed opacity-80' : (!isAllComplete ? 'bg-amber-500 hover:bg-amber-400 shadow-[0_15px_40px_-10px_rgba(245,158,11,0.4)]' : activeForm === 'akujanji' ? 'bg-purple-600 hover:bg-purple-500 shadow-[0_15px_40px_-10px_rgba(168,85,247,0.4)]' : 'bg-emerald-600 hover:bg-emerald-500 shadow-[0_15px_40px_-10px_rgba(16,185,129,0.4)]')} transform hover:-translate-y-1 active:scale-[0.98]`}
                            >
                                {!isGenerating && !isLogoLoading && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                                )}
                                <div className="relative z-10 flex items-center gap-3 text-white">
                                    {isLogoLoading ? (
                                        <React.Fragment>
                                            <svg className="animate-spin h-6 w-6 text-slate-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                            <span className="text-[14px] sm:text-[16px] font-extrabold tracking-wide uppercase text-slate-600">MEMUATKAN ASET...</span>
                                        </React.Fragment>
                                    ) : isGenerating ? (
                                        <svg className="animate-spin h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                    ) : (
                                        !isAllComplete ? (
                                            <div className="bg-amber-600/30 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                            </div>
                                        ) : (
                                            <div className="bg-white/20 p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                            </div>
                                        )
                                    )}
                                    <span className="text-[14px] sm:text-[16px] font-extrabold tracking-wide uppercase">
                                        {isLogoLoading ? 'SEDANG MEMUATKAN ASET BORANG' : 
                                         isGenerating ? 'MENJANA BORANG... SILA TUNGGU' : 
                                         (!isPegawaiComplete ? 'KLIK UNTUK ISI MAKLUMAT PEGAWAI' : 
                                          (activeForm === 'tugas' && !isTugasComplete) ? 'KLIK UNTUK ISI MAKLUMAT TUGASAN' : 
                                          (activeForm === 'tugas' && !isPenggantiComplete) ? 'KLIK UNTUK ISI MAKLUMAT PENGGANTI' : 
                                          (activeForm === 'cuti' && !isCutiComplete) ? 'KLIK UNTUK ISI MAKLUMAT CUTI' : 
                                          (activeForm === 'akujanji' && !isPerananComplete) ? 'KLIK UNTUK ISI PERANAN' :
                                          (activeForm === 'akujanji' && !isTandatanganComplete) ? 'KLIK UNTUK ISI TANDATANGAN' :
                                          (activeForm === 'tugas' && !isTiketComplete) ? 'KLIK UNTUK ISI MAKLUMAT TIKET' : 
                                          'JANA & MUAT TURUN (FAIL PDF)')}
                                    </span>
                                </div>
                            </button>
                        </div>

                        {/* FLOATING BUTTON MOBILE */}
                        {!isLogoLoading && activeForm !== null && (
                            <button 
                                onClick={handleGenerateAll}
                                disabled={isGenerating}
                                className={`fixed bottom-6 right-6 md:hidden z-50 p-4 rounded-full shadow-xl active:scale-95 transition-all text-white ${!isAllComplete ? 'bg-amber-500 hover:bg-amber-400' : activeForm === 'akujanji' ? 'bg-purple-600 hover:bg-purple-500' : 'bg-emerald-600 hover:bg-emerald-500'}`}
                            >
                                {isGenerating ? (
                                    <svg className="animate-spin h-7 w-7 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                ) : !isAllComplete ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            );
        }

export default App;
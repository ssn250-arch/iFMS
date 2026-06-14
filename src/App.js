import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import './index.css';

// Import Data
import { unitOptions, peperiksaanRoles, pegawaiDatabase, malaysiaAirports } from './data/database';

// Import Komponen UI & Borang
import UniversalSelect from './components/ui/UniversalSelect';
import FeedbackButton from './components/FeedbackButton';
import FormTugas from './components/forms/FormTugas';
import FormCuti from './components/forms/FormCuti';
import FormAkujanji from './components/forms/FormAkujanji';
import FormLaporan from './components/forms/FormLaporan';

// Import Logik PDF
import { generateForm1, generateForm2, generateForm3, generateFormCuti, generateFormAkujanji, generateFormLaporan } from './utils/pdfGenerator';

// ================== KONSTAN KELAS ==================
const formInputClass = "block w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-[15px] font-semibold text-slate-800 shadow-sm transition-all duration-300 placeholder:text-slate-400 placeholder:font-medium focus:border-blue-500 focus:outline-none focus:ring-[4px] focus:ring-blue-500/10 hover:border-slate-300";
const formLabelClass = "block text-[13px] font-bold uppercase tracking-wider text-slate-500 mb-2 ml-1";

// ================== IKON BANTUAN ==================
const LockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>);
const EditIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"/></svg>);
const UnlockIcon = () => (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 9.9-1"/></svg>);

function App() {
    const [activeForm, setActiveForm] = useState(null);
    const today = new Date().toISOString().split('T')[0];
    
    const [formData, setFormData] = useState({
        nama: '', jawatan: '', bahagian: '', noKp: '', noTel: '', noKenderaan: '',
        tujuan: '', tempat: '', tarikhPergi: today, tarikhBalik: today, km: '', caraPerjalanan: 'Kereta Sendiri', 
        sebab1: false, sebab2: false, sebab3: false, tuntutanBatu: false, tuntutanGantian: false,
        subjek: '', semester: '', tarikhGantiDari: today, tarikhGantiHingga: today, catatanTugas: '', namaPengganti: '', bahagianPengganti: '', noTelPengganti: '', jenisAmbilAlih: 'Ambil alih subjek / tugas sepenuhnya',
        flightType: 'single',
        flightPergiTarikh: today, flightPergiMasa: '', flightPergiDari: '', flightPergiKe: '',
        flightPergiLeg2Tarikh: today, flightPergiLeg2Masa: '', flightPergiLeg2Dari: '', flightPergiLeg2Ke: '',
        flightBalikTarikh: today, flightBalikMasa: '', flightBalikDari: '', flightBalikKe: '',
        flightBalikLeg2Tarikh: today, flightBalikLeg2Masa: '', flightBalikLeg2Dari: '', flightBalikLeg2Ke: '',
        kodSyarikat: '', enrichId: '',
        jenisCuti: 'Cuti Rehat', cutiDari: today, cutiHingga: today, catatanCuti: '', ketuaSokongan: '', pegawaiPelulus: '',
        cutiPenggantiNama: '', cutiPenggantiBahagian: '', cutiPenggantiNoTel: '', cutiPenggantiTugas: '',
        perananPeperiksaan: [], tandatangan: null,
        sesiPeperiksaan: '', tarikhPeperiksaan: today, namaPengawasLain: '',
        q1Status: 'YA', q1Catatan: '', q2Status: 'TIDAK', q2Catatan: '', q3Status: 'YA', q3Catatan: '', cadanganPeperiksaan: ''
    });

    const [preloadedLogo, setPreloadedLogo] = useState(null);
    const [isLogoLoading, setIsLogoLoading] = useState(true);
    const [isKnownStaff, setIsKnownStaff] = useState(false);
    const [isEditingAutoFields, setIsEditingAutoFields] = useState(false);
    const [isGantiDateLocked, setIsGantiDateLocked] = useState(true);
    const [expanded, setExpanded] = useState({ pegawai: true, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [shakeSection, setShakeSection] = useState(null);

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

            for (let url of urlsToTry) {
                try {
                    const img = new Image();
                    img.crossOrigin = "Anonymous";
                    await new Promise((resolve, reject) => {
                        img.onload = () => resolve();
                        img.onerror = () => reject(new Error("Gagal muat turun"));
                        img.src = url + (url.includes('?') ? '&' : '?') + 't=' + new Date().getTime();
                    });
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width; canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage(img, 0, 0);
                    setPreloadedLogo(canvas.toDataURL('image/jpeg', 1.0));
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
        if (Object.keys(updates).length > 0) setFormData(prev => ({ ...prev, ...updates }));
    }, []);

    useEffect(() => {
        if (formData.nama || formData.jawatan || formData.bahagian || formData.noKp || formData.noTel) {
            localStorage.setItem("pegawaiData", JSON.stringify({
                nama: formData.nama, jawatan: formData.jawatan, bahagian: formData.bahagian, 
                noKp: formData.noKp, noTel: formData.noTel
            }));
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
            localStorage.setItem("flightInfo", JSON.stringify({ kodSyarikat: formData.kodSyarikat, enrichId: formData.enrichId }));
        }
    }, [formData.kodSyarikat, formData.enrichId]);

    useEffect(() => {
        if (isGantiDateLocked) {
            setFormData(prev => ({ ...prev, tarikhGantiDari: prev.tarikhPergi, tarikhGantiHingga: prev.tarikhBalik, flightPergiTarikh: prev.tarikhPergi, flightBalikTarikh: prev.tarikhBalik }));
        } else {
            setFormData(prev => ({ ...prev, flightPergiTarikh: prev.tarikhPergi, flightBalikTarikh: prev.tarikhBalik }));
        }
    }, [formData.tarikhPergi, formData.tarikhBalik, isGantiDateLocked]);

    // ================== LOGIK PENGESAHAN (VALIDATION) ==================
    const isPegawaiComplete = formData.nama.trim() !== '' && formData.jawatan.trim() !== '' && formData.bahagian.trim() !== '' && formData.noKp.trim() !== '' && (activeForm === 'akujanji' || activeForm === 'laporan' || formData.noTel.trim() !== '');
    const isTugasComplete = formData.tujuan.trim() !== '' && formData.tempat.trim() !== '' && formData.tarikhPergi !== '' && formData.tarikhBalik !== '';
    const isPenggantiComplete = formData.namaPengganti.trim() !== '' && formData.subjek.trim() !== '';
    const isFlightSingleComplete = () => formData.flightPergiDari.length === 3 && formData.flightPergiKe.length === 3 && formData.flightPergiMasa && formData.flightBalikDari.length === 3 && formData.flightBalikKe.length === 3 && formData.flightBalikMasa;
    const isFlightMultiComplete = () => formData.flightPergiDari.length === 3 && formData.flightPergiKe.length === 3 && formData.flightPergiMasa && formData.flightPergiLeg2Dari.length === 3 && formData.flightPergiLeg2Ke.length === 3 && formData.flightPergiLeg2Masa && formData.flightBalikDari.length === 3 && formData.flightBalikKe.length === 3 && formData.flightBalikMasa && formData.flightBalikLeg2Dari.length === 3 && formData.flightBalikLeg2Ke.length === 3 && formData.flightBalikLeg2Masa;
    const isTiketComplete = formData.caraPerjalanan === 'Kapal Terbang' ? (formData.flightType === 'single' ? isFlightSingleComplete() : isFlightMultiComplete()) : true;
    const isCutiComplete = formData.jenisCuti !== '' && formData.cutiDari !== '' && formData.cutiHingga !== '' && formData.ketuaSokongan !== '' && formData.pegawaiPelulus !== '';
    const isCutiGantiComplete = () => (formData.jenisCuti !== 'Cuti Ganti' && formData.jenisCuti !== 'Cuti Tanpa Rekod') ? true : formData.cutiPenggantiNama.trim() !== '' && formData.cutiPenggantiTugas.trim() !== '';
    const isPerananComplete = formData.perananPeperiksaan.length > 0;
    const isTandatanganComplete = formData.tandatangan !== null;
    const isLaporanInfoComplete = formData.sesiPeperiksaan.trim() !== '' && formData.tarikhPeperiksaan !== '';
    const isLaporanSoalanComplete = formData.q1Status !== '' && formData.q2Status !== '' && formData.q3Status !== '';
    
    const isAllComplete = activeForm === 'cuti' ? (isPegawaiComplete && isCutiComplete && isCutiGantiComplete())
        : activeForm === 'akujanji' ? (isPegawaiComplete && isPerananComplete && isTandatanganComplete)
        : activeForm === 'laporan' ? (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete && isTandatanganComplete)
        : (isPegawaiComplete && isTugasComplete && isPenggantiComplete && isTiketComplete);

    let progressWidth = 0;
    if (activeForm === 'cuti') {
        if (isPegawaiComplete) progressWidth += 40;
        if (isCutiComplete) progressWidth += 40;
        if (isCutiGantiComplete()) progressWidth += 20;
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
        if (isPegawaiComplete && isTugasComplete && isPenggantiComplete) progressWidth = isTiketComplete ? 100 : 85; 
    }

    const s1Done = isPegawaiComplete;
    const s2Done = activeForm === 'akujanji' ? (isPegawaiComplete && isPerananComplete) : activeForm === 'laporan' ? (isPegawaiComplete && isLaporanInfoComplete) : (isPegawaiComplete && isTugasComplete);
    const s3Done = activeForm === 'akujanji' ? (isAllComplete) : activeForm === 'laporan' ? (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete) : (isPegawaiComplete && isTugasComplete && isPenggantiComplete);
    const s4Done = (activeForm === 'tugas' || activeForm === 'laporan') ? isAllComplete : false;

    // ================== HANDLERS ==================
    const showNotification = (message, type = 'success') => {
        setNotification({ show: true, message, type });
        setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000);
    };

    const toggleSection = (section) => {
        if (section !== 'pegawai' && !isPegawaiComplete) {
            showNotification("Sila lengkapkan Maklumat Pegawai terlebih dahulu.", "error");
            document.getElementById('section-pegawai')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setShakeSection('pegawai'); setTimeout(() => setShakeSection(null), 500); return;
        }
        if (activeForm === 'tugas' && (section === 'pengganti' || section === 'tiket') && !isTugasComplete) {
            showNotification("Sila lengkapkan Maklumat Tugasan terlebih dahulu.", "error");
            document.getElementById('section-tugas')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setShakeSection('tugas'); setTimeout(() => setShakeSection(null), 500); return;
        }
        if (activeForm === 'akujanji' && section === 'tandatangan' && !isPerananComplete) {
            showNotification("Sila pilih sekurang-kurangnya satu Peranan Peperiksaan.", "error");
            document.getElementById('section-peranan')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            setShakeSection('peranan'); setTimeout(() => setShakeSection(null), 500); return;
        }
        if (activeForm === 'laporan') {
            if (section === 'laporanSoalan' && !isLaporanInfoComplete) {
                showNotification("Sila lengkapkan Maklumat Peperiksaan terlebih dahulu.", "error");
                document.getElementById('section-laporanInfo')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setShakeSection('laporanInfo'); setTimeout(() => setShakeSection(null), 500); return;
            }
            if (section === 'tandatangan' && !isLaporanSoalanComplete) {
                showNotification("Sila lengkapkan Status & Cadangan terlebih dahulu.", "error");
                document.getElementById('section-laporanSoalan')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setShakeSection('laporanSoalan'); setTimeout(() => setShakeSection(null), 500); return;
            }
        }
        
        setExpanded(prev => ({
            pegawai: section === 'pegawai' ? !prev.pegawai : false, tugas: section === 'tugas' ? !prev.tugas : false,
            pengganti: section === 'pengganti' ? !prev.pengganti : false, tiket: section === 'tiket' ? !prev.tiket : false,
            cuti: section === 'cuti' ? !prev.cuti : false, peranan: section === 'peranan' ? !prev.peranan : false,
            tandatangan: section === 'tandatangan' ? !prev.tandatangan : false, laporanInfo: section === 'laporanInfo' ? !prev.laporanInfo : false,
            laporanSoalan: section === 'laporanSoalan' ? !prev.laporanSoalan : false
        }));
    };

    const nextSection = (current, nextSectionName) => {
        if (activeForm === 'tugas' && nextSectionName === 'tiket' && formData.caraPerjalanan !== 'Kapal Terbang') nextSectionName = 'jana';
        setExpanded({
            pegawai: nextSectionName === 'pegawai', tugas: nextSectionName === 'tugas', pengganti: nextSectionName === 'pengganti',
            tiket: nextSectionName === 'tiket', cuti: nextSectionName === 'cuti', peranan: nextSectionName === 'peranan',
            tandatangan: nextSectionName === 'tandatangan', laporanInfo: nextSectionName === 'laporanInfo', laporanSoalan: nextSectionName === 'laporanSoalan'
        });
        if (nextSectionName === 'jana') setTimeout(() => document.getElementById('jana-button-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200);
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
        if (name === 'noTel' || name === 'noTelPengganti' || name === 'cutiPenggantiNoTel') value = formatPhone(value);
        if (['flightPergiDari', 'flightPergiKe', 'flightBalikDari', 'flightBalikKe', 'flightPergiLeg2Dari', 'flightPergiLeg2Ke', 'flightBalikLeg2Dari', 'flightBalikLeg2Ke'].includes(name)) value = value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3);
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleAutoFieldsEdit = () => {
        if (isEditingAutoFields) {
            const selected = pegawaiDatabase.find(p => p.nama === formData.nama);
            if (selected) setFormData(prev => ({ ...prev, jawatan: selected.jawatan, bahagian: selected.bahagian, noTel: selected.noTel || prev.noTel }));
        }
        setIsEditingAutoFields(!isEditingAutoFields);
    };

    const handleCheckboxPeranan = (role) => {
        setFormData(prev => ({ ...prev, perananPeperiksaan: prev.perananPeperiksaan.includes(role) ? prev.perananPeperiksaan.filter(r => r !== role) : [...prev.perananPeperiksaan, role] }));
    };

    const handlePenggantiChange = (e) => {
        const selectedName = e.target.value;
        if (!selectedName) { setFormData(prev => ({ ...prev, namaPengganti: '', bahagianPengganti: '', noTelPengganti: '' })); return; }
        if (selectedName === "TIADA PENGGANTI") { setFormData(prev => ({ ...prev, namaPengganti: 'TIADA PENGGANTI', bahagianPengganti: '-', noTelPengganti: '-' })); return; }
        const p = pegawaiDatabase.find(x => x.nama === selectedName);
        if (p) setFormData(prev => ({ ...prev, namaPengganti: p.nama, bahagianPengganti: p.bahagian, noTelPengganti: p.noTel || '' }));
    };

    const handleCutiPenggantiChange = (e) => {
        const selectedName = e.target.value;
        if (!selectedName) { setFormData(prev => ({ ...prev, cutiPenggantiNama: '', cutiPenggantiBahagian: '', cutiPenggantiNoTel: '' })); return; }
        const p = pegawaiDatabase.find(x => x.nama === selectedName);
        if (p) setFormData(prev => ({ ...prev, cutiPenggantiNama: p.nama, cutiPenggantiBahagian: p.bahagian, cutiPenggantiNoTel: p.noTel || '' }));
    };

    const getAirportName = (code) => {
        if (!code || code.length !== 3) return 'Pilih';
        const found = malaysiaAirports.find(a => a.code === code);
        return found ? found.name : 'Airport';
    };

    const setRoute = (dari, ke) => setFormData(prev => ({ ...prev, flightPergiDari: dari, flightPergiKe: ke, flightBalikDari: ke, flightBalikKe: dari, flightPergiLeg2Dari: '', flightPergiLeg2Ke: '', flightPergiLeg2Masa: '', flightPergiLeg2Tarikh: today, flightBalikLeg2Dari: '', flightBalikLeg2Ke: '', flightBalikLeg2Masa: '', flightBalikLeg2Tarikh: today }));

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const diffTime = new Date(end).getTime() - new Date(start).getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays > 0 ? diffDays : 0;
    };
    const jumlahHari = calculateDays(formData.tarikhPergi, formData.tarikhBalik);

    // ================== LOGIK TANDATANGAN DIGITAL ==================
    useEffect(() => {
        if (expanded.tandatangan && canvasRef.current) {
            const initCanvas = () => {
                const canvas = canvasRef.current; if (!canvas) return;
                const ctx = canvas.getContext('2d');
                const rect = canvas.parentElement.getBoundingClientRect();
                const dpr = window.devicePixelRatio || 1;
                canvas.width = rect.width * dpr; canvas.height = 200 * dpr;
                ctx.scale(dpr, dpr); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 3; ctx.strokeStyle = '#0f172a';
            };
            initCanvas(); window.addEventListener('resize', initCanvas); return () => window.removeEventListener('resize', initCanvas);
        }
    }, [expanded.tandatangan]);

    const getCoordinates = (e) => {
        const canvas = canvasRef.current; const rect = canvas.getBoundingClientRect();
        let clientX = e.touches ? e.touches[0].clientX : e.clientX;
        let clientY = e.touches ? e.touches[0].clientY : e.clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
    };
    const startDrawing = (e) => { isDrawing.current = true; const coords = getCoordinates(e); lastPos.current = coords; const ctx = canvasRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(coords.x, coords.y); ctx.lineTo(coords.x, coords.y); ctx.stroke(); };
    const draw = (e) => { if (!isDrawing.current) return; if (e.cancelable) e.preventDefault(); const coords = getCoordinates(e); const ctx = canvasRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(coords.x, coords.y); ctx.stroke(); lastPos.current = coords; };
    const stopDrawing = () => { if(isDrawing.current) { isDrawing.current = false; saveSignature(); } };
    const clearSignature = () => { const canvas = canvasRef.current; if(canvas) { const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); } setFormData(prev => ({ ...prev, tandatangan: null })); };

    const cropCanvas = (sourceCanvas) => {
        const ctx = sourceCanvas.getContext('2d'); const imageData = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height); const data = imageData.data;
        let minX = sourceCanvas.width, minY = sourceCanvas.height, maxX = 0, maxY = 0, hasPixels = false;
        for (let y = 0; y < sourceCanvas.height; y++) {
            for (let x = 0; x < sourceCanvas.width; x++) {
                if (data[(y * sourceCanvas.width + x) * 4 + 3] > 5) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); hasPixels = true; }
            }
        }
        if (!hasPixels) return null;
        const padding = 15; minX = Math.max(0, minX - padding); minY = Math.max(0, minY - padding); maxX = Math.min(sourceCanvas.width, maxX + padding); maxY = Math.min(sourceCanvas.height, maxY + padding);
        const width = maxX - minX; const height = maxY - minY;
        const croppedCanvas = document.createElement('canvas'); croppedCanvas.width = width; croppedCanvas.height = height;
        croppedCanvas.getContext('2d').putImageData(ctx.getImageData(minX, minY, width, height), 0, 0);
        return croppedCanvas.toDataURL('image/png');
    };
    const saveSignature = () => { const canvas = canvasRef.current; if(canvas) { const croppedImage = cropCanvas(canvas); if (croppedImage) setFormData(prev => ({ ...prev, tandatangan: croppedImage })); } };

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0]; if (!file) return;
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                const tempCanvas = document.createElement('canvas'); const ctx = tempCanvas.getContext('2d');
                tempCanvas.width = img.width; tempCanvas.height = img.height; ctx.drawImage(img, 0, 0);
                const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height); const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    if ((data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) > 130) data[i+3] = 0;
                    else { data[i] = 15; data[i+1] = 23; data[i+2] = 42; data[i+3] = 255; }
                }
                ctx.putImageData(imageData, 0, 0);
                const croppedImage = cropCanvas(tempCanvas);
                if (croppedImage) { setFormData(prev => ({ ...prev, tandatangan: croppedImage })); showNotification("Tandatangan berjaya dimuat naik."); } else showNotification("Tandatangan tidak dapat dikesan.", "error");
            };
            img.src = event.target.result;
        }; reader.readAsDataURL(file);
    };

    // ================== JANA PDF (INTEGRASI DARI FUNGSI LUAR) ==================
    const handleGenerateAll = () => {
        if (isLogoLoading) { showNotification("Sistem sedang memuatkan logo Jata Negara...", "error"); return; }
        if (!isAllComplete) { showNotification("Sila lengkapkan semua ruangan sebelum menjana.", "error"); return; }
        
        setIsGenerating(true);
        setTimeout(() => {
            try {
                const doc = new jsPDF({ format: 'a4' });
                
                if (activeForm === 'cuti') {
                    generateFormCuti(doc, formData, pegawaiDatabase, today);
                    if ((formData.jenisCuti === 'Cuti Ganti' || formData.jenisCuti === 'Cuti Tanpa Rekod') && formData.cutiPenggantiNama.trim() !== '') {
                        const cutiData = { ...formData, tarikhGantiDari: formData.cutiDari, tarikhGantiHingga: formData.cutiHingga, namaPengganti: formData.cutiPenggantiNama, bahagianPengganti: formData.cutiPenggantiBahagian, noTelPengganti: formData.cutiPenggantiNoTel, subjek: formData.cutiPenggantiTugas };
                        doc.addPage(); generateForm2(doc, preloadedLogo, formData, cutiData);
                    }
                    doc.save(formData.nama ? `Borang_Cuti_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_Cuti.pdf');
                    showNotification("Borang Cuti berjaya dijana!");
                } else if (activeForm === 'akujanji') {
                    generateFormAkujanji(doc, preloadedLogo, formData, peperiksaanRoles, today);
                    doc.save(formData.nama ? `Akujanji_Peperiksaan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Akujanji_Peperiksaan.pdf');
                    showNotification("Surat Akujanji Integriti berjaya dijana!");
                } else if (activeForm === 'laporan') {
                    generateFormLaporan(doc, preloadedLogo, formData);
                    doc.save(formData.nama ? `Laporan_Peperiksaan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Laporan_Peperiksaan.pdf');
                    showNotification("Laporan Pelaksanaan Peperiksaan berjaya dijana!");
                } else {
                    generateForm1(doc, preloadedLogo, formData);
                    if ((formData.subjek.trim() !== '' || formData.namaPengganti.trim() !== '') && formData.namaPengganti !== 'TIADA PENGGANTI') { doc.addPage(); generateForm2(doc, preloadedLogo, formData); }
                    if (formData.caraPerjalanan === 'Kapal Terbang') { doc.addPage(); generateForm3(doc, formData); }
                    doc.save(formData.nama ? `Borang_TugasRasmi_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_TugasRasmi.pdf');
                    showNotification("Semua dokumen rasmi berjaya disatukan ke dalam 1 fail PDF!");
                }

                setIsGenerating(false);
                setTimeout(() => {
                    setFormData(prev => ({
                        ...prev, tujuan: '', tempat: '', tarikhPergi: today, tarikhBalik: today, km: '', caraPerjalanan: 'Kereta Sendiri', sebab1: false, sebab2: false, sebab3: false, tuntutanBatu: false, tuntutanGantian: false, noKenderaan: '', subjek: '', semester: '', tarikhGantiDari: today, tarikhGantiHingga: today, catatanTugas: '', namaPengganti: '', bahagianPengganti: '', noTelPengganti: '', jenisAmbilAlih: 'Ambil alih subjek / tugas sepenuhnya', flightType: 'single', flightPergiTarikh: today, flightPergiMasa: '', flightPergiDari: '', flightPergiKe: '', flightPergiLeg2Tarikh: today, flightPergiLeg2Masa: '', flightPergiLeg2Dari: '', flightPergiLeg2Ke: '', flightBalikTarikh: today, flightBalikMasa: '', flightBalikDari: '', flightBalikKe: '', flightBalikLeg2Tarikh: today, flightBalikLeg2Masa: '', flightBalikLeg2Dari: '', flightBalikLeg2Ke: '', kodSyarikat: '', enrichId: '', jenisCuti: 'Cuti Rehat', cutiDari: today, cutiHingga: today, catatanCuti: '', ketuaSokongan: '', pegawaiPelulus: '', cutiPenggantiNama: '', cutiPenggantiBahagian: '', cutiPenggantiNoTel: '', cutiPenggantiTugas: '', perananPeperiksaan: [], tandatangan: null, sesiPeperiksaan: '', tarikhPeperiksaan: today, namaPengawasLain: '', q1Status: 'YA', q1Catatan: '', q2Status: 'TIDAK', q2Catatan: '', q3Status: 'YA', q3Catatan: '', cadanganPeperiksaan: ''
                    }));
                    if(canvasRef.current) canvasRef.current.getContext('2d').clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
                    setActiveForm(null);
                    setExpanded({ pegawai: true, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false });
                }, 2500);
            } catch (error) { setIsGenerating(false); showNotification("Ralat berlaku semasa menjana fail.", "error"); }
        }, 150);
    };

    // ================== PAPARAN UTAMA ==================
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
                        <p className="text-[17px] md:text-xl text-slate-500 font-semibold max-w-2xl mx-auto mb-12 leading-relaxed">Sistem pengurusan dan penjanaan dokumen rasmi secara digital, pantas dan sistematik.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
                            <button onClick={() => { setActiveForm('tugas'); setExpanded({...expanded, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }} className="w-full px-6 py-5 bg-slate-900 hover:bg-slate-800 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group">
                                <div className="bg-slate-700 p-3 rounded-2xl group-hover:bg-slate-600 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg></div>
                                <span>Borang Tugas Rasmi</span>
                            </button>
                            <button onClick={() => { setActiveForm('akujanji'); setExpanded({...expanded, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }} className="w-full px-6 py-5 bg-indigo-600 hover:bg-indigo-500 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group">
                                <div className="bg-indigo-500 p-3 rounded-2xl group-hover:bg-indigo-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg></div>
                                <span>Surat Akujanji Peperiksaan</span>
                            </button>
                            <button onClick={() => { setActiveForm('laporan'); setExpanded({...expanded, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }} className="w-full px-6 py-5 bg-amber-500 hover:bg-amber-400 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group">
                                <div className="bg-amber-400 p-3 rounded-2xl group-hover:bg-amber-300 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg></div>
                                <span>Laporan Peperiksaan</span>
                            </button>
                            <button onClick={() => { setActiveForm('cuti'); setExpanded({...expanded, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false, pegawai: true}); }} className="w-full px-6 py-5 bg-emerald-600 hover:bg-emerald-500 text-white text-[15px] font-bold rounded-[1.5rem] shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex flex-col items-center justify-center gap-3 group">
                                <div className="bg-emerald-500 p-3 rounded-2xl group-hover:bg-emerald-400 transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg></div>
                                <span>Borang Cuti (Manual)</span>
                            </button>
                        </div>
                    </div>
                </div>
                <FeedbackButton />
            </div>
        );
    }

    return (
        <div className="pb-12 relative min-h-screen">
            <div className="absolute top-6 left-4 md:left-6 z-50 animate-slide-up">
                <button onClick={() => setActiveForm(null)} className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-[13px] font-extrabold text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:shadow-md shadow-sm transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    <span className="hidden sm:block">Halaman Utama</span>
                </button>
            </div>

            <header className="relative pt-16 pb-10 px-6 max-w-3xl mx-auto text-center">
                <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 text-white shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 ${activeForm === 'cuti' ? 'bg-emerald-600 shadow-emerald-500/30' : activeForm === 'akujanji' ? 'bg-indigo-600 shadow-indigo-500/30' : activeForm === 'laporan' ? 'bg-amber-500 shadow-amber-500/30' : 'bg-blue-600 shadow-blue-500/30'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {activeForm === 'cuti' ? 'Borang Cuti Manual' : activeForm === 'akujanji' ? 'Surat Akujanji Peperiksaan' : activeForm === 'laporan' ? 'Laporan Peperiksaan Akhir' : 'Borang Tugas Rasmi'} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">ADTEC JTM Kampus Sandakan</span>
                </h1>
            </header>

            {notification.show && (
                <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] animate-slide-up">
                    <div className={`px-5 py-3.5 rounded-full shadow-2xl flex items-center gap-3 backdrop-blur-xl border ${notification.type === 'error' ? 'bg-red-50/90 border-red-200 text-red-700' : 'bg-emerald-50/90 border-emerald-200 text-emerald-700'}`}>
                        <span className="font-bold text-[14px]">{notification.message}</span>
                    </div>
                </div>
            )}

            <div className="max-w-[800px] mx-auto px-4 space-y-5 relative z-10">
                {/* 1. MAKLUMAT PEGAWAI (DIKONGSI OLEH SEMUA BORANG) */}
                <div id="section-pegawai" className={`bg-white/80 backdrop-blur-xl rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 overflow-hidden transition-all duration-500 ${expanded.pegawai ? 'ring-[3px] ring-blue-500/20' : 'hover:shadow-md'} ${shakeSection === 'pegawai' ? 'animate-shake border-red-400' : ''}`}>
                    <div onClick={() => toggleSection('pegawai')} className="cursor-pointer px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl transition-colors ${expanded.pegawai ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : (isPegawaiComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600')}`}>
                                {isPegawaiComplete && !expanded.pegawai ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
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
                                        <select id="wrap-nama" name="nama" value={formData.nama} onChange={handleChange} className={`${formInputClass} appearance-none cursor-pointer relative z-10 ${formData.nama ? 'text-slate-800' : 'text-slate-400 font-medium'}`}>
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
                                            <button type="button" onClick={toggleAutoFieldsEdit} className={`ml-2 normal-case font-bold text-[10px] px-2 py-0.5 rounded-md border transition-all ${isEditingAutoFields ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-blue-50 text-blue-500 border-blue-100 hover:bg-blue-100'}`}>
                                                {isEditingAutoFields ? <span className="flex items-center gap-1"><UnlockIcon /> Tutup Edit</span> : <span className="flex items-center gap-1"><EditIcon /> Edit</span>}
                                            </button>
                                        )}
                                    </label>
                                    <input id="wrap-jawatan" type="text" name="jawatan" value={formData.jawatan} onChange={handleChange} className={`${formInputClass} ${isKnownStaff && !isEditingAutoFields ? 'bg-slate-50/70 text-slate-500 border-slate-200 cursor-not-allowed opacity-80' : ''}`} placeholder="Contoh: Pengajar" readOnly={isKnownStaff && !isEditingAutoFields} />
                                </div>
                                <div>
                                    <UniversalSelect wrapperId="wrap-bahagian" name="bahagian" value={formData.bahagian} label={<>Bahagian / Unit <span className="text-red-500">*</span> {isKnownStaff && !isEditingAutoFields && <span className="text-blue-500 ml-2 normal-case font-bold text-[10px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">Auto-isi</span>}</>} options={unitOptions} onChange={handleChange} placeholder="Pilih Unit" disabled={isKnownStaff && !isEditingAutoFields} />
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

                {/* KOMPONEN BORANG BERSYARAT (CONDITIONAL FORMS) */}
                {activeForm === 'cuti' && <FormCuti formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} pegawaiDatabase={pegawaiDatabase} isPegawaiComplete={isPegawaiComplete} isCutiComplete={isCutiComplete} calculateDays={calculateDays} handleCutiPenggantiChange={handleCutiPenggantiChange} shakeSection={shakeSection} isCutiGantiComplete={isCutiGantiComplete} />}
                {activeForm === 'akujanji' && <FormAkujanji formData={formData} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formLabelClass={formLabelClass} peperiksaanRoles={peperiksaanRoles} handleCheckboxPeranan={handleCheckboxPeranan} isPegawaiComplete={isPegawaiComplete} isPerananComplete={isPerananComplete} isTandatanganComplete={isTandatanganComplete} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} shakeSection={shakeSection} />}
                {activeForm === 'laporan' && <FormLaporan formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} isPegawaiComplete={isPegawaiComplete} isLaporanInfoComplete={isLaporanInfoComplete} isLaporanSoalanComplete={isLaporanSoalanComplete} isTandatanganComplete={isTandatanganComplete} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} shakeSection={shakeSection} />}
                {activeForm === 'tugas' && <FormTugas formData={formData} handleChange={handleChange} setFormData={setFormData} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} pegawaiDatabase={pegawaiDatabase} malaysiaAirports={malaysiaAirports} getAirportName={getAirportName} setRoute={setRoute} isPegawaiComplete={isPegawaiComplete} isTugasComplete={isTugasComplete} isPenggantiComplete={isPenggantiComplete} isTiketComplete={isTiketComplete} jumlahHari={jumlahHari} isGantiDateLocked={isGantiDateLocked} setIsGantiDateLocked={setIsGantiDateLocked} handlePenggantiChange={handlePenggantiChange} shakeSection={shakeSection} />}

                {/* BUTANG JANA PDF */}
                <div id="jana-button-container" className="mt-12 mb-16 animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <button onClick={handleGenerateAll} disabled={isGenerating || isLogoLoading} className={`group relative w-full flex items-center justify-center gap-4 py-5 px-8 rounded-3xl overflow-hidden transition-all duration-300 ${isGenerating || isLogoLoading ? 'bg-slate-300 cursor-not-allowed opacity-80' : (!isAllComplete ? 'bg-amber-500 hover:bg-amber-400' : 'bg-emerald-600 hover:bg-emerald-500')} transform hover:-translate-y-1 active:scale-[0.98]`}>
                        <span className="text-[14px] sm:text-[16px] font-extrabold tracking-wide uppercase text-white">
                            {isLogoLoading ? 'MEMUATKAN ASET BORANG...' : isGenerating ? 'MENJANA BORANG...' : (!isAllComplete ? 'SILA LENGKAPKAN SEMUA RUANGAN' : 'JANA & MUAT TURUN (FAIL PDF)')}
                        </span>
                    </button>
                </div>
            </div>
            <FeedbackButton />
        </div>
    );
}

export default App;
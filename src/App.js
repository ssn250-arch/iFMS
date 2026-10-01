import React, { useState, useEffect, useRef } from 'react';
import jsPDF from 'jspdf';
import './index.css';

// Import Gambar Background Tempatan (Local)
import adtecBg from './adtec.png';

// Import Data
import { unitOptions, peperiksaanRoles, pegawaiDatabase, malaysiaAirports } from './data/database';

// Import Komponen UI & Borang
import UniversalSelect from './components/ui/UniversalSelect';
import FeedbackButton from './components/FeedbackButton';
import FormTugas from './components/forms/FormTugas';
import FormCuti from './components/forms/FormCuti';
import FormAkujanji from './components/forms/FormAkujanji';
import FormLaporan from './components/forms/FormLaporan';
import FormLepasKursus from './components/forms/FormLepasKursus';
import FormPascaKursus from './components/forms/FormPascaKursus';
import FormPelepasan from './components/forms/FormPelepasan';
import FormTiket from './components/forms/FormTiket';

// Import Logik PDF
import { 
    generateForm1, 
    generateForm2, 
    generateForm3, 
    generateFormCuti, 
    generateFormAkujanji, 
    generateFormLaporan, 
    generateFormLepasKursus, 
    generateFormPascaKursus 
} from './utils/pdfGenerator';

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
    
    // ================== STATE UTAMA ==================
    const [formData, setFormData] = useState({
        nama: '', jawatan: '', bahagian: '', noKp: '', noTel: '', noKenderaan: '',
        tujuan: '', tempat: '', tarikhPergi: today, tarikhBalik: today, km: '', 
        caraPerjalanan: ['Kereta Sendiri'], 
        sebab1: false, sebab2: false, sebab3: false, tuntutanBatu: false, tuntutanGantian: false,
        subjek: '', semester: '', tarikhGantiDari: today, tarikhGantiHingga: today, catatanTugas: '', 
        namaPengganti: '', bahagianPengganti: '', noTelPengganti: '', jenisAmbilAlih: 'Ambil alih subjek / tugas sepenuhnya',
        flightType: 'single', flightPergiTarikh: today, flightPergiMasa: '', flightPergiDari: '', flightPergiKe: '', flightPergiLeg2Tarikh: today, flightPergiLeg2Masa: '', flightPergiLeg2Dari: '', flightPergiLeg2Ke: '', flightBalikTarikh: today, flightBalikMasa: '', flightBalikDari: '', flightBalikKe: '', flightBalikLeg2Tarikh: today, flightBalikLeg2Masa: '', flightBalikLeg2Dari: '', flightBalikLeg2Ke: '', kodSyarikat: '', enrichId: '',
        jenisCuti: 'Cuti Rehat', cutiDari: today, cutiHingga: today, catatanCuti: '', ketuaSokongan: '', pegawaiPelulus: '', cutiPenggantiNama: '', cutiPenggantiBahagian: '', cutiPenggantiNoTel: '', cutiPenggantiTugas: '',
        perananPeperiksaan: [], tandatangan: null, sesiPeperiksaan: '', tarikhPeperiksaan: today, namaPengawasLain: '', q1Status: 'YA', q1Catatan: '', q2Status: 'TIDAK', q2Catatan: '', q3Status: 'YA', q3Catatan: '', cadanganPeperiksaan: '',
        kursusNama: '', kursusDari: today, kursusHingga: today, lkA1: 0, lkA2: 0, lkA3: 0, lkA4: 0, lkB1: 0, lkB2: 0, lkB3: 0, lkB4: 0, lkB5: 0, lkC1: 0, lkC2: 0, lkC3: 0, lkD1: 0, lkD2a: 0, lkD2b: 0, lkD2c: 0, lkD3a: 0, lkD3b: 0, lkD3c: 0, lkD3d: 0, lkRumusan: '',
        penyediaLatihan: '', tempatKursus: '', tarikhKursus: '', namaPenyelia: '', jawatanPenyelia: '', pk1a: 0, pk1b: 0, pk1c: 0, pk1d: 0, pkCadangan: ''
    });

    const [preloadedLogo, setPreloadedLogo] = useState(null);
    const [isLogoLoading, setIsLogoLoading] = useState(true);
    const [isKnownStaff, setIsKnownStaff] = useState(false);
    const [isEditingAutoFields, setIsEditingAutoFields] = useState(false);
    const [isManualName, setIsManualName] = useState(false);
    const [isGantiDateLocked, setIsGantiDateLocked] = useState(true);
    
    // ================== STATE MODAL ==================
    const [showPanduan, setShowPanduan] = useState(false);
    const [showHubungi, setShowHubungi] = useState(false);

    const [expanded, setExpanded] = useState({ pegawai: true, tugas: false, pengganti: false, tiket: false, cuti: false, peranan: false, tandatangan: false, laporanInfo: false, laporanSoalan: false, kursus: false, penilaian: false, pelepasanInfo: false, tiketInfo: false });
    const [notification, setNotification] = useState({ show: false, message: '', type: '' });
    const [isGenerating, setIsGenerating] = useState(false);
    const [shakeSection, setShakeSection] = useState(null);

    const canvasRef = useRef(null);
    const isDrawing = useRef(false);
    const lastPos = useRef({ x: 0, y: 0 });

    useEffect(() => { setIsKnownStaff(pegawaiDatabase.some(p => p.nama === formData.nama)); }, [formData.nama]);

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
                    const img = new Image(); img.crossOrigin = "Anonymous";
                    await new Promise((resolve, reject) => { img.onload = () => resolve(); img.onerror = () => reject(new Error("Gagal muat turun")); img.src = url + (url.includes('?') ? '&' : '?') + 't=' + new Date().getTime(); });
                    const canvas = document.createElement('canvas'); canvas.width = img.width; canvas.height = img.height;
                    const ctx = canvas.getContext('2d'); ctx.fillStyle = '#FFFFFF'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.drawImage(img, 0, 0); setPreloadedLogo(canvas.toDataURL('image/jpeg', 1.0)); break;
                } catch (e) { console.warn(e.message); }
            }
            setIsLogoLoading(false);
        };
        fetchAndConvertLogo();

        const savedData = localStorage.getItem("pegawaiData"); const savedFlight = localStorage.getItem("flightInfo");
        let updates = {};
        if (savedData) updates = { ...updates, ...JSON.parse(savedData) };
        if (savedFlight) updates = { ...updates, ...JSON.parse(savedFlight) };
        if (Object.keys(updates).length > 0) setFormData(prev => ({ ...prev, ...updates }));
    }, []);

    useEffect(() => {
        if (formData.nama || formData.jawatan || formData.bahagian || formData.noKp || formData.noTel) {
            localStorage.setItem("pegawaiData", JSON.stringify({ nama: formData.nama, jawatan: formData.jawatan, bahagian: formData.bahagian, noKp: formData.noKp, noTel: formData.noTel }));
        }
    }, [formData.nama, formData.jawatan, formData.bahagian, formData.noKp, formData.noTel]);

    useEffect(() => {
        if (!isEditingAutoFields && !isManualName) {
            const selected = pegawaiDatabase.find(p => p.nama === formData.nama);
            if (selected) {
                setFormData(prev => {
                    const newPhone = selected.noTel || prev.noTel;
                    if (prev.jawatan !== selected.jawatan || prev.bahagian !== selected.bahagian || prev.noTel !== newPhone) { return { ...prev, jawatan: selected.jawatan, bahagian: selected.bahagian, noTel: newPhone }; }
                    return prev;
                });
            }
        }
    }, [formData.nama, isEditingAutoFields, isManualName]);

    useEffect(() => { if (formData.kodSyarikat || formData.enrichId) { localStorage.setItem("flightInfo", JSON.stringify({ kodSyarikat: formData.kodSyarikat, enrichId: formData.enrichId })); } }, [formData.kodSyarikat, formData.enrichId]);

    // ✅ FIX: Kunci tarikh HANYA berfungsi jika buka Borang Tugas Rasmi sahaja
    useEffect(() => {
        if (activeForm === 'tugas') {
            if (isGantiDateLocked) { 
                setFormData(prev => ({ ...prev, tarikhGantiDari: prev.tarikhPergi, tarikhGantiHingga: prev.tarikhBalik, flightPergiTarikh: prev.tarikhPergi, flightBalikTarikh: prev.tarikhBalik })); 
            } else { 
                setFormData(prev => ({ ...prev, flightPergiTarikh: prev.tarikhPergi, flightBalikTarikh: prev.tarikhBalik })); 
            }
        }
    }, [formData.tarikhPergi, formData.tarikhBalik, isGantiDateLocked, activeForm]);

    const calculateDays = (start, end) => {
        if (!start || !end) return 0;
        const diffTime = new Date(end).getTime() - new Date(start).getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
        return diffDays > 0 ? diffDays : 0;
    };
    const jumlahHari = calculateDays(formData.tarikhPergi, formData.tarikhBalik);

    const getAirportName = (code) => {
        if (!code || code.length !== 3) return 'Pilih';
        const found = malaysiaAirports.find(a => a.code === code);
        return found ? found.name : 'Airport';
    };

    const setRoute = (dari, ke) => setFormData(prev => ({ ...prev, flightPergiDari: dari, flightPergiKe: ke, flightBalikDari: ke, flightBalikKe: dari, flightPergiLeg2Dari: '', flightPergiLeg2Ke: '', flightPergiLeg2Masa: '', flightPergiLeg2Tarikh: today, flightBalikLeg2Dari: '', flightBalikLeg2Ke: '', flightBalikLeg2Masa: '', flightBalikLeg2Tarikh: today }));

    const formatIC = (val) => {
        const v = val.replace(/\D/g, '').substring(0, 12); const match = v.match(/^(\d{0,6})(\d{0,2})(\d{0,4})$/);
        return match ? (!match[2] ? match[1] : `${match[1]}-${match[2]}${match[3] ? `-${match[3]}` : ''}`) : val;
    };

    const formatPhone = (val) => {
        const v = val.replace(/\D/g, '').substring(0, 11); const match = v.match(/^(\d{0,3})(\d{0,8})$/);
        return match ? (!match[2] ? match[1] : `${match[1]}-${match[2]}`) : val;
    };

    const handleChange = (e) => {
        let { name, value, type, checked } = e.target;
        if (name === 'noKp') value = formatIC(value);
        if (name === 'noTel' || name === 'noTelPengganti' || name === 'cutiPenggantiNoTel') value = formatPhone(value);
        if (['flightPergiDari', 'flightPergiKe', 'flightBalikDari', 'flightBalikKe', 'flightPergiLeg2Dari', 'flightPergiLeg2Ke', 'flightBalikLeg2Dari', 'flightBalikLeg2Ke'].includes(name)) { value = value.toUpperCase().replace(/[^A-Z]/g, '').substring(0, 3); }
        setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const toggleAutoFieldsEdit = () => {
        if (isEditingAutoFields) { const selected = pegawaiDatabase.find(p => p.nama === formData.nama); if (selected) setFormData(prev => ({ ...prev, jawatan: selected.jawatan, bahagian: selected.bahagian, noTel: selected.noTel || prev.noTel })); }
        setIsEditingAutoFields(!isEditingAutoFields);
    };

    const handleCheckboxPeranan = (role) => { setFormData(prev => ({ ...prev, perananPeperiksaan: prev.perananPeperiksaan.includes(role) ? prev.perananPeperiksaan.filter(r => r !== role) : [...prev.perananPeperiksaan, role] })); };

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

    const isPegawaiComplete = formData.nama.trim() !== '' && formData.jawatan.trim() !== '' && formData.bahagian.trim() !== '' && formData.noKp.trim() !== '' && (activeForm === 'akujanji' || activeForm === 'laporan' || formData.noTel.trim() !== '');
    
    const isTugasComplete = formData.tujuan.trim() !== '' && formData.tempat.trim() !== '' && formData.tarikhPergi !== '' && formData.tarikhBalik !== '' && formData.caraPerjalanan.length > 0;
    const isPenggantiComplete = formData.namaPengganti.trim() !== '';
    
    const isFlightSingleComplete = () => formData.flightPergiDari.length === 3 && formData.flightPergiKe.length === 3 && formData.flightPergiMasa && formData.flightBalikDari.length === 3 && formData.flightBalikKe.length === 3 && formData.flightBalikMasa;
    const isFlightMultiComplete = () => formData.flightPergiDari.length === 3 && formData.flightPergiKe.length === 3 && formData.flightPergiMasa && formData.flightPergiLeg2Dari.length === 3 && formData.flightPergiLeg2Ke.length === 3 && formData.flightPergiLeg2Masa && formData.flightBalikDari.length === 3 && formData.flightBalikKe.length === 3 && formData.flightBalikMasa && formData.flightBalikLeg2Dari.length === 3 && formData.flightBalikLeg2Ke.length === 3 && formData.flightBalikLeg2Masa;
    const isTiketFlightComplete = formData.flightType === 'single' ? isFlightSingleComplete() : isFlightMultiComplete();
    const isTiketComplete = formData.caraPerjalanan.includes('Kapal Terbang (Waran Jabatan)') ? isTiketFlightComplete : true;
    
    const isPelepasanInfoComplete = formData.tempat.trim() !== '' && formData.subjek.trim() !== '' && formData.tarikhGantiDari !== '';
    const isTiketInfoComplete = formData.tujuan.trim() !== '' && formData.tempat.trim() !== '' && formData.tarikhPergi !== '' && formData.tarikhBalik !== '';
    
    const isCutiComplete = formData.jenisCuti !== '' && formData.cutiDari !== '' && formData.cutiHingga !== '' && formData.ketuaSokongan !== '' && formData.pegawaiPelulus !== '';
    const isCutiGantiComplete = () => (formData.jenisCuti !== 'Cuti Ganti' && formData.jenisCuti !== 'Cuti Tanpa Rekod') ? true : formData.cutiPenggantiNama.trim() !== '' && formData.cutiPenggantiTugas.trim() !== '';
    const isPerananComplete = formData.perananPeperiksaan.length > 0;
    const isTandatanganComplete = formData.tandatangan !== null;
    const isLaporanInfoComplete = formData.sesiPeperiksaan.trim() !== '' && formData.tarikhPeperiksaan !== '';
    const isLaporanSoalanComplete = formData.q1Status !== '' && formData.q2Status !== '' && formData.q3Status !== '';
    const isKursusComplete = formData.kursusNama.trim() !== '' && formData.kursusDari !== '' && formData.kursusHingga !== '' && (activeForm === 'pascaKursus' ? (formData.penyediaLatihan.trim() !== '' && formData.tempatKursus.trim() !== '' && formData.namaPenyelia.trim() !== '' && formData.jawatanPenyelia.trim() !== '') : true);
    
    const isPenilaianLepasKursusComplete = [formData.lkA1, formData.lkA2, formData.lkA3, formData.lkA4, formData.lkB1, formData.lkB2, formData.lkB3, formData.lkB4, formData.lkB5, formData.lkC1, formData.lkC2, formData.lkC3, formData.lkD1, formData.lkD2a, formData.lkD2b, formData.lkD2c, formData.lkD3b, formData.lkD3c, formData.lkD3d].every(v => v > 0);
    const isPenilaianPascaKursusComplete = [formData.pk1a, formData.pk1b, formData.pk1c, formData.pk1d].every(v => v > 0);

    const isAllComplete = activeForm === 'cuti' ? (isPegawaiComplete && isCutiComplete && isCutiGantiComplete())
        : activeForm === 'akujanji' ? (isPegawaiComplete && isPerananComplete && isTandatanganComplete)
        : activeForm === 'laporan' ? (isPegawaiComplete && isLaporanInfoComplete && isLaporanSoalanComplete && isTandatanganComplete)
        : activeForm === 'lepasKursus' ? (isPegawaiComplete && isKursusComplete && isPenilaianLepasKursusComplete)
        : activeForm === 'pascaKursus' ? (isPegawaiComplete && isKursusComplete && isPenilaianPascaKursusComplete)
        : activeForm === 'pelepasan' ? (isPegawaiComplete && isPelepasanInfoComplete && isPenggantiComplete && isTandatanganComplete)
        : activeForm === 'tempahanTiket' ? (isPegawaiComplete && isTiketInfoComplete && isTiketFlightComplete && isTandatanganComplete)
        : (isPegawaiComplete && isTugasComplete && isPenggantiComplete && isTiketComplete && isTandatanganComplete);

    const showNotification = (message, type = 'success') => { setNotification({ show: true, message, type }); setTimeout(() => setNotification({ show: false, message: '', type: '' }), 4000); };

    const toggleSection = (section) => {
        if (section !== 'pegawai' && !isPegawaiComplete) { showNotification("Sila lengkapkan Maklumat Pegawai terlebih dahulu.", "error"); document.getElementById('section-pegawai')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('pegawai'); setTimeout(() => setShakeSection(null), 500); return; }
        
        if (activeForm === 'tugas') {
            if ((section === 'pengganti' || section === 'tiket') && !isTugasComplete) { showNotification("Sila lengkapkan Maklumat Tugasan.", "error"); document.getElementById('section-tugas')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('tugas'); setTimeout(() => setShakeSection(null), 500); return; }
            if (section === 'tandatangan' && (!isTugasComplete || !isPenggantiComplete || !isTiketComplete)) { showNotification("Lengkapkan Tugasan & Pengganti.", "error"); document.getElementById('section-pengganti')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('pengganti'); setTimeout(() => setShakeSection(null), 500); return; }
        }
        else if (activeForm === 'pelepasan') {
            if (section === 'pengganti' && !isPelepasanInfoComplete) { showNotification("Sila lengkapkan Maklumat Tugas ditinggalkan.", "error"); document.getElementById('section-pelepasanInfo')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('pelepasanInfo'); setTimeout(() => setShakeSection(null), 500); return; }
            if (section === 'tandatangan' && !isPenggantiComplete) { showNotification("Sila lengkapkan Maklumat Pengganti.", "error"); document.getElementById('section-pengganti')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('pengganti'); setTimeout(() => setShakeSection(null), 500); return; }
        }
        else if (activeForm === 'tempahanTiket') {
            if (section === 'tiket' && !isTiketInfoComplete) { showNotification("Sila lengkapkan Maklumat Destinasi.", "error"); document.getElementById('section-tiketInfo')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('tiketInfo'); setTimeout(() => setShakeSection(null), 500); return; }
            if (section === 'tandatangan' && !isTiketFlightComplete) { showNotification("Sila lengkapkan Butiran Penerbangan.", "error"); document.getElementById('section-tiket')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('tiket'); setTimeout(() => setShakeSection(null), 500); return; }
        }
        else if (activeForm === 'akujanji' && section === 'tandatangan' && !isPerananComplete) { showNotification("Pilih sekurang-kurangnya satu Peranan.", "error"); document.getElementById('section-peranan')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('peranan'); setTimeout(() => setShakeSection(null), 500); return; }
        else if (activeForm === 'laporan') {
            if (section === 'laporanSoalan' && !isLaporanInfoComplete) { showNotification("Lengkapkan Maklumat Peperiksaan.", "error"); document.getElementById('section-laporanInfo')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('laporanInfo'); setTimeout(() => setShakeSection(null), 500); return; }
            if (section === 'tandatangan' && !isLaporanSoalanComplete) { showNotification("Lengkapkan Status & Cadangan.", "error"); document.getElementById('section-laporanSoalan')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('laporanSoalan'); setTimeout(() => setShakeSection(null), 500); return; }
        }
        else if ((activeForm === 'lepasKursus' || activeForm === 'pascaKursus') && section === 'penilaian' && !isKursusComplete) { showNotification("Sila lengkapkan Maklumat Kursus.", "error"); document.getElementById('section-kursus')?.scrollIntoView({ behavior: 'smooth', block: 'center' }); setShakeSection('kursus'); setTimeout(() => setShakeSection(null), 500); return; }
        
        setExpanded(prev => ({ pegawai: section === 'pegawai' ? !prev.pegawai : false, tugas: section === 'tugas' ? !prev.tugas : false, pengganti: section === 'pengganti' ? !prev.pengganti : false, tiket: section === 'tiket' ? !prev.tiket : false, cuti: section === 'cuti' ? !prev.cuti : false, peranan: section === 'peranan' ? !prev.peranan : false, tandatangan: section === 'tandatangan' ? !prev.tandatangan : false, laporanInfo: section === 'laporanInfo' ? !prev.laporanInfo : false, laporanSoalan: section === 'laporanSoalan' ? !prev.laporanSoalan : false, kursus: section === 'kursus' ? !prev.kursus : false, penilaian: section === 'penilaian' ? !prev.penilaian : false, pelepasanInfo: section === 'pelepasanInfo' ? !prev.pelepasanInfo : false, tiketInfo: section === 'tiketInfo' ? !prev.tiketInfo : false }));
    };

    const nextSection = (current, nextSectionName) => {
        if (activeForm === 'tugas' && nextSectionName === 'tiket' && !formData.caraPerjalanan.includes('Kapal Terbang (Waran Jabatan)')) { nextSectionName = 'tandatangan'; }
        setExpanded({ pegawai: nextSectionName === 'pegawai', tugas: nextSectionName === 'tugas', pengganti: nextSectionName === 'pengganti', tiket: nextSectionName === 'tiket', cuti: nextSectionName === 'cuti', peranan: nextSectionName === 'peranan', tandatangan: nextSectionName === 'tandatangan', laporanInfo: nextSectionName === 'laporanInfo', laporanSoalan: nextSectionName === 'laporanSoalan', kursus: nextSectionName === 'kursus', penilaian: nextSectionName === 'penilaian', pelepasanInfo: nextSectionName === 'pelepasanInfo', tiketInfo: nextSectionName === 'tiketInfo' });
        if (nextSectionName === 'jana') { setTimeout(() => document.getElementById('jana-button-container')?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 200); }
    };

    useEffect(() => {
        if (expanded.tandatangan && canvasRef.current) {
            const initCanvas = () => { const canvas = canvasRef.current; if (!canvas) return; const ctx = canvas.getContext('2d'); const rect = canvas.parentElement.getBoundingClientRect(); const dpr = window.devicePixelRatio || 1; canvas.width = rect.width * dpr; canvas.height = 200 * dpr; ctx.scale(dpr, dpr); ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.lineWidth = 3; ctx.strokeStyle = '#0f172a'; };
            initCanvas(); window.addEventListener('resize', initCanvas); return () => window.removeEventListener('resize', initCanvas);
        }
    }, [expanded.tandatangan]);

    const getCoordinates = (e) => { const canvas = canvasRef.current; const rect = canvas.getBoundingClientRect(); let clientX = e.touches ? e.touches[0].clientX : e.clientX; let clientY = e.touches ? e.touches[0].clientY : e.clientY; return { x: clientX - rect.left, y: clientY - rect.top }; };
    const startDrawing = (e) => { isDrawing.current = true; const coords = getCoordinates(e); lastPos.current = coords; const ctx = canvasRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(coords.x, coords.y); ctx.lineTo(coords.x, coords.y); ctx.stroke(); };
    const draw = (e) => { if (!isDrawing.current) return; if (e.cancelable) e.preventDefault(); const coords = getCoordinates(e); const ctx = canvasRef.current.getContext('2d'); ctx.beginPath(); ctx.moveTo(lastPos.current.x, lastPos.current.y); ctx.lineTo(coords.x, coords.y); ctx.stroke(); lastPos.current = coords; };
    const stopDrawing = () => { if(isDrawing.current) { isDrawing.current = false; saveSignature(); } };
    const clearSignature = () => { const canvas = canvasRef.current; if(canvas) { const ctx = canvas.getContext('2d'); ctx.clearRect(0, 0, canvas.width, canvas.height); } setFormData(prev => ({ ...prev, tandatangan: null })); };
    const cropCanvas = (sourceCanvas) => {
        const ctx = sourceCanvas.getContext('2d'); const imageData = ctx.getImageData(0, 0, sourceCanvas.width, sourceCanvas.height); const data = imageData.data;
        let minX = sourceCanvas.width, minY = sourceCanvas.height, maxX = 0, maxY = 0, hasPixels = false;
        for (let y = 0; y < sourceCanvas.height; y++) { for (let x = 0; x < sourceCanvas.width; x++) { if (data[(y * sourceCanvas.width + x) * 4 + 3] > 5) { minX = Math.min(minX, x); minY = Math.min(minY, y); maxX = Math.max(maxX, x); maxY = Math.max(maxY, y); hasPixels = true; } } }
        if (!hasPixels) return null;
        const padding = 15; minX = Math.max(0, minX - padding); minY = Math.max(0, minY - padding); maxX = Math.min(sourceCanvas.width, maxX + padding); maxY = Math.min(sourceCanvas.height, maxY + padding);
        const width = maxX - minX; const height = maxY - minY;
        const croppedCanvas = document.createElement('canvas'); croppedCanvas.width = width; croppedCanvas.height = height;
        croppedCanvas.getContext('2d').putImageData(ctx.getImageData(minX, minY, width, height), 0, 0); return croppedCanvas.toDataURL('image/png');
    };
    const saveSignature = () => { const canvas = canvasRef.current; if(canvas) { const croppedImage = cropCanvas(canvas); if (croppedImage) setFormData(prev => ({ ...prev, tandatangan: croppedImage })); } };
    const handleSignatureUpload = (e) => {
        const file = e.target.files[0]; if (!file) return; const reader = new FileReader();
        reader.onload = (event) => { const img = new Image(); img.onload = () => { const tempCanvas = document.createElement('canvas'); const ctx = tempCanvas.getContext('2d'); tempCanvas.width = img.width; tempCanvas.height = img.height; ctx.drawImage(img, 0, 0); const imageData = ctx.getImageData(0, 0, tempCanvas.width, tempCanvas.height); const data = imageData.data; for (let i = 0; i < data.length; i += 4) { if ((data[i] * 0.299 + data[i+1] * 0.587 + data[i+2] * 0.114) > 130) data[i+3] = 0; else { data[i] = 15; data[i+1] = 23; data[i+2] = 42; data[i+3] = 255; } } ctx.putImageData(imageData, 0, 0); const croppedImage = cropCanvas(tempCanvas); if (croppedImage) { setFormData(prev => ({ ...prev, tandatangan: croppedImage })); showNotification("Tandatangan berjaya dimuat naik."); } else showNotification("Tandatangan tidak dapat dikesan.", "error"); }; img.src = event.target.result; }; reader.readAsDataURL(file);
    };

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
                } 
                else if (activeForm === 'pelepasan') {
                    generateForm2(doc, preloadedLogo, formData);
                    doc.save(formData.nama ? `Borang_Pelepasan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_Pelepasan.pdf');
                    showNotification("Borang Pelepasan Tugas Sementara berjaya dijana!");
                }
                else if (activeForm === 'tempahanTiket') {
                    generateForm3(doc, formData);
                    doc.save(formData.nama ? `Borang_Tiket_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_Tiket.pdf');
                    showNotification("Borang Tempahan Tiket berjaya dijana!");
                }
                else if (activeForm === 'akujanji') {
                    generateFormAkujanji(doc, preloadedLogo, formData, peperiksaanRoles);
                    doc.save(formData.nama ? `Akujanji_Peperiksaan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Akujanji_Peperiksaan.pdf');
                    showNotification("Surat Akujanji Integriti berjaya dijana!");
                } 
                else if (activeForm === 'laporan') {
                    generateFormLaporan(doc, preloadedLogo, formData);
                    doc.save(formData.nama ? `Laporan_Peperiksaan_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Laporan_Peperiksaan.pdf');
                    showNotification("Laporan Pelaksanaan Peperiksaan berjaya dijana!");
                } 
                else if (activeForm === 'lepasKursus') {
                    generateFormLepasKursus(doc, preloadedLogo, formData);
                    doc.save(formData.nama ? `Penilaian_Lepas_Kursus_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Penilaian_Lepas_Kursus.pdf');
                    showNotification("Borang Penilaian Lepas Kursus berjaya dijana!");
                } 
                else if (activeForm === 'pascaKursus') {
                    generateFormPascaKursus(doc, preloadedLogo, formData);
                    doc.save(formData.nama ? `Penilaian_Pasca_Kursus_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Penilaian_Pasca_Kursus.pdf');
                    showNotification("Borang Penilaian Pasca Kursus berjaya dijana!");
                } 
                else {
                    generateForm1(doc, preloadedLogo, formData);
                    if ((formData.subjek.trim() !== '' || formData.namaPengganti.trim() !== '') && formData.namaPengganti !== 'TIADA PENGGANTI') { doc.addPage(); generateForm2(doc, preloadedLogo, formData); }
                    if (formData.caraPerjalanan.includes('Kapal Terbang (Waran Jabatan)')) { doc.addPage(); generateForm3(doc, formData); }
                    doc.save(formData.nama ? `Borang_TugasRasmi_${formData.nama.replace(/\s+/g, '_')}.pdf` : 'Borang_TugasRasmi.pdf');
                    showNotification("Semua dokumen rasmi berjaya disatukan ke dalam 1 fail PDF!");
                }

                setIsGenerating(false);
                setTimeout(() => { window.location.reload(); }, 2000);
            } catch (error) { setIsGenerating(false); showNotification("Ralat berlaku semasa menjana fail.", "error"); }
        }, 150);
    };

    // ================== PAPARAN UTAMA (MODERN DASHBOARD) ==================
    if (activeForm === null) {
        
        const todayDateObj = new Date();
        const formattedDate = todayDateObj.toLocaleDateString('ms-MY', { day: 'numeric', month: 'long', year: 'numeric' });
        const formattedDay = todayDateObj.toLocaleDateString('ms-MY', { weekday: 'long' });

        return (
            <div className="min-h-screen relative flex flex-col font-sans overflow-x-hidden bg-slate-50">
                
                {/* Latar Belakang Gambar Bangunan */}
                <div 
                    className="absolute inset-0 z-0 pointer-events-none"
                    style={{
                        backgroundImage: `url(${adtecBg})`, 
                        backgroundPosition: 'right center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}
                ></div>

                {/* ✅ KEMAS KINI: Efek Gradient tanpa efek 'blur' supaya background nampak lebih jelas */}
                <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/80 to-slate-50/90 md:bg-gradient-to-r md:from-white md:via-white/80 md:to-transparent z-0 pointer-events-none"></div>

                {/* Navbar */}
                <nav className="fixed top-4 w-[95%] max-w-7xl mx-auto bg-white/90 backdrop-blur-md border border-slate-200/60 z-50 px-4 md:px-6 py-2.5 flex justify-between items-center shadow-sm rounded-2xl left-0 right-0">
                    <div className="flex items-center gap-3">
                        {isLogoLoading ? (
                            <div className="w-10 h-10 rounded-full border-2 border-slate-100 border-t-blue-600 animate-spin"></div>
                        ) : preloadedLogo ? (
                            <img src={preloadedLogo} alt="Logo" className="h-10 w-auto mix-blend-multiply" />
                        ) : null}
                        <div className="hidden sm:block leading-tight">
                            <div className="font-extrabold text-slate-800 text-[14px] tracking-tight">iFMS</div>
                            <div className="text-[11px] text-slate-500 font-semibold tracking-wide">ADTEC JTM Kampus Sandakan</div>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="hidden md:flex items-center gap-2 text-[12px] font-bold text-slate-500">
                            <span className="text-blue-700 flex items-center gap-1.5 bg-blue-50/80 px-3 py-1.5 rounded-xl cursor-default">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
                                Utama
                            </span>
                            
                            <button onClick={() => setShowPanduan(true)} className="flex items-center gap-1.5 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer transition-colors focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                                Panduan
                            </button>
                            
                            <button onClick={() => setShowHubungi(true)} className="flex items-center gap-1.5 hover:text-slate-800 hover:bg-slate-100 px-3 py-1.5 rounded-xl cursor-pointer transition-colors focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                Hubungi
                            </button>
                        </div>
                        
                        <div className="hidden md:block h-6 w-px bg-slate-200"></div>
                        
                        <div className="bg-slate-50 border border-slate-200/60 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm">
                            <div className="text-slate-400">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </div>
                            <div className="text-left">
                                <div className="text-[12px] font-extrabold text-slate-700 leading-tight">{formattedDate}</div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-tight">{formattedDay}</div>
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="relative z-10 w-full max-w-7xl mx-auto pt-32 pb-16 px-4 md:px-8 flex-1 flex flex-col justify-center">
                    
                    <div className="mb-10 animate-slide-up text-left">
                        <h1 className="text-[32px] sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15] mb-3 text-slate-900 drop-shadow-sm">
                            i-Form Management System (iFMS)<br/>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-teal-500">ADTEC JTM Kampus Sandakan</span>
                        </h1>
                        <p className="text-[14px] sm:text-[16px] md:text-lg text-slate-600 font-medium max-w-3xl leading-relaxed mt-3">
                            Sistem pengurusan dan penjanaan dokumen rasmi secara digital, pantas dan sistematik.
                        </p>
                        {/* Butang Navigasi (Hanya di Mobile) */}
                        <div className="flex md:hidden items-center gap-3 mt-6">
                            <button onClick={() => setShowPanduan(true)} className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[13px] font-bold shadow-sm">
                                Panduan
                            </button>
                            <button onClick={() => setShowHubungi(true)} className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-4 py-2 rounded-xl text-[13px] font-bold shadow-sm">
                                Hubungi
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        
                        <button onClick={() => { setActiveForm('tugas'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-blue-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-blue-50 opacity-60 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.2-1.1.7l-1.2 3.6 7.7 4.4-3.5 3.5-3.5-.9c-.5-.1-1 .2-1.3.7l-1 2.6 5.8 1.5 1.5 5.8 2.6-1c.5-.3.8-.8.7-1.3l-.9-3.5 3.5-3.5 4.4 7.7 3.6-1.2c.5-.2.8-.6.7-1.1z"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Borang Tugas Rasmi</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Kebenaran tugas luar kawasan & waran.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                        <button onClick={() => { setActiveForm('pelepasan'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-rose-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-rose-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-rose-50 opacity-60 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m16 13-4-4-4 4"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-rose-50 text-rose-600 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect><path d="M9 14h6"></path><path d="M9 10h6"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Borang Pelepasan</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Pelepasan tugas / kuliah (Lampiran 7).</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                        <button onClick={() => { setActiveForm('tempahanTiket'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-cyan-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-cyan-50 opacity-60 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-cyan-50 text-cyan-600 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"></path><path d="M22 2 11 13"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Tempahan Tiket</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Tempahan tiket penerbangan.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                        <button onClick={() => { setActiveForm('cuti'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-emerald-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-emerald-50 opacity-60 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8 2v4"></path><path d="M16 2v4"></path><rect width="18" height="18" x="3" y="4" rx="2"></rect><path d="M3 10h18"></path><path d="m9 16 2 2 4-4"></path></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Borang Cuti Manual</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Borang permohonan Cuti Rehat, Cuti Ganti, dan Cuti Kecemasan.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                        <button onClick={() => { setActiveForm('akujanji'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-indigo-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-indigo-50 opacity-60 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="m9 15 2 2 4-4"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Surat Akujanji</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Pengisytiharan integriti untuk petugas bagi Peperiksaan Akhir JTM.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                        <button onClick={() => { setActiveForm('laporan'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-amber-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-amber-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-amber-50 opacity-60 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="10 9 9 9 8 9"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="10 9 9 9 8 9"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Laporan Peperiksaan</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Laporan pelaksanaan Peperiksaan Akhir oleh Ketua Pengawas.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-amber-50 text-amber-500 group-hover:bg-amber-500 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                        <button onClick={() => { setActiveForm('lepasKursus'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-sky-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-sky-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-sky-50 opacity-60 transform group-hover:scale-110 group-hover:-rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><path d="M9 15l2 2 4-4"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Penilaian Lepas Kursus</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Borang Lampiran A untuk diisi sebaik sahaja kembali berkursus.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-sky-50 text-sky-500 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>
                        
                        <button onClick={() => { setActiveForm('pascaKursus'); setExpanded({...expanded, pegawai: true}); }} className="group relative bg-white/80 backdrop-blur-xl border border-slate-100 hover:border-purple-200 p-6 rounded-3xl shadow-lg shadow-slate-200/40 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 transform hover:-translate-y-1 text-left overflow-hidden min-h-[180px] sm:min-h-[200px] flex flex-col justify-between">
                            <div className="absolute top-4 right-4 text-purple-50 opacity-60 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
                                <svg xmlns="http://www.w3.org/2000/svg" width="90" height="90" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                            </div>
                            <div className="relative z-10">
                                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-[14px] flex items-center justify-center mb-4 shadow-sm group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
                                </div>
                                <div>
                                    <h3 className="text-[18px] font-extrabold text-slate-800 mb-1">Penilaian Pasca Kursus</h3>
                                    <p className="text-[13px] font-medium text-slate-500 leading-relaxed max-w-[90%]">Borang Lampiran B untuk dinilai oleh penyelia selepas 3 bulan.</p>
                                </div>
                            </div>
                            <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full flex items-center justify-center bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white transition-colors duration-300">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </div>
                        </button>

                    </div>
                </div>

                <footer className="w-full border-t border-slate-200/60 bg-white/70 backdrop-blur-md mt-auto z-10 relative">
                    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="text-[12px] font-bold text-slate-400 text-center md:text-left">
                            © {todayDateObj.getFullYear()} ADTEC JTM Kampus Sandakan. <span className="mx-2 font-normal hidden sm:inline">|</span><br className="sm:hidden"/> iFMS v1.0
                        </div>
                        <div className="flex flex-wrap justify-center items-center gap-3 text-[11px] sm:text-[12px] font-extrabold tracking-widest text-slate-400 uppercase">
                            <span className="hover:text-blue-500 transition-colors cursor-default">Profesional</span>
                            <span className="text-slate-300">•</span>
                            <span className="hover:text-emerald-500 transition-colors cursor-default">Integriti</span>
                            <span className="text-slate-300">•</span>
                            <span className="hover:text-amber-500 transition-colors cursor-default">Inovatif</span>
                            <span className="text-slate-300">•</span>
                            <span className="hover:text-purple-500 transition-colors cursor-default">Kolaboratif</span>
                        </div>
                    </div>
                </footer>
                
                {showPanduan && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-slide-up">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
                            <button onClick={() => setShowPanduan(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-blue-100 text-blue-600 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
                                </div>
                                Panduan Penggunaan
                            </h2>
                            <div className="space-y-5 text-sm text-slate-600 font-medium">
                                <div className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold flex-shrink-0 border border-blue-100">1</span> 
                                    <p className="pt-1 leading-relaxed">Pilih <strong className="text-slate-800">Modul Borang</strong> yang bersesuaian dari menu utama di halaman ini.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold flex-shrink-0 border border-blue-100">2</span> 
                                    <p className="pt-1 leading-relaxed">Lengkapkan semua maklumat yang diwajibkan <strong className="text-red-500">(*)</strong> mengikut turutan seksyen.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold flex-shrink-0 border border-blue-100">3</span> 
                                    <p className="pt-1 leading-relaxed">Turunkan <strong className="text-slate-800">Tandatangan Digital</strong> anda menggunakan tetikus atau skrin sentuh di ruangan yang disediakan.</p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center font-extrabold flex-shrink-0 border border-blue-100">4</span> 
                                    <p className="pt-1 leading-relaxed">Klik butang <strong className="text-slate-800">Jana & Muat Turun</strong>. Fail PDF berformat rasmi akan disimpan terus ke peranti anda.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {showHubungi && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-slide-up">
                        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
                            <button onClick={() => setShowHubungi(false)} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                            </button>
                            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="p-2 bg-indigo-100 text-indigo-600 rounded-xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                </div>
                                Hubungi Kami
                            </h2>
                            <div className="space-y-6 text-[14px] text-slate-600 font-medium">
                                <div className="flex gap-4 items-start">
                                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400 mt-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                                    </div>
                                    <div className="leading-relaxed">
                                        <strong className="text-slate-800 block mb-1">Kolej Teknologi Termaju (ADTEC)</strong>
                                        Jabatan Tenaga Manusia,<br/>Kampus Sandakan,<br/>Batu 5 Jalan Sibuga,<br/>90000 Sandakan, Sabah.
                                    </div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
                                    </div>
                                    <div><strong className="text-slate-800 mr-2">Tel:</strong> 089-240500</div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>
                                    </div>
                                    <div><strong className="text-slate-800 mr-2">E-mel:</strong> <a href="mailto:ilpsdk@jtm.gov.my" className="text-blue-600 hover:text-blue-700 hover:underline">ilpsdk@jtm.gov.my</a></div>
                                </div>
                                <div className="flex gap-4 items-center">
                                    <div className="p-2.5 bg-slate-50 border border-slate-100 rounded-xl text-slate-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>
                                    </div>
                                    <div><strong className="text-slate-800 mr-2">Website:</strong> <a href="https://adtecsandakan.gov.my" target="_blank" rel="noreferrer" className="text-blue-600 hover:text-blue-700 hover:underline">adtecsandakan.gov.my</a></div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className="pb-12 relative min-h-screen bg-slate-50/50">
            {/* Header & Button forms... kekal sama... */}
            <div className="absolute top-6 left-4 md:left-6 z-50 animate-slide-up">
                <button onClick={() => setActiveForm(null)} className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-md border border-slate-200 rounded-full text-[13px] font-extrabold text-slate-500 hover:text-slate-800 hover:border-slate-300 hover:shadow-md shadow-sm transition-all group">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
                    <span className="hidden sm:block">Halaman Utama</span>
                </button>
            </div>

            <header className="relative pt-16 pb-10 px-6 max-w-3xl mx-auto text-center">
                <div className={`inline-flex items-center justify-center p-3 rounded-2xl mb-6 text-white shadow-xl transform -rotate-3 hover:rotate-0 transition-transform duration-300 ${activeForm === 'cuti' ? 'bg-emerald-600 shadow-emerald-500/30' : activeForm === 'akujanji' ? 'bg-indigo-600 shadow-indigo-500/30' : activeForm === 'laporan' ? 'bg-amber-500 shadow-amber-500/30' : activeForm === 'lepasKursus' ? 'bg-sky-500 shadow-sky-500/30' : activeForm === 'pascaKursus' ? 'bg-purple-600 shadow-purple-500/30' : activeForm === 'pelepasan' ? 'bg-rose-500 shadow-rose-500/30' : activeForm === 'tempahanTiket' ? 'bg-cyan-500 shadow-cyan-500/30' : 'bg-blue-600 shadow-blue-500/30'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                </div>
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                    {activeForm === 'cuti' ? 'Borang Cuti Manual' : activeForm === 'akujanji' ? 'Surat Akujanji Peperiksaan' : activeForm === 'laporan' ? 'Laporan Peperiksaan Akhir' : activeForm === 'lepasKursus' ? 'Penilaian Lepas Kursus' : activeForm === 'pascaKursus' ? 'Penilaian Pasca Kursus' : activeForm === 'pelepasan' ? 'Borang Pelepasan Tugas' : activeForm === 'tempahanTiket' ? 'Tempahan Tiket Penerbangan' : 'Borang Tugas Rasmi'} <br />
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
                
                <div id="section-pegawai" className={`bg-white/90 backdrop-blur-xl rounded-[2rem] shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 overflow-hidden transition-all duration-500 ${expanded.pegawai ? 'ring-[3px] ring-blue-500/20' : 'hover:shadow-md'} ${shakeSection === 'pegawai' ? 'animate-shake border-red-400' : ''}`}>
                    <div onClick={() => toggleSection('pegawai')} className="cursor-pointer px-6 py-5 flex items-center justify-between bg-white hover:bg-slate-50 transition-colors">
                        <div className="flex items-center gap-4">
                            <div className={`p-2.5 rounded-xl transition-colors ${expanded.pegawai ? 'bg-blue-600 text-white shadow-md shadow-blue-500/30' : (isPegawaiComplete ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600')}`}>
                                {isPegawaiComplete && !expanded.pegawai ? <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>}
                            </div>
                            <div>
                                <h2 className="text-lg font-extrabold text-slate-800">{activeForm === 'pascaKursus' ? 'Maklumat Pegawai Dinilai' : 'Maklumat Pegawai'} {isPegawaiComplete && !expanded.pegawai && <span className="ml-2 text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">Lengkap</span>}</h2>
                                {!expanded.pegawai && <p className="text-[13px] text-slate-500 font-semibold mt-0.5">{formData.nama || 'Wajib dilengkapkan dahulu'}</p>}
                            </div>
                        </div>
                        <div className={`p-1.5 rounded-full transition-transform duration-300 ${expanded.pegawai ? 'rotate-180 bg-blue-50 text-blue-600' : 'text-slate-400'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                        </div>
                    </div>
                    {expanded.pegawai && (
                        <div className="p-6 md:p-8 pt-2 border-t border-slate-50 bg-white animate-slide-up">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-7">
                                <div className="md:col-span-2">
                                    <label className={formLabelClass}>
                                        Nama Penuh <span className="text-red-500">*</span>
                                        <button type="button" onClick={() => { setIsManualName(!isManualName); setFormData(prev => ({ ...prev, nama: '', jawatan: '', bahagian: '', noKp: '', noTel: '' })); if (!isManualName) setIsEditingAutoFields(true); }} className={`ml-3 normal-case font-bold text-[10px] px-2 py-0.5 rounded-md border transition-all ${isManualName ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-blue-50 text-blue-500 border-blue-100 hover:bg-blue-100'}`}>
                                            {isManualName ? <span className="flex items-center gap-1"><UnlockIcon /> Pilih dari senarai</span> : <span className="flex items-center gap-1"><EditIcon /> Isi manual</span>}
                                        </button>
                                    </label>
                                    <div className="relative">
                                        {!isManualName ? (
                                            <>
                                                <select name="nama" value={formData.nama} onChange={handleChange} className={`${formInputClass} appearance-none cursor-pointer relative z-10 ${formData.nama ? 'text-slate-800' : 'text-slate-400 font-medium'}`}>
                                                    <option value="" disabled>-- Sila Pilih Nama --</option>
                                                    {[...pegawaiDatabase].sort((a,b) => a.nama.localeCompare(b.nama)).map((p, idx) => (
                                                        <option key={idx} value={p.nama}>{p.nama} ({p.bahagian})</option>
                                                    ))}
                                                </select>
                                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400 z-20"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg></div>
                                            </>
                                        ) : (
                                            <input type="text" name="nama" value={formData.nama} onChange={handleChange} className={formInputClass} placeholder="Sila taip nama penuh anda..." />
                                        )}
                                    </div>
                                </div>
                                <div>
                                    <label className={formLabelClass}>
                                        Jawatan <span className="text-red-500">*</span> 
                                        {(isKnownStaff || !isManualName) && (
                                            <button type="button" onClick={toggleAutoFieldsEdit} className={`ml-2 normal-case font-bold text-[10px] px-2 py-0.5 rounded-md border transition-all ${isEditingAutoFields ? 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100' : 'bg-blue-50 text-blue-500 border-blue-100 hover:bg-blue-100'}`}>
                                                {isEditingAutoFields ? <span className="flex items-center gap-1"><UnlockIcon /> Tutup Edit</span> : <span className="flex items-center gap-1"><EditIcon /> Edit</span>}
                                            </button>
                                        )}
                                    </label>
                                    <input type="text" name="jawatan" value={formData.jawatan} onChange={handleChange} className={`${formInputClass} ${!isManualName && isKnownStaff && !isEditingAutoFields ? 'bg-slate-50/70 text-slate-500 border-slate-200 cursor-not-allowed opacity-80' : ''}`} placeholder="Contoh: Pengajar" readOnly={!isManualName && isKnownStaff && !isEditingAutoFields} />
                                </div>
                                <div>
                                    <UniversalSelect name="bahagian" value={formData.bahagian} label={<>Bahagian / Unit <span className="text-red-500">*</span> {!isManualName && isKnownStaff && !isEditingAutoFields && <span className="text-blue-500 ml-2 normal-case font-bold text-[10px] bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">Auto-isi</span>}</>} options={unitOptions} onChange={handleChange} placeholder="Pilih Unit" disabled={!isManualName && isKnownStaff && !isEditingAutoFields} />
                                </div>
                                <div>
                                    <label className={formLabelClass}>No. Kad Pengenalan <span className="text-red-500">*</span></label>
                                    <input type="text" name="noKp" value={formData.noKp} onChange={handleChange} className={formInputClass} placeholder="000000-00-0000" />
                                </div>
                                {(activeForm !== 'akujanji' && activeForm !== 'laporan') && (
                                    <div>
                                        <label className={formLabelClass}>No. Telefon <span className="text-red-500">*</span></label>
                                        <input type="text" name="noTel" value={formData.noTel} onChange={handleChange} className={formInputClass} placeholder="01X-XXXXXXX" />
                                    </div>
                                )}
                            </div>
                            <div className="mt-8 flex justify-end">
                                <button onClick={() => nextSection('pegawai', activeForm === 'cuti' ? 'cuti' : activeForm === 'akujanji' ? 'peranan' : activeForm === 'laporan' ? 'laporanInfo' : (activeForm === 'lepasKursus' || activeForm === 'pascaKursus') ? 'kursus' : activeForm === 'pelepasan' ? 'pelepasanInfo' : activeForm === 'tempahanTiket' ? 'tiketInfo' : 'tugas')} className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2">
                                    Seterusnya <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* KOMPONEN BORANG LAIN */}
                {activeForm === 'cuti' && <FormCuti formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} pegawaiDatabase={pegawaiDatabase} isPegawaiComplete={isPegawaiComplete} isCutiComplete={isCutiComplete} calculateDays={calculateDays} handleCutiPenggantiChange={handleCutiPenggantiChange} shakeSection={shakeSection} isCutiGantiComplete={isCutiGantiComplete} />}
                
                {activeForm === 'akujanji' && <FormAkujanji formData={formData} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formLabelClass={formLabelClass} peperiksaanRoles={peperiksaanRoles} handleCheckboxPeranan={handleCheckboxPeranan} isPegawaiComplete={isPegawaiComplete} isPerananComplete={isPerananComplete} isTandatanganComplete={isTandatanganComplete} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} shakeSection={shakeSection} />}
                
                {activeForm === 'laporan' && <FormLaporan formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} isPegawaiComplete={isPegawaiComplete} isLaporanInfoComplete={isLaporanInfoComplete} isLaporanSoalanComplete={isLaporanSoalanComplete} isTandatanganComplete={isTandatanganComplete} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} shakeSection={shakeSection} />}
                
                {activeForm === 'tugas' && <FormTugas formData={formData} handleChange={handleChange} setFormData={setFormData} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} pegawaiDatabase={pegawaiDatabase} malaysiaAirports={malaysiaAirports} getAirportName={getAirportName} setRoute={setRoute} isPegawaiComplete={isPegawaiComplete} isTugasComplete={isTugasComplete} isPenggantiComplete={isPenggantiComplete} isTiketComplete={isTiketComplete} isTandatanganComplete={isTandatanganComplete} jumlahHari={jumlahHari} isGantiDateLocked={isGantiDateLocked} setIsGantiDateLocked={setIsGantiDateLocked} handlePenggantiChange={handlePenggantiChange} shakeSection={shakeSection} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} />}
                
                {activeForm === 'lepasKursus' && <FormLepasKursus formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} isPegawaiComplete={isPegawaiComplete} isKursusComplete={isKursusComplete} isPenilaianComplete={isPenilaianLepasKursusComplete} shakeSection={shakeSection} calculateDays={calculateDays} />}
                
                {activeForm === 'pascaKursus' && <FormPascaKursus formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} isPegawaiComplete={isPegawaiComplete} isKursusComplete={isKursusComplete} isPenilaianComplete={isPenilaianPascaKursusComplete} shakeSection={shakeSection} calculateDays={calculateDays} />}

                {activeForm === 'pelepasan' && <FormPelepasan formData={formData} handleChange={handleChange} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} pegawaiDatabase={pegawaiDatabase} isPegawaiComplete={isPegawaiComplete} isPelepasanInfoComplete={isPelepasanInfoComplete} isPenggantiComplete={isPenggantiComplete} isTandatanganComplete={isTandatanganComplete} handlePenggantiChange={handlePenggantiChange} shakeSection={shakeSection} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} />}
                
                {activeForm === 'tempahanTiket' && <FormTiket formData={formData} handleChange={handleChange} setFormData={setFormData} expanded={expanded} toggleSection={toggleSection} nextSection={nextSection} formInputClass={formInputClass} formLabelClass={formLabelClass} malaysiaAirports={malaysiaAirports} getAirportName={getAirportName} setRoute={setRoute} isPegawaiComplete={isPegawaiComplete} isTiketInfoComplete={isTiketInfoComplete} isTiketFlightComplete={isTiketFlightComplete} isTandatanganComplete={isTandatanganComplete} shakeSection={shakeSection} canvasRef={canvasRef} startDrawing={startDrawing} draw={draw} stopDrawing={stopDrawing} clearSignature={clearSignature} handleSignatureUpload={handleSignatureUpload} />}

                {/* BUTANG JANA PDF */}
                <div id="jana-button-container" className="mt-12 mb-16 animate-slide-up" style={{animationDelay: '0.5s'}}>
                    <button onClick={handleGenerateAll} disabled={isGenerating || isLogoLoading} className={`group relative w-full flex items-center justify-center gap-4 py-5 px-8 rounded-3xl overflow-hidden transition-all duration-300 ${isGenerating || isLogoLoading ? 'bg-slate-300 cursor-not-allowed opacity-80' : (!isAllComplete ? 'bg-slate-800 hover:bg-slate-700' : 'bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-500/30')} transform hover:-translate-y-1 active:scale-[0.98]`}>
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
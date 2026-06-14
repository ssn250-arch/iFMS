import autoTable from 'jspdf-autotable';

// ================== FUNGSI BANTUAN (HELPER) ==================
const val = (text) => (text && text.toString().trim() !== '') ? text : '-';

const calculateDays = (start, end) => {
    if (!start || !end) return 0;
    const diffTime = new Date(end).getTime() - new Date(start).getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays > 0 ? diffDays : 0;
};

// ================== PENJANAAN PDF ==================

export const generateForm1 = (doc, logoImgBase64, formData) => {
    doc.setFont("helvetica");
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text("LAMPIRAN A", 190, 15, { align: 'right' });
    
    let currentY = 18;
    if(logoImgBase64) { 
        doc.addImage(logoImgBase64, 'JPEG', 92.5, currentY, 25, 20);
        currentY += 25; 
    } else { 
        currentY += 10;
    }

    doc.setFontSize(10); doc.text("JABATAN TENAGA MANUSIA", 105, currentY, { align: 'center' });
    currentY += 6;
    doc.text("BORANG KEBENARAN MENJALANKAN TUGASAN RASMI DILUAR IBU PEJABAT", 105, currentY, { align: 'center' }); currentY += 4.5;
    doc.setFont("helvetica", "normal"); doc.setFontSize(8.5); doc.text("( Borang ini hendaklah diisi sebelum memulakan perjalanan )", 105, currentY, { align: 'center' });
    currentY += 10;
    
    doc.setFontSize(9);
    doc.text("1.", 18, currentY); doc.text("Nama Pemohon", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.nama), 78, currentY); currentY += 6;
    doc.text("2.", 18, currentY); doc.text("Jawatan", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.jawatan), 78, currentY); currentY += 6;
    doc.text("3.", 18, currentY);
    doc.text("Bahagian/Unit", 28, currentY); doc.text(":", 75, currentY); doc.text(val(formData.bahagian), 78, currentY); currentY += 6;
    doc.text("4.", 18, currentY); doc.text("No. Pendaftaran/Jenis Kenderaan", 28, currentY);
    doc.text(":", 75, currentY); doc.text(val(formData.noKenderaan), 78, currentY); currentY += 6;

    doc.text("5.", 18, currentY); doc.text("Butiran Tugasan :", 28, currentY); currentY += 4.5;
    doc.text("(Gunakan Lampiran sekiranya ruangan tidak mencukupi)", 28, currentY);

    const tPergiFormat = formData.tarikhPergi ? formData.tarikhPergi.split('-').reverse().join('/') : '';
    const tBalikFormat = formData.tarikhBalik ? formData.tarikhBalik.split('-').reverse().join('/') : '';

    autoTable(doc,{
        startY: currentY + 3, margin: { left: 18, right: 18 },
        head: [['Tempat', 'Perihal Tugas', 'Tarikh Pergi', 'Tarikh Balik', 'Kilometer\nSehala (km)']],
        body: [ [val(formData.tempat), val(formData.tujuan), val(tPergiFormat), val(tBalikFormat), val(formData.km)] ],
        theme: 'grid', headStyles: { fillColor: [230, 230, 230], textColor: [0, 0, 0], fontStyle: 'bold', halign: 'center', valign: 'middle', 
        lineColor: [0,0,0], lineWidth: 0.3 },
        bodyStyles: { textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3, minCellHeight: 12 }, styles: { font: 'helvetica', fontSize: 8.5 }
    });
    currentY = doc.lastAutoTable.finalY + 8;

    const drawBigCheckbox = (x, y, isChecked, text1, text2 = null) => {
        doc.setDrawColor(0);
        doc.setLineWidth(0.3); doc.rect(x, y - 4.5, 6.5, 6.5); 
        if (isChecked) { doc.setFont("helvetica", "bold"); doc.setFontSize(14); doc.text("/", x + 1.8, y + 1.5);
        doc.setFontSize(9); doc.setFont("helvetica", "normal"); }
        if (text1) doc.text(text1, x + 10, y + 0.5);
        if (text2) doc.text(text2, x + 10, y + 4.5);
    };

    doc.text("6.", 18, currentY); doc.text("Cara Perjalanan:", 28, currentY); currentY += 7;
    drawBigCheckbox(28, currentY, formData.caraPerjalanan === 'Kereta Rasmi Jawatan', "Kereta Rasmi Jawatan"); drawBigCheckbox(85, currentY, formData.caraPerjalanan === 'Kapal Terbang', "Kapal Terbang");
    drawBigCheckbox(135, currentY, formData.caraPerjalanan === 'Lain-lain', "Lain-lain (Sila nyatakan)"); currentY += 7;
    drawBigCheckbox(28, currentY, formData.caraPerjalanan === 'Kereta Sendiri', "Kereta Sendiri");
    drawBigCheckbox(85, currentY, formData.caraPerjalanan === 'Kereta Jabatan', "Kereta Jabatan"); doc.setLineWidth(0.4); doc.line(135, currentY + 1.5, 185, currentY + 1.5); currentY += 10;
    doc.text("7.", 18, currentY); doc.text("Jika ", 28, currentY); doc.setFont("helvetica", "bold"); doc.text("perjalanan melebihi 240 kilometer", 35, currentY);
    let txtW = doc.getTextWidth("perjalanan melebihi 240 kilometer"); doc.setFont("helvetica", "normal");
    doc.text(", Kelulusan menggunakan kenderaan sendiri bagi perjalanan melebihi 240", 35 + txtW, currentY);
    currentY += 4.5;
    doc.text("kilometer (Pekeliling Perbendaharaan WP 1.4, Para 5.7.4). Sebab-sebab menggunakan kenderaan sendiri:", 28, currentY); currentY += 7;
    drawBigCheckbox(28, currentY, formData.sebab1, "Dikehendaki menjalankan tugas dibeberapa tempat di sepanjang perjalanan;"); currentY += 7;
    drawBigCheckbox(28, currentY, formData.sebab2, "Adalah mustahak dan terpaksa bagi seseorang pegawai berkenderaan sendiri; dan"); currentY += 7;
    drawBigCheckbox(28, currentY, formData.sebab3, "Adalah mustahak dan terpaksa membawa pegawai lain sebagai penumpang yang juga menjalankan tugas"); currentY += 4.5;
    doc.text("rasmi.", 38, currentY); currentY += 9;
    
    doc.text("8.", 18, currentY); doc.text("Jika menggunakan kenderaan sendiri, tuntutan yang akan dibuat adalah:", 28, currentY);
    currentY += 7;
    drawBigCheckbox(28, currentY, formData.tuntutanBatu, "Elaun hitungan batu/ tuntutan bekalan bahan api"); currentY += 8;
    drawBigCheckbox(28, currentY, formData.tuntutanGantian, "Gantian Tambang Kapal Terbang/Keretapi", "(Mengikut kelayakan bagi perjalanan melebihi 240 kilometer)"); currentY += 12;
    doc.text("Tarikh : ................................................................", 28, currentY); doc.text("(Tandatangan Pemohon)", 165, currentY + 4, { align: 'center' }); currentY += 9;
    doc.setFont("helvetica", "bold");
    doc.text("SOKONGAN", 28, currentY); doc.setFont("helvetica", "normal"); currentY += 5; doc.text("Permohonan ini disokong / tidak disokong.", 28, currentY); currentY += 9;
    doc.text("Tarikh : ................................................................", 28, currentY); doc.text("(Tandatangan & Cop Penyokong)", 165, currentY + 4, { align: 'center' }); currentY += 9;
    doc.setFont("helvetica", "bold"); doc.text("KELULUSAN*", 28, currentY); doc.setFont("helvetica", "normal"); currentY += 5; doc.text("Permohonan ini diluluskan / tidak diluluskan.", 28, currentY);
    currentY += 9;
    doc.text("Tarikh : ................................................................", 28, currentY); doc.text("(Tandatangan & Cop Pelulus)", 165, currentY + 4, { align: 'center' });
    currentY += 10;
    doc.setFontSize(7.5); doc.text("*Nota: Dalam keadaan tiada pelulus, maka pegawai yang menjalankan tugas pelulus boleh memberikan kelulusan ke atas permohonan ini.", 14, currentY);
};

export const generateForm2 = (doc, logoImgBase64, formData, customData = null) => {
    const data = customData || formData;
    doc.setFont("helvetica"); doc.setFontSize(10); doc.setFont("helvetica", "bold"); doc.text("LAMPIRAN 7", 190, 15, { align: 'right' });
    
    let currentY = 12;
    if(logoImgBase64) { 
        doc.addImage(logoImgBase64, 'JPEG', 92.5, currentY, 25, 20);
        currentY += 25; 
    } else { 
        currentY += 18;
    }

    doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text("JABATAN TENAGA MANUSIA", 105, currentY, { align: 'center' });
    currentY += 5;
    const text1 = "ADTEC : "; const text2 = "ADTEC JTM KAMPUS SANDAKAN";
    const totalWidth = doc.getTextWidth(text1 + text2); const startX = 105 - (totalWidth / 2);
    doc.text(text1 + text2, 105, currentY, { align: 'center' }); doc.line(startX + doc.getTextWidth(text1), currentY + 1, startX + totalWidth, currentY + 1);
    currentY += 8;
    doc.setFontSize(12); doc.setFont("helvetica", "bold"); doc.text("BORANG PELEPASAN TUGAS SEMENTARA", 105, currentY, { align: 'center' });
    const tGantiDariFormat = data.tarikhGantiDari ? data.tarikhGantiDari.split('-').reverse().join('/') : '';
    const tGantiHinggaFormat = data.tarikhGantiHingga ? data.tarikhGantiHingga.split('-').reverse().join('/') : '';
    
    let teksMasaGanti = '-';
    if (tGantiDariFormat && tGantiHinggaFormat) {
        teksMasaGanti = `DARI: ${tGantiDariFormat}\nHINGGA: ${tGantiHinggaFormat}`;
    } else if (tGantiDariFormat || tGantiHinggaFormat) {
        teksMasaGanti = tGantiDariFormat || tGantiHinggaFormat;
    }

    const upperVal = (text) => val(text).toUpperCase();
    autoTable(doc,{
        startY: currentY + 5, margin: { left: 10, right: 10 }, theme: 'grid',
        styles: { font: 'helvetica', fontSize: 8.5, textColor: [0, 0, 0], lineColor: [0, 0, 0], lineWidth: 0.2, valign: 'middle', cellPadding: 2.5 },
        columnStyles: { 0: { cellWidth: 45 }, 1: { cellWidth: 55 }, 2: { cellWidth: 30 }, 3: { cellWidth: 42 }, 4: { cellWidth: 18, halign: 'center' } },
        body: [
            [{ content: 'BAHAGIAN A: MAKLUMAT PEMOHON', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
            [ { content: 'NAMA PEGAWAI:' }, { content: upperVal(data.nama) }, { content: 'Sebab', colSpan: 2, styles: { fillColor: [215, 205, 170], halign: 'center' } }, { content: 'Sila\nTanda (/)', styles: { fillColor: [215, 205, 170], halign: 'center' } } ],
            [ { content: 'BAHAGIAN:' }, { content: upperVal(data.bahagian) }, { content: 'CUTI REHAT /-SAKIT / KECEMASAN', colSpan: 2 }, { content: data.jenisCuti === 'Cuti Ganti' ? '/' : '' } ],
            [ { content: 'NO. TELEFON (H/P):' }, { content: upperVal(data.noTel) }, { content: 'KURSUS / TUGAS RASMI', colSpan: 2 }, { content: data.jenisCuti !== 'Cuti Ganti' ? '/' : '' } ],
            [ { content: 'LOKASI SEMASA TUGAS:' }, { content: upperVal(data.tempat || '-') }, { content: 'LAIN-LAIN (SILA NYATAKAN)', colSpan: 2 }, { content: '' } ],
            [{ content: 'BAHAGIAN B: MAKLUMAT KELAS / TUGAS YANG DI TINGGAL', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
            [ { content: 'SUBJEK / TUGAS:' }, { content: upperVal(data.cutiPenggantiTugas || data.subjek) }, { content: 'CATATAN:\n\n' + upperVal(data.catatanTugas || ''), colSpan: 3, rowSpan: 2, styles: { valign: 'top' } } ],
            [ { content: 'SEMESTER /\nKUMPULAN / UNIT /\nBAHAGIAN:' }, { content: upperVal(data.semester || '') } ],
            [ { content: 'TARIKH, HARI &\nMASA YANG\nPERLU DIGANTI:' }, { content: upperVal(teksMasaGanti) }, { content: 'TANDATANGAN &\nTARIKH:', styles: { valign: 'top' } }, { content: '', colSpan: 2 } ],
            [{ content: 'BAHAGIAN C: MAKLUMAT PEGAWAI PENGGANTI', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
            [ { content: 'NAMA PEGAWAI:' }, { content: upperVal(data.cutiPenggantiNama || data.namaPengganti) }, { content: 'Tugas', colSpan: 2, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }, { content: 'Sila Tanda\n(/)', styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } } ],
            [ { content: 'BAHAGIAN:' }, { content: upperVal(data.cutiPenggantiBahagian || data.bahagianPengganti) }, { content: 'Ambil alih subjek / tugas sepenuhnya:', colSpan: 2, rowSpan: 2 }, { content: '/', rowSpan: 2, styles: { halign: 'center', valign: 'middle', fontStyle: 'bold' } } ],
            [ { content: 'NO. TELEFON (H/P):' }, { content: upperVal(data.cutiPenggantiNoTel || data.noTelPengganti) } ],
            [ { content: 'TANDATANGAN &\nTARIKH' }, { content: '' }, { content: 'Ambil alih kawalan kelas / tugas', colSpan: 2 }, { content: '', styles: { halign: 'center', fontStyle: 'bold' } } ],
            [{ content: 'BAHAGIAN D : UNTUK KELULUSAN KETUA BAHAGIAN / KETUA JABATAN', colSpan: 5, styles: { fillColor: [215, 205, 170], halign: 'center', fontStyle: 'bold' } }],
            [ { content: 'NAMA,\nTANDATANGAN &\nTARIKH' }, { content: '' }, { content: 'CATATAN:\n\n\n\n\n', colSpan: 3, styles: { valign: 'top' } } ]
        ]
    });
};

export const generateForm3 = (doc, formData) => {
    doc.setFont("helvetica"); doc.setDrawColor(0); doc.setLineWidth(0.3);
    doc.rect(130, 15, 65, 12);
    doc.setFontSize(9); doc.text("NO.WARAN :", 132, 20); doc.text("RUJ.TIKET :", 132, 25);
    doc.setFontSize(12); doc.setFont("helvetica", "normal");
    const title1 = "BORANG TEMPAHAN TIKET KAPAL TERBANG ADTEC JTM KAMPUS"; const title2 = "SANDAKAN";
    doc.text(title1, 105, 35, { align: 'center' }); doc.text(title2, 105, 42, { align: 'center' });
    const t1Width = doc.getTextWidth(title1);
    const t2Width = doc.getTextWidth(title2);
    doc.line(105 - t1Width/2, 36, 105 + t1Width/2, 36); doc.line(105 - t2Width/2, 43, 105 + t2Width/2, 43);
    const drawSectionHeader = (text, y, width) => {
        doc.setFillColor(210, 210, 210);
        doc.rect(15, y - 5, width, 7, 'F'); doc.setFontSize(10); doc.setFont("helvetica", "normal"); doc.text(text, 17, y);
    };

    const upperVal = (text) => val(text).toUpperCase();
    drawSectionHeader("A. MAKLUMAT DESTINASI", 55, 60); doc.setFontSize(9); doc.text("TUJUAN", 15, 65); doc.text(":", 42, 65); doc.line(45, 65, 195, 65); doc.text(upperVal(formData.tujuan), 47, 64);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic"); doc.text("(Mesyuarat/Kursus/Seminar/Bengkel Kerja/Lain-lain)", 120, 69, {align: 'center'});
    doc.text("* Sila sertakan salinan surat/memo yang berkaitan", 120, 73, {align: 'center'});
    doc.setFont("helvetica", "normal"); doc.setFontSize(9);
    doc.text("TEMPAT/ LOKASI", 15, 82); doc.text(":", 42, 82); doc.line(45, 82, 195, 82); doc.text(upperVal(formData.tempat), 47, 81);
    const tPergiFormat = formData.tarikhPergi ? formData.tarikhPergi.split('-').reverse().join('/') : '';
    const tBalikFormat = formData.tarikhBalik ? formData.tarikhBalik.split('-').reverse().join('/') : '';

    doc.text("TARIKH/ TEMPOH", 15, 90);
    doc.text(":", 42, 90); doc.text("DARI:", 45, 90); doc.line(55, 90, 85, 90); doc.text(val(tPergiFormat), 57, 89);
    doc.text("HINGGA:", 90, 90); doc.line(105, 90, 135, 90);
    doc.text(val(tBalikFormat), 107, 89);

    drawSectionHeader("B. MAKLUMAT PEMOHON", 102, 60);
    doc.text("NAMA PEGAWAI", 15, 112); doc.text(":", 58, 112); doc.line(61, 112, 195, 112);
    doc.text(upperVal(formData.nama), 63, 111);
    doc.text("NO. KAD PENGENALAN", 15, 120); doc.text(":", 58, 120); doc.line(61, 120, 195, 120); doc.text(upperVal(formData.noKp), 63, 119);
    doc.text("NO. TEL PEGAWAI", 15, 128); doc.text(":", 58, 128); doc.line(61, 128, 110, 128); doc.text(upperVal(formData.noTel), 63, 127);
    doc.text("T/TANGAN :", 118, 128);
    if (formData.tandatangan) {
        try {
            doc.addImage(formData.tandatangan, 'PNG', 140, 115, 40, 20);
        } catch(e) {}
    }
    doc.line(138, 128, 195, 128);
    drawSectionHeader("C. MAKLUMAT TIKET PENERBANGAN", 140, 75);
    const fPTFormat = formData.flightPergiTarikh ? formData.flightPergiTarikh.split('-').reverse().join('/') : '';
    const fBTFormat = formData.flightBalikTarikh ? formData.flightBalikTarikh.split('-').reverse().join('/') : '';
    const fP2TFormat = formData.flightPergiLeg2Tarikh ? formData.flightPergiLeg2Tarikh.split('-').reverse().join('/') : '';
    const fB2TFormat = formData.flightBalikLeg2Tarikh ? formData.flightBalikLeg2Tarikh.split('-').reverse().join('/') : '';
    let tableRows = [];
    tableRows.push(['PERGI (L1)', val(fPTFormat), upperVal(formData.flightPergiMasa), upperVal(formData.flightPergiDari), upperVal(formData.flightPergiKe), '*Waran Jabatan / Beli sendiri']);
    if (formData.flightType === 'multi' && formData.flightPergiLeg2Dari && formData.flightPergiLeg2Ke) {
        tableRows.push(['PERGI (L2)', val(fP2TFormat), upperVal(formData.flightPergiLeg2Masa), upperVal(formData.flightPergiLeg2Dari), upperVal(formData.flightPergiLeg2Ke), '*Waran Jabatan / Beli sendiri']);
    }
    tableRows.push(['BALIK (L1)', val(fBTFormat), upperVal(formData.flightBalikMasa), upperVal(formData.flightBalikDari), upperVal(formData.flightBalikKe), '*Waran Jabatan / Beli sendiri']);
    if (formData.flightType === 'multi' && formData.flightBalikLeg2Dari && formData.flightBalikLeg2Ke) {
        tableRows.push(['BALIK (L2)', val(fB2TFormat), upperVal(formData.flightBalikLeg2Masa), upperVal(formData.flightBalikLeg2Dari), upperVal(formData.flightBalikLeg2Ke), '*Waran Jabatan / Beli sendiri']);
    }

    autoTable(doc,{
        startY: 145, margin: { left: 15, right: 15 }, theme: 'grid',
        headStyles: { fillColor: [210, 210, 210], textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3 },
        bodyStyles: { textColor: [0, 0, 0], halign: 'center', valign: 'middle', lineColor: [0,0,0], lineWidth: 0.3 },
        columnStyles: { 0: { fillColor: [210, 210, 210], fontStyle: 'bold', cellWidth: 18 }, 1: { cellWidth: 28 }, 2: { cellWidth: 28 }, 3: { cellWidth: 28 }, 4: { cellWidth: 28 }, 5: { cellWidth: 'auto' } },
        head: [['', 'TARIKH', 'MASA', 'DARI', 'KE', 'CATATAN']],
        body: tableRows
    });
    let currentY = doc.lastAutoTable.finalY + 8;
    doc.setFontSize(9); doc.text("KELAYAKAN TAMBANG:", 15, currentY); doc.text("** B/H/Y", 60, currentY); currentY += 8;
    doc.text("HARGA TAMBANG", 15, currentY); doc.text(":", 50, currentY); doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY);
    doc.text("KOD JENIS", 100, currentY);
    doc.text(":", 135, currentY); doc.rect(140, currentY - 4, 45, 6); doc.text(upperVal(formData.kodSyarikat), 142, currentY); currentY += 8;
    doc.text("CUKAI AIRPORT", 15, currentY);
    doc.text(":", 50, currentY); doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY);
    doc.text("MAS / AIR ASIA", 100, currentY);
    doc.text(":", 135, currentY); doc.rect(140, currentY - 4, 45, 6); currentY += 8;
    doc.text("CUKAI PERKHIDMATAN", 15, currentY); doc.text(":", 50, currentY);
    doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY);
    doc.text("ENRICH / BIG ID", 100, currentY); doc.text(":", 135, currentY);
    doc.rect(140, currentY - 4, 45, 6); doc.text(upperVal(formData.enrichId), 142, currentY); currentY += 8;
    doc.setFont("helvetica", "bold"); doc.text("JUMLAH", 15, currentY); doc.text(":", 50, currentY);
    doc.rect(55, currentY - 4, 30, 6); doc.text("RM", 57, currentY); doc.setFont("helvetica", "normal"); currentY += 12;

    drawSectionHeader("D. PENGESAHAN PENYERAHAN TIKET", currentY, 90);
    currentY += 7;
    doc.setFontSize(9); doc.text("Laporan sebelum meninggalkan pejabat", 15, currentY);
    
    let rightBox1Y = currentY - 5;
    doc.rect(110, rightBox1Y, 85, 25);
    doc.text("Baki Peruntukan : RM", 113, rightBox1Y + 5); doc.text("Baki Perbelanjaan : RM", 113, rightBox1Y + 10);
    doc.text("Tarikh:", 113, rightBox1Y + 15);
    doc.text("Tandatangan :", 140, rightBox1Y + 20); doc.line(162, rightBox1Y + 20, 190, rightBox1Y + 20);
    doc.text("(CC (Kew) / PA)", 162, rightBox1Y + 24);

    currentY += 8; doc.text("1.   Persediaan", 15, currentY);
    doc.rect(55, currentY - 4, 35, 6); doc.setFontSize(8); doc.setFont("helvetica", "italic"); doc.text("** Sudah/Belum", 55, currentY + 5); doc.setFontSize(9); doc.setFont("helvetica", "normal");
    currentY += 12; doc.text("2.   Makluman KJ/KB", 15, currentY); doc.rect(55, currentY - 4, 35, 6); doc.setFontSize(8); doc.setFont("helvetica", "italic");
    doc.text("** Sudah/Belum", 55, currentY + 5); doc.setFontSize(9); doc.setFont("helvetica", "normal");

    let rightBox2Y = rightBox1Y + 28; doc.rect(110, rightBox2Y, 85, 40);
    doc.text("Diluluskan Oleh :", 113, rightBox2Y + 5);
    doc.text("Tandatangan", 113, rightBox2Y + 15); doc.text(":", 135, rightBox2Y + 15);
    doc.line(138, rightBox2Y + 15, 190, rightBox2Y + 15);
    doc.text("Nama/Jawatan", 113, rightBox2Y + 25); doc.text(":", 135, rightBox2Y + 25);
    doc.line(138, rightBox2Y + 25, 190, rightBox2Y + 25); doc.text("(Pengarah / Penolong Pengarah)", 142, rightBox2Y + 29);
    doc.text("Tarikh", 113, rightBox2Y + 36); doc.text(":", 135, rightBox2Y + 36); doc.line(138, rightBox2Y + 36, 170, rightBox2Y + 36);
    currentY += 8; doc.text("3.   Laporan apabila kembali :", 15, currentY); currentY += 6;
    doc.text("3.1 Tarikh Kembali", 20, currentY);
    doc.line(50, currentY, 90, currentY); currentY += 6;
    doc.text("3.2 Lapor Kepada", 20, currentY); doc.line(50, currentY, 90, currentY); currentY += 8;
    doc.setFontSize(7);
    doc.text("Nota: Para A dan B - diisi oleh pemohon", 15, currentY);
    doc.text("         Para C dan D - untuk kegunaan pejabat", 15, currentY + 3);
    doc.text("         ** Potong mana yang tidak berkenaan", 15, currentY + 6);
};

export const generateFormCuti = (doc, formData, pegawaiDatabase, today) => {
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
    doc.text("Jawatan", 85, currentY);
    doc.text(":", 120, currentY); 
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
    doc.setFont("helvetica", "bold");
    doc.text("Untuk Kegunaan Pejabat", 105, currentY, {align: 'center'}); doc.setFont("helvetica", "normal");
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

export const generateFormAkujanji = (doc, logoImgBase64, formData, peperiksaanRoles, today) => {
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
    
    doc.text("Adalah saya,", 15, currentY);

    doc.setLineWidth(0.4);
    doc.setLineDashPattern([1, 2], 0);
    doc.line(38, currentY, 188, currentY); 
    doc.setLineDashPattern([], 0);
    doc.text(val(formData.nama).toUpperCase(), 113, currentY - 1.5, { align: 'center' });
    doc.text(",", 190, currentY);
    
    currentY += 10;
    doc.text("No. Kad Pengenalan", 15, currentY);
    doc.text("yang bertugas", 190, currentY, { align: 'right' });
    
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

    currentY += 10;
    let tableData = peperiksaanRoles.map(role => {
        const isTicked = formData.perananPeperiksaan.includes(role);
        return [isTicked ? '/' : '', role];
    });
    autoTable(doc,{
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
    currentY += 15;
    const p2 = "berjanji bahawasanya saya akan menjaga segala kerahsiaan yang berkaitan dengan aktiviti-aktiviti peperiksaan jabatan ini. Saya faham bahawa jika saya membocor maklumat-maklumat berkaitan peperiksaan ini atau melanggar integriti dengan apa cara sekali pun kepada mana-mana pihak maka saya boleh dikenakan tindakan di bawah Akta Rahsia Rasmi 1972.";
    const splitP2 = doc.splitTextToSize(p2, 175);
    doc.text(splitP2, 15, currentY, { align: 'justify', maxWidth: 175 });

    currentY += 35;
    doc.text("Yang Benar :", 15, currentY);
    doc.text("Disaksikan oleh :", 120, currentY);

    currentY += 25;
    if (formData.tandatangan) {
        try {
            doc.addImage(formData.tandatangan, 'PNG', 17, currentY - 18, 40, 18);
        } catch(e) {
            console.warn("Gagal render tandatangan:", e);
        }
    }

    doc.text("..................................................................", 15, currentY);
    doc.text("..................................................................", 120, currentY);

    currentY += 8;
    doc.text("Nama : " + val(formData.nama), 15, currentY);
    doc.text("Nama :", 120, currentY);

    currentY += 8;
    doc.text("Tarikh : " + val(today.split('-').reverse().join('/')), 15, currentY);
    doc.text("Tarikh :", 120, currentY);
};

export const generateFormLaporan = (doc, logoImgBase64, formData) => {
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
    doc.text("TARIKH PEPERIKSAAN", 15, currentY); doc.text(":", 60, currentY); doc.text(tDate, 63, currentY);
    currentY += 7;
    
    doc.text("NAMA PENGAWAS", 15, currentY); doc.text(":", 60, currentY); 
    const allPengawas = formData.namaPengawasLain ? `${val(formData.nama).toUpperCase()} / ${val(formData.namaPengawasLain).toUpperCase()}` : val(formData.nama).toUpperCase();
    const splitPengawas = doc.splitTextToSize(allPengawas, 130);
    doc.text(splitPengawas, 63, currentY);
    currentY += (splitPengawas.length * 5) + 5;
    autoTable(doc,{
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
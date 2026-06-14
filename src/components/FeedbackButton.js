import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';

const GOOGLE_DRIVE_FEEDBACK_URL = "https://script.google.com/macros/s/AKfycbw56_36pxhF3PVFyfI5trszw9glkxO6D0dz-M2GQdJKsjcqEWxQLzqiKzoAd3oQotyu9g/exec";

const FeedbackButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [feedbackName, setFeedbackName] = useState('');
  const [feedbackEmail, setFeedbackEmail] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const getRatingLabel = (val) => {
    switch(val) {
      case 1: return "Sangat Tidak Memuaskan";
      case 2: return "Kurang Memuaskan";
      case 3: return "Boleh Diterima";
      case 4: return "Sangat Baik";
      case 5: return "Cemerlang & Sempurna!";
      default: return "Pilih tahap kepuasan anda";
    }
  };

  const generatePDFBase64 = (name, email, message, timestamp, starRating) => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(30, 58, 138);
    doc.text("LAPORAN MAKLUM BALAS iFMS", 15, 20);
    
    doc.setFontSize(11);
    doc.setTextColor(100);
    doc.setFont("helvetica", "normal");
    doc.text(`ID Transaksi: iFMS-${Date.now()}`, 15, 30);
    doc.text(`Tarikh: ${timestamp}`, 15, 38);
    doc.text(`Nama Pengguna: ${name || "Anonymous"}`, 15, 46);
    doc.text(`Emel: ${email || "Tidak disediakan"}`, 15, 54);
    doc.text(`Penilaian: ${starRating} / 5 Bintang`, 15, 62);
    
    doc.setDrawColor(220);
    doc.line(15, 70, 195, 70);
    
    doc.setFont("helvetica", "bold");
    doc.text("Komen & Cadangan:", 15, 80);
    doc.setFont("helvetica", "normal");
    const splitText = doc.splitTextToSize(message, 180);
    doc.text(splitText, 15, 90);
    
    const filename = `iFMS_Feedback_${Date.now()}.pdf`;
    const pdfBase64 = doc.output('datauristring').split(',')[1];
    return { pdfBase64, filename };
  };

  const handleSubmit = async () => {
    if (rating === 0 || !feedbackMessage.trim()) {
      alert("Sila berikan rating dan maklum balas anda.");
      return;
    }
    
    setIsSubmitting(true);
    try {
      const now = new Date().toLocaleString('ms-MY');
      const { pdfBase64, filename } = generatePDFBase64(feedbackName, feedbackEmail, feedbackMessage, now, rating);
      
      const formData = new FormData();
      formData.append('filename', filename);
      formData.append('base64', pdfBase64);
      
      fetch(GOOGLE_DRIVE_FEEDBACK_URL, { 
        method: 'POST', 
        mode: 'no-cors', 
        body: formData 
      }).catch(err => console.error("Background upload error:", err));
      
      setIsModalOpen(false);
      setRating(0); 
      setFeedbackMessage(''); 
      setFeedbackName(''); 
      setFeedbackEmail('');
      alert("✓ Terima kasih! Maklum balas anda sedang diproses ke sistem iFMS.");
    } catch (error) {
      console.error("Ralat semasa menjana PDF:", error);
      alert("Maaf, ralat berlaku. Sila cuba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div 
        className={`fixed z-[9999] transition-all duration-500 ease-in-out ${
          isVisible 
            ? 'bottom-6 right-6 md:bottom-10 md:right-10 translate-y-0 opacity-100' 
            : 'bottom-[-100px] right-6 md:bottom-10 md:right-10 md:translate-y-0 opacity-0 md:opacity-100 pointer-events-none md:pointer-events-auto'
        }`}
      >
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 text-white p-3.5 md:px-6 md:py-3.5 rounded-full shadow-[0_8px_20px_rgba(37,99,235,0.4)] hover:scale-105 active:scale-95 transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-6 md:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="hidden md:inline font-semibold">Maklum Balas</span>
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[10000] flex items-end sm:items-center justify-center bg-slate-900/40 backdrop-blur-sm animate-fade-in">
          <div className="bg-white w-full sm:max-w-md rounded-t-[2.5rem] sm:rounded-[2rem] shadow-2xl overflow-hidden animate-slide-up sm:animate-zoom-in">
            <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mt-4 mb-2 sm:hidden"></div>
            <div className="px-8 py-4 flex justify-between items-center border-b border-slate-50">
              <h2 className="text-xl font-bold text-slate-800">Kongsikan Maklum Balas Anda</h2>
              <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-8 space-y-6 max-h-[75vh] overflow-y-auto">
              <div className="text-center space-y-3">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                  {getRatingLabel(hoverRating || rating)}
                </p>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(s)}
                      className="transition-transform hover:scale-125 active:scale-90"
                    >
                      <svg 
                        className={`w-10 h-10 ${ (hoverRating || rating) >= s ? 'text-amber-400' : 'text-slate-200' }`} 
                        fill="currentColor" viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <input 
                  type="text" placeholder="Nama Lengkap (Pilihan)"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={feedbackName} onChange={(e) => setFeedbackName(e.target.value)}
                />
                <input 
                  type="email" placeholder="Alamat Emel (Pilihan)"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  value={feedbackEmail} onChange={(e) => setFeedbackEmail(e.target.value)}
                />
                <textarea 
                  placeholder="Ceritakan pengalaman anda atau cadangkan sesuatu..." rows="3"
                  className="w-full bg-slate-50 border-none rounded-2xl px-5 py-3.5 text-sm focus:ring-2 focus:ring-blue-500 transition-all resize-none outline-none"
                  value={feedbackMessage} onChange={(e) => setFeedbackMessage(e.target.value)}
                />
              </div>
              
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-lg shadow-blue-200 transition-all flex items-center justify-center gap-3 disabled:bg-slate-300 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Menghantar..." : (
                  <>
                    <span>Hantar Maklum Balas</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </>
                )}
              </button>
              <p className="text-[10px] text-center text-slate-400">
                Laporan PDF akan dijana secara automatik ke database iFMS.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeedbackButton;
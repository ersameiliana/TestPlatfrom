"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- TypeScript Interface ---
interface Message {
  role: "assistant" | "user" | "system";
  content: string;
}

interface QuickReply {
  label: string;
  query: string;
}

// --- Konfigurasi Data Berdasarkan Copywriting Terbaru ---
const QUICK_REPLIES: QuickReply[] = [
  { label: "💳 Cara Refund Dana", query: "cara refund" },
  { label: "🛡️ Lapor Kendala Keamanan", query: "penipu" },
  { label: "💸 Split Payment", query: "split payment" },
  { label: "✅ Arti Status Verified", query: "verifikasi" },
];

const FAQ_DATA = [
  { 
    q: "Bagaimana jika kos tidak sesuai dengan foto?", 
    a: "Tenang Kak, keamanan dan kejujuran adalah prioritas utama kami. IDeA memiliki garansi 'What You See Is What You Get'. Jika saat Kakak tiba di lokasi kondisi fisik kos berbeda jauh dengan foto atau deskripsi di aplikasi, jangan lakukan check-in terlebih dahulu. Segera ajukan laporan melalui aplikasi dalam waktu 1x24 jam. Tim kami akan melakukan investigasi cepat, dan jika terbukti tidak sesuai, dana Kakak akan kami refund 100% secara instan ke Wallet IDE Kos tanpa potongan apa pun!" 
  },
  { 
    q: "Gimana cara bayar kos pakai Split Payment?", 
    a: "Bayar kos berdua kini jauh lebih mudah dan transparan! Di halaman pembayaran (checkout), Kakak cukup memilih metode 'Split Payment'. Masukkan email atau nomor WhatsApp teman sekamar Kakak yang juga sudah terdaftar di IDE Kos. Sistem IDeA akan otomatis membagi tagihan menjadi dua bagian yang sama besar (atau sesuai kesepakatan). Kakak hanya perlu melunasi bagian Kakak sendiri, dan teman Kakak akan mendapatkan notifikasi untuk melunasi bagiannya. Dengan cara ini, tidak ada lagi drama tagih-menagih hutang ke teman sendiri!" 
  },
  { 
    q: "Apakah saya bisa survei langsung ke lokasi?", 
    a: "Tentu saja boleh, Kak! IDeA sangat mendukung Kakak untuk merasa yakin sebelum memilih tempat tinggal. Namun, untuk menghemat waktu dan tenaga, IDeA merekomendasikan Kakak untuk mencoba fitur '360° Virtual Tour' yang ada di detail properti terlebih dahulu. Jika Kakak ingin survei fisik, Kakak bisa membuat janji temu melalui tombol 'Jadwalkan Survei'. Namun perlu diingat ya Kak, demi keamanan Kakak, pastikan seluruh proses transaksi pembayaran dilakukan langsung melalui aplikasi atau website resmi IDE Kos. Hal ini wajib dilakukan untuk menghindari potensi penipuan dari pihak yang meminta DP/pembayaran di luar sistem, serta agar uang Kakak tetap terlindungi oleh sistem Escrow (Rekening Bersama) kami hingga Kakak sukses check-in!" 
  },
  { 
    q: "Uang saya aman di mana sebelum check-in?", 
    a: "Uang Kakak berada di tempat yang sangat aman! IDE Kos menggunakan Sistem Escrow (Rekening Bersama) yang terenkripsi. Artinya, dana sewa yang Kakak bayarkan tidak langsung masuk ke kantong pemilik kos, melainkan disimpan sementara oleh sistem kami. Dana tersebut baru akan kami cairkan ke rekening pemilik 24 jam setelah Kakak sukses melakukan check-in tanpa kendala. Jadi, selama Kakak belum masuk ke kamar kos, uang Kakak tetap terlindungi sepenuhnya oleh sistem kami." 
  }
];

export default function BantuanPage() {
  const [activeTab, setActiveTab] = useState<"ai" | "faq">("ai");
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Halo! Aku IDeA. Ada yang bisa aku bantu seputar kos impianmu atau kendala teknis hari ini?" }
  ]);
  const [input, setInput] = useState("");
  const [isEscalating, setIsEscalating] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
    }
  }, [messages]);

  const processAIResponse = (userMsg: string) => {
    const msg = userMsg.toLowerCase();
    setTimeout(() => {
      if (msg.includes("penipu") || msg.includes("polisi") || msg.includes("lapor") || msg.includes("somasi")) {
        setIsEscalating(true);
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "IDea mendeteksi situasi ini sebagai prioritas tinggi. Tenang Kak, IDeA sedang menghubungkan Kakak ke Tim Investigasi Khusus untuk penanganan darurat. Mohon tetap di halaman ini, ya." 
        }]);
      } else if (msg.includes("split payment")) {
        setMessages(prev => [...prev, { role: "assistant", content: "Bayar berdua anti-drama! Pilih 'Split Payment' di checkout, masukkan kontak teman Kakak, dan IDeA akan bagi tagihannya otomatis. 😉" }]);
      } else {
        setMessages(prev => [...prev, { role: "assistant", content: "Duh, IDeA belum punya jawaban pasti buat pertanyaan itu. Kakak bisa coba pakai kata kunci seperti 'Refund' atau 'Cara Bayar', atau cek tab Pusat Jawaban di sebelah, yuk!" }]);
      }
    }, 1000);
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || isEscalating) return;
    setMessages(prev => [...prev, { role: "user", content: text }]);
    processAIResponse(text);
    setInput("");
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex flex-col font-sans">
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": FAQ_DATA.map(faq => ({
            "@type": "Question",
            "name": faq.q,
            "acceptedAnswer": { "@type": "Answer", "text": faq.a }
          }))
        })}
      </script>

      {/* Tab Switcher */}
      <div className="bg-white border-b border-slate-200 px-6 sticky top-0 z-30">
        <div className="max-w-4xl mx-auto flex justify-center py-4">
          <div className="flex p-1 bg-slate-100 rounded-2xl w-full max-w-sm">
            <button 
              onClick={() => setActiveTab("ai")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "ai" ? "bg-white text-cyan-600 shadow-sm" : "text-slate-500"}`}
            >
              Chat IDeA (AI)
            </button>
            <button 
              onClick={() => setActiveTab("faq")}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === "faq" ? "bg-white text-cyan-600 shadow-sm" : "text-slate-500"}`}
            >
              Pusat Jawaban
            </button>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-4xl mx-auto w-full p-4 md:p-6 flex flex-col">
        <AnimatePresence mode="wait">
          {activeTab === "ai" ? (
            <motion.div 
              key="ai-zone" initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
              className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 flex flex-col h-[70vh] min-h-[450px] overflow-hidden"
            >
              <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-cyan-500 rounded-xl flex items-center justify-center shadow-lg">✨</div>
                  <div>
                    <h3 className="font-black text-sm tracking-tight">IDeA Virtual Assistant</h3>
                    <p className="text-[9px] font-bold text-cyan-400 uppercase tracking-widest">● Asisten Pintar IDeA</p>
                  </div>
                </div>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 custom-scrollbar">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed shadow-sm ${
                      m.role === "user" ? "bg-slate-900 text-white rounded-tr-none" : "bg-white border border-slate-200 text-slate-800 rounded-tl-none"
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {isEscalating && (
                  <div className="p-4 bg-cyan-50 border border-cyan-100 rounded-2xl flex items-center gap-3 animate-pulse">
                    <div className="h-2 w-2 bg-cyan-500 rounded-full animate-bounce" />
                    <p className="text-xs text-cyan-700 font-black uppercase tracking-tighter">Menyambungkan ke Tim Investigasi IDeA...</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-white border-t border-slate-100">
                {!isEscalating && (
                  <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3">
                    {QUICK_REPLIES.map((chip) => (
                      <button 
                        key={chip.label} onClick={() => handleSendMessage(chip.query)}
                        className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-[10px] font-bold text-slate-600 hover:border-cyan-500 hover:text-cyan-600 transition-all whitespace-nowrap"
                      >
                        {chip.label}
                      </button>
                    ))}
                  </div>
                )}
                <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(input); }} className="flex gap-2">
                  <input 
                    type="text" value={input} onChange={(e) => setInput(e.target.value)} disabled={isEscalating}
                    placeholder={isEscalating ? "Menyambungkan ke Agen Manusia..." : "Ketik kendala Kakak di sini..."}
                    className="flex-1 rounded-2xl px-6 py-3 text-sm outline-none bg-slate-50 border-2 border-transparent focus:border-cyan-500 disabled:bg-slate-100 disabled:cursor-not-allowed"
                  />
                  <button 
                    type="submit" disabled={isEscalating || !input.trim()}
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${isEscalating || !input.trim() ? 'bg-slate-200 text-slate-400' : 'bg-cyan-500 text-white shadow-lg shadow-cyan-200 hover:bg-cyan-600'}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" /></svg>
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="faq-zone" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
              className="space-y-6"
            >
              <div className="text-center mb-10">
                <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">FAQ: Jawaban Cepat Buat Kakak</h2>
                <p className="text-sm text-slate-500 font-medium">Cari info mendasar tanpa nunggu antrean chat.</p>
              </div>

              <div className="grid gap-4">
                {FAQ_DATA.map((faq, i) => (
                  <details key={i} className="group bg-white border border-slate-200 rounded-[2rem] overflow-hidden transition-all hover:border-cyan-300">
                    <summary className="p-6 cursor-pointer list-none flex justify-between items-center focus:outline-none">
                      <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                      <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-hover:bg-cyan-500 group-hover:text-white transition-all">
                        <svg className="w-4 h-4 group-open:rotate-180 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" /></svg>
                      </div>
                    </summary>
                    <div className="px-6 pb-8 text-sm text-slate-500 leading-relaxed font-medium border-t border-slate-50 pt-4">
                      {faq.a}
                    </div>
                  </details>
                ))}
              </div>

              <div className="mt-16 p-10 bg-slate-900 rounded-[3rem] text-center relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-2">Belum Menemukan yang Kakak Cari?</h3>
                  <p className="text-slate-400 text-xs mb-8 font-medium">Jangan khawatir, Tim Support kami siap membantu Kakak secara personal via WhatsApp atau Email.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="px-8 py-3 bg-cyan-500 text-white font-black rounded-2xl text-[10px] tracking-widest uppercase shadow-lg shadow-cyan-500/20">Hubungi WhatsApp</button>
                    <button className="px-8 py-3 bg-white/10 text-white border border-white/20 font-black rounded-2xl text-[10px] tracking-widest uppercase hover:bg-white/20 transition-all">Kirim Email</button>
                  </div>
                </div>
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
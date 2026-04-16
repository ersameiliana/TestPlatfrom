"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";

// 1. Database Panduan yang sudah di-optimasi SEO & Copywriting-nya
const guideDatabase: Record<string, any> = {
  "cara-pakai-split-payment": {
    title: "Bebas Drama Patungan: Panduan Fitur Split Payment",
    description: "Cara mudah bayar kos patungan tanpa drama menggunakan fitur Split Payment di IDE Kos. Cek panduan lengkapnya di sini.",
    updated: "15 April 2026",
    category: "Keuangan",
    icon: "💸",
    color: "from-blue-500 to-blue-600",
    content: [
      { step: 1, title: "Pilih Properti Siap Patungan", text: "Cari kos bertanda 'Split Payment Ready' di halaman pencarian IDE Kos agar proses otomatisasi aktif." },
      { step: 2, title: "Undang Partner Patungan", text: "Klik tombol 'Ajak Patungan' dan masukkan email atau nomor WhatsApp teman sekamar kamu." },
      { step: 3, title: "Atur Porsi Bayar Masing-masing", text: "Bisa bagi rata 50/50 atau sesuaikan dengan kesepakatan kalian, misalnya berdasarkan luas kamar atau fasilitas tambahan." },
      { step: 4, title: "Penagihan Otomatis oleh IDeA", text: "IDea akan otomatis menagih ke tiap orang saat jatuh tempo. Bye-bye drama nagih utang ke teman sendiri!" },
    ]
  },
  "neighborhood-insight-guide": {
    title: "Kenali Lingkungan Sekitar: Cara Membaca Neighborhood Insight",
    description: "Pahami cara kerja Neighborhood Insight IDeA untuk mengetahui skor keamanan dan akses transportasi sebelum menyewa kos.",
    updated: "14 April 2026",
    category: "Keamanan",
    icon: "🛡️",
    color: "from-purple-500 to-purple-600",
    content: [
      { step: 1, title: "Akses Halaman Detail Properti", text: "Klik pada salah satu properti yang Kakak minati untuk membuka rincian lengkapnya." },
      { step: 2, title: "Cek Kartu Insight", text: "Temukan kartu berwarna Cyan yang bertuliskan 'Neighborhood Insight by IDeA' di tengah halaman." },
      { step: 3, title: "Pahami Kondisi Lingkungan", text: "Lihat skor keamanan area, akses transportasi umum, sampai tingkat kebisingan. Kamu jadi tahu suasananya sebelum datang langsung!" },
    ]
  }
};

export default function DetailPanduanPage() {
  const params = useParams();
  const slug = params.slug as string;
  const data = guideDatabase[slug] || guideDatabase["cara-pakai-split-payment"];

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* 2. SEO Meta Description (Hidden for visual, but ready for logic injection) */}
      <head>
        <title>{data.title} | Pusat Edukasi IDeA</title>
        <meta name="description" content={data.description} />
      </head>

      {/* HEADER: Hero Area dengan Brand-Aligned Teks */}
      <header className={`bg-gradient-to-br ${data.color} pt-24 pb-32 px-6 text-white overflow-hidden relative`}>
        <div className="max-w-4xl mx-auto relative z-10">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 text-sm font-bold opacity-80 hover:opacity-100 transition-opacity mb-8 bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm"
          >
            ← Kembali ke Pusat Edukasi IDeA
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <span className="text-5xl" role="img" aria-label={data.category}>{data.icon}</span>
            <div>
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-70">{data.category} • Panduan Resmi IDeA</span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter leading-tight">{data.title}</h1>
            </div>
          </div>
          <p className="text-sm font-medium opacity-80">Update Terakhir: {data.updated} • Diverifikasi oleh Tim IDeA</p>
        </div>
        
        {/* Dekorasi Abstract */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
      </header>

      <main className="max-w-4xl mx-auto px-6 -mt-16 relative z-20">
        <div className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 p-8 md:p-12">
          
          {/* Alur Langkah-langkah (SOP Style) */}
          <div className="space-y-12">
            {data.content.map((item: any, index: number) => (
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                key={index} 
                className="flex gap-6 md:gap-10"
              >
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-white shadow-lg ${data.color}`}>
                    {item.step}
                  </div>
                  {index !== data.content.length - 1 && (
                    <div className="w-1 h-full bg-slate-100 mt-4 rounded-full" />
                  )}
                </div>
                <div className="pb-8">
                  <h3 className="text-xl font-black text-slate-900 mb-3 tracking-tight">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Feedback & Support Bridge */}
          <div className="mt-6 pt-6 border-t border-slate-50">
             <p className="text-xs text-slate-400 italic text-center">
               Punya kendala teknis? Screenshot halaman ini dan tunjukkan pada tim kami di <Link href="/bantuan" className="text-cyan-600 font-bold underline">Pusat Bantuan</Link>.
             </p>
          </div>

          {/* CTA Box yang Mengundang Aksi */}
          <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <h4 className="text-lg font-black text-slate-900 mb-1">Siap Cobain Fiturnya?</h4>
              <p className="text-sm text-slate-500 font-medium">Praktekkan langsung panduan ini di pencarian kos IDeA.</p>
            </div>
            <Link 
              href="/search" 
              className="px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-cyan-600 transition-all shadow-xl shadow-slate-900/10 text-xs whitespace-nowrap uppercase tracking-widest"
            >
              Temukan Kos Impian
            </Link>
          </div>
        </div>

        {/* Support Link */}
        <div className="mt-12 text-center">
          <Link href="/bantuan" className="text-slate-400 text-sm font-medium hover:text-cyan-600 transition-colors">
            Masih ada pertanyaan? Tanya IDeA di Pusat Bantuan →
          </Link>
        </div>
      </main>

      {/* Structured Data (FAQ Schema) for Google Rich Snippets */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": data.content.map((item: any) => ({
            "@type": "Question",
            "name": item.title,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": item.text
            }
          }))
        })}
      </script>
    </div>
  );
}
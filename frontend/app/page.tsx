"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100 } }
  };

  // Dummy Data untuk Preview Kos
  const previewKos = [
    { id: 1, name: "IDE Kos Premium Sudirman", type: "Campur", price: "2.500.000", rating: "4.9", location: "Jakarta Selatan", verified: true },
    { id: 2, name: "Kos Putri Melati Asri", type: "Putri", price: "1.200.000", rating: "4.7", location: "Surabaya Timur", verified: true },
    { id: 3, name: "Kos Pasutri Nyaman", type: "Pasutri", price: "1.800.000", rating: "4.8", location: "Malang Kota", verified: false },
    { id: 4, name: "IDE Kos Eksklusif UNAIR", type: "Campur", price: "2.100.000", rating: "5.0", location: "Surabaya", verified: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      
      {/* 1. HERO SECTION */}
      <section className="relative px-6 py-20 text-center lg:py-28 bg-white border-b border-slate-100 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-400 to-blue-500"></div>
        <div className="absolute top-20 right-[10%] w-64 h-64 bg-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
        <div className="absolute bottom-10 left-[10%] w-48 h-48 bg-blue-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-6xl leading-tight"
          >
            Temukan Kos Nyaman, Aman, dan <br className="hidden md:block"/>
            <span className="text-cyan-600">Bebas Drama</span> dengan IDE Kos.
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-10 text-lg text-slate-600 md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            Cari kos lebih pintar dengan pencarian berbasis peta, virtual tour 360°, dan bayar patungan otomatis. Transaksi 100% aman dengan sistem Rekening Bersama.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-2xl mx-auto bg-white border-2 border-slate-200 rounded-full flex flex-col md:flex-row items-center p-2 shadow-lg shadow-cyan-900/5 focus-within:border-cyan-500 focus-within:ring-4 focus-within:ring-cyan-50 transition-all"
          >
            <div className="pl-6 hidden md:block text-slate-400">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
            <input 
              type="text" 
              placeholder="Ketik nama kampus, stasiun, atau area..." 
              className="flex-1 px-6 py-4 md:py-3 bg-transparent border-none focus:outline-none text-slate-800 placeholder-slate-400 font-medium w-full"
            />
            <Link 
              href="/map" 
              className="w-full md:w-auto text-center px-8 py-3.5 font-bold text-white transition-all bg-cyan-500 rounded-full hover:bg-cyan-600 shadow-md"
            >
              Cari Kos Sekarang
            </Link>
          </motion.div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION SECTION */}
      <section className="px-6 py-24 bg-slate-50 overflow-hidden">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={containerVariants} className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Cari Kos Lebih Mudah, Aman, dan Transparan.</h2>
            <div className="w-20 h-1.5 bg-cyan-500 mx-auto mt-6 rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: "✅", title: "IDE Kos Verified", desc: "Bebas catfishing. Properti berlogo Verified telah disurvei langsung oleh tim kami dan lolos deteksi AI anti-foto palsu." },
              { icon: "💸", title: "Bayar Patungan Lebih Ringan", desc: "Sewa kamar berdua? Gunakan fitur Split Payment untuk patungan bayar kos otomatis langsung dari aplikasi." },
              { icon: "🛡️", title: "Transaksi Bebas Penipuan", desc: "Dana Anda aman bersama kami. Uang sewa baru diteruskan ke pemilik kos 24 jam setelah Anda berhasil check-in." },
              { icon: "🗺️", title: "Kenali Lingkungan Sekitarmu", desc: "Cek Neighborhood Insight untuk tahu tingkat kebisingan, keamanan area, hingga jarak ke transportasi umum terdekat." }
            ].map((prop, i) => (
              <motion.div key={i} variants={itemVariants} whileHover={{ y: -8 }} className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all hover:border-cyan-100">
                <div className="flex items-center justify-center w-14 h-14 mb-6 text-3xl bg-cyan-50 border border-cyan-100 rounded-2xl shadow-sm">
                  {prop.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-slate-900">{prop.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{prop.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. PREVIEW KOS (BARU DITAMBAHKAN) */}
      <section className="px-6 py-24 bg-white overflow-hidden">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={containerVariants} className="max-w-7xl mx-auto">
          <motion.div variants={itemVariants} className="flex flex-col items-center justify-between mb-12 md:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-slate-900 md:text-4xl">Rekomendasi Kos Pilihan</h2>
              <p className="mt-3 text-slate-500 text-lg">Properti terbaik yang pas dengan budget kamu.</p>
            </div>
            <Link href="/search" className="hidden px-6 py-3 mt-4 text-sm font-bold transition-colors border-2 md:block text-cyan-600 border-cyan-600 rounded-full hover:bg-cyan-50">
              Lihat Semua Properti
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {previewKos.map((kos) => (
              <motion.div 
                key={kos.id} 
                variants={itemVariants}
                whileHover={{ y: -10 }}
                className="overflow-hidden border border-slate-200 rounded-2xl hover:shadow-2xl hover:border-cyan-200 transition-all cursor-pointer bg-white group flex flex-col"
              >
                {/* Image Placeholder */}
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-slate-300" whileHover={{ scale: 1.1 }} transition={{ duration: 0.4 }} />
                  {kos.verified && (
                    <div className="absolute top-3 left-3 px-2 py-1 bg-green-500 text-white text-[10px] font-bold rounded shadow-sm z-10 flex items-center gap-1">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      VERIFIED
                    </div>
                  )}
                </div>
                
                {/* Content Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded">{kos.type}</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {kos.rating}
                    </span>
                  </div>
                  <h3 className="mb-1 font-bold text-slate-900 text-lg leading-tight group-hover:text-cyan-600 transition-colors">{kos.name}</h3>
                  <p className="mb-4 text-sm text-slate-500 flex items-center gap-1 flex-1">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {kos.location}
                  </p>
                  
                  {/* Price Bar */}
                  <div className="pt-4 border-t border-slate-100 flex items-end justify-between mt-auto">
                    <div>
                      <span className="text-xl font-extrabold text-cyan-600">Rp {kos.price}</span>
                      <span className="text-[11px] text-slate-400 font-medium"> / bulan</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="mt-8 text-center md:hidden">
            <Link href="/search" className="inline-block px-8 py-3 text-sm font-bold transition-colors border-2 text-cyan-600 border-cyan-600 rounded-full hover:bg-cyan-50">
              Lihat Semua Properti
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 4. PROGRAMMATIC SEO SECTION */}
      <section className="px-6 py-24 bg-slate-50 border-t border-slate-100 overflow-hidden">
        <motion.div initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.2 }} variants={containerVariants} className="max-w-5xl mx-auto text-center">
          <motion.h2 variants={itemVariants} className="text-3xl font-bold text-slate-900 mb-10">Jelajahi Kos Populer di Sekitar Anda</motion.h2>
          
          <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-4">
            {[
              "Kos Putri Kamar Mandi Dalam Dekat UNAIR",
              "Kos Campur Akses 24 Jam Jakarta Selatan",
              "Kos Pasutri Pet-Friendly di Bandung Raya",
              "Kos Eksklusif Dekat Stasiun MRT",
              "Kos Bulanan Bebas Jam Malam Malang",
              "Kos Putra Dekat UGM Jogja WiFi Kencang"
            ].map((keyword, i) => (
              <Link 
                key={i} 
                href={`/search?q=${encodeURIComponent(keyword)}`}
                className="inline-block px-5 py-3 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-full hover:bg-cyan-50 hover:text-cyan-700 hover:border-cyan-300 transition-colors cursor-pointer shadow-sm"
              >
                {keyword}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* 5. CALL-TO-ACTION MITRA */}
      <section className="px-6 py-24 bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        <motion.div 
          initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.3 }} variants={containerVariants} 
          className="max-w-4xl mx-auto text-center relative z-10"
        >
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-white mb-6">Punya Properti Kos? Jadikan Lebih Untung Bersama Kami.</motion.h2>
          <motion.p variants={itemVariants} className="text-lg text-slate-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            Kelola kamar, atur harga dinamis (Dynamic Pricing), dan tingkatkan occupancy rate dengan dasbor manajemen properti yang ringan dan cerdas.
          </motion.p>
          <motion.div variants={itemVariants}>
            <Link 
              href="/mitra"
              className="inline-block px-8 py-4 text-base font-bold text-slate-900 transition bg-cyan-400 rounded-full hover:bg-cyan-300 shadow-lg shadow-cyan-500/20"
            >
              Daftar Menjadi Mitra
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* 6. FOOTER & COPYRIGHT */}
      <footer className="px-6 py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">IDE Kos.</h3>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Platform pencarian dan manajemen kos pintar yang menghubungkan pencari kos dengan pemilik properti secara aman dan transparan.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Perusahaan</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><Link href="/tentang" className="hover:text-cyan-400 transition-colors">Tentang Kami</Link></li>
              <li><Link href="/mitra" className="hover:text-cyan-400 transition-colors">Jadi Mitra</Link></li>
              <li><Link href="/blog" className="hover:text-cyan-400 transition-colors">Blog & Artikel</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-5 tracking-wide text-sm uppercase">Bantuan</h4>
            <ul className="flex flex-col gap-3 text-sm text-slate-400">
              <li><Link href="/bantuan" className="hover:text-cyan-400 transition-colors">Pusat Bantuan</Link></li>
              <li><Link href="/syarat-ketentuan" className="hover:text-cyan-400 transition-colors">Syarat & Ketentuan</Link></li>
              <li><Link href="/kebijakan-privasi" className="hover:text-cyan-400 transition-colors">Kebijakan Privasi</Link></li>
            </ul>
          </div>
        </div>

        {/* AREA COPYRIGHT */}
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between pt-8 border-t border-slate-800/50 text-slate-500 text-sm font-medium">
          <p>&copy; {new Date().getFullYear()} IDE Kos. Hak Cipta Dilindungi.</p>
          
          <div className="flex gap-6 mt-6 md:mt-0">
            <Link href="#" className="hover:text-cyan-400 transition-colors" aria-label="Instagram">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition-colors" aria-label="Twitter">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" /></svg>
            </Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
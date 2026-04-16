"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Suspense } from "react";

// 1. Data Panduan (Public & Penting - Bisa dibuka masing-masing)
const platformGuides = [
  {
    id: "g1",
    slug: "cara-pakai-split-payment",
    title: "Split Payment",
    desc: "Cara patungan kos otomatis bareng teman sekamar.",
    icon: "💸",
    color: "bg-blue-50 text-blue-600"
  },
  {
    id: "g2",
    slug: "neighborhood-insight-guide",
    title: "Neighborhood Insight",
    desc: "Cara baca data keamanan & akses area sebelum booking.",
    icon: "🛡️",
    color: "bg-purple-50 text-purple-600"
  },
  {
    id: "g3",
    slug: "keamanan-rekening-bersama",
    title: "Rekening Bersama",
    desc: "Panduan check-in aman dengan sistem escrow IDeA.",
    icon: "🔐",
    color: "bg-emerald-50 text-emerald-600"
  },
  {
    id: "g4",
    slug: "cara-kerja-verified-listing",
    title: "Verified Listing",
    desc: "Mengenal standar survei fisik tim IDE Kos di lapangan.",
    icon: "✅",
    color: "bg-orange-50 text-orange-600"
  }
];

const mainArticles = [
  {
    id: 1,
    category: "tips-anak-kos",
    title: "7 Tips Cari Kos di Jakarta Selatan yang Aman dan Murah Dekat MRT",
    excerpt: "Nge-kos di Jaksel gak harus mahal! IDeA bocorkan rahasia dapet kamar strategis...",
    date: "15 Apr 2026",
    readTime: "5 min read",
    tag: "Strategi"
  },
  {
    id: 2,
    category: "bisnis-properti",
    title: "Apa Itu Dynamic Pricing pada Kos dan Bagaimana Cara Meningkatkan Profit?",
    excerpt: "Optimalkan okupansi kos Anda dengan strategi harga fleksibel ala IDeA...",
    date: "10 Apr 2026",
    readTime: "7 min read",
    tag: "Revenue"
  }
];

function BlogContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // 2. Tab & Search Berbasis URL (SEO & Sharing)
  const activeTab = searchParams.get("kategori") || "semua";
  const blogSearchQuery = searchParams.get("q") || "";

  const updateParams = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "semua") params.set(key, value);
    else params.delete(key);
    router.push(`/blog?${params.toString()}`, { scroll: false });
  };

  const filteredArticles = mainArticles.filter(a => {
    const matchTab = activeTab === "semua" || a.category === activeTab;
    const matchSearch = a.title.toLowerCase().includes(blogSearchQuery.toLowerCase());
    return matchTab && matchSearch;
  });

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HERO SECTION */}
      <section className="bg-slate-50 py-20 px-6 border-b border-slate-100">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tighter leading-tight"
          >
            Pusat Edukasi <br /> <span className="text-cyan-600">IDeA Journal.</span>
          </motion.h1>
          <p className="text-slate-500 font-medium max-w-xl mx-auto text-sm md:text-base">
            IDea sedang menyiapkan pilihan informasi terbaik buat kamu...
          </p>
        </div>
      </section>

      {/* 2. PANDUAN PLATFORM (Bisa dibuka masing-masing) */}
      <section className="max-w-7xl mx-auto px-6 -mt-10 relative z-10 mb-20">
        <div className="bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
               Panduan IDE Kos <span className="px-3 py-1 bg-cyan-100 text-cyan-600 text-[10px] rounded-full">MUST READ</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {platformGuides.map((guide) => (
              <Link href={`/blog/panduan/${guide.slug}`} key={guide.id}>
                <motion.div whileHover={{ y: -5 }} className="p-6 h-full rounded-[2rem] border border-slate-50 bg-white hover:border-cyan-100 hover:shadow-xl transition-all group">
                  <div className={`w-12 h-12 ${guide.color} rounded-2xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform`}>
                    {guide.icon}
                  </div>
                  <h3 className="font-black text-slate-900 mb-2 group-hover:text-cyan-600 transition-colors">{guide.title}</h3>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">{guide.desc}</p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ARTIKEL & INSIGHTS (Main Feed) */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-4">Berita & Insights</h2>
            
            {/* Search Bar Minimalis */}
            <div className="relative w-full max-w-xs">
              <input 
                type="text" placeholder="Cari artikel..." 
                value={blogSearchQuery} onChange={(e) => updateParams("q", e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 rounded-full text-xs outline-none focus:ring-2 focus:ring-cyan-500 transition-all"
              />
              <svg className="w-4 h-4 absolute left-3.5 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </div>
          </div>
          
          {/* Pilar Navigation Berbasis URL */}
          <div className="flex gap-2 overflow-x-auto no-scrollbar w-full lg:w-auto">
            {["semua", "tips-anak-kos", "bisnis-properti"].map((cat) => (
              <button 
                key={cat} onClick={() => updateParams("kategori", cat)}
                className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                  activeTab === cat ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                }`}
              >
                {cat.replace("-", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Grid Artikel */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredArticles.map((article) => (
            <article key={article.id} className="group flex flex-col h-full">
              <div className="h-60 bg-slate-100 rounded-[2.5rem] mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-slate-200 group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="px-2 flex flex-col flex-1">
                <span className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest block mb-2">
                  {article.date} • <span className="text-slate-400">{article.readTime}</span>
                </span>
                <h3 className="text-xl font-black text-slate-900 mb-3 group-hover:text-cyan-600 transition-colors leading-tight">
                  <Link href={`/blog/${article.id}`}>{article.title}</Link>
                </h3>
                <p className="text-sm text-slate-500 font-medium mb-6 line-clamp-2">{article.excerpt}</p>
                <div className="mt-auto">
                  <Link href={`/blog/${article.id}`} className="text-xs font-black text-slate-900 border-b-2 border-slate-900 pb-1 hover:text-cyan-600 hover:border-cyan-600 transition-all">
                    BACA SELENGKAPNYA
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Placeholder */}
        <div className="mt-20 flex justify-center">
           <button className="px-8 py-3 border-2 border-slate-200 rounded-full text-slate-500 font-bold hover:border-cyan-500 hover:text-cyan-600 transition-all text-xs">
              MUAT LEBIH BANYAK ARTIKEL
           </button>
        </div>
      </section>
    </div>
  );
}

export default function BlogPage() {
  return (
    <Suspense fallback={<div className="p-20 text-center font-bold">Menyiapkan IDeA Journal...</div>}>
      <BlogContent />
    </Suspense>
  );
}
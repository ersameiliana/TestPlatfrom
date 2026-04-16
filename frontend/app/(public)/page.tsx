"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

export default function SearchPage() {
  // State untuk Cascading Dropdown (Filter Geografis)
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [priceRange, setPriceRange] = useState(5000000);

  // Data Hierarki Provinsi -> Kota
  const regions: Record<string, string[]> = {
    "Banten": ["Tangerang", "Tangerang Selatan", "Serang", "Cilegon"],
    "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"],
    "Jawa Barat": ["Bandung", "Depok", "Bogor", "Bekasi", "Cimahi"],
    "Jawa Tengah": ["Semarang", "Surakarta (Solo)", "Purwokerto", "Magelang"],
    "DI Yogyakarta": ["Sleman", "Kota Jogja", "Bantul"],
    "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo", "Jember", "Kediri"],
  };

  // Dummy Data Kos
  const dummyKos = [
    { id: 1, name: "IDE Kos Premium Sudirman", type: "Campur", price: "2.500.000", rating: "4.9", location: "Jakarta Selatan", verified: true, splitPay: true, transport: "200m", safety: "A" },
    { id: 2, name: "Kos Putri Melati Asri", type: "Putri", price: "1.200.000", rating: "4.7", location: "Surabaya Timur", verified: true, splitPay: false, transport: "800m", safety: "B+" },
    { id: 3, name: "Kos Pasutri Nyaman", type: "Pasutri", price: "1.800.000", rating: "4.5", location: "Malang Kota", verified: false, splitPay: true, transport: "1.5km", safety: "B" },
    { id: 4, name: "IDE Kos Eksklusif UNAIR", type: "Campur", price: "2.100.000", rating: "5.0", location: "Surabaya", verified: true, splitPay: true, transport: "50m", safety: "A+" },
    { id: 5, name: "Kos Hemat UGM", type: "Putra", price: "800.000", rating: "4.6", location: "Sleman, Jogja", verified: true, splitPay: false, transport: "500m", safety: "A" },
    { id: 6, name: "Kos Eksklusif ITB", type: "Campur", price: "2.800.000", rating: "4.9", location: "Bandung", verified: true, splitPay: true, transport: "100m", safety: "A" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-[calc(100vh-64px)] bg-slate-50 relative">
      
      {/* ========================================= */}
      {/* 1. SIDEBAR FILTER (Kiri)                  */}
      {/* ========================================= */}
      <aside className="w-full md:w-80 bg-white border-r border-slate-200 p-6 flex flex-col shrink-0 custom-scrollbar md:sticky md:top-[64px] md:h-[calc(100vh-64px)] overflow-y-auto">
        <h3 className="font-bold text-slate-800 mb-6 flex items-center gap-2 text-lg">
          <svg className="w-5 h-5 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>
          Filter Pencarian
        </h3>

        {/* Cascading Dropdowns */}
        <div className="space-y-4 mb-8 border-b border-slate-100 pb-8">
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Provinsi</label>
            <select 
              className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-slate-50 transition-all cursor-pointer"
              value={province}
              onChange={(e) => { setProvince(e.target.value); setCity(""); }}
            >
              <option value="">Seluruh Jawa</option>
              {Object.keys(regions).map(prov => <option key={prov} value={prov}>{prov}</option>)}
            </select>
          </div>

          <div className={`transition-opacity duration-300 ${!province ? 'opacity-50' : 'opacity-100'}`}>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Kota/Area</label>
            <select 
              className="w-full p-3 text-sm border border-slate-200 rounded-xl focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none bg-slate-50 cursor-pointer disabled:cursor-not-allowed"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!province}
            >
              <option value="">{province ? "Semua Kota" : "Pilih Provinsi Dulu"}</option>
              {province && regions[province].map((c: string) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>

        {/* Range Harga (Slider Sederhana) */}
        <div className="mb-8 border-b border-slate-100 pb-8">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block flex justify-between">
            <span>Batas Harga</span>
            <span className="text-cyan-600">Rp {(priceRange / 1000000).toFixed(1)} Jt</span>
          </label>
          <input 
            type="range" 
            min="500000" 
            max="10000000" 
            step="100000"
            value={priceRange}
            onChange={(e) => setPriceRange(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-cyan-500"
          />
        </div>

        {/* Fitur Game Changer Toggle */}
        <div className="space-y-3 mb-8">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 block">Fasilitas Ekstra</label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" defaultChecked />
            <span className="text-sm font-medium text-slate-700 group-hover:text-cyan-600 transition-colors">IDE Kos Verified</span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer group">
            <input type="checkbox" className="w-5 h-5 rounded border-slate-300 text-cyan-500 focus:ring-cyan-500" />
            <span className="text-sm font-medium text-slate-700 group-hover:text-cyan-600 transition-colors">Bisa Split Payment</span>
          </label>
        </div>

        {/* IDeA Insight Panel */}
        <div className="p-4 bg-gradient-to-br from-cyan-50 to-blue-50 rounded-xl border border-cyan-100 mt-auto">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyan-500 text-white rounded-lg shadow-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">IDeA Insight Aktif</h4>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">Sistem AI mengurutkan hasil berdasarkan skor keamanan & akses transportasi terbaik.</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ========================================= */}
      {/* 2. AREA LISTING (Kanan)                   */}
      {/* ========================================= */}
      <main className="flex-1 p-6 md:p-8 bg-slate-50 min-w-0">
        <div className="max-w-6xl mx-auto">
          
          {/* Header & Sort */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                {city ? `Kos di ${city}` : province ? `Kos di ${province}` : "Kos Se-Jawa"}
              </h1>
              <p className="text-sm text-slate-500 mt-1">Menampilkan {dummyKos.length} properti terbaik.</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">Urutkan:</span>
              <select className="p-2 text-sm border border-slate-200 rounded-lg bg-white focus:outline-none focus:border-cyan-500 cursor-pointer">
                <option>Rekomendasi IDeA</option>
                <option>Harga Terendah</option>
                <option>Harga Tertinggi</option>
                <option>Rating Tertinggi</option>
              </select>
            </div>
          </div>

          {/* Grid Listing Card */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
          >
            {dummyKos.map((kos) => (
              <motion.div 
                key={kos.id} 
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className="bg-white border border-slate-200 rounded-2xl overflow-hidden hover:shadow-xl transition-all group flex flex-col"
              >
                {/* Image Placeholder & Badges */}
                <div className="h-48 bg-slate-200 relative overflow-hidden">
                  <motion.div className="absolute inset-0 bg-slate-300" whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }} />
                  
                  {/* Verified Badge */}
                  {kos.verified && (
                    <div className="absolute top-3 left-3 bg-green-500 text-white text-[10px] font-extrabold px-2 py-1 rounded shadow-sm flex items-center gap-1 z-10">
                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                      VERIFIED
                    </div>
                  )}

                  {/* Split Pay Badge (Icon Dompet) */}
                  {kos.splitPay && (
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-slate-700 text-[10px] font-bold px-2 py-1 rounded shadow-sm flex items-center gap-1 z-10" title="Bisa Patungan">
                      <svg className="w-3 h-3 text-cyan-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                      SPLIT
                    </div>
                  )}
                </div>
                
                {/* Content Info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">{kos.type}</span>
                    <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                      <svg className="w-3.5 h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      {kos.rating}
                    </span>
                  </div>
                  
                  <h3 className="mb-1 font-bold text-slate-900 text-lg leading-tight group-hover:text-cyan-600 transition-colors line-clamp-1">
                    {kos.name}
                  </h3>
                  
                  <p className="text-xs text-slate-500 mb-4 flex items-center gap-1 line-clamp-1">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    {kos.location}
                  </p>

                  {/* Micro-badges Neighborhood Insight */}
                  <div className="flex gap-2 mb-4 mt-auto border-t border-slate-50 pt-3">
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded" title="Akses Transportasi Umum">
                       🚆 {kos.transport}
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-slate-500 bg-slate-50 px-2 py-1 rounded" title="Skor Keamanan Area">
                       👮 Keamanan {kos.safety}
                    </div>
                  </div>
                  
                  {/* Price Bar & Action */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                    <div>
                      <span className="text-xl font-extrabold text-cyan-600">Rp {kos.price}</span>
                      <span className="text-[10px] text-slate-400 block font-medium">/ bulan</span>
                    </div>
                    <Link href={`/kos/${kos.id}`}>
                      <button className="px-4 py-2 text-sm font-bold text-white transition-all bg-slate-900 rounded-xl hover:bg-black shadow-md shadow-slate-900/10">
                        Detail
                      </button>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </main>

    </div>
  );
}
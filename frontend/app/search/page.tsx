"use client";

import { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface Kos {
  id: number;
  name: string;
  price: number;
  priceDisplay: string;
  location: string;
  province: string;
  type: string;
  rating: number;
  verified: boolean;
  facilities: string[];
}

// Data Dummy Lengkap se-Pulau Jawa
const dummyData: Kos[] = [
  { id: 1, name: "IDE Kos Premium Sudirman", price: 2500000, priceDisplay: "2.500.000", location: "Jakarta Selatan", province: "jakarta", type: "CAMPUR", rating: 4.9, verified: true, facilities: ["AC", "WiFi", "KM Dalam"] },
  { id: 2, name: "Kos Putri Melati Asri", price: 1200000, priceDisplay: "1.200.000", location: "Surabaya Timur", province: "jawa-timur", type: "PUTRI", rating: 4.7, verified: true, facilities: ["WiFi", "Parkir"] },
  { id: 3, name: "Kos Putra Dekat UGM", price: 1500000, priceDisplay: "1.500.000", location: "Sleman", province: "yogyakarta", type: "PUTRA", rating: 4.8, verified: true, facilities: ["AC", "WiFi"] },
  { id: 4, name: "Kos Eksklusif Dago", price: 2800000, priceDisplay: "2.800.000", location: "Bandung", province: "jawa-barat", type: "CAMPUR", rating: 4.9, verified: true, facilities: ["AC", "WiFi", "KM Dalam"] },
  { id: 5, name: "Kos Tengah Kota Semarang", price: 1100000, priceDisplay: "1.100.000", location: "Simpang Lima", province: "jawa-tengah", type: "CAMPUR", rating: 4.6, verified: true, facilities: ["WiFi", "Parkir"] },
  { id: 6, name: "IDE Kos Tangerang Ceria", price: 950000, priceDisplay: "950.000", location: "BSD City", province: "banten", type: "PUTRA", rating: 4.4, verified: false, facilities: ["WiFi"] },
];

function SearchContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Daftar Provinsi Lengkap
  const provinces = ["Semua", "Banten", "Jakarta", "Jawa Barat", "Jawa Tengah", "Yogyakarta", "Jawa Timur"];

  const provinceParam = searchParams.get("province") || "Semua";
  const queryParam = searchParams.get("q") || "";
  const priceParam = searchParams.get("price") || "Semua";
  const facilitiesParam = searchParams.get("facilities")?.split(",") || [];

  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = (key: string, value: string | string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    if (Array.isArray(value)) {
      if (value.length > 0) params.set(key, value.join(","));
      else params.delete(key);
    } else {
      if (value && value !== "Semua") params.set(key, value);
      else params.delete(key);
    }
    router.push(`/search?${params.toString()}`, { scroll: false });
  };

  const filteredKos = dummyData.filter(kos => {
    const matchProvince = provinceParam === "Semua" || kos.province === provinceParam.toLowerCase().replace(" ", "-");
    const matchSearch = kos.name.toLowerCase().includes(queryParam.toLowerCase()) || kos.location.toLowerCase().includes(queryParam.toLowerCase());
    
    let matchPrice = true;
    if (priceParam === "under1") matchPrice = kos.price < 1000000;
    else if (priceParam === "1to2") matchPrice = kos.price >= 1000000 && kos.price <= 2000000;
    else if (priceParam === "over2") matchPrice = kos.price > 2000000;

    const matchFacilities = facilitiesParam.every(f => kos.facilities.includes(f));

    return matchProvince && matchSearch && matchPrice && matchFacilities;
  });

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-6 py-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <input 
              type="text" 
              placeholder="Mau nge-kos di mana? Cari nama kampus, stasiun, atau area..." 
              value={queryParam}
              onChange={(e) => updateFilters("q", e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-100 border-2 border-transparent focus:border-cyan-500 focus:bg-white rounded-2xl outline-none transition-all text-sm font-medium"
            />
            <svg className="w-5 h-5 absolute left-4 top-3.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
          </div>
          <button onClick={() => setShowFilters(true)} className="md:hidden w-full py-3 bg-white border border-slate-200 rounded-xl font-bold text-sm text-cyan-600">Atur Filter & Area</button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto w-full flex flex-1 gap-8 px-6 py-8">
        {/* SIDEBAR FILTER */}
        <aside className={`fixed md:relative inset-0 z-40 md:z-auto bg-white md:bg-transparent p-6 md:p-0 w-full md:w-64 shrink-0 transition-transform ${showFilters ? 'translate-x-0' : '-translate-x-full md:translate-x-0'} overflow-y-auto`}>
          <div className="flex justify-between items-center md:hidden mb-6">
            <h2 className="text-xl font-bold text-cyan-600">IDea Filter</h2>
            <button onClick={() => setShowFilters(false)} className="p-2 bg-slate-100 rounded-full text-sm">✕</button>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Pilih Area Utama</h3>
            {/* Responsive Grid: 2 kolom di mobile, 1 kolom di desktop */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-2">
              {provinces.map((p) => (
                <button 
                  key={p} 
                  onClick={() => { updateFilters("province", p); if(window.innerWidth < 768) setShowFilters(false); }}
                  className={`text-left px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
                    provinceParam === p 
                      ? 'bg-cyan-500 text-white border-cyan-500 shadow-lg shadow-cyan-200' 
                      : 'bg-white md:bg-transparent border-slate-100 text-slate-600 hover:border-cyan-200 hover:text-cyan-600'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Rentang Harga Per Bulan</h3>
            <div className="space-y-2">
              {[
                { label: "Semua Budget", val: "Semua" },
                { label: "Di bawah Rp 1 Juta", val: "under1" },
                { label: "Rp 1 Juta - 2 Juta", val: "1to2" },
                { label: "Premium (Di atas 2 Juta)", val: "over2" },
              ].map((range) => (
                <label key={range.val} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="radio" 
                    name="price" 
                    checked={priceParam === range.val}
                    onChange={() => updateFilters("price", range.val)}
                    className="w-5 h-5 text-cyan-500 focus:ring-cyan-500 border-slate-300" 
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-cyan-600">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-4">Fasilitas Wajib Ada</h3>
            <div className="space-y-2">
              {["AC", "WiFi", "KM Dalam", "Parkir"].map((f) => (
                <label key={f} className="flex items-center gap-3 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={facilitiesParam.includes(f)}
                    onChange={(e) => {
                      const nextFac = e.target.checked 
                        ? [...facilitiesParam, f] 
                        : facilitiesParam.filter(item => item !== f);
                      updateFilters("facilities", nextFac);
                    }}
                    className="w-5 h-5 rounded text-cyan-500 focus:ring-cyan-500 border-slate-300" 
                  />
                  <span className="text-sm font-medium text-slate-600 group-hover:text-cyan-600">{f}</span>
                </label>
              ))}
            </div>
          </div>
        </aside>

        {/* MAIN LIST */}
        <main className="flex-1">
          {filteredKos.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center py-20 text-center">
              <div className="w-32 h-32 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                <span className="text-5xl">🔍</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Wah, IDea Belum Nemu Kos yang Pas...</h2>
              <p className="text-slate-500 mb-8 max-w-sm mx-auto">Filter Kakak mungkin terlalu ketat. Coba kurangi beberapa pilihan fasilitas atau cari dengan kata kunci yang lebih umum, yuk!</p>
              <button 
                onClick={() => router.push("/search")}
                className="px-8 py-3 bg-cyan-600 text-white font-bold rounded-2xl shadow-lg shadow-cyan-200 hover:bg-cyan-700 transition-all"
              >
                Segarkan Pencarian
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredKos.map((kos) => (
                  <motion.div 
                    layout 
                    key={kos.id} 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden hover:shadow-xl transition-all flex flex-col group"
                  >
                    <div className="h-48 bg-slate-200 relative overflow-hidden">
                       <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-500" />
                       {kos.verified && (
                         <div className="absolute top-4 left-4 px-3 py-1 bg-green-500 text-white text-[10px] font-black rounded-full flex items-center gap-1 shadow-lg z-10">
                           <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
                           VERIFIED
                         </div>
                       )}
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[10px] font-black px-2 py-1 bg-cyan-50 text-cyan-600 rounded uppercase">{kos.type}</span>
                        <span className="text-xs font-bold text-slate-700">⭐ {kos.rating}</span>
                      </div>
                      <h3 className="font-bold text-slate-900 mb-1 group-hover:text-cyan-600 transition-colors leading-tight">{kos.name}</h3>
                      <p className="text-xs text-slate-500 mb-4">{kos.location}</p>
                      <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                        <div>
                           <span className="font-black text-cyan-600 text-lg">Rp {kos.priceDisplay}</span>
                           <span className="text-[10px] text-slate-400 font-bold ml-1">/ bln</span>
                        </div>
                        <Link href={`/kos/${kos.id}`} className="px-4 py-2 bg-slate-900 text-white text-xs font-bold rounded-xl hover:bg-cyan-600 transition-colors">Lihat Kamar</Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="flex flex-col items-center justify-center h-[60vh] text-center p-10">
        <div className="w-12 h-12 border-4 border-cyan-100 border-t-cyan-500 rounded-full animate-spin mb-4"></div>
        <p className="text-slate-500 font-medium animate-pulse">IDea sedang menyiapkan pilihan kos terbaik buat kamu...</p>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}
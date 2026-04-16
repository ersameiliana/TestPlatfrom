"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";

// Import Peta Leaflet secara dinamis
const MapDynamic = dynamic(() => import("@/components/MapComponent"), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center text-slate-400 font-bold uppercase tracking-widest">Inisialisasi Peta...</div>
});

// 1. Strict Typing untuk Data Kos
interface Kos {
  id: number;
  name: string;
  price: string;
  lat: number;
  lng: number;
  verified: boolean;
  rating: number;
  type: string;
  location: string;
}

// 2. Definisi Koordinat Pusat setiap Provinsi di Jawa
const AREA_COORDINATES: Record<string, { lat: number, lng: number, zoom: number }> = {
  "jakarta": { lat: -6.2088, lng: 106.8456, zoom: 12 },
  "jawa-barat": { lat: -6.9175, lng: 107.6191, zoom: 10 },
  "banten": { lat: -6.12, lng: 106.1502, zoom: 11 },
  "jawa-tengah": { lat: -7.0051, lng: 110.4381, zoom: 10 },
  "yogyakarta": { lat: -7.7956, lng: 110.3695, zoom: 12 },
  "jawa-timur": { lat: -7.2504, lng: 112.7688, zoom: 11 },
};

const dummyKos: Kos[] = [
  { id: 1, name: "IDE Kos Premium Sudirman", price: "2.500.000", lat: -6.2297, lng: 106.8295, verified: true, rating: 4.9, type: "Campur", location: "Jakarta Selatan" },
  { id: 2, name: "Kos Putri Melati Asri", price: "1.200.000", lat: -7.2604, lng: 112.7600, verified: true, rating: 4.7, type: "Putri", location: "Surabaya Timur" },
  { id: 3, name: "Kos Campur Dekat UNAIR", price: "1.800.000", lat: -7.2710, lng: 112.7800, verified: true, rating: 4.8, type: "Campur", location: "Surabaya" },
  { id: 4, name: "Kos Pasutri Nyaman", price: "3.200.000", lat: -7.9666, lng: 112.6326, verified: false, rating: 4.5, type: "Pasutri", location: "Malang Kota" },
];

function MapContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const selectedId = searchParams.get("selected");
  const areaParam = searchParams.get("area");

  const [selectedKos, setSelectedKos] = useState<Kos | null>(null);
  const [isMobileListOpen, setIsMobileListOpen] = useState(false);
  
  // State untuk pusat peta (Default Surabaya)
  const [mapCenter, setMapCenter] = useState({
    lat: -7.2504,
    lng: 112.7688,
    zoom: 11
  });

  // Logika Cerdas: Deteksi perubahan area dari Navbar/URL
  useEffect(() => {
    if (areaParam && AREA_COORDINATES[areaParam]) {
      setMapCenter(AREA_COORDINATES[areaParam]);
    }
  }, [areaParam]);

  // Mempertahankan State Pilihan Kos via URL
  useEffect(() => {
    if (selectedId) {
      const found = dummyKos.find((k) => k.id.toString() === selectedId);
      if (found) setSelectedKos(found);
    } else {
      setSelectedKos(null);
    }
  }, [selectedId]);

  const handleSelectKos = (kos: Kos | null) => {
    if (kos) {
      router.push(`/map?${areaParam ? `area=${areaParam}&` : ''}selected=${kos.id}`, { scroll: false });
      setIsMobileListOpen(false);
    } else {
      router.push(`/map${areaParam ? `?area=${areaParam}` : ''}`, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-64px)] overflow-hidden bg-white relative text-slate-800">
      
      {/* 1. TOP FILTER BAR */}
      <div className="z-20 p-4 bg-white border-b border-slate-200 shadow-sm flex flex-col gap-3 shrink-0">
        <div className="flex gap-3 items-center">
          <div className="relative flex-1 max-w-md">
            <input 
              type="text" 
              placeholder="Cari kampus, stasiun..." 
              className="w-full pl-10 pr-4 py-2.5 text-sm border border-slate-300 rounded-full focus:ring-2 focus:ring-cyan-500 outline-none transition-all shadow-inner"
            />
            <svg className="w-5 h-5 absolute left-4 top-2.5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button className="hidden sm:block px-5 py-2.5 text-sm font-bold border border-slate-200 rounded-full hover:bg-slate-50 transition-colors">Harga</button>
          <button className="px-5 py-2.5 text-sm font-bold bg-cyan-500 text-white rounded-full hover:bg-cyan-600 shadow-md">Filter</button>
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar items-center">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-2 shrink-0">Area Populer:</span>
          {["Surabaya", "Jakarta", "Malang", "Bandung", "Yogyakarta", "Semarang"].map((chip) => (
            <button key={chip} className="px-4 py-1.5 text-xs font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-full hover:border-cyan-500 transition-colors whitespace-nowrap">
              {chip}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-1 relative overflow-hidden">
        
        {/* 2. DESKTOP SIDEBAR LISTING */}
        <div className="hidden md:flex flex-col w-[400px] h-full bg-white border-r border-slate-200 z-10 shrink-0">
          <div className="p-4 border-b border-slate-100">
            <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{dummyKos.length} Properti di Area Ini</h2>
          </div>
          <div className="flex-1 overflow-y-auto p-4 custom-scrollbar flex flex-col gap-4">
            {dummyKos.map((kos) => (
              <div 
                key={kos.id}
                onClick={() => handleSelectKos(kos)}
                className={`p-3 border rounded-2xl cursor-pointer transition-all hover:shadow-lg ${selectedKos?.id === kos.id ? 'border-cyan-500 bg-cyan-50/30' : 'border-slate-100'}`}
              >
                <div className="w-full h-36 bg-slate-200 rounded-xl mb-3 relative overflow-hidden">
                  {kos.verified && <span className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm z-10">VERIFIED</span>}
                  <div className="absolute inset-0 bg-slate-300" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm leading-tight">{kos.name}</h3>
                <p className="text-xs text-slate-500 mt-1">{kos.location}</p>
                <div className="flex items-end justify-between border-t border-slate-100 pt-3 mt-3">
                  <div>
                    <span className="text-base font-extrabold text-cyan-600">Rp {kos.price}</span>
                    <span className="text-[10px] text-slate-400"> /bln</span>
                  </div>
                  <span className="text-xs font-bold text-slate-700">⭐ {kos.rating}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. HERO MAP AREA */}
        <div className="flex-1 relative overflow-hidden z-0 bg-slate-100">
           <MapDynamic 
            kosData={dummyKos} 
            selectedKos={selectedKos} 
            onSelectKos={handleSelectKos}
            center={mapCenter}
           />

           {/* Quick View Popup Overlay */}
           <AnimatePresence>
            {selectedKos && !isMobileListOpen && (
              <motion.div 
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 40, scale: 0.9 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[90%] md:w-[340px] bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden z-[1000] flex flex-col"
              >
                <button onClick={() => handleSelectKos(null)} className="absolute top-3 right-3 p-1.5 bg-black/30 text-white rounded-full z-10 backdrop-blur-sm">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                <div className="h-40 bg-slate-300" />
                <div className="p-5">
                  <h4 className="font-bold text-slate-900 text-lg">{selectedKos.name}</h4>
                  <div className="flex gap-2 mt-3 mb-4">
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Keamanan</span>
                      <span className="text-sm font-extrabold text-green-600">A</span>
                    </div>
                    <div className="flex-1 bg-slate-50 border border-slate-100 rounded-xl p-2 text-center">
                      <span className="block text-[10px] text-slate-400 font-bold uppercase">Transport</span>
                      <span className="text-sm font-extrabold text-slate-700">300m</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="font-extrabold text-cyan-600 text-xl">Rp {selectedKos.price}</span>
                    <Link href={`/kos/${selectedKos.id}`} className="text-sm font-bold text-white bg-slate-900 px-5 py-3 rounded-xl hover:bg-black transition-all">Detail</Link>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MOBILE LIST FAB */}
        {!isMobileListOpen && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 md:hidden">
            <button onClick={() => setIsMobileListOpen(true)} className="bg-slate-900 text-white px-6 py-3 rounded-full font-bold shadow-xl flex items-center gap-2">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>
               Lihat List Kos
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function MapPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center h-screen bg-white">Memuat Peta Se-Jawa...</div>}>
      <MapContent />
    </Suspense>
  );
}
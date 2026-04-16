"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";

// Interface untuk data kos agar konsisten dengan halaman search
interface Kos {
  id: number;
  name: string;
  price: string;
  location: string;
  province: string;
  type: string;
  rating: number;
  verified: boolean;
  facilities: string[];
}

const dummyDetails: Record<number, any> = {
  1: {
    id: 1,
    name: "IDE Kos Premium Sudirman",
    price: "2.500.000",
    location: "Karet Tengsin, Jakarta Selatan",
    type: "CAMPUR",
    rating: 4.9,
    verified: true,
    description: "Kos eksklusif di jantung bisnis Jakarta. Dekat dengan MRT Setiabudi Astra dan berbagai gedung perkantoran. Kamar sudah full furnished dengan desain minimalis modern.",
    facilities: ["AC", "WiFi", "KM Dalam", "Water Heater", "Kasur King Size", "Meja Kerja"],
    rules: ["Maks. 2 orang/kamar", "Tidak boleh bawa anabul", "Akses 24 Jam"],
    ownerName: "Ibu Ratna"
  },
  2: {
    id: 2,
    name: "Kos Putri Melati Asri",
    price: "1.200.000",
    location: "Surabaya Timur",
    type: "PUTRI",
    rating: 4.7,
    verified: true,
    description: "Hunian nyaman khusus putri di kawasan pendidikan Surabaya. Lingkungan asri dan sangat tenang untuk belajar.",
    facilities: ["WiFi", "Parkir", "Dapur Bersama", "KM Luar"],
    rules: ["Khusus Putri", "Jam Malam 22:00", "Tamun Pria dilarang masuk"],
    ownerName: "Bapak Budi"
  }
};

export default function DetailKosPage() {
  const params = useParams();
  const id = Number(params.id);
  const data = dummyDetails[id] || dummyDetails[1]; // Fallback ke ID 1 jika ID di URL tidak ada di dummy

  return (
    <div className="min-h-screen bg-white pb-24 text-slate-900">
      {/* 1. Header & Image Gallery */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
          <Link href="/search" className="hover:text-cyan-600 transition-colors">Cari Kos</Link>
          <span>/</span>
          <span className="text-slate-800 font-bold truncate">{data.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-[300px] md:h-[500px]">
          <div className="md:col-span-2 bg-slate-200 rounded-[2rem] overflow-hidden relative group">
            <div className="absolute inset-0 bg-slate-300 group-hover:scale-105 transition-transform duration-700" />
            {data.verified && (
              <span className="absolute top-6 left-6 bg-green-500 text-white text-[10px] md:text-xs font-black px-4 py-2 rounded-full z-10 shadow-lg">VERIFIED PROPERTY</span>
            )}
          </div>
          <div className="hidden md:flex flex-col gap-4">
            <div className="flex-1 bg-slate-100 rounded-[2rem] overflow-hidden relative">
                <div className="absolute inset-0 bg-slate-200" />
            </div>
            <div className="flex-1 bg-slate-100 rounded-[2rem] relative overflow-hidden">
               <div className="absolute inset-0 bg-slate-200" />
               <button className="absolute inset-0 flex items-center justify-center font-bold text-slate-600 hover:text-cyan-600 transition-colors z-10 bg-white/20 backdrop-blur-sm">
                  + Lihat Semua Foto
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Content Section */}
      <div className="max-w-7xl mx-auto px-6 mt-10 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 leading-tight tracking-tighter">{data.name}</h1>
              <p className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                <svg className="w-4 h-4 text-cyan-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
                {data.location}
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <span className="inline-block px-4 py-1 bg-cyan-50 text-cyan-600 text-[10px] font-black rounded-full uppercase mb-2">{data.type}</span>
              <p className="text-sm font-bold text-slate-800 flex items-center justify-end gap-1">⭐ {data.rating}</p>
            </div>
          </div>

          <hr className="border-slate-100 mb-8" />

          {/* IDeA Neighborhood Insight - FIXED LOGIC */}
          <div className="bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-[2rem] p-6 md:p-8 text-white mb-10 shadow-xl shadow-cyan-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center text-xl">✨</div>
              <h3 className="font-bold text-lg tracking-tight">Neighborhood Insight by IDeA</h3>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { label: "Keamanan", val: "A+ Sangat Aman" },
                { label: "Akses Transport", val: "Mudah (300m ke MRT)" }, // Perbaikan di sini
                { label: "Kebisingan", val: "Tenang (Low)" },
                { label: "Area Parkir", val: "Tersedia Luas" },
              ].map((insight, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase opacity-70 mb-1">{insight.label}</span>
                  <span className="text-sm font-black">{insight.val}</span>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Tentang Kos</h3>
          <p className="text-slate-600 leading-relaxed mb-10 font-medium whitespace-pre-line">{data.description}</p>

          <h3 className="text-xl font-black text-slate-900 mb-6 tracking-tight">Fasilitas Kamar</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-4 gap-x-6 mb-10">
            {data.facilities.map((f: string) => (
              <div key={f} className="flex items-center gap-3 text-sm font-bold text-slate-600">
                <div className="w-2 h-2 rounded-full bg-cyan-400" /> {f}
              </div>
            ))}
          </div>

          <h3 className="text-xl font-black text-slate-900 mb-4 tracking-tight">Aturan Menginap</h3>
          <div className="space-y-3">
             {data.rules.map((rule: string) => (
               <div key={rule} className="flex items-center gap-3 text-sm font-medium text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-cyan-500">●</span> {rule}
               </div>
             ))}
          </div>
        </div>

        {/* 3. Sticky Booking Card (Desktop) */}
        <div className="hidden lg:block">
          <div className="sticky top-32 p-8 border border-slate-200 rounded-[2.5rem] bg-white shadow-2xl shadow-slate-100">
            <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mb-2">Harga Sewa</p>
            <div className="flex items-baseline gap-1 mb-8">
              <span className="text-3xl font-black text-cyan-600 tracking-tighter">Rp {data.price}</span>
              <span className="text-slate-400 text-sm font-bold">/ bln</span>
            </div>

            <div className="space-y-4">
              <button className="w-full py-4 bg-cyan-500 text-white font-black rounded-2xl hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-100">
                 ⚡ Langsung Sewa
              </button>
              <button className="w-full py-4 border-2 border-slate-100 text-slate-800 font-black rounded-2xl hover:border-cyan-500 hover:text-cyan-600 transition-all">
                 Tanya IDeA / Pemilik
              </button>
            </div>
            
            <div className="mt-8 flex items-center gap-4 p-4 bg-slate-50 rounded-2xl">
               <div className="w-10 h-10 bg-slate-200 rounded-full" />
               <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Pemilik Properti</p>
                  <p className="text-sm font-black text-slate-800">{data.ownerName}</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Navigation (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-slate-100 flex items-center justify-between lg:hidden z-50">
        <div>
           <p className="text-lg font-black text-cyan-600 tracking-tight">Rp {data.price} <span className="text-xs text-slate-400">/ bln</span></p>
           <Link href={`/kos/${data.id}`} className="text-[10px] font-bold text-cyan-500 underline uppercase tracking-tighter">Lihat Aturan</Link>
        </div>
        <button className="px-8 py-3 bg-slate-900 text-white font-black rounded-2xl shadow-xl active:scale-95 transition-transform">
           Lihat Kamar
        </button>
      </div>
    </div>
  );
}
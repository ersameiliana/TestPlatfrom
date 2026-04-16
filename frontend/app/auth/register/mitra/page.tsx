"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterMitraPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
      >
        <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black rounded-full mb-4 uppercase tracking-widest">
          MITRA PROPERTY
        </div>
        <h1 className="text-2xl font-black text-slate-900 tracking-tighter mb-2">Daftarkan Properti Anda 🏢</h1>
        <p className="text-sm text-slate-500 font-medium mb-8">Bergabung dengan ekosistem kos terbesar di Jawa.</p>

        <form className="space-y-4">
          <input type="text" placeholder="Nama Pemilik / Bisnis" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
          <input type="tel" placeholder="Nomor WhatsApp (Aktif)" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
          <input type="email" placeholder="Email Bisnis" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />
          <input type="password" placeholder="Password Akun Mitra" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-emerald-500 transition-all" />

          <button className="w-full py-4 bg-emerald-600 text-white font-black rounded-2xl hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-200 text-xs uppercase tracking-widest mt-4">
            Mulai Jadi Mitra
          </button>
        </form>

        <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 text-center">
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Butuh bantuan pendaftaran?</p>
          <Link href="/bantuan" className="text-xs font-black text-emerald-600">Hubungi Support Mitra</Link>
        </div>
      </motion.div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function RegisterUserPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
      >
        <h1 className="text-2xl font-black text-slate-900 tracking-tighter mb-2 italic">Daftar Pencari Kos 🎒</h1>
        <p className="text-sm text-slate-500 font-medium mb-8">Buat akun untuk mulai booking kos impianmu.</p>

        <form className="space-y-4">
          <input type="text" placeholder="Nama Lengkap" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
          <input type="email" placeholder="Email" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
          <input type="password" placeholder="Buat Password" className="w-full px-6 py-4 bg-slate-50 rounded-2xl text-sm outline-none focus:ring-2 focus:ring-cyan-500 transition-all" />
          
          <button className="w-full py-4 bg-cyan-500 text-white font-black rounded-2xl hover:bg-cyan-600 transition-all shadow-xl shadow-cyan-200 text-xs uppercase tracking-widest mt-4">
            Buat Akun Pencari
          </button>
        </form>

        <p className="mt-6 text-center text-[10px] text-slate-400 font-medium leading-relaxed">
          Dengan mengeklik tombol di atas, Kakak setuju dengan <Link href="/syarat-ketentuan" className="underline">T&C IDeA</Link>.
        </p>
      </motion.div>
    </div>
  );
}
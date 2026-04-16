"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LoginPage() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-slate-50 flex items-center justify-center p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full bg-white p-8 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100"
      >
        <div className="text-center mb-10">
          <h1 className="text-3xl font-black text-slate-900 tracking-tighter mb-2">Masuk ke IDeA</h1>
          <p className="text-sm text-slate-500 font-medium">Lanjutkan perjalanan cari kos atau kelola bisnismu.</p>
        </div>

        <form className="space-y-4">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Email</label>
            <input 
              type="email" 
              placeholder="nama@email.com"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4 mb-2 block">Password</label>
            <input 
              type="password" 
              placeholder="••••••••"
              className="w-full px-6 py-4 bg-slate-50 border-none rounded-2xl focus:ring-2 focus:ring-cyan-500 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="text-right">
            <Link href="#" className="text-xs font-bold text-cyan-600 hover:underline">Lupa Password?</Link>
          </div>

          <button className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all shadow-xl shadow-slate-900/10 text-xs uppercase tracking-widest mt-6">
            Masuk Sekarang
          </button>
        </form>

        <p className="mt-8 text-center text-xs text-slate-500 font-medium">
          Belum punya akun? <Link href="/auth" className="text-cyan-600 font-black">Daftar di sini</Link>
        </p>
      </motion.div>
    </div>
  );
}
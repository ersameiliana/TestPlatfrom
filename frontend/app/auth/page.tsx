"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Drawer } from "vaul";
import React from 'react';

type AuthView = "LOGIN" | "REGISTER" | "OTP_VERIFICATION";
type RegisterRole = "PENYEWA" | "MITRA" | null;

export default function AuthPage() {
  const [view, setView] = useState<AuthView>("LOGIN");
  const [role, setRole] = useState<RegisterRole>(null);
  const [regStep, setRegStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  // States untuk menampung input agar bisa diketik
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Logic Typing Animation di Sisi Video
  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const messages = role === "MITRA" 
    ? ["Tingkatkan okupansi kos Anda hari ini.", "Manajemen tagihan otomatis & bebas repot."] 
    : ["Cari kos idaman, bebas drama penipuan.", "Uang aman dengan sistem Rekening Bersama."];

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    const fullText = messages[textIndex % messages.length];
    if (displayText.length < fullText.length) {
      timeout = setTimeout(() => setDisplayText(fullText.slice(0, displayText.length + 1)), 50);
    } else {
      timeout = setTimeout(() => { setDisplayText(""); setTextIndex(prev => prev + 1); }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [displayText, textIndex, role]);

  const handleAction = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setView("OTP_VERIFICATION");
    }, 2000);
  };

  return (
    <div className="relative min-h-screen w-full bg-white overflow-hidden font-sans selection:bg-cyan-100">
      
      {/* 1. MOBILE VIEW (Vaul Drawer) */}
      <div className="md:hidden relative h-screen w-full bg-slate-900">
        <video src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-design-2423-large.mp4" autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
        <div className="relative z-20 h-full flex flex-col justify-end p-10 pb-20 text-center">
          <h1 className="text-4xl font-black text-white mb-4 tracking-tighter italic uppercase leading-none">IDeA.</h1>
          <p className="text-cyan-400 font-mono text-xs mb-12 h-6 border-r-2 border-cyan-400">{displayText}</p>
          <Drawer.Root onClose={() => { setRole(null); setRegStep(1); setView("LOGIN"); }}>
            <Drawer.Trigger asChild>
              <button className="w-full py-4 bg-white text-slate-900 font-black rounded-2xl shadow-xl text-[10px] uppercase tracking-[0.2em]">Mulai Akses</button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm" />
              <Drawer.Content className="bg-white flex flex-col rounded-t-[3rem] h-[92vh] fixed bottom-0 left-0 right-0 z-50 outline-none shadow-2xl">
                <div className="p-8 bg-white rounded-t-[3rem] flex-1 overflow-y-auto">
                  <div className="mx-auto w-12 h-1.5 rounded-full bg-slate-100 mb-10" />
                  <AuthFormContent 
                    view={view} setView={setView} role={role} setRole={setRole} 
                    regStep={regStep} setRegStep={setRegStep} isLoading={isLoading} 
                    onSubmit={handleAction} password={password} setPassword={setPassword}
                    confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
                  />
                </div>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </div>
      </div>

      {/* 2. DESKTOP VIEW (Professional Split-Screen) */}
      <div className={`hidden md:flex w-full h-screen transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)] ${view === "REGISTER" ? "flex-row-reverse" : "flex-row"}`}>
        <motion.div layout className="w-[45%] h-full bg-white flex items-center justify-center p-12 z-20 shadow-2xl relative">
          <div className="max-w-sm w-full">
            <AuthFormContent 
              view={view} setView={setView} role={role} setRole={setRole} 
              regStep={regStep} setRegStep={setRegStep} isLoading={isLoading} 
              onSubmit={handleAction} password={password} setPassword={setPassword}
              confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
            />
          </div>
        </motion.div>

        <motion.div layout className="w-[55%] h-full relative overflow-hidden bg-slate-900">
          <video src="https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-interior-design-2423-large.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover opacity-40 scale-105" />
          <div className="absolute inset-0 flex flex-col justify-center p-24 z-20 text-white pointer-events-none">
            <h2 className="text-5xl font-black mb-8 tracking-tighter leading-tight uppercase italic">Ekosistem <br /> Kos Digital</h2>
            <div className="h-24 font-mono text-cyan-400 text-2xl leading-relaxed">{displayText}</div>
            <p className="mt-8 text-xs font-black text-slate-500 uppercase tracking-[0.4em]">Official Secured Gateway</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function AuthFormContent({ view, setView, role, setRole, regStep, setRegStep, isLoading, onSubmit, password, setPassword, confirmPassword, setConfirmPassword }: any) {
  const step2InputRef = useRef<HTMLInputElement>(null);

  // Auto-focus kursor saat pindah ke step sandi
  useEffect(() => {
    if (regStep === 2 && step2InputRef.current) step2InputRef.current.focus();
  }, [regStep]);

  // --- VIEW: OTP VERIFICATION ---
  if (view === "OTP_VERIFICATION") {
    return (
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8 text-center">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-2 italic">Verifikasi.</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-relaxed">
            Kode OTP telah dikirimkan melalui <br /> <span className="text-slate-900">WhatsApp & Email</span> Anda.
          </p>
        </div>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4].map((i) => (
            <input key={i} type="text" maxLength={1} className="w-14 h-16 text-center text-2xl font-black bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 focus:bg-white outline-none transition-all" />
          ))}
        </div>
        <button onClick={() => window.location.href = '/'} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl">Verifikasi & Masuk</button>
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest cursor-pointer hover:text-cyan-600">Tidak menerima kode? <span className="underline">Kirim Ulang</span></p>
      </motion.div>
    );
  }

  // --- VIEW: LOGIN ---
  if (view === "LOGIN") {
    return (
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }} className="space-y-6">
        <div className="mb-10 text-center md:text-left">
          <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2 italic text-center md:text-left">Selamat Datang.</h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest text-center md:text-left">Masuk untuk melanjutkan</p>
        </div>
        <FloatingInput id="login-email" label="Email Terdaftar" type="email" required />
        <FloatingInput id="login-pass" label="Kata Sandi" type="password" isPassword required />
        <button type="submit" disabled={isLoading} className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl mt-4 active:scale-95 transition-transform">
          {isLoading ? "Memproses..." : "Masuk ke Akun"}
        </button>
        <SocialGrid />
        <p className="text-center mt-10 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          Baru di IDeA? <button type="button" onClick={() => setView("REGISTER")} className="text-cyan-600 underline">Daftar Akun</button>
        </p>
      </form>
    );
  }

  // --- VIEW: REGISTER (Pilih Peran) ---
  if (view === "REGISTER" && !role) {
    return (
      <div className="space-y-4">
        <button onClick={() => setView("LOGIN")} className="text-[10px] font-black text-slate-400 mb-8 uppercase tracking-widest hover:text-slate-900">← Kembali ke Login</button>
        <h2 className="text-3xl font-black text-slate-900 tracking-tighter mb-10 leading-none italic">Mulai <br /> Perjalananmu.</h2>
        <RoleCard title="Cari Kos Idaman" subtitle="UNTUK MAHASISWA & PEKERJA" icon="🎒" onClick={() => setRole("PENYEWA")} theme="cyan" />
        <RoleCard title="Kelola Properti" subtitle="UNTUK PEMILIK & PENGELOLA KOS" icon="🏢" onClick={() => setRole("MITRA")} theme="emerald" />
        <SocialGrid />
      </div>
    );
  }

  // --- VIEW: REGISTER FORM (Langkah 1 & 2) ---
  return (
    <form onSubmit={(e) => { e.preventDefault(); if(regStep === 1) setRegStep(2); else onSubmit(); }} className="space-y-6">
      <div className="flex items-center justify-between mb-8">
        <button type="button" onClick={() => regStep === 2 ? setRegStep(1) : setRole(null)} className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-slate-900">← Kembali</button>
        <div className="flex gap-1">
          <div className={`w-8 h-1 rounded-full ${regStep >= 1 ? 'bg-slate-900' : 'bg-slate-100'}`} />
          <div className={`w-8 h-1 rounded-full ${regStep >= 2 ? 'bg-slate-900' : 'bg-slate-100'}`} />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {regStep === 1 ? (
          <motion.div key="reg-st1" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -10, opacity: 0 }} className="space-y-5">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 italic">Profil {role}</h2>
            <FloatingInput id="r-name" label="Nama Sesuai KTP" type="text" required />
            <FloatingInput id="r-email" label="Email Aktif" type="email" required />
            <button type="submit" className="w-full py-4 bg-slate-900 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg active:scale-95 transition-transform">Lanjut Buat Sandi →</button>
            <SocialGrid />
          </motion.div>
        ) : (
          <motion.div key="reg-st2" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="space-y-5">
            <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tighter mb-6 italic text-center leading-none">Keamanan Akun</h2>
            
            <FloatingInput id="r-pass" ref={step2InputRef} label="Buat Kata Sandi" type="password" isPassword value={password} onChange={(e:any) => setPassword(e.target.value)} required />
            
            <FloatingInput id="r-pass-confirm" label="Ketik Ulang Sandi" type="password" isPassword value={confirmPassword} onChange={(e:any) => setConfirmPassword(e.target.value)} error={confirmPassword && password !== confirmPassword ? "Sandi tidak cocok, Kak." : ""} required />
            
            <PasswordStrength password={password} />
            
            <FloatingInput id="r-wa" label="Nomor WhatsApp" type="tel" tooltip="Penting untuk verifikasi OTP & info check-in." required />
            
            <button type="submit" disabled={password !== confirmPassword || !password} className={`w-full py-4 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl transition-all active:scale-95 ${role === 'PENYEWA' ? 'bg-cyan-500 hover:bg-cyan-600' : 'bg-emerald-500 hover:bg-emerald-600'} disabled:bg-slate-200 disabled:text-slate-400`}>
              {role === 'PENYEWA' ? 'Konfirmasi & Kirim OTP' : 'Buka Dasbor & Kirim OTP'}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}

// --- REUSABLE COMPONENTS ---

const FloatingInput = React.forwardRef(({ id, label, type, isPassword, tooltip, value, onChange, error, ...props }: any, ref: any) => {
  const [focused, setFocused] = useState(false);
  const [localVal, setLocalVal] = useState("");
  const [isSeen, setIsSeen] = useState(false);

  // Sync value untuk input yang ditenagai state luar (seperti password)
  const activeVal = value !== undefined ? value : localVal;

  return (
    <div className="relative group">
      <label htmlFor={id} className={`absolute left-5 transition-all duration-300 uppercase font-black tracking-widest text-[9px] z-10 ${focused || activeVal ? "-top-2 bg-white px-2 text-slate-900 scale-90" : "top-4 text-slate-400"}`}>
        {label}
      </label>
      <div className="relative">
        <input 
          id={id} ref={ref}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => {
            if (onChange) onChange(e);
            else setLocalVal(e.target.value);
          }}
          type={isPassword ? (isSeen ? "text" : "password") : type}
          value={activeVal}
          className={`w-full px-5 py-4 bg-white border-2 rounded-2xl outline-none transition-all font-bold text-sm ${error ? "border-red-500 focus:border-red-600" : "border-slate-100 focus:border-slate-900"}`}
          {...props}
        />
        {isPassword && activeVal && (
          <button type="button" onClick={() => setIsSeen(!isSeen)} className="absolute right-5 top-4 text-slate-300 hover:text-slate-900 transition-colors">
            {isSeen ? "🙉" : "👁️"}
          </button>
        )}
      </div>
      {error && <p className="mt-1 ml-4 text-[9px] font-black text-red-500 uppercase tracking-tighter">{error}</p>}
      {tooltip && (
        <div className="absolute right-12 top-4 group-hover:block hidden">
          <span className="cursor-help text-slate-300 text-xs italic">ⓘ</span>
          <div className="absolute bottom-full right-0 mb-2 w-48 p-3 bg-slate-900 text-white text-[8px] rounded-xl font-bold shadow-2xl z-50 leading-relaxed">{tooltip}</div>
        </div>
      )}
    </div>
  );
});
FloatingInput.displayName = "FloatingInput";

function PasswordStrength({ password }: { password: string }) {
  const strength = password.length === 0 ? 0 : password.length < 6 ? 1 : password.length < 10 ? 2 : 3;
  const messages = ["", "Sandi terlalu pendek, Kak.", "Sandi lumayan, tambahkan simbol.", "Sandi kuat dan aman!"];
  const colors = ["bg-slate-100", "bg-red-400", "bg-yellow-400", "bg-emerald-400"];
  return (
    <div className="px-1">
      <div className="flex gap-1.5 mb-1.5">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1 flex-1 rounded-full transition-all duration-500 ${strength >= s ? colors[strength] : "bg-slate-100"}`} />
        ))}
      </div>
      {password.length > 0 && (
        <p className={`text-[9px] font-black uppercase tracking-tighter ${strength === 3 ? "text-emerald-500" : "text-slate-400"}`}>
          {messages[strength]}
        </p>
      )}
    </div>
  );
}

function RoleCard({ title, subtitle, icon, onClick, theme }: any) {
  const colors = theme === "cyan" ? "hover:border-cyan-500 bg-cyan-50/20 text-cyan-600" : "hover:border-emerald-500 bg-emerald-50/20 text-emerald-600";
  return (
    <button type="button" onClick={onClick} className={`w-full p-6 border-2 border-slate-50 rounded-[2rem] flex items-center gap-6 transition-all group ${colors} active:scale-95`}>
      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-sm group-hover:scale-110 transition-transform">{icon}</div>
      <div className="text-left leading-none">
        <span className="block font-black text-slate-900 text-sm uppercase tracking-tight mb-1">{title}</span>
        <span className="block text-[8px] text-slate-400 font-bold uppercase tracking-widest">{subtitle}</span>
      </div>
    </button>
  );
}

function SocialGrid() {
  return (
    <div className="space-y-4 pt-4">
      <div className="relative flex items-center justify-center">
        <div className="w-full h-px bg-slate-100" />
        <span className="absolute bg-white px-4 text-[8px] font-black text-slate-300 uppercase tracking-widest italic">Masuk Cepat</span>
      </div>
      <div className="grid grid-cols-3 gap-3">
        {["🌐", "🔵", "🟢"].map((s, i) => (
          <button key={i} type="button" className="py-4 border-2 border-slate-50 rounded-2xl grayscale hover:grayscale-0 hover:border-slate-900 transition-all text-lg active:scale-90">
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
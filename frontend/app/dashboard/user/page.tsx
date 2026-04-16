"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import { Drawer } from "vaul";
import Link from "next/link";

const appleEasing = cubicBezier(0.22, 1, 0.36, 1);

const MENU = {
  KOS: "Kos Saya",
  KEUANGAN: "Keuangan",
  FAVORIT: "Favorit",
  PROFIL: "Profil Saya",
} as const;

export default function UserDashboard() {
  const [activeMenu, setActiveMenu] = useState<string>(MENU.KOS);
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    const timeGreet = hour < 12 ? "Pagi" : hour < 17 ? "Siang" : "Malam";
    setTimeout(() => setGreeting(`Selamat ${timeGreet}, John`), 500);
  }, []);

  return (
    <div className="flex min-h-screen bg-white text-slate-900 font-sans selection:bg-cyan-100 overflow-hidden">
      
      {/* 1. SIDEBAR */}
      <aside className="hidden lg:flex w-72 border-r border-slate-50 flex-col p-8 sticky top-0 h-screen bg-white z-50">
        <div className="mb-12">
          <Link href="/">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 flex items-center gap-2 italic">
              <span className="w-8 h-8 bg-slate-900 rounded-lg not-italic" /> IDeA
            </h1>
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4 px-4">Workspace</p>
          <MenuBtn label={MENU.KOS} icon="🏠" active={activeMenu === MENU.KOS} onClick={() => setActiveMenu(MENU.KOS)} />
          <MenuBtn label={MENU.KEUANGAN} icon="💸" active={activeMenu === MENU.KEUANGAN} onClick={() => setActiveMenu(MENU.KEUANGAN)} />
          <MenuBtn label={MENU.FAVORIT} icon="❤️" active={activeMenu === MENU.FAVORIT} onClick={() => setActiveMenu(MENU.FAVORIT)} />
          <MenuBtn label={MENU.PROFIL} icon="👤" active={activeMenu === MENU.PROFIL} onClick={() => setActiveMenu(MENU.PROFIL)} />
          
          <div className="h-px bg-slate-50 my-6 mx-4" />
          <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.2em] mb-4 px-4">Eksplorasi</p>
          <Link href="/map" className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:bg-slate-50 transition-all group">
            <span className="group-hover:scale-110 transition-transform">📍</span> 
            <span className="text-[11px] font-bold tracking-tight uppercase">Peta Properti</span>
          </Link>
          <Link href="/search" className="w-full flex items-center gap-4 p-4 rounded-xl text-slate-400 hover:bg-slate-50 transition-all group">
            <span className="group-hover:scale-110 transition-transform">🔍</span> 
            <span className="text-[11px] font-bold tracking-tight uppercase">Cari Unit Baru</span>
          </Link>
        </nav>

        <div className="mt-auto">
          <button className="w-full bg-slate-50 p-4 rounded-2xl flex items-center gap-4 border border-slate-100/50 hover:bg-slate-100 transition-colors group">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-lg">JD</div>
            <div className="flex-1 text-left overflow-hidden">
              <p className="text-xs font-semibold text-slate-900 truncate uppercase">John Doe</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-tighter">Keluar Sesi</p>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">➡️</span>
          </button>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden bg-slate-50/30">
        
        <header className="h-20 border-b border-slate-50 px-10 flex items-center justify-between sticky top-0 bg-white/70 backdrop-blur-2xl z-40">
          <div className="hidden lg:block">
            <p className="text-[10px] font-bold text-cyan-600 uppercase tracking-widest mb-0.5 leading-none italic">{activeMenu}</p>
            {!greeting ? (
              <div className="h-6 w-48 bg-slate-200/50 animate-pulse rounded-md" />
            ) : (
              <h2 className="text-xl font-bold tracking-tight text-slate-900 italic">{greeting}.</h2>
            )}
          </div>

          <div className="flex items-center gap-4">
             <Link href="/search" className="px-5 py-2.5 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl hover:shadow-xl transition-all active:scale-95">
                🔍 Cari Unit
             </Link>
             <button className="w-10 h-10 bg-white rounded-xl flex items-center justify-center border border-slate-100 relative">
               🔔 <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
             </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-10 custom-scrollbar">
          <div className="max-w-6xl mx-auto pb-32">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeMenu}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: appleEasing }}
                className="space-y-12"
              >
                {/* --- SEKSI: KOS SAYA --- */}
                {activeMenu === MENU.KOS && (
                  <div className="space-y-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <StatCard label="Unit Aktif" value="1 Unit" sub="Gubeng, Surabaya" icon="🏢" variant="dark" />
                      <StatCard label="Jatuh Tempo" value="7 Hari Lagi" sub="Hingga 15 April 2026" icon="⏳" variant="amber" />
                    </div>
                    <ActiveUnitSection />
                  </div>
                )}

                {/* --- SEKSI: KEUANGAN --- */}
                {activeMenu === MENU.KEUANGAN && (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div className="lg:col-span-2 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <WalletStat value={2450000} label="IDeA Wallet" />
                            <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col justify-between shadow-sm group">
                              <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1 leading-none">Aksi Keuangan</p>
                                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-tighter">Kelola Dana Anda</h4>
                              </div>
                              <div className="flex gap-2">
                                <button className="flex-1 py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-cyan-600 transition-all active:scale-95 shadow-lg shadow-slate-200">➕ Top Up</button>
                                <button className="flex-1 py-4 border border-slate-100 text-slate-900 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all active:scale-95">💸 Tarik</button>
                              </div>
                            </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div className="flex items-center gap-4 px-1">
                            <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Riwayat Mutasi Transaksi</p>
                            <div className="h-px flex-1 bg-slate-100" />
                          </div>
                          <div className="space-y-3">
                             <LedgerItem id="TX-90211" desc="Sewa Kos Merdeka" date="15 Apr 2026" time="14:30 WIB" amount="1.500.000" type="out" method="IDeA Wallet" admin="Gratis" />
                             <LedgerItem id="TX-90105" desc="Top-up via VA Mandiri" date="12 Apr 2026" time="09:15 WIB" amount="500.000" type="in" method="VA Mandiri" admin="2.500" />
                             <LedgerItem id="TX-89920" desc="Refund Pembatalan" date="10 Apr 2026" time="11:00 WIB" amount="250.000" type="in" method="System Refund" admin="Gratis" />
                          </div>
                        </div>
                    </div>
                    <div className="lg:col-span-1">
                        <SplitPaymentUrgent />
                    </div>
                  </div>
                )}

                {/* --- SEKSI: PROFIL SAYA --- */}
                {activeMenu === MENU.PROFIL && (
                  <div className="space-y-8">
                    <div className="bg-white border border-slate-100 rounded-[3rem] p-10 relative overflow-hidden shadow-sm">
                      <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
                        <div className="w-32 h-32 bg-slate-900 rounded-[2.5rem] flex items-center justify-center text-4xl text-white font-black shadow-2xl">JD</div>
                        <div className="flex-1 text-center md:text-left space-y-4">
                          <div>
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                              <h3 className="text-3xl font-bold tracking-tight text-slate-900">John Doe</h3>
                              <span className="px-3 py-1 bg-cyan-50 text-cyan-600 text-[9px] font-bold rounded-full border border-cyan-100 uppercase tracking-widest">Verified Identity</span>
                            </div>
                            <p className="text-slate-400 font-medium text-sm mt-1">Member sejak Jan 2024 • ID: IDEA-992010</p>
                          </div>
                          <div className="flex flex-wrap justify-center md:justify-start gap-3">
                            <ProfileTag label="+62 812 3456 7890" icon="📞" />
                            <ProfileTag label="john.doe@email.com" icon="✉️" />
                            <ProfileTag label="Surabaya, ID" icon="📍" />
                          </div>
                        </div>
                        <button className="px-8 py-3 bg-white border border-slate-200 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm">Edit Data</button>
                      </div>
                      <div className="absolute top-0 right-0 p-12 opacity-[0.02] text-9xl font-black italic select-none pointer-events-none uppercase">Profile</div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Dokumen Verifikasi (KYC)</p>
                        <div className="space-y-4">
                          <KYCItem label="Kartu Tanda Penduduk" status="Terverifikasi" date="Hingga 2029" icon="🆔" />
                          <KYCItem label="Kartu Mahasiswa / Kerja" status="Terverifikasi" date="Update: Mar 2024" icon="🎓" />
                        </div>
                      </div>
                      <div className="bg-white border border-slate-100 rounded-[2.5rem] p-8 space-y-6 shadow-sm">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest border-b border-slate-50 pb-4">Preferensi Hunian</p>
                        <div className="flex flex-wrap gap-2">
                          {["Bebas Jam Malam", "Kamar Mandi Dalam", "AC", "WiFi 5G", "Parkir Mobil"].map(tag => (
                            <span key={tag} className="px-4 py-2 bg-slate-50 text-slate-500 text-[10px] font-bold rounded-xl border border-slate-100 italic">{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- SEKSI: FAVORIT --- */}
                {activeMenu === MENU.FAVORIT && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FavoritCard title="Kos Mentari Pagi" stock={1} price="1.2jt" img="https://images.unsplash.com/photo-1554995207-c18c203602cb" />
                    <FavoritCard title="Studio Apartment G" stock={5} price="3.5jt" img="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---

function MenuBtn({ label, icon, active, onClick, badge }: any) {
  return (
    <motion.button 
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(label)} 
      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${active ? "bg-slate-900 text-white shadow-xl shadow-slate-200" : "hover:bg-slate-50 text-slate-500"}`}
    >
      <div className="flex items-center gap-4">
        <span className={`text-lg transition-transform ${active ? "scale-110" : "opacity-40"}`}>{icon}</span>
        <span className="text-[11px] font-bold tracking-tight uppercase">{label}</span>
      </div>
      {badge && <span className="bg-cyan-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">{badge}</span>}
    </motion.button>
  );
}

function StatCard({ label, value, sub, icon, variant }: any) {
  const styles: any = {
    dark: "bg-slate-900 text-white shadow-2xl shadow-slate-200",
    amber: "bg-amber-50 text-amber-800 border border-amber-100 shadow-sm"
  };
  return (
    <div className={`p-8 rounded-[2.5rem] flex items-center justify-between ${styles[variant]} transition-all hover:scale-[1.01]`}>
      <div>
        <p className="text-[10px] font-bold uppercase tracking-widest opacity-60 mb-2 leading-none italic">{label}</p>
        <p className="text-2xl font-bold tracking-tight italic uppercase leading-none">{value}</p>
        <p className="text-[10px] font-medium opacity-40 mt-3 uppercase tracking-widest">{sub}</p>
      </div>
      <span className="text-3xl opacity-30">{icon}</span>
    </div>
  );
}

function WalletStat({ value, label }: { value: number, label: string }) {
  const [displayValue, setDisplayValue] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    let timer = setInterval(() => {
      start += Math.floor(end / 30);
      if (start >= end) {
        setDisplayValue(end);
        clearInterval(timer);
      } else {
        setDisplayValue(start);
      }
    }, 30);
    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="p-8 rounded-[2.5rem] bg-cyan-500 text-white shadow-[0_20px_40px_-10px_rgba(6,182,212,0.4)] relative overflow-hidden group">
      <p className="text-[10px] font-bold uppercase tracking-widest opacity-70 mb-1 italic leading-none">IDeA Ecosystem Wallet</p>
      <p className="text-3xl font-black tracking-tight italic">Rp {displayValue.toLocaleString()}</p>
      <div className="absolute -bottom-4 -right-4 opacity-10 text-8xl group-hover:scale-110 transition-transform duration-700">👛</div>
    </div>
  );
}

function LedgerItem({ id, desc, date, time, amount, type, method, admin }: any) {
  return (
    <Drawer.Root>
      <Drawer.Trigger asChild>
        <div className="flex items-center justify-between p-6 border border-slate-50 bg-white rounded-3xl hover:border-slate-200 transition-all cursor-pointer shadow-sm group">
          <div className="flex items-center gap-4">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm ${type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
              {type === 'in' ? '↓' : '↑'}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-slate-900 uppercase tracking-tighter">{desc}</p>
              <p className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">ID: {id} • {date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`text-sm font-bold italic ${type === 'in' ? 'text-emerald-600' : 'text-slate-900'}`}>
              {type === 'in' ? '+' : '-'}Rp {amount}
            </p>
            <p className="text-[9px] font-bold text-cyan-600 opacity-0 group-hover:opacity-100 uppercase tracking-tighter transition-all">Lihat Kuitansi</p>
          </div>
        </div>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40 z-50 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 bg-slate-50 rounded-t-[3rem] outline-none max-w-lg mx-auto overflow-hidden">
          <div className="p-8 bg-white rounded-t-[3rem] shadow-2xl">
            <div className="mx-auto w-12 h-1.5 bg-slate-100 rounded-full mb-10" />
            <div className="text-center mb-10">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.4em] mb-6">PT IDE KOS INDONESIA</p>
              <div className={`w-16 h-16 rounded-3xl flex items-center justify-center text-3xl mx-auto mb-4 ${type === 'in' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-900 text-white'}`}>
                {type === 'in' ? '✓' : '💳'}
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{type === 'in' ? 'Dana Masuk Berhasil' : 'Pembayaran Berhasil'}</p>
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Nominal Transaksi</h3>
              <p className="text-4xl font-black tracking-tighter text-slate-900 italic">Rp {amount}</p>
            </div>
            <div className="space-y-4 border-t border-slate-50 pt-8 mb-8 text-[11px] font-bold uppercase tracking-tight">
              <div className="flex justify-between"><span>ID Transaksi</span><span className="text-slate-900">{id}</span></div>
              <div className="flex justify-between"><span>Waktu</span><span className="text-slate-900">{date} • {time}</span></div>
              <div className="flex justify-between"><span>Keterangan</span><span className="text-slate-900">{desc}</span></div>
              <div className="flex justify-between"><span>Metode Bayar</span><span className="text-slate-900">{method}</span></div>
            </div>
            <div className="bg-slate-50 p-6 rounded-3xl space-y-3 mb-10">
              <div className="flex justify-between text-[10px] font-bold uppercase text-slate-500"><span>Subtotal</span><span>Rp {amount}</span></div>
              <div className="flex justify-between text-[10px] font-bold uppercase"><span>Admin</span><span className={admin === "Gratis" ? "text-emerald-500" : "text-slate-900"}>{admin}</span></div>
              <div className="h-px bg-slate-200 border-dashed border-t" />
              <div className="flex justify-between text-sm font-black uppercase text-slate-900"><span>Total</span><span className="italic underline decoration-cyan-400 decoration-4">Rp {amount}</span></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Drawer.Close className="py-4 bg-slate-100 text-slate-400 text-[10px] font-bold uppercase rounded-2xl">Tutup</Drawer.Close>
              <button className="py-4 bg-slate-900 text-white text-[10px] font-bold uppercase rounded-2xl shadow-xl shadow-slate-200">⬇ Unduh Bukti PDF</button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}

function ActiveUnitSection() {
    return (
        <div className="bg-white border border-slate-100 p-8 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-700">
            <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="w-44 h-44 rounded-[2.2rem] bg-slate-50 border border-slate-100 overflow-hidden relative group">
                    <img src="https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Unit" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                </div>
                <div className="flex-1 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <h4 className="text-xl font-bold text-slate-900 tracking-tight italic uppercase">Executive Merdeka Hub</h4>
                            <p className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-tighter">Gubeng, Surabaya • Unit #204</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[10px] font-bold rounded-full border border-emerald-100 uppercase italic">Status: Aktif</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <button className="py-4 bg-slate-900 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-lg hover:bg-cyan-600 transition-colors">Perpanjang Masa Sewa</button>
                        <button className="py-4 border border-slate-100 text-slate-400 text-[10px] font-bold uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all">Lapor Kendala</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ProfileTag({ icon, label }: { icon: string, label: string }) {
    return (
        <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100/50">
            <span className="text-xs">{icon}</span>
            <span className="text-[11px] font-semibold text-slate-600">{label}</span>
        </div>
    );
}

function KYCItem({ label, status, date, icon }: any) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
                <span className="text-xl">{icon}</span>
                <div>
                    <p className="text-xs font-bold text-slate-900 uppercase tracking-tight">{label}</p>
                    <p className="text-[10px] font-medium text-slate-400 mt-0.5 uppercase italic">{date}</p>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                <span className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest">{status}</span>
            </div>
        </div>
    );
}

function FavoritCard({ title, stock, price, img }: any) {
    return (
        <div className="bg-white border border-slate-100 p-6 rounded-[3rem] relative group hover:border-slate-900 transition-all shadow-sm">
            <div className="w-full h-44 bg-slate-50 rounded-[2rem] mb-6 overflow-hidden border border-slate-50">
                <img src={img} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Fav" />
            </div>
            <div className="flex justify-between items-center mb-6">
                <h4 className="text-xl font-bold text-slate-900 uppercase italic tracking-tighter leading-none">{title}</h4>
                <span className="text-[11px] font-bold text-red-500 uppercase tracking-widest">{stock <= 2 ? `SISA ${stock} UNIT!` : `Rp ${price}`}</span>
            </div>
            <button className="w-full py-4 bg-slate-100 text-[10px] font-bold uppercase tracking-widest rounded-2xl group-hover:bg-slate-900 group-hover:text-white transition-all shadow-lg">Booking</button>
        </div>
    );
}

function SplitPaymentUrgent() {
    return (
        <div className="p-8 rounded-[3rem] bg-amber-50 border border-amber-100 shadow-sm relative group overflow-hidden">
            <div className="flex justify-between items-center mb-8 relative z-10">
                <span className="text-[10px] font-bold uppercase tracking-widest text-amber-700 italic">Split Payment</span>
                <span className="text-[11px] font-bold text-amber-600 font-mono animate-pulse">01:45:20</span>
            </div>
            <div className="flex items-center -space-x-4 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-slate-900 border-4 border-amber-50 shadow-sm" />
                <div className="w-12 h-12 rounded-2xl bg-cyan-500 border-4 border-amber-50 shadow-sm" />
                <div className="pl-8 flex-1">
                    <p className="text-2xl font-black italic tracking-tight text-slate-900">50%</p>
                    <p className="text-[10px] font-semibold text-amber-600 uppercase leading-none italic">Menunggu Anda</p>
                </div>
            </div>
            <div className="h-1.5 w-full bg-amber-200/40 rounded-full mb-8 overflow-hidden relative z-10">
                <motion.div initial={{ width: 0 }} animate={{ width: "50%" }} className="h-full bg-amber-500 rounded-full" />
            </div>
            <button className="w-full py-4 bg-amber-600 text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl shadow-xl shadow-amber-200 active:scale-95 transition-all relative z-10 italic uppercase">Bayar Porsi Saya</button>
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] text-9xl font-black italic select-none pointer-events-none">BILL</div>
        </div>
    );
}
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

// Terima props toggleSidebar dari ClientLayout
export default function Navbar({ toggleSidebar }: { toggleSidebar?: () => void }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const wilayahJawa = [
    { name: "DKI Jakarta", slug: "jakarta" },
    { name: "Jawa Barat", slug: "jawa-barat" },
    { name: "Banten", slug: "banten" },
    { name: "Jawa Tengah", slug: "jawa-tengah" },
    { name: "DI Yogyakarta", slug: "yogyakarta" },
    { name: "Jawa Timur", slug: "jawa-timur" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all duration-300">
      <div className="px-6 mx-auto max-w-7xl">
        <div className="flex items-center justify-between h-16">
          
          <div className="flex items-center gap-6">
            {toggleSidebar && (
              <button 
                onClick={toggleSidebar} 
                className="hidden md:flex items-center justify-center p-2 -ml-2 text-slate-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg transition-colors focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            )}

            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-extrabold text-cyan-600 tracking-tight">IDE Kos</span>
            </Link>

            <div className="hidden md:flex items-center gap-6 ml-2">
              <Link href="/" className={`text-sm font-bold transition-colors hover:text-cyan-600 ${pathname === '/' ? "text-cyan-600 border-b-2 border-cyan-600 py-5" : "text-slate-700 py-5"}`}>
                Home
              </Link>

              <Link href="/map" className={`text-sm font-semibold transition-colors hover:text-cyan-600 ${pathname === '/map' ? "text-cyan-600 border-b-2 border-cyan-600 py-5" : "text-slate-600 py-5"}`}>
                Peta Kos
              </Link>

              <div className="relative group py-5">
                <Link 
                  href="/search" 
                  className={`flex items-center gap-1 text-sm font-semibold transition-colors hover:text-cyan-600 ${pathname === '/search' ? "text-cyan-600" : "text-slate-600"}`}
                >
                  Cari Kos
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </Link>
                
                <div className="absolute left-0 top-14 w-64 bg-white border border-slate-100 rounded-2xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-3 z-50">
                  <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Pilih Wilayah (Peta)</div>
                  {wilayahJawa.map((area) => (
                    <Link 
                      key={area.slug} 
                      href={`/map?area=${area.slug}`} 
                      className="block px-4 py-2 text-sm text-slate-600 hover:bg-cyan-50 hover:text-cyan-700 transition-colors"
                    >
                      {area.name}
                    </Link>
                  ))}
                  <div className="border-t border-slate-50 mt-2 pt-2">
                    <Link href="/search" className="block px-4 py-2 text-sm font-bold text-cyan-600 hover:bg-cyan-50 transition-colors">Lihat Semua Daftar</Link>
                  </div>
                </div>
              </div>

              {session && (
                <Link href="/split-payment" className={`text-sm font-semibold transition-colors hover:text-cyan-600 ${pathname === '/split-payment' ? "text-cyan-600 border-b-2 border-cyan-600 py-5" : "text-slate-600 py-5"}`}>
                  Kos Patungan
                </Link>
              )}

              <div className="relative group py-5">
                <button className="flex items-center gap-1 text-sm font-semibold text-slate-600 hover:text-cyan-600 transition-colors">
                  Informasi
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <div className="absolute left-0 top-14 w-56 bg-white border border-slate-100 rounded-xl shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2">
                  <Link href="/blog" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-600">Artikel & Panduan</Link>
                  <Link href="/bantuan" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-600">Pusat Bantuan (FAQ)</Link>
                  <Link href="/syarat-ketentuan" className="block px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 hover:text-cyan-600">Syarat & Ketentuan</Link>
                </div>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/mitra" className="text-sm font-bold text-slate-500 hover:text-cyan-600 transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
              Untuk Pemilik
            </Link>

            <div className="h-6 w-px bg-slate-200"></div>

            {status === "loading" ? (
              <div className="w-24 h-9 bg-slate-100 animate-pulse rounded-full"></div>
            ) : session ? (
              <div className="flex items-center gap-4">
                <Link href="/transaksi" className="text-sm font-bold text-slate-700 hover:text-cyan-600">Pesanan Saya</Link>
                <div className="flex items-center gap-3">
                  <div className="flex flex-col text-right">
                    <span className="text-sm font-bold text-slate-800">{session.user?.name}</span>
                    <button onClick={() => signOut()} className="text-xs text-slate-400 hover:text-red-500 text-right transition-colors">Keluar</button>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-cyan-100 text-cyan-600 flex items-center justify-center font-bold border border-cyan-200">
                    {session.user?.name?.charAt(0) || "U"}
                  </div>
                </div>
              </div>
            ) : (
              /* FIXED: Menggunakan Link ke /auth daripada signIn() */
              <Link href="/auth" className="px-6 py-2 text-sm font-bold text-white transition-colors rounded-full bg-cyan-500 hover:bg-cyan-600 shadow-md">
                Login / Daftar
              </Link>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 focus:outline-none p-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4 shadow-xl absolute w-full z-50">
          <Link href="/" className="font-bold text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/search" className="font-bold text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Cari Kos</Link>
          <Link href="/map" className="font-bold text-slate-800" onClick={() => setIsMobileMenuOpen(false)}>Peta Kos</Link>
          <div className="border-t border-slate-100 pt-4 mt-2">
            <Link href="/mitra" className="block mb-4 text-center font-bold text-slate-500">Masuk sebagai Pemilik</Link>
            {session ? (
              <button onClick={() => signOut()} className="w-full py-3 text-red-500 bg-red-50 rounded-xl font-bold">Keluar Akun</button>
            ) : (
              /* FIXED: Versi Mobile juga menggunakan Link ke /auth */
              <Link href="/auth" className="w-full py-3 text-white bg-cyan-500 rounded-xl font-bold text-center block" onClick={() => setIsMobileMenuOpen(false)}>
                Login / Daftar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
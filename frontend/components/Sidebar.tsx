"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Sidebar({ isOpen = true }: { isOpen?: boolean }) {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Daftar Wilayah Jawa untuk Kategori Lokasi
  const wilayahJawa = [
    { name: "DKI Jakarta", slug: "jakarta" },
    { name: "Jawa Barat", slug: "jawa-barat" },
    { name: "Banten", slug: "banten" },
    { name: "Jawa Tengah", slug: "jawa-tengah" },
    { name: "DI Yogyakarta", slug: "yogyakarta" },
    { name: "Jawa Timur", slug: "jawa-timur" },
  ];

  // Fungsi Helper untuk merender link dengan icon SVG Path
  const renderNavLink = (name: string, path: string, iconPath: string) => {
    const isActive = pathname === path;
    return (
      <Link
        href={path}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${
          isActive 
            ? "bg-cyan-50 text-cyan-700 shadow-sm border border-cyan-100" 
            : "text-slate-600 hover:bg-slate-50 hover:text-cyan-600"
        }`}
      >
        <svg className={`w-5 h-5 shrink-0 ${isActive ? "text-cyan-600" : "text-slate-400"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={iconPath} />
        </svg>
        <span className="truncate">{name}</span>
      </Link>
    );
  };

  return (
    <aside 
      className={`hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 bg-white border-r border-slate-200 pt-20 z-40 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex flex-col flex-1 px-4 gap-6 overflow-y-auto pb-6 custom-scrollbar">
        
        {/* SEKSI 1: PENCARIAN UTAMA */}
        <div>
          <p className="px-4 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2 mt-4">
            Pencarian Utama
          </p>
          <div className="flex flex-col gap-1">
            {renderNavLink("Home", "/", "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1")}
            {renderNavLink("Peta Kos", "/map", "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7")}
            {!session && renderNavLink("Cari Kos", "/search", "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z")}
            {session && renderNavLink("Kos Patungan", "/split-payment", "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z")}
          </div>
        </div>

        {/* SEKSI 2: AREA PULAU JAWA */}
        <div>
          <p className="px-4 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">
            Area Pulau Jawa
          </p>
          <div className="flex flex-col gap-1">
            {wilayahJawa.map((area) => (
              <Link 
                key={area.slug} 
                href={`/map?area=${area.slug}`}
                className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-600 rounded-xl hover:bg-cyan-50 hover:text-cyan-600 transition-all group"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-slate-300 group-hover:bg-cyan-400 transition-colors"></div>
                {area.name}
              </Link>
            ))}
          </div>
        </div>

        {/* SEKSI 3: AKUN & TRANSAKSI (Hanya jika Login) */}
        {session && (
          <div>
            <p className="px-4 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">
              Akun & Transaksi
            </p>
            <div className="flex flex-col gap-1">
              {renderNavLink("Pesanan Saya", "/transaksi", "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01")}
              {renderNavLink("IDE Wallet", "/wallet", "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z")}
            </div>
          </div>
        )}

        {/* SEKSI 4: PUSAT INFORMASI */}
        <div>
          <p className="px-4 text-[10px] font-extrabold tracking-widest text-slate-400 uppercase mb-2">
            Pusat Informasi
          </p>
          <div className="flex flex-col gap-1">
            {renderNavLink("Artikel & Panduan", "/blog", "M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z")}
            {renderNavLink("Pusat Bantuan", "/bantuan", "M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z")}
            {renderNavLink("Syarat & Ketentuan", "/syarat-ketentuan", "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z")}
          </div>
        </div>

      </div>
      
      {/* AREA AKSI AKUN (LOGIN / LOGOUT) */}
      <div className="p-4 border-t border-slate-100 bg-slate-50/50">
        {session ? (
          <button 
            onClick={() => signOut()} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-red-500 bg-red-50 rounded-xl hover:bg-red-100 transition-all shadow-sm"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Keluar Akun
          </button>
        ) : (
          <button 
            onClick={() => signIn()} 
            className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-cyan-500 rounded-xl hover:bg-cyan-600 shadow-md transition-all"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Login / Daftar
          </button>
        )}
      </div>
    </aside>
  );
}
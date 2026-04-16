"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // 1. DETEKSI RUTE ISOLASI (Dashboard & Auth)
  const isDashboard = pathname.startsWith("/dashboard");
  const isAuth = pathname.startsWith("/auth");

  // JIKA DI DASHBOARD ATAU AUTH:
  // Render children murni tanpa gangguan Navbar Home atau Sidebar Home.
  // Ini memungkinkan Dashboard memiliki "Navbar Sendiri" di dalam page-nya.
  if (isDashboard || isAuth) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  // JIKA DI HALAMAN PUBLIK (Home, Map, Search, dll):
  // Render layout standar dengan Sidebar & Navbar Home.
  return (
    <>
      {/* Navbar standar yang memiliki tombol untuk buka-tutup Sidebar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex min-h-screen relative">
        {/* Sidebar standar halaman Home */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Konten Utama dengan Dynamic Padding agar mx-auto tetap di tengah area putih */}
        <main
          className={`w-full transition-all duration-300 ease-in-out bg-white min-h-[calc(100vh-64px)] ${
            isSidebarOpen ? "md:pl-64" : "md:pl-0"
          }`}
        >
          {children}
        </main>
      </div>
    </>
  );
}
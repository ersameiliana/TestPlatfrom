"use client";

import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LiveChat from "./LiveChat";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  // Secara default Sidebar terbuka di Desktop
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <>
      {/* Kirim fungsi toggle ke Navbar */}
      <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      
      <div className="flex min-h-screen overflow-x-hidden">
        {/* Sidebar menerima status open/close */}
        <Sidebar isOpen={isSidebarOpen} />
        
        {/* Konten utama dinamis: Jika sidebar buka, geser margin. Jika tutup, margin 0 */}
        <main 
          className={`flex-1 w-full bg-white min-h-[calc(100vh-64px)] transition-all duration-300 ${
            isSidebarOpen ? "md:ml-64" : "ml-0"
          }`}
        >
          {children}
        </main>
      </div>

      <LiveChat />
    </>
  );
}
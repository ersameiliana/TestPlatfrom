import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import LiveChat from "@/components/LiveChat";
import ClientLayout from "@/components/ClientLayout"; // Import wrapper baru kita

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IDE Kos - Temukan Kos Idealmu",
  description: "Platform pencarian kos pintar dan terverifikasi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${inter.className} bg-slate-50 text-slate-800`}>
        <Providers>
          {/* Semua logic double-navigator & animasi sidebar ada di ClientLayout */}
          <ClientLayout>
            {children}
          </ClientLayout>

          <LiveChat />
        </Providers>
      </body>
    </html>
  );
}
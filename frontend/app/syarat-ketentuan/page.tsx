"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

// --- Formulasi Type Safety ---
type TabType = "umum" | "penyewa" | "mitra" | "pdp" | "sengketa";

export default function SyaratKetentuanPage() {
  const [activeTab, setActiveTab] = useState<TabType>("umum");

  return (
    <div className="min-h-screen bg-white pb-20 font-sans text-slate-900 selection:bg-slate-900 selection:text-white">
      {/* 1. HEADER UTAMA */}
      <header className="bg-slate-50 border-b border-slate-200 pt-20 pb-12 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-6">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500 bg-white px-3 py-1 border border-slate-200 rounded">
              Dokumen Resmi PT IDE KOS INDONESIA
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tighter uppercase leading-none">
            SYARAT DAN KETENTUAN PENGGUNAAN PLATFORM <br /> SERTA KEBIJAKAN PRIVASI
          </h1>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Terakhir Diperbarui: 15 April 2026 | Berlaku Efektif: 15 April 2026
            </p>
            <div className="flex gap-3">
               <button className="text-[10px] font-black uppercase tracking-widest border-b-2 border-slate-900 pb-1">Unduh PDF</button>
               <button className="text-[10px] font-black uppercase tracking-widest text-slate-400">Salinan Fisik</button>
            </div>
          </div>
        </div>
      </header>

      {/* 2. STICKY NAVIGATION (ARIA Compliant) */}
      <nav 
        className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 py-4"
        role="tablist"
      >
        <div className="max-w-5xl mx-auto flex flex-wrap gap-2">
          {[
            { id: "umum", label: "Umum" },
            { id: "penyewa", label: "Transaksi Penyewa" },
            { id: "mitra", label: "Ketentuan Mitra" },
            { id: "pdp", label: "Privasi (PDP)" },
            { id: "sengketa", label: "Sengketa & Hukum" },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-5 py-2 rounded text-[10px] font-black uppercase tracking-widest transition-all ${
                activeTab === tab.id 
                ? "bg-slate-900 text-white shadow-lg" 
                : "text-slate-400 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 mt-16">
        <div className="prose prose-slate max-w-none">
          {/* PEMBERITAHUAN PENTING */}
          <div className="p-8 bg-slate-900 text-white rounded-sm mb-16 shadow-2xl">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] mb-4 text-cyan-400">Pemberitahuan Penting:</h2>
            <p className="text-sm font-bold leading-relaxed tracking-tight uppercase">
              PERJANJIAN INI MERUPAKAN DOKUMEN ELEKTRONIK YANG SAH DAN MENGIKAT SECARA HUKUM BERDASARKAN UNDANG-UNDANG NOMOR 11 TAHUN 2008 TENTANG INFORMASI DAN TRANSAKSI ELEKTRONIK BESERTA PERUBAHANNYA. DENGAN MENGAKSES, MENDAFTAR, ATAU MENGGUNAKAN LAYANAN PLATFORM, ANDA MENYATAKAN TELAH MEMBACA, MEMAHAMI, DAN MENYETUJUI SELURUH KETENTUAN DI BAWAH INI TANPA PAKSAAN DARI PIHAK MANAPUN.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {/* BAB I: KETENTUAN UMUM */}
            {activeTab === "umum" && (
              <motion.div key="umum" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-2 mb-8">BAB I: KETENTUAN UMUM</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-sm font-black mb-6 uppercase tracking-widest text-slate-900">Pasal 1: Definisi</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed italic">
                        <p>Kecuali konteks kalimat menentukan lain, istilah-istilah di bawah ini memiliki makna sebagai berikut:</p>
                        <p>1.1. &quot;Platform&quot; adalah sistem elektronik, aplikasi seluler, dan situs web yang dikelola dan dimiliki secara sah oleh PT IDE Kos Indonesia.</p>
                        <p>1.2. &quot;Pengguna&quot; adalah setiap pihak yang mengakses Platform, yang meliputi namun tidak terbatas pada Penyewa dan Mitra.</p>
                        <p>1.3. &quot;Penyewa&quot; adalah individu atau badan hukum yang menggunakan Platform untuk mencari, memesan, dan membayar sewa ruang properti.</p>
                        <p>1.4. &quot;Mitra&quot; adalah pemilik sah, pengelola, atau entitas yang memiliki hak hukum atas properti dan mendaftarkannya ke dalam Platform untuk disewakan.</p>
                        <p>1.5. &quot;Layanan Escrow&quot; adalah fasilitas penampungan dana pihak ketiga yang disediakan oleh Platform guna menjamin keamanan transaksi antara Penyewa dan Mitra.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* BAB II: TRANSAKSI PENYEWA */}
            {activeTab === "penyewa" && (
              <motion.div key="penyewa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-2 mb-8">BAB II: KETENTUAN TRANSAKSI DAN KEUANGAN PENYEWA</h2>
                  <div className="space-y-12">
                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 2: Sistem Pembayaran dan Rekening Penampungan (Escrow)</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>2.1. Tunduk pada regulasi Bank Indonesia, Platform bertindak murni sebagai perantara penampung dana sementara (Escrow Agent) dan bukan merupakan pihak dalam perjanjian sewa-menyewa fisik antara Penyewa dan Mitra.</p>
                        <p>2.2. Seluruh transaksi finansial wajib dieksekusi melalui gerbang pembayaran (Payment Gateway) resmi Platform. Segala bentuk pembayaran yang diinstruksikan atau dilakukan di luar sistem Platform merupakan pelanggaran material terhadap Perjanjian ini.</p>
                        <p>2.3. Platform berhak menahan, membatalkan, atau menolak transaksi yang diindikasikan mengandung unsur penipuan (fraud), Tindak Pidana Pencucian Uang (TPPU), atau pelanggaran hukum lainnya.</p>
                        <p className="font-black underline decoration-slate-300">2.4. Pelepasan Tanggung Jawab Mutlak (Absolute Disclaimer of Liability): Platform dibebaskan secara mutlak dari segala tuntutan hukum, ganti rugi materiel maupun imateriel, atas kerugian yang diderita Pengguna akibat transaksi Under the Table (di luar sistem Platform).</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 3: Kebijakan Pembatalan, Pengembalian Dana (Refund), dan Pinalti</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>3.1. Tanpa mengesampingkan hak-hak konsumen, pengembalian dana tunduk pada perhitungan pro-rata dan kompensasi hilangnya peluang ekonomi (opportunity cost) sebagai berikut:</p>
                        <ul className="list-none pl-4 space-y-3">
                          <li className="flex gap-3"><span className="font-black text-slate-900">a.</span> <span><strong>Zona Hijau (H-7 ke atas):</strong> Pembatalan sah yang diterima sistem lebih dari 7 (tujuh) hari kalender sebelum tanggal check-in berhak atas refund 100% setelah dikurangi biaya administrasi perbankan.</span></li>
                          <li className="flex gap-3"><span className="font-black text-slate-900">b.</span> <span><strong>Zona Kuning (H-3 hingga H-6):</strong> Pembatalan sah dalam rentang waktu ini mengaktifkan klausul penalti moderat. Penyewa berhak atas 50% refund, sementara 50% sisanya didistribusikan kepada Mitra sebagai ganti rugi wanprestasi sepihak.</span></li>
                          <li className="flex gap-3"><span className="font-black text-slate-900">c.</span> <span><strong>Zona Merah (Kurang dari H-2):</strong> Segala bentuk pembatalan dalam rentang ini diklasifikasikan sebagai No-Show atau Late Cancellation. Hak refund Penyewa gugur sepenuhnya (0%), dan dana diteruskan kepada Mitra.</span></li>
                        </ul>
                        <p>3.2. Dana refund yang disetujui akan dikreditkan ke dalam Wallet pengguna maksimal 3x24 jam hari kerja sejak notifikasi persetujuan diterbitkan oleh sistem.</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 4: Pembayaran Terbagi (Split Payment/Joint Liability)</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>4.1. Dalam hal Penyewa mengaktifkan fitur Split Payment, para pihak yang diundang untuk membayar diikat oleh prinsip tanggung renteng (joint and several liability).</p>
                        <p>4.2. Platform menetapkan Grace Period (Masa Tenggang) absolut selama 2 (dua) jam terhitung sejak tautan pembayaran dihasilkan oleh sistem.</p>
                        <p>4.3. Kelalaian, kegagalan sistem perbankan pihak ketiga, atau ketidakmampuan salah satu pihak dalam menyelesaikan proporsi pembayarannya dalam Grace Period mengakibatkan seluruh pesanan batal demi hukum (void ab initio). Uang yang telah masuk sebagian akan direfund kembali ke pihak pembayar.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* BAB III: KETENTUAN MITRA */}
            {activeTab === "mitra" && (
              <motion.div key="mitra" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-2 mb-8">BAB III: HAK, KEWAJIBAN, DAN AUDIT MITRA</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 5: Uji Tuntas Nasabah (Customer Due Diligence/CDD)</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>5.1. Mitra menyetujui bahwa Platform berhak melakukan investigasi latar belakang (background check) komprehensif, meliputi namun tidak terbatas pada validasi Kartu Tanda Penduduk (KTP), pencocokan biometrik wajah (Liveness Registration), dan verifikasi rekening bank.</p>
                        <p>5.2. Demi kepatuhan terhadap otoritas moneter, segala bentuk pencairan dana (Penarikan/Withdrawal) akan ditolak secara otomatis oleh sistem apabila terdapat ketidaksesuaian leksikal (name mismatch) sekecil apa pun antara nama pada profil tervalidasi dan nama pemilik rekening bank penerima.</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 6: Audit Kelayakan Properti dan Integritas Platform</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>6.1. Platform menerapkan standar tinggi terhadap kualitas inventaris. Lencana &quot;IDE Kos Verified&quot; bukan merupakan hak Mitra, melainkan atribusi yang diberikan secara sepihak oleh Platform berdasarkan hasil audit fisik agen inspeksi dan/atau verifikasi algoritma Artificial Intelligence (AI).</p>
                        <p>6.2. Platform menerapkan kebijakan Toleransi Nol (Zero Tolerance Policy) terhadap manipulasi visual, disinformasi fasilitas, atau praktik overbooking. Pelanggaran atas klausul ini memberikan hak penuh kepada Platform untuk secara instan menerapkan sanksi shadowban, menangguhkan akun, hingga menahan dana Mitra untuk mengganti kerugian Penyewa yang terdampak.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* BAB IV: PRIVASI (PDP) */}
            {activeTab === "pdp" && (
              <motion.div key="pdp" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-2 mb-8">BAB IV: KEPATUHAN PELINDUNGAN DATA PRIBADI (PDP)</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 7: Pemrosesan Informasi Rahasia</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>7.1. Tunduk pada UU Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP), Platform bertindak sebagai Pengendali Data Pribadi. Pemrosesan data dibatasi pada asas proporsionalitas untuk keperluan verifikasi, eksekusi kontrak, dan keamanan sistem.</p>
                        <p>7.2. Data spesifik berupa rekam biometrik Pengguna akan diproses dengan teknik kriptografi mutakhir dan tidak akan diperjualbelikan kepada entitas ketiga mana pun, kecuali atas perintah pengadilan (court order) atau aparatur penegak hukum yang sah.</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 8: Sistem Pertahanan dan Retensi Data</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed">
                        <p>8.1. Platform menerapkan standar keamanan End-to-End Encryption (E2EE) dan arsitektur Role-Based Access Control (RBAC) terenkripsi untuk mencegah intrusi peretas maupun penyalahgunaan akses oleh pihak internal (insider threat).</p>
                        <p>8.2. Segala bentuk akses, modifikasi, dan penghapusan terhadap pangkalan data terekam secara permanen dalam ekosistem Audit Log yang berstatus immutable (tidak dapat diubah/dimanipulasi).</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* BAB V: SENGKETA */}
            {activeTab === "sengketa" && (
              <motion.div key="sengketa" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-12">
                <section>
                  <h2 className="text-sm font-black uppercase tracking-[0.4em] border-b-2 border-slate-900 pb-2 mb-8">BAB V: KLAUSUL PELINDUNGAN DAN PENYELESAIAN SENGKETA</h2>
                  <div className="space-y-10">
                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 9: Ganti Rugi (Indemnification)</h3>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">9.1. Pengguna sepakat untuk membebaskan, membela, dan memegang teguh Platform (termasuk direktur, karyawan, dan afiliasinya) dari setiap klaim, tuntutan hukum, kerugian, kewajiban, kerusakan, dan biaya (termasuk biaya jasa hukum yang wajar) yang timbul dari pelanggaran Pengguna terhadap Perjanjian ini, hukum yang berlaku, atau hak pihak ketiga.</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 10: Keadaan Kahar (Force Majeure)</h3>
                      <p className="text-sm text-slate-700 font-medium leading-relaxed">10.1. Platform tidak dapat dimintai pertanggungjawaban atas penundaan atau kegagalan pemenuhan kewajiban operasional yang disebabkan oleh kejadian di luar kendali yang wajar, termasuk namun tidak terbatas pada bencana alam, pandemi/epidemi yang dideklarasikan oleh pemerintah, kegagalan jaringan internet nasional, atau perubahan regulasi moneter yang drastis.</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-black mb-4 uppercase text-slate-900">Pasal 11: Yurisdiksi dan Pilihan Hukum</h3>
                      <div className="text-sm text-slate-700 space-y-4 font-medium leading-relaxed italic">
                        <p>11.1. Perjanjian ini dibuat, tunduk, dan ditafsirkan berdasarkan hukum materiel Republik Indonesia.</p>
                        <p>11.2. Segala sengketa yang timbul akan diselesaikan secara musyawarah dalam waktu 30 (tiga puluh) hari kalender. Kegagalan musyawarah memberikan hak kepada salah satu Pihak untuk membawa sengketa secara eksklusif ke wilayah yurisdiksi Pengadilan Negeri Surabaya.</p>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}
          </AnimatePresence>

          {/* FOOTER ACTION */}
          <div className="mt-24 pt-10 border-t-2 border-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                PT IDE KOS INDONESIA © 2026 • DOKUMEN INTERNAL TERKENDALI
             </div>
             <div className="flex gap-4">
                <Link href="/bantuan" className="text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 border border-slate-200 rounded hover:bg-slate-900 hover:text-white transition-all">Hubungi Legal</Link>
                <button className="text-[10px] font-black uppercase tracking-[0.2em] px-6 py-3 bg-slate-900 text-white rounded">Persetujuan Digital</button>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}
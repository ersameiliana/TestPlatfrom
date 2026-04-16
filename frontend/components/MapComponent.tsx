"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import Link from "next/link";

// --- 1. Komponen Internal untuk Animasi Perpindahan Lokasi (VERSI AMAN) ---
function ChangeView({ center }: { center: { lat: number; lng: number; zoom: number } }) {
  const map = useMap();

  useEffect(() => {
    // Memberikan jeda 100ms agar Leaflet siap merender frame sebelum animasi flyTo
    const timer = setTimeout(() => {
      if (map) {
        try {
          map.flyTo([center.lat, center.lng], center.zoom, {
            duration: 1.5,
            easeLinearity: 0.25,
          });
        } catch (error) {
          // Fallback jika flyTo gagal karena map pane belum terpasang sempurna
          map.setView([center.lat, center.lng], center.zoom);
        }
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [center, map]);

  return null;
}

// --- 2. Helper untuk Membuat Ikon Pin Harga ---
const createPriceIcon = (price: string, isActive: boolean) => {
  if (typeof window === "undefined") return null;
  
  return L.divIcon({
    className: "custom-price-pin",
    html: `<div class="px-3 py-1.5 rounded-full font-extrabold text-xs shadow-xl border-2 transition-all duration-300 ${
      isActive 
        ? 'bg-cyan-600 text-white border-white scale-110 z-[1000]' 
        : 'bg-white text-slate-800 border-cyan-500 hover:border-cyan-600'
    }">Rp ${price}</div>`,
    iconSize: [80, 30],
    iconAnchor: [40, 15],
  });
};

interface MapProps {
  kosData: any[];
  selectedKos: any | null;
  onSelectKos: (kos: any) => void;
  center: { lat: number; lng: number; zoom: number };
}

export default function MapComponent({ kosData, selectedKos, onSelectKos, center }: MapProps) {
  const [mounted, setMounted] = useState(false);

  // Mencegah error SSR (Server Side Rendering)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full bg-slate-100 animate-pulse flex items-center justify-center">
        <span className="text-slate-400 font-medium tracking-widest uppercase text-xs">Menyiapkan Peta...</span>
      </div>
    );
  }

  return (
    <div className="w-full h-full z-0 relative">
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={center.zoom}
        style={{ width: "100%", height: "100%" }}
        zoomControl={false}
        scrollWheelZoom={true}
      >
        {/* Trigger animasi perpindahan saat props center berubah */}
        <ChangeView center={center} />

        {/* Layer Peta (Clean Style) */}
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {/* Render Markers */}
        {kosData.map((kos) => {
          const icon = createPriceIcon(kos.price.split(".")[0] + "jt", selectedKos?.id === kos.id);
          if (!icon) return null;

          return (
            <Marker
              key={kos.id}
              position={[kos.lat, kos.lng]}
              icon={icon as L.DivIcon}
              eventHandlers={{
                click: () => onSelectKos(kos),
              }}
            >
              <Popup className="custom-popup" closeButton={false}>
                <div className="text-center p-2">
                  <p className="font-bold text-slate-800 text-sm mb-1">{kos.name}</p>
                  <div className="flex flex-col gap-2">
                     <p className="text-[10px] text-slate-500">{kos.location}</p>
                     <Link 
                      href={`/kos/${kos.id}`} 
                      className="inline-block bg-cyan-600 text-white text-[10px] font-bold py-1.5 px-3 rounded-lg hover:bg-cyan-700 transition-colors"
                     >
                       Lihat Detail
                     </Link>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
      
      {/* Dekorasi tambahan (Pojok Peta) */}
      <div className="absolute bottom-4 right-4 z-[500] pointer-events-none">
        <span className="bg-white/80 backdrop-blur px-2 py-1 rounded text-[10px] font-bold text-slate-400 border border-slate-200">
          IDE Kos Engine v1.0
        </span>
      </div>
    </div>
  );
}
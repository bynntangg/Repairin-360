import React from 'react';
import { Leaf, Wrench, Shield, Recycle, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#105C45] text-white pt-12 pb-8 border-t border-emerald-900 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-800/60">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center">
                <Wrench className="w-4 h-4 text-emerald-300" />
              </div>
              <span className="font-heading font-black text-xl tracking-tight text-white">REPAIRIN 360</span>
            </div>
            <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed max-w-md">
              Platform layanan reparasi pintar dan ekosistem sirkular pertama di Indonesia yang menghubungkan pelanggan dengan teknisi servis panggilan terverifikasi. Transparan, terpercaya, dan bergaransi resmi digital.
            </p>
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 inline-flex items-center gap-2 text-xs text-emerald-200">
              <Leaf className="w-4 h-4 text-emerald-300 shrink-0" />
              <span className="font-semibold italic">"Repair It. Extend Its Life. Reduce Waste."</span>
            </div>
          </div>

          {/* 6 Core Features */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-emerald-300 mb-3">Layanan Utama</h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                SmartCheck (Analisis Kerusakan)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                SmartMatch (Pencocokan Teknisi)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                PriceGuard (Transparansi Biaya)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Repair Passport (Riwayat Digital)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Circular Reward (Poin & Diskon)
              </li>
              <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                Repair or Replace Decision
              </li>
            </ul>
          </div>

          {/* Ekosistem Sirkular & Standar */}
          <div>
            <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-emerald-300 mb-3">Ekosistem Sirkular</h4>
            <p className="text-xs text-emerald-100/80 leading-relaxed mb-3">
              Mendukung SDG 12 (Pola Konsumsi dan Produksi Bertanggung Jawab) serta pengurangan timbulan limbah elektronik (E-Waste) nasional.
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-medium text-emerald-200">Zero E-Waste Target</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-medium text-emerald-200">Teknisi Terverifikasi</span>
              <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-medium text-emerald-200">Garansi 90 Hari</span>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-3">
          <p>© 2026 REPAIRIN 360 Ecosystem. Seluruh Hak Cipta Dilindungi.</p>
          <p className="flex items-center gap-1 text-[11px]">
            Platform Layanan Reparasi Digital & Ekosistem Sirkular Terpercaya Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}

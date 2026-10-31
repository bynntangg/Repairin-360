import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BarChart3, 
  Leaf, 
  Users, 
  Wrench, 
  DollarSign, 
  ShieldCheck, 
  CheckCircle2, 
  TrendingUp, 
  AlertTriangle,
  FileCheck,
  Recycle,
  Scale
} from 'lucide-react';

export default function AdminDashboard({ setActiveTab }) {
  const { 
    orders, 
    technicians, 
    repairPassports, 
    circularStats, 
    complaints, 
    platformSettings 
  } = useApp();

  const pendingVerificationTechs = technicians.filter(t => !t.verified);
  const completedOrders = orders.filter(o => o.status === 'Selesai');
  const activeOrders = orders.filter(o => o.status !== 'Selesai' && o.status !== 'Dibatalkan');

  // GMV & Platform Commission
  const totalGMV = completedOrders.reduce((acc, o) => acc + (o.priceGuard?.total || 0), 0);
  const platformRevenue = Math.round(totalGMV * (platformSettings.platformCommissionPercent / 100));

  return (
    <div className="space-y-8 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <BarChart3 className="w-4 h-4 text-[#167D5A]" />
            <span>Portal Administrator & Ekosistem Pengawasan</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Dashboard Analytics & Circular Impact
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Pengawasan performa platform, verifikasi teknisi, omzet komisi sirkular, dan metrik dampak lingkungan hidup terukur.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {pendingVerificationTechs.length > 0 && (
            <button
              onClick={() => setActiveTab('admin-verifications')}
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              <FileCheck className="w-4 h-4" />
              <span>{pendingVerificationTechs.length} Verifikasi Menunggu</span>
            </button>
          )}
        </div>
      </div>

      {/* CIRCULAR IMPACT DASHBOARD HIGHLIGHT */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#105C45] via-[#167D5A] to-[#1e8a64] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold">
              <Recycle className="w-4 h-4 text-emerald-300" />
              <span>Circular Economy Environmental Scorecard (SDG 12)</span>
            </div>
            <span className="text-xs text-emerald-200 font-mono">Status: Optimal 98.4%</span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[11px] text-emerald-200 font-medium block">Total Barang Diselamatkan</span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                {circularStats.totalItemsRepaired.toLocaleString('id-ID')} unit
              </div>
              <span className="text-[10px] text-emerald-300 mt-0.5 block">Dari Tempat Pembuangan Akhir</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[11px] text-emerald-200 font-medium block">Limbah E-Waste Dicegah</span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                {(circularStats.totalEWasteDivertedKg / 1000).toFixed(1)} Ton
              </div>
              <span className="text-[10px] text-emerald-300 mt-0.5 block">Logam, plastik & silikon</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[11px] text-emerald-200 font-medium block">Emisi Karbon Dihindari</span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                {(circularStats.totalCo2SavedKg / 1000).toFixed(1)} Ton
              </div>
              <span className="text-[10px] text-emerald-300 mt-0.5 block">Jejak karbon manufaktur baru</span>
            </div>

            <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20">
              <span className="text-[11px] text-emerald-200 font-medium block">Penghematan Biaya Warga</span>
              <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
                Rp {(circularStats.moneySavedByUsersRp / 1000000).toFixed(0)} Juta
              </div>
              <span className="text-[10px] text-emerald-300 mt-0.5 block">Dibandingkan membeli unit baru</span>
            </div>
          </div>
        </div>
      </section>

      {/* Operational KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Pesanan */}
        <div 
          onClick={() => setActiveTab('admin-bookings')}
          className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#167D5A] hover:shadow-md transition-all cursor-pointer"
        >
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Pesanan Servis</span>
          <div className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
            {orders.length} Pesanan
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            {activeOrders.length} Dalam Proses Aktif
          </span>
        </div>

        {/* Total Teknisi */}
        <div 
          onClick={() => setActiveTab('admin-verifications')}
          className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#167D5A] hover:shadow-md transition-all cursor-pointer"
        >
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Mitra Teknisi Terdaftar</span>
          <div className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
            {technicians.length} Teknisi
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">
            {technicians.filter(t => t.verified).length} Terverifikasi Aktif
          </span>
        </div>

        {/* Nilai GMV */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Gross Merchandise Value (GMV)</span>
          <div className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
            Rp {totalGMV.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-gray-400 mt-1 block">Dari transaksi selesai di PriceGuard</span>
        </div>

        {/* Pendapatan Komisi Platform (15%) */}
        <div className="p-5 rounded-3xl bg-emerald-50 border border-emerald-200 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-[#105C45] block">
            Pendapatan Platform ({platformSettings.platformCommissionPercent}%)
          </span>
          <div className="font-heading font-extrabold text-2xl text-[#105C45] mt-1">
            Rp {platformRevenue.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-emerald-700 font-semibold mt-1 block">
            Kas Operasional Ekosistem
          </span>
        </div>
      </div>

      {/* Quick Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div 
          onClick={() => setActiveTab('admin-verifications')}
          className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center">
            <FileCheck className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-gray-900">Verifikasi Berkas Teknisi</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Periksa dokumen KTP, sertifikasi BNSP, dan keahlian teknisi sebelum memberikan badge terverifikasi.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('admin-bookings')}
          className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center">
            <BarChart3 className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-gray-900">Manajemen Pesanan & PriceGuard</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Pantau transparansi biaya suku cadang, versi estimasi, dan alur perbaikan setiap order secara real-time.
          </p>
        </div>

        <div 
          onClick={() => setActiveTab('admin-complaints')}
          className="p-6 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:shadow-md transition-all cursor-pointer space-y-2"
        >
          <div className="w-10 h-10 rounded-2xl bg-red-50 text-red-700 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <h3 className="font-heading font-bold text-base text-gray-900">Pusat Mediasi Pengaduan ({complaints.length})</h3>
          <p className="text-xs text-gray-500 leading-relaxed">
            Tangani laporan perselisihan biaya, keluhan teknisi, atau masalah garansi digital secara adil.
          </p>
        </div>
      </div>
    </div>
  );
}

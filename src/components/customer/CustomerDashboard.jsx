import React from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import { 
  Wrench, 
  Search, 
  ShieldCheck, 
  Leaf, 
  ArrowRight, 
  Scale, 
  Sparkles, 
  Star, 
  MapPin, 
  Calendar, 
  AlertTriangle,
  Wind,
  CookingPot,
  Zap,
  Droplets,
  Disc,
  Snowflake,
  Tv,
  CheckCircle2,
  Recycle,
  Clock
} from 'lucide-react';

const iconMap = {
  Wind,
  CookingPot,
  Zap,
  Droplets,
  Disc,
  Snowflake,
  Tv
};

export default function CustomerDashboard({ setActiveTab, onSelectCategory }) {
  const { categories, technicians, orders, repairPassports, rewards, currentUser } = useApp();

  const activeOrders = orders.filter(o => o.status !== 'Selesai' && o.status !== 'Dibatalkan');
  const recommendedTechs = technicians.filter(t => t.verified).slice(0, 3);

  return (
    <div className="space-y-8 pb-12">
      {/* 1. Hero Section with Rich Visual Illustration */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#105C45] via-[#167D5A] to-[#1e8a64] text-white p-6 sm:p-10 shadow-xl shadow-[#167D5A]/15">
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-80 h-80 rounded-full bg-white/5 pointer-events-none blur-2xl"></div>

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-emerald-200 text-xs font-semibold border border-white/20">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              <span>Smart Repair & Circular Service Ecosystem</span>
            </div>

            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-tight">
              Barang Rusak? <br />
              <span className="text-emerald-300 underline decoration-emerald-400 decoration-wavy">Jangan Langsung Ganti!</span>
            </h1>

            <p className="text-emerald-100/90 text-xs sm:text-sm leading-relaxed max-w-xl">
              Halo, <strong>{currentUser?.name || 'Pelanggan'}</strong>! Dapatkan analisis awal kerusakan perangkat seketika dengan <strong>SmartCheck</strong>, temukan teknisi panggilan tersertifikasi melalui <strong>SmartMatch</strong>, dan nikmati garansi resmi digital dengan <strong>Repair Passport</strong>.
            </p>

            <div className="pt-2 flex flex-wrap gap-3 sm:gap-4">
              <button
                onClick={() => setActiveTab('smartcheck')}
                className="px-5 py-3 rounded-xl bg-white text-[#105C45] font-heading font-bold text-xs sm:text-sm shadow-lg shadow-black/10 hover:bg-emerald-50 transition-all flex items-center gap-2 group cursor-pointer"
              >
                <Search className="w-4 h-4 text-[#167D5A] group-hover:scale-110 transition-transform" />
                <span>Cek Kerusakan (SmartCheck)</span>
                <ArrowRight className="w-4 h-4 text-[#167D5A]" />
              </button>

              <button
                onClick={() => setActiveTab('smartmatch')}
                className="px-5 py-3 rounded-xl bg-[#0e4e3a] hover:bg-[#0b3c2d] text-white font-heading font-semibold text-xs sm:text-sm border border-emerald-400/30 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Wrench className="w-4 h-4 text-emerald-300" />
                <span>Cari Teknisi Terdekat</span>
              </button>
            </div>
          </div>

          {/* Hero Illustration Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border-2 border-white/20 group">
              <img
                src="/images/engineer.png"
                alt="Reparasi Alat Rumah Tangga & Elektronik"
                className="w-full h-56 sm:h-64 object-cover transform group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#105C45]/80 via-transparent to-transparent flex items-end p-4">
                <div className="flex items-center gap-2 text-xs text-white">
                  <ShieldCheck className="w-4 h-4 text-emerald-300" />
                  <span>Garansi Resmi Digital 90 Hari Setiap Servis</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Circular Impact Mini Ticker */}
        <div className="relative z-10 mt-8 pt-6 border-t border-white/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <p className="text-emerald-200/80 font-medium">Limbah E-Waste Dicegah</p>
            <p className="text-lg sm:text-xl font-bold font-heading text-white">14.2+ Ton</p>
          </div>
          <div>
            <p className="text-emerald-200/80 font-medium">Emisi CO₂ Berkurang</p>
            <p className="text-lg sm:text-xl font-bold font-heading text-white">58.6+ Ton</p>
          </div>
          <div>
            <p className="text-emerald-200/80 font-medium">Biaya Warga Dihemat</p>
            <p className="text-lg sm:text-xl font-bold font-heading text-white">Rp 428 Juta</p>
          </div>
          <div>
            <p className="text-emerald-200/80 font-medium">Garansi Resmi Digital</p>
            <p className="text-lg sm:text-xl font-bold font-heading text-white">s.d. 90 Hari</p>
          </div>
        </div>
      </section>

      {/* 2. Active Orders Tracker Widget (if any) */}
      {activeOrders.length > 0 && (
        <section className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse"></span>
              <h2 className="font-heading font-bold text-base text-gray-900">
                Pesanan Servis Aktif ({activeOrders.length})
              </h2>
            </div>
            <button
              onClick={() => setActiveTab('orders')}
              className="text-xs font-semibold text-[#167D5A] hover:underline flex items-center gap-1 cursor-pointer"
            >
              Lihat Semua Pesanan →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeOrders.map(order => (
              <div 
                key={order.id}
                onClick={() => setActiveTab('orders')}
                className="p-4 rounded-xl border border-gray-200 hover:border-[#167D5A]/50 hover:shadow-md transition-all cursor-pointer bg-[#F8FAF9]"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[11px] font-mono text-gray-400 font-semibold">{order.id}</span>
                    <h3 className="font-heading font-bold text-sm text-gray-900">
                      {order.brand} {order.model}
                    </h3>
                  </div>
                  <StatusBadge status={order.status} size="sm" />
                </div>

                <p className="text-xs text-gray-600 line-clamp-1 mb-3">
                  Keluhan: {order.itemDescription}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-gray-200/60 text-xs">
                  <div className="flex items-center gap-1.5 text-gray-600">
                    <Wrench className="w-3.5 h-3.5 text-gray-400" />
                    <span>{order.technicianName}</span>
                  </div>

                  {order.status === 'Menunggu Persetujuan Biaya' ? (
                    <span className="text-xs font-bold text-orange-600 bg-orange-100 px-2 py-0.5 rounded-full animate-pulse">
                      Persetujuan Biaya Dibutuhkan →
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#167D5A]">
                      Jadwal: {order.scheduleDate}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. Category Grid with Rich Photo Thumbnails */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-lg text-gray-900">Kategori Alat Rumah Tangga & Elektronik</h2>
            <p className="text-xs text-gray-500">Pilih kategori barang untuk langsung mendiagnosis gejala kerusakan</p>
          </div>
          <button
            onClick={() => setActiveTab('smartcheck')}
            className="text-xs font-semibold text-[#167D5A] hover:underline"
          >
            Lihat Kuesioner Diagnosis →
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">
          {categories.map(cat => (
            <div
              key={cat.id}
              onClick={() => {
                if (onSelectCategory) onSelectCategory(cat.id);
                setActiveTab('smartcheck');
              }}
              className="group p-3 rounded-2xl bg-white border border-gray-200/80 hover:border-[#167D5A] hover:shadow-lg transition-all cursor-pointer text-center flex flex-col items-center justify-between space-y-2.5 overflow-hidden"
            >
              {/* Image thumbnail */}
              <div className="w-full h-24 rounded-xl overflow-hidden bg-gray-100 relative">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              <div>
                <h3 className="font-heading font-bold text-xs text-gray-900 group-hover:text-[#167D5A] transition-colors">
                  {cat.name}
                </h3>
                <span className="text-[10px] text-gray-400 block mt-0.5">
                  {cat.symptoms.length} Gejala Umum
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Core Features Showcase: 3 Value Blocks */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Block A: Repair or Replace Decision */}
        <div 
          onClick={() => setActiveTab('repair-or-replace')}
          className="p-6 rounded-2xl bg-gradient-to-br from-white to-emerald-50/40 border border-emerald-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-[#E5F3EC] text-[#167D5A] flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-[#167D5A] tracking-wider">Kalkulator Keputusan</span>
              <h3 className="font-heading font-bold text-base text-gray-900">Repair or Replace Decision</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Bandingkan rasio biaya perbaikan terhadap harga unit baru secara transparan sebelum mengambil keputusan.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-emerald-100 flex items-center justify-between text-xs font-semibold text-[#167D5A]">
            <span>Uji Rasio Barang Anda</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Block B: Repair Passport */}
        <div 
          onClick={() => setActiveTab('passports')}
          className="p-6 rounded-2xl bg-gradient-to-br from-white to-blue-50/40 border border-blue-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider">Identitas Resmi Digital</span>
              <h3 className="font-heading font-bold text-base text-gray-900">Repair Passport Digital</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Catatan riwayat perbaikan resmi dengan sertifikat garansi hingga 90 hari kalender yang aman dan transparan.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-blue-100 flex items-center justify-between text-xs font-semibold text-blue-700">
            <span>{repairPassports.length} Passport Tersimpan</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>

        {/* Block C: Circular Reward */}
        <div 
          onClick={() => setActiveTab('rewards')}
          className="p-6 rounded-2xl bg-gradient-to-br from-white to-amber-50/40 border border-amber-200/60 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
              <Leaf className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] uppercase font-bold text-amber-700 tracking-wider">Program Loyalitas</span>
              <h3 className="font-heading font-bold text-base text-gray-900">Circular Rewards & Poin</h3>
            </div>
            <p className="text-xs text-gray-600 leading-relaxed">
              Kumpulkan poin setiap kali memilih opsi reparasi. Tukarkan voucher potongan jasa, gratis periksa, dan promo mitra.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-amber-100 flex items-center justify-between text-xs font-semibold text-amber-700">
            <span>Saldo: {rewards.customerPoints} Poin</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </section>

      {/* 5. Recommended Technicians */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-heading font-bold text-lg text-gray-900">Teknisi Servis Terverifikasi REPAIRIN</h2>
            <p className="text-xs text-gray-500">Keahlian teruji, ulasan transparan, dan jaminan estimasi PriceGuard</p>
          </div>
          <button
            onClick={() => setActiveTab('smartmatch')}
            className="text-xs font-semibold text-[#167D5A] hover:underline"
          >
            Lihat Semua Teknisi ({technicians.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {recommendedTechs.map(tech => (
            <div 
              key={tech.id}
              className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <img
                    src={tech.avatar}
                    alt={tech.name}
                    className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-heading font-bold text-sm text-gray-900">{tech.name}</h3>
                      <CheckCircle2 className="w-4 h-4 text-[#167D5A]" title="Terverifikasi" />
                    </div>
                    <p className="text-xs text-gray-500">{tech.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs font-semibold text-amber-600">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{tech.rating}</span>
                      <span className="text-gray-400 font-normal">({tech.reviewsCount} ulasan · {tech.jobsCompleted} selesai)</span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                  {tech.bio}
                </p>

                <div className="flex flex-wrap gap-1">
                  {tech.serviceAreas.map((area, idx) => (
                    <span key={idx} className="inline-flex items-center gap-0.5 text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md">
                      <MapPin className="w-2.5 h-2.5" />
                      {area}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block">Biaya Periksa</span>
                  <span className="text-xs font-bold text-gray-900">Rp {tech.baseInspectionFee.toLocaleString('id-ID')}</span>
                </div>
                <button
                  onClick={() => setActiveTab('smartmatch')}
                  className="px-3 py-1.5 rounded-lg bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-semibold transition-all cursor-pointer"
                >
                  Pilih Teknisi
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

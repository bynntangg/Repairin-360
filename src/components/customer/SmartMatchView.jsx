import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import BookingServiceModal from './BookingServiceModal';
import { 
  Search, 
  MapPin, 
  Star, 
  CheckCircle2, 
  Filter, 
  Calendar, 
  Clock, 
  ShieldCheck, 
  Award, 
  ChevronRight, 
  Sparkles,
  ArrowUpDown,
  X
} from 'lucide-react';

export default function SmartMatchView({ setActiveTab }) {
  const { technicians, categories, activeSmartCheckHandoff } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(activeSmartCheckHandoff?.categoryId || 'all');
  const [selectedArea, setSelectedArea] = useState('all');
  const [minRating, setMinRating] = useState('0');
  const [sortBy, setSortBy] = useState('best-match'); // best-match, rating, fee-low
  const [selectedTechForBooking, setSelectedTechForBooking] = useState(null);
  const [detailModalTech, setDetailModalTech] = useState(null);

  // Filter only verified technicians for public customer matching
  const verifiedTechs = technicians.filter(t => t.verified);

  // Filter matching
  const filteredTechs = verifiedTechs.filter(tech => {
    // Search query matches name, title, specialties
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchName = tech.name.toLowerCase().includes(q);
      const matchSpecialty = tech.specialties.some(s => s.toLowerCase().includes(q));
      const matchArea = tech.serviceAreas.some(a => a.toLowerCase().includes(q));
      if (!matchName && !matchSpecialty && !matchArea) return false;
    }

    // Category filter
    if (selectedCategory !== 'all') {
      if (!tech.specialties.includes(selectedCategory)) return false;
    }

    // Area filter
    if (selectedArea !== 'all') {
      if (!tech.serviceAreas.some(a => a.toLowerCase().includes(selectedArea.toLowerCase()))) return false;
    }

    // Rating filter
    if (Number(minRating) > 0) {
      if (tech.rating < Number(minRating)) return false;
    }

    return true;
  });

  // Sort matching
  const sortedTechs = [...filteredTechs].sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'fee-low') return a.baseInspectionFee - b.baseInspectionFee;
    // best-match priority: category match with active handoff + highest rating
    if (activeSmartCheckHandoff) {
      const aMatches = a.specialties.includes(activeSmartCheckHandoff.categoryId) ? 1 : 0;
      const bMatches = b.specialties.includes(activeSmartCheckHandoff.categoryId) ? 1 : 0;
      if (bMatches !== aMatches) return bMatches - aMatches;
    }
    return b.rating - a.rating;
  });

  // Helper to determine matching badge
  const getTechBadge = (tech, index) => {
    if (index === 0 && sortBy === 'best-match') return { text: 'Best Match', color: 'bg-[#E5F3EC] text-[#167D5A] border-[#167D5A]/30' };
    if (tech.rating >= 4.9) return { text: 'Rating Tertinggi', color: 'bg-amber-50 text-amber-800 border-amber-200' };
    if (tech.baseInspectionFee <= 35000) return { text: 'Tarif Terjangkau', color: 'bg-blue-50 text-blue-800 border-blue-200' };
    return { text: 'Terdekat', color: 'bg-gray-100 text-gray-700 border-gray-200' };
  };

  return (
    <div className="space-y-6 pb-16">
      {/* SmartCheck Handoff Banner (if arriving from SmartCheck) */}
      {activeSmartCheckHandoff && (
        <div className="p-4 rounded-2xl bg-[#E5F3EC] border border-[#167D5A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#167D5A] text-white flex items-center justify-center shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#105C45]">
                Hasil SmartCheck Terintegrasi: {activeSmartCheckHandoff.itemSummary}
              </p>
              <p className="text-[11px] text-gray-600 line-clamp-1">
                Indikasi: {activeSmartCheckHandoff.probableCauses?.[0]} (Estimasi Rp {activeSmartCheckHandoff.estimatedCostMin.toLocaleString('id-ID')} - {activeSmartCheckHandoff.estimatedCostMax.toLocaleString('id-ID')})
              </p>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-[#167D5A] bg-white px-3 py-1 rounded-full border border-[#167D5A]/20">
            Menampilkan Teknisi Sesuai Keahlian
          </span>
        </div>
      )}

      {/* Header & Search Bar */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            Fitur Utama 2 · SmartMatch
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Pencocokan Teknisi Servis Terverifikasi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Temukan teknisi ahli sesuai spesialisasi barang, rating ulasan, area jangkauan, dan transparansi biaya pemeriksaan PriceGuard.
          </p>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
          {/* Keyword Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            <input
              type="text"
              placeholder="Cari nama atau keahlian..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 pl-9 pr-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden"
            />
          </div>

          {/* Category Dropdown */}
          <div>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden bg-white text-gray-700 font-medium"
            >
              <option value="all">Semua Spesialisasi Kategori</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* Area Dropdown */}
          <div>
            <select
              value={selectedArea}
              onChange={e => setSelectedArea(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden bg-white text-gray-700 font-medium"
            >
              <option value="all">Semua Area Layanan (Jabodetabek)</option>
              <option value="Jakarta Selatan">Jakarta Selatan</option>
              <option value="Jakarta Pusat">Jakarta Pusat</option>
              <option value="Jakarta Barat">Jakarta Barat</option>
              <option value="Jakarta Timur">Jakarta Timur</option>
              <option value="Tangerang">Tangerang & Tangsel</option>
              <option value="Bekasi">Bekasi</option>
            </select>
          </div>

          {/* Sorting */}
          <div className="flex items-center gap-2">
            <ArrowUpDown className="w-4 h-4 text-gray-400 shrink-0" />
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden bg-white text-gray-700 font-medium"
            >
              <option value="best-match">Urutan: Rekomendasi (Best Match)</option>
              <option value="rating">Urutan: Rating Tertinggi</option>
              <option value="fee-low">Urutan: Tarif Cek Terendah</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-gray-600 px-1">
        <span>Menampilkan <strong>{sortedTechs.length}</strong> teknisi servis terverifikasi</span>
        <span className="text-[11px] text-gray-400">*Seluruh teknisi telah lolos uji berkas & sertifikasi BNSP/LSP</span>
      </div>

      {/* Technician Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {sortedTechs.map((tech, idx) => {
          const badge = getTechBadge(tech, idx);

          return (
            <div
              key={tech.id}
              className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header card: Photo, Name, Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={tech.avatar}
                      alt={tech.name}
                      className="w-14 h-14 rounded-2xl object-cover ring-2 ring-emerald-500/20 group-hover:scale-105 transition-transform"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-heading font-bold text-sm text-gray-900">{tech.name}</h3>
                        <CheckCircle2 className="w-4 h-4 text-[#167D5A]" title="Terverifikasi Resmi" />
                      </div>
                      <p className="text-xs text-gray-500">{tech.title}</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-xs">
                        <span className="flex items-center gap-0.5 text-amber-600 font-bold">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          {tech.rating}
                        </span>
                        <span className="text-gray-400">·</span>
                        <span className="text-gray-500 font-medium">{tech.jobsCompleted} Servis Sukses</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Match Label */}
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${badge.color}`}>
                    {badge.text}
                  </span>
                  <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md flex items-center gap-1">
                    <Clock className="w-3 h-3 text-emerald-600" />
                    {tech.scheduleStatus}
                  </span>
                </div>

                {/* Specialties Tags */}
                <div>
                  <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider block mb-1">
                    Keahlian Utama:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {tech.specialties.map(specId => {
                      const cObj = categories.find(c => c.id === specId);
                      return (
                        <span key={specId} className="px-2 py-0.5 rounded-md bg-gray-100 text-gray-700 text-[10px] font-medium">
                          {cObj ? cObj.name : specId}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Service Areas */}
                <div className="flex items-start gap-1 text-[11px] text-gray-500">
                  <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                  <span className="line-clamp-1">{tech.serviceAreas.join(', ')}</span>
                </div>
              </div>

              {/* Card Footer: Pricing & Action */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-400 block leading-tight">Biaya Pemeriksaan:</span>
                  <span className="text-xs font-bold text-gray-900">
                    Rp {tech.baseInspectionFee.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDetailModalTech(tech)}
                    className="p-2 rounded-xl text-gray-500 hover:text-gray-900 hover:bg-gray-100 text-xs font-semibold transition-colors cursor-pointer"
                    title="Lihat Profil Lengkap"
                  >
                    Profil
                  </button>

                  <button
                    type="button"
                    onClick={() => setSelectedTechForBooking(tech)}
                    className="px-4 py-2 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-1 cursor-pointer"
                  >
                    <span>Pesan Servis</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Technician Detail Modal */}
      {detailModalTech && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl border border-gray-100">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={detailModalTech.avatar} alt={detailModalTech.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#167D5A]/30" />
                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-heading font-bold text-base text-gray-900">{detailModalTech.name}</h3>
                    <CheckCircle2 className="w-4 h-4 text-[#167D5A]" />
                  </div>
                  <p className="text-xs text-gray-500">{detailModalTech.title}</p>
                  <p className="text-xs font-semibold text-amber-600 mt-0.5">
                    ★ {detailModalTech.rating} ({detailModalTech.reviewsCount} Ulasan Pelanggan)
                  </p>
                </div>
              </div>
              <button onClick={() => setDetailModalTech(null)} className="p-1 rounded-lg text-gray-400 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-gray-600">
              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-900 mb-1">Tentang & Pengalaman</h4>
                <p className="leading-relaxed">{detailModalTech.bio}</p>
                <p className="mt-1 font-semibold text-[#167D5A]">Pengalaman: {detailModalTech.experienceYears} Tahun di Servis Elektronik</p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-900 mb-1">Dokumen & Sertifikasi</h4>
                <div className="space-y-1.5">
                  {detailModalTech.documents.map((doc, i) => (
                    <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-4 h-4 text-[#167D5A]" />
                        <span className="font-medium text-gray-800">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-md">Terverifikasi</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-900 mb-1">Area Operasional</h4>
                <p>{detailModalTech.serviceAreas.join(' · ')}</p>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-gray-400 block">Ongkos Pemeriksaan Awal</span>
                <span className="text-sm font-bold text-gray-900">Rp {detailModalTech.baseInspectionFee.toLocaleString('id-ID')}</span>
              </div>
              <button
                type="button"
                onClick={() => {
                  const target = detailModalTech;
                  setDetailModalTech(null);
                  setSelectedTechForBooking(target);
                }}
                className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Lanjutkan Pemesanan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Form Modal */}
      {selectedTechForBooking && (
        <BookingServiceModal
          technician={selectedTechForBooking}
          initialSmartCheck={activeSmartCheckHandoff}
          onClose={() => setSelectedTechForBooking(null)}
          onSuccess={(newOrder) => {
            setSelectedTechForBooking(null);
            setActiveTab('orders');
          }}
        />
      )}
    </div>
  );
}

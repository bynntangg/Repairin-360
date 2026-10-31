import React from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import { 
  Wrench, 
  Clock, 
  CheckCircle2, 
  DollarSign, 
  Star, 
  Calendar, 
  ArrowRight, 
  AlertCircle, 
  User, 
  MapPin,
  TrendingUp,
  Percent
} from 'lucide-react';

export default function TechnicianDashboard({ setActiveTab }) {
  const { 
    orders, 
    technicians, 
    activeTechnicianId, 
    platformSettings 
  } = useApp();

  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  // Orders for this technician
  const myOrders = orders.filter(o => o.technicianId === currentTech.id);
  const newRequests = myOrders.filter(o => o.status === 'Menunggu Konfirmasi');
  const activeJobs = myOrders.filter(o => ['Diterima Teknisi', 'Menunggu Jadwal', 'Teknisi Menuju Lokasi', 'Pemeriksaan', 'Menunggu Persetujuan Biaya', 'Dalam Perbaikan', 'Menunggu Penyelesaian'].includes(o.status));
  const completedJobs = myOrders.filter(o => o.status === 'Selesai');

  // Income calculations (85% net income, 15% platform commission)
  const commissionRate = platformSettings.platformCommissionPercent / 100; // 0.15
  const grossIncome = completedJobs.reduce((acc, o) => acc + (o.priceGuard?.total || 0), 0);
  const platformFee = Math.round(grossIncome * commissionRate);
  const netIncome = grossIncome - platformFee;

  return (
    <div className="space-y-6 pb-16">
      {/* Welcome Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={currentTech.avatar}
            alt={currentTech.name}
            className="w-16 h-16 rounded-2xl object-cover ring-2 ring-[#167D5A]/30 shadow-md"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-[#167D5A] bg-[#E5F3EC] px-2.5 py-0.5 rounded-full">
                Portal Teknisi Mitra
              </span>
              <span className="text-xs text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#167D5A]" />
                {currentTech.verified ? 'Akun Terverifikasi' : 'Menunggu Verifikasi'}
              </span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
              Selamat Datang, {currentTech.name}
            </h1>
            <p className="text-xs text-gray-500 mt-0.5">
              Spesialisasi: {currentTech.specialties.join(', ')} · Status: <strong>{currentTech.scheduleStatus}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('tech-workspace')}
            className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Wrench className="w-4 h-4 text-emerald-200" />
            <span>Buka Workspace Perbaikan</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Permintaan Baru */}
        <div 
          onClick={() => setActiveTab('tech-requests')}
          className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-amber-400 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700">Permintaan Baru</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4 animate-pulse" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl text-gray-900">{newRequests.length}</div>
          <p className="text-[11px] text-gray-400 mt-1">Perlu konfirmasi Anda</p>
        </div>

        {/* Pekerjaan Aktif */}
        <div 
          onClick={() => setActiveTab('tech-workspace')}
          className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-[#167D5A] hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#167D5A]">Pekerjaan Aktif</span>
            <div className="w-8 h-8 rounded-xl bg-[#E5F3EC] text-[#167D5A] flex items-center justify-center">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl text-gray-900">{activeJobs.length}</div>
          <p className="text-[11px] text-gray-400 mt-1">Dalam alur servis & inspeksi</p>
        </div>

        {/* Pendapatan Bersih (85%) */}
        <div 
          onClick={() => setActiveTab('tech-income')}
          className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Pendapatan Bersih</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-xl text-gray-900">
            Rp {netIncome.toLocaleString('id-ID')}
          </div>
          <p className="text-[10px] text-emerald-600 mt-1 font-semibold">85% porsi teknisi (15% komisi)</p>
        </div>

        {/* Rating & Ulasan */}
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600">Rating Teknisi</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <div className="font-heading font-extrabold text-2xl text-gray-900 flex items-center gap-1.5">
            <span>{currentTech.rating}</span>
            <span className="text-xs text-gray-400 font-normal">/ 5.0</span>
          </div>
          <p className="text-[11px] text-gray-400 mt-1">{currentTech.reviewsCount} Ulasan Pelanggan</p>
        </div>
      </div>

      {/* Immediate Attention Alerts */}
      {newRequests.length > 0 && (
        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-amber-900">Ada {newRequests.length} Permintaan Servis Menunggu Konfirmasi</h4>
              <p className="text-[11px] text-amber-800">Pelanggan sedang menunggu respons ketersediaan jadwal Anda.</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('tech-requests')}
            className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs cursor-pointer"
          >
            Tinjau Sekarang →
          </button>
        </div>
      )}

      {/* Upcoming Schedule & Active Jobs */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Jobs */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="font-heading font-bold text-sm text-gray-900 flex items-center gap-2">
              <Wrench className="w-4 h-4 text-[#167D5A]" />
              Pekerjaan Servis Aktif ({activeJobs.length})
            </h3>
            <button
              onClick={() => setActiveTab('tech-workspace')}
              className="text-xs font-semibold text-[#167D5A] hover:underline"
            >
              Kelola di Workspace →
            </button>
          </div>

          {activeJobs.length === 0 ? (
            <p className="text-xs text-gray-400 py-6 text-center italic">Tidak ada pekerjaan aktif saat ini.</p>
          ) : (
            <div className="space-y-3">
              {activeJobs.map(job => (
                <div key={job.id} className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-gray-200 flex items-start justify-between gap-3 text-xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-gray-400 font-bold">{job.id}</span>
                      <StatusBadge status={job.status} size="sm" />
                    </div>
                    <h4 className="font-bold text-gray-900 mt-1">{job.brand} {job.model}</h4>
                    <p className="text-gray-500 text-[11px] mt-0.5">{job.customerName} · {job.scheduleDate}</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('tech-workspace')}
                    className="px-3 py-1.5 rounded-lg bg-[#167D5A] text-white font-semibold text-xs hover:bg-[#105C45]"
                  >
                    Buka Detail
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Schedule Highlights */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <h3 className="font-heading font-bold text-sm text-gray-900 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-blue-600" />
              Jadwal Servis Terdekat
            </h3>
            <button
              onClick={() => setActiveTab('tech-schedule')}
              className="text-xs font-semibold text-blue-600 hover:underline"
            >
              Atur Kalender →
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100 flex items-center justify-between">
              <div>
                <span className="font-bold text-blue-900 block">Status Ketersediaan:</span>
                <span className="text-blue-700">Tersedia Menerima Panggilan Servis</span>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white font-bold text-[10px]">
                Online
              </span>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Area Jangkauan Aktif:</span>
              <p className="font-medium text-gray-800">{currentTech.serviceAreas.join(' · ')}</p>
            </div>

            <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 space-y-1">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Tarif Pemeriksaan Awal Standar:</span>
              <p className="font-bold text-gray-900">Rp {currentTech.baseInspectionFee.toLocaleString('id-ID')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

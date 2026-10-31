import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import ReviewModal from './ReviewModal';
import ComplaintModal from './ComplaintModal';
import { 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ShieldCheck, 
  Wrench, 
  MapPin, 
  Phone, 
  Calendar, 
  CreditCard, 
  ArrowRight, 
  FileText, 
  ExternalLink, 
  Star, 
  ChevronRight,
  Info,
  DollarSign
} from 'lucide-react';

export default function OrderTrackingView({ setActiveTab }) {
  const { 
    orders, 
    updateOrderStatus, 
    approvePriceGuardQuote, 
    rejectPriceGuardQuote, 
    simulatePayment,
    repairPassports 
  } = useApp();

  const [selectedOrderId, setSelectedOrderId] = useState(orders[0]?.id || null);
  const [filterType, setFilterType] = useState('all'); // all, active, completed
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('Transfer Bank (BCA Virtual Account)');
  const [reviewOrderTarget, setReviewOrderTarget] = useState(null);
  const [complaintOrderTarget, setComplaintOrderTarget] = useState(null);

  const filteredOrders = orders.filter(o => {
    if (filterType === 'active') return o.status !== 'Selesai' && o.status !== 'Dibatalkan';
    if (filterType === 'completed') return o.status === 'Selesai';
    return true;
  });

  const activeOrder = orders.find(o => o.id === selectedOrderId) || filteredOrders[0] || null;

  // The 11 pipeline stages
  const orderSteps = [
    { key: 'Menunggu Konfirmasi', label: 'Menunggu Konfirmasi' },
    { key: 'Diterima Teknisi', label: 'Diterima Teknisi' },
    { key: 'Menunggu Jadwal', label: 'Menunggu Jadwal' },
    { key: 'Teknisi Menuju Lokasi', label: 'Teknisi OTW' },
    { key: 'Pemeriksaan', label: 'Pemeriksaan' },
    { key: 'Menunggu Persetujuan Biaya', label: 'PriceGuard (Persetujuan)' },
    { key: 'Dalam Perbaikan', label: 'Dalam Perbaikan' },
    { key: 'Menunggu Penyelesaian', label: 'Menunggu Selesai' },
    { key: 'Selesai', label: 'Selesai & Passport' }
  ];

  const getStepIndex = (status) => {
    const idx = orderSteps.findIndex(s => s.key === status);
    return idx === -1 ? 0 : idx;
  };

  const currentStepIdx = activeOrder ? getStepIndex(activeOrder.status) : 0;

  // Find linked passport if completed
  const linkedPassport = activeOrder ? repairPassports.find(p => p.orderId === activeOrder.id) : null;

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            Pelacakan & Transparansi Biaya
          </span>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Status Pesanan & PriceGuard
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Pantau 11 tahapan alur servis transparan dan berikan persetujuan biaya sebelum pengerjaan dimulai.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 bg-gray-100 p-1 rounded-xl text-xs font-medium">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'all' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Semua ({orders.length})
          </button>
          <button
            onClick={() => setFilterType('active')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'active' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Aktif ({orders.filter(o => o.status !== 'Selesai' && o.status !== 'Dibatalkan').length})
          </button>
          <button
            onClick={() => setFilterType('completed')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              filterType === 'completed' ? 'bg-white text-gray-900 shadow-xs font-bold' : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Selesai ({orders.filter(o => o.status === 'Selesai').length})
          </button>
        </div>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500 space-y-3">
          <Clock className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-heading font-bold text-gray-800 text-base">Belum Ada Pesanan pada Kategori Ini</h3>
          <p className="text-xs">Silakan lakukan pemesanan melalui menu SmartCheck atau SmartMatch.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Orders List */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 px-1">
              Daftar Pesanan Servis
            </h3>
            {filteredOrders.map(order => {
              const isSelected = order.id === activeOrder?.id;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#167D5A] shadow-md ring-2 ring-[#167D5A]/15'
                      : 'bg-white border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 font-semibold">{order.id}</span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                        {order.brand} {order.model}
                      </h4>
                    </div>
                    <StatusBadge status={order.status} size="sm" />
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                    {order.itemDescription}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-gray-500 pt-2 border-t border-gray-100">
                    <span>Teknisi: {order.technicianName}</span>
                    <span className="font-bold text-gray-800">
                      Rp {order.priceGuard?.total?.toLocaleString('id-ID') || '40.000'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Order Details & PriceGuard */}
          {activeOrder && (
            <div className="lg:col-span-2 space-y-6">
              {/* Main Order Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
                {/* Header Information */}
                <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-gray-400">{activeOrder.id}</span>
                      <span className="text-xs text-gray-400">· {activeOrder.createdAt}</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-900 mt-1">
                      {activeOrder.brand} {activeOrder.model}
                    </h2>
                    <p className="text-xs text-gray-600 mt-0.5">Keluhan: {activeOrder.itemDescription}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block mb-1">Status Pengerjaan Saat Ini</span>
                    <StatusBadge status={activeOrder.status} size="lg" />
                  </div>
                </div>

                {/* 11-Stage Pipeline Stepper Visualizer */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700">
                      Alur Status Transparan (End-to-End Pipeline)
                    </h4>
                    <span className="text-[11px] font-semibold text-[#167D5A]">
                      Tahap {Math.min(orderSteps.length, currentStepIdx + 1)} dari {orderSteps.length}
                    </span>
                  </div>

                  <div className="overflow-x-auto pb-2">
                    <div className="flex items-center min-w-[580px] gap-1">
                      {orderSteps.map((s, idx) => {
                        const isDone = idx < currentStepIdx;
                        const isCurrent = idx === currentStepIdx;

                        return (
                          <div key={s.key} className="flex-1 flex flex-col items-center relative text-center">
                            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                              isDone
                                ? 'bg-[#167D5A] text-white'
                                : isCurrent
                                ? 'bg-orange-500 text-white ring-4 ring-orange-100 animate-pulse'
                                : 'bg-gray-100 text-gray-400'
                            }`}>
                              {isDone ? '✓' : idx + 1}
                            </div>
                            <span className={`text-[10px] mt-1.5 leading-tight font-medium ${
                              isCurrent ? 'text-orange-600 font-bold' : isDone ? 'text-gray-900 font-semibold' : 'text-gray-400'
                            }`}>
                              {s.label}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Logistics & Technician Details */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-[#F8FAF9] border border-gray-200/80 text-xs">
                  <div className="space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px] block">
                      Informasi Teknisi & Jadwal
                    </span>
                    <p className="font-bold text-gray-900 flex items-center gap-1.5">
                      <Wrench className="w-3.5 h-3.5 text-[#167D5A]" />
                      {activeOrder.technicianName}
                    </p>
                    <p className="text-gray-600 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      {activeOrder.scheduleDate} jam {activeOrder.scheduleTime}
                    </p>
                    {activeOrder.notes && (
                      <p className="text-gray-500 italic">Catatan: "{activeOrder.notes}"</p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px] block">
                      Alamat Pelanggan
                    </span>
                    <p className="font-bold text-gray-900">{activeOrder.customerName} ({activeOrder.customerPhone})</p>
                    <p className="text-gray-600 flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                      <span>{activeOrder.customerAddress}</span>
                    </p>
                  </div>
                </div>

                {/* PRICEGUARD TRANSPARENCY CARD */}
                <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-white to-emerald-50/50 border-2 border-[#167D5A]/30 shadow-sm space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200/80">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-xl bg-[#167D5A] text-white flex items-center justify-center">
                        <ShieldCheck className="w-4 h-4 text-emerald-200" />
                      </div>
                      <div>
                        <h3 className="font-heading font-extrabold text-sm text-[#105C45]">
                          PriceGuard · Transparansi Biaya & Rincian Suku Cadang
                        </h3>
                        <p className="text-[11px] text-gray-500">
                          Versi Estimasi #{activeOrder.priceGuard?.version || 1} · {activeOrder.priceGuard?.customerApprovalStatus || 'Estimasi'}
                        </p>
                      </div>
                    </div>

                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-white text-[#167D5A] border border-[#167D5A]/20">
                      Anti-Mark Up
                    </span>
                  </div>

                  {/* Technician Inspection Note */}
                  {activeOrder.priceGuard?.technicianNote && (
                    <div className="p-3 rounded-xl bg-white/80 border border-emerald-100 text-xs">
                      <span className="font-bold text-[#105C45] block mb-0.5">Catatan Hasil Pemeriksaan Fisik Teknisi:</span>
                      <p className="text-gray-700 leading-relaxed italic">"{activeOrder.priceGuard.technicianNote}"</p>
                    </div>
                  )}

                  {/* Breakdown Table */}
                  <div className="bg-white rounded-xl border border-gray-200 overflow-hidden text-xs">
                    <div className="p-3 bg-gray-50 font-bold text-gray-700 grid grid-cols-12 border-b border-gray-200">
                      <span className="col-span-6">Komponen / Jenis Biaya</span>
                      <span className="col-span-2 text-center">Qty</span>
                      <span className="col-span-4 text-right">Harga Satuan / Subtotal</span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {/* Biaya Pemeriksaan */}
                      <div className="p-3 grid grid-cols-12 items-center">
                        <div className="col-span-6">
                          <span className="font-medium text-gray-900 block">Biaya Kunjungan & Pemeriksaan</span>
                          <span className="text-[10px] text-gray-400">Diagnosis menyeluruh di tempat</span>
                        </div>
                        <span className="col-span-2 text-center text-gray-500">1</span>
                        <span className="col-span-4 text-right font-medium text-gray-800">
                          Rp {activeOrder.priceGuard?.inspectionFee?.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {/* Jasa Servis */}
                      <div className="p-3 grid grid-cols-12 items-center">
                        <div className="col-span-6">
                          <span className="font-medium text-gray-900 block">Biaya Jasa Pengerjaan Servis</span>
                          <span className="text-[10px] text-gray-400">Bongkar pasang, pembersihan, pengujian</span>
                        </div>
                        <span className="col-span-2 text-center text-gray-500">1</span>
                        <span className="col-span-4 text-right font-medium text-gray-800">
                          Rp {activeOrder.priceGuard?.laborFee?.toLocaleString('id-ID')}
                        </span>
                      </div>

                      {/* Spare parts items */}
                      {activeOrder.priceGuard?.parts?.length > 0 ? (
                        activeOrder.priceGuard.parts.map((p, pIdx) => (
                          <div key={pIdx} className="p-3 grid grid-cols-12 items-center bg-emerald-50/20">
                            <div className="col-span-6">
                              <span className="font-medium text-[#105C45] block">{p.name}</span>
                              <span className="text-[10px] text-gray-400">Suku cadang orisinil / grade A</span>
                            </div>
                            <span className="col-span-2 text-center text-gray-700 font-semibold">{p.qty || 1}</span>
                            <span className="col-span-4 text-right font-medium text-gray-800">
                              Rp {(Number(p.price) * Number(p.qty || 1)).toLocaleString('id-ID')}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="p-3 text-center text-gray-400 italic">
                          Belum ada suku cadang tambahan yang dicatat teknisi
                        </div>
                      )}

                      {/* Grand Total */}
                      <div className="p-3 bg-gray-50/80 grid grid-cols-12 items-center font-bold">
                        <span className="col-span-6 text-sm text-gray-900">Total Biaya Final</span>
                        <span className="col-span-2"></span>
                        <span className="col-span-4 text-right text-base text-[#167D5A]">
                          Rp {activeOrder.priceGuard?.total?.toLocaleString('id-ID')}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PRICEGUARD CUSTOMER DECISION ACTIONS */}
                  {activeOrder.status === 'Menunggu Persetujuan Biaya' && (
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-200 space-y-3 animate-in fade-in duration-150">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 text-orange-600 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-orange-900">Persetujuan Anda Diperlukan</h4>
                          <p className="text-[11px] text-orange-800">
                            Teknisi telah menyelesaikan pemeriksaan dan mengajukan rincian biaya di atas. Pekerjaan perbaikan fisik hanya akan dimulai setelah Anda memberikan persetujuan resmi.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => setShowRejectModal(true)}
                          className="px-4 py-2 rounded-xl border border-orange-300 hover:bg-orange-100 text-orange-900 text-xs font-semibold cursor-pointer"
                        >
                          Minta Penjelasan / Tolak Biaya
                        </button>

                        <button
                          type="button"
                          onClick={() => approvePriceGuardQuote(activeOrder.id)}
                          className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
                          <span>Setujui Biaya & Lanjutkan Servis</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* If Approved */}
                  {activeOrder.priceGuard?.customerApprovalStatus === 'Disetujui Pelanggan' && (
                    <div className="p-3 rounded-xl bg-emerald-50 text-[#105C45] text-xs font-semibold flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#167D5A]" />
                      <span>Rincian biaya telah Anda setujui. Teknisi saat ini sedang melakukan proses perbaikan.</span>
                    </div>
                  )}
                </div>

                {/* PAYMENT SECTION */}
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div>
                    <span className="text-[10px] text-gray-400 uppercase font-bold block">Status Pembayaran:</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                        activeOrder.payment?.status === 'Berhasil'
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                          : 'bg-amber-100 text-amber-800 border border-amber-300'
                      }`}>
                        {activeOrder.payment?.status || 'Belum Dibayar'}
                      </span>
                      <span className="text-gray-600">Metode: {activeOrder.payment?.method}</span>
                    </div>
                  </div>

                  {activeOrder.payment?.status !== 'Berhasil' ? (
                    <button
                      type="button"
                      onClick={() => setShowPaymentModal(true)}
                      className="px-4 py-2 rounded-xl bg-[#105C45] hover:bg-[#0b3c2d] text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <CreditCard className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Bayar Tagihan Sekarang</span>
                    </button>
                  ) : (
                    <span className="text-xs font-bold text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Lunas pada {activeOrder.payment?.paidAt}
                    </span>
                  )}
                </div>

                {/* COMPLETED ACTIONS: REPAIR PASSPORT & REVIEW */}
                {activeOrder.status === 'Selesai' && (
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-6 h-6 text-[#167D5A]" />
                        <div>
                          <h4 className="font-heading font-extrabold text-sm text-[#105C45]">
                            Servis Selesai & Telah Bergaransi Resmi Digital!
                          </h4>
                          <p className="text-[11px] text-gray-600">
                            Repair Passport telah aktif dan <strong>+50 Poin Circular Reward</strong> telah dikreditkan ke dompet Anda.
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => setActiveTab('passports')}
                        className="px-3 py-1.5 rounded-lg bg-white border border-[#167D5A]/30 text-[#167D5A] hover:bg-emerald-50 text-xs font-bold flex items-center gap-1 cursor-pointer"
                      >
                        <span>Lihat Passport</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Review Button if not yet reviewed */}
                    <div className="pt-2 border-t border-emerald-100 flex items-center justify-between">
                      {activeOrder.rating ? (
                        <div className="text-xs">
                          <span className="font-bold text-gray-800">Ulasan Anda: </span>
                          <span className="text-amber-600 font-bold">★ {activeOrder.rating.stars}</span>
                          <p className="text-gray-600 italic mt-0.5">"{activeOrder.rating.comment}"</p>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setReviewOrderTarget(activeOrder)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs flex items-center gap-1.5 cursor-pointer"
                        >
                          <Star className="w-4 h-4 fill-white" />
                          <span>Beri Ulasan (+10 Poin)</span>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Order Footer Controls */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <button
                    type="button"
                    onClick={() => setComplaintOrderTarget(activeOrder)}
                    className="text-red-600 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <AlertCircle className="w-3.5 h-3.5 text-red-500" />
                    <span>Ada Kendala? Ajukan Pengaduan</span>
                  </button>

                  <span className="text-gray-400 text-[11px]">
                    Garansi REPAIRIN 360 menjamin kepatuhan teknisi
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Reject / Clarification Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-gray-900">Minta Klarifikasi / Tolak Biaya</h3>
            <p className="text-xs text-gray-600">
              Tuliskan alasan penolakan atau komponen biaya yang ingin Anda tanyakan kembali kepada teknisi:
            </p>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              placeholder="Contoh: Apakah biaya suku cadang thermal fuse bisa menggunakan merk orisinil alternatif?"
              className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-orange-500"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowRejectModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  rejectPriceGuardQuote(activeOrder.id, rejectReason || 'Pelanggan meminta revisi estimasi');
                  setShowRejectModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-bold"
              >
                Kirim ke Teknisi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Payment Simulation Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl">
            <h3 className="font-heading font-bold text-lg text-gray-900">Pembayaran Tagihan Servis</h3>
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Tagihan PriceGuard:</span>
                <span className="font-bold text-gray-900">
                  Rp {activeOrder.priceGuard?.total?.toLocaleString('id-ID')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Nomor Pesanan:</span>
                <span className="font-mono">{activeOrder.id}</span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Pilih Metode Pembayaran</label>
              <select
                value={selectedPaymentMethod}
                onChange={e => setSelectedPaymentMethod(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 p-2.5 bg-white font-medium outline-hidden"
              >
                <option value="Transfer Bank (BCA Virtual Account)">Transfer BCA Virtual Account</option>
                <option value="Transfer Bank (Mandiri)">Transfer Mandiri Livin</option>
                <option value="QRIS / GoPay / OVO">QRIS Standar Nasional</option>
                <option value="Tunai kepada Teknisi">Tunai Langsung kepada Teknisi di Tempat</option>
              </select>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 text-[#105C45] text-xs">
              <span className="font-bold block mb-0.5">Informasi Pembayaran:</span>
              <p>Pembayaran akan diverifikasi secara otomatis dan tercatat pada buku kas sistem.</p>
            </div>

            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setShowPaymentModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  simulatePayment(activeOrder.id, selectedPaymentMethod);
                  setShowPaymentModal(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Konfirmasi Bayar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Modal */}
      {reviewOrderTarget && (
        <ReviewModal
          order={reviewOrderTarget}
          onClose={() => setReviewOrderTarget(null)}
        />
      )}

      {/* Complaint Modal */}
      {complaintOrderTarget && (
        <ComplaintModal
          order={complaintOrderTarget}
          onClose={() => setComplaintOrderTarget(null)}
        />
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import { 
  Inbox, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  MapPin, 
  Phone, 
  Calendar, 
  Clock, 
  User, 
  Wrench, 
  AlertTriangle 
} from 'lucide-react';

export default function ServiceRequestsView({ setActiveTab }) {
  const { orders, updateOrderStatus, activeTechnicianId, technicians } = useApp();
  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  // Requests assigned to this technician
  const myRequests = orders.filter(
    o => o.technicianId === currentTech.id && o.status === 'Menunggu Konfirmasi'
  );

  const [rejectingOrderId, setRejectingOrderId] = useState(null);
  const [rejectReason, setRejectReason] = useState('Slot jadwal servis penuh pada jam tersebut');

  const handleAccept = (orderId) => {
    updateOrderStatus(orderId, 'Diterima Teknisi');
    alert(`Pesanan ${orderId} berhasil DITERIMA. Pelanggan telah dinotifikasi dan pesanan masuk ke jadwal servis Anda.`);
  };

  const handleReject = (orderId) => {
    updateOrderStatus(orderId, 'Ditolak Teknisi', { rejectionReason: rejectReason });
    setRejectingOrderId(null);
    alert(`Pesanan ${orderId} telah ditolak.`);
  };

  return (
    <div className="space-y-6 pb-16">
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <Inbox className="w-4 h-4 text-[#167D5A]" />
            <span>Manajemen Permintaan Servis Masuk</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Permintaan Servis Pelanggan
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Tinjau detail kerusakan, hasil pra-diagnosis SmartCheck, alamat, dan konfirmasi penerimaan pesanan.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold">
          {myRequests.length} Permintaan Baru
        </span>
      </div>

      {myRequests.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500 space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="font-heading font-bold text-gray-800 text-base">Tidak Ada Permintaan Menunggu</h3>
          <p className="text-xs">Semua permintaan servis telah Anda tanggapi. Pekerjaan aktif dapat dilihat di menu Workspace Perbaikan.</p>
          <button
            onClick={() => setActiveTab('tech-workspace')}
            className="px-4 py-2 rounded-xl bg-[#167D5A] text-white text-xs font-bold cursor-pointer"
          >
            Lihat Workspace Perbaikan →
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myRequests.map(req => (
            <div
              key={req.id}
              className="bg-white rounded-3xl p-6 border-2 border-amber-200 shadow-sm space-y-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 pb-3 border-b border-gray-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-400">{req.id}</span>
                    <span className="text-xs text-gray-400">· Diajukan pada {req.createdAt}</span>
                  </div>
                  <h3 className="font-heading font-bold text-lg sm:text-xl text-gray-900 mt-0.5">
                    {req.brand} {req.model} ({req.category})
                  </h3>
                </div>
                <StatusBadge status={req.status} size="md" />
              </div>

              {/* Customer & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Identitas Pelanggan & Alamat:</span>
                  <p className="font-bold text-gray-900 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-gray-500" />
                    {req.customerName}
                  </p>
                  <p className="text-gray-600 flex items-center gap-1.5 font-mono">
                    <Phone className="w-3.5 h-3.5 text-gray-400" />
                    {req.customerPhone}
                  </p>
                  <p className="text-gray-600 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 shrink-0 mt-0.5" />
                    <span>{req.customerAddress}</span>
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-1.5">
                  <span className="text-[10px] uppercase font-bold text-gray-400 block">Jadwal yang Diminta:</span>
                  <p className="font-bold text-[#167D5A] flex items-center gap-1.5 text-sm">
                    <Calendar className="w-4 h-4 text-[#167D5A]" />
                    {req.scheduleDate} jam {req.scheduleTime}
                  </p>
                  <p className="text-gray-600">Catatan Pelanggan: "{req.notes || '-'}"</p>
                  <p className="text-gray-600">Estimasi Ongkos Cek Awal: <strong>Rp {req.priceGuard?.inspectionFee?.toLocaleString('id-ID')}</strong></p>
                </div>
              </div>

              {/* SmartCheck Diagnostic Pre-findings */}
              {req.smartCheckSummary && (
                <div className="p-4 rounded-2xl bg-[#E5F3EC] border border-[#167D5A]/30 text-xs space-y-1.5">
                  <div className="flex items-center gap-1.5 font-bold text-[#105C45]">
                    <Sparkles className="w-4 h-4 text-[#167D5A]" />
                    <span>Hasil Pra-Diagnosis SmartCheck Pelanggan:</span>
                  </div>
                  <p className="text-gray-700">
                    <strong>Penyebab Terindikasi:</strong> {req.smartCheckSummary.probableCause}
                  </p>
                  {req.smartCheckSummary.safetyAlert && (
                    <p className="text-red-700 font-medium">
                      ⚠️ Catatan Keselamatan: {req.smartCheckSummary.safetyAlert}
                    </p>
                  )}
                </div>
              )}

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setRejectingOrderId(req.id)}
                  className="px-4 py-2.5 rounded-xl border border-red-300 text-red-700 hover:bg-red-50 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Tolak Permintaan</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAccept(req.id)}
                  className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md shadow-[#167D5A]/25 transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Terima & Jadwalkan Kunjungan</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Reject Modal Dialog */}
      {rejectingOrderId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-gray-900">Alasan Penolakan Servis</h3>
            <p className="text-xs text-gray-600">Pilih atau tulis alasan penolakan pesanan ini:</p>
            <select
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden"
            >
              <option value="Slot jadwal servis penuh pada jam tersebut">Slot jadwal servis penuh pada jam tersebut</option>
              <option value="Alamat pelanggan berada di luar jangkauan operasional hari ini">Alamat pelanggan di luar jangkauan operasional</option>
              <option value="Suku cadang khusus perangkat ini sedang kosong">Suku cadang khusus sedang kosong</option>
            </select>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setRejectingOrderId(null)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => handleReject(rejectingOrderId)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Konfirmasi Tolak
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

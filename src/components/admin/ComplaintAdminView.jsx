import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Send, 
  User, 
  Wrench, 
  FileText,
  ShieldCheck
} from 'lucide-react';

export default function ComplaintAdminView() {
  const { complaints, updateComplaintStatus } = useApp();
  const [selectedComplaintId, setSelectedComplaintId] = useState(complaints[0]?.id || null);

  const activeComplaint = complaints.find(c => c.id === selectedComplaintId) || complaints[0];

  const [responseNotes, setResponseNotes] = useState(activeComplaint?.adminNotes || '');
  const [status, setStatus] = useState(activeComplaint?.status || 'Sedang Diproses');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    if (activeComplaint) {
      updateComplaintStatus(activeComplaint.id, status, responseNotes);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 2000);
    }
  };

  const getStatusBadge = (st) => {
    switch (st) {
      case 'Menunggu':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-300">Menunggu</span>;
      case 'Sedang Diproses':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800 border border-blue-300">Sedang Diproses</span>;
      case 'Selesai':
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">Selesai / Damai</span>;
      default:
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-gray-100 text-gray-800">{st}</span>;
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-red-600">
            <AlertTriangle className="w-4 h-4 text-red-600" />
            <span>Pusat Resolusi Masalah & Mediasi Layanan</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Penanganan Pengaduan & Perselisihan
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Tinjau laporan pelanggan, lakukan mediasi dengan teknisi bertugas, dan berikan penyelesaian adil.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-red-50 text-red-800 border border-red-200">
          {complaints.length} Laporan Masuk
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Complaints List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 px-1">
            Daftar Tiket Pengaduan
          </h3>

          {complaints.length === 0 ? (
            <p className="text-xs text-gray-400 py-8 text-center italic bg-white rounded-2xl p-6 border border-gray-200">
              Tidak ada pengaduan aktif.
            </p>
          ) : (
            complaints.map(c => {
              const isSelected = c.id === activeComplaint?.id;

              return (
                <div
                  key={c.id}
                  onClick={() => {
                    setSelectedComplaintId(c.id);
                    setResponseNotes(c.adminNotes || '');
                    setStatus(c.status);
                  }}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-red-500 shadow-md ring-2 ring-red-500/15'
                      : 'bg-white border-gray-200/80 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="font-mono text-[10px] font-bold text-gray-400">{c.id}</span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                        {c.category}
                      </h4>
                    </div>
                    {getStatusBadge(c.status)}
                  </div>

                  <p className="text-xs text-gray-600 line-clamp-2 mb-2 italic">
                    "{c.description}"
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                    <span>Oleh: {c.customerName}</span>
                    <span className="font-mono">{c.orderId}</span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Investigation & Resolution Detail (7 cols) */}
        {activeComplaint && (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="font-mono text-xs text-gray-400 font-bold">{activeComplaint.id}</span>
                <h3 className="font-heading font-extrabold text-lg text-gray-900 mt-0.5">
                  {activeComplaint.category}
                </h3>
                <p className="text-xs text-gray-500">Terkait Pesanan: <strong>{activeComplaint.orderId}</strong> · Tanggal: {activeComplaint.createdAt}</p>
              </div>
              {getStatusBadge(activeComplaint.status)}
            </div>

            {/* Parties involved */}
            <div className="grid grid-cols-2 gap-3 text-xs p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Pelapor (Pelanggan)</span>
                <p className="font-bold text-gray-900">{activeComplaint.customerName}</p>
              </div>
              <div>
                <span className="text-[10px] text-gray-400 uppercase font-bold block">Terlapor (Teknisi)</span>
                <p className="font-bold text-gray-900">{activeComplaint.technicianName}</p>
              </div>
            </div>

            {/* Complaint details */}
            <div className="p-4 rounded-2xl bg-red-50/60 border border-red-200 text-xs space-y-1">
              <span className="font-bold text-red-900 block">Keterangan Pelanggan:</span>
              <p className="text-gray-800 leading-relaxed italic">
                "{activeComplaint.description}"
              </p>
            </div>

            {/* Admin Response & Action Form */}
            <form onSubmit={handleUpdate} className="space-y-4 text-xs pt-2">
              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Ubah Status Penanganan Tiket
                </label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] bg-white font-medium"
                >
                  <option value="Menunggu">Menunggu Bukti Tambahan</option>
                  <option value="Sedang Diproses">Sedang Diproses (Mediasi ke Teknisi)</option>
                  <option value="Menunggu Informasi">Menunggu Respons Pelanggan</option>
                  <option value="Selesai">Selesai (Kasus Ditutup / Refund Diberikan)</option>
                  <option value="Ditolak">Ditolak (Laporan Tidak Sesuai Fakta)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">
                  Catatan Mediasi & Keputusan Administrator
                </label>
                <textarea
                  rows={3}
                  value={responseNotes}
                  onChange={e => setResponseNotes(e.target.value)}
                  placeholder="Tuliskan hasil investigasi, nota toko, atau instruksi pengembalian dana..."
                  className="w-full rounded-xl border border-gray-300 p-3 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                {savedSuccess ? (
                  <span className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Status pengaduan diperbarui!
                  </span>
                ) : <span></span>}

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <Send className="w-4 h-4" />
                  <span>Simpan Tindakan Mediasi</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

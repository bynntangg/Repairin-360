import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  FileCheck, 
  CheckCircle2, 
  XCircle, 
  ShieldAlert, 
  MapPin, 
  Star, 
  FileText, 
  AlertCircle,
  Eye,
  Check,
  X
} from 'lucide-react';

export default function TechVerificationView() {
  const { technicians, verifyTechnician } = useApp();
  const [selectedTech, setSelectedTech] = useState(technicians.find(t => !t.verified) || technicians[0]);
  const [rejectReasonModal, setRejectReasonModal] = useState(false);
  const [rejectReason, setRejectReason] = useState('Berkas sertifikat keahlian belum terdaftar di lembaga resmi');

  const pendingCount = technicians.filter(t => !t.verified).length;

  const handleApprove = (techId) => {
    verifyTechnician(techId, true);
    alert(`Teknisi ${techId} BERHASIL diverifikasi! Akun kini berstatus aktif dan muncul pada pencarian SmartMatch pelanggan.`);
  };

  const handleReject = (techId) => {
    verifyTechnician(techId, false, rejectReason);
    setRejectReasonModal(false);
    alert(`Pendaftaran teknisi ${techId} ditolak.`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <FileCheck className="w-4 h-4 text-[#167D5A]" />
            <span>Kepatuhan & Sertifikasi Teknisi</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Verifikasi Calon Teknisi Servis
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Periksa dokumen identitas KTP, sertifikat BNSP/Balai Kerja, dan rekam jejak pengalaman sebelum memberikan badge terverifikasi.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-full text-xs font-bold bg-amber-50 text-amber-800 border border-amber-200">
          {pendingCount} Menunggu Verifikasi
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Technicians List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 px-1">
            Daftar Teknisi Platform
          </h3>

          {technicians.map(tech => {
            const isSelected = tech.id === selectedTech?.id;

            return (
              <div
                key={tech.id}
                onClick={() => setSelectedTech(tech)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#167D5A] shadow-md ring-2 ring-[#167D5A]/20'
                    : 'bg-white border-gray-200/80 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img src={tech.avatar} alt={tech.name} className="w-12 h-12 rounded-xl object-cover" />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">{tech.name}</h4>
                        {tech.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#167D5A]" />}
                      </div>
                      <p className="text-[11px] text-gray-500">{tech.title}</p>
                      <p className="text-[10px] text-gray-400 font-mono mt-0.5">ID: {tech.id}</p>
                    </div>
                  </div>

                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    tech.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800 animate-pulse'
                  }`}>
                    {tech.verified ? 'Terverifikasi' : 'Pending Review'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right: Document Inspection & Decision Pane (7 cols) */}
        {selectedTech && (
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <img src={selectedTech.avatar} alt={selectedTech.name} className="w-16 h-16 rounded-2xl object-cover ring-2 ring-gray-100" />
                <div>
                  <h3 className="font-heading font-extrabold text-lg text-gray-900">{selectedTech.name}</h3>
                  <p className="text-xs text-gray-500">{selectedTech.title} · {selectedTech.phone}</p>
                  <p className="text-xs text-gray-600 mt-1 font-semibold">Pengalaman: {selectedTech.experienceYears} Tahun</p>
                </div>
              </div>

              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                selectedTech.verified ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {selectedTech.verified ? 'Aktif' : 'Menunggu Keputusan'}
              </span>
            </div>

            {/* Specialties & Areas */}
            <div className="space-y-2 text-xs">
              <span className="font-bold uppercase tracking-wider text-gray-400 text-[10px] block">
                Keahlian & Area Jangkauan:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {selectedTech.specialties.map(s => (
                  <span key={s} className="px-2.5 py-1 rounded-lg bg-gray-100 text-gray-700 font-medium">
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-gray-500 mt-1">Area: {selectedTech.serviceAreas.join(', ')}</p>
            </div>

            {/* Document Inspection Checklist */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Dokumen yang Dilampirkan Pelamar
              </h4>

              <div className="space-y-2 text-xs">
                {selectedTech.documents.map((doc, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <FileCheck className="w-4 h-4 text-gray-500" />
                      <div>
                        <span className="font-bold text-gray-900 block">{doc.name}</span>
                        <span className="text-[10px] text-gray-400">Tanggal Upload: {doc.date}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => alert(`Simulasi pratinjau dokumen: ${doc.name} telah dibuka.`)}
                      className="px-3 py-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 text-xs font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-gray-500" />
                      <span>Lihat Berkas</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Admin Decision Actions */}
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              {selectedTech.verified ? (
                <button
                  type="button"
                  onClick={() => verifyTechnician(selectedTech.id, false, 'Akun ditangguhkan sementara oleh Admin.')}
                  className="px-4 py-2 rounded-xl border border-red-300 hover:bg-red-50 text-red-700 text-xs font-bold cursor-pointer"
                >
                  Tangguhkan Akun (Suspend)
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setRejectReasonModal(true)}
                  className="px-4 py-2.5 rounded-xl border border-red-300 hover:bg-red-50 text-red-700 text-xs font-bold cursor-pointer flex items-center gap-1"
                >
                  <X className="w-4 h-4" />
                  <span>Tolak Aplikasi</span>
                </button>
              )}

              {!selectedTech.verified && (
                <button
                  type="button"
                  onClick={() => handleApprove(selectedTech.id)}
                  className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md shadow-[#167D5A]/25 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Setujui & Verifikasi Resmi</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Reject Modal */}
      {rejectReasonModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-gray-900">Alasan Penolakan Verifikasi</h3>
            <textarea
              rows={3}
              value={rejectReason}
              onChange={e => setRejectReason(e.target.value)}
              className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                onClick={() => setRejectReasonModal(false)}
                className="px-3 py-1.5 text-xs font-semibold text-gray-600"
              >
                Batal
              </button>
              <button
                onClick={() => handleReject(selectedTech.id)}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Kirim Penolakan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

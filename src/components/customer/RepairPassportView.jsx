import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ShieldCheck, 
  QrCode, 
  Calendar, 
  Wrench, 
  Leaf, 
  ExternalLink, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  FileText, 
  Printer, 
  Tag, 
  X,
  History,
  Layers
} from 'lucide-react';

export default function RepairPassportView() {
  const { repairPassports, claimWarranty } = useApp();
  const [selectedPassportCode, setSelectedPassportCode] = useState(repairPassports[0]?.passportCode || null);
  const [showClaimModal, setShowClaimModal] = useState(false);
  const [claimIssue, setClaimIssue] = useState('');
  const [claimSuccess, setClaimSuccess] = useState(false);

  const activePassport = repairPassports.find(p => p.passportCode === selectedPassportCode) || repairPassports[0];

  const handleClaim = (e) => {
    e.preventDefault();
    if (!claimIssue.trim()) {
      alert('Tuliskan kendala yang dialami untuk klaim garansi.');
      return;
    }
    claimWarranty(activePassport.passportCode, claimIssue);
    setClaimSuccess(true);
    setTimeout(() => {
      setShowClaimModal(false);
      setClaimSuccess(false);
      setClaimIssue('');
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <ShieldCheck className="w-4 h-4 text-[#167D5A]" />
            <span>Fitur Utama 4 · Digital Repair History</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Repair Passport & Garansi Digital
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Dokumentasi identitas digital barang, riwayat suku cadang pengganti, dan sertifikat garansi resmi terlindungi.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#E5F3EC] text-[#105C45] px-4 py-2 rounded-2xl text-xs font-bold border border-[#167D5A]/20">
          <Leaf className="w-4 h-4 text-[#167D5A]" />
          <span>{repairPassports.length} Perangkat Terdaftar</span>
        </div>
      </div>

      {repairPassports.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500 space-y-3">
          <ShieldCheck className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-heading font-bold text-gray-800 text-base">Belum Ada Repair Passport Aktif</h3>
          <p className="text-xs">
            Repair Passport digital akan otomatis dibuat setelah pesanan servis selesai dikerjakan oleh teknisi.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Passport Cards Selector */}
          <div className="space-y-3">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 px-1">
              Daftar Barang Milik Anda
            </h3>

            {repairPassports.map(p => {
              const isSelected = p.passportCode === activePassport?.passportCode;
              return (
                <div
                  key={p.passportCode}
                  onClick={() => setSelectedPassportCode(p.passportCode)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#167D5A] shadow-md ring-2 ring-[#167D5A]/15'
                      : 'bg-white border-gray-200/80 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {p.passportCode}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-gray-900 mt-1">
                        {p.itemName}
                      </h4>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full">
                      Garansi {p.warranty?.status || 'Aktif'}
                    </span>
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                    Kategori: {p.itemCategory} · Tahun: {p.purchaseYear}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-2 border-t border-gray-100">
                    <span>Servis: {p.repairDate}</span>
                    <span className="font-semibold text-gray-700">Rp {p.totalCost.toLocaleString('id-ID')}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Full Digital Passport Sheet */}
          {activePassport && (
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-3xl border-2 border-emerald-800/10 shadow-xl overflow-hidden">
                {/* Passport Top Certificate Header */}
                <div className="bg-gradient-to-r from-[#105C45] via-[#167D5A] to-[#1e8a64] text-white p-6 sm:p-8 flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-emerald-200 bg-white/10 px-2.5 py-0.5 rounded-full">
                        Official Digital Certificate
                      </span>
                      <span className="text-xs font-semibold text-white/80">REPAIRIN 360 Ecosystem</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight text-white">
                      REPAIR PASSPORT
                    </h2>
                    <p className="text-xs text-emerald-100 font-mono">Kode Passport: <strong>{activePassport.passportCode}</strong></p>
                  </div>

                  {/* Simulated QR Code Badge */}
                  <div className="bg-white p-3 rounded-2xl shadow-lg flex flex-col items-center justify-center text-center">
                    <QrCode className="w-16 h-16 text-gray-800" />
                    <span className="text-[9px] font-mono text-gray-500 mt-1 uppercase font-semibold">Scan Verifikasi</span>
                  </div>
                </div>

                {/* Passport Content Body */}
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Item Identity Specs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Merek / Seri</span>
                      <span className="font-bold text-gray-900">{activePassport.brand} {activePassport.model}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Kategori Barang</span>
                      <span className="font-bold text-gray-900">{activePassport.itemCategory}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Nomor Seri Unit</span>
                      <span className="font-mono font-semibold text-gray-700">{activePassport.serialNumber}</span>
                    </div>
                    <div>
                      <span className="text-gray-400 block text-[10px] uppercase font-bold">Pemilik Terdaftar</span>
                      <span className="font-bold text-gray-900">{activePassport.customerName}</span>
                    </div>
                  </div>

                  {/* Repair Log & Action Taken */}
                  <div className="space-y-3">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                      <History className="w-3.5 h-3.5 text-[#167D5A]" />
                      Riwayat Rekam Medis Servis
                    </h3>

                    <div className="p-4 rounded-2xl border border-gray-200/80 bg-[#F9FBFA] space-y-3 text-xs">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-200">
                        <div>
                          <span className="text-gray-500">Tanggal Servis: </span>
                          <span className="font-bold text-gray-900">{activePassport.repairDate}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Teknisi Pelaksana: </span>
                          <span className="font-bold text-[#167D5A]">{activePassport.technicianName}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Nomor Pesanan: </span>
                          <span className="font-mono text-gray-700">{activePassport.orderId}</span>
                        </div>
                      </div>

                      <div>
                        <span className="font-bold text-gray-700 block mb-0.5">Keluhan Awal:</span>
                        <p className="text-gray-600 leading-relaxed italic">"{activePassport.initialDiagnosis}"</p>
                      </div>

                      <div>
                        <span className="font-bold text-gray-700 block mb-0.5">Tindakan Perbaikan Fisik:</span>
                        <p className="text-gray-800 leading-relaxed">{activePassport.actionTaken}</p>
                      </div>

                      {/* Before / After Photo Documentation */}
                      <div className="pt-2 border-t border-gray-200">
                        <span className="font-bold text-gray-700 block mb-2">Dokumentasi Foto Fisik Servis:</span>
                        <div className="grid grid-cols-2 gap-3">
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-gray-500 block">Kondisi Sebelum Servis:</span>
                            <div className="rounded-xl overflow-hidden border border-gray-200 h-28 bg-gray-100">
                              <img src={activePassport.beforePhoto} alt="Sebelum Servis" className="w-full h-full object-cover" />
                            </div>
                          </div>
                          <div className="space-y-1">
                            <span className="text-[10px] uppercase font-bold text-emerald-700 block">Kondisi Setelah Servis (Selesai):</span>
                            <div className="rounded-xl overflow-hidden border border-emerald-300 h-28 bg-emerald-50">
                              <img src={activePassport.afterPhoto} alt="Setelah Servis" className="w-full h-full object-cover" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Replaced Components Table */}
                  <div className="space-y-2">
                    <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5 text-blue-600" />
                      Komponen Suku Cadang yang Diganti & Terjamin
                    </h3>

                    <div className="border border-gray-200 rounded-xl overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-gray-200 text-gray-600">
                          <tr>
                            <th className="p-3 font-semibold">Nama Suku Cadang</th>
                            <th className="p-3 font-semibold">Kode Part Seri</th>
                            <th className="p-3 font-semibold text-right">Durasi Jaminan</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {activePassport.replacedComponents.map((c, i) => (
                            <tr key={i} className="hover:bg-gray-50">
                              <td className="p-3 font-medium text-gray-900">{c.name}</td>
                              <td className="p-3 font-mono text-gray-500">{c.serial}</td>
                              <td className="p-3 text-right font-bold text-emerald-700">{c.warrantyDays} Hari Kalender</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Digital Warranty Certificate Box */}
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-300 shadow-xs space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-amber-200">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-amber-700" />
                        <div>
                          <h4 className="font-heading font-bold text-sm text-amber-900">
                            Sertifikat Garansi Digital ({activePassport.warranty?.durationDays || 90} Hari)
                          </h4>
                          <span className="text-[11px] font-mono text-amber-800">
                            No. Garansi: {activePassport.warranty?.warrantyCode}
                          </span>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-emerald-600 text-white shadow-xs">
                        Status: {activePassport.warranty?.status || 'Aktif'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-amber-950">
                      <div>
                        <span className="text-amber-800/80 block text-[10px] uppercase font-bold">Masa Berlaku Garansi</span>
                        <p className="font-semibold">{activePassport.warranty?.startDate} s.d. {activePassport.warranty?.endDate}</p>
                      </div>
                      <div>
                        <span className="text-amber-800/80 block text-[10px] uppercase font-bold">Komponen Terjamin</span>
                        <p className="font-semibold">{activePassport.warranty?.coveredComponents}</p>
                      </div>
                    </div>

                    <p className="text-[11px] text-amber-900/80 italic leading-relaxed pt-1">
                      Ketentuan: "{activePassport.warranty?.terms}"
                    </p>

                    {/* Warranty Claim Status or Button */}
                    <div className="pt-2 border-t border-amber-200 flex items-center justify-between">
                      {activePassport.warranty?.claimStatus ? (
                        <div className="text-xs text-amber-900 font-bold flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-amber-700 animate-pulse" />
                          <span>Status Klaim: {activePassport.warranty.claimStatus} ({activePassport.warranty.lastClaimDate})</span>
                        </div>
                      ) : (
                        <div className="text-[11px] text-amber-800">
                          Mengalami masalah yang sama selama masa garansi?
                        </div>
                      )}

                      {!activePassport.warranty?.claimStatus && (
                        <button
                          type="button"
                          onClick={() => setShowClaimModal(true)}
                          className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
                        >
                          Klaim Garansi Bebas Biaya
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Circular Impact Contribution Badge */}
                  <div className="p-4 rounded-2xl bg-[#E5F3EC] border border-[#167D5A]/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#105C45]">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#167D5A] text-white flex items-center justify-center shrink-0">
                        <Leaf className="w-5 h-5 text-emerald-200" />
                      </div>
                      <div>
                        <h4 className="font-heading font-bold text-xs text-[#105C45]">Dampak Sirkular dari Keputusan Anda</h4>
                        <p className="text-gray-600 text-[11px]">
                          Dengan memilih reparasi daripada beli baru, Anda mencegah timbulan limbah elektronik dan emisi manufaktur:
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 font-mono font-bold text-xs whitespace-nowrap">
                      <span>🌱 -{activePassport.carbonSavedKg} kg CO₂</span>
                      <span>♻️ {activePassport.eWasteDivertedKg} kg E-Waste</span>
                    </div>
                  </div>
                </div>

                {/* Footer Controls: Print / Export */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex items-center justify-between text-xs text-gray-500">
                  <span>Tercatat aman pada REPAIRIN Audit Trail Database</span>
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold flex items-center gap-1.5 cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Cetak Kartu Passport</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Claim Modal */}
      {showClaimModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-gray-900">Ajukan Klaim Garansi Digital</h3>
            <p className="text-xs text-gray-600">
              Klaim garansi bebas biaya pemeriksaan ulang untuk komponen yang dicakup pada Repair Passport <strong>{activePassport.passportCode}</strong>.
            </p>

            <form onSubmit={handleClaim} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 mb-1">
                  Deskripsi Kerusakan Berulang <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={claimIssue}
                  onChange={e => setClaimIssue(e.target.value)}
                  placeholder="Contoh: Kipas angin kembali berputar pelan setelah 2 minggu servis..."
                  className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-amber-500"
                  required
                />
              </div>

              {claimSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-semibold text-center">
                  ✓ Klaim berhasil diajukan dan dijadwalkan ke teknisi!
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowClaimModal(false)}
                    className="px-3 py-1.5 text-xs font-semibold text-gray-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md cursor-pointer"
                  >
                    Kirim Klaim
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

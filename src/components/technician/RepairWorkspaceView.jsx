import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import { 
  Wrench, 
  ShieldCheck, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  DollarSign, 
  Camera, 
  Upload,
  User,
  MapPin,
  Calendar,
  AlertCircle
} from 'lucide-react';

export default function RepairWorkspaceView() {
  const { 
    orders, 
    updateOrderStatus, 
    updatePriceGuardQuote, 
    activeTechnicianId, 
    technicians 
  } = useApp();

  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  // Active jobs for this technician (not completed and not cancelled)
  const activeJobs = orders.filter(
    o => o.technicianId === currentTech.id && o.status !== 'Selesai' && o.status !== 'Dibatalkan'
  );

  const [selectedJobId, setSelectedJobId] = useState(activeJobs[0]?.id || null);

  const currentJob = orders.find(o => o.id === selectedJobId) || activeJobs[0] || null;

  // PriceGuard builder local state
  const [inspectionFee, setInspectionFee] = useState(currentJob?.priceGuard?.inspectionFee || currentTech.baseInspectionFee);
  const [laborFee, setLaborFee] = useState(currentJob?.priceGuard?.laborFee || 50000);
  const [parts, setParts] = useState(currentJob?.priceGuard?.parts || []);
  const [additionalFee, setAdditionalFee] = useState(currentJob?.priceGuard?.additionalFee || 0);
  const [technicianNote, setTechnicianNote] = useState(currentJob?.priceGuard?.technicianNote || '');

  // Add new part row
  const [newPartName, setNewPartName] = useState('');
  const [newPartQty, setNewPartQty] = useState(1);
  const [newPartPrice, setNewPartPrice] = useState(25000);

  // Sync state when switching job
  const handleSelectJob = (job) => {
    setSelectedJobId(job.id);
    setInspectionFee(job.priceGuard?.inspectionFee || currentTech.baseInspectionFee);
    setLaborFee(job.priceGuard?.laborFee || 50000);
    setParts(job.priceGuard?.parts || []);
    setAdditionalFee(job.priceGuard?.additionalFee || 0);
    setTechnicianNote(job.priceGuard?.technicianNote || '');
  };

  const handleAddPart = () => {
    if (!newPartName.trim()) {
      alert('Tuliskan nama suku cadang.');
      return;
    }
    setParts(prev => [
      ...prev,
      { name: newPartName, qty: Number(newPartQty), price: Number(newPartPrice) }
    ]);
    setNewPartName('');
    setNewPartQty(1);
    setNewPartPrice(25000);
  };

  const handleRemovePart = (index) => {
    setParts(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    const partsTotal = parts.reduce((acc, p) => acc + (Number(p.price) * Number(p.qty || 1)), 0);
    return Number(inspectionFee) + Number(laborFee) + partsTotal + Number(additionalFee);
  };

  const handleSendPriceGuardQuote = () => {
    if (!technicianNote.trim()) {
      alert('Mohon isi catatan hasil pemeriksaan fisik perangkat.');
      return;
    }

    updatePriceGuardQuote(currentJob.id, {
      inspectionFee,
      laborFee,
      parts,
      additionalFee,
      technicianNote
    });

    alert('Estimasi PriceGuard berhasil dikirim! Status pesanan kini "Menunggu Persetujuan Biaya" dari pelanggan.');
  };

  const handleAdvanceStatus = (nextStatus) => {
    updateOrderStatus(currentJob.id, nextStatus);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <Wrench className="w-4 h-4 text-[#167D5A]" />
            <span>Workspace Pengerjaan & PriceGuard Builder</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Workspace Teknisi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Input hasil pemeriksaan fisik, susun kalkulasi suku cadang PriceGuard, minta persetujuan, dan selesaikan pesanan bergaransi.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#E5F3EC] text-[#105C45] border border-[#167D5A]/20">
          {activeJobs.length} Pekerjaan Aktif
        </span>
      </div>

      {activeJobs.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500 space-y-3">
          <Wrench className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-heading font-bold text-gray-800 text-base">Tidak Ada Pekerjaan Aktif</h3>
          <p className="text-xs">Terima permintaan baru pada menu Permintaan Masuk untuk memulai pekerjaan.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Job Selector (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 px-1">
              Pilih Pekerjaan Aktif
            </h3>

            {activeJobs.map(job => {
              const isSelected = job.id === currentJob?.id;

              return (
                <div
                  key={job.id}
                  onClick={() => handleSelectJob(job)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#167D5A] shadow-md ring-2 ring-[#167D5A]/20'
                      : 'bg-white border-gray-200/80 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <span className="text-[10px] font-mono text-gray-400 font-bold">{job.id}</span>
                      <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">
                        {job.brand} {job.model}
                      </h4>
                    </div>
                    <StatusBadge status={job.status} size="sm" />
                  </div>

                  <p className="text-xs text-gray-500 line-clamp-1 mb-2">
                    {job.customerName} · {job.scheduleDate}
                  </p>

                  <div className="flex items-center justify-between text-[11px] pt-2 border-t border-gray-100">
                    <span className="text-gray-400">{job.scheduleTime}</span>
                    <span className="font-bold text-[#167D5A]">
                      Rp {job.priceGuard?.total?.toLocaleString('id-ID') || '40.000'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Active Workspace Detail (8 cols) */}
          {currentJob && (
            <div className="lg:col-span-8 space-y-6">
              {/* Job Details Card */}
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
                {/* Header */}
                <div className="flex flex-wrap items-start justify-between gap-3 pb-4 border-b border-gray-100">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-gray-400">{currentJob.id}</span>
                      <span className="text-xs text-gray-500">· {currentJob.createdAt}</span>
                    </div>
                    <h2 className="font-heading font-extrabold text-xl text-gray-900 mt-1">
                      {currentJob.brand} {currentJob.model} ({currentJob.category})
                    </h2>
                    <p className="text-xs text-gray-600 mt-0.5">Keluhan Awal: {currentJob.itemDescription}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-gray-400 block mb-1">Status Pengerjaan</span>
                    <StatusBadge status={currentJob.status} size="md" />
                  </div>
                </div>

                {/* Workflow Stepper Controls for Technician */}
                <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-gray-200 space-y-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold uppercase tracking-wider text-gray-500">
                      Perbarui Tahapan Status Servis:
                    </span>
                    <span className="text-[11px] text-[#167D5A] font-semibold">
                      Pelanggan langsung menerima update
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {currentJob.status === 'Diterima Teknisi' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus('Menunggu Jadwal')}
                        className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Set: Menunggu Jadwal
                      </button>
                    )}

                    {(currentJob.status === 'Diterima Teknisi' || currentJob.status === 'Menunggu Jadwal') && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus('Teknisi Menuju Lokasi')}
                        className="px-3.5 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Set: OTW Menuju Lokasi
                      </button>
                    )}

                    {currentJob.status === 'Teknisi Menuju Lokasi' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus('Pemeriksaan')}
                        className="px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Set: Mulai Pemeriksaan di Lokasi
                      </button>
                    )}

                    {currentJob.status === 'Dalam Perbaikan' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus('Menunggu Penyelesaian')}
                        className="px-3.5 py-1.5 rounded-xl bg-lime-600 hover:bg-lime-700 text-white text-xs font-bold shadow-xs cursor-pointer"
                      >
                        Set: Pekerjaan Selesai (Minta Konfirmasi)
                      </button>
                    )}

                    {currentJob.status === 'Menunggu Penyelesaian' && (
                      <button
                        type="button"
                        onClick={() => handleAdvanceStatus('Selesai')}
                        className="px-4 py-2 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Selesaikan Servis & Terbitkan Repair Passport</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* PRICEGUARD FORM BUILDER */}
                <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-white to-emerald-50/40 border-2 border-[#167D5A]/30 shadow-sm space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-gray-200">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#167D5A]" />
                      <h3 className="font-heading font-extrabold text-sm text-[#105C45]">
                        PriceGuard Form Builder (Rincian Biaya Transparan)
                      </h3>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-gray-500">
                      Versi #{currentJob.priceGuard?.version || 1}
                    </span>
                  </div>

                  {/* Physical Inspection Findings */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">
                      Catatan Hasil Pemeriksaan Fisik & Diagnosa Teknisi <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={2}
                      value={technicianNote}
                      onChange={e => setTechnicianNote(e.target.value)}
                      placeholder="Jelaskan kondisi komponen yang rusak, mengapa perlu diganti, dan hasil tes multitester..."
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>

                  {/* Standard Fees (Inspection + Labor) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Biaya Pemeriksaan (Rp)</label>
                      <input
                        type="number"
                        value={inspectionFee}
                        onChange={e => setInspectionFee(Number(e.target.value))}
                        className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-medium"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Biaya Jasa Servis (Rp)</label>
                      <input
                        type="number"
                        step="5000"
                        value={laborFee}
                        onChange={e => setLaborFee(Number(e.target.value))}
                        className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-medium"
                      />
                    </div>
                  </div>

                  {/* Spare Parts Itemizer */}
                  <div className="space-y-3 pt-2 border-t border-gray-200">
                    <span className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 block">
                      Daftar Suku Cadang Pengganti
                    </span>

                    {parts.length > 0 ? (
                      <div className="space-y-2 text-xs">
                        {parts.map((part, idx) => (
                          <div key={idx} className="p-3 rounded-xl bg-white border border-gray-200 flex items-center justify-between gap-3">
                            <div>
                              <span className="font-bold text-gray-900 block">{part.name}</span>
                              <span className="text-gray-500 text-[11px]">
                                {part.qty} unit × Rp {Number(part.price).toLocaleString('id-ID')}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="font-bold text-[#167D5A]">
                                Rp {(Number(part.qty) * Number(part.price)).toLocaleString('id-ID')}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleRemovePart(idx)}
                                className="p-1 rounded-lg text-red-500 hover:bg-red-50 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-400 italic">Belum ada suku cadang ditambahkan.</p>
                    )}

                    {/* Add Part Input Row */}
                    <div className="grid grid-cols-12 gap-2 p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
                      <div className="col-span-6">
                        <input
                          type="text"
                          placeholder="Nama Suku Cadang"
                          value={newPartName}
                          onChange={e => setNewPartName(e.target.value)}
                          className="w-full rounded-xl border border-gray-300 p-2 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                        />
                      </div>
                      <div className="col-span-2">
                        <input
                          type="number"
                          placeholder="Qty"
                          min="1"
                          value={newPartQty}
                          onChange={e => setNewPartQty(Number(e.target.value))}
                          className="w-full rounded-xl border border-gray-300 p-2 outline-hidden text-center"
                        />
                      </div>
                      <div className="col-span-3">
                        <input
                          type="number"
                          placeholder="Harga Satuan"
                          step="5000"
                          value={newPartPrice}
                          onChange={e => setNewPartPrice(Number(e.target.value))}
                          className="w-full rounded-xl border border-gray-300 p-2 outline-hidden"
                        />
                      </div>
                      <div className="col-span-1 flex items-center justify-center">
                        <button
                          type="button"
                          onClick={handleAddPart}
                          className="w-full h-full p-2 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white flex items-center justify-center cursor-pointer"
                          title="Tambah Suku Cadang"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Summary & Send PriceGuard Quote */}
                  <div className="pt-3 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-bold block">Total Biaya Final:</span>
                      <span className="font-heading font-black text-xl text-[#167D5A]">
                        Rp {calculateTotal().toLocaleString('id-ID')}
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={handleSendPriceGuardQuote}
                      className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md shadow-[#167D5A]/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <ShieldCheck className="w-4 h-4 text-emerald-200" />
                      <span>Kirim Rincian Biaya ke Pelanggan</span>
                    </button>
                  </div>
                </div>

                {/* Customer Approval Notice */}
                {currentJob.status === 'Menunggu Persetujuan Biaya' && (
                  <div className="p-4 rounded-2xl bg-orange-50 border border-orange-200 text-xs flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-orange-600 animate-pulse shrink-0" />
                    <div>
                      <span className="font-bold text-orange-950 block">Menunggu Konfirmasi Pelanggan</span>
                      <p className="text-orange-800">
                        Sesuai standar PriceGuard, jangan membongkar atau mengganti komponen fisik sebelum pelanggan menekan "Setujui Biaya" pada aplikasi mereka.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

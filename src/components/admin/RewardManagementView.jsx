import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Gift, 
  Leaf, 
  Settings, 
  Plus, 
  Ticket, 
  CheckCircle2, 
  Clock, 
  Tag 
} from 'lucide-react';

export default function RewardManagementView() {
  const { rewards, platformSettings, setPlatformSettings } = useApp();

  const [pointsPerService, setPointsPerService] = useState(platformSettings.pointsPerServiceCompletion);
  const [pointsPerReview, setPointsPerReview] = useState(platformSettings.pointsPerReview);
  const [pointsPerDocs, setPointsPerDocs] = useState(platformSettings.pointsPerCompleteDocumentation);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSaveRules = (e) => {
    e.preventDefault();
    setPlatformSettings(prev => ({
      ...prev,
      pointsPerServiceCompletion: Number(pointsPerService),
      pointsPerReview: Number(pointsPerReview),
      pointsPerCompleteDocumentation: Number(pointsPerDocs)
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <Gift className="w-4 h-4 text-[#167D5A]" />
            <span>Manajemen Insentif & Loyalitas Sirkular</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Pengaturan Reward & Katalog Voucher
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Atur formula pemberian poin insentif, kelola stok kuota voucher diskon, dan pantau ledger penukaran.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-emerald-50 text-[#167D5A] border border-[#167D5A]/20">
          Saldo Beredar: {rewards.customerPoints} Poin
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Point Allocation Rules (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-5">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Settings className="w-4 h-4 text-gray-500" />
            <h3 className="font-heading font-bold text-sm text-gray-900">Aturan Perolehan Poin (Earning Rules)</h3>
          </div>

          <form onSubmit={handleSaveRules} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Poin per Pesanan Servis Selesai
              </label>
              <input
                type="number"
                value={pointsPerService}
                onChange={e => setPointsPerService(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-bold text-[#167D5A]"
              />
              <span className="text-[10px] text-gray-400">Default: 50 Poin</span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Poin per Kelengkapan Foto / Dokumen
              </label>
              <input
                type="number"
                value={pointsPerDocs}
                onChange={e => setPointsPerDocs(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-bold text-[#167D5A]"
              />
              <span className="text-[10px] text-gray-400">Default: 20 Poin</span>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Poin per Ulasan & Rating Bintang
              </label>
              <input
                type="number"
                value={pointsPerReview}
                onChange={e => setPointsPerReview(e.target.value)}
                className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-bold text-[#167D5A]"
              />
              <span className="text-[10px] text-gray-400">Default: 10 Poin</span>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {savedSuccess ? (
                <span className="text-xs font-bold text-[#167D5A] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#167D5A]" />
                  Aturan disimpan!
                </span>
              ) : <span></span>}

              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-bold text-xs shadow-md cursor-pointer"
              >
                Simpan Aturan Poin
              </button>
            </div>
          </form>
        </div>

        {/* Voucher Catalog Management (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-heading font-bold text-sm text-gray-900 flex items-center gap-2">
              <Ticket className="w-4 h-4 text-[#167D5A]" />
              Katalog Voucher Tersedia ({rewards.catalog.length})
            </h3>
            <span className="text-xs text-gray-400 font-mono">Aktif di Aplikasi Customer</span>
          </div>

          <div className="space-y-3">
            {rewards.catalog.map(v => (
              <div key={v.id} className="p-4 rounded-2xl bg-[#F8FAF9] border border-gray-200 flex items-start justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-gray-900">{v.title}</span>
                    <span className="text-[10px] font-bold bg-emerald-100 text-[#105C45] px-2 py-0.5 rounded-md">
                      {v.badge}
                    </span>
                  </div>
                  <p className="text-gray-500 mt-0.5">{v.description}</p>
                  <div className="flex items-center gap-3 text-[11px] text-gray-400 mt-2">
                    <span>Sisa Kuota: <strong>{v.quotaRemaining}</strong></span>
                    <span>Masa Aktif: {v.validDays} Hari</span>
                  </div>
                </div>

                <div className="text-right whitespace-nowrap">
                  <span className="text-sm font-black text-[#167D5A] block">{v.pointsRequired} Poin</span>
                  <span className="text-[10px] text-gray-400 font-mono">ID: {v.id}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

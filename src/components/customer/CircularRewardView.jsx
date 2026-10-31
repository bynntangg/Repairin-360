import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Leaf, 
  Gift, 
  Tag, 
  Ticket, 
  Clock, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Copy, 
  Sparkles,
  Calendar,
  Layers,
  Award
} from 'lucide-react';

export default function CircularRewardView() {
  const { rewards, redeemVoucher } = useApp();
  const [activeTab, setActiveTab] = useState('catalog'); // 'catalog' | 'vouchers' | 'ledger'
  const [copiedCode, setCopiedCode] = useState(null);
  const [redeemFeedback, setRedeemFeedback] = useState(null);

  const handleRedeem = (catalogId) => {
    const res = redeemVoucher(catalogId);
    if (res.success) {
      setRedeemFeedback({ success: true, message: `Voucher berhasil ditukarkan! Kode: ${res.voucher.code}` });
      setTimeout(() => {
        setRedeemFeedback(null);
        setActiveTab('vouchers');
      }, 1500);
    } else {
      setRedeemFeedback({ success: false, message: res.message });
      setTimeout(() => setRedeemFeedback(null), 3000);
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#105C45] via-[#167D5A] to-[#1e8a64] text-white p-6 sm:p-8 shadow-xl">
        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-emerald-200 text-xs font-semibold border border-white/20">
              <Leaf className="w-3.5 h-3.5 text-emerald-300" />
              <span>Fitur Utama 5 · Insentif Sirkular & Reward</span>
            </div>
            <h1 className="font-heading font-extrabold text-2xl sm:text-3xl tracking-tight">
              Circular Rewards Program
            </h1>
            <p className="text-emerald-100 text-xs sm:text-sm leading-relaxed">
              Makin sering memilih reparasi, makin banyak poin yang Anda raih! Tukarkan dengan potongan jasa servis, voucher gratis periksa, dan diskon suku cadang resmi.
            </p>
          </div>

          {/* Point Balance Card */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-2xl border border-white/25 flex flex-col items-center justify-center min-w-[200px] text-center">
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200">
              Saldo Poin Anda
            </span>
            <div className="flex items-center gap-1.5 mt-1 font-heading font-black text-4xl text-white">
              <span>{rewards.customerPoints}</span>
              <Sparkles className="w-6 h-6 text-yellow-300 animate-pulse" />
            </div>
            <span className="text-[11px] text-emerald-200/90 mt-1">
              {rewards.myVouchers.filter(v => v.status === 'Aktif').length} Voucher Aktif Siap Pakai
            </span>
          </div>
        </div>
      </div>

      {/* Feedback Toast */}
      {redeemFeedback && (
        <div className={`p-4 rounded-2xl text-xs font-bold animate-in fade-in flex items-center gap-2 ${
          redeemFeedback.success ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-red-100 text-red-800 border border-red-300'
        }`}>
          {redeemFeedback.success ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <Tag className="w-4 h-4 text-red-600" />}
          <span>{redeemFeedback.message}</span>
        </div>
      )}

      {/* Tabs Switcher */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setActiveTab('catalog')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'catalog'
              ? 'bg-[#167D5A] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>Katalog Penukaran ({rewards.catalog.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('vouchers')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'vouchers'
              ? 'bg-[#167D5A] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Ticket className="w-4 h-4" />
          <span>My Vouchers ({rewards.myVouchers.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            activeTab === 'ledger'
              ? 'bg-[#167D5A] text-white shadow-xs'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Riwayat Point Ledger ({rewards.ledger.length})</span>
        </button>
      </div>

      {/* Tab 1: Voucher Catalog */}
      {activeTab === 'catalog' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {rewards.catalog.map(item => {
              const canAfford = rewards.customerPoints >= item.pointsRequired;

              return (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-5 border border-gray-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-[#167D5A] border border-[#167D5A]/20">
                        {item.badge}
                      </span>
                      <span className="text-[10px] text-gray-400">Sisa: {item.quotaRemaining} Kuota</span>
                    </div>

                    <div>
                      <h3 className="font-heading font-bold text-sm text-gray-900 mt-1">{item.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 leading-relaxed">{item.description}</p>
                    </div>

                    <div className="pt-2 text-xs text-gray-600 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" />
                      <span>Berlaku {item.validDays} hari setelah redeem</span>
                    </div>
                  </div>

                  <div className="mt-5 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Dibutuhkan:</span>
                      <span className="text-sm font-black text-[#167D5A]">{item.pointsRequired} Poin</span>
                    </div>

                    <button
                      type="button"
                      disabled={!canAfford}
                      onClick={() => handleRedeem(item.id)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs cursor-pointer ${
                        canAfford
                          ? 'bg-[#167D5A] hover:bg-[#105C45] text-white shadow-[#167D5A]/20'
                          : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {canAfford ? 'Tukar Voucher' : 'Poin Kurang'}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Reward Earning Rules Explainer */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200/60 mt-6">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#105C45] mb-2">
              Cara Mendapatkan Poin Sirkular:
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-white/80 border border-emerald-100">
                <span className="font-bold text-[#167D5A] block">+50 Poin</span>
                <span className="text-gray-700">Setiap pesanan servis diselesaikan</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-emerald-100">
                <span className="font-bold text-[#167D5A] block">+20 Poin</span>
                <span className="text-gray-700">Melampirkan foto barang & dokumentasi lengkap</span>
              </div>
              <div className="p-3 rounded-xl bg-white/80 border border-emerald-100">
                <span className="font-bold text-[#167D5A] block">+10 Poin</span>
                <span className="text-gray-700">Memberikan ulasan bintang & feedback jujur</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: My Vouchers Wallet */}
      {activeTab === 'vouchers' && (
        <div className="space-y-4">
          {rewards.myVouchers.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-200 text-gray-500 space-y-2">
              <Ticket className="w-12 h-12 text-gray-300 mx-auto" />
              <h3 className="font-heading font-bold text-gray-800 text-base">Belum Ada Voucher</h3>
              <p className="text-xs">Tukarkan poin Anda di Katalog Penukaran untuk mendapatkan diskon servis.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {rewards.myVouchers.map(vch => (
                <div
                  key={vch.voucherId}
                  className="bg-white rounded-3xl p-5 border-2 border-dashed border-[#167D5A]/40 shadow-xs space-y-3 relative overflow-hidden"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                        {vch.status}
                      </span>
                      <h4 className="font-heading font-bold text-sm text-gray-900 mt-1">{vch.title}</h4>
                    </div>
                    <span className="text-xs font-extrabold text-[#167D5A]">
                      -Rp {vch.discountAmount.toLocaleString('id-ID')}
                    </span>
                  </div>

                  <div className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block uppercase font-mono">Kode Kupon:</span>
                      <span className="font-mono font-bold text-sm text-gray-900 tracking-wider">{vch.code}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(vch.code)}
                      className="px-2.5 py-1 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 text-[11px] font-semibold text-gray-700 flex items-center gap-1 cursor-pointer"
                    >
                      <Copy className="w-3 h-3 text-gray-500" />
                      <span>{copiedCode === vch.code ? 'Disalin!' : 'Salin'}</span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-gray-400 pt-1">
                    <span>Berlaku s.d. {vch.expiresAt}</span>
                    <span>Tukar: {vch.redeemedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Point Ledger */}
      {activeTab === 'ledger' && (
        <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-xs">
          <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center justify-between text-xs font-bold text-gray-700">
            <span>Aktivitas / Transaksi Poin</span>
            <span>Perubahan Saldo</span>
          </div>

          <div className="divide-y divide-gray-100">
            {rewards.ledger.map(entry => {
              const isCredit = entry.type === 'credit';

              return (
                <div key={entry.id} className="p-4 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 ${
                      isCredit ? 'bg-emerald-100 text-[#167D5A]' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {isCredit ? <ArrowDownRight className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                    </div>
                    <div>
                      <p className="font-heading font-bold text-xs text-gray-900">{entry.activity}</p>
                      <span className="text-[10px] text-gray-400 font-mono">{entry.date} · ID: {entry.id}</span>
                    </div>
                  </div>

                  <span className={`font-mono font-bold text-sm ${
                    isCredit ? 'text-[#167D5A]' : 'text-orange-600'
                  }`}>
                    {isCredit ? `+${entry.points}` : `-${entry.points}`} Poin
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

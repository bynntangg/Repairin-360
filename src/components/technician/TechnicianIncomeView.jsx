import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  DollarSign, 
  ArrowDownRight, 
  Percent, 
  CreditCard, 
  CheckCircle2, 
  Download, 
  Wallet,
  Clock
} from 'lucide-react';

export default function TechnicianIncomeView() {
  const { orders, activeTechnicianId, technicians, platformSettings } = useApp();
  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  const commissionRate = platformSettings.platformCommissionPercent / 100; // 0.15

  // Completed jobs by this technician
  const completedJobs = orders.filter(
    o => o.technicianId === currentTech.id && o.status === 'Selesai'
  );

  const totalGross = completedJobs.reduce((acc, o) => acc + (o.priceGuard?.total || 0), 0);
  const totalCommission = Math.round(totalGross * commissionRate);
  const totalNet = totalGross - totalCommission;

  const [withdrawModal, setWithdrawModal] = useState(false);
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);

  const handleWithdraw = (e) => {
    e.preventDefault();
    setWithdrawSuccess(true);
    setTimeout(() => {
      setWithdrawModal(false);
      setWithdrawSuccess(false);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <DollarSign className="w-4 h-4 text-[#167D5A]" />
            <span>Manajemen Pendapatan & Bagi Hasil</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Penghasilan Servis Teknisi
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Skema bagi hasil transparan: <strong>85% hak teknisi</strong> dan <strong>15% komisi platform</strong> per transaksi selesai.
          </p>
        </div>

        <button
          onClick={() => setWithdrawModal(true)}
          className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Wallet className="w-4 h-4 text-emerald-200" />
          <span>Tarik Saldo Pendapatan</span>
        </button>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Total Nilai Transaksi</span>
          <div className="font-heading font-extrabold text-2xl text-gray-900 mt-1">
            Rp {totalGross.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">{completedJobs.length} Transaksi Selesai</span>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-gray-200/80 shadow-xs">
          <span className="text-[10px] uppercase font-bold text-gray-400 block">Komisi Platform (15%)</span>
          <div className="font-heading font-extrabold text-2xl text-orange-600 mt-1">
            Rp {totalCommission.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-gray-500 mt-1 block">Pemeliharaan sistem & garansi</span>
        </div>

        <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-300 shadow-xs sm:col-span-2">
          <span className="text-[10px] uppercase font-bold text-[#105C45] block">
            Pendapatan Bersih Teknisi (85%)
          </span>
          <div className="font-heading font-black text-3xl text-[#105C45] mt-1">
            Rp {totalNet.toLocaleString('id-ID')}
          </div>
          <span className="text-[11px] text-emerald-800 font-medium mt-1 block">
            Tersedia untuk ditarik ke rekening bank terdaftar Anda.
          </span>
        </div>
      </div>

      {/* Transaction Breakdown Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-heading font-bold text-sm text-gray-900">
            Riwayat Rincian Komisi per Pesanan Selesai
          </h3>
          <span className="text-xs text-gray-500 font-mono">Bagi Hasil 85:15</span>
        </div>

        {completedJobs.length === 0 ? (
          <p className="p-8 text-center text-xs text-gray-400 italic">
            Belum ada transaksi pesanan yang diselesaikan.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
                <tr>
                  <th className="p-3.5 font-semibold">Nomor Pesanan</th>
                  <th className="p-3.5 font-semibold">Pelanggan & Barang</th>
                  <th className="p-3.5 font-semibold text-right">Nilai Transaksi</th>
                  <th className="p-3.5 font-semibold text-right text-orange-600">Komisi 15%</th>
                  <th className="p-3.5 font-semibold text-right text-[#167D5A]">Bersih Teknisi (85%)</th>
                  <th className="p-3.5 font-semibold text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {completedJobs.map(job => {
                  const gross = job.priceGuard?.total || 130000;
                  const comm = Math.round(gross * commissionRate);
                  const net = gross - comm;

                  return (
                    <tr key={job.id} className="hover:bg-gray-50">
                      <td className="p-3.5 font-mono font-bold text-gray-900">{job.id}</td>
                      <td className="p-3.5">
                        <span className="font-bold text-gray-900 block">{job.brand} {job.model}</span>
                        <span className="text-[11px] text-gray-500">{job.customerName} · {job.completedAt || job.scheduleDate}</span>
                      </td>
                      <td className="p-3.5 text-right font-medium text-gray-700">
                        Rp {gross.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5 text-right font-medium text-orange-600">
                        -Rp {comm.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5 text-right font-bold text-[#167D5A]">
                        Rp {net.toLocaleString('id-ID')}
                      </td>
                      <td className="p-3.5 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          Selesai & Lunas
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Withdraw Modal */}
      {withdrawModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-4 shadow-2xl">
            <h3 className="font-heading font-bold text-base text-gray-900">Tarik Saldo Pendapatan Teknisi</h3>
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
              <span className="text-gray-600">Saldo Bersih yang Dapat Ditarik:</span>
              <p className="font-black text-xl text-[#167D5A] mt-0.5">
                Rp {totalNet.toLocaleString('id-ID')}
              </p>
            </div>

            <form onSubmit={handleWithdraw} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Pilih Rekening Tujuan</label>
                <select className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden">
                  <option>BCA - 8820199201 a.n. {currentTech.name}</option>
                  <option>Mandiri - 137000998811 a.n. {currentTech.name}</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nominal Penarikan (Rp)</label>
                <input
                  type="number"
                  defaultValue={totalNet}
                  max={totalNet}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden font-bold"
                />
              </div>

              {withdrawSuccess ? (
                <div className="p-3 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-center">
                  ✓ Penarikan dana berhasil diproses ke rekening Anda!
                </div>
              ) : (
                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setWithdrawModal(false)}
                    className="px-3 py-1.5 font-semibold text-gray-600"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-bold shadow-md cursor-pointer"
                  >
                    Konfirmasi Penarikan
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

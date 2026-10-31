import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import StatusBadge from '../common/StatusBadge';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar, 
  Wrench, 
  User, 
  ShieldCheck, 
  Eye, 
  XCircle, 
  CheckCircle2,
  DollarSign
} from 'lucide-react';

export default function BookingManagementView() {
  const { orders, updateOrderStatus } = useApp();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  const filteredOrders = orders.filter(o => {
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchId = o.id.toLowerCase().includes(q);
      const matchCust = o.customerName.toLowerCase().includes(q);
      const matchTech = o.technicianName.toLowerCase().includes(q);
      const matchItem = `${o.brand} ${o.model}`.toLowerCase().includes(q);
      if (!matchId && !matchCust && !matchTech && !matchItem) return false;
    }

    if (statusFilter !== 'all' && o.status !== statusFilter) return false;

    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <FileText className="w-4 h-4 text-[#167D5A]" />
            <span>Pusat Manajemen Pesanan & Transaksi</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Master Data Pesanan Servis
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Kelola seluruh transaksi, transparansi tagihan PriceGuard, serta kepatuhan pengerjaan oleh teknisi.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-gray-100 text-gray-700">
          Total: {orders.length} Pesanan
        </span>
      </div>

      {/* Filter Row */}
      <div className="bg-white rounded-2xl p-4 border border-gray-200/80 flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Cari ID, pelanggan, teknisi, atau seri barang..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full rounded-xl border border-gray-300 pl-9 pr-3 py-2 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-400" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="rounded-xl border border-gray-300 px-3 py-2 bg-white font-medium outline-hidden"
          >
            <option value="all">Semua Status (11 Tahap)</option>
            <option value="Menunggu Konfirmasi">Menunggu Konfirmasi</option>
            <option value="Diterima Teknisi">Diterima Teknisi</option>
            <option value="Menunggu Persetujuan Biaya">Menunggu Persetujuan Biaya</option>
            <option value="Dalam Perbaikan">Dalam Perbaikan</option>
            <option value="Selesai">Selesai</option>
            <option value="Dibatalkan">Dibatalkan</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-3xl border border-gray-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-gray-50 text-gray-600 border-b border-gray-200">
              <tr>
                <th className="p-3.5 font-semibold">Nomor & Tanggal</th>
                <th className="p-3.5 font-semibold">Pelanggan</th>
                <th className="p-3.5 font-semibold">Perangkat Servis</th>
                <th className="p-3.5 font-semibold">Teknisi Bertugas</th>
                <th className="p-3.5 font-semibold">Total PriceGuard</th>
                <th className="p-3.5 font-semibold">Status Alur</th>
                <th className="p-3.5 font-semibold text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="p-3.5">
                    <span className="font-mono font-bold text-gray-900 block">{order.id}</span>
                    <span className="text-[10px] text-gray-400">{order.createdAt}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-semibold text-gray-900 block">{order.customerName}</span>
                    <span className="text-[10px] text-gray-400">{order.customerPhone}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-gray-800 block">{order.brand} {order.model}</span>
                    <span className="text-[10px] text-gray-500">{order.category}</span>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-[#167D5A]">{order.technicianName}</span>
                  </td>
                  <td className="p-3.5 font-bold text-gray-900">
                    Rp {order.priceGuard?.total?.toLocaleString('id-ID') || '0'}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={order.status} size="sm" />
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold cursor-pointer"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Audit Sheet Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-3xl w-full max-w-xl p-6 sm:p-8 space-y-5 shadow-2xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-start justify-between pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#167D5A] tracking-wider">
                  Audit Detail Pesanan Platform
                </span>
                <h3 className="font-heading font-extrabold text-xl text-gray-900 mt-0.5">
                  {selectedOrder.brand} {selectedOrder.model} (#{selectedOrder.id})
                </h3>
              </div>
              <StatusBadge status={selectedOrder.status} size="md" />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs bg-gray-50 p-4 rounded-2xl border border-gray-200">
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Pelanggan</span>
                <p className="font-bold text-gray-900">{selectedOrder.customerName}</p>
                <p className="text-gray-500">{selectedOrder.customerAddress}</p>
              </div>
              <div>
                <span className="text-gray-400 text-[10px] uppercase font-bold block">Teknisi</span>
                <p className="font-bold text-[#167D5A]">{selectedOrder.technicianName}</p>
                <p className="text-gray-500">Jadwal: {selectedOrder.scheduleDate} jam {selectedOrder.scheduleTime}</p>
              </div>
            </div>

            {/* PriceGuard Breakdown Audit */}
            <div className="p-4 rounded-2xl bg-[#E5F3EC]/50 border border-[#167D5A]/20 text-xs space-y-2">
              <span className="font-bold text-[#105C45] block">Rincian PriceGuard (Versi #{selectedOrder.priceGuard?.version || 1}):</span>
              <div className="space-y-1 text-gray-700">
                <div className="flex justify-between">
                  <span>Biaya Pemeriksaan:</span>
                  <span>Rp {selectedOrder.priceGuard?.inspectionFee?.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between">
                  <span>Biaya Jasa:</span>
                  <span>Rp {selectedOrder.priceGuard?.laborFee?.toLocaleString('id-ID')}</span>
                </div>
                {selectedOrder.priceGuard?.parts?.map((p, i) => (
                  <div key={i} className="flex justify-between text-gray-600">
                    <span>Part: {p.name} ({p.qty}x)</span>
                    <span>Rp {(p.price * p.qty).toLocaleString('id-ID')}</span>
                  </div>
                ))}
                <div className="flex justify-between pt-1 border-t border-[#167D5A]/20 font-bold text-gray-900">
                  <span>Grand Total:</span>
                  <span className="text-[#167D5A]">Rp {selectedOrder.priceGuard?.total?.toLocaleString('id-ID')}</span>
                </div>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {selectedOrder.status !== 'Dibatalkan' && selectedOrder.status !== 'Selesai' && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Batalkan pesanan ini karena pelanggaran/kebijakan admin?')) {
                      updateOrderStatus(selectedOrder.id, 'Dibatalkan');
                      setSelectedOrder(null);
                    }
                  }}
                  className="px-3 py-1.5 rounded-xl border border-red-300 text-red-600 hover:bg-red-50 text-xs font-bold"
                >
                  Batalkan Pesanan
                </button>
              )}
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold ml-auto"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

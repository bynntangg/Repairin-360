import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, AlertCircle, ShieldAlert, CheckCircle2 } from 'lucide-react';

export default function ComplaintModal({ order, onClose }) {
  const { submitComplaint } = useApp();
  const [category, setCategory] = useState('Biaya Berbeda dari Kesepakatan');
  const [description, setDescription] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const complaintCategories = [
    'Teknisi Tidak Datang / Terlambat Tanpa Kabar',
    'Hasil Perbaikan Tidak Sesuai / Masih Rusak',
    'Biaya Berbeda dari Kesepakatan PriceGuard',
    'Kerusakan Barang Bertambah',
    'Masalah Klaim Garansi Digital',
    'Lainnya'
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) {
      alert('Mohon tuliskan penjelasan kendala yang Anda alami.');
      return;
    }

    submitComplaint({
      orderId: order.id,
      customerName: order.customerName,
      technicianName: order.technicianName,
      category,
      description
    });

    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-red-600 tracking-wider">Pusat Resolusi Pelanggan</span>
            <h3 className="font-heading font-bold text-lg text-gray-900">Ajukan Pengaduan Servis</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-emerald-100 text-[#167D5A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#167D5A]" />
            </div>
            <h4 className="font-heading font-bold text-base text-gray-900">Tiket Pengaduan Diterima</h4>
            <p className="text-xs text-gray-600">
              Tim kepatuhan dan mediasi REPAIRIN 360 akan segera memverifikasi bukti dan menghubungi Anda serta teknisi dalam waktu 1x24 jam.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <p className="font-semibold text-gray-800">{order.brand} {order.model} (#{order.id})</p>
              <p className="text-gray-500">Teknisi Bertugas: {order.technicianName}</p>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Kategori Masalah <span className="text-red-500">*</span>
              </label>
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] bg-white font-medium"
              >
                {complaintCategories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Jelaskan Kronologi & Kendala <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Tuliskan secara objektif apa yang terjadi di lokasi, selisih biaya, atau komponen yang bermasalah..."
                className="w-full text-xs rounded-xl border border-gray-300 p-3 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-red-50 text-red-900 text-[11px] flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              <span>Sistem PriceGuard menjamin uang Anda aman. Perubahan biaya tanpa persetujuan di aplikasi tidak sah.</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Kirim Pengaduan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

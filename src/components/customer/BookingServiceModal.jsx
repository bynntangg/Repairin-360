import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Calendar, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  Wrench, 
  ShieldCheck, 
  CheckCircle2, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

export default function BookingServiceModal({ technician, onClose, onSuccess, initialSmartCheck }) {
  const { createBooking, categories } = useApp();

  const [step, setStep] = useState(1); // 1: Form, 2: Review & Confirm
  const [category, setCategory] = useState(initialSmartCheck?.categoryId || technician?.specialties[0] || 'rice-cooker');
  const [brand, setBrand] = useState(initialSmartCheck?.brand || 'Miyako');
  const [model, setModel] = useState(initialSmartCheck?.model || 'MCM-508');
  const [purchaseYear, setPurchaseYear] = useState('2023');
  const [itemDescription, setItemDescription] = useState(
    initialSmartCheck 
      ? `Hasil SmartCheck: ${initialSmartCheck.probableCauses?.[0] || 'Kerusakan komponen elektrik'}`
      : 'Perangkat tidak berfungsi normal, mohon diperiksa di tempat.'
  );

  const [customerName, setCustomerName] = useState('Budi Santoso');
  const [customerPhone, setCustomerPhone] = useState('0812-9988-7766');
  const [customerAddress, setCustomerAddress] = useState('Jl. Tebet Barat Dalam VII No. 14, Tebet, Jakarta Selatan');
  const [addressLandmark, setAddressLandmark] = useState('Rumah pagar hitam samping Indomaret');
  
  const [scheduleDate, setScheduleDate] = useState('2026-11-01');
  const [scheduleTime, setScheduleTime] = useState('10:00 WIB');
  const [notes, setNotes] = useState('Harap hubungi WhatsApp 30 menit sebelum menuju lokasi.');
  const [paymentMethod, setPaymentMethod] = useState('Tunai kepada Teknisi');

  const selectedCategoryObj = categories.find(c => c.id === category) || categories[0];

  const handleSubmitBooking = () => {
    const newOrder = createBooking({
      category,
      brand,
      model,
      purchaseYear,
      itemDescription,
      customerName,
      customerPhone,
      customerAddress: `${customerAddress} (${addressLandmark})`,
      scheduleDate,
      scheduleTime,
      notes,
      technicianId: technician.id,
      paymentMethod,
      smartCheckSummary: initialSmartCheck ? {
        probability: initialSmartCheck.confidenceScore,
        probableCause: initialSmartCheck.probableCauses?.[0],
        safetyAlert: initialSmartCheck.safetyWarning
      } : null
    });

    if (onSuccess) onSuccess(newOrder);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl border border-gray-100 flex flex-col">
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#167D5A] tracking-wider">
              Pemesanan Layanan Servis Panggilan
            </span>
            <h2 className="font-heading font-bold text-lg sm:text-xl text-gray-900">
              Formulir Booking · {technician.name}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6">
          {step === 1 ? (
            <div className="space-y-6">
              {/* Highlight Technician Card */}
              <div className="p-4 rounded-2xl bg-[#E5F3EC]/50 border border-[#167D5A]/20 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img src={technician.avatar} alt={technician.name} className="w-12 h-12 rounded-xl object-cover" />
                  <div>
                    <h4 className="font-heading font-bold text-xs sm:text-sm text-gray-900">{technician.name}</h4>
                    <p className="text-[11px] text-gray-600">{technician.title}</p>
                    <span className="text-[10px] text-emerald-700 font-semibold">★ {technician.rating} ({technician.reviewsCount} Ulasan)</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 block">Tarif Pemeriksaan</span>
                  <span className="text-xs font-bold text-[#167D5A]">Rp {technician.baseInspectionFee.toLocaleString('id-ID')}</span>
                </div>
              </div>

              {/* Bagian 1: Data Barang */}
              <div className="space-y-3">
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Wrench className="w-3.5 h-3.5 text-[#167D5A]" />
                  1. Informasi Perangkat & Kerusakan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Kategori Barang</label>
                    <select
                      value={category}
                      onChange={e => setCategory(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    >
                      {categories.map(c => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Merek & Seri</label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Merek (Miyako)"
                        value={brand}
                        onChange={e => setBrand(e.target.value)}
                        className="text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                      />
                      <input
                        type="text"
                        placeholder="Model/Tipe"
                        value={model}
                        onChange={e => setModel(e.target.value)}
                        className="text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Deskripsi Kerusakan / Gejala</label>
                  <textarea
                    rows={2}
                    value={itemDescription}
                    onChange={e => setItemDescription(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                  />
                </div>
              </div>

              {/* Bagian 2: Informasi Pelanggan */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-[#167D5A]" />
                  2. Identitas Pelanggan & Alamat Servis
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Nama Lengkap</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={e => setCustomerName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Nomor Telepon / WhatsApp</label>
                    <input
                      type="text"
                      value={customerPhone}
                      onChange={e => setCustomerPhone(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Alamat Lengkap</label>
                    <input
                      type="text"
                      value={customerAddress}
                      onChange={e => setCustomerAddress(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Patokan Lokasi</label>
                    <input
                      type="text"
                      value={addressLandmark}
                      onChange={e => setAddressLandmark(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>
                </div>
              </div>

              {/* Bagian 3: Jadwal & Pembayaran */}
              <div className="space-y-3 pt-2 border-t border-gray-100">
                <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#167D5A]" />
                  3. Pilihan Waktu Kunjungan
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Tanggal Kunjungan</label>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={e => setScheduleDate(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Jam Kedatangan</label>
                    <select
                      value={scheduleTime}
                      onChange={e => setScheduleTime(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    >
                      <option value="09:00 WIB">09:00 WIB (Pagi)</option>
                      <option value="10:00 WIB">10:00 WIB (Pagi)</option>
                      <option value="13:00 WIB">13:00 WIB (Siang)</option>
                      <option value="15:30 WIB">15:30 WIB (Sore)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-600 mb-1">Metode Bayar Pilihan</label>
                    <select
                      value={paymentMethod}
                      onChange={e => setPaymentMethod(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    >
                      <option value="Tunai kepada Teknisi">Tunai kepada Teknisi</option>
                      <option value="Transfer Bank (BCA)">Transfer Bank (BCA)</option>
                      <option value="QRIS / E-Wallet">QRIS / E-Wallet</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-gray-600 mb-1">Catatan Tambahan untuk Teknisi</label>
                  <input
                    type="text"
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Step 2: Review & Summary before Confirm */
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <h4 className="text-xs font-bold text-amber-900">Konfirmasi Pemesanan Sebelum Dikirim:</h4>
                <p className="text-xs text-amber-800 mt-1">
                  Harap periksa kembali detail barang, alamat, jadwal, dan tarif awal. Teknisi akan menerima permintaan dan segera mengonfirmasi ketersediaan.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 space-y-3 text-xs">
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Teknisi Servis:</span>
                  <span className="font-bold text-gray-900">{technician.name}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Barang yang Diservis:</span>
                  <span className="font-bold text-gray-900">{brand} {model} ({selectedCategoryObj.name})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Keluhan:</span>
                  <span className="font-medium text-gray-800 text-right max-w-xs">{itemDescription}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Jadwal Kedatangan:</span>
                  <span className="font-bold text-[#167D5A]">{scheduleDate} jam {scheduleTime}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Alamat Servis:</span>
                  <span className="font-medium text-gray-800 text-right max-w-xs">{customerAddress} ({addressLandmark})</span>
                </div>
                <div className="flex justify-between py-1 border-b border-gray-200">
                  <span className="text-gray-500">Estimasi Tarif Pemeriksaan Awal:</span>
                  <span className="font-bold text-gray-900">Rp {technician.baseInspectionFee.toLocaleString('id-ID')}</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-gray-500">Metode Pembayaran:</span>
                  <span className="font-semibold text-gray-800">{paymentMethod}</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-[#E5F3EC] text-[#105C45] text-xs flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#167D5A] shrink-0" />
                <span>Dilindungi oleh <strong>PriceGuard</strong>: Biaya suku cadang wajib disetujui Anda sebelum perbaikan dimulai.</span>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div className="p-5 border-t border-gray-100 flex items-center justify-between bg-gray-50/80 rounded-b-3xl">
          {step === 1 ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={() => setStep(2)}
                className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <span>Periksa Pesanan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900 cursor-pointer"
              >
                ← Edit Pesanan
              </button>
              <button
                type="button"
                onClick={handleSubmitBooking}
                className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Konfirmasi & Kirim Pesanan</span>
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Scale, 
  Leaf, 
  DollarSign, 
  Clock, 
  Wrench, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle, 
  Sparkles,
  Info,
  Layers,
  ShoppingBag
} from 'lucide-react';

export default function RepairOrReplaceView({ setActiveTab }) {
  const { categories, activeSmartCheckHandoff } = useApp();

  // Inputs
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    activeSmartCheckHandoff?.categoryId || 'rice-cooker'
  );
  const [brand, setBrand] = useState(activeSmartCheckHandoff?.brand || 'Miyako');
  const [model, setModel] = useState(activeSmartCheckHandoff?.model || 'MCM-508');
  const [purchasePrice, setPurchasePrice] = useState(350000);
  const [ageYears, setAgeYears] = useState(2);
  const [condition, setCondition] = useState('Baik / Terawat');

  // Repair Inputs
  const [repairCost, setRepairCost] = useState(
    activeSmartCheckHandoff ? Math.round((activeSmartCheckHandoff.estimatedCostMin + activeSmartCheckHandoff.estimatedCostMax) / 2) : 125000
  );
  const [partsAvailability, setPartsAvailability] = useState('Mudah Didapat'); // Mudah Didapat, Langka, Modifikasi
  const [damageSeverity, setDamageSeverity] = useState(activeSmartCheckHandoff?.severity || 'Sedang');

  // Replacement Inputs
  const [replacementPrice, setReplacementPrice] = useState(380000);
  const [replacementLifespanYears, setReplacementLifespanYears] = useState(5);

  const currentCatObj = categories.find(c => c.id === selectedCategoryId) || categories[0];

  // Auto-sync reference price when category changes
  useEffect(() => {
    if (currentCatObj) {
      setPurchasePrice(currentCatObj.avgReplaceCost);
      setReplacementPrice(Math.round(currentCatObj.avgReplaceCost * 1.05));
    }
  }, [selectedCategoryId]);

  // Formula Rasio Biaya:
  // Repair Cost Ratio = (Biaya Perbaikan / Harga Barang Pengganti) * 100%
  const repairCostRatio = replacementPrice > 0 ? Math.round((repairCost / replacementPrice) * 100) : 0;

  // Determine Recommendation logic
  let recommendation = {
    title: 'Recommended to Repair',
    badgeClass: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    description: 'Biaya perbaikan sangat ekonomis dibandingkan membeli unit baru. Komponen pengganti mudah didapat dan akan memperpanjang usia perangkat 2-3 tahun ke depan.',
    icon: CheckCircle2,
    iconColor: 'text-[#167D5A]'
  };

  if (repairCostRatio > 70 || (ageYears >= 8 && partsAvailability === 'Langka')) {
    recommendation = {
      title: 'Consider Replacing',
      badgeClass: 'bg-red-100 text-red-800 border-red-300',
      description: 'Biaya perbaikan mendekati atau melampaui 70% harga barang baru, atau perangkat sudah mendekati batas usia ekonomis maksimal.',
      icon: AlertTriangle,
      iconColor: 'text-red-600'
    };
  } else if (repairCostRatio >= 40 || damageSeverity === 'Berat' || partsAvailability === 'Langka') {
    recommendation = {
      title: 'Need Further Inspection',
      badgeClass: 'bg-amber-100 text-amber-800 border-amber-300',
      description: 'Rasio biaya berada pada rentang batas wajar (40-70%). Disarankan meminta teknisi melakukan pemeriksaan multitester di tempat sebelum memutuskan beli baru.',
      icon: Info,
      iconColor: 'text-amber-600'
    };
  }

  const moneySaved = Math.max(0, replacementPrice - repairCost);
  const co2AvoidedKg = currentCatObj ? currentCatObj.co2SavedKg : 15;
  const eWasteAvoidedKg = currentCatObj ? currentCatObj.eWasteKg : 3.5;

  return (
    <div className="space-y-6 pb-16">
      {/* Header with Visual Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <Scale className="w-4 h-4 text-[#167D5A]" />
            <span>Kalkulator Keputusan Ekonomi Sirkular</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Repair or Replace Decision
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5 leading-relaxed">
            Bantu keputusan Anda secara objektif dengan membandingkan rasio biaya servis terhadap harga unit pengganti baru, estimasi perpanjangan usia pakai, dan emisi karbon yang dicegah.
          </p>
        </div>

        <div className="md:col-span-4 rounded-2xl overflow-hidden shadow-md border border-gray-100 relative">
          <img
            src="/images/tools.png"
            alt="Pilihan Servis vs Beli Baru"
            className="w-full h-32 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#105C45]/80 via-transparent to-transparent flex items-end p-2.5">
            <span className="text-[11px] font-bold text-white">Repair First, Not Replace First</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white rounded-3xl p-6 border border-gray-200/80 shadow-xs space-y-5">
            <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#167D5A]" />
              1. Parameter Perangkat & Kondisi Fisik
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block font-bold text-gray-600 mb-1">Kategori Barang</label>
                <select
                  value={selectedCategoryId}
                  onChange={e => setSelectedCategoryId(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] bg-white font-medium"
                >
                  {categories.map(c => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-bold text-gray-600 mb-1">Merek & Tipe</label>
                <input
                  type="text"
                  value={`${brand} ${model}`}
                  onChange={e => setBrand(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-600 mb-1">Usia Penggunaan (Tahun)</label>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={ageYears}
                  onChange={e => setAgeYears(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-600 mb-1">Kondisi Bodi Fisik</label>
                <select
                  value={condition}
                  onChange={e => setCondition(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] bg-white font-medium"
                >
                  <option value="Sangat Baik">Sangat Baik (Bodi Mulus)</option>
                  <option value="Baik / Terawat">Baik / Terawat Normal</option>
                  <option value="Cukup (Kusam)">Cukup (Kusam / Lecet)</option>
                  <option value="Karat / Korosi">Bodi Mulai Berkarat</option>
                </select>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-3">
                <Wrench className="w-3.5 h-3.5 text-blue-600" />
                2. Estimasi Biaya Servis & Ketersediaan Part
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-600 mb-1">Perkiraan Biaya Servis (Rp)</label>
                  <input
                    type="number"
                    step="5000"
                    value={repairCost}
                    onChange={e => setRepairCost(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-semibold text-gray-900"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">Jasa + Suku cadang estimasi</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-600 mb-1">Ketersediaan Suku Cadang</label>
                  <select
                    value={partsAvailability}
                    onChange={e => setPartsAvailability(e.target.value)}
                    className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] bg-white font-medium"
                  >
                    <option value="Mudah Didapat">Mudah Didapat (Banyak di Pasaran)</option>
                    <option value="Langka">Langka / Harus Indent</option>
                    <option value="Modifikasi">Perlu Modifikasi Jalur</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5 mb-3">
                <ShoppingBag className="w-3.5 h-3.5 text-purple-600" />
                3. Harga Pembelian Barang Baru Pengganti
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block font-bold text-gray-600 mb-1">Harga Beli Baru Serupa (Rp)</label>
                  <input
                    type="number"
                    step="10000"
                    value={replacementPrice}
                    onChange={e => setReplacementPrice(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-semibold text-gray-900"
                  />
                  <span className="text-[10px] text-gray-400 mt-0.5 block">Referensi harga e-commerce / toko resmi</span>
                </div>

                <div>
                  <label className="block font-bold text-gray-600 mb-1">Estimasi Usia Pakai Baru</label>
                  <input
                    type="text"
                    value={`${replacementLifespanYears} Tahun`}
                    disabled
                    className="w-full rounded-xl border border-gray-200 p-2.5 bg-gray-50 text-gray-500 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Decision Ratio & Side-by-Side Comparison (5 Cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Main Decision Output Card */}
          <div className="bg-white rounded-3xl p-6 border-2 border-[#167D5A]/40 shadow-xl space-y-5">
            {/* Recommendation Tag */}
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Rekomendasi Keputusan
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border ${recommendation.badgeClass}`}>
                {recommendation.title}
              </span>
            </div>

            {/* Repair Cost Ratio Gauge */}
            <div className="p-4 rounded-2xl bg-[#F8FAF9] border border-gray-200 text-center space-y-2">
              <span className="text-xs text-gray-500 font-medium">Repair Cost Ratio (Rasio Biaya):</span>
              <div className="font-heading font-black text-4xl text-[#105C45]">
                {repairCostRatio}%
              </div>
              <p className="text-[11px] text-gray-400 font-mono">
                Rp {repairCost.toLocaleString('id-ID')} ÷ Rp {replacementPrice.toLocaleString('id-ID')} × 100%
              </p>

              {/* Progress bar visualizer */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden mt-2">
                <div
                  className={`h-full transition-all duration-300 ${
                    repairCostRatio < 40 ? 'bg-emerald-500' : repairCostRatio <= 70 ? 'bg-amber-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(100, repairCostRatio)}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 px-0.5 pt-0.5">
                <span>0% (Ideal)</span>
                <span>40% (Ambang)</span>
                <span>70%+ (Ganti)</span>
              </div>
            </div>

            {/* Recommendation Description */}
            <p className="text-xs text-gray-700 leading-relaxed">
              {recommendation.description}
            </p>

            {/* Side-by-Side Comparison Matrix */}
            <div className="border border-gray-200 rounded-2xl overflow-hidden text-xs">
              <div className="grid grid-cols-2 bg-gray-50 border-b border-gray-200 font-bold p-2.5 text-center">
                <span className="text-[#105C45]">🛠️ Opsi Reparasi</span>
                <span className="text-gray-700">🛒 Opsi Beli Baru</span>
              </div>

              <div className="divide-y divide-gray-100 p-3 space-y-2.5">
                <div className="grid grid-cols-2 items-center text-center">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Biaya Dikeluarkan</span>
                    <span className="font-bold text-[#167D5A] text-sm">Rp {repairCost.toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Biaya Beli Unit</span>
                    <span className="font-bold text-gray-800 text-sm">Rp {replacementPrice.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center text-center pt-2">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Uang Dihemat</span>
                    <span className="font-bold text-emerald-700">+Rp {moneySaved.toLocaleString('id-ID')}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Pengeluaran Ekstra</span>
                    <span className="font-bold text-red-600">-Rp {moneySaved.toLocaleString('id-ID')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 items-center text-center pt-2">
                  <div>
                    <span className="text-gray-400 block text-[10px]">Garansi</span>
                    <span className="font-bold text-gray-800">90 Hari Digital</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block text-[10px]">Garansi Pabrik</span>
                    <span className="font-bold text-gray-800">1 Tahun</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Circular Impact Box */}
            <div className="p-3.5 rounded-2xl bg-[#E5F3EC] text-[#105C45] text-xs flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Leaf className="w-4 h-4 text-[#167D5A] shrink-0" />
                <span className="font-semibold">Dampak Sirkular jika Memilih Reparasi:</span>
              </div>
              <span className="font-mono font-bold text-xs whitespace-nowrap">
                -{co2AvoidedKg} kg CO₂
              </span>
            </div>

            {/* Action CTA */}
            <div className="pt-2">
              <button
                type="button"
                onClick={() => setActiveTab('smartmatch')}
                className="w-full py-3 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md shadow-[#167D5A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Cari Teknisi Terpercaya untuk Servis Barang Ini</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

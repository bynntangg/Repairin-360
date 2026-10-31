import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { runSmartCheckAnalysis } from '../../utils/smartCheckEngine';
import { 
  Search, 
  AlertTriangle, 
  ShieldAlert, 
  CheckCircle2, 
  Wrench, 
  ArrowRight, 
  Upload, 
  HelpCircle, 
  Sparkles, 
  Scale, 
  BookmarkCheck,
  RotateCcw,
  Zap,
  Activity
} from 'lucide-react';

export default function SmartCheckView({ setActiveTab, preselectedCategory }) {
  const { categories, saveSmartCheck, setActiveSmartCheckHandoff } = useApp();

  const [selectedCategory, setSelectedCategory] = useState(preselectedCategory || categories[0].id);
  const [brand, setBrand] = useState('Miyako');
  const [model, setModel] = useState('MCM-508');
  const [usageYears, setUsageYears] = useState('2');
  const [condition, setCondition] = useState('Terawat (Pemakaian Rumah Tangga)');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [notes, setNotes] = useState('');
  const [simulatedPhoto, setSimulatedPhoto] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentCatObj = categories.find(c => c.id === selectedCategory) || categories[0];

  const toggleSymptom = (symId) => {
    setSelectedSymptoms(prev => 
      prev.includes(symId) ? prev.filter(s => s !== symId) : [...prev, symId]
    );
  };

  const handleRunAnalysis = (e) => {
    e.preventDefault();
    if (selectedSymptoms.length === 0) {
      alert('Pilih minimal satu gejala kerusakan barang Anda!');
      return;
    }

    setIsAnalyzing(true);
    setAnalysisResult(null);
    setSavedSuccess(false);

    setTimeout(() => {
      const result = runSmartCheckAnalysis({
        categoryId: selectedCategory,
        brand,
        model,
        usageYears,
        condition,
        selectedSymptoms,
        notes
      });
      setAnalysisResult(result);
      setIsAnalyzing(false);
    }, 600);
  };

  const handleHandoffToSmartMatch = () => {
    saveSmartCheck(analysisResult);
    setActiveSmartCheckHandoff(analysisResult);
    setActiveTab('smartmatch');
  };

  const handleSaveResult = () => {
    saveSmartCheck(analysisResult);
    setSavedSuccess(true);
  };

  const handleHandoffToRepairOrReplace = () => {
    saveSmartCheck(analysisResult);
    setActiveSmartCheckHandoff(analysisResult);
    setActiveTab('repair-or-replace');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner with Rich Visual Illustration */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <Activity className="w-4 h-4 text-[#167D5A]" />
            <span>Diagnosis Cerdas Mandiri · SmartCheck</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Analisis Cepat Kemungkinan Kerusakan
          </h1>
          <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
            Ketahui perkiraan penyebab kerusakan, suku cadang terkait, tingkat bahaya kelistrikan, dan estimasi biaya sebelum memesan teknisi panggilan ke lokasi Anda.
          </p>
        </div>

        <div className="md:col-span-4 rounded-2xl overflow-hidden shadow-md border border-gray-100">
          <img
            src="/images/smart check.png"
            alt="Pemeriksaan Multimeter Elektronik"
            className="w-full h-32 object-cover"
          />
        </div>
      </div>

      {/* Main Questionnaire Form */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
        <form onSubmit={handleRunAnalysis} className="space-y-6">
          {/* Step 1: Kategori Barang */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
              1. Pilih Kategori Perangkat <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {categories.map(cat => (
                <button
                  type="button"
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setSelectedSymptoms([]);
                    setAnalysisResult(null);
                  }}
                  className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                    selectedCategory === cat.id
                      ? 'border-[#167D5A] bg-[#E5F3EC] text-[#105C45] font-semibold ring-2 ring-[#167D5A]/20'
                      : 'border-gray-200 hover:border-gray-300 text-gray-700 bg-white'
                  }`}
                >
                  <span className="text-xs font-heading font-bold">{cat.name}</span>
                  <span className="text-[10px] text-gray-500 mt-1 line-clamp-1">{cat.description}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Step 2: Identitas Barang */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Merek / Brand <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={brand}
                onChange={e => setBrand(e.target.value)}
                placeholder="Contoh: Miyako, Cosmos, Sharp, LG..."
                className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Model / Tipe (Opsional)
              </label>
              <input
                type="text"
                value={model}
                onChange={e => setModel(e.target.value)}
                placeholder="Contoh: MCM-508 / 16-SDB"
                className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Lama Penggunaan (Tahun)
              </label>
              <select
                value={usageYears}
                onChange={e => setUsageYears(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden bg-white"
              >
                <option value="1">Kurang dari 1 tahun</option>
                <option value="2">1 - 2 tahun</option>
                <option value="3">3 - 4 tahun</option>
                <option value="5">5 tahun ke atas</option>
              </select>
            </div>
          </div>

          {/* Step 3: Gejala Kerusakan (Kuesioner Dinamis Berdasarkan Kategori) */}
          <div className="pt-2">
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700">
                2. Gejala yang Dialami ({currentCatObj.name}) <span className="text-red-500">*</span>
              </label>
              <span className="text-[11px] text-gray-500">Pilih satu atau lebih gejala</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {currentCatObj.symptoms.map(sym => {
                const checked = selectedSymptoms.includes(sym.id);
                return (
                  <label
                    key={sym.id}
                    onClick={() => toggleSymptom(sym.id)}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      checked
                        ? 'border-[#167D5A] bg-[#E5F3EC]/70 text-[#105C45] font-semibold'
                        : 'border-gray-200 hover:border-gray-300 bg-[#F9FBFA] text-gray-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-[#167D5A] focus:ring-[#167D5A]"
                    />
                    <span className="text-xs leading-relaxed">{sym.label}</span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Step 4: Catatan Tambahan & Foto (Opsional) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Deskripsi Tambahan / Kronologi
              </label>
              <textarea
                rows={3}
                value={notes}
                onChange={e => setNotes(e.target.value)}
                placeholder="Ceritakan kejadian (misal: setelah mati lampu tiba-tiba ada bau hangus)..."
                className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A] outline-hidden"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Foto / Video Perangkat (Opsional)
              </label>
              <div 
                onClick={() => setSimulatedPhoto('https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80')}
                className="border-2 border-dashed border-gray-300 hover:border-[#167D5A] rounded-xl p-4 text-center cursor-pointer transition-all bg-[#F9FBFA] flex flex-col items-center justify-center space-y-1.5 h-24"
              >
                {simulatedPhoto ? (
                  <div className="flex items-center gap-2 text-xs font-semibold text-[#167D5A]">
                    <CheckCircle2 className="w-4 h-4 text-[#167D5A]" />
                    <span>Foto Perangkat Terlampir</span>
                  </div>
                ) : (
                  <>
                    <Upload className="w-5 h-5 text-gray-400" />
                    <span className="text-xs text-gray-500 font-medium">Klik untuk melampirkan foto</span>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-[11px] text-gray-400">
              * Hasil analisis berbasis machine rule engine dan knowledge base teknisi
            </span>
            <button
              type="submit"
              disabled={isAnalyzing}
              className="px-6 py-3 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-[#167D5A]/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isAnalyzing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Menganalisis Gejala...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-emerald-300" />
                  <span>Jalankan SmartCheck</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Analysis Result Card */}
      {analysisResult && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-[#167D5A]/40 shadow-xl space-y-6 animate-in fade-in duration-200">
          {/* Header of Result */}
          <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-gray-100">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#167D5A] bg-[#E5F3EC] px-3 py-1 rounded-full mb-1">
                <Sparkles className="w-3.5 h-3.5 text-[#167D5A]" />
                Hasil Diagnosis SmartCheck · ID: {analysisResult.analysisId}
              </div>
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-900">
                {brand} {model} ({currentCatObj.name})
              </h2>
              <p className="text-xs text-gray-500">Tingkat Keyakinan Sistem: <strong>{analysisResult.confidenceScore}</strong></p>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-gray-400 block">Indikasi Keparahan</span>
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                analysisResult.severity === 'Berat'
                  ? 'bg-red-100 text-red-800 border border-red-300'
                  : analysisResult.severity === 'Sedang'
                  ? 'bg-amber-100 text-amber-800 border border-amber-300'
                  : 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              }`}>
                {analysisResult.severity}
              </span>
            </div>
          </div>

          {/* Safety Warning (If present) */}
          {analysisResult.safetyWarning && (
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <ShieldAlert className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-red-900 uppercase tracking-wide">Peringatan Keselamatan Penting</h4>
                <p className="text-xs text-red-800 mt-1 leading-relaxed">
                  {analysisResult.safetyWarning}
                </p>
              </div>
            </div>
          )}

          {/* Diagnostic Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Probable Causes */}
            <div className="p-4 rounded-2xl bg-[#F5F7F6] border border-gray-200/80 space-y-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <Wrench className="w-3.5 h-3.5 text-[#167D5A]" />
                Kemungkinan Penyebab Utama
              </h4>
              <ul className="space-y-1.5">
                {analysisResult.probableCauses.map((cause, idx) => (
                  <li key={idx} className="text-xs text-gray-700 flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#167D5A] mt-1.5 shrink-0"></span>
                    <span className="leading-relaxed">{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Suspected Components */}
            <div className="p-4 rounded-2xl bg-[#F5F7F6] border border-gray-200/80 space-y-2">
              <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 flex items-center gap-1.5">
                <BookmarkCheck className="w-3.5 h-3.5 text-blue-600" />
                Komponen yang Perlu Diperiksa / Diservis
              </h4>
              <div className="flex flex-wrap gap-1.5 pt-1">
                {analysisResult.affectedComponents.map((comp, idx) => (
                  <span key={idx} className="px-2.5 py-1 rounded-lg bg-white border border-gray-200 text-xs font-medium text-gray-800 shadow-2xs">
                    {comp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Initial Instructions & Cost Range */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
            <div className="md:col-span-2 p-4 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-1.5">
              <h4 className="font-heading font-bold text-xs text-[#105C45]">Arahan Awal Sebelum Teknisi Tiba:</h4>
              <ul className="space-y-1 text-xs text-gray-700">
                {analysisResult.initialInstructions.map((ins, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#167D5A] shrink-0" />
                    <span>{ins}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-2xl bg-[#105C45] text-white flex flex-col justify-between">
              <div>
                <span className="text-[10px] text-emerald-200 uppercase font-bold tracking-wider block">Estimasi Biaya Awal</span>
                <p className="font-heading font-extrabold text-base sm:text-lg mt-0.5">
                  Rp {analysisResult.estimatedCostMin.toLocaleString('id-ID')} - {analysisResult.estimatedCostMax.toLocaleString('id-ID')}
                </p>
              </div>
              <p className="text-[10px] text-emerald-200/80 mt-2">
                *Termasuk ongkos pemeriksaan & perkiraan suku cadang standar.
              </p>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSaveResult}
                className="px-4 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-semibold text-gray-700 transition-all cursor-pointer"
              >
                {savedSuccess ? '✓ Hasil Tersimpan!' : 'Simpan Hasil Analisis'}
              </button>

              <button
                type="button"
                onClick={handleHandoffToRepairOrReplace}
                className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-800 transition-all flex items-center gap-1.5 cursor-pointer"
                title="Bandingkan dengan harga beli barang baru"
              >
                <Scale className="w-3.5 h-3.5 text-gray-600" />
                <span>Cek Repair vs Replace</span>
              </button>
            </div>

            <button
              type="button"
              onClick={handleHandoffToSmartMatch}
              className="px-6 py-3 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs sm:text-sm shadow-md shadow-[#167D5A]/25 transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Teruskan ke SmartMatch (Cari Teknisi)</span>
              <ArrowRight className="w-4 h-4 text-emerald-200" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

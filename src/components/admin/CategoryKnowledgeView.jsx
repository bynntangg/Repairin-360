import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  BookOpen, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertTriangle, 
  Wrench, 
  Tag, 
  ShieldAlert,
  Sparkles
} from 'lucide-react';

export default function CategoryKnowledgeView() {
  const { categories } = useApp();
  const [selectedCatId, setSelectedCatId] = useState(categories[0]?.id || null);

  const activeCategory = categories.find(c => c.id === selectedCatId) || categories[0];

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <BookOpen className="w-4 h-4 text-[#167D5A]" />
            <span>Basis Pengetahuan Diagnosa SmartCheck</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Knowledge Base Kategori & Gejala
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Basis data aturan diagnosa otomatis SmartCheck, pemetaan gejala kerusakan, dan peringatan keselamatan kritis.
          </p>
        </div>

        <span className="text-xs font-bold px-3 py-1.5 rounded-full bg-[#E5F3EC] text-[#105C45] border border-[#167D5A]/20">
          {categories.length} Kategori Alat Terdaftar
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category List (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700 px-1">
            Kategori Perangkat Elektronik
          </h3>

          {categories.map(c => {
            const isSelected = c.id === activeCategory?.id;

            return (
              <div
                key={c.id}
                onClick={() => setSelectedCatId(c.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-white border-[#167D5A] shadow-md ring-2 ring-[#167D5A]/15'
                    : 'bg-white border-gray-200/80 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-heading font-bold text-sm text-gray-900">{c.name}</h4>
                  <span className="text-[10px] font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md">
                    {c.symptoms.length} Gejala
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1 line-clamp-1">{c.description}</p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 font-mono mt-2 pt-2 border-t border-gray-100">
                  <span>Usia rata-rata: {c.typicalLifeSpanYears} Thn</span>
                  <span>CO₂: -{c.co2SavedKg} kg</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Symptoms & Knowledge Detail (8 cols) */}
        {activeCategory && (
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
            <div className="flex items-start justify-between pb-4 border-b border-gray-100">
              <div>
                <span className="text-[10px] font-mono text-gray-400 font-bold uppercase">ID: {activeCategory.id}</span>
                <h3 className="font-heading font-extrabold text-xl text-gray-900 mt-0.5">{activeCategory.name}</h3>
                <p className="text-xs text-gray-500">{activeCategory.description}</p>
              </div>

              <div className="text-right text-xs">
                <span className="text-gray-400 block text-[10px]">Harga Baru Referensi</span>
                <span className="font-bold text-gray-900">Rp {activeCategory.avgReplaceCost.toLocaleString('id-ID')}</span>
              </div>
            </div>

            {/* Diagnostic Symptoms Checklist */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-gray-700">
                  Daftar Gejala Kerusakan Terdaftar di Kuesioner SmartCheck
                </h4>
                <span className="text-[11px] text-[#167D5A] font-semibold">Tersinkronisasi ke Aplikasi Pelanggan</span>
              </div>

              <div className="space-y-2 text-xs">
                {activeCategory.symptoms.map((s, idx) => (
                  <div key={s.id} className="p-3 rounded-xl bg-gray-50 border border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-5 h-5 rounded-full bg-white border border-gray-300 flex items-center justify-center font-mono text-[10px] text-gray-500">
                        {idx + 1}
                      </span>
                      <span className="font-medium text-gray-800">{s.label}</span>
                    </div>
                    <span className="text-[10px] font-mono text-gray-400">{s.id}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Alert Matrix */}
            <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-red-900">
                <ShieldAlert className="w-4 h-4 text-red-600" />
                <span>Trigger Peringatan Keselamatan Darurat:</span>
              </div>
              <p className="text-red-800 leading-relaxed">
                Jika pelanggan memilih opsi gejala bau hangus, korsleting listrik, atau percikan api pada kategori ini, SmartCheck akan otomatis menampilkan instruksi pemutusan steker segera dan mengunci status keparahan ke level <strong>Berat</strong>.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

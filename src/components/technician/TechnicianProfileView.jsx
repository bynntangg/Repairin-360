import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  User, 
  ShieldCheck, 
  MapPin, 
  Wrench, 
  FileText, 
  CheckCircle2, 
  Upload, 
  Save, 
  Phone, 
  Mail,
  Award
} from 'lucide-react';

export default function TechnicianProfileView() {
  const { technicians, activeTechnicianId, categories } = useApp();
  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  const [name, setName] = useState(currentTech.name);
  const [title, setTitle] = useState(currentTech.title);
  const [phone, setPhone] = useState(currentTech.phone);
  const [email, setEmail] = useState(currentTech.email);
  const [bio, setBio] = useState(currentTech.bio);
  const [experienceYears, setExperienceYears] = useState(currentTech.experienceYears);
  const [baseInspectionFee, setBaseInspectionFee] = useState(currentTech.baseInspectionFee);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2000);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#167D5A]">
            <User className="w-4 h-4 text-[#167D5A]" />
            <span>Manajemen Profil & Verifikasi Legalitas</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Profil Teknisi & Dokumen
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Kelola data diri, keahlian kategori servis, tarif kunjungan, dan berkas verifikasi resmi BNSP/LSP.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {currentTech.verified ? (
            <span className="px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Status: Terverifikasi Resmi</span>
            </span>
          ) : (
            <span className="px-3 py-1.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold">
              Status: Dalam Peninjauan Admin
            </span>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Data Identitas & Keahlian (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
          <form onSubmit={handleSave} className="space-y-5">
            <div className="flex items-center gap-4 pb-4 border-b border-gray-100">
              <img
                src={currentTech.avatar}
                alt={currentTech.name}
                className="w-20 h-20 rounded-2xl object-cover ring-2 ring-[#167D5A]/30 shadow-md"
              />
              <div className="space-y-1">
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-xs font-bold text-gray-700 cursor-pointer"
                >
                  Ganti Foto Profil
                </button>
                <p className="text-[10px] text-gray-400">Format JPG atau PNG maksimal 2MB</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Nama Lengkap & Gelar</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Judul / Gelar Keahlian</label>
                <input
                  type="text"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Nomor WhatsApp</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Email Resmi</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Pengalaman Kerja (Tahun)</label>
                <input
                  type="number"
                  value={experienceYears}
                  onChange={e => setExperienceYears(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Tarif Pemeriksaan Standar (Rp)</label>
                <input
                  type="number"
                  step="5000"
                  value={baseInspectionFee}
                  onChange={e => setBaseInspectionFee(Number(e.target.value))}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] font-bold text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Bio & Ringkasan Keahlian</label>
              <textarea
                rows={3}
                value={bio}
                onChange={e => setBio(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 p-3 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
              />
            </div>

            <div className="pt-2 flex items-center justify-between">
              {savedSuccess ? (
                <span className="text-xs font-bold text-[#167D5A] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#167D5A]" />
                  Profil berhasil disimpan!
                </span>
              ) : <span></span>}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
              >
                <Save className="w-4 h-4" />
                <span>Simpan Perubahan</span>
              </button>
            </div>
          </form>
        </div>

        {/* Right Form: Verification Documents (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-5">
          <div>
            <h3 className="font-heading font-bold text-sm text-gray-900 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#167D5A]" />
              Dokumen Verifikasi Akun
            </h3>
            <p className="text-xs text-gray-500 mt-0.5">
              Ditinjau langsung oleh admin kepatuhan REPAIRIN 360 untuk menjaga standar mutu dan keamanan pelanggan.
            </p>
          </div>

          <div className="space-y-3">
            {currentTech.documents.map((doc, idx) => (
              <div key={idx} className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-gray-200 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="w-5 h-5 text-gray-400" />
                  <div>
                    <span className="font-bold text-gray-800 block">{doc.name}</span>
                    <span className="text-[10px] text-gray-400">Diupload: {doc.date}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  doc.status === 'verified'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {doc.status === 'verified' ? 'Terverifikasi' : 'Menunggu Review'}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl border-2 border-dashed border-gray-200 hover:border-[#167D5A] bg-gray-50/50 text-center cursor-pointer transition-colors space-y-1">
            <Upload className="w-5 h-5 text-gray-400 mx-auto" />
            <span className="text-xs font-bold text-gray-700 block">Unggah Dokumen Sertifikasi Baru</span>
            <span className="text-[10px] text-gray-400">PDF, JPG, atau PNG (Sertifikat Pelatihan / SKCK)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

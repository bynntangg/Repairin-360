import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  Leaf, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  Mail, 
  User, 
  Phone, 
  ArrowRight, 
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function AuthView() {
  const { login, quickLogin, register } = useApp();

  const [mode, setMode] = useState('login'); // 'login' | 'register'
  
  // Login State
  const [loginEmail, setLoginEmail] = useState('budi.santoso@gmail.com');
  const [loginPassword, setLoginPassword] = useState('password123');
  const [loginError, setLoginError] = useState('');

  // Register State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regRole, setRegRole] = useState('customer');
  const [regError, setRegError] = useState('');

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginError('');
    const res = login(loginEmail, loginPassword);
    if (!res.success) {
      setLoginError(res.message);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');
    if (!regName || !regEmail || !regPassword) {
      setRegError('Mohon lengkapi semua kolom wajib.');
      return;
    }
    const res = register({
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
      role: regRole
    });
    if (!res.success) {
      setRegError(res.message);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7F6] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl border border-gray-200/80 overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        {/* Left Side: Brand Visual Banner & Illustrated Ecosystem (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-[#105C45] via-[#167D5A] to-[#1e8a64] text-white p-8 sm:p-10 flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/5 pointer-events-none blur-2xl"></div>

          {/* Logo */}
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white text-[#105C45] flex items-center justify-center shadow-lg">
                <div className="relative">
                  <Wrench className="w-6 h-6 text-[#167D5A]" />
                  <Leaf className="w-4 h-4 text-emerald-500 absolute -bottom-1 -right-1" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-heading font-black text-2xl text-white tracking-tight">REPAIRIN</span>
                  <span className="font-heading font-black text-2xl text-emerald-300">360</span>
                </div>
                <span className="text-[10px] text-emerald-200 uppercase tracking-widest font-semibold block">Circular Ecosystem</span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed pt-2">
              Platform layanan reparasi pintar dan ekosistem sirkular pertama di Indonesia. Memperbaiki barang, memperpanjang usia pakai, dan mengurangi timbulan limbah elektronik.
            </p>
          </div>

          {/* Illustration Visual Preview */}
          <div className="my-8 relative z-10">
            <div className="rounded-2xl overflow-hidden shadow-xl border-2 border-white/20 relative group">
              <img
                src="/images/engineer.png"
                alt="Teknisi Servis Elektronik Profesional"
                className="w-full h-44 object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                <div className="text-white">
                  <span className="text-[10px] uppercase font-bold text-emerald-300 block">Jaminan Kualitas</span>
                  <p className="text-xs font-semibold">Teknisi Servis Panggilan Terverifikasi Resmi</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value Props Bullet points */}
          <div className="space-y-2.5 relative z-10 text-xs text-emerald-100">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Transparansi Biaya & Suku Cadang Resmi (PriceGuard)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Paspor Reparasi Digital & Garansi Resmi 90 Hari</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-300 shrink-0" />
              <span>Insentif Poin Sirkular untuk Setiap Reparasi</span>
            </div>
          </div>

          <div className="pt-6 border-t border-white/15 text-[11px] text-emerald-200/70 relative z-10">
            "Repair It. Extend Its Life. Reduce Waste."
          </div>
        </div>

        {/* Right Side: Authentication Forms (7 cols) */}
        <div className="lg:col-span-7 p-8 sm:p-12 flex flex-col justify-between">
          <div className="space-y-6">
            {/* Header Tabs */}
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div>
                <h2 className="font-heading font-extrabold text-2xl text-gray-900">
                  {mode === 'login' ? 'Masuk ke Akun Anda' : 'Daftar Akun Baru'}
                </h2>
                <p className="text-xs text-gray-500 mt-1">
                  {mode === 'login' 
                    ? 'Silakan masuk untuk mengakses layanan reparasi dan dasbor peran Anda.' 
                    : 'Bergabunglah dengan ekosistem sirkular reparasi terpercaya di Indonesia.'}
                </p>
              </div>

              {/* Toggle Mode */}
              <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => setMode('login')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mode === 'login' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Masuk
                </button>
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className={`px-3 py-1.5 rounded-lg transition-all ${
                    mode === 'register' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  Daftar
                </button>
              </div>
            </div>

            {/* Form Login */}
            {mode === 'login' ? (
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {loginError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{loginError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Alamat Email</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="email"
                      value={loginEmail}
                      onChange={e => setLoginEmail(e.target.value)}
                      placeholder="nama@email.com"
                      className="w-full text-xs rounded-xl border border-gray-300 pl-10 pr-3 py-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A]"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-gray-700">Kata Sandi</label>
                    <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Silakan gunakan salah satu Akun Cepat di bawah.'); }} className="text-[11px] text-[#167D5A] hover:underline font-semibold">
                      Lupa kata sandi?
                    </a>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="password"
                      value={loginPassword}
                      onChange={e => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full text-xs rounded-xl border border-gray-300 pl-10 pr-3 py-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A] focus:border-[#167D5A]"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md shadow-[#167D5A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <span>Masuk ke Akun</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              /* Form Register */
              <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                {regError && (
                  <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
                    <span>{regError}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Daftar Sebagai Peran:</label>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setRegRole('customer')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        regRole === 'customer'
                          ? 'bg-[#E5F3EC] text-[#105C45] border-[#167D5A] ring-1 ring-[#167D5A]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      👤 Pelanggan (Customer)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegRole('technician')}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all text-center ${
                        regRole === 'technician'
                          ? 'bg-[#E5F3EC] text-[#105C45] border-[#167D5A] ring-1 ring-[#167D5A]'
                          : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      🔧 Mitra Teknisi Servis
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Nama Lengkap</label>
                  <div className="relative">
                    <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
                    <input
                      type="text"
                      placeholder="Nama lengkap Anda"
                      value={regName}
                      onChange={e => setRegName(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 pl-10 pr-3 py-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={regEmail}
                      onChange={e => setRegEmail(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">No. WhatsApp</label>
                    <input
                      type="text"
                      placeholder="0812-xxxx-xxxx"
                      value={regPhone}
                      onChange={e => setRegPhone(e.target.value)}
                      className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Kata Sandi (Min. 8 Karakter)</label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={regPassword}
                    onChange={e => setRegPassword(e.target.value)}
                    className="w-full text-xs rounded-xl border border-gray-300 px-3 py-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white font-heading font-bold text-xs shadow-md shadow-[#167D5A]/20 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Buat Akun Sekarang</span>
                </button>
              </form>
            )}

            {/* Quick Demo Login Option (Single-Click) */}
            <div className="pt-6 border-t border-gray-100 space-y-2.5">
              <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block text-center">
                Atau Masuk Cepat dengan Akun Tersedia:
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => quickLogin('customer')}
                  className="p-2.5 rounded-xl border border-gray-200 hover:border-[#167D5A] bg-gray-50 hover:bg-[#E5F3EC] text-left transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-[#167D5A] block uppercase">👤 Pelanggan</span>
                  <span className="text-xs font-bold text-gray-800 block">Bintang Permana</span>
                  <span className="text-[10px] text-gray-400">Pesan & Lacak Servis</span>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('technician', 'tech-2')}
                  className="p-2.5 rounded-xl border border-gray-200 hover:border-[#167D5A] bg-gray-50 hover:bg-[#E5F3EC] text-left transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-blue-700 block uppercase">🔧 Teknisi Mitra</span>
                  <span className="text-xs font-bold text-gray-800 block">Dian Pratama</span>
                  <span className="text-[10px] text-gray-400">Kelola Servis & Biaya</span>
                </button>

                <button
                  type="button"
                  onClick={() => quickLogin('admin')}
                  className="p-2.5 rounded-xl border border-gray-200 hover:border-[#167D5A] bg-gray-50 hover:bg-[#E5F3EC] text-left transition-all cursor-pointer group"
                >
                  <span className="text-[10px] font-bold text-purple-700 block uppercase">⚡ Admin Pusat</span>
                  <span className="text-xs font-bold text-gray-800 block">Admin Operasional</span>
                  <span className="text-[10px] text-gray-400">Verifikasi & Analytics</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 text-center text-xs text-gray-400">
            © 2026 REPAIRIN 360 Ecosystem · Dilindungi Hak Cipta
          </div>
        </div>
      </div>
    </div>
  );
}

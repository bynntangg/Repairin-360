import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  CheckCircle2, Lock, Mail, User, ArrowRight, AlertCircle, X,
  ShieldCheck, Leaf, Wrench, Sparkles, Star, Coins, Cpu, 
  Search, CreditCard, FileCheck, Check, PlayCircle
} from 'lucide-react';

export default function AuthView() {
  const { login, quickLogin, register } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState('login');
  
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
    if (!res.success) setLoginError(res.message);
    else setIsOpen(false);
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setRegError('');
    if (!regName || !regEmail || !regPassword) {
      setRegError('Mohon lengkapi semua kolom wajib.');
      return;
    }
    const res = register({
      name: regName, email: regEmail, phone: regPhone, password: regPassword, role: regRole
    });
    if (!res.success) setRegError(res.message);
    else setIsOpen(false);
  };

  const openAuth = (type) => {
    setMode(type);
    setIsOpen(true);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 overflow-x-hidden selection:bg-[#167D5A] selection:text-white relative">
      
      {/* ==========================================
          BACKGROUND EFFECT (Soft Glow)
          ========================================== */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40rem] h-[40rem] bg-[#E5F3EC] rounded-full blur-[120px] opacity-50"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30rem] h-[30rem] bg-emerald-50 rounded-full blur-[100px] opacity-60"></div>
      </div>

      {/* ==========================================
          1. NAVBAR
          ========================================== */}
      <nav className="fixed w-full top-0 z-40 bg-white/80 backdrop-blur-xl border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white shadow-sm border border-gray-100 flex items-center justify-center p-1.5">
                <img src="/images/Logo Repairin.png" alt="Logo" className="w-full h-full object-contain" />
              </div>
              <span className="font-heading font-black text-lg sm:text-xl text-[#105C45] tracking-tight">REPAIRIN 360</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-500">
              <a href="#fitur" className="hover:text-[#105C45] transition-colors">Fitur</a>
              <a href="#cara-kerja" className="hover:text-[#105C45] transition-colors">Cara Kerja</a>
              <a href="#testimoni" className="hover:text-[#105C45] transition-colors">Testimoni</a>
            </div>

            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={() => openAuth('login')}
                className="hidden sm:block text-sm font-bold text-gray-600 hover:text-[#105C45] transition-colors px-3 py-2"
              >
                Masuk
              </button>
              <button 
                onClick={() => openAuth('register')}
                className="bg-[#105C45] hover:bg-[#167D5A] text-white px-4 sm:px-6 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-lg shadow-[#105C45]/20 transition-all active:scale-95"
              >
                Daftar Gratis
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* ==========================================
          2. HERO SECTION (3D Interactive)
          ========================================== */}
      <section className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Teks Kiri */}
          <div className="flex-1 text-center lg:text-left space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-[#105C45] text-[10px] sm:text-xs font-bold uppercase tracking-widest shadow-sm">
              <Sparkles className="w-4 h-4 text-[#167D5A]" />
              Platform Reparasi Pertama di Indonesia
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-extrabold leading-[1.15] tracking-tight text-gray-900">
              Servis Elektronik <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#105C45] to-[#25a878]">
                Tanpa Drama.
              </span>
            </h1>
            
            <p className="text-gray-500 text-sm sm:text-base lg:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Hubungkan diri Anda dengan teknisi panggilan terverifikasi. Dapatkan transparansi biaya (PriceGuard), garansi resmi 90 hari, dan lacak servis secara *real-time*.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <button 
                onClick={() => openAuth('register')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#105C45] hover:bg-[#167D5A] text-white font-bold text-sm sm:text-base shadow-xl shadow-[#105C45]/20 transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                Mulai Perbaiki <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={() => openAuth('login')}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-white border-2 border-gray-100 hover:border-gray-200 hover:bg-gray-50 text-gray-700 font-bold text-sm sm:text-base shadow-sm transition-all active:scale-95"
              >
                Masuk Dasbor
              </button>
            </div>

            {/* Rating & Trust */}
            <div className="pt-6 flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm text-gray-500 font-semibold">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-1 text-gray-900 font-bold">4.9/5</span>
              </div>
              <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#167D5A]" /> 10,000+ Perbaikan Sukses
              </div>
            </div>
          </div>

          {/* Kanan: 3D Interactive Visual Container */}
          <div className="flex-1 w-full max-w-[340px] sm:max-w-[400px] relative mx-auto perspective-1000 group">
            
            {/* Base Frame (Kartu Utama) */}
            <div className="relative w-full rounded-[2.5rem] bg-white p-3 shadow-[0_20px_50px_rgba(0,0,0,0.08)] border border-gray-100 transform transition-transform duration-500 ease-out group-hover:rotate-y-[-5deg] group-hover:rotate-x-[5deg]">
              
              {/* Inner Image */}
              <div className="relative rounded-[2rem] overflow-hidden aspect-[4/5] bg-gray-100">
                <img 
                  src="/images/engineer.png" 
                  alt="Teknisi" 
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                
                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/50 cursor-pointer">
                    <PlayCircle className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* FLOATING 3D ELEMENT 1 */}
              <div className="absolute -left-6 top-1/4 bg-white/80 backdrop-blur-xl border border-white p-3 rounded-2xl shadow-xl transform transition-transform duration-500 ease-out group-hover:translate-z-20 group-hover:-translate-x-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E5F3EC] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-[#105C45]" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider">Garansi Resmi</p>
                    <p className="text-sm font-black text-gray-900 leading-none mt-0.5">90 Hari</p>
                  </div>
                </div>
              </div>

              {/* FLOATING 3D ELEMENT 2 */}
              <div className="absolute -right-4 bottom-1/4 bg-[#105C45] text-white p-3.5 rounded-2xl shadow-xl shadow-[#105C45]/30 transform transition-transform duration-500 ease-out group-hover:translate-z-30 group-hover:translate-y-4 group-hover:-rotate-6">
                <div className="flex items-center gap-2">
                  <Coins className="w-6 h-6 text-yellow-300" />
                  <div>
                    <p className="text-[9px] text-emerald-100 font-bold uppercase tracking-wider">Poin Sirkular</p>
                    <p className="text-sm font-black leading-none mt-0.5">+2,500 XP</p>
                  </div>
                </div>
              </div>

              {/* FLOATING 3D ELEMENT 3 */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md border border-gray-100 px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2 transform transition-transform duration-500 ease-out group-hover:translate-z-20 group-hover:-translate-y-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-[11px] font-bold text-gray-800 whitespace-nowrap">Teknisi Dalam Perjalanan</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          3. STATS BAR (Membangun Kepercayaan)
          ========================================== */}
      <section className="border-y border-gray-100 bg-gray-50/50 relative z-10 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#105C45]">10K+</p>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Perbaikan Sukses</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#105C45]">850+</p>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Teknisi Terverifikasi</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#105C45]">12.4T</p>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Limbah Dicegah (Kg)</p>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-black text-[#105C45]">4.9/5</p>
              <p className="text-xs sm:text-sm text-gray-500 font-semibold mt-1">Rating Kepuasan</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          4. FITUR UTAMA (Bento Box Layout)
          ========================================== */}
      <section id="fitur" className="py-20 sm:py-28 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold mb-4 text-gray-900">Bukan Sekadar Aplikasi Servis</h2>
            <p className="text-gray-500 text-sm sm:text-base">Kami membangun ekosistem yang melindungi Anda dari awal hingga akhir proses perbaikan.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {/* Fitur 1 (Besar) */}
            <div className="md:col-span-2 bg-gradient-to-br from-[#F5F7F6] to-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 bg-white text-[#105C45] rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-gray-100 group-hover:scale-110 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-extrabold text-2xl mb-3 text-gray-900">PriceGuard Protection</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  Dapatkan estimasi biaya transparan sebelum servis dimulai. Kami menjamin tidak ada biaya siluman atau markup suku cadang. Semua tercatat sistem.
                </p>
                <ul className="space-y-3 text-sm font-semibold text-gray-700">
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#167D5A]" /> Estimasi Harga Real-time</li>
                  <li className="flex items-center gap-2"><Check className="w-5 h-5 text-[#167D5A]" /> Jaminan Suku Cadang Original</li>
                </ul>
              </div>
              {/* Ornamen */}
              <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-[#E5F3EC] rounded-full blur-2xl opacity-50 pointer-events-none"></div>
            </div>

            {/* Fitur 2 */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <FileCheck className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl mb-3 text-gray-900">Paspor Digital</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Setiap servis menghasilkan catatan digital permanen. Tingkatkan nilai jual barang Anda di masa depan dengan riwayat perawatan resmi.
              </p>
            </div>

            {/* Fitur 3 */}
            <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-xl mb-3 text-gray-900">Teknisi Tersertifikasi</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                Hanya teknisi dengan KTP terverifikasi dan lulus uji kompetensi yang dapat menerima pesanan di platform kami.
              </p>
            </div>

            {/* Fitur 4 (Besar) */}
            <div className="md:col-span-2 bg-[#105C45] p-8 sm:p-10 rounded-[2rem] shadow-lg text-white relative overflow-hidden group">
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="max-w-md">
                  <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm border border-white/20 group-hover:scale-110 transition-transform">
                    <Leaf className="w-6 h-6" />
                  </div>
                  <h3 className="font-extrabold text-2xl mb-3">Ekosistem Sirkular</h3>
                  <p className="text-emerald-100/90 text-sm leading-relaxed">
                    Dapatkan poin setiap kali Anda memilih memperbaiki daripada membeli baru. Poin dapat ditukar dengan voucher atau donasi lingkungan.
                  </p>
                </div>
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-5 rounded-2xl text-center shrink-0 w-full sm:w-auto">
                  <Coins className="w-8 h-8 text-yellow-300 mx-auto mb-2" />
                  <p className="text-2xl font-black">+1,250</p>
                  <p className="text-[10px] uppercase tracking-wider font-bold text-emerald-200">Poin / Servis</p>
                </div>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          5. CARA KERJA (How it Works)
          ========================================== */}
      <section id="cara-kerja" className="py-20 bg-gray-50 border-y border-gray-100 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold mb-4 text-gray-900">Semudah 1-2-3</h2>
            <p className="text-gray-500 text-sm sm:text-base">Pesan teknisi tanpa perlu menelepon sana-sini.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Garis penghubung (Hanya Desktop) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-gray-50 shadow-md mb-6 text-[#105C45]">
                <Search className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">1. Pilih Layanan</h4>
              <p className="text-gray-500 text-sm px-4">Cari jenis kerusakan, tentukan jadwal, dan lihat estimasi biaya secara langsung.</p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-gray-50 shadow-md mb-6 text-[#105C45]">
                <Wrench className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">2. Teknisi Datang</h4>
              <p className="text-gray-500 text-sm px-4">Teknisi terverifikasi datang ke lokasi Anda tepat waktu dan mulai melakukan diagnosa.</p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center">
              <div className="w-20 h-20 mx-auto bg-white rounded-full flex items-center justify-center border-4 border-gray-50 shadow-md mb-6 text-[#105C45]">
                <CreditCard className="w-8 h-8" />
              </div>
              <h4 className="font-bold text-lg mb-2 text-gray-900">3. Bayar & Selesai</h4>
              <p className="text-gray-500 text-sm px-4">Bayar sesuai kesepakatan awal. Terima nota digital dan garansi resmi langsung di aplikasi.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          6. TESTIMONI
          ========================================== */}
      <section id="testimoni" className="py-20 sm:py-28 relative z-10 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold mb-4 text-gray-900">Apa Kata Mereka?</h2>
            <p className="text-gray-500 text-sm sm:text-base">Ribuan pengguna telah merasakan kemudahan servis dengan Repairin 360.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Testi 1 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex gap-1 mb-4 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"Gak nyangka servis AC bisa setransparan ini. Harganya fix di awal, teknisinya ramah dan profesional. Gak ada biaya nambah-nambah."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-700">BS</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Budi Santoso</p>
                  <p className="text-[11px] text-gray-500">Pelanggan</p>
                </div>
              </div>
            </div>
            {/* Testi 2 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex gap-1 mb-4 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"Sebagai teknisi, platform ini sangat membantu. Orderan lancar, pembayaran aman, dan pelanggan sudah tahu estimasi harganya jadi gak nego berlebihan."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center font-bold text-emerald-700">DP</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Dian Pratama</p>
                  <p className="text-[11px] text-gray-500">Mitra Teknisi</p>
                </div>
              </div>
            </div>
            {/* Testi 3 */}
            <div className="bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="flex gap-1 mb-4 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" /><Star className="w-4 h-4 fill-yellow-400" />
              </div>
              <p className="text-gray-700 text-sm leading-relaxed mb-6">"Suka banget sama fitur paspor digitalnya. Jadi tahu riwayat servis laptop dari dulu. Ada poinnya juga yang bisa ditukar voucher."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center font-bold text-purple-700">SA</div>
                <div>
                  <p className="text-sm font-bold text-gray-900">Siti Aminah</p>
                  <p className="text-[11px] text-gray-500">Pelanggan</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================
          7. CTA SECTION
          ========================================== */}
      <section className="py-16 sm:py-20 relative z-10 px-4">
        <div className="max-w-5xl mx-auto bg-[#105C45] rounded-[2.5rem] p-8 sm:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-heading font-extrabold text-white mb-4">Siap Memperbaiki Barang Anda?</h2>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl mx-auto mb-8">
              Bergabunglah dengan ribuan orang yang telah merasakan pengalaman servis yang lebih cerdas, aman, dan transparan.
            </p>
            <button 
              onClick={() => openAuth('register')}
              className="bg-white text-[#105C45] hover:bg-gray-50 px-8 py-4 rounded-full font-bold text-sm sm:text-base shadow-xl transition-all active:scale-95"
            >
              Daftar Akun Sekarang
            </button>
          </div>
        </div>
      </section>

      {/* ==========================================
          8. FOOTER (Referensi dari user)
          ========================================== */}
      <footer className="bg-[#105C45] text-white pt-12 pb-8 border-t border-emerald-900 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-emerald-800/60">
            
            {/* Brand Info */}
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center overflow-hidden p-1.5 shrink-0">
                  <img 
                    src="/images/Logo Repairin.png" 
                    alt="Repairin 360 Logo" 
                    className="w-full h-full object-contain" 
                  />
                </div>
                <span className="font-heading font-black text-2xl tracking-tight text-white">
                  REPAIRIN 360
                </span>
              </div>
              
              <p className="text-emerald-100/80 text-xs sm:text-sm leading-relaxed max-w-md">
                Platform layanan reparasi pintar dan ekosistem sirkular pertama di Indonesia yang menghubungkan pelanggan dengan teknisi servis panggilan terverifikasi. Transparan, terpercaya, dan bergaransi resmi digital.
              </p>
              
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 inline-flex items-center gap-2 text-xs text-emerald-200">
                <Leaf className="w-4 h-4 text-emerald-300 shrink-0" />
                <span className="font-semibold italic">"Repair It. Extend Its Life. Reduce Waste."</span>
              </div>
            </div>

            {/* 6 Core Features */}
            <div>
              <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-emerald-300 mb-3">Layanan Utama</h4>
              <ul className="space-y-2 text-xs text-emerald-100/80">
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  SmartCheck (Analisis Kerusakan)
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  SmartMatch (Pencocokan Teknisi)
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  PriceGuard (Transparansi Biaya)
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Repair Passport (Riwayat Digital)
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Circular Reward (Poin & Diskon)
                </li>
                <li className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                  Repair or Replace Decision
                </li>
              </ul>
            </div>

            {/* Ekosistem Sirkular & Standar */}
            <div>
              <h4 className="font-heading font-semibold text-xs uppercase tracking-wider text-emerald-300 mb-3">Ekosistem Sirkular</h4>
              <p className="text-xs text-emerald-100/80 leading-relaxed mb-3">
                Mendukung SDG 12 (Pola Konsumsi dan Produksi Bertanggung Jawab) serta pengurangan timbulan limbah elektronik (E-Waste) nasional.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-medium text-emerald-200">Zero E-Waste Target</span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-medium text-emerald-200">Teknisi Terverifikasi</span>
                <span className="px-2 py-1 rounded-md bg-white/10 text-[10px] font-medium text-emerald-200">Garansi 90 Hari</span>
              </div>
            </div>
          </div>

          {/* Bottom Credits */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-emerald-200/60 gap-3">
            <p>© 2026 REPAIRIN 360 Ecosystem. Seluruh Hak Cipta Dilindungi.</p>
            <p className="flex items-center gap-1 text-[11px]">
              Platform Layanan Reparasi Digital & Ekosistem Sirkular Terpercaya Indonesia
            </p>
          </div>
        </div>
      </footer>

      {/* ==========================================
          9. MODAL LOGIN / REGISTER
          ========================================== */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setIsOpen(false)}></div>

          <div className="relative w-full max-w-[420px] bg-white rounded-t-[2rem] sm:rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-slide-up sm:animate-zoom-in max-h-[95vh] sm:max-h-[90vh]">
            
            <div className="relative pt-6 sm:pt-8 pb-2 px-5 sm:px-6 text-center shrink-0">
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
                <X className="w-4 h-4" />
              </button>

              <div className="mx-auto w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white border border-gray-50 flex items-center justify-center mb-2 sm:mb-3 p-1 shadow-sm">
                <img src="/images/Logo Repairin.png" alt="Logo" className="w-full h-full object-contain scale-110" />
              </div>
              
              <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-gray-900 tracking-tight">
                {mode === 'login' ? 'Selamat Datang' : 'Buat Akun Baru'}
              </h2>
              <p className="text-[11px] sm:text-[13px] text-gray-500 mt-1 px-4">
                {mode === 'login' ? 'Masuk untuk melanjutkan.' : 'Bergabunglah dengan ekosistem kami.'}
              </p>
            </div>

            <div className="px-5 sm:px-6 mb-4 mt-2 shrink-0">
              <div className="flex bg-gray-100/80 p-1 rounded-xl">
                <button type="button" onClick={() => setMode('login')} className={`flex-1 py-2 text-[12px] sm:text-[13px] font-bold rounded-lg transition-all ${mode === 'login' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Masuk</button>
                <button type="button" onClick={() => setMode('register')} className={`flex-1 py-2 text-[12px] sm:text-[13px] font-bold rounded-lg transition-all ${mode === 'register' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'}`}>Daftar</button>
              </div>
            </div>

            <div className="px-5 sm:px-6 pb-6 overflow-y-auto custom-scrollbar flex-1">
              {mode === 'login' ? (
                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {loginError && (
                    <div className="p-3 rounded-xl bg-red-50 text-[11px] text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" /><span>{loginError}</span>
                    </div>
                  )}
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} placeholder="nama@email.com" className="w-full text-[13px] font-medium bg-gray-50 rounded-xl pl-10 pr-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#167D5A]/20 focus:border-[#167D5A] border border-transparent transition-all" required />
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1.5 ml-1">
                      <label className="block text-[11px] font-bold text-gray-500">Kata Sandi</label>
                      <a href="#forgot" onClick={(e) => { e.preventDefault(); alert('Gunakan Akun Cepat di bawah.'); }} className="text-[11px] text-[#167D5A] font-semibold mr-1">Lupa?</a>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input type="password" value={loginPassword} onChange={e => setLoginPassword(e.target.value)} placeholder="••••••••" className="w-full text-[13px] font-medium bg-gray-50 rounded-xl pl-10 pr-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#167D5A]/20 focus:border-[#167D5A] border border-transparent transition-all" required />
                    </div>
                  </div>
                  <button type="submit" className="w-full py-3.5 mt-2 rounded-full bg-[#105C45] hover:bg-[#167D5A] text-white font-heading font-bold text-sm shadow-lg shadow-[#105C45]/20 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <span>Masuk ke Akun</span><ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  {regError && (
                    <div className="p-3 rounded-xl bg-red-50 text-[11px] text-red-600 flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" /><span>{regError}</span>
                    </div>
                  )}
                  <div className="grid grid-cols-2 gap-2 mb-1">
                    <button type="button" onClick={() => setRegRole('customer')} className={`py-2 px-2 rounded-xl border text-[12px] font-bold transition-all ${regRole === 'customer' ? 'bg-[#105C45] text-white border-[#105C45]' : 'bg-gray-50 text-gray-600 border-transparent'}`}>👤 Pelanggan</button>
                    <button type="button" onClick={() => setRegRole('technician')} className={`py-2 px-2 rounded-xl border text-[12px] font-bold transition-all ${regRole === 'technician' ? 'bg-[#105C45] text-white border-[#105C45]' : 'bg-gray-50 text-gray-600 border-transparent'}`}>🔧 Teknisi</button>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">Nama Lengkap</label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
                      <input type="text" placeholder="Nama Anda" value={regName} onChange={e => setRegName(e.target.value)} className="w-full text-[13px] font-medium bg-gray-50 rounded-xl pl-10 pr-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#167D5A]/20 focus:border-[#167D5A] border border-transparent transition-all" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">Email</label>
                    <input type="email" placeholder="nama@email.com" value={regEmail} onChange={e => setRegEmail(e.target.value)} className="w-full text-[13px] font-medium bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#167D5A]/20 focus:border-[#167D5A] border border-transparent transition-all" required />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">No. WhatsApp</label>
                    <input type="text" placeholder="0812-xxxx-xxxx" value={regPhone} onChange={e => setRegPhone(e.target.value)} className="w-full text-[13px] font-medium bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#167D5A]/20 focus:border-[#167D5A] border border-transparent transition-all" />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-gray-500 mb-1.5 ml-1">Kata Sandi</label>
                    <input type="password" placeholder="Min. 8 karakter" value={regPassword} onChange={e => setRegPassword(e.target.value)} className="w-full text-[13px] font-medium bg-gray-50 rounded-xl px-4 py-3 outline-none focus:bg-white focus:ring-2 focus:ring-[#167D5A]/20 focus:border-[#167D5A] border border-transparent transition-all" required />
                  </div>
                  <button type="submit" className="w-full py-3.5 mt-2 rounded-full bg-[#105C45] hover:bg-[#167D5A] text-white font-heading font-bold text-sm shadow-lg shadow-[#105C45]/20 transition-all flex items-center justify-center gap-2 active:scale-95">
                    <CheckCircle2 className="w-4 h-4" /><span>Daftar Sekarang</span>
                  </button>
                </form>
              )}
            </div>

            {mode === 'login' && (
              <div className="bg-gray-50/80 px-4 sm:px-6 py-4 border-t border-gray-100 shrink-0">
                <span className="text-[9px] sm:text-[10px] font-bold text-gray-400 block text-center mb-2.5 uppercase tracking-wider">Quick Login (Demo)</span>
                <div className="flex justify-center gap-2">
                  <button onClick={() => { quickLogin('customer'); setIsOpen(false); }} className="flex-1 py-2 bg-white rounded-lg text-[10px] sm:text-[11px] font-bold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">👤 Pelanggan</button>
                  <button onClick={() => { quickLogin('technician', 'tech-2'); setIsOpen(false); }} className="flex-1 py-2 bg-white rounded-lg text-[10px] sm:text-[11px] font-bold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">🔧 Teknisi</button>
                  <button onClick={() => { quickLogin('admin'); setIsOpen(false); }} className="flex-1 py-2 bg-white rounded-lg text-[10px] sm:text-[11px] font-bold text-gray-700 shadow-sm border border-gray-200 hover:bg-gray-50 transition-colors">⚡ Admin</button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}
    </div>
  );
}
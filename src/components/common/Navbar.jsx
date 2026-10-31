import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  Leaf, 
  Bell, 
  User, 
  RotateCcw, 
  ChevronDown,
  LogOut,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab }) {
  const { 
    currentUser,
    currentRole, 
    technicians, 
    activeTechnicianId, 
    notifications, 
    rewards,
    logout,
    resetDemoState 
  } = useApp();

  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const unreadNotifs = notifications.filter(n => !n.read && (n.role === currentRole || n.role === 'all'));
  const activeTechObj = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  const handleLogout = () => {
    logout();
  };

  const getRoleBadge = () => {
    if (currentRole === 'customer') {
      return <span className="text-[10px] bg-emerald-100 text-[#105C45] font-bold px-2 py-0.5 rounded-full uppercase">Pelanggan</span>;
    }
    if (currentRole === 'technician') {
      return <span className="text-[10px] bg-blue-100 text-blue-800 font-bold px-2 py-0.5 rounded-full uppercase">Teknisi Mitra</span>;
    }
    if (currentRole === 'admin') {
      return <span className="text-[10px] bg-purple-100 text-purple-800 font-bold px-2 py-0.5 rounded-full uppercase">Administrator</span>;
    }
    return null;
  };

  // Fungsi untuk menangani klik menu di mobile
  const handleMobileNav = (tab) => {
    setActiveTab(tab);
    setShowMobileMenu(false);
  };

  // Array Menu Dinamis berdasarkan Role
  const getCustomerMenus = () => [
    { id: 'dashboard', label: '🏠 Beranda' },
    { id: 'smartcheck', label: '🔍 SmartCheck (Diagnosis)' },
    { id: 'smartmatch', label: '🎯 SmartMatch (Cari Teknisi)' },
    { id: 'orders', label: '📋 Pesanan & PriceGuard' },
    { id: 'passports', label: '🛂 Repair Passport' },
    { id: 'rewards', label: '🌱 Circular Reward' },
    { id: 'repair-or-replace', label: '⚖️ Repair vs Replace' },
  ];

  const getTechMenus = () => [
    { id: 'tech-dashboard', label: '📊 Ringkasan Teknisi' },
    { id: 'tech-requests', label: '📥 Permintaan Masuk' },
    { id: 'tech-workspace', label: '🛠️ Workspace & PriceGuard' },
    { id: 'tech-schedule', label: '📅 Manajemen Jadwal' },
    { id: 'tech-income', label: '💰 Pendapatan (Bagi Hasil 85:15)' },
    { id: 'tech-profile', label: '🪪 Profil & Dokumen Verifikasi' },
  ];

  const getAdminMenus = () => [
    { id: 'admin-dashboard', label: '📈 Analytics & Dampak Sirkular' },
    { id: 'admin-verifications', label: '✅ Verifikasi Teknisi' },
    { id: 'admin-bookings', label: '📑 Manajemen Pesanan & Transaksi' },
    { id: 'admin-categories', label: '🧠 Knowledge Base & Kategori' },
    { id: 'admin-rewards', label: '🎁 Aturan Reward & Poin' },
    { id: 'admin-complaints', label: '⚖️ Penanganan Pengaduan' },
  ];

  const currentMenus = currentRole === 'customer' ? getCustomerMenus() 
                     : currentRole === 'technician' ? getTechMenus() 
                     : getAdminMenus();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      
      {/* ================= MAIN NAVIGATION BAR ================= */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-2 sm:gap-3 cursor-pointer" 
            onClick={() => setActiveTab(currentRole === 'customer' ? 'dashboard' : currentRole === 'technician' ? 'tech-dashboard' : 'admin-dashboard')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-br from-[#167D5A] to-[#105C45] flex items-center justify-center text-white shadow-md shadow-[#167D5A]/20">
              <div className="relative">
                <Wrench className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                <Leaf className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-300 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-lg sm:text-xl text-[#105C45] tracking-tight">REPAIRIN</span>
                <span className="font-heading font-black text-lg sm:text-xl text-[#167D5A]">360</span>
                <span className="text-[10px] bg-[#E5F3EC] text-[#167D5A] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider hidden sm:block">Official</span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block -mt-0.5">Smart Repair & Circular Service Ecosystem</p>
            </div>
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* If Customer, show Points Badge */}
            {currentRole === 'customer' && (
              <button
                onClick={() => handleMobileNav('rewards')}
                className="hidden md:flex items-center gap-1.5 bg-[#E5F3EC] hover:bg-[#d5ebdf] text-[#167D5A] px-3 py-1.5 rounded-full text-xs font-semibold transition-all border border-[#167D5A]/20 cursor-pointer"
              >
                <Leaf className="w-4 h-4 text-[#167D5A]" />
                <span>{rewards.customerPoints} Poin Sirkular</span>
              </button>
            )}

            {/* If Technician, show Online badge */}
            {currentRole === 'technician' && (
              <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{activeTechObj.scheduleStatus}</span>
              </div>
            )}

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowNotifDropdown(!showNotifDropdown);
                  setShowUserDropdown(false); // Tutup profil jika buka notif
                }}
                className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown (Responsive) */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-[calc(100vw-2rem)] sm:w-80 md:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-sm text-gray-900">Notifikasi Terkini</h3>
                    <span className="text-xs text-gray-500">{notifications.length} pemberitahuan</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 px-2 py-1">
                    {notifications.length === 0 ? (
                      <p className="text-center text-xs text-gray-500 py-4">Belum ada notifikasi.</p>
                    ) : (
                      notifications.map(n => (
                        <div key={n.id} className="p-3 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="flex items-start justify-between gap-2">
                            <p className="text-xs font-bold text-gray-900">{n.title}</p>
                            <span className="text-[10px] text-gray-400 whitespace-nowrap">{n.time}</span>
                          </div>
                          <p className="text-xs text-gray-600 mt-1 leading-relaxed">{n.message}</p>
                          {n.orderId && (
                            <button
                              onClick={() => {
                                setShowNotifDropdown(false);
                                if (currentRole === 'customer') setActiveTab('orders');
                                else if (currentRole === 'technician') setActiveTab('tech-requests');
                                else setActiveTab('admin-bookings');
                              }}
                              className="mt-1.5 text-[11px] font-semibold text-[#167D5A] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              Lihat Pesanan {n.orderId} →
                            </button>
                          )}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={() => {
                if (window.confirm('Muat ulang data bawaan sistem REPAIRIN 360?')) {
                  resetDemoState();
                  alert('Data telah diperbarui ke kondisi default.');
                }
              }}
              className="hidden sm:block p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Perbarui Data Sistem"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* User Profile Dropdown */}
            <div className="relative pl-2 border-l border-gray-200">
              <button
                onClick={() => {
                  setShowUserDropdown(!showUserDropdown);
                  setShowNotifDropdown(false);
                }}
                className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
              >
                <img
                  src={currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80'}
                  alt={currentUser?.name || 'User'}
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-[#167D5A]/20"
                />
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-bold text-gray-900 leading-none">
                    {currentUser?.name || (currentRole === 'customer' ? 'Budi Santoso' : currentRole === 'technician' ? activeTechObj.name : 'Admin Operasional')}
                  </p>
                  <div className="mt-0.5">{getRoleBadge()}</div>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400 hidden lg:block" />
              </button>

              {/* User Dropdown Menu */}
              {showUserDropdown && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-xs font-bold text-gray-900">{currentUser?.name}</p>
                    <p className="text-[11px] text-gray-500 truncate">{currentUser?.email}</p>
                    <div className="mt-1">{getRoleBadge()}</div>
                  </div>

                  <div className="py-1">
                    {currentRole === 'technician' && (
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          setActiveTab('tech-profile');
                        }}
                        className="w-full text-left px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 flex items-center gap-2 cursor-pointer"
                      >
                        <User className="w-3.5 h-3.5 text-gray-500" />
                        <span>Profil & Legalitas</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setShowUserDropdown(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Keluar (Logout)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Hamburger Menu Mobile Button */}
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
            >
              {showMobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>
        </div>
      </div>

      {/* ================= DESKTOP NAVIGATION BAR ================= */}
      <div className="hidden lg:block bg-[#F5F7F6] border-t border-gray-200/80 w-full overflow-x-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-1.5 flex items-center justify-center space-x-1 text-xs font-medium whitespace-nowrap">
          {currentMenus.map((menu) => (
            <button
              key={menu.id}
              onClick={() => setActiveTab(menu.id)}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                activeTab === menu.id ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
              }`}
            >
              {menu.label}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MOBILE NAVIGATION BAR (Dropdown) ================= */}
      {showMobileMenu && (
        <div className="lg:hidden absolute top-16 left-0 w-full bg-white border-b border-gray-200 shadow-2xl z-50 animate-in slide-in-from-top-2">
          <div className="px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto">
            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2 px-2">Menu Navigasi</p>
            
            {/* Render Menu berdasarkan role */}
            {currentMenus.map((menu) => (
              <button
                key={menu.id}
                onClick={() => handleMobileNav(menu.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                  activeTab === menu.id ? 'bg-[#E5F3EC] text-[#105C45] font-bold' : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                {menu.label}
              </button>
            ))}

            {/* Menu Tambahan Khusus Mobile (Poin & Reset) */}
            <div className="border-t border-gray-100 mt-2 pt-2 space-y-1">
              {currentRole === 'customer' && (
                <button
                  onClick={() => handleMobileNav('rewards')}
                  className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-[#167D5A] bg-[#E5F3EC]/50 hover:bg-[#E5F3EC] flex items-center gap-2"
                >
                  <Leaf className="w-4 h-4" /> {rewards.customerPoints} Poin Sirkular
                </button>
              )}
              <button
                onClick={() => {
                  if (window.confirm('Muat ulang data bawaan sistem?')) {
                    resetDemoState();
                    setShowMobileMenu(false);
                  }
                }}
                className="w-full text-left px-4 py-3 rounded-xl text-sm font-medium text-gray-500 hover:bg-gray-50 flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Reset Data Sistem
              </button>
            </div>

          </div>
        </div>
      )}

    </header>
  );
}
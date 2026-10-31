import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Wrench, 
  Leaf, 
  Bell, 
  User, 
  RotateCcw, 
  ShieldCheck, 
  CheckCircle2, 
  X, 
  ExternalLink,
  ChevronDown,
  LogOut
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

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-xs">
      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => setActiveTab(currentRole === 'customer' ? 'dashboard' : currentRole === 'technician' ? 'tech-dashboard' : 'admin-dashboard')}
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#167D5A] to-[#105C45] flex items-center justify-center text-white shadow-md shadow-[#167D5A]/20">
              <div className="relative">
                <Wrench className="w-5 h-5 text-white" />
                <Leaf className="w-3.5 h-3.5 text-emerald-300 absolute -bottom-1 -right-1" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-heading font-extrabold text-xl text-[#105C45] tracking-tight">REPAIRIN</span>
                <span className="font-heading font-black text-xl text-[#167D5A]">360</span>
                <span className="text-[10px] bg-[#E5F3EC] text-[#167D5A] font-bold px-1.5 py-0.5 rounded-full uppercase tracking-wider">Official</span>
              </div>
              <p className="text-[11px] text-gray-500 hidden sm:block -mt-0.5">Smart Repair & Circular Service Ecosystem</p>
            </div>
          </div>

          {/* Right Action Elements */}
          <div className="flex items-center gap-3">
            {/* If Customer, show Points Badge */}
            {currentRole === 'customer' && (
              <button
                onClick={() => setActiveTab('rewards')}
                className="hidden md:flex items-center gap-1.5 bg-[#E5F3EC] hover:bg-[#d5ebdf] text-[#167D5A] px-3 py-1.5 rounded-full text-xs font-semibold transition-all border border-[#167D5A]/20 cursor-pointer"
                title="Circular Reward Balance"
              >
                <Leaf className="w-4 h-4 text-[#167D5A]" />
                <span>{rewards.customerPoints} Poin Sirkular</span>
              </button>
            )}

            {/* If Technician, show Online badge */}
            {currentRole === 'technician' && (
              <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{activeTechObj.scheduleStatus}</span>
              </div>
            )}

            {/* Notifications Button */}
            <div className="relative">
              <button
                onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                className="relative p-2 rounded-xl text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition-colors cursor-pointer"
                title="Notifikasi"
              >
                <Bell className="w-5 h-5" />
                {unreadNotifs.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white"></span>
                )}
              </button>

              {/* Notification Dropdown */}
              {showNotifDropdown && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                    <h3 className="font-heading font-semibold text-sm text-gray-900">Notifikasi Terkini</h3>
                    <span className="text-xs text-gray-500">{notifications.length} pemberitahuan</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto divide-y divide-gray-50 px-2 py-1">
                    {notifications.map(n => (
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
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reset Demo Data Button (Clean tool button) */}
            <button
              onClick={() => {
                if (window.confirm('Muat ulang data bawaan sistem REPAIRIN 360?')) {
                  resetDemoState();
                  alert('Data telah diperbarui ke kondisi default.');
                }
              }}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              title="Perbarui Data Sistem"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            {/* User Profile & Logout Dropdown */}
            <div className="relative pl-2 border-l border-gray-200">
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
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
          </div>
        </div>
      </div>

      {/* Role Navigation Secondary Bar */}
      <div className="bg-[#F5F7F6] border-t border-gray-200/80 px-4 sm:px-6 lg:px-8 overflow-x-auto">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 py-1.5 text-xs font-medium whitespace-nowrap">
          {currentRole === 'customer' && (
            <>
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'dashboard' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🏠 Beranda
              </button>
              <button
                onClick={() => setActiveTab('smartcheck')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'smartcheck' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🔍 SmartCheck (Diagnosis)
              </button>
              <button
                onClick={() => setActiveTab('smartmatch')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'smartmatch' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🎯 SmartMatch (Cari Teknisi)
              </button>
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'orders' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                📋 Pesanan & PriceGuard
              </button>
              <button
                onClick={() => setActiveTab('passports')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'passports' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🛂 Repair Passport
              </button>
              <button
                onClick={() => setActiveTab('rewards')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'rewards' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🌱 Circular Reward
              </button>
              <button
                onClick={() => setActiveTab('repair-or-replace')}
                className={`px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${
                  activeTab === 'repair-or-replace' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                ⚖️ Repair vs Replace
              </button>
              <button
                onClick={() => setActiveTab('complaints')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'complaints' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                💬 Bantuan & Pengaduan
              </button>
            </>
          )}

          {currentRole === 'technician' && (
            <>
              <button
                onClick={() => setActiveTab('tech-dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tech-dashboard' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                📊 Ringkasan Teknisi
              </button>
              <button
                onClick={() => setActiveTab('tech-requests')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tech-requests' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                📥 Permintaan Masuk
              </button>
              <button
                onClick={() => setActiveTab('tech-workspace')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tech-workspace' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🛠️ Workspace & PriceGuard
              </button>
              <button
                onClick={() => setActiveTab('tech-schedule')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tech-schedule' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                📅 Manajemen Jadwal
              </button>
              <button
                onClick={() => setActiveTab('tech-income')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tech-income' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                💰 Pendapatan (Bagi Hasil 85:15)
              </button>
              <button
                onClick={() => setActiveTab('tech-profile')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'tech-profile' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🪪 Profil & Dokumen Verifikasi
              </button>
            </>
          )}

          {currentRole === 'admin' && (
            <>
              <button
                onClick={() => setActiveTab('admin-dashboard')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'admin-dashboard' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                📈 Analytics & Dampak Sirkular
              </button>
              <button
                onClick={() => setActiveTab('admin-verifications')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'admin-verifications' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                ✅ Verifikasi Teknisi
              </button>
              <button
                onClick={() => setActiveTab('admin-bookings')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'admin-bookings' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                📑 Manajemen Pesanan & Transaksi
              </button>
              <button
                onClick={() => setActiveTab('admin-categories')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'admin-categories' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🧠 Knowledge Base & Kategori
              </button>
              <button
                onClick={() => setActiveTab('admin-rewards')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'admin-rewards' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                🎁 Aturan Reward & Poin
              </button>
              <button
                onClick={() => setActiveTab('admin-complaints')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'admin-complaints' ? 'bg-[#167D5A] text-white shadow-xs font-semibold' : 'text-gray-600 hover:text-gray-900 hover:bg-white'
                }`}
              >
                ⚖️ Penanganan Pengaduan
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

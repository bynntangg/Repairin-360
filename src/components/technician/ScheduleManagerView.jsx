import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Calendar, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ToggleLeft, 
  ToggleRight, 
  Coffee,
  ShieldCheck
} from 'lucide-react';

export default function ScheduleManagerView() {
  const { technicians, activeTechnicianId, orders } = useApp();
  const currentTech = technicians.find(t => t.id === activeTechnicianId) || technicians[0];

  const [workingDays, setWorkingDays] = useState(['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu']);
  const [startTime, setStartTime] = useState('08:30');
  const [endTime, setEndTime] = useState('17:00');
  const [isAvailableToday, setIsAvailableToday] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const daysOfWeek = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu'];

  const toggleDay = (day) => {
    setWorkingDays(prev => 
      prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]
    );
  };

  // Scheduled bookings for this technician
  const scheduledBookings = orders.filter(
    o => o.technicianId === currentTech.id && o.status !== 'Selesai' && o.status !== 'Dibatalkan'
  );

  const handleSaveSchedule = (e) => {
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
            <Calendar className="w-4 h-4 text-[#167D5A]" />
            <span>Manajemen Jadwal & Ketersediaan Layanan</span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-gray-900 mt-1">
            Pengaturan Jadwal Kerja & Kalender
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Atur jam kerja harian, hari libur, dan cegah bentrok jadwal servis otomatis oleh sistem SmartMatch.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAvailableToday(!isAvailableToday)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
            isAvailableToday
              ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
              : 'bg-gray-100 text-gray-600 border border-gray-300'
          }`}
        >
          <span className={`w-2.5 h-2.5 rounded-full ${isAvailableToday ? 'bg-emerald-500 animate-pulse' : 'bg-gray-400'}`}></span>
          <span>Status Hari Ini: {isAvailableToday ? 'Menerima Servis' : 'Sedang Libur / Istirahat'}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Working Hours & Days Config Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-6">
          <form onSubmit={handleSaveSchedule} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
                1. Pilih Hari Kerja Aktif
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {daysOfWeek.map(day => {
                  const active = workingDays.includes(day);
                  return (
                    <button
                      type="button"
                      key={day}
                      onClick={() => toggleDay(day)}
                      className={`p-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
                        active
                          ? 'bg-[#167D5A] text-white border-[#167D5A] shadow-xs'
                          : 'bg-gray-50 text-gray-600 border-gray-200 hover:bg-gray-100'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Jam Mulai Layanan</label>
                <input
                  type="time"
                  value={startTime}
                  onChange={e => setStartTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Jam Selesai Layanan</label>
                <input
                  type="time"
                  value={endTime}
                  onChange={e => setEndTime(e.target.value)}
                  className="w-full rounded-xl border border-gray-300 p-2.5 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                />
              </div>
            </div>

            {/* Smart Conflict Prevention Feature */}
            <div className="p-4 rounded-2xl bg-indigo-50/70 border border-indigo-200 text-xs space-y-1">
              <span className="font-bold text-indigo-900 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-indigo-600" />
                Fitur Pencegahan Bentrok Waktu (Anti-Conflict Booking):
              </span>
              <p className="text-indigo-800 leading-relaxed">
                Sistem otomatis mengunci slot waktu ±90 menit di sekitar pesanan yang telah dikonfirmasi sehingga Anda memiliki waktu tempuh yang aman antar lokasi pelanggan.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-between">
              {savedSuccess ? (
                <span className="text-xs font-bold text-[#167D5A] flex items-center gap-1">
                  <CheckCircle2 className="w-4 h-4 text-[#167D5A]" />
                  Jadwal berhasil disimpan!
                </span>
              ) : <span></span>}

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Simpan Jadwal
              </button>
            </div>
          </form>
        </div>

        {/* Scheduled Appointments Calendar (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/80 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <h3 className="font-heading font-bold text-sm text-gray-900">
              Agenda Servis Terjadwal ({scheduledBookings.length})
            </h3>
            <span className="text-[10px] text-gray-400 font-mono">Real-time sync</span>
          </div>

          {scheduledBookings.length === 0 ? (
            <p className="text-xs text-gray-400 py-8 text-center italic">
              Tidak ada agenda servis pada slot mendatang.
            </p>
          ) : (
            <div className="space-y-3">
              {scheduledBookings.map(b => (
                <div key={b.id} className="p-3.5 rounded-2xl bg-[#F8FAF9] border border-gray-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#167D5A] flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#167D5A]" />
                      {b.scheduleDate} · {b.scheduleTime}
                    </span>
                    <span className="text-[10px] font-mono text-gray-400 font-bold">{b.id}</span>
                  </div>
                  <h4 className="font-bold text-gray-900">{b.brand} {b.model}</h4>
                  <p className="text-gray-500 text-[11px]">{b.customerName} ({b.customerAddress.split('(')[0]})</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

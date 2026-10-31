import React from 'react';
import { 
  Clock, 
  CheckCircle2, 
  XCircle, 
  Calendar, 
  Truck, 
  Search, 
  AlertCircle, 
  Wrench, 
  ShieldCheck, 
  Check 
} from 'lucide-react';

export default function StatusBadge({ status, size = 'md' }) {
  const sizeClasses = {
    sm: 'text-xs px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-semibold',
    lg: 'text-sm px-3 py-1.5 font-semibold'
  };

  const currentSize = sizeClasses[size] || sizeClasses.md;

  switch (status) {
    case 'Menunggu Konfirmasi':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-amber-50 text-amber-800 border border-amber-200 ${currentSize}`}>
          <Clock className="w-3.5 h-3.5 text-amber-600 animate-pulse" />
          Menunggu Konfirmasi
        </span>
      );

    case 'Diterima Teknisi':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200 ${currentSize}`}>
          <Check className="w-3.5 h-3.5 text-blue-600" />
          Diterima Teknisi
        </span>
      );

    case 'Ditolak Teknisi':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-red-50 text-red-800 border border-red-200 ${currentSize}`}>
          <XCircle className="w-3.5 h-3.5 text-red-600" />
          Ditolak Teknisi
        </span>
      );

    case 'Menunggu Jadwal':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-indigo-50 text-indigo-800 border border-indigo-200 ${currentSize}`}>
          <Calendar className="w-3.5 h-3.5 text-indigo-600" />
          Menunggu Jadwal
        </span>
      );

    case 'Teknisi Menuju Lokasi':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-sky-50 text-sky-800 border border-sky-300 ${currentSize}`}>
          <Truck className="w-3.5 h-3.5 text-sky-600 animate-bounce" />
          Teknisi OTW Lokasi
        </span>
      );

    case 'Pemeriksaan':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-purple-50 text-purple-800 border border-purple-200 ${currentSize}`}>
          <Search className="w-3.5 h-3.5 text-purple-600" />
          Sedang Diperiksa
        </span>
      );

    case 'Menunggu Persetujuan Biaya':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-orange-100 text-orange-900 border border-orange-300 shadow-sm ${currentSize}`}>
          <AlertCircle className="w-3.5 h-3.5 text-orange-600 animate-pulse" />
          Menunggu Persetujuan Biaya
        </span>
      );

    case 'Dalam Perbaikan':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-teal-50 text-teal-800 border border-teal-200 ${currentSize}`}>
          <Wrench className="w-3.5 h-3.5 text-teal-600 animate-spin" />
          Dalam Perbaikan
        </span>
      );

    case 'Menunggu Penyelesaian':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-lime-50 text-lime-800 border border-lime-200 ${currentSize}`}>
          <ShieldCheck className="w-3.5 h-3.5 text-lime-600" />
          Menunggu Konfirmasi Selesai
        </span>
      );

    case 'Selesai':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-[#E5F3EC] text-[#167D5A] border border-[#167D5A]/30 font-bold ${currentSize}`}>
          <CheckCircle2 className="w-3.5 h-3.5 text-[#167D5A]" />
          Selesai & Bergaransi
        </span>
      );

    case 'Dibatalkan':
      return (
        <span className={`inline-flex items-center gap-1.5 rounded-full bg-gray-100 text-gray-700 border border-gray-300 ${currentSize}`}>
          <XCircle className="w-3.5 h-3.5 text-gray-500" />
          Dibatalkan
        </span>
      );

    default:
      return (
        <span className={`inline-flex items-center gap-1 rounded-full bg-gray-100 text-gray-800 border border-gray-200 ${currentSize}`}>
          {status}
        </span>
      );
  }
}

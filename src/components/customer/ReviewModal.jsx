import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Star, Heart, CheckCircle2 } from 'lucide-react';

export default function ReviewModal({ order, onClose }) {
  const { creditReviewReward } = useApp();
  const [stars, setStars] = useState(5);
  const [comment, setComment] = useState('Pelayanan sangat profesional, cepat, dan transparan. Alat elektronik saya kini berfungsi normal kembali!');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    creditReviewReward(order.id, stars, comment);
    setSubmitted(true);
    setTimeout(() => {
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-white rounded-3xl w-full max-w-md p-6 space-y-5 shadow-2xl border border-gray-100">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#167D5A] tracking-wider">Ulasan & Rating Transparan</span>
            <h3 className="font-heading font-bold text-lg text-gray-900">Nilai Servis Teknisi</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-gray-400 hover:text-gray-700">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="w-14 h-14 rounded-full bg-[#E5F3EC] text-[#167D5A] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-[#167D5A]" />
            </div>
            <h4 className="font-heading font-bold text-base text-gray-900">Ulasan Berhasil Disimpan!</h4>
            <p className="text-xs text-gray-600">
              Terima kasih atas kontribusi Anda. <strong>+10 Circular Reward Points</strong> telah ditambahkan ke akun Anda!
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-3 rounded-2xl bg-gray-50 border border-gray-200 text-xs">
              <p className="font-semibold text-gray-800">{order.brand} {order.model}</p>
              <p className="text-gray-500">Teknisi: {order.technicianName} · ID: {order.id}</p>
            </div>

            {/* Star selector */}
            <div className="text-center space-y-1">
              <span className="text-xs text-gray-500 font-medium">Beri Bintang Kepuasan (1 - 5)</span>
              <div className="flex items-center justify-center gap-2 pt-1">
                {[1, 2, 3, 4, 5].map(num => (
                  <button
                    type="button"
                    key={num}
                    onClick={() => setStars(num)}
                    className="p-1 transition-transform hover:scale-125 cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        num <= stars
                          ? 'fill-amber-400 text-amber-400 drop-shadow-xs'
                          : 'text-gray-300'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                Komentar / Pengalaman Servis
              </label>
              <textarea
                rows={3}
                value={comment}
                onChange={e => setComment(e.target.value)}
                className="w-full text-xs rounded-xl border border-gray-300 p-3 outline-hidden focus:ring-2 focus:ring-[#167D5A]"
                placeholder="Ceritakan kepuasan Anda terhadap ketepatan waktu, kebersihan, dan penjelasan teknisi..."
                required
              />
            </div>

            <div className="p-3 rounded-xl bg-amber-50 text-amber-800 text-[11px] flex items-center gap-2">
              <Heart className="w-4 h-4 text-amber-600 shrink-0" />
              <span>Dapatkan <strong>+10 Poin Sirkular</strong> untuk setiap ulasan pesanan yang diselesaikan!</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-gray-900"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-[#167D5A] hover:bg-[#105C45] text-white text-xs font-bold shadow-md cursor-pointer"
              >
                Kirim Ulasan
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

// Data awal resmi untuk REPAIRIN 360 - Smart Repair & Circular Service Ecosystem

export const SEED_USERS = [
  {
    id: 'usr-customer-1',
    email: 'bintang.permana@gmail.com',
    password: 'password123',
    name: 'Bintang Permana',
    role: 'customer',
    phone: '0882-9478-1090',
    address: 'Jl. Tebet Barat Dalam VII No. 14, Tebet, Jakarta Selatan',
    avatar: '/images/bintang.png'
  },
  {
    id: 'usr-tech-2',
    email: 'dian.pratama@repairin360.id',
    password: 'password123',
    name: 'Dian Pratama',
    role: 'technician',
    techId: 'tech-2',
    title: 'Small Home Appliances Master',
    phone: '0813-8899-1122',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-tech-1',
    email: 'joko.anwar@repairin360.id',
    password: 'password123',
    name: 'Joko Anwar, S.T.',
    role: 'technician',
    techId: 'tech-1',
    title: 'Senior Electronics Specialist',
    phone: '0812-3456-7890',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'usr-admin-1',
    email: 'admin@repairin360.id',
    password: 'admin123',
    name: 'Admin Pusat REPAIRIN',
    role: 'admin',
    phone: '021-55443322',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  }
];

export const CATEGORIES = [
  {
    id: 'kipas-angin',
    name: 'Kipas Angin',
    icon: 'Wind',
    image: '/images/kipas.jpg',
    description: 'Kipas meja, berdiri, dinding, dan exhaust fan',
    avgReplaceCost: 250000,
    typicalLifeSpanYears: 4,
    co2SavedKg: 12.5,
    eWasteKg: 2.8,
    symptoms: [
      { id: 'mati-total', label: 'Mati total / tidak berputar sama sekali' },
      { id: 'putaran-lambat', label: 'Putaran baling-baling sangat lambat atau berat' },
      { id: 'suara-berisik', label: 'Berdengung atau suara kasar / berisik' },
      { id: 'bau-terbakar', label: 'Tercium bau hangus / terbakar saat dinyalakan' },
      { id: 'kecepatan-rusak', label: 'Tombol pengatur kecepatan (speed) tidak berfungsi' },
      { id: 'tidak-bisa-geleng', label: 'Kepala kipas tidak bisa berputar/tenggelam (osilasi macet)' }
    ]
  },
  {
    id: 'rice-cooker',
    name: 'Rice Cooker / Magic Com',
    icon: 'CookingPot',
    image: 'https://images.unsplash.com/photo-1544233726-9f1d2b27be8b?w=400&auto=format&fit=crop&q=80',
    description: 'Penanak nasi, magic jar, dan digital multicooker',
    avgReplaceCost: 350000,
    typicalLifeSpanYears: 5,
    co2SavedKg: 18.2,
    eWasteKg: 3.2,
    symptoms: [
      { id: 'rc-mati-total', label: 'Mati total / lampu indikator tidak menyala' },
      { id: 'nasi-tidak-matang', label: 'Nasi masih mentah / tidak matang sempurna' },
      { id: 'tidak-menghangatkan', label: 'Mode warm mati / nasi cepat basi' },
      { id: 'nasi-gosong', label: 'Nasi terlalu cepat kering / gosong di bagian bawah' },
      { id: 'bau-terbakar', label: 'Ada bau plastik gosong atau asap kecil' },
      { id: 'tuas-tidak-terkunci', label: 'Tuas switch masak (cook) tidak mau mengunci ke bawah' }
    ]
  },
  {
    id: 'setrika',
    name: 'Setrika Listrik',
    icon: 'Zap',
    image: '/images/setrika.jpg',
    description: 'Setrika kering, uap, dan travel iron',
    avgReplaceCost: 220000,
    typicalLifeSpanYears: 4,
    co2SavedKg: 9.8,
    eWasteKg: 1.5,
    symptoms: [
      { id: 'st-mati-total', label: 'Tidak panas sama sekali / lampu mati' },
      { id: 'st-terlalu-panas', label: 'Suhu tidak bisa diatur / terlalu panas hingga kain lengket' },
      { id: 'st-korslet', label: 'Sekring rumah jeglek saat setrika dicolokkan' },
      { id: 'st-kabel-rusak', label: 'Kabel terkelupas atau longgar di pangkal pegangan' },
      { id: 'st-bocor-uap', label: 'Air uap merembes keluar dan menetes kotor' }
    ]
  },
  {
    id: 'dispenser',
    name: 'Dispenser Air',
    icon: 'Droplets',
    image: '/images/dispenser.jpg', // sesuaikan dengan nama file Anda
    description: 'Dispenser galon atas, galon bawah, dan meja',
    avgReplaceCost: 850000,
    typicalLifeSpanYears: 6,
    co2SavedKg: 35.0,
    eWasteKg: 8.5,
    symptoms: [
      { id: 'ds-tidak-panas', label: 'Air tidak panas (indikator heater mati/dingin)' },
      { id: 'ds-tidak-dingin', label: 'Air dingin tidak dingin (kompresor/pendingin mati)' },
      { id: 'ds-bocor', label: 'Air merembes atau menetes bocor dari bagian bawah' },
      { id: 'ds-pompa-macet', label: 'Pompa galon bawah tidak mau menyedot air naik' },
      { id: 'ds-mati-total', label: 'Mati total tanpa suara getaran sama sekali' }
    ]
  },
  {
    id: 'mesin-cuci',
    name: 'Mesin Cuci',
    icon: 'Disc',
    image: 'https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?w=400&auto=format&fit=crop&q=80',
    description: 'Mesin cuci 2 tabung, top loading, dan front loading',
    avgReplaceCost: 2900000,
    typicalLifeSpanYears: 8,
    co2SavedKg: 85.0,
    eWasteKg: 32.0,
    symptoms: [
      { id: 'mc-tidak-putar', label: 'Tabung cuci tidak berputar walau dinamo mendengung' },
      { id: 'mc-pengering-mati', label: 'Tabung pengering / spin tidak mau berputar' },
      { id: 'mc-air-tidak-keluar', label: 'Air buangan (drain) tidak keluar / mampet' },
      { id: 'mc-getaran-keras', label: 'Berdentum keras atau berjalan saat proses pengeringan' },
      { id: 'mc-air-bocor', label: 'Air merembes keluar membanjiri lantai' },
      { id: 'mc-error-code', label: 'Muncul kode error digital pada panel (IE, OE, dE)' }
    ]
  },
  {
    id: 'kulkas',
    name: 'Kulkas & Freezer',
    icon: 'Snowflake',
    image: '/images/kulkas.jpg', // sesuaikan dengan nama file Anda
    description: 'Kulkas 1 pintu, 2 pintu inverter, dan showcase',
    avgReplaceCost: 3200000,
    typicalLifeSpanYears: 10,
    co2SavedKg: 120.0,
    eWasteKg: 45.0,
    symptoms: [
      { id: 'kl-tidak-dingin', label: 'Kulkas sama sekali tidak dingin, kompresor diam' },
      { id: 'kl-bawah-tidak-dingin', label: 'Freezer dingin beku, tapi rak bawah tidak dingin' },
      { id: 'kl-bunga-es-tebal', label: 'Bunga es menumpuk sangat tebal dan tidak mencair otomatis' },
      { id: 'kl-bunyi-kasar', label: 'Kompresor berbunyi tek-tek atau mendengung keras' },
      { id: 'kl-bocor-air', label: 'Ada genangan air di bawah crisper atau lantai' },
      { id: 'kl-korslet', label: 'Bodi kulkas nyetrum saat disentuh tangan' }
    ]
  },
  {
    id: 'televisi',
    name: 'Televisi & Monitor',
    icon: 'Tv',
    image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&auto=format&fit=crop&q=80',
    description: 'TV LED, Android TV, Smart TV 32"-65"',
    avgReplaceCost: 3400000,
    typicalLifeSpanYears: 7,
    co2SavedKg: 65.0,
    eWasteKg: 14.0,
    symptoms: [
      { id: 'tv-suara-ada-gambar-gelap', label: 'Ada suara tapi layar gelap gulita (backlight mati)' },
      { id: 'tv-mati-total', label: 'Mati total, lampu indikator merah tidak menyala' },
      { id: 'tv-garis-layar', label: 'Muncul garis-garis vertikal atau horizontal di panel' },
      { id: 'tv-restart-sendiri', label: 'Bootloop / logo menyala sebentar lalu mati lagi' },
      { id: 'tv-suara-pecah', label: 'Speaker sember / tidak ada output audio' }
    ]
  }
];

export const INITIAL_TECHNICIANS = [
  {
    id: 'tech-1',
    name: 'Joko Anwar, S.T.',
    title: 'Senior Electronics Specialist',
    avatar: 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badges: ['Terverifikasi BNSP', 'Spesialis Pendingin & Kompresor', 'Top Rated 2026'],
    rating: 4.9,
    reviewsCount: 142,
    jobsCompleted: 156,
    baseInspectionFee: 50000,
    specialties: ['kulkas', 'mesin-cuci', 'dispenser'],
    serviceAreas: ['Jakarta Selatan', 'Jakarta Pusat', 'Tangerang Selatan'],
    experienceYears: 9,
    bio: 'Berpengalaman menangani berbagai merk kulkas inverter, mesin cuci front/top load, dan pendingin air komersial sejak 2017. Mengutamakan diagnosis jujur, penggantian part orisinil bergaransi, dan ramah lingkungan.',
    scheduleStatus: 'Tersedia Hari Ini',
    nextAvailableSlot: 'Hari ini, 14:00 WIB',
    phone: '0812-3456-7890',
    email: 'joko.anwar.tech@repairin360.id',
    documents: [
      { name: 'KTP Asli Terverifikasi', status: 'verified', date: '12 Jan 2025' },
      { name: 'Sertifikasi BNSP Teknisi Pendingin', status: 'verified', date: '15 Feb 2025' },
      { name: 'SKCK Kepolisian', status: 'verified', date: '10 Jan 2025' }
    ]
  },
  {
    id: 'tech-2',
    name: 'Dian Pratama',
    title: 'Small Home Appliances Master',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badges: ['Terverifikasi REPAIRIN', 'Fast Response', 'Tarif Terjangkau'],
    rating: 4.8,
    reviewsCount: 98,
    jobsCompleted: 112,
    baseInspectionFee: 35000,
    specialties: ['kipas-angin', 'rice-cooker', 'setrika', 'dispenser'],
    serviceAreas: ['Jakarta Barat', 'Jakarta Pusat', 'Tangerang'],
    experienceYears: 6,
    bio: 'Ahli dalam restorasi peralatan rumah tangga kecil seperti kipas angin macet, magic com bau gosong/mati, setrika jeglek, hingga dispenser air. Siap datang tepat waktu dengan toolset lengkap.',
    scheduleStatus: 'Tersedia Besok',
    nextAvailableSlot: 'Besok, 09:30 WIB',
    phone: '0813-8899-1122',
    email: 'dian.pratama@repairin360.id',
    documents: [
      { name: 'KTP Asli Terverifikasi', status: 'verified', date: '20 Mei 2025' },
      { name: 'Sertifikat Pelatihan Reparasi Balai Kerja', status: 'verified', date: '25 Mei 2025' }
    ]
  },
  {
    id: 'tech-3',
    name: 'Hendra Setiawan',
    title: 'Audio Visual & Display Expert',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    verified: true,
    badges: ['Terverifikasi BNSP', 'Best Match LED/Smart TV', 'Garansi 90 Hari'],
    rating: 5.0,
    reviewsCount: 76,
    jobsCompleted: 88,
    baseInspectionFee: 60000,
    specialties: ['televisi', 'kipas-angin'],
    serviceAreas: ['Jakarta Timur', 'Bekasi Barat', 'Jakarta Pusat'],
    experienceYears: 8,
    bio: 'Fokus pada servis motherboard TV LED/Smart TV, perbaikan backlight, T-Con board, dan modul power supply. Menggunakan komponen grade A dengan pengujian osiloskop profesional.',
    scheduleStatus: 'Tersedia Hari Ini',
    nextAvailableSlot: 'Hari ini, 16:30 WIB',
    phone: '0815-7788-9900',
    email: 'hendra.setiawan@repairin360.id',
    documents: [
      { name: 'KTP Terverifikasi', status: 'verified', date: '04 Mar 2025' },
      { name: 'Sertifikasi BNSP Teknisi Elektronika Audio Video', status: 'verified', date: '18 Apr 2025' }
    ]
  },
  {
    id: 'tech-4',
    name: 'Andi Kurniawan',
    title: 'Teknisi Junior Pendingin & Motor',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    verified: false,
    verificationStatus: 'Menunggu Verifikasi Admin',
    badges: ['Pendaftar Baru'],
    rating: 0,
    reviewsCount: 0,
    jobsCompleted: 0,
    baseInspectionFee: 30000,
    specialties: ['mesin-cuci', 'kulkas'],
    serviceAreas: ['Jakarta Selatan', 'Depok'],
    experienceYears: 2,
    bio: 'Lulusan SMK Jurusan Teknik Pendingin dan Tata Udara 2024. Telah magang di bengkel servis resmi dan ingin memperluas jaringan servis mandiri melalui ekosistem sirkular REPAIRIN 360.',
    scheduleStatus: 'Menunggu Persetujuan Admin',
    nextAvailableSlot: '-',
    phone: '0821-4455-6677',
    email: 'andi.kurniawan@repairin360.id',
    documents: [
      { name: 'KTP Calon Teknisi', status: 'pending', date: '28 Okt 2026' },
      { name: 'Ijazah SMK Teknik Pendingin', status: 'pending', date: '28 Okt 2026' }
    ]
  }
];

export const INITIAL_ORDERS = [
  {
    id: 'ORD-2026-1001',
    customerName: 'Budi Santoso',
    customerPhone: '0812-9988-7766',
    customerAddress: 'Jl. Tebet Barat Dalam VII No. 14, Tebet, Jakarta Selatan (Dekat Indomaret)',
    category: 'rice-cooker',
    brand: 'Miyako',
    model: 'MCM-508 BT',
    purchaseYear: '2023',
    itemDescription: 'Lampu indikator warm mati dan nasi cepat basi berair dalam waktu 6 jam.',
    symptoms: ['tidak-menghangatkan', 'tuas-tidak-terkunci'],
    technicianId: 'tech-2',
    technicianName: 'Dian Pratama',
    scheduleDate: '2026-10-31',
    scheduleTime: '10:00 WIB',
    notes: 'Mohon hubungi via WA 30 menit sebelum sampai ke lokasi.',
    createdAt: '2026-10-30 14:20',
    status: 'Menunggu Persetujuan Biaya',
    priceGuard: {
      inspectionFee: 35000,
      laborFee: 65000,
      parts: [
        { name: 'Thermal Fuse 165°C Miyako Original', qty: 1, price: 20000 },
        { name: 'Microswitch Cook/Warm High Temp', qty: 1, price: 25000 }
      ],
      additionalFee: 0,
      total: 145000,
      version: 1,
      technicianNote: 'Elemen pemanas utama masih sangat bagus. Hanya perlu penggantian thermal fuse yang putus serta microswitch mode warm yang berkarat akibat uap air.',
      customerApprovalStatus: 'Menunggu Tanggapan Pelanggan',
      history: []
    },
    payment: {
      status: 'Belum Dibayar',
      method: 'Transfer Bank (BCA Virtual Account)',
      amount: 145000,
      paidAt: null
    },
    smartCheckSummary: {
      probability: '90%',
      probableCause: 'Kerusakan Thermostat / Thermal Fuse atau saklar pemindah mode warm',
      safetyAlert: 'Aman untuk diperiksa, pastikan steker dicabut dari stopkontak saat tidak digunakan.'
    }
  },
  {
    id: 'ORD-2026-0988',
    customerName: 'Budi Santoso',
    customerPhone: '0812-9988-7766',
    customerAddress: 'Jl. Tebet Barat Dalam VII No. 14, Tebet, Jakarta Selatan',
    category: 'kipas-angin',
    brand: 'Cosmos',
    model: '16-SDB Stand Fan',
    purchaseYear: '2022',
    itemDescription: 'Putaran baling-baling mendengung dan sangat seret, harus diputar tangan.',
    symptoms: ['putaran-lambat', 'suara-berisik'],
    technicianId: 'tech-2',
    technicianName: 'Dian Pratama',
    scheduleDate: '2026-10-25',
    scheduleTime: '13:00 WIB',
    createdAt: '2026-10-24 09:15',
    status: 'Selesai',
    completedAt: '2026-10-25 15:45',
    priceGuard: {
      inspectionFee: 35000,
      laborFee: 50000,
      parts: [
        { name: 'Bushing / As Rotor Kuningan 8mm (Depan & Belakang)', qty: 2, price: 30000 },
        { name: 'Kapasitor Kotak CBB61 1.5uF 450V', qty: 1, price: 15000 }
      ],
      additionalFee: 0,
      total: 130000,
      version: 1,
      technicianNote: 'Bushing aus dan kering oli. As rotor sudah dibersihkan, ganti 2 bushing baru dan kapasitor penguat putaran.',
      customerApprovalStatus: 'Disetujui Pelanggan'
    },
    payment: {
      status: 'Berhasil',
      method: 'Tunai kepada Teknisi',
      amount: 130000,
      paidAt: '2026-10-25 15:30'
    },
    repairPassportId: 'RP-2026-FA014',
    rating: {
      stars: 5,
      comment: 'Pelayanan cepat dan ramah! Kipas angin langsung berputar kencang dan sunyi seperti baru. Hemat ratusan ribu daripada beli baru!',
      reviewedAt: '2026-10-25 16:00'
    }
  },
  {
    id: 'ORD-2026-1002',
    customerName: 'Siti Rahmawati',
    customerPhone: '0818-0912-3344',
    customerAddress: 'Apartemen Kalibata City Tower Kemuning, Pancoran, Jakarta Selatan',
    category: 'kulkas',
    brand: 'Sharp',
    model: 'SJ-236ND 2 Pintu',
    purchaseYear: '2021',
    itemDescription: 'Freezer dingin dan bikin es batu, tapi ruang chiller bagian bawah sama sekali tidak dingin.',
    symptoms: ['kl-bawah-tidak-dingin', 'kl-bunga-es-tebal'],
    technicianId: 'tech-1',
    technicianName: 'Joko Anwar, S.T.',
    scheduleDate: '2026-10-31',
    scheduleTime: '14:00 WIB',
    notes: 'Parkir mobil di basement Tower Kemuning.',
    createdAt: '2026-10-30 16:05',
    status: 'Diterima Teknisi',
    priceGuard: {
      inspectionFee: 50000,
      laborFee: 120000,
      parts: [
        { name: 'Estimasi: Bimetal Defrost & Fuse Sensor Sharp', qty: 1, price: 65000 }
      ],
      additionalFee: 0,
      total: 235000,
      version: 1,
      technicianNote: 'Estimasi awal sebelum pembongkaran evaporator. Biaya final akan disepakati di lokasi setelah tes multitester.',
      customerApprovalStatus: 'Estimasi Awal Disetujui'
    },
    payment: {
      status: 'Belum Dibayar',
      method: 'Transfer Bank (Mandiri)',
      amount: 235000,
      paidAt: null
    }
  }
];

export const INITIAL_REPAIR_PASSPORTS = [
  {
    passportCode: 'RP-2026-FA014',
    orderId: 'ORD-2026-0988',
    itemCategory: 'Kipas Angin',
    itemName: 'Cosmos 16-SDB Stand Fan 16 Inch',
    brand: 'Cosmos',
    model: '16-SDB',
    serialNumber: 'CSM-2022-99812A',
    purchaseYear: '2022',
    customerName: 'Budi Santoso',
    technicianName: 'Dian Pratama',
    repairDate: '25 Oktober 2026',
    initialDiagnosis: 'Putaran seret dan berdengung akibat keausan bushing dan kapasitor drop.',
    actionTaken: 'Penggantian 2 unit bushing kuningan, pembersihan as motor dari debu tebal, pelumasan oli sintetis tahan panas, dan pemasangan kapasitor 1.5uF baru.',
    replacedComponents: [
      { name: 'Bushing Kuningan 8mm', serial: 'BUSH-8MM-BR', warrantyDays: 90 },
      { name: 'Kapasitor CBB61 1.5uF 450V', serial: 'CAP-1.5UF-JP', warrantyDays: 90 }
    ],
    totalCost: 130000,
    beforePhoto: '/images/kipas sebelum.png',       // <-- Ubah di sini
    afterPhoto: '/images/kipas setelah.png',
    warranty: {
      warrantyCode: 'WRN-2026-9881',
      durationDays: 90,
      startDate: '2026-10-25',
      endDate: '2027-01-23',
      status: 'Aktif',
      coveredComponents: 'Bushing, As Motor, dan Kapasitor Penggerak',
      terms: 'Garansi mencakup kerusakan berulang pada komponen yang diganti. Tidak berlaku jika terkena air atau lonjakan voltase ekstrem (petir).'
    },
    carbonSavedKg: 12.5,
    eWasteDivertedKg: 2.8
  },
  {
    passportCode: 'RP-2026-MC089',
    orderId: 'ORD-2026-0742',
    itemCategory: 'Mesin Cuci',
    itemName: 'LG Smart Inverter Top Load 8.5 Kg',
    brand: 'LG',
    model: 'T2108VSPM',
    serialNumber: 'LG-2021-INV8820',
    purchaseYear: '2021',
    customerName: 'Budi Santoso',
    technicianName: 'Joko Anwar, S.T.',
    repairDate: '14 Agustus 2026',
    initialDiagnosis: 'Kode error dE dan tabung pengering macet tidak mau spin.',
    actionTaken: 'Penggantian door lock switch sensor magnetik dan kalibrasi suspensi tabung peredam getar.',
    replacedComponents: [
      { name: 'LG Door Lock Switch Sensor Assembly', serial: 'LG-DL-6612', warrantyDays: 180 },
      { name: 'Damper Suspension Rod Set (4 Pcs)', serial: 'LG-DAMP-04', warrantyDays: 180 }
    ],
    totalCost: 385000,
    beforePhoto: '/images/mesin sebelum.png',       // <-- Ubah di sini
    afterPhoto: '/images/mesin setelah.png',
    warranty: {
      warrantyCode: 'WRN-2026-7420',
      durationDays: 180,
      startDate: '2026-08-14',
      endDate: '2027-02-14',
      status: 'Aktif',
      coveredComponents: 'Door Lock Switch & Suspensi Redaman',
      terms: 'Garansi meliputi penggantian part gratis jika sensor kembali error dalam periode garansi aktif.'
    },
    carbonSavedKg: 85.0,
    eWasteDivertedKg: 32.0
  }
];

export const INITIAL_REWARDS_STATE = {
  customerPoints: 230,
  ledger: [
    { id: 'LED-001', date: '2026-08-14 16:30', activity: 'Menyelesaikan Servis Mesin Cuci LG', points: 50, type: 'credit' },
    { id: 'LED-002', date: '2026-08-14 16:45', activity: 'Dokumentasi Servis Lengkap (Foto & Data)', points: 20, type: 'credit' },
    { id: 'LED-003', date: '2026-08-15 10:00', activity: 'Memberikan Ulasan Bintang 5', points: 10, type: 'credit' },
    { id: 'LED-004', date: '2026-09-01 11:20', activity: 'Partisipasi Kampanye #BulanCintaElektronik', points: 70, type: 'credit' },
    { id: 'LED-005', date: '2026-10-25 15:45', activity: 'Menyelesaikan Servis Kipas Angin Cosmos', points: 50, type: 'credit' },
    { id: 'LED-006', date: '2026-10-25 15:50', activity: 'Dokumentasi Servis Lengkap', points: 20, type: 'credit' },
    { id: 'LED-007', date: '2026-10-25 16:00', activity: 'Memberikan Ulasan Bintang 5', points: 10, type: 'credit' }
  ],
  catalog: [
    {
      id: 'VCH-DISC-25K',
      title: 'Diskon Jasa Servis Rp 25.000',
      description: 'Potongan langsung untuk ongkos jasa perbaikan perangkat elektronik apapun.',
      pointsRequired: 80,
      discountAmount: 25000,
      category: 'discount',
      badge: 'Paling Populer',
      validDays: 30,
      quotaRemaining: 45
    },
    {
      id: 'VCH-FREE-INSPECT',
      title: 'Gratis Biaya Pemeriksaan Awal',
      description: 'Bebas biaya ongkos kedatangan dan cek kerusakan teknisi di tempat (s.d. Rp 50.000).',
      pointsRequired: 120,
      discountAmount: 50000,
      category: 'inspection',
      badge: 'Best Value',
      validDays: 45,
      quotaRemaining: 20
    },
    {
      id: 'VCH-DISC-50K',
      title: 'Diskon Akbar Servis Rp 50.000',
      description: 'Potongan istimewa biaya total perbaikan untuk pesanan di atas Rp 200.000.',
      pointsRequired: 150,
      discountAmount: 50000,
      category: 'discount',
      badge: 'Super Hemat',
      validDays: 60,
      quotaRemaining: 15
    },
    {
      id: 'VCH-MITRA-SPAREPART',
      title: 'Voucher Mitra Sparepart 15%',
      description: 'Potongan harga suku cadang resmi di jaringan toko mitra sirkular REPAIRIN.',
      pointsRequired: 60,
      discountAmount: 30000,
      category: 'partner',
      badge: 'Mitra Hijau',
      validDays: 30,
      quotaRemaining: 50
    }
  ],
  myVouchers: [
    {
      voucherId: 'MYV-2026-081',
      code: 'REPAIRFIRST25',
      title: 'Diskon Jasa Servis Rp 25.000',
      discountAmount: 25000,
      status: 'Aktif',
      expiresAt: '2026-11-25',
      redeemedAt: '2026-10-26'
    }
  ]
};

export const INITIAL_COMPLAINTS = [
  {
    id: 'CMP-2026-004',
    orderId: 'ORD-2026-0941',
    customerName: 'Rian Hidayat',
    technicianName: 'Andi Kurniawan',
    category: 'Biaya Berbeda dari Kesepakatan',
    description: 'Teknisi meminta tambahan uang tunai sebesar Rp 40.000 di luar rincian yang tercatat pada aplikasi PriceGuard.',
    evidencePhoto: null,
    status: 'Sedang Diproses',
    adminNotes: 'Admin telah menghubungi teknisi untuk verifikasi nota toko sparepart. Selisih biaya akan dikembalikan ke saldo customer jika tidak ada bukti tertulis.',
    createdAt: '2026-10-27 11:00'
  }
];

export const INITIAL_CIRCULAR_STATS = {
  totalItemsRepaired: 1842,
  totalEWasteDivertedKg: 14250,
  totalCo2SavedKg: 58600,
  moneySavedByUsersRp: 428000000,
  activeTechnicians: 48,
  averageRepairCostRp: 175000,
  circularRetentionRate: '88.4%'
};

export const PLATFORM_SETTINGS = {
  platformCommissionPercent: 15,
  repairCostThresholdPercent: 50,
  pointsPerServiceCompletion: 50,
  pointsPerCompleteDocumentation: 20,
  pointsPerReview: 10,
  appName: 'REPAIRIN 360',
  tagline: 'Smart Repair & Circular Service Ecosystem',
  motto: 'Repair It. Extend Its Life. Reduce Waste.'
};

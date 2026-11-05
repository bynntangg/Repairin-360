  import React, { createContext, useContext, useState, useEffect } from 'react';
  import {
    SEED_USERS,
    CATEGORIES,
    INITIAL_TECHNICIANS,
    INITIAL_ORDERS,
    INITIAL_REPAIR_PASSPORTS,
    INITIAL_REWARDS_STATE,
    INITIAL_COMPLAINTS,
    INITIAL_CIRCULAR_STATS,
    PLATFORM_SETTINGS
  } from '../data/initialData';

  const AppContext = createContext();

  const STORAGE_KEY = 'repairin_360_app_state_v5'; 

  export function AppProvider({ children }) {
    // Registered users state
    const [users, setUsers] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_users`);
      return saved ? JSON.parse(saved) : SEED_USERS;
    });

    // Current logged in user (null = show Login screen)
    const [currentUser, setCurrentUser] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_current_user`);
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (e) {
          return null; 
        }
      }
      // UBAH MENJADI NULL: Agar landing page tampil pertama kali
      return null; 
    });

    const [currentRole, setCurrentRole] = useState(() => {
      return currentUser?.role || 'customer';
    });

    const [activeTechnicianId, setActiveTechnicianId] = useState(() => {
      return currentUser?.techId || 'tech-2';
    });

    const [categories, setCategories] = useState(CATEGORIES);
    const [technicians, setTechnicians] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_techs`);
      return saved ? JSON.parse(saved) : INITIAL_TECHNICIANS;
    });

    const [orders, setOrders] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_orders`);
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    });

    const [repairPassports, setRepairPassports] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_passports`);
      return saved ? JSON.parse(saved) : INITIAL_REPAIR_PASSPORTS;
    });

    const [rewards, setRewards] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_rewards`);
      return saved ? JSON.parse(saved) : INITIAL_REWARDS_STATE;
    });

    const [complaints, setComplaints] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_complaints`);
      return saved ? JSON.parse(saved) : INITIAL_COMPLAINTS;
    });

    const [circularStats, setCircularStats] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_stats`);
      return saved ? JSON.parse(saved) : INITIAL_CIRCULAR_STATS;
    });

    const [platformSettings, setPlatformSettings] = useState(PLATFORM_SETTINGS);

    const [smartCheckHistory, setSmartCheckHistory] = useState(() => {
      const saved = localStorage.getItem(`${STORAGE_KEY}_smartcheck`);
      return saved ? JSON.parse(saved) : [];
    });

    const [activeSmartCheckHandoff, setActiveSmartCheckHandoff] = useState(null);

    const [notifications, setNotifications] = useState([
      {
        id: 'notif-1',
        title: 'Estimasi Biaya PriceGuard Tersedia',
        message: 'Teknisi Dian Pratama telah mengirimkan rincian estimasi biaya untuk Rice Cooker Miyako.',
        time: '15 menit lalu',
        read: false,
        role: 'customer',
        orderId: 'ORD-2026-1001'
      },
      {
        id: 'notif-2',
        title: 'Permintaan Servis Baru',
        message: 'Pesanan baru ORD-2026-1002 membutuhkan konfirmasi kedatangan.',
        time: '1 jam lalu',
        read: false,
        role: 'technician',
        orderId: 'ORD-2026-1002'
      }
    ]);

    // Persist state to localStorage
    useEffect(() => {
      if (currentUser) {
        localStorage.setItem(`${STORAGE_KEY}_current_user`, JSON.stringify(currentUser));
        setCurrentRole(currentUser.role);
        if (currentUser.techId) setActiveTechnicianId(currentUser.techId);
      } else {
        localStorage.removeItem(`${STORAGE_KEY}_current_user`);
      }
    }, [currentUser]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_users`, JSON.stringify(users));
    }, [users]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_techs`, JSON.stringify(technicians));
    }, [technicians]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_orders`, JSON.stringify(orders));
    }, [orders]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_passports`, JSON.stringify(repairPassports));
    }, [repairPassports]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_rewards`, JSON.stringify(rewards));
    }, [rewards]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_complaints`, JSON.stringify(complaints));
    }, [complaints]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_stats`, JSON.stringify(circularStats));
    }, [circularStats]);

    useEffect(() => {
      localStorage.setItem(`${STORAGE_KEY}_smartcheck`, JSON.stringify(smartCheckHistory));
    }, [smartCheckHistory]);

    // Authentication Handlers
    const login = (email, password) => {
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());
      if (!user) {
        return { success: false, message: 'Email tidak ditemukan.' };
      }
      if (user.password !== password) {
        return { success: false, message: 'Kata sandi tidak sesuai.' };
      }

      setCurrentUser(user);
      setCurrentRole(user.role);
      if (user.techId) setActiveTechnicianId(user.techId);
      addNotification('Selamat Datang!', `Berhasil masuk sebagai ${user.name} (${user.role}).`, user.role);
      return { success: true, user };
    };

    const quickLogin = (role, techId = null) => {
      let target = null;
      if (role === 'customer') {
        target = users.find(u => u.role === 'customer') || SEED_USERS[0];
      } else if (role === 'technician') {
        target = users.find(u => u.role === 'technician' && (!techId || u.techId === techId)) || SEED_USERS[1];
      } else if (role === 'admin') {
        target = users.find(u => u.role === 'admin') || SEED_USERS[3];
      }

      if (target) {
        setCurrentUser(target);
        setCurrentRole(target.role);
        if (target.techId) setActiveTechnicianId(target.techId);
        addNotification('Selamat Datang!', `Berhasil masuk sebagai ${target.name}.`, target.role);
        return { success: true, user: target };
      }
      return { success: false };
    };

    const logout = () => {
      setCurrentUser(null);
    };

    const register = (userData) => {
      const exists = users.some(u => u.email.toLowerCase() === userData.email.toLowerCase());
      if (exists) {
        return { success: false, message: 'Email sudah terdaftar. Silakan gunakan email lain atau langsung login.' };
      }

      const newUser = {
        id: 'usr-' + Date.now(),
        email: userData.email,
        password: userData.password,
        name: userData.name,
        role: userData.role || 'customer',
        phone: userData.phone || '0812-0000-0000',
        address: userData.address || 'Jakarta',
        avatar: userData.role === 'technician'
          ? 'https://images.unsplash.com/photo-1540569014015-19a7be504e3a?w=150&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
        title: userData.role === 'technician' ? 'Teknisi Servis Elektronik' : undefined
      };

      setUsers(prev => [...prev, newUser]);
      setCurrentUser(newUser);
      setCurrentRole(newUser.role);

      // If registered as technician, also add to technician registry
      if (newUser.role === 'technician') {
        const newTech = {
          id: 'tech-' + Date.now(),
          name: newUser.name,
          title: 'Teknisi Elektronik Panggilan',
          avatar: newUser.avatar,
          verified: false,
          verificationStatus: 'Menunggu Verifikasi Admin',
          badges: ['Pendaftar Baru'],
          rating: 5.0,
          reviewsCount: 0,
          jobsCompleted: 0,
          baseInspectionFee: 40000,
          specialties: ['kipas-angin', 'rice-cooker', 'setrika'],
          serviceAreas: ['Jakarta Selatan', 'Jakarta Pusat'],
          experienceYears: 1,
          bio: 'Teknisi servis panggilan baru di REPAIRIN 360.',
          scheduleStatus: 'Menunggu Verifikasi',
          nextAvailableSlot: '-',
          phone: newUser.phone,
          email: newUser.email,
          documents: [
            { name: 'KTP Pendaftar', status: 'pending', date: new Date().toLocaleDateString('id-ID') }
          ]
        };
        setTechnicians(prev => [newTech, ...prev]);
        setActiveTechnicianId(newTech.id);
        newUser.techId = newTech.id;
      }

      addNotification('Pendaftaran Berhasil', `Akun baru Anda (${newUser.name}) telah aktif.`, newUser.role);
      return { success: true, user: newUser };
    };

    // Add Notification
    const addNotification = (title, message, role = 'customer', orderId = null) => {
      const newNotif = {
        id: 'notif-' + Date.now(),
        title,
        message,
        time: 'Baru saja',
        read: false,
        role,
        orderId
      };
      setNotifications(prev => [newNotif, ...prev]);
    };

    // 1. Order Status Updates
    const updateOrderStatus = (orderId, newStatus, extraData = {}) => {
      setOrders(prevOrders => {
        return prevOrders.map(ord => {
          if (ord.id === orderId) {
            const updated = {
              ...ord,
              status: newStatus,
              ...extraData,
              statusUpdatedAt: new Date().toISOString()
            };

            // If transitioning to completed ('Selesai'), trigger Passport and Rewards automatically if not yet done
            if (newStatus === 'Selesai' && ord.status !== 'Selesai') {
              createRepairPassportForOrder(updated);
              creditCompletionReward(updated);
            }

            return updated;
          }
          return ord;
        });
      });

      addNotification(
        `Status Pesanan Diperbarui: ${newStatus}`,
        `Pesanan ${orderId} kini berstatus "${newStatus}".`,
        currentRole === 'customer' ? 'technician' : 'customer',
        orderId
      );
    };

    // 2. Booking Creation
    const createBooking = (bookingData) => {
      const newOrderId = 'ORD-2026-' + Math.floor(1000 + Math.random() * 9000);
      const tech = technicians.find(t => t.id === bookingData.technicianId);

      const newOrder = {
        id: newOrderId,
        customerName: bookingData.customerName || currentUser?.name || 'Budi Santoso',
        customerPhone: bookingData.customerPhone || currentUser?.phone || '0812-9988-7766',
        customerAddress: bookingData.customerAddress || currentUser?.address || 'Jl. Tebet Barat Dalam VII No. 14, Tebet, Jakarta Selatan',
        category: bookingData.category,
        brand: bookingData.brand,
        model: bookingData.model || '-',
        purchaseYear: bookingData.purchaseYear || '2023',
        itemDescription: bookingData.itemDescription || 'Kerusakan sesuai hasil SmartCheck.',
        symptoms: bookingData.symptoms || [],
        technicianId: bookingData.technicianId,
        technicianName: tech ? tech.name : 'Teknisi REPAIRIN',
        scheduleDate: bookingData.scheduleDate,
        scheduleTime: bookingData.scheduleTime,
        notes: bookingData.notes || '',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16),
        status: 'Menunggu Konfirmasi',
        priceGuard: {
          inspectionFee: tech ? tech.baseInspectionFee : 40000,
          laborFee: 0,
          parts: [],
          additionalFee: 0,
          total: tech ? tech.baseInspectionFee : 40000,
          version: 1,
          technicianNote: 'Estimasi awal biaya kunjungan & cek di tempat. Suku cadang dan perbaikan akan ditentukan setelah inspeksi fisik.',
          customerApprovalStatus: 'Menunggu Pemeriksaan'
        },
        payment: {
          status: 'Belum Dibayar',
          method: bookingData.paymentMethod || 'Tunai kepada Teknisi',
          amount: tech ? tech.baseInspectionFee : 40000,
          paidAt: null
        },
        smartCheckSummary: bookingData.smartCheckSummary || null
      };

      setOrders(prev => [newOrder, ...prev]);
      addNotification('Pesanan Servis Berhasil Dibuat', `Pesanan ${newOrderId} telah dikirim ke teknisi. Menunggu konfirmasi.`, 'customer', newOrderId);
      addNotification('Permintaan Servis Baru Masuk', `Pesanan baru ${newOrderId} dari ${newOrder.customerName}.`, 'technician', newOrderId);
      return newOrder;
    };

    // 3. PriceGuard Actions
    const updatePriceGuardQuote = (orderId, { inspectionFee, laborFee, parts = [], additionalFee = 0, technicianNote }) => {
      const totalParts = parts.reduce((acc, p) => acc + (Number(p.price) * Number(p.qty || 1)), 0);
      const grandTotal = Number(inspectionFee) + Number(laborFee) + totalParts + Number(additionalFee);

      setOrders(prev => prev.map(ord => {
        if (ord.id === orderId) {
          const prevHistory = ord.priceGuard?.history || [];
          const currentVersion = ord.priceGuard?.version || 1;
          const newHistory = [
            ...prevHistory,
            {
              version: currentVersion,
              total: ord.priceGuard?.total,
              date: new Date().toISOString(),
              technicianNote: ord.priceGuard?.technicianNote
            }
          ];

          return {
            ...ord,
            status: 'Menunggu Persetujuan Biaya',
            priceGuard: {
              inspectionFee: Number(inspectionFee),
              laborFee: Number(laborFee),
              parts,
              additionalFee: Number(additionalFee),
              total: grandTotal,
              version: currentVersion + 1,
              technicianNote,
              customerApprovalStatus: 'Menunggu Tanggapan Pelanggan',
              history: newHistory
            },
            payment: {
              ...ord.payment,
              amount: grandTotal
            }
          };
        }
        return ord;
      }));

      addNotification('PriceGuard: Estimasi Biaya Baru', `Teknisi telah memperbarui rincian biaya final untuk ${orderId}. Silakan periksa dan setujui.`, 'customer', orderId);
    };

    const approvePriceGuardQuote = (orderId) => {
      setOrders(prev => prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'Dalam Perbaikan',
            priceGuard: {
              ...ord.priceGuard,
              customerApprovalStatus: 'Disetujui Pelanggan',
              approvedAt: new Date().toISOString()
            }
          };
        }
        return ord;
      }));

      addNotification('PriceGuard: Biaya Disetujui', `Pelanggan telah menyetujui rincian biaya pesanan ${orderId}. Pekerjaan perbaikan dapat dilanjutkan.`, 'technician', orderId);
    };

    const rejectPriceGuardQuote = (orderId, reason) => {
      setOrders(prev => prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            status: 'Pemeriksaan',
            priceGuard: {
              ...ord.priceGuard,
              customerApprovalStatus: 'Ditolak / Meminta Klarifikasi',
              customerFeedback: reason
            }
          };
        }
        return ord;
      }));

      addNotification('PriceGuard: Pelanggan Meminta Revisi', `Pelanggan ${orderId} menolak/meminta revisi rincian biaya: "${reason}".`, 'technician', orderId);
    };

    // 4. Payment
    const simulatePayment = (orderId, method = 'Transfer Bank') => {
      setOrders(prev => prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            payment: {
              ...ord.payment,
              status: 'Berhasil',
              method,
              paidAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          };
        }
        return ord;
      }));
      addNotification('Pembayaran Berhasil Dikonfirmasi', `Pembayaran untuk ${orderId} telah berhasil diverifikasi.`, 'customer', orderId);
    };

    // 5. Automatic Creation of Repair Passport upon Completion
    const createRepairPassportForOrder = (order) => {
      const passportCode = 'RP-' + new Date().getFullYear() + '-' + Math.floor(10000 + Math.random() * 90000);
      const catObj = categories.find(c => c.id === order.category) || {};

      const newPassport = {
        passportCode,
        orderId: order.id,
        itemCategory: catObj.name || order.category,
        itemName: `${order.brand} ${order.model}`,
        brand: order.brand,
        model: order.model,
        serialNumber: `${order.brand.substring(0, 3).toUpperCase()}-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
        purchaseYear: order.purchaseYear,
        customerName: order.customerName,
        technicianName: order.technicianName,
        repairDate: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }),
        initialDiagnosis: order.itemDescription,
        actionTaken: order.priceGuard?.technicianNote || 'Perbaikan modul dan penggantian komponen aus.',
        replacedComponents: order.priceGuard?.parts?.map(p => ({
          name: p.name,
          serial: 'PART-' + Math.floor(10000 + Math.random() * 90000),
          warrantyDays: 90
        })) || [],
        totalCost: order.priceGuard?.total || 120000,
        beforePhoto: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=300&auto=format&fit=crop&q=80',
        afterPhoto: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=300&auto=format&fit=crop&q=80',
        warranty: {
          warrantyCode: 'WRN-' + Math.floor(10000 + Math.random() * 90000),
          durationDays: 90,
          startDate: new Date().toISOString().split('T')[0],
          endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          status: 'Aktif',
          coveredComponents: order.priceGuard?.parts?.map(p => p.name).join(', ') || 'Komponen yang diganti',
          terms: 'Garansi resmi pengerjaan dan komponen 90 hari kalender. Klaim bebas biaya pemeriksaan ulang.'
        },
        carbonSavedKg: catObj.co2SavedKg || 15.0,
        eWasteDivertedKg: catObj.eWasteKg || 3.5
      };

      setRepairPassports(prev => [newPassport, ...prev]);

      // Update circular stats
      setCircularStats(prev => ({
        ...prev,
        totalItemsRepaired: prev.totalItemsRepaired + 1,
        totalEWasteDivertedKg: prev.totalEWasteDivertedKg + (catObj.eWasteKg || 3.5),
        totalCo2SavedKg: prev.totalCo2SavedKg + (catObj.co2SavedKg || 15.0),
        moneySavedByUsersRp: prev.moneySavedByUsersRp + Math.max(50000, (catObj.avgReplaceCost || 300000) - (order.priceGuard?.total || 120000))
      }));

      addNotification('Repair Passport Diterbitkan!', `Passport digital ${passportCode} dan Garansi 90 Hari telah aktif untuk ${order.brand} ${order.model}.`, 'customer', order.id);
    };

    // 6. Circular Reward Credit Flow
    const creditCompletionReward = (order) => {
      const pointsToAdd = platformSettings.pointsPerServiceCompletion; // 50 pts
      const newLedgerItem = {
        id: 'LED-' + Date.now(),
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        activity: `Menyelesaikan Servis ${order.brand} ${order.model} (#${order.id})`,
        points: pointsToAdd,
        type: 'credit'
      };

      setRewards(prev => ({
        ...prev,
        customerPoints: prev.customerPoints + pointsToAdd,
        ledger: [newLedgerItem, ...prev.ledger]
      }));

      addNotification('Selamat! +50 Circular Points Diperoleh', `Anda berkontribusi menyelamatkan lingkungan dengan memilih reparasi! Poin telah ditambahkan.`, 'customer', order.id);
    };

    const creditReviewReward = (orderId, stars, comment) => {
      const pointsToAdd = platformSettings.pointsPerReview; // 10 pts

      // Update order with rating
      setOrders(prev => prev.map(ord => {
        if (ord.id === orderId) {
          return {
            ...ord,
            rating: {
              stars,
              comment,
              reviewedAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
            }
          };
        }
        return ord;
      }));

      const newLedgerItem = {
        id: 'LED-' + Date.now(),
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        activity: `Memberikan Ulasan Bintang ${stars} (${orderId})`,
        points: pointsToAdd,
        type: 'credit'
      };

      setRewards(prev => ({
        ...prev,
        customerPoints: prev.customerPoints + pointsToAdd,
        ledger: [newLedgerItem, ...prev.ledger]
      }));

      addNotification('Ulasan Berhasil Dikirim', `Terima kasih atas ulasan Anda! +${pointsToAdd} Circular Points telah masuk dompet reward Anda.`, 'customer', orderId);
    };

    const redeemVoucher = (catalogId) => {
      const catalogItem = rewards.catalog.find(c => c.id === catalogId);
      if (!catalogItem) return { success: false, message: 'Voucher tidak ditemukan.' };

      if (rewards.customerPoints < catalogItem.pointsRequired) {
        return { success: false, message: `Poin tidak mencukupi! Anda memiliki ${rewards.customerPoints} poin, dibutuhkan ${catalogItem.pointsRequired} poin.` };
      }

      const newVoucherCode = 'CIR-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      const expiryDate = new Date(Date.now() + (catalogItem.validDays || 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

      const newMyVoucher = {
        voucherId: 'MYV-' + Date.now(),
        code: newVoucherCode,
        title: catalogItem.title,
        discountAmount: catalogItem.discountAmount,
        status: 'Aktif',
        expiresAt: expiryDate,
        redeemedAt: new Date().toISOString().split('T')[0]
      };

      const newLedgerItem = {
        id: 'LED-' + Date.now(),
        date: new Date().toISOString().replace('T', ' ').substring(0, 16),
        activity: `Penukaran Voucher: ${catalogItem.title}`,
        points: catalogItem.pointsRequired,
        type: 'debit'
      };

      setRewards(prev => ({
        ...prev,
        customerPoints: prev.customerPoints - catalogItem.pointsRequired,
        ledger: [newLedgerItem, ...prev.ledger],
        myVouchers: [newMyVoucher, ...prev.myVouchers]
      }));

      addNotification('Voucher Berhasil Ditukarkan!', `Kode kupon ${newVoucherCode} kini aktif di "My Vouchers". Gunakan saat transaksi berikutnya!`, 'customer');
      return { success: true, voucher: newMyVoucher };
    };

    // 7. SmartCheck Save / Handoff
    const saveSmartCheck = (analysisResult) => {
      setSmartCheckHistory(prev => [analysisResult, ...prev]);
      setActiveSmartCheckHandoff(analysisResult);
    };

    // 8. Complaints
    const submitComplaint = (complaintData) => {
      const newComplaint = {
        id: 'CMP-2026-' + Math.floor(100 + Math.random() * 900),
        orderId: complaintData.orderId,
        customerName: complaintData.customerName || currentUser?.name || 'Budi Santoso',
        technicianName: complaintData.technicianName || 'Teknisi',
        category: complaintData.category,
        description: complaintData.description,
        evidencePhoto: complaintData.evidencePhoto || null,
        status: 'Menunggu',
        adminNotes: 'Menunggu review petugas investigasi REPAIRIN 360.',
        createdAt: new Date().toISOString().replace('T', ' ').substring(0, 16)
      };

      setComplaints(prev => [newComplaint, ...prev]);
      addNotification('Laporan Pengaduan Diterima', `Tiket pengaduan ${newComplaint.id} telah dicatat dan sedang ditinjau tim admin.`, 'customer', complaintData.orderId);
    };

    const updateComplaintStatus = (complaintId, status, adminNotes) => {
      setComplaints(prev => prev.map(c => {
        if (c.id === complaintId) {
          return { ...c, status, adminNotes };
        }
        return c;
      }));
    };

    // 9. Technician Verification
    const verifyTechnician = (techId, isApproved, remarks = '') => {
      setTechnicians(prev => prev.map(t => {
        if (t.id === techId) {
          return {
            ...t,
            verified: isApproved,
            verificationStatus: isApproved ? 'Terverifikasi' : 'Ditolak: ' + remarks,
            scheduleStatus: isApproved ? 'Tersedia' : 'Dinonaktifkan'
          };
        }
        return t;
      }));
      addNotification(
        isApproved ? 'Verifikasi Teknisi Disetujui' : 'Verifikasi Teknisi Ditolak',
        `Status akun teknisi ${techId} telah diperbarui oleh Admin.`,
        'technician'
      );
    };

    // 10. Warranty Claim Flow
    const claimWarranty = (passportCode, issueDescription) => {
      setRepairPassports(prev => prev.map(p => {
        if (p.passportCode === passportCode) {
          return {
            ...p,
            warranty: {
              ...p.warranty,
              claimStatus: 'Klaim Sedang Diproses',
              lastClaimIssue: issueDescription,
              lastClaimDate: new Date().toISOString().split('T')[0]
            }
          };
        }
        return p;
      }));
      addNotification('Klaim Garansi Diajukan', `Klaim garansi untuk ${passportCode} sedang diverifikasi oleh teknisi terkait. Bebas biaya pemeriksaan.`, 'customer');
    };

    // Reset demo state
    const resetDemoState = () => {
      localStorage.removeItem(`${STORAGE_KEY}_users`);
      localStorage.removeItem(`${STORAGE_KEY}_current_user`);
      localStorage.removeItem(`${STORAGE_KEY}_techs`);
      localStorage.removeItem(`${STORAGE_KEY}_orders`);
      localStorage.removeItem(`${STORAGE_KEY}_passports`);
      localStorage.removeItem(`${STORAGE_KEY}_rewards`);
      localStorage.removeItem(`${STORAGE_KEY}_complaints`);
      localStorage.removeItem(`${STORAGE_KEY}_stats`);
      localStorage.removeItem(`${STORAGE_KEY}_smartcheck`);

      setUsers(SEED_USERS);
      setCurrentUser(null); // Ubah ke null agar kembali ke landing page
      setCurrentRole('customer');
      setActiveTechnicianId('tech-2');
      setTechnicians(INITIAL_TECHNICIANS);
      setOrders(INITIAL_ORDERS);
      setRepairPassports(INITIAL_REPAIR_PASSPORTS);
      setRewards(INITIAL_REWARDS_STATE);
      setComplaints(INITIAL_COMPLAINTS);
      setCircularStats(INITIAL_CIRCULAR_STATS);
      setSmartCheckHistory([]);
      setActiveSmartCheckHandoff(null);
    };

    return (
      <AppContext.Provider
        value={{
          users,
          currentUser,
          currentRole,
          setCurrentRole,
          activeTechnicianId,
          setActiveTechnicianId,
          login,
          quickLogin,
          logout,
          register,
          categories,
          technicians,
          orders,
          repairPassports,
          rewards,
          complaints,
          circularStats,
          platformSettings,
          setPlatformSettings,
          notifications,
          smartCheckHistory,
          activeSmartCheckHandoff,
          setActiveSmartCheckHandoff,
          // Actions
          updateOrderStatus,
          createBooking,
          updatePriceGuardQuote,
          approvePriceGuardQuote,
          rejectPriceGuardQuote,
          simulatePayment,
          creditReviewReward,
          redeemVoucher,
          saveSmartCheck,
          submitComplaint,
          updateComplaintStatus,
          verifyTechnician,
          claimWarranty,
          addNotification,
          resetDemoState
        }}
      >
        {children}
      </AppContext.Provider>
    );
  }

  export function useApp() {
    const context = useContext(AppContext);
    if (!context) {
      throw new Error('useApp must be used within an AppProvider');
    }
    return context;
  }
// SmartCheck Rule-Based Diagnostic Engine

export function runSmartCheckAnalysis({ categoryId, brand, model, usageYears, condition, selectedSymptoms = [], notes = '' }) {
  let probableCauses = [];
  let affectedComponents = [];
  let severity = 'Sedang'; // Ringan, Sedang, Berat
  let safetyWarning = null;
  let estimatedCostMin = 40000;
  let estimatedCostMax = 120000;
  let recommendedTechCategory = 'Elektronik Rumah Tangga';
  let initialInstructions = [];

  const symSet = new Set(selectedSymptoms);

  // Common safety check for all categories
  if (symSet.has('bau-terbakar') || symSet.has('st-korslet') || symSet.has('kl-korslet') || notes.toLowerCase().includes('asap') || notes.toLowerCase().includes('nyetrum')) {
    severity = 'Berat';
    safetyWarning = 'PERINGATAN KESELAMATAN KRITIS: Terindikasi adanya arus pendek atau panas berlebih yang berpotensi kebakaran atau sengatan listrik. Segera cabut steker dari stopkontak dan JANGAN mencoba menyalakan kembali perangkat hingga diperiksa teknisi tersertifikasi.';
    initialInstructions.push('Cabut steker dari stopkontak sekarang juga.');
    initialInstructions.push('Letakkan perangkat di tempat berventilasi baik jauh dari bahan mudah terbakar.');
  }

  switch (categoryId) {
    case 'kipas-angin':
      recommendedTechCategory = 'Teknisi Elektronik Kecil & Dinamo';
      if (symSet.has('mati-total') && symSet.has('bau-terbakar')) {
        probableCauses.push('Thermal fuse motor putus akibat overheat atau gulungan kawat dinamo terbakar.');
        affectedComponents.push('Thermal Fuse 135°C', 'Stator Dinamo / Gulungan Tembaga');
        severity = 'Berat';
        estimatedCostMin = 75000;
        estimatedCostMax = 150000;
        initialInstructions.push('Hentikan pemakaian agar dinamo tidak hangus permanen.');
      } else if (symSet.has('putaran-lambat') || symSet.has('suara-berisik')) {
        probableCauses.push('Bushing as motor aus/kering pelumas, atau kapasitor running mengalami pelemahan kapasitas.');
        affectedComponents.push('Bushing Kuningan 8mm', 'Kapasitor CBB61 (1.2uF - 2.0uF)');
        severity = 'Ringan';
        estimatedCostMin = 45000;
        estimatedCostMax = 95000;
        initialInstructions.push('Hindari memutar paksa menggunakan tangan terlalu lama saat mesin dialiri listrik.');
      } else if (symSet.has('kecepatan-rusak')) {
        probableCauses.push('Saklar switch tombol selector aus atau kabel jumper switch putus.');
        affectedComponents.push('Push Button Switch Assembly', 'Kabel Konektor');
        severity = 'Ringan';
        estimatedCostMin = 35000;
        estimatedCostMax = 65000;
      } else if (symSet.has('tidak-bisa-geleng')) {
        probableCauses.push('Gearbox osilasi belakang patah gigi atau pin penarik lepas.');
        affectedComponents.push('Gear Box Assembly Oscillation');
        severity = 'Ringan';
        estimatedCostMin = 40000;
        estimatedCostMax = 75000;
      } else {
        probableCauses.push('Gangguan suplai daya listrik atau pelumasan poros motor.');
        affectedComponents.push('Kabel Power', 'Pelumas Poros As');
        estimatedCostMin = 35000;
        estimatedCostMax = 80000;
      }
      break;

    case 'rice-cooker':
      recommendedTechCategory = 'Teknisi Elektronik Rumah Tangga';
      if (symSet.has('rc-mati-total')) {
        probableCauses.push('Thermal fuse suhu putus untuk mencegah kebakaran akibat lonjakan panas.');
        affectedComponents.push('Thermal Protector / Fuse 165°C - 250V', 'Kabel AC Inlet');
        severity = 'Sedang';
        estimatedCostMin = 50000;
        estimatedCostMax = 90000;
        initialInstructions.push('Pastikan tidak ada nasi atau remah kering terselip di bawah lempeng pemanas utama.');
      } else if (symSet.has('tidak-menghangatkan') || symSet.has('tuas-tidak-terkunci')) {
        probableCauses.push('Elemen pemanas samping/tutup putus, atau microswitch termostat magnetik kehilangan daya pegas.');
        affectedComponents.push('Cast Magnet Thermostat', 'Microswitch Cook/Warm', 'Elemen Warm Samping');
        severity = 'Sedang';
        estimatedCostMin = 65000;
        estimatedCostMax = 135000;
        initialInstructions.push('Jangan menekan tuas paksa dengan mengganjal benda berat karena dapat merusak panci teflon.');
      } else if (symSet.has('nasi-gosong')) {
        probableCauses.push('Thermostat tengah macet tidak mau cut-off saat air sudah menguap habis.');
        affectedComponents.push('Thermostat Magnetik Bawah');
        severity = 'Sedang';
        estimatedCostMin = 55000;
        estimatedCostMax = 110000;
      } else {
        probableCauses.push('Kontak saklar aus atau elemen pemanas dasar memerlukan kalibrasi.');
        affectedComponents.push('Elemen Plat Dasar');
        estimatedCostMin = 50000;
        estimatedCostMax = 120000;
      }
      break;

    case 'setrika':
      recommendedTechCategory = 'Teknisi Elektronik Kecil';
      if (symSet.has('st-korslet') || symSet.has('st-kabel-rusak')) {
        probableCauses.push('Isolasi kabel fleksibel robek menyebabkan korsleting netral & fasa di leher setrika.');
        affectedComponents.push('Kabel Setrika Tahan Panas 3-Core', 'Klem Pengaman Kabel');
        severity = 'Berat';
        estimatedCostMin = 45000;
        estimatedCostMax = 85000;
        initialInstructions.push('Jangan mencolokkan setrika ke colokan listrik sebelum kabel diganti.');
      } else if (symSet.has('st-terlalu-panas')) {
        probableCauses.push('Platina bimetal thermostat menempel permanen (lengket) tidak mau memutus arus saat suhu tercapai.');
        affectedComponents.push('Bimetal Thermostat Setrika');
        severity = 'Sedang';
        estimatedCostMin = 50000;
        estimatedCostMax = 95000;
      } else {
        probableCauses.push('Thermal fuse putus atau elemen pemanas alas (soleplate) putus jalur.');
        affectedComponents.push('Thermal Fuse', 'Soleplate Element');
        estimatedCostMin = 45000;
        estimatedCostMax = 110000;
      }
      break;

    case 'dispenser':
      recommendedTechCategory = 'Teknisi Pendingin & Dispenser';
      if (symSet.has('ds-bocor')) {
        probableCauses.push('Selang silikon elastis sobek/pecah getas atau klem tabung air panas bocor.');
        affectedComponents.push('Selang Food-Grade Silicon', 'Klem Stainless Tabung Panas');
        severity = 'Sedang';
        estimatedCostMin = 60000;
        estimatedCostMax = 130000;
        initialInstructions.push('Segera matikan tombol saklar merah (heater) di belakang dispenser dan keringkan genangan air.');
      } else if (symSet.has('ds-tidak-dingin')) {
        probableCauses.push('Kipas pendingin mati, modul peltier pendingin rusak, atau kompresor/freon mengalami kebocoran.');
        affectedComponents.push('Modul Peltier Termoelektrik / Kompresor', 'Relay PTC');
        severity = 'Sedang';
        estimatedCostMin = 85000;
        estimatedCostMax = 250000;
      } else if (symSet.has('ds-pompa-macet')) {
        probableCauses.push('Motor pompa hisap galon bawah macet atau sensor switch pelampung galon kotor.');
        affectedComponents.push('Water Pump 12V Dispenser', 'Door Switch Sensor');
        severity = 'Sedang';
        estimatedCostMin = 90000;
        estimatedCostMax = 175000;
      } else {
        probableCauses.push('Bimetal thermostat pemanas tabung putus.');
        affectedComponents.push('Thermostat 85°C Tabung Pemanas');
        estimatedCostMin = 55000;
        estimatedCostMax = 120000;
      }
      break;

    case 'mesin-cuci':
      recommendedTechCategory = 'Teknisi Mesin Cuci & Motor Induksi';
      if (symSet.has('mc-tidak-putar')) {
        probableCauses.push('V-Belt transmisi putus/kendur, kapasitor dinamo soak, atau gearbox pulsator aus.');
        affectedComponents.push('Fan Belt Mesin Cuci', 'Kapasitor Ganda 10uF+5uF', 'Gearbox Pulsator');
        severity = 'Sedang';
        estimatedCostMin = 85000;
        estimatedCostMax = 220000;
      } else if (symSet.has('mc-pengering-mati')) {
        probableCauses.push('Rem pengering macet (tali rem putus), saklar pintu (door switch) berkarat, atau dinamo spin terbakar.');
        affectedComponents.push('Door Safety Switch', 'Brake Lining Spin', 'Motor Dinamo Pengering');
        severity = 'Sedang';
        estimatedCostMin = 95000;
        estimatedCostMax = 320000;
      } else if (symSet.has('mc-error-code')) {
        probableCauses.push('Sensor ketinggian air (water level sensor) tersumbat atau solenoid valve inlet kotor.');
        affectedComponents.push('Pressure Sensor Water Level', 'Inlet Water Solenoid Valve');
        severity = 'Sedang';
        estimatedCostMin = 120000;
        estimatedCostMax = 260000;
      } else {
        probableCauses.push('Seal karet pembuangan tersumbat koin atau per suspensi tabung kendor.');
        affectedComponents.push('Karet Seal Drain Valve', 'Suspension Spring');
        estimatedCostMin = 75000;
        estimatedCostMax = 190000;
      }
      break;

    case 'kulkas':
      recommendedTechCategory = 'Teknisi Pendingin & Kulkas Inverter';
      if (symSet.has('kl-bawah-tidak-dingin') || symSet.has('kl-bunga-es-tebal')) {
        probableCauses.push('Sistem otomatis defrost gagal: bimetal defrost putus, heater pemanas kaca mati, atau defrost timer macet.');
        affectedComponents.push('Bimetal Defrost Sensor', 'Glass Tube Defrost Heater', 'Defrost Timer 1-4 / Modul PCB');
        severity = 'Sedang';
        estimatedCostMin = 125000;
        estimatedCostMax = 310000;
        initialInstructions.push('Jangan mencongkel bunga es dengan pisau atau benda tajam karena dapat menusuk pipa evaporator.');
      } else if (symSet.has('kl-tidak-dingin') || symSet.has('kl-bunyi-kasar')) {
        probableCauses.push('Relay PTC starter kompresor hangus, overload protector cut-off, atau freon bocor di jalur kondensor.');
        affectedComponents.push('Relay PTC Starter', 'Thermal Overload Protector', 'Refill Freon R134a/R600a');
        severity = 'Berat';
        estimatedCostMin = 150000;
        estimatedCostMax = 480000;
      } else {
        probableCauses.push('Gasket karet pintu getas tidak rapat atau thermostat mekanik error.');
        affectedComponents.push('Karet Gasket Magnetik Pintu', 'Thermostat Pengatur Suhu');
        estimatedCostMin = 90000;
        estimatedCostMax = 220000;
      }
      break;

    case 'televisi':
      recommendedTechCategory = 'Teknisi TV LED & Elektronika Digital';
      if (symSet.has('tv-suara-ada-gambar-gelap')) {
        probableCauses.push('Strip lampu LED backlight putus salah satu led atau modul inverter backlight proteksi.');
        affectedComponents.push('Backlight LED Strip Full Set (3V / 6V)', 'Driver Backlight');
        severity = 'Sedang';
        estimatedCostMin = 175000;
        estimatedCostMax = 420000;
        initialInstructions.push('Uji dengan mendekatkan senter HP ke layar; jika tampak siluet gambar samar maka positif backlight.');
      } else if (symSet.has('tv-mati-total')) {
        probableCauses.push('Power Supply Board (PSU) korslet, diode bridge jebol, atau kapasitor primer melembung.');
        affectedComponents.push('Power Supply Module Board', 'Kapasitor Elektrolit 450V');
        severity = 'Sedang';
        estimatedCostMin = 150000;
        estimatedCostMax = 380000;
      } else {
        probableCauses.push('Kabel fleksibel LVDS kotor atau firmware T-Con board corrupt.');
        affectedComponents.push('Kabel LVDS', 'T-Con Logic Board');
        estimatedCostMin = 110000;
        estimatedCostMax = 290000;
      }
      break;

    default:
      probableCauses.push('Penurunan performa akibat umur pakai komponen elektrik atau keausan mekanis.');
      affectedComponents.push('Komponen Penggerak / Switch');
      estimatedCostMin = 50000;
      estimatedCostMax = 150000;
  }

  // Fallback if empty
  if (probableCauses.length === 0) {
    probableCauses.push('Gangguan mekanik atau pemutus arus internal akibat beban operasional.');
    affectedComponents.push('Komponen Internal Perangkat');
  }
  if (initialInstructions.length === 0) {
    initialInstructions.push('Simpan perangkat di area kering dan bersihkan debu ventilasi luar.');
    initialInstructions.push('Hindari membongkar sendiri tanpa keahlian elektronika untuk mencegah garansi gugur atau risiko cedera.');
  }

  return {
    analysisId: 'SC-' + Math.floor(100000 + Math.random() * 900000),
    timestamp: new Date().toISOString(),
    itemSummary: `${brand || 'Perangkat'} ${model || ''}`.trim() || 'Perangkat Elektronik',
    categoryId,
    probableCauses,
    affectedComponents,
    severity,
    safetyWarning,
    estimatedCostMin,
    estimatedCostMax,
    recommendedTechCategory,
    initialInstructions,
    confidenceScore: Math.min(94, 75 + selectedSymptoms.length * 5) + '%'
  };
}

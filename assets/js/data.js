export const database = {
  users: [
    {
      id: 1,
      name: "Admin Charity",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: 2,
      name: "Donatur Baik",
      email: "user@gmail.com",
      password: "user123",
      role: "user",
    },
  ],
  currentUser: null,
  kampanye: [
    {
      id: "K1",
      judul: "Bantuan Pangan Korban Banjir",
      gambar: "https://images.unsplash.com/photo-1542810634-71277d95dcbb",
      deskripsi:
        "Membantu menyediakan bahan pangan pokok untuk warga terdampak banjir di pesisir.",
      target: 50000000,
      terkumpul: 15250000,
      kategori: "Bencana Alam",
      tenggatWaktu: "2026-03-20",
    },
    {
      id: "K2",
      judul: "Beasiswa Anak Pesisir Bali",
      gambar: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      deskripsi:
        "Program bantuan pendidikan untuk anak-anak nelayan agar bisa lanjut ke jenjang SMA.",
      target: 25000000,
      terkumpul: 10000000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-05-15",
    },
    {
      id: "K3",
      judul: "Penanaman 1000 Mangrove",
      gambar:
        "http://backpackerjakarta.com/wp-content/uploads/2016/08/New-Image2-8.jpg",
      deskripsi:
        "Aksi nyata menjaga ekosistem pantai Bali dengan menanam bibit mangrove baru.",
      target: 15000000,
      terkumpul: 5000000,
      kategori: "Lingkungan",
      tenggatWaktu: "2026-02-28",
    },
    {
      id: "K4",
      judul: "Cegah Stunting Balita Desa",
      gambar:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=600",
      deskripsi:
        "Penyaluran paket gizi tambahan (susu & vitamin) untuk 500 balita di daerah rawan gizi buruk.",
      target: 30000000,
      terkumpul: 12500000,
      kategori: "Kesehatan",
      tenggatWaktu: "2026-04-10",
    },
    {
      id: "K5",
      judul: "Rumah Aman Kucing Terlantar",
      gambar: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600",
      deskripsi:
        "Pembangunan shelter dan biaya sterilisasi untuk mengurangi populasi kucing liar yang sakit.",
      target: 15000000,
      terkumpul: 4500000,
      kategori: "Hewan",
      tenggatWaktu: "2026-06-01",
    },
    {
      id: "K6",
      judul: "Wakaf Sumur Air Bersih NTT",
      gambar:
        "https://images.unsplash.com/photo-1581452932336-0c84185799a7?w=600",
      deskripsi:
        "Membangun sumur bor di 3 desa yang mengalami kekeringan ekstrem agar warga tidak perlu jalan 5km demi air.",
      target: 60000000,
      terkumpul: 58000000,
      kategori: "Infrastruktur",
      tenggatWaktu: "2026-02-15",
    },
    {
      id: "K7",
      judul: "Bantu Lansia Sebatang Kara",
      gambar: "https://images.unsplash.com/photo-1563233816-15e44cb8972e?w=600",
      deskripsi:
        "Memberikan santunan bulanan dan pemeriksaan kesehatan rutin untuk lansia yang hidup sendirian.",
      target: 20000000,
      terkumpul: 8200000,
      kategori: "Sosial",
      tenggatWaktu: "2026-12-30",
    },
    {
      id: "K8",
      judul: "Renovasi Sekolah Atap Bocor",
      gambar:
        "https://images.unsplash.com/photo-1588072432836-e10032774350?w=600",
      deskripsi:
        "Perbaikan atap dan lantai SD Negeri di pelosok yang rusak parah agar siswa bisa belajar dengan aman.",
      target: 85000000,
      terkumpul: 21000000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-08-17",
    },
    {
      id: "K9",
      judul: "Al-Quran Braille Tunanetra",
      gambar:
        "https://images.unsplash.com/photo-1584819762143-698e3b5e4e7c?w=600",
      deskripsi:
        "Pengadaan 100 set Al-Quran Braille untuk saudara kita yang memiliki keterbatasan penglihatan.",
      target: 25000000,
      terkumpul: 18750000,
      kategori: "Keagamaan",
      tenggatWaktu: "2026-03-10",
    },
    {
      id: "K10",
      judul: "Operasi Jantung Adik Budi",
      gambar:
        "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600",
      deskripsi:
        "Budi (5 th) menderita kelainan jantung bawaan dan membutuhkan operasi segera yang tidak ditanggung penuh.",
      target: 150000000,
      terkumpul: 95000000,
      kategori: "Medis",
      tenggatWaktu: "2026-02-20",
    },
    {
      id: "K11",
      judul: "Kaki Palsu untuk Difabel",
      gambar: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600",
      deskripsi:
        "Pembuatan kaki palsu gratis agar teman-teman difabel bisa kembali beraktivitas dan bekerja mandiri.",
      target: 40000000,
      terkumpul: 12000000,
      kategori: "Kemanusiaan",
      tenggatWaktu: "2026-07-22",
    },
    {
      id: "K12",
      judul: "Perahu Pustaka Sungai Mahakam",
      gambar: "https://images.unsplash.com/photo-1544376798-89aa6b82c6cd?w=600",
      deskripsi:
        "Perpustakaan keliling menggunakan perahu untuk menjangkau anak-anak di bantaran sungai yang sulit akses buku.",
      target: 35000000,
      terkumpul: 5000000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-09-09",
    },
    {
      id: "K13",
      judul: "Ambulans Gratis Dhuafa",
      gambar:
        "https://images.unsplash.com/photo-1587745416684-479530166637?w=600",
      deskripsi:
        "Pengadaan unit mobil ambulans untuk layanan antar jemput pasien kurang mampu secara cuma-cuma.",
      target: 250000000,
      terkumpul: 180000000,
      kategori: "Kesehatan",
      tenggatWaktu: "2026-05-05",
    },
    {
      id: "K14",
      judul: "Air Bersih untuk Asmat Papua",
      gambar:
        "https://images.unsplash.com/photo-1536053406180-21a4d952a16d?w=600",
      deskripsi:
        "Pembangunan instalasi penjernihan air untuk warga Asmat yang kesulitan mendapatkan air layak konsumsi.",
      target: 75000000,
      terkumpul: 25000000,
      kategori: "Infrastruktur",
      tenggatWaktu: "2026-08-01",
    },
    {
      id: "K15",
      judul: "Bangun Kembali Pasar Terbakar",
      gambar:
        "https://images.unsplash.com/photo-1472145246862-b24cf25c4a36?w=600",
      deskripsi:
        "Membantu pedagang kecil mendirikan lapak sementara setelah pasar tradisional habis dilalap api.",
      target: 100000000,
      terkumpul: 15000000,
      kategori: "Bencana Alam",
      tenggatWaktu: "2026-03-30",
    },
    {
      id: "K16",
      judul: "Beasiswa Santri Penghafal Quran",
      gambar:
        "https://images.unsplash.com/photo-1609513337438-e6d7877e8082?w=600",
      deskripsi:
        "Menanggung biaya hidup dan pendidikan 50 santri yatim dhuafa yang sedang menghafal Al-Quran.",
      target: 50000000,
      terkumpul: 42000000,
      kategori: "Keagamaan",
      tenggatWaktu: "2026-05-20",
    },
    {
      id: "K17",
      judul: "Selamatkan Orangutan Kalimantan",
      gambar:
        "https://images.unsplash.com/photo-1574341512702-53b983578716?w=600",
      deskripsi:
        "Program rehabilitasi hutan dan perawatan medis bagi orangutan yang kehilangan habitatnya.",
      target: 200000000,
      terkumpul: 120000000,
      kategori: "Hewan",
      tenggatWaktu: "2026-11-10",
    },
    {
      id: "K18",
      judul: "Kacamata Gratis Pelajar Desa",
      gambar:
        "https://images.unsplash.com/photo-1597842601267-28562725e626?w=600",
      deskripsi:
        "Pemeriksaan mata dan pembagian 1000 kacamata gratis untuk siswa SD yang mengalami gangguan penglihatan.",
      target: 30000000,
      terkumpul: 8500000,
      kategori: "Kesehatan",
      tenggatWaktu: "2026-04-05",
    },
    {
      id: "K19",
      judul: "Jembatan Gantung Desa Terisolir",
      gambar:
        "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?w=600",
      deskripsi:
        "Membangun jembatan gantung agar anak-anak sekolah tidak perlu menyeberangi sungai deras dengan rakit.",
      target: 150000000,
      terkumpul: 30000000,
      kategori: "Infrastruktur",
      tenggatWaktu: "2026-09-15",
    },
    {
      id: "K20",
      judul: "Sekolah Alam Anak Jalanan",
      gambar:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      deskripsi:
        "Menyediakan tempat belajar non-formal dan makan siang gratis bagi anak-anak jalanan di kota besar.",
      target: 45000000,
      terkumpul: 22000000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-06-25",
    },
    {
      id: "K21",
      judul: "Renovasi Masjid Tua Pelosok",
      gambar:
        "https://images.unsplash.com/photo-1564121211835-e88c852648ab?w=600",
      deskripsi:
        "Perbaikan atap dan tempat wudhu masjid satu-satunya di desa yang sudah lapuk dimakan usia.",
      target: 80000000,
      terkumpul: 65000000,
      kategori: "Keagamaan",
      tenggatWaktu: "2026-02-25",
    },
    {
      id: "K22",
      judul: "Konservasi Penyu Laut Bali",
      gambar:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=600",
      deskripsi:
        "Menjaga telur penyu dari predator dan melepaskan tukik kembali ke laut bebas.",
      target: 25000000,
      terkumpul: 18000000,
      kategori: "Lingkungan",
      tenggatWaktu: "2026-07-07",
    },
    {
      id: "K23",
      judul: "Alat Bantu Dengar Lansia",
      gambar:
        "https://images.unsplash.com/photo-1525010668270-388a6d653771?w=600",
      deskripsi:
        "Membagikan alat bantu dengar untuk lansia prasejahtera agar bisa kembali berkomunikasi dengan keluarga.",
      target: 35000000,
      terkumpul: 5000000,
      kategori: "Kesehatan",
      tenggatWaktu: "2026-05-12",
    },
    {
      id: "K24",
      judul: "Modal Usaha Janda Dhuafa",
      gambar: "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?w=600",
      deskripsi:
        "Memberikan gerobak dan modal awal untuk ibu-ibu tunggal agar bisa berjualan dan mandiri secara ekonomi.",
      target: 60000000,
      terkumpul: 12000000,
      kategori: "Sosial",
      tenggatWaktu: "2026-10-20",
    },
    {
      id: "K25",
      judul: "Taman Baca di Kaki Gunung",
      gambar:
        "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=600",
      deskripsi:
        "Membangun perpustakaan kecil dan menyuplai buku cerita anak di desa pegunungan yang minim akses internet.",
      target: 20000000,
      terkumpul: 19500000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-03-01",
    },
    {
      id: "K26",
      judul: "Layanan Psikolog Gratis",
      gambar:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?w=600",
      deskripsi:
        "Menyediakan layanan konseling gratis bagi remaja yang mengalami depresi dan masalah kesehatan mental.",
      target: 40000000,
      terkumpul: 1000000,
      kategori: "Kesehatan",
      tenggatWaktu: "2026-12-01",
    },
    {
      id: "K27",
      judul: "Restorasi Terumbu Karang",
      gambar: "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=600",
      deskripsi:
        "Penanaman kembali terumbu karang yang rusak akibat bom ikan untuk mengembalikan ekosistem laut.",
      target: 55000000,
      terkumpul: 20000000,
      kategori: "Lingkungan",
      tenggatWaktu: "2026-08-30",
    },
    {
      id: "K28",
      judul: "Pelatihan Menjahit Difabel",
      gambar:
        "https://images.unsplash.com/photo-1588636239105-09c313a30386?w=600",
      deskripsi:
        "Kursus menjahit intensif dan pemberian mesin jahit bagi teman difabel daksa.",
      target: 30000000,
      terkumpul: 15000000,
      kategori: "Pendidikan",
      tenggatWaktu: "2026-04-15",
    },
    {
      id: "K29",
      judul: "Makanan Bergizi Ibu Hamil",
      gambar: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600",
      deskripsi:
        "Pemberian paket makanan bergizi rutin untuk ibu hamil di daerah pelosok demi mencegah bayi lahir stunting.",
      target: 25000000,
      terkumpul: 7000000,
      kategori: "Kesehatan",
      tenggatWaktu: "2026-06-10",
    },
    {
      id: "K30",
      judul: "Listrik Tenaga Surya Desa",
      gambar:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600",
      deskripsi:
        "Pemasangan panel surya komunal untuk desa yang belum teraliri listrik PLN di malam hari.",
      target: 120000000,
      terkumpul: 45000000,
      kategori: "Infrastruktur",
      tenggatWaktu: "2026-11-25",
    },
  ],

  // Data Donasi yang Masuk (Untuk Dashboard Admin)
  // Data Donasi (Sinkron dengan K1-K5)
  donasi: [
    // --- K1: Banjir (Total 15.250.000) ---
    {
      id: 101,
      namaDonatur: "Siti Aminah",
      jumlah: 250000,
      campaignId: "K1",
      tanggal: "2026-01-16",
    },
    {
      id: 102,
      namaDonatur: "PT. Berkah Jaya",
      jumlah: 10000000,
      campaignId: "K1",
      tanggal: "2026-01-17",
    },
    {
      id: 103,
      namaDonatur: "Hamba Allah",
      jumlah: 5000000,
      campaignId: "K1",
      tanggal: "2026-01-18",
    },

    // --- K2: Beasiswa (Total 10.000.000) ---
    {
      id: 104,
      namaDonatur: "Budi Santoso",
      jumlah: 100000,
      campaignId: "K2",
      tanggal: "2026-01-15",
    },
    {
      id: 105,
      namaDonatur: "Alumni SMAN 1",
      jumlah: 9900000,
      campaignId: "K2",
      tanggal: "2026-01-20",
    },

    // --- K3: Mangrove (Total 5.000.000) ---
    {
      id: 106,
      namaDonatur: "Komunitas Surfer Bali",
      jumlah: 5000000,
      campaignId: "K3",
      tanggal: "2026-01-12",
    },

    // --- K4: Stunting (Total 12.500.000) ---
    {
      id: 107,
      namaDonatur: "Ibu PKK Desa",
      jumlah: 2500000,
      campaignId: "K4",
      tanggal: "2026-02-01",
    },
    {
      id: 108,
      namaDonatur: "CSR Bank Daerah",
      jumlah: 10000000,
      campaignId: "K4",
      tanggal: "2026-02-02",
    },

    // --- K5: Kucing (Total 4.500.000) ---
    {
      id: 109,
      namaDonatur: "Cat Lovers JKT",
      jumlah: 4000000,
      campaignId: "K5",
      tanggal: "2026-01-25",
    },
    {
      id: 110,
      namaDonatur: "Rina Nose",
      jumlah: 500000,
      campaignId: "K5",
      tanggal: "2026-01-26",
    },

    // --- K6: Sumur Air (Total 58.000.000) ---
    {
      id: 111,
      namaDonatur: "Hamba Allah",
      jumlah: 50000000,
      campaignId: "K6",
      tanggal: "2026-01-05",
    },
    {
      id: 112,
      namaDonatur: "Arisan Keluarga Besar",
      jumlah: 8000000,
      campaignId: "K6",
      tanggal: "2026-01-08",
    },

    // --- K7: Lansia (Total 8.200.000) ---
    {
      id: 113,
      namaDonatur: "Kitabisa User",
      jumlah: 5000000,
      campaignId: "K7",
      tanggal: "2026-01-10",
    },
    {
      id: 114,
      namaDonatur: "Anonim",
      jumlah: 3200000,
      campaignId: "K7",
      tanggal: "2026-01-11",
    },

    // --- K8: Sekolah Rusak (Total 21.000.000) ---
    {
      id: 115,
      namaDonatur: "CV. Konstruksi Abadi",
      jumlah: 20000000,
      campaignId: "K8",
      tanggal: "2026-01-22",
    },
    {
      id: 116,
      namaDonatur: "Guru Honorer",
      jumlah: 1000000,
      campaignId: "K8",
      tanggal: "2026-01-23",
    },

    // --- K9: Al-Quran Braille (Total 18.750.000) ---
    {
      id: 117,
      namaDonatur: "Majelis Taklim Nurul Huda",
      jumlah: 10000000,
      campaignId: "K9",
      tanggal: "2026-01-14",
    },
    {
      id: 118,
      namaDonatur: "H. Samsul",
      jumlah: 8750000,
      campaignId: "K9",
      tanggal: "2026-01-15",
    },

    // --- K10: Jantung Adik Budi (Total 95.000.000) ---
    {
      id: 119,
      namaDonatur: "Galang Dana Twitter",
      jumlah: 50000000,
      campaignId: "K10",
      tanggal: "2026-01-28",
    },
    {
      id: 120,
      namaDonatur: "Yayasan Jantung Sehat",
      jumlah: 45000000,
      campaignId: "K10",
      tanggal: "2026-01-29",
    },

    // --- K11: Kaki Palsu (Total 12.000.000) ---
    {
      id: 121,
      namaDonatur: "Komunitas Lari Pagi",
      jumlah: 12000000,
      campaignId: "K11",
      tanggal: "2026-01-30",
    },

    // --- K12: Perahu Pustaka (Total 5.000.000) ---
    {
      id: 122,
      namaDonatur: "Duta Baca Daerah",
      jumlah: 5000000,
      campaignId: "K12",
      tanggal: "2026-02-01",
    },
  ],

  // Data Relawan (Untuk Dashboard Admin)
  relawan: [
    {
      id: 1,
      nama: "Agus Junaedi",
      email: "agus@mail.com",
      keahlian: "Medis",
    },
    {
      id: 2,
      nama: "Siti Rahmawati",
      email: "siti.rahma@mail.com",
      keahlian: "Pendidikan",
    },
    {
      id: 3,
      nama: "Doni Pratama",
      email: "doni.logistik@mail.com",
      keahlian: "Logistik & Distribusi",
    },
    {
      id: 4,
      nama: "Rina Kartika",
      email: "rina.kartika@mail.com",
      keahlian: "Dokumentasi & Media",
    },
    {
      id: 5,
      nama: "Eko Prasetyo",
      email: "eko.sar@mail.com",
      keahlian: "SAR & Rescue",
    },
    {
      id: 6,
      nama: "Dewi Lestari",
      email: "dewi.dapur@mail.com",
      keahlian: "Dapur Umum",
    },
    {
      id: 7,
      nama: "Fajar Nugraha",
      email: "fajar.dev@mail.com",
      keahlian: "IT & Website",
    },
    {
      id: 8,
      nama: "Indah Permata",
      email: "indah.psy@mail.com",
      keahlian: "Psikologi & Trauma Healing",
    },
  ],
};

// --- FUNGSI GETTER (Untuk Ambil Data) ---
export const getAllKampanye = () => database.kampanye;
export const getAllUsers = () => database.users;
export const getAllDonasi = () => database.donasi;
export const getAllRelawan = () => database.relawan;
export const getCurrentUser = () => database.currentUser;

// --- FUNGSI AUTH (Login, Logout, Session) ---

// 1. Fungsi Login
export const login = (email, password) => {
  const user = database.users.find((u) => u.email === email && u.password === password);

  if (user) {
    database.currentUser = user;
    // Simpan ke localStorage agar login tidak hilang saat refresh
    localStorage.setItem("userLogin", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Email atau Password salah!" };
};

// --- SISTEM AUTH (REGISTER) ---

export const register = (name, email, password) => {
  // Cek apakah email sudah terdaftar
  const isExist = database.users.find((u) => u.email === email);
  if (isExist) {
    return { success: false, message: "Email sudah terdaftar!" };
  }

  // Tambah user baru ke database
  const newUser = {
    id: database.users.length + 1,
    name,
    email,
    password,
    role: "user", // Default role untuk pendaftar baru
  };

  database.users.push(newUser);
  return { success: true, message: "Berhasil daftar! Silakan login." };
};

// 2. Fungsi Logout
export const logout = () => {
  database.currentUser = null;
  localStorage.removeItem("userLogin");
  window.location.hash = "#login"; 
};

// 3. Cek Status Login (Panggil fungsi ini di app.js saat pertama kali load)
export const checkAuthState = () => {
  const savedUser = localStorage.getItem("userLogin");
  if (savedUser) {
    database.currentUser = JSON.parse(savedUser);
  }
  return database.currentUser;
};

// 4. Cek Role Admin
export const isAdmin = () => {
  return database.currentUser && database.currentUser.role === "admin";
};
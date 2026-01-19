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

  /**
   * DATA KAMPANYE (20 Items)
   * Link gambar menggunakan Unsplash dengan parameter optimasi.
   * Atribut: id, title, image, description, target, collected, category, deadline, author, location
   */
  // DATA KAMPANYE (20 Items - Clean Data)
  kampanye: [
    {
      id: "K1",
      title: "Bantuan Pangan Korban Banjir Jembrana",
      image:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop",
      description: `Hujan deras yang mengguyur Jembrana mengakibatkan banjir luapan sungai yang merendam ratusan rumah. Lebih dari 500 keluarga mengungsi dan membutuhkan bantuan darurat segera.`,
      target: 50000000,
      collected: 15250000,
      category: "Bencana Alam",
      deadline: "2026-03-20",
      author: "ACT Bali",
      location: "Jembrana",
    },
    {
      id: "K2",
      title: "Beasiswa Anak Pesisir Bali",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
      description: `Bantu anak-anak nelayan di Karangasem agar tidak putus sekolah. Dana akan digunakan untuk biaya SPP, seragam, dan buku pelajaran bagi 50 anak berprestasi.`,
      target: 25000000,
      collected: 10000000,
      category: "Pendidikan",
      deadline: "2026-05-15",
      author: "Yayasan Senyum",
      location: "Karangasem",
    },
    {
      id: "K3",
      title: "Penghijauan Kembali Hutan Lindung",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&auto=format&fit=crop",
      description: `Aksi penanaman kembali ribuan pohon di area hutan gundul untuk menjaga ketersediaan air tanah dan mencegah longsor di wilayah pegunungan Bali.`,
      target: 40000000,
      collected: 18000000,
      category: "Lingkungan",
      deadline: "2026-07-12",
      author: "Green Earth ID",
      location: "Kintamani",
    },
    {
      id: "K4",
      title: "Cegah Stunting Balita Desa Buleleng",
      image:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&auto=format&fit=crop",
      description: `Program pemberian gizi tambahan berupa susu, vitamin, dan protein bagi 500 balita di pelosok Buleleng.`,
      target: 30000000,
      collected: 12500000,
      category: "Kesehatan",
      deadline: "2026-04-10",
      author: "Posyandu Sehat",
      location: "Buleleng",
    },
    {
      id: "K5",
      title: "Rumah Aman Kucing Terlantar",
      image:
        "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800&auto=format&fit=crop",
      description: `Pembangunan shelter transisi untuk pemulihan, sterilisasi, dan vaksinasi kucing jalanan yang sakit.`,
      target: 15000000,
      collected: 4500000,
      category: "Hewan",
      deadline: "2026-06-01",
      author: "Bali Cat Lovers",
      location: "Tabanan",
    },
    {
      id: "K6",
      title: "Perbaikan Atap Sekolah Dasar NTT",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop",
      description: `Renovasi gedung sekolah yang bocor parah agar siswa bisa belajar dengan tenang saat musim hujan tiba.`,
      target: 80000000,
      collected: 35000000,
      category: "Pendidikan",
      deadline: "2026-04-05",
      author: "Relawan Pendidikan",
      location: "Alor, NTT",
    },
    {
      id: "K7",
      title: "Posko Kesehatan Keliling Terpencil",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
      description: `Penyediaan layanan dokter dan obat-obatan gratis menggunakan kendaraan khusus untuk menjangkau warga di desa-desa pelosok yang jauh dari RS.`,
      target: 65000000,
      collected: 22000000,
      category: "Kesehatan",
      deadline: "2026-05-20",
      author: "Bali Sehat",
      location: "Karangasem",
    },
    {
      id: "K8",
      title: "5000 Buku untuk Papua",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      description: `Pengiriman paket buku bacaan dan alat tulis ke sekolah-sekolah di pelosok pegunungan Papua.`,
      target: 40000000,
      collected: 15000000,
      category: "Pendidikan",
      deadline: "2026-04-20",
      author: "Indonesia Pintar",
      location: "Papua",
    },
    {
      id: "K9",
      title: "Pelepasan Anak Penyu (Tukik) Bali",
      image:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&auto=format&fit=crop",
      description: `Pelestarian sarang penyu di Pantai Serangan dan dukungan operasional pelepasan 2000 tukik ke laut.`,
      target: 20000000,
      collected: 8000000,
      category: "Lingkungan",
      deadline: "2026-03-15",
      author: "Sahabat Penyu",
      location: "Serangan, Bali",
    },
    {
      id: "K10",
      title: "Makan Siang Bergizi Siswa Pelosok",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop",
      description: `Penyediaan katering sehat harian bagi anak-anak di sekolah dasar terpencil untuk meningkatkan konsentrasi belajar.`,
      target: 25000000,
      collected: 10000000,
      category: "Kesehatan",
      deadline: "2026-02-25",
      author: "Dapur Berbagi",
      location: "Karangasem",
    },
    {
      id: "K11",
      title: "Instalasi Panel Surya Sekolah Desa",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
      description: `Membantu sekolah-sekolah di daerah tanpa aliran listrik agar bisa menjalankan kegiatan belajar digital dengan energi matahari.`,
      target: 75000000,
      collected: 30000000,
      category: "Lingkungan",
      deadline: "2026-08-30",
      author: "Energy Nusantara",
      location: "Buleleng",
    },
    {
      id: "K12",
      title: "Pelatihan Digital UMKM Lokal",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
      description: `Bimbingan cara berjualan online bagi pengrajin tradisional Bali agar naik kelas.`,
      target: 15000000,
      collected: 3000000,
      category: "Pendidikan",
      deadline: "2026-05-20",
      author: "Startup Bali",
      location: "Klungkung",
    },
    {
      id: "K13",
      title: "Alat Bantu Dengar Lansia Tuli",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
      description: `Distribusi 100 unit alat bantu dengar bagi lansia prasejahtera yang kehilangan pendengaran karena usia.`,
      target: 50000000,
      collected: 15000000,
      category: "Kesehatan",
      deadline: "2026-05-12",
      author: "Suara Hati",
      location: "Denpasar",
    },
    {
      id: "K14",
      title: "Pembangunan Perpustakaan Desa",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
      description: `Membangun pojok baca yang nyaman dan menyediakan ribuan koleksi buku untuk anak-anak desa Bangli.`,
      target: 45000000,
      collected: 5000000,
      category: "Pendidikan",
      deadline: "2026-08-30",
      author: "Literasi Bangsa",
      location: "Bangli",
    },
    {
      id: "K15",
      title: "Rehabilitasi Terumbu Amed",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format&fit=crop",
      description: `Penanaman kembali bibit karang metode Biorock di perairan Karangasem.`,
      target: 45000000,
      collected: 10000000,
      category: "Lingkungan",
      deadline: "2026-11-20",
      author: "Blue Ocean",
      location: "Amed",
    },
    {
      id: "K16",
      title: "Ambulans Gratis Nusa Penida",
      image:
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop",
      description: `Layanan mobil jenazah dan ambulans gratis 24 jam untuk warga pulau.`,
      target: 250000000,
      collected: 150000000,
      category: "Kesehatan",
      deadline: "2026-12-30",
      author: "Layanan Cepat",
      location: "Nusa Penida",
    },
    {
      id: "K17",
      title: "Kebun Komunitas Organik",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
      description: `Pemberdayaan warga untuk mengelola kebun sayur organik mandiri.`,
      target: 12000000,
      collected: 6000000,
      category: "Lingkungan",
      deadline: "2026-03-05",
      author: "Tani Mandiri",
      location: "Badung",
    },
    {
      id: "K18",
      title: "Kaki Palsu Korban Kecelakaan",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      description: `Bantuan pembuatan kaki palsu berkualitas bagi 20 penyandang disabilitas akibat musibah kecelakaan kerja.`,
      target: 60000000,
      collected: 40000000,
      category: "Kesehatan",
      deadline: "2026-04-18",
      author: "Langkah Baru",
      location: "Gianyar",
    },
    {
      id: "K19",
      title: "Perpustakaan Motor Pintar",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
      description: `Motor keliling yang membawa koleksi buku ke pelosok desa Bangli.`,
      target: 10000000,
      collected: 9000000,
      category: "Pendidikan",
      deadline: "2026-01-30",
      author: "Literasi Bali",
      location: "Bangli",
    },
    {
      id: "K20",
      title: "Bantuan Logistik Pengungsi Erupsi",
      image:
        "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&auto=format&fit=crop",
      description: `Pengadaan masker, selimut, dan bahan pangan pokok untuk ribuan warga yang mengungsi akibat aktivitas vulkanik yang meningkat.`,
      target: 50000000,
      collected: 20000000,
      category: "Bencana Alam",
      deadline: "2026-05-10",
      author: "Relawan Tanggap",
      location: "Karangasem",
    },
  ],

  donasi: [
    {
      id: 101,
      donaturName: "Siti Aminah",
      amount: 250000,
      campaignId: "K1",
      date: "2026-01-16",
    },
    {
      id: 102,
      donaturName: "PT. Berkah Jaya",
      amount: 10000000,
      campaignId: "K1",
      date: "2026-01-17",
    },
    {
      id: 103,
      donaturName: "Budi Santoso",
      amount: 500000,
      campaignId: "K2",
      date: "2026-01-18",
    },
    {
      id: 104,
      donaturName: "Seseorang",
      amount: 100000,
      campaignId: "K3",
      date: "2026-01-18",
    },
    {
      id: 105,
      donaturName: "Lestari Putri",
      amount: 1500000,
      campaignId: "K4",
      date: "2026-01-19",
    },
    {
      id: 106,
      donaturName: "Hamba Allah",
      amount: 200000,
      campaignId: "K18",
      date: "2026-01-19",
    },
    {
      id: 107,
      donaturName: "Agus Salim",
      amount: 50000,
      campaignId: "K19",
      date: "2026-01-19",
    },
    {
      id: 108,
      donaturName: "Ani Wijaya",
      amount: 1000000,
      campaignId: "K20",
      date: "2026-01-19",
    },
    {
      id: 109,
      donaturName: "Rudi Hartono",
      amount: 300000,
      campaignId: "K7",
      date: "2026-01-18",
    },
    {
      id: 110,
      donaturName: "Seseorang",
      amount: 75000,
      campaignId: "K9",
      date: "2026-01-17",
    },
  ],

  relawan: [
    {
      id: 1,
      name: "Agus Junaedi",
      email: "agus@mail.com",
      skill: "Medis",
      status: "Aktif",
    },
    {
      id: 2,
      name: "Dewi Sartika",
      email: "dewi@mail.com",
      skill: "Pengajaran",
      status: "Pending",
    },
    {
      id: 3,
      name: "I Made Yoga",
      email: "made@mail.com",
      skill: "Logistik",
      status: "Aktif",
    },
    {
      id: 4,
      name: "Santi Putri",
      email: "santi@mail.com",
      skill: "Media Sosial",
      status: "Pending",
    },
    {
      id: 5,
      name: "Rizky Fauzi",
      email: "rizky@mail.com",
      skill: "Dokumentasi",
      status: "Selesai",
    },
    {
      id: 6,
      name: "Putu Ayu",
      email: "putu@mail.com",
      skill: "Psikologi",
      status: "Aktif",
    },
    {
      id: 7,
      name: "Wayan Gede",
      email: "wayan@mail.com",
      skill: "Konstruksi",
      status: "Aktif",
    },
    {
      id: 8,
      name: "Kadek Indah",
      email: "kadek@mail.com",
      skill: "Administrasi",
      status: "Pending",
    },
  ],
};

// --- FUNGSI GETTER ---
// PERBAIKAN: Menyamakan nama properti dengan objek database (kampanye, donasi, relawan)
export const getAllKampanye = () => database.kampanye;
export const getAllUsers = () => database.users;
export const getAllDonasi = () => database.donasi;
export const getAllRelawan = () => database.relawan;
export const getCurrentUser = () => database.currentUser;

// --- FUNGSI AUTH ---
export const login = (email, password) => {
  const user = database.users.find(
    (u) => u.email === email && u.password === password,
  );
  if (user) {
    database.currentUser = user;
    localStorage.setItem("userLogin", JSON.stringify(user));
    return { success: true, user };
  }
  return { success: false, message: "Email atau Password salah!" };
};

export const register = (name, email, password) => {
  const isExist = database.users.find((u) => u.email === email);
  if (isExist) return { success: false, message: "Email sudah terdaftar!" };

  const newUser = {
    id: database.users.length + 1,
    name,
    email,
    password,
    role: "user",
  };
  database.users.push(newUser);
  return { success: true, message: "Berhasil daftar! Silakan login." };
};

export const logout = () => {
  database.currentUser = null;
  localStorage.removeItem("userLogin");
  window.location.hash = "#login";
};

export const checkAuthState = () => {
  const savedUser = localStorage.getItem("userLogin");
  if (savedUser) database.currentUser = JSON.parse(savedUser);
  return database.currentUser;
};

export const isAdmin = () =>
  database.currentUser && database.currentUser.role === "admin";

const savedData = localStorage.getItem("charity_db");
if (savedData) {
    const parsedData = JSON.parse(savedData);
    // Timpa data default dengan data dari localStorage jika ada
    database.kampanye = parsedData.kampanye;
    database.donasi = parsedData.donasi;
}


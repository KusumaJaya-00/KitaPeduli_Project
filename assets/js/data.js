const getInitialUsers = () => {
  const savedUsers = localStorage.getItem("kitapeduli_users");
  if (savedUsers) return JSON.parse(savedUsers);
  return [
    {
      id: "U101",
      name: "Admin Charity",
      email: "admin@gmail.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: "U102",
      name: "Donatur Baik",
      email: "user@gmail.com",
      password: "user123",
      role: "user",
    },
  ];
};

export const database = {
  users: getInitialUsers(),
  currentUser: null,

  kampanye: [
    {
      id: "K001",
      title: "Bantuan Pangan Korban Banjir Jembrana",
      image:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop",
      description: `Hujan deras yang mengguyur wilayah Jembrana selama beberapa hari terakhir telah menyebabkan sungai meluap...`,
      target: 50000000,
      collected: 0,
      category: "Bencana Alam",
      deadline: "2026-03-20",
      author: "ACT Bali",
      location: "Jembrana",
    },
    {
      id: "K002",
      title: "Beasiswa Anak Pesisir Bali",
      image:
        "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&auto=format&fit=crop",
      description: `Pendidikan adalah jendela masa depan, namun bagi anak-anak nelayan di pesisir Karangasem...`,
      target: 25000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-05-15",
      author: "Yayasan Senyum",
      location: "Karangasem",
    },
    {
      id: "K003",
      title: "Penghijauan Kembali Hutan Lindung",
      image:
        "https://images.unsplash.com/photo-1518173946687-a4c8892bbd9f?w=800&auto=format&fit=crop",
      description: `Kondisi hutan lindung di wilayah Kintamani kini semakin memprihatinkan...`,
      target: 40000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-02-28",
      author: "Green Earth ID",
      location: "Denpasar",
    },
    {
      id: "K004",
      title: "Cegah Stunting Balita Desa Buleleng",
      image:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&auto=format&fit=crop",
      description: `Stunting masih menjadi ancaman serius bagi tumbuh kembang anak-anak...`,
      target: 30000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-04-10",
      author: "Posyandu Sehat",
      location: "Buleleng",
    },
    {
      id: "K005",
      title: "Rumah Aman Kucing Terlantar",
      image:
        "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=800&auto=format&fit=crop",
      description: `Banyak kucing jalanan di wilayah Tabanan ditemukan dalam kondisi memprihatinkan...`,
      target: 15000000,
      collected: 0,
      category: "Hewan",
      deadline: "2026-06-01",
      author: "Bali Cat Lovers",
      location: "Tabanan",
    },
    {
      id: "K006",
      title: "Perbaikan Atap Sekolah Dasar NTT",
      image:
        "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop",
      description: `Sebuah sekolah dasar di pelosok Alor, NTT, saat ini berada dalam kondisi yang membahayakan...`,
      target: 80000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-04-05",
      author: "Relawan Pendidikan",
      location: "Alor, NTT",
    },
    {
      id: "K007",
      title: "Posko Kesehatan Keliling Terpencil",
      image:
        "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&auto=format&fit=crop",
      description: `Warga di beberapa desa pelosok Karangasem harus menempuh perjalanan berjam-jam...`,
      target: 65000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-03-30",
      author: "Klinik Mata Sehat",
      location: "Singaraja",
    },
    {
      id: "K008",
      title: "5000 Buku untuk Papua",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      description: `Di pedalaman Papua, satu buku seringkali dibaca bergantian oleh sepuluh anak...`,
      target: 40000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-04-20",
      author: "Indonesia Pintar",
      location: "Papua",
    },
    {
      id: "K009",
      title: "Pelepasan Anak Penyu (Tukik) Bali",
      image:
        "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f?w=800&auto=format&fit=crop",
      description: `Penyu hijau kini semakin terancam punah akibat polusi laut...`,
      target: 20000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-02-15",
      author: "Sahabat Penyu",
      location: "Denpasar",
    },
    {
      id: "K010",
      title: "Makan Siang Bergizi Siswa Pelosok",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop",
      description: `Sulit bagi seorang anak untuk berkonsentrasi belajar jika perutnya lapar...`,
      target: 25000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-02-10",
      author: "Mari Berbagi",
      location: "Badung",
    },
    {
      id: "K011",
      title: "Instalasi Panel Surya Sekolah Desa",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
      description: `Masih ada beberapa sekolah di wilayah pegunungan Buleleng yang belum tersentuh listrik...`,
      target: 75000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-07-01",
      author: "Water Action",
      location: "Karangasem",
    },
    {
      id: "K012",
      title: "Pelatihan Digital UMKM Lokal",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
      description: `Para pengrajin tradisional di Klungkung memiliki produk kain tenun yang indah...`,
      target: 15000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-05-20",
      author: "Startup Bali",
      location: "Klungkung",
    },
    {
      id: "K013",
      title: "Alat Bantu Dengar Lansia Tuli",
      image:
        "https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&auto=format&fit=crop",
      description: `Distribusi 100 unit alat bantu dengar bagi lansia prasejahtera...`,
      target: 50000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-02-25",
      author: "Peduli Sehat",
      location: "Bangli",
    },
    {
      id: "K014",
      title: "Pembangunan Perpustakaan Desa",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
      description: `Membangun pojok baca yang nyaman di wilayah Bangli...`,
      target: 45000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-09-15",
      author: "Yayasan Hijau",
      location: "Tabanan",
    },
    {
      id: "K015",
      title: "Rehabilitasi Terumbu Amed",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format&fit=crop",
      description: `Penanaman kembali bibit karang metode Biorock di Karangasem...`,
      target: 45000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-11-20",
      author: "Blue Ocean",
      location: "Amed",
    },
    {
      id: "K016",
      title: "Ambulans Gratis Nusa Penida",
      image:
        "https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800&auto=format&fit=crop",
      description: `Layanan mobil jenazah dan ambulans gawat darurat gratis 24 jam...`,
      target: 250000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-12-30",
      author: "Layanan Cepat",
      location: "Nusa Penida",
    },
    {
      id: "K017",
      title: "Kebun Komunitas Organik",
      image:
        "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=800&auto=format&fit=crop",
      description: `Pemberdayaan warga lokal Badung untuk mengelola kebun sayur organik...`,
      target: 12000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-03-05",
      author: "Tani Mandiri",
      location: "Badung",
    },
    {
      id: "K018",
      title: "Kaki Palsu Korban Kecelakaan",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format&fit=crop",
      description: `Bantuan pembuatan kaki palsu berkualitas bagi 20 penyandang disabilitas...`,
      target: 60000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-02-20",
      author: "Smile Foundation",
      location: "Denpasar",
    },
    {
      id: "K019",
      title: "Perpustakaan Motor Pintar",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
      description: `Motor keliling yang membawa koleksi buku menarik ke pelosok desa...`,
      target: 10000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-01-30",
      author: "Literasi Bali",
      location: "Bangli",
    },
    {
      id: "K020",
      title: "Bantuan Logistik Pengungsi Erupsi",
      image:
        "https://images.unsplash.com/photo-1599059813005-11265ba4b4ce?w=800&auto=format&fit=crop",
      description: `Pengadaan masker, selimut, dan bahan pangan pokok untuk pengungsi...`,
      target: 50000000,
      collected: 0,
      category: "Bencana Alam",
      deadline: "2026-04-05",
      author: "Pasar Kita",
      location: "Denpasar",
    },
  ],

  donasi: [
    {
      id: "D001",
      donaturName: "Siti Aminah",
      amount: 250000,
      campaignId: "K001",
      date: "16-01-2026",
    },
    {
      id: "D002",
      donaturName: "PT. Berkah Jaya",
      amount: 10000000,
      campaignId: "K001",
      date: "17-01-2026",
    },
    {
      id: "D003",
      donaturName: "Budi Santoso",
      amount: 500000,
      campaignId: "K002",
      date: "18-01-2026",
    },
    {
      id: "D004",
      donaturName: "Seseorang",
      amount: 100000,
      campaignId: "K003",
      date: "18-01-2026",
    },
    {
      id: "D005",
      donaturName: "Lestari Putri",
      amount: 1500000,
      campaignId: "K004",
      date: "19-01-2026",
    },
    {
      id: "D006",
      donaturName: "Hamba Allah",
      amount: 200000,
      campaignId: "K018",
      date: "19-01-2026",
    },
    {
      id: "D007",
      donaturName: "Agus Salim",
      amount: 50000,
      campaignId: "K019",
      date: "19-01-2026",
    },
    {
      id: "D008",
      donaturName: "Ani Wijaya",
      amount: 1000000,
      campaignId: "K020",
      date: "19-01-2026",
    },
    {
      id: "D009",
      donaturName: "Rudi Hartono",
      amount: 300000,
      campaignId: "K007",
      date: "18-01-2026",
    },
    {
      id: "D010",
      donaturName: "Seseorang",
      amount: 75000,
      campaignId: "K009",
      date: "17-01-2026",
    },
  ],

  relawan: [
    {
      id: "REL001",
      userId: "U001",
      name: "Agus Junaedi",
      email: "agus@mail.com",
      skill: "Medis",
      status: "approved",
    },
    {
      id: "REL002",
      userId: "U002",
      name: "Dewi Sartika",
      email: "dewi@mail.com",
      skill: "Pengajaran",
      status: "pending",
    },
  ],
};

export const generateId = (prefix, list) => {
  const ids = list.map((item) => {
    const idStr = String(item.id || "0");
    const numPart = idStr.replace(/\D/g, ""); // Ambil hanya digit
    return parseInt(numPart) || 0;
  });

  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  const nextId = (maxId + 1).toString().padStart(3, "0");
  return `${prefix}${nextId}`;
};


export const syncCollectedData = () => {
  database.kampanye.forEach((k) => (k.collected = 0));
  database.donasi.forEach((d) => {
    const campaign = database.kampanye.find(
      (k) => String(k.id) === String(d.campaignId || d.idKampanye),
    );
    if (campaign) {
      campaign.collected += Number(d.amount || d.nominal) || 0;
    }
  });
};

export const loadDatabase = () => {
  const savedData = localStorage.getItem("charity_db");
  if (savedData) {
    const parsedData = JSON.parse(savedData);
    if (parsedData.kampanye) database.kampanye = parsedData.kampanye;
    if (parsedData.donasi) database.donasi = parsedData.donasi;
    if (parsedData.relawan) database.relawan = parsedData.relawan;
    if (parsedData.users) database.users = parsedData.users;
  }
  syncCollectedData();
};

// --- FUNGSI GETTER ---
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
    id: generateId("U", database.users),
    name,
    email,
    password,
    role: "user",
  };
  database.users.push(newUser);
  localStorage.setItem("kitapeduli_users", JSON.stringify(database.users));

  localStorage.setItem("charity_db", JSON.stringify(database));

  return { success: true, message: "Berhasil daftar! Silakan login." };
};

export const logout = () => {
  database.currentUser = null;
  localStorage.removeItem("userLogin");
  window.location.hash = "#login";
};

export const checkAuthState = () => {
  loadDatabase();
  const savedUser = localStorage.getItem("userLogin");
  if (savedUser) database.currentUser = JSON.parse(savedUser);
  return database.currentUser;
};

export const isAdmin = () =>
  database.currentUser && database.currentUser.role === "admin";

loadDatabase();

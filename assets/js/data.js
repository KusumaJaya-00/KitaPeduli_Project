const getInitialUsers = () => {
  const savedUsers = localStorage.getItem("kitapeduli_users");
  if (savedUsers) return JSON.parse(savedUsers);
  return [
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
  ];
};

export const database = {
  users: getInitialUsers(),
  currentUser: null,

  // DATA KAMPANYE (Collected diset 0 dulu, nanti dihitung otomatis)
  kampanye: [
    {
      id: "K1",
      title: "Bantuan Pangan Korban Banjir Jembrana",
      image:
        "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=800&auto=format&fit=crop",
      description: `Hujan deras yang mengguyur wilayah Jembrana selama beberapa hari terakhir telah menyebabkan sungai meluap dan merendam ratusan rumah warga. Saat ini, lebih dari 500 keluarga terpaksa mengungsi di tenda darurat dengan fasilitas seadanya. Mereka sangat membutuhkan bantuan mendesak berupa paket sembako, air bersih untuk sanitasi, selimut hangat bagi lansia, serta obat-obatan dasar untuk mencegah penyakit pasca-banjir. Mari kita bahu-membahu meringankan beban saudara kita di Jembrana agar mereka bisa segera bangkit kembali.`,
      target: 50000000,
      collected: 0, // Akan dihitung otomatis
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
      description: `Pendidikan adalah jendela masa depan, namun bagi anak-anak nelayan di pesisir Karangasem, biaya sekolah seringkali menjadi tembok penghalang. Banyak siswa berprestasi yang terancam putus sekolah karena pendapatan orang tua yang tidak menentu akibat cuaca ekstrem. Kampanye ini bertujuan untuk memberikan beasiswa penuh bagi 50 anak nelayan berprestasi, mencakup biaya SPP selama satu tahun, pengadaan seragam lengkap, sepatu, serta buku-buku pelajaran. Dukungan Anda akan membantu mereka tetap berani bermimpi di tengah keterbatasan ekonomi.`,
      target: 25000000,
      collected: 0,
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
      description: `Kondisi hutan lindung di wilayah Kintamani kini semakin memprihatinkan akibat deforestasi yang menyebabkan ketersediaan air tanah menurun drastis saat kemarau. Kami menginisiasi aksi penanaman kembali 5.000 bibit pohon keras untuk memulihkan fungsi hutan sebagai daerah resapan air dan benteng alami pencegah tanah longsor. Selain pembelian bibit, dana yang terkumpul juga akan digunakan untuk biaya perawatan selama satu tahun pertama agar pohon-pohon ini benar-benar tumbuh kuat. Mari berkontribusi untuk warisan alam yang lebih baik bagi anak cucu kita nanti.`,
      target: 40000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-02-28",
      author: "Green Earth ID",
      location: "Denpasar",
    },
    {
      id: "K4",
      title: "Cegah Stunting Balita Desa Buleleng",
      image:
        "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03?w=800&auto=format&fit=crop",
      description: `Stunting masih menjadi ancaman serius bagi tumbuh kembang anak-anak di beberapa desa terpencil di Buleleng. Keterbatasan akses nutrisi membuat banyak balita mengalami gizi buruk yang berdampak pada kesehatan fisik dan kemampuan kognitif mereka di masa depan. Melalui program ini, kami akan mendistribusikan paket gizi tambahan berupa susu formula, vitamin, protein hewani, dan edukasi pola makan sehat bagi 500 balita. Dengan donasi Anda, kita bisa menyelamatkan generasi masa depan Bali dari risiko stunting permanen.`,
      target: 30000000,
      collected: 0,
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
      description: `Banyak kucing jalanan di wilayah Tabanan ditemukan dalam kondisi memprihatinkan akibat kecelakaan, infeksi, atau sengaja disakiti. Kami sedang membangun sebuah shelter transisi yang berfungsi sebagai 'Rumah Aman' bagi kucing-kucing malang ini. Di sini, mereka akan mendapatkan perawatan medis intensif, sterilisasi untuk menekan populasi liar, serta vaksinasi agar sehat kembali. Setelah pulih, kami akan membuka program adopsi bagi masyarakat yang ingin memberikan rumah permanen yang penuh kasih. Donasi Anda sangat berarti untuk biaya pembangunan kandang dan stok makanan medis.`,
      target: 15000000,
      collected: 0,
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
      description: `Sebuah sekolah dasar di pelosok Alor, NTT, saat ini berada dalam kondisi yang membahayakan bagi para siswa. Atap kayu yang sudah lapuk dan seng yang berlubang membuat kegiatan belajar mengajar harus dihentikan setiap kali hujan turun karena ruang kelas banjir. Kondisi ini membuat anak-anak tertinggal dalam pelajaran mereka. Kami mengajak Anda untuk ikut serta mendonasikan biaya renovasi total struktur atap menggunakan baja ringan agar gedung sekolah menjadi kokoh dan aman. Mari kita pastikan semangat belajar anak-anak di ujung timur Indonesia tidak padam karena fasilitas yang rusak.`,
      target: 80000000,
      collected: 0,
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
      description: `Warga di beberapa desa pelosok Karangasem harus menempuh perjalanan berjam-jam melewati medan berat hanya untuk mencapai puskesmas terdekat. Banyak lansia dan ibu hamil yang tidak mendapatkan pemeriksaan rutin karena kendala transportasi. Kami ingin menghadirkan solusi melalui unit 'Kesehatan Keliling' yang dilengkapi dengan dokter, perawat, dan stok obat-obatan gratis. Posko ini akan berpindah-pindah setiap minggunya untuk memberikan layanan pemeriksaan kesehatan dasar, cek gula darah, serta edukasi sanitasi langsung ke pintu rumah warga. Bantu kami menjangkau mereka yang terlupakan.`,
      target: 65000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-03-30",
      author: "Klinik Mata Sehat",
      location: "Singaraja",
    },
    {
      id: "K8",
      title: "5000 Buku untuk Papua",
      image:
        "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&auto=format&fit=crop",
      description: `Di pedalaman Papua, satu buku seringkali dibaca bergantian oleh sepuluh anak karena sangat terbatasnya sarana literasi. Melalui kampanye ini, kami menargetkan pengiriman 5.000 paket buku bacaan berkualitas, buku pelajaran sekolah, serta alat tulis lengkap. Tantangan utama kami adalah biaya logistik pengiriman ke area yang hanya bisa dijangkau dengan pesawat perintis. Setiap rupiah yang Anda berikan bukan hanya sekadar buku, melainkan investasi ilmu dan wawasan bagi masa depan anak-anak Papua. Mari tunjukkan bahwa pendidikan yang layak adalah hak seluruh anak Indonesia tanpa terkecuali.`,
      target: 40000000,
      collected: 0,
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
      description: `Penyu hijau kini semakin terancam punah akibat polusi laut dan perburuan liar. Komunitas Sahabat Penyu di Serangan bekerja keras setiap harinya melakukan patroli pantai untuk mengamankan telur penyu dan memindahkannya ke fasilitas penetasan alami yang aman. Dana donasi Anda akan dialokasikan untuk pemeliharaan kolam penampungan sementara bagi tukik (bayi penyu) sebelum mereka dilepaskan kembali ke samudra luas. Aksi pelepasan ini dilakukan secara terukur untuk memastikan tingkat kelangsungan hidup mereka yang lebih tinggi di alam liar. Jaga laut kita, jaga penyu kita.`,
      target: 20000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-02-15",
      author: "Sahabat Penyu",
      location: "Denpasar",
    },
    {
      id: "K10",
      title: "Makan Siang Bergizi Siswa Pelosok",
      image:
        "https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=800&auto=format&fit=crop",
      description: `Sulit bagi seorang anak untuk berkonsentrasi belajar jika perutnya dalam keadaan lapar. Banyak siswa di sekolah dasar terpencil Karangasem berangkat sekolah tanpa sarapan karena keterbatasan ekonomi orang tua mereka. Program 'Dapur Berbagi' bertujuan menyediakan paket makan siang sehat dan bergizi seimbang (protein, sayur, buah) bagi 200 siswa setiap harinya. Kami percaya bahwa asupan nutrisi yang cukup akan meningkatkan semangat dan prestasi belajar mereka secara signifikan. Mari berinvestasi pada kecerdasan anak bangsa melalui sepiring makanan sehat.`,
      target: 25000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-02-10",
      author: "Mari Berbagi",
      location: "Badung",
    },
    {
      id: "K11",
      title: "Instalasi Panel Surya Sekolah Desa",
      image:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800&auto=format&fit=crop",
      description: `Masih ada beberapa sekolah di wilayah pegunungan Buleleng yang belum tersentuh aliran listrik PLN secara stabil. Hal ini sangat menghambat pemanfaatan teknologi digital dalam kegiatan belajar mengajar, seperti penggunaan komputer atau proyektor. Kami berencana melakukan instalasi sistem panel surya mandiri agar sekolah-sekolah ini bisa mendapatkan energi listrik yang bersih dan berkelanjutan. Dengan adanya listrik, anak-anak desa bisa belajar mengenal dunia digital dan mengejar ketertinggalan mereka dari siswa di perkotaan. Mari terangi masa depan mereka dengan energi matahari.`,
      target: 75000000,
      collected: 0,
      category: "Lingkungan",
      deadline: "2026-07-01",
      author: "Water Action",
      location: "Karangasem",
    },
    {
      id: "K12",
      title: "Pelatihan Digital UMKM Lokal",
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop",
      description: `Para pengrajin tradisional di Klungkung memiliki produk kain tenun dan anyaman yang sangat indah, namun mereka kesulitan memasarkannya di era digital ini. Tanpa pemahaman tentang e-commerce dan digital marketing, usaha mereka terancam gulung tikar. Program ini memberikan bimbingan intensif bagi 30 UMKM lokal, mencakup pelatihan fotografi produk, manajemen toko online di marketplace, hingga strategi promosi di media sosial. Donasi Anda digunakan untuk pengadaan sarana pelatihan dan pemberian modal usaha awal berupa kuota internet dan alat packaging yang menarik. Mari bantu ekonomi lokal Bali go-digital.`,
      target: 15000000,
      collected: 0,
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
      description: `Distribusi 100 unit alat bantu dengar bagi lansia prasejahtera yang kehilangan pendengaran karena faktor usia.`,
      target: 50000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-02-25",
      author: "Peduli Sehat",
      location: "Bangli",
    },
    {
      id: "K14",
      title: "Pembangunan Perpustakaan Desa",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
      description: `Membangun pojok baca yang nyaman dan menyediakan ribuan koleksi buku untuk anak-anak desa di wilayah Bangli.`,
      target: 45000000,
      collected: 0,
      category: "Pendidikan",
      deadline: "2026-09-15",
      author: "Yayasan Hijau",
      location: "Tabanan",
    },
    {
      id: "K15",
      title: "Rehabilitasi Terumbu Amed",
      image:
        "https://images.unsplash.com/photo-1546026423-cc4642628d2b?w=800&auto=format&fit=crop",
      description: `Penanaman kembali bibit karang metode Biorock di perairan Karangasem untuk memulihkan ekosistem laut yang rusak.`,
      target: 45000000,
      collected: 0,
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
      description: `Layanan mobil jenazah dan ambulans gawat darurat gratis 24 jam untuk warga pulau di Nusa Penida.`,
      target: 250000000,
      collected: 0,
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
      description: `Pemberdayaan warga lokal Badung untuk mengelola kebun sayur organik mandiri demi ketahanan pangan keluarga.`,
      target: 12000000,
      collected: 0,
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
      description: `Bantuan pembuatan kaki palsu berkualitas bagi 20 penyandang disabilitas kurang mampu akibat musibah kecelakaan.`,
      target: 60000000,
      collected: 0,
      category: "Kesehatan",
      deadline: "2026-02-20",
      author: "Smile Foundation",
      location: "Denpasar",
    },
    {
      id: "K19",
      title: "Perpustakaan Motor Pintar",
      image:
        "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop",
      description: `Motor keliling yang membawa koleksi buku menarik ke pelosok desa Bangli untuk meningkatkan minat baca.`,
      target: 10000000,
      collected: 0,
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
      description: `Pengadaan masker, selimut, dan bahan pangan pokok untuk warga yang mengungsi akibat aktivitas vulkanik meningkat.`,
      target: 50000000,
      collected: 0,
      category: "Bencana Alam",
      deadline: "2026-04-05",
      author: "Pasar Kita",
      location: "Denpasar",
    },
  ],

  // DATA DONASI (Riwayat Transaksi)
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

  // DATA RELAWAN
  relawan: [
    { id: 1, name: "Agus Junaedi", email: "agus@mail.com", skill: "Medis" },
    {
      id: 2,
      name: "Dewi Sartika",
      email: "dewi@mail.com",
      skill: "Pengajaran",
    },
    { id: 3, name: "I Made Yoga", email: "made@mail.com", skill: "Logistik" },
    {
      id: 4,
      name: "Santi Putri",
      email: "santi@mail.com",
      skill: "Media Sosial",
    },
    {
      id: 5,
      name: "Rizky Fauzi",
      email: "rizky@mail.com",
      skill: "Dokumentasi",
    },
    { id: 6, name: "Putu Ayu", email: "putu@mail.com", skill: "Psikologi" },
    { id: 7, name: "Wayan Gede", email: "wayan@mail.com", skill: "Konstruksi" },
    {
      id: 8,
      name: "Kadek Indah",
      email: "kadek@mail.com",
      skill: "Administrasi",
    },
  ],
};

// --- FUNGSI UTAMA UNTUK SINKRONISASI DATA ---
// Fungsi ini akan menjumlahkan donasi di array donasi dan mengupdate array kampanye
const syncCollectedData = () => {
  // 1. Reset semua collected ke 0
  database.kampanye.forEach((k) => (k.collected = 0));

  // 2. Loop semua donasi dan tambahkan ke kampanye terkait
  database.donasi.forEach((d) => {
    const campaign = database.kampanye.find((k) => k.id === d.campaignId);
    if (campaign) {
      campaign.collected += d.amount;
    }
  });
};

// --- LOGIKA LOAD DATA LOCALSTORAGE ---
const savedData = localStorage.getItem("charity_db");
if (savedData) {
  const parsedData = JSON.parse(savedData);
  database.kampanye = parsedData.kampanye;
  database.donasi = parsedData.donasi;
}

// *** PENTING: JALANKAN SINKRONISASI SETELAH LOAD DATA ***
// Ini memastikan angka di kartu selalu benar berdasarkan riwayat donasi
syncCollectedData();

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
    id: database.users.length + 1,
    name,
    email,
    password,
    role: "user",
  };
  database.users.push(newUser);
  localStorage.setItem("kitapeduli_users", JSON.stringify(database.users));
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

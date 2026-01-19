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
   * DATA KAMPANYE (20+ Items)
   * Properti: id, title, image, description, target, collected, category, deadline, author, location
   */
  // DATA KAMPANYE (20 Items - Clean Data)
  kampanye: [
    {
      id: "K1",
      title: "Bantuan Pangan Korban Banjir Jembrana",
      image: "https://images.unsplash.com/photo-1542810634-71277d95dcbb",
      description: `Hari ini, langit Jembrana masih mendung. Hujan deras yang mengguyur tanpa henti selama tiga hari berturut-turut telah mengubah wajah desa yang damai menjadi lautan air keruh. Sungai yang biasanya menjadi sumber kehidupan, meluap dan merendam ratusan rumah warga di <strong>tiga kecamatan</strong>.

      Saat ini, air setinggi dada orang dewasa masih menggenangi pemukiman. Lebih dari <strong>500 kepala keluarga</strong> terpaksa meninggalkan rumah mereka dan mengungsi ke posko darurat dengan kondisi seadanya. Harta benda mereka hanyut, persediaan beras basah, dan pakaian tertimbun lumpur.

      Di pengungsian, tangisan bayi yang kehabisan susu terdengar memilukan di tengah malam yang dingin. Anak-anak dan lansia mulai terserang <strong>penyakit kulit, diare, dan demam</strong> karena kondisi lingkungan yang lembab dan sanitasi yang buruk.

      Melalui kampanye ini, <strong>ACT Bali</strong> mengajak #OrangBaik untuk bergerak bersama menyalurkan bantuan darurat tahap pertama. Target kami adalah mendistribusikan:
      1. 1000 paket sembako (beras, minyak, telur, mie instan).
      2. Air bersih dan selimut hangat.
      3. Obat-obatan ringan dan vitamin.

      Bantuan Anda akan sangat berarti untuk menyambung hidup mereka di tengah bencana ini sampai air surut. Mari kita bantu saudara kita agar bisa bangkit kembali.`,
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
      image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c",
      description: `Di balik keindahan pantai Bali yang mendunia, terdapat realita pahit yang dialami anak-anak nelayan di pelosok <strong>Karangasem</strong>. Putu (14 tahun), salah satunya. Ia adalah siswa cerdas yang bercita-cita menjadi seorang guru matematika. Namun, impian itu terancam kandas.

      Penghasilan ayahnya sebagai nelayan tradisional seringkali tidak menentu. Kadang dapat ikan, kadang pulang dengan tangan hampa dihantam ombak besar. Uang yang ada seringkali habis hanya untuk makan sehari-hari, apalagi untuk membayar <strong>biaya sekolah dan membeli seragam</strong>.

      Banyak teman sebaya Putu yang terpaksa <strong>putus sekolah</strong> dan memilih bekerja serabutan atau ikut melaut demi membantu ekonomi keluarga. Kami percaya bahwa kemiskinan tidak boleh memutus mata rantai mimpi seorang anak. Pendidikan adalah satu-satunya jalan untuk mengubah nasib keluarga mereka.

      Melalui kampanye ini, <strong>Yayasan Senyum</strong> ingin memberikan beasiswa pendidikan penuh bagi <strong>50 anak nelayan berprestasi</strong> yang terancam putus sekolah. Dana yang terkumpul akan digunakan untuk:
      * Membayar SPP sekolah.
      * Membeli seragam, sepatu, dan tas baru.
      * Menyediakan buku pelajaran dan alat tulis.

      Setiap donasi adalah harapan. Harapan bahwa Putu dan teman-temannya bisa terus bersekolah dan meraih cita-cita mereka.`,
      target: 25000000,
      collected: 10000000,
      category: "Pendidikan",
      deadline: "2026-05-15",
      author: "Yayasan Senyum",
      location: "Karangasem",
    },
    {
      id: "K3",
      title: "Penanaman 1000 Mangrove Denpasar",
      image: "https://images.unsplash.com/photo-1583212292354-0837cc330f47",
      description: `Pernahkah Anda melihat garis pantai yang semakin hari semakin mundur? <strong>Abrasi pantai</strong> di wilayah pesisir Denpasar kini semakin mengkhawatirkan. Hutan mangrove yang dulu menjadi benteng alami penahan ombak kini semakin menipis akibat alih fungsi lahan dan tumpukan sampah plastik yang mematikan akar-akarnya.

      Jika dibiarkan, air laut akan semakin naik, mengancam pemukiman warga, serta menghancurkan tempat pemijahan ikan. Ini adalah peringatan bagi kita semua bahwa alam sedang tidak baik-baik saja.

      <strong>Green Earth ID</strong> mengajak #OrangBaik untuk tidak hanya diam, tapi ikut berpartisipasi dalam gerakan <strong>"Satu Jiwa Satu Pohon"</strong>. Target kami adalah menanam <strong>1.000 bibit mangrove baru</strong> di area konservasi yang kritis di Tahura Ngurah Rai.

      Donasi Anda tidak hanya digunakan untuk membeli bibit, tetapi juga dialokasikan untuk:
      * Biaya perawatan rutin.
      * Pembersihan sampah plastik di area tanam.
      * Pemantauan selama 6 bulan pertama agar pohon benar-benar tumbuh kuat.

      Mari jaga paru-paru dunia dan wariskan alam yang lestari untuk anak cucu kita. Alam butuh aksi, bukan janji.`,
      target: 15000000,
      collected: 5000000,
      category: "Lingkungan",
      deadline: "2026-02-28",
      author: "Green Earth ID",
      location: "Denpasar",
    },
    {
      id: "K4",
      title: "Cegah Stunting Balita Desa Buleleng",
      image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03",
      description: `Tahukah Anda bahwa angka <strong>stunting (gizi buruk kronis)</strong> di beberapa desa pelosok Buleleng masih cukup tinggi? Banyak balita yang berat badan dan tinggi badannya jauh di bawah standar usianya.

      Hal ini bukan karena orang tua mereka tidak sayang, melainkan karena keterbatasan ekonomi dan kurangnya pengetahuan tentang gizi seimbang. Seringkali, anak hanya diberi makan nasi dengan kuah tanpa protein yang cukup. Stunting bukan hanya masalah fisik yang pendek, tapi juga menghambat <strong>perkembangan otak anak</strong> yang bersifat permanen.

      Jika tidak ditangani sekarang, kita sedang mempertaruhkan masa depan generasi penerus bangsa menjadi generasi yang lemah.

      <strong>Posyandu Sehat</strong> menggalang dana untuk program <strong>"Piring Gizi"</strong>. Kami akan mendistribusikan:
      * Paket Makanan Pendamping ASI (MPASI).
      * Susu formula dan vitamin.
      * Telur ayam secara rutin selama 3 bulan penuh.

      Bantuan ini ditujukan untuk <strong>500 balita</strong> yang terdata mengalami gizi buruk. Mari selamatkan masa depan mereka sejak dini.`,
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
      image: "https://images.unsplash.com/photo-1548802673-380ab8ebc7b7",
      description: `Setiap hari di jalanan, kami menemukan kucing-kucing dengan kondisi yang menyayat hati: ada yang kakinya patah akibat tertabrak kendaraan, matanya buta karena infeksi, kulit penuh jamur, hingga kelaparan ekstrem dengan tulang berbalut kulit.

      Mereka tidak punya tempat berteduh, mengais sisa makanan di tong sampah, dan seringkali diusir atau disakiti oleh manusia. <strong>Bali Cat Lovers</strong> berencana membangun sebuah <strong>"Shelter Harapan"</strong> di daerah Tabanan.

      Tempat ini akan menjadi rumah sementara (transisi) bagi kucing-kucing terlantar untuk:
      1. Dipulihkan kesehatannya.
      2. <strong>Disterilisasi</strong> (untuk menekan populasi liar).
      3. Divaksinasi sebelum dicarikan adopter yang bertanggung jawab.

      Dana yang terkumpul akan digunakan untuk sewa lahan, pembangunan kandang isolasi, biaya pengobatan dokter hewan, dan stok makanan kucing berkualitas. Sedikit bantuan Anda adalah nyawa bagi makhluk kecil yang tak bisa bicara ini.`,
      target: 15000000,
      collected: 4500000,
      category: "Hewan",
      deadline: "2026-06-01",
      author: "Bali Cat Lovers",
      location: "Tabanan",
    },
    {
      id: "K6",
      title: "Renovasi Jembatan Putus Gianyar",
      image: "https://images.unsplash.com/photo-1516733725897-1aa73b87c8e8",
      description: `Minggu lalu, sebuah jembatan gantung tua yang menjadi nadi kehidupan di desa pedalaman <strong>Gianyar</strong> putus diterjang banjir bandang. Jembatan ini adalah akses satu-satunya yang menghubungkan dua dusun dan menjadi jalan utama bagi <strong>200 kepala keluarga</strong> untuk menuju pasar, puskesmas, dan sekolah.

      Kini, kondisinya sangat memprihatinkan. Anak-anak SD harus menyeberangi sungai yang arusnya deras dengan rakit bambu seadanya. Ini sangat berbahaya, terutama saat hujan turun di hulu. Alternatif lainnya adalah memutar jalan melewati hutan sejauh <strong>15 kilometer</strong>, yang memakan waktu dan biaya transportasi mahal.

      Kami warga desa telah bergotong royong mengumpulkan tenaga kerja, namun kami kekurangan biaya untuk membeli material kokoh seperti <strong>besi baja, semen, kawat seling, dan pasir</strong>.

      Bantu kami membangun kembali jembatan ini agar anak-anak bisa bersekolah dengan aman dan ekonomi desa kembali berputar.`,
      target: 100000000,
      collected: 45000000,
      category: "Bencana Alam",
      deadline: "2026-08-12",
      author: "Relawan Desa",
      location: "Gianyar",
    },
    {
      id: "K7",
      title: "Operasi Katarak Gratis Lansia",
      image: "https://images.unsplash.com/photo-1579154236594-e179764b0ad4",
      description: `Mbah Surti (70 th) sudah 5 tahun hidup dalam dunia yang gelap gulita. <strong>Katarak</strong> yang menebal di kedua matanya membuatnya tidak bisa lagi melihat wajah cucu-cucunya, tidak bisa memasak, atau sekadar berjalan ke kamar mandi sendiri. Ia sering terjatuh dan terluka. Ia hanya ingin satu hal di sisa umurnya: bisa melihat cahaya matahari kembali.

      Ada ribuan lansia dhuafa di <strong>Singaraja</strong> yang mengalami nasib serupa Mbah Surti. Bagi mereka, operasi katarak yang memakan biaya jutaan rupiah adalah kemewahan yang tak terjangkau. Mereka pasrah menunggu dalam gelap.

      <strong>Klinik Mata Sehat</strong> bekerjasama dengan dokter spesialis mata mengadakan program operasi gratis untuk <strong>50 lansia prasejahtera</strong>. Donasi Anda akan mencakup:
      * Biaya screening awal.
      * Tindakan operasi phacoemulsification.
      * Obat-obatan pasca operasi dan kacamata pelindung.

      Mari jadikan mata mereka terang kembali.`,
      target: 75000000,
      collected: 30000000,
      category: "Kesehatan",
      deadline: "2026-03-30",
      author: "Klinik Mata Sehat",
      location: "Singaraja",
    },
    {
      id: "K8",
      title: "5000 Buku untuk Papua",
      image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b",
      description: `Di sebuah distrik terpencil di pegunungan <strong>Papua</strong>, satu buku pelajaran yang sudah lusuh dan sobek harus dibaca bergantian oleh 10 siswa. Perpustakaan sekolah mereka kosong, hanya berisi rak-rak kayu berdebu.

      Semangat belajar mereka sangat tinggi. Mereka berjalan kaki berjam-jam tanpa alas kaki menuju sekolah, namun fasilitas pendidikan sangat terbatas.

      <strong>Indonesia Pintar</strong> menginisiasi gerakan pengiriman <strong>5000 buku bacaan</strong>, buku pelajaran, alat tulis, dan tas sekolah untuk saudara-saudara kita di Timur Indonesia. Kami percaya bahwa buku adalah jendela dunia yang bisa mengubah pola pikir dan nasib seseorang.

      Tantangan terbesar kami adalah <strong>biaya logistik pengiriman</strong> yang sangat mahal ke area pedalaman yang hanya bisa dijangkau pesawat perintis. Dukungan Anda akan memastikan paket pendidikan ini sampai ke tangan anak-anak yang paling membutuhkan di ujung negeri.`,
      target: 40000000,
      collected: 15000000,
      category: "Pendidikan",
      deadline: "2026-04-20",
      author: "Indonesia Pintar",
      location: "Papua",
    },
    {
      id: "K9",
      title: "Selamatkan Penyu Hijau Serangan",
      image: "https://images.unsplash.com/photo-1437622368342-7a3d73a34c8f",
      description: `<strong>Penyu Hijau</strong> adalah spesies purba yang kini terancam punah. Di Pantai Serangan, ancaman terbesar bukan hanya predator alami, tapi juga manusia. Telur-telur penyu yang baru diletakkan induknya di pasir seringkali dicuri oleh pemburu liar untuk dijual di pasar gelap.

      Tukik (bayi penyu) yang baru menetas pun memiliki tingkat kelangsungan hidup yang sangat rendah di alam liar yang penuh polusi. <strong>Komunitas Sahabat Penyu</strong> mendedikasikan diri melakukan patroli malam untuk mengamankan telur penyu dan memindahkannya ke fasilitas penetasan semi-alami yang aman.

      Kami membutuhkan dana operasional untuk:
      * Memperbaiki kolam penangkaran yang bocor.
      * Membeli pakan penyu dan obat-obatan.
      * Perlengkapan patroli malam bagi relawan.

      Satu donasi Anda bisa menyelamatkan satu generasi penyu penjaga ekosistem laut.`,
      target: 20000000,
      collected: 8000000,
      category: "Lingkungan",
      deadline: "2026-02-15",
      author: "Sahabat Penyu",
      location: "Denpasar",
    },
    {
      id: "K10",
      title: "Paket Sembako Lansia Dhuafa",
      image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb8",
      description: `Bayangkan menghabiskan masa tua sendirian, tanpa pasangan, tanpa anak, dan tubuh yang mulai sakit-sakitan. Banyak lansia di pelosok <strong>Badung</strong> yang mengalami hal ini. Mereka tidak lagi mampu bekerja keras, dan seringkali hanya makan nasi dengan garam atau ubi rebus sekadar untuk mengganjal perut.

      Gerakan <strong>"Mari Berbagi"</strong> hadir untuk memastikan tidak ada lansia yang tidur dalam keadaan lapar. Kami menyalurkan paket kasih berisi kebutuhan dasar:
      * Beras 5kg
      * Gula, teh, dan biskuit
      * Minyak goreng dan sarden

      Paket ini diantar setiap bulannya langsung ke pintu rumah gubuk mereka. Senyum dan doa tulus dari para lansia ini adalah balasan terindah bagi Anda yang menyisihkan sedikit rezeki. Mari muliakan mereka sebagaimana kita memuliakan orang tua kita sendiri.`,
      target: 20000000,
      collected: 12000000,
      category: "Kesehatan",
      deadline: "2026-02-10",
      author: "Mari Berbagi",
      location: "Badung",
    },
    {
      id: "K11",
      title: "Wakaf Sumur Bor Desa Kekeringan",
      image: "https://images.unsplash.com/photo-1534938665420-4193effeabb4",
      description: `Setiap musim kemarau tiba, warga Desa di <strong>Karangasem Timur</strong> harus berjalan kaki sejauh 5 kilometer menuruni bukit terjal hanya untuk mendapatkan satu jerigen air keruh dari mata air yang mulai mengering. Air adalah sumber kehidupan, namun bagi mereka, air adalah barang mewah yang sulit didapat.

      Kondisi krisis air ini menyebabkan sanitasi buruk dan warga rentan terkena penyakit kulit serta diare. Anak-anak pun sering terlambat sekolah karena harus membantu orang tua mengangkut air sebelum matahari terbit.

      <strong>Water Action</strong> berencana membangun **sumur bor sedalam 80 meter** lengkap dengan instalasi pipa, mesin pompa, dan tandon air umum di pusat desa. Air bersih ini nantinya akan mengalir gratis untuk <strong>300 jiwa penduduk desa</strong>. Ini adalah sedekah jariyah yang pahalanya akan terus mengalir selamanya.`,
      target: 60000000,
      collected: 25000000,
      category: "Lingkungan",
      deadline: "2026-07-01",
      author: "Water Action",
      location: "Karangasem",
    },
    {
      id: "K12",
      title: "Pelatihan Digital UMKM Pengrajin",
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f",
      description: `Pandemi dan perubahan zaman membuat para pengrajin kain tenun dan anyaman bambu di <strong>Klungkung</strong> kehilangan pasar. Toko oleh-oleh sepi pengunjung, sementara mereka tidak mengerti cara berjualan online. Stok barang menumpuk di gudang, dan dapur mereka terancam tidak ngebul karena pendapatan terhenti.

      <strong>Startup Bali</strong> ingin menjembatani kesenjangan ini. Kami membuat program pelatihan intensif bertajuk: <strong>"Dari Desa ke Dunia"</strong>. Materi mencakup:
      1. Fotografi produk menggunakan HP.
      2. Cara membuat akun marketplace.
      3. Manajemen keuangan sederhana.
      4. Dasar-dasar digital marketing.

      Dana donasi akan digunakan untuk menyewa tempat pelatihan, konsumsi peserta, dan menyediakan modal kuota internet awal serta packaging yang menarik. Mari bantu produk lokal Bali agar bisa bersaing di pasar global.`,
      target: 15000000,
      collected: 3000000,
      category: "Pendidikan",
      deadline: "2026-05-20",
      author: "Startup Bali",
      location: "Klungkung",
    },
    {
      id: "K13",
      title: "Darurat Oksigen RSUD Bangli",
      image: "https://images.unsplash.com/photo-1584036561566-baf241f9142d",
      description: `Lonjakan pasien ISPA dan gangguan pernapasan akut di wilayah <strong>Bangli</strong> membuat stok oksigen medis di RSUD semakin menipis. Beberapa puskesmas pembantu di desa-desa bahkan melaporkan sudah kehabisan stok tabung oksigen portable sejak dua hari lalu.

      Kondisi ini sangat krusial karena menyangkut nyawa pasien. Keterlambatan penanganan beberapa menit saja bisa berakibat fatal. Kami tidak ingin melihat ada keluarga yang kehilangan orang tercinta hanya karena ketiadaan fasilitas kesehatan dasar seperti oksigen.

      <strong>Peduli Sehat</strong> menggalang dana darurat untuk pengadaan <strong>50 tabung oksigen besar (6m3)</strong> dan <strong>100 regulator set</strong> yang akan segera didistribusikan ke fasilitas kesehatan yang paling membutuhkan di Bangli. Mari bantu mereka bernapas lega kembali.`,
      target: 50000000,
      collected: 40000000,
      category: "Kesehatan",
      deadline: "2026-02-25",
      author: "Peduli Sehat",
      location: "Bangli",
    },
    {
      id: "K14",
      title: "Sekolah Alam Bambu Tabanan",
      image: "https://images.unsplash.com/photo-1513258496099-48168024adb0",
      description: `Pendidikan tidak harus selalu di dalam tembok beton yang kaku. Kami ingin membangun ruang kelas yang ramah lingkungan, menyatu dengan alam, dan terbuat dari material lokal yang berkelanjutan, yaitu <strong>bambu</strong>.

      <strong>Sekolah Alam</strong> ini akan menjadi tempat belajar non-formal gratis bagi anak-anak desa untuk belajar pertanian organik, seni budaya Bali, dan bahasa Inggris. Tujuannya adalah mencetak generasi muda yang cerdas secara intelektual namun tetap mencintai akar budaya dan menjaga alamnya.

      Kami membutuhkan bantuan untuk pembelian material <strong>bambu petung</strong> yang sudah diawetkan, atap alang-alang, dan biaya tukang lokal yang ahli konstruksi bambu. Mari bangun sekolah impian dimana anak-anak bisa belajar dengan gembira di bawah naungan alam.`,
      target: 85000000,
      collected: 20000000,
      category: "Pendidikan",
      deadline: "2026-09-15",
      author: "Yayasan Hijau",
      location: "Tabanan",
    },
    {
      id: "K15",
      title: "Rehabilitasi Terumbu Karang Amed",
      image: "https://images.unsplash.com/photo-1546026423-cc4642628d2b",
      description: `Terumbu karang di perairan <strong>Amed</strong> mengalami pemutihan (bleaching) yang cukup parah akibat kenaikan suhu air laut dan aktivitas penangkapan ikan yang tidak ramah lingkungan di masa lalu. Padahal, karang adalah rumah bagi ikan. Jika karang mati, ikan-ikan akan pergi, dan nelayan lokal akan kehilangan mata pencaharian utamanya.

      <strong>Blue Ocean</strong> berinisiasi untuk memasang struktur <strong>"Biorock"</strong> (kerangka besi yang dialiri listrik tegangan rendah) dan melakukan transplantasi bibit karang baru. Teknologi ini terbukti mempercepat pertumbuhan karang hingga 5 kali lipat dan membuatnya lebih tahan terhadap perubahan suhu.

      Donasi Anda akan digunakan untuk:
      * Pembuatan struktur besi.
      * Pengadaan bibit karang.
      * Biaya operasional penyelam lokal yang merawat kebun karang.

      Mari kembalikan keindahan bawah laut Bali dan selamatkan ekosistem laut kita.`,
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
      image: "https://images.unsplash.com/photo-1583947215259-38e31be8751f",
      description: `Di pulau <strong>Nusa Penida</strong>, akses menuju rumah sakit adalah tantangan tersendiri. Medan yang berbukit, jalan yang rusak, dan jarak yang jauh seringkali membuat pasien gawat darurat terlambat mendapatkan pertolongan medis. Tidak jarang kami mendengar cerita ibu melahirkan yang harus berjuang di atas mobil pick-up terbuka di tengah hujan.

      <strong>Layanan Cepat</strong> ingin menghadirkan satu unit mobil ambulans yang siaga 24 jam untuk melayani warga desa secara <strong>GRATIS</strong>. Mobil ini akan dilengkapi dengan peralatan medis standar gawat darurat (PPGD), tandu, dan tabung oksigen.

      Ambulans ini bukan sekadar kendaraan, tapi harapan hidup bagi warga kepulauan yang jauh dari fasilitas kesehatan kota. Bantu kami mewujudkannya agar tidak ada lagi nyawa yang hilang di perjalanan.`,
      target: 250000000,
      collected: 150000000,
      category: "Kesehatan",
      deadline: "2026-12-30",
      author: "Layanan Cepat",
      location: "Nusa Penida",
    },
    {
      id: "K17",
      title: "Kebun Komunitas Organik Badung",
      image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735",
      description: `Ketergantungan pada pasokan sayur dari luar daerah membuat harga pangan di desa sering tidak stabil. Kami ingin menciptakan ketahanan pangan mandiri dengan memanfaatkan lahan-lahan tidur yang terbengkalai menjadi kebun organik produktif.

      Program ini akan melatih <strong>ibu-ibu PKK</strong> untuk mengelola tanah, membuat pupuk kompos sendiri, dan menanam sayur mayur (bayam, kangkung, cabai, tomat) tanpa pestisida kimia. Hasil panen sebagian akan dikonsumsi sendiri untuk perbaikan gizi keluarga, dan sebagian dijual ke pasar untuk mengisi kas desa.

      Kami membutuhkan dana untuk pembelian bibit unggul, peralatan berkebun (cangkul, sekop), dan instalasi penyiraman sederhana. Mari hijaukan pekarangan dan sehatkan warga dengan pangan organik yang bebas racun.`,
      target: 12000000,
      collected: 6000000,
      category: "Lingkungan",
      deadline: "2026-03-05",
      author: "Tani Mandiri",
      location: "Badung",
    },
    {
      id: "K18",
      title: "Operasi Bibir Sumbing Anak Bali",
      image: "https://images.unsplash.com/photo-1559839734-2b71f1e3c7e0",
      description: `Bagi sebagian anak, tersenyum adalah hal yang sulit. Terlahir dengan kondisi <strong>bibir sumbing</strong> membuat mereka kesulitan makan, berbicara dengan jelas, dan seringkali menjadi korban perundungan (bully) di sekolah. Rasa minder membuat mereka menarik diri dari pergaulan dan kehilangan masa kecil yang bahagia.

      <strong>Smile Foundation</strong> menargetkan operasi gratis untuk <strong>20 anak penderita bibir sumbing</strong> dari keluarga kurang mampu di seluruh Bali. Operasi ini akan mengubah hidup mereka selamanya, memberikan kepercayaan diri baru, dan masa depan yang lebih cerah.

      Biaya operasi plastik rekonstruksi cukup mahal, namun dengan gotong royong, kita bisa meringankannya. Donasi Anda adalah senyum baru bagi mereka.`,
      target: 100000000,
      collected: 85000000,
      category: "Kesehatan",
      deadline: "2026-02-20",
      author: "Smile Foundation",
      location: "Denpasar",
    },
    {
      id: "K19",
      title: "Perpustakaan Keliling Motor Pintar",
      image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
      description: `Banyak desa di pegunungan <strong>Bangli</strong> yang akses jalannya sempit dan terjal, sehingga tidak bisa dilalui oleh mobil perpustakaan keliling yang besar. Akibatnya, anak-anak di sana jarang mendapatkan akses buku bacaan berkualitas selain buku paket sekolah.

      Kami memodifikasi sepeda motor trail menjadi perpustakaan keliling yang lincah, mampu menembus gang-gang sempit dan jalanan berbatu. <strong>"Motor Pintar"</strong> ini akan membawa ratusan buku cerita anak, komik edukasi, dan ensiklopedia untuk dipinjamkan secara gratis setiap sore.

      Kami butuh dukungan untuk:
      * Modifikasi box motor agar tahan air.
      * Pembelian koleksi buku baru.
      * Operasional bensin bagi relawan.

      Mari antarkan ilmu dan imajinasi hingga ke pelosok desa.`,
      target: 10000000,
      collected: 9000000,
      category: "Pendidikan",
      deadline: "2026-01-30",
      author: "Literasi Bali",
      location: "Bangli",
    },
    {
      id: "K20",
      title: "Bantu Pedagang Kebakaran Pasar",
      image: "https://images.unsplash.com/photo-1541888941297-3088d894aa13",
      description: `Kebakaran hebat melanda pasar tradisional di <strong>Denpasar</strong> dini hari tadi, menghanguskan ratusan kios pedagang kecil dalam sekejap mata. Bagi mereka, kios itu adalah satu-satunya sumber penghidupan untuk membiayai sekolah anak dan makan sehari-hari.

      Ibu Wayan, seorang penjual canang dan bunga, hanya bisa menangis histeris melihat lapaknya kini hanya tinggal abu. Tidak ada barang dagangan yang tersisa. Mereka butuh modal usaha cepat untuk bangkit kembali, entah untuk membeli gerobak baru atau sekadar stok barang dagangan awal.

      <strong>Pasar Kita</strong> menggalang solidaritas warga Bali untuk membantu para pedagang terdampak. Bantuan akan disalurkan dalam bentuk uang tunai stimulus modal usaha agar mereka bisa segera berjualan kembali. Mari bantu roda ekonomi rakyat berputar kembali.`,
      target: 150000000,
      collected: 25000000,
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
    { id: 1, 
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
      status: "Aktif",
    },
    { id: 3, 
      name: "I Made Yoga", 
      email: "made@mail.com", 
      skill: "Logistik",
      status: "Pending", 
    },
    {
      id: 4,
      name: "Santi Putri",
      email: "santi@mail.com",
      skill: "Media Sosial",
      status: "Nonaktif",
    },
    {
      id: 5,
      name: "Rizky Fauzi",
      email: "rizky@mail.com",
      skill: "Dokumentasi",
      status: "Aktif",
    },
    { id: 6, 
      name: "Putu Ayu", 
      email: "putu@mail.com", 
      skill: "Psikologi",
      status: "Aktif", 
    },
    { id: 7, 
      name: "Wayan Gede", 
      email: "wayan@mail.com", 
      skill: "Konstruksi",
      status: "Nonaktif", 
    },
    {
      id: 8,
      name: "Kadek Indah",
      email: "kadek@mail.com",
      skill: "Administrasi",
      status: "Aktif",
    },
  ],
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


// --- IMPORT MODULES ---
// Mengambil data dummy dari file luar. 'import' digunakan untuk menghubungkan file JS.
import { database } from "../../assets/js/data.js";
// Mengambil komponen tampilan (UI) untuk kartu kampanye agar kode lebih rapi.
import { KampanyeCard } from "../components/KampanyeCard.js";
// Mengambil komponen Tabs untuk filter kategori.
import { FilterTabs } from "../components/FilterTabs.js";

// --- KONFIGURASI STATE (VARIABLE GLOBAL) ---
// Variable 'let' digunakan karena nilainya akan berubah-ubah nanti.
let itemsPerPage = 12; // Batas jumlah kartu yang tampil per halaman
let currentPage = 1; // Halaman yang sedang aktif saat ini
let currentCategory = "Semua"; // Filter kategori yang sedang aktif

/**
 * Fungsi Helper: Menghitung selisih hari
 * Digunakan untuk mengubah format tanggal menjadi angka sisa hari.
 */
const hitungSisaHari = (deadline) => {
  // Mengambil waktu sekarang dan waktu deadline, lalu dikurangkan
  const diff = new Date(deadline) - new Date();
  // Math.ceil membulatkan angka ke atas. Rumus ini mengubah milidetik menjadi hari.
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  // Ternary Operator (? :) -> Jika hari > 0 tampilkan hari, jika minus (lewat) tampilkan 0.
  return days > 0 ? days : 0;
};

/**
 * Fungsi Utama: Merender (Menampilkan) Konten ke Layar
 * Fungsi ini akan dipanggil ulang setiap kali filter berubah atau halaman berpindah.
 */
const renderContent = () => {
  // DOM Selection: Mengambil elemen HTML tempat kita akan menyuntikkan konten
  const grid = document.getElementById("campaign-grid");
  const paginationContainer = document.getElementById("pagination-container");
  const filterContainer = document.getElementById("filter-container");

  // Guard Clause: Jika elemen HTML belum siap/tidak ada, hentikan fungsi agar tidak error.
  if (!grid || !paginationContainer || !filterContainer) return;

  // 1. RENDER FILTER TABS
  // Menyuntikkan HTML tombol filter ke dalam div id="filter-container"
  filterContainer.innerHTML = FilterTabs({
    currentCategory, // Mengirim data kategori saat ini agar tombol aktif bisa diwarnai
    onFilterFunctionName: "filterKampanye", // Memberi nama fungsi yang akan dipanggil saat tombol diklik
  });

  // 2. FILTER DATA KAMPANYE
  // Logika: Jika kategori "Semua", ambil semua data. Jika bukan, filter berdasarkan properti 'category'.
  const dataFiltered =
    currentCategory === "Semua"
      ? database.kampanye
      : database.kampanye.filter((item) => item.category === currentCategory);

  // 3. LOGIKA PAGINATION
  // Math.ceil membulatkan ke atas (misal 13 data / 12 per page = 2 halaman)
  const totalPages = Math.ceil(dataFiltered.length / itemsPerPage);

  // Mencegah error: Jika user ada di hal 5 lalu filter berubah dan cuma ada 1 hal, kembalikan ke hal 1.
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  // Menentukan index data yang akan diambil (Slice)
  // Contoh: Halaman 1 mulai dari index 0, Halaman 2 mulai dari index 12
  const startIndex = (currentPage - 1) * itemsPerPage;
  // .slice mengambil potongan data dari array sesuai halaman aktif
  const paginatedData = dataFiltered.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // 4. RENDER GRID KARTU (MAP & REDUCE)
  grid.innerHTML =
    paginatedData.length > 0
      ? paginatedData
          .map((item) => {
            // --- LOGIKA MENGHITUNG TOTAL DONASI ---
            // .filter: Mencari semua riwayat donasi yang ID kampanyenya cocok dengan kartu ini
            const campaignDonations = database.donasi.filter(
              (d) => String(d.campaignId || d.idKampanye) === String(item.id),
            );

            // .reduce: Menjumlahkan total uang dari array hasil filter di atas
            const actualCollected = campaignDonations.reduce(
              (sum, d) => sum + (Number(d.amount || d.nominal) || 0),
              0, // Nilai awal penjumlahan dimulai dari 0
            );

            // Mengembalikan HTML kartu dengan data yang sudah diolah
            return KampanyeCard({
              ...item, // Spread Operator: Mengcopy semua data asli kampanye
              collected: actualCollected, // Menimpa data collected dengan hasil hitungan real-time
              daysLeft: hitungSisaHari(item.deadline), // Menambah data sisa hari
            });
          })
          .join("") // Menggabungkan array string HTML menjadi satu text panjang
      : // Jika data kosong (tidak ada kampanye), tampilkan pesan "Tidak ada kampanye"
        `<div class="col-span-full py-24 text-center opacity-30 font-black italic uppercase tracking-[0.3em] text-base-content font-inter">Tidak ada kampanye di kategori ini</div>`;

  // 5. RENDER NAVIGATION (TOMBOL NEXT/PREV)
  // Hanya tampilkan tombol jika halaman lebih dari 1
  paginationContainer.innerHTML =
    totalPages > 1
      ? `
            <div class="join bg-base-100 shadow-lg border border-base-content/10 rounded-2xl overflow-hidden font-inter">
                <!-- Tombol Sebelumnya: Memanggil fungsi changePage dengan index dikurang 1 -->
                <button onclick="window.changePage(${currentPage - 1})" 
                    class="join-item btn btn-sm md:btn-md px-6 ${currentPage === 1 ? "btn-disabled opacity-30" : "btn-ghost hover:bg-primary/10 hover:text-primary"} transition-all"
                    ${currentPage === 1 ? "disabled" : ""}>
                    « Sebelumnya
                </button>
                
                <!-- Penunjuk Halaman (Misal: 1 / 5) -->
                <button class="join-item btn btn-sm md:btn-md btn-ghost no-animation pointer-events-none border-x border-base-content/10 font-black text-xs md:text-sm px-6 text-base-content">
                     ${currentPage} / ${totalPages}
                </button>
                
                <!-- Tombol Berikutnya: Memanggil fungsi changePage dengan index ditambah 1 -->
                <button onclick="window.changePage(${currentPage + 1})" 
                    class="join-item btn btn-sm md:btn-md px-6 ${currentPage === totalPages ? "btn-disabled opacity-30" : "btn-ghost hover:bg-primary/10 hover:text-primary"} transition-all"
                    ${currentPage === totalPages ? "disabled" : ""}>
                    Berikutnya »
                </button>
            </div>
        `
      : ""; // Kosongkan jika halaman cuma 1
};

/**
 * --- FUNGSI GLOBAL INTERAKSI (WINDOW SCOPE) ---
 * Fungsi ini ditempel ke objek 'window' agar bisa dipanggil langsung
 * dari atribut HTML 'onclick="..."'
 */
window.changePage = (page) => {
  currentPage = page; // Update nomor halaman
  renderContent(); // Render ulang tampilan dengan halaman baru
  window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll otomatis ke atas
};

window.filterKampanye = (kategori) => {
  currentCategory = kategori; // Update kategori aktif
  currentPage = 1; // Reset halaman ke 1 setiap ganti filter
  renderContent(); // Render ulang tampilan
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * --- KOMPONEN UTAMA (EXPORT) ---
 * Struktur dasar halaman yang akan dipanggil oleh router utama.
 */
export const Kampanye = () => {
  // setTimeout digunakan untuk memberi jeda sedikit agar elemen HTML siap sebelum JS dijalankan.
  setTimeout(() => renderContent(), 50);

  // Template Literal (Backticks): Memungkinkan menulis HTML multi-baris di dalam JS.
  return `
        <div class="bg-base-200/50 min-h-screen font-inter transition-colors duration-300">
          <div class="container mx-auto px-4 md:px-10 lg:px-16 space-y-12 py-12">
              
              <!-- WADAH FILTER (Akan diisi JS) -->
              <div id="filter-container" class="sticky top-24 z-40 w-fit mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
                <!-- Diisi otomatis oleh FilterTabs via JS -->
              </div>

              <!-- WADAH GRID KARTU (Akan diisi JS) -->
              <div id="campaign-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]">
                  <!-- Konten kartu akan diisi secara dinamis -->
              </div>

              <!-- WADAH PAGINATION (Akan diisi JS) -->
              <div id="pagination-container" class="flex justify-center items-center py-10">
                  <!-- Tombol Prev/Next akan muncul di sini -->
              </div>
          </div>
        </div>
    `;
};

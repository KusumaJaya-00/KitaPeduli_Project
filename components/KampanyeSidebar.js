import { ProgressBar } from "./ProgressBar.js"; // Import komponen visual bar progress

/**
 * Komponen KampanyeSidebar
 * Menampilkan panel kanan berisi ringkasan donasi, tombol aksi, dan daftar donatur.
 * Menerima props via destructuring ({ item, donaturList, ... }) untuk akses data langsung.
 */
export const KampanyeSidebar = ({
  item, // Object data kampanye (target, collected, id, dll)
  donaturList, // Array berisi data para donatur
  daysLeft, // Angka sisa hari
  percentage, // Angka persentase terkumpul
}) => {
  // --- LOCAL HELPER FUNCTION ---
  // Fungsi untuk memformat angka biasa (misal: 50000) menjadi format mata uang (Rp 50.000)
  // Menggunakan API bawaan browser: Intl.NumberFormat
  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency", // Mode mata uang
      currency: "IDR", // Mata uang Rupiah
      maximumFractionDigits: 0, // Menghilangkan desimal ,00 di belakang
    }).format(angka);

  return `
    <!-- 
        WRAPPER SIDEBAR 
        class "sticky top-24": Membuat elemen ini menempel (fixed) di posisi atas 
        saat pengguna men-scroll halaman ke bawah, sehingga tombol donasi selalu terlihat.
    -->
    <div class="sticky top-24 space-y-6">
        
        <!-- 
            KARTU RINGKASAN & TOMBOL (Desktop Only) 
            class "hidden lg:block": Disembunyikan di HP (hidden), 
            tapi dimunculkan di layar besar/laptop (lg:block).
        -->
        <div class="card bg-base-100 shadow-xl border border-base-content/5 p-6 hidden lg:block rounded-2xl">
            
            <!-- Informasi Dana Terkumpul -->
            <div class="mb-4">
                <p class="text-sm text-base-content/60 font-medium mb-1">Dana terkumpul</p>
                <span class="text-3xl font-black text-primary block mb-1">
                    ${formatRupiah(item.collected)}
                </span>
                <span class="text-xs text-base-content/50">
                    dari target <span class="font-semibold text-base-content/80">${formatRupiah(item.target)}</span>
                </span>
            </div>

            <!-- Komponen Progress Bar -->
            <div class="py-2 mb-4">
                ${ProgressBar({ collected: item.collected, target: item.target })}
            </div>

            <!-- Grid Statistik Kecil (Donasi, Bagikan, Hari) -->
            <div class="grid grid-cols-3 gap-2 text-center mb-6 text-sm">
                <div class="flex flex-col">
                    <span class="font-bold text-base-content">${donaturList.length}</span>
                    <span class="text-xs text-base-content/50">Donasi</span>
                </div>
                <!-- Border-x memberikan garis pemisah kiri & kanan -->
                <div class="flex flex-col border-x border-base-content/10">
                    <span class="font-bold text-base-content">0</span>
                    <span class="text-xs text-base-content/50">Bagikan</span>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-base-content">${daysLeft}</span>
                    <span class="text-xs text-base-content/50">Hari Lagi</span>
                </div>
            </div>

            <!-- Tombol Aksi Utama -->
            <button onclick="navigateTo('donasi', {id: '${item.id}'})" class="btn btn-primary btn-lg w-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl transition-all mb-3 text-white">
                Donasi Sekarang
            </button>
            
            <button onclick="window.openShareModal()" class="btn btn-outline btn-block border-base-content/20 hover:bg-base-200 text-base-content font-bold">
                Bagikan
            </button>
        </div>

        <!-- KARTU DAFTAR DONATUR -->
        <div class="card bg-base-100 shadow-lg border border-base-content/5 overflow-hidden rounded-2xl">
            <div class="p-4 border-b border-base-content/5 bg-base-200/50 flex justify-between items-center">
                <h3 class="font-bold text-base-content">Donatur (${donaturList.length})</h3>
                <button class="text-xs text-primary font-bold hover:underline">Lihat Semua</button>
            </div>
            
            <!-- Area Scrollable untuk List -->
            <div class="max-h-[400px] overflow-y-auto custom-scrollbar">
                ${
                  // --- LOGIKA CONDITIONAL RENDERING ---
                  // Cek apakah ada donatur? (length > 0)
                  donaturList.length > 0
                    ? // JIKA ADA DONATUR:
                      `<ul class="divide-y divide-base-content/5">
                        ${
                          // 1. [...donaturList]: Spread operator untuk copy array agar array asli tidak rusak
                          // 2. .reverse(): Balik urutan agar donatur TERBARU muncul paling atas
                          // 3. .map(): Ubah setiap data donatur menjadi string HTML <li>
                          [...donaturList]
                            .reverse()
                            .map(
                              (donatur) => `
                        <li class="flex items-start gap-3 p-4 hover:bg-base-200/30 transition-colors">
                            <div class="avatar placeholder mt-1">
                                <div class="bg-base-300 text-base-content/50 rounded-full w-9 h-9">
                                    <!-- Ambil huruf pertama nama donatur -->
                                    <span class="text-xs font-bold">${donatur.donaturName.charAt(0)}</span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-sm text-base-content truncate">${donatur.donaturName}</p>
                                <p class="text-[10px] text-base-content/50 mt-0.5">${donatur.date || "Baru saja"}</p>
                                <p class="text-sm font-bold text-primary mt-1">${formatRupiah(donatur.amount)}</p>
                            </div>
                        </li>`,
                            )
                            .join("") // Gabungkan semua string <li> jadi satu
                        }
                    </ul>`
                    : // JIKA BELUM ADA DONATUR (Else):
                      `<div class="p-10 text-center">
                        <div class="text-base-content/30 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <p class="text-base-content/50 text-sm">Belum ada donatur.</p>
                    </div>`
                }
            </div>
        </div>
    </div>
  `;
};

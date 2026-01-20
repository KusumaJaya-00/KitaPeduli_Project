// --- IMPORT MODULES ---
import { database } from "../assets/js/data.js"; // Mengambil data dummy
import { Badge } from "../components/Badge.js"; // Komponen label kategori (Badge)
// Mengambil komponen Sidebar yang dipisah agar kode lebih rapi
import { KampanyeSidebar } from "../components/KampanyeSidebar.js";
import { ShareModal } from "../components/ShareModal.js"; // Komponen popup share

/**
 * Komponen Halaman Detail Kampanye
 * @param {Object} props - Menerima parameter 'id' dari router untuk mencari data spesifik.
 */
export const DetailKampanye = ({ id }) => {
  // ==========================================
  // 1. DATA FINDING & LOGIC (Logika Bisnis)
  // ==========================================

  // .find(): Mencari 1 objek kampanye di database yang ID-nya cocok dengan ID dari URL
  const item = database.kampanye.find((c) => c.id === id);

  // Guard Clause: Jika ID tidak ditemukan (misal user ketik URL ngawur), tampilkan pesan error.
  if (!item)
    return `<div class="min-h-[60vh] flex items-center justify-center text-error font-bold">Data Tidak Ditemukan!</div>`;

  // .filter(): Mengambil semua list donatur yang menyumbang ke kampanye ini (berdasarkan ID)
  const donaturList = database.donasi.filter((d) => d.campaignId === id);

  // --- Helper Functions (Fungsi Bantuan) ---

  // Menghitung sisa hari: (Tanggal Deadline - Tanggal Sekarang) / Milidetik dalam sehari
  const hitungSisaHari = (d) =>
    Math.ceil((new Date(d) - new Date()) / (1000 * 60 * 60 * 24)) > 0
      ? Math.ceil((new Date(d) - new Date()) / (1000 * 60 * 60 * 24))
      : 0; // Jika hasil minus (lewat tanggal), return 0

  const daysLeft = hitungSisaHari(item.deadline);

  // Menghitung persentase progress bar.
  // Math.min(..., 100): Memastikan angka tidak lebih dari 100% (meskipun donasi melebihi target).
  const percentage = Math.min((item.collected / item.target) * 100, 100);

  // Formatter Uang: Mengubah angka 10000 jadi "Rp 10.000" secara otomatis
  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);

  // ==========================================
  // 2. RENDER HTML (Tampilan)
  // ==========================================
  return `
    <!-- Container Utama: Padding responsif (px-4 di HP, px-8 di Desktop) -->
    <div class="min-h-screen bg-base-200 py-8 px-4 md:px-8 font-sans pb-32 lg:pb-12 animate-fade-in">
        
        <!-- HEADER SECTION (Tombol Kembali & Judul) -->
        <div class="max-w-6xl mx-auto space-y-4 mb-8">
            <!-- Tombol Kembali: Memanggil fungsi global navigateTo('kampanye') -->
            <button onclick="navigateTo('kampanye')" class="btn btn-sm btn-ghost gap-2 -ml-2 text-base-content/70 hover:bg-base-300 font-normal">
                <!-- SVG Icon Panah Kiri -->
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>
                Kembali
            </button>

            <!-- Judul & Info Penggalang Dana -->
            <div>
                <h1 class="text-2xl md:text-4xl font-extrabold text-base-content mb-4 leading-tight">${item.title}</h1>
                <div class="flex items-center gap-3 border-b border-base-content/10 pb-4">
                    <!-- Avatar Inisial (Huruf Depan) -->
                    <div class="avatar placeholder"><div class="bg-primary text-primary-content rounded-full w-8 md:w-10 shadow-sm"><span class="text-sm md:text-lg font-bold">${item.author ? item.author.charAt(0) : "A"}</span></div></div>
                    <div>
                        <p class="text-xs text-base-content/60 uppercase tracking-wider font-bold mb-0.5">Penggalang Dana</p>
                        <div class="flex items-center gap-1">
                            <!-- Nama Author & Icon Verified -->
                            <p class="font-bold text-base-content text-sm md:text-base">${item.author || "Admin Charity"} <span class="text-base-content/50 font-normal text-xs ml-1">• ${item.location || "Indonesia"}</span></p>
                            <svg class="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- GRID LAYOUT UTAMA (2 Kolom di Desktop, 1 Kolom di HP) -->
        <div class="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            <!-- KOLOM KIRI (Konten Utama: Gambar & Deskripsi) -->
            <div class="lg:col-span-2 space-y-8">
                <!-- Gambar Utama (Aspect Ratio Video 16:9) -->
                <div class="rounded-2xl overflow-hidden shadow-sm relative aspect-video bg-base-300 w-full">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full object-cover" />
                    <!-- Badge Kategori Overlay -->
                    <div class="absolute top-4 left-4">${Badge({ category: item.category })}</div>
                </div>

                <!-- Bagian Deskripsi -->
                <div>
                    <div class="tabs tabs-boxed bg-base-100 p-1 mb-6 gap-2 w-fit">
                        <a class="tab tab-active bg-primary/10 text-primary font-bold rounded-lg border border-primary/20 px-6">Deskripsi</a>
                    </div>
                    <!-- class 'prose' dari Tailwind Typography plugin untuk memformat teks panjang dengan rapi -->
                    <article class="prose prose-lg max-w-none text-base-content/80 leading-relaxed whitespace-pre-line prose-headings:text-base-content prose-strong:text-base-content">
                        ${item.description}
                    </article>
                    
                    <!-- Disclaimer Box -->
                    <div class="bg-base-300/50 p-5 rounded-xl mt-8 text-xs text-base-content/60 border border-base-content/10 leading-relaxed">
                        <strong class="text-base-content/80">Pernyataan:</strong> Informasi dan opini yang tertulis di halaman penggalangan dana ini adalah milik penggalang dana dan tidak mewakili KitaPeduli.
                    </div>
                </div>

                <!-- Banner CTA Relawan -->
                <div class="card bg-secondary/5 border border-secondary/20 shadow-sm mt-8">
                    <div class="card-body p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
                        <div class="bg-base-100 p-4 rounded-full shadow-sm text-secondary">
                           <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                        </div>
                        <div class="flex-1">
                            <h3 class="font-bold text-lg text-secondary mb-1">Ingin Berkontribusi Lebih?</h3>
                            <p class="text-sm text-base-content/70">Selain donasi dana, kamu bisa mendaftar menjadi relawan lapangan di <b>${item.location}</b>.</p>
                        </div>
                        <button onclick="navigateTo('relawan')" class="btn btn-secondary text-white shadow-md hover:shadow-lg transition-all px-8">Jadi Relawan</button>
                    </div>
                </div>
            </div>

            <!-- KOLOM KANAN (Sidebar: Progress Bar & Form Donasi) -->
            <div class="lg:col-span-1">
                <!-- Memanggil komponen Sidebar terpisah -->
                ${KampanyeSidebar({ item, donaturList, daysLeft, percentage })}
            </div>
        </div>

        <!-- STICKY FOOTER (Khusus Mobile: lg:hidden) -->
        <!-- Panel bawah yang melayang tetap di layar saat scroll di HP -->
        <div class="fixed bottom-0 left-0 right-0 bg-base-100 border-t border-base-content/10 p-4 z-50 lg:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] animate-slide-up">
            <div class="max-w-6xl mx-auto flex items-center gap-4">
                <!-- Info Terkumpul Singkat -->
                <div class="flex-1">
                    <span class="text-xs text-base-content/60 block">Terkumpul</span>
                    <span class="font-bold text-primary text-sm md:text-base">${formatRupiah(item.collected)}</span>
                    <div class="w-full mt-1"><progress class="progress progress-primary w-full h-1.5" value="${percentage}" max="100"></progress></div>
                </div>
                <!-- Tombol Share -->
                <button onclick="window.openShareModal()" class="btn btn-square btn-outline border-base-content/20">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                </button>
                <!-- Tombol Donasi CTA -->
                <button onclick="navigateTo('donasi', {id: '${item.id}'})" class="btn btn-primary px-6 font-bold text-white shadow-lg rounded-xl flex-1">Donasi</button>
            </div>
        </div>

        <!-- Komponen Modal Share (Invisible by default, triggered by JS) -->
        ${ShareModal({ title: item.title, currentUrl: window.location.href })}

    </div>
  `;
};

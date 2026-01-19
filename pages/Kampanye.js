import { database } from "../../assets/js/data.js";
import { KampanyeCard } from "../components/KampanyeCard.js";
import { FilterTabs } from "../components/FilterTabs.js"; // Import komponen tab kategori

// --- KONFIGURASI TATA LETAK & PAGINATION ---
let itemsPerPage = 12;
let currentPage = 1;
let currentCategory = "Semua";

/**
 * Fungsi Helper untuk menghitung sisa hari
 */
const hitungSisaHari = (deadline) => {
  const diff = new Date(deadline) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

/**
 * Fungsi Utama Render Konten
 */
const renderContent = () => {
  const grid = document.getElementById("campaign-grid");
  const paginationContainer = document.getElementById("pagination-container");
  const filterContainer = document.getElementById("filter-container");

  if (!grid || !paginationContainer || !filterContainer) return;

  // 1. RENDER FILTER TABS (Source of Truth Kategori)
  filterContainer.innerHTML = FilterTabs({
    currentCategory,
    onFilterFunctionName: "filterKampanye",
  });

  // 2. FILTER DATA KAMPANYE
  const dataFiltered =
    currentCategory === "Semua"
      ? database.kampanye
      : database.kampanye.filter((item) => item.category === currentCategory);

  // 3. LOGIKA PAGINATION
  const totalPages = Math.ceil(dataFiltered.length / itemsPerPage);
  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = dataFiltered.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  // 4. RENDER GRID KARTU DENGAN HITUNG OTOMATIS COLLECTED
  grid.innerHTML =
    paginatedData.length > 0
      ? paginatedData
          .map((item) => {
            // HITUNG OTOMATIS: Ambil total donasi real-time dari array donasi di database
            const campaignDonations = database.donasi.filter(
              (d) => String(d.campaignId || d.idKampanye) === String(item.id),
            );
            const actualCollected = campaignDonations.reduce(
              (sum, d) => sum + (Number(d.amount || d.nominal) || 0),
              0,
            );

            return KampanyeCard({
              ...item,
              collected: actualCollected, // Gunakan data hasil hitungan riwayat
              daysLeft: hitungSisaHari(item.deadline),
            });
          })
          .join("")
      : `<div class="col-span-full py-24 text-center opacity-30 font-black italic uppercase tracking-[0.3em] text-base-content font-inter">Tidak ada kampanye di kategori ini</div>`;

  // 5. RENDER NAVIGATION (PREV/NEXT)
  paginationContainer.innerHTML =
    totalPages > 1
      ? `
            <div class="join bg-base-100 shadow-lg border border-base-content/10 rounded-2xl overflow-hidden font-inter">
                <button onclick="window.changePage(${currentPage - 1})" 
                    class="join-item btn btn-sm md:btn-md px-6 ${currentPage === 1 ? "btn-disabled opacity-30" : "btn-ghost hover:bg-primary/10 hover:text-primary"} transition-all"
                    ${currentPage === 1 ? "disabled" : ""}>
                    « Sebelumnya
                </button>
                <button class="join-item btn btn-sm md:btn-md btn-ghost no-animation pointer-events-none border-x border-base-content/10 font-black text-xs md:text-sm px-6 text-base-content">
                     ${currentPage} / ${totalPages}
                </button>
                <button onclick="window.changePage(${currentPage + 1})" 
                    class="join-item btn btn-sm md:btn-md px-6 ${currentPage === totalPages ? "btn-disabled opacity-30" : "btn-ghost hover:bg-primary/10 hover:text-primary"} transition-all"
                    ${currentPage === totalPages ? "disabled" : ""}>
                    Berikutnya »
                </button>
            </div>
        `
      : "";
};

/**
 * FUNGSI GLOBAL INTERAKSI
 */
window.changePage = (page) => {
  currentPage = page;
  renderContent();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.filterKampanye = (kategori) => {
  currentCategory = kategori;
  currentPage = 1;
  renderContent();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * KOMPONEN UTAMA HALAMAN KAMPANYE
 */
export const Kampanye = () => {
  // Delay render sedikit agar DOM elemen siap ditangkap JS
  setTimeout(() => renderContent(), 50);

  return `
        <div class="bg-base-200/50 min-h-screen font-inter transition-colors duration-300">
          <div class="container mx-auto px-4 md:px-10 lg:px-16 space-y-12 py-12">
              
              <!-- STICKY FILTER CONTAINER -->
              <div id="filter-container" class="sticky top-24 z-40 w-fit mx-auto animate-in fade-in slide-in-from-top-4 duration-500">
                <!-- Diisi otomatis oleh FilterTabs via JS -->
              </div>

              <!-- CAMPAIGN GRID -->
              <div id="campaign-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 min-h-[500px]">
                  <!-- Konten kartu akan diisi secara dinamis -->
              </div>

              <!-- PAGINATION CONTAINER -->
              <div id="pagination-container" class="flex justify-center items-center py-10">
                  <!-- Tombol Prev/Next akan muncul di sini -->
              </div>
          </div>
        </div>
    `;
};

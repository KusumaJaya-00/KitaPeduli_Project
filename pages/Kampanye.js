import { database } from "../../assets/js/data.js";
import { KampanyeCard } from "../components/KampanyeCard.js";

// --- KONFIGURASI TATA LETAK & PAGINATION ---
let itemsPerPage = 12; // 4 kolom x 3 baris
let currentPage = 1;
let currentCategory = "Semua";

/**
 * Fungsi Helper untuk menghitung sisa hari
 */
const hitungSisaHari = (deadline) => {
  const tglTarget = new Date(deadline);
  const tglSekarang = new Date();
  const selisihWaktu = tglTarget - tglSekarang;
  const sisaHari = Math.ceil(selisihWaktu / (1000 * 60 * 60 * 24));
  return sisaHari > 0 ? sisaHari : 0;
};

/**
 * Fungsi Utama Render Konten
 */
const renderContent = () => {
  const grid = document.getElementById("campaign-grid");
  const paginationContainer = document.getElementById("pagination-container");

  if (!grid || !paginationContainer) return;

  // 1. Filter Data
  const dataFiltered =
    currentCategory === "Semua"
      ? database.kampanye
      : database.kampanye.filter((item) => item.category === currentCategory);

  // 2. Hitung total halaman
  const totalPages = Math.ceil(dataFiltered.length / itemsPerPage);

  if (currentPage > totalPages && totalPages > 0) currentPage = totalPages;

  // 3. Potong data sesuai halaman
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dataFiltered.slice(startIndex, endIndex);

  // 4. Render Grid Kartu
  grid.innerHTML =
    paginatedData.length > 0
      ? paginatedData
          .map((item) =>
            KampanyeCard({
              ...item,
              daysLeft: hitungSisaHari(item.deadline || item.tenggatWaktu),
            }),
          )
          .join("")
      : `<div class="col-span-full py-20 text-center opacity-50 font-bold italic font-inter text-sm">Tidak ada kampanye di kategori ini.</div>`;

  // 5. Render Pagination (Prev & Next)
  let paginationHTML = "";
  if (totalPages > 1) {
    paginationHTML = `
            <div class="join bg-base-100 shadow-sm border border-base-content/10 rounded-2xl overflow-hidden">
                <button onclick="changePage(${currentPage - 1})" 
                    class="join-item btn btn-sm md:btn-md px-6 ${currentPage === 1 ? "btn-disabled opacity-30" : "btn-ghost hover:bg-primary/10 hover:text-primary"} transition-all"
                    ${currentPage === 1 ? "disabled" : ""}>
                    « Sebelumnya
                </button>
                <button class="join-item btn btn-sm md:btn-md btn-ghost no-animation pointer-events-none border-x border-base-content/10 font-black text-xs md:text-sm px-6">
                     ${currentPage} / ${totalPages}
                </button>
                <button onclick="changePage(${currentPage + 1})" 
                    class="join-item btn btn-sm md:btn-md px-6 ${currentPage === totalPages ? "btn-disabled opacity-30" : "btn-ghost hover:bg-primary/10 hover:text-primary"} transition-all"
                    ${currentPage === totalPages ? "disabled" : ""}>
                    Berikutnya »
                </button>
            </div>
        `;
  }
  paginationContainer.innerHTML = paginationHTML;

  // 6. Update Visual Tombol Filter Aktif
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    const btnCat = btn.getAttribute("data-cat");
    if (btnCat === currentCategory) {
      btn.classList.add("btn-primary");
      btn.classList.remove("btn-ghost");
    } else {
      btn.classList.remove("btn-primary");
      btn.classList.add("btn-ghost");
    }
  });
};

/**
 * Fungsi Global: Berpindah Halaman
 */
window.changePage = (page) => {
  currentPage = page;
  renderContent();
  window.scrollTo({ top: 0, behavior: "smooth" });
};

/**
 * Fungsi Global: Filter Kategori
 */
window.filterKampanye = (kategori) => {
  currentCategory = kategori;
  currentPage = 1;
  renderContent();
};

/**
 * Komponen Halaman Kampanye
 */
export const Kampanye = () => {
  // Jalankan render setelah DOM siap
  setTimeout(() => renderContent(), 50);

  return `
        <div class="bg-base-200 min-h-screen font-inter transition-colors duration-300">
          <!-- MENGGUNAKAN STANDAR TAILWIND CONTAINER LANGSUNG -->
          <div class="container mx-auto px-4 md:px-10 lg:px-16 space-y-10 py-10">
              
              <!-- Menu Filter Kategori (Sticky) -->
              <div class="flex flex-wrap justify-center gap-2 sticky top-24 z-40 bg-base-100/50 backdrop-blur-md p-2 rounded-2xl border border-base-content/5 w-fit mx-auto shadow-sm">
                  <button onclick="filterKampanye('Semua')" data-cat="Semua" class="filter-btn btn btn-sm btn-ghost rounded-xl px-6 transition-all font-bold">Semua</button>
                  <button onclick="filterKampanye('Pendidikan')" data-cat="Pendidikan" class="filter-btn btn btn-sm btn-ghost rounded-xl px-6 transition-all font-bold">Pendidikan</button>
                  <button onclick="filterKampanye('Bencana Alam')" data-cat="Bencana Alam" class="filter-btn btn btn-sm btn-ghost rounded-xl px-6 transition-all font-bold">Bencana</button>
                  <button onclick="filterKampanye('Lingkungan')" data-cat="Lingkungan" class="filter-btn btn btn-sm btn-ghost rounded-xl px-6 transition-all font-bold">Lingkungan</button>
                  <button onclick="filterKampanye('Kesehatan')" data-cat="Kesehatan" class="filter-btn btn btn-sm btn-ghost rounded-xl px-6 transition-all font-bold">Kesehatan</button>
              </div>

              <!-- Grid Kampanye: Maksimal 4 Kolom di Desktop (xl) -->
              <div id="campaign-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 min-h-[400px]">
                  <!-- Konten akan diisi secara dinamis -->
              </div>

              <!-- Container Navigasi (Prev/Next) -->
              <div id="pagination-container" class="flex justify-center items-center py-10">
                  <!-- Tombol Prev/Next akan muncul di sini -->
              </div>
          </div>
        </div>
    `;
};

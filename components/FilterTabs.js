import { database } from "../assets/js/data.js";

/**
 * Komponen FilterTabs Reusable (Mobile-First Optimized)
 * Menggunakan Horizontal Scroll + Snap untuk mobile, dan tetap rapi di desktop.
 */
export const FilterTabs = ({ currentCategory, onFilterFunctionName }) => {
  // Ambil semua kategori unik dari data kampanye secara dinamis
  const uniqueCategories = [
    ...new Set(database.kampanye.map((k) => k.category)),
  ];

  const categories = ["Semua", ...uniqueCategories];

  return `
    <div class="relative w-full max-w-full min-w-0">
        <!-- Style internal khusus untuk menyembunyikan scrollbar di berbagai browser -->
        <style>
            .hide-scrollbar::-webkit-scrollbar { display: none; }
            .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        </style>

        <!-- Wrapper dengan scroll horizontal dan Snap Alignment -->
        <div class="flex items-center gap-2 overflow-x-auto hide-scrollbar py-3 px-1 scroll-smooth snap-x snap-mandatory touch-pan-x">
            ${categories
              .map((cat) => {
                const isActive = cat === currentCategory;
                const displayLabel = cat === "Bencana Alam" ? "Bencana" : cat;

                return `
                <button 
                    onclick="window.${onFilterFunctionName}('${cat}')" 
                    data-cat="${cat}" 
                    class="whitespace-nowrap flex-shrink-0 px-5 py-2.5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-wider transition-all duration-300 border snap-center
                    ${
                      isActive
                        ? "bg-primary text-white border-primary shadow-md shadow-primary/20 ring-4 ring-primary/10 scale-105"
                        : "bg-base-100 text-base-content/40 border-base-content/10 hover:border-primary/40 hover:text-primary active:scale-95"
                    }"
                >
                    ${displayLabel}
                </button>
              `;
              })
              .join("")}
        </div>
        
        <!-- Gradasi Fade: Memberi petunjuk visual bahwa konten bisa digeser di layar kecil -->
        <div class="absolute right-0 top-0 bottom-0 w-12 pointer-events-none sm:hidden"></div>
    </div>
  `;
};

import { ProgressBar } from "./ProgressBar.js"; // Import komponen Progress Bar untuk visualisasi target vs terkumpul
import { Badge } from "./Badge.js"; // Import komponen Badge untuk label kategori

/**
 * Komponen KampanyeCard
 * Menerima objek properties (props) berisi data detail kampanye.
 * Menggunakan Destructuring ({ id, title... }) agar langsung bisa pakai nama variabelnya.
 */
export const KampanyeCard = ({
  id,
  title,
  image,
  target,
  collected,
  daysLeft,
  category,
  author,
  description,
}) => {
  // Mengembalikan string HTML (Template Literal)
  return `
        <!-- 
          WRAPPER KARTU UTAMA 
          - onclick="navigateTo(...)": Event handler inline. Kalau kartu diklik, pindah ke halaman 'detail'.
          - group: Class Tailwind untuk menandai parent agar child element bisa bereaksi saat parent di-hover (group-hover).
        -->
        <div onclick="navigateTo('detail', {id: '${id}'})" 
             class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-content/5 group cursor-pointer overflow-hidden rounded-2xl h-full flex flex-col">
            
            <!-- BAGIAN GAMBAR (FIGURE) -->
            <figure class="relative h-48 overflow-hidden">
                <!-- 
                  Gambar Kampanye
                  - onerror: Event handler JavaScript. Jika link gambar rusak/error, ganti src dengan gambar default (placeholder).
                  - group-hover:scale-110: Saat kartu (group) di-hover, gambar ini akan zoom-in (scale 110%).
                -->
                <img src="${image}" alt="${title}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                     onerror="this.src='https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=1000'" />
                
                <!-- Badge Kategori (Pojok Kiri Atas) -->
                <div class="absolute top-3 left-3">
                    ${Badge({ category })}
                </div>
            </figure>

            <!-- BAGIAN BODY KARTU -->
            <div class="card-body p-5 flex-grow flex flex-col justify-between">
                <div class="space-y-3">
                    <!-- Judul Kampanye -->
                    <h2 class="card-title text-base leading-tight font-black line-clamp-2 group-hover:text-primary transition-colors">
                        ${title}
                    </h2>

                    <!-- Deskripsi Singkat (Fallback jika kosong) -->
                    <p class="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
                        ${description || "Deskripsi kampanye belum tersedia untuk saat ini."}
                    </p>
                    
                    <!-- Informasi Penulis (Author) -->
                    <div class="flex items-center gap-2 pt-1">
                        <div class="avatar placeholder">
                            <div class="bg-neutral text-neutral-content rounded-full w-6">
                                <!-- Logika JS: Ambil huruf pertama author. Jika null, pakai huruf 'A' -->
                                <span class="text-[10px]">${author ? author.charAt(0) : "A"}</span>
                            </div>
                        </div>
                        <p class="text-[11px] opacity-60 font-medium italic">
                            Oleh <span class="font-bold not-italic text-base-content">${author || "Anonim"}</span>
                        </p>
                    </div>

                    <!-- Progress Bar (Visualisasi Donasi) -->
                    <div class="py-1">
                        ${ProgressBar({ collected, target, size: "sm" })}
                    </div>
                </div>

                <!-- FOOTER KARTU (Sisa Waktu & Tombol) -->
                <div class="flex justify-between items-center pt-4 mt-2 border-t border-base-content/5">
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase font-bold opacity-40 tracking-widest">Sisa Waktu</span>
                        <span class="text-sm font-black text-secondary">${daysLeft} Hari</span>
                    </div>
                    
                    <!-- 
                      TOMBOL DONASI
                      - onclick="event.stopPropagation()": PENTING! 
                        Mencegah 'bubbling'. Tanpa ini, saat tombol diklik, browser akan menganggap kita juga mengklik KARTU (wrapper div).
                        Akibatnya fungsi navigateTo('detail') ikut jalan. Dengan stopPropagation, hanya navigateTo('donasi') yang jalan.
                    -->
                    <button 
                        onclick="event.stopPropagation(); navigateTo('donasi', {id: '${id}'})" 
                        class="btn btn-primary btn-sm px-5 font-bold shadow-md rounded-xl normal-case hover:scale-105 active:scale-95 transition-all">
                        Donasi
                    </button>
                </div>
            </div>
        </div>
    `;
};

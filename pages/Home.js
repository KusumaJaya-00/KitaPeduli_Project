import { database } from "../assets/js/data.js";
import { KampanyeCard } from "../components/KampanyeCard.js";

/**
 * Komponen Halaman Home
 * Fokus pada Kampanye Mendesak, menghapus gaya italic, dan memperbaiki kontras hover.
 */
export const Home = () => {
  // 1. Helper untuk menghitung sisa hari secara akurat
  const hitungSisaHari = (deadline) => {
    const diff = new Date(deadline) - new Date();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days > 0 ? days : 0;
  };

  // 2. Filter & Sort Kampanye: Ambil 4 kampanye yang sisa harinya paling sedikit (Urgent)
  const urgentCampaigns = [...database.kampanye]
    .map((k) => ({
      ...k,
      daysLeft: hitungSisaHari(k.deadline),
    }))
    .sort((a, b) => a.daysLeft - b.daysLeft) // Urutan menaik (sisa hari terkecil di atas)
    .slice(0, 4);

  return `
    <div class="min-h-screen bg-base-100 font-inter text-base-content overflow-x-hidden">
        
        <!-- --- SECTION 1: HERO (Clean Style) --- -->
        <section class="relative pt-12 pb-20 md:pt-24 md:pb-32 bg-gradient-to-br from-primary/5 via-base-100 to-base-100">
            <div class="container mx-auto px-4 md:px-10 lg:px-16 flex flex-col lg:flex-row items-center gap-12 relative z-10">
                <div class="flex-1 text-left space-y-8 animate-in fade-in slide-in-from-left-8 duration-700">
                    <div class="space-y-4">
                        <h1 class="text-5xl md:text-7xl font-black tracking-tighter leading-[1] uppercase font-poppins text-base-content">
                            Jembatan <span class="text-primary font-black">Kebaikan</span> Bagi Sesama.
                        </h1>
                        <p class="text-lg md:text-xl opacity-70 font-medium leading-relaxed max-w-xl text-base-content">
                            Salurkan bantuan Anda secara transparan, aman, dan tepat sasaran melalui platform donasi digital terpercaya di Indonesia.
                        </p>
                    </div>
                    <div class="flex flex-wrap gap-4 pt-2">
                        <button onclick="navigateTo('kampanye')" class="btn btn-primary h-16 px-10 rounded-2xl font-black uppercase tracking-widest text-white shadow-xl shadow-primary/30 border-none hover:scale-105 hover:shadow-primary/50 active:scale-95 transition-all duration-300">Donasi Sekarang</button>
                        <button onclick="navigateTo('tentang')" class="btn btn-ghost h-16 px-10 rounded-2xl font-black uppercase tracking-widest border-base-content/10 hover:bg-base-content/5 transition-all duration-300 text-base-content">Pelajari Misi</button>
                    </div>
                </div>
                <div class="flex-1 hidden lg:block animate-in fade-in zoom-in duration-1000">
                    <div class="relative group">
                        <div class="absolute -inset-10 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-700"></div>
                        <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&auto=format&fit=crop" 
                             alt="Kebaikan Sosial" 
                             class="relative rounded-[4rem] shadow-2xl border border-white/20 aspect-[4/3] object-cover w-full transition-all duration-700 group-hover:scale-[1.02] group-hover:rotate-0" />
                    </div>
                </div>
            </div>
        </section>

        <!-- --- SECTION 2: QUICK CATEGORIES --- -->
        <section class="py-12 border-b border-base-content/5 bg-base-100">
            <div class="container mx-auto px-4 md:px-10 lg:px-16">
                <div class="flex items-center justify-between overflow-x-auto gap-4 md:gap-8 no-scrollbar py-2">
                    ${[
                      { name: "Medis", icon: "🏥" },
                      { name: "Pendidikan", icon: "🎓" },
                      { name: "Bencana", icon: "🌋" },
                      { name: "Lingkungan", icon: "🌱" },
                      { name: "Sosial", icon: "🤝" },
                    ]
                      .map(
                        (cat) => `
                        <button onclick="navigateTo('kampanye')" class="flex flex-col items-center gap-3 group flex-shrink-0">
                            <div class="w-16 h-16 md:w-20 md:h-20 bg-base-200 rounded-[1.5rem] flex items-center justify-center text-3xl group-hover:bg-primary group-hover:text-white group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-500 group-active:scale-90">
                                ${cat.icon}
                            </div>
                            <span class="text-[10px] font-black uppercase tracking-widest opacity-40 group-hover:opacity-100 transition-opacity text-base-content">${cat.name}</span>
                        </button>
                    `,
                      )
                      .join("")}
                </div>
            </div>
        </section>

        <!-- --- SECTION 3: MENDESAK DIBANTU --- -->
        <section class="py-20 md:py-32 bg-base-200/30">
            <div class="container mx-auto px-4 md:px-10 lg:px-16">
                <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6 text-left">
                    <div class="space-y-3">
                        <div class="inline-block px-3 py-1 bg-error/10 text-error rounded-lg text-[10px] font-black uppercase tracking-widest border border-error/10 animate-pulse">Kritis & Segera</div>
                        <h2 class="text-4xl md:text-5xl font-black uppercase tracking-tighter font-poppins leading-none text-base-content">Sisa Waktu <br/> <span class="text-primary font-black font-poppins">Tersedikit.</span></h2>
                        <p class="text-sm opacity-50 font-medium text-base-content">Bantu mereka sebelum waktu penggalangan dana berakhir.</p>
                    </div>
                    <button onclick="navigateTo('kampanye')" class="btn btn-ghost rounded-2xl font-black uppercase tracking-widest text-[10px] px-8 border-base-content/10 hover:bg-primary hover:text-white hover:border-primary transition-all duration-300 text-base-content">Lihat Semua Program →</button>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
                    ${urgentCampaigns
                      .map((k) =>
                        KampanyeCard({
                          ...k,
                          author: k.author || "KitaPeduli",
                        }),
                      )
                      .join("")}
                </div>
            </div>
        </section>

        <!-- --- SECTION 4: CARA BERBAGI (Fixed Hover Contrast) --- -->
        <section class="py-24 bg-base-100">
            <div class="container mx-auto px-4 md:px-10 lg:px-16 text-center space-y-20">
                <div class="max-w-2xl mx-auto space-y-4 text-center">
                    <h2 class="text-3xl md:text-5xl font-black uppercase tracking-tighter font-poppins text-base-content">Cara Mudah <span class="text-primary font-black">Membantu</span></h2>
                    <p class="opacity-50 font-medium text-base-content">Hanya butuh beberapa menit untuk menyelamatkan satu nyawa.</p>
                </div>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
                    <!-- Step 1 -->
                    <div class="group flex flex-col items-center space-y-6">
                        <!-- FIX: group-hover menggunakan bg-primary solid dan text-white untuk kontras maksimal -->
                        <div class="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner font-poppins font-black text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40 border-2 border-transparent group-hover:border-white/20">01</div>
                        <div class="space-y-2">
                            <h4 class="text-xl font-black uppercase tracking-tight text-base-content">Pilih Program</h4>
                            <p class="text-sm opacity-60 leading-relaxed font-medium text-base-content">Temukan kampanye yang sesuai dengan panggilan hati Anda.</p>
                        </div>
                    </div>
                    <!-- Step 2 -->
                    <div class="group flex flex-col items-center space-y-6">
                        <div class="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner font-poppins font-black text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40 border-2 border-transparent group-hover:border-white/20">02</div>
                        <div class="space-y-2">
                            <h4 class="text-xl font-black uppercase tracking-tight text-base-content">Donasi Online</h4>
                            <p class="text-sm opacity-60 leading-relaxed font-medium text-base-content">Lakukan transaksi dengan berbagai metode pembayaran aman.</p>
                        </div>
                    </div>
                    <!-- Step 3 -->
                    <div class="group flex flex-col items-center space-y-6">
                        <div class="w-24 h-24 bg-primary/10 rounded-[2.5rem] flex items-center justify-center text-4xl shadow-inner font-poppins font-black text-primary transition-all duration-500 group-hover:bg-primary group-hover:text-primary group-hover:scale-110 group-hover:shadow-2xl group-hover:shadow-primary/40 border-2 border-transparent group-hover:border-white/20">03</div>
                        <div class="space-y-2">
                            <h4 class="text-xl font-black uppercase tracking-tight text-base-content">Pantau Dampak</h4>
                            <p class="text-sm opacity-60 leading-relaxed font-medium text-base-content">Dapatkan update berkala mengenai penyaluran bantuan Anda.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- --- SECTION 5: PARTNERS --- -->
        <section class="py-20 bg-base-200/50 opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 border-y border-base-content/5">
            <div class="container mx-auto px-4 md:px-10 lg:px-16 text-center space-y-12">
                <p class="text-[10px] font-black uppercase tracking-[0.5em] text-center text-base-content">Telah Dipercaya & Diliput Oleh</p>
                <div class="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-60 text-base-content ">
                    <div class="flex items-center gap-2 font-black text-xl opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer"><span class="text-primary text-2xl">⚡</span> MEDIA BALI</div>
                    <div class="flex items-center gap-2 font-black text-xl opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer"><span class="text-primary text-2xl">🌐</span> TECH INDO</div>
                    <div class="flex items-center gap-2 font-black text-xl opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer"><span class="text-primary text-2xl">📈</span> BIZ DAILY</div>
                    <div class="flex items-center gap-2 font-black text-xl opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700 cursor-pointer"><span class="text-primary text-2xl">🕊️</span> CHARITY NET</div>
                </div>
            </div>
        </section>

        <!-- --- SECTION 6: FINAL CTA --- -->
        <section class="py-32">
            <div class="container mx-auto px-4 md:px-10 lg:px-16">
                <div class="bg-primary text-primary-content rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_-20px_rgba(2,132,199,0.3)] mx-auto group border-none">
                    <div class="relative z-10 space-y-10">
                        <h2 class="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] uppercase font-poppins transition-transform duration-700 group-hover:scale-[1.02] text-white">
                            Mari Berbagi <br/><span class="opacity-50 font-black">Sekarang.</span>
                        </h2>
                        <p class="opacity-70 max-w-xl mx-auto font-bold text-lg md:text-xl leading-relaxed tracking-tight text-white">
                            Tidak ada kebaikan yang terlalu kecil. Setiap bantuan Anda adalah harapan baru bagi mereka yang membutuhkan.
                        </p>
                        <div class="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                            <button onclick="navigateTo('kampanye')" class="btn bg-white text-primary border-none hover:bg-base-200 hover:scale-110 px-12 md:px-20 rounded-full font-black h-20 text-xl md:text-2xl shadow-2xl active:scale-95 transition-all duration-300 font-poppins">Donasi Sekarang</button>
                        </div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none"></div>
                </div>
            </div>
        </section>

    </div>
  `;
};

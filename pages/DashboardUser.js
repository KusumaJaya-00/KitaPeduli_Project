import { database, getCurrentUser } from "../assets/js/data.js";

/**
 * KOMPONEN DASHBOARD USER
 * Narasi Presentasi: 
 * "Halaman ini adalah pusat kontrol personal bagi donatur. Kami menggunakan arsitektur 
 * fungsional untuk memastikan data yang ditampilkan selalu akurat dan responsif."
 */
export const DashboardUser = () => {
  // 1. AUTHENTICATION CHECK
  const user = getCurrentUser();

  if (!user) {
    setTimeout(() => { window.location.hash = "#login"; }, 100);
    return `<div class="p-20 text-center font-bold text-base-content">Mengalihkan ke Login...</div>`;
  }

  // 2. DATA PROCESSING & SYNC
  const currentDB = JSON.parse(localStorage.getItem("charity_db")) || database;
  const allDonations = Array.isArray(currentDB.donasi) ? currentDB.donasi : [];
  
  // 3. FILTERING LOGIC
  const userDonations = allDonations.filter(d => 
    String(d.donaturName).toLowerCase() === String(user.name).toLowerCase() || 
    (d.userId && String(d.userId) === String(user.id))
  );

  // 4. AGGREGATION (Total Calculation)
  const totalDonasiValue = userDonations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

  /**
   * RENDERER: RIWAYAT TRANSAKSI
   */
  const renderRiwayat = () => {
    if (userDonations.length === 0) {
      return `
        <div class="flex flex-col items-center justify-center py-12 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
            <p class="text-sm font-semibold opacity-60 italic font-poppins text-center text-base-content">Belum ada riwayat aktivitas tercatat.</p>
        </div>
      `;
    }

    return userDonations.map(d => {
      const kmp = (currentDB.kampanye || []).find(k => k.id == d.campaignId);
      return `
        <div class="flex items-center justify-between p-5 bg-base-100 hover:bg-base-200/50 border border-base-300 rounded-2xl transition-all duration-200 shadow-sm">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shadow-inner">
                    <i class="fas fa-hand-holding-heart text-lg"></i>
                </div>
                <div>
                    <h4 class="font-bold text-sm text-base-content line-clamp-1">${kmp ? kmp.title : 'Donasi Umum'}</h4>
                    <span class="text-[11px] text-base-content/70 font-bold uppercase tracking-tighter">${d.date || 'Baru saja'}</span>
                </div>
            </div>
            <div class="text-right">
                <p class="font-black text-base text-base-content">Rp ${Number(d.amount).toLocaleString('id-ID')}</p>
                <span class="badge badge-success badge-sm font-black text-[9px] py-3 px-3">BERHASIL</span>
            </div>
        </div>
      `;
    }).reverse().join("");
  };

  /**
   * UI STRUCTURE (Bento Grid Design)
   */
  return `
    <div class="min-h-screen bg-base-200/50 text-base-content font-inter text-left pb-20">
        <div class="container mx-auto max-w-6xl px-6 py-10">
            
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                <!-- User Welcome -->
                <div class="md:col-span-2 bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm flex flex-col justify-between min-h-[220px]">
                    <div>
                        <div class="flex items-center gap-2 mb-4">
                             <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                             <span class="text-[11px] font-black text-primary uppercase tracking-[0.2em]">Panel Donatur Aktif</span>
                        </div>
                        <h1 class="text-4xl font-black text-base-content tracking-tight font-poppins">Halo, ${user.name}!</h1>
                        <p class="text-sm text-base-content/80 mt-3 font-medium leading-relaxed max-w-xs">Terima kasih telah terus menjadi jembatan kebaikan.</p>
                    </div>
                    <div class="flex gap-3 mt-8">
                        <button onclick="navigateTo('kampanye')" class="btn btn-primary btn-md rounded-2xl px-8 normal-case font-black shadow-lg shadow-primary/20">Donasi Lagi</button>
                    </div>
                </div>

                <!-- Financial Stats Card -->
                <div class="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2.5rem] border border-emerald-200 dark:border-emerald-500/20 flex flex-col justify-between shadow-sm">
                    <div class="w-12 h-12 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                        <i class="fas fa-wallet text-lg"></i>
                    </div>
                    <div>
                        <p class="text-[11px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1">Total Donasi</p>
                        <h2 class="text-2xl font-black text-emerald-800 dark:text-emerald-300 tracking-tighter font-poppins">Rp ${totalDonasiValue.toLocaleString('id-ID')}</h2>
                    </div>
                </div>

                <!-- Activity Stats Card -->
                <div class="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border border-blue-200 dark:border-blue-500/20 flex flex-col justify-between shadow-sm">
                    <div class="w-12 h-12 bg-blue-500 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                        <i class="fas fa-award text-lg"></i>
                    </div>
                    <div>
                        <p class="text-[11px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-1">Total Aksi</p>
                        <h2 class="text-2xl font-black text-blue-800 dark:text-blue-300 tracking-tighter font-poppins">${userDonations.length} Program</h2>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                
                <!-- Histori Section -->
                <div class="lg:col-span-2">
                    <div class="flex items-center justify-between mb-8 px-2">
                        <div class="flex items-center gap-3">
                            <div class="w-1 h-6 bg-primary rounded-full"></div>
                            <h3 class="text-xs font-black font-poppins tracking-[0.15em] uppercase text-base-content/60">Riwayat Kontribusi Terbaru</h3>
                        </div>
                    </div>
                    <div class="space-y-4">
                        ${renderRiwayat()}
                    </div>
                </div>

                <!-- Sidebar Section -->
                <div class="space-y-8">
                    <!-- Motivasi Section: User Engagement -->
                    <div class="bg-neutral text-neutral-content p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
                        <div class="relative z-10">
                            <span class="text-primary font-black text-[10px] uppercase tracking-widest">Inspirasi Hari Ini</span>
                            <p class="text-sm font-bold text-neutral-content/90 mt-5 leading-relaxed font-poppins italic">"Tangan yang memberi lebih mulia daripada tangan yang menerima."</p>
                            <div class="mt-8 pt-6 border-t border-neutral-content/10 flex items-center gap-3">
                                <div class="w-8 h-8 rounded-full bg-base-content/10 flex items-center justify-center">
                                    <i class="fas fa-heart text-primary text-xs"></i>
                                </div>
                                <span class="text-[10px] font-black uppercase tracking-tighter opacity-60">Komunitas Peduli Sesama</span>
                            </div>
                        </div>
                        <i class="fas fa-quote-right absolute -right-6 -bottom-6 text-9xl text-white/5"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
  `;
};
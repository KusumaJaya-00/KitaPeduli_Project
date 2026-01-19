import { database, getCurrentUser } from "../assets/js/data.js";

/**
 * Dashboard User Component (Vanilla JS)
 * Menampilkan aktivitas personal, statistik, dan riwayat donasi.
 */
export const DashboardUser = () => {
    // 1. AMBIL DATA TERBARU DARI STORAGE (Sangat Penting)
    // Kita tidak hanya mengandalkan objek 'database' dari data.js karena objek tersebut 
    // mungkin belum terupdate di sesi ini jika tidak di-refresh manual.
    const storageData = JSON.parse(localStorage.getItem("charity_db"));
    
    // Gunakan donasi dari storage jika ada, jika tidak gunakan dari data.js
    const allDonations = storageData ? storageData.donasi : (database.donasi || []);
    const user = getCurrentUser();

    // Proteksi Halaman: Jika belum login, arahkan ke login
    if (!user) {
        setTimeout(() => window.navigateTo("login"), 100);
        return `<div class="p-20 text-center font-bold">Mengarahkan ke Login...</div>`;
    }

    // 2. FILTER DONASI BERDASARKAN USER ID
    // Gunakan == (double equals) untuk menghindari masalah tipe data String vs Number
    const userDonations = allDonations.filter(d => String(d.userId) === String(user.id));
    
    // 3. HITUNG STATISTIK SECARA REAL-TIME
    const totalDonasi = userDonations.reduce((acc, curr) => acc + (parseInt(curr.amount) || 0), 0);
    const kampanyeTerbantu = new Set(userDonations.map(d => d.kampanyeId)).size;
    
    // Poin Kebaikan (Logic: 1 Poin per Rp 10.000)
    const poinKebaikan = Math.floor(totalDonasi / 10000);
    const badgeLevel = totalDonasi > 1000000 ? "Hero" : totalDonasi > 0 ? "Pejuang Kebaikan" : "Calon Donatur";

    // Formatter Rupiah
    const formatIDR = (num) => new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0
    }).format(num);

    // --- TEMPLATE COMPONENTS ---

    const StatCard = (title, value, icon, colorClass, subtitle = "") => `
        <div class="bg-base-100 p-6 rounded-[2rem] shadow-sm border border-base-content/5 flex items-center gap-5 hover:shadow-md transition-all group">
            <div class="p-4 rounded-2xl ${colorClass} group-hover:scale-110 transition-transform">
                <i class="ph-bold ${icon} text-2xl"></i>
            </div>
            <div>
                <p class="text-[10px] uppercase tracking-widest opacity-50 font-black">${title}</p>
                <h3 class="text-2xl font-black italic font-poppins text-base-content">${value}</h3>
                ${subtitle ? `<p class="text-[9px] font-bold text-primary uppercase mt-1">${subtitle}</p>` : ""}
            </div>
        </div>
    `;

    const EmptyState = () => `
        <div class="flex flex-col items-center justify-center py-20 text-center animate-fade-in">
            <div class="bg-primary/10 p-8 rounded-full mb-6 text-primary">
                <i class="ph-bold ph-package text-6xl"></i>
            </div>
            <h3 class="text-2xl font-black italic font-poppins mb-2 text-base-content">Belum Ada Aksi Kebaikan</h3>
            <p class="text-base-content/60 max-w-sm mb-8 font-medium italic">
                Kamu belum memulai aksi kebaikan, yuk jelajahi kampanye sekarang dan buat perubahan pertama kamu!
            </p>
            <button onclick="navigateTo('kampanye')" class="btn btn-primary px-10 rounded-2xl shadow-lg shadow-primary/20 font-black italic normal-case">
                Jelajahi Kampanye
            </button>
        </div>
    `;

    const DonationRow = (item) => `
        <tr class="hover:bg-base-200/40 transition-colors border-none group">
            <td class="pl-8 py-6 text-sm font-bold opacity-60 text-base-content">
                ${new Date(item.date || Date.now()).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
            </td>
            <td>
                <div class="font-black text-base-content group-hover:text-primary cursor-pointer transition-colors">
                    ${item.campaignName || "Kampanye Sosial"}
                </div>
                <p class="text-[10px] uppercase font-black opacity-20 tracking-tighter mt-1">ID: ${item.id}</p>
            </td>
            <td class="font-black text-lg text-primary">${formatIDR(item.amount)}</td>
            <td>
                <div class="badge badge-success bg-success/10 text-success border-none font-black italic px-4 py-3">
                    Berhasil
                </div>
            </td>
            <td class="text-center pr-8">
                <button onclick="alert('Mencetak Resi ${item.id}')" class="btn btn-ghost btn-sm text-primary gap-2 font-black italic hover:bg-primary/10 rounded-xl">
                    <i class="ph-bold ph-printer"></i> Resi
                </button>
            </td>
        </tr>
    `;

    return `
        <div class="min-h-screen bg-base-200/30 pb-20 font-inter text-base-content">
            <main class="max-w-6xl mx-auto px-6 pt-12">
                <!-- Profile Section -->
                <div class="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between mb-12 animate-fade-in">
                    <div class="flex items-center gap-6">
                        <div class="avatar">
                            <div class="w-24 h-24 rounded-[2.5rem] shadow-xl ring ring-primary/10 ring-offset-2 overflow-hidden bg-base-100">
                                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}" alt="Avatar" />
                            </div>
                        </div>
                        <div>
                            <p class="text-[10px] font-black opacity-30 uppercase tracking-[0.2em] mb-1">Profil Donatur</p>
                            <h1 class="text-3xl font-black font-poppins italic tracking-tighter mb-2 flex items-center gap-2 text-base-content">
                                ${user.name}
                                <i class="ph-fill ph-seal-check text-primary"></i>
                            </h1>
                            <div class="flex gap-2">
                                <span class="badge badge-primary font-black italic py-3 px-4 rounded-xl shadow-sm text-white border-none">
                                    ${badgeLevel}
                                </span>
                                <span class="badge bg-base-100 border-base-content/10 font-black italic py-3 px-4 rounded-xl text-base-content opacity-70">
                                    #${user.id}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div class="flex gap-3">
                        <button onclick="navigateTo('kampanye')" class="btn btn-primary rounded-2xl px-8 font-black italic shadow-lg shadow-primary/20 text-white border-none">Donasi Lagi</button>
                    </div>
                </div>

                <!-- Stats Grid -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    ${StatCard("Total Kontribusi", formatIDR(totalDonasi), "ph-heart", "bg-red-500/10 text-red-500")}
                    ${StatCard("Program Terbantu", `${kampanyeTerbantu} Kampanye`, "ph-megaphone", "bg-primary/10 text-primary")}
                    ${StatCard("Poin Kebaikan", `${poinKebaikan} Poin`, "ph-sparkle", "bg-amber-500/10 text-amber-500", "Yuk kumpulkan lebih banyak poin!")}
                </div>

                <!-- Donation History Card -->
                <div class="bg-base-100 rounded-[2.5rem] shadow-2xl shadow-base-content/5 border border-base-content/5 overflow-hidden">
                    <div class="p-8 border-b border-base-content/5 flex flex-col md:flex-row justify-between items-center gap-4">
                        <div>
                            <h2 class="text-2xl font-black font-poppins italic tracking-tight mb-1 text-base-content">Riwayat Donasi</h2>
                            <p class="text-sm opacity-50 font-medium italic font-inter text-base-content">Laporan aktivitas kontribusi Anda.</p>
                        </div>
                    </div>

                    <div class="p-0 overflow-x-auto">
                        ${userDonations.length > 0 ? `
                            <table class="table table-lg w-full">
                                <thead class="bg-base-200/50">
                                    <tr class="border-none">
                                        <th class="font-black text-[11px] uppercase tracking-widest opacity-40 py-6 pl-8 text-base-content">Tanggal</th>
                                        <th class="font-black text-[11px] uppercase tracking-widest opacity-40 text-base-content">Kampanye</th>
                                        <th class="font-black text-[11px] uppercase tracking-widest opacity-40 text-base-content">Nominal</th>
                                        <th class="font-black text-[11px] uppercase tracking-widest opacity-40 text-center text-base-content">Status</th>
                                        <th class="font-black text-[11px] uppercase tracking-widest opacity-40 text-center pr-8 text-base-content">Aksi</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-base-content/5">
                                    ${userDonations.slice().reverse().map(d => DonationRow(d)).join('')}
                                </tbody>
                            </table>
                        ` : EmptyState()}
                    </div>
                </div>
            </main>
        </div>
    `;
};
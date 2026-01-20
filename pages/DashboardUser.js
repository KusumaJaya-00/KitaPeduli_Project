import { database, getCurrentUser } from "../assets/js/data.js";
import { AlertMessage } from "../components/AlertMessage.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";

/**
 * KOMPONEN DASHBOARD USER
 * Fitur: Ringkasan Donasi, Manajemen Kampanye (Relawan), dan Penarikan Dana.
 */

let selectedWithdrawMethod = null;

export const DashboardUser = () => {
    const user = getCurrentUser();

    // Proteksi Halaman
    if (!user) {
        setTimeout(() => { 
            if (window.navigateTo) window.navigateTo("login");
            else window.location.hash = "#login"; 
        }, 100);
        return `<div class="p-20 text-center font-bold text-base-content">Mengalihkan ke Login...</div>`;
    }

    // Ambil data terbaru dari LocalStorage untuk konsistensi
    const currentDB = JSON.parse(localStorage.getItem("charity_db")) || database;
    const allDonations = Array.isArray(currentDB.donasi) ? currentDB.donasi : [];
    const allCampaigns = Array.isArray(currentDB.kampanye) ? currentDB.kampanye : [];
    const allRelawan = Array.isArray(currentDB.relawan) ? currentDB.relawan : [];
    const allWithdrawals = Array.isArray(currentDB.penarikan) ? currentDB.penarikan : [];

    const dataRelawan = allRelawan.find(r => r.userId === user.id);
    const isApprovedRelawan = dataRelawan && dataRelawan.status === "approved";

    const userDonations = allDonations.filter(d => 
        String(d.donaturName).toLowerCase() === String(user.name).toLowerCase() || 
        (d.userId && d.userId === user.id)
    );

    const myCampaigns = allCampaigns.filter(k => 
        k.authorId === user.id || 
        (k.author && String(k.author).toLowerCase() === String(user.name).toLowerCase())
    );

    const totalDonasiValue = userDonations.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    const renderRiwayat = () => {
        if (userDonations.length === 0) {
            return `
                <div class="flex flex-col items-center justify-center py-12 bg-base-200/50 rounded-3xl border-2 border-dashed border-base-300">
                    <p class="text-sm font-semibold opacity-60 italic font-poppins text-center text-base-content">Belum ada riwayat aktivitas.</p>
                </div>
            `;
        }
        return userDonations.map(d => {
            const kmp = allCampaigns.find(k => k.id == d.campaignId);
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

    const renderMyCampaigns = () => {
        if (!isApprovedRelawan) return "";
        return `
            <div class="mb-10 animate-in fade-in slide-in-from-bottom-4 duration-700 text-left">
                <div class="flex items-center justify-between mb-6 px-2">
                    <div class="flex items-center gap-3">
                        <div class="w-1 h-6 bg-emerald-500 rounded-full"></div>
                        <h3 class="text-xs font-black font-poppins tracking-[0.15em] uppercase text-base-content/60">Manajemen Kampanye Saya</h3>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${myCampaigns.map(k => {
                        // --- LOGIKA HITUNG SALDO DI DASHBOARD USER ---
                        
                        // 1. Total Masuk
                        const raised = allDonations
                            .filter(d => String(d.campaignId) === String(k.id))
                            .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);
                        
                        // 2. Total Penarikan yang di-ACC
                        const withdrawn = allWithdrawals
                            .filter(w => String(w.campaignId) === String(k.id) && w.status === 'approved')
                            .reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

                        // 3. Saldo Bersih (Inilah yang ditampilkan di tombol Tarik Dana)
                        const currentBalance = raised - withdrawn;

                        return `
                            <div class="bg-base-100 p-6 rounded-[2rem] border border-base-300 shadow-sm group hover:border-emerald-500/30 transition-all">
                                <div class="flex justify-between items-start mb-4">
                                    <h4 class="font-bold text-sm text-base-content line-clamp-1">${k.title}</h4>
                                    <span class="badge badge-ghost badge-xs py-2 px-3 text-[9px] font-black uppercase tracking-tighter">${k.category || 'Umum'}</span>
                                </div>
                                <div class="flex justify-between items-end">
                                    <div>
                                        <p class="text-[10px] font-bold text-base-content/50 uppercase tracking-widest">Dana Terkumpul</p>
                                        <p class="text-xl font-black text-emerald-600">Rp ${currentBalance.toLocaleString('id-ID')}</p>
                                    </div>
                                    <button onclick="openWithdrawModal('${k.id}', '${k.title.replace(/'/g, "\\'")}', ${currentBalance})" 
                                        class="btn btn-sm btn-success rounded-xl px-5 normal-case font-black text-white ${currentBalance <= 0 ? 'btn-disabled opacity-50' : ''}">
                                        Tarik Dana
                                    </button>
                                </div>
                            </div>
                        `;
                    }).join("")}
                </div>
            </div>
        `;
    };

    return `
        <div class="min-h-screen bg-base-200/50 text-base-content font-inter text-left pb-20 animate-in fade-in duration-500 relative">
            <div class="container mx-auto max-w-6xl px-6 py-10">
                <!-- Header & Stats -->
                <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
                    <div class="md:col-span-2 bg-base-100 p-8 rounded-[2.5rem] border border-base-300 shadow-sm flex flex-col justify-between min-h-[220px]">
                        <div class="text-left">
                            <div class="flex items-center gap-2 mb-4">
                                 <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                                 <span class="text-[11px] font-black text-primary uppercase tracking-[0.2em]">
                                    ${isApprovedRelawan ? `Relawan Aktif` : 'Dashboard Donatur'}
                                 </span>
                            </div>
                            <h1 class="text-4xl font-black text-base-content tracking-tight font-poppins">Halo, ${user.name}!</h1>
                            <p class="text-sm text-base-content/80 mt-3 font-medium leading-relaxed max-w-xs text-left">
                                Selamat datang kembali di panel kendali aksi kebaikan Anda.
                            </p>
                        </div>
                        <div class="flex gap-3 mt-8">
                            <button onclick="window.navigateTo('kampanye')" class="btn btn-primary btn-md rounded-2xl px-8 normal-case font-black shadow-lg shadow-primary/20">Cari Program</button>
                            <button onclick="window.navigateTo('relawan')" class="btn btn-outline ${isApprovedRelawan ? 'btn-success' : ''} btn-md rounded-2xl px-8 normal-case font-black">
                                ${isApprovedRelawan ? 'Kelola Program' : 'Daftar Relawan'}
                            </button>
                        </div>
                    </div>

                    <div class="bg-emerald-50 dark:bg-emerald-900/10 p-8 rounded-[2.5rem] border border-emerald-200 dark:border-emerald-500/20 flex flex-col justify-between shadow-sm">
                        <div class="w-10 h-10 bg-emerald-500 text-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-wallet"></i>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-widest mb-1">Total Donasi</p>
                            <h2 class="text-2xl font-black text-emerald-800 dark:text-emerald-300 font-poppins">Rp ${totalDonasiValue.toLocaleString('id-ID')}</h2>
                        </div>
                    </div>

                    <div class="bg-blue-50 dark:bg-blue-900/10 p-8 rounded-[2.5rem] border border-blue-200 dark:border-blue-500/20 flex flex-col justify-between shadow-sm">
                        <div class="w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center">
                            <i class="fas fa-award"></i>
                        </div>
                        <div>
                            <p class="text-[10px] font-black text-blue-700 dark:text-blue-400 uppercase tracking-widest mb-1">Aksi Kebaikan</p>
                            <h2 class="text-2xl font-black text-blue-800 dark:text-blue-300 font-poppins">${userDonations.length}</h2>
                        </div>
                    </div>
                </div>

                ${renderMyCampaigns()}

                <!-- Riwayat & Info Section -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    <div class="lg:col-span-2">
                        <div class="flex items-center gap-3 mb-8 px-2">
                            <div class="w-1 h-6 bg-primary rounded-full"></div>
                            <h3 class="text-xs font-black font-poppins tracking-[0.15em] uppercase text-base-content/60">Riwayat Terakhir</h3>
                        </div>
                        <div class="space-y-4">
                            ${renderRiwayat()}
                        </div>
                    </div>
                    <div>
                         <div class="bg-neutral text-neutral-content p-8 rounded-[2.5rem] shadow-xl relative overflow-hidden">
                            <span class="text-primary font-black text-[10px] uppercase tracking-widest">Quote Hari Ini</span>
                            <p class="text-sm font-bold mt-5 leading-relaxed font-poppins italic">"Tangan di atas lebih baik daripada tangan di bawah."</p>
                            <i class="fas fa-heart absolute -right-4 -bottom-4 text-7xl opacity-10"></i>
                        </div>
                    </div>
                </div>
            </div>

            <!-- MODAL WITHDRAW UNIFIED -->
            <input type="checkbox" id="withdraw-modal-toggle" class="modal-toggle" />
            <div class="modal modal-bottom sm:modal-middle text-left">
                <div class="modal-box bg-base-100 rounded-[2.5rem] p-0 overflow-hidden border border-base-300 shadow-2xl max-w-lg">
                    <div class="p-8 bg-emerald-600 text-white">
                         <div class="flex justify-between items-center mb-2">
                            <h3 class="font-black text-xl tracking-tight uppercase font-poppins">Tarik Dana Kampanye</h3>
                            <label for="withdraw-modal-toggle" class="btn btn-sm btn-circle btn-ghost text-white">✕</label>
                        </div>
                        <p id="withdraw-campaign-name" class="font-bold text-xs opacity-80 truncate"></p>
                    </div>

                    <div class="p-8 max-h-[70vh] overflow-y-auto">
                        <div class="bg-emerald-50 p-4 rounded-2xl mb-6 border border-emerald-100 flex justify-between items-center">
                            <span class="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Saldo Terkumpul:</span>
                            <span id="withdraw-max-amount-label" class="font-black text-emerald-700">Rp 0</span>
                        </div>

                        <div class="form-control w-full mb-8">
                            <label class="label"><span class="label-text font-black text-[10px] uppercase opacity-50 tracking-widest">Nominal Penarikan</span></label>
                            <div class="relative">
                                <span class="absolute left-5 top-1/2 -translate-y-1/2 font-black text-emerald-600">Rp</span>
                                <input type="number" id="withdraw-input-amount" class="input input-bordered w-full h-16 rounded-2xl pl-12 font-black text-xl focus:border-emerald-500" placeholder="0" />
                            </div>
                            <label class="label"><span class="label-text-alt text-error font-bold hidden" id="withdraw-error-msg">Melebihi saldo!</span></label>
                        </div>

                        <div class="mb-8">
                            <label class="label mb-2"><span class="label-text font-black text-[10px] uppercase opacity-50 tracking-widest">Tujuan Penarikan</span></label>
                            <div class="grid grid-cols-1 gap-2">
                                <button id="method-bca" onclick="selectWithdrawMetode('Bank BCA', '🏦', 'method-bca')" 
                                    class="method-btn flex items-center justify-between p-4 bg-base-100 border border-base-300 rounded-2xl hover:border-emerald-500 transition-all group">
                                    <div class="flex items-center gap-4">
                                        <div class="w-10 h-10 rounded-xl bg-base-200 flex items-center justify-center text-xl">🏦</div>
                                        <div class="text-left">
                                            <p class="font-black text-xs uppercase tracking-tight">Bank BCA</p>
                                            <p class="text-[9px] font-bold opacity-50 uppercase">Transfer Manual</p>
                                        </div>
                                    </div>
                                    <div class="check-icon hidden text-emerald-500"><i class="fas fa-check-circle"></i></div>
                                </button>
                                
                                <div class="grid grid-cols-2 gap-2">
                                    <button id="method-gopay" onclick="selectWithdrawMetode('GoPay', '🛒', 'method-gopay')" 
                                        class="method-btn flex flex-col items-center gap-2 p-4 bg-base-100 border border-base-300 rounded-2xl hover:border-emerald-500 transition-all group">
                                        <span class="text-2xl">🛒</span>
                                        <span class="font-black text-[10px] uppercase">GoPay</span>
                                        <div class="check-icon hidden text-emerald-500"><i class="fas fa-check-circle"></i></div>
                                    </button>
                                    <button id="method-ovo" onclick="selectWithdrawMetode('OVO', '💎', 'method-ovo')" 
                                        class="method-btn flex flex-col items-center gap-2 p-4 bg-base-100 border border-base-300 rounded-2xl hover:border-emerald-500 transition-all group">
                                        <span class="text-2xl">💎</span>
                                        <span class="font-black text-[10px] uppercase">OVO</span>
                                        <div class="check-icon hidden text-emerald-500"><i class="fas fa-check-circle"></i></div>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div id="btn-withdraw-container" class="grid grid-cols-2 gap-3 mt-4">
                            <label for="withdraw-modal-toggle" class="btn btn-ghost h-14 rounded-2xl font-black uppercase text-xs">Batal</label>
                            <button onclick="processWithdrawal()" class="btn btn-success h-14 rounded-2xl font-black uppercase text-xs text-white shadow-lg shadow-emerald-500/20">Konfirmasi Tarik</button>
                        </div>
                    </div>
                    <input type="hidden" id="withdraw-campaign-id" /><input type="hidden" id="withdraw-max-amount" />
                </div>
            </div>
        </div>
    `;
};

// --- LOGIKA HELPER & EVENT HANDLER ---

const showAlert = (message, type = "success") => {
    document.body.insertAdjacentHTML('beforeend', AlertMessage({ message, type }));
};

window.openWithdrawModal = (id, title, maxAmount) => {
    document.getElementById('withdraw-campaign-id').value = id;
    document.getElementById('withdraw-campaign-name').innerText = title;
    document.getElementById('withdraw-max-amount').value = maxAmount;
    document.getElementById('withdraw-max-amount-label').innerText = `Rp ${maxAmount.toLocaleString('id-ID')}`;
    document.getElementById('withdraw-input-amount').value = '';
    document.getElementById('withdraw-error-msg').classList.add('hidden');
    
    selectedWithdrawMethod = null;
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'ring-2', 'ring-emerald-500/20');
        btn.querySelector('.check-icon').classList.add('hidden');
    });

    document.getElementById('withdraw-modal-toggle').checked = true;
};

window.selectWithdrawMetode = (nama, emoji, btnId) => {
    selectedWithdrawMethod = nama;
    document.querySelectorAll('.method-btn').forEach(btn => {
        btn.classList.remove('border-emerald-500', 'bg-emerald-50', 'ring-2', 'ring-emerald-500/20');
        btn.querySelector('.check-icon').classList.add('hidden');
    });
    const activeBtn = document.getElementById(btnId);
    activeBtn.classList.add('border-emerald-500', 'bg-emerald-50', 'ring-2', 'ring-emerald-500/20');
    activeBtn.querySelector('.check-icon').classList.remove('hidden');
};

// --- PERBAIKAN UTAMA: SIMPAN KE DATABASE LOKAL ---
window.processWithdrawal = () => {
    const max = Number(document.getElementById('withdraw-max-amount').value);
    const amount = Number(document.getElementById('withdraw-input-amount').value);
    const campaignId = document.getElementById('withdraw-campaign-id').value;
    const campaignTitle = document.getElementById('withdraw-campaign-name').innerText;
    const btnContainer = document.getElementById('btn-withdraw-container');

    if (!amount || amount <= 0 || amount > max) {
        showAlert(amount > max ? "Nominal melebihi saldo!" : "Masukkan nominal valid!", "error");
        return;
    }

    if (!selectedWithdrawMethod) {
        showAlert("Pilih metode penarikan!", "error");
        return;
    }

    const originalHTML = btnContainer.innerHTML;
    btnContainer.innerHTML = `
        <div class="col-span-2 py-4 flex items-center justify-center">
            ${LoadingSpinner({ size: "sm", color: "emerald-600" })} 
            <span class="ml-3 font-black text-[10px] uppercase text-emerald-600 tracking-widest">Sinkronisasi Ke ${selectedWithdrawMethod}...</span>
        </div>
    `;

    setTimeout(() => {
        const currentUser = getCurrentUser();
        const newWithdrawal = {
            id: `WD-${Date.now()}`,
            campaignId: campaignId,
            campaignTitle: campaignTitle,
            amount: amount,
            method: selectedWithdrawMethod,
            status: "pending",
            date: new Date().toLocaleDateString("id-ID"),
            userId: currentUser?.id
        };

        // 1. Update Global Variable
        if (!database.penarikan) database.penarikan = [];
        database.penarikan.push(newWithdrawal);

        // 2. Update LocalStorage agar Admin bisa baca
        const currentDB = JSON.parse(localStorage.getItem("charity_db")) || database;
        if (!currentDB.penarikan) currentDB.penarikan = [];
        currentDB.penarikan.push(newWithdrawal);
        
        localStorage.setItem("charity_db", JSON.stringify(currentDB));

        document.getElementById('withdraw-modal-toggle').checked = false;
        btnContainer.innerHTML = originalHTML; 
        showAlert(`Berhasil! Penarikan Rp ${amount.toLocaleString('id-ID')} diajukan.`, "success");
        
        // Refresh agar saldo di dashboard langsung berkurang (visual update)
        window.location.reload();
    }, 1500);
};
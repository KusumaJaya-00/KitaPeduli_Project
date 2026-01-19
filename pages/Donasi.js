import { database, getCurrentUser } from "../assets/js/data.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";
import { AlertMessage } from "../components/AlertMessage.js";

let selectedMetode = null;

export const Donasi = (params) => {
    const user = getCurrentUser() || JSON.parse(localStorage.getItem("userLogin"));
    const isUserLoggedIn = !!user;
    const queryId = params?.id || localStorage.getItem("selectedKampanyeId");
    const selectedInitial = database.kampanye.find(k => k.id === queryId);
    const initialTitle = selectedInitial ? selectedInitial.title : "Pilih Program Kebaikan";

    const listRiwayat = database.donasi && database.donasi.length > 0
        ? database.donasi.map((d) => {
            const kmp = database.kampanye.find((k) => k.id == d.campaignId);
            return `
                <div class="flex justify-between items-center p-4 rounded-2xl mb-2 bg-base-200/50 border border-transparent hover:border-primary/20 hover:bg-base-100 transition-all duration-300">
                    <div class="flex items-center gap-4 text-left">
                        <div class="avatar placeholder">
                            <div class="bg-primary/10 text-primary rounded-xl w-12 h-12 border border-primary/20 font-black italic">
                                <span>${(d.donaturName || "S").charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-bold text-sm text-base-content leading-tight">${d.donaturName || "Anonim"}</p>
                            <p class="text-[10px] text-primary font-black uppercase mt-1 line-clamp-1">${kmp ? kmp.title : "Program"}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-sm text-base-content font-poppins italic">Rp ${(d.amount || 0).toLocaleString("id-ID")}</p>
                    </div>
                </div>`;
        }).reverse().slice(0, 10).join("")
        : `<p class="text-center opacity-20 py-20 italic font-bold">Belum ada donasi terkini</p>`;

    return `
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
    
    <div class="container mx-auto py-10 px-4 max-w-6xl font-inter">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            <div class="card bg-base-100 shadow-2xl rounded-[2.5rem] border border-base-content/5 flex flex-col overflow-visible">
                <div class="card-body p-8 md:p-10 flex-grow">
                    <div class="flex items-center gap-4 mb-8 text-left">
                        <div class="w-2.5 h-10 bg-primary rounded-full shadow-lg shadow-primary/40"></div>
                        <h1 class="text-4xl font-black text-base-content tracking-tighter font-poppins uppercase">Kirim Donasi</h1>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Nama Donatur</span></label>
                            
                            <input type="text" id="donasi-nama" 
                                data-original-name="${isUserLoggedIn ? user.name : ''}"
                                value="${isUserLoggedIn ? user.name : ""}" 
                                placeholder="Masukkan nama Anda"
                                class="input input-bordered w-full h-14 rounded-2xl font-bold bg-base-100 focus:input-primary transition-all">
                            
                            <label class="flex items-center gap-2 mt-3 cursor-pointer group w-fit">
                                <input type="checkbox" id="donasi-anonim" class="checkbox checkbox-primary checkbox-sm rounded-lg" onchange="window.toggleAnonim(this)">
                                <span class="text-xs font-bold opacity-40 group-hover:text-primary transition-colors">Sembunyikan nama saya (Anonim)</span>
                            </label>

                            ${isUserLoggedIn ? `<p id="verify-tag" class="text-[10px] mt-2 text-primary font-black flex items-center gap-1"> Akun: ${user.name}</p>` : ''}
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Target Program</span></label>
                            <div class="dropdown dropdown-bottom w-full">
                                <div tabindex="0" role="button" class="btn btn-outline w-full h-14 rounded-2xl justify-between px-6 border-base-content/20 hover:border-primary bg-base-100 normal-case">
                                    <span class="truncate font-bold opacity-80" id="display-campaign">${initialTitle}</span>
                                    <i class="fas fa-chevron-down opacity-30"></i>
                                </div>
                                <ul tabindex="0" class="dropdown-content z-[100] menu p-2 shadow-2xl bg-base-100 rounded-2xl w-full mt-2 max-h-60 overflow-y-auto border border-base-content/10 block">
                                    ${database.kampanye.map(k => `<li><a onclick="window.updateSelectedCampaign('${k.id}', '${k.title.replace(/'/g, "\\'")}')" class="py-3 font-bold mb-1 rounded-xl">${k.title}</a></li>`).join("")}
                                </ul>
                            </div>
                            <input type="hidden" id="donasi-id-kampanye" value="${queryId || ""}">
                        </div>
                        
                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Nominal Donasi</span></label>
                            <div class="relative mb-4">
                                <span class="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary text-2xl font-poppins">Rp</span>
                                <input type="number" id="donasi-nominal" placeholder="0" 
                                    class="input input-bordered w-full h-16 pl-20 pr-6 rounded-3xl font-black text-primary text-2xl font-poppins focus:ring-8 focus:ring-primary/5 transition-all border-2">
                            </div>
                            <div class="grid grid-cols-3 gap-3">
                                ${[10000, 50000, 100000].map(val => `
                                    <button onclick="window.setNominal(${val})" class="btn btn-primary rounded-2xl font-black text-white shadow-lg shadow-primary/20 active:scale-95 transition-all">
                                        Rp ${val/1000}RB
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest opacity-50">Metode Bayar</span></label>
                            <button onclick="window.openPaymentModal()" id="btn-pilih-metode" 
                                class="btn btn-outline border-dashed border-2 w-full h-16 rounded-2xl justify-between px-6 border-base-content/20 hover:border-primary">
                                <span id="text-metode" class="font-bold opacity-40">Pilih Pembayaran...</span>
                                <i class="fas fa-wallet opacity-20"></i>
                            </button>
                        </div>

                        <button onclick="window.prosesDonasi(event)" id="btn-submit-donasi" 
                            class="btn btn-primary text-white w-full h-16 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary/30 mt-4 uppercase tracking-tighter">
                            Konfirmasi Donasi
                        </button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 shadow-xl rounded-[2.5rem] border border-base-content/5 flex flex-col h-full overflow-hidden">
                <div class="card-body p-8 md:p-10 flex flex-col h-full">
                    <div class="flex justify-between items-center mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-2.5 h-10 bg-secondary rounded-full shadow-lg shadow-secondary/40"></div>
                            <h2 class="text-2xl font-black font-poppins tracking-tighter uppercase text-base-content">Donatur Terkini</h2>
                        </div>
                        <span class="badge badge-ghost font-black text-[10px] py-3 uppercase tracking-widest opacity-50">Live</span>
                    </div>
                    <div class="flex-grow overflow-y-auto pr-2 space-y-2 custom-scrollbar" style="max-height: 650px;">
                        ${listRiwayat}
                    </div>
                </div>
            </div>
        </div>

        <div id="payment-modal" class="hidden fixed inset-0 z-[999] bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-base-100 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-base-300 overflow-hidden transform animate-in zoom-in-95 duration-300 text-left">
                <div class="p-6 bg-base-200 flex justify-between items-center border-b border-base-300">
                    <h3 class="font-black text-lg uppercase tracking-tighter font-poppins">Pilih Pembayaran</h3>
                    <button onclick="window.closePaymentModal()" class="btn btn-ghost btn-circle btn-sm">✕</button>
                </div>
                <div class="p-8 space-y-6">
                    <div>
                        <label class="label pt-0"><span class="label-text-alt font-black uppercase opacity-50 tracking-widest text-primary">Transfer Bank</span></label>
                        <select onchange="window.selectMetode(this.value, '🏦')" class="select select-primary select-bordered w-full h-14 rounded-2xl font-bold bg-base-100">
                            <option value="" disabled selected>Pilih Rekening Bank...</option>
                            <option value="Bank BCA">Bank BCA</option>
                            <option value="Bank BRI">Bank BRI</option>
                            <option value="Bank Mandiri">Bank Mandiri</option>
                        </select>
                    </div>
                    <div>
                        <label class="label"><span class="label-text-alt font-black uppercase opacity-50 tracking-widest text-primary">E-Wallet & QRIS</span></label>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="window.selectMetode('Gopay', '📱')" class="btn btn-outline border-base-300 hover:btn-primary rounded-2xl font-black h-14 active:scale-95 flex gap-2">📱 Gopay</button>
                            <button onclick="window.selectMetode('OVO', '📱')" class="btn btn-outline border-base-300 hover:btn-primary rounded-2xl font-black h-14 active:scale-95 flex gap-2">📱 OVO</button>
                            <button onclick="window.selectMetode('Dana', '📱')" class="btn btn-outline border-base-300 hover:btn-primary rounded-2xl font-black h-14 active:scale-95 flex gap-2">📱 Dana</button>
                            <button onclick="window.selectMetode('QRIS', '📸')" class="btn btn-accent btn-outline border-2 rounded-2xl font-black h-14 active:scale-95 flex gap-2">📸 QRIS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};

// --- LOGIKA GLOBAL ---
window.toggleAnonim = (el) => {
    const inputNama = document.getElementById("donasi-nama");
    const originalName = inputNama.getAttribute("data-original-name");

    if (el.checked) {
        inputNama.value = "Seseorang";
        inputNama.readOnly = true; // Agar tidak bisa diketik saat anonim aktif
        inputNama.classList.add("opacity-50", "italic");
    } else {
        inputNama.value = originalName || ""; // Balik ke nama default user atau kosong
        inputNama.readOnly = false; // Bisa diedit lagi
        inputNama.classList.remove("opacity-50", "italic");
    }
};

window.prosesDonasi = (event) => {
    const btnSubmit = event.currentTarget;
    const inputNama = document.getElementById("donasi-nama");
    const namaDonatur = inputNama.value.trim() || "Seseorang";
    const idKampanye = document.getElementById("donasi-id-kampanye").value; 
    const nominal = document.getElementById("donasi-nominal").value;

    if (!idKampanye || !nominal || nominal < 10000 || !selectedMetode) {
        document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Lengkapi data (Min. Rp 10.000)", type: "error" }));
        return;
    }

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = LoadingSpinner({ size: "sm", color: "white" });

    setTimeout(() => {
        const item = database.kampanye.find(k => k.id === idKampanye);
        if (item) {
            item.collected = (Number(item.collected) || 0) + parseInt(nominal);
            database.donasi.push({
                id: Date.now(),
                donaturName: namaDonatur,
                amount: parseInt(nominal),
                campaignId: idKampanye,
                date: new Date().toLocaleDateString('id-ID')
            });
            localStorage.setItem("charity_db", JSON.stringify(database));
            document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Terima kasih, Orang Baik!", type: "success" }));
            setTimeout(() => window.navigateTo("kampanye"), 2000);
        }
    }, 1500);
};

// Logika pembantu lainnya
window.updateSelectedCampaign = (id, title) => {
    document.getElementById("donasi-id-kampanye").value = id;
    document.getElementById("display-campaign").innerText = title;
    if (document.activeElement) document.activeElement.blur();
};
window.setNominal = (val) => { document.getElementById("donasi-nominal").value = val; };
window.openPaymentModal = () => document.getElementById("payment-modal").classList.remove("hidden");
window.closePaymentModal = () => document.getElementById("payment-modal").classList.add("hidden");
window.selectMetode = (nama, emoji) => {
    selectedMetode = nama;
    const btn = document.getElementById("btn-pilih-metode");
    const text = document.getElementById("text-metode");
    text.innerHTML = `<span class="text-primary font-black uppercase italic">${emoji} ${nama}</span>`;
    btn.classList.add("border-primary", "bg-primary/5", "border-solid");
    btn.classList.remove("border-dashed", "opacity-40");
    window.closePaymentModal();
};
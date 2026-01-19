import { database, getCurrentUser } from "../assets/js/data.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";
import { AlertMessage } from "../components/AlertMessage.js";

let selectedMetode = null;

export const Donasi = (params) => {
    const user = getCurrentUser() || JSON.parse(localStorage.getItem("userLogin"));
    const isUserLoggedIn = !!user;
    const queryId = params?.id || localStorage.getItem("selectedKampanyeId");
    
    const kampanyeList = database.kampanye || [];
    const selectedInitial = kampanyeList.find(k => k.id === queryId);
    const initialTitle = selectedInitial ? selectedInitial.title : "Pilih Program Kebaikan";

    const riwayatData = database.donasi || [];
    const listRiwayat = riwayatData.length > 0
        ? riwayatData.map((d) => {
            const kmp = kampanyeList.find((k) => k.id == d.campaignId);
            return `
                <div class="flex justify-between items-center p-4 rounded-2xl mb-2 bg-base-200/50 border border-transparent hover:border-primary/20 hover:bg-base-200 transition-all duration-300 text-left">
                    <div class="flex items-center gap-4">
                        <div class="avatar placeholder">
                            <div class="bg-primary/10 text-primary rounded-xl w-12 h-12 border border-primary/20 flex items-center justify-center font-black italic">
                                <span>${(d.donaturName || "S").charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-bold text-sm text-base-content leading-tight">${d.donaturName || "Anonim"}</p>
                            <p class="text-[10px] text-primary font-black uppercase mt-1 line-clamp-1">${kmp ? kmp.title : "Program"}</p>
                        </div>
                    </div>
                    <div class="text-right shrink-0">
                        <p class="font-black text-sm text-base-content font-poppins italic">Rp ${(d.amount || 0).toLocaleString("id-ID")}</p>
                    </div>
                </div>`;
        }).reverse().slice(0, 10).join("")
        : `<p class="text-center opacity-20 py-20 italic font-bold text-base-content/50">Belum ada donasi terkini</p>`;

    return `
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Poppins:wght@700;900&display=swap" rel="stylesheet">
    
    <div class="container mx-auto py-10 px-4 max-w-6xl font-inter">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            
            <div class="card bg-base-300 shadow-2xl rounded-[2.5rem] border border-white/5 flex flex-col overflow-visible">
                <div class="card-body p-8 md:p-10 flex-grow text-left">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="w-2.5 h-10 bg-primary rounded-full shadow-lg shadow-primary/40"></div>
                        <h1 class="text-4xl font-black text-base-content tracking-tighter font-poppins uppercase">Kirim Donasi</h1>
                    </div>
                    
                    <div class="space-y-6">
                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest text-base-content/50">Nama Donatur</span></label>
                            <input type="text" id="donasi-nama" 
                                data-original-name="${isUserLoggedIn ? user.name : ''}"
                                value="${isUserLoggedIn ? user.name : ""}" 
                                placeholder="Masukkan nama Anda"
                                class="input bg-base-100 border-base-content/10 w-full h-14 rounded-2xl font-bold text-base-content focus:border-primary transition-all">
                            
                            <label class="flex items-center gap-2 mt-3 cursor-pointer group w-fit">
                                <input type="checkbox" id="donasi-anonim" class="checkbox checkbox-primary checkbox-sm rounded-lg" onchange="window.toggleAnonim(this)">
                                <span class="text-xs font-bold text-base-content/50 group-hover:text-primary transition-colors">Sembunyikan nama saya (Anonim)</span>
                            </label>

                            ${isUserLoggedIn ? `<p id="verify-tag" class="text-[10px] mt-2 text-primary font-black flex items-center gap-1 uppercase"> Akun: ${user.name}</p>` : ''}
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest text-base-content/50">Target Program</span></label>
                            <div class="dropdown dropdown-bottom w-full">
                                <div tabindex="0" role="button" class="btn bg-base-100 border-base-content/10 w-full h-14 rounded-2xl justify-between px-6 hover:border-primary normal-case text-base-content/70">
                                    <span class="truncate font-bold" id="display-campaign">${initialTitle}</span>
                                    <i class="fas fa-chevron-down opacity-30 text-xs"></i>
                                </div>
                                <ul tabindex="0" class="dropdown-content z-[100] menu p-2 shadow-2xl bg-base-200 rounded-2xl w-full mt-2 max-h-60 overflow-y-auto border border-white/10 block">
                                    ${kampanyeList.map(k => `<li><a onclick="window.updateSelectedCampaign('${k.id}', '${k.title.replace(/'/g, "\\'")}')" class="py-3 font-bold text-base-content hover:bg-primary hover:text-primary-content mb-1 rounded-xl">${k.title}</a></li>`).join("")}
                                </ul>
                            </div>
                            <input type="hidden" id="donasi-id-kampanye" value="${queryId || ""}">
                        </div>
                        
                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest text-base-content/50">Nominal Donasi</span></label>
                            <div class="relative mb-4">
                                <span class="absolute left-6 top-1/2 -translate-y-1/2 font-black text-primary text-2xl font-poppins">Rp</span>
                                <input type="number" id="donasi-nominal" placeholder="0" 
                                    class="input bg-base-100 border-base-content/10 w-full h-16 pl-20 pr-6 rounded-3xl font-black text-primary text-2xl font-poppins focus:border-primary transition-all border-2">
                            </div>
                            <div class="grid grid-cols-3 gap-3">
                                ${[10000, 50000, 100000].map(val => `
                                    <button onclick="window.setNominal(${val})" class="btn btn-primary rounded-2xl font-black text-primary-content shadow-lg shadow-primary/20 active:scale-95 transition-all">
                                        Rp ${val/1000}RB
                                    </button>
                                `).join('')}
                            </div>
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-black uppercase text-[10px] tracking-widest text-base-content/50">Metode Bayar</span></label>
                            <button onclick="window.openPaymentModal()" id="btn-pilih-metode" 
                                class="btn bg-base-100 border-dashed border-2 border-base-content/10 w-full h-16 rounded-2xl justify-between px-6 hover:border-primary">
                                <span id="text-metode" class="font-bold text-base-content/40">Pilih Pembayaran...</span>
                                <i class="fas fa-wallet text-base-content/30"></i>
                            </button>
                        </div>

                        <button onclick="window.prosesDonasi(event)" id="btn-submit-donasi" 
                            class="btn btn-primary w-full h-16 rounded-[1.5rem] text-xl font-black shadow-xl shadow-primary/20 mt-4 uppercase tracking-tighter">
                            Konfirmasi Donasi
                        </button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-300 shadow-xl rounded-[2.5rem] border border-white/5 flex flex-col h-full overflow-hidden">
                <div class="card-body p-8 md:p-10 flex flex-col h-full">
                    <div class="flex justify-between items-center mb-8">
                        <div class="flex items-center gap-4">
                            <div class="w-2.5 h-10 bg-secondary rounded-full shadow-lg shadow-secondary/40"></div>
                            <h2 class="text-2xl font-black font-poppins tracking-tighter uppercase text-base-content">Donatur Terkini</h2>
                        </div>
                        <span class="badge bg-base-100 border-none text-base-content/50 font-black text-[10px] py-3 uppercase tracking-widest">Live</span>
                    </div>
                    <div class="flex-grow overflow-y-auto pr-2 space-y-2 custom-scrollbar text-left" style="max-height: 650px;">
                        ${listRiwayat}
                    </div>
                </div>
            </div>
        </div>

        <div id="payment-modal" class="hidden fixed inset-0 z-[999] bg-base-100/80 backdrop-blur-md flex items-center justify-center p-4">
            <div class="bg-base-300 w-full max-w-md rounded-[2.5rem] shadow-2xl border border-white/10 overflow-hidden transform animate-in zoom-in-95 duration-300 text-left">
                <div class="p-6 bg-base-200/50 flex justify-between items-center border-b border-white/5">
                    <h3 class="font-black text-base-content text-lg uppercase tracking-tighter font-poppins">Pilih Pembayaran</h3>
                    <button onclick="window.closePaymentModal()" class="btn btn-ghost btn-circle btn-sm text-base-content/50">✕</button>
                </div>
                <div class="p-8 space-y-6">
                    <div>
                        <label class="label pt-0"><span class="label-text-alt font-black uppercase opacity-50 tracking-widest text-primary">Transfer Bank</span></label>
                        <select onchange="window.selectMetode(this.value, '🏦')" class="select bg-base-100 border-base-content/10 w-full h-14 rounded-2xl font-bold text-base-content focus:border-primary focus:outline-none transition-all">
                            <option value="" disabled selected>Pilih Rekening Bank...</option>
                            <option value="Bank BCA">Bank BCA</option>
                            <option value="Bank BRI">Bank BRI</option>
                            <option value="Bank Mandiri">Bank Mandiri</option>
                        </select>
                    </div>
                    <div>
                        <label class="label"><span class="label-text-alt font-black uppercase opacity-50 tracking-widest text-primary">E-Wallet & QRIS</span></label>
                        <div class="grid grid-cols-2 gap-3">
                            <button onclick="window.selectMetode('Gopay', '📱')" class="btn bg-base-100 border-base-content/10 hover:border-primary text-base-content/70 rounded-2xl font-black h-14 active:scale-95 flex gap-2 transition-all">📱 Gopay</button>
                            <button onclick="window.selectMetode('OVO', '📱')" class="btn bg-base-100 border-base-content/10 hover:border-primary text-base-content/70 rounded-2xl font-black h-14 active:scale-95 flex gap-2 transition-all">📱 OVO</button>
                            <button onclick="window.selectMetode('Dana', '📱')" class="btn bg-base-100 border-base-content/10 hover:border-primary text-base-content/70 rounded-2xl font-black h-14 active:scale-95 flex gap-2 transition-all">📱 Dana</button>
                            <button onclick="window.selectMetode('QRIS', '📸')" class="btn border-2 border-primary/30 bg-base-100 hover:bg-primary text-primary hover:text-primary-content rounded-2xl font-black h-14 active:scale-95 flex gap-2 transition-all">📸 QRIS</button>
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
        inputNama.readOnly = true;
        inputNama.classList.add("opacity-40", "italic");
    } else {
        inputNama.value = originalName || "";
        inputNama.readOnly = false;
        inputNama.classList.remove("opacity-40", "italic");
    }
};

window.prosesDonasi = (event) => {
    const btnSubmit = event.currentTarget;
    const inputNama = document.getElementById("donasi-nama");
    const namaDonatur = inputNama.value.trim() || "Seseorang";
    const idKampanye = document.getElementById("donasi-id-kampanye").value; 
    const nominal = document.getElementById("donasi-nominal").value;

    const showAlertDismissible = (msg, type) => {
        document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: msg, type: type }));
        const lastAlert = document.body.lastElementChild;
        setTimeout(() => {
            if (lastAlert) {
                lastAlert.style.opacity = '0';
                lastAlert.style.transition = 'opacity 0.5s ease';
                setTimeout(() => lastAlert.remove(), 300);
            }
        }, 3000);
    };

    if (!idKampanye || !nominal || nominal < 10000 || !selectedMetode) {
        showAlertDismissible("Lengkapi data (Min. Rp 10.000)", "error");
        return;
    }

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = LoadingSpinner({ size: "sm", color: "white" });

    setTimeout(() => {
        const item = database.kampanye.find(k => k.id === idKampanye);
        if (item) {
            item.collected = (Number(item.collected) || 0) + parseInt(nominal);
            if(!database.donasi) database.donasi = [];
            database.donasi.push({
                id: Date.now(),
                donaturName: namaDonatur,
                amount: parseInt(nominal),
                campaignId: idKampanye,
                date: new Date().toLocaleDateString('id-ID')
            });
            localStorage.setItem("charity_db", JSON.stringify(database));
            
            showAlertDismissible("Terima kasih, Orang Baik!", "success");
            
            setTimeout(() => window.navigateTo ? window.navigateTo("kampanye") : location.reload(), 10);
        }
    }, 1500);
};

window.updateSelectedCampaign = (id, title) => {
    document.getElementById("donasi-id-kampanye").value = id;
    document.getElementById("display-campaign").innerText = title;
    if (document.activeElement) document.activeElement.blur();
};

window.setNominal = (val) => { document.getElementById("donasi-nominal").value = val; };
window.openPaymentModal = () => document.getElementById("payment-modal")?.classList.remove("hidden");
window.closePaymentModal = () => document.getElementById("payment-modal")?.classList.add("hidden");

window.selectMetode = (nama, emoji) => {
    selectedMetode = nama;
    const btn = document.getElementById("btn-pilih-metode");
    const text = document.getElementById("text-metode");
    if(text) text.innerHTML = `<span class="text-primary font-black uppercase italic">${emoji} ${nama}</span>`;
    if(btn) {
        btn.classList.add("border-primary", "bg-primary/5", "border-solid");
        btn.classList.remove("border-dashed");
    }
    window.closePaymentModal();
};
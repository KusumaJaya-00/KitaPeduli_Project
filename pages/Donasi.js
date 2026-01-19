import { database } from "../assets/js/data.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";
import { AlertMessage } from "../components/AlertMessage.js";

let selectedMetode = null;

export const Donasi = (params) => {
    // 1. Ambil ID Kampanye dari URL atau Storage
    if (params?.id) {
        localStorage.setItem("selectedKampanyeId", params.id);
    }
    const queryId = params?.id || localStorage.getItem("selectedKampanyeId");

    // 2. Generate Opsi Dropdown Kampanye
    const opsiKampanye = database.kampanye
        .map((k) => `<option value="${k.id}" ${queryId === k.id ? "selected" : ""}>${k.title}</option>`)
        .join("");

    // 3. Generate List Riwayat Donasi (10 Terakhir)
    const listRiwayat = database.donasi && database.donasi.length > 0
        ? database.donasi.map((d) => {
            const kmp = database.kampanye.find((k) => k.id == d.campaignId);
            return `
                <div class="flex justify-between items-center p-4 border-b border-base-200 hover:bg-base-100 transition text-left">
                    <div class="flex items-center gap-3">
                        <div class="avatar placeholder">
                            <div class="bg-primary text-primary-content rounded-full w-10">
                                <span class="text-xs font-bold uppercase">${(d.donaturName || "S").charAt(0)}</span>
                            </div>
                        </div>
                        <div>
                            <p class="font-bold text-sm text-base-content">${d.donaturName || "Anonim"}</p>
                            <p class="text-[10px] text-primary font-bold line-clamp-1">${kmp ? kmp.title : "Program Kebaikan"}</p>
                        </div>
                    </div>
                    <div class="text-right">
                        <p class="font-black text-sm text-base-content">Rp ${(d.amount || 0).toLocaleString("id-ID")}</p>
                        <p class="text-[9px] text-base-content/50 uppercase mt-1">${d.date || "-"}</p>
                    </div>
                </div>`;
        }).reverse().slice(0, 10).join("")
        : `<p class="text-center py-10 opacity-40 italic text-sm font-inter">Belum ada riwayat donasi.</p>`;

    return `
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Poppins:wght@400;700;900&display=swap" rel="stylesheet">
    
    <div class="container mx-auto py-10 px-4 max-w-5xl page-fade relative font-inter">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div class="card bg-base-100 shadow-2xl border border-base-200 text-left h-fit overflow-visible">
                <div class="card-body p-8">
                    <h1 class="card-title text-3xl font-black text-base-content mb-4 italic tracking-tighter font-poppins">Kirim Donasi</h1>
                    
                    <div class="space-y-4">
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold uppercase text-[11px] opacity-60">Nama Donatur</span></label>
                            <input type="text" id="donasi-nama" placeholder="Masukkan nama Anda" class="input input-bordered w-full rounded-2xl focus:input-primary font-bold">
                            <label class="label cursor-pointer justify-start gap-3 mt-1">
                                <input type="checkbox" id="donasi-anonim" class="checkbox checkbox-primary checkbox-sm" onchange="window.toggleAnonim(this)">
                                <span class="label-text text-xs font-bold opacity-70">Donasi sebagai Anonymous</span>
                            </label>
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold uppercase text-[11px] opacity-60">Pilih Program</span></label>
                            <select id="donasi-id-kampanye" class="select select-bordered w-full rounded-2xl font-bold ${queryId ? "bg-base-200" : ""}" ${queryId ? "disabled" : ""}>
                                <option value="" disabled ${!queryId ? "selected" : ""}>-- Pilih Program Kebaikan --</option>
                                ${opsiKampanye}
                            </select>
                        </div>
                        
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold uppercase text-[11px] opacity-60">Nominal Donasi (Rp)</span></label>
                            <input type="number" id="donasi-nominal" placeholder="Contoh: 50000" class="input input-bordered w-full rounded-2xl font-black text-primary text-xl font-poppins">
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold uppercase text-[11px] opacity-60">Metode Pembayaran</span></label>
                            <button onclick="window.openPaymentModal()" id="btn-pilih-metode" class="btn btn-outline btn-ghost w-full rounded-2xl border-2 border-dashed normal-case justify-between px-5 hover:bg-primary/5 hover:border-primary">
                                <span id="text-metode" class="font-bold opacity-60">Pilih Metode Pembayaran</span>
                                <svg class="w-5 h-5 opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg>
                            </button>
                        </div>

                        <button onclick="window.prosesDonasi('${queryId || ""}', event)" id="btn-submit-donasi" class="btn btn-primary w-full rounded-2xl text-lg font-black shadow-lg shadow-primary/20 mt-6 normal-case h-14 font-poppins">
                            Konfirmasi Donasi
                        </button>
                    </div>
                </div>
            </div>

            <div class="card bg-base-100 shadow-sm border border-base-200 h-fit">
                <div class="card-body p-8">
                    <h2 class="card-title text-xl font-bold mb-4 font-poppins">Donatur Terkini</h2>
                    <div class="max-h-[500px] overflow-y-auto pr-2 custom-scrollbar">
                        ${listRiwayat}
                    </div>
                </div>
            </div>
        </div>

        <div id="payment-modal" class="hidden fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div class="modal-box w-full max-w-md rounded-[2.5rem] shadow-2xl border border-base-300 p-0 overflow-hidden bg-base-100">
                <div class="p-6 bg-base-200 flex justify-between items-center font-poppins">
                    <h3 class="font-black text-lg italic uppercase tracking-tighter">Pilih Pembayaran</h3>
                    <button onclick="window.closePaymentModal()" class="btn btn-ghost btn-circle btn-sm">✕</button>
                </div>
                <div class="p-6 space-y-6 text-left">
                    <div>
                        <label class="label"><span class="label-text-alt font-black uppercase opacity-50">Transfer Bank</span></label>
                        <select onchange="window.selectMetode(this.value, '🏦')" class="select select-primary w-full rounded-xl font-bold">
                            <option value="" disabled selected>Pilih Bank...</option>
                            <option value="Bank BCA">Bank BCA</option>
                            <option value="Bank BRI">Bank BRI</option>
                            <option value="Bank Mandiri">Bank Mandiri</option>
                            <option value="Bank BNI">Bank BNI</option>
                        </select>
                    </div>
                    <div>
                        <label class="label"><span class="label-text-alt font-black uppercase opacity-50">E-Wallet & QRIS</span></label>
                        <div class="grid grid-cols-2 gap-2">
                            <button onclick="window.selectMetode('Gopay', '📱')" class="btn btn-outline btn-sm rounded-xl font-bold normal-case">📱 Gopay</button>
                            <button onclick="window.selectMetode('OVO', '📱')" class="btn btn-outline btn-sm rounded-xl font-bold normal-case">📱 OVO</button>
                            <button onclick="window.selectMetode('Dana', '📱')" class="btn btn-outline btn-sm rounded-xl font-bold normal-case">📱 Dana</button>
                            <button onclick="window.selectMetode('QRIS', '📸')" class="btn btn-accent btn-outline btn-sm rounded-xl font-bold normal-case font-black">📸 QRIS</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>`;
};

// --- LOGIKA GLOBAL ---

window.prosesDonasi = (lockedId, event) => {
    const btnSubmit = event.currentTarget;
    const originalText = "Konfirmasi Donasi";

    const isAnonim = document.getElementById("donasi-anonim").checked;
    const inputNamaVal = document.getElementById("donasi-nama").value;
    const nama = isAnonim ? "Seseorang" : inputNamaVal;
    
    const selectEl = document.getElementById("donasi-id-kampanye");
    const idKampanye = lockedId || (selectEl ? selectEl.value : "");
    const nominal = document.getElementById("donasi-nominal").value;

    // 1. Validasi
    if (!nama.trim() || !idKampanye || !nominal || nominal < 10000 || !selectedMetode) {
        document.body.insertAdjacentHTML('beforeend', AlertMessage({ 
            message: "Lengkapi data dan pilih metode pembayaran.", 
            type: "error" 
        }));
        return;
    }

    // 2. Loading State
    btnSubmit.disabled = true;
    btnSubmit.innerHTML = LoadingSpinner({ size: "sm", color: "primary-content" });

    // 3. Simulasi Proses
    setTimeout(() => {
        const item = database.kampanye.find((k) => k.id === idKampanye);
        
        if (item) {
            const nominalInt = parseInt(nominal);
            
            // Simpan perubahan ke database (local variable)
            item.collected = (Number(item.collected) || 0) + nominalInt;
            database.donasi.push({
                id: Date.now(),
                donaturName: nama,
                amount: nominalInt,
                campaignId: idKampanye,
                date: new Date().toISOString().split('T')[0]
            });

            // Simpan ke LocalStorage permanen
            localStorage.setItem("charity_db", JSON.stringify(database));

            // 4. Tampilkan Toast Alert (Muncul di pojok kanan atas)
            document.body.insertAdjacentHTML('beforeend', AlertMessage({ 
                message: `Berhasil donasi Rp ${nominalInt.toLocaleString('id-ID')} ke ${item.title}.`, 
                type: "success" 
            }));

            // 5. Beri jeda 3 detik agar Toast terlihat, lalu redirect
            setTimeout(() => {
                const popup = document.getElementById("alert-popup");
                if(popup) {
                    popup.style.opacity = '0';
                    popup.style.transition = '0.5s';
                    setTimeout(() => popup.remove(), 500);
                }
                
                localStorage.removeItem("selectedKampanyeId");
                window.navigateTo("kampanye"); 
            }, 3000);
        }
    }, 1500);
};

window.toggleAnonim = (el) => {
    const inputNama = document.getElementById("donasi-nama");
    if (el.checked) {
        inputNama.value = "Seseorang";
        inputNama.disabled = true;
        inputNama.classList.add("bg-base-200", "opacity-50");
    } else {
        inputNama.value = "";
        inputNama.disabled = false;
        inputNama.classList.remove("bg-base-200", "opacity-50");
    }
};

window.openPaymentModal = () => document.getElementById("payment-modal").classList.remove("hidden");
window.closePaymentModal = () => document.getElementById("payment-modal").classList.add("hidden");

window.selectMetode = (nama, emoji) => {
    if (!nama) return;
    selectedMetode = nama;
    const btn = document.getElementById("btn-pilih-metode");
    const text = document.getElementById("text-metode");
    text.innerHTML = `<span class="text-primary font-black">${emoji} ${nama}</span>`;
    btn.classList.add("border-primary", "bg-primary/5");
    btn.classList.remove("btn-ghost");
    window.closePaymentModal();
};
import { database, getCurrentUser } from "../assets/js/data.js";
import { InputField } from "../components/InputField.js";
import { AlertMessage } from "../components/AlertMessage.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";

export const Relawan = () => {
    const freshDB = JSON.parse(localStorage.getItem("charity_db")) || database;
    const user = getCurrentUser();

    if (!user) {
        setTimeout(() => window.navigateTo("login"), 100);
        return `<div class="p-20 text-center font-bold text-slate-500">Mengarahkan ke Login...</div>`;
    }

    const dataRelawan = freshDB.relawan?.find(r => r.userId === user.id);

    if (dataRelawan && dataRelawan.status === "approved") {
        setTimeout(() => window.navigateTo("dashboard-user"), 100);
        return `<div class="p-20 text-center font-bold text-slate-500">Membuka Dashboard...</div>`;
    }

    // TAMPILAN JIKA SEDANG PENDING
    if (dataRelawan && dataRelawan.status === "pending") {
        return `
        <div class="container mx-auto py-20 px-4 text-center animate-in fade-in duration-700">
            <div class="max-w-2xl mx-auto card bg-[#1e293b] shadow-2xl p-10 md:p-16 border border-white/5 rounded-[3rem] flex flex-col items-center">
                <div class="w-24 h-24 bg-amber-500/10 rounded-full flex items-center justify-center mb-8 animate-pulse border border-amber-500/20">
                    <span class="text-5xl">⏳</span>
                </div>
                
                <h1 class="text-3xl md:text-4xl font-black font-poppins italic tracking-tighter text-white uppercase">
                    Pendaftaran <span class="text-sky-500">Diproses!</span>
                </h1>
                
                <p class="mt-6 text-slate-400 font-medium leading-relaxed max-w-md">
                    Halo <span class="font-bold text-white">${user.name}</span>, pendaftaran Anda di divisi <span class="badge bg-sky-500/10 border-sky-500/30 text-sky-400 font-bold">${dataRelawan.divisi}</span> sedang diverifikasi Admin.
                </p>

                <div class="mt-10 w-full p-6 bg-[#0f172a] rounded-3xl border border-white/5 space-y-3 text-left">
                    <div class="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-50 text-slate-400">
                        <span>Status Verifikasi</span>
                        <span class="text-amber-500">On Review</span>
                    </div>
                    <progress class="progress progress-warning w-full h-3 bg-slate-800" value="70" max="100"></progress>
                    <p class="text-[11px] italic text-slate-500">Email konfirmasi akan dikirim ke: ${dataRelawan.email}</p>
                </div>

                <div class="mt-10 flex flex-wrap justify-center gap-4">
                    <button onclick="window.navigateTo('home')" class="btn btn-ghost text-slate-400 rounded-2xl normal-case font-bold hover:bg-white/5">Kembali ke Beranda</button>
                    <a href="https://wa.me/628123456789" class="btn bg-sky-500 hover:bg-sky-400 border-none px-8 rounded-2xl text-white font-black shadow-lg shadow-sky-900/40 uppercase tracking-tighter">Hubungi Admin</a>
                </div>
            </div>
        </div>`;
    }

    // FORM PENDAFTARAN (DEFAULT)
    return `
    <div class="container mx-auto py-12 px-4 max-w-6xl animate-in fade-in duration-500 font-inter">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            
            <div class="space-y-8 text-left">
                <div class="inline-block px-4 py-1.5 bg-sky-500/10 border border-sky-500/20 rounded-full">
                    <span class="text-sky-500 text-xs font-black uppercase tracking-widest italic">Volunteer Program 2026</span>
                </div>
                <h1 class="text-6xl font-black font-poppins italic tracking-tighter leading-none text-white">
                    Jadi Bagian <br> <span class="text-sky-500 underline decoration-sky-500/30">Kebaikan.</span>
                </h1>
                <p class="text-lg text-slate-400 font-medium max-w-md">
                    Bantu sesama dengan keahlian spesifikmu. Pilih divisi yang sesuai dengan passion-mu dan mulailah berdampak.
                </p>
                
                <div class="grid grid-cols-2 gap-3 pt-4">
                    ${['📦 Logistik', '🩺 Medis', '📚 Edukasi', '📷 Dokumentasi'].map(item => `
                        <div class="p-4 border border-white/5 rounded-2xl bg-[#1e293b] text-slate-300 font-bold text-xs uppercase tracking-tight flex items-center gap-2">
                            ${item}
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="card bg-[#1e293b] shadow-2xl border border-white/5 rounded-[3rem]">
                <div class="card-body p-8 lg:p-12">
                    <h2 class="text-2xl font-black font-poppins italic text-white mb-6 uppercase tracking-tighter">Formulir Relawan</h2>
                    <form onsubmit="window.handleDaftarRelawan(event)" class="space-y-5">
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-slate-400 uppercase text-[10px] tracking-widest">Nama Lengkap</span></label>
                            <input type="text" id="relawan-nama" value="${user.name}" readonly class="input bg-[#0f172a] border-white/10 w-full h-14 rounded-xl font-bold text-slate-400 focus:outline-none cursor-not-allowed">
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-slate-400 uppercase text-[10px] tracking-widest">Alamat Email (Gmail)</span></label>
                            <input type="email" id="relawan-email" placeholder="contoh@gmail.com" 
                                class="input bg-[#0f172a] border-white/10 w-full h-14 rounded-xl font-bold text-white focus:border-sky-500 focus:outline-none transition-all">
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-slate-400 uppercase text-[10px] tracking-widest">Pilih Divisi</span></label>
                            <select id="relawan-divisi" class="select bg-[#0f172a] border-white/10 w-full h-14 rounded-xl font-bold text-white focus:border-sky-500 focus:outline-none">
                                <option value="" disabled selected>Pilih salah satu...</option>
                                <option value="Umum">Umum</option>
                                <option value="Medis">Medis</option>
                                <option value="Logistik">Logistik</option>
                                <option value="Edukasi">Edukasi</option>
                                <option value="Dokumentasi">Dokumentasi</option>
                            </select>
                        </div>

                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-slate-400 uppercase text-[10px] tracking-widest">Alasan Bergabung</span></label>
                            <textarea id="relawan-alasan" class="textarea bg-[#0f172a] border-white/10 w-full rounded-xl font-medium text-white focus:border-sky-500 focus:outline-none h-24 pt-4" placeholder="Ceritakan motivasi singkat Anda..."></textarea>
                        </div>

                        <div class="pt-6" id="btn-container">
                            <button type="submit" class="btn bg-sky-500 hover:bg-sky-400 border-none w-full rounded-2xl text-lg font-black text-white shadow-xl shadow-sky-900/20 uppercase h-16 tracking-tighter">
                                Kirim Pendaftaran
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
};

window.handleDaftarRelawan = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const email = document.getElementById("relawan-email").value.trim();
    const divisi = document.getElementById("relawan-divisi").value;
    const alasan = document.getElementById("relawan-alasan").value.trim();
    const btnContainer = document.getElementById("btn-container");

    // Validasi Basic & Gmail
    if (!email || !divisi || !alasan) {
        document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Lengkapi semua data!", type: "error" }));
        return;
    }

    if (!email.toLowerCase().endsWith("@gmail.com")) {
        document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Wajib menggunakan akun Gmail!", type: "error" }));
        return;
    }

    btnContainer.innerHTML = `<div class="btn bg-sky-500/50 border-none w-full rounded-2xl h-16">${LoadingSpinner({ size: "sm", color: "white" })}</div>`;

    setTimeout(() => {
        const currentDB = JSON.parse(localStorage.getItem("charity_db")) || database;
        if (!currentDB.relawan) currentDB.relawan = [];

        currentDB.relawan.push({
            id: "REL-" + Date.now(),
            userId: user.id,
            name: user.name,
            email: email,
            divisi: divisi,
            alasan: alasan,
            status: "pending",
            createdAt: new Date().toISOString()
        });

        localStorage.setItem("charity_db", JSON.stringify(currentDB));

        document.body.insertAdjacentHTML('beforeend', AlertMessage({ 
            message: "Pendaftaran terkirim! Cek email secara berkala.", 
            type: "success" 
        }));

        setTimeout(() => window.location.reload(), 1500);
    }, 1500);
};
// import { database, getCurrentUser } from "../assets/js/data.js";
// import { InputField } from "../components/InputField.js";
// import { AlertMessage } from "../components/AlertMessage.js";
// import { LoadingSpinner } from "../components/LoadingSpinner.js";
// import { Modal } from "../components/Modal.js";

// export const Relawan = () => {
//     const user = getCurrentUser();

//     if (!user) {
//         setTimeout(() => window.navigateTo("login"), 100);
//         return `<div class="p-20 text-center font-bold">Mengarahkan ke Login...</div>`;
//     }

//     const dataRelawan = database.relawan?.find(r => r.userId === user.id);

//     if (dataRelawan && dataRelawan.status === "approved") {
//         setTimeout(() => window.navigateTo("dashboard-user"), 100);
//         return "";
//     }

//     if (dataRelawan && dataRelawan.status === "pending") {
//         return `
//             <div class="min-h-[70vh] flex items-center justify-center">
//                 ${Modal({
//                     id: "modal-pending",
//                     title: "Sedang Ditinjau",
//                     message: `Halo ${user.name}, pendaftaran relawan Anda sedang diverifikasi oleh Admin. Cek kembali dalam 1x24 jam.`,
//                     type: "warning",
//                     confirmText: "Kembali ke Beranda"
//                 })}
//             </div>
//             <script>document.getElementById('modal-pending').classList.remove('hidden');</script>
//         `;
//     }

//     return `
//     <div class="container mx-auto py-12 px-4 max-w-5xl page-fade font-inter">
//         <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            
//             <div class="space-y-6">
//                 <h1 class="text-5xl font-black font-poppins italic tracking-tighter leading-none text-base-content">
//                     Gabung <span class="text-primary underline">Relawan.</span>
//                 </h1>
//                 <p class="text-lg opacity-70 font-medium">
//                     Pilih divisi yang sesuai dengan keahlianmu dan mulai berkontribusi untuk sesama.
//                 </p>
//                 <div class="grid grid-cols-2 gap-4 pt-4 text-[11px] font-bold uppercase opacity-60">
//                     <div class="p-4 border border-base-content/10 rounded-2xl">✨ Administrasi</div>
//                     <div class="p-4 border border-base-content/10 rounded-2xl">📸 Dokumentasi</div>
//                     <div class="p-4 border border-base-content/10 rounded-2xl">📱 Media Sosial</div>
//                     <div class="p-4 border border-base-content/10 rounded-2xl">🎓 Pengajaran</div>
//                 </div>
//             </div>

//             <div class="card bg-base-100 shadow-2xl border border-base-content/5 rounded-[2.5rem]">
//                 <div class="card-body p-8 lg:p-10">
//                     <h2 class="text-2xl font-black font-poppins italic mb-6">Formulir Pendaftaran</h2>
                    
//                     <form onsubmit="window.handleDaftarRelawan(event)" class="space-y-4">
//                         ${InputField({
//                             label: "Nama Lengkap",
//                             name: "relawan-nama",
//                             value: user.name,
//                             placeholder: "Nama Anda",
//                             type: "text"
//                         })}
                        
//                         <div class="form-control w-full space-y-1">
//                             <label class="label pb-1">
//                                 <span class="label-text font-bold text-base-content/80">Nomor WhatsApp</span>
//                             </label>
//                             <input type="text" id="relawan-wa" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="0812XXXXXXXX" class="input input-bordered w-full rounded-xl focus:input-primary transition-all duration-200">
//                         </div>

//                         <div class="form-control w-full space-y-1">
//                             <label class="label pb-1">
//                                 <span class="label-text font-bold text-base-content/80">Pilih Divisi</span>
//                             </label>
//                             <select id="relawan-divisi" class="select select-bordered w-full rounded-xl focus:select-primary font-medium">
//                                 <option value="" disabled selected>Pilih salah satu...</option>
//                                 <option value="Administrasi">Administrasi</option>
//                                 <option value="Dokumentasi">Dokumentasi</option>
//                                 <option value="Media Sosial">Media Sosial</option>
//                                 <option value="Pengajaran">Pengajaran</option>
//                             </select>
//                         </div>

//                         <div class="form-control w-full space-y-1">
//                             <label class="label pb-1">
//                                 <span class="label-text font-bold text-base-content/80">Alasan Bergabung</span>
//                             </label>
//                             <textarea id="relawan-alasan" class="textarea textarea-bordered w-full rounded-xl focus:textarea-primary h-24" placeholder="Ceritakan motivasi singkat Anda..."></textarea>
//                         </div>

//                         <div class="pt-4" id="btn-container">
//                             <button type="submit" class="btn btn-primary w-full rounded-2xl text-lg font-black shadow-lg shadow-primary/20 normal-case h-14">
//                                 Kirim Pendaftaran
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </div>
//     </div>`;
// };

// window.handleDaftarRelawan = (e) => {
//     e.preventDefault();
//     const user = getCurrentUser();
//     const wa = document.getElementById("relawan-wa").value;
//     const divisi = document.getElementById("relawan-divisi").value;
//     const alasan = document.getElementById("relawan-alasan").value;
//     const btnContainer = document.getElementById("btn-container");

//     if (!wa || !divisi || !alasan) {
//         document.body.insertAdjacentHTML('beforeend', AlertMessage({ 
//             message: "Harap lengkapi semua field!", 
//             type: "error" 
//         }));
//         return;
//     }

//     const originalBtn = btnContainer.innerHTML;
//     btnContainer.innerHTML = `<div class="btn btn-primary w-full rounded-2xl h-14 opacity-70">
//         ${LoadingSpinner({ size: "sm", color: "primary-content" })}
//     </div>`;

//     setTimeout(() => {
//         if (!database.relawan) database.relawan = [];

//         database.relawan.push({
//             id: "REL-" + Date.now(),
//             userId: user.id,
//             name: user.name,
//             whatsapp: wa,
//             divisi: divisi,
//             alasan: alasan,
//             status: "pending",
//             createdAt: new Date().toISOString()
//         });

//         localStorage.setItem("charity_db", JSON.stringify(database));

//         document.body.insertAdjacentHTML('beforeend', AlertMessage({ 
//             message: "Berhasil! Data Anda sedang kami proses.", 
//             type: "success" 
//         }));

//         setTimeout(() => window.location.reload(), 1500);
//     }, 1500);
// };

import { database, getCurrentUser } from "../assets/js/data.js";
import { InputField } from "../components/InputField.js";
import { AlertMessage } from "../components/AlertMessage.js";
import { LoadingSpinner } from "../components/LoadingSpinner.js";

export const Relawan = () => {
    // 1. Ambil data paling fresh dari LocalStorage agar status update setelah reload
    const freshDB = JSON.parse(localStorage.getItem("charity_db")) || database;
    const user = getCurrentUser();

    if (!user) {
        setTimeout(() => window.navigateTo("login"), 100);
        return `<div class="p-20 text-center font-bold">Mengarahkan ke Login...</div>`;
    }

    // Cari data relawan milik user ini
    const dataRelawan = freshDB.relawan?.find(r => r.userId === user.id);

    // 2. JIKA SUDAH APPROVED -> Arahkan ke Dashboard
    if (dataRelawan && dataRelawan.status === "approved") {
        setTimeout(() => window.navigateTo("dashboard-user"), 100);
        return `<div class="p-20 text-center font-bold">Membuka Dashboard...</div>`;
    }

    // 3. JIKA SEDANG PENDING -> Tampilkan Halaman "Menunggu" (Bukan Form)
    if (dataRelawan && dataRelawan.status === "pending") {
        return `
        <div class="container mx-auto py-20 px-4 text-center page-fade">
            <div class="max-w-2xl mx-auto card bg-base-100 shadow-2xl p-10 md:p-16 border border-base-content/5 rounded-[3rem] flex flex-col items-center">
                <div class="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center mb-8 animate-pulse">
                    <span class="text-5xl">⏳</span>
                </div>
                
                <h1 class="text-3xl md:text-4xl font-black font-poppins italic tracking-tighter leading-tight">
                    Pendaftaran <span class="text-primary">Diproses!</span>
                </h1>
                
                <p class="mt-6 text-base opacity-70 font-medium leading-relaxed max-w-md">
                    Halo <span class="font-bold text-base-content">${user.name}</span>, terima kasih telah mendaftar di divisi <span class="badge badge-outline font-bold">${dataRelawan.divisi}</span>. 
                    Saat ini Admin sedang memverifikasi data Anda.
                </p>

                <div class="mt-10 w-full p-6 bg-base-200/50 rounded-3xl border border-base-content/5 space-y-3">
                    <div class="flex justify-between text-[10px] font-black uppercase tracking-widest opacity-50">
                        <span>Status Akun</span>
                        <span class="text-warning">Menunggu Konfirmasi</span>
                    </div>
                    <progress class="progress progress-warning w-full h-3" value="70" max="100"></progress>
                    <p class="text-[11px] italic opacity-40">Estimasi waktu tunggu: 1x24 Jam</p>
                </div>

                <div class="mt-10 flex gap-4">
                    <button onclick="window.navigateTo('home')" class="btn btn-ghost rounded-2xl normal-case font-bold">Kembali ke Beranda</button>
                    <a href="https://wa.me/628123456789" class="btn btn-primary px-8 rounded-2xl normal-case font-black shadow-lg shadow-primary/20">Hubungi Admin</a>
                </div>
            </div>
        </div>`;
    }

    // 4. JIKA BELUM DAFTAR -> Tampilkan Form (Halaman Default)
    return `
    <div class="container mx-auto py-12 px-4 max-w-5xl page-fade font-inter">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center text-left">
            
            <div class="space-y-6">
                <h1 class="text-5xl font-black font-poppins italic tracking-tighter leading-none text-base-content">
                    Gabung <span class="text-primary underline">Relawan.</span>
                </h1>
                <p class="text-lg opacity-70 font-medium">
                    Bantu sesama dengan keahlianmu. Pilih divisi dan mulailah perjalanan sosialmu hari ini.
                </p>
                <div class="grid grid-cols-2 gap-4 pt-4 text-[11px] font-bold uppercase opacity-60">
                    <div class="p-4 border border-base-content/10 rounded-2xl bg-base-200/30">✨ Administrasi</div>
                    <div class="p-4 border border-base-content/10 rounded-2xl bg-base-200/30">📸 Dokumentasi</div>
                    <div class="p-4 border border-base-content/10 rounded-2xl bg-base-200/30">📱 Media Sosial</div>
                    <div class="p-4 border border-base-content/10 rounded-2xl bg-base-200/30">🎓 Pengajaran</div>
                </div>
            </div>

            <div class="card bg-base-100 shadow-2xl border border-base-content/5 rounded-[2.5rem]">
                <div class="card-body p-8 lg:p-10">
                    <h2 class="text-2xl font-black font-poppins italic mb-6">Formulir Pendaftaran</h2>
                    <form onsubmit="window.handleDaftarRelawan(event)" class="space-y-4">
                        ${InputField({
                            label: "Nama Lengkap",
                            name: "relawan-nama",
                            value: user.name,
                            placeholder: "Nama Anda",
                            type: "text"
                        })}
                        <div class="form-control w-full space-y-1">
                            <label class="label pb-1"><span class="label-text font-bold text-base-content/80">Nomor WhatsApp</span></label>
                            <input type="text" id="relawan-wa" inputmode="numeric" oninput="this.value = this.value.replace(/[^0-9]/g, '')" placeholder="0812XXXXXXXX" class="input input-bordered w-full rounded-xl focus:input-primary transition-all duration-200">
                        </div>
                        <div class="form-control w-full space-y-1">
                            <label class="label pb-1"><span class="label-text font-bold text-base-content/80">Pilih Divisi</span></label>
                            <select id="relawan-divisi" class="select select-bordered w-full rounded-xl focus:select-primary font-medium">
                                <option value="" disabled selected>Pilih salah satu...</option>
                                <option value="Administrasi">Administrasi</option>
                                <option value="Dokumentasi">Dokumentasi</option>
                                <option value="Media Sosial">Media Sosial</option>
                                <option value="Pengajaran">Pengajaran</option>
                            </select>
                        </div>
                        <div class="form-control w-full space-y-1">
                            <label class="label pb-1"><span class="label-text font-bold text-base-content/80">Alasan Bergabung</span></label>
                            <textarea id="relawan-alasan" class="textarea textarea-bordered w-full rounded-xl focus:textarea-primary h-24" placeholder="Ceritakan motivasi singkat Anda..."></textarea>
                        </div>
                        <div class="pt-4" id="btn-container">
                            <button type="submit" class="btn btn-primary w-full rounded-2xl text-lg font-black shadow-lg shadow-primary/20 normal-case h-14">
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
    const wa = document.getElementById("relawan-wa").value;
    const divisi = document.getElementById("relawan-divisi").value;
    const alasan = document.getElementById("relawan-alasan").value;
    const btnContainer = document.getElementById("btn-container");

    if (!wa || !divisi || !alasan) {
        document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Harap lengkapi semua field!", type: "error" }));
        return;
    }

    btnContainer.innerHTML = `<div class="btn btn-primary w-full rounded-2xl h-14 opacity-70">${LoadingSpinner({ size: "sm", color: "primary-content" })}</div>`;

    setTimeout(() => {
        // Ambil database terbaru dari localStorage sebelum push
        const currentDB = JSON.parse(localStorage.getItem("charity_db")) || database;
        if (!currentDB.relawan) currentDB.relawan = [];

        currentDB.relawan.push({
            id: "REL-" + Date.now(),
            userId: user.id,
            name: user.name,
            whatsapp: wa,
            divisi: divisi,
            alasan: alasan,
            status: "pending",
            createdAt: new Date().toISOString()
        });

        localStorage.setItem("charity_db", JSON.stringify(currentDB));

        document.body.insertAdjacentHTML('beforeend', AlertMessage({ 
            message: "Berhasil! Data Anda sedang kami proses.", 
            type: "success" 
        }));

        setTimeout(() => window.location.reload(), 1500);
    }, 1500);
};
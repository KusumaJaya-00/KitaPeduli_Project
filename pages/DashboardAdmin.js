// import { database } from "../assets/js/data.js";
// import { KampanyeCard } from "../components/KampanyeCard.js";
// import { InputField } from "../components/InputField.js";
// import { Badge } from "../components/Badge.js";

// const fmt = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

// export const DashboardAdmin = () => {
//     const { kampanye = [], donasi = [], relawan = [], currentUser: user } = database;
//     const totalDana = donasi.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

//     return `
//     <div class="min-h-screen bg-base-200 pb-20 font-sans">
//         <main class="max-w-7xl mx-auto p-6">
//             <!-- Header Sederhana -->
//             <header class="flex justify-between items-end mb-10">
//                 <div>
//                     <h1 class="text-3xl font-black italic text-primary tracking-tighter uppercase">Admin Panel</h1>
//                     <p class="opacity-60 text-sm">Pengelola: <span class="badge badge-outline font-bold">${user?.name || 'Admin'}</span></p>
//                 </div>
//                 <div class="tabs tabs-boxed bg-base-100 p-1 shadow-sm border border-base-content/5">
//                     <button id="tabK" class="tab tab-active font-bold transition-all" onclick="window.switchTab('k')">Kampanye</button>
//                     <button id="tabR" class="tab font-bold text-base-content/40 transition-all" onclick="window.switchTab('r')">Relawan</button>
//                 </div>
//             </header>

//             <!-- Ringkasan Statistik -->
//             <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
//                 <div class="bg-primary text-white p-6 rounded-3xl shadow-lg transform hover:scale-[1.02] transition-transform">
//                     <p class="text-xs font-bold uppercase opacity-80 mb-1">Total Donasi</p>
//                     <h3 class="text-3xl font-black">${fmt(totalDana)}</h3>
//                 </div>
//                 <div class="bg-base-100 p-6 rounded-3xl border border-base-content/5 shadow-sm">
//                     <p class="opacity-40 text-xs font-bold uppercase mb-1">Database Relawan</p>
//                     <h3 class="text-3xl font-black">${relawan.length} <span class="text-sm font-medium opacity-50">Orang</span></h3>
//                 </div>
//                 <div class="bg-base-100 p-6 rounded-3xl border border-base-content/5 shadow-sm">
//                     <p class="opacity-40 text-xs font-bold uppercase mb-1">Kampanye Aktif</p>
//                     <h3 class="text-3xl font-black">${kampanye.length} <span class="text-sm font-medium opacity-50">Program</span></h3>
//                 </div>
//             </section>

//             <!-- Tab Kampanye -->
//             <div id="secK" class="space-y-6 animate-in fade-in duration-500">
//                 <div class="flex justify-between items-center">
//                     <h2 class="font-black text-xl italic underline decoration-primary underline-offset-8">DAFTAR KAMPANYE</h2>
//                     <button class="btn btn-primary btn-md rounded-2xl shadow-md font-bold px-8" onclick="window.modalK()">+ Tambah Program</button>
//                 </div>

//                 <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     ${kampanye.map(k => {
//                         const logs = donasi.filter(d => String(d.campaignId) === String(k.id));
//                         const collected = logs.reduce((s, i) => s + (Number(i.amount) || 0), 0);
//                         const daysLeft = Math.max(0, Math.ceil((new Date(k.deadline) - new Date()) / (1000*60*60*24)));

//                         let cardHtml = KampanyeCard({ ...k, collected, daysLeft })
//                             .replace(/Donasi<\/button>/, `<i class="fas fa-users mr-2"></i> Donatur</button>`)
//                             .replace(/navigateTo\('donasi', {id: '.*?'}\)/, `window.viewD('${k.id}')`);

//                         return `
//                         <div class="bg-base-100 rounded-3xl overflow-hidden shadow-md border border-base-content/5 flex flex-col group hover:shadow-xl transition-all">
//                             <div class="flex-grow">${cardHtml}</div>
//                             <div class="p-4 bg-base-200/50 grid grid-cols-2 gap-3 border-t border-base-content/5">
//                                 <button class="btn btn-info btn-sm text-white font-bold rounded-xl" onclick="window.modalK('${k.id}')">EDIT</button>
//                                 <button class="btn btn-error btn-sm text-white font-bold rounded-xl" onclick="window.delK('${k.id}')">HAPUS</button>
//                             </div>
//                         </div>`;
//                     }).join('')}
//                 </div>
//             </div>

//             <!-- Tab Relawan -->
//             <div id="secR" class="hidden animate-in fade-in duration-500">
//                 <div class="flex justify-between items-center mb-6">
//                     <h2 class="font-black text-xl italic">MANAJEMEN RELAWAN</h2>
//                 </div>
//                 <div class="bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-content/10 shadow-xl" id="relTable">
//                     <!-- Table rendered by JS -->
//                 </div>
//             </div>
//         </main>

//         <!-- Modals Kampanye -->
//         <input type="checkbox" id="m-k" class="modal-toggle" />
//         <div class="modal"><div class="modal-box rounded-[2rem] max-w-2xl">
//             <h3 class="font-black text-2xl mb-6 flex items-center gap-2" id="m-k-t">Form Program</h3>
//             <form id="f-k" class="space-y-4">
//                 <input type="hidden" id="e-id">
//                 ${InputField({ label: "Judul Kampanye", name: "i-j", placeholder: "Contoh: Bantuan Pangan..." })}
//                 <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div class="form-control"><label class="label"><span class="label-text font-bold text-base-content/80">Kategori</span></label>
//                     <select id="i-k" class="select select-bordered rounded-xl focus:select-primary">
//                         <option>Sosial</option><option>Bencana Alam</option><option>Kesehatan</option><option>Pendidikan</option><option>Kemanusiaan</option>
//                     </select></div>
//                     ${InputField({ label: "Target Dana (Rp)", name: "i-t", type: "number", placeholder: "1000000" })}
//                 </div>
//                 ${InputField({ label: "URL Gambar (Unsplash/Link)", name: "i-g", placeholder: "https://..." })}
//                 <div class="form-control">
//                     <label class="label"><span class="label-text font-bold text-base-content/80">Deskripsi Lengkap</span></label>
//                     <textarea id="i-d" placeholder="Tuliskan detail program di sini..." class="textarea textarea-bordered w-full rounded-xl h-32 focus:textarea-primary" required></textarea>
//                 </div>
//                 <div class="modal-action gap-2">
//                     <label for="m-k" class="btn btn-ghost rounded-xl">Batal</label>
//                     <button type="submit" class="btn btn-primary rounded-xl px-10">Simpan Program</button>
//                 </div>
//             </form>
//         </div></div>

//         <!-- Modals Edit Relawan -->
//         <input type="checkbox" id="m-r" class="modal-toggle" />
//         <div class="modal"><div class="modal-box rounded-[2rem]">
//             <h3 class="font-black text-2xl mb-6">Edit Data Relawan</h3>
//             <form id="f-r" class="space-y-4">
//                 <input type="hidden" id="er-id">
//                 ${InputField({ label: "Nama Lengkap", name: "er-n" })}
//                 ${InputField({ label: "Email Aktif", name: "er-e", type: "email" })}
//                 <div class="grid grid-cols-2 gap-4">
//                     <div class="form-control">
//                         <label class="label"><span class="label-text font-bold text-base-content/80">Keahlian</span></label>
//                         <select id="er-k" class="select select-bordered rounded-xl">
//                             <option>Umum</option><option>Medis</option><option>Logistik</option><option>Edukasi</option><option>Dokumentasi</option><option>Pengajaran</option><option>Media Sosial</option><option>Psikologi</option><option>Konstruksi</option><option>Administrasi</option>
//                         </select>
//                     </div>
//                     <div class="form-control">
//                         <label class="label"><span class="label-text font-bold text-base-content/80">Status Relawan</span></label>
//                         <select id="er-s" class="select select-bordered rounded-xl">
//                             <option value="Aktif">Aktif</option>
//                             <option value="Pending">Pending</option>
//                             <option value="Nonaktif">Nonaktif</option>
//                         </select>
//                     </div>
//                 </div>
//                 <div class="modal-action pt-4">
//                     <label for="m-r" class="btn btn-ghost rounded-xl">Batal</label>
//                     <button type="submit" class="btn btn-primary rounded-xl px-8">Simpan Perubahan</button>
//                 </div>
//             </form>
//         </div></div>

//         <input type="checkbox" id="m-d" class="modal-toggle" />
//         <div class="modal"><div class="modal-box rounded-3xl" id="m-d-c"></div></div>
//     </div>`;
// };

// if (typeof window !== 'undefined') {
//     const get = (id) => document.getElementById(id);

//     window.switchTab = (t) => {
//         const isK = t === 'k';
//         get('secK').classList.toggle('hidden', !isK);
//         get('secR').classList.toggle('hidden', isK);
//         get('tabK').className = `tab font-bold ${isK ? 'tab-active' : 'text-base-content/40'}`;
//         get('tabR').className = `tab font-bold ${!isK ? 'tab-active' : 'text-base-content/40'}`;
//         if(!isK) window.renderRel();
//     };

//     window.renderRel = () => {
//         get('relTable').innerHTML = `
//             <table class="table w-full">
//                 <thead>
//                     <tr class="bg-base-200/50 text-base-content/70 border-b border-base-content/5">
//                         <th class="py-5 pl-8 text-xs uppercase opacity-60">Relawan</th>
//                         <th class="text-xs uppercase opacity-60">Keahlian</th>
//                         <th class="text-xs uppercase opacity-60">Status</th>
//                         <th class="text-right pr-8 text-xs uppercase opacity-60">Aksi</th>
//                     </tr>
//                 </thead>
//                 <tbody class="divide-y divide-base-content/5">${database.relawan.map(r => `
//                     <tr class="hover:bg-base-200/30 transition-colors">
//                         <td class="py-4 pl-8">
//                             <div class="flex items-center gap-3">
//                                 <div class="avatar placeholder">
//                                     <div class="bg-neutral text-neutral-content rounded-full w-10">
//                                         <span class="text-xs">${(r.name || 'T').charAt(0)}</span>
//                                     </div>
//                                 </div>
//                                 <div>
//                                     <div class="font-black text-sm">${r.name || 'Tanpa Nama'}</div>
//                                     <div class="text-[10px] opacity-50 font-bold uppercase tracking-tighter">${r.email}</div>
//                                 </div>
//                             </div>
//                         </td>
//                         <td>
//                             ${Badge({ category: r.skill || "Sosial" })}
//                         </td>
//                         <td>
//                             <div class="badge badge-md ${r.status==='Aktif'?'badge-success text-white':r.status==='Pending'?'badge-warning':'badge-error'} font-bold text-[10px] rounded-lg">
//                                 ${r.status}
//                             </div>
//                         </td>
//                         <td class="text-right pr-8">
//                             <div class="flex justify-end gap-2">
//                                 <button class="btn btn-info btn-sm text-white font-bold rounded-xl" onclick="window.modalR('${r.id}')">EDIT</button>
//                                 <button class="btn btn-ghost btn-sm text-error font-bold" onclick="window.delR('${r.id}')">HAPUS</button>
//                             </div>
//                         </td>
//                     </tr>`).join('')}
//                 </tbody>
//             </table>`;
//     };

//     window.modalR = (id) => {
//         const r = database.relawan.find(i => String(i.id) === String(id));
//         if(!r) return;
//         get('er-id').value = r.id;
//         get('er-n').value = r.name || "";
//         get('er-e').value = r.email || "";
//         get('er-k').value = r.skill || "Umum";
//         get('er-s').value = r.status || "Aktif";
//         get('m-r').checked = true;
//     };

//     window.viewD = (cid) => {
//         const logs = database.donasi.filter(d => String(d.campaignId) === String(cid));
//         get('m-d-c').innerHTML = `
//             <div class="flex justify-between items-center mb-6">
//                 <h3 class="font-black text-2xl italic tracking-tighter">LIST DONATUR</h3>
//                 <span class="badge badge-primary font-bold">${logs.length} Donasi</span>
//             </div>
//             <div class="space-y-3 max-h-96 overflow-y-auto pr-2">${logs.map(d => `
//                 <div class="flex justify-between items-center p-4 bg-base-200 rounded-2xl border border-base-content/5">
//                     <div>
//                         <p class="font-black text-sm">${d.donaturName}</p>
//                         <p class="text-[10px] opacity-40 uppercase font-bold">${new Date().toLocaleDateString('id-ID')}</p>
//                     </div>
//                     <span class="text-primary font-black text-lg">${fmt(d.amount)}</span>
//                 </div>`).join('') || '<div class="text-center py-10 opacity-30 font-bold italic">Belum ada donasi</div>'}
//             </div>
//             <div class="modal-action pt-4"><label for="m-d" class="btn btn-block rounded-xl font-bold">Tutup Jendela</label></div>`;
//         get('m-d').checked = true;
//     };

//     window.modalK = (id = null) => {
//         const k = database.kampanye.find(i => String(i.id) === String(id)) || {};
//         get('e-id').value = k.id || "";
//         get('i-j').value = k.title || "";
//         get('i-k').value = k.category || "Sosial";
//         get('i-t').value = k.target || "";
//         get('i-g').value = k.image || "";
//         get('i-d').value = k.description || "";
//         get('m-k-t').innerHTML = id ? `<i class="fas fa-edit text-info"></i> Edit Program` : `<i class="fas fa-plus text-primary"></i> Program Baru`;
//         get('m-k').checked = true;
//     };

//     window.delK = (id) => confirm("Apakah Anda yakin ingin menghapus kampanye ini?") && (database.kampanye = database.kampanye.filter(k => String(k.id) !== String(id)), window.navigateTo('dashboard-admin'));
//     window.delR = (id) => confirm("Apakah Anda yakin ingin mengeluarkan relawan ini?") && (database.relawan = database.relawan.filter(r => String(r.id) !== String(id)), window.renderRel());

//     setTimeout(() => {
//         get('f-k')?.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const id = get('e-id').value;
//             const data = { title: get('i-j').value, category: get('i-k').value, target: parseInt(get('i-t').value), image: get('i-g').value, description: get('i-d').value };
//             if (id) {
//                 const idx = database.kampanye.findIndex(k => String(k.id) === String(id));
//                 database.kampanye[idx] = { ...database.kampanye[idx], ...data };
//             } else {
//                 database.kampanye.unshift({ id: 'K'+Date.now(), ...data, collected: 0, author: "Admin", deadline: "2026-12-31" });
//             }
//             get('m-k').checked = false;
//             window.navigateTo('dashboard-admin');
//         });

//         get('f-r')?.addEventListener('submit', (e) => {
//             e.preventDefault();
//             const id = get('er-id').value;
//             const idx = database.relawan.findIndex(r => String(r.id) === String(id));
//             if(idx !== -1) {
//                 database.relawan[idx] = { 
//                     ...database.relawan[idx], 
//                     name: get('er-n').value,
//                     email: get('er-e').value,
//                     skill: get('er-k').value,
//                     status: get('er-s').value
//                 };
//             }
//             get('m-r').checked = false;
//             window.renderRel();
//         });
//     }, 500);
// }

import { database } from "../assets/js/data.js";
import { KampanyeCard } from "../components/KampanyeCard.js";
import { InputField } from "../components/InputField.js";
import { Badge } from "../components/Badge.js";

// Fungsi pembantu untuk format mata uang Rupiah agar rapi
const fmt = (n) => `Rp ${Number(n).toLocaleString('id-ID')}`;

export const DashboardAdmin = () => {
    /* STEP 1: Ambil data dari LocalStorage. 
       Jika kosong, gunakan data default dari database.js 
    */
    const currentDB = JSON.parse(localStorage.getItem("charity_db")) || database;
    const { kampanye = [], donasi = [], relawan = [], currentUser: user } = currentDB;

    // Menghitung total uang yang masuk dari seluruh history donasi
    const totalDana = donasi.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    return `
    <div class="min-h-screen bg-base-200 pb-20 font-sans text-base-content">
        <main class="max-w-7xl mx-auto p-6">
            
            <!-- SECTION: HEADER & TAB NAVIGASI -->
            <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
                <div>
                    <h1 class="text-3xl font-black italic text-primary tracking-tighter uppercase">Admin Panel</h1>
                    <p class="opacity-60 text-sm font-medium">Pengelola: <span class="badge badge-outline font-bold">${user?.name || 'Admin'}</span></p>
                </div>
                <!-- Tombol pemindah halaman antara Kampanye dan Relawan -->
                <div class="tabs tabs-boxed bg-base-100 p-1 shadow-sm border border-base-content/5">
                    <button id="tabK" class="tab tab-active font-bold transition-all px-6" onclick="window.switchTab('k')">Kampanye</button>
                    <button id="tabR" class="tab font-bold text-base-content/40 transition-all px-6" onclick="window.switchTab('r')">Relawan</button>
                </div>
            </header>

            <!-- SECTION: RINGKASAN STATISTIK (DASHBOARD) -->
            <section class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div class="bg-primary text-white p-7 rounded-[2rem] shadow-lg transform hover:scale-[1.02] transition-transform">
                    <p class="text-xs font-bold uppercase opacity-80 mb-1">Total Donasi Terkumpul</p>
                    <h3 class="text-3xl font-black">${fmt(totalDana)}</h3>
                </div>
                <div class="bg-base-100 p-7 rounded-[2rem] border border-base-content/5 shadow-sm">
                    <p class="opacity-40 text-xs font-bold uppercase mb-1">Total Relawan</p>
                    <h3 class="text-3xl font-black" id="stat-relawan">${relawan.length} <span class="text-sm font-medium opacity-50 uppercase">Jiwa</span></h3>
                </div>
                <div class="bg-base-100 p-7 rounded-[2rem] border border-base-content/5 shadow-sm">
                    <p class="opacity-40 text-xs font-bold uppercase mb-1">Program Berjalan</p>
                    <h3 class="text-3xl font-black">${kampanye.length} <span class="text-sm font-medium opacity-50 uppercase">Program</span></h3>
                </div>
            </section>

            <!-- SECTION: KONTEN TAB KAMPANYE -->
            <div id="secK" class="space-y-6 animate-in fade-in duration-500">
                <div class="flex justify-between items-center">
                    <h2 class="font-black text-xl italic underline decoration-primary underline-offset-8 uppercase tracking-tight">Daftar Program Kerja</h2>
                    <button class="btn btn-primary btn-md rounded-2xl shadow-md font-bold px-8" onclick="window.modalK()">+ Program Baru</button>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                    ${kampanye.map(k => {
                        // Logika menghitung donasi khusus per kampanye ini
                        const logs = donasi.filter(d => String(d.campaignId) === String(k.id));
                        const collected = logs.reduce((s, i) => s + (Number(i.amount) || 0), 0);
                        const daysLeft = Math.max(0, Math.ceil((new Date(k.deadline) - new Date()) / (1000*60*60*24)));

                        // Memanggil komponen KampanyeCard dan memodifikasi tombolnya untuk Admin
                        let cardHtml = KampanyeCard({ ...k, collected, daysLeft })
                            .replace(/Donasi<\/button>/, `<i class="fas fa-users mr-2"></i> Donatur</button>`)
                            .replace(/navigateTo\('donasi', {id: '.*?'}\)/, `window.viewD('${k.id}')`);

                        return `
                        <div class="bg-base-100 rounded-3xl overflow-hidden shadow-md border border-base-content/5 flex flex-col group hover:shadow-xl transition-all">
                            <div class="flex-grow">${cardHtml}</div>
                            <div class="p-4 bg-base-200/50 grid grid-cols-2 gap-3 border-t border-base-content/5">
                                <button class="btn btn-info btn-sm text-white font-bold rounded-xl" onclick="window.modalK('${k.id}')">EDIT</button>
                                <button class="btn btn-error btn-sm text-white font-bold rounded-xl" onclick="window.delK('${k.id}')">HAPUS</button>
                            </div>
                        </div>`;
                    }).join('')}
                </div>
            </div>

            <!-- SECTION: KONTEN TAB RELAWAN -->
            <div id="secR" class="hidden animate-in fade-in duration-500">
                <div class="flex justify-between items-center mb-6">
                    <h2 class="font-black text-xl italic underline decoration-primary underline-offset-8 uppercase tracking-tight">Verifikasi & Database Relawan</h2>
                </div>
                <div class="bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-content/10 shadow-xl">
                    <div class="overflow-x-auto w-full">
                        <table class="table w-full">
                            <thead>
                                <tr class="bg-base-200/50 text-base-content/70">
                                    <th class="py-5 pl-8 text-xs uppercase opacity-60">Profil Relawan</th>
                                    <th class="text-xs uppercase opacity-60">Divisi/Keahlian</th>
                                    <th class="text-xs uppercase opacity-60">Status Verifikasi</th>
                                    <th class="text-right pr-8 text-xs uppercase opacity-60">Tindakan</th>
                                </tr>
                            </thead>
                            <tbody id="relTableBody" class="divide-y divide-base-content/5">
                                <!-- Data Relawan akan muncul di sini via JavaScript renderRel() -->
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </main>

        <!-- --- MODAL-MODAL (Pop-up Form) --- -->

        <!-- 1. Modal Form Kampanye (Tambah/Edit) -->
        <input type="checkbox" id="m-k" class="modal-toggle" />
        <div class="modal"><div class="modal-box rounded-[2rem] max-w-2xl">
            <h3 class="font-black text-2xl mb-6 flex items-center gap-2" id="m-k-t">Form Program</h3>
            <form id="f-k" class="space-y-4">
                <input type="hidden" id="e-id">
                ${InputField({ label: "Judul Kampanye", name: "i-j", placeholder: "Contoh: Bantuan Pangan..." })}
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div class="form-control"><label class="label"><span class="label-text font-bold text-base-content/80">Kategori</span></label>
                    <select id="i-k" class="select select-bordered rounded-xl focus:select-primary font-bold">
                        <option>Sosial</option><option>Bencana Alam</option><option>Kesehatan</option><option>Pendidikan</option><option>Kemanusiaan</option>
                    </select></div>
                    ${InputField({ label: "Target Dana (Rp)", name: "i-t", type: "number", placeholder: "1000000" })}
                </div>
                ${InputField({ label: "URL Gambar", name: "i-g", placeholder: "https://..." })}
                <div class="form-control">
                    <label class="label"><span class="label-text font-bold text-base-content/80">Deskripsi Lengkap</span></label>
                    <textarea id="i-d" placeholder="Tuliskan detail program..." class="textarea textarea-bordered w-full rounded-xl h-32 focus:textarea-primary font-medium" required></textarea>
                </div>
                <div class="modal-action gap-2">
                    <label for="m-k" class="btn btn-ghost rounded-xl font-bold">Batal</label>
                    <button type="submit" class="btn btn-primary rounded-xl px-10 font-black">Simpan Program</button>
                </div>
            </form>
        </div></div>

        <!-- 2. Modal Verifikasi Relawan (Update Status Approved/Rejected) -->
        <input type="checkbox" id="m-r" class="modal-toggle" />
        <div class="modal"><div class="modal-box rounded-[2rem]">
            <h3 class="font-black text-2xl mb-6 italic text-primary">VERIFIKASI RELAWAN</h3>
            <form id="f-r" class="space-y-4">
                <input type="hidden" id="er-id">
                ${InputField({ label: "Nama Pendaftar", name: "er-n" })}
                ${InputField({ label: "Kontak (WA/Email)", name: "er-e" })}
                <div class="grid grid-cols-2 gap-4">
                    <div class="form-control">
                        <label class="label"><span class="label-text font-bold text-base-content/80">Divisi</span></label>
                        <select id="er-k" class="select select-bordered rounded-xl font-bold">
                            <option value="Umum">Umum</option><option value="Medis">Medis</option>
                            <option value="Logistik">Logistik</option><option value="Edukasi">Edukasi</option>
                            <option value="Dokumentasi">Dokumentasi</option>
                        </select>
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text font-bold text-base-content/80">Status ACC</span></label>
                        <select id="er-s" class="select select-bordered rounded-xl font-black text-primary">
                            <option value="pending">⏳ Pending</option>
                            <option value="approved">✅ Approved</option>
                            <option value="rejected">❌ Rejected</option>
                        </select>
                    </div>
                </div>
                <div class="form-control">
                    <label class="label"><span class="label-text font-bold text-base-content/80">Alasan Bergabung</span></label>
                    <textarea id="er-a" class="textarea textarea-bordered rounded-xl h-24 italic opacity-80" readonly></textarea>
                </div>
                <div class="modal-action pt-4 flex gap-2">
                    <label for="m-r" class="btn btn-ghost rounded-xl font-bold">Batal</label>
                    <button type="submit" class="btn btn-primary rounded-xl px-8 font-black">SIMPAN & UPDATE</button>
                </div>
            </form>
        </div></div>

        <!-- 3. Modal List Donatur -->
        <input type="checkbox" id="m-d" class="modal-toggle" />
        <div class="modal"><div class="modal-box rounded-3xl" id="m-d-c"></div></div>
    </div>`;
};

// --- LOGIKA INTERAKSI (Hanya jalan di Browser) ---
if (typeof window !== 'undefined') {
    const get = (id) => document.getElementById(id);

    // Fungsi untuk ganti tab
    window.switchTab = (t) => {
        const isK = t === 'k';
        if (get('secK')) get('secK').classList.toggle('hidden', !isK);
        if (get('secR')) get('secR').classList.toggle('hidden', isK);
        if (get('tabK')) get('tabK').className = `tab font-bold px-6 ${isK ? 'tab-active' : 'text-base-content/40'}`;
        if (get('tabR')) get('tabR').className = `tab font-bold px-6 ${!isK ? 'tab-active' : 'text-base-content/40'}`;
        
        if(!isK) window.renderRel();
    };

    // Fungsi menampilkan daftar relawan ke dalam tabel
    window.renderRel = () => {
        const db = JSON.parse(localStorage.getItem("charity_db")) || database;
        const relawan = db.relawan || [];
        const container = get('relTableBody');
        if(!container) return;

        container.innerHTML = relawan.length === 0 
            ? `<tr><td colspan="4" class="text-center py-20 opacity-30 italic font-bold">Belum ada pendaftar relawan</td></tr>`
            : relawan.map(r => {
                const sColor = r.status === 'approved' ? 'badge-success' : r.status === 'pending' ? 'badge-warning' : 'badge-error';
                return `
                <tr class="hover:bg-base-200/50 transition-all">
                    <td class="py-4 pl-8">
                        <div class="flex items-center gap-3">
                            <div class="avatar placeholder">
                                <div class="bg-primary text-primary-content rounded-full w-10">
                                    <span class="text-xs font-black">${(r.name || 'U').charAt(0).toUpperCase()}</span>
                                </div>
                            </div>
                            <div>
                                <div class="font-black text-sm uppercase tracking-tight">${r.name || 'Pendaftar'}</div>
                                <div class="text-[10px] opacity-60 font-bold">${r.whatsapp || 'No Contact'}</div>
                            </div>
                        </div>
                    </td>
                    <td>${Badge({ category: r.divisi || "Umum" })}</td>
                    <td><div class="badge ${sColor} text-white font-black text-[10px] px-3">${(r.status || 'PENDING').toUpperCase()}</div></td>
                    <td class="text-right pr-8">
                        <div class="flex justify-end gap-2">
                            <!-- Tombol Verifikasi -->
                            <button class="btn btn-primary btn-sm rounded-xl font-black px-4" onclick="window.modalR('${r.id}')">VERIFIKASI</button>
                            <!-- Tombol Hapus (Sekarang dengan tulisan HAPUS) -->
                            <button class="btn btn-error btn-sm text-white rounded-xl font-bold px-4" onclick="window.delR('${r.id}')">
                                <i class="fas fa-trash mr-1"></i> HAPUS
                            </button>
                        </div>
                    </td>
                </tr>`;
            }).join('');
    };

    // Fungsi membuka modal Verifikasi Relawan & mengisi datanya
    window.modalR = (id) => {
        const db = JSON.parse(localStorage.getItem("charity_db")) || database;
        const r = db.relawan.find(i => String(i.id) === String(id));
        if(!r) return;
        get('er-id').value = r.id;
        get('er-n').value = r.name || "";
        get('er-e').value = r.whatsapp || "";
        get('er-k').value = r.divisi || "Umum";
        get('er-s').value = r.status || "pending";
        get('er-a').value = r.alasan || "";
        get('m-r').checked = true;
    };

    // Fungsi hapus relawan
    window.delR = (id) => {
        if(!confirm("Hapus data relawan ini secara permanen?")) return;
        const db = JSON.parse(localStorage.getItem("charity_db")) || database;
        db.relawan = db.relawan.filter(r => String(r.id) !== String(id));
        localStorage.setItem("charity_db", JSON.stringify(db));
        window.renderRel();
    };

    // Fungsi buka modal Kampanye
    window.modalK = (id = null) => {
        const db = JSON.parse(localStorage.getItem("charity_db")) || database;
        const k = db.kampanye.find(i => String(i.id) === String(id)) || {};
        get('e-id').value = k.id || "";
        get('i-j').value = k.title || "";
        get('i-k').value = k.category || "Sosial";
        get('i-t').value = k.target || "";
        get('i-g').value = k.image || "";
        get('i-d').value = k.description || "";
        get('m-k-t').innerText = id ? "Edit Program" : "Buat Program Baru";
        get('m-k').checked = true;
    };

    // Fungsi hapus kampanye
    window.delK = (id) => {
        if(!confirm("Hapus kampanye ini?")) return;
        const db = JSON.parse(localStorage.getItem("charity_db")) || database;
        db.kampanye = db.kampanye.filter(k => String(k.id) !== String(id));
        localStorage.setItem("charity_db", JSON.stringify(db));
        window.navigateTo('dashboard-admin');
    };

    // Fungsi inisialisasi awal saat halaman dibuka
    const initAdmin = () => {
        if (get('relTableBody')) {
             window.renderRel();
             
             // Handle Simpan Kampanye
             get('f-k')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const db = JSON.parse(localStorage.getItem("charity_db")) || database;
                const id = get('e-id').value;
                const data = { title: get('i-j').value, category: get('i-k').value, target: parseInt(get('i-t').value), image: get('i-g').value, description: get('i-d').value };
                
                if (id) {
                    const idx = db.kampanye.findIndex(k => String(k.id) === String(id));
                    db.kampanye[idx] = { ...db.kampanye[idx], ...data };
                } else {
                    db.kampanye.unshift({ id: 'K'+Date.now(), ...data, collected: 0, author: "Admin", deadline: "2026-12-31" });
                }
                localStorage.setItem("charity_db", JSON.stringify(db));
                get('m-k').checked = false;
                window.navigateTo('dashboard-admin');
            });

            // Handle Update Status Relawan
            get('f-r')?.addEventListener('submit', (e) => {
                e.preventDefault();
                const db = JSON.parse(localStorage.getItem("charity_db")) || database;
                const id = get('er-id').value;
                const idx = db.relawan.findIndex(r => String(r.id) === String(id));
                if(idx !== -1) {
                    db.relawan[idx] = { 
                        ...db.relawan[idx], 
                        name: get('er-n').value,
                        whatsapp: get('er-e').value,
                        divisi: get('er-k').value,
                        status: get('er-s').value
                    };
                    localStorage.setItem("charity_db", JSON.stringify(db));
                }
                get('m-r').checked = false;
                window.renderRel();
            });
        } else {
            setTimeout(initAdmin, 100);
        }
    };
    initAdmin();
}
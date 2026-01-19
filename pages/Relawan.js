import { database, getCurrentUser } from "../assets/js/data.js";
import { AlertMessage } from "../components/AlertMessage.js";

/**
 * Fungsi sinkronisasi kritikal:
 * Memastikan variabel database pusat selalu sama dengan localStorage
 */
const syncGlobalDatabase = () => {
    const storageDB = JSON.parse(localStorage.getItem("charity_db"));
    if (storageDB) {
        // Update properti database pusat satu per satu agar referensi tetap terjaga
        Object.keys(storageDB).forEach(key => {
            database[key] = storageDB[key];
        });
    }
    return database;
};

export const Relawan = () => {
    // 1. Sinkronkan database global dulu sebelum melakukan pengecekan apapun
    const currentDB = syncGlobalDatabase();
    const user = getCurrentUser();

    if (!user) {
        setTimeout(() => window.navigateTo("login"), 100);
        return `<div class="p-20 text-center font-bold text-slate-500">Mengarahkan ke Login...</div>`;
    }

    // Pastikan array relawan ada
    if (!currentDB.relawan) currentDB.relawan = [];

    // Mencari data relawan milik user ini
    const dataRelawan = currentDB.relawan.find(r => r.userId === user.id);

    // --- TAMPILAN 1: DASHBOARD KAMPANYE (SUDAH APPROVED) ---
    if (dataRelawan && dataRelawan.status === "approved") {
        const myCampaigns = (currentDB.kampanye || []).filter(c => c.authorId === user.id);

        return `
        <div class="container mx-auto py-12 px-4 max-w-6xl animate-in fade-in duration-500">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div>
                    <div class="inline-block px-4 py-1.5 bg-success/10 border border-success/20 rounded-full mb-4">
                        <span class="text-success text-xs font-black uppercase tracking-widest">Relawan Terverifikasi</span>
                    </div>
                    <h1 class="text-5xl font-black font-poppins tracking-tighter leading-none text-base-content uppercase">
                        Panel <span class="text-primary">Kampanye.</span>
                    </h1>
                    <p class="mt-4 text-base-content/60 font-medium">Selamat datang, ${user.name}. Kelola program kebaikan Anda.</p>
                </div>
                <button onclick="window.showCreateModal()" class="btn btn-primary px-8 rounded-2xl text-primary-content font-black shadow-lg shadow-primary/20 uppercase tracking-tighter h-14">
                    + Buat Kampanye Baru
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${myCampaigns.length === 0 ? `
                    <div class="col-span-full py-20 text-center bg-base-300 rounded-[3rem] border-2 border-dashed border-base-content/10">
                        <p class="text-base-content/40 font-bold uppercase tracking-widest">Belum ada kampanye yang Anda buat</p>
                    </div>
                ` : myCampaigns.map(c => `
                    <div class="card bg-base-300 shadow-xl border border-white/5 overflow-hidden rounded-[2.5rem] group">
                        <figure class="h-48 overflow-hidden relative">
                            <img src="${c.image}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div class="absolute top-4 right-4 badge badge-primary font-black uppercase text-[10px] p-3">${c.category}</div>
                        </figure>
                        <div class="card-body p-6">
                            <h3 class="card-title text-lg font-black leading-tight line-clamp-2 uppercase">${c.title}</h3>
                            <div class="mt-4 flex gap-2">
                                <button onclick="window.showEditModal('${c.id}')" class="btn btn-sm btn-ghost bg-base-200 rounded-xl flex-1 font-bold uppercase text-[10px]">Edit</button>
                                <button onclick="window.navigateTo('detail', {id: '${c.id}'})" class="btn btn-sm btn-primary rounded-xl flex-1 font-bold uppercase text-[10px]">Lihat</button>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>

        <dialog id="modal-kampanye" class="modal modal-bottom sm:modal-middle backdrop-blur-sm">
            <div class="modal-box bg-base-300 border border-white/10 rounded-[3rem] p-8 max-w-2xl">
                <h3 id="modal-title" class="text-2xl font-black uppercase tracking-tighter mb-6">Buat Kampanye</h3>
                <form id="form-kampanye" onsubmit="window.handleSaveKampanye(event)" class="space-y-4 text-left">
                    <input type="hidden" id="kampanye-id">
                    <div class="form-control">
                        <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Judul Kampanye</span></label>
                        <input type="text" id="k-title" required class="input bg-base-100 border-base-content/10 w-full h-14 rounded-xl font-bold">
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Kategori</span></label>
                            <select id="k-category" class="select bg-base-100 border-base-content/10 w-full h-14 rounded-xl font-bold">
                                <option value="Pendidikan">Pendidikan</option>
                                <option value="Kesehatan">Kesehatan</option>
                                <option value="Bencana Alam">Bencana Alam</option>
                                <option value="Lingkungan">Lingkungan</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Target Dana (Rp)</span></label>
                            <input type="number" id="k-target" required class="input bg-base-100 border-base-content/10 w-full h-14 rounded-xl font-bold">
                        </div>
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">URL Gambar</span></label>
                        <input type="url" id="k-image" required placeholder="https://..." class="input bg-base-100 border-base-content/10 w-full h-14 rounded-xl font-bold">
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Deadline</span></label>
                        <input type="date" id="k-deadline" required class="input bg-base-100 border-base-content/10 w-full h-14 rounded-xl font-bold">
                    </div>
                    <div class="form-control">
                        <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Deskripsi</span></label>
                        <textarea id="k-description" required class="textarea bg-base-100 border-base-content/10 w-full rounded-xl font-medium h-32 pt-4"></textarea>
                    </div>
                    <div class="modal-action gap-3 mt-8">
                        <button type="button" onclick="document.getElementById('modal-kampanye').close()" class="btn btn-ghost rounded-2xl font-bold uppercase">Batal</button>
                        <button type="submit" class="btn btn-primary px-8 rounded-2xl text-primary-content font-black uppercase">Simpan</button>
                    </div>
                </form>
            </div>
        </dialog>
        `;
    }

    // --- TAMPILAN 2: STATUS PENDING ---
    if (dataRelawan && dataRelawan.status === "pending") {
        return `
        <div class="container mx-auto py-20 px-4 text-center animate-in fade-in duration-700">
            <div class="max-w-2xl mx-auto card bg-base-300 shadow-2xl p-10 md:p-16 border border-white/5 rounded-[3rem] flex flex-col items-center">
                <div class="w-24 h-24 bg-warning/10 rounded-full flex items-center justify-center mb-8 animate-pulse border border-warning/20">
                    <span class="text-5xl">⏳</span>
                </div>
                <h1 class="text-3xl md:text-4xl font-black font-poppins tracking-tighter text-base-content uppercase">Pendaftaran <span class="text-primary">Diproses!</span></h1>
                <p class="mt-6 text-base-content/70 font-medium leading-relaxed">Halo <span class="font-bold text-base-content">${user.name}</span>, pendaftaran Anda sedang dalam tahap verifikasi admin.</p>
                <div class="mt-10 flex gap-4">
                    <button onclick="window.navigateTo('home')" class="btn btn-ghost rounded-2xl font-bold uppercase">Kembali</button>
                    <a href="#" class="btn btn-primary px-8 rounded-2xl text-primary-content font-black uppercase tracking-tighter">Cek Berkala</a>
                </div>
            </div>
        </div>`;
    }

    // --- TAMPILAN 3: FORM PENDAFTARAN ---
    return `
    <div class="container mx-auto py-12 px-4 max-w-6xl animate-in fade-in duration-500">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <!-- Sisi Kiri: Teks Ajakan -->
            <div class="space-y-8 text-left">
                <div class="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <span class="text-primary text-xs font-black uppercase tracking-widest">Ayo Bergabung!</span>
                </div>
                <h1 class="text-6xl font-black font-poppins tracking-tighter leading-none text-base-content uppercase">
                    Mulai Langkah <br> 
                    <span class="text-primary underline decoration-primary/30">Kebaikanmu.</span>
                </h1>
                <p class="text-base-content/60 font-medium max-w-md">Daftar sebagai relawan untuk membuat kampanye dan mengelola donasi Anda sendiri. Bersama kita buat perubahan nyata.</p>
                
                <div class="flex flex-col gap-4 mt-10">
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center font-black text-primary">01</div>
                        <p class="font-bold uppercase text-xs tracking-widest text-base-content/40">Isi Form Pendaftaran</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center font-black text-primary">02</div>
                        <p class="font-bold uppercase text-xs tracking-widest text-base-content/40">Verifikasi oleh Admin</p>
                    </div>
                    <div class="flex items-center gap-4">
                        <div class="w-10 h-10 rounded-full bg-base-300 flex items-center justify-center font-black text-primary">03</div>
                        <p class="font-bold uppercase text-xs tracking-widest text-base-content/40">Mulai Buat Kampanye</p>
                    </div>
                </div>
            </div>

            <!-- Sisi Kanan: Form Pendaftaran -->
            <div class="card bg-base-300 shadow-2xl border border-white/5 rounded-[3rem]">
                <div class="card-body p-8 lg:p-12 text-left">
                    <h2 class="text-2xl font-black font-poppins text-base-content mb-6 uppercase">Form Relawan</h2>
                    <form onsubmit="window.handleDaftarRelawan(event)" class="space-y-5">
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Nama Lengkap</span></label>
                            <input type="text" id="relawan-nama" value="${user.name}" readonly class="input bg-base-200 border-none w-full h-14 rounded-xl font-bold text-base-content/50 cursor-not-allowed">
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Alamat Email</span></label>
                            <input type="email" id="relawan-email" value="${user.email}" readonly class="input bg-base-200 border-none w-full h-14 rounded-xl font-bold text-base-content/50 cursor-not-allowed">
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Pilih Divisi</span></label>
                            <select id="relawan-divisi" class="select bg-base-100 border-base-content/10 w-full h-14 rounded-xl font-bold">
                                <option value="Umum">Relawan Umum</option>
                                <option value="Medis">Relawan Medis</option>
                                <option value="Logistik">Relawan Logistik</option>
                                <option value="Edukasi">Relawan Edukasi</option>
                                <option value="Dokumentasi">Relawan Dokumentasi</option>
                            </select>
                        </div>
                        <div class="form-control">
                            <label class="label"><span class="label-text font-bold text-base-content/50 uppercase text-[10px] tracking-widest">Alasan Bergabung</span></label>
                            <textarea id="relawan-alasan" required placeholder="Ceritakan motivasi Anda..." class="textarea bg-base-100 border-base-content/10 w-full rounded-xl font-medium h-24 pt-4"></textarea>
                        </div>
                        <button type="submit" id="btn-submit-relawan" class="btn btn-primary w-full rounded-2xl text-lg font-black text-primary-content uppercase h-16 tracking-tighter mt-4 shadow-lg shadow-primary/20">
                            Kirim Pendaftaran
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
};

// --- LOGIKA DATA (OPERASI DATABASE) ---

window.handleSaveKampanye = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const db = syncGlobalDatabase(); 
    
    const id = document.getElementById("kampanye-id").value;
    const data = {
        title: document.getElementById("k-title").value,
        category: document.getElementById("k-category").value,
        target: parseInt(document.getElementById("k-target").value),
        image: document.getElementById("k-image").value,
        deadline: document.getElementById("k-deadline").value,
        description: document.getElementById("k-description").value,
    };

    if (!db.kampanye) db.kampanye = [];

    if (id) {
        const idx = db.kampanye.findIndex(c => c.id === id);
        if (idx !== -1) db.kampanye[idx] = { ...db.kampanye[idx], ...data };
    } else {
        db.kampanye.push({
            id: "K-" + Date.now(),
            ...data,
            authorId: user.id,
            authorName: user.name,
            collected: 0,
            createdAt: new Date().toISOString()
        });
    }

    localStorage.setItem("charity_db", JSON.stringify(db));
    document.getElementById("modal-kampanye").close();
    document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Kampanye Berhasil Disimpan!", type: "success" }));
    setTimeout(() => window.location.reload(), 1000);
};

window.handleDaftarRelawan = (e) => {
    e.preventDefault();
    const user = getCurrentUser();
    const db = syncGlobalDatabase();

    const newRelawan = {
        id: "REL-" + Date.now(),
        userId: user.id,
        name: user.name,
        email: user.email,
        divisi: document.getElementById("relawan-divisi").value,
        alasan: document.getElementById("relawan-alasan").value,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    if (!db.relawan) db.relawan = [];
    
    const existingIdx = db.relawan.findIndex(r => r.userId === user.id);
    if (existingIdx !== -1) {
        db.relawan[existingIdx] = newRelawan;
    } else {
        db.relawan.push(newRelawan);
    }

    localStorage.setItem("charity_db", JSON.stringify(db));
    document.body.insertAdjacentHTML('beforeend', AlertMessage({ message: "Pendaftaran Berhasil Dikirim!", type: "success" }));
    setTimeout(() => window.location.reload(), 1500);
};

window.showCreateModal = () => {
    document.getElementById("modal-title").innerText = "Buat Kampanye Baru";
    document.getElementById("form-kampanye").reset();
    document.getElementById("kampanye-id").value = "";
    document.getElementById("modal-kampanye").showModal();
};

window.showEditModal = (id) => {
    const db = syncGlobalDatabase();
    const item = db.kampanye.find(c => c.id === id);
    if (!item) return;

    document.getElementById("modal-title").innerText = "Edit Kampanye";
    document.getElementById("kampanye-id").value = item.id;
    document.getElementById("k-title").value = item.title;
    document.getElementById("k-category").value = item.category;
    document.getElementById("k-target").value = item.target;
    document.getElementById("k-image").value = item.image;
    document.getElementById("k-deadline").value = item.deadline;
    document.getElementById("k-description").value = item.description;
    document.getElementById("modal-kampanye").showModal();
};
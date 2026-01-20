import {
  database,
  getCurrentUser,
  loadDatabase,
  generateId, // Import fungsi generateId untuk Sequential ID
} from "../assets/js/data.js";
import { AlertMessage } from "../components/AlertMessage.js";
import { InputField } from "../components/InputField.js";

/**
 * Sinkronisasi Data Global yang Aman
 */
const syncGlobalData = (newData) => {
  if (newData.kampanye) database.kampanye = newData.kampanye;
  if (newData.relawan) database.relawan = newData.relawan;

  localStorage.setItem(
    "charity_db",
    JSON.stringify({
      ...database,
      kampanye: database.kampanye,
      relawan: database.relawan,
      donasi: database.donasi,
      users: database.users,
    }),
  );
};

export const Relawan = () => {
  loadDatabase();
  const user = getCurrentUser();

  if (!user) {
    setTimeout(() => window.navigateTo("login"), 100);
    return `<div class="p-20 text-center font-bold text-base-content/50">Mengarahkan ke Login...</div>`;
  }

  // Cek apakah user adalah admin
  const isAdmin = user.role === "admin";
  const dataRelawan = (database.relawan || []).find(
    (r) => r.userId === user.id,
  );

  setTimeout(() => window.initRelawanLogic(), 100);

  // --- CASE 1: ADMIN ATAU RELAWAN APPROVED (PANEL KAMPANYE) ---
  if (isAdmin || (dataRelawan && dataRelawan.status === "approved")) {
    const myCampaigns = (database.kampanye || []).filter(
      (c) => c.authorId === user.id,
    );

    return `
        <div class="container mx-auto py-12 px-4 max-w-6xl animate-in fade-in duration-500 text-left font-inter text-base-content">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                <div class="text-left">
                    <div class="inline-block px-4 py-1.5 bg-success/10 border border-success/20 rounded-full mb-4">
                        <span class="text-success text-[10px] font-black uppercase tracking-widest italic">
                            ${isAdmin ? "Akses Administrator" : `Terverifikasi: ${dataRelawan.skill}`}
                        </span>
                    </div>
                    <h1 class="text-4xl md:text-5xl font-black font-poppins tracking-tighter leading-none uppercase">
                        Panel <span class="text-primary font-poppins">Relawan.</span>
                    </h1>
                    <p class="mt-4 text-base-content/60 font-medium italic">Kelola program kebaikan kamu secara mandiri.</p>
                </div>
                <!-- FIX URL LEAK: type="button" -->
                <button type="button" onclick="window.showCreateModal()" class="btn btn-primary px-8 rounded-2xl text-white font-black shadow-lg shadow-primary/20 uppercase tracking-tighter h-14 w-full md:w-auto border-none">
                    + Buat Kampanye Baru
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${
                  myCampaigns.length === 0
                    ? `
                    <div class="col-span-full py-32 text-center bg-base-100 rounded-[3rem] border-2 border-dashed border-base-content/10">
                        <p class="text-base-content/30 font-black uppercase tracking-[0.2em] italic">Kamu belum memiliki kampanye aktif</p>
                    </div>
                `
                    : myCampaigns
                        .map(
                          (c) => `
                    <div class="card bg-base-100 shadow-xl border border-base-content/5 overflow-hidden rounded-[2.5rem] group hover:-translate-y-2 transition-all duration-500">
                        <figure class="h-48 overflow-hidden relative">
                            <img src="${c.image}" alt="${c.title}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                            <div class="absolute top-4 right-4 badge bg-primary text-white border-none font-black uppercase text-[9px] p-3 tracking-widest rounded-lg shadow-lg">${c.category}</div>
                        </figure>
                        <div class="card-body p-6 text-left">
                            <h3 class="card-title text-lg font-black leading-tight line-clamp-2 uppercase">${c.title}</h3>
                            <div class="mt-6 flex gap-3 font-poppins">
                                <!-- FIX URL LEAK: type="button" -->
                                <button type="button" onclick="window.showEditModal('${c.id}')" class="btn btn-sm h-11 btn-ghost bg-base-200 rounded-xl flex-1 font-black uppercase text-[10px] tracking-widest">Edit</button>
                                <button type="button" onclick="window.navigateTo('detail', {id: '${c.id}'})" class="btn btn-sm h-11 btn-primary rounded-xl flex-1 font-black uppercase text-[10px] tracking-widest text-white shadow-md border-none">Lihat</button>
                            </div>
                        </div>
                    </div>
                `,
                        )
                        .join("")
                }
            </div>
        </div>

        <input type="checkbox" id="modal-relawan-campaign-toggle" class="modal-toggle" />
        <div class="modal backdrop-blur-md">
            <div class="modal-box bg-base-100 border border-base-content/5 rounded-[3rem] p-8 max-w-2xl animate-in zoom-in duration-300 text-base-content">
                <div class="flex justify-between items-center mb-8">
                    <h3 id="modal-title-display" class="text-2xl font-black uppercase tracking-tighter font-poppins">Form Program</h3>
                    <label for="modal-relawan-campaign-toggle" class="btn btn-ghost btn-circle btn-sm">✕</label>
                </div>
                <form id="form-relawan-campaign" class="space-y-4 text-left font-inter">
                    <input type="hidden" id="form-campaign-id">
                    ${InputField({ label: "Judul Program", name: "form-campaign-title", placeholder: "Contoh: Bantuan Sembako..." })}
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-control text-left">
                            <label class="label"><span class="label-text font-black text-base-content/50 uppercase text-[10px] tracking-widest text-left">Kategori</span></label>
                            <select id="form-campaign-category" class="select select-bordered bg-base-100 w-full h-14 rounded-xl font-bold text-base-content focus:select-primary">
                                <option value="Pendidikan">Pendidikan</option>
                                <option value="Kesehatan">Kesehatan</option>
                                <option value="Bencana Alam">Bencana Alam</option>
                                <option value="Lingkungan">Lingkungan</option>
                            </select>
                        </div>
                        ${InputField({ label: "Target Dana (Rp)", type: "number", name: "form-campaign-target" })}
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${InputField({ label: "URL Thumbnail", name: "form-campaign-image" })}
                        ${InputField({ label: "Tenggat Waktu", type: "date", name: "form-campaign-deadline" })}
                    </div>
                    <div class="form-control text-left">
                        <label class="label"><span class="label-text font-black text-base-content/50 uppercase text-[10px] tracking-widest text-left">Deskripsi Program</span></label>
                        <textarea id="form-campaign-description" required class="textarea textarea-bordered bg-base-100 w-full rounded-xl font-medium h-32 pt-4 focus:textarea-primary text-base-content"></textarea>
                    </div>
                    <div class="modal-action gap-3 mt-8">
                        <label for="modal-relawan-campaign-toggle" class="btn btn-ghost rounded-2xl font-black uppercase text-xs">Batal</label>
                        <button type="submit" class="btn btn-primary px-10 rounded-2xl text-white font-black uppercase text-xs shadow-lg border-none">Simpan Perubahan</button>
                    </div>
                </form>
            </div>
        </div>
        `;
  }

  // --- CASE 2: STATUS PENDING ---
  if (dataRelawan && dataRelawan.status === "pending") {
    return `
        <div class="container mx-auto py-24 px-4 text-center animate-in fade-in duration-700 font-inter text-base-content">
            <div class="max-w-2xl mx-auto card bg-base-100 shadow-2xl p-10 md:p-16 border border-base-content/5 rounded-[3rem] flex flex-col items-center">
                <div class="w-24 h-24 bg-warning/10 text-warning rounded-full flex items-center justify-center mb-8 animate-bounce border border-warning/20 shadow-inner text-5xl">⏳</div>
                <h1 class="text-3xl md:text-4xl font-black font-poppins tracking-tighter uppercase leading-none">Pendaftaran <span class="text-primary font-poppins">Diproses!</span></h1>
                <p class="mt-6 text-base-content/60 font-medium leading-relaxed text-center">Halo <span class="font-black text-base-content">${user.name}</span>, tim admin sedang meninjau profil pendaftaran relawan Anda.</p>
                <div class="mt-10 flex flex-col sm:flex-row gap-4">
                    <!-- FIX URL LEAK: type="button" -->
                    <button type="button" onclick="window.navigateTo('home')" class="btn btn-ghost rounded-2xl font-black uppercase tracking-widest text-xs px-10">Ke Beranda</button>
                    <button type="button" onclick="window.navigateTo('relawan')" class="btn btn-primary px-10 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-primary/20 border-none">Refresh Status</button>
                </div>
            </div>
        </div>`;
  }

  // --- CASE 3: FORM PENDAFTARAN ---
  return `
    <div class="container mx-auto py-12 px-4 max-w-6xl animate-in fade-in duration-500 font-inter text-base-content">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="space-y-8 text-left">
                <div class="inline-block px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full">
                    <span class="text-primary text-[10px] font-black uppercase tracking-widest">Registrasi Akun</span>
                </div>
                <h1 class="text-5xl md:text-6xl font-black font-poppins tracking-tighter leading-[0.9] uppercase text-left">Mulai Langkah <br> <span class="text-primary underline decoration-primary/30 font-poppins">Kebaikanmu.</span></h1>
                <p class="text-base-content/60 font-medium max-w-md text-left leading-relaxed">Daftar sebagai relawan untuk membuat kampanye bantuan sosial Anda sendiri.</p>
            </div>

            <div class="card bg-base-100 shadow-2xl border border-base-content/5 rounded-[3rem]">
                <div class="card-body p-8 lg:p-12 text-left">
                    <h2 class="text-2xl font-black font-poppins mb-8 uppercase tracking-tighter">Form Relawan</h2>
                    <form id="form-register-volunteer" class="space-y-6">
                        ${InputField({ label: "Nama Lengkap", name: "relawan-name", value: user.name, readonly: true })}
                        ${InputField({ label: "Email", type: "email", name: "relawan-email", value: user.email, readonly: true })}
                        
                        <div class="form-control text-left">
                            <label class="label"><span class="label-text font-black text-base-content/50 uppercase text-[10px] tracking-widest text-left">Keahlian (Skill)</span></label>
                            <select id="relawan-skill" class="select select-bordered bg-base-100 w-full h-14 rounded-xl font-bold text-base-content focus:select-primary">
                                <option value="Umum">Umum</option>
                                <option value="Medis">Medis</option>
                                <option value="Logistik">Logistik</option>
                                <option value="Pengajaran">Pengajaran</option>
                                <option value="Dokumentasi">Dokumentasi</option>
                            </select>
                        </div>
                        
                        <div class="form-control text-left">
                            <label class="label"><span class="label-text font-black text-base-content/50 uppercase text-[10px] tracking-widest text-left font-inter">Motivasi</span></label>
                            <textarea id="relawan-alasan" required class="textarea textarea-bordered bg-base-100 w-full rounded-xl font-medium h-28 pt-4 focus:textarea-primary text-base-content font-inter" placeholder="Mengapa Anda ingin bergabung?"></textarea>
                        </div>

                        <button type="submit" class="btn btn-primary w-full rounded-2xl text-sm font-black text-white uppercase h-16 tracking-widest shadow-lg shadow-primary/20 border-none active:scale-95 transition-all font-poppins">
                            Ajukan Pendaftaran
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>`;
};

window.initRelawanLogic = () => {
  // 1. Submit Kampanye Baru/Edit
  document
    .getElementById("form-relawan-campaign")
    ?.addEventListener("submit", (e) => {
      e.preventDefault(); // Mencegah URL berubah
      const user = getCurrentUser();
      const id = document.getElementById("form-campaign-id").value;
      const dataInput = {
        title: document.getElementById("form-campaign-title").value,
        category: document.getElementById("form-campaign-category").value,
        target: parseInt(document.getElementById("form-campaign-target").value),
        image: document.getElementById("form-campaign-image").value,
        deadline: document.getElementById("form-campaign-deadline").value,
        description: document.getElementById("form-campaign-description").value,
      };

      let newKampanye = [...database.kampanye];
      if (id) {
        const idx = newKampanye.findIndex((c) => c.id === id);
        if (idx !== -1)
          newKampanye[idx] = { ...newKampanye[idx], ...dataInput };
      } else {
        // FIX: Gunakan generateId("K", ...) untuk Sequential ID
        newKampanye.unshift({
          id: generateId("K", database.kampanye),
          ...dataInput,
          authorId: user.id,
          author: user.name,
          collected: 0,
          createdAt: new Date().toISOString(),
        });
      }

      syncGlobalData({ kampanye: newKampanye });
      document.getElementById("modal-relawan-campaign-toggle").checked = false;
      window.navigateTo("relawan");
    });

  // 2. Submit Pendaftaran Relawan
  document
    .getElementById("form-register-volunteer")
    ?.addEventListener("submit", (e) => {
      e.preventDefault(); // Mencegah URL berubah
      const user = getCurrentUser();
      const newRelawanObj = {
        // FIX: Gunakan generateId("REL", ...) untuk Sequential ID
        id: generateId("REL", database.relawan),
        userId: user.id,
        name: user.name,
        email: user.email,
        skill: document.getElementById("relawan-skill").value,
        alasan: document.getElementById("relawan-alasan").value,
        status: "pending",
        createdAt: new Date().toISOString(),
      };

      let list = [...(database.relawan || [])];
      const idx = list.findIndex((r) => r.userId === user.id);
      if (idx !== -1) list[idx] = newRelawanObj;
      else list.push(newRelawanObj);

      syncGlobalData({ relawan: list });
      window.navigateTo("relawan");
    });
};

window.showCreateModal = () => {
  document.getElementById("modal-title-display").innerText = "Buat Kampanye";
  document.getElementById("form-relawan-campaign").reset();
  document.getElementById("form-campaign-id").value = "";
  document.getElementById("modal-relawan-campaign-toggle").checked = true;
};

window.showEditModal = (id) => {
  const item = database.kampanye.find((c) => c.id === id);
  if (!item) return;
  document.getElementById("modal-title-display").innerText = "Sunting Kampanye";
  document.getElementById("form-campaign-id").value = item.id;
  document.getElementById("form-campaign-title").value = item.title;
  document.getElementById("form-campaign-category").value = item.category;
  document.getElementById("form-campaign-target").value = item.target;
  document.getElementById("form-campaign-image").value = item.image;
  document.getElementById("form-campaign-deadline").value = item.deadline;
  document.getElementById("form-campaign-description").value = item.description;
  document.getElementById("modal-relawan-campaign-toggle").checked = true;
};

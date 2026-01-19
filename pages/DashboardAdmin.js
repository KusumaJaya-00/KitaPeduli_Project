import { database } from "../assets/js/data.js";
import { KampanyeCard } from "../components/KampanyeCard.js";
import { InputField } from "../components/InputField.js";
import { Badge } from "../components/Badge.js";
import { Modal } from "../components/Modal.js";
import { StatCard } from "../components/StatCard.js";
import { FilterTabs } from "../components/FilterTabs.js";
import { DataTable } from "../components/DataTable.js";

const fmt = (n) => `Rp ${Number(n).toLocaleString("id-ID")}`;

// --- GLOBAL STATE ---
let itemsPerPage = 12;
let currentPage = 1;
let currentCategory = "Semua";

// --- SUB-KOMPONEN INTERNAL ---

/**
 * Toolbar Manajemen Kartu Kampanye
 */
const AdminToolbar = (id) => `
  <div class="px-5 py-3 bg-base-200/50 flex items-center justify-between border-t border-base-content/5">
      <div class="flex items-center gap-2 text-left">
          <button onclick="window.modalK('${id}')" class="btn btn-xs md:btn-sm btn-info text-white rounded-full px-4 gap-2 border-none shadow-sm hover:scale-105 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              <span class="hidden md:inline-block text-[10px] font-black uppercase tracking-wider text-white text-left font-poppins">Edit</span>
          </button>
          <button onclick="window.delK('${id}')" class="btn btn-xs md:btn-sm btn-error text-white rounded-full px-4 gap-2 border-none shadow-sm hover:scale-105 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              <span class="hidden md:inline-block text-[10px] font-black uppercase tracking-wider text-white text-left font-poppins">Hapus</span>
          </button>
      </div>
      <div class="badge badge-ghost badge-sm text-[9px] font-bold opacity-30 rounded-lg uppercase tracking-tighter border-none bg-base-300 px-2 text-base-content">ID: ${id}</div>
  </div>
`;

/**
 * Kontainer Section Manajemen Kampanye (Mobile First)
 */
const CampaignSection = () => `
  <div id="section-campaign-management" class="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div class="flex flex-col border-b border-base-content/10 pb-8 md:pb-10 gap-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div class="text-left space-y-1">
                 <h2 class="font-black text-2xl md:text-3xl uppercase tracking-tighter font-poppins text-base-content leading-none">Manajemen Program</h2>
                 <p class="text-[10px] opacity-40 font-bold uppercase tracking-widest text-left">Kontrol Konten Publik</p>
              </div>
              <button class="btn btn-primary btn-sm md:btn-md rounded-2xl shadow-primary/30 font-black px-8 h-12 md:h-14 uppercase border-none text-xs md:text-sm active:scale-95 transition-transform font-poppins text-white w-full sm:w-auto" onclick="window.modalK()">+ Program Baru</button>
          </div>
          
          <!-- Container Filter: Mobile First (Full Width untuk horizontal scroll) -->
          <div id="admin-filter-container" class="w-full min-w-0"></div>
      </div>
      <div id="admin-campaign-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[500px]"></div>
      <div id="admin-pagination-container" class="flex justify-center items-center py-10"></div>
  </div>
`;

const VolunteerSection = () => `
  <div id="section-volunteer-management" class="hidden animate-in fade-in slide-in-from-bottom-8 duration-700 text-left">
      <h2 class="font-black text-3xl uppercase tracking-tighter mb-10 italic font-poppins text-left text-base-content leading-none text-left">Database Relawan</h2>
      <div id="volunteer-table-container"></div>
  </div>
`;

const DonationSection = () => `
  <div id="section-donation-history" class="hidden animate-in fade-in slide-in-from-bottom-8 duration-700 text-left">
      <h2 class="font-black text-3xl uppercase tracking-tighter mb-10 italic font-poppins text-left text-base-content leading-none text-left">Log Transaksi Masuk</h2>
      <div id="donation-table-container"></div>
  </div>
`;

// --- LOGIC HELPERS ---

const hitungSisaHari = (deadline) => {
  const diff = new Date(deadline) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

/**
 * Fungsi Sinkronisasi Data Global
 */
window.syncGlobalData = (newData) => {
  if (newData.kampanye) database.kampanye = newData.kampanye;
  if (newData.donasi) database.donasi = newData.donasi;
  if (newData.relawan) database.relawan = newData.relawan;

  localStorage.setItem(
    "charity_db",
    JSON.stringify({
      ...database,
      kampanye: database.kampanye,
      donasi: database.donasi,
      relawan: database.relawan,
    }),
  );
};

const renderAdminCampaigns = () => {
  const grid = document.getElementById("admin-campaign-grid");
  const paginationContainer = document.getElementById(
    "admin-pagination-container",
  );
  const filterContainer = document.getElementById("admin-filter-container");

  if (!grid || !paginationContainer || !filterContainer) return;

  filterContainer.innerHTML = FilterTabs({
    currentCategory,
    onFilterFunctionName: "filterKampanyeAdmin",
  });

  const { kampanye = [], donasi = [] } = database;

  const dataFiltered =
    currentCategory === "Semua"
      ? kampanye
      : kampanye.filter((item) => item.category === currentCategory);
  const totalPages = Math.ceil(dataFiltered.length / itemsPerPage);
  const paginatedData = dataFiltered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  grid.innerHTML =
    paginatedData
      .map((k) => {
        const campaignDonations = donasi.filter(
          (d) => String(d.campaignId || d.idKampanye) === String(k.id),
        );
        const actualCollected = campaignDonations.reduce(
          (sum, d) => sum + (Number(d.amount || d.nominal) || 0),
          0,
        );
        return `
      <div class="bg-base-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-base-content/5 flex flex-col group hover:-translate-y-2 transition-all duration-500">
          <div class="flex-grow text-left">
            ${KampanyeCard({
              ...k,
              collected: actualCollected,
              daysLeft: hitungSisaHari(k.deadline),
            })
              .replace(
                /Donasi<\/button>/,
                `<span class="flex items-center gap-2 font-black uppercase tracking-tighter text-white"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Riwayat</span></button>`,
              )
              .replace(
                /navigateTo\('donasi', {id: '.*?'}\)/,
                `window.openRiwayatModal('${k.id}')`,
              )}
          </div>
          ${AdminToolbar(k.id)}
      </div>`;
      })
      .join("") ||
    `<div class="col-span-full py-24 text-center opacity-30 font-black italic uppercase tracking-[0.3em] text-base-content font-inter text-left">Data program tidak ditemukan</div>`;

  paginationContainer.innerHTML =
    totalPages > 1
      ? `<div class="join bg-base-100 shadow-lg border border-base-content/10 rounded-2xl overflow-hidden font-inter"><button onclick="window.changePageAdmin(${currentPage - 1})" class="join-item btn btn-sm px-6 ${currentPage === 1 ? "btn-disabled opacity-30" : "btn-ghost"}" ${currentPage === 1 ? "disabled" : ""}>« Prev</button><button class="join-item btn btn-sm btn-ghost no-animation pointer-events-none border-x border-base-content/10 font-black text-xs px-6 text-base-content font-inter">${currentPage} / ${totalPages}</button><button onclick="window.changePageAdmin(${currentPage + 1})" class="join-item btn btn-sm px-6 ${currentPage === totalPages ? "btn-disabled opacity-30" : "btn-ghost"}" ${currentPage === totalPages ? "disabled" : ""}>Next »</button></div>`
      : "";
};

window.renderRel = () => {
  const { relawan = [] } = database;
  const container = document.getElementById("volunteer-table-container");
  if (!container) return;

  const rowsHTML = relawan
    .map(
      (r) => `
        <tr class="hover:bg-base-200/50 transition-all border-b border-base-content/5 group text-left font-inter text-base-content">
            <td class="py-8 pl-12 text-left">
                <div class="flex items-center gap-4 text-left font-inter">
                    <div class="avatar placeholder group-hover:scale-105 transition-transform"><div class="bg-primary/10 text-primary rounded-2xl w-12 h-12 flex items-center justify-center shadow-inner text-primary"><span class="text-xl font-black uppercase font-poppins text-primary">${(r.name || "U").charAt(0)}</span></div></div>
                    <div class="text-left font-inter"><div class="font-black text-base uppercase tracking-tight text-base-content font-inter text-left text-base-content text-left">${r.name || "Pendaftar"}</div><div class="text-[11px] opacity-50 font-bold uppercase tracking-widest mt-1 text-base-content font-inter text-left text-base-content text-left">${r.email || r.whatsapp || "No Contact"}</div></div>
                </div>
            </td>
            <td class="align-middle text-left font-inter">${Badge({ category: r.skill || r.divisi || "Umum" })}</td>
            <td class="align-middle text-center font-inter">${Badge({ category: r.status || "approved" })}</td>
            <td class="text-center pr-12 align-middle font-inter">
                <div class="inline-flex gap-3 font-inter text-base-content text-left">
                    <button class="btn btn-square btn-ghost border border-base-content/10 hover:bg-primary hover:text-white rounded-2xl h-12 w-12 shadow-sm transition-all" onclick="window.modalR('${r.id}')"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button class="btn btn-square btn-ghost border border-base-content/10 hover:bg-error hover:text-white rounded-2xl h-12 w-12 shadow-sm transition-all" onclick="window.delR('${r.id}')"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
            </td>
        </tr>`,
    )
    .join("");

  container.innerHTML = DataTable({
    headers: ["Identitas Akun", "Divisi Ahli", "Status Verif", "Opsi Kelola"],
    rowsHTML:
      rowsHTML ||
      `<tr><td colspan="4" class="text-center py-20 opacity-30 italic font-black text-base uppercase tracking-widest text-base-content text-left">Database relawan kosong</td></tr>`,
  });
};

window.renderDonations = () => {
  const { donasi = [], kampanye = [] } = database;
  const container = document.getElementById("donation-table-container");
  if (!container) return;

  const rowsHTML = [...donasi]
    .reverse()
    .map((d, index) => {
      const program = kampanye.find(
        (k) => String(k.id) === String(d.campaignId || d.idKampanye),
      );
      const donorName = d.donaturName || d.namaDonatur || "Seseorang";

      return `
            <tr class="hover:bg-base-200/50 transition-all border-b border-base-content/5 group text-left font-inter text-base-content text-left font-inter">
                <td class="py-8 pl-12 text-left font-inter">
                   <div class="flex items-center gap-4 text-left font-inter">
                       <span class="text-[10px] font-black opacity-20 group-hover:opacity-100 transition-opacity">#${donasi.length - index}</span>
                       <div class="avatar placeholder"><div class="bg-primary/10 text-primary rounded-2xl w-10 h-10 flex items-center justify-center font-black text-xs text-primary font-poppins">${donorName.charAt(0)}</div></div>
                       <div class="font-black text-sm uppercase tracking-tight text-base-content font-inter">${donorName}</div>
                   </div>
                </td>
                <td class="align-middle text-left font-inter">
                    <div class="space-y-1 text-left font-inter">
                        <div class="text-xs font-black uppercase text-base-content/80 line-clamp-1 font-inter text-left">${program?.title || "Program Kebaikan"}</div>
                        ${Badge({ category: program?.category || "Sosial" })}
                    </div>
                </td>
                <td class="align-middle text-left font-poppins text-primary font-black">${fmt(d.amount || d.nominal)}</td>
                <td class="align-middle text-center text-[10px] font-black opacity-40 uppercase tracking-widest text-base-content font-inter">${d.date || d.tanggal || "-"}</td>
            </tr>`;
    })
    .join("");

  container.innerHTML = DataTable({
    headers: ["Nama Donatur", "Program Tujuan", "Nominal", "Waktu Transaksi"],
    rowsHTML:
      rowsHTML ||
      `<tr><td colspan="4" class="text-center py-20 opacity-30 italic font-black text-base uppercase tracking-widest text-base-content text-left">Belum ada transaksi donasi</td></tr>`,
  });
};

// --- MAIN EXPORTED PAGE ---

export const DashboardAdmin = () => {
  // RE-INIT LOGIC SETIAP KALI HALAMAN DIBUKA (Sangat Penting untuk SPA)
  setTimeout(() => {
    window.initAdminLogic();
    renderAdminCampaigns();
  }, 100);

  const {
    relawan = [],
    donasi = [],
    currentUser: user,
    kampanye = [],
  } = database;
  const totalDana = donasi.reduce(
    (acc, curr) => acc + (Number(curr.amount || curr.nominal) || 0),
    0,
  );

  return `
    <div class="min-h-screen bg-base-200/50 pb-32 font-inter text-base-content transition-colors duration-500 text-left font-inter">
        <main class="container mx-auto px-4 md:px-10 lg:px-16 py-12 text-left font-inter">
            
            <header class="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8 text-left font-inter">
                <div class="space-y-3 text-left font-inter">
                    <div class="flex items-center gap-4 text-left font-inter"><div class="h-10 w-2 bg-primary rounded-full shadow-lg"></div><h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter italic font-poppins leading-none text-base-content text-left">Admin <span class="text-primary font-poppins">Panel</span></h1></div>
                    <p class="opacity-50 text-sm font-bold pl-6 flex items-center gap-2 text-left font-inter"><span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>Petugas: <span class="text-base-content font-black underline decoration-primary underline-offset-4">${user?.name || "Administrator"}</span></p>
                </div>
                <div class="tabs tabs-boxed bg-base-100 p-2 shadow-xl border border-base-content/5 rounded-[1.5rem] flex flex-wrap gap-1 font-inter">
                    <button id="tab-campaign-trigger" class="tab tab-active font-black px-6 rounded-xl transition-all" onclick="window.switchTab('k')">KAMPANYE</button>
                    <button id="tab-volunteer-trigger" class="tab font-black text-base-content/40 px-6 rounded-xl transition-all" onclick="window.switchTab('r')">RELAWAN</button>
                    <button id="tab-donation-trigger" class="tab font-black text-base-content/40 px-6 rounded-xl transition-all" onclick="window.switchTab('d')">DONASI</button>
                </div>
            </header>

            <section class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 font-inter text-left">
                ${StatCard({ title: "Akumulasi Dana Masuk", value: fmt(totalDana), isPrimary: true, icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />' })}
                ${StatCard({ title: "Anggota Terdaftar", value: relawan.length, label: "Jiwa", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />' })}
                ${StatCard({ title: "Program Berjalan", value: kampanye.length, label: "Aksi", icon: '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />' })}
            </section>

            ${CampaignSection()}
            ${VolunteerSection()}
            ${DonationSection()}
        </main>

        <!-- KUMPULAN MODAL -->
        ${Modal({ id: "admin-success-modal", title: "Berhasil!", message: "Data telah diperbarui.", type: "success" })}
        ${Modal({ id: "admin-error-modal", title: "Terjadi Kesalahan", message: "Gagal memproses permintaan.", type: "error" })}

        <div id="modal-confirm-delete" class="hidden fixed inset-0 z-[3000] bg-neutral-focus/60 backdrop-blur-md flex items-center justify-center p-4 text-left font-inter">
            <div class="modal-box rounded-[2.5rem] p-10 text-center space-y-6 bg-base-100 shadow-2xl max-w-sm flex flex-col items-center animate-in zoom-in fade-in duration-300 border border-base-content/5 text-left font-inter">
                <div class="w-24 h-24 bg-error/10 text-error rounded-full flex items-center justify-center mb-2 shadow-inner text-error"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
                <div class="space-y-2 text-center font-inter"><h3 id="confirm-title" class="font-black text-3xl tracking-tighter uppercase italic font-poppins leading-none text-base-content text-left text-center">Hapus Data?</h3><p id="confirm-msg" class="text-sm opacity-60 font-medium text-base-content text-left leading-relaxed text-center font-inter">Aksi ini bersifat permanen.</p></div>
                <div class="flex gap-4 pt-4 w-full font-poppins text-white font-inter"><button onclick="document.getElementById('modal-confirm-delete').classList.add('hidden')" class="btn btn-ghost flex-1 rounded-2xl font-black uppercase h-14 font-inter text-base-content hover:bg-base-200 transition-colors">Batal</button><button id="confirm-delete-action-btn" class="btn btn-error flex-1 rounded-2xl font-black uppercase text-white shadow-lg h-14 border-none font-inter">Hapus!</button></div>
            </div>
        </div>

        <input type="checkbox" id="modal-campaign-toggle" class="modal-toggle" />
        <div class="modal backdrop-blur-xl text-left font-inter">
            <div class="modal-box rounded-[2.5rem] max-w-2xl p-8 bg-base-100 shadow-2xl text-left overflow-visible animate-in zoom-in fade-in duration-300 text-base-content text-left font-inter">
                <div class="flex justify-between items-center mb-6 text-base-content text-left font-inter"><h3 class="font-black text-2xl tracking-tighter uppercase leading-none font-poppins text-left" id="modal-campaign-title-display">Form Program</h3><label for="modal-campaign-toggle" class="btn btn-ghost btn-circle btn-sm">✕</label></div>
                <form id="form-campaign-element" class="space-y-4 font-inter text-left">
                    <input type="hidden" id="form-campaign-id">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-inter">
                        ${InputField({ label: "Judul Kampanye", name: "form-campaign-title", placeholder: "Nama misi..." })}
                        <div class="form-control text-left font-inter"><label class="label pt-0 pb-1 text-left text-base-content font-inter"><span class="label-text font-black uppercase text-[10px] opacity-60 tracking-widest text-left font-inter">Kategori</span></label><select id="form-campaign-category" class="select select-bordered rounded-xl font-bold h-11 min-h-[auto] text-sm focus:select-primary text-base-content font-inter text-left"><option value="Sosial">Sosial</option><option value="Pendidikan">Pendidikan</option><option value="Bencana Alam">Bencana Alam</option><option value="Kesehatan">Kesehatan</option><option value="Lingkungan">Lingkungan</option></select></div>
                    </div>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-inter">
                        ${InputField({ label: "Target Dana (Rp)", type: "number", name: "form-campaign-target" })}
                        ${InputField({ label: "URL Gambar", name: "form-campaign-image" })}
                    </div>
                    <div class="form-control text-left text-base-content font-inter"><label class="label pt-0 pb-1 text-left text-base-content font-inter"><span class="label-text font-black uppercase text-[10px] opacity-60 tracking-widest text-base-content text-left font-inter text-left">Deskripsi Program</span></label><textarea id="form-campaign-description" class="textarea textarea-bordered rounded-2xl h-24 p-4 font-medium text-sm leading-relaxed focus:textarea-primary text-base-content font-inter text-left font-inter" required></textarea></div>
                    <div class="modal-action gap-3 pt-2 text-white font-inter"><label for="modal-campaign-toggle" class="btn btn-sm h-12 btn-ghost rounded-2xl font-black px-8 uppercase text-xs font-inter text-base-content font-inter text-left">Batal</label><button type="submit" class="btn btn-sm h-12 btn-primary rounded-2xl px-12 font-black shadow-primary/30 uppercase text-xs border-none text-white font-inter">Simpan</button></div>
                </form>
            </div>
        </div>

        <input type="checkbox" id="modal-volunteer-toggle" class="modal-toggle" />
        <div class="modal backdrop-blur-xl text-left font-inter">
            <div class="modal-box rounded-[3rem] p-10 bg-base-100 shadow-2xl text-left animate-in zoom-in fade-in duration-300 border border-base-content/5 text-base-content text-left font-inter">
                <h3 class="font-black text-2xl mb-8 tracking-tighter uppercase text-primary italic leading-none font-poppins text-left">Verifikasi Relawan</h3>
                <form id="form-volunteer-element" class="space-y-4 text-left font-inter">
                    <input type="hidden" id="form-volunteer-id">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-left font-inter">
                        ${InputField({ label: "Nama Lengkap", name: "form-volunteer-name" })}
                        ${InputField({ label: "Kontak / Email", name: "form-volunteer-contact" })}
                    </div>
                    <div class="grid grid-cols-2 gap-4 text-left font-inter font-inter">
                        <div class="form-control text-left font-inter"><label class="label text-left font-inter"><span class="label-text font-black text-[10px] opacity-50 uppercase text-base-content text-left font-inter">Divisi</span></label><select id="form-volunteer-division" class="select select-bordered rounded-2xl font-bold h-11 text-sm text-base-content font-inter text-left font-inter"><option value="Umum">Umum</option><option value="Medis">Medis</option><option value="Logistik">Logistik</option><option value="Pengajaran">Pengajaran</option><option value="Administrasi">Administrasi</option><option value="Konstruksi">Konstruksi</option><option value="Psikologi">Psikologi</option><option value="Dokumentasi">Dokumentasi</option><option value="Media Sosial">Media Sosial</option></select></div>
                        <div class="form-control text-left font-inter"><label class="label text-left font-inter"><span class="label-text font-black text-[10px] opacity-50 uppercase text-base-content text-left font-inter font-inter">Status</span></label><select id="form-volunteer-status" class="select select-bordered rounded-2xl font-black text-primary h-11 text-sm font-inter text-left font-inter"><option value="pending">⏳ Pending</option><option value="approved">✅ Approved</option><option value="rejected">❌ Rejected</option></select></div>
                    </div>
                    <div class="modal-action pt-4 gap-4 text-left text-white font-inter"><label for="modal-volunteer-toggle" class="btn btn-ghost rounded-2xl font-black px-8 h-12 uppercase font-poppins text-xs text-base-content font-inter text-left">Tutup</label><button type="submit" class="btn btn-primary rounded-2xl px-12 h-12 font-black shadow-primary/20 uppercase font-poppins text-xs border-none text-white font-inter">Simpan</button></div>
                </form>
            </div>
        </div>

        <input type="checkbox" id="modal-donation-toggle" class="modal-toggle" /><div class="modal backdrop-blur-md text-left font-inter"><div class="modal-box rounded-[3rem] bg-base-100 p-10 shadow-2xl max-w-lg animate-in zoom-in fade-in duration-300 border border-base-content/5 text-base-content text-left font-inter" id="modal-donation-content"></div></div>
    </div>`;
};

// --- LOGIC SECTION ---
if (typeof window !== "undefined") {
  window.showAlert = (title, msg, type = "success") => {
    const id = type === "success" ? "admin-success-modal" : "admin-error-modal";
    const modalEl = document.getElementById(id);
    if (modalEl) {
      const box = modalEl.querySelector(".modal-box");
      if (box) {
        box.classList.remove("animate-in", "zoom-in", "fade-in");
        void box.offsetWidth;
        box.classList.add("animate-in", "zoom-in", "fade-in", "duration-300");
      }
      modalEl.querySelector("h3").innerText = title;
      modalEl.querySelector("p").innerText = msg;
      modalEl.classList.remove("hidden");
    }
  };

  window.showConfirm = (title, msg, actionFn) => {
    document.getElementById("confirm-title").innerText = title;
    document.getElementById("confirm-msg").innerText = msg;
    const confirmModal = document.getElementById("modal-confirm-delete");
    const box = confirmModal.querySelector(".modal-box");
    if (box) {
      box.classList.remove("animate-in", "zoom-in", "fade-in");
      void box.offsetWidth;
      box.classList.add("animate-in", "zoom-in", "fade-in", "duration-300");
    }
    const btn = document.getElementById("confirm-delete-action-btn");
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener("click", () => {
      confirmModal.classList.add("hidden");
      actionFn();
    });
    confirmModal.classList.remove("hidden");
  };

  window.switchTab = (t) => {
    const isK = t === "k";
    const isR = t === "r";
    const isD = t === "d";

    const secK = document.getElementById("section-campaign-management");
    const secR = document.getElementById("section-volunteer-management");
    const secD = document.getElementById("section-donation-history");

    if (secK) secK.classList.toggle("hidden", !isK);
    if (secR) secR.classList.toggle("hidden", !isR);
    if (secD) secD.classList.toggle("hidden", !isD);

    document.getElementById("tab-campaign-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isK ? "tab-active" : "text-base-content/40"}`;
    document.getElementById("tab-volunteer-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isR ? "tab-active" : "text-base-content/40"}`;
    document.getElementById("tab-donation-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isD ? "tab-active" : "text-base-content/40"}`;

    if (isK) renderAdminCampaigns();
    else if (isR) window.renderRel();
    else if (isD) window.renderDonations();
  };

  window.openRiwayatModal = (cid) => {
    const logs = database.donasi.filter(
      (d) => String(d.campaignId || d.idKampanye) === String(cid),
    );
    const kampanye = database.kampanye.find(
      (k) => String(k.id) === String(cid),
    );
    const modalContent = document.getElementById("modal-donation-content");
    modalContent.innerHTML = `
        <div class="flex justify-between items-center mb-10 text-left font-inter">
            <div class="text-left text-base-content font-inter text-left font-inter"><h3 class="font-black text-2xl tracking-tighter uppercase italic text-primary leading-none font-poppins text-left text-left">Riwayat Donasi</h3><p class="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2 line-clamp-1 text-base-content font-inter text-left">${kampanye?.title || "Program"}</p></div>
            <label for="modal-donation-toggle" class="btn btn-ghost btn-circle btn-sm">✕</label>
        </div>
        <div class="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar text-left font-inter font-inter">
            ${
              logs.length > 0
                ? logs
                    .map(
                      (d) =>
                        `<div class="flex justify-between items-center p-6 bg-base-200/50 border border-base-content/5 rounded-3xl group hover:bg-base-200 transition-all text-left font-inter text-left"><div class="flex items-center gap-4 text-left font-inter text-left"><div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm uppercase shadow-inner text-primary font-poppins">${(d.donaturName || d.namaDonatur || "S").charAt(0)}</div><div class="text-left font-inter text-base-content text-left"><p class="font-black text-sm uppercase tracking-tight text-base-content text-left">${d.donaturName || d.namaDonatur}</p><p class="text-[10px] opacity-40 font-bold uppercase tracking-widest text-base-content text-left">${d.date || d.tanggal || "Baru Saja"}</p></div></div><span class="text-primary font-black text-lg text-right font-poppins">${fmt(d.amount || d.nominal)}</span></div>`,
                    )
                    .reverse()
                    .join("")
                : '<div class="text-center opacity-30 py-24 font-black italic text-sm uppercase tracking-[0.2em] text-base-content text-left font-inter">Belum ada donasi</div>'
            }
        </div>
        <div class="modal-action pt-6 font-poppins text-white text-left font-inter"><label for="modal-donation-toggle" class="btn btn-primary btn-block rounded-2xl font-black h-16 uppercase shadow-2xl border-none text-white font-inter">Tutup Laporan</label></div>`;
    document.getElementById("modal-donation-toggle").checked = true;
  };

  window.modalR = (id) => {
    const dataRelawan = database.relawan.find(
      (i) => String(i.id) === String(id),
    );
    if (!dataRelawan) return;

    document.getElementById("form-volunteer-id").value = dataRelawan.id;
    document.getElementById("form-volunteer-name").value =
      dataRelawan.name || "";
    document.getElementById("form-volunteer-contact").value =
      dataRelawan.email || dataRelawan.whatsapp || "";
    document.getElementById("form-volunteer-division").value =
      dataRelawan.skill || dataRelawan.divisi || "Umum";
    document.getElementById("form-volunteer-status").value =
      dataRelawan.status || "approved";

    document.getElementById("modal-volunteer-toggle").checked = true;
  };

  window.delR = (id) => {
    window.showConfirm(
      "Hapus Relawan",
      "Data relawan ini akan dihapus permanen.",
      () => {
        const newRelawan = database.relawan.filter(
          (r) => String(r.id) !== String(id),
        );
        window.syncGlobalData({ ...database, relawan: newRelawan });
        window.renderRel();
        window.showAlert("Berhasil", "Data relawan telah dihapus.");
      },
    );
  };

  window.modalK = (id = null) => {
    const dataKampanye =
      database.kampanye.find((i) => String(i.id) === String(id)) || {};
    document.getElementById("form-campaign-id").value = dataKampanye.id || "";
    document.getElementById("form-campaign-title").value =
      dataKampanye.title || "";
    document.getElementById("form-campaign-category").value =
      dataKampanye.category || "Sosial";
    document.getElementById("form-campaign-target").value =
      dataKampanye.target || "";
    document.getElementById("form-campaign-image").value =
      dataKampanye.image || "";
    document.getElementById("form-campaign-description").value =
      dataKampanye.description || "";
    document.getElementById("modal-campaign-title-display").innerText = id
      ? "Sunting Program"
      : "Buat Program";
    document.getElementById("modal-campaign-toggle").checked = true;
  };

  window.delK = (id) => {
    window.showConfirm(
      "Hapus Kampanye",
      "Apakah Anda yakin ingin menghapus program ini? Perubahan akan langsung terlihat di halaman publik.",
      () => {
        const newKampanye = database.kampanye.filter(
          (k) => String(k.id) !== String(id),
        );
        window.syncGlobalData({ ...database, kampanye: newKampanye });
        renderAdminCampaigns();
        window.showAlert(
          "Terhapus",
          "Program berhasil dihapus secara real-time.",
        );
      },
    );
  };

  window.changePageAdmin = (page) => {
    currentPage = page;
    renderAdminCampaigns();
    window.scrollTo({ top: 400, behavior: "smooth" });
  };
  window.filterKampanyeAdmin = (kategori) => {
    currentCategory = kategori;
    currentPage = 1;
    renderAdminCampaigns();
  };

  window.initAdminLogic = () => {
    // FORM SUBMIT: KAMPANYE
    document
      .getElementById("form-campaign-element")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("form-campaign-id").value;
        const dataInput = {
          title: document.getElementById("form-campaign-title").value,
          category: document.getElementById("form-campaign-category").value,
          target: parseInt(
            document.getElementById("form-campaign-target").value,
          ),
          image: document.getElementById("form-campaign-image").value,
          description: document.getElementById("form-campaign-description")
            .value,
        };

        let newKampanye = [...database.kampanye];
        if (id) {
          const idx = newKampanye.findIndex((k) => String(k.id) === String(id));
          newKampanye[idx] = { ...newKampanye[idx], ...dataInput };
        } else {
          newKampanye.unshift({
            id: "K" + Date.now(),
            ...dataInput,
            collected: 0,
            author: "Admin",
            deadline: "2026-12-31",
          });
        }

        window.syncGlobalData({ ...database, kampanye: newKampanye });
        document.getElementById("modal-campaign-toggle").checked = false;
        renderAdminCampaigns();
        window.showAlert("Sukses", "Data kampanye berhasil diperbarui.");
      });

    // FORM SUBMIT: RELAWAN
    document
      .getElementById("form-volunteer-element")
      ?.addEventListener("submit", (e) => {
        e.preventDefault();
        const id = document.getElementById("form-volunteer-id").value;
        let newRelawan = [...database.relawan];
        const idx = newRelawan.findIndex((r) => String(r.id) === String(id));
        if (idx !== -1) {
          newRelawan[idx] = {
            ...newRelawan[idx],
            name: document.getElementById("form-volunteer-name").value,
            email: document.getElementById("form-volunteer-contact").value,
            skill: document.getElementById("form-volunteer-division").value,
            status: document.getElementById("form-volunteer-status").value,
          };
          window.syncGlobalData({ ...database, relawan: newRelawan });
        }
        document.getElementById("modal-volunteer-toggle").checked = false;
        window.renderRel();
        window.showAlert("Diperbarui", "Status relawan berhasil diupdate.");
      });
  };
}

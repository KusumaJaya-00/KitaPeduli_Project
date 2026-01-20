import { database, generateId } from "../assets/js/data.js";
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

// --- HELPERS SINKRONISASI (FIX SYNC ISSUE) ---
const refreshDatabaseFromStorage = () => {
  try {
    const localData = JSON.parse(localStorage.getItem("charity_db"));
    if (localData) {
      if (localData.kampanye) database.kampanye = localData.kampanye;
      if (localData.donasi) database.donasi = localData.donasi;
      if (localData.relawan) database.relawan = localData.relawan;
      if (localData.penarikan) database.penarikan = localData.penarikan;
    }
  } catch (e) {
    console.error("Gagal sinkronisasi data lokal:", e);
  }
};

// --- SUB-KOMPONEN INTERNAL ---
const AdminToolbar = (id) => `
  <div class="px-5 py-3 bg-base-200/50 flex items-center justify-between border-t border-base-content/5">
      <div class="flex items-center gap-2 text-left font-inter">
          <button type="button" onclick="window.modalK('${id}')" class="btn btn-xs md:btn-sm btn-info text-white rounded-full px-4 gap-2 border-none shadow-sm hover:scale-105 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
              <span class="hidden md:inline-block text-[10px] font-black uppercase tracking-wider text-white font-poppins">Edit</span>
          </button>
          <button type="button" onclick="window.delK('${id}')" class="btn btn-xs md:btn-sm btn-error text-white rounded-full px-4 gap-2 border-none shadow-sm hover:scale-105 active:scale-95 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
              <span class="hidden md:inline-block text-[10px] font-black uppercase tracking-wider font-poppins">Hapus</span>
          </button>
      </div>
      <div class="badge badge-ghost badge-sm text-[9px] font-bold opacity-30 rounded-lg uppercase tracking-tighter border-none bg-base-300 px-2 text-base-content font-inter">ID: ${id}</div>
  </div>
`;

const CampaignSection = () => `
  <div id="section-campaign-management" class="space-y-8 md:space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div class="flex flex-col border-b border-base-content/10 pb-8 md:pb-10 gap-6">
          <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div class="text-left space-y-1">
                 <h2 class="font-black text-2xl md:text-3xl uppercase tracking-tighter font-poppins text-base-content leading-none">Manajemen Program</h2>
                 <p class="text-[10px] opacity-40 font-bold uppercase tracking-widest text-left">Kontrol Konten Publik & Sisa Saldo</p>
              </div>
              <button type="button" class="btn btn-primary btn-sm md:btn-md rounded-2xl shadow-primary/30 font-black px-8 h-12 md:h-14 uppercase border-none text-xs md:text-sm active:scale-95 transition-transform font-poppins text-white w-full sm:w-auto" onclick="window.modalK()">+ Program Baru</button>
          </div>
          <div id="admin-filter-container" class="w-full min-w-0"></div>
      </div>
      <div id="admin-campaign-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 min-h-[500px]"></div>
      <div id="admin-pagination-container" class="flex justify-center items-center py-10"></div>
  </div>
`;

const VolunteerSection = () => `
  <div id="section-volunteer-management" class="hidden animate-in fade-in slide-in-from-bottom-8 duration-700 text-left font-inter">
      <h2 class="font-black text-3xl uppercase tracking-tighter mb-10 font-poppins text-base-content leading-none">Database Relawan</h2>
      <div id="volunteer-table-container"></div>
  </div>
`;

const DonationSection = () => `
  <div id="section-donation-history" class="hidden animate-in fade-in slide-in-from-bottom-8 duration-700 text-left font-inter">
      <h2 class="font-black text-3xl uppercase tracking-tighter mb-10 font-poppins text-base-content leading-none">Log Transaksi Masuk</h2>
      <div id="donation-table-container"></div>
  </div>
`;

const WithdrawSection = () => `
  <div id="section-withdraw-management" class="hidden animate-in fade-in slide-in-from-bottom-8 duration-700 text-left font-inter">
      <div class="text-left space-y-1 mb-10">
         <h2 class="font-black text-3xl uppercase tracking-tighter font-poppins text-base-content leading-none">Permintaan Penarikan</h2>
         <p class="text-[10px] opacity-40 font-bold uppercase tracking-widest text-left">Approval Dana Kampanye</p>
      </div>
      <div id="withdraw-table-container"></div>
  </div>
`;

// --- LOGIC HELPERS ---

const hitungSisaHari = (deadline) => {
  const diff = new Date(deadline) - new Date();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return days > 0 ? days : 0;
};

// Fungsi Sinkronisasi Data Global ke LocalStorage
window.syncGlobalData = (newData) => {
  if (newData.kampanye) database.kampanye = newData.kampanye;
  if (newData.donasi) database.donasi = newData.donasi;
  if (newData.relawan) database.relawan = newData.relawan;
  if (newData.penarikan) database.penarikan = newData.penarikan;

  localStorage.setItem(
    "charity_db",
    JSON.stringify({
      ...database,
      kampanye: database.kampanye,
      donasi: database.donasi,
      relawan: database.relawan,
      penarikan: database.penarikan || [],
    }),
  );
};

const renderAdminCampaigns = () => {
  // Update data terbaru sebelum render
  refreshDatabaseFromStorage();

  const grid = document.getElementById("admin-campaign-grid");
  const paginationContainer = document.getElementById("admin-pagination-container");
  const filterContainer = document.getElementById("admin-filter-container");

  if (!grid || !paginationContainer || !filterContainer) return;

  filterContainer.innerHTML = FilterTabs({
    currentCategory,
    onFilterFunctionName: "filterKampanyeAdmin",
  });

  const { kampanye = [], donasi = [], penarikan = [] } = database;

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
        // --- LOGIKA HITUNG SALDO DI ADMIN PANEL (SALDO BERSIH) ---
        // 1. Total Masuk (Donasi)
        const totalIn = donasi
            .filter((d) => String(d.campaignId || d.idKampanye) === String(k.id))
            .reduce((sum, d) => sum + (Number(d.amount || d.nominal) || 0), 0);
        
        // 2. Total Keluar (Penarikan yang di-ACC)
        const totalOut = penarikan
            .filter((w) => String(w.campaignId) === String(k.id) && w.status === "approved")
            .reduce((sum, w) => sum + (Number(w.amount) || 0), 0);
            
        // 3. Saldo Tersedia (Net)
        const netBalance = totalIn - totalOut;

        return `
      <div class="bg-base-100 rounded-[2.5rem] overflow-hidden shadow-xl border border-base-content/5 flex flex-col group hover:-translate-y-2 transition-all duration-500">
          <div class="flex-grow text-left">
            ${KampanyeCard({
              ...k,
              collected: netBalance, // KHUSUS ADMIN: Tampilkan Saldo Bersih
              daysLeft: hitungSisaHari(k.deadline),
            })
              .replace(
                /Donasi<\/button>/,
                `<span class="flex items-center gap-2 font-black uppercase tracking-tighter text-white font-poppins"><svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Riwayat</span></button>`,
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
    `<div class="col-span-full py-24 text-center opacity-30 font-black uppercase tracking-[0.3em] text-base-content font-inter">Data program tidak ditemukan</div>`;

  paginationContainer.innerHTML =
    totalPages > 1
      ? `<div class="join bg-base-100 shadow-lg border border-base-content/10 rounded-2xl overflow-hidden font-inter"><button type="button" onclick="window.changePageAdmin(${currentPage - 1})" class="join-item btn btn-sm px-6 ${currentPage === 1 ? "btn-disabled opacity-30" : "btn-ghost"}" ${currentPage === 1 ? "disabled" : ""}>« Prev</button><button type="button" class="join-item btn btn-sm btn-ghost no-animation pointer-events-none border-x border-base-content/10 font-black text-xs px-6 text-base-content">${currentPage} / ${totalPages}</button><button type="button" onclick="window.changePageAdmin(${currentPage + 1})" class="join-item btn btn-sm px-6 ${currentPage === totalPages ? "btn-disabled opacity-30" : "btn-ghost"}" ${currentPage === totalPages ? "disabled" : ""}>Next »</button></div>`
      : "";
};

window.renderRel = () => {
  refreshDatabaseFromStorage();
  const { relawan = [] } = database;
  const container = document.getElementById("volunteer-table-container");
  if (!container) return;

  const rowsHTML = relawan
    .map(
      (r) => `
        <tr class="hover:bg-base-200/50 transition-all border-b border-base-content/5 group text-left font-inter text-base-content">
            <td class="py-8 pl-12 text-left">
                <div class="flex items-center gap-4 text-left font-inter">
                    <div class="avatar placeholder group-hover:scale-105 transition-transform"><div class="bg-primary/10 text-primary rounded-2xl w-12 h-12 flex items-center justify-center shadow-inner font-black uppercase">${(r.name || "U").charAt(0)}</div></div>
                    <div class="text-left"><div class="font-black text-base uppercase tracking-tight">${r.name || "Pendaftar"}</div><div class="text-[11px] opacity-50 font-bold uppercase tracking-widest mt-1">${r.email || r.whatsapp || "No Contact"}</div></div>
                </div>
            </td>
            <td class="align-middle text-left font-inter">${Badge({ category: r.skill || r.divisi || "Umum" })}</td>
            <td class="align-middle text-left font-inter">${Badge({ category: r.status || "approved" })}</td>
            <td class="text-center pr-12 align-middle font-inter">
                <div class="inline-flex gap-3">
                    <button type="button" class="btn btn-square btn-ghost border border-base-content/10 hover:bg-primary hover:text-white rounded-2xl h-12 w-12 shadow-sm transition-all" onclick="window.modalR('${r.id}')"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 00-2 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg></button>
                    <button type="button" class="btn btn-square btn-ghost border border-base-content/10 hover:bg-error hover:text-white rounded-2xl h-12 w-12 shadow-sm transition-all" onclick="window.delR('${r.id}')"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
            </td>
        </tr>`,
    )
    .join("");

  container.innerHTML = DataTable({
    headers: ["Identitas Akun", "Divisi Ahli", "Status Verif", "Opsi Kelola"],
    rowsHTML:
      rowsHTML ||
      `<tr><td colspan="4" class="text-center py-20 opacity-30 font-black text-base uppercase tracking-widest text-base-content">Database relawan kosong</td></tr>`,
  });
};

window.renderDonations = () => {
  refreshDatabaseFromStorage();
  const { donasi = [], kampanye = [] } = database;
  const container = document.getElementById("donation-table-container");
  if (!container) return;

  const sortedDonasi = [...donasi].sort((a, b) => {
    const dateA = (a.date || "").split("-").reverse().join("");
    const dateB = (b.date || "").split("-").reverse().join("");
    return dateB.localeCompare(dateA);
  });

  const rowsHTML = sortedDonasi
    .map((d, index) => {
      const program = kampanye.find(
        (k) => String(k.id) === String(d.campaignId || d.idKampanye),
      );
      const donorName = d.donaturName || "Seseorang";
      return `<tr class="hover:bg-base-200/50 transition-all border-b border-base-content/5 group text-left font-inter text-base-content font-inter">
            <td class="py-8 pl-12 text-left font-inter font-inter"><div class="flex items-center gap-4 text-left font-inter font-inter font-inter font-inter"><span class="text-[10px] font-black opacity-20 font-inter">#${donasi.length - index}</span><div class="avatar placeholder font-inter"><div class="bg-primary/10 text-primary rounded-2xl w-10 h-10 flex items-center justify-center font-black text-xs uppercase font-poppins">${donorName.charAt(0)}</div></div><div class="font-black text-sm uppercase text-base-content font-inter font-inter">${donorName}</div></div></td>
            <td class="align-middle text-left font-inter font-inter font-inter"><div class="space-y-1 text-left font-inter font-inter"><div class="text-xs font-black uppercase text-base-content/80 line-clamp-1 font-inter font-inter font-inter">${program?.title || "Program"}</div>${Badge({ category: program?.category || "Sosial" })}</div></td>
            <td class="align-middle text-left font-poppins text-primary font-black font-inter font-inter font-inter font-inter font-inter font-inter">${fmt(d.amount || d.nominal)}</td>
            <td class="align-middle text-center text-[10px] font-black opacity-40 uppercase tracking-widest text-base-content font-inter font-inter font-inter font-inter">${d.date || "-"}</td>
        </tr>`;
    })
    .join("");

  container.innerHTML = DataTable({
    headers: ["Nama Donatur", "Program Tujuan", "Nominal", "Waktu Transaksi"],
    rowsHTML,
  });
};

window.renderWithdrawals = () => {
  refreshDatabaseFromStorage();
  const { penarikan = [] } = database;
  const container = document.getElementById("withdraw-table-container");
  if (!container) return;

  const rowsHTML = penarikan
    .map((w) => {
      let statusBadge = "";
      let actionButtons = "";

      if (w.status === "approved") {
        statusBadge = `<div class="badge badge-success bg-success/10 text-success border-success/20 badge-sm font-black uppercase text-[9px] tracking-widest px-3">Disetujui</div>`;
        actionButtons = `<span class="text-[10px] font-black opacity-20 uppercase tracking-widest">Selesai</span>`;
      } else if (w.status === "rejected") {
        statusBadge = `<div class="badge badge-error bg-error/10 text-error border-error/20 badge-sm font-black uppercase text-[9px] tracking-widest px-3">Ditolak</div>`;
        actionButtons = `<span class="text-[10px] font-black opacity-20 uppercase tracking-widest">Ditolak</span>`;
      } else {
        statusBadge = `<div class="badge badge-warning bg-warning/10 text-warning border-warning/20 badge-sm font-black uppercase text-[9px] tracking-widest px-3 animate-pulse">Menunggu</div>`;
        actionButtons = `
                <div class="flex gap-3 justify-center items-center">
                    <button onclick="window.approveWithdraw('${w.id}')" 
                            class="btn btn-circle btn-xs md:btn-sm btn-ghost border border-success/30 text-success hover:bg-success hover:text-white transition-all shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" /></svg>
                    </button>
                    <button onclick="window.rejectWithdraw('${w.id}')" 
                            class="btn btn-circle btn-xs md:btn-sm btn-ghost border border-error/30 text-error hover:bg-error hover:text-white transition-all shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>`;
      }

      return `
        <tr class="hover:bg-base-200/50 transition-all border-b border-base-content/5 font-inter text-base-content group">
            <td class="py-6 pl-10 w-1/4">
                <div class="font-black text-sm text-base-content line-clamp-1 uppercase tracking-tight group-hover:text-primary transition-colors">${w.campaignTitle || "Kampanye"}</div>
                <div class="flex items-center gap-2 mt-1">
                    <span class="text-[9px] font-bold opacity-40 uppercase tracking-widest">${w.date || "Baru Saja"}</span>
                    <span class="w-1 h-1 bg-base-content/20 rounded-full"></span>
                    <span class="text-[9px] font-black text-primary uppercase tracking-tighter">ID: ${w.id}</span>
                </div>
            </td>
            <td class="font-poppins font-black text-base text-base-content whitespace-nowrap px-4">${fmt(w.amount)}</td>
            <!-- Menambahkan text-center pada data Via -->
            <td class="px-4 text-center">
                <div class="badge badge-ghost border-none bg-base-200 font-bold text-[10px] uppercase tracking-tighter text-base-content/60 px-3 py-3">${w.method}</div>
            </td>
            <td class="text-center px-4">${statusBadge}</td>
            <td class="text-center pr-10 min-w-[120px]">${actionButtons}</td>
        </tr>`;
    })
    .join("");

  container.innerHTML = DataTable({
    headers: [
      "Info Kampanye",
      "Nominal",
      `<div class="text-center w-full">Via</div>`, // TRICK: Menaruh div center di dalam string header
      `<div class="text-center w-full">Status</div>`,
      `<div class="text-center w-full">Aksi Kelola</div>`,
    ],
    rowsHTML:
      rowsHTML ||
      `<tr><td colspan="5" class="text-center py-24 opacity-30 font-black text-sm uppercase tracking-[0.3em] text-base-content">Belum ada permintaan penarikan dana</td></tr>`,
  });
};


// --- MAIN EXPORTED PAGE ---

export const DashboardAdmin = () => {
  // Init Logic
  setTimeout(() => {
    refreshDatabaseFromStorage();
    window.initAdminLogic();
    renderAdminCampaigns();
  }, 100);

  const {
    relawan = [],
    donasi = [],
    currentUser: user,
    kampanye = [],
    penarikan = [] 
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
                    <div class="flex items-center gap-4 text-left font-inter"><div class="h-10 w-2 bg-primary rounded-full shadow-lg"></div><h1 class="text-4xl md:text-5xl font-black uppercase tracking-tighter font-poppins leading-none">Admin <span class="text-primary font-poppins text-primary">Panel</span></h1></div>
                    <p class="opacity-50 text-sm font-bold pl-6 flex items-center gap-2 text-left font-inter"><span class="w-2 h-2 rounded-full bg-success animate-pulse"></span>Petugas: <span class="text-base-content font-black underline decoration-primary underline-offset-4">${user?.name || "Administrator"}</span></p>
                </div>
                <div class="tabs tabs-boxed bg-base-100 p-2 shadow-xl border border-base-content/5 rounded-[1.5rem] flex flex-wrap gap-1 font-inter">
                    <button type="button" id="tab-campaign-trigger" class="tab tab-active font-black px-6 rounded-xl transition-all" onclick="window.switchTab('k')">KAMPANYE</button>
                    <button type="button" id="tab-volunteer-trigger" class="tab font-black text-base-content/40 px-6 rounded-xl transition-all" onclick="window.switchTab('r')">RELAWAN</button>
                    <button type="button" id="tab-donation-trigger" class="tab font-black text-base-content/40 px-6 rounded-xl transition-all" onclick="window.switchTab('d')">DONASI</button>
                    <button type="button" id="tab-withdraw-trigger" class="tab font-black text-base-content/40 px-6 rounded-xl transition-all" onclick="window.switchTab('w')">PENARIKAN</button>
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
            ${WithdrawSection()} 
        </main>

        <!-- MODAL KONFIRMASI HAPUS (API MODAL BARU) -->
        <input type="checkbox" id="modal-confirm-delete" class="modal-toggle" />
        <div class="modal backdrop-blur-md text-left font-inter text-base-content">
            <div class="modal-box rounded-[2.5rem] p-10 text-center space-y-6 bg-base-100 shadow-2xl max-w-sm flex flex-col items-center border border-base-content/5 animate-in zoom-in duration-300">
                <div class="w-24 h-24 bg-error/10 text-error rounded-full flex items-center justify-center mb-2 shadow-inner text-error"><svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg></div>
                <div class="space-y-2 text-center font-inter"><h3 id="confirm-title" class="font-black text-3xl tracking-tighter uppercase font-poppins leading-none">Hapus Data?</h3><p id="confirm-msg" class="text-sm opacity-60 font-medium leading-relaxed font-inter">Aksi ini bersifat permanen.</p></div>
                <div class="flex gap-4 pt-4 w-full font-poppins"><button type="button" onclick="window.closeModal('modal-confirm-delete')" class="btn btn-ghost flex-1 rounded-2xl font-black uppercase h-14 font-inter">Batal</button><button type="button" id="confirm-delete-action-btn" class="btn btn-error flex-1 rounded-2xl font-black uppercase text-white shadow-lg h-14 border-none font-inter">Hapus!</button></div>
            </div>
        </div>

        <input type="checkbox" id="modal-campaign-toggle" class="modal-toggle" />
        <div class="modal backdrop-blur-xl text-left font-inter">
            <div class="modal-box rounded-[3rem] max-w-2xl p-0 bg-base-100 shadow-2xl overflow-hidden animate-in zoom-in duration-300 text-base-content border border-base-content/5">
                <div class="bg-base-200/50 px-8 py-6 border-b border-base-content/5 flex justify-between items-center">
                    <h3 class="font-black text-2xl tracking-tighter uppercase font-poppins leading-none" id="modal-campaign-title-display">Form Program</h3>
                    <button type="button" onclick="window.closeModal('modal-campaign-toggle')" class="btn btn-ghost btn-circle btn-sm">✕</button>
                </div>
                <form id="form-campaign-element" class="p-8 space-y-6 font-inter text-left">
                    <input type="hidden" id="form-campaign-id">
                    <div class="space-y-4">
                        ${InputField({ label: "Judul Kampanye", name: "form-campaign-title", placeholder: "Contoh: Bantuan Sembako Warga..." })}
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="form-control text-left">
                                <label class="label pb-1"><span class="label-text font-black uppercase text-[10px] opacity-60 tracking-widest">Kategori Program</span></label>
                                <select id="form-campaign-category" class="select select-bordered rounded-xl font-bold h-12 focus:select-primary transition-all text-base-content">
                                    <option value="Sosial">Sosial</option>
                                    <option value="Pendidikan">Pendidikan</option>
                                    <option value="Bencana Alam">Bencana Alam</option>
                                    <option value="Kesehatan">Kesehatan</option>
                                    <option value="Lingkungan">Lingkungan</option>
                                </select>
                            </div>
                            ${InputField({ label: "Target Dana (Rp)", type: "number", name: "form-campaign-target", placeholder: "50000000" })}
                        </div>
                        ${InputField({ label: "URL Gambar Utama", name: "form-campaign-image", placeholder: "https://link-gambar.com/foto.jpg" })}
                        <div class="form-control text-left">
                            <label class="label pb-1"><span class="label-text font-black uppercase text-[10px] opacity-60 tracking-widest text-left">Deskripsi Lengkap</span></label>
                            <textarea id="form-campaign-description" class="textarea textarea-bordered rounded-2xl h-32 p-4 font-medium text-sm leading-relaxed focus:textarea-primary transition-all text-base-content" placeholder="Ceritakan tujuan program ini..." required></textarea>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row gap-3 pt-4 border-t border-base-content/5">
                        <button type="button" onclick="window.closeModal('modal-campaign-toggle')" class="btn btn-error flex-1 rounded-2xl font-black uppercase h-14 tracking-widest text-xs">Batalkan</button>
                        <button type="submit" class="btn btn-primary flex-1 rounded-2xl font-black shadow-lg shadow-primary/20 uppercase h-14 border-none text-white tracking-widest text-xs">Simpan Data Program</button>
                    </div>
                </form>
            </div>
        </div>

        <input type="checkbox" id="modal-volunteer-toggle" class="modal-toggle" />
        <div class="modal backdrop-blur-xl text-left font-inter text-base-content">
            <div class="modal-box rounded-[3rem] p-10 bg-base-100 shadow-2xl animate-in zoom-in duration-300 border border-base-content/5">
                <h3 class="font-black text-2xl mb-8 tracking-tighter uppercase text-primary leading-none font-poppins">Verifikasi Relawan</h3>
                <form id="form-volunteer-element" class="space-y-4 font-inter text-left">
                    <input type="hidden" id="form-volunteer-id">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                        ${InputField({ label: "Nama Lengkap", name: "form-volunteer-name" })}
                        ${InputField({ label: "Kontak / Email", name: "form-volunteer-contact" })}
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="form-control text-left"><label class="label"><span class="label-text font-black text-[10px] opacity-50 uppercase font-inter">Divisi</span></label><select id="form-volunteer-division" class="select select-bordered rounded-2xl font-bold h-11 text-sm focus:select-primary text-base-content font-inter"><option value="Umum">Umum</option><option value="Medis">Medis</option><option value="Logistik">Logistik</option><option value="Pengajaran">Pengajaran</option><option value="Administrasi">Administrasi</option><option value="Konstruksi">Konstruksi</option><option value="Psikologi">Psikologi</option><option value="Dokumentasi">Dokumentasi</option></select></div>
                        <div class="form-control text-left"><label class="label"><span class="label-text font-black text-[10px] opacity-50 uppercase font-inter">Status</span></label><select id="form-volunteer-status" class="select select-bordered rounded-2xl font-black text-primary h-11 text-sm focus:select-primary font-inter"><option value="pending">⏳ Pending</option><option value="approved">✅ Approved</option><option value="rejected">❌ Rejected</option></select></div>
                    </div>
                    <div class="modal-action pt-4 gap-4"><button type="button" onclick="window.closeModal('modal-volunteer-toggle')" class="btn btn-ghost rounded-2xl font-black px-8 h-12 uppercase font-poppins text-xs font-inter">Tutup</button><button type="submit" class="btn btn-primary rounded-2xl px-12 h-12 font-black shadow-primary/20 uppercase font-poppins text-xs border-none text-white font-inter">Simpan</button></div>
                </form>
            </div>
        </div>

        <input type="checkbox" id="modal-donation-toggle" class="modal-toggle" />
        <div class="modal backdrop-blur-md text-left font-inter text-base-content">
            <div class="modal-box rounded-[3rem] bg-base-100 p-10 shadow-2xl max-w-lg animate-in zoom-in duration-300 border border-base-content/5" id="modal-donation-content"></div>
        </div>

        ${Modal({ id: "admin-success-modal", type: "success", title: "Berhasil!", message: '<span id="admin-success-msg"></span>', confirmText: "Selesai" })}
        ${Modal({ id: "admin-error-modal", type: "error", title: "Gagal!", message: '<span id="admin-error-msg"></span>', confirmText: "Coba Lagi" })}
    </div>`;
};

// --- LOGIC SECTION ---
if (typeof window !== "undefined") {
  window.showAlert = (title, msg, type = "success") => {
    const id = type === "success" ? "admin-success-modal" : "admin-error-modal";
    const msgId = type === "success" ? "admin-success-msg" : "admin-error-msg";
    const msgEl = document.getElementById(msgId);
    if (msgEl) msgEl.innerText = msg;
    // PEMANGGILAN BARU: Menggunakan openModal
    window.openModal(id);
  };

  window.showConfirm = (title, msg, actionFn) => {
    document.getElementById("confirm-title").innerText = title;
    document.getElementById("confirm-msg").innerText = msg;
    const btn = document.getElementById("confirm-delete-action-btn");
    const newBtn = btn.cloneNode(true);
    btn.parentNode.replaceChild(newBtn, btn);
    newBtn.addEventListener("click", () => {
      // PEMANGGILAN BARU: Menggunakan closeModal
      window.closeModal("modal-confirm-delete");
      actionFn();
    });
    // PEMANGGILAN BARU: Menggunakan openModal
    window.openModal("modal-confirm-delete");
  };

  window.switchTab = (t) => {
    const isK = t === "k",
      isR = t === "r",
      isD = t === "d",
      isW = t === "w";
    const secK = document.getElementById("section-campaign-management");
    const secR = document.getElementById("section-volunteer-management");
    const secD = document.getElementById("section-donation-history");
    const secW = document.getElementById("section-withdraw-management");

    if (secK) secK.classList.toggle("hidden", !isK);
    if (secR) secR.classList.toggle("hidden", !isR);
    if (secD) secD.classList.toggle("hidden", !isD);
    if (secW) secW.classList.toggle("hidden", !isW);

    document.getElementById("tab-campaign-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isK ? "tab-active" : "text-base-content/40"}`;
    document.getElementById("tab-volunteer-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isR ? "tab-active" : "text-base-content/40"}`;
    document.getElementById("tab-donation-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isD ? "tab-active" : "text-base-content/40"}`;
    document.getElementById("tab-withdraw-trigger").className =
      `tab font-black px-6 rounded-xl transition-all ${isW ? "tab-active" : "text-base-content/40"}`;

    if (isK) renderAdminCampaigns();
    else if (isR) window.renderRel();
    else if (isD) window.renderDonations();
    else if (isW) window.renderWithdrawals();
  };

  // --- LOGIKA APPROVAL ---
  window.approveWithdraw = (id) => {
    refreshDatabaseFromStorage();
    let penarikanList = database.penarikan || [];
    const idx = penarikanList.findIndex((w) => w.id === id);
    if (idx !== -1) {
      penarikanList[idx].status = "approved";
      window.syncGlobalData({ ...database, penarikan: penarikanList });
      window.renderWithdrawals();
      window.location.reload();
    }
  };

  window.rejectWithdraw = (id) => {
    refreshDatabaseFromStorage();
    let penarikanList = database.penarikan || [];
    const idx = penarikanList.findIndex((w) => w.id === id);
    if (idx !== -1) {
      penarikanList[idx].status = "rejected";
      window.syncGlobalData({ ...database, penarikan: penarikanList });
      window.renderWithdrawals();
      window.location.reload();
    }
  };

  window.openRiwayatModal = (cid) => {
    const logs = database.donasi.filter(
      (d) => String(d.campaignId || d.idKampanye) === String(cid),
    );
    const kampanye = database.kampanye.find(
      (k) => String(k.id) === String(cid),
    );
    const modalContent = document.getElementById("modal-donation-content");
    modalContent.innerHTML = `<div class="flex justify-between items-center mb-10 text-left font-inter"><div class="text-left font-inter"><h3 class="font-black text-2xl tracking-tighter uppercase text-primary leading-none font-poppins">Riwayat Donasi</h3><p class="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2 line-clamp-1 font-inter">${kampanye?.title || "Program"}</p></div><button type="button" onclick="window.closeModal('modal-donation-toggle')" class="btn btn-ghost btn-circle btn-sm">✕</button></div><div class="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar text-left font-inter">${
      logs.length > 0
        ? logs
            .map(
              (d) =>
                `<div class="flex justify-between items-center p-6 bg-base-200/50 border border-base-content/5 rounded-3xl group hover:bg-base-200 transition-all text-left"><div class="flex items-center gap-4 text-left"><div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm uppercase shadow-inner font-poppins">${(d.donaturName || d.namaDonatur || "S").charAt(0)}</div><div class="text-left"><p class="font-black text-sm uppercase tracking-tight">${d.donaturName || d.namaDonatur}</p><p class="text-[10px] opacity-40 font-bold uppercase tracking-widest">${d.date || d.tanggal || "Baru Saja"}</p></div></div><span class="text-primary font-black text-lg text-right font-poppins">${fmt(d.amount || d.nominal)}</span></div>`,
            )
            .reverse()
            .join("")
        : '<div class="text-center opacity-30 py-24 font-black text-sm uppercase tracking-[0.2em] font-inter">Belum ada donasi</div>'
    }</div><div class="modal-action pt-6 font-poppins text-white"><button type="button" onclick="window.closeModal('modal-donation-toggle')" class="btn btn-primary btn-block rounded-2xl font-black h-16 uppercase shadow-2xl border-none text-white">Tutup Laporan</button></div>`;

    // PEMANGGILAN BARU: Menggunakan openModal
    window.openModal("modal-donation-toggle");
  };

  window.modalR = (id) => {
    const r = database.relawan.find((i) => i.id == id);
    if (!r) return;
    document.getElementById("form-volunteer-id").value = r.id;
    document.getElementById("form-volunteer-name").value = r.name;
    document.getElementById("form-volunteer-contact").value = r.email;
    document.getElementById("form-volunteer-division").value =
      r.skill || "Umum";
    document.getElementById("form-volunteer-status").value =
      r.status || "approved";

    // PEMANGGILAN BARU: Menggunakan openModal
    window.openModal("modal-volunteer-toggle");
  };

  window.delR = (id) => {
    window.showConfirm(
      "Hapus Relawan",
      "Data relawan ini akan dihapus permanen.",
      () => {
        window.syncGlobalData({
          ...database,
          relawan: database.relawan.filter((r) => String(r.id) !== String(id)),
        });
        window.location.reload();
      },
    );
  };

  window.modalK = (id = null) => {
    const k = database.kampanye.find((i) => i.id == id) || {};
    document.getElementById("form-campaign-id").value = k.id || "";
    document.getElementById("form-campaign-title").value = k.title || "";
    document.getElementById("form-campaign-category").value =
      k.category || "Sosial";
    document.getElementById("form-campaign-target").value = k.target || "";
    document.getElementById("form-campaign-image").value = k.image || "";
    document.getElementById("form-campaign-description").value =
      k.description || "";
    document.getElementById("modal-campaign-title-display").innerText = id
      ? "Sunting Program"
      : "Buat Program";

    // Sesuai permintaan: "Edit Kampanye biarin aja udah bagus" (menggunakan checked = true)
    document.getElementById("modal-campaign-toggle").checked = true;
  };

  window.delK = (id) => {
    window.showConfirm(
      "Hapus Kampanye",
      "Apakah Anda yakin ingin menghapus program ini?",
      () => {
        window.syncGlobalData({
          ...database,
          kampanye: database.kampanye.filter(
            (k) => String(k.id) !== String(id),
          ),
        });
        window.location.reload();
      },
    );
  };

  window.openRiwayatModal = (cid) => {
    const logs = database.donasi.filter((d) => String(d.campaignId || d.idKampanye) === String(cid));
    const kampanye = database.kampanye.find((k) => String(k.id) === String(cid));
    const modalContent = document.getElementById("modal-donation-content");
    modalContent.innerHTML = `<div class="flex justify-between items-center mb-10 text-left font-inter"><div class="text-left font-inter"><h3 class="font-black text-2xl tracking-tighter uppercase text-primary leading-none font-poppins">Riwayat Donasi</h3><p class="text-[10px] font-bold opacity-40 uppercase tracking-widest mt-2 line-clamp-1 font-inter">${kampanye?.title || "Program"}</p></div><label for="modal-donation-toggle" class="btn btn-ghost btn-circle btn-sm">✕</label></div><div class="space-y-4 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar text-left font-inter">${logs.length > 0 ? logs.map((d) => `<div class="flex justify-between items-center p-6 bg-base-200/50 border border-base-content/5 rounded-3xl group hover:bg-base-200 transition-all text-left"><div class="flex items-center gap-4 text-left"><div class="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center font-black text-sm uppercase shadow-inner font-poppins">${(d.donaturName || d.namaDonatur || "S").charAt(0)}</div><div class="text-left"><p class="font-black text-sm uppercase tracking-tight">${d.donaturName || d.namaDonatur}</p><p class="text-[10px] opacity-40 font-bold uppercase tracking-widest">${d.date || d.tanggal || "Baru Saja"}</p></div></div><span class="text-primary font-black text-lg text-right font-poppins">${fmt(d.amount || d.nominal)}</span></div>`).reverse().join("") : '<div class="text-center opacity-30 py-24 font-black text-sm uppercase tracking-[0.2em] font-inter">Belum ada donasi</div>'}</div><div class="modal-action pt-6 font-poppins text-white"><label for="modal-donation-toggle" class="btn btn-primary btn-block rounded-2xl font-black h-16 uppercase shadow-2xl border-none text-white">Tutup Laporan</label></div>`;
    document.getElementById("modal-donation-toggle").checked = true;
  };
  window.filterKampanyeAdmin = (kategori) => {
    currentCategory = kategori;
    currentPage = 1;
    renderAdminCampaigns();
  };

  window.initAdminLogic = () => {
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
            id: generateId("K", database.kampanye),
            ...dataInput,
            collected: 0,
            author: "Admin",
            deadline: "2026-12-31",
          });
        }
        window.syncGlobalData({ ...database, kampanye: newKampanye });
        window.location.reload();
      });
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
        window.location.reload();
    });
  };
}
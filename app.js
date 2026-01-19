import {
  checkAuthState,
  login,
  register,
  logout,
  database,
} from "./assets/js/data.js";
import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/Home.js";
import { Kampanye } from "./pages/Kampanye.js";
import { DetailKampanye } from "./pages/DetailKampanye.js"; // <--- 1. IMPORT BARU
import { Donasi } from "./pages/Donasi.js";
import { Relawan } from "./pages/Relawan.js";
import { Tentang } from "./pages/Tentang.js";
import { DashboardAdmin } from "./pages/DashboardAdmin.js";
import { DashboardUser } from "./pages/DashboardUser.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";

const app = document.getElementById("app");

// 1. FUNGSI NAVIGASI UTAMA
export const navigateTo = (page, params = {}) => {
  const user = database.currentUser;

  // Proteksi Akses Berdasarkan Role
  if (page === "dashboard-admin" && (!user || user.role !== "admin")) {
    window.location.hash = "login";
    return;
  }
  if (page === "dashboard-user" && !user) {
    window.location.hash = "login";
    return;
  }

  // --- LOGIKA UPDATE URL (HASH) ---
  // Kita ubah hash URL agar sesuai dengan halaman dan parameter
  let targetHash = page;

  // Khusus halaman detail/donasi yang butuh ID, kita buat URL cantik: #detail?id=K1
  if ((page === "detail" || page === "donasi") && params && params.id) {
    targetHash = `${page}?id=${params.id}`;
  }

  // Hanya update hash jika berbeda (mencegah infinite loop)
  if (window.location.hash.replace("#", "") !== targetHash) {
    window.location.hash = targetHash;
    // Kita return di sini agar event listener 'hashchange' yang mengambil alih rendering
    // Ini praktik terbaik agar tombol back/forward browser bekerja sempurna
    return;
  }

  // Render Navbar (Kirim 'page' agar menu aktif menyala)
  document.getElementById("navbar-container").innerHTML = Navbar(page);

  // Animasi Transisi Halaman
  app.classList.remove("page-fade");
  void app.offsetWidth; // Trigger reflow
  app.classList.add("page-fade");

  // Router Switch Logic
  switch (page) {
    case "home":
      app.innerHTML = Home();
      break;
    case "kampanye":
      app.innerHTML = Kampanye();
      break;
    case "detail": // <--- 2. CASE BARU UNTUK DETAIL
      // Pastikan ID dikirim ke halaman Detail
      app.innerHTML = DetailKampanye({ id: params.id });
      break;
    case "donasi":
      app.innerHTML = Donasi(params);
      break;
    case "relawan":
      app.innerHTML = Relawan();
      break;
    case "tentang":
      app.innerHTML = Tentang();
      break;
    case "dashboard-admin":
      app.innerHTML = DashboardAdmin();
      break;
    case "dashboard-user":
      app.innerHTML = DashboardUser();
      break;
    case "login":
      app.innerHTML = Login();
      break;
    case "register":
      app.innerHTML = Register();
      break;
    default:
      app.innerHTML = Home();
  }

  window.scrollTo(0, 0);
};

// Expose ke window agar bisa dipanggil dari onclick HTML
window.navigateTo = navigateTo;

// 2. EVENT LISTENER URL (HASH CHANGE)
// Ini yang menangani tombol Back/Forward browser & Refresh halaman
window.addEventListener("hashchange", () => {
  // Ambil hash tanpa tanda #
  const hash = window.location.hash.replace("#", "") || "home";

  // Pisahkan nama halaman dan parameter (contoh: detail?id=K1)
  const [pageName, queryString] = hash.split("?");

  let params = {};

  // Jika ada query string (?id=...), kita ubah jadi object params
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    params = Object.fromEntries(urlParams.entries());
  }

  // Panggil fungsi render utama
  // Kita bypass update hash di dalam navigateTo agar tidak looping
  renderPageContent(pageName, params);
});

// Fungsi Render Internal (dipanggil oleh Hashchange)
const renderPageContent = (page, params) => {
  // Logic render sama dengan navigateTo, tapi tanpa mengubah Hash lagi
  // Kita gunakan navigateTo tapi mengakali pengecekan hash di dalamnya
  navigateTo(page, params);
};

// 3. LOGIKA AUTH (LOGIN/LOGOUT)
window.handleLogin = (event) => {
  if (event) event.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;
  const result = login(email, pass);

  if (result.success) {
    init();
    const target =
      result.user.role === "admin" ? "dashboard-admin" : "dashboard-user";
    navigateTo(target);
  } else {
    alert(result.message);
  }
};

window.handleLogout = () => {
  logout();
  init();
  navigateTo("home");
};

/**
 * 4. INISIALISASI APLIKASI
 */
const init = () => {
  checkAuthState();

  // Parsing URL saat pertama kali buka web (misal langsung buka #detail?id=K1)
  const hash = window.location.hash.replace("#", "") || "home";
  const [pageName, queryString] = hash.split("?");

  let params = {};
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    params = Object.fromEntries(urlParams.entries());
  }

  document.getElementById("navbar-container").innerHTML = Navbar(pageName);
  document.getElementById("footer-container").innerHTML = Footer();

  // Render halaman pertama
  navigateTo(pageName, params);
};

init();

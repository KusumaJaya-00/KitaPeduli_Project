import {
  checkAuthState,
  login,
  logout,
  database,
} from "./assets/js/data.js";
import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { ScrollTop } from "./components/ScrollTop.js";
import { Home } from "./pages/Home.js";
import { Kampanye } from "./pages/Kampanye.js";
import { DetailKampanye } from "./pages/DetailKampanye.js";
import { Donasi } from "./pages/Donasi.js";
import { Relawan } from "./pages/Relawan.js";
import { Tentang } from "./pages/Tentang.js";
import { DashboardAdmin } from "./pages/DashboardAdmin.js";
import { DashboardUser } from "./pages/DashboardUser.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";

const app = document.getElementById("app");

/**
 * 1. UTILITY: ROUTE GUARD
 * Mengecek apakah user diizinkan mengakses halaman tertentu
 */
const checkAccess = (page) => {
  const user = database.currentUser;
  if (page === "dashboard-admin" && (!user || user.role !== "admin"))
    return "login";
  if (page === "dashboard-user" && !user) return "login";
  return null; // Izin diberikan
};

/**
 * 2. UTILITY: LAYOUT RENDERER
 * Merender elemen-elemen global yang selalu ada di setiap halaman
 */
const renderLayout = (page) => {
  document.getElementById("navbar-container").innerHTML = Navbar(page);
  document.getElementById("footer-container").innerHTML = Footer();
  document.getElementById("scroll-top-container").innerHTML = ScrollTop();
};

/**
 * 3. CORE: RENDER ENGINE
 * Fungsi tunggal untuk merubah konten visual di layar
 */
const renderPage = (page, params = {}) => {
  // Jalankan Proteksi Role
  const redirectPath = checkAccess(page);
  if (redirectPath) {
    window.location.hash = redirectPath;
    return;
  }

  // Update Navbar & Footer
  renderLayout(page);

  // Trigger Animasi Fade
  app.classList.remove("page-fade");
  void app.offsetWidth;
  app.classList.add("page-fade");

  // Routing Switch Logic
  switch (page) {
    case "home":
      app.innerHTML = Home();
      break;
    case "kampanye":
      app.innerHTML = Kampanye();
      break;
    case "detail":
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

/**
 * 4. API: NAVIGATION
 * Fungsi untuk berpindah halaman secara terprogram (misal: tombol klik)
 */
export const navigateTo = (page, params = {}) => {
  let targetHash = page;

  // Format khusus untuk halaman dengan ID
  if ((page === "detail" || page === "donasi") && params.id) {
    targetHash = `${page}?id=${params.id}`;
  }

  // Jika hash berubah, event listener 'hashchange' akan memicu renderPage()
  if (window.location.hash.replace("#", "") !== targetHash) {
    window.location.hash = targetHash;
  } else {
    // Jika hash sama (misal klik link yang sama), paksa render ulang
    const parsed = parseHash(targetHash);
    renderPage(parsed.page, parsed.params);
  }
};

// Expose ke window agar bisa dipanggil dari HTML
window.navigateTo = navigateTo;

/**
 * 5. UTILITY: HASH PARSER
 * Memecah string hash menjadi objek Page dan Params
 */
const parseHash = (hashString) => {
  const [page, queryString] = hashString.split("?");
  const params = {};
  if (queryString) {
    const urlParams = new URLSearchParams(queryString);
    urlParams.forEach((val, key) => (params[key] = val));
  }
  return { page: page || "home", params };
};

/**
 * 6. EVENT LISTENERS
 */
window.addEventListener("hashchange", () => {
  const { page, params } = parseHash(window.location.hash.replace("#", ""));
  renderPage(page, params);
});

/**
 * 7. AUTH HANDLERS
 */
window.handleLogin = (event) => {
  if (event) event.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;
  const result = login(email, pass);

  if (result.success) {
    checkAuthState(); // Refresh global state
    const target =
      result.user.role === "admin" ? "dashboard-admin" : "dashboard-user";
    navigateTo(target);
  } else {
    alert(result.message);
  }
};

window.handleLogout = () => {
  logout();
  checkAuthState();
  navigateTo("home");
};

/**
 * 8. INITIALIZATION
 */
const init = () => {
  checkAuthState();

  // Baca URL saat ini untuk render pertama kali
  const { page, params } = parseHash(window.location.hash.replace("#", ""));
  renderPage(page, params);
};

init();

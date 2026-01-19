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
import { Donasi } from "./pages/Donasi.js";
import { Relawan } from "./pages/Relawan.js";
import { Tentang } from "./pages/Tentang.js";
import { DashboardAdmin } from "./pages/DashboardAdmin.js";
import { DashboardUser } from "./pages/DashboardUser.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";

const app = document.getElementById("app");

// 1. FUNGSI NAVIGASI UTAMA (DENGAN HASH)
export const navigateTo = (page, params = null) => {
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

  // Update Hash di URL 
  if (window.location.hash !== `#${page}`) {
    window.location.hash = page;
  }

  document.getElementById("navbar-container").innerHTML = Navbar(page);

  // Animasi Transisi Halaman
  app.classList.remove("page-fade");
  void app.offsetWidth;
  app.classList.add("page-fade");

  // Router Switch Logic
  switch (page) {
    case "home":
      app.innerHTML = Home();
      break;
    case "kampanye":
      app.innerHTML = Kampanye();
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

window.navigateTo = navigateTo;

window.addEventListener("hashchange", () => {
  const page = window.location.hash.replace("#", "") || "home";
  navigateTo(page);
});

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

  // Ambil halaman dari hash saat ini atau default ke home
  const initialPage = window.location.hash.replace("#", "") || "home";

  document.getElementById("navbar-container").innerHTML = Navbar(initialPage);
  document.getElementById("footer-container").innerHTML = Footer();

  // Render halaman pertama kali sesuai hash URL
  navigateTo(initialPage);
};

init();

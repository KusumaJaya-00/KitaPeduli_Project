import { checkAuthState, login, register, logout } from "./assets/js/data.js";
import { Navbar } from "./components/Navbar.js";
import { Footer } from "./components/Footer.js";
import { Home } from "./pages/Home.js";
import { Kampanye } from "./pages/Kampanye.js";
import { Donasi } from "./pages/Donasi.js";
import { Relawan } from "./pages/Relawan.js";
import { Tentang } from "./pages/Tentang.js";
import { DashboardAdmin } from "./pages/DashboardAdmin.js";
import { Login } from "./pages/Login.js";
import { Register } from "./pages/Register.js";

const app = document.getElementById("app");

// 1. FUNGSI NAVIGASI
export const navigateTo = (page) => {
  if (page === "admin") {
    const user = checkAuthState();
    if (!user || user.role !== "admin") {
      alert("Akses ditolak! Khusus Admin.");
      navigateTo("login");
      return;
    }
  }

  document.getElementById("navbar-container").innerHTML = Navbar(page);

  // Animasi Transisi
  app.classList.remove("page-fade");
  void app.offsetWidth;
  app.classList.add("page-fade");

  // Router Logic
  switch (page) {
    case "home":
      app.innerHTML = Home();
      break;
    case "kampanye":
      app.innerHTML = Kampanye();
      break;
    case "donasi":
      app.innerHTML = Donasi();
      break;
    case "relawan":
      app.innerHTML = Relawan();
      break;
    case "tentang":
      app.innerHTML = Tentang();
      break;
    case "admin":
      app.innerHTML = DashboardAdmin();
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

// Ekspos ke window agar bisa dipanggil dari HTML (onclick)
window.navigateTo = navigateTo;

// 2. LOGIKA LOGIN
window.handleLogin = (event) => {
  if (event) event.preventDefault();

  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  const result = login(email, pass);

  if (result.success) {
    init();
    navigateTo(result.user.role === "admin" ? "admin" : "home");
  } else {
    alert(result.message);
  }
};

// 3. LOGIKA REGISTER
window.handleRegister = (event) => {
  if (event) event.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;

  if (!name || !email || !pass) return alert("Isi semua data!");

  const result = register(name, email, pass);

  if (result.success) {
    alert(result.message);
    navigateTo("login");
  } else {
    alert(result.message);
  }
};

// 4. LOGIKA LOGOUT
window.handleLogout = () => {
  logout();
  init();
  navigateTo("home");
};

// 5. INISIALISASI APLIKASI
const init = () => {
  // Cek apakah ada session login di localStorage sebelum render apa pun
  checkAuthState();

  document.getElementById("navbar-container").innerHTML = Navbar();
  document.getElementById("footer-container").innerHTML = Footer();

  if (!app.innerHTML) navigateTo("home");
};

// Jalankan aplikasi
init();

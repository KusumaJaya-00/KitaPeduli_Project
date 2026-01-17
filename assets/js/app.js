import { state } from "./data.js";
import { Navbar } from "../../components/Navbar.js";
import { Footer } from "../../components/Footer.js";
import { Home } from "../../pages/Home.js";
import { Kampanye } from "../../pages/Kampanye.js";
import { Donasi } from "../../pages/Donasi.js";
import { Relawan } from "../../pages/Relawan.js";
import { DashboardAdmin } from "../../pages/DashboardAdmin.js";
import { Login } from "../../pages/Login.js";
import { Register } from "../../pages/Register.js";

const app = document.getElementById("app");

export const navigateTo = (page) => {
  // Proteksi Admin
  if (
    page === "admin" &&
    (!state.currentUser || state.currentUser.role !== "admin")
  ) {
    alert("Akses ditolak! Khusus Admin.");
    navigateTo("login");
    return;
  }

  document.getElementById("navbar-container").innerHTML = Navbar(page);
  
  app.classList.remove("page-fade");
  void app.offsetWidth;
  app.classList.add("page-fade");

  if (page === "home") app.innerHTML = Home();
  else if (page === "kampanye") app.innerHTML = Kampanye();
  else if (page === "donasi") app.innerHTML = Donasi();
  else if (page === "relawan") app.innerHTML = Relawan();
  else if (page === "admin") app.innerHTML = DashboardAdmin();
  else if (page === "login") app.innerHTML = Login();
  else if (page === "register") app.innerHTML = Register();

  window.scrollTo(0, 0);
};

window.navigateTo = navigateTo;

window.handleLogin = () => {
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;
  const user = state.users.find(
    (u) => u.email === email && u.password === pass,
  );

  if (user) {
    state.currentUser = user;
    init();
    navigateTo(user.role === "admin" ? "admin" : "home");
  } else {
    alert("Email atau password salah!");
  }
};

window.handleRegister = () => {
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;

  if (!name || !email || !pass) return alert("Isi semua data!");
  state.users.push({
    id: state.users.length + 1,
    name,
    email,
    password: pass,
    role: "user",
  });
  alert("Berhasil daftar! Silakan login.");
  navigateTo("login");
};

window.handleLogout = () => {
  state.currentUser = null;
  init();
  navigateTo("home");
};

const init = () => {
  document.getElementById("navbar-container").innerHTML = Navbar();
  navigateTo("home");
  document.getElementById("footer-container").innerHTML = Footer();
  if (!app.innerHTML) navigateTo("home");
};

init();

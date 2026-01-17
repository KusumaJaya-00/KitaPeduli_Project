import { state } from "../assets/js/data.js";
import { ui } from "../assets/js/styles.js";

export const Navbar = (currentPage) => {
  const isAdmin = state.currentUser && state.currentUser.role === "admin";
  const isLoggedIn = state.currentUser;

  // Fungsi pembantu untuk menentukan class active
  const activeClass = (page) => {
    return currentPage === page
      ? "text-blue-600 bg-blue-50 font-bold"
      : "text-gray-600 hover:text-blue-600";
  };

  return `
    <nav class="navbar bg-white/95 backdrop-blur-sm shadow-sm px-4 md:px-12 w-full border-b border-gray-100">
      <div class="flex-1">
        <a class="text-2xl font-black text-blue-600 cursor-pointer tracking-tighter" onclick="navigateTo('home')">
            KitaPeduli
        </a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1 gap-1 font-semibold">
          <li><a onclick="navigateTo('home')" class="${activeClass("home")}">Beranda</a></li>
          <li><a onclick="navigateTo('kampanye')" class="${activeClass("kampanye")}">Donasi</a></li>
          <li><a onclick="navigateTo('relawan')" class="${activeClass("relawan")}">Relawan</a></li>
          
          ${isAdmin ? `<li><a onclick="navigateTo('admin')" class="${activeClass("admin")} text-red-600">Admin</a></li>` : ""}
          
          <li class="ml-4">
            ${
              isLoggedIn
                ? `<button onclick="handleLogout()" class="btn btn-ghost btn-sm">Keluar</button>`
                : `<button onclick="navigateTo('login')" class="${ui.btnPrimary} btn-sm text-white px-6 rounded-xl shadow-md ${currentPage === "login" ? "ring-2 ring-blue-400" : ""}">Masuk</button>`
            }
          </li>
        </ul>
      </div>
    </nav>`;
};

import { database } from "../assets/js/data.js";
import { ui } from "../assets/js/styles.js";
import { getSavedTheme, THEME_DARK } from "../assets/js/theme.js";

/**
 * Logika Global untuk menutup dropdown <details> saat klik di luar
 * Diletakkan di luar fungsi agar hanya berjalan satu kali.
 */
if (typeof window !== "undefined") {
  document.addEventListener("click", (e) => {
    const dropdowns = document.querySelectorAll("details.dropdown");
    dropdowns.forEach((d) => {
      // Jika klik terjadi di luar elemen details, hapus atribut 'open'
      if (!d.contains(e.target)) {
        d.removeAttribute("open");
      }
    });
  });
}

/**
 * Komponen Navbar Responsif
 * Menu Mobile: Slide-in dari kanan, lebar 60% layar.
 */
export const Navbar = (currentPage) => {
  const isAdmin = database.currentUser && database.currentUser.role === "admin";
  const isLoggedIn = database.currentUser;
  const currentTheme = getSavedTheme();
  const isDark = currentTheme === THEME_DARK ? "checked" : "";

  const activeClass = (page) => {
    return currentPage === page
      ? "text-primary bg-primary/10 font-bold"
      : "text-base-content/70 hover:text-primary hover:bg-base-content/5";
  };

  // List Link Navigasi
  const navLinks = `
    <li><a onclick="navigateTo('home')" class="${activeClass("home")} rounded-lg py-3">Beranda</a></li>
    <li><a onclick="navigateTo('kampanye')" class="${activeClass("kampanye")} rounded-lg py-3">Donasi</a></li>
    <li><a onclick="navigateTo('relawan')" class="${activeClass("relawan")} rounded-lg py-3">Relawan</a></li>
    <li><a onclick="navigateTo('tentang')" class="${activeClass("tentang")} rounded-lg py-3">Tentang</a></li>
    ${isAdmin ? `<li><a onclick="navigateTo('admin')" class="${activeClass("admin")} text-error py-3">Dashboard</a></li>` : ""}
  `;

  return `
    <nav class="navbar bg-base-100/95 backdrop-blur-sm shadow-sm px-4 md:px-10 lg:px-16 w-full border-b border-base-content/10 sticky top-0 z-[100]">
      
      <!-- START: Logo (Kiri) -->
      <div class="navbar-start">
        <a class="text-xl md:text-2xl font-black text-primary cursor-pointer tracking-tighter select-none" onclick="navigateTo('home')">
            KitaPeduli
        </a>
      </div>

      <!-- CENTER: Menu (Desktop & Laptop) -->
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 gap-1 font-semibold items-center">
          ${navLinks}
        </ul>
      </div>

      <!-- END: Actions (Theme, Auth, & Mobile Toggle di Kanan) -->
      <div class="navbar-end gap-1 md:gap-2">
        
        <!-- Theme Toggle -->
        <label class="swap swap-rotate btn btn-ghost btn-circle btn-sm md:btn-md">
          <input type="checkbox" class="theme-controller" value="${THEME_DARK}" ${isDark} />
          <svg class="swap-off h-5 w-5 fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" /></svg>
          <svg class="swap-on h-5 w-5 fill-current text-primary" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" /></svg>
        </label>

        <!-- Auth Button (Masuk/Keluar) -->
        <div class="flex items-center">
          ${
            isLoggedIn
              ? `<button onclick="handleLogout()" class="btn btn-ghost btn-sm md:btn-md text-base-content hover:text-error">Keluar</button>`
              : `<button onclick="navigateTo('login')" class="btn btn-primary btn-sm md:btn-md text-primary-content px-4 md:px-6 rounded-xl shadow-md ${currentPage === "login" ? "ring-2 ring-primary/50" : ""}">Masuk</button>`
          }
        </div>

        <!-- Mobile Drawer Toggle -->
        <details class="dropdown dropdown-end lg:hidden">
          <summary class="btn btn-ghost p-1 ml-1 list-none focus:bg-base-content/5">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </summary>
          <!-- Menu Slide-in -->
          <ul class="dropdown-content menu p-4 shadow-2xl bg-base-100 rounded-l-2xl border-l border-b border-base-content/10 w-[60vw] h-[92vh] mt-4 font-bold flex flex-col gap-2 origin-right transition-all duration-300">
            <div class="text-xs opacity-40 uppercase tracking-widest mb-2 px-2">Menu Navigasi</div>
            ${navLinks}
          </ul>
        </details>

      </div>
    </nav>`;
};

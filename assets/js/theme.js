/**
 * Utilitas Tema KitaPeduli
 * Mengelola perpindahan tema dengan persistence menggunakan localStorage.
 */

const STORAGE_KEY = "kitapeduli_theme";

/** * KONFIGURASI TEMA
 * Ubah nilai di bawah ini jika ingin mengganti tema default/gelap.
 */
export const THEME_DEFAULT = "winter"; // Tema saat OFF
export const THEME_DARK = "night";  // Tema saat ON (Ganti di sini saja!)
/**
 * Menerapkan tema ke elemen HTML
 */
export const applyTheme = (theme) => {
  // 1. Terapkan ke atribut data-theme (Visual)
  document.documentElement.setAttribute("data-theme", theme);

  // 2. Simpan ke storage (Persistensi)
  localStorage.setItem(STORAGE_KEY, theme);

  // 3. Sinkronkan semua toggle di halaman agar posisi centangnya benar
  const controllers = document.querySelectorAll(".theme-controller");
  controllers.forEach((input) => {
    if (input.type === "checkbox") {
      input.checked = theme === THEME_DARK;
    }
  });
};

/**
 * Mendapatkan tema yang tersimpan
 */
export const getSavedTheme = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) return saved;

  // Jika belum ada, ikuti preferensi sistem operasi
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? THEME_DARK
    : THEME_DEFAULT;
};

/**
 * Inisialisasi: Berjalan otomatis saat script dimuat
 */
export const initThemeController = () => {
  // A. Terapkan tema segera saat halaman dimuat
  const currentTheme = getSavedTheme();
  applyTheme(currentTheme);

  // B. Tangkap event dari DaisyUI theme-controller
  document.addEventListener("change", (e) => {
    if (e.target.classList.contains("theme-controller")) {
      const newTheme = e.target.checked ? THEME_DARK : THEME_DEFAULT;
      applyTheme(newTheme);
    }
  });
};

// Eksekusi inisialisasi
initThemeController();

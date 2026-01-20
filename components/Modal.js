/**
 * Komponen Modal Universal Reusable (DaisyUI Toggle Pattern)
 * Menggunakan prinsip DRY dan transisi CSS murni agar animasi halus.
 */

// 1. DAFTARKAN FUNGSI GLOBAL (Agar bisa dipanggil di Login/Register/dll)
// Kita taruh di luar fungsi komponen agar langsung terdeteksi saat import.
if (typeof window !== "undefined") {
  window.openModal = (id) => {
    const modalToggle = document.getElementById(id);
    if (modalToggle) modalToggle.checked = true;
  };
  window.closeModal = (id) => {
    const modalToggle = document.getElementById(id);
    if (modalToggle) modalToggle.checked = false;
  };
}

export const Modal = ({
  id = "global-modal",
  title = "Berhasil!",
  message = "Aksi Anda telah berhasil diproses.",
  type = "success",
  confirmText = "Tutup",
}) => {
  // Penentuan Ikon berdasarkan tipe
  let iconColor = "text-success bg-success/10";
  let iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />`;

  if (type === "error") {
    iconColor = "text-error bg-error/10";
    iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
  } else if (type === "warning") {
    iconColor = "text-warning bg-warning/10";
    iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`;
  }

  return `
    <!-- Checkbox Toggle: Inilah saklar animasinya -->
    <input type="checkbox" id="${id}" class="modal-toggle" />
    
    <div class="modal backdrop-blur-md z-[3000] transition-all duration-300">
        <div class="modal-box w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-base-content/5 p-8 text-center bg-base-100 flex flex-col items-center animate-in zoom-in-95 duration-300">
            
            <!-- Icon Bulat -->
            <div class="w-20 h-20 rounded-full flex items-center justify-center mb-6 ${iconColor} shadow-inner">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    ${iconPath}
                </svg>
            </div>

            <!-- Konten Teks -->
            <div class="space-y-2 mb-8">
                <h3 class="text-2xl font-black text-base-content tracking-tight font-poppins uppercase">${title}</h3>
                <div class="text-sm opacity-60 font-medium leading-relaxed px-2 font-inter text-base-content">
                    ${message}
                </div>
            </div>

            <!-- Tombol Konfirmasi -->
            <label for="${id}" class="btn btn-primary btn-block rounded-2xl h-14 font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all border-none text-white normal-case text-lg font-poppins cursor-pointer">
                ${confirmText}
            </label>
        </div>
        
        <!-- Area Klik Luar untuk Close -->
        <label class="modal-backdrop" for="${id}">Close</label>
    </div>
  `;
};

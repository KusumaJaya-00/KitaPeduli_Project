export const Modal = ({
  id = "global-modal",
  title = "Berhasil!",
  message = "Aksi Anda telah berhasil diproses.",
  type = "success",
  confirmText = "Tutup",
}) => {
  // Penentuan Ikon berdasarkan tipe
  let iconColor = "text-success bg-success/10";
  let iconPath = `
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
    `;

  if (type === "error") {
    iconColor = "text-error bg-error/10";
    iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />`;
  } else if (type === "warning") {
    iconColor = "text-warning bg-warning/10";
    iconPath = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />`;
  }

  return `
        <div id="${id}" class="hidden fixed inset-0 z-[2000] bg-neutral-focus/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div class="modal-box w-full max-w-sm rounded-[2.5rem] shadow-2xl border border-base-content/5 p-8 text-center bg-base-100 flex flex-col items-center">
                
                <!-- Icon Bulat -->
                <div class="w-20 h-20 rounded-full flex items-center justify-center mb-6 ${iconColor}">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        ${iconPath}
                    </svg>
                </div>

                <!-- Konten Teks -->
                <h3 class="text-2xl font-black mb-3 text-base-content italic tracking-tight font-poppins">${title}</h3>
                <p class="text-sm opacity-60 font-medium leading-relaxed mb-8 px-2 font-inter">
                    ${message}
                </p>

                <!-- Tombol Konfirmasi -->
                <button 
                    onclick="document.getElementById('${id}').classList.add('hidden')" 
                    class="btn btn-primary btn-block rounded-2xl h-14 font-black shadow-lg shadow-primary/20 hover:scale-105 active:scale-95 transition-all normal-case text-lg font-poppins">
                    ${confirmText}
                </button>
            </div>
        </div>
    `;
};

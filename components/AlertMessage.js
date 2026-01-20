// components/AlertMessage.js
export const AlertMessage = ({ message, type = "success" }) => {
  // Mengecek apakah tipe alert adalah success (berwarna hijau) atau bukan (merah)
  const isSuccess = type === "success";
  
  // Icon kecil ala notifikasi mobile
  const icon = isSuccess 
    ? `<div class="bg-green-500 rounded-full p-2 shadow-lg shadow-green-200">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
       </div>`
    : `<div class="bg-red-500 rounded-full p-2 shadow-lg shadow-red-200">
          <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="4">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
       </div>`;

  return `
    <style>
      @keyframes slideInRight {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
      }
      .animate-toast {
        animation: slideInRight 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
      }
    </style>

    <div id="alert-popup" class="fixed top-5 right-5 z-[9999] max-w-sm w-full animate-toast">
      <div class="bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 flex items-center gap-4">
        <div class="flex-shrink-0">
          ${icon}
        </div>
        
        <div class="flex-grow text-left">
          <h3 class="text-sm font-black text-gray-800 font-poppins">
            ${isSuccess ? 'Berhasil!' : 'Gagal!'}
          </h3>
          <p class="text-[11px] font-medium text-gray-500 line-clamp-2">
            ${message}
          </p>
        </div>

        <button onclick="this.closest('#alert-popup').remove()" class="text-gray-400 hover:text-gray-600 transition">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  `;
};
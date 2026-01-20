/**
 * --- LOGIKA GLOBAL: MEMBUKA MODAL ---
 * Fungsi ini ditempel ke objek 'window' agar bisa dipanggil dari file lain (misal DetailKampanye.js)
 * hanya dengan onclick="window.openShareModal()".
 */
window.openShareModal = () => {
  const modal = document.getElementById("share_modal");
  // .showModal() adalah method bawaan HTML5 untuk elemen <dialog>.
  // Ini otomatis membuat background gelap (backdrop) dan memusatkan modal.
  if (modal) modal.showModal();
};

/**
 * --- LOGIKA GLOBAL: COPY LINK ---
 * Fungsi untuk menyalin teks URL ke clipboard pengguna.
 */
window.copyToClipboard = () => {
  // 1. Ambil elemen input yang berisi URL
  const copyText = document.getElementById("share_url");

  // 2. Seleksi teks di dalamnya (penting untuk kompatibilitas browser mobile)
  copyText.select();
  copyText.setSelectionRange(0, 99999); // Range seleksi maksimal untuk HP

  // 3. API Clipboard Modern: Menulis teks ke clipboard sistem
  navigator.clipboard.writeText(copyText.value);

  // 4. Feedback Visual (UX): Ubah tombol "Salin" jadi "Disalin!" agar user tahu berhasil
  const btn = document.getElementById("btn-copy");
  const originalText = btn.innerText; // Simpan teks asli ("Salin")

  btn.innerText = "Disalin!"; // Ganti teks sementara
  btn.classList.add("btn-success", "text-white"); // Ganti warna jadi hijau

  // 5. Kembalikan tombol seperti semula setelah 2 detik (2000ms)
  setTimeout(() => {
    btn.innerText = originalText;
    btn.classList.remove("btn-success", "text-white");
  }, 2000);
};

/**
 * Komponen ShareModal
 * Menampilkan popup berisi tombol share ke sosmed (WA, FB, Twitter) dan fitur copy link.
 * @param {string} title - Judul konten yang akan dibagikan (default text wa/twitter)
 * @param {string} currentUrl - URL halaman saat ini (window.location.href)
 */
export const ShareModal = ({ title, currentUrl }) => {
  return `
    <!-- 
        ELEMENT DIALOG (Modal HTML5)
        - id="share_modal": ID unik untuk dipanggil oleh JS (openShareModal)
        - class "modal-bottom sm:modal-middle": Di HP muncul dari bawah (bottom sheet), 
          di layar besar (sm ke atas) muncul di tengah.
    -->
    <dialog id="share_modal" class="modal modal-bottom sm:modal-middle">
        <div class="modal-box bg-base-100">
            <h3 class="font-bold text-lg text-base-content mb-4 text-center">Bagikan tautan ke media sosial</h3>
            
            <!-- BAGIAN 1: TOMBOL SOCIAL MEDIA -->
            <div class="flex justify-center gap-6 mb-6">
                
                <!-- Facebook: Menggunakan URL sharer.php khusus Facebook -->
                <a href="https://www.facebook.com/sharer/sharer.php?u=${currentUrl}" target="_blank" class="btn btn-circle btn-ghost hover:bg-base-200">
                    <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                
                <!-- Twitter (X): Menggunakan intent/tweet dengan parameter url dan text -->
                <a href="https://twitter.com/intent/tweet?url=${currentUrl}&text=${title}" target="_blank" class="btn btn-circle btn-ghost hover:bg-base-200">
                    <svg class="w-8 h-8 text-black dark:text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                
                <!-- WhatsApp: Menggunakan API wa.me. %20 adalah kode URL untuk spasi. -->
                <a href="https://wa.me/?text=${title}%20${currentUrl}" target="_blank" class="btn btn-circle btn-ghost hover:bg-base-200">
                    <svg class="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
                </a>
            </div>

            <!-- BAGIAN 2: INPUT COPY URL -->
            <div class="join w-full border border-base-content/20 rounded-lg overflow-hidden">
                <!-- Input Readonly: Hanya bisa dibaca, tidak bisa diketik manual -->
                <input id="share_url" type="text" value="${currentUrl}" class="input input-bordered join-item w-full bg-base-200 text-base-content/70 focus:outline-none text-sm" readonly />
                <!-- Tombol Trigger -->
                <button id="btn-copy" onclick="window.copyToClipboard()" class="btn btn-neutral join-item">Salin</button>
            </div>

            <!-- BAGIAN 3: TOMBOL TUTUP -->
            <div class="modal-action justify-center mt-6">
                <!-- method="dialog": Fitur HTML5 form. Jika tombol di dalamnya diklik, modal otomatis tertutup tanpa butuh JS tambahan. -->
                <form method="dialog" class="w-full">
                    <button class="btn btn-outline btn-block border-error text-error hover:bg-error hover:text-white">Kembali</button>
                </form>
            </div>
        </div>
        
        <!-- BACKDROP: Area gelap di luar modal. Jika diklik, modal juga akan tertutup. -->
        <form method="dialog" class="modal-backdrop">
            <button>close</button>
        </form>
    </dialog>
    `;
};

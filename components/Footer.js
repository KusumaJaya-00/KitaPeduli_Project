export const Footer = () => {
  return `
    <footer class="bg-neutral text-neutral-content pt-16 pb-8 border-t border-base-content/5">
      <!-- MENGGUNAKAN STANDAR TAILWIND CONTAINER LANGSUNG -->
      <div class="container mx-auto px-4 md:px-10 lg:px-16 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1 space-y-4">
          <h2 class="text-3xl font-black text-primary tracking-tighter">KitaPeduli</h2>
          <p class="text-sm opacity-60 leading-relaxed">
            Platform donasi binaan ITB Stikom Bali. Membantu sesama dengan teknologi dan transparansi.
          </p>
        </div>
        
        <div class="space-y-4">
          <h3 class="text-sm font-black uppercase tracking-widest text-primary">Navigasi</h3>
          <ul class="space-y-2 text-sm opacity-70">
            <li><a onclick="navigateTo('home')" class="hover:text-primary cursor-pointer">Beranda</a></li>
            <li><a onclick="navigateTo('kampanye')" class="hover:text-primary cursor-pointer">Kampanye</a></li>
            <li><a onclick="navigateTo('relawan')" class="hover:text-primary cursor-pointer">Relawan</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-sm font-black uppercase tracking-widest text-primary">Dukungan</h3>
          <ul class="space-y-2 text-sm opacity-70">
            <li><a class="hover:text-primary cursor-pointer">Bantuan</a></li>
            <li><a class="hover:text-primary cursor-pointer">Privasi</a></li>
            <li><a class="hover:text-primary cursor-pointer">Syarat & Ketentuan</a></li>
          </ul>
        </div>

        <div class="space-y-4">
          <h3 class="text-sm font-black uppercase tracking-widest text-primary">Hubungi Kami</h3>
          <p class="text-sm opacity-70">Jl. Raya Puputan No.86, Renon, Denpasar.</p>
          <p class="text-sm font-bold text-primary">halo@kitapeduli.id</p>
        </div>
      </div>

      <div class="border-t border-white/5 pt-8">
        <!-- MENGGUNAKAN STANDAR TAILWIND CONTAINER LANGSUNG -->
        <div class="container mx-auto px-4 md:px-10 lg:px-16 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold uppercase tracking-widest opacity-30">
          <p>© 2026 KitaPeduli • ITB STIKOM BALI</p>
          <p>Dibuat dengan dedikasi untuk kemanusiaan</p>
        </div>
      </div>
    </footer>
  `;
};

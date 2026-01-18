export const Footer = () => {
  return `
    <footer class="mt-auto bg-neutral text-neutral-content rounded-t-[2.5rem] overflow-hidden shadow-2xl border-t border-base-content/5">
      <!-- Konten Utama Footer -->
      <div class="container mx-auto px-6 lg:px-16 py-12 md:py-16">
        <!-- Grid layout: 1 kolom di HP, 2 kolom di Tablet, 4 kolom di Desktop -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 items-start">
          
          <!-- Kolom 1: Branding -->
          <div class="flex flex-col items-center md:items-start space-y-5">
            <div class="space-y-3 text-center md:text-left">
              <h2 class="text-3xl font-black text-primary">KitaPeduli</h2>
              <p class="text-sm opacity-70 leading-relaxed max-w-[280px]">
                Platform donasi digital binaan <span class="font-bold text-neutral-content">ITB Stikom Bali</span>. 
                Bersama, kita wujudkan harapan bagi mereka yang membutuhkan.
              </p>
            </div>
            <!-- Social Media Buttons -->
            <div class="flex gap-3">
              <a class="btn btn-ghost btn-circle btn-sm bg-base-content/5 hover:bg-primary hover:text-primary-content transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a class="btn btn-ghost btn-circle btn-sm bg-base-content/5 hover:bg-primary hover:text-primary-content transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a class="btn btn-ghost btn-circle btn-sm bg-base-content/5 hover:bg-primary hover:text-primary-content transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1,0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          <!-- Kolom 2: Navigasi Cepat -->
          <div class="flex flex-col items-center md:items-start space-y-6">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-primary">Navigasi</h3>
            <ul class="flex flex-col gap-4 text-sm font-medium items-center md:items-start">
              <li><a onclick="navigateTo('home')" class="hover:text-primary transition-colors cursor-pointer opacity-70 hover:opacity-100">Beranda</a></li>
              <li><a onclick="navigateTo('kampanye')" class="hover:text-primary transition-colors cursor-pointer opacity-70 hover:opacity-100">Daftar Kampanye</a></li>
              <li><a onclick="navigateTo('relawan')" class="hover:text-primary transition-colors cursor-pointer opacity-70 hover:opacity-100">Program Relawan</a></li>
              <li><a onclick="navigateTo('tentang')" class="hover:text-primary transition-colors cursor-pointer opacity-70 hover:opacity-100">Tentang Kami</a></li>
            </ul>
          </div>

          <!-- Kolom 3: Hubungi Kami -->
          <div class="flex flex-col items-center md:items-start space-y-6">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-primary">Hubungi Kami</h3>
            <ul class="flex flex-col gap-5 text-sm items-center md:items-start">
              <li class="flex items-start gap-3 opacity-70 text-center md:text-left max-w-[200px] md:max-w-none">
                <svg class="w-5 h-5 text-primary shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>Jl. Raya Puputan No.86, Renon, Denpasar Selatan, Bali.</span>
              </li>
              <li>
                <a href="mailto:halo@kitapeduli.id" class="flex items-center gap-3 opacity-70 hover:opacity-100 hover:text-primary transition-all">
                  <svg class="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                  <span class="font-bold tracking-tight">halo@kitapeduli.id</span>
                </a>
              </li>
            </ul>
          </div>

          <!-- Kolom 4: Informasi Legal -->
          <div class="flex flex-col items-center md:items-start space-y-6">
            <h3 class="text-xs font-black uppercase tracking-[0.2em] text-primary">Dukungan</h3>
            <ul class="flex flex-col gap-4 text-sm font-medium items-center md:items-start">
              <li><a class="link link-hover opacity-70 hover:text-primary transition-colors">Syarat & Ketentuan</a></li>
              <li><a class="link link-hover opacity-70 hover:text-primary transition-colors">Kebijakan Privasi</a></li>
              <li><a class="link link-hover opacity-70 hover:text-primary transition-colors">Pusat Bantuan</a></li>
            </ul>
          </div>
        </div>
      </div>

      <!-- Copyright Bar -->
      <div class="bg-black/20 py-8">
        <div class="container mx-auto px-6 lg:px-16 flex flex-col md:flex-row justify-center items-center gap-6 text-center md:text-center">
          <div class="space-y-1">
            <p class="text-[10px] md:text-xs font-black uppercase tracking-[0.2em] opacity-40">
              &copy; 2026 KitaPeduli Group • ITB Stikom Bali
            </p>
            <p class="text-[9px] italic opacity-30">Dibuat dengan dedikasi untuk kemanusiaan.</p>
          </div>
        </div>
      </div>
    </footer>
  `;
};

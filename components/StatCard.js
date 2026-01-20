/**
 * Komponen StatCard Reusable
 * Digunakan untuk menampilkan ringkasan data berupa angka dan ikon.
 */
export const StatCard = ({ title, value, label, isPrimary = false, icon }) => {
  // Pengaturan warna semantik berdasarkan tema DaisyUI (Winter & Night)
  const containerClass = isPrimary
    ? "bg-primary text-primary-content shadow-xl shadow-primary/20 border-primary-focus"
    : "bg-base-100 border-base-content/5 shadow-lg";

  const titleOpacity = isPrimary ? "opacity-70" : "text-base-content/40";

  return `
    <div class="${containerClass} p-10 rounded-[3rem] border relative overflow-hidden group transition-all duration-500 hover:shadow-2xl">
        <div class="relative z-10 text-left">
            <p class="text-[10px] font-black uppercase tracking-[0.3em] ${titleOpacity} mb-3 font-poppins">${title}</p>
            <h3 class="text-4xl md:text-5xl font-black tracking-tighter leading-none font-poppins">
                ${value} 
                <span class="text-sm font-bold opacity-30 uppercase tracking-[0.2em] ml-1">${label || ""}</span>
            </h3>
        </div>
        
        <!-- Ikon Dekoratif dengan animasi hover -->
        <div class="absolute -right-6 -bottom-6 opacity-10 group-hover:scale-125 group-hover:rotate-12 transition-transform duration-1000">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-44 w-44" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                ${icon}
            </svg>
        </div>
    </div>
  `;
};

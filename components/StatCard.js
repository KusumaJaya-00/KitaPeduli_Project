export const StatCard = ({ title, value, icon, colorClass = "text-primary", desc = "" }) => {
    return `
      <div class="stats shadow-md w-full bg-base-100 border border-base-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-default group">
        <div class="stat">
          <!-- Bagian Ikon -->
          <div class="stat-figure ${colorClass} opacity-80 group-hover:opacity-100 transition-opacity">
            <i class="${icon} text-3xl"></i>
          </div>
          
          <!-- Bagian Judul -->
          <div class="stat-title text-base-content/60 font-bold text-xs uppercase tracking-widest">
            ${title}
          </div>
          
          <!-- Bagian Nilai Utama -->
          <div class="stat-value ${colorClass} text-2xl md:text-3xl font-black">
            ${value}
          </div>
          
          <!-- Bagian Deskripsi -->
          ${desc 
            ? `<div class="stat-desc text-base-content/40 mt-1 font-medium italic">${desc}</div>` 
            : ''
          }
        </div>
      </div>
    `;
};
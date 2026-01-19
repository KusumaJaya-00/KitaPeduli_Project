import { ProgressBar } from "./ProgressBar.js";
import { Badge } from "./Badge.js"; 

export const KampanyeCard = ({
  id,
  title,
  image,
  target,
  collected,
  daysLeft,
  category,
  author,
  description,
}) => {
  return `
        <div onclick="navigateTo('detail', {id: '${id}'})" 
             class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-content/5 group cursor-pointer overflow-hidden rounded-2xl h-full flex flex-col">
            
            <figure class="relative h-48 overflow-hidden">
                <img src="${image}" alt="${title}" 
                     class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
                     onerror="this.src='https://images.unsplash.com/photo-1532629345422-7515f3d16bb8?q=80&w=1000'" />
                
                <div class="absolute top-3 left-3">
                    ${Badge({ category })}
                </div>
            </figure>

            <div class="card-body p-5 flex-grow flex flex-col justify-between">
                <div class="space-y-3">
                    <h2 class="card-title text-base leading-tight font-black line-clamp-2 group-hover:text-primary transition-colors">
                        ${title}
                    </h2>

                    <p class="text-xs text-base-content/70 line-clamp-2 leading-relaxed">
                        ${description || "Deskripsi kampanye belum tersedia untuk saat ini."}
                    </p>
                    
                    <div class="flex items-center gap-2 pt-1">
                        <div class="avatar placeholder">
                            <div class="bg-neutral text-neutral-content rounded-full w-6">
                                <span class="text-[10px]">${author ? author.charAt(0) : "A"}</span>
                            </div>
                        </div>
                        <p class="text-[11px] opacity-60 font-medium italic">
                            Oleh <span class="font-bold not-italic text-base-content">${author || "Anonim"}</span>
                        </p>
                    </div>

                    <div class="py-1">
                        ${ProgressBar({ collected, target, size: "sm" })}
                    </div>
                </div>

                <div class="flex justify-between items-center pt-4 mt-2 border-t border-base-content/5">
                    <div class="flex flex-col">
                        <span class="text-[10px] uppercase font-bold opacity-40 tracking-widest">Sisa Waktu</span>
                        <span class="text-sm font-black text-secondary">${daysLeft} Hari</span>
                    </div>
                    
                    <button 
                        onclick="event.stopPropagation(); navigateTo('donasi', {id: '${id}'})" 
                        class="btn btn-primary btn-sm px-5 font-bold shadow-md rounded-xl normal-case hover:scale-105 active:scale-95 transition-all">
                        Donasi
                    </button>
                </div>
            </div>
        </div>
    `;
};

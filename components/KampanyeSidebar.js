// File: components/KampanyeSidebar.js
import { ProgressBar } from "./ProgressBar.js";

export const KampanyeSidebar = ({
  item,
  donaturList,
  daysLeft,
  percentage,
}) => {
  // Helper lokal
  const formatRupiah = (angka) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);

  return `
    <div class="sticky top-24 space-y-6">
        
        <div class="card bg-base-100 shadow-xl border border-base-content/5 p-6 hidden lg:block rounded-2xl">
            <div class="mb-4">
                <p class="text-sm text-base-content/60 font-medium mb-1">Dana terkumpul</p>
                <span class="text-3xl font-black text-primary block mb-1">
                    ${formatRupiah(item.collected)}
                </span>
                <span class="text-xs text-base-content/50">
                    dari target <span class="font-semibold text-base-content/80">${formatRupiah(item.target)}</span>
                </span>
            </div>

            <div class="py-2 mb-4">
                ${ProgressBar({ collected: item.collected, target: item.target })}
            </div>

            <div class="grid grid-cols-3 gap-2 text-center mb-6 text-sm">
                <div class="flex flex-col">
                    <span class="font-bold text-base-content">${donaturList.length}</span>
                    <span class="text-xs text-base-content/50">Donasi</span>
                </div>
                    <div class="flex flex-col border-x border-base-content/10">
                    <span class="font-bold text-base-content">0</span>
                    <span class="text-xs text-base-content/50">Bagikan</span>
                </div>
                <div class="flex flex-col">
                    <span class="font-bold text-base-content">${daysLeft}</span>
                    <span class="text-xs text-base-content/50">Hari Lagi</span>
                </div>
            </div>

            <button onclick="navigateTo('donasi', {id: '${item.id}'})" class="btn btn-primary btn-lg w-full font-bold shadow-lg shadow-primary/30 hover:shadow-xl transition-all mb-3 text-white">
                Donasi Sekarang
            </button>
            
            <button onclick="window.openShareModal()" class="btn btn-outline btn-block border-base-content/20 hover:bg-base-200 text-base-content font-bold">
                Bagikan
            </button>
        </div>

        <div class="card bg-base-100 shadow-lg border border-base-content/5 overflow-hidden rounded-2xl">
            <div class="p-4 border-b border-base-content/5 bg-base-200/50 flex justify-between items-center">
                <h3 class="font-bold text-base-content">Donatur (${donaturList.length})</h3>
                <button class="text-xs text-primary font-bold hover:underline">Lihat Semua</button>
            </div>
            
            <div class="max-h-[400px] overflow-y-auto custom-scrollbar">
                ${
                  donaturList.length > 0
                    ? `<ul class="divide-y divide-base-content/5">
                        ${[...donaturList]
                          .reverse()
                          .map(
                            (donatur) => `
                        <li class="flex items-start gap-3 p-4 hover:bg-base-200/30 transition-colors">
                            <div class="avatar placeholder mt-1">
                                <div class="bg-base-300 text-base-content/50 rounded-full w-9 h-9">
                                    <span class="text-xs font-bold">${donatur.donaturName.charAt(0)}</span>
                                </div>
                            </div>
                            <div class="flex-1 min-w-0">
                                <p class="font-bold text-sm text-base-content truncate">${donatur.donaturName}</p>
                                <p class="text-[10px] text-base-content/50 mt-0.5">${donatur.date || "Baru saja"}</p>
                                <p class="text-sm font-bold text-primary mt-1">${formatRupiah(donatur.amount)}</p>
                            </div>
                        </li>`,
                          )
                          .join("")}
                    </ul>`
                    : `<div class="p-10 text-center">
                        <div class="text-base-content/30 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                        </div>
                        <p class="text-base-content/50 text-sm">Belum ada donatur.</p>
                    </div>`
                }
            </div>
        </div>
    </div>
  `;
};

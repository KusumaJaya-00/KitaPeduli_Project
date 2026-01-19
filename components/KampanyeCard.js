export const KampanyeCard = (data) => {
  // 1. Logika Format Rupiah
  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val);

  // 2. Logika Hitung Persentase Donasi
  const progres = Math.min(
    Math.round((data.terkumpul / data.target) * 100),
    100,
  );

  // 3. Logika Hitung Sisa Hari (Berdasarkan tenggatWaktu)
  const hitungSisaHari = (tgl) => {
    const selisih = new Date(tgl) - new Date();
    const hari = Math.ceil(selisih / (1000 * 60 * 60 * 24));
    return hari > 0 ? hari : 0;
  };

  return `
        <div class="card bg-base-200 shadow-xl border border-base-300 overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 group">
            <!-- Thumbnail Gambar -->
            <figure class="relative h-52 overflow-hidden">
                <img src="${data.gambar}" alt="${data.judul}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div class="absolute top-4 left-4">
                    <div class="badge badge-primary font-bold text-[10px] px-3 py-3 shadow-lg border-none">
                        ${data.kategori}
                    </div>
                </div>
            </figure>

            <!-- Konten Kartu -->
            <div class="card-body p-6 space-y-3">
                <h2 class="card-title text-lg font-extrabold leading-tight line-clamp-2 min-h-[3.5rem] group-hover:text-primary transition-colors">
                    ${data.judul}
                </h2>
                
                <p class="text-xs opacity-60 line-clamp-2 leading-relaxed font-medium">
                    ${data.deskripsi}
                </p>

                <!-- Bagian Progres -->
                <div class="space-y-2 pt-2">
                    <div class="flex justify-between text-[11px] font-bold">
                        <span class="text-primary">${formatIDR(data.terkumpul)}</span>
                        <span class="opacity-40">Target: ${formatIDR(data.target)}</span>
                    </div>
                    <progress class="progress progress-primary w-full h-2.5 shadow-inner" value="${progres}" max="100"></progress>
                    <div class="flex justify-between items-center text-[10px] font-black uppercase tracking-tighter">
                        <span class="opacity-40">${progres}% Terkumpul</span>
                        <span class="text-primary">${hitungSisaHari(data.tenggatWaktu)} Hari Lagi</span>
                    </div>
                </div>

                <!-- Tombol Aksi -->
                <div class="card-actions mt-4 border-t border-base-200 pt-4">
                    <button class="btn btn-primary btn-block rounded-xl font-bold text-white shadow-lg border-none hover:shadow-primary/30">
                        Donasi Sekarang
                    </button>
                </div>
            </div>
        </div>
    `;
};

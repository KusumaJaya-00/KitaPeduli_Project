import { state } from "../assets/js/data.js";

export const Kampanye = () => {
  // 1. Ambil data dari state
  const daftarKampanye = state.kampanye || [];

  // 2. Format Rupiah
  const formatRupiah = (angka) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(angka);
  };

  // 3. Render HTML
  return `
    <section class="kampanye-section page-fade">
      <h2 class="section-title">Program Pilihan</h2>
      <p class="section-subtitle">Salurkan kebaikanmu untuk mereka yang membutuhkan</p>
      
      <div class="kampanye-grid">
        ${daftarKampanye
          .map((item) => {
            // Hitung persen progress (Max 100%)
            const persen = Math.min((item.collected / item.target) * 100, 100);

            return `
            <div class="card">
              <div class="card-img-wrapper">
                <img src="${item.image}" alt="${item.title}" class="card-img">
                <span class="badge-category">Donasi</span>
              </div>
              
              <div class="card-body">
                <h3 class="card-title">${item.title}</h3>
                
                <div class="progress-info">
                  <div class="progress-bar-bg">
                    <div class="progress-bar-fill" style="width: ${persen}%"></div>
                  </div>
                  <div class="progress-text">
                    <small>${Math.round(persen)}% Terkumpul</small>
                  </div>
                </div>

                <div class="card-stats">
                  <div>
                    <span class="label">Terkumpul</span>
                    <span class="value active">${formatRupiah(item.collected)}</span>
                  </div>
                  <div class="text-right">
                    <span class="label">Target</span>
                    <span class="value">${formatRupiah(item.target)}</span>
                  </div>
                </div>

                <div class="card-actions">
                    <button class="btn-primary full-width" onclick="window.location.hash = 'donasi'">Donasi Sekarang</button>
                </div>
              </div>
            </div>
          `;
          })
          .join("")}
      </div>
    </section>
  `;
};

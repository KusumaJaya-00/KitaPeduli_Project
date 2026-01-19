export const Badge = ({ category }) => {
  // 1. Daftar Warna Berdasarkan Kategori (DaisyUI Colors)
  const colorMap = {
    "Bencana Alam": "badge-error text-white", // Merah
    Pendidikan: "badge-info text-white", // Biru Langit
    Lingkungan: "badge-success text-white", // Hijau
    Kesehatan: "badge-warning", // Kuning
    Kemanusiaan: "badge-primary text-white", // Biru Utama
    Infrastruktur: "badge-neutral text-white", // Abu Gelap
    Keagamaan: "badge-accent text-white", // Ungu/Teal 
    Hewan: "badge-secondary text-white", // Pink
    Sosial: "badge-ghost", // Abu Transparan
  };

  // 2. Pilih warna, jika tidak ada di daftar gunakan default (primary)
  const badgeClass = colorMap[category] || "badge-primary text-white";

  // 3. Render HTML Badge
  return `
    <span class="badge ${badgeClass} font-bold text-[10px] p-3 shadow-md border-none uppercase tracking-widest">
        ${category || "Umum"}
    </span>
  `;
};

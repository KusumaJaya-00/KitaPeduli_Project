/**
 * Komponen Badge Reusable dengan Logika Warna Otomatis
 * Memberikan warna berbeda berdasarkan kategori atau status.
 */
export const Badge = ({ category = "Umum" }) => {
  // Mapping Warna berdasarkan Kategori atau Status
  const colorMap = {
    // --- Status Verifikasi ---
    approved: "bg-success/10 text-success border-success/20",
    pending: "bg-warning/10 text-warning border-warning/20",
    rejected: "bg-error/10 text-error border-error/20",

    // --- Divisi / Skill Relawan ---
    medis: "bg-blue-100 text-blue-700 border-blue-200",
    pengajaran: "bg-purple-100 text-purple-700 border-purple-200",
    logistik: "bg-orange-100 text-orange-700 border-orange-200",
    administrasi: "bg-slate-100 text-slate-700 border-slate-200",
    konstruksi: "bg-cyan-100 text-cyan-700 border-cyan-200",
    psikologi: "bg-pink-100 text-pink-700 border-pink-200",
    dokumentasi: "bg-indigo-100 text-indigo-700 border-indigo-200",
    "media sosial": "bg-teal-100 text-teal-700 border-teal-200",

    // --- Kategori Kampanye ---
    pendidikan: "bg-purple-100 text-purple-700 border-purple-200",
    "bencana alam": "bg-red-100 text-red-700 border-red-200",
    kesehatan: "bg-emerald-100 text-emerald-700 border-emerald-200",
    lingkungan: "bg-lime-100 text-lime-700 border-lime-200",
    sosial: "bg-amber-100 text-amber-700 border-amber-200",
    hewan: "bg-orange-100 text-orange-700 border-orange-200",
  };

  // Bersihkan string (lowercase & trim) untuk pengecekan kunci
  const key = category.toLowerCase().trim();
  const selectedColor =
    colorMap[key] || "bg-primary/10 text-primary border-primary/20";

  return `
    <span class="badge ${selectedColor} font-black text-[10px] px-3 py-3 border uppercase tracking-widest rounded-lg transition-all duration-300">
        ${category}
    </span>
  `;
};

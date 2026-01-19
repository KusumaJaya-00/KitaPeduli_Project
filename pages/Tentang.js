/**
 * Komponen Internal: ImpactStat
 * Fokus pada angka besar dengan keterbacaan yang dioptimalkan untuk mobile.
 */
const ImpactStat = ({ value, label, subtext }) => {
  return `
    <div class="flex flex-col gap-4 group cursor-default">
        <div class="space-y-1">
            <div class="text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter text-primary group-hover:scale-105 transition-transform duration-700 origin-left select-none">
                ${value}
            </div>
            <div class="w-12 md:w-16 h-1.5 md:h-2 bg-primary/20 rounded-full overflow-hidden relative">
                <div class="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-1000 ease-out"></div>
            </div>
        </div>
        
        <div class="space-y-2">
            <h4 class="text-base md:text-lg font-black uppercase tracking-widest text-base-content">${label}</h4>
            <p class="text-sm font-medium text-base-content/60 leading-relaxed max-w-xs">
                ${subtext}
            </p>
        </div>
    </div>
    `;
};

/**
 * Komponen Internal: MissionItem
 */
const MissionItem = ({ number, text }) => {
  return `
    <li class="flex items-start gap-4 md:gap-8 group text-left">
        <div class="relative flex-shrink-0">
            <span class="text-2xl md:text-3xl font-black text-primary/90 group-hover:text-primary transition-colors duration-500 select-none">
                0${number}
            </span>
            <div class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-500"></div>
        </div>
        <p class="text-lg md:text-xl font-bold text-base-content/80 group-hover:text-base-content leading-snug transition-colors">
            ${text}
        </p>
    </li>
    `;
};

/**
 * Komponen Internal: ValueCard
 */
const ValueCard = ({ icon, title, description }) => {
  return `
    <div class="p-8 md:p-12 rounded-[2.5rem] md:rounded-[3.5rem] bg-base-100 hover:bg-base-200/40 border border-base-content/5 transition-all duration-500 group shadow-sm hover:shadow-2xl hover:-translate-y-2 text-left">
        <div class="mb-6 md:mb-10 text-primary w-14 h-14 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                ${icon}
            </svg>
        </div>
        <h3 class="text-2xl md:text-3xl font-black mb-3 md:mb-5 text-base-content uppercase tracking-tighter">${title}</h3>
        <p class="text-sm md:text-base text-base-content/60 leading-relaxed font-medium group-hover:text-base-content/80 transition-colors">${description}</p>
    </div>
    `;
};

/**
 * Komponen Internal: FocusItem
 */
const FocusItem = ({ label, icon, isOffset = false }) => {
  return `
    <div class="bg-base-100/40 backdrop-blur-xl border border-base-content/10 rounded-[2.5rem] p-8 md:p-10 flex flex-col items-center justify-center text-center gap-4 md:gap-6 hover:bg-primary hover:text-primary-content hover:shadow-2xl hover:shadow-primary/30 transition-all duration-700 group ${isOffset ? "md:mt-12" : ""} shadow-lg h-full">
        <div class="p-4 md:p-5 bg-primary/10 rounded-2xl md:rounded-3xl group-hover:bg-white/20 transition-colors duration-500 shadow-inner">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 md:h-8 md:w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                ${icon}
            </svg>
        </div>
        <span class="font-black uppercase tracking-[0.2em] text-[10px] md:text-xs">${label}</span>
    </div>
    `;
};

/**
 * Komponen Halaman Tentang (About Us)
 */
export const Tentang = () => {
  const missions = [
    "Menyediakan platform yang aman dan transparan untuk penyaluran bantuan sosial.",
    "Memanfaatkan teknologi web modern untuk mempercepat respon terhadap bencana alam.",
    "Mengedukasi masyarakat tentang pentingnya berbagi secara rutin melalui literasi digital.",
  ];

  const values = [
    {
      title: "Integritas",
      description:
        "Kepercayaan adalah modal utama kami. Setiap rupiah donasi tercatat dan tersalurkan tepat sasaran melalui sistem yang transparan.",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />`,
    },
    {
      title: "Inovasi",
      description:
        "Memanfaatkan teknologi web modern untuk memberikan pengalaman donasi yang cepat, aman, dan tanpa hambatan bagi seluruh pengguna.",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />`,
    },
    {
      title: "Empati",
      description:
        "Menempatkan kemanusiaan di atas segalanya. Bergerak dengan hati untuk membantu sesama dengan tulus dan penuh kasih sayang.",
      icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`,
    },
  ];

  return `
    <div class="min-h-screen bg-base-100 font-inter selection:bg-primary/30 selection:text-primary transition-colors duration-500 overflow-x-hidden">
        
        <!-- HERO SECTION -->
        <section class="relative pt-24 md:pt-40 pb-16 md:pb-24 bg-base-100">
            <div class="container mx-auto px-4 md:px-10 lg:px-16 relative z-10 text-left">
                <div class="max-w-5xl">
                    <div class="flex items-center gap-4 md:gap-6 mb-8 md:mb-12">
                        <div class="h-0.5 w-10 md:w-16 bg-primary"></div>
                        <span class="text-[10px] md:text-sm font-black uppercase tracking-[0.4em] text-primary">Est. 2026</span>
                    </div>
                    <h1 class="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] mb-10 md:mb-16 uppercase text-base-content select-none">
                        Misi Kami <br/> <span class="text-primary">Nyata.</span>
                    </h1>
                    <p class="text-lg md:text-2xl lg:text-3xl opacity-70 leading-relaxed md:leading-tight font-semibold max-w-3xl text-base-content tracking-tight">
                        KitaPeduli hadir sebagai bentuk dedikasi teknologi ITB STIKOM BALI untuk memfasilitasi gerakan kemanusiaan di era digital.
                    </p>
                </div>
            </div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none"></div>
        </section>

        <!-- IMPACT SECTION -->
        <section class="py-20 md:py-32 bg-base-200/50 border-y border-base-content/5 relative overflow-hidden">
            <div class="container mx-auto px-4 md:px-10 lg:px-16 relative z-10">
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                    ${ImpactStat({
                      value: "100%",
                      label: "Transparansi",
                      subtext:
                        "Setiap rupiah tercatat dan diaudit secara publik tanpa biaya tambahan.",
                    })}
                    ${ImpactStat({
                      value: "20+",
                      label: "Kampanye",
                      subtext:
                        "Berbagai sektor bantuan mulai dari bencana alam hingga pendidikan.",
                    })}
                    ${ImpactStat({
                      value: "800+",
                      label: "Donatur",
                      subtext:
                        "Komunitas #OrangBaik yang tumbuh saling menguatkan setiap hari.",
                    })}
                </div>
            </div>
            <div class="absolute -left-20 top-1/2 -translate-y-1/2 w-64 md:w-96 h-64 md:h-96 bg-primary/10 blur-[100px] md:blur-[120px] rounded-full pointer-events-none"></div>
        </section>

        <!-- VISI & MISI -->
        <section class="py-24 md:py-40">
            <div class="container mx-auto px-4 md:px-10 lg:px-16">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
                    <div class="space-y-12 md:space-y-20">
                        <div class="space-y-6 md:space-y-8">
                            <h2 class="text-4xl md:text-6xl lg:text-7xl font-black text-base-content uppercase tracking-tighter leading-none">Visi Kami</h2>
                            <p class="text-base-content/70 leading-relaxed text-lg md:text-2xl font-medium tracking-tight">
                                Menjadi standar emas platform kemanusiaan digital di Indonesia yang paling dipercaya dan mudah diakses.
                            </p>
                        </div>
                        <div class="space-y-8 md:space-y-12">
                            <h3 class="text-[10px] md:text-xs font-black text-primary uppercase tracking-[0.6em]">Prioritas Strategis</h3>
                            <ul class="space-y-10 md:space-y-16">
                                ${missions.map((m, i) => MissionItem({ number: i + 1, text: m })).join("")}
                            </ul>
                        </div>
                    </div>
                    
                    <div class="grid grid-cols-2 gap-4 md:gap-8 relative group mt-10 lg:mt-0">
                        ${FocusItem({
                          label: "Pendidikan",
                          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />`,
                        })}
                        ${FocusItem({
                          label: "Kesehatan",
                          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />`,
                          isOffset: true,
                        })}
                        ${FocusItem({
                          label: "Lingkungan",
                          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />`,
                        })}
                        ${FocusItem({
                          label: "Bencana",
                          icon: `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />`,
                          isOffset: true,
                        })}
                        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary/10 blur-[100px] w-full h-full -z-10 rounded-full scale-125"></div>
                    </div>
                </div>
            </div>
        </section>

        <!-- NILAI UTAMA -->
        <section class="py-24 md:py-40 bg-base-100 border-t border-base-content/5 relative">
            <div class="container mx-auto px-4 md:px-10 lg:px-16 relative z-10">
                <div class="mb-12 md:mb-24 space-y-4 md:space-y-6 text-left">
                    <h2 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter uppercase text-base-content leading-none">Pilar Kami</h2>
                    <p class="text-primary font-black uppercase tracking-[0.6em] text-[10px] md:text-xs">Dasar Kekuatan Gerakan</p>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-12">
                    ${values.map((v) => ValueCard(v)).join("")}
                </div>
            </div>
        </section>

        <!-- CTA SECTION: Diperbaiki agar sejajar dengan kontainer global -->
        <section class="pb-32 md:pb-48">
            <div class="container mx-auto px-4 md:px-10 lg:px-16">
                <!-- Gunakan max-w-6xl untuk kotak isi agar tidak terlalu lebar di monitor ultra-wide, namun tetap sejajar di sisi luar -->
                <div class="bg-neutral text-neutral-content rounded-[3rem] md:rounded-[4rem] p-8 md:p-24 text-center relative overflow-hidden shadow-2xl border border-white/5 mx-auto">
                    <div class="relative z-10 space-y-8 md:space-y-12">
                        <h2 class="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.1] uppercase text-white select-none">
                            Ayo <br/><span class="text-primary underline decoration-primary/20 underline-offset-[10px] md:underline-offset-[15px]">Bergerak</span>
                        </h2>
                        <p class="opacity-60 max-w-xl mx-auto font-bold text-base md:text-lg leading-relaxed tracking-tight">
                            Perubahan besar tidak pernah terjadi sendirian. Jadilah bagian dari solusi kemanusiaan hari ini.
                        </p>
                        <div class="flex flex-col sm:flex-row justify-center gap-4 md:gap-6 pt-4">
                            <button onclick="navigateTo('kampanye')" class="btn btn-primary px-8 md:px-12 rounded-full font-black h-14 md:h-16 shadow-2xl shadow-primary/40 normal-case text-base md:text-lg hover:scale-105 transition-all border-none">Mulai Donasi</button>
                            <button onclick="navigateTo('relawan')" class="btn btn-outline px-8 md:px-12 rounded-full font-black h-14 md:h-16 normal-case text-base md:text-lg border-2 text-white hover:bg-white hover:text-neutral transition-all">Gabung Relawan</button>
                        </div>
                    </div>
                    <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none"></div>
                </div>
            </div>
        </section>

    </div>
    `;
};

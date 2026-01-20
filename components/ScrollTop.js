export const ScrollTop = () => {
  return `
    <button 
        type="button"
        id="btn-back-to-top" 
        onclick="window.scrollTo({ top: 0, behavior: 'smooth' })"
        class="hidden fixed bottom-10 right-10 z-[1000] btn btn-primary btn-circle shadow-2xl shadow-primary/40 hover:scale-110 active:scale-95 transition-all duration-300 border-none text-white"
    >
        <!-- Ikon Panah Ke Atas -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 15l7-7 7 7" />
        </svg>
    </button>
  `;
};

// Logika Global untuk memantau scroll
if (typeof window !== "undefined") {
  window.addEventListener("scroll", () => {
    const btn = document.getElementById("btn-back-to-top");
    if (btn) {
      // Munculkan tombol jika scroll lebih dari 400px
      if (window.scrollY > 400) {
        btn.classList.remove("hidden");
        btn.classList.add("animate-in", "fade-in", "zoom-in", "duration-300");
      } else {
        btn.classList.add("hidden");
      }
    }
  });
}

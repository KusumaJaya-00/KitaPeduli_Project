/**
 * Komponen InputField Reusable dengan Fitur Show Password
 * @param {Object} props
 */
export const InputField = ({
  label,
  type = "text",
  placeholder = "",
  name = "",
  value = "",
  errorMessage = "",
}) => {
  const isPassword = type === "password";
  const inputErrorClass = errorMessage ? "input-error" : "";

  return `
        <div class="form-control w-full space-y-1">
            <label class="label pb-1">
                <span class="label-text font-bold text-base-content/80">${label}</span>
            </label>

            <div class="relative group">
                <input 
                    type="${type}" 
                    name="${name}"
                    id="${name}"
                    placeholder="${placeholder}" 
                    value="${value}"
                    class="input input-bordered w-full rounded-xl focus:input-primary transition-all duration-200 pr-12 ${inputErrorClass}" 
                />
                
                <!-- Tombol Show/Hide Password (Hanya muncul jika tipe password) -->
                ${
                  isPassword
                    ? `
                    <button 
                        type="button"
                        onclick="window.togglePasswordVisibility('${name}')"
                        class="absolute right-4 top-1/2 -translate-y-1/2 text-base-content/30 hover:text-primary transition-colors focus:outline-none"
                        title="Tampilkan/Sembunyikan Sandi"
                    >
                        <!-- Icon Eye (Default) -->
                        <svg id="eye-icon-${name}" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    </button>
                `
                    : ""
                }
            </div>

            ${
              errorMessage
                ? `
                <label class="label py-0">
                    <span class="label-text-alt text-error font-medium animate-pulse">${errorMessage}</span>
                </label>
            `
                : ""
            }
        </div>
    `;
};

/**
 * Logika Global Toggle Password
 * Ditempatkan di sini agar otomatis tersedia saat InputField diimpor
 */
if (typeof window !== "undefined") {
  window.togglePasswordVisibility = (inputId) => {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(`eye-icon-${inputId}`);

    if (!input) return;

    if (input.type === "password") {
      input.type = "text";
      // Ganti ke icon Eye-Off (Mata dicoret)
      icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
            `;
    } else {
      input.type = "password";
      // Ganti ke icon Eye normal
      icon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            `;
    }
  };
}

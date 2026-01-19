export const InputField = ({
  label,
  type = "text",
  placeholder = "",
  name = "",
  value = "",
  errorMessage = "",
}) => {
  const inputErrorClass = errorMessage ? "input-error" : "";

  return `
        <div class="form-control w-full space-y-1">
            <!-- Label Atas -->
            <label class="label pb-1">
                <span class="label-text font-bold text-base-content/80">${label}</span>
            </label>

            <!-- Input Element -->
            <input 
                type="${type}" 
                name="${name}"
                id="${name}"
                placeholder="${placeholder}" 
                value="${value}"
                class="input input-bordered w-full rounded-xl focus:input-primary transition-all duration-200 ${inputErrorClass}" 
            />

            <!-- Label Error (Hanya muncul jika ada errorMessage) -->
            ${
              errorMessage
                ? `
                <label class="label py-0">
                    <span class="label-text-alt text-error font-medium animate-pulse">
                        ${errorMessage}
                    </span>
                </label>
            `
                : ""
            }
        </div>
    `;
};

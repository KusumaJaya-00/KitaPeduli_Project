export const LoadingSpinner = ({ size = "sm", color = "current" }) => {
  const sizeClass = {
    xs: "loading-xs",
    sm: "loading-sm",
    md: "loading-md",
    lg: "loading-lg"
  }[size] || "loading-sm";

  return `
    <div class="flex items-center justify-center gap-3">
      <span class="loading loading-spinner ${sizeClass} text-${color}"></span>
      <span class="text-sm font-bold">Memproses...</span>
    </div>
  `;
};
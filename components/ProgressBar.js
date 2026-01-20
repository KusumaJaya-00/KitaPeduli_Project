export const ProgressBar = ({ collected = 0, target = 1, size = "md" }) => {
  const percentage = Math.min(Math.round((collected / target) * 100), 100);

  let progressColor = "progress-primary";
  if (percentage >= 80) {
    progressColor = "progress-success";
  } else if (percentage >= 50) {
    progressColor = "progress-accent";
  }

  return `
        <div class="w-full space-y-1">
            <div class="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider">
                <span class="text-base-content/50">${percentage}% Terkumpul</span>
                <span class="text-primary">${collected.toLocaleString("id-ID")} / ${target.toLocaleString("id-ID")}</span>
            </div>
            <progress 
                class="progress ${progressColor} w-full h-${size === "md" ? "2.5" : "1.5"} shadow-inner rounded-full" 
                value="${percentage}" 
                max="100">
            </progress>
        </div>
    `;
};

export const DataTable = ({ headers = [], rowsHTML = "" }) => {
  return `
    <div class="bg-base-100 rounded-[2.5rem] overflow-hidden border border-base-content/5 shadow-2xl animate-in fade-in duration-500">
        <div class="overflow-x-auto w-full">
            <table class="table w-full border-collapse font-inter">
                <!-- Header Tabel -->
                <thead>
                    <tr class="bg-base-200/80 text-base-content/50 border-b border-base-content/10">
                        ${headers
                          .map(
                            (header, index) => `
                            <th class="py-6 ${index === 0 ? "pl-12" : ""} ${
                              index === headers.length - 1
                                ? "pr-12 text-center"
                                : "text-left"
                            } uppercase font-black tracking-widest text-[10px]">
                                ${header}
                            </th>
                        `,
                          )
                          .join("")}
                    </tr>
                </thead>

                <!-- Isi Tabel -->
                <tbody class="divide-y divide-base-content/5">
                    ${rowsHTML}
                </tbody>
            </table>
        </div>
    </div>
  `;
};

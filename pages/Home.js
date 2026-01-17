import { ui } from "../assets/js/styles.js";
export const Home = () => `
    <div class="${ui.container}">
        <div class="hero bg-blue-600 rounded-[2.5rem] p-12 text-white shadow-xl">
            <div class="hero-content text-center">
                <div class="max-w-md">
                    <h1 class="text-5xl font-black mb-6">Berbagi Jadi Mudah</h1>
                    <button class="btn btn-warning btn-lg rounded-2xl shadow-lg" onclick="navigateTo('kampanye')">Donasi Sekarang</button>
                </div>
            </div>
        </div>
    </div>
`;

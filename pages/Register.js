import { ui } from "../assets/js/styles.js";

export const Register = () => {
  return `
    <div class="flex items-center justify-center py-20 page-fade">
        <div class="card w-96 bg-white shadow-2xl p-8 border border-gray-50 text-gray-600">
            <h2 class="text-2xl font-bold mb-2 text-center text-blue-600">Daftar Akun</h2>
            <p class="text-center text-sm mb-6">Mulai langkah kebaikanmu di sini</p>
            
            <div class="space-y-4 text-left">
                <div class="form-control">
                    <label class="label"><span class="label-text font-semibold">Nama Lengkap</span></label>
                    <input type="text" id="reg-name" placeholder="Masukkan nama" class="${ui.input}">
                </div>
                <div class="form-control">
                    <label class="label"><span class="label-text font-semibold">Email</span></label>
                    <input type="email" id="reg-email" placeholder="email@contoh.com" class="${ui.input}">
                </div>
                <div class="form-control">
                    <label class="label"><span class="label-text font-semibold">Password</span></label>
                    <input type="password" id="reg-pass" placeholder="******" class="${ui.input}">
                </div>
                <button onclick="handleRegister()" class="btn btn-primary w-full text-white mt-4 shadow-lg shadow-blue-200">Buat Akun Sekarang</button>
                <p class="text-center text-sm mt-4">
                    Sudah punya akun? 
                    <a onclick="navigateTo('login')" class="text-blue-600 font-bold cursor-pointer hover:underline">Masuk</a>
                </p>
            </div>
        </div>
    </div>`;
};

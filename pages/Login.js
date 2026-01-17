import { ui } from "../assets/js/styles.js";

export const Login = () => {
  return `
    <div class="flex items-center justify-center py-20 page-fade">
        <div class="card w-96 bg-white shadow-2xl p-8 border border-gray-50">
            <h2 class="text-2xl font-bold mb-6 text-center text-blue-600">Masuk</h2>
            <div class="space-y-4">
                <div class="form-control">
                    <label class="label"><span class="label-text font-semibold text-gray-600">Email</span></label>
                    <input type="email" id="login-email" placeholder="admin@gmail.com" class="${ui.input}">
                </div>
                <div class="form-control">
                    <label class="label"><span class="label-text font-semibold text-gray-600">Password</span></label>
                    <input type="password" id="login-pass" placeholder="******" class="${ui.input}">
                </div>
                <button onclick="handleLogin()" class="btn btn-primary w-full text-white mt-4 shadow-lg shadow-blue-200">Login</button>
                <p class="text-center text-sm mt-4 text-gray-500">
                    Belum punya akun? 
                    <a onclick="navigateTo('register')" class="text-blue-600 font-bold cursor-pointer hover:underline">Daftar Sekarang</a>
                </p>
            </div>
        </div>
    </div>`;
};

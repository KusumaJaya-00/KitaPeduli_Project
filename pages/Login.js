import { login } from "../assets/js/data.js";
import { InputField } from "../components/InputField.js";
import { Modal } from "../components/Modal.js";

/**
 * Fungsi Global untuk handle submit login
 */
window.handleLoginSubmit = (e) => {
  if (e) e.preventDefault();

  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  // 1. Validasi Input Kosong
  if (!email || !pass) {
    const errorEl = document.getElementById("login-msg-error");
    if (errorEl) errorEl.innerText = "Harap isi email dan kata sandi Anda!";

    // PEMANGGILAN: window.openModal sudah tersedia secara global dari Modal.js
    window.openModal("modal-login-error");
    return;
  }

  const result = login(email, pass);
  if (result.success) {
    const target = result.user.role === "admin" ? "dashboard-admin" : "home";
    window.navigateTo(target);
  } else {
    // 2. Feedback Error dari Database
    const errorEl = document.getElementById("login-msg-error");
    if (errorEl) errorEl.innerText = result.message;

    window.openModal("modal-login-error");
  }
};

export const Login = () => {
  return `
    <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 font-inter text-left">
        <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden rounded-[2.5rem] text-base-content">
            <div class="card-body p-10">
                <div class="text-center space-y-2 mb-8">
                    <h1 class="text-4xl font-black text-primary tracking-tighter font-poppins uppercase">Selamat Datang</h1>
                    <p class="text-sm opacity-60 font-medium">Masuk untuk mulai berbagi kebaikan hari ini.</p>
                </div>

                <form onsubmit="window.handleLoginSubmit(event)" class="space-y-6">
                    ${InputField({
                      label: "Email",
                      type: "email",
                      name: "login-email",
                      placeholder: "nama@email.com",
                    })}

                    ${InputField({
                      label: "Kata Sandi",
                      type: "password",
                      name: "login-pass",
                      placeholder: "••••••••",
                    })}

                    <div class="flex justify-end mt-[-10px]">
                        <a class="text-xs font-bold text-primary hover:underline cursor-pointer font-inter">Lupa Password?</a>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 normal-case font-poppins border-none text-white active:scale-95 transition-all">
                        Masuk Sekarang
                    </button>
                </form>

                <div class="divider text-[10px] font-bold uppercase opacity-30 tracking-widest my-8 text-base-content">Atau</div>

                <p class="text-center text-sm font-medium text-base-content">
                    Belum punya akun? 
                    <button type="button" onclick="navigateTo('register')" class="text-primary font-black hover:underline cursor-pointer ml-1 bg-transparent border-none p-0 h-auto font-inter">Daftar Gratis</button>
                </p>
            </div>
        </div>

        <!-- MODAL FEEDBACK LOGIN -->
        ${Modal({
          id: "modal-login-error",
          type: "error",
          title: "Login Gagal",
          message:
            '<span id="login-msg-error">Email atau kata sandi salah.</span>',
          confirmText: "Coba Lagi",
        })}
    </div>
    `;
};

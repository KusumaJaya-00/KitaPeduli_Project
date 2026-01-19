import { login } from "../assets/js/data.js";
import { InputField } from "../components/InputField.js";

/**
 * Fungsi Global untuk handle submit login
 */
window.handleLoginSubmit = (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  if (!email || !pass) {
    return alert("Harap isi semua kolom!");
  }

  const result = login(email, pass);
  if (result.success) {
    // Jika admin ke dashboard admin, jika user ke home
    const target = result.user.role === "admin" ? "dashboard-admin" : "home";
    window.navigateTo(target);
  } else {
    alert(result.message);
  }
};

export const Login = () => {
  return `
    <div class="min-h-[80vh] flex items-center justify-center py-12 px-4 font-inter">
        <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden rounded-[2.5rem]">
            <div class="card-body p-10">
                <div class="text-center space-y-2">
                    <h1 class="text-4xl font-black text-primary tracking-tighter font-poppins">Selamat Datang</h1>
                    <p class="text-sm opacity-60 font-medium">Masuk untuk mulai berbagi kebaikan hari ini.</p>
                </div>

                <form onsubmit="handleLoginSubmit(event)" class="space-y-6">
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
                        <a class="text-xs font-bold text-primary hover:underline cursor-pointer">Lupa Password?</a>
                    </div>

                    <button type="submit" class="btn btn-primary btn-block h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 normal-case font-poppins">
                        Masuk Sekarang
                    </button>
                </form>

                <div class="divider text-[10px] font-bold uppercase opacity-30 tracking-widest my-8">Atau</div>

                <p class="text-center text-sm font-medium">
                    Belum punya akun? 
                    <a onclick="navigateTo('register')" class="text-primary font-black hover:underline cursor-pointer ml-1">Daftar Gratis</a>
                </p>
            </div>
        </div>
    </div>
    `;
};

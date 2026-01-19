import { register } from "../assets/js/data.js";
import { InputField } from "../components/InputField.js";

/**
 * Fungsi Global untuk handle submit register
 */
window.handleRegisterSubmit = (e) => {
  e.preventDefault();
  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;
  const confirm = document.getElementById("reg-confirm").value;

  if (!name || !email || !pass) {
    return alert("Harap lengkapi data diri!");
  }

  if (pass !== confirm) {
    return alert("Konfirmasi kata sandi tidak cocok!");
  }

  const result = register(name, email, pass);
  if (result.success) {
    alert(result.message);
    window.navigateTo("login");
  } else {
    alert(result.message);
  }
};

export const Register = () => {
  return `
    <div class="min-h-[85vh] flex items-center justify-center py-12 px-4 font-inter">
        <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden rounded-[2.5rem]">
            <div class="card-body p-10">
                <div class="text-center space-y-2">
                    <h1 class="text-4xl font-black text-primary tracking-tighter font-poppins">Buat Akun</h1>
                    <p class="text-sm opacity-60 font-medium">Bergabunglah dengan ribuan #OrangBaik lainnya.</p>
                </div>

                <form onsubmit="handleRegisterSubmit(event)" class="space-y-4">
                    ${InputField({
                      label: "Nama Lengkap",
                      type: "text",
                      name: "reg-name",
                      placeholder: "Contoh: Made Arta",
                    })}

                    ${InputField({
                      label: "Email",
                      type: "email",
                      name: "reg-email",
                      placeholder: "nama@email.com",
                    })}

                    ${InputField({
                      label: "Kata Sandi",
                      type: "password",
                      name: "reg-pass",
                      placeholder: "••••••••",
                    })}

                    ${InputField({
                      label: "Konfirmasi Sandi",
                      type: "password",
                      name: "reg-confirm",
                      placeholder: "••••••••",
                    })}

                    <div class="pt-4">
                        <button type="submit" class="btn btn-primary btn-block h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 normal-case font-poppins">
                            Daftar Sekarang
                        </button>
                    </div>
                </form>

                <p class="text-center text-sm font-medium mt-8">
                    Sudah punya akun? 
                    <a onclick="navigateTo('login')" class="text-primary font-black hover:underline cursor-pointer ml-1">Masuk di sini</a>
                </p>
            </div>
        </div>
    </div>
    `;
};

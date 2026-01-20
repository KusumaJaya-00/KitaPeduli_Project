import { register } from "../assets/js/data.js";
import { InputField } from "../components/InputField.js";
import { Modal } from "../components/Modal.js";

/**
 * Fungsi Global untuk handle submit register
 */
window.handleRegisterSubmit = (e) => {
  if (e) e.preventDefault();

  const name = document.getElementById("reg-name").value;
  const email = document.getElementById("reg-email").value;
  const pass = document.getElementById("reg-pass").value;
  const confirm = document.getElementById("reg-confirm").value;

  // 1. Validasi Input Kosong
  if (!name || !email || !pass) {
    const errorEl = document.getElementById("reg-msg-error");
    if (errorEl) errorEl.innerText = "Harap lengkapi semua data diri Anda!";

    // PEMANGGILAN BARU: Menggunakan fungsi global dari Modal.js
    window.openModal("modal-reg-error");
    return;
  }

  // 2. Validasi Konfirmasi Sandi
  if (pass !== confirm) {
    const errorEl = document.getElementById("reg-msg-error");
    if (errorEl)
      errorEl.innerText =
        "Konfirmasi kata sandi tidak cocok. Silakan periksa kembali.";

    // PEMANGGILAN BARU
    window.openModal("modal-reg-error");
    return;
  }

  const result = register(name, email, pass);

  if (result.success) {
    // 3. Feedback Sukses
    const successEl = document.getElementById("reg-msg-success");
    if (successEl) successEl.innerText = result.message;

    // PEMANGGILAN BARU
    window.openModal("modal-reg-success");

    // Beri waktu user membaca modal sebelum pindah ke login
    setTimeout(() => {
      window.navigateTo("login");
    }, 2000);
  } else {
    // 4. Feedback Error dari Database
    const errorEl = document.getElementById("reg-msg-error");
    if (errorEl) errorEl.innerText = result.message;

    // PEMANGGILAN BARU
    window.openModal("modal-reg-error");
  }
};

export const Register = () => {
  return `
    <div class="min-h-[85vh] flex items-center justify-center py-12 px-4 font-inter text-left">
        <div class="card w-full max-w-md bg-base-100 shadow-2xl border border-base-content/5 overflow-hidden rounded-[2.5rem] text-base-content animate-in fade-in duration-500">
            <div class="card-body p-10">
                <div class="text-center space-y-2 mb-8">
                    <h1 class="text-4xl font-black text-primary tracking-tighter font-poppins uppercase">Buat Akun</h1>
                    <p class="text-sm opacity-60 font-medium">Bergabunglah dengan ribuan #OrangBaik lainnya.</p>
                </div>

                <form onsubmit="window.handleRegisterSubmit(event)" class="space-y-4">
                    ${InputField({
                      label: "Nama Lengkap",
                      type: "text",
                      name: "reg-name",
                      placeholder: "Contoh: Made Asep",
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
                        <button type="submit" class="btn btn-primary btn-block h-14 rounded-2xl font-black text-lg shadow-lg shadow-primary/20 normal-case font-poppins border-none text-white active:scale-95 transition-all">
                            Daftar Sekarang
                        </button>
                    </div>
                </form>

                <p class="text-center text-sm font-medium mt-8">
                    Sudah punya akun? 
                    <button type="button" onclick="navigateTo('login')" class="text-primary font-black hover:underline cursor-pointer ml-1 bg-transparent border-none p-0 h-auto font-inter">Masuk di sini</button>
                </p>
            </div>
        </div>

        <!-- MODAL FEEDBACK DAFTAR -->
        ${Modal({
          id: "modal-reg-success",
          type: "success",
          title: "Pendaftaran Berhasil",
          message:
            '<span id="reg-msg-success">Akun Anda telah berhasil dibuat.</span>',
          confirmText: "Ke Halaman Login",
        })}

        ${Modal({
          id: "modal-reg-error",
          type: "error",
          title: "Pendaftaran Gagal",
          message:
            '<span id="reg-msg-error">Terjadi kesalahan saat mendaftar.</span>',
          confirmText: "Coba Lagi",
        })}
    </div>
    `;
};

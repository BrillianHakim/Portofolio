<template>
  <section class="bg-black text-white min-h-screen px-6 py-16 flex items-center">
    <div class="w-full max-w-md mx-auto">

      <!-- HEADER -->
      <div class="mb-12 text-center">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
          Admin Access
        </p>
        <h1 class="text-4xl font-bold tracking-tight">
          Login <span class="text-gray-400">Panel</span>
        </h1>
        <div class="mt-4 h-px w-12 bg-white mx-auto"></div>
      </div>

      <!-- FORM CARD -->
      <div class="border border-neutral-800 rounded-xl px-6 py-8">
        <!-- LANGKAH 1: USERNAME -->
<template v-if="step === 'username'">
  <div>
    <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">Username</p>
    <input
      v-model="username"
      type="text"
      autocomplete="username"
      placeholder="username"
      @keyup.enter="sendCode"
      class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
    />
  </div>
  <button
    @click="sendCode"
    :disabled="loading"
    class="w-full mt-4 border border-white py-3 rounded-lg font-medium hover:bg-white hover:text-black transition disabled:opacity-50"
  >
    {{ loading ? 'Mengirim...' : 'Kirim Kode' }}
  </button>
</template>

<!-- LANGKAH 2: KODE OTP -->
<template v-else>
  <p class="text-sm text-gray-400 text-center">
    Jika username terdaftar, kode telah dikirim ke email terkait.
  </p>
  <div>
    <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">Kode</p>
    <input
      v-model="code"
      type="text"
      inputmode="numeric"
      maxlength="8"
      placeholder="123456"
      @keyup.enter="verifyCode"
      class="w-full p-3 bg-black border border-neutral-800 rounded-lg text-center tracking-[0.5em] focus:outline-none focus:border-white transition"
    />
  </div>
  <button
    @click="verifyCode"
    :disabled="loading"
    class="w-full mt-4 border border-white py-3 rounded-lg font-medium hover:bg-white hover:text-black transition disabled:opacity-50"
  >
    {{ loading ? 'Memeriksa...' : 'Login' }}
  </button>
  <button @click="step = 'username'" class="w-full text-xs text-gray-500 mt-2">
    ← Kembali
  </button>
</template>

<!-- ERROR (tetap) -->
<p v-if="error" class="text-red-400 text-sm text-center mt-2">{{ error }}</p>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { supabase } from '../../lib/supabase'

const username = ref('')
const code = ref('')
const step = ref('username') // 'username' -> 'code'
const error = ref('')
const loading = ref(false)
let userEmail = ''

const router = useRouter()

// Langkah 1: cari email dari username, lalu kirim kode
const sendCode = async () => {
  error.value = ''
  loading.value = true
  try {
    const name = username.value.trim()
    if (!name) throw new Error('Username wajib diisi')

    const { data: email } = await supabase.rpc('get_email_by_username', {
      p_username: name,
    })

    if (email) {
      userEmail = email
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: { shouldCreateUser: false }, // orang asing tidak bisa daftar
      })
      if (otpError) throw otpError
    }

    // Pesan sama, apapun hasilnya (username ada atau tidak)
    step.value = 'code'
  } catch (err) {
    error.value = err.message || 'Gagal mengirim kode'
  } finally {
    loading.value = false
  }
}

// Langkah 2: verifikasi kode
const verifyCode = async () => {
  error.value = ''
  loading.value = true
  try {
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email: userEmail,
      token: code.value.trim(),
      type: 'email',
    })
    if (verifyError) throw new Error('Kode salah atau kedaluwarsa')

    router.push('/admin/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
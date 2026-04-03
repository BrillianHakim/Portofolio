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

        <div class="space-y-5">

          <!-- EMAIL -->
          <div>
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
              Email
            </p>
            <input
              v-model="email"
              type="email"
              placeholder="you@example.com"
              class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
            />
          </div>

          <!-- PASSWORD -->
          <div>
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
              Password
            </p>
            <input
              v-model="password"
              type="password"
              placeholder="••••••••"
              class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
            />
          </div>

          <!-- BUTTON -->
          <button
            @click="login"
            class="w-full mt-4 border border-white py-3 rounded-lg font-medium hover:bg-white hover:text-black transition"
          >
            Login
          </button>

          <!-- ERROR -->
          <p v-if="error" class="text-red-400 text-sm text-center mt-2">
            {{ error }}
          </p>

        </div>

      </div>

    </div>
  </section>
</template>
<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const error = ref('')

const router = useRouter()

const login = async () => {
  console.log("LOGIN DIKLIK")

  error.value = ''

  try {
    const res = await fetch('https://portofolio-production-c69c.up.railway.app/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })

    const data = await res.json()

    if (!res.ok) {
      throw new Error(data.error || 'Login failed')
    }

    localStorage.setItem('token', data.token)
    router.push('/admin/dashboard')

  } catch (err) {
    console.error(err)
    error.value = err.message
  }
}
</script>
<template>
  <div class="min-h-screen bg-black text-white flex">

    <!-- SIDEBAR -->
    <aside class="w-64 border-r border-neutral-800 px-6 py-10 flex flex-col justify-between">
      <div>
        <div class="mb-10">
          <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Admin Panel</p>
          <h1 class="text-xl font-bold tracking-tight">
            Control <span class="text-gray-400">Center</span>
          </h1>
          <div class="mt-4 h-px w-12 bg-white"></div>
        </div>

        <nav class="space-y-2">
          <router-link to="/admin/dashboard"
            class="block px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700 hover:bg-neutral-900 transition">
            Dashboard
          </router-link>
          <router-link to="/admin/projects"
            class="block px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700 hover:bg-neutral-900 transition">
            Projects
          </router-link>
          <router-link to="/admin/achievements"
            class="block px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700 hover:bg-neutral-900 transition">
            Achievements
          </router-link>
          <router-link to="/admin/chat"
            class="block px-4 py-2 rounded-lg border border-transparent hover:border-neutral-700 hover:bg-neutral-900 transition">
            Chat
          </router-link>
        </nav>
      </div>

      <div>
        <button @click="logout"
          class="w-full text-left px-4 py-2 border border-neutral-800 rounded-lg text-red-400 hover:bg-neutral-900 hover:border-neutral-600 transition">
          Logout
        </button>
      </div>
    </aside>

    <!-- CONTENT -->
    <main class="flex-1 px-6 py-16">
      <div class="max-w-5xl mx-auto">
        <router-view />
      </div>
    </main>

  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onMounted, onUnmounted } from 'vue'

const router = useRouter()
let intervalId = null

const verifyToken = async () => {
  const token = localStorage.getItem('token')
  if (!token) {
    router.push('/admin/login')
    return
  }
  try {
    const res = await fetch('http://localhost:5000/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.status === 401 || res.status === 403) {
      localStorage.removeItem('token')
      router.push('/admin/login')
    }
  } catch (err) {
    localStorage.removeItem('token')
    router.push('/admin/login')
  }
}

onMounted(() => {
  // Cek pertama saat mount
  verifyToken()

  // Cek setiap 1 jam (3600000 ms)
  intervalId = setInterval(verifyToken, 3600000)
})

// ✅ Penting! Hentikan interval saat komponen di-unmount
onUnmounted(() => {
  clearInterval(intervalId)
})

const logout = () => {
  clearInterval(intervalId)
  localStorage.removeItem('token')
  router.push('/admin/login')
}
</script>
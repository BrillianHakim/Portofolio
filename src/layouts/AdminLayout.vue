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
import { supabase } from '../lib/supabase'

const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/admin/login')
}
</script>
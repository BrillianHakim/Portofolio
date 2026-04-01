<template>
  <nav class="bg-black text-white px-6 py-4 sticky top-0 z-50 border-b border-neutral-900">
    <div class="max-w-5xl mx-auto flex justify-between items-center">

      <!-- LOGO -->
      <router-link
        to="/"
        class="font-bold text-sm tracking-[0.2em] uppercase hover:text-gray-400 transition"
      >
        Brillian Hakim<span class="text-gray-500">.</span>
      </router-link>

      <!-- DESKTOP MENU -->
      <ul class="hidden md:flex items-center gap-8">
        <li v-for="item in navItems" :key="item.to">
          <router-link
            :to="item.to"
            class="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition relative group"
            :class="{ '!text-white': isActive(item.to) }"
          >
            {{ item.text }}
            <!-- Active underline -->
            <span
              class="absolute -bottom-1 left-0 h-px bg-white transition-all duration-300"
              :class="isActive(item.to) ? 'w-full' : 'w-0 group-hover:w-full'"
            ></span>
          </router-link>
        </li>
      </ul>

      <!-- HAMBURGER (MOBILE) -->
      <button
        class="md:hidden text-gray-400 hover:text-white transition"
        @click="open = !open"
      >
        <span v-if="!open" class="text-xl">☰</span>
        <span v-else class="text-xl">✕</span>
      </button>
    </div>

    <!-- MOBILE MENU -->
    <div
      v-if="open"
      class="md:hidden border-t border-neutral-800 mt-4 pt-4"
    >
      <ul class="flex flex-col gap-4 px-2">
        <li v-for="item in navItems" :key="item.to">
          <router-link
            :to="item.to"
            class="text-xs tracking-widest uppercase text-gray-400 hover:text-white transition"
            :class="{ '!text-white': isActive(item.to) }"
            @click="open = false"
          >
            {{ item.text }}
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const open = ref(false)
const route = useRoute()

const navItems = [
  { to: '/', text: 'Home' },
  { to: '/about', text: 'About Me' },
  { to: '/achievements', text: 'Achievements' },
  { to: '/projects', text: 'Projects' },
  { to: '/contact', text: 'Contact' },
  { to: '/chat', text: 'Chat' },
]

const isActive = (path) => {
  if (path === '/') return route.path === '/'
  return route.path.startsWith(path)
}
</script>
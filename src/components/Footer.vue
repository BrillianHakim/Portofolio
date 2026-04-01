<template>
  <footer class="bg-black text-white border-t border-neutral-900 px-6 py-8">
    <div class="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

      <!-- LOGO -->
      <!-- <span class="font-bold text-sm tracking-[0.2em] uppercase">
        Bintang<span class="text-gray-500">.</span>
      </span> -->

      <!-- COPYRIGHT -->
      <p class="text-xs tracking-widest text-gray-500 uppercase">
        © 2026 Bintang Brillian Hakim
      </p>

      <!-- LINKS -->
      <div class="flex items-center gap-6">
        <router-link
          v-for="item in links"
          :key="item.to"
          :to="item.to"
          class="text-xs tracking-widest uppercase text-gray-500 hover:text-white transition"
        >
          {{ item.text }}
        </router-link>
      </div>

    </div>
  </footer>
</template>

<script setup>
const links = [
  { to: '/about', text: 'About' },
  { to: '/projects', text: 'Projects' },
  { to: '/contact', text: 'Contact' },
]
</script>
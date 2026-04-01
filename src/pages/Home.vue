<template>
  <section class="bg-black text-white flex items-center px-6 min-h-[calc(100vh-120px)]">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-5xl mx-auto items-center">

      <!-- KIRI: DESKRIPSI -->
      <div>
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Welcome to my portfolio</p>

        <h1 class="text-5xl font-bold tracking-tight leading-tight mb-4">
          Bintang <span class="text-gray-400">Brillian</span> Hakim
        </h1>

        <div class="h-px w-16 bg-white mb-6"></div>

        <p class="text-gray-400 text-sm tracking-wide mb-6">
          Informatics Engineering Student · Web Developer · Content Writer
        </p>

        <p class="text-gray-300 leading-7 text-[15px] mb-8">
          Hai, saya Bintang Brillian Hakim — biasa dipanggil <span class="text-white font-medium">Hakim</span>.
          Saya berkuliah di Institut Teknologi Nasional Malang, fans Barca, dan senang membangun
          hal-hal di web. Salam kenal! 👋
        </p>

        <!-- <div class="flex gap-3">
          <a
            href="/projects"
            class="text-sm border border-white px-5 py-2 rounded-lg hover:bg-white hover:text-black transition"
          >
            Lihat Projects
          </a>
          <a
            href="/contact"
            class="text-sm border border-neutral-700 px-5 py-2 rounded-lg text-gray-400 hover:border-white hover:text-white transition"
          >
            Hubungi Saya
          </a>
        </div> -->
      </div>

      <!-- KANAN: FOTO CAROUSEL -->
      <div class="flex flex-col items-center md:items-end gap-4">
        <div class="relative">
          <div class="absolute -inset-1 rounded-2xl border border-neutral-700"></div>
          <div class="relative w-72 h-72 rounded-2xl overflow-hidden">
            <img
              v-for="(photo, index) in photos"
              :key="index"
              :src="photo.src"
              :alt="photo.alt"
              :class="[
                'absolute inset-0 w-full h-full object-cover transition-opacity duration-700',
                index === current ? 'opacity-100' : 'opacity-0'
              ]"
            />
          </div>
        </div>

        <!-- Dot Indicators -->
        <div class="flex gap-2">
          <button
            v-for="(photo, index) in photos"
            :key="index"
            @click="goTo(index)"
            :class="[
              'rounded-full transition-all duration-300',
              index === current
                ? 'w-6 h-2 bg-white'
                : 'w-2 h-2 bg-neutral-600 hover:bg-neutral-400'
            ]"
          />
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const photos = [
  { src: '/Bintang Brillian Hakim.jpg', alt: 'Bintang Brillian Hakim' },
  { src: '/dora.jpeg', alt: 'Bintang Brillian Hakim' },
]

const current = ref(0)
let timer = null

const goTo = (index) => {
  current.value = index
  resetTimer()
}

const next = () => {
  current.value = (current.value + 1) % photos.length
}

const resetTimer = () => {
  clearInterval(timer)
  timer = setInterval(next, 4000)
}

onMounted(() => {
  timer = setInterval(next, 4000)
})

onUnmounted(() => {
  clearInterval(timer)
})
</script>
<template>
  <section class="bg-black text-white px-6 py-16 min-h-[calc(100vh-120px)]">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">What I've Earned</p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          Achieve<span class="text-gray-400">ments</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="n in 3"
          :key="n"
          class="border border-neutral-800 rounded-xl p-5 animate-pulse"
        >
          <div class="w-full h-40 bg-neutral-800 rounded-lg mb-4"></div>
          <div class="h-4 bg-neutral-800 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-neutral-800 rounded w-1/4 mb-3"></div>
          <div class="h-3 bg-neutral-800 rounded w-full"></div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else-if="achievements.length === 0"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <p class="text-4xl mb-4">🏆</p>
        <p class="text-gray-500 text-sm">Belum ada sertifikat yang ditambahkan.</p>
      </div>

      <!-- GRID -->
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        <div
          v-for="cert in achievements"
          :key="cert.id"
          class="group border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-500 transition duration-300"
        >
          <!-- IMAGE -->
          <div class="relative w-full h-44 bg-neutral-900 overflow-hidden">
            <img
              v-if="cert.image"
              :src="'http://localhost:5000' + cert.image"
              alt="Certificate"
              class="w-full h-full object-cover group-hover:scale-105 transition duration-500"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-4xl text-neutral-700"
            >
              🏆
            </div>
          </div>

          <!-- CONTENT -->
          <div class="p-5">
            <div class="flex items-center justify-between mb-2">
              <span class="text-xs tracking-widest text-gray-500 uppercase">{{ cert.year }}</span>
            </div>
            <h3 class="text-base font-semibold text-white leading-snug mb-2">
              {{ cert.title }}
            </h3>
            <p class="text-sm text-gray-400 leading-relaxed">
              {{ cert.description }}
            </p>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const achievements = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('http://localhost:5000/api/achievements')
    achievements.value = await res.json()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
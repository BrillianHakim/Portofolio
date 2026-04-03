<template>
  <section class="bg-black text-white px-6 py-16 min-h-[calc(100vh-120px)]">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">What I've Built</p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          Pro<span class="text-gray-400">jects</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="n in 3"
          :key="n"
          class="border border-neutral-800 rounded-xl p-4 animate-pulse"
        >
          <div class="w-full h-32 bg-neutral-800 rounded-lg mb-3"></div>
          <div class="h-3 bg-neutral-800 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-neutral-800 rounded w-full mb-1"></div>
          <div class="h-3 bg-neutral-800 rounded w-1/3 mt-3"></div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else-if="projects.length === 0"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <p class="text-4xl mb-4">🛠️</p>
        <p class="text-gray-500 text-sm">Belum ada project yang ditambahkan.</p>
      </div>

      <!-- GRID -->
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-500 transition duration-300 flex flex-col"
        >
          <!-- IMAGE -->
          <div class="relative w-full h-32 bg-neutral-900 overflow-hidden">
            <img
              v-if="project.image"
              :src="'https://portofolio-production-c69c.up.railway.app' + project.image"
              alt="Project Image"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition duration-500"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center text-3xl text-neutral-700"
            >
              🛠️
            </div>
          </div>

          <!-- CONTENT -->
          <div class="p-4 flex flex-col flex-1">
            <h2 class="text-sm font-semibold text-white leading-snug mb-1.5">
              {{ project.title }}
            </h2>

            <p class="text-xs text-gray-400 leading-relaxed mb-3 flex-1">
              {{ project.description }}
            </p>

            <!-- TECH TAGS -->
            <div class="flex flex-wrap gap-1.5 mb-3">
              <span
                v-for="tech in project.tech.split(',')"
                :key="tech"
                class="text-[10px] text-gray-400 border border-neutral-700 rounded-full px-2.5 py-0.5 hover:border-neutral-500 transition"
              >
                {{ tech.trim() }}
              </span>
            </div>

            <!-- BUTTON -->
            <a
              :href="project.githubUrl"
              target="_blank"
              class="self-start text-xs border border-white text-white px-3 py-1 rounded-lg hover:bg-white hover:text-black transition"
            >
              GitHub →
            </a>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  try {
    const res = await fetch('https://portofolio-production-c69c.up.railway.app/api/projects')
    projects.value = await res.json()
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
})
</script>
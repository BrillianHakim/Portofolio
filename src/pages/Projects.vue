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
        <div v-for="n in 3" :key="n" class="border border-neutral-800 rounded-xl p-4 animate-pulse">
          <div class="w-full h-32 bg-neutral-800 rounded-lg mb-3"></div>
          <div class="h-3 bg-neutral-800 rounded w-3/4 mb-2"></div>
          <div class="h-3 bg-neutral-800 rounded w-full mb-1"></div>
          <div class="h-3 bg-neutral-800 rounded w-1/3 mt-3"></div>
        </div>
      </div>

      <!-- EMPTY STATE -->
      <div v-else-if="projects.length === 0" class="flex flex-col items-center justify-center py-24 text-center">
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
          <!-- ICON UNIVERSAL -->
          <div class="w-full h-32 bg-neutral-900 flex items-center justify-center border-b border-neutral-800 group-hover:bg-neutral-800 transition duration-300">
            <svg xmlns="http://www.w3.org/2000/svg" class="w-12 h-12 text-neutral-600 group-hover:text-neutral-400 transition duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
            </svg>
          </div>

          <!-- CONTENT -->
          <div class="p-4 flex flex-col flex-1">
            <h2 class="text-sm font-semibold text-white leading-snug mb-1.5">{{ project.title }}</h2>
            <p class="text-xs text-gray-400 leading-relaxed mb-3 flex-1">{{ project.description }}</p>

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

            <a
              :href="project.github_url"
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
import { supabase } from '../lib/supabase'

const projects = ref([])
const loading = ref(true)

onMounted(async () => {
  const { data } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  projects.value = data || []
  loading.value = false
})
</script>
<template>
  <section class="bg-black text-white px-6 py-16 min-h-[calc(100vh-120px)]">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-12">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">My Moments</p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          Gal<span class="text-gray-400">lery</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- KATEGORI FILTER -->
      <div class="flex gap-3 mb-10 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat.value"
          @click="activeCategory = cat.value"
          :class="[
            'px-5 py-2 rounded-full text-xs tracking-widest uppercase transition border',
            activeCategory === cat.value
              ? 'bg-white text-black border-white'
              : 'border-neutral-700 text-gray-400 hover:border-neutral-500 hover:text-white'
          ]"
        >
          {{ cat.icon }} {{ cat.label }}
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <div
          v-for="n in 8" :key="n"
          class="aspect-square bg-neutral-800 rounded-xl animate-pulse"
        ></div>
      </div>

      <!-- EMPTY STATE -->
      <div
        v-else-if="filteredPhotos.length === 0"
        class="flex flex-col items-center justify-center py-24 text-center"
      >
        <p class="text-4xl mb-4">📷</p>
        <p class="text-gray-500 text-sm">Belum ada foto di kategori ini.</p>
      </div>

      <!-- GRID FOTO -->
      <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        <div
          v-for="(photo, index) in filteredPhotos"
          :key="photo.id"
          @click="openLightbox(index)"
          class="group aspect-square rounded-xl overflow-hidden cursor-pointer relative bg-neutral-900"
        >
          <img
            :src="photo.image_url"
            :alt="photo.caption || 'Gallery photo'"
            class="w-full h-full object-cover group-hover:scale-105 transition duration-500 group-hover:brightness-75"
          />
          <!-- Caption overlay -->
          <div class="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition duration-300">
            <p v-if="photo.caption" class="text-white text-xs font-medium line-clamp-2 bg-black/50 px-2 py-1 rounded-lg">
              {{ photo.caption }}
            </p>
          </div>
        </div>
      </div>

    </div>

    <!-- LIGHTBOX -->
    <div
      v-if="lightboxOpen"
      class="fixed inset-0 bg-black/95 z-50 flex items-center justify-center px-4"
      @click.self="closeLightbox"
    >
      <!-- CLOSE -->
      <button
        @click="closeLightbox"
        class="absolute top-5 right-5 text-gray-400 hover:text-white transition text-2xl"
      >✕</button>

      <!-- PREV -->
      <button
        @click="prevPhoto"
        class="absolute left-4 text-gray-400 hover:text-white transition text-3xl px-3 py-2"
      >‹</button>

      <!-- FOTO -->
      <div class="max-w-3xl w-full flex flex-col items-center gap-4">
        <img
          :src="filteredPhotos[lightboxIndex]?.image_url"
          :alt="filteredPhotos[lightboxIndex]?.caption"
          class="max-h-[75vh] w-full object-contain rounded-xl"
        />
        <div class="text-center">
          <p v-if="filteredPhotos[lightboxIndex]?.caption" class="text-white text-sm">
            {{ filteredPhotos[lightboxIndex]?.caption }}
          </p>
          <p class="text-gray-500 text-xs mt-1">
            {{ lightboxIndex + 1 }} / {{ filteredPhotos.length }}
          </p>
        </div>
      </div>

      <!-- NEXT -->
      <button
        @click="nextPhoto"
        class="absolute right-4 text-gray-400 hover:text-white transition text-3xl px-3 py-2"
      >›</button>
    </div>

  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { supabase } from '../lib/supabase'

const photos = ref([])
const loading = ref(true)
const activeCategory = ref('all')
const lightboxOpen = ref(false)
const lightboxIndex = ref(0)

const categories = [
  { value: 'all', label: 'Semua', icon: '🗂️' },
  { value: 'alam', label: 'Alam', icon: '🌿' },
  { value: 'moment', label: 'Moment', icon: '🤝' },
  { value: 'nyantai', label: 'Nyantai', icon: '☕' },
]

const filteredPhotos = computed(() => {
  if (activeCategory.value === 'all') return photos.value
  return photos.value.filter(p => p.category === activeCategory.value)
})

const fetchPhotos = async () => {
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })

  photos.value = data || []
  loading.value = false
}

onMounted(() => {
  fetchPhotos()
  window.addEventListener('keydown', handleKey)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKey)
})

const openLightbox = (index) => {
  lightboxIndex.value = index
  lightboxOpen.value = true
}

const closeLightbox = () => {
  lightboxOpen.value = false
}

const nextPhoto = () => {
  lightboxIndex.value = (lightboxIndex.value + 1) % filteredPhotos.value.length
}

const prevPhoto = () => {
  lightboxIndex.value = (lightboxIndex.value - 1 + filteredPhotos.value.length) % filteredPhotos.value.length
}

const handleKey = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'ArrowRight') nextPhoto()
  if (e.key === 'ArrowLeft') prevPhoto()
  if (e.key === 'Escape') closeLightbox()
}
</script>
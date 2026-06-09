<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Admin Panel</p>
        <h1 class="text-5xl font-bold tracking-tight">
          Gallery <span class="text-gray-400">Manager</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- FORM -->
      <div class="mb-16 border border-neutral-800 rounded-xl px-6 py-8">
        <h2 class="text-xl font-semibold mb-6">Upload Foto</h2>

        <div class="space-y-4">

          <!-- KATEGORI -->
          <div>
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">Kategori</p>
            <select
              v-model="form.category"
              class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition text-white"
            >
              <option value="alam">🌿 Alam</option>
              <option value="moment">🤝 Moment</option>
              <option value="nyantai">☕ Nyantai</option>
            </select>
          </div>

          <!-- CAPTION -->
          <input
            v-model="form.caption"
            placeholder="Caption (opsional)"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <!-- UPLOAD -->
          <div>
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">Upload Foto</p>
            <input
              type="file"
              accept="image/*"
              @change="handleFile"
              class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-700 file:rounded-lg file:bg-black file:text-white hover:file:bg-neutral-900"
            />
            <p v-if="uploading" class="text-xs text-gray-400 mt-2">Uploading...</p>
            <img v-if="form.image_url" :src="form.image_url" class="mt-3 h-32 rounded-lg object-cover" />
          </div>

          <button
            @click="savePhoto"
            :disabled="saving || uploading || !form.image_url"
            class="border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {{ saving ? 'Saving...' : 'Upload Foto' }}
          </button>

          <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-400 text-sm">{{ success }}</p>
        </div>
      </div>

      <!-- LIST PER KATEGORI -->
      <div v-for="cat in categories" :key="cat.value" class="mb-12">
        <div class="flex items-center gap-3 mb-5">
          <p class="text-xs tracking-[0.3em] text-gray-500 uppercase">{{ cat.icon }} {{ cat.label }}</p>
          <div class="flex-1 h-px bg-neutral-800"></div>
          <span class="text-xs text-gray-600">{{ photosByCategory(cat.value).length }} foto</span>
        </div>

        <div v-if="photosByCategory(cat.value).length === 0" class="text-gray-600 text-sm mb-4">
          Belum ada foto.
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          <div
            v-for="photo in photosByCategory(cat.value)"
            :key="photo.id"
            class="group relative aspect-square rounded-xl overflow-hidden bg-neutral-900"
          >
            <img :src="photo.image_url" class="w-full h-full object-cover group-hover:brightness-50 transition" />
            <button
              @click="deletePhoto(photo.id)"
              class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
            >
              <span class="bg-red-500 text-white text-xs px-3 py-1.5 rounded-lg">Hapus</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const photos = ref([])
const uploading = ref(false)
const saving = ref(false)
const error = ref('')
const success = ref('')

const form = ref({
  category: 'alam',
  caption: '',
  image_url: ''
})

const categories = [
  { value: 'alam', label: 'Alam', icon: '🌿' },
  { value: 'moment', label: 'Moment', icon: '🤝' },
  { value: 'nyantai', label: 'Nyantai', icon: '☕' },
]

const photosByCategory = (cat) => photos.value.filter(p => p.category === cat)

const handleFile = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  uploading.value = true
  error.value = ''

  try {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET)

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
      { method: 'POST', body: formData }
    )

    const data = await res.json()
    if (data.secure_url) {
      form.value.image_url = data.secure_url
    } else {
      throw new Error('Upload gagal')
    }
  } catch (err) {
    error.value = 'Gagal upload: ' + err.message
  } finally {
    uploading.value = false
  }
}

const fetchPhotos = async () => {
  const { data } = await supabase
    .from('gallery')
    .select('*')
    .order('created_at', { ascending: false })
  photos.value = data || []
}

onMounted(fetchPhotos)

const savePhoto = async () => {
  error.value = ''
  success.value = ''
  saving.value = true

  try {
    const { error: err } = await supabase.from('gallery').insert({
      category: form.value.category,
      caption: form.value.caption || null,
      image_url: form.value.image_url
    })

    if (err) throw err

    success.value = 'Foto berhasil diupload!'
    form.value = { category: 'alam', caption: '', image_url: '' }
    await fetchPhotos()
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

const deletePhoto = async (id) => {
  if (!confirm('Hapus foto ini?')) return

  const { error: err } = await supabase.from('gallery').delete().eq('id', id)
  if (err) {
    alert(err.message)
  } else {
    photos.value = photos.value.filter(p => p.id !== id)
  }
}
</script>
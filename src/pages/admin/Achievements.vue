<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Admin Panel</p>
        <h1 class="text-5xl font-bold tracking-tight">
          Achievements <span class="text-gray-400">Manager</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- FORM -->
      <div class="mb-16 border border-neutral-800 rounded-xl px-6 py-8">
        <h2 class="text-xl font-semibold mb-6">
          {{ isEditing ? 'Edit Achievement' : 'Add Achievement' }}
        </h2>

        <div class="space-y-4">
          <input
            v-model="form.title"
            placeholder="Title"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />
          <input
            v-model="form.year"
            type="number"
            placeholder="Year"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Description"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <!-- UPLOAD GAMBAR -->
          <div>
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">Upload Image</p>
            <input
              type="file"
              accept="image/*"
              @change="handleFile"
              class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-700 file:rounded-lg file:bg-black file:text-white hover:file:bg-neutral-900"
            />
            <p v-if="uploading" class="text-xs text-gray-400 mt-2">Uploading image...</p>
            <img v-if="form.image" :src="form.image" class="mt-3 h-24 rounded-lg object-cover" />
          </div>

          <div class="flex gap-3 pt-2">
            <button
              @click="saveAchievement"
              :disabled="saving || uploading"
              class="border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition disabled:opacity-50"
            >
              {{ saving ? 'Saving...' : isEditing ? 'Update' : 'Add' }}
            </button>
            <button
              v-if="isEditing"
              @click="cancelEdit"
              class="border border-neutral-700 px-6 py-2 rounded-lg hover:border-neutral-500 transition"
            >
              Cancel
            </button>
          </div>

          <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-400 text-sm">{{ success }}</p>
        </div>
      </div>

      <!-- LIST -->
      <div class="mb-6">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">Data</p>
        <h2 class="text-2xl font-semibold">Achievement List</h2>
      </div>

      <div v-if="loading" class="text-gray-400">Loading...</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="item in achievements"
          :key="item.id"
          class="group border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <img v-if="item.image" :src="item.image" class="w-full h-40 object-cover" />

          <div class="p-5">
            <h3 class="text-lg font-semibold mb-1">{{ item.title }}</h3>
            <p class="text-gray-400 text-sm mb-2">{{ item.year }}</p>
            <p class="text-gray-300 text-sm mb-4">{{ item.description }}</p>

            <div class="flex gap-4 text-sm">
              <button @click="editAchievement(item)" class="text-gray-400 hover:text-white transition">Edit</button>
              <button @click="deleteAchievement(item.id)" class="text-red-400 hover:text-red-300 transition">Delete</button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../lib/supabase'

const achievements = ref([])
const loading = ref(true)
const saving = ref(false)
const uploading = ref(false)
const error = ref('')
const success = ref('')
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  title: '',
  description: '',
  year: '',
  image: ''
})

// Upload langsung ke Cloudinary dari frontend
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
      form.value.image = data.secure_url
    } else {
      throw new Error('Upload gagal')
    }
  } catch (err) {
    error.value = 'Gagal upload gambar: ' + err.message
  } finally {
    uploading.value = false
  }
}

const fetchAchievements = async () => {
  const { data, error: err } = await supabase
    .from('achievements')
    .select('*')
    .order('created_at', { ascending: false })

  if (err) {
    error.value = err.message
  } else {
    achievements.value = data
  }
  loading.value = false
}

onMounted(fetchAchievements)

const saveAchievement = async () => {
  error.value = ''
  success.value = ''
  saving.value = true

  try {
    const payload = {
      title: form.value.title,
      description: form.value.description,
      year: Number(form.value.year),
      image: form.value.image || null
    }

    if (isEditing.value) {
      const { error: err } = await supabase
        .from('achievements')
        .update(payload)
        .eq('id', editingId.value)

      if (err) throw err
      success.value = 'Achievement updated!'
    } else {
      const { error: err } = await supabase
        .from('achievements')
        .insert(payload)

      if (err) throw err
      success.value = 'Achievement added!'
    }

    await fetchAchievements()
    resetForm()
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

const editAchievement = (item) => {
  form.value = {
    title: item.title,
    description: item.description,
    year: item.year,
    image: item.image || ''
  }
  editingId.value = item.id
  isEditing.value = true
}

const deleteAchievement = async (id) => {
  if (!confirm('Delete this achievement?')) return

  const { error: err } = await supabase
    .from('achievements')
    .delete()
    .eq('id', id)

  if (err) {
    alert(err.message)
  } else {
    achievements.value = achievements.value.filter(a => a.id !== id)
  }
}

const resetForm = () => {
  form.value = { title: '', description: '', year: '', image: '' }
  isEditing.value = false
  editingId.value = null
}

const cancelEdit = () => resetForm()
</script>
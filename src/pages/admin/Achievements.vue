<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
          Admin Panel
        </p>
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

          <!-- FILE INPUT CUSTOM -->
          <div>
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
              Upload Image
            </p>
            <input
              type="file"
              @change="handleFile"
              class="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:border file:border-neutral-700 file:rounded-lg file:bg-black file:text-white hover:file:bg-neutral-900"
            />
          </div>

          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Description"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <!-- BUTTON -->
          <div class="flex gap-3 pt-2">

            <button
              @click="saveAchievement"
              class="border border-white px-6 py-2 rounded-lg font-medium hover:bg-white hover:text-black transition"
            >
              {{ isEditing ? 'Update' : 'Add' }}
            </button>

            <button
              v-if="isEditing"
              @click="cancelEdit"
              class="border border-neutral-700 px-6 py-2 rounded-lg hover:border-neutral-500 transition"
            >
              Cancel
            </button>

          </div>

          <!-- FEEDBACK -->
          <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-400 text-sm">{{ success }}</p>

        </div>
      </div>

      <!-- LIST HEADER -->
      <div class="mb-6">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-2">
          Data
        </p>
        <h2 class="text-2xl font-semibold">Achievement List</h2>
      </div>

      <div v-if="loading" class="text-gray-400">Loading...</div>

      <!-- LIST -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <div
          v-for="item in achievements"
          :key="item.id"
          class="group border border-neutral-800 rounded-xl overflow-hidden hover:border-neutral-500 hover:bg-neutral-900 transition"
        >

          <!-- IMAGE -->
          <img
            v-if="item.image"
            :src="item.image"
            class="w-full h-40 object-cover"
          />

          <!-- CONTENT -->
          <div class="p-5">

            <h3 class="text-lg font-semibold mb-1">
              {{ item.title }}
            </h3>

            <p class="text-gray-400 text-sm mb-2">
              {{ item.year }}
            </p>

            <p class="text-gray-300 text-sm mb-4">
              {{ item.description }}
            </p>

            <!-- ACTION -->
            <div class="flex gap-4 text-sm">

              <button
                @click="editAchievement(item)"
                class="text-gray-400 hover:text-white transition"
              >
                Edit
              </button>

              <button
                @click="deleteAchievement(item.id)"
                class="text-red-400 hover:text-red-300 transition"
              >
                Delete
              </button>

            </div>

          </div>
        </div>

      </div>

    </div>
  </section>
</template>

<script setup>

import { ref, onMounted } from 'vue'

const selectedFile = ref(null)
const achievements = ref([])
const loading = ref(true)

const error = ref('')
const success = ref('')

const isEditing = ref(false)
const editingId = ref(null)

const handleFile = (event) => {
  selectedFile.value = event.target.files[0]
}

const form = ref({
  title: '',
  description: '',
  year: '',
  image: ''
})

/* ================= FETCH ================= */

const fetchAchievements = async () => {
  try {
    const res = await fetch('https://portofolio-production-c69c.up.railway.app/api/achievements')
    const data = await res.json()
    achievements.value = data
  } catch (err) {
    error.value = 'Failed to fetch achievements'
  } finally {
    loading.value = false
  }
}

onMounted(fetchAchievements)

/* ================= SAVE ================= */

const saveAchievement = async () => {
  error.value = ''
  success.value = ''

  try {
    const token = localStorage.getItem('token')

    const formData = new FormData()
    formData.append('title', form.value.title)
    formData.append('description', form.value.description)
    formData.append('year', form.value.year)

    if (selectedFile.value) {
      formData.append('image', selectedFile.value)
    }

    // saveAchievement
const url = isEditing.value
  ? `https://portofolio-production-c69c.up.railway.app/api/achievements/${editingId.value}`
  : 'https://portofolio-production-c69c.up.railway.app/api/achievements'

    const method = isEditing.value ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error)

    fetchAchievements()

    success.value = isEditing.value
      ? 'Achievement updated!'
      : 'Achievement added!'

    resetForm()

  } catch (err) {
    error.value = err.message
  }
}

/* ================= EDIT ================= */

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

/* ================= DELETE ================= */

const deleteAchievement = async (id) => {
  if (!confirm('Delete this achievement?')) return

  try {
    const token = localStorage.getItem('token')

    const res = await fetch(`https://portofolio-production-c69c.up.railway.app/api/achievements/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error)

    achievements.value = achievements.value.filter(a => a.id !== id)

  } catch (err) {
    alert(err.message)
  }
}

/* ================= RESET ================= */

const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    year: '',
    image: ''
  }

  isEditing.value = false
  editingId.value = null
}

const cancelEdit = () => {
  resetForm()
}
</script>

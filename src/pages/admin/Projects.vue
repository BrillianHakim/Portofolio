<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
          Admin Panel
        </p>
        <h1 class="text-5xl font-bold tracking-tight">
          Projects <span class="text-gray-400">Manager</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- FORM -->
      <div class="mb-16 border border-neutral-800 rounded-xl px-6 py-8">
        <h2 class="text-xl font-semibold mb-6">
          {{ isEditing ? 'Edit Project' : 'Add Project' }}
        </h2>

        <div class="space-y-4">

          <input
            v-model="form.title"
            placeholder="Title"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <input
            v-model="form.tech"
            placeholder="Tech (React, Vue, Laravel, dll)"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <input
            v-model="form.githubUrl"
            placeholder="Github URL"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Description"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <!-- BUTTON -->
          <div class="flex gap-3 pt-2">

            <button
              @click="saveProject"
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
        <h2 class="text-2xl font-semibold">Project List</h2>
      </div>

      <div v-if="loading" class="text-gray-400">Loading...</div>

      <!-- PROJECT LIST -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group border border-neutral-800 rounded-xl px-6 py-6 hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <h3 class="font-semibold text-lg mb-2">
            {{ project.title }}
          </h3>

          <p class="text-gray-400 text-sm mb-2">
            {{ project.tech }}
          </p>

          <p class="text-gray-300 text-sm mb-4">
            {{ project.description }}
          </p>

          <div class="flex justify-between items-center">

            <a
              v-if="project.githubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="text-gray-400 text-sm underline hover:text-white transition"
            >
              GitHub
            </a>

            <div class="flex gap-4 text-sm">

              <button
                @click="editProject(project)"
                class="text-gray-400 hover:text-white transition"
              >
                Edit
              </button>

              <button
                @click="deleteProject(project.id)"
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

const projects = ref([])
const loading = ref(true)
const error = ref('')
const success = ref('')

const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  title: '',
  description: '',
  tech: '',
  githubUrl: ''
})

const token = localStorage.getItem('token')

/* ===================== FETCH PROJECTS ===================== */
const fetchProjects = async () => {
  try {
    const res = await fetch('https://portofolio-production-c69c.up.railway.app/api/projects')
    const data = await res.json()
    projects.value = data
  } catch (err) {
    error.value = 'Failed to fetch projects'
  } finally {
    loading.value = false
  }
}

onMounted(fetchProjects)

/* ===================== SAVE (ADD / UPDATE) ===================== */
const saveProject = async () => {
  error.value = ''
  success.value = ''

  try {
    const token = localStorage.getItem('token') // PINDAHKAN KE SINI

    if (!token) {
      throw new Error('Unauthorized')
    }

    const url = isEditing.value
      ? `https://portofolio-production-c69c.up.railway.app/api/projects/${editingId.value}`
      : 'https://portofolio-production-c69c.up.railway.app/api/projects'

    const method = isEditing.value ? 'PUT' : 'POST'

    const res = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(form.value)
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Request failed')

    if (isEditing.value) {
      const index = projects.value.findIndex(p => p.id === editingId.value)
      projects.value[index] = data
      success.value = 'Project updated!'
    } else {
      projects.value = [data, ...projects.value]
      success.value = 'Project added!'
    }

    resetForm()

  } catch (err) {
    error.value = err.message
  }
}

/* ===================== EDIT ===================== */
const editProject = (project) => {
  form.value = {
    title: project.title,
    description: project.description,
    tech: project.tech,
    githubUrl: project.githubUrl || ''
  }

  editingId.value = project.id
  isEditing.value = true
}
/* ===================== DELETE ===================== */
const deleteProject = async (id) => {
  if (!confirm('Delete this project?')) return

  try {
    const token = localStorage.getItem('token')

    if (!token) throw new Error('Unauthorized')

    const res = await fetch(`https://portofolio-production-c69c.up.railway.app/api/projects/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    const data = await res.json()

    if (!res.ok) throw new Error(data.error || 'Delete failed')

    projects.value = projects.value.filter(p => p.id !== id)

  } catch (err) {
    alert(err.message)
  }
}
/* ===================== RESET ===================== */
const resetForm = () => {
  form.value = {
    title: '',
    description: '',
    tech: '',
    githubUrl: ''
  }

  isEditing.value = false
  editingId.value = null
}
</script>
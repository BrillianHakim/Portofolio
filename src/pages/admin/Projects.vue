<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Admin Panel</p>
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
            v-model="form.github_url"
            placeholder="Github URL"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />
          <input
            v-model="form.image"
            placeholder="Image URL (dari Cloudinary)"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />
          <textarea
            v-model="form.description"
            rows="4"
            placeholder="Description"
            class="w-full p-3 bg-black border border-neutral-800 rounded-lg focus:outline-none focus:border-white transition"
          />

          <div class="flex gap-3 pt-2">
            <button
              @click="saveProject"
              :disabled="saving"
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
        <h2 class="text-2xl font-semibold">Project List</h2>
      </div>

      <div v-if="loading" class="text-gray-400">Loading...</div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div
          v-for="project in projects"
          :key="project.id"
          class="group border border-neutral-800 rounded-xl px-6 py-6 hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <h3 class="font-semibold text-lg mb-2">{{ project.title }}</h3>
          <p class="text-gray-400 text-sm mb-2">{{ project.tech }}</p>
          <p class="text-gray-300 text-sm mb-4">{{ project.description }}</p>

          <div class="flex justify-between items-center">
            <a
              v-if="project.github_url"
              :href="project.github_url"
              target="_blank"
              class="text-gray-400 text-sm underline hover:text-white transition"
            >
              GitHub
            </a>
            <div class="flex gap-4 text-sm">
              <button @click="editProject(project)" class="text-gray-400 hover:text-white transition">Edit</button>
              <button @click="deleteProject(project.id)" class="text-red-400 hover:text-red-300 transition">Delete</button>
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

const projects = ref([])
const loading = ref(true)
const saving = ref(false)
const error = ref('')
const success = ref('')
const isEditing = ref(false)
const editingId = ref(null)

const form = ref({
  title: '',
  description: '',
  tech: '',
  github_url: '',
  image: ''
})

const fetchProjects = async () => {
  const { data, error: err } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false })

  if (err) {
    error.value = err.message
  } else {
    projects.value = data
  }
  loading.value = false
}

onMounted(fetchProjects)

const saveProject = async () => {
  error.value = ''
  success.value = ''
  saving.value = true

  try {
    if (isEditing.value) {
      const { error: err } = await supabase
        .from('projects')
        .update(form.value)
        .eq('id', editingId.value)

      if (err) throw err
      success.value = 'Project updated!'
    } else {
      const { error: err } = await supabase
        .from('projects')
        .insert(form.value)

      if (err) throw err
      success.value = 'Project added!'
    }

    await fetchProjects()
    resetForm()
  } catch (err) {
    error.value = err.message
  } finally {
    saving.value = false
  }
}

const editProject = (project) => {
  form.value = {
    title: project.title,
    description: project.description,
    tech: project.tech,
    github_url: project.github_url || '',
    image: project.image || ''
  }
  editingId.value = project.id
  isEditing.value = true
}

const deleteProject = async (id) => {
  if (!confirm('Delete this project?')) return

  const { error: err } = await supabase
    .from('projects')
    .delete()
    .eq('id', id)

  if (err) {
    alert(err.message)
  } else {
    projects.value = projects.value.filter(p => p.id !== id)
  }
}

const resetForm = () => {
  form.value = { title: '', description: '', tech: '', github_url: '', image: '' }
  isEditing.value = false
  editingId.value = null
}

const cancelEdit = () => resetForm()
</script>
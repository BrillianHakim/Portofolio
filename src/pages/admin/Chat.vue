<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
          Admin Panel
        </p>
        <h1 class="text-5xl font-bold tracking-tight">
          Chat <span class="text-gray-400">Management</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- STATS + ACTION -->
      <div class="mb-6 flex items-center justify-between">

        <p class="text-sm text-gray-400">
          Total pesan:
          <span class="text-white font-medium ml-1">
            {{ messages.length }}
          </span>
        </p>

        <button
          @click="deleteAllMessages"
          class="border border-red-500 text-red-400 px-4 py-2 rounded-lg text-sm hover:bg-red-500 hover:text-white transition"
        >
          Hapus Semua
        </button>

      </div>

      <!-- TABLE -->
      <div class="border border-neutral-800 rounded-xl overflow-hidden">

        <table class="w-full text-sm">

          <!-- HEAD -->
          <thead class="border-b border-neutral-800 text-gray-500">
            <tr class="text-left">
              <th class="px-4 py-3 w-10">#</th>
              <th class="px-4 py-3 w-40">User</th>
              <th class="px-4 py-3">Message</th>
              <th class="px-4 py-3 w-40">Time</th>
              <th class="px-4 py-3 w-24 text-center">Action</th>
            </tr>
          </thead>

          <!-- BODY -->
          <tbody>

            <tr
              v-for="(msg, index) in messages"
              :key="msg.id"
              class="border-b border-neutral-800 hover:bg-neutral-900 transition"
            >
              <td class="px-4 py-3 text-gray-600">
                {{ index + 1 }}
              </td>

              <td class="px-4 py-3 font-medium text-white">
                {{ msg.user }}
              </td>

              <td class="px-4 py-3 text-gray-300">
                {{ msg.text }}
              </td>

              <td class="px-4 py-3 text-gray-500 text-xs">
                {{ formatTime(msg.createdAt) }}
              </td>

              <td class="px-4 py-3 text-center">
                <button
                  @click="deleteMessage(msg.id)"
                  class="text-red-400 border border-red-500 px-3 py-1 rounded-lg text-xs hover:bg-red-500 hover:text-white transition"
                >
                  Delete
                </button>
              </td>
            </tr>

            <!-- EMPTY STATE -->
            <tr v-if="messages.length === 0">
              <td colspan="5" class="px-4 py-10 text-center text-gray-500">
                No messages yet.
              </td>
            </tr>

          </tbody>
        </table>

      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'

const messages = ref([])
const socket = io('https://portofolio-production-c69c.up.railway.app')

const formatTime = (timestamp) => {
  if (!timestamp) return '-'
  return new Date(timestamp).toLocaleString('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

const fetchMessages = async () => {
  const res = await fetch('https://portofolio-production-c69c.up.railway.app/api/chat')
  const data = await res.json()
  messages.value = data
}

const deleteMessage = async (id) => {
  const ok = window.confirm('Yakin ingin menghapus pesan ini?')
  if (!ok) return

  await fetch(`https://portofolio-production-c69c.up.railway.app/api/chat/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  messages.value = messages.value.filter((m) => m.id !== id)
}

const deleteAllMessages = async () => {
  const ok = window.confirm('Yakin ingin menghapus SEMUA pesan? Aksi ini tidak bisa dibatalkan!')
  if (!ok) return

  await fetch('https://portofolio-production-c69c.up.railway.app/api/chat/all', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  })

  messages.value = []
}

onMounted(() => {
  fetchMessages()

  socket.on('receive-message', (msg) => {
    messages.value.push(msg)
  })
})
</script>
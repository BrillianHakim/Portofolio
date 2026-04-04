<template>
  <section class="bg-black text-white px-6 py-16 min-h-[calc(100vh-120px)]">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-10">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Public Room</p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          Chat <span class="text-gray-400">Room</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- CHAT AREA -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">

        <!-- CHAT BOX -->
        <div class="md:col-span-3 flex flex-col">
          <div
            ref="chatBox"
            class="border border-neutral-800 rounded-xl p-5 h-[420px] overflow-y-auto mb-4 space-y-4 bg-neutral-950 scroll-smooth"
          >
            <!-- EMPTY STATE -->
            <div
              v-if="messages.length === 0"
              class="flex flex-col items-center justify-center h-full text-center"
            >
              <p class="text-3xl mb-3">💬</p>
              <p class="text-gray-500 text-sm">Belum ada pesan. Mulai percakapan!</p>
            </div>

            <div
              v-for="(msg, index) in messages"
              :key="index"
              :class="[
                'flex flex-col',
                msg.user === username ? 'items-end' : 'items-start'
              ]"
            >
              <span class="text-[11px] text-gray-500 mb-1 px-1">{{ msg.user }}</span>
              <div
                :class="[
                  'rounded-2xl px-4 py-2 max-w-[75%] text-sm leading-relaxed',
                  msg.user === username
                    ? 'bg-white text-black rounded-br-none'
                    : 'bg-neutral-800 text-white rounded-bl-none'
                ]"
              >
                {{ msg.text }}
              </div>
              <span class="text-[10px] text-gray-600 mt-1 px-1">
                {{ formatTime(msg.createdAt) }}
              </span>
            </div>
          </div>

          <!-- INPUT FORM -->
          <form @submit.prevent="sendMessage" class="flex gap-2">
            <input
              v-model="message"
              type="text"
              placeholder="Type a message..."
              class="flex-1 bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5 text-white text-sm outline-none focus:border-neutral-500 transition placeholder-neutral-600"
              required
            />
            <button
              type="submit"
              class="border border-white px-5 py-2.5 rounded-lg text-sm hover:bg-white hover:text-black transition"
            >
              Send →
            </button>
          </form>
        </div>

        <!-- SIDE PANEL -->
        <div class="flex flex-col gap-4">

          <!-- USERNAME CARD -->
          <div class="border border-neutral-800 rounded-xl p-4">
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">Username</p>
            <input
              v-model="username"
              type="text"
              placeholder="Your name"
              class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-3 py-2 text-white text-sm outline-none focus:border-neutral-500 transition placeholder-neutral-600"
            />
            <div class="flex items-center gap-2 mt-3">
              <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span class="text-xs text-gray-500">Connected</span>
            </div>
          </div>

          <!-- STATS CARD -->
          <!-- <div class="border border-neutral-800 rounded-xl p-4">
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-3">Info</p>
            <div class="space-y-2">
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">Total pesan</span>
                <span class="text-xs text-white font-medium">{{ messages.length }}</span>
              </div>
              <div class="flex justify-between items-center">
                <span class="text-xs text-gray-500">Realtime</span>
                <span class="text-xs text-green-400">Socket.IO</span>
              </div>
            </div>
          </div> -->

          <!-- RULES CARD -->
          <div class="border border-neutral-800 rounded-xl p-4">
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-3">Rules</p>
            <ul class="space-y-1.5">
              <li class="text-xs text-gray-500">• Gunakan username yang sopan</li>
              <li class="text-xs text-gray-500">• Jaga etika berkomunikasi</li>
              <li class="text-xs text-gray-500">• Dilarang melakukan spam</li>
            </ul>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { io } from 'socket.io-client'

const socket = io('https://portofolio-production-c69c.up.railway.app', {
  transports: ['websocket'], // Paksa gunakan websocket terlebih dahulu
  withCredentials: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

const username = ref('')
const message = ref('')
const messages = ref([])
const chatBox = ref(null)

const scrollToBottom = async () => {
  await nextTick()
  if (chatBox.value) {
    chatBox.value.scrollTop = chatBox.value.scrollHeight
  }
}

const formatTime = (timestamp) => {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
  })
}

onMounted(() => {
  socket.on('chat-history', (history) => {
    messages.value = history
    scrollToBottom()
  })

  socket.on('receive-message', (msg) => {
    messages.value.push(msg)
    scrollToBottom()
  })
})

onUnmounted(() => {
  socket.disconnect()
})

const sendMessage = () => {
  if (!username.value || !message.value) return
  socket.emit('send-message', {
    user: username.value,
    text: message.value,
  })
  message.value = ''
}
</script>
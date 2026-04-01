<template>
  <section class="bg-black text-white px-6 py-16 min-h-[calc(100vh-120px)]">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Get In Touch</p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          Con<span class="text-gray-400">tact</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- GRID: FORM + INFO -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

        <!-- KIRI: INFO -->
        <div class="space-y-8">
          <p class="text-gray-300 text-[15px] leading-7">
            Jika ingin berdiskusi, bekerja sama, atau sekadar menyapa —
            silakan kirim pesan. Saya akan balas secepatnya.
          </p>

          <div class="space-y-4">
            <div
              v-for="info in contactInfo"
              :key="info.label"
              class="border border-neutral-800 rounded-xl px-5 py-4 hover:border-neutral-600 transition"
            >
              <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-1">{{ info.label }}</p>
              <p class="text-sm text-white font-medium">{{ info.value }}</p>
            </div>
          </div>
        </div>

        <!-- KANAN: FORM -->
        <div class="md:col-span-2">
          <!-- SUCCESS STATE -->
          <div
            v-if="submitted"
            class="flex flex-col items-center justify-center h-full py-16 text-center border border-neutral-800 rounded-xl"
          >
            <p class="text-4xl mb-4">✅</p>
            <p class="text-white font-semibold mb-1">Pesan Terkirim!</p>
            <p class="text-gray-400 text-sm">Terima kasih, saya akan segera membalas.</p>
            <button
              @click="submitted = false"
              class="mt-6 text-xs border border-neutral-700 px-4 py-2 rounded-lg text-gray-400 hover:border-white hover:text-white transition"
            >
              Kirim pesan lain
            </button>
          </div>

          <!-- FORM -->
          <form
            v-else
            action="https://formspree.io/f/mdawpqaw"
            method="POST"
            @submit.prevent="handleSubmit"
            class="space-y-5"
          >
            <!-- NAME -->
            <div>
              <label class="block text-xs tracking-widest text-gray-500 uppercase mb-2">Name</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Your name"
                class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neutral-500 transition placeholder-neutral-600"
              />
            </div>

            <!-- EMAIL -->
            <div>
              <label class="block text-xs tracking-widest text-gray-500 uppercase mb-2">Email</label>
              <input
                type="email"
                name="email"
                required
                placeholder="you@email.com"
                class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neutral-500 transition placeholder-neutral-600"
              />
            </div>

            <!-- MESSAGE -->
            <div>
              <label class="block text-xs tracking-widest text-gray-500 uppercase mb-2">Message</label>
              <textarea
                name="message"
                rows="5"
                required
                placeholder="Write your message..."
                class="w-full bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-white text-sm outline-none focus:border-neutral-500 transition resize-none placeholder-neutral-600"
              ></textarea>
            </div>

            <!-- BUTTON -->
            <button
              type="submit"
              :disabled="sending"
              class="border border-white px-6 py-2.5 rounded-lg text-sm hover:bg-white hover:text-black transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {{ sending ? 'Sending...' : 'Send Message →' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const submitted = ref(false)
const sending = ref(false)

const contactInfo = [
  { label: 'Email', value: 'bintangbrillianhakim@gmail.com' },
  { label: 'Location', value: 'Malang, Indonesia' },
  { label: 'Status', value: 'Open for opportunities' },
]

const handleSubmit = async (e) => {
  sending.value = true
  try {
    const form = e.target
    const data = new FormData(form)
    await fetch('https://formspree.io/f/mdawpqaw', {
      method: 'POST',
      body: data,
      headers: { Accept: 'application/json' },
    })
    submitted.value = true
    form.reset()
  } catch (err) {
    console.error(err)
  } finally {
    sending.value = false
  }
}
</script>
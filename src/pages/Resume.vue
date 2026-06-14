<template>
  <section class="bg-black text-white px-6 py-16 min-h-[calc(100vh-120px)]">
    <div class="w-full max-w-3xl mx-auto">

      <!-- HEADER -->
      <div class="mb-12 flex items-start justify-between flex-wrap gap-4">
        <div>
          <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Curriculum Vitae</p>
          <h1 class="text-5xl font-bold tracking-tight leading-tight">
            Re<span class="text-gray-400">sume</span>
          </h1>
          <div class="mt-4 h-px w-16 bg-white"></div>
        </div>

        <!-- DOWNLOAD BUTTON -->
        <button
          @click="downloadPDF"
          :disabled="downloading"
          class="flex items-center gap-2 border border-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-white hover:text-black transition mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          {{ downloading ? 'Generating PDF...' : 'Download PDF' }}
        </button>
      </div>

      <!-- CV CONTENT (ini yang akan di-print/download) -->
      <div id="cv-content" class="space-y-10">

        <!-- PROFIL -->
        <div class="border border-neutral-800 rounded-xl px-6 py-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-16 h-16 rounded-full bg-neutral-800 overflow-hidden flex-shrink-0">
              <img src="/Cuy.webp" alt="Hakim" class="w-full h-full object-cover" />
            </div>
            <div>
              <h2 class="text-xl font-bold">Bintang Brillian Hakim</h2>
              <p class="text-gray-400 text-sm">Informatics Engineering Student · Web Developer · Content Writer</p>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-4">
            <div v-for="info in contactInfo" :key="info.label" class="flex items-center gap-2 text-sm text-gray-400">
              <span class="text-white">{{ info.icon }}</span>
              <span>{{ info.value }}</span>
            </div>
          </div>
        </div>

        <!-- PENDIDIKAN -->
        <div>
          <div class="flex items-center gap-3 mb-5">
            <p class="text-xs tracking-[0.3em] text-gray-500 uppercase">Pendidikan</p>
            <div class="flex-1 h-px bg-neutral-800"></div>
          </div>
          <div v-for="edu in education" :key="edu.school" class="border border-neutral-800 rounded-xl px-6 py-5 hover:border-neutral-600 transition">
            <div class="flex justify-between items-start flex-wrap gap-2">
              <div>
                <h3 class="font-semibold text-white">{{ edu.school }}</h3>
                <p class="text-gray-400 text-sm mt-1">{{ edu.major }}</p>
              </div>
              <div class="text-right">
                <p class="text-xs tracking-widest text-gray-500 uppercase">{{ edu.period }}</p>
                <p class="text-sm text-white font-medium mt-1">IPK {{ edu.gpa }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- PENGALAMAN -->
        <div>
          <div class="flex items-center gap-3 mb-5">
            <p class="text-xs tracking-[0.3em] text-gray-500 uppercase">Pengalaman</p>
            <div class="flex-1 h-px bg-neutral-800"></div>
          </div>
          <div v-for="exp in experience" :key="exp.company" class="border border-neutral-800 rounded-xl px-6 py-5 hover:border-neutral-600 transition">
            <div class="flex justify-between items-start flex-wrap gap-2 mb-3">
              <div>
                <h3 class="font-semibold text-white">{{ exp.position }}</h3>
                <p class="text-gray-400 text-sm mt-1">{{ exp.company }}</p>
              </div>
              <p class="text-xs tracking-widest text-gray-500 uppercase">{{ exp.period }}</p>
            </div>
            <ul class="space-y-1.5">
              <li v-for="item in exp.details" :key="item" class="text-sm text-gray-300 flex items-start gap-2">
                <span class="text-gray-600 mt-1">▸</span>
                <span>{{ item }}</span>
              </li>
            </ul>
          </div>
        </div>

        <!-- SKILLS -->
        <div>
          <div class="flex items-center gap-3 mb-5">
            <p class="text-xs tracking-[0.3em] text-gray-500 uppercase">Skills</p>
            <div class="flex-1 h-px bg-neutral-800"></div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="group in skills" :key="group.category" class="border border-neutral-800 rounded-xl px-6 py-5 hover:border-neutral-600 transition">
              <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-3">{{ group.category }}</p>
              <div class="flex flex-wrap gap-2">
                <span
                  v-for="skill in group.items" :key="skill"
                  class="text-xs text-gray-300 border border-neutral-700 rounded-full px-3 py-1 hover:border-neutral-500 transition"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <!-- BAHASA -->
        <div>
          <div class="flex items-center gap-3 mb-5">
            <p class="text-xs tracking-[0.3em] text-gray-500 uppercase">Bahasa</p>
            <div class="flex-1 h-px bg-neutral-800"></div>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div v-for="lang in languages" :key="lang.name" class="border border-neutral-800 rounded-xl px-6 py-5 hover:border-neutral-600 transition">
              <p class="font-semibold text-white">{{ lang.name }}</p>
              <p class="text-gray-400 text-sm mt-1">{{ lang.level }}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const contactInfo = [
  { icon: '✉', value: 'bintangbrillianhakim@gmail.com' },
  { icon: '📍', value: 'Malang, Indonesia' },
  { icon: '🌐', value: 'brillianhakim.vercel.app' },
]

const education = [
  {
    school: 'Institut Teknologi Nasional Malang',
    major: 'Teknik Informatika',
    period: '2022 — Sekarang',
    gpa: '3.50'
  }
]

const experience = [
  {
    company: 'Jitu Property',
    position: 'Content Writer & Web Developer',
    period: '2025',
    details: [
      'Menulis konten properti untuk website perusahaan.',
      'Membuat Website.',
      'Membuat artikel SEO-friendly untuk meningkatkan visibilitas online.',
    ]
  }
]

const skills = [
  {
    category: 'Frontend',
    items: ['HTML', 'CSS', 'JavaScript', 'Vue.js', 'Tailwind CSS', 'Bootstrap', 'React']
  },
  {
    category: 'Backend',
    items: ['Node.js', 'Express', 'PHP', 'Laravel', 'Python', 'Java']
  },
  {
    category: 'Database & Tools',
    items: ['PostgreSQL', 'Supabase', 'Git', 'Cloudinary', 'Figma', 'VS Code', 'Neon', 'Vercel', 'GitHub','phpMyAdmin']
  },
  {
    category: 'Soft Skills',
    items: ['Content Writing', 'Komunikasi', 'Teamwork', 'Problem Solving', 'Time Management', 'SEO Writing', 'Critical Thinking']
  }
]

const languages = [
  { name: 'Bahasa Indonesia', level: 'Native' },
  { name: 'English', level: 'Basic' },
]

const downloading = ref(false)

const downloadPDF = async () => {
  downloading.value = true

  // Load html2pdf dari CDN
  await new Promise((resolve) => {
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js'
    script.onload = resolve
    document.head.appendChild(script)
  })

  const element = document.getElementById('cv-content')

  const opt = {
    margin: [10, 10, 10, 10],
    filename: 'CV_Bintang_Brillian_Hakim.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, backgroundColor: '#ffffff' },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  }

  // Sementara ubah warna teks jadi hitam untuk PDF
  element.classList.add('pdf-mode')

  await window.html2pdf().set(opt).from(element).save()

  element.classList.remove('pdf-mode')
  downloading.value = false
}
</script>

<style>
.pdf-mode,
.pdf-mode * {
  color: black !important;
  background: white !important;
  border-color: #e5e7eb !important;
}

@media print {
  nav, button, .no-print { display: none !important; }
  body { background: white !important; color: black !important; }
  section { padding: 0 !important; min-height: unset !important; }
  #cv-content * { border-color: #e5e7eb !important; color: black !important; background: white !important; }
}
</style>
<template>
  <section class="bg-black text-white min-h-[calc(100vh-120px)] px-6 py-16">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Who I Am</p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          About <span class="text-gray-400">Me</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- BIO + SIDE INFO -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">

        <!-- BIO TEXT -->
        <div class="md:col-span-2 space-y-5 text-gray-300 leading-7 text-[15px]">
          <p>
            Saya adalah mahasiswa <span class="text-white font-medium">Teknik Informatika semester 8</span>
            yang memiliki ketertarikan pada pengembangan website dan dunia teknologi secara umum.
            Ketertarikan ini membuat saya aktif mengerjakan berbagai proyek web, baik untuk
            kebutuhan perkuliahan maupun proyek pribadi.
          </p>
          <p>
            Selama kuliah, saya banyak mempelajari pengembangan aplikasi berbasis web, mulai dari
            perancangan antarmuka, implementasi logika program, hingga pengelolaan data. Saya
            terbiasa mengerjakan proyek menggunakan <span class="text-white font-medium">framework modern</span>
            serta berusaha menulis kode yang rapi dan mudah dipelajari.
          </p>
          <p>
            Selain fokus pada dunia akademik, saya juga aktif menulis artikel di website pribadi
            dan pernah menjalani pengalaman magang sebagai
            <span class="text-white font-medium">content writer di bidang properti</span>.
            Aktivitas ini membantu saya melatih kemampuan komunikasi, berpikir terstruktur,
            serta menyampaikan ide secara jelas.
          </p>
        </div>

        <!-- SIDE CARD -->
        <div class="space-y-4">
          <div
            v-for="info in sideInfo"
            :key="info.label"
            class="border border-neutral-800 rounded-xl px-5 py-4 hover:border-neutral-600 transition"
          >
            <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-1">{{ info.label }}</p>
            <p class="text-sm text-white font-medium">{{ info.value }}</p>
          </div>
        </div>
      </div>

      <!-- SKILLS -->
      <div>
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">Tech Stack</p>
        <h2 class="text-2xl font-bold mb-8">Skills</h2>

        <div class="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-4">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="group flex flex-col items-center gap-3 border border-neutral-800 rounded-xl py-5 px-3 hover:border-neutral-500 hover:bg-neutral-900 transition cursor-default"
          >
            <img
              :src="skill.icon"
              :alt="skill.name"
              class="h-10 w-10 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <span class="text-xs text-gray-400 group-hover:text-white transition text-center">
              {{ skill.name }}
            </span>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup>
const sideInfo = [
  { label: 'Status', value: 'Mahasiswa Semester 8' },
  { label: 'Jurusan', value: 'Teknik Informatika' },
  { label: 'Fokus', value: 'Web Development' },
  { label: 'Pengalaman', value: 'Magang Content Writer' },
]

const skills = [
  {
    name: 'HTML',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg',
  },
  {
    name: 'CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg',
  },
  {
    name: 'JavaScript',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg',
  },
  {
    name: 'Vue.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  {
    name: 'PHP',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg',
  },
  {
    name: 'Laravel',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg',
  },
  {
    name: 'Java',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
  },
  {
    name: 'C++',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
]
</script>
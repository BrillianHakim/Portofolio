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
    Saya adalah lulusan S-1
    <span class="text-white font-medium">Teknik Informatika dari ITN Malang</span>
    dengan minat yang kuat pada pengembangan website dan teknologi. Saya memiliki
    ketertarikan pada proses pengembangan aplikasi, khususnya dalam membangun
    website yang fungsional dan mudah digunakan.
  </p>

  <p>
    Saya memiliki pengalaman dalam pengembangan
    <span class="text-white font-medium">front-end dan back-end</span>
    menggunakan berbagai teknologi seperti Next.js, Laravel, PostgreSQL,
    Supabase, MySQL, Vercel, Git, dan Figma. Dalam mengerjakan proyek, saya
    terbiasa bekerja secara mandiri maupun berkolaborasi dalam tim serta berusaha
    menghasilkan kode dan tampilan yang terstruktur.
  </p>

  <p>
    Selain pengembangan web, saya juga memiliki pengalaman
    <span class="text-white font-medium">magang dalam pembuatan artikel dan optimasi SEO</span>.
    Pengalaman tersebut membantu saya mengembangkan kemampuan menulis,
    berkomunikasi, dan menyampaikan informasi secara terstruktur. Saya merupakan
    pribadi yang adaptif dan memiliki dedikasi untuk terus mempelajari
    perkembangan teknologi terbaru.
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
  { label: 'Status', value: 'Lulusan Teknik Informatika' },
  { label: 'Fokus', value: 'Web Development dan SEO' },
  { label: 'Pengalaman Magang', value: 'Jitu Property sebagai Web Development, SEO Analyst, dan Content Writter' },
  { label: 'Pengalaman Kerja', value: 'Driver ShopeeFood, Suveyor Fotografi, Freelance' },
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
    name: 'Next.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg',
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
    name: 'Flask',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg',
  },
  {
    name: 'Node.js',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg',
  },
  {
    name: 'PostgreSQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg',
  },
  {
    name: 'MySQL',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg',
  },
  {
    name: 'Supabase',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/supabase/supabase-original.svg',
  },
  {
    name: 'Git',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg',
  },
  {
    name: 'Vercel',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vercel/vercel-original.svg',
  },
  {
    name: 'Figma',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg',
  },
  {
    name: 'Vue',
    icon:'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg',
  },
  { 
    name: 'Java',
     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg',
   },
  {
    name: 'Python',
     icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg',
  },
  {
    name: 'C++',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg',
  },
  {
    name: 'C#',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/csharp/csharp-original.svg',
  },
  {
    name: 'Tailwind CSS',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg',
  },
  {
    name: 'Bootstrap',
    icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bootstrap/bootstrap-original.svg',
  },
];
</script>
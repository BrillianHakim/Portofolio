<template>
  <section class="bg-black text-white min-h-screen px-6 py-16">
    <div class="w-full max-w-5xl mx-auto">

      <!-- HEADER -->
      <div class="mb-16">
        <p class="text-xs tracking-[0.3em] text-gray-500 uppercase mb-3">
          Admin Panel
        </p>
        <h1 class="text-5xl font-bold tracking-tight leading-tight">
          Dashboard <span class="text-gray-400">Control</span>
        </h1>
        <div class="mt-4 h-px w-16 bg-white"></div>
      </div>

      <!-- MENU GRID -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">

        <!-- CARD -->
        <router-link
          to="/admin/projects"
          class="group border border-neutral-800 rounded-xl px-6 py-6 hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
            Manage
          </p>
          <h2 class="text-xl font-semibold mb-2">Projects</h2>
          <p class="text-gray-400 text-sm group-hover:text-gray-200 transition">
            Add, edit, or delete projects.
          </p>
        </router-link>

        <router-link
          to="/admin/achievements"
          class="group border border-neutral-800 rounded-xl px-6 py-6 hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
            Manage
          </p>
          <h2 class="text-xl font-semibold mb-2">Achievements</h2>
          <p class="text-gray-400 text-sm group-hover:text-gray-200 transition">
            Manage certificates and achievements.
          </p>
        </router-link>

        <router-link
          to="/admin/contacts"
          class="group border border-neutral-800 rounded-xl px-6 py-6 hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
            Inbox
          </p>
          <h2 class="text-xl font-semibold mb-2">Contacts</h2>
          <p class="text-gray-400 text-sm group-hover:text-gray-200 transition">
            View incoming messages.
          </p>
        </router-link>

        <router-link
          to="/admin/chat"
          class="group border border-neutral-800 rounded-xl px-6 py-6 hover:border-neutral-500 hover:bg-neutral-900 transition"
        >
          <p class="text-[10px] tracking-widest text-gray-500 uppercase mb-2">
            Monitor
          </p>
          <h2 class="text-xl font-semibold mb-2">Chat</h2>
          <p class="text-gray-400 text-sm group-hover:text-gray-200 transition">
            Monitor chat messages.
          </p>
        </router-link>

      </div>

    </div>
  </section>
</template>
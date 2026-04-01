<template>
  <div class="min-h-screen flex flex-col bg-black text-white">
    <Navbar />
    <router-view class="flex-1" />
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

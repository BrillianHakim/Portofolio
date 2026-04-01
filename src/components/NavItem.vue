<template>
  <li>
    <RouterLink
      :to="to"
      class="hover:text-blue-400 transition"
      @click="$emit('click')"
    >
      {{ text }}
    </RouterLink>
  </li>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  to: String,
  text: String
})
</script>

<script setup>
defineProps({
  description: String
})
</script>

<template>
  <p class="mb-3 text-lg text-light-100">
    {{ description }}
  </p>
</template>

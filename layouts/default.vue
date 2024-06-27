<script setup>
const route = useRoute()
</script>

<template>
  <v-app full-height :class="route.name === 'index' ? 'bg-white' : 'bg-grey-lighten-5'">
    <AppBarDefault />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

<script setup>
useHead({
  title: 'Home'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ['user-only']
})
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex justify-center align-center">
        <v-card>
          <v-card-text>
            Welcome to Fall Armyworm Monitor admin dashboard
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const
  itemsAdmin = ref([
    // { to: '/monitor-scouting-data', icon: 'mdi-account-details-outline', title: 'Scouting Data' },
  ])
</script>

<template>
  <v-divider class="my-2" />

  <v-list-subheader>Monitoring Panel</v-list-subheader>

  <v-list-item v-for="item in itemsAdmin" :key="item.title" :to="item.to">
    <template v-slot:prepend>
      <v-icon :icon="item.icon" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
  </v-list-item>
</template>

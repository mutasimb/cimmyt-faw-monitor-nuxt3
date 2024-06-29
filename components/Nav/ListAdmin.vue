<script setup>
const
  itemsAdmin = ref([
    // { to: '/admin-user-access', icon: 'mdi-account-key-outline', title: 'User Access' },
    // { to: '/admin-manage-seasons', icon: 'mdi-list-box-outline', title: 'Seasons Management' },
    // { to: '/admin-manage-collectors', icon: 'mdi-account-group-outline', title: 'Data Collectors Management' },
  ])
</script>

<template>
  <v-divider class="my-2" />

  <v-list-subheader>Admin Panel</v-list-subheader>

  <v-list-item v-for="item in itemsAdmin" :key="item.title" :to="item.to">
    <template v-slot:prepend>
      <v-icon :icon="item.icon" />
    </template>
    <v-list-item-title>{{ item.title }}</v-list-item-title>
  </v-list-item>
</template>

<script setup>
import { storeToRefs } from 'pinia'

import { useUIStore } from '@/stores/ui'

const
  { start, finish } = useLoadingIndicator(),
  { logout } = useAuth(),
  storeUI = useUIStore(),

  { leftDrawer } = storeToRefs(storeUI),

  onLogOut = async () => {
    try {
      start()

      await logout()
      await navigateTo("/")
    } catch (error) {
      console.log(error)
    } finally {
      finish()
    }
  }
</script>

<template>
  <v-app-bar flat border class="px-2">

    <template #prepend>
      <v-app-bar-nav-icon variant="text" @click.stop="leftDrawer = !leftDrawer" />

      <v-avatar>
        <v-img src="/img/logos/faw-logo.png" />
      </v-avatar>
    </template>

    <v-app-bar-title class="font-weight-bold">FAW Monitor</v-app-bar-title>

    <template #append>
      <v-btn variant="text" @click="onLogOut">Log out</v-btn>
    </template>

  </v-app-bar>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import { useDisplay } from 'vuetify'

import { useUIStore } from '@/stores/ui'

const
  { mobile } = useDisplay(),
  storeUI = useUIStore(),

  { leftDrawer } = storeToRefs(storeUI)

leftDrawer.value = !mobile.value
</script>

<template>
  <v-navigation-drawer v-model="leftDrawer" :permanent="!mobile">
    <v-list>

      <v-list-item to="/user">
        <template v-slot:prepend>
          <v-icon icon="mdi-home-outline" />
        </template>

        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>

      <NavListAdmin />
      <NavListMonitor />

    </v-list>
  </v-navigation-drawer>
</template>

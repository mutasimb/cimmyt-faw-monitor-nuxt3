<script setup>
import { storeToRefs } from 'pinia'
import * as d3 from 'd3-time-format'

import { useAdminSeasonsStore } from '@/stores/admin-seasons'

useHead({
  title: 'Seasons Management'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ["admin-only"]
})

const
  storeAdminSeasons = useAdminSeasonsStore(),
  { seasonsList, dialogFormSeason } = storeToRefs(storeAdminSeasons),

  headers = computed(() => {
    return [
      { title: 'Code', key: 'code', align: 'start', sortable: false },
      { title: 'Name', key: 'name', align: 'start', sortable: false },
      { title: 'Season', key: 'season', align: 'start', sortable: false },
      { title: 'Crops', key: 'crops', align: 'start', sortable: false },
      { title: 'Traps', key: 'nTrap', align: 'end', sortable: false },
      { title: 'Date Start', key: 'date', align: 'end', sortable: false, value: item => d3.timeFormat('%B %-d, %Y')(item.date) },
      { title: 'Default', key: 'default', align: 'center', sortable: false, value: item => item.default },
      { title: 'Actions', key: 'actions', align: 'center', sortable: false }
    ]
  }),

  onAddNew = () => { dialogFormSeason.value = true; },
  onEdit = item => { console.log(item); }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col>
        <v-card variant="outlined" class="bg-white">
          <v-data-table :headers="headers" :items="seasonsList" items-per-page="-1" density="compact">

            <template #top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Seasons</v-toolbar-title>
                <v-spacer />
                <v-btn variant="flat" color="black" class="ml-2" @click="onAddNew">Add New</v-btn>
              </v-toolbar>
            </template>

            <template #item.actions="{ item }">
              <v-btn size="x-small" variant="flat" color="black" icon="mdi-pencil" disabled
                @click="() => onEdit(item)" />
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <AdminFormSeasonNew />
  </v-container>
</template>

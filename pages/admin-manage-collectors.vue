<script setup>
import { storeToRefs } from 'pinia';

import { useAdminCollectorsStore } from '@/stores/admin-collectors';
import { useAdminSeasonsStore } from '@/stores/admin-seasons';

useHead({
  title: 'Data Collectors Management'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ["admin-only"]
})

const
  storeAdminCollector = useAdminCollectorsStore(),
  storeAdminSeasons = useAdminSeasonsStore(),
  {
    collectors,
    seasonSelected,
    dialogNewUsers
  } = storeToRefs(storeAdminCollector),
  { seasonsList } = storeToRefs(storeAdminSeasons),

  headers = computed(() => [
    { title: 'Division', key: 'adm.adm1', align: 'start', sortable: false },
    { title: 'District', key: 'adm.adm2', align: 'start', sortable: false },
    { title: 'Upazila', key: 'adm.adm3', align: 'start', sortable: false },
    { title: 'Union', key: 'adm.adm4', align: 'start', sortable: false },
    { title: 'Name', key: 'name', align: 'start', sortable: false },
    { title: 'Phone Number', key: 'phone', align: 'end', sortable: false },
    { title: 'Actions', key: 'actions', align: 'center', sortable: false }
  ]),

  onSelectSeason = seasonId => {
    storeAdminCollector.getCollectors(seasonId)
  },
  onLoadUser = () => {
    dialogNewUsers.value = true
  },
  onChangePassword = item => {
    storeAdminCollector.changePasswordCollector(item)
  }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col>
        <v-card variant="outlined" class="bg-white">
          <v-data-table :headers="headers" :items="collectors" items-per-page="30" density="compact">

            <template #top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Data Collectors</v-toolbar-title>
                <v-spacer />
                <v-select v-model="seasonSelected" :items="seasonsList" item-title="name" item-value="_id"
                  density="compact" label="Seasons" variant="outlined" hide-details
                  @update:modelValue="onSelectSeason" />
                <v-btn variant="flat" color="black" class="ml-2" :disabled="!seasonSelected" @click="onLoadUser">Load
                  Users</v-btn>
              </v-toolbar>
            </template>

            <template #item.actions="{ item }">
              <v-btn size="x-small" variant="flat" color="black" icon="mdi-key" @click="() => onChangePassword(item)" />
            </template>

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>

    <AdminDialogNewUsers />
    <AdminDialogPasswordCollector />
  </v-container>
</template>

<script setup>
useHead({
  title: 'Scouting Progress'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ["admin-only"]
})

const
  storeAdminSeasons = useAdminSeasonsStore(),
  { seasonsList } = storeToRefs(storeAdminSeasons),

  storeMonitorProgress = useMonitorProgressStore(),
  { seasonSelected } = storeToRefs(storeMonitorProgress),

  onSelectSeason = async seasonId => { storeMonitorProgress.getSeasonData(seasonId) }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col>
        <v-card variant="outlined" class="bg-white pa-2 overflow-auto">
          <v-select v-model="seasonSelected" :items="seasonsList" item-title="name" item-value="_id" density="compact"
            label="Seasons" variant="outlined" hide-details @update:modelValue="onSelectSeason" />
          <HeatMap />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

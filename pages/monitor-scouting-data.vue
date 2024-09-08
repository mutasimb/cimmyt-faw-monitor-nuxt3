<script setup>
import { storeToRefs } from 'pinia'
import * as d3 from 'd3-time-format'

import { useScoutingsStore } from '@/stores/scoutings'
import { useAdminSeasonsStore } from '@/stores/admin-seasons'

useHead({
  title: 'Scouting Data'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ["admin-only"]
})

const
  storeScoutings = useScoutingsStore(),
  { scoutingsMonitoringList, seasonSelected } = storeToRefs(storeScoutings),

  storeAdminSeasons = useAdminSeasonsStore(),
  { seasonsList } = storeToRefs(storeAdminSeasons),

  headers = [
    {
      title: 'Area',
      key: 'area',
      align: 'start',
      sortable: false,
      value: item => `${item.adm4} Union, ${item.adm3} Upazila, ${item.adm2}`
    },
    // { title: 'Division', key: 'adm1', align: 'start', sortable: false },
    // { title: 'District', key: 'adm2', align: 'start', sortable: false },
    // { title: 'Upazila', key: 'adm3', align: 'start', sortable: false },
    // { title: 'Union', key: 'adm4', align: 'start', sortable: false },
    { title: 'Data Collector', key: 'user', align: 'start', sortable: false },
    { title: 'Submission Time', key: 'submissionTime', align: 'end', sortable: true, value: item => d3.timeFormat('%B %-d, %Y at %-I:%M %p')(item.submissionTime) },
    { title: 'Crop', key: 'crop', align: 'start', sortable: false },
    { title: 'Trap', key: 'tag', align: 'end', sortable: false },
    { title: 'Stage', key: 'stage', align: 'end', sortable: false },
    { title: 'Moth Count', key: 'moth', align: 'end', sortable: false },
    { title: 'SFW Infestation', key: 'sfw', align: 'end', sortable: false },
    { title: 'IW Infestation', key: 'iw', align: 'end', sortable: false },
    { title: 'Cob Infestation', key: 'cob', align: 'end', sortable: false },
  ],

  onSelectSeason = seasonId => {
    storeScoutings.getScoutings(seasonId)
  }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col>
        <v-card variant="outlined" class="bg-white">
          <v-data-table :headers="headers" :items="scoutingsMonitoringList" items-per-page="30" density="compact">

            <template #top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Scouting Data</v-toolbar-title>
                <v-spacer />
                <v-select v-model="seasonSelected" class="mr-2" :items="seasonsList" item-title="name" item-value="_id"
                  density="compact" label="Seasons" variant="outlined" hide-details
                  @update:modelValue="onSelectSeason" />
                <!-- <v-btn
                  variant="flat"
                  color="black"
                  class="ml-2"
                  :disabled="!seasonSelected"
                  @click="onLoadUser"
                >Load Users</v-btn> -->
              </v-toolbar>
            </template>

            <!-- <template #item.actions="{ item }">
              <v-btn
                size="x-small"
                variant="flat"
                color="black"
                icon="mdi-key"
                @click="() => onChangePassword(item)"
              />
            </template> -->

          </v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

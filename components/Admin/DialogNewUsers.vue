<script setup>
import { storeToRefs } from 'pinia'
import Papa from 'papaparse'

import { useAdminCollectorsStore } from '@/stores/admin-collectors'

const
  storeAdminCollectors = useAdminCollectorsStore(),
  {
    seasonSelected,

    dialogNewUsers,
    csv,
    batch,
    password
  } = storeToRefs(storeAdminCollectors),

  files = ref([]),

  onLoad = ([file]) => {
    if (file) Papa.parse(file, {
      complete: results => { csv.value = results.data },
      header: true,
      dynamicTyping: false
    })
  },
  onSubmit = async () => {
    await storeAdminCollectors.postNewUsers({
      season: seasonSelected.value,
      csv: csv.value,
      batch: batch.value,
      password: password.value
    })

    dialogNewUsers.value = false
    files.value = []
    csv.value = []
    batch.value = ''
    password.value = ''
  }
</script>

<template>
  <v-dialog width="480" v-model="dialogNewUsers">
    <v-card title="Load New Users">
      <template #append>
        <v-btn
          variant="flat"
          append-icon="mdi-download"
          tag="a"
          href="/data/240129_faw-monitor-users.csv"
          download
        >Download sample</v-btn>
      </template>
      <v-card-text>
        <v-file-input
          v-model="files"
          label="Load user data (.csv)"
          accept=".csv, text/csv"
          variant="outlined"
          @update:modelValue="onLoad"
        />
        <v-text-field
          v-model="batch"
          label="Batch Name"
          variant="outlined"
        />
        <v-text-field
          v-model="password"
          label="Batch Password"
          variant="outlined"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="black"
          variant="text"
          text="Dismiss"
          @click="() => { dialogNewUsers = false }"
        />
        <v-btn
          color="black"
          variant="flat"
          text="Submit"
          @click="onSubmit"
        />
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

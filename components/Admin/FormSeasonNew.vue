<script setup>
import { storeToRefs } from 'pinia'

import { useAdminSeasonsStore } from '@/stores/admin-seasons'

const
  storeAdminSeasons = useAdminSeasonsStore(),
  {
    dialogFormSeason,

    code,
    name,
    season,
    nTrap,
    iY,
    im,
    id
  } = storeToRefs(storeAdminSeasons),

  onSubmit = async () => {
    try {
      await storeAdminSeasons.postNewSeason();
      dialogFormSeason.value = false;

      code.value = '';
      name.value = '';
      season.value = null;
      nTrap.value = null;
      iY.value = null;
      im.value = null;
      id.value = null;
    } catch (err) {
      console.error(err);
    }
  },
  onDismiss = () => {
    dialogFormSeason.value = false;
    code.value = '';
    name.value = '';
    season.value = null;
    nTrap.value = null;
    iY.value = null;
    im.value = null;
    id.value = null;
  };
</script>

<template>
  <v-dialog width="360" v-model="dialogFormSeason">

    <v-card title="New Season">
      <v-form @submit.prevent="onSubmit">

        <v-card-text>
          <v-text-field v-model="code" label="Code" variant="outlined" />
          <v-text-field v-model="name" label="Name" variant="outlined" />
          <v-select v-model="season" label="Season" variant="outlined" :items="['Robi', 'Kharif-1', 'Kharif-2']" />
          <v-text-field v-model="nTrap" label="Traps" variant="outlined" type="number" />
          <v-text-field v-model="iY" label="Start Date Year" variant="outlined" type="number" />
          <v-text-field v-model="im" label="Start Date Month" variant="outlined" type="number" />
          <v-text-field v-model="id" label="Start Date Day" variant="outlined" type="number" />
        </v-card-text>

        <v-card-actions>
          <v-spacer />
          <v-btn color="black" variant="text" text="Dismiss" @click="onDismiss" />
          <v-btn color="black" variant="flat" text="Submit" type="submit" />
        </v-card-actions>

      </v-form>

    </v-card>
  </v-dialog>
</template>

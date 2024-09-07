<script setup>
import { storeToRefs } from 'pinia';

import { useAdminStore } from '@/stores/admin';

const
  storeAdmin = useAdminStore(),
  {
    id,
    name,
    role,
    title,
    org,
    phone,

    displayDialogEdit
  } = storeToRefs(storeAdmin),

  onSubmit = async () => {
    try {
      await storeAdmin.postEditAdmin();
      displayDialogEdit.value = false;

      id.value = '';

      name.value = '';
      role.value = null;
      title.value = '';
      org.value = '';
      phone.value = '';
    } catch (err) {
      console.error(err);
    }
  },
  onDismiss = () => {
    displayDialogEdit.value = false;

    id.value = '';
    name.value = '';
    role.value = null;
    title.value = '';
    org.value = '';
    phone.value = '';
  };
</script>

<template>
  <v-dialog width="360" v-model="displayDialogEdit">

    <v-card title="Edit Admin User">

      <v-form @submit.prevent="onSubmit">

        <v-card-text>
          <v-text-field v-model="name" label="Name" variant="outlined" />
          <v-select v-model="role" label="Role" variant="outlined" :items="['Moderator', 'User Manager']" />
          <v-text-field v-model="title" label="Title" variant="outlined" />
          <v-text-field v-model="org" label="Organization" variant="outlined" />
          <v-text-field v-model="phone" label="Phone" variant="outlined" type="number" />
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="black" variant="text" text="Dismiss" @click="onDismiss" />
          <v-btn color="black" variant="flat" text="Submit" type="submit" />
        </v-card-actions>

      </v-form>

    </v-card>
  </v-dialog>
</template>

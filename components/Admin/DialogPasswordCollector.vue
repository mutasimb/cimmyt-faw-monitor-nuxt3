<script setup>
import { storeToRefs } from 'pinia';

import { useAdminCollectorsStore } from '@/stores/admin-collectors';

const
  storeAdminCollectors = useAdminCollectorsStore(),
  {
    displayDialogPassword,
    displayPasswordUserName,
    displayPasswordUserPhone,
    displayPassword
  } = storeToRefs(storeAdminCollectors),

  onDismiss = () => {
    displayDialogPassword.value = false
    displayPasswordUserName.value = ''
    displayPasswordUserPhone.value = ''
    displayPassword.value = ''
  }
</script>

<template>
  <v-dialog width="360" v-model="displayDialogPassword">
    <v-card title="New Password">

      <v-card-text>
        Login credentials for {{ displayPasswordUserName }}:
      </v-card-text>
      <v-card-text class="py-0">
        ID: <span class="font-weight-bold">{{ displayPasswordUserPhone }}</span>
      </v-card-text>
      <v-card-text class="pt-0">
        Password: <span class="font-weight-bold">{{ displayPassword }}</span>
      </v-card-text>

      <v-card-actions>
        <v-spacer />
        <v-btn color="black" variant="text" text="Dismiss" @click="onDismiss" />
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

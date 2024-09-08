<script setup>
import { storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

const
  storeSnackbar = useSnackbarStore(),
  { message, messageType } = storeToRefs(storeSnackbar),

  snackbar = ref(false),
  color = ref('black'),
  text = ref('');

watch(message, val => {
  if (val) {
    color.value = messageType.value ? messageType.value : 'black'
    snackbar.value = true;
    text.value = val;
    message.value = '';
  }
});
</script>

<template>
  <v-snackbar v-model="snackbar" :timeout="5000" :color="color">
    {{ text }}
    <template #actions>
      <v-btn color="white" variant="text" @click="snackbar = false">Close</v-btn>
    </template>
  </v-snackbar>
</template>

import { defineStore } from 'pinia';

export const useSnackbarStore = defineStore('snackbar', () => {
  const
    message = ref(''),
    messageType = ref('');

  return { message, messageType }
})

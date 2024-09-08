import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useMonitorProgressStore = defineStore('monitor-progress', () => {
  const { start, finish } = useLoadingIndicator()

  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    seasonSelected = ref(null),
    seasonSelectedData = ref(null)

  const
    getSeasonData = async seasonId => {
      try {
        start()
        const data = await $fetch(`/api/admin/progress/${ seasonId }`)

        seasonSelectedData.value = data
      } catch (error) {
        seasonSelectedData.value = null

        messageType.value = 'error'
        message.value = error.value.statusMessage
      } finally {
        finish()
      }
    }

  return {
    seasonSelected,
    seasonSelectedData,

    getSeasonData
  }
})

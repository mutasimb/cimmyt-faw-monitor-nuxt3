import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useScoutingsStore = defineStore('scoutings', () => {
  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    scoutingsMonitoring = ref([]),
    seasonSelected = ref(null),

    scoutingsMonitoringList = computed(
      () => scoutingsMonitoring.value.map(
        el => ({
          submissionTime: new Date(el.submissionTime),
          user: el.user.name,
          adm1: el.adm1.name,
          adm2: el.adm2.name,
          adm3: el.adm3.name,
          adm4: el.adm4.name,
          crop: el.crop,
          tag: el.tag,
          stage: el.stage,
          moth: el.moth,
          sfw: el.sfw,
          iw: el.iw,
          cob: el.cob
        })
      )
    )

  const
    getScoutings = async season => {
      const { data, error } = await useFetch('/api/scoutings', {
        query: { season }
      })

      if (error.value) {
        scoutingsMonitoring.value = []

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { scoutings } = toRaw(data.value)
        scoutingsMonitoring.value = scoutings
      }
    }

  return {
    scoutingsMonitoringList,
    seasonSelected,

    getScoutings
  }
})

import { defineStore/* , storeToRefs */ } from 'pinia';

// import { useSnackbarStore } from '@/stores/snackbar';

export const useSeasonsStore = defineStore('seasons', () => {
  // const
  //   storeSnackbar = useSnackbarStore(),
  //   { messageType, message } = storeToRefs(storeSnackbar)

  const
    seasons = ref([]),

    getSeasons = () => new Promise((resolve, reject) => {
      $fetch('/api/seasons')
        .then(res => {
          seasons.value = res.seasons
          resolve(res)
        })
        .catch(err => { reject(err) })
    })

  return { seasons, getSeasons }
})

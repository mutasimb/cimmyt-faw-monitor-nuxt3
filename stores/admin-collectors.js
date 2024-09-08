import { defineStore, storeToRefs } from 'pinia';

import { useSnackbarStore } from '@/stores/snackbar';

export const useAdminCollectorsStore = defineStore('admin-collectors', () => {
  const
    storeSnackbar = useSnackbarStore(),
    { messageType, message } = storeToRefs(storeSnackbar)

  const
    collectors = ref([]),
    seasonSelected = ref(null)

  const
    dialogNewUsers = ref(false),
    csv = ref([]),
    batch = ref(''),
    password = ref('')

  const
    displayDialogPassword = ref(false),
    displayPasswordUserName = ref(''),
    displayPasswordUserPhone = ref(''),
    displayPassword = ref('')

  const
    getCollectors = async seasonId => {
      const { data, error } = await useFetch(`/api/admin/collectors/${ seasonId }`)

      if (error.value) {
        collectors.value = []

        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { users } = toRaw(data.value)
        collectors.value = users
      }
    },
    postNewUsers = async ({ season, csv, batch, password }) => {
      const { data, error } = await useFetch('/api/admin/collectors/new', {
        method: 'post',
        body: { season, csv: [...csv.map(el => toRaw(el))], batch, password }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { users } = toRaw(data.value)
        collectors.value = users
      }
    },
    changePasswordCollector = async user => {
      const { data, error } = await useFetch('/api/admin/collectors/change-password', {
        method: 'patch',
        body: { id: user._id }
      })

      if (error.value) {
        messageType.value = 'error'
        message.value = error.value.statusMessage
      }

      if (data.value) {
        const { savedpassword } = toRaw(data.value)

        displayDialogPassword.value = true
        displayPasswordUserName.value = user.name
        displayPasswordUserPhone.value = user.phone
        displayPassword.value = savedpassword
      }
    }

  return {
    collectors,
    seasonSelected,

    dialogNewUsers,
    csv,
    batch,
    password,

    displayDialogPassword,
    displayPasswordUserName,
    displayPasswordUserPhone,
    displayPassword,

    getCollectors,
    postNewUsers,
    changePasswordCollector
  }
})

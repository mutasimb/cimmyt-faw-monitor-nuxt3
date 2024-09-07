import { defineStore } from 'pinia';

// import { useSnackbarStore } from '@/stores/snackbar';

export const useAdminStore = defineStore('admin', () => {
  // const
    // storeSnackbar = useSnackbarStore(),
    // { messageType, message } = storeToRefs(storeSnackbar)

  const
    usersAdmin = ref([]),
    usersAdminSorted = computed(() => {
      return !usersAdmin.value || !usersAdmin.value.length ? []
        : usersAdmin.value
        .map(el => ({
          ...el,
          roleIndex: el.role === 'Super Admin' ? 1
            : el.role === 'Moderator' ? 2
              : el.role === 'User Manager' ? 3 : null
        }))
        .sort((a, b) => a.roleIndex > b.roleIndex ? 1 : -1)
    }),

    name =  ref(''),
    role =  ref(null),
    title =  ref(''),
    org =  ref(''),
    phone =  ref(''),
    formData = computed(() => ({
      name: name.value,
      role: role.value,
      title: title.value,
      org: org.value,
      phone: phone.value
    }))

  const
    id = ref(''),
    displayDialogEdit = ref(false)

  const
    displayDialogPassword = ref(false),
    displayPasswordUserName = ref(''),
    displayPasswordUserPhone = ref(''),
    displayPassword = ref('')

  const
    getUsersAdmin = () => new Promise((resolve, reject) => {
      $fetch('/api/admin/users')
        .then(res => {
          usersAdmin.value = res.admins;
          resolve(res.admins);
        })
        .catch(err => {
          usersAdmin.value = []
          reject(err);
        })
    }),
    postNewAdmin = () => new Promise((resolve, reject) => {
      $fetch('/api/admin/new', { method: 'post', body: formData.value })
        .then(res => {
          const { savedUser, password } = res;
          usersAdmin.value.push(savedUser);

          displayPasswordUserName.value = savedUser.name;
          displayPasswordUserPhone.value = savedUser.phone;
          displayPassword.value = password;

          resolve(savedUser);
        })
        .catch(err => { reject(err); });
    }),
    postEditAdmin = () => new Promise((resolve, reject) => {
      $fetch('/api/admin/edit', { method: 'post', body: { id: id.value, ...formData.value } })
        .then(res => {
          const
            { savedUser } = res,
            index = usersAdmin.value.findIndex(el => el._id === savedUser._id);

          usersAdmin.value.splice(index, 1, savedUser);
          resolve(savedUser);
        })
        .catch(err => { reject(err) });
    }),
    changePasswordUserAdmin = user => new Promise((resolve, reject) => {
      $fetch('/api/admin/change-password', { method: 'patch', body: { id: user._id } })
        .then(res => {
          const { savedpassword } = res;

          displayDialogPassword.value = true;
          displayPasswordUserName.value = user.name;
          displayPasswordUserPhone.value = user.phone;
          displayPassword.value = savedpassword;

          resolve(savedpassword);
        })
        .catch(err => { reject(err); });
    }),
    deleteUserAdmin = user => new Promise((resolve, reject) => {
      $fetch('/api/admin/remove', { method: 'delete', body: { id: user._id } })
        .then(() => {
          const index = usersAdmin.value.findIndex(el => el._id === user._id);
          usersAdmin.value.splice(index, 1);

          resolve();
        })
        .catch(err => { reject(err); });
    });

  return {
    usersAdmin,
    usersAdminSorted,

    name,
    role,
    title,
    org,
    phone,

    id,
    displayDialogEdit,

    displayDialogPassword,
    displayPasswordUserName,
    displayPasswordUserPhone,
    displayPassword,
    
    getUsersAdmin,
    postNewAdmin,
    postEditAdmin,
    changePasswordUserAdmin,
    deleteUserAdmin
  }
})

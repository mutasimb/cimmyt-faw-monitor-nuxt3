<script setup>
import { storeToRefs } from 'pinia';

import { useAdminStore } from '@/stores/admin';

const
  user = useAuthUser(),
  storeAdmin = useAdminStore(),
  {
    name,
    role,
    title,
    org,
    phone,

    displayDialogPassword
  } = storeToRefs(storeAdmin),

  onSubmit = async () => {
    try {
      await storeAdmin.postNewAdmin()

      name.value = ''
      role.value = null
      title.value = ''
      org.value = ''
      phone.value = ''
    } catch (error) {
      console.error(error)
    }
  },
  passwordDisplay = () => {
    setTimeout(() => {
      displayDialogPassword.value = true
    }, 300)
  }
</script>

<template>
  <v-dialog width="360">

    <template #activator="{ props }">
      <v-btn v-if="['Super Admin', 'Moderator'].indexOf(user.role) > -1" v-bind="props" variant="flat" color="black">Add
        New</v-btn>
    </template>

    <template #default="{ isActive }">
      <v-card title="New Admin User">

        <v-form @submit.prevent="async () => {
          await onSubmit()
          isActive.value = false
          passwordDisplay()
        }">

          <v-card-text>
            <v-text-field v-model="name" label="Name" variant="outlined" />
            <v-select v-model="role" label="Role" variant="outlined" :items="['Moderator', 'User Manager']"/>
            <v-text-field v-model="title" label="Title" variant="outlined" />
            <v-text-field v-model="org" label="Organization" variant="outlined" />
            <v-text-field v-model="phone" label="Phone" variant="outlined" type="number" />
          </v-card-text>
  
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="black"
              variant="text"
              text="Dismiss"
              @click="() => {
                name = ''
                role = null
                title = ''
                org = ''
                phone = ''

                isActive.value = false
              }" />
            <v-btn
              color="black"
              variant="flat"
              text="Submit"
              type="submit"
            />
          </v-card-actions>

        </v-form>

      </v-card>
    </template>
  </v-dialog>
</template>

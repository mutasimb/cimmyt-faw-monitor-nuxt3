<script setup>
import { storeToRefs } from 'pinia';

import { useAdminStore } from '@/stores/admin';

useHead({
  title: 'User Access'
})

definePageMeta({
  layout: 'dashboard',
  middleware: ["admin-only"]
})

const
  storeAdmin = useAdminStore(),
  user = useAuthUser(),
  {
    usersAdminSorted,

    name,
    role,
    title,
    org,
    phone,

    id,
    displayDialogEdit
  } = storeToRefs(storeAdmin),

  headers = computed(() => {
    const
      roles = ["Super Admin", "Moderator"],
      returnable = [
        { title: 'Name', key: 'name', align: 'start', sortable: false },
        { title: 'Role', key: 'role', align: 'start', sortable: false },
        { title: 'Phone Number', key: 'phone', align: 'end', sortable: false }
      ]

    if (roles.indexOf(user.value.role) > -1) returnable.push({ title: 'Actions', key: 'actions', align: 'center', sortable: false })

    return returnable
  })

storeAdmin.getUsersAdmin()

const
  onEdit = item => {
    id.value = item._id
    name.value = item.name
    role.value = item.role
    title.value = item.title
    org.value = item.org
    phone.value = item.phone

    displayDialogEdit.value = true
  },
  onDelete = item => {
    storeAdmin.deleteUserAdmin(item)
  },
  onChangePassword = item => {
    storeAdmin.changePasswordUserAdmin(item)
  }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col>
        <v-card variant="outlined" class="bg-white">

          <v-data-table :headers="headers" :items="usersAdminSorted" items-per-page="-1">

            <template #top>
              <v-toolbar flat color="white">
                <v-toolbar-title>Users with Admin Access</v-toolbar-title>
                <v-spacer />
                <AdminFormNew />
              </v-toolbar>
            </template>

            <template #bottom />

            <template v-if="['Super Admin', 'Moderator'].indexOf(user.role) > -1" #item.actions="{ item }">
              <v-btn v-if="item.role !== 'Super Admin'" size="x-small" variant="flat" color="black" icon="mdi-pencil"
                @click="() => onEdit(item)" class="mr-2" />
              <v-btn v-if="item.role !== 'Super Admin'" size="x-small" variant="flat" color="black" icon="mdi-key"
                @click="() => onChangePassword(item)" class="mr-2" />
              <v-btn v-if="item.role !== 'Super Admin' && item._id !== user._id" size="x-small" variant="flat"
                color="black" icon="mdi-delete" @click="() => onDelete(item)" />
            </template>

          </v-data-table>

        </v-card>
      </v-col>
    </v-row>

    <AdminDialogPassword />
    <AdminFormEdit />
  </v-container>
</template>

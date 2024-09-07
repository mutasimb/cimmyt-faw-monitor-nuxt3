<script setup>
import { storeToRefs } from 'pinia'

useHead({
  title: 'Log In'
})

definePageMeta({
  middleware: ["guest-only"],
})

const
  { start, finish } = useLoadingIndicator(),
  { check, login } = useAuth(),

  phone = ref(''),
  password = ref(''),

  pendingPhone = ref(false),
  pendingLogin = ref(false),
  isVerified = ref(false),
  isPasswordDisabled = ref(true),

  onNumber = async () => {
    try {
      start()
      pendingPhone.value = true
      await check(phone.value)

      isVerified.value = true
      isPasswordDisabled.value = false
    } catch (error) {
      isVerified.value = false
    } finally {
      pendingPhone.value = false
      finish()
    }
  },
  onLogin = async () => {
    try {
      start()
      pendingLogin.value = true
      await login(phone.value, password.value)

      await navigateTo('/home')

    } catch (error) {
      console.log(error)
    } finally {
      pendingLogin.value = false
      finish()
    }
  }
</script>

<template>
  <v-container class="h-100">
    <v-row class="h-100">
      <v-col class="d-flex justify-center align-center">

        <v-card variant="outlined" class="bg-white w-100" style="max-width: 360px;">

          <v-card-item class="mb-4">
            <v-card-title>Login</v-card-title>
          </v-card-item>

          <v-card-text>
            <v-text-field class="mt-2" v-model="phone" label="Phone Number" type="number" variant="outlined"
              :disabled="pendingPhone || pendingLogin"
              @update:modelValue="() => { isPasswordDisabled = true; isVerified = false; }">
              <template v-if="!isVerified" v-slot:append-inner>
                <v-btn icon="mdi-send" variant="text" @click="onNumber" :disabled="pendingPhone || pendingLogin" />
              </template>
            </v-text-field>

            <v-text-field class="mt-2" v-model="password" label="Password" type="password" variant="outlined"
              :disabled="pendingLogin || isPasswordDisabled">
              <template v-if="isVerified" v-slot:append-inner>
                <v-btn icon="mdi-send" variant="text" :disabled="pendingLogin || isPasswordDisabled" @click="onLogin" />
              </template>
            </v-text-field>
          </v-card-text>

        </v-card>

      </v-col>
    </v-row>
  </v-container>
</template>

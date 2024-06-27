<script setup>
definePageMeta({
  middleware: ["guest-only"],
  layout: false,
});

const
  { login } = useAuth(),
  form = reactive({
    data: { phone: "", password: "" },
    error: "",
    pending: false,
  }),
  isAdmin = useAdmin(),

  onLoginClick = async () => {
    try {
      form.error = ""
      form.pending = true

      await login(form.data.phone, form.data.password)

      const redirect = isAdmin.value ? "/admin" : "/private"
      await navigateTo(redirect)
    } catch (error) {
      console.error(error)
      if (error.data.message) form.error = error.data.message
    } finally {
      form.pending = false
    }
  }
</script>

<template>
  <div>
    <header>
      <h1>Login to your account</h1>
    </header>
    <main>
      <form @submit.prevent="onLoginClick">
        <p v-if="form.error">{{ form.error }}</p>
        <div>
          <label for="phone">Phone Number</label>
          <input id="phone" v-model="form.data.phone" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input id="password" v-model="form.data.password" type="password" required />
        </div>
        <div>
          <button type="submit" :disabled="form.pending">Sign in</button>
        </div>
      </form>
      <div>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </main>
    <BaseFooter />
  </div>
</template>

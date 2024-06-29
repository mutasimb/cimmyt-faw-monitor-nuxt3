<script setup>
const
  currentUser = useAuthUser(),
  isAdmin = useAdmin(),
  { logout } = useAuth(),

  form = reactive({ pending: false }),

  onLogoutClick = async () => {
    try {
      form.pending = true;

      await logout();

      await navigateTo("/");
    } catch (error) {
      console.error(error);
    } finally {
      form.pending = false;
    }
  }
</script>

<template>
  <header>
    <div>
      <nav>
        <NuxtLink to="/">Auth example</NuxtLink>
        <div>
          <template v-if="currentUser">
            <NuxtLink to="/user">User</NuxtLink>
            <NuxtLink v-if="isAdmin" to="/admin">Admin</NuxtLink>
            <button :disabled="form.pending" @click="onLogoutClick">Logout</button>
          </template>
          <template v-else>
            <NuxtLink to="/guest">Public</NuxtLink>
            <NuxtLink to="/login">Login</NuxtLink>
          </template>
        </div>
      </nav>
    </div>
  </header>
</template>

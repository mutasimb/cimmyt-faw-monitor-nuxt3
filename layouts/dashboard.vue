<template>
  <v-app full-height class="bg-grey-lighten-5">
    <AppBarDashboard />
    <NavLeftList />
    <v-main>
      <slot />
    </v-main>
  </v-app>
</template>

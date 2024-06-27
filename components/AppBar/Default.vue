<script setup>
const
  route = useRoute(),

  partners = [
    { href: 'https://www.usaid.gov/', src: '/img/logos/usaid.png', label: 'USAID' },
    { href: 'http://dae.gov.bd/', src: '/img/logos/dae.png', label: 'DAE' },
    { href: 'https://www.cimmyt.org/', src: '/img/logos/cimmyt.png', label: 'CIMMYT' },
    { href: 'https://csisa.org/', src: '/img/logos/csisa.png', label: 'CSISA' },
    { href: 'http://www.bwmri.gov.bd/', src: '/img/logos/bwmri.png', label: 'BWMRI' },
    { href: 'http://www.bari.gov.bd/', src: '/img/logos/bari.png', label: 'BARI' },
    { href: 'http://www.brri.gov.bd/', src: '/img/logos/brri.png', label: 'BRRI' }
  ]
</script>

<template>
  <v-app-bar flat :border="route.name !== 'index'" class="pa-2">
    <template #prepend>
      <v-avatar>
        <v-img src="/img/logos/faw-logo.png" />
      </v-avatar>
    </template>

    <v-app-bar-title class="font-weight-bold">FAW Monitor</v-app-bar-title>

    <template #append v-if="route.name === 'index'">
      <v-menu>
        <template #activator="{ props }">
          <v-btn variant="text" v-bind="props" append-icon="mdi-chevron-down">Partners</v-btn>
        </template>

        <v-list density="comfortable">
          <v-list-item v-for="partner in partners" :key="partner.label" :href="partner.href" target="_blank">
            <template #prepend>
              <v-avatar rounded="0"><v-img :src="partner.src" /></v-avatar>
            </template>

            <v-list-item-title>{{ partner.label }}</v-list-item-title>

          </v-list-item>
        </v-list>
      </v-menu>

      <v-avatar>
        <v-img src="/img/logos/gob.png" />
      </v-avatar>
    </template>

    <template #append v-else>
      <v-btn variant="text" href="/">Home</v-btn>
    </template>
  </v-app-bar>
</template>

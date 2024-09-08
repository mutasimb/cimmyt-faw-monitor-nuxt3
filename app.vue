<script setup>
useHead({
  titleTemplate: str => (str ? `${str} - ` : '') + 'Fall Armyworm Monitor'
})

const storeSeason = useSeasonsStore()
await useAsyncData('seasons', () => storeSeason.getSeasons().then(res => res.seasons))
</script>

<template>
  <Html lang="en">

  <Body>
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <Snackbar />
  </Body>

  </Html>
</template>

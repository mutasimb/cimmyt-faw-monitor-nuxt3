import { defineStore } from 'pinia';

export const useUIStore = defineStore('ui', () => {
  const leftDrawer = ref(true)

  return { leftDrawer }
})

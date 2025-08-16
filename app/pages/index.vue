<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100">
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="text-2xl font-bold text-white drop-shadow-lg">Ładowanie...</div>
    </div>
    <div v-else>
      <WelcomeDialog v-if="store.showWelcomeDialog" />
      <InterestPage v-if="store.showInterestPage" />
      <SwipeContainer v-if="!store.showWelcomeDialog && !store.showInterestPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const store = useAppStore()
const isLoading = ref(true)

onMounted(async () => {
  console.log('App mounting...')
  try {
    const response = await fetch('/animals.json')
    const data = await response.json()
    console.log('Animals loaded:', data.animals.length)
    store.loadAnimals(data.animals)
  } catch (error) {
    console.error('Failed to load animals:', error)
  }
  isLoading.value = false
  console.log('App loaded')
})
</script>
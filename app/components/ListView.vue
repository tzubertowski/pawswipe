<template>
  <div class="h-full overflow-y-auto bg-white rounded-t-3xl">
    <div class="sticky top-0 bg-white z-10 p-4 border-b border-gray-200">
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-bold text-gray-800">Wszystkie zwierzaki</h2>
        <button 
          @click="store.toggleViewMode()"
          class="p-2 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
        >
          <svg class="w-5 h-5 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
    
    <div class="p-3 space-y-2 overflow-y-auto">
      <div 
        v-for="animal in filteredAnimals" 
        :key="animal.id"
        @click="openAnimalProfile(animal)"
        class="bg-white border border-gray-200 rounded-xl p-3 hover:shadow-md transition-all cursor-pointer"
      >
        <div class="flex gap-3 items-center">
          <img 
            :src="animal.image" 
            :alt="animal.name"
            class="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            @error="handleImageError"
          >
          <div class="flex-1 min-w-0">
            <h3 class="text-base font-bold text-gray-900 truncate mb-1">{{ animal.name }}</h3>
            <span class="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
              {{ animal.type === 'Kot' ? '🐱 Kot' : '🐕 Pies' }}
            </span>
          </div>
        </div>
      </div>
      
      <div v-if="filteredAnimals.length === 0" class="text-center py-12">
        <div class="text-6xl mb-4">🐾</div>
        <h3 class="text-lg font-semibold text-gray-600 mb-2">Brak zwierząt</h3>
        <p class="text-gray-500">Spróbuj zmienić swoje preferencje</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const store = useAppStore()

const filteredAnimals = computed(() => {
  return store.animals.filter(animal => {
    if (store.preferences.animalType === 'cat' && animal.type !== 'Kot') return false
    if (store.preferences.animalType === 'dog' && animal.type !== 'Pies') return false
    return true
  })
})

const openAnimalProfile = (animal: any) => {
  // Switch to swipe mode and navigate to specific animal
  store.viewMode = 'swipe'
  store.navigateToSpecificPet(animal.id)
}

const handleLike = (animal: any) => {
  store.swipeRight(animal)
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/80x80/cccccc/666666?text=🐾'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
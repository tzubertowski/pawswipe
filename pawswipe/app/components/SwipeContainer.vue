<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100 p-6 flex items-center justify-center">
    <div v-if="currentAnimal" class="w-full max-w-sm">
      <AnimalCard :animal="currentAnimal" />
    </div>
    
    <div v-else class="text-center max-w-sm">
      <div class="text-8xl mb-6">🐾</div>
      <h2 class="text-2xl font-bold text-white mb-4 drop-shadow-lg">
        Koniec przygody!
      </h2>
      <p class="text-white/90 mb-8 text-lg leading-relaxed drop-shadow">
        Przejrzałeś wszystkie dostępne profile. Wróć później, aby zobaczyć nowe zwierzaki!
      </p>
      <button 
        @click="resetAndStartOver"
        class="bg-white/20 backdrop-blur-sm border-2 border-white/30 hover:bg-white/30 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all"
      >
        Zacznij od nowa
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const store = useAppStore()
const currentAnimal = computed(() => store.currentAnimal)

const resetAndStartOver = () => {
  store.resetSession()
}
</script>
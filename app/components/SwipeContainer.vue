<template>
  <div class="h-screen overflow-hidden bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100 pt-4 pb-4 px-4 flex flex-col">
    <!-- Logo and tagline header -->
    <div class="text-center flex-shrink-0 mb-3">
      <h1 class="text-2xl font-bold text-gray-800">
        <span class="text-pink-600">Paw</span><span class="text-purple-600">Swipe</span>
      </h1>
      <p class="text-sm font-semibold text-gray-700 bg-white/60 backdrop-blur-sm inline-block px-3 py-0.5 rounded-full">
        🐾 Miłość od dotknięcia łapką
      </p>
    </div>
    
    <!-- Main content area -->
    <div class="flex-1 flex items-start justify-center relative">
      <!-- Swipe View -->
      <div v-if="viewMode === 'swipe'" class="w-full max-w-sm h-full">
        <div v-if="isLoading" class="h-full flex items-center justify-center">
          <div class="bg-white rounded-3xl shadow-lg p-12 flex flex-col items-center">
            <div class="animate-spin rounded-full h-16 w-16 border-4 border-pink-200 border-t-pink-500 mb-4"></div>
            <p class="text-gray-600 text-sm">Ładuję następny profil...</p>
          </div>
        </div>
        <div v-else-if="currentAnimal">
          <AnimalCard :animal="currentAnimal" />
        </div>
        <div v-else class="bg-white rounded-3xl shadow-lg p-8 text-center border border-gray-100">
          <div class="text-8xl mb-6">🐾</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            Koniec przygody!
          </h2>
          <p class="text-gray-600 mb-8 text-lg leading-relaxed">
            Przejrzałeś wszystkie dostępne profile. Wróć później, aby zobaczyć nowe zwierzaki!
          </p>
          <button 
            @click="resetAndStartOver"
            class="bg-pink-500 hover:bg-pink-600 text-white py-4 px-8 rounded-2xl font-semibold text-lg transition-all transform hover:scale-105 shadow-md"
          >
            Zacznij od nowa
          </button>
        </div>
      </div>
      
      <!-- List View -->
      <div v-else class="w-full max-w-sm h-full">
        <ListView />
      </div>
      
      <!-- Floating View Toggle Button -->
      <button 
        @click="store.toggleViewMode()"
        class="fixed bottom-6 right-6 bg-pink-500 hover:bg-pink-600 text-white p-4 rounded-full shadow-lg transition-all z-20 flex items-center gap-2"
      >
        <svg v-if="viewMode === 'swipe'" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 10h16M4 14h16M4 18h16"></path>
        </svg>
        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
        </svg>
        <span class="text-sm font-medium whitespace-nowrap">
          {{ viewMode === 'swipe' ? 'Widok listy' : 'Widok kart' }}
        </span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const store = useAppStore()
const currentAnimal = computed(() => store.currentAnimal)
const isLoading = computed(() => store.isLoadingNextCard)
const viewMode = computed(() => store.viewMode)

const resetAndStartOver = () => {
  store.resetSession()
}
</script>
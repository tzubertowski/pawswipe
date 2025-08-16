<template>
  <div v-if="show" class="fixed inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100 flex items-center justify-center z-50 p-6">
    <div class="bg-white rounded-3xl max-w-sm w-full p-8 space-y-8 shadow-2xl">
      <div class="text-center">
        <div class="flex justify-center mb-4">
          <img 
            src="/images/shelter-logo.jpg" 
            alt="Iławskie Schronisko dla zwierząt"
            class="w-20 h-20 rounded-full object-cover border-4 border-blue-200 shadow-lg"
          >
        </div>
        <h1 class="text-2xl font-bold text-gray-900 mb-2">PawSwipe</h1>
        <a 
          href="https://www.facebook.com/schroniskoilawa/"
          target="_blank"
          class="text-blue-600 hover:text-blue-800 font-semibold text-sm mb-1 inline-block transition-colors underline decoration-dotted underline-offset-2"
        >
          Schronisko dla bezdomnych zwierząt w Iławie
        </a>
        <p class="text-gray-500 text-xs">Znajdź swojego przyjaciela</p>
      </div>
      
      <div v-if="step === 1" class="space-y-6">
        <div class="space-y-3">
          <button
            @click="selectSearchType('virtual')"
            :class="searchType === 'virtual' ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'"
            class="w-full p-4 rounded-2xl font-medium transition-all duration-200 flex items-center gap-4 border-0"
          >
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span class="text-purple-600">💜</span>
            </div>
            <div class="text-left flex-1">
              <div class="font-semibold">Adopcja wirtualna</div>
              <div class="text-sm opacity-70">Wesprzyj słodziaka!</div>
            </div>
          </button>
          <button
            @click="selectSearchType('adoption')"
            :class="searchType === 'adoption' ? 'bg-green-500 text-white' : 'bg-green-50 text-green-700 hover:bg-green-100'"
            class="w-full p-4 rounded-2xl font-medium transition-all duration-200 flex items-center gap-4 border-0"
          >
            <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
              <span class="text-green-600">🏠</span>
            </div>
            <div class="text-left flex-1">
              <div class="font-semibold">Adopcja</div>
              <div class="text-sm opacity-70">Daj dom na zawsze</div>
            </div>
          </button>
          <button
            @click="selectSearchType('browsing')"
            :class="searchType === 'browsing' ? 'bg-purple-500 text-white' : 'bg-purple-50 text-purple-700 hover:bg-purple-100'"
            class="w-full p-4 rounded-2xl font-medium transition-all duration-200 flex items-center gap-4 border-0"
          >
            <div class="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
              <span class="text-purple-600">👀</span>
            </div>
            <div class="text-left flex-1">
              <div class="font-semibold">Tylko przeglądam</div>
              <div class="text-sm opacity-70">Poznaj nasze zwierzaki</div>
            </div>
          </button>
        </div>
        <button
          @click="nextStep"
          :disabled="!searchType"
          class="w-full bg-pink-500 text-white p-4 rounded-2xl font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-pink-600 transition-colors"
        >
          Dalej
        </button>
      </div>

      <div v-if="step === 2" class="space-y-6">
        <div class="space-y-3">
          <button
            @click="selectAnimalType('cat')"
            :class="animalType === 'cat' ? 'bg-orange-500 text-white' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'"
            class="w-full p-4 rounded-2xl font-medium transition-all duration-200 flex items-center gap-4 border-0"
          >
            <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center">
              <span class="text-orange-600 text-xl">🐱</span>
            </div>
            <span class="font-semibold text-left flex-1">Koty</span>
          </button>
          <button
            @click="selectAnimalType('dog')"
            :class="animalType === 'dog' ? 'bg-amber-500 text-white' : 'bg-amber-50 text-amber-700 hover:bg-amber-100'"
            class="w-full p-4 rounded-2xl font-medium transition-all duration-200 flex items-center gap-4 border-0"
          >
            <div class="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
              <span class="text-amber-600 text-xl">🐕</span>
            </div>
            <span class="font-semibold text-left flex-1">Psy</span>
          </button>
          <button
            @click="selectAnimalType('both')"
            :class="animalType === 'both' ? 'bg-pink-500 text-white' : 'bg-pink-50 text-pink-700 hover:bg-pink-100'"
            class="w-full p-4 rounded-2xl font-medium transition-all duration-200 flex items-center gap-4 border-0"
          >
            <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center">
              <span class="text-pink-600 text-xl">🐾</span>
            </div>
            <span class="font-semibold text-left flex-1">Wszystkie</span>
          </button>
        </div>
        <div class="flex gap-3">
          <button
            @click="previousStep"
            class="flex-1 bg-gray-100 text-gray-700 p-4 rounded-2xl font-medium hover:bg-gray-200 transition-colors"
          >
            Wstecz
          </button>
          <button
            @click="startBrowsing"
            :disabled="!animalType"
            class="flex-1 bg-pink-500 text-white p-4 rounded-2xl font-medium disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed hover:bg-pink-600 transition-colors"
          >
            Rozpocznij
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const store = useAppStore()
const show = ref(true)
const step = ref(1)
const searchType = ref<'adoption' | 'virtual' | 'browsing' | null>(null)
const animalType = ref<'cat' | 'dog' | 'both' | null>(null)

const selectSearchType = (type: 'adoption' | 'virtual' | 'browsing') => {
  searchType.value = type
}

const selectAnimalType = (type: 'cat' | 'dog' | 'both') => {
  animalType.value = type
}

const nextStep = () => {
  if (searchType.value) {
    step.value = 2
  }
}

const previousStep = () => {
  step.value = 1
}

const startBrowsing = () => {
  if (searchType.value && animalType.value) {
    store.setPreferences({
      searchType: searchType.value,
      animalType: animalType.value
    })
    show.value = false
  }
}
</script>
<template>
  <div 
    class="animal-card bg-white rounded-3xl shadow-lg overflow-hidden max-w-sm w-full mx-auto border border-gray-100 flex flex-col max-h-[85vh]"
    :style="cardStyle"
    @touchstart="handleTouchStart"
    @touchmove="handleTouchMove"
    @touchend="handleTouchEnd"
    @mousedown="handleMouseDown"
    @mousemove="handleMouseMove"
    @mouseup="handleMouseUp"
  >
    <div class="relative">
      <div 
        v-if="swipeDirection === 'left'"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div class="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold text-lg rotate-12">
          POMIŃ
        </div>
      </div>

      <div 
        v-if="swipeDirection === 'right'"
        class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
      >
        <div class="bg-gray-900 text-white px-6 py-3 rounded-2xl font-semibold text-lg -rotate-12">
          LUBIĘ!
        </div>
      </div>

      <img 
        :src="animal.image" 
        :alt="animal.name"
        class="w-full h-80 object-cover"
        @error="handleImageError"
      >
      
      <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
        <h1 class="text-3xl font-bold text-white mb-2">{{ animal.name }}</h1>
        <div class="flex items-center gap-4 text-white/90">
          <div class="flex items-center gap-1.5">
            <span class="text-sm">🎂</span>
            <span class="text-sm font-medium">{{ animal.age }} {{ ageLabel }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-sm">{{ animal.type === 'Kot' ? '🐱' : '🐕' }}</span>
            <span class="text-sm font-medium">{{ animal.type }}</span>
          </div>
          <div class="flex items-center gap-1.5">
            <span class="text-sm">{{ animal.sex === 'Samiec' ? '♂️' : animal.sex === 'Samica' ? '♀️' : '❓' }}</span>
            <span class="text-sm font-medium">{{ animal.sex }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-y-auto p-6 space-y-4">
      <div>
        <p class="text-sm text-gray-500 mb-1">Rasa</p>
        <p class="font-medium text-gray-900">{{ animal.breed }}</p>
      </div>

      <div v-if="animal.personality" class="">
        <p class="text-sm text-gray-500 mb-2">Osobowość</p>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="trait in animal.personality" 
            :key="trait"
            class="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full font-medium"
          >
            {{ trait }}
          </span>
        </div>
      </div>

      <div v-if="animal.interests" class="">
        <p class="text-sm text-gray-500 mb-2">Zainteresowania</p>
        <div class="flex flex-wrap gap-2">
          <span 
            v-for="interest in animal.interests" 
            :key="interest"
            class="bg-gray-100 text-gray-700 text-sm px-3 py-1.5 rounded-full font-medium"
          >
            {{ interest }}
          </span>
        </div>
      </div>

      <div class="">
        <p class="text-gray-600 leading-relaxed text-sm">{{ animal.description }}</p>
      </div>
    </div>

    <div class="flex justify-center gap-6 p-6 bg-white border-t border-gray-100">
      <button 
        @click="handleReject"
        class="w-14 h-14 bg-rose-100 hover:bg-rose-200 text-rose-600 rounded-full transition-all flex items-center justify-center"
      >
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <button 
        @click="handleLike"
        class="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full transition-all flex items-center justify-center"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const props = defineProps<{
  animal: {
    id: string
    name: string
    age: number
    breed: string
    type: 'Kot' | 'Pies'
    sex: 'Samiec' | 'Samica' | 'Nieznana'
    image: string
    description: string
    personality?: string[]
    energy?: string
    interests?: string[]
    shelter: {
      name: string
      logo: string
      website: string
    }
  }
}>()

const store = useAppStore()

const startX = ref(0)
const currentX = ref(0)
const isDragging = ref(false)
const swipeDirection = ref<'left' | 'right' | null>(null)

const ageLabel = computed(() => {
  const age = props.animal.age
  if (age === 1) return 'rok'
  if (age >= 2 && age <= 4) return 'lata'
  return 'lat'
})

const cardStyle = computed(() => {
  const translateX = currentX.value - startX.value
  const rotation = translateX * 0.1
  const opacity = 1 - Math.abs(translateX) / 300
  
  if (Math.abs(translateX) > 50) {
    swipeDirection.value = translateX > 0 ? 'right' : 'left'
  } else {
    swipeDirection.value = null
  }

  return {
    transform: `translateX(${translateX}px) rotate(${rotation}deg)`,
    opacity: opacity > 0.3 ? opacity : 0.3,
    transition: isDragging.value ? 'none' : 'all 0.3s ease-out'
  }
})

const handleTouchStart = (e: TouchEvent) => {
  startX.value = e.touches[0].clientX
  currentX.value = e.touches[0].clientX
  isDragging.value = true
}

const handleTouchMove = (e: TouchEvent) => {
  if (!isDragging.value) return
  currentX.value = e.touches[0].clientX
}

const handleTouchEnd = () => {
  if (!isDragging.value) return
  isDragging.value = false
  
  const diff = currentX.value - startX.value
  if (Math.abs(diff) > 100) {
    if (diff > 0) {
      handleLike()
    } else {
      handleReject()
    }
  } else {
    currentX.value = startX.value
  }
}

const handleMouseDown = (e: MouseEvent) => {
  startX.value = e.clientX
  currentX.value = e.clientX
  isDragging.value = true
}

const handleMouseMove = (e: MouseEvent) => {
  if (!isDragging.value) return
  currentX.value = e.clientX
}

const handleMouseUp = () => {
  if (!isDragging.value) return
  isDragging.value = false
  
  const diff = currentX.value - startX.value
  if (Math.abs(diff) > 100) {
    if (diff > 0) {
      handleLike()
    } else {
      handleReject()
    }
  } else {
    currentX.value = startX.value
  }
}

const handleReject = () => {
  store.swipeLeft(props.animal.id)
}

const handleLike = () => {
  store.swipeRight(props.animal)
}

const handleImageError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/400x400/cccccc/666666?text=Brak+zdjęcia'
}

const handleLogoError = (e: Event) => {
  const target = e.target as HTMLImageElement
  target.src = 'https://via.placeholder.com/48x48/cccccc/666666?text=Logo'
}
</script>

<style scoped>
.animal-card {
  user-select: none;
  cursor: grab;
}

.animal-card:active {
  cursor: grabbing;
}
</style>
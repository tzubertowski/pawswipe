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

      <div class="pt-4 border-t border-gray-100">
        <div class="bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-lg border border-blue-100">
          <p class="text-sm font-semibold text-blue-800 mb-3 text-center">🏠 Aktualnie mieszkam w:</p>
          <a 
            :href="animal.shelter.website"
            target="_blank"
            class="flex items-center gap-4 p-3 bg-white hover:bg-blue-50 rounded-lg transition-colors shadow-sm border border-blue-200"
          >
            <img 
              :src="animal.shelter.logo" 
              :alt="animal.shelter.name"
              class="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-sm"
              @error="handleLogoError"
            >
            <div class="flex-1 min-w-0">
              <p class="font-bold text-blue-900 text-base truncate">{{ animal.shelter.name }}</p>
              <p class="text-sm text-blue-600 font-medium">📘 Odwiedź naszą stronę Facebook</p>
            </div>
            <div class="flex flex-col items-center">
              <svg class="w-5 h-5 text-blue-600 mb-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
              </svg>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="p-6 bg-white border-t border-gray-100 space-y-4">
      <div class="flex items-center justify-center gap-2">
        <span class="text-sm text-gray-500">Podziel się profilem {{ animal.name }}:</span>
        <div class="flex gap-2">
          <button 
            @click="shareOnFacebook"
            class="w-8 h-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all flex items-center justify-center"
            title="Udostępnij na Facebook"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </button>
          <button 
            @click="shareOnTwitter"
            class="w-8 h-8 bg-black hover:bg-gray-800 text-white rounded-full transition-all flex items-center justify-center"
            title="Udostępnij na X (Twitter)"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          </button>
          <button 
            @click="shareWhatsApp"
            class="w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full transition-all flex items-center justify-center"
            title="Udostępnij przez WhatsApp"
          >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
            </svg>
          </button>
          <button 
            @click="copyLink"
            class="w-8 h-8 bg-gray-600 hover:bg-gray-700 text-white rounded-full transition-all flex items-center justify-center"
            title="Skopiuj link"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/>
            </svg>
          </button>
        </div>
      </div>
      
      <div class="flex justify-center gap-6">
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

const getShareUrl = () => {
  return `${window.location.origin}/#${props.animal.id}`
}

const getShareText = () => {
  return `Poznaj ${props.animal.name}! ${props.animal.age} ${ageLabel.value} ${props.animal.type.toLowerCase()} szuka domu. Sprawdź profil na PawSwipe! 🐾`
}

const shareOnFacebook = () => {
  const url = encodeURIComponent(getShareUrl())
  const text = encodeURIComponent(getShareText())
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`, '_blank')
}

const shareOnTwitter = () => {
  const url = encodeURIComponent(getShareUrl())
  const text = encodeURIComponent(getShareText())
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`, '_blank')
}

const shareWhatsApp = () => {
  const text = encodeURIComponent(`${getShareText()} ${getShareUrl()}`)
  window.open(`https://wa.me/?text=${text}`, '_blank')
}

const copyLink = async () => {
  try {
    const url = getShareUrl()
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(url)
      alert('Link skopiowany do schowka!')
    } else {
      // Fallback for insecure contexts or older browsers
      const textArea = document.createElement('textarea')
      textArea.value = url
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand('copy')
        alert('Link skopiowany do schowka!')
      } catch (fallbackErr) {
        console.error('Fallback copy failed:', fallbackErr)
        alert(`Skopiuj ten link: ${url}`)
      }
      document.body.removeChild(textArea)
    }
  } catch (err) {
    console.error('Nie udało się skopiować linku:', err)
    const url = getShareUrl()
    alert(`Skopiuj ten link: ${url}`)
  }
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
import { defineStore } from 'pinia'

interface UserPreferences {
  searchType: 'adoption' | 'virtual' | 'browsing' | null
  animalType: 'cat' | 'dog' | 'both' | null
}

interface Animal {
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

export const useAppStore = defineStore('app', {
  state: () => ({
    preferences: {
      searchType: null,
      animalType: null
    } as UserPreferences,
    viewedAnimalIds: [] as string[],
    currentAnimalIndex: 0,
    animals: [] as Animal[],
    showWelcomeDialog: true,
    showInterestPage: false,
    interestedAnimal: null as Animal | null,
    isLoadingNextCard: false
  }),

  getters: {
    filteredAnimals: (state) => {
      return state.animals.filter(animal => {
        if (state.preferences.animalType === 'cat' && animal.type !== 'Kot') return false
        if (state.preferences.animalType === 'dog' && animal.type !== 'Pies') return false
        return !state.viewedAnimalIds.includes(animal.id)
      })
    },
    
    currentAnimal: (state) => {
      const filtered = state.animals.filter(animal => {
        if (state.preferences.animalType === 'cat' && animal.type !== 'Kot') return false
        if (state.preferences.animalType === 'dog' && animal.type !== 'Pies') return false
        return !state.viewedAnimalIds.includes(animal.id)
      })
      // Shuffle the array to randomize order each time
      const shuffled = [...filtered].sort(() => Math.random() - 0.5)
      return shuffled[0] || null
    }
  },

  actions: {
    setPreferences(prefs: UserPreferences) {
      this.preferences = prefs
      this.showWelcomeDialog = false
    },

    loadAnimals(animals: Animal[]) {
      // Shuffle animals when loading to ensure random order every session
      this.animals = [...animals].sort(() => Math.random() - 0.5)
      
      // Check if there's a pet ID in the URL hash and navigate to it
      this.checkUrlForPetId()
    },

    checkUrlForPetId() {
      if (typeof window !== 'undefined') {
        const hash = window.location.hash
        if (hash && hash.startsWith('#')) {
          const petId = hash.substring(1)
          const animal = this.animals.find(a => a.id === petId)
          if (animal) {
            // Skip welcome dialog and go directly to this pet
            this.showWelcomeDialog = false
            this.preferences = {
              searchType: 'browsing',
              animalType: 'both'
            }
            // Show this specific pet by filtering out all others except this one
            this.viewedAnimalIds = this.animals
              .filter(a => a.id !== petId)
              .map(a => a.id)
          }
        }
      }
    },

    navigateToSpecificPet(petId: string) {
      const animal = this.animals.find(a => a.id === petId)
      if (animal) {
        this.showWelcomeDialog = false
        this.showInterestPage = false
        this.preferences = {
          searchType: 'browsing',
          animalType: 'both'
        }
        // Reset viewed animals and only show the specific pet
        this.viewedAnimalIds = this.animals
          .filter(a => a.id !== petId)
          .map(a => a.id)
      }
    },

    async swipeLeft(animalId: string) {
      this.isLoadingNextCard = true
      this.viewedAnimalIds.push(animalId)
      // Add a small delay to show the loader and allow smooth transition
      await new Promise(resolve => setTimeout(resolve, 300))
      this.isLoadingNextCard = false
    },

    async swipeRight(animal: Animal) {
      this.isLoadingNextCard = true
      this.viewedAnimalIds.push(animal.id)
      this.interestedAnimal = animal
      await new Promise(resolve => setTimeout(resolve, 300))
      this.isLoadingNextCard = false
      this.showInterestPage = true
    },

    closeInterestPage() {
      this.showInterestPage = false
      this.interestedAnimal = null
    },

    resetSession() {
      this.viewedAnimalIds = []
      this.currentAnimalIndex = 0
      this.showWelcomeDialog = true
      this.showInterestPage = false
      this.interestedAnimal = null
      this.preferences = {
        searchType: null,
        animalType: null
      }
    }
  }
})
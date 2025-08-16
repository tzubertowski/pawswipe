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
    interestedAnimal: null as Animal | null
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
    },

    swipeLeft(animalId: string) {
      this.viewedAnimalIds.push(animalId)
    },

    swipeRight(animal: Animal) {
      this.viewedAnimalIds.push(animal.id)
      this.interestedAnimal = animal
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
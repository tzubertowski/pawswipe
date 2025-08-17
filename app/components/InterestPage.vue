<template>
  <div v-if="show && animal" class="fixed inset-0 bg-gradient-to-br from-orange-100 via-pink-100 to-rose-100 z-50 overflow-y-auto">
    <div class="max-w-2xl mx-auto p-6 py-12">
      <div class="text-center mb-8">
        <h1 class="text-3xl font-bold text-purple-800 mb-4">
          Wspaniały wybór! 💜 {{ animal.name }} będzie zachwycony! 🎉
        </h1>
        <p class="text-lg text-purple-600 bg-purple-50 p-4 rounded-lg">
          ✨ Adopcja wirtualna to fantastyczny sposób na wsparcie! Oto wszystkie niesamowite korzyści które na Ciebie czekają:
        </p>
      </div>

      <div class="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-8 border-2 border-green-200">
        <h2 class="text-xl font-bold text-green-800 mb-4 text-center">
          💚 Pomóż już dziś {{ animal.name }}! 💚
        </h2>
        
        <div class="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-4">
          <p class="text-blue-800 font-semibold text-center text-base">
            Dziękujemy za zainteresowanie!
          </p>
          <p class="text-blue-700 text-center mt-2 leading-relaxed">
            Mimo, że dalej pracujemy nad systemem adopcji wirtualnej, zachęcamy do wysłania środków bezpośrednio pod numer konta <strong>{{ animal?.shelter.name }}</strong>.
          </p>
          <div class="flex justify-center mt-3">
            <button 
              @click="addCalendarReminder"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              Dodaj przypomnienie do kalendarza
            </button>
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-4 mb-4 shadow-lg">
          <h3 class="font-semibold text-green-700 mb-2 flex items-center gap-2">
            <span class="text-xl">🏢</span> {{ animal.shelter.name }}
          </h3>
          <p class="text-sm text-gray-600 mb-2 flex items-center gap-2">
            <span class="text-lg">💳</span> Dane do przelewu:
          </p>
          <div class="bg-gray-800 text-white p-3 rounded-lg font-mono text-sm border-2 border-gray-600">
            <p><strong>Odbiorca:</strong> Gmina Miejska Iława</p>
            <p><strong>Adres:</strong> ul. Niepodległości 13, 14-200 Iława</p>
            <p><strong>Nr konta:</strong> 70 1160 2202 0000 0005 2001 5477</p>
            <p><strong>Tytuł:</strong> DAROWIZNA SCHRONISKO</p>
          </div>
        </div>

        <div class="flex gap-4 mb-8">
          <a 
            :href="animal.shelter.website"
            target="_blank"
            class="flex-1 bg-green-500 hover:bg-green-600 text-white text-center py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <span class="text-lg">🌐</span> Strona schroniska
          </a>
          <button 
            class="flex-1 bg-green-500 hover:bg-green-600 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
            @click="handleDonation"
          >
            <span class="text-lg">💝</span> Wesprzyj teraz
          </button>
        </div>
      </div>

      <div class="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 mb-8 border-2 border-purple-200">
        <h3 class="text-xl font-bold text-purple-800 mb-4 text-center">🌟 Twój pakiet adopcji wirtualnej 🌟</h3>
        <ul class="space-y-3 text-gray-700">
          <li class="flex items-start">
            <span class="text-2xl mr-3">📸</span>
            <span><strong>Miesięczny album zdjęć</strong> z notatkami o codziennej aktywności {{ animal.name }}</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">🖼️</span>
            <span><strong>Drukowane kopie zdjęć</strong> - zamów swoje ulubione kadry!</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">🏆</span>
            <span><strong>Certyfikat adopcji wirtualnej</strong> z imieniem {{ animal.name }}</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">📋</span>
            <span><strong>Cotygodniowe raporty zdrowia</strong> i postępów</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">📹</span>
            <span><strong>Livestreamy na żywo</strong> z kojca/pokoju {{ animal.name }}</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">🎂</span>
            <span><strong>Kartki urodzinowe i świąteczne</strong> od {{ animal.name }}</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">🛍️</span>
            <span><strong>Ekskluzywne rabaty</strong> na produkty ze schroniska</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">⭐</span>
            <span><strong>Priorytet przy prawdziwej adopcji</strong> w przyszłości</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">🏥</span>
            <span><strong>Sponsorowanie zabiegów weterynaryjnych</strong> dla {{ animal.name }}</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">🎨</span>
            <span><strong>Artystyczne rysunki</strong> od wolontariuszy</span>
          </li>
          <li class="flex items-start">
            <span class="text-2xl mr-3">📰</span>
            <span><strong>Newsletter z historiami sukcesu</strong> innych adopcji</span>
          </li>
        </ul>
      </div>


      <div class="flex gap-4">
        <button 
          @click="continueBrowsing"
          class="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <span class="text-lg">👀</span> Przeglądaj dalej
        </button>
        <button 
          @click="backToStart"
          class="flex-1 bg-purple-500 hover:bg-purple-600 text-white py-3 px-6 rounded-lg font-medium transition-all transform hover:scale-105 shadow-md flex items-center justify-center gap-2"
        >
          <span class="text-lg">⚙️</span> Zmień preferencje
        </button>
      </div>
      
      <!-- Attribution notice -->
      <div class="mt-6 p-3 bg-gray-50 rounded-lg border border-gray-200">
        <p class="text-xs text-gray-500 text-center leading-relaxed">
          Wszystkie zdjęcia i opisy zostały zrealizowane dla <strong>{{ animal?.shelter.name }}</strong> i są ich własnością.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAppStore } from '~/stores/useAppStore'

const store = useAppStore()

const show = computed(() => store.showInterestPage)
const animal = computed(() => store.interestedAnimal)

const continueBrowsing = () => {
  store.closeInterestPage()
}

const backToStart = () => {
  store.resetSession()
}

const handleDonation = () => {
  if (animal.value) {
    window.open(animal.value.shelter.website, '_blank')
  }
}

const addCalendarReminder = () => {
  if (animal.value) {
    // Set reminder for tomorrow at 10:00 AM
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    tomorrow.setHours(10, 0, 0, 0)
    
    // Format dates for Google Calendar
    const startDate = tomorrow.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z'
    const endDate = new Date(tomorrow.getTime() + 30 * 60000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' // 30 minutes later
    
    const title = `Adopcja wirtualna - ${animal.value.name} - przypomnienie o przelewie`
    const details = `Przypomnienie o dokonaniu przelewu dla ${animal.value.name} z ${animal.value.shelter.name}.%0A%0ADane do przelewu:%0ANr konta: 70 1160 2202 0000 0005 2001 5477%0ATytuł: DAROWIZNA SCHRONISKO`
    const location = animal.value.shelter.name
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDate}/${endDate}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}`
    
    window.open(googleCalendarUrl, '_blank')
  }
}
</script>
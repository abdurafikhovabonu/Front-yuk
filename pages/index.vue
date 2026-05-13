<template>
  <div>
    <!-- Hero Section with Carousel -->
    <section class="relative mb-16 rounded-2xl overflow-hidden">
      <div class="relative h-[500px] md:h-[600px]">
        <!-- Carousel Slides -->
        <div class="relative w-full h-full overflow-hidden">
          <div 
            v-for="(slide, index) in slides" 
            :key="index"
            class="absolute inset-0 w-full h-full transition-opacity duration-1000"
            :class="{ 'opacity-100 z-10': currentSlide === index, 'opacity-0 z-0': currentSlide !== index }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-blue-800/80 z-10"></div>
            <img :src="slide.image" :alt="slide.title" class="w-full h-full object-cover">
            <div class="absolute inset-0 z-20 flex items-center">
              <div class="container mx-auto px-4">
                <div class="max-w-3xl text-white">
                  <h1 class="text-4xl md:text-6xl font-bold mb-4 animate-fadeInUp">{{ slide.title }}</h1>
                  <p class="text-xl md:text-2xl mb-6 text-blue-100 animate-fadeInUp animation-delay-200">{{ slide.subtitle }}</p>
                  <div class="flex flex-col sm:flex-row gap-4 animate-fadeInUp animation-delay-400">
                    <NuxtLink 
                      to="/create-order"
                      class="inline-flex items-center justify-center px-8 py-3 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition transform hover:scale-105"
                    >
                      📦 Elon berish
                      <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 5l7 7-7 7M5 5l7 7-7 7"></path>
                      </svg>
                    </NuxtLink>
                    <NuxtLink 
                      to="/drivers"
                      class="inline-flex items-center justify-center px-8 py-3 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-800 transition"
                    >
                      🚚 Haydovchi topish
                    </NuxtLink>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Carousel Controls -->
        <button 
          @click="prevSlide"
          class="absolute left-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>
        <button 
          @click="nextSlide"
          class="absolute right-4 top-1/2 -translate-y-1/2 z-30 bg-white/30 hover:bg-white/50 text-white p-2 rounded-full transition"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>
        
        <!-- Carousel Dots -->
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
          <button 
            v-for="(slide, index) in slides" 
            :key="index"
            @click="currentSlide = index"
            class="w-2 h-2 rounded-full transition-all duration-300"
            :class="currentSlide === index ? 'bg-white w-6' : 'bg-white/50'"
          ></button>
        </div>
      </div>
    </section>

    <!-- Statistikalar -->
    <section class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16 px-4">
      <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="text-4xl font-bold text-blue-600 mb-2 animate-countUp">5000+</div>
        <div class="text-gray-600">Muvaffaqiyatli yuk</div>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="text-4xl font-bold text-blue-600 mb-2 animate-countUp">1000+</div>
        <div class="text-gray-600">Ishonchli haydovchi</div>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="text-4xl font-bold text-blue-600 mb-2 animate-countUp">50+</div>
        <div class="text-gray-600">Shaharlar</div>
      </div>
      <div class="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
        <div class="text-4xl font-bold text-blue-600 mb-2 animate-countUp">98%</div>
        <div class="text-gray-600">Mijozlar rozi</div>
      </div>
    </section>

    <!-- Qidirish bo'limi -->
    <section class="mb-16 px-4">
      <div class="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-3xl shadow-xl p-8">
        <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">🔍 Yuk tashishni qidiring</h2>
        <div class="grid md:grid-cols-3 gap-4">
          <div class="relative">
            <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input 
              v-model="search.from" 
              type="text" 
              placeholder="Qayerdan" 
              class="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <div class="relative">
            <svg class="absolute left-3 top-3.5 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <input 
              v-model="search.to" 
              type="text" 
              placeholder="Qayerga" 
              class="w-full border border-gray-300 rounded-xl pl-10 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>
          <button 
            @click="searchOrders"
            class="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl py-3 hover:shadow-lg transition transform hover:scale-105"
          >
            🔍 Qidirish
          </button>
        </div>
      </div>
    </section>

    <!-- Xizmatlar bo'limi -->
    <section class="mb-16 px-4">
      <h2 class="text-3xl font-bold text-center mb-4 text-gray-800">Bizning xizmatlar</h2>
      <p class="text-center text-gray-500 mb-12">Sizga eng yaxshi xizmatni taqdim etamiz</p>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition transform group-hover:scale-110">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">⚡ Tez yuk tashish</h3>
          <p class="text-gray-600">Eng qisqa vaqt ichida yuklaringizni yetkazib beramiz</p>
        </div>
        
        <div class="text-center group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition transform group-hover:scale-110">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">🔒 Xavfsizlik kafolati</h3>
          <p class="text-gray-600">Yuklaringiz to'liq sug'urtalangan</p>
        </div>
        
        <div class="text-center group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
          <div class="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition transform group-hover:scale-110">
            <svg class="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">💰 Qulay narxlar</h3>
          <p class="text-gray-600">Bo'sh yuk mashinalarini topib eng arzon narx</p>
        </div>
      </div>
    </section>

    <!-- Haydovchilar bo'limi -->
    <section class="mb-16 px-4">
      <div class="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div>
          <h2 class="text-3xl font-bold text-gray-800">Eng yaqin haydovchilar</h2>
          <p class="text-gray-500 mt-1">Sizga eng yaqin professional haydovchilar</p>
        </div>
        <NuxtLink to="/drivers" class="text-blue-600 hover:text-blue-800 font-semibold inline-flex items-center">
          Hammasini ko'rish 
          <svg class="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </NuxtLink>
      </div>
      
      <div v-if="loading" class="text-center py-12">
        <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
      
      <div v-else-if="drivers.length === 0" class="text-center py-12 bg-white rounded-2xl shadow-md">
        <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-gray-500">Hozircha haydovchilar mavjud emas</p>
      </div>
      
      <div v-else class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DriverCard 
          v-for="driver in drivers.slice(0, 3)" 
          :key="driver.id" 
          :driver="driver"
        />
      </div>
    </section>

    <!-- Qanday ishlaydi? -->
    <section class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 md:p-12 mb-16 mx-4 text-white">
      <h2 class="text-3xl font-bold text-center mb-4">Qanday ishlaydi?</h2>
      <p class="text-center text-blue-100 mb-12">4 oddiy qadamda yukingizni jo'nating</p>
      <div class="grid md:grid-cols-4 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold backdrop-blur-sm">1</div>
          <h3 class="text-xl font-semibold mb-2">📝 Buyurtma bering</h3>
          <p class="text-blue-100">Yukingiz haqida ma'lumot qoldiring</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold backdrop-blur-sm">2</div>
          <h3 class="text-xl font-semibold mb-2">🤝 Haydovchi toping</h3>
          <p class="text-blue-100">Eng yaxshi taklifni tanlang</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold backdrop-blur-sm">3</div>
          <h3 class="text-xl font-semibold mb-2">💬 Muzokara qiling</h3>
          <p class="text-blue-100">Haydovchi bilan kelishib oling</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-white text-3xl font-bold backdrop-blur-sm">4</div>
          <h3 class="text-xl font-semibold mb-2">✅ Yukingiz yetkazilsin</h3>
          <p class="text-blue-100">Yukingiz manzilga yetkaziladi</p>
        </div>
      </div>
    </section>

    <!-- Hamkorlik bo'limi -->
    <section class="mb-16 px-4">
      <div class="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div class="grid md:grid-cols-2">
          <div class="p-8 md:p-12">
            <h2 class="text-3xl font-bold text-gray-800 mb-4">🤝 Hamkorlik</h2>
            <p class="text-gray-600 mb-6">
              Yukchi.uz jamoasiga qo'shiling va biz bilan birga rivojlaning!
            </p>
            <div class="space-y-4 mb-8">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>✅ Ishonchli hamkorlar uchun maxsus shartlar</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>✅ Keng mijozlar bazasi</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>✅ 24/7 qo'llab-quvvatlash</span>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span>✅ Reklama va marketing yordami</span>
              </div>
            </div>
            <button @click="openPartnershipModal" class="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl hover:shadow-lg transition transform hover:scale-105">
              Hamkor bo'lish →
            </button>
          </div>
          <div class="bg-gradient-to-br from-blue-600 to-blue-800 p-8 md:p-12 flex items-center justify-center">
            <div class="text-center text-white">
              <svg class="w-24 h-24 mx-auto mb-4 opacity-80" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
              <p class="text-xl font-semibold">1000+ hamkor</p>
              <p class="text-blue-100">Bizga ishonch bildirgan</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact bo'limi -->
    <section class="mb-16 px-4">
      <div class="bg-gradient-to-r from-gray-800 to-gray-900 rounded-3xl p-8 md:p-12 text-white">
        <div class="grid md:grid-cols-2 gap-8">
          <div>
            <h2 class="text-3xl font-bold mb-4">📞 Bog'lanish</h2>
            <p class="text-gray-300 mb-6">Savollaringiz bo'lsa, biz bilan bog'lanishingiz mumkin</p>
            <div class="space-y-4">
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-400">Telefon</p>
                  <p class="font-semibold">+998 71 123 45 67</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-400">Email</p>
                  <p class="font-semibold">info@yukchi.uz</p>
                </div>
              </div>
              <div class="flex items-center gap-3">
                <svg class="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
                <div>
                  <p class="text-sm text-gray-400">Manzil</p>
                  <p class="font-semibold">Toshkent, O'zbekiston</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <form @submit.prevent="sendContact" class="space-y-4">
              <div>
                <input v-model="contactForm.name" type="text" placeholder="Ismingiz *" required class="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <input v-model="contactForm.email" type="email" placeholder="Email *" required class="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
              </div>
              <div>
                <textarea v-model="contactForm.message" rows="3" placeholder="Xabaringiz *" required class="w-full px-4 py-3 rounded-xl bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
              </div>
              <button type="submit" class="w-full px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition">
                📨 Yuborish
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import DriverCard from '~/components/DriverCard.vue'

const { getDrivers } = useApi()
const toast = useToast()

const drivers = ref([])
const loading = ref(true)
const currentSlide = ref(0)

const search = ref({
  from: '',
  to: ''
})

const contactForm = ref({
  name: '',
  email: '',
  message: ''
})

const slides = ref([
  {
    title: 'Yuklaringizni tez va xavfsiz tashish',
    subtitle: 'Yukchi.uz - O\'zbekistonning ishonchli yuk tashish xizmati',
    image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d3?w=1200'
  },
  {
    title: 'Professional haydovchilar',
    subtitle: 'Tajribali va ishonchli haydovchilar xizmatida',
    image: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?w=1200'
  },
  {
    title: '24/7 Qo\'llab-quvvatlash',
    subtitle: 'Har doim yoningizda, istalgan vaqtda yordam beramiz',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200'
  }
])

onMounted(() => {
  loadDrivers()
  startAutoSlide()
})

const loadDrivers = async () => {
  try {
    drivers.value = await getDrivers({ available: true })
  } catch {
    toast.error('Haydovchilarni yuklashda xatolik')
  } finally {
    loading.value = false
  }
}

const searchOrders = () => {
  if (search.value.from && search.value.to) {
    navigateTo(`/drivers?from=${search.value.from}&to=${search.value.to}`)
  } else {
    toast.warning('Iltimos, jo\'natish va qabul qilish manzillarini kiriting!')
  }
}

const sendContact = async () => {
  if (!contactForm.value.name || !contactForm.value.email || !contactForm.value.message) {
    toast.warning('Barcha maydonlarni to\'ldiring!')
    return
  }
  toast.success('Xabaringiz muvaffaqiyatli yuborildi!')
  contactForm.value = { name: '', email: '', message: '' }
}

const openPartnershipModal = () => {
  toast.info('Hamkorlik bo\'limi tez orada ishga tushadi!')
}

// Carousel functions
const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % slides.value.length
}

const prevSlide = () => {
  currentSlide.value = (currentSlide.value - 1 + slides.value.length) % slides.value.length
}

let autoSlideInterval
const startAutoSlide = () => {
  autoSlideInterval = setInterval(() => {
    nextSlide()
  }, 5000)
}

onUnmounted(() => {
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval)
  }
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.6s ease-out forwards;
}

.animation-delay-200 {
  animation-delay: 0.2s;
  opacity: 0;
}

.animation-delay-400 {
  animation-delay: 0.4s;
  opacity: 0;
}
</style>
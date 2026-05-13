<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-8">
      <h1 class="text-3xl font-bold text-gray-800">Yangi buyurtma</h1>
      <p class="text-gray-500 mt-2">Yukingiz haqida ma'lumotlarni to'ldiring</p>
    </div>
    
    <form @submit.prevent="handleSubmit" class="bg-white rounded-2xl shadow-xl overflow-hidden">
      <!-- Progress Steps -->
      <div class="bg-gradient-to-r from-blue-600 to-blue-800 p-6">
        <div class="flex justify-between items-center">
          <div v-for="(step, index) in steps" :key="index" class="flex-1 text-center">
            <div class="relative">
              <div :class="currentStep >= index + 1 ? 'bg-white text-blue-600' : 'bg-white/30 text-white'" 
                   class="w-10 h-10 rounded-full flex items-center justify-center mx-auto font-bold transition-all duration-300">
                {{ index + 1 }}
              </div>
              <div v-if="index < steps.length - 1" 
                   :class="currentStep > index + 1 ? 'bg-white' : 'bg-white/30'"
                   class="absolute top-5 left-1/2 w-full h-0.5 -z-10 transition-all duration-300">
              </div>
            </div>
            <p class="text-xs text-white/80 mt-2 hidden md:block">{{ step }}</p>
          </div>
        </div>
      </div>
      
      <div class="p-8">
        <!-- Step 1: Location Info -->
        <div v-show="currentStep === 1" class="space-y-6 animate-fadeIn">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">📍 Yo'nalish ma'lumotlari</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 font-medium mb-2">
                Qayerdan <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.from" 
                  type="text" 
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Toshkent, Chilonzor"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium mb-2">
                Qayerga <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.to" 
                  type="text" 
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  placeholder="Samarqand, Registon"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Step 2: Cargo Info -->
        <div v-show="currentStep === 2" class="space-y-6 animate-fadeIn">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">📦 Yuk ma'lumotlari</h2>
          
          <div class="grid md:grid-cols-2 gap-6">
            <div>
              <label class="block text-gray-700 font-medium mb-2">
                Yuk turi <span class="text-red-500">*</span>
              </label>
              <select v-model="form.cargo" required class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="">Tanlang</option>
                <option value="Mebel">🪑 Mebel</option>
                <option value="Oziq-ovqat">🍎 Oziq-ovqat</option>
                <option value="Qurilish materiallari">🏗️ Qurilish materiallari</option>
                <option value="Elektronika">📱 Elektronika</option>
                <option value="Kiyim-kechak">👕 Kiyim-kechak</option>
                <option value="Boshqa">📦 Boshqa</option>
              </select>
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium mb-2">
                Og'irligi <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.weight" 
                  type="text" 
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="masalan: 500 kg"
                />
              </div>
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium mb-2">
                Narx (so'm)
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.price" 
                  type="number" 
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="200000"
                />
              </div>
              <p class="text-xs text-gray-500 mt-1">Taklif qilgan narx (ixtiyoriy)</p>
            </div>
            
            <div>
              <label class="block text-gray-700 font-medium mb-2">
                Telefon raqam <span class="text-red-500">*</span>
              </label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.phone" 
                  type="tel" 
                  required
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                  placeholder="+998 90 123 45 67"
                />
              </div>
            </div>
          </div>
        </div>
        
        <!-- Step 3: Additional Info -->
        <div v-show="currentStep === 3" class="space-y-6 animate-fadeIn">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">📝 Qo'shimcha ma'lumotlar</h2>
          
          <div>
            <label class="block text-gray-700 font-medium mb-2">
              Tavsif
            </label>
            <textarea 
              v-model="form.description" 
              rows="5"
              class="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
              placeholder="Yuk haqida qo'shimcha ma'lumot...&#10;Masalan: Yukni yuklash/tushirish vaqti, maxsus talablar va boshqalar"
            ></textarea>
            <p class="text-xs text-gray-500 mt-1">{{ form.description.length }}/500 belgi</p>
          </div>
          
          <!-- Summary Card -->
          <div class="bg-blue-50 rounded-xl p-4">
            <h3 class="font-semibold text-blue-800 mb-3">📋 Buyurtma xulosasi</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Yo'nalish:</span>
                <span class="font-medium">{{ form.from || '—' }} → {{ form.to || '—' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Yuk:</span>
                <span class="font-medium">{{ form.cargo || '—' }} ({{ form.weight || '—' }})</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Narx:</span>
                <span class="font-medium text-blue-600">{{ form.price ? formatPrice(form.price) + ' so\'m' : 'Kelishiladi' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Telefon:</span>
                <span class="font-medium">{{ form.phone || '—' }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Navigation Buttons -->
        <div class="flex justify-between mt-8 pt-6 border-t">
          <button 
            v-if="currentStep > 1"
            type="button"
            @click="currentStep--"
            class="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
          >
            ← Orqaga
          </button>
          <div v-else></div>
          
          <button 
            v-if="currentStep < 3"
            type="button"
            @click="nextStep"
            class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Davom etish →
          </button>
          
          <button 
            v-else
            type="submit" 
            :disabled="loading"
            class="px-8 py-2 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-lg hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50"
          >
            <span v-if="loading" class="flex items-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Yuborilmoqda...
            </span>
            <span v-else>✅ Buyurtma berish</span>
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
const { createOrder } = useApi()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const currentStep = ref(1)

const steps = ['Yo\'nalish', 'Yuk ma\'lumotlari', 'Tasdiqlash']

const form = ref({
  from: '',
  to: '',
  cargo: '',
  weight: '',
  price: '',
  description: '',
  phone: ''
})

// Foydalanuvchi telefonini auto-fill qilish
onMounted(() => {
  const user = localStorage.getItem('user')
  if (user) {
    const userData = JSON.parse(user)
    if (userData.phone) {
      form.value.phone = userData.phone
    }
  }
})

const nextStep = () => {
  // Step 1 validatsiya
  if (currentStep.value === 1) {
    if (!form.value.from || !form.value.to) {
      toast.warning('Iltimos, jo\'natish va qabul qilish manzillarini kiriting!')
      return
    }
  }
  
  // Step 2 validatsiya
  if (currentStep.value === 2) {
    if (!form.value.cargo || !form.value.weight) {
      toast.warning('Iltimos, yuk turi va og\'irligini kiriting!')
      return
    }
    if (!form.value.phone) {
      toast.warning('Iltimos, telefon raqamingizni kiriting!')
      return
    }
    // Telefon raqam validatsiyasi
    const phoneRegex = /^\+998[0-9]{9}$|^998[0-9]{9}$|^[0-9]{9}$/
    if (!phoneRegex.test(form.value.phone.replace(/\s/g, ''))) {
      toast.warning('Telefon raqam noto\'g\'ri formatda! Masalan: +998901234567')
      return
    }
  }
  
  currentStep.value++
}

const handleSubmit = async () => {
  // Telefon raqamni formatlash
  let phoneNumber = form.value.phone.replace(/\s/g, '')
  if (!phoneNumber.startsWith('+')) {
    if (phoneNumber.startsWith('998')) {
      phoneNumber = '+' + phoneNumber
    } else {
      phoneNumber = '+998' + phoneNumber
    }
  }
  
  const orderData = {
    ...form.value,
    phone: phoneNumber,
    price: form.value.price ? parseInt(form.value.price) : null
  }
  
  loading.value = true
  
  try {
    await createOrder(orderData)
    toast.success('Buyurtma muvaffaqiyatli yaratildi!')
    
    // Formani tozalash
    form.value = {
      from: '',
      to: '',
      cargo: '',
      weight: '',
      price: '',
      description: '',
      phone: ''
    }
    currentStep.value = 1
    
    // 2 sekunddan keyin buyurtmalar sahifasiga o'tish
    setTimeout(() => {
      router.push('/orders')
    }, 1500)
    
  } catch (error) {
    toast.error('Xatolik yuz berdi: ' + (error?.message || ''))
  } finally {
    loading.value = false
  }
}

const formatPrice = (price) => {
  return new Intl.NumberFormat('uz-UZ').format(price)
}
</script>

<style scoped>
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}
</style>
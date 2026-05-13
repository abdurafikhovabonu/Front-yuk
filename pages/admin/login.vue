<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
    <div class="max-w-md w-full">
      <!-- Login Card -->
      <div class="bg-white rounded-2xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:scale-105">
        <!-- Header with pattern -->
        <div class="relative bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-8 text-center">
          <div class="absolute inset-0 opacity-10">
            <svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <pattern id="pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M20 12H4M12 4v16" stroke="currentColor" stroke-width="1"/>
              </pattern>
              <rect width="100%" height="100%" fill="url(#pattern)"/>
            </svg>
          </div>
          
          <div class="relative z-10">
            <div class="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h2 class="text-3xl font-bold text-white mb-2">Admin Panel</h2>
            <p class="text-blue-100 text-sm">Tizimga admin sifatida kiring</p>
          </div>
        </div>
        
        <!-- Form Body -->
        <div class="p-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div class="space-y-2">
              <label class="block text-gray-700 font-medium">Email manzil</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.email" 
                  type="email" 
                  required
                  placeholder="admin@yukchi.uz"
                  class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
              </div>
            </div>
            
            <div class="space-y-2">
              <label class="block text-gray-700 font-medium">Parol</label>
              <div class="relative">
                <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                  </svg>
                </div>
                <input 
                  v-model="form.password" 
                  :type="showPassword ? 'text' : 'password'" 
                  required
                  placeholder="••••••••"
                  class="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                />
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
                  </svg>
                  <svg v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
                  </svg>
                </button>
              </div>
            </div>
            
            <button 
              type="submit" 
              :disabled="loading"
              class="w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg py-3 font-semibold hover:shadow-lg transition transform hover:scale-105 disabled:opacity-50 disabled:transform-none"
            >
              <span v-if="loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Kutilmoqda...
              </span>
              <span v-else>Kirish</span>
            </button>
          </form>
          
          <!-- Divider -->
          <div class="relative my-6">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">ma'lumot</span>
            </div>
          </div>
          
          <!-- Info Box -->
          <div class="bg-blue-50 rounded-lg p-4">
            <div class="flex items-start">
              <svg class="h-5 w-5 text-blue-600 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <div class="text-sm text-blue-800">
                <p class="font-semibold mb-1">Test hisobi:</p>
                <p>Email: <span class="font-mono">admin@yukchi.uz</span></p>
                <p>Parol: <span class="font-mono">admin123</span></p>
              </div>
            </div>
          </div>
          
          <!-- Back to home link -->
          <div class="text-center mt-6">
            <NuxtLink to="/" class="text-sm text-gray-500 hover:text-blue-600 transition">
              ← Bosh sahifaga qaytish
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { login } = useApi()
const router = useRouter()
const toast = useToast()

const loading = ref(false)
const showPassword = ref(false)

const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  // Validatsiya
  if (!form.value.email || !form.value.password) {
    toast.warning('Email va parolni kiriting!')
    return
  }
  
  loading.value = true
  
  try {
    const response = await login(form.value)
    
    // Admin yoki yo'qligini tekshirish
    if (response.user.role !== 'admin') {
      toast.error('Siz admin emassiz! Faqat adminlar kirishi mumkin.')
      return
    }
    
    // Ma'lumotlarni saqlash
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    
    // Muvaffaqiyatli kirish
    toast.success(`Xush kelibsiz, ${response.user.name}!`)
    
    // Admin panelga o'tish
    setTimeout(() => {
      router.push('/admin')
    }, 500)
    
  } catch (error) {
    if (error.message.includes('401') || error.message.includes('Invalid')) {
      toast.error('Email yoki parol noto\'g\'ri!')
    } else {
      toast.error('Xatolik yuz berdi. Qaytadan urinib ko\'ring.')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
/* Input focus effect */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

/* Number input spinner ni o'chirish */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
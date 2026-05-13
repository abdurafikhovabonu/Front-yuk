<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 class="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h2>
    
    <form @submit.prevent="handleRegister">
      <!-- Common fields -->
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Ism</label>
        <input v-model="form.name" type="text" required class="w-full border rounded-lg p-3"/>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input v-model="form.email" type="email" required class="w-full border rounded-lg p-3"/>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Telefon</label>
        <input v-model="form.phone" type="tel" required class="w-full border rounded-lg p-3"/>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Parol</label>
        <input v-model="form.password" type="password" required class="w-full border rounded-lg p-3"/>
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Rol</label>
        <select v-model="form.role" class="w-full border rounded-lg p-3" @change="onRoleChange">
          <option value="client">Mijoz</option>
          <option value="driver">Haydovchi</option>
        </select>
      </div>
      
      <!-- Driver specific fields -->
      <div v-if="form.role === 'driver'" class="border-t pt-4 mt-4">
        <h3 class="font-semibold text-gray-800 mb-4">Mashina ma'lumotlari</h3>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Mashina turi *</label>
          <select v-model="form.carType" required class="w-full border rounded-lg p-3">
            <option value="">Tanlang</option>
            <option value="Gazel">Gazel</option>
            <option value="Man">Man</option>
            <option value="Kamaz">Kamaz</option>
            <option value="Damas">Damas</option>
            <option value="Cargo">Cargo</option>
          </select>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">Mashina raqami *</label>
          <input v-model="form.carNumber" type="text" placeholder="01A777AA" required class="w-full border rounded-lg p-3"/>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 mb-2">1 km narxi (so'm) *</label>
          <input v-model="form.pricePerKm" type="number" placeholder="5000" required class="w-full border rounded-lg p-3"/>
        </div>
      </div>
      
      <button type="submit" :disabled="loading" class="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50">
        {{ loading ? 'Kutilmoqda...' : "Ro'yxatdan o'tish" }}
      </button>
    </form>
    
    <p class="text-center mt-4 text-gray-600">
      Hisobingiz bormi? 
      <NuxtLink to="/login" class="text-blue-600 hover:underline">
        Kirish
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
const { register } = useApi()
const router = useRouter()
const toast = useToast()
const loading = ref(false)

const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'client',
  carType: '',
  carNumber: '',
  pricePerKm: ''
})

const onRoleChange = () => {
  // Reset driver fields when switching to client
  if (form.value.role === 'client') {
    form.value.carType = ''
    form.value.carNumber = ''
    form.value.pricePerKm = ''
  }
}

const handleRegister = async () => {
  // Validation for driver
  if (form.value.role === 'driver') {
    if (!form.value.carType || !form.value.carNumber || !form.value.pricePerKm) {
      toast.warning('Iltimos, barcha mashina ma\'lumotlarini to\'ldiring!')
      return
    }
  }
  
  loading.value = true
  try {
    const response = await register(form.value)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    router.push('/')
  } catch (error) {
    toast.error(error.message || 'Ro\'yxatdan o\'tishda xatolik')
  } finally {
    loading.value = false
  }
}
</script>
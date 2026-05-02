<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 class="text-2xl font-bold text-center mb-6">Ro'yxatdan o'tish</h2>
    
    <form @submit.prevent="handleRegister">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Ism</label>
        <input 
          v-model="form.name" 
          type="text" 
          required
          class="w-full border rounded-lg p-3"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required
          class="w-full border rounded-lg p-3"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Telefon</label>
        <input 
          v-model="form.phone" 
          type="tel" 
          required
          class="w-full border rounded-lg p-3"
        />
      </div>
      
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Parol</label>
        <input 
          v-model="form.password" 
          type="password" 
          required
          class="w-full border rounded-lg p-3"
        />
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Rol</label>
        <select v-model="form.role" class="w-full border rounded-lg p-3">
          <option value="client">Mijoz</option>
          <option value="driver">Haydovchi</option>
        </select>
      </div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50"
      >
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
const loading = ref(false)
const form = ref({
  name: '',
  email: '',
  phone: '',
  password: '',
  role: 'client'
})

const handleRegister = async () => {
  loading.value = true
  try {
    const response = await register(form.value)
    localStorage.setItem('token', response.token)
    localStorage.setItem('user', JSON.stringify(response.user))
    router.push('/')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>
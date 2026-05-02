<template>
  <div class="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
    <h2 class="text-2xl font-bold text-center mb-6">Kirish</h2>
    
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2">Email</label>
        <input 
          v-model="form.email" 
          type="email" 
          required
          class="w-full border rounded-lg p-3"
        />
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 mb-2">Parol</label>
        <input 
          v-model="form.password" 
          type="password" 
          required
          class="w-full border rounded-lg p-3"
        />
      </div>
      
      <button 
        type="submit" 
        :disabled="loading"
        class="w-full bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50"
      >
        {{ loading ? 'Kutilmoqda...' : 'Kirish' }}
      </button>
    </form>
    
    <p class="text-center mt-4 text-gray-600">
      Hisobingiz yo'qmi? 
      <NuxtLink to="/register" class="text-blue-600 hover:underline">
        Ro'yxatdan o'tish
      </NuxtLink>
    </p>
  </div>
</template>

<script setup>
const { login } = useApi()
const router = useRouter()
const loading = ref(false)
const form = ref({
  email: '',
  password: ''
})

const handleLogin = async () => {
  loading.value = true
  try {
    const response = await login(form.value)
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
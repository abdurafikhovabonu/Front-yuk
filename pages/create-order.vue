<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-3xl font-bold mb-8">Yangi buyurtma</h1>
    
    <form @submit.prevent="handleSubmit" class="bg-white rounded-lg shadow-md p-6">
      <div class="grid gap-6">
        <div>
          <label class="block text-gray-700 mb-2">Qayerdan *</label>
          <input 
            v-model="form.from" 
            type="text" 
            required
            class="w-full border rounded-lg p-3"
            placeholder="Toshkent, Chilonzor"
          />
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Qayerga *</label>
          <input 
            v-model="form.to" 
            type="text" 
            required
            class="w-full border rounded-lg p-3"
            placeholder="Samarqand, Registon"
          />
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Yuk turi *</label>
          <select v-model="form.cargo" required class="w-full border rounded-lg p-3">
            <option value="">Tanlang</option>
            <option value="Mebel">Mebel</option>
            <option value="Oziq-ovqat">Oziq-ovqat</option>
            <option value="Qurilish materiallari">Qurilish materiallari</option>
            <option value="Elektronika">Elektronika</option>
            <option value="Boshqa">Boshqa</option>
          </select>
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Og'irligi *</label>
          <input 
            v-model="form.weight" 
            type="text" 
            required
            class="w-full border rounded-lg p-3"
            placeholder="masalan: 500 kg"
          />
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Narx (so'm)</label>
          <input 
            v-model="form.price" 
            type="number" 
            class="w-full border rounded-lg p-3"
            placeholder="200000"
          />
        </div>
        
        <div>
          <label class="block text-gray-700 mb-2">Tavsif</label>
          <textarea 
            v-model="form.description" 
            rows="3"
            class="w-full border rounded-lg p-3"
            placeholder="Qo'shimcha ma'lumot..."
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          :disabled="loading"
          class="bg-blue-600 text-white rounded-lg p-3 hover:bg-blue-700 disabled:opacity-50"
        >
          {{ loading ? 'Yuborilmoqda...' : 'Buyurtma berish' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
const { createOrder } = useApi()
const router = useRouter()
const loading = ref(false)
const form = ref({
  from: '',
  to: '',
  cargo: '',
  weight: '',
  price: '',
  description: ''
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await createOrder(form.value)
    router.push('/orders')
  } catch (error) {
    alert(error.message)
  } finally {
    loading.value = false
  }
}
</script>
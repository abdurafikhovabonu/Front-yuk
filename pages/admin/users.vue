<script setup>
definePageMeta({
  middleware: 'admin'
})

// useApi dan funksiyalarni olish
const api = useApi()

const users = ref([])
const loading = ref(true)
const search = ref('')
const roleFilter = ref('')

const filteredUsers = computed(() => {
  let result = users.value
  
  if (search.value) {
    const searchLower = search.value.toLowerCase()
    result = result.filter(u => 
      u.name?.toLowerCase().includes(searchLower) ||
      u.email?.toLowerCase().includes(searchLower)
    )
  }
  
  if (roleFilter.value) {
    result = result.filter(u => u.role === roleFilter.value)
  }
  
  return result
})

onMounted(() => {
  loadUsers()
})

const loadUsers = async () => {
  loading.value = true
  try {
    users.value = await api.getUsers()
    console.log('Users loaded:', users.value)
  } catch (error) {
    console.error('Error loading users:', error)
    alert('Foydalanuvchilarni yuklashda xatolik: ' + error.message)
  } finally {
    loading.value = false
  }
}

const clearFilters = () => {
  search.value = ''
  roleFilter.value = ''
}

const editUser = (user) => {
  alert(`Tahrirlash funksiyasi tayyorlanmoqda: ${user.name}`)
}

const handleDeleteUser = async (id) => {
  if (confirm('Foydalanuvchini o\'chirmoqchimisiz?')) {
    try {
      await api.deleteUser(id)
      await loadUsers()
      alert('Foydalanuvchi o\'chirildi')
    } catch (error) {
      console.error('Error deleting user:', error)
      alert('Xatolik yuz berdi: ' + error.message)
    }
  }
}

const changeRole = async (id, newRole) => {
  try {
    await api.updateUserRole(id, newRole)
    await loadUsers()
    alert('Rol muvaffaqiyatli o\'zgartirildi')
  } catch (error) {
    console.error('Error changing role:', error)
    alert('Xatolik yuz berdi: ' + error.message)
  }
}

const getRoleClass = (role) => {
  const classes = {
    admin: 'bg-red-100 text-red-800',
    driver: 'bg-green-100 text-green-800',
    client: 'bg-blue-100 text-blue-800'
  }
  return classes[role] || 'bg-gray-100 text-gray-800'
}

const formatDate = (date) => {
  if (!date) return '—'
  return new Date(date).toLocaleDateString('uz-UZ')
}
</script>
<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <AdminSidebar />

      <main class="ml-64 flex-1 p-8">
        <div class="flex flex-wrap justify-between items-start gap-4 mb-8">
          <div>
            <h1 class="text-3xl font-bold text-gray-800">{{ t('admin.newsTitle') }}</h1>
            <p class="text-gray-500 mt-1">{{ t('admin.newsSubtitle') }}</p>
          </div>
          <button
            type="button"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            @click="openCreate"
          >
            + {{ t('admin.addNews') }}
          </button>
        </div>

        <div v-if="loading" class="text-center py-16 text-gray-500">{{ t('admin.loading') }}</div>

        <div v-else-if="items.length === 0" class="text-center py-16 bg-white rounded-2xl shadow text-gray-500">
          {{ t('admin.empty') }}
        </div>

        <div v-else class="bg-white rounded-2xl shadow-md overflow-x-auto">
          <table class="w-full min-w-[720px] text-left text-sm">
            <thead class="bg-gray-50 border-b">
              <tr>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tableTitle') }}</th>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tableSlug') }}</th>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tableCategory') }}</th>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tablePublished') }}</th>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tableViews') }}</th>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tableDate') }}</th>
                <th class="px-4 py-3 font-semibold text-gray-600">{{ t('admin.tableActions') }}</th>
              </tr>
            </thead>
            <tbody class="divide-y">
              <tr v-for="row in items" :key="row._id" class="hover:bg-gray-50">
                <td class="px-4 py-3 font-medium text-gray-900 max-w-xs truncate">{{ row.title }}</td>
                <td class="px-4 py-3 text-gray-600 font-mono text-xs">{{ row.slug }}</td>
                <td class="px-4 py-3">{{ row.category }}</td>
                <td class="px-4 py-3">{{ row.published ? t('admin.yes') : t('admin.no') }}</td>
                <td class="px-4 py-3">{{ row.views ?? 0 }}</td>
                <td class="px-4 py-3 whitespace-nowrap">{{ formatDate(row.createdAt) }}</td>
                <td class="px-4 py-3 space-x-2 whitespace-nowrap">
                  <button type="button" class="text-blue-600 hover:underline" @click="openEdit(row)">
                    {{ t('admin.editNews') }}
                  </button>
                  <button type="button" class="text-red-600 hover:underline" @click="remove(row)">
                    {{ t('admin.deleteNews') }}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Modal form -->
        <Teleport to="body">
          <div
            v-if="drawerOpen"
            class="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50"
            @click.self="closeDrawer"
          >
            <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6">
              <h2 class="text-xl font-bold mb-4">
                {{ editingId ? t('admin.editNews') : t('admin.addNews') }}
              </h2>

              <form class="space-y-4" @submit.prevent="save">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formTitle') }} *</label>
                  <input v-model="form.title" required class="w-full border rounded-lg px-3 py-2" @blur="touchSlug">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formSlug') }} *</label>
                  <input v-model="form.slug" required class="w-full border rounded-lg px-3 py-2 font-mono text-sm" @input="slugTouched = true">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formSummary') }} *</label>
                  <textarea v-model="form.summary" required rows="3" class="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formContent') }} *</label>
                  <textarea v-model="form.content" required rows="8" class="w-full border rounded-lg px-3 py-2 font-mono text-sm" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formImage') }}</label>
                  <input v-model="form.image" type="url" class="w-full border rounded-lg px-3 py-2" placeholder="https://">
                </div>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formCategory') }}</label>
                    <select v-model="form.category" class="w-full border rounded-lg px-3 py-2">
                      <option value="yangilik">yangilik</option>
                      <option value="maslahat">maslahat</option>
                      <option value="hamkorlik">hamkorlik</option>
                      <option value="aksiya">aksiya</option>
                    </select>
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">{{ t('admin.formAuthor') }}</label>
                    <input v-model="form.author" class="w-full border rounded-lg px-3 py-2">
                  </div>
                </div>
                <label class="flex items-center gap-2 cursor-pointer">
                  <input v-model="form.published" type="checkbox" class="rounded border-gray-300">
                  <span>{{ t('admin.formPublished') }}</span>
                </label>

                <div class="flex justify-end gap-2 pt-4 border-t">
                  <button type="button" class="px-4 py-2 rounded-lg border" @click="closeDrawer">
                    {{ t('admin.cancel') }}
                  </button>
                  <button type="submit" class="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700" :disabled="saving">
                    {{ t('admin.save') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Teleport>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ middleware: 'admin' })

const { t, locale } = useI18n()
const api = useApi()
const toast = useToast()

const items = ref([])
const loading = ref(true)
const saving = ref(false)
const drawerOpen = ref(false)
const editingId = ref(null)
const slugTouched = ref(false)

const form = ref({
  title: '',
  slug: '',
  summary: '',
  content: '',
  image: '',
  category: 'yangilik',
  author: 'Yukchi.uz Admin',
  published: true
})

const dateLocale = computed(() => {
  const m = { uz: 'uz-UZ', en: 'en-US', ru: 'ru-RU' }
  return m[locale.value] || 'uz-UZ'
})

const slugify = (text) => {
  return String(text || '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9\-]+/gi, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '') || 'news'
}

const touchSlug = () => {
  if (!editingId.value && !slugTouched.value && form.value.title) {
    form.value.slug = slugify(form.value.title)
  }
}

watch(() => form.value.title, (val) => {
  if (!editingId.value && !slugTouched.value && val) {
    form.value.slug = slugify(val)
  }
})

const resetForm = () => {
  editingId.value = null
  slugTouched.value = false
  form.value = {
    title: '',
    slug: '',
    summary: '',
    content: '',
    image: '',
    category: 'yangilik',
    author: 'Yukchi.uz Admin',
    published: true
  }
}

const openCreate = () => {
  resetForm()
  drawerOpen.value = true
}

const openEdit = (row) => {
  editingId.value = row._id
  slugTouched.value = true
  form.value = {
    title: row.title,
    slug: row.slug,
    summary: row.summary,
    content: row.content,
    image: row.image || '',
    category: row.category || 'yangilik',
    author: row.author || 'Yukchi.uz Admin',
    published: !!row.published
  }
  drawerOpen.value = true
}

const closeDrawer = () => {
  drawerOpen.value = false
  resetForm()
}

const load = async () => {
  loading.value = true
  try {
    items.value = await api.getAdminNewsList()
  } catch {
    toast.error(t('admin.error'))
  } finally {
    loading.value = false
  }
}

onMounted(load)

const save = async () => {
  saving.value = true
  try {
    const payload = { ...form.value }
    if (editingId.value) {
      await api.updateNews(editingId.value, payload)
    } else {
      await api.createNews(payload)
    }
    toast.success(t('admin.saved'))
    closeDrawer()
    await load()
  } catch (e) {
    toast.error(e?.message || t('admin.error'))
  } finally {
    saving.value = false
  }
}

const remove = async (row) => {
  if (!confirm(t('admin.confirmDelete'))) return
  try {
    await api.deleteNews(row._id)
    toast.success(t('admin.deleted'))
    await load()
  } catch {
    toast.error(t('admin.error'))
  }
}

const formatDate = (d) => {
  if (!d) return '—'
  return new Date(d).toLocaleDateString(dateLocale.value, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}
</script>

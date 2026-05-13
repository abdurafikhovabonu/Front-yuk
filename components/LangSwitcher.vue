<template>
  <div class="flex items-center gap-2" :class="variant === 'dark' ? 'text-gray-200' : ''">
    <label class="text-xs opacity-80 whitespace-nowrap">{{ t('lang.label') }}</label>
    <select
      :value="locale"
      class="rounded-lg border text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1.5 min-w-[8rem]"
      :class="variant === 'dark'
        ? 'bg-gray-800 border-gray-600 text-white'
        : 'bg-white border-gray-300 text-gray-800'"
      @change="onChange"
    >
      <option
        v-for="loc in availableLocales"
        :key="loc.code"
        :value="loc.code"
      >
        {{ loc.name }}
      </option>
    </select>
  </div>
</template>

<script setup>
defineProps({
  variant: {
    type: String,
    default: 'light'
  }
})

const { locale, locales, setLocale, t } = useI18n()

const availableLocales = computed(() =>
  (locales.value || []).map((l) =>
    typeof l === 'string' ? { code: l, name: l } : { code: l.code, name: l.name || l.code }
  )
)

const onChange = (e) => {
  const code = e.target.value
  if (code) setLocale(code)
}
</script>

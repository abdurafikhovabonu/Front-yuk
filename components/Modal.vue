<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="visible" class="fixed inset-0 z-50 flex items-center justify-center">
        <!-- Background overlay -->
        <div class="absolute inset-0 bg-black/50" @click="close" />
        
        <!-- Modal content -->
        <div class="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 transform transition-all">
          <!-- Header -->
          <div class="flex items-center justify-between p-4 border-b">
            <h3 class="text-lg font-semibold text-gray-900">
              <slot name="title">{{ title }}</slot>
            </h3>
            <button @click="close" class="text-gray-400 hover:text-gray-600">
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
          
          <!-- Body -->
          <div class="p-4">
            <slot name="body">
              <p class="text-gray-600">{{ message }}</p>
            </slot>
          </div>
          
          <!-- Footer -->
          <div class="flex justify-end gap-2 p-4 border-t">
            <slot name="footer">
              <button 
                @click="close"
                class="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
              >
                Bekor qilish
              </button>
              <button 
                @click="confirm"
                class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Tasdiqlash
              </button>
            </slot>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup>
const props = defineProps({
  title: { type: String, default: '' },
  message: { type: String, default: '' }
})

const emit = defineEmits(['confirm', 'cancel'])
const visible = ref(false)

const open = () => {
  visible.value = true
}

const close = () => {
  visible.value = false
  emit('cancel')
}

const confirm = () => {
  emit('confirm')
  close()
}

defineExpose({ open, close })
</script>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}
</style>
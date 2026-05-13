import { inject } from 'vue'

const noopToast = () => {}

export const useToast = () => {
  const toast = inject('toast')
  if (!toast) {
    return {
      success: noopToast,
      error: noopToast,
      warning: noopToast,
      info: noopToast
    }
  }
  return toast
}

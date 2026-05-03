export const useToast = () => {
  const toast = inject('toast')
  if (!toast) {
    // Agar toast mavjud bo'lmasa, console.log ishlatish
    return {
      success: (msg) => console.log('✅', msg),
      error: (msg) => console.log('❌', msg),
      warning: (msg) => console.log('⚠️', msg),
      info: (msg) => console.log('ℹ️', msg)
    }
  }
  return toast
}
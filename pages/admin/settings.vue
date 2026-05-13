<template>
  <div class="min-h-screen bg-gray-100">
    <div class="flex">
      <AdminSidebar />
      
      <main class="ml-64 flex-1 p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-8">Sozlamalar</h1>
        
        <div class="bg-white rounded-2xl shadow-md p-6">
          <div class="text-center py-12">
            <svg class="w-24 h-24 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
            </svg>
            <p class="text-gray-500">Sozlamalar sahifasi keyingi versiyada qo'shiladi...</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'admin'
})
</script>
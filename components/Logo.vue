<template>
  <NuxtLink to="/" class="flex items-center space-x-3 group">
    <!-- Animated Logo -->
    <div class="relative">
      <div class="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-xl flex items-center justify-center transform transition group-hover:scale-110 group-hover:rotate-12">
        <!-- Truck icon -->
        <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8 18H4a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2M8 18a2 2 0 104 0M8 18h4M18 18a2 2 0 104 0m0 0h2a2 2 0 002-2v-4a2 2 0 00-2-2h-2M8 10h4" stroke-width="1.5"/>
        </svg>
      </div>
      <!-- Badge -->
      <div class="absolute -top-2 -right-2 bg-yellow-400 text-blue-900 text-xs font-bold rounded-full px-1.5 py-0.5 animate-pulse">
        uz
      </div>
    </div>
    
    <!-- Logo Text -->
    <div class="flex flex-col">
      <span class="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
        Yukchi
      </span>
      <span class="text-xs text-gray-500 -mt-1">yuk tashish xizmati</span>
    </div>
  </NuxtLink>
</template>
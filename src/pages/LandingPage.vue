<template>
  <div class="min-h-screen bg-gradient-to-br from-primary to-blue-700 flex flex-col items-center justify-center p-6 text-white">
    <div class="text-center space-y-6 max-w-2xl">
      <img src="../assets/white.png" class="h-10 w-45 text-yellow-300 mx-auto" alt="" srcset="">

      <h1 class="text-5xl font-bold tracking-tight">Welcome to Click-HR Dashboard</h1>
      <p class="text-xl text-blue-100">
        We combine advanced technology with deep industry insights to redefine how companies recruit top talent!
      </p>
      <div class="space-x-4 pt-4">
        <router-link 
          to="/login" 
          class="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-gray-100 transition-all duration-300 transform hover:scale-105"
        >
          Login
        </router-link>
        <router-link 
          to="/signup" 
          class="px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow-md hover:bg-white transition-all duration-300 transform hover:scale-105"
        >
          Sign Up
        </router-link>
      </div>
       <p class="text-sm text-blue-200 pt-8">
        Proceed to <router-link to="/dashboard" class="underline hover:text-yellow-300">Dashboard</router-link> (dev access).
      </p>
    </div>
    <footer class="absolute bottom-6 text-center text-blue-200 text-sm">
      &copy; {{ new Date().getFullYear() }} Click-HR. All rights reserved.
    </footer>
  </div>
</template>

<script setup lang="ts">
// Using a dynamic import for the icon just as an example, or import it directly
import { defineAsyncComponent } from 'vue';
</script>

<style scoped>
/* You can add specific styles for the landing page here */
</style>
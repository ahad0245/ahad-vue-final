<template>
  <div class="relative inline-block">
    <button @click="toggleDropdown">
      <img src="https://i.pravatar.cc/300" class="w-8 h-8 rounded-full" />
    </button>

    <div v-if="dropdownOpen" class="absolute right-0 mt-2 bg-white p-4 shadow-lg rounded w-48 z-50">
      <p class="text-gray-800 font-semibold mb-2">John Doe</p>
      <router-link to="/profile" class="block text-sm text-gray-600 hover:text-primary">Profile</router-link>
      <router-link to="/settings" class="block text-sm text-gray-600 hover:text-primary">Settings</router-link>
      <button @click="logout" class="mt-2 w-full text-left text-red-600 text-sm hover:text-red-800">Logout</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const dropdownOpen = ref(false)
const router = useRouter()

function toggleDropdown() {
  dropdownOpen.value = !dropdownOpen.value
}
function logout() {
  router.push('/login')
}
</script>

<template>
  <div>
    <Header />
    <main class="p-4">
      <router-view />
    </main>
  </div>
</template>


<script setup lang="ts">

import Header from '../components/Header.vue';
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
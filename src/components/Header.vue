<template>
  <header class="sticky top-0 z-50">
    <!-- Primary Menu Row -->
    <div class="bg-white shadow-sm border-b">
      <div class="container mx-auto flex items-center justify-between px-4 pt-2">
        <!-- Left: Logo -->
        <div class="text-lg font-bold text-primary tracking-wide"><img src="../assets/logo.png" class="w-28" alt="" srcset=""></div>

        <!-- Center: Navigation Tabs -->
        <nav class="flex space-x-4">
          <button
            v-for="item in topMenus"
            :key="item.key"
            @click="setActiveMain(item.key)"
            class="px-3 py-2 text-sm font-medium rounded-t-md transition"
            :class="{
              'text-white border-b-2 bg-primary border-primary': activeMain === item.key,
              'text-gray-700 hover:text-primary': activeMain !== item.key
            }"
          >
            {{ item.label }}
          </button>
        </nav>

        <!-- Right: Search + Notifications + Profile -->
        <div class="flex items-center space-x-4">
          <input
            type="search"
            placeholder="Search..."
            class="px-3 py-1.5 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:outline-none w-40 sm:w-56"
          />
          <button class="relative p-2 rounded-full hover:bg-gray-100">
            <BellIcon class="w-5 h-5 text-gray-600" />
            <span class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full ring ring-white"></span>
          </button>
          <button class="p-1.5 rounded-full hover:bg-gray-100">
            <UserCircleIcon class="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>

    <!-- Secondary Submenu Row -->
    <div
      v-if="activeSubmenus.length"
      class="bg-primary text-white text-sm px-4"
    >
      <div class="container mx-auto flex space-x-6 py-2 overflow-x-auto">
        <router-link
          v-for="sub in activeSubmenus"
          :key="sub.path"
          :to="sub.path"
          class="hover:underline"
          :class="{
            'font-semibold ': $route.path === sub.path
          }"
        >
          {{ sub.label }}
        </router-link>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRoute } from 'vue-router';
import BellIcon from '../icons/BellIcon.vue';
import UserCircleIcon from '../icons/UserCircleIcon.vue';
import { useAuthStore } from '../stores/useAuthStore';

const route = useRoute();
const auth = useAuthStore(); // ✅ here is the auth user role

const activeMain = ref('dashboard');

// Top-level tabs
const topMenus = [
  { key: 'dashboard', label: 'Dashboard' },
  { key: 'jobs', label: 'Jobs' },
  { key: 'talent', label: 'Talent' },
  { key: 'timesheet', label: 'Timesheet' },
  { key: 'companies', label: 'Companies' },
  { key: 'documents', label: 'Documents' }
];

// Submenus with optional role filtering
const submenus = {
  dashboard: [
    { label: 'Overview', path: '/dashboard', roles: ['admin', 'recruiter', 'viewer'] },
    { label: 'Tasks', path: '/dashboard/analytics', roles: ['admin', 'recruiter', 'viewer'] },
    { label: 'Back Office', path: '/dashboard/backoffice', roles: ['admin'] },
    { label: 'Application Config', path: '/dashboard/app-config', roles: ['admin'] },
    { label: 'Add Users', path: '/dashboard/users', roles: ['admin'] },
    { label: 'Setting', path: '/dashboard/settings', roles: ['admin'] }
  ],
  jobs: [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Tasks', path: '/dashboard/tasks' },
    { label: 'Add Widget', path: '/dashboard/add-widget' }
  ],
  talent: [
    { label: 'Talent Overview', path: '/dashboard/talentoverview' },
    { label: 'Add Talent', path: '/dashboard/addtalent' }
  ],
  timesheet: [],
  companies: [],
  documents: []
};

// Only return submenu items allowed for the current user role
const activeSubmenus = computed(() => {
  const items = submenus[activeMain.value] || [];
  return items.filter(item => {
    return !item.roles || item.roles.includes(auth.userRole);
  });
});

// Handler
function setActiveMain(menuKey: string) {
  activeMain.value = menuKey;
}
</script>


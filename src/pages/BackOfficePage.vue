<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Backoffice Management</h1>
      <p class="text-gray-500 max-w-md">Manage internal users, permissions, pending approvals, and system alerts.</p>
    </div>

    <!-- Tabs -->
    <div class="mb-6">
      <div class="flex space-x-4 border-b pb-2">
        <button class="text-sm font-medium text-primary border-b-2 border-primary pb-1">Users</button>
        <button class="text-sm font-medium text-gray-500 hover:text-primary">Approvals</button>
        <button class="text-sm font-medium text-gray-500 hover:text-primary">Alerts</button>
        <button class="text-sm font-medium text-gray-500 hover:text-primary">Reports</button>
      </div>
    </div>

    <!-- Backoffice Users Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <div v-for="user in backofficeUsers" :key="user.email" class="bg-white p-4 rounded-lg shadow">
        <h2 class="text-lg font-semibold text-gray-800">{{ user.name }}</h2>
        <p class="text-sm text-gray-500">{{ user.role }}</p>
        <p class="text-sm text-gray-400">Last Login: {{ user.lastLogin }}</p>
        <span
          :class="user.status === 'Active' ? 'text-green-600' : 'text-red-500'"
          class="block mt-2 font-semibold"
        >
          {{ user.status }}
        </span>
        <div class="mt-4">
          <button class="text-blue-600 text-sm hover:underline mr-4">Edit</button>
          <button class="text-red-500 text-sm hover:underline">Deactivate</button>
        </div>
      </div>
    </div>

    <!-- Permissions Overview -->
    <div class="bg-white p-6 rounded-lg shadow mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Permission Matrix</h3>
      <table class="min-w-full text-sm">
        <thead class="text-left text-gray-500">
          <tr>
            <th class="py-2 px-4">Role</th>
            <th class="py-2 px-4">View</th>
            <th class="py-2 px-4">Edit</th>
            <th class="py-2 px-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="perm in permissions" :key="perm.role" class="border-t">
            <td class="py-2 px-4 font-medium text-gray-700">{{ perm.role }}</td>
            <td class="py-2 px-4"><input type="checkbox" v-model="perm.view" /></td>
            <td class="py-2 px-4"><input type="checkbox" v-model="perm.edit" /></td>
            <td class="py-2 px-4"><input type="checkbox" v-model="perm.delete" /></td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pending Approvals -->
    <div class="bg-white p-6 rounded-lg shadow mb-8">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">Pending Approvals</h3>
      <ul class="space-y-2">
        <li v-for="item in pendingApprovals" :key="item.id" class="flex justify-between text-sm text-gray-600">
          <span>{{ item.title }}</span>
          <span class="text-gray-400">{{ item.date }}</span>
        </li>
      </ul>
    </div>

    <!-- System Alerts -->
    <div class="bg-white p-6 rounded-lg shadow">
      <h3 class="text-xl font-semibold text-gray-700 mb-4">System Alerts</h3>
      <ul class="space-y-2">
        <li v-for="alert in systemAlerts" :key="alert.id" class="text-sm text-red-600">
          ⚠ {{ alert.message }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const backofficeUsers = ref([
  { name: 'John Doe', role: 'Finance Admin', status: 'Active', lastLogin: '2025-06-18', email: 'john@example.com' },
  { name: 'Lisa Ray', role: 'Compliance Officer', status: 'Inactive', lastLogin: '2025-06-10', email: 'lisa@example.com' },
  { name: 'Tom Jones', role: 'System Reviewer', status: 'Active', lastLogin: '2025-06-17', email: 'tom@example.com' }
]);

const permissions = ref([
  { role: 'Finance Admin', view: true, edit: true, delete: false },
  { role: 'Compliance Officer', view: true, edit: false, delete: false },
  { role: 'System Reviewer', view: true, edit: true, delete: true }
]);

const pendingApprovals = ref([
  { id: 1, title: 'Approve May Timesheet for John Doe', date: '2025-06-15' },
  { id: 2, title: 'Contract Approval - Lisa Ray', date: '2025-06-14' }
]);

const systemAlerts = ref([
  { id: 1, message: 'Lisa Ray has an expired compliance document.' },
  { id: 2, message: 'John Doe has missing tax forms.' }
]);
</script>

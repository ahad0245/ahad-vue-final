<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Create BackOffice User</h1>
      <p class="text-gray-500 max-w-md">Fill in the details to create a new back-office user account.</p>
    </div>

    <!-- User Creation Form -->
    <div class="bg-white rounded-lg shadow p-6 space-y-6 mb-8">
      <h2 class="text-xl font-semibold text-gray-700">User Details</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-600">Email</label>
            <input v-model="form.email" type="email" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Password</label>
            <input v-model="form.password" type="password" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" required />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">First Name</label>
            <input v-model="form.first_name" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Last Name</label>
            <input v-model="form.last_name" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Role</label>
            <select v-model="form.role_id" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="">Select Role</option>
              <option value="1">Admin</option>
              <option value="2">Editor</option>
              <option value="3">Viewer</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Status</label>
            <select v-model="form.backoffice_users_status" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Is Super Admin?</label>
            <select v-model="form.is_super_admin" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Mobile Phone</label>
            <input v-model="form.mobile_phone" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">City</label>
            <input v-model="form.city" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-600">Country</label>
            <input v-model="form.country" type="text" class="mt-1 p-2 border border-gray-300 rounded-md w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
            Create User
          </button>
        </div>
      </form>
    </div>

    <!-- Custom Modal for Messages -->
    <div v-if="showModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full space-y-4 text-center">
        <h3 class="text-lg font-semibold text-gray-800">{{ modalTitle }}</h3>
        <p class="text-gray-600">{{ modalMessage }}</p>
        <button @click="closeModal" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';

// Modal state
const showModal = ref(false);
const modalTitle = ref('');
const modalMessage = ref('');

const openModal = (title: string, message: string) => {
  modalTitle.value = title;
  modalMessage.value = message;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  modalTitle.value = '';
  modalMessage.value = '';
};

const form = reactive({
  email: '',
  password: '',
  first_name: '',
  last_name: '',
  role_id: '', // Will store the ID (1, 2, 3)
  backoffice_users_status: 'active',
  is_super_admin: false,
  mobile_phone: '',
  city: '',
  country: ''
});

const handleSubmit = async () => {
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(form.email)) {
    openModal('Validation Error', 'Invalid email format. Please enter a valid email address.');
    return;
  }

  // Simulate API call
  try {
    console.log('Sending data to API...', JSON.parse(JSON.stringify(form)));
    // await api.post('/api/backoffice-users', form)

    // Simulate API call success after a short delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    openModal('Success!', 'User created successfully!');

    // Optionally reset form after submission
    Object.assign(form, {
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      role_id: '',
      backoffice_users_status: 'active',
      is_super_admin: false,
      mobile_phone: '',
      city: '',
      country: ''
    });

  } catch (err) {
    console.error('Error creating user:', err);
    openModal('Error', 'Error creating user. Please try again.');
  }
};
</script>

<style scoped>
/* Base font for consistency with design reference */
.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>

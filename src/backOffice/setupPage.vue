<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Static Data Setups</h1>
      <p class="text-gray-500 max-w-md">Manage static data entries like roles, countries, and cities. Changes are saved to your browser's local storage.</p>
    </div>

    <div class="mb-6 flex space-x-4">
      <button @click="saveDataToLocalStorage" class="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors shadow-md">
        Save Data to Local Storage
      </button>
      <button @click="loadDataFromLocalStorage" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors shadow-md">
        Load Data from Local Storage
      </button>
      <button @click="resetData" class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors shadow-md">
        Reset to Default
      </button>
    </div>

    <!-- Collapsible Roles Section -->
    <div class="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <button @click="toggleCollapsible('roles')" class="flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50 rounded-t-lg focus:outline-none transition-colors duration-200">
        <span class="font-semibold text-gray-700 text-lg">Roles</span>
        <svg :class="['w-6 h-6 text-gray-600 transition-transform duration-200', { 'rotate-180': openCollapsible.roles }]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div v-if="openCollapsible.roles" class="p-4 border-t border-gray-200 bg-white">
        <h4 class="font-medium text-gray-700 mb-3">Defined Roles:</h4>
        <div class="overflow-x-auto rounded-md border border-gray-200">
          <table class="min-w-full text-sm bg-white">
            <thead class="text-left text-gray-600 bg-gray-50">
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">ID</th>
                <th class="py-2 px-4 border-b border-gray-200">Name</th>
                <th class="py-2 px-4 border-b border-gray-200">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="role in staticData.roles" :key="role.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-4 text-gray-800">{{ role.id }}</td>
                <td class="py-2 px-4 text-gray-800">{{ role.name }}</td>
                <td class="py-2 px-4 text-gray-600">{{ role.description }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-xs">{{ JSON.stringify(staticData.roles, null, 2) }}</pre>

        <div class="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h5 class="font-semibold text-gray-700 mb-3">Add New Role:</h5>
          <form @submit.prevent="addRole" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">ID</label>
              <input type="text" v-model="newRole.id" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" v-model="newRole.name" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-600">Description</label>
              <textarea v-model="newRole.description" rows="2" class="mt-1 p-2 border border-gray-300 rounded-md w-full"></textarea>
            </div>
            <div class="md:col-span-2 text-right">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Role</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Collapsible Countries Section -->
    <div class="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <button @click="toggleCollapsible('countries')" class="flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50 rounded-t-lg focus:outline-none transition-colors duration-200">
        <span class="font-semibold text-gray-700 text-lg">Countries</span>
        <svg :class="['w-6 h-6 text-gray-600 transition-transform duration-200', { 'rotate-180': openCollapsible.countries }]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div v-if="openCollapsible.countries" class="p-4 border-t border-gray-200 bg-white">
        <h4 class="font-medium text-gray-700 mb-3">Defined Countries:</h4>
        <div class="overflow-x-auto rounded-md border border-gray-200">
          <table class="min-w-full text-sm bg-white">
            <thead class="text-left text-gray-600 bg-gray-50">
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">Code</th>
                <th class="py-2 px-4 border-b border-gray-200">Name</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="country in staticData.countries" :key="country.code" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-4 text-gray-800">{{ country.code }}</td>
                <td class="py-2 px-4 text-gray-800">{{ country.name }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-xs">{{ JSON.stringify(staticData.countries, null, 2) }}</pre>

        <div class="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h5 class="font-semibold text-gray-700 mb-3">Add New Country:</h5>
          <form @submit.prevent="addCountry" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Code</label>
              <input type="text" v-model="newCountry.code" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" v-model="newCountry.name" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div class="md:col-span-2 text-right">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Country</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Collapsible Cities Section -->
    <div class="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <button @click="toggleCollapsible('cities')" class="flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50 rounded-t-lg focus:outline-none transition-colors duration-200">
        <span class="font-semibold text-gray-700 text-lg">Cities</span>
        <svg :class="['w-6 h-6 text-gray-600 transition-transform duration-200', { 'rotate-180': openCollapsible.cities }]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div v-if="openCollapsible.cities" class="p-4 border-t border-gray-200 bg-white">
        <h4 class="font-medium text-gray-700 mb-3">Defined Cities:</h4>
        <div class="overflow-x-auto rounded-md border border-gray-200">
          <table class="min-w-full text-sm bg-white">
            <thead class="text-left text-gray-600 bg-gray-50">
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">Name</th>
                <th class="py-2 px-4 border-b border-gray-200">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="city in staticData.cities" :key="city.name" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-4 text-gray-800">{{ city.name }}</td>
                <td class="py-2 px-4 text-gray-800">{{ city.country }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-xs">{{ JSON.stringify(staticData.cities, null, 2) }}</pre>

        <div class="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h5 class="font-semibold text-gray-700 mb-3">Add New City:</h5>
          <form @submit.prevent="addCity" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" v-model="newCity.name" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Country</label>
              <select v-model="newCity.country" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                <option value="">Select Country</option>
                <option v-for="country in staticData.countries" :key="country.code" :value="country.name">{{ country.name }}</option>
              </select>
            </div>
            <div class="md:col-span-2 text-right">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add City</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- General Message Modal -->
    <div v-if="showMessageModal" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-lg shadow-xl p-6 max-w-sm w-full space-y-4 text-center">
        <h3 class="text-lg font-semibold text-gray-800">{{ messageModalTitle }}</h3>
        <p class="text-gray-600">{{ messageModalMessage }}</p>
        <button @click="closeMessageModal" class="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';

// 1. Import your JSON file
import countriesJson from '../assets/data/countries.json'; // This path is relative to the current component

// --- Static Data Definitions ---
const defaultRoles = [
  { id: '1', name: 'Admin', description: 'Full access to all backoffice features.' },
  { id: '2', name: 'Editor', description: 'Can create and edit content, but limited administrative access.' },
  { id: '3', name: 'Viewer', description: 'Read-only access to all content.' },
  { id: '4', name: 'Approver', description: 'Can approve or reject pending items.' },
];

// 2. Use the imported JSON data as the default for countries
const defaultCountries = countriesJson; // Now using data from your JSON file

const defaultCities = [
  { name: 'New York', country: 'United States' },
  { name: 'Los Angeles', country: 'United States' },
  { name: 'Toronto', country: 'Canada' },
  { name: 'London', country: 'United Kingdom' },
  { name: 'Berlin', country: 'Germany' },
  { name: 'Paris', country: 'France' },
  { name: 'Mumbai', country: 'India' },
  { name: 'Sydney', country: 'Australia' },
];

// --- Reactive State ---
const openCollapsible = reactive({
  roles: false,
  countries: false,
  cities: false,
});

const staticData = reactive({
  roles: [...defaultRoles],
  countries: [...defaultCountries], // Initialize with a copy of imported data
  cities: [...defaultCities],
});

// New entry forms data
const newRole = reactive({ id: '', name: '', description: '' });
const newCountry = reactive({ code: '', name: '' });
const newCity = reactive({ name: '', country: '' });

// General Message Modal
const showMessageModal = ref(false);
const messageModalTitle = ref('');
const messageModalMessage = ref('');

// --- Lifecycle Hook ---
onMounted(() => {
  loadDataFromLocalStorage(); // Attempt to load data when component mounts
});

// --- Functions ---

const toggleCollapsible = (section: 'roles' | 'countries' | 'cities') => {
  openCollapsible[section] = !openCollapsible[section];
};

const addRole = () => {
  if (!newRole.id || !newRole.name) {
    openMessageModal('Validation Error', 'Role ID and Name are required.');
    return;
  }
  if (staticData.roles.some(r => r.id === newRole.id)) {
    openMessageModal('Error', `Role with ID "${newRole.id}" already exists.`);
    return;
  }
  staticData.roles.push({ ...newRole });
  openMessageModal('Success', `Role "${newRole.name}" added successfully! Remember to save to Local Storage.`);
  newRole.id = '';
  newRole.name = '';
  newRole.description = '';
};

const addCountry = () => {
  if (!newCountry.code || !newCountry.name) {
    openMessageModal('Validation Error', 'Country Code and Name are required.');
    return;
  }
  // Ensure the code is unique and in uppercase for consistency
  const countryCode = newCountry.code.toUpperCase();
  if (staticData.countries.some(c => c.code === countryCode)) {
    openMessageModal('Error', `Country with code "${countryCode}" already exists.`);
    return;
  }
  staticData.countries.push({ code: countryCode, name: newCountry.name });
  openMessageModal('Success', `Country "${newCountry.name}" added successfully! Remember to save to Local Storage.`);
  newCountry.code = '';
  newCountry.name = '';
};

const addCity = () => {
  if (!newCity.name || !newCity.country) {
    openMessageModal('Validation Error', 'City Name and Country are required.');
    return;
  }
  if (staticData.cities.some(c => c.name === newCity.name && c.country === newCity.country)) {
    openMessageModal('Error', `City "${newCity.name}" in "${newCity.country}" already exists.`);
    return;
  }
  staticData.cities.push({ ...newCity });
  openMessageModal('Success', `City "${newCity.name}" added successfully! Remember to save to Local Storage.`);
  newCity.name = '';
  newCity.country = '';
};

const saveDataToLocalStorage = () => {
  try {
    localStorage.setItem('appStaticData', JSON.stringify(staticData));
    openMessageModal('Saved!', 'Data saved to your browser\'s Local Storage.');
  } catch (e) {
    console.error("Error saving to local storage:", e);
    openMessageModal('Error', 'Failed to save data to Local Storage.');
  }
};

const loadDataFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem('appStaticData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Merge or replace existing data
      Object.assign(staticData.roles, parsedData.roles || []);
      Object.assign(staticData.countries, parsedData.countries || []);
      Object.assign(staticData.cities, parsedData.cities || []);
      openMessageModal('Loaded!', 'Data loaded from your browser\'s Local Storage.');
    } else {
      // If no saved data, initialize with default (imported JSON for countries)
      Object.assign(staticData.roles, [...defaultRoles]);
      Object.assign(staticData.countries, [...defaultCountries]);
      Object.assign(staticData.cities, [...defaultCities]);
      openMessageModal('Info', 'No saved data found in Local Storage. Using default data.');
    }
  } catch (e) {
    console.error("Error loading from local storage:", e);
    openMessageModal('Error', 'Failed to load data from Local Storage. Using default data.');
    resetData(); // Fallback to default if loading fails
  }
};

const resetData = () => {
  // Reset to the original default values, including the imported JSON for countries
  Object.assign(staticData.roles, [...defaultRoles]);
  Object.assign(staticData.countries, [...defaultCountries]);
  Object.assign(staticData.cities, [...defaultCities]);
  localStorage.removeItem('appStaticData'); // Also clear local storage
  openMessageModal('Reset!', 'Data reset to default and Local Storage cleared.');
};

const openMessageModal = (title: string, message: string) => {
  messageModalTitle.value = title;
  messageModalMessage.value = message;
  showMessageModal.value = true;
};

const closeMessageModal = () => {
  showMessageModal.value = false;
  messageModalTitle.value = '';
  messageModalMessage.value = '';
};
</script>

<style scoped>
/* Base font for consistency with design reference */
.font-sans {
  font-family: 'Inter', sans-serif;
}
</style>

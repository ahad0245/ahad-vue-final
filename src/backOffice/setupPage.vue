<template>
  <div class="p-4 sm:p-6 lg:p-8 bg-gray-50 min-h-screen rounded-lg shadow-md font-sans">
    <!-- Page Title -->
    <div class="mb-6">
      <h1 class="text-3xl font-semibold text-gray-700 mb-2">Static Data Setups</h1>
      <p class="text-gray-500 max-w-md">Manage static data entries like roles, countries, states, and cities. Changes are saved to your browser's local storage.</p>
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
                <th class="py-2 px-4 border-b border-gray-200">ID</th>
                <th class="py-2 px-4 border-b border-gray-200">Name</th>
                <th class="py-2 px-4 border-b border-gray-200">Phone Code</th>
                <th class="py-2 px-4 border-b border-gray-200">EmojiU</th>
                <th class="py-2 px-4 border-b border-gray-200">Native</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="country in staticData.countries" :key="country.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-4 text-gray-800">{{ country.id }}</td>
                <td class="py-2 px-4 text-gray-800">{{ country.name }}</td>
                <td class="py-2 px-4 text-gray-600">{{ country.phoneCode }}</td>
                <td class="py-2 px-4 text-gray-600">{{ country.emojiU }}</td>
                <td class="py-2 px-4 text-gray-600">{{ country.native }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-xs">{{ JSON.stringify(staticData.countries, null, 2) }}</pre>

        <div class="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h5 class="font-semibold text-gray-700 mb-3">Add New Country:</h5>
          <form @submit.prevent="addCountry" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">ID</label>
              <input type="text" v-model="newCountry.id" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" v-model="newCountry.name" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Phone Code</label>
              <input type="text" v-model="newCountry.phoneCode" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">EmojiU</label>
              <input type="text" v-model="newCountry.emojiU" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm font-medium text-gray-600">Native Name</label>
              <input type="text" v-model="newCountry.native" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div class="md:col-span-2 text-right">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add Country</button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Collapsible States Section -->
    <div class="mb-4 border border-gray-200 rounded-lg shadow-sm">
      <button @click="toggleCollapsible('states')" class="flex justify-between items-center w-full p-4 bg-white hover:bg-gray-50 rounded-t-lg focus:outline-none transition-colors duration-200">
        <span class="font-semibold text-gray-700 text-lg">States</span>
        <svg :class="['w-6 h-6 text-gray-600 transition-transform duration-200', { 'rotate-180': openCollapsible.states }]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      <div v-if="openCollapsible.states" class="p-4 border-t border-gray-200 bg-white">
        <h4 class="font-medium text-gray-700 mb-3">Defined States:</h4>
        <div class="overflow-x-auto rounded-md border border-gray-200">
          <table class="min-w-full text-sm bg-white">
            <thead class="text-left text-gray-600 bg-gray-50">
              <tr>
                <th class="py-2 px-4 border-b border-gray-200">ID</th>
                <th class="py-2 px-4 border-b border-gray-200">Name</th>
                <th class="py-2 px-4 border-b border-gray-200">Code</th>
                <th class="py-2 px-4 border-b border-gray-200">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="state in staticData.states" :key="state.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-4 text-gray-800">{{ state.id }}</td>
                <td class="py-2 px-4 text-gray-800">{{ state.name }}</td>
                <td class="py-2 px-4 text-gray-600">{{ state.stateCode }}</td>
                <td class="py-2 px-4 text-gray-600">{{ getCountryNameById(state.countryId) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-xs">{{ JSON.stringify(staticData.states, null, 2) }}</pre>

        <div class="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h5 class="font-semibold text-gray-700 mb-3">Add New State:</h5>
          <form @submit.prevent="addState" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">ID</label>
              <input type="text" v-model="newState.id" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" v-model="newState.name" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">State Code</label>
              <input type="text" v-model="newState.stateCode" class="mt-1 p-2 border border-gray-300 rounded-md w-full" />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Country</label>
              <select v-model="newState.countryId" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                <option value="">Select Country</option>
                <option v-for="country in staticData.countries" :key="country.id" :value="country.id">{{ country.name }}</option>
              </select>
            </div>
            <div class="md:col-span-2 text-right">
              <button type="submit" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">Add State</button>
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
                <th class="py-2 px-4 border-b border-gray-200">ID</th>
                <th class="py-2 px-4 border-b border-gray-200">Name</th>
                <th class="py-2 px-4 border-b border-gray-200">State</th>
                <th class="py-2 px-4 border-b border-gray-200">Country</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="city in staticData.cities" :key="city.id" class="border-t border-gray-100 hover:bg-gray-50">
                <td class="py-2 px-4 text-gray-800">{{ city.id }}</td>
                <td class="py-2 px-4 text-gray-800">{{ city.name }}</td>
                <td class="py-2 px-4 text-gray-600">{{ getStateNameById(city.stateId) }}</td>
                <td class="py-2 px-4 text-gray-600">{{ getCountryNameForCity(city.stateId) }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <pre class="bg-gray-800 text-white p-4 rounded-md mt-4 overflow-x-auto text-xs">{{ JSON.stringify(staticData.cities, null, 2) }}</pre>

        <div class="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50">
          <h5 class="font-semibold text-gray-700 mb-3">Add New City:</h5>
          <form @submit.prevent="addCity" class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-600">ID</label>
              <input type="text" v-model="newCity.id" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">Name</label>
              <input type="text" v-model="newCity.name" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-600">State</label>
              <select v-model="newCity.stateId" class="mt-1 p-2 border border-gray-300 rounded-md w-full" required>
                <option value="">Select State</option>
                <option v-for="state in staticData.states" :key="state.id" :value="state.id">{{ state.name }} ({{ getCountryNameById(state.countryId) }})</option>
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

// 1. Import your JSON files
import countriesJson from '../assets/data/countries.json';
import statesJson from '../assets/data/states.json';
import citiesJson from '../assets/data/cities.json';

// --- Static Data Definitions (Default values from imported JSON) ---
const defaultRoles = [
  { id: '1', name: 'Admin', description: 'Full access to all backoffice features.' },
  { id: '2', name: 'Editor', description: 'Can create and edit content, but limited administrative access.' },
  { id: '3', name: 'Viewer', description: 'Read-only access to all content.' },
  { id: '4', name: 'Approver', description: 'Can approve or reject pending items.' },
];

const defaultCountries = countriesJson;
const defaultStates = statesJson;
const defaultCities = citiesJson;

// --- Reactive State ---
const openCollapsible = reactive({
  roles: false,
  countries: false,
  states: false, // Added states collapsible
  cities: false,
});

const staticData = reactive({
  roles: [...defaultRoles],
  countries: [...defaultCountries],
  states: [...defaultStates], // Initialize with states data
  cities: [...defaultCities],
});

// New entry forms data
const newRole = reactive({ id: '', name: '', description: '' });
const newCountry = reactive({ id: '', name: '', phoneCode: '', emojiU: '', native: '' }); // Updated for new country fields
const newState = reactive({ id: '', name: '', stateCode: '', countryId: '' }); // New state form data
const newCity = reactive({ id: '', name: '', stateId: '' }); // Updated for new city fields

// General Message Modal
const showMessageModal = ref(false);
const messageModalTitle = ref('');
const messageModalMessage = ref('');

// --- Lifecycle Hook ---
onMounted(() => {
  loadDataFromLocalStorage(); // Attempt to load data when component mounts
});

// --- Helper Functions for Display ---
const getCountryNameById = (countryId: string) => {
  const country = staticData.countries.find(c => c.id === countryId);
  return country ? country.name : 'Unknown Country';
};

const getStateNameById = (stateId: string) => {
  const state = staticData.states.find(s => s.id === stateId);
  return state ? state.name : 'Unknown State';
};

const getCountryNameForCity = (stateId: string) => {
  const state = staticData.states.find(s => s.id === stateId);
  if (state) {
    const country = staticData.countries.find(c => c.id === state.countryId);
    return country ? country.name : 'Unknown Country';
  }
  return 'N/A';
};

// --- Functions ---

const toggleCollapsible = (section: 'roles' | 'countries' | 'states' | 'cities') => {
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
  if (!newCountry.id || !newCountry.name) {
    openMessageModal('Validation Error', 'Country ID and Name are required.');
    return;
  }
  if (staticData.countries.some(c => c.id === newCountry.id)) {
    openMessageModal('Error', `Country with ID "${newCountry.id}" already exists.`);
    return;
  }
  staticData.countries.push({ ...newCountry });
  openMessageModal('Success', `Country "${newCountry.name}" added successfully! Remember to save to Local Storage.`);
  newCountry.id = '';
  newCountry.name = '';
  newCountry.phoneCode = '';
  newCountry.emojiU = '';
  newCountry.native = '';
};

const addState = () => {
  if (!newState.id || !newState.name || !newState.countryId) {
    openMessageModal('Validation Error', 'State ID, Name, and Country are required.');
    return;
  }
  if (staticData.states.some(s => s.id === newState.id)) {
    openMessageModal('Error', `State with ID "${newState.id}" already exists.`);
    return;
  }
  staticData.states.push({ ...newState });
  openMessageModal('Success', `State "${newState.name}" added successfully! Remember to save to Local Storage.`);
  newState.id = '';
  newState.name = '';
  newState.stateCode = '';
  newState.countryId = '';
};

const addCity = () => {
  if (!newCity.id || !newCity.name || !newCity.stateId) {
    openMessageModal('Validation Error', 'City ID, Name, and State are required.');
    return;
  }
  if (staticData.cities.some(c => c.id === newCity.id)) {
    openMessageModal('Error', `City with ID "${newCity.id}" already exists.`);
    return;
  }
  staticData.cities.push({ ...newCity });
  openMessageModal('Success', `City "${newCity.name}" added successfully! Remember to save to Local Storage.`);
  newCity.id = '';
  newCity.name = '';
  newCity.stateId = '';
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
      // Clear existing reactive arrays before assigning new data to prevent duplicates on re-load
      staticData.roles.splice(0, staticData.roles.length, ...(parsedData.roles || []));
      staticData.countries.splice(0, staticData.countries.length, ...(parsedData.countries || []));
      staticData.states.splice(0, staticData.states.length, ...(parsedData.states || []));
      staticData.cities.splice(0, staticData.cities.length, ...(parsedData.cities || []));
      openMessageModal('Loaded!', 'Data loaded from your browser\'s Local Storage.');
    } else {
      // If no saved data, initialize with default (imported JSON)
      resetDataInMemory(); // Use a helper to reset to imported defaults without clearing localStorage
      openMessageModal('Info', 'No saved data found in Local Storage. Using default data.');
    }
  } catch (e) {
    console.error("Error loading from local storage:", e);
    openMessageModal('Error', 'Failed to load data from Local Storage. Using default data.');
    resetDataInMemory(); // Fallback to default if loading fails
  }
};

// Helper function to reset data in memory without touching localStorage
const resetDataInMemory = () => {
  staticData.roles.splice(0, staticData.roles.length, ...defaultRoles);
  staticData.countries.splice(0, staticData.countries.length, ...defaultCountries);
  staticData.states.splice(0, staticData.states.length, ...defaultStates);
  staticData.cities.splice(0, staticData.cities.length, ...defaultCities);
};

const resetData = () => {
  resetDataInMemory(); // Reset data in memory
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

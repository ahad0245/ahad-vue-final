
<template>
  <div class="bg-white p-6 sm:p-8 md:p-12 rounded-2xl shadow-xl max-w-lg w-full">
    <div class="flex border-b mb-8">
      <button
        @click="activeTab = 'candidate'"
        :class="['flex-1 py-3 text-center font-medium transition-colors', activeTab === 'candidate' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700']"
      >
        Candidate
      </button>
      <button
        @click="activeTab = 'company'"
        :class="['flex-1 py-3 text-center font-medium transition-colors', activeTab === 'company' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-gray-700']"
      >
        Company
      </button>
    </div>

    <div v-if="activeTab === 'candidate'">
      <div class="text-center mb-8">
        <!-- <svg class="h-16 w-16 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.5 21.75c-2.676 0-5.216-.584-7.5-1.636z" />
        </svg> -->
        <h1 class="text-2xl font-bold text-gray-800">Create Your Candidate Account</h1>
        <p class="text-gray-500 mt-2">Join us and start your journey.</p>
      </div>

      <form @submit.prevent="attemptSignup" class="space-y-6">
        <div>
          <label for="firstName" class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
          <input type="text" id="firstName" v-model="firstName" required placeholder="John" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>
        <div>
          <label for="LastName" class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
          <input type="text" id="LastName" v-model="lastName" required placeholder="Doe" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>

        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input type="email" id="email" v-model="email" required placeholder="you@example.com" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
        </div>

        <div>
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <button type="button" @click="generateStrongPassword" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Generate Strong</button>
          </div>
          <div class="relative">
            <input :type="passwordFieldType" id="password" v-model="password" @input="checkPasswordStrength" required placeholder="Min. 8 characters" minlength="8" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
              <svg v-if="passwordFieldType === 'password'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>
            </button>
          </div>
          <div v-if="password" class="mt-2">
            <div class="h-2 w-full bg-gray-200 rounded-full">
              <div class="h-full rounded-full" :class="strengthBarClass" :style="{ width: strength.score + '%' }"></div>
            </div>
            <p class="text-xs mt-1" :class="strengthTextClass">Password strength: {{ strength.label }}</p>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input :type="passwordFieldType" id="confirmPassword" v-model="confirmPassword" required placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
            <p v-if="password && confirmPassword && password !== confirmPassword" class="text-red-500 text-xs mt-1">Passwords do not match.</p>
        </div>

        <div class="pt-2">
          <div
            ref="slider"
            class="relative w-full h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium overflow-hidden select-none cursor-pointer"
            :class="{ 'bg-green-500 text-white': isSliderVerified }"
          >
            <div
              ref="sliderHandle"
              @mousedown="startSlide"
              @touchstart.prevent="startSlide"
              class="absolute top-0 left-0 h-full w-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg"
              :style="{ left: sliderHandlePos + 'px' }"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            <span class="transition-opacity" :class="{'opacity-0': isSliding}">{{ sliderText }}</span>
          </div>
        </div>
      </form>
    </div>

    <div v-if="activeTab === 'company'">
       <div class="text-center mb-8">
        <!-- <svg class="h-16 w-16 text-indigo-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 21h16.5M4.5 3h15M5.25 3v18m13.5-18v18M9 6.75h6.375M9 12h6.375m-6.375 5.25h6.375M5.25 6.75h.008v.008H5.25V6.75zm.008 5.25h.008v.008H5.25v-.008zm0 5.25h.008v.008h-.008v-.008zM18.75 6.75h.008v.008h-.008V6.75zm.008 5.25h.008v.008h-.008v-.008zm0 5.25h.008v.008h-.008v-.008z" />
        </svg> -->
        <h1 class="text-2xl font-bold text-gray-800">Create a Company Account</h1>
        <p class="text-gray-500 mt-2">Register your company to get started.</p>
      </div>
      <form @submit.prevent="handleCompanySignup" class="space-y-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="companyName" class="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <input type="text" id="companyName" v-model="company.name" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div>
            <label for="companyPhone" class="block text-sm font-medium text-gray-700 mb-1">Company Phone</label>
            <input type="tel" id="companyPhone" v-model="company.phone" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          
        </div>
         <!-- <div>
            <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
            <input type="text" id="country" v-model="company.country" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div> -->
           <div>
      <label for="country" class="block text-sm font-medium text-gray-700 mb-1">Country</label>
      <select id="country" v-model="selectedCountry" required
              class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
        <option value="" disabled>Select a country</option>
        <option v-for="c in countries" :key="c.isoCode" :value="c.isoCode">
          {{ c.name }}
        </option>
      </select>
    </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label for="state" class="block text-sm font-medium text-gray-700 mb-1">State/Region/Province</label>
            <select id="state" v-model="selectedState" :disabled="!states.length" required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
          <option value="" disabled>Select a state</option>
          <option v-for="s in states" :key="s.isoCode" :value="s.isoCode">
            {{ s.name }}
          </option>
        </select>
          </div>
          <div>
            <label for="city" class="block text-sm font-medium text-gray-700 mb-1">City</label>
             <select id="city" v-model="selectedCity" :disabled="!cities.length" required
                class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition">
          <option value="" disabled>Select a city</option>
          <option v-for="city in cities" :key="city.name" :value="city.name">
            {{ city.name }}
          </option>
        </select>
          </div>
        </div>
         <div>
            <label for="address1" class="block text-sm font-medium text-gray-700 mb-1">Address 1</label>
            <input type="text" id="address1" v-model="company.address1" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div>
            <label for="address2" class="block text-sm font-medium text-gray-700 mb-1">Address 2</label>
            <input type="text" id="address2" v-model="company.address2" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div>
            <label for="zip" class="block text-sm font-medium text-gray-700 mb-1">Zip/Postal Code</label>
            <input type="text" id="zip" v-model="company.zip" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>
          <div>
            <label for="companyEmail" class="block text-sm font-medium text-gray-700 mb-1">Company Login Email <span class="text-xs text-gray-500">(This will be used for login)</span></label>
            <input type="email" id="companyEmail" v-model="company.email" required class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
          </div>

           <div>
          <div class="flex justify-between items-center mb-1">
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <button type="button" @click="generateStrongPassword" class="text-sm font-medium text-indigo-600 hover:text-indigo-500">Generate Strong</button>
          </div>
          <div class="relative">
            <input :type="passwordFieldType" id="password" v-model="password" @input="checkPasswordStrength" required placeholder="Min. 8 characters" minlength="8" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
            <button type="button" @click="togglePasswordVisibility" class="absolute inset-y-0 right-0 px-3 flex items-center text-gray-500">
              <svg v-if="passwordFieldType === 'password'" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" /><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              <svg v-else class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.243 4.243L6.228 6.228" /></svg>
            </button>
          </div>
          <div v-if="password" class="mt-2">
            <div class="h-2 w-full bg-gray-200 rounded-full">
              <div class="h-full rounded-full" :class="strengthBarClass" :style="{ width: strength.score + '%' }"></div>
            </div>
            <p class="text-xs mt-1" :class="strengthTextClass">Password strength: {{ strength.label }}</p>
          </div>
        </div>

        <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input :type="passwordFieldType" id="confirmPassword" v-model="confirmPassword" required placeholder="••••••••" class="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition" />
            <p v-if="password && confirmPassword && password !== confirmPassword" class="text-red-500 text-xs mt-1">Passwords do not match.</p>
        </div>
        <div class="pt-2">
          <div
            ref="slider"
            class="relative w-full h-14 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 font-medium overflow-hidden select-none cursor-pointer"
            :class="{ 'bg-green-500 text-white': isSliderVerified }"
          >
            <div
              ref="sliderHandle"
              @mousedown="startSlide"
              @touchstart.prevent="startSlide"
              class="absolute top-0 left-0 h-full w-14 bg-indigo-600 rounded-full flex items-center justify-center text-white shadow-lg"
              :style="{ left: sliderHandlePos + 'px' }"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
            </div>
            <span class="transition-opacity" :class="{'opacity-0': isSliding} ">{{ sliderText }}</span>
          </div>
        </div>
      </form>
    </div>

    <p class="mt-8 text-center text-sm text-gray-600">
      Already have an account?
      
       <button class="font-medium text-indigo-600 hover:text-indigo-500" @click="handleLoginRedirect">Log in here</button>
    </p>
  </div>

  <div v-if="showTermsModal" class="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div class="p-6 border-b">
          <h2 class="text-2xl font-bold text-gray-800">Terms and Conditions</h2>
        </div>
        <div ref="termsContent" @scroll="handleScroll" class="p-6 overflow-y-auto">
          <h3 class="font-semibold text-lg mb-2">1. Introduction</h3>
          <p class="text-gray-600 mb-4 text-sm">Welcome to our platform. By creating an account, you agree to these terms and conditions. Please read them carefully. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <h3 class="font-semibold text-lg mb-2">2. User Accounts</h3>
          <p class="text-gray-600 mb-4 text-sm">You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          <h3 class="font-semibold text-lg mb-2">3. Prohibited Activities</h3>
          <p class="text-gray-600 mb-4 text-sm">You are prohibited from using the service for any unlawful purpose. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <h3 class="font-semibold text-lg mb-2">4. Content</h3>
          <p class="text-gray-600 mb-4 text-sm">Our Service allows you to post, link, store, share and otherwise make available certain information. You are responsible for the Content that you post on or through the Service. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
            <h3 class="font-semibold text-lg mb-2">5. Termination</h3>
          <p class="text-gray-600 mb-4 text-sm">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p class="text-gray-600 text-sm">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            <h3 class="font-semibold text-lg mb-2">6. Termination</h3>
          <p class="text-gray-600 mb-4 text-sm">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p class="text-gray-600 text-sm">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
          <h3 class="font-semibold text-lg mb-2">7. Termination</h3>
          <p class="text-gray-600 mb-4 text-sm">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p class="text-gray-600 text-sm">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
            <h3 class="font-semibold text-lg mb-2">8. Termination</h3>
          <p class="text-gray-600 mb-4 text-sm">We may terminate or suspend your account immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
          <p class="text-gray-600 text-sm">Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.</p>
        </div>
        <div class="p-6 border-t bg-gray-50 rounded-b-xl flex justify-end space-x-4">
          <button @click="disagreeAndClose" class="px-6 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-semibold hover:bg-gray-100 transition">Disagree</button>
          <button
            @click="agreeAndSignup"
            :disabled="!termsScrolledToEnd"
            class="px-6 py-2.5 rounded-lg bg-indigo-600 text-white font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed hover:bg-indigo-700"
          >
            Agree
          </button>
        </div>
      </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount, reactive,watch } from 'vue';

import { Country, State, City } from 'country-state-city';

const countries = Country.getAllCountries()
const selectedCountry = ref('')
const selectedState = ref('')
const selectedCity = ref('')
const states = ref([])
const cities = ref([])

watch(selectedCountry, (newCountry) => {
  states.value = State.getStatesOfCountry(newCountry)
  selectedState.value = ''
  cities.value = []
})

watch(selectedState, (newState) => {
  cities.value = City.getCitiesOfState(selectedCountry.value, newState)
  selectedCity.value = ''
})

const router = useRouter();

// Tab State
const activeTab = ref('candidate');

// Candidate Form State
const firstName = ref('');
const LastName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const passwordFieldType = ref('password');
const strength = ref({ score: 0, label: 'Too short', criteria: {} });

// Company Form State
const company = reactive({
  name: '',
  phone: '',
  country: '',
  state: '',
  city: '',
  address1: '',
  address2: '',
  zip: '',
  email: '',
  password: '',
  retypePassword: ''
});

const passwordChecks = reactive({
  length: false,
  specialChar: false
});

// Captcha Slider State
const slider = ref(null);
const sliderHandle = ref(null);
const isSliding = ref(false);
const sliderHandlePos = ref(0);
const isSliderVerified = ref(false);

const sliderText = computed(() => isSliderVerified.value ? 'Verified!' : 'Slide to Create Account');

// Terms Modal State
const showTermsModal = ref(false);
const termsContent = ref(null);
const termsScrolledToEnd = ref(false);

// --- PASSWORD LOGIC (CANDIDATE) ---
const checkPasswordStrength = () => {
  const p = password.value;
  let score = 0;
  let criteria = {};

  if (p.length >= 8) { score += 25; criteria.length = true; }
  if (/[a-z]/.test(p)) { score += 25; criteria.lower = true; }
  if (/[A-Z]/.test(p)) { score += 25; criteria.upper = true; }
  if (/\d/.test(p)) { score += 15; criteria.number = true; }
  if (/[^A-Za-z0-9]/.test(p)) { score += 10; criteria.special = true; }

  score = Math.min(score, 100);

  let label = 'Weak';
  if (score >= 100) label = 'Very Strong';
  else if (score >= 75) label = 'Strong';
  else if (score >= 50) label = 'Medium';
  else if (p.length < 8 && p.length > 0) label = 'Too short';
  else if (p.length === 0) label = 'Too short';

  strength.value = { score, label, criteria };
};

const strengthBarClass = computed(() => {
  if (strength.value.score >= 75) return 'bg-green-500';
  if (strength.value.score >= 50) return 'bg-yellow-500';
  return 'bg-red-500';
});

const strengthTextClass = computed(() => {
  if (strength.value.score >= 75) return 'text-green-600';
  if (strength.value.score >= 50) return 'text-yellow-600';
  return 'text-red-600';
});

const togglePasswordVisibility = () => {
  passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password';
};

const generateStrongPassword = () => {
  const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~`|}{[]:;?><,./-=';
  let newPassword = '';
  for (let i = 0; i < 14; i++) {
    newPassword += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  password.value = newPassword;
  confirmPassword.value = newPassword;
  checkPasswordStrength();
};


// --- PASSWORD LOGIC (COMPANY) ---
const checkCompanyPassword = () => {
  const p = company.password;
  // Minimum 8 characters
  passwordChecks.length = p.length >= 8;
  // Includes a special character but not { " or space
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]|;':",./<>?]/;
  passwordChecks.specialChar = specialCharRegex.test(p);
};

// --- COMPANY SIGNUP ---
const handleCompanySignup = () => {
  checkCompanyPassword(); // Final check before submission
  if (
    !company.name ||
    !company.phone ||
    !company.country ||
    !company.state ||
    !company.city ||
    !company.address1 ||
    !company.zip ||
    !company.email ||
    !company.password ||
    company.password !== company.retypePassword ||
    !passwordChecks.length ||
    !passwordChecks.specialChar
  ) {
    alert('Please fill out all required fields and ensure your password meets the criteria.');
    return;
  }

  console.log('Creating company account with:', { ...company });
  alert(`Company account for ${company.name} created successfully!`);
  router.push('/dashboard-company'); // Or a relevant route
};

// --- SLIDER LOGIC ---
const startSlide = (event) => {
  if (isSliderVerified.value) return;
  isSliding.value = true;
  document.addEventListener('mousemove', onSlide);
  document.addEventListener('mouseup', endSlide);
  document.addEventListener('touchmove', onSlide);
  document.addEventListener('touchend', endSlide);
};

const onSlide = (event) => {
  if (!isSliding.value) return;
  const sliderRect = slider.value.getBoundingClientRect();
  const handleRect = sliderHandle.value.getBoundingClientRect();

  const clientX = event.touches ? event.touches[0].clientX : event.clientX;

  let newLeft = clientX - sliderRect.left - handleRect.width / 2;
  const maxLeft = sliderRect.width - handleRect.width;

  if (newLeft < 0) newLeft = 0;
  if (newLeft > maxLeft) newLeft = maxLeft;

  sliderHandlePos.value = newLeft;

  if (newLeft >= maxLeft - 5) { // A small tolerance
    verifySlider();
  }
};

const endSlide = () => {
  if (!isSliding.value) return;
  isSliding.value = false;
  document.removeEventListener('mousemove', onSlide);
  document.removeEventListener('mouseup', endSlide);
  document.removeEventListener('touchmove', onSlide);
  document.removeEventListener('touchend', endSlide);

  if (!isSliderVerified.value) {
    if (sliderHandle.value) {
        sliderHandle.value.style.transition = 'left 0.3s ease-out';
        sliderHandlePos.value = 0;
        setTimeout(() => {
          if(sliderHandle.value) sliderHandle.value.style.transition = '';
        }, 300);
    }
  }
};

const verifySlider = () => {
  if (isSliderVerified.value) return;

  if (!firstName.value || !email.value || !password.value || password.value !== confirmPassword.value || strength.value.label === 'Weak' || strength.value.label === 'Too short') {
      alert('Please fill out all fields correctly and ensure your password is not weak before proceeding.');
      // Reset slider if verification fails
      isSliding.value = false;
       if (sliderHandle.value) {
            sliderHandle.value.style.transition = 'left 0.3s ease-out';
            sliderHandlePos.value = 0;
            setTimeout(() => {
              if(sliderHandle.value) sliderHandle.value.style.transition = '';
            }, 300);
        }
      return;
  }

  isSliderVerified.value = true;
  endSlide();
  showTermsModal.value = true;
};

// --- MODAL & SIGNUP LOGIC ---
const handleScroll = () => {
  const el = termsContent.value;
  if (el) {
    if (el.scrollHeight - el.scrollTop <= el.clientHeight + 5) {
      termsScrolledToEnd.value = true;
    }
  }
};

const disagreeAndClose = () => {
  showTermsModal.value = false;
  isSliderVerified.value = false;
  sliderHandlePos.value = 0;
  termsScrolledToEnd.value = false;
};

const agreeAndSignup = () => {
  if (!termsScrolledToEnd.value) return;
  console.log('Terms agreed. Proceeding with signup...');
  handleSignup();
  showTermsModal.value = false;
};

const handleSignup = () => {
  // Final signup logic for candidate
   console.log('Creating account with:', {
     firstName: firstName.value,
     email: email.value,
   });
   alert(`Account for ${firstName.value} created successfully!`);
  router.push('/dashboard');
};

// Cleanup listeners
onBeforeUnmount(() => {
  document.removeEventListener('mousemove', onSlide);
  document.removeEventListener('mouseup', endSlide);
  document.removeEventListener('touchmove', onSlide);
  document.removeEventListener('touchend', endSlide);
});

const emit = defineEmits(['go-to-login'])

function handleLoginRedirect() {
  emit('go-to-login')
}
</script>

<style>
.select-none {
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.cursor-pointer {
  cursor: pointer;
}
.transition-opacity{
  font-size: 13px;
}
</style>

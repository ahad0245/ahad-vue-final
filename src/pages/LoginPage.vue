<template>
  <div class="min-h-screen bg-content-bg flex items-center justify-center p-6 bg-primary">
    <div class="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full">
      <div class="text-center mb-8">
        <component :is="LockClosedIcon" class="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-gray-800">Login to Your Account</h1>
        <p class="text-gray-500">Access your dashboard and manage your data.</p>
      </div>

      <div v-if="step === 'login'" class="space-y-6">
        <div>
          <label for="email-step" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input
            type="email"
            id="email-step"
            v-model="email"
            @input="emailError = ''" placeholder="Enter your email"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow"
            :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': emailError }" aria-required="true"
          />
          <p v-if="emailError" class="text-red-600 text-sm mt-1">{{ emailError }}</p>
        </div>
        <button
          @click="goToPassword"
          class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          Continue
        </button>
      </div>

      <div v-if="step === 'password'" class="space-y-6">
        <div v-if="logoUrl" class="my-4 text-center">
            <img :src="logoUrl" alt="Company Logo" class="mx-auto h-12 max-h-16 object-contain" />
        </div>
        <div>
            <label for="email-readonly" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
            <input type="email" id="email-readonly" :value="email" readonly class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"/>
        </div>
        <div>
            <label for="password-step" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
                type="password"
                id="password-step"
                v-model="password"
                @input="passwordError = ''" placeholder="Enter your password"
                class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow"
                :class="{ 'border-red-500 focus:border-red-500 focus:ring-red-500': passwordError }" aria-required="true"
            />
            <p v-if="passwordError" class="text-red-600 text-sm mt-1">{{ passwordError }}</p> </div>
        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            @click="submitLogin"
            class="w-full sm:w-auto flex justify-center py-3 px-6 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
          >
            Login
          </button>
          <a @click="step = 'forgot'" class="text-sm text-primary hover:text-primary-dark cursor-pointer text-center sm:text-right">
            Forgot Password?
          </a>
        </div>
        <button @click="step = 'login'" class="w-full mt-2 text-sm text-gray-600 hover:text-primary cursor-pointer text-center">
            Back to email
        </button>
      </div>
      
      <p class="mt-8 text-center text-sm text-gray-600">
        Not a member? 
        <router-link to="/signup" class="font-medium text-primary hover:text-primary-dark">Create an account</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent, computed } from 'vue';
import { useRouter } from 'vue-router';

const LockClosedIcon = defineAsyncComponent(() => import('../icons/LockClosedIcon.vue'));

const step = ref<'login' | 'password' | 'forgot' | 'sent'>('login');
const email = ref('');
const password = ref('');
const forgotEmail = ref('');
const router = useRouter();

// MODIFIED: Add reactive state for error messages
const emailError = ref('');
const passwordError = ref('');

const logoUrl = computed(() => {
  if (email.value && email.value.includes('@')) {
    const domain = email.value.split('@')[1];
    if (domain && domain.includes('.')) { 
        return `https://logo.clearbit.com/${domain}`;
    }
  }
  return '';
});

// MODIFIED: Email validation function
function isEmailValid(emailAddress: string): boolean {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(emailAddress);
}

// MODIFIED: Updated logic to set error state instead of using alert()
function goToPassword() {
  if (isEmailValid(email.value)) {
    emailError.value = ''; // Clear any previous errors
    step.value = 'password';
  } else {
    emailError.value = 'Please enter a valid email address.';
  }
}

// MODIFIED: Updated logic for the login step
function submitLogin() {
  // Reset error
  passwordError.value = '';

  if (!password.value) {
    passwordError.value = 'Password field cannot be empty.';
    return;
  }
  
  console.log('Calling login API with:', email.value, password.value);
  // Simulate successful login and redirect
  router.push('/dashboard');
}

// NOTE: You can apply the same error handling pattern to the 'Forgot Password' step.
function sendReset() {
  // ...
}
function resendEmail() {
  // ...
}
</script>
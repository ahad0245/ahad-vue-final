<template>
  <div class="min-h-screen bg-content-bg flex items-center justify-center p-6">
    <div class="bg-white p-8 md:p-12 rounded-xl shadow-2xl max-w-md w-full">
      <div class="text-center mb-8">
        <component :is="UserPlusIcon" class="h-16 w-16 text-primary mx-auto mb-4" />
        <h1 class="text-3xl font-bold text-gray-800">Create Your Account</h1>
        <p class="text-gray-500">Join us and start managing your projects efficiently.</p>
      </div>
      <form @submit.prevent="handleSignup" class="space-y-6">
        <div>
          <label for="fullName" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="fullName"
            required
            aria-required="true"
            placeholder="John Doe"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow" 
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <input 
            type="email" 
            id="email" 
            v-model="email"
            required
            aria-required="true"
            placeholder="you@example.com"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow" 
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input 
            type="password" 
            id="password" 
            v-model="password"
            required
            aria-required="true"
            placeholder="•••••••• (min. 8 characters)"
            minlength="8"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow" 
          />
        </div>
         <div>
          <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
          <input 
            type="password" 
            id="confirmPassword" 
            v-model="confirmPassword"
            required
            aria-required="true"
            placeholder="••••••••"
            class="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary transition-shadow" 
          />
        </div>
        <div class="flex items-start">
            <input id="terms" name="terms" type="checkbox" v-model="agreedToTerms" class="h-4 w-4 text-primary border-gray-300 rounded focus:ring-primary mt-1">
            <label for="terms" class="ml-2 block text-sm text-gray-700">I agree to the <a href="#" class="font-medium text-primary hover:text-primary-dark">Terms and Conditions</a></label>
        </div>
        <div>
          <button 
            type="submit" 
            :disabled="!agreedToTerms || password !== confirmPassword"
            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create Account
          </button>
        </div>
      </form>
      <p class="mt-8 text-center text-sm text-gray-600">
        Already have an account? 
        <router-link to="/login" class="font-medium text-primary hover:text-primary-dark">Sign in</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineAsyncComponent } from 'vue';
import { useRouter } from 'vue-router';

const UserPlusIcon = defineAsyncComponent(() => import('../icons/UserPlusIcon.vue'));

const fullName = ref('');
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const agreedToTerms = ref(false);
const router = useRouter();

const handleSignup = () => {
  if (password.value !== confirmPassword.value) {
    alert("Passwords do not match!");
    return;
  }
  if (!agreedToTerms.value) {
    alert("You must agree to the terms and conditions.");
    return;
  }
  // Basic signup logic placeholder
  if (fullName.value && email.value && password.value) {
    alert(`Creating account for ${fullName.value} with email ${email.value}`);
    // Simulate successful signup and redirect
    router.push('/dashboard');
  } else {
    alert('Please fill in all fields.');
  }
};
</script>
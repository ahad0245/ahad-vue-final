<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-3xl font-bold text-gray-800">Welcome Back!</h1>
      <p class="text-gray-600">Here's what's happening with your projects today.</p>
    </div>

    <!-- <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <DashboardCard 
        title="Total Revenue" 
        value="$45,231.89" 
        :icon="DollarSignIcon" 
        trend="+20.1%" 
        trendColor="text-green-500"
        bgColor="bg-green-50"
        iconColor="text-green-600"
      />
      <DashboardCard 
        title="New Users" 
        value="3,250" 
        :icon="UsersIcon" 
        trend="+5.7%" 
        trendColor="text-green-500"
        bgColor="bg-blue-50"
        iconColor="text-blue-600"
      />
      <DashboardCard 
        title="Active Projects" 
        value="12" 
        :icon="BriefcaseIcon" 
        bgColor="bg-yellow-50"
        iconColor="text-yellow-600"
      />
      <DashboardCard 
        title="Pending Tasks" 
        value="5" 
        :icon="ClipboardListIcon" 
        trend="-2.3%" 
        trendColor="text-red-500"
        bgColor="bg-red-50"
        iconColor="text-red-600"
      />
    </div> -->

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 bg-white p-6 rounded-xl shadow-lg">
        <!-- <h3 class="text-xl font-semibold text-gray-700 mb-4">Calender</h3>
        <p class="text-gray-600 pb-5">Quickly identify deadlines or important days at a glance.</p> -->
       <Calender />
        
      </div>
      <div class="bg-white p-6 rounded-xl shadow-lg">
        <h3 class="text-xl font-semibold text-gray-700 mb-4">Recent Activity</h3>
        <ul class="space-y-3">
          <li v-for="i in 4" :key="i" class="flex items-center space-x-3">
            <div class="p-2 bg-primary bg-opacity-10 rounded-full">
              <BellIcon class="h-5 w-5 text-primary" />
            </div>
            <div>
              <p class="text-sm font-medium text-gray-700">Notification Title {{i}}</p>
              <p class="text-xs text-gray-500">Brief description of activity...</p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DashboardCard from '../components/DashboardCard.vue';
import DollarSignIcon from '../icons/DollarSignIcon.vue';
import UsersIcon from '../icons/UsersIcon.vue';
import BriefcaseIcon from '../icons/BriefcaseIcon.vue';
import ClipboardListIcon from '../icons/ClipboardListIcon.vue';
import BellIcon from '../icons/BellIcon.vue';
import Calender from '../components/Calender.vue';


// In a real app, data for cards and charts would be fetched or come from a store.
</script>

<style scoped>
/* Scoped styles for the overview page */
</style>
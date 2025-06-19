import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import DashboardOverviewPage from '../pages/DashboardOverviewPage.vue';
import AnalyticsPage from '../pages/AnalyticsPage.vue';
import SettingsPage from '../pages/SettingsPage.vue';
import LandingPage from '../pages/LandingPage.vue';
import LoginPage from '../pages/LoginPage.vue';
import SignupPage from '../pages/SignupPage.vue';
import NotFoundPage from '../pages/NotFoundPage.vue';
import UsersPage from '../pages/UsersPage.vue';
import BackOfficePage from '../pages/BackOfficePage.vue';
import AppConfigPage from '../pages/AppConfigPage.vue';


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Landing',
    component: LandingPage,
    meta: { title: 'Welcome' }
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { title: 'Login' }
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupPage,
    meta: { title: 'Sign Up' }
  },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '', // Default child route for /dashboard
        name: 'DashboardOverview',
        component: DashboardOverviewPage,
        meta: { title: 'Overview' }
      },
      {
        path: 'analytics',
        name: 'Analytics',
        component: AnalyticsPage,
        meta: { title: 'Analytics' }
      },
      {
        path: 'settings',
        name: 'Settings',
        component: SettingsPage,
        meta: { title: 'Settings' }
      },
      {
        path: 'users',
        name: 'Users',
        component: UsersPage,
        meta: { title: 'Users' }
      },
       {
        path: 'backoffice',
        name: 'Back Office',
        component: BackOfficePage,
        meta: { title: 'Back Office' }
      },
      {
        path: 'app-config',
        name: 'Application Confiq',
        component: AppConfigPage,
        meta: { title: 'Application Config' }
      },

    ],
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404
    name: 'NotFound',
    component: NotFoundPage,
    meta: { title: 'Page Not Found' }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.afterEach((to) => {
  document.title = to.meta.title ? `Modern Vue Dashboard - ${to.meta.title}` : 'Modern Vue Dashboard';
});

export default router;
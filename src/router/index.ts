import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import DashboardLayout from '../layouts/DashboardLayout.vue';
import DashboardOverviewPage from '../modules/backOffice/pages/DashboardOverviewPage.vue';
import AnalyticsPage from '../modules/backOffice/pages/AnalyticsPage.vue';
import SettingsPage from '../modules/backOffice/pages/SettingsPage.vue';
import LandingPage from '../modules/backOffice/pages/LandingPage.vue';
import LoginPage from '../modules/backOffice/pages/LoginPage.vue';
import SignupPage from '../modules/backOffice/pages/SignupPage.vue';
import NotFoundPage from '../modules/backOffice/pages/NotFoundPage.vue';
import UsersPage from '../modules/backOffice/pages/UsersPage.vue';

import AppConfigPage from '../modules/backOffice/pages/AppConfigPage.vue';
import OverviewTalentPage from '../modules/backOffice/pages/OverviewTalentPage.vue';
import AddTalentpage from '../modules/backOffice/pages/AddTalentpage.vue';
import OverviewCompaniesPage from '../modules/backOffice/pages/OverviewCompaniesPage.vue';
import AddCompaniesPage from '../modules/backOffice/pages/AddCompaniesPage.vue';
import BackOfficePage from '../modules/backOffice/pages/BackOfficePage.vue';
import CreateUser from '../modules/backOffice/pages/createUser.vue';
import Users from '../modules/candidate/pages/Users.vue';


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
        path: 'app-config',
        name: 'Application Confiq',
        component: AppConfigPage,
        meta: { title: 'Application Config' }
      },
      {
        path: 'addtalent',
        name: 'Add Talent',
        component: AddTalentpage,
        meta: { title: 'Add Talent' }
      },
       {
        path: 'talentoverview',
        name: 'Talent Overview',
        component: OverviewTalentPage,
        meta: { title: 'Talent Overview' }
      },
      {
        path: 'companies',
        name: 'Companies Overview',
        component: OverviewCompaniesPage,
        meta: { title: 'Companies Overview' }
      },
       {
        path: 'addcompanies',
        name: 'Add Companies',
        component: AddCompaniesPage,
        meta: { title: 'Add Companies' }
      },
      {
        path: 'dummyUsers',
        name: 'total Users',
        component: Users,
        meta: { title: 'Total' }
      },
      
     

    ],
  },
    {
    path: '/backoffice',
    component: DashboardLayout,
    children: [ 


      {
        path: '',
        name: 'Back Office',
        component: BackOfficePage,
        meta: { title: 'Back Office' }
      },
      {
        path: 'createUser',
        name: 'Create Back Office',
        component: CreateUser,
        meta: { title: 'create user' }
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
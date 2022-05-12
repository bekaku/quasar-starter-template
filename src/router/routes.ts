import { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requireAuth: true },
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'pinia', component: () => import('@/pages/PiniaPage.vue') },
      { path: 'i18n', component: () => import('@/pages/I18nPage.vue') },
      { path: 'theme', component: () => import('@/pages/ThemePage.vue') },
      { path: 'fetch-data', component: () => import('@/pages/FetchData.vue') },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', component: () => import('@/pages/LoginPage.vue') },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;

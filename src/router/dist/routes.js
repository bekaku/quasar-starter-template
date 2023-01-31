"use strict";
exports.__esModule = true;
// import checkAuth from '@/utils/checkAuth';
var routes = [
    {
        path: '/',
        component: function () { return Promise.resolve().then(function () { return require('layouts/MainLayout.vue'); }); },
        meta: { requireAuth: true },
        // beforeEnter: checkAuth,
        children: [
            { path: '', component: function () { return Promise.resolve().then(function () { return require('pages/IndexPage.vue'); }); } },
            { path: 'pinia', component: function () { return Promise.resolve().then(function () { return require('@/pages/PiniaPage.vue'); }); } },
            { path: 'i18n', component: function () { return Promise.resolve().then(function () { return require('@/pages/I18nPage.vue'); }); } },
            { path: 'theme', component: function () { return Promise.resolve().then(function () { return require('@/pages/ThemePage.vue'); }); } },
            { path: 'fetch-data', component: function () { return Promise.resolve().then(function () { return require('@/pages/FetchData.vue'); }); } },
        ]
    },
    {
        path: '/feed',
        component: function () { return Promise.resolve().then(function () { return require('@/layouts/FeedLayout.vue'); }); },
        meta: { requireAuth: true },
        // beforeEnter: checkAuth,
        children: [{ path: '', component: function () { return Promise.resolve().then(function () { return require('pages/FeedPage.vue'); }); } }]
    },
    {
        path: '/settings',
        // beforeEnter: checkAuth,
        component: function () { return Promise.resolve().then(function () { return require('layouts/UserSettingLayout.vue'); }); },
        children: [
            { path: '', redirect: '/settings/profile' },
            {
                path: 'profile',
                component: function () { return Promise.resolve().then(function () { return require('@/pages/settings/ProfilePage.vue'); }); }
            },
            {
                path: 'notifications',
                component: function () { return Promise.resolve().then(function () { return require('@/pages/settings/NotificationPage.vue'); }); }
            },
            {
                path: 'security',
                component: function () { return Promise.resolve().then(function () { return require('@/pages/settings/SecurityPage.vue'); }); }
            },
            {
                path: 'emails',
                component: function () { return Promise.resolve().then(function () { return require('@/pages/settings/EmailPage.vue'); }); }
            },
        ]
    },
    {
        path: '/auth',
        component: function () { return Promise.resolve().then(function () { return require('layouts/BlankLayout.vue'); }); },
        children: [
            { path: '', redirect: '/auth/login' },
            { path: 'login', component: function () { return Promise.resolve().then(function () { return require('@/pages/auth/LoginPage.vue'); }); } },
            {
                path: 'login2',
                component: function () { return Promise.resolve().then(function () { return require('@/pages/auth/Login2Page.vue'); }); }
            },
        ]
    },
    {
        path: '/error',
        name: 'ErrorPage',
        component: function () { return Promise.resolve().then(function () { return require('pages/ErrorPage.vue'); }); }
    },
    // Always leave this as last one,
    // but you can also remove it
    {
        path: '/:catchAll(.*)*',
        component: function () { return Promise.resolve().then(function () { return require('pages/ErrorNotFound.vue'); }); }
    },
    { path: '/error500', component: function () { return Promise.resolve().then(function () { return require('pages/Error500.vue'); }); } },
    { path: '/test', component: function () { return Promise.resolve().then(function () { return require('pages/TestPage.vue'); }); } },
];
exports["default"] = routes;

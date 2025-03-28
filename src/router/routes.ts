import {
  ExampleBtnBreadcrumb,
  ExampleSelectBreadcrumb,
  PermissionFormBreadcrumb,
  RoleFormBreadcrumb,
  UserFormBreadcrumb
} from '@/libs/breadcrumbs';
import {
  BackendLogin,
  PermissionPermission,
  RolePermission,
  UserPermission
} from '@/libs/permissions';
import {
  TabTest
} from '@/libs/tabs';
import type { RouteRecordRaw } from 'vue-router';
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('@/layouts/defult.vue'),
    meta: {
      requireAuth: true,
      permission: [BackendLogin]
    },
    children: [
      {
        path: '',
        component: () => import('@/pages/index.vue'),
      },
      {
        path: 'permission',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_permission',
              permission: [PermissionPermission.list]
            },
            component: () => import('@/pages/permission/index.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_permission',
              permission: [PermissionPermission.view],
              breadcrumbs: PermissionFormBreadcrumb,
              tabs: TabTest
            },
            component: () => import('@/pages/permission/view.vue'),
          },
        ]
      },
      {
        path: 'role',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_role',
              permission: [RolePermission.list]
            },
            component: () => import('@/pages/role/index.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_role',
              permission: [RolePermission.view],
              breadcrumbs: RoleFormBreadcrumb,
            },
            component: () => import('@/pages/role/view.vue'),
          },
        ]
      },
      {
        path: 'user',
        children: [
          {
            path: '',
            meta: {
              pageName: 'model_user',
              permission: [UserPermission.list],
            },
            component: () => import('@/pages/user/index.vue'),
          },
          {
            path: ':crud/:id/',
            meta: {
              pageName: 'model_user',
              permission: [UserPermission.view],
              breadcrumbs: UserFormBreadcrumb,
            },
            component: () => import('@/pages/user/view.vue'),
          },
        ]
      },
      {
        path: '/settings',
        meta: { requireAuth: true },
        children: [
          {
            path: '',
            meta: { pageName: 'page.settingsPublicProfile' },
            component: () => import('@/pages/settings/index.vue'),
          },
          {
            path: 'notifications',
            meta: { pageName: 'page.settingsNotification' },
            component: () => import('@/pages/settings/notifications.vue'),
          },
          {
            path: 'security',
            meta: { pageName: 'page.settingsSecurity' },
            component: () => import('@/pages/settings/security.vue'),
          },
          {
            path: 'emails',
            meta: { pageName: 'page.settingsEmail' },
            component: () => import('@/pages/settings/emails.vue'),
          },
        ],
      },
      {
        path: '/blank-page',
        meta: {
          pageName: 'page.dashboard',
          breadcrumbs: ExampleBtnBreadcrumb,
          tabs: TabTest
        },
        component: () => import('@/pages/blank-page.vue')
      },
      {
        path: '/example',
        children: [
          {
            path: 'charts',
            meta: {
              name: 'ExampleCharts',
            },
            component: () => import('@/pages/example/charts.vue'),
          },
          {
            path: 'content-text',
            meta: {
              name: 'ExampleContentText',
            },
            component: () => import('@/pages/example/content-text.vue'),
          },
          {
            path: 'crud-table',
            meta: {
              name: 'ExampleCrudTable',
            },
            component: () => import('@/pages/example/crud-table.vue'),
          },
          {
            path: 'drag-drop',
            meta: {
              name: 'ExampleDargdrop',
            },
            component: () => import('@/pages/example/drag-drop.vue'),
          },
          {
            path: 'emoji-picker',
            meta: {
              name: 'ExampleEmojiPicker',
            },
            component: () => import('@/pages/example/emoji-picker.vue'),
          },
          {
            path: 'image-cropper',
            meta: {
              name: 'ExampleImageCropper',
            },
            component: () => import('@/pages/example/image-cropper.vue'),
          },
          {
            path: 'image-view',
            meta: {
              name: 'ExampleImageView',
            },
            component: () => import('@/pages/example/image-view.vue'),
          },
          {
            path: 'infinite-scroll',
            meta: {
              name: 'ExampleInfiniteScroll',
            },
            component: () => import('@/pages/example/infinite-scroll.vue'),
          },
          {
            path: 'markdown-editor',
            meta: {
              name: 'ExampleMarkdownEditor',
            },
            component: () => import('@/pages/example/markdown-editor.vue'),
          },
          {
            path: 'result',
            meta: {
              name: 'ExampleResult',
            },
            component: () => import('@/pages/example/result.vue'),
          },
          {
            path: 'swiper',
            meta: {
              name: 'ExampleSwipper',
            },
            component: () => import('@/pages/example/swipper.vue'),
          },
          {
            path: 'virtual-scroller',
            meta: {
              name: 'ExampleVirtualScroller',
            },
            component: () => import('@/pages/example/virtual-scroller.vue'),
          },
          {
            path: 'composables',
            children: [
              {
                path: 'use-axios',
                meta: {
                  name: 'ExampleComposablesUseAxios',
                },
                component: () => import('@/pages/example/composables/use-axios.vue'),
              },
              {
                path: 'use-base',
                meta: {
                  name: 'ExampleComposablesUseBase',
                },
                component: () => import('@/pages/example/composables/use-base.vue'),
              },
              {
                path: 'use-pagefecth',
                meta: {
                  name: 'ExampleComposablesUsePagefecth',
                },
                component: () => import('@/pages/example/composables/use-pagefecth.vue'),
              },
            ]
          },
          {
            path: 'ui',
            children: [
              {
                path: 'avatar',
                meta: {
                  name: 'ExampleUiAvatar',
                  breadcrumbs: ExampleBtnBreadcrumb,
                },
                component: () => import('@/pages/example/ui/avatar.vue'),
              },
              {
                path: 'button',
                meta: {
                  name: 'ExampleUiButton',
                  breadcrumbs: ExampleBtnBreadcrumb,
                },
                component: () => import('@/pages/example/ui/button.vue'),
              },
              {
                path: 'card',
                meta: {
                  name: 'ExampleUiCard',
                },
                component: () => import('@/pages/example/ui/card.vue'),
              },
              {
                path: 'dialog',
                meta: {
                  name: 'ExampleUiDialog',
                },
                component: () => import('@/pages/example/ui/dialog.vue'),
              },
              {
                path: 'menu',
                meta: {
                  name: 'ExampleUiMenu',
                },
                component: () => import('@/pages/example/ui/menu.vue'),
              },
              {
                path: 'select',
                meta: {
                  name: 'ExampleUiSelect',
                  breadcrumbs: ExampleSelectBreadcrumb,
                },
                component: () => import('@/pages/example/ui/select.vue'),
              },
              {
                path: 'date-picker',
                meta: {
                  name: 'ExampleUiDatePicker',
                },
                component: () => import('@/pages/example/ui/date-picker.vue'),
              },
              {
                path: 'toggle',
                meta: {
                  name: 'ExampleUitoggle',
                },
                component: () => import('@/pages/example/ui/toggle.vue'),
              },
              {
                path: 'file-picker',
                meta: {
                  name: 'ExampleUiFilePicker',
                },
                component: () => import('@/pages/example/ui/file-picker.vue'),
              },
              {
                path: 'input-text',
                meta: {
                  name: 'ExampleUiInputText',
                },
                component: () => import('@/pages/example/ui/input-text.vue'),
              },
              {
                path: 'tabs',
                meta: {
                  name: 'ExampleUiTabs',
                },
                component: () => import('@/pages/example/ui/tabs.vue'),
              },
              {
                path: 'user',
                meta: {
                  name: 'ExampleUiUser',
                },
                component: () => import('@/pages/example/ui/user.vue'),
              },
            ],
          },
        ]
      },
    ],
  },
  {
    path: '/example/feed',
    component: () => import('@/layouts/feed.vue'),
    meta: { requireAuth: true },
    children: [{ path: '', component: () => import('@/pages/example/feed/index.vue') }],
  },
  {
    path: '/example/chats',
    meta: { requireAuth: true },
    component: () => import('layouts/chat.vue'),
    children: [
      { path: '', redirect: '/example/chats/g/0' },
      {
        path: 'g/:groupId',
        component: () => import('@/pages/example/chats/index.vue')
      },
    ]
  },
  {
    path: '/auth',
    component: () => import('layouts/blank.vue'),
    children: [
      { path: '', redirect: '/auth/login' },
      { path: 'login', component: () => import('@/pages/auth/login.vue') },
    ],
  },
  {
    path: '/error',
    name: 'ErrorPage',
    component: () => import('@/pages/error.vue'),
  },
  { path: '/error500', component: () => import('@/pages/error-500.vue') },
  {
    path: '/test',
    component: () => import('layouts/blank.vue'),
    children: [
      { path: '', component: () => import('@/pages/test.vue') },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    component: () => import('@/pages/error-404.vue'),
  },
];

export default routes;

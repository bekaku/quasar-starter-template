import {
  biApp,
  biArrowDownCircle,
  biArrowDownUp,
  biArrowLeftRight,
  biArrowsMove,
  biBack,
  biBrush,
  biBug,
  biCalendar,
  biChatDots,
  biChevronExpand,
  biChevronRight,
  biCreditCard2Front,
  biCrop,
  biCursorText,
  biDatabase,
  biEmojiSmile,
  biFile,
  biFileEarmark,
  biFileImage,
  biFolder,
  biGear,
  biHouseDoor,
  biInputCursorText,
  biLayers,
  biLayoutSidebar,
  biList,
  biMarkdown,
  biPeople, biPerson, biPersonBadge,
  biPersonCircle,
  biPieChart,
  biSegmentedNav,
  biShieldCheck,
  biTable,
  biToggleOff,
  biUpload,
  biWindowSidebar
} from '@quasar/extras/bootstrap-icons';
import { mdiRobotConfused } from '@quasar/extras/mdi-v7';
import type { LabelValue } from 'src/types/common';
export const appNavs: LabelValue<any>[] = [
  {
    children: [
      {
        icon: biHouseDoor,
        label: 'nav.dashboard',
        to: '/',
        rbac: {
          permissions: ['backend_login']
        }
      }
    ]
  },
  {
    label: 'nav.developers',
    children: [
      {
        label: 'nav.systemData',
        icon: biGear,
        children: [
          {
            label: 'model_permission',
            icon: biShieldCheck,
            to: '/permission',
            rbac: {
              permissions: ['permission_list']
            }
          }
        ]
      }
    ]
  },
  {
    label: 'nav.forAdmin',
    children: [
      {
        label: 'nav.userData',
        icon: biPersonBadge,
        children: [
          {
            label: 'nav.userRole',
            icon: biPeople,
            to: '/role',
            rbac: {
              permissions: ['role_list']
            }
          },
          {
            label: 'nav.appUser',
            icon: biPerson,
            to: '/user',
            rbac: {
              permissions: ['user_list']
            }
          }
        ]
      }
    ]
  },
  {
    label: 'nav.more',
    children: [
      {
        label: 'model_files_manager',
        icon: biFolder,
        to: '/myFiles?_id=root',
        rbac: {
          permissions: ['file_manager_manage']
        }
      }
    ]
  }
];

export const additionalMenu: LabelValue<any>[] = [
  {
    avatar: { src: 'https://cdn.quasar.dev/img/avatar3.jpg' },
    label: 'My profile',
    translateLabel: false,
  },
  {
    border: true,
    translateLabel: false,
    label: 'Example',
    children: [
      {
        icon: biHouseDoor,
        label: 'nav.dashboard',
        to: '/',
      },
      {
        icon: biList,
        label: 'Composables',
        translateLabel: false,
        children: [
          {
            icon: biChevronRight,
            label: 'useBase',
            translateLabel: false,
            to: '/example/composables/use-base'
          },
          {
            icon: biDatabase,
            label: 'useAxios',
            translateLabel: false,
            to: '/example/composables/use-axios'
          },
          {
            icon: biFileEarmark,
            label: 'usePageFetch',
            translateLabel: false,
            to: '/example/composables/use-pagefecth'
          },
        ]
      },
      {
        icon: biBrush,
        label: 'Components',
        translateLabel: false,
        children: [
          {
            icon: biPersonCircle,
            label: 'Avatar',
            translateLabel: false,
            to: '/example/ui/avatar'
          },
          {
            icon: biApp,
            label: 'Button',
            translateLabel: false,
            to: '/example/ui/button'
          },
          {
            icon: biCreditCard2Front,
            label: 'Card',
            translateLabel: false,
            to: '/example/ui/card'
          },
          {
            icon: biCalendar,
            label: 'Date-time picker',
            translateLabel: false,
            to: '/example/ui/date-picker'
          },
          {
            icon: biBack,
            label: 'Dialog',
            description: 'dialog, popconfirm, menu',
            translateLabel: false,
            to: '/example/ui/dialog'
          },
          {
            icon: biUpload,
            label: 'File picker',
            translateLabel: false,
            to: '/example/ui/file-picker'
          },
          {
            icon: biInputCursorText,
            label: 'Form Input',
            description: 'Form, Input, Textarea',
            translateLabel: false,
            to: '/example/ui/input-text'
          },
          {
            icon: biLayoutSidebar,
            label: 'Menu',
            description: 'Dropdown, Menu, Breadcrumb',
            translateLabel: false,
            to: '/example/ui/menu'
          },
          {
            icon: biChevronExpand,
            label: 'Select',
            description: 'Select, Command palette',
            translateLabel: false,
            to: '/example/ui/select'
          },
          {
            icon: biSegmentedNav,
            label: 'Tabs',
            translateLabel: false,
            to: '/example/ui/tabs'
          },
          {
            icon: biToggleOff,
            description: 'Toggle,Options,Radios',
            label: 'Options group',
            translateLabel: false,
            to: '/example/ui/toggle'
          },
          {
            icon: biLayers,
            label: 'Transitions',
            translateLabel: false,
            to: '/example/ui/transitions'
          },
          {
            icon: biPerson,
            label: 'User',
            translateLabel: false,
            to: '/example/ui/user'
          },
        ],
      },
      {
        icon: biWindowSidebar,
        label: 'Social feed',
        translateLabel: false,
        to: '/example/feed',
      },
      {
        icon: biPieChart,
        label: 'Charts',
        translateLabel: false,
        to: '/example/charts'
      },
      {
        icon: biChatDots,
        label: 'Chat',
        translateLabel: false,
        to: '/example/chats'
      },
      {
        icon: biTable,
        label: 'Crud table',
        translateLabel: false,
        to: '/example/crud-table'
      },
      {
        icon: biCursorText,
        label: 'Content text',
        description: 'Display user input',
        translateLabel: false,
        to: '/example/content-text'
      },
      {
        icon: biArrowsMove,
        label: 'Darg and Drop',
        translateLabel: false,
        to: '/example/drag-drop'
      },
      {
        icon: biEmojiSmile,
        label: 'Icon/Emoji picker',
        description: 'Emoji and Icon',
        translateLabel: false,
        to: '/example/emoji-picker'
      },
      {
        icon: biCrop,
        label: 'Image cropper',
        translateLabel: false,
        to: '/example/image-cropper'
      },
      {
        icon: biFileImage,
        label: 'Image/Pdf View',
        translateLabel: false,
        to: '/example/image-view'
      },
      {
        icon: biArrowDownCircle,
        label: 'Infinite scroll',
        translateLabel: false,
        to: '/example/infinite-scroll'
      },
      {
        icon: biMarkdown,
        label: 'Markdown editor',
        translateLabel: false,
        to: '/example/markdown-editor'
      },
      {
        icon: biFile,
        label: 'Result',
        description: 'Error, Success, 404, Alert',
        translateLabel: false,
        to: '/example/result'
      },
      {
        icon: biArrowLeftRight,
        label: 'Swiper Carousel',
        description: 'Swiper js',
        translateLabel: false,
        to: '/example/swiper'
      },
      {
        icon: biArrowDownUp,
        label: 'Virtual scroller',
        translateLabel: false,
        to: '/example/virtual-scroller'
      },
      {
        icon: biBug,
        label: 'Test page',
        translateLabel: false,
        to: '/test'
      },
      {
        icon: biFile,
        label: 'Blank page',
        translateLabel: false,
        to: '/blank-page'
      },
      {
        icon: mdiRobotConfused,
        label: '404 page',
        translateLabel: false,
        to: '/notfound'
      },
    ]
  },
];
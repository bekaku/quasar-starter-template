<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import {
  biChat,
  biChevronRight,
  biCopy,
  biCreditCard,
  biDisplay,
  biEnvelope,
  biHouseDoor,
  biPencil,
  biPeople,
  biPerson,
  biPersonPlus,
  biPlusCircle,
  biShieldCheck,
  biThreeDots,
  biTrash,
} from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import type { LabelValue } from 'src/types/common';
import { additionalMenu } from '@/libs/navs';
import { ref } from 'vue';
import { useBase } from 'src/composables/useBase';
import BaseDropdownMenu from 'src/components/base/BaseDropdownMenu.vue';
import BaseBreadcrumbs from 'src/components/base/BaseBreadcrumbs.vue';
import BaseScrollArea from 'src/components/base/BaseScrollArea.vue';
import BaseMenuItems from 'src/components/base/BaseMenuItems.vue';
const { t } = useLang();
const { isDark } = useBase();
const { setTitle } = useAppMeta();
setTitle(`Menu | ${t('app.name')}`);
const showMenu = ref(false);
const menus = ref<LabelValue<number>[]>([
  {
    label: 'Edit',
    description: 'edit this item',
    icon: biPencil,
    fetch: false,
    value: 1,
  },
  {
    label: 'Delete',
    icon: biTrash,
    color: 'negative',
    fetch: false,
    value: 2,
  },
  {
    label: 'Copy',
    description: 'Copy this item',
    icon: biCopy,
    fetch: false,
    value: 3,
  },
]);
const menus2: LabelValue<number>[] = [
  {
    label: 'Cody Fisher',
    value: 1,
    description: 'Fisher',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
  },
  {
    label: 'Robert Fox',
    value: 2,
    description: 'Fox',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
  },
  {
    label: 'Esther Howard',
    value: 3,
    description: 'Howard',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
  },
  {
    label: 'Darlene Robertson',
    value: 4,
    description: 'Robertson',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
  },
  {
    label: 'Ralph Edwards',
    value: 5,
    description: 'Edwards',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
  },
];
const submenus: LabelValue<string>[] = [
  {
    label: 'Cody Fisher',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
    border: true,
  },
  {
    label: 'Profile',
    value: 'Profile',
    icon: biPerson,
  },
  {
    label: 'Billing',
    value: 'Billing',
    icon: biCreditCard,
  },
  {
    label: 'Keyboard shortcuts',
    value: 'Keyboard',
    icon: biDisplay,
    border: true,
  },
  {
    label: 'Team',
    value: 'Team',
    icon: biPeople,
  },
  {
    label: 'Invite users',
    icon: biPersonPlus,
    children: [
      {
        label: 'Email',
        value: 'Email',
        icon: biEnvelope,
      },
      {
        label: 'Message',
        value: 'Message',
        icon: biChat,
      },
      {
        label: 'More',
        icon: biPlusCircle,
        children: [
          {
            label: 'Message',
            value: 'Message',
            icon: biChat,
          },
          {
            label: 'Email',
            value: 'Email',
            icon: biEnvelope,
          },
        ],
      },
    ],
  },
];

const exampleHomeBreadcrumb: LabelValue<any>[] = [
  {
    label: 'base.home',
    to: '/',
    icon: biHouseDoor,
    translateLabel: true,
  },
  {
    label: 'About',
  },
  {
    label: 'Review',
  },
  {
    label: 'Permission list',
    to: '/permission',
    icon: biShieldCheck,
  },
];
const onMenuClick = (value: number | string | undefined) => {
  console.log('onMenuClick', value);
  showMenu.value = false;
};
const openMenu = (event: any) => {
  if (event) {
    event.stopImmediatePropagation();
  }
  showMenu.value = true;
};
const onItemClick = () => {
  console.log('onItemClick');
};
</script>
<template>
  <BasePage :full="false">
    <BaseCard flat :bordered="false" title="Dropdown menu">
      <q-card-section class="q-gutter-md">
        <BaseButton :icon="biThreeDots" outline label="Simple menu">
          <BaseDropdownMenu :items="menus" @on-click="onMenuClick" />
        </BaseButton>
        <BaseButton :icon="biThreeDots" outline label="Submenus">
          <BaseDropdownMenu :items="submenus" @on-click="onMenuClick" />
        </BaseButton>
        <q-item clickable @click="onItemClick">
          <q-item-section> Q-item open state </q-item-section>
          <q-item-section side>
            <BaseButton :icon="biThreeDots" outline label="Click here" @click="openMenu($event)">
              <BaseDropdownMenu v-model:open="showMenu" :items="menus2" @on-click="onMenuClick" />
            </BaseButton>
          </q-item-section>
        </q-item>
      </q-card-section>
    </BaseCard>
    <BaseCard flat :bordered="false" title="Breadcrumb">
      <q-card-section>
        <BaseBreadcrumbs :items="exampleHomeBreadcrumb" />
        <BaseBreadcrumbs
          :items="exampleHomeBreadcrumb"
          :separator-icon="biChevronRight"
          text-color="orange"
          active-color="secondary"
        />
      </q-card-section>
    </BaseCard>

    <BaseCard flat :bordered="false" title="Menu">
      <div class="row">
        <div class="col-12 col-md-4 q-pa-sm">
          <BaseScrollArea>
            <BaseMenuItems :items="additionalMenu">
              <template #end="{ menuItem }">
                <q-item-section side>
                  <q-chip class="bg-app-content-item">
                  <!-- <q-chip :color="!isDark ? 'grey-3' : 'grey-8'"> -->
                    {{ menuItem.label?.charAt(0).toUpperCase() }}
                  </q-chip>
                </q-item-section>
              </template>
            </BaseMenuItems>
          </BaseScrollArea>
        </div>
      </div>
    </BaseCard>
  </BasePage>
</template>

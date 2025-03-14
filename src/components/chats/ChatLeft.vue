<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useLang } from '@/composables/useLang';
import type { ChatHistoryTab, LabelValue } from '@/types/common';
import { biPlus, biSearch } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref } from 'vue';
import BaseTabs from '../base/BaseTabs.vue';
import BaseScrollArea from '../base/BaseScrollArea.vue';
import BaseInput from '../base/BaseInput.vue';

const { t } = useLang();
const { height = 450, autofocus = false } = defineProps<{
  height?: number;
  autofocus?: boolean;
}>();
const histotyTab = ref<ChatHistoryTab>('ALL');
const histotyTabs = ref<LabelValue<ChatHistoryTab>[]>([
  {
    label: t('chats.all'),
    value: 'ALL',
  },
  {
    label: t('chats.groups'),
    value: 'GROUP',
  },
  {
    label: t('chats.favorite'),
    value: 'FAVORITE',
  },
]);
const searchText = ref();
onMounted(async () => {});
const items = [
  {
    id: 1,
    name: 'Cody Fisher',
    time: '12.30',
    new: 9,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?',
  },
  {
    id: 2,
    name: 'Vue Team',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀',
  },
  {
    id: 3,
    name: 'Robert Fox',
    time: '12.30',
    new: 8,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n',
  },
  {
    id: 4,
    name: 'Esther Howard',
    time: '12.30',
    new: 1,
    online: false,
    image: 'https://randomuser.me/api/portraits/women/79.jpg',
    message: 'Quick one, team! Anyone',
  },
  {
    id: 5,
    name: 'Darlene Robertson',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://randomuser.me/api/portraits/women/21.jpg',
    message: 'ust explored PrimeVue\'s themes',
  },
  {
    id: 6,
    name: 'Ralph Edwards',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://randomuser.me/api/portraits/men/44.jpg',
    message: 'PrimeVue is a game-changer, righ',
  },
  {
    id: 7,
    name: 'Darrell Steward',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/81.jpg',
    message: 'Reflecting on PrimeVue\'s impact o',
  },
  {
    id: 8,
    name: 'Vue Team',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://randomuser.me/api/portraits/men/88.jpg',
    message: 'Let\'s implement PrimeVue',
  },
  {
    id: 9,
    name: 'Cody Fisher',
    time: '12.30',
    new: 9,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/0.jpg',
    message: 'Hey there! I\'ve heard about PrimeVue. Any cool tips for getting started?',
  },
  {
    id: 10,
    name: 'Vuy Team',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/30.jpg',
    message: 'Let\'s implement PrimeVue. Elevating our UI game! 🚀',
  },
  {
    id: 11,
    name: 'Robert Fox',
    time: '12.30',
    new: 8,
    online: true,
    image: 'https://randomuser.me/api/portraits/men/22.jpg',
    message: 'Interesting! PrimeVue sounds amazing. What\'s your favorite feature?\n',
  },
  {
    id: 12,
    name: 'Esther Howard',
    time: '12.30',
    new: 1,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
    message: 'Quick one, team! Anyone',
  },
  {
    id: 13,
    name: 'Darlene Robertson',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    message: 'ust explored PrimeVue\'s themes',
  },
  {
    id: 14,
    name: 'Ralph Edwards',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
    message: 'PrimeVue is a game-changer, righ',
  },
  {
    id: 15,
    name: 'Darrell Steward',
    time: '12.30',
    new: 0,
    online: true,
    image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar7.png',
    message: 'Reflecting on PrimeVue impact o',
  },
  {
    id: 16,
    name: 'Staf Team',
    time: '12.30',
    new: 0,
    online: false,
    image: 'https://randomuser.me/api/portraits/women/17.jpg',
    message: 'Let\'s implement PrimeVue',
  },
];
</script>
<template v-bind="$attrs">
  <q-card flat>
    <q-toolbar>
      <q-toolbar-title class="text-weight-bold">
        {{ t('chats.chats') }}
      </q-toolbar-title>
      <q-btn flat round :icon="biPlus" />
    </q-toolbar>
    <q-card-section>
      <BaseInput v-model="searchText" :label="t('base.search')">
        <template #prepend>
          <q-icon :name="biSearch" />
        </template>
      </BaseInput>
    </q-card-section>

    <BaseTabs v-model="histotyTab" :items="histotyTabs" use-tab-panels keep-alive class="q-ml-xs">
      <template #ALL>
        <q-list>
          <BaseScrollArea height="61vh">
            <q-item v-for="(item, index) in items" :key="`${item.id}-${index}`" clickable>
              <q-item-section avatar>
                <base-avatar :fetch-image="false" :src="item.image" size="42px">
                  <template v-if="item.online" #extra>
                    <q-badge
                      floating
                      color="positive"
                      rounded
                      transparent
                      class="absolute"
                      style="top: 30px"
                    />
                  </template>
                </base-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>
                  {{ item.name }}
                </q-item-label>
                <q-item-label caption lines="1">
                  {{ item.message }}
                </q-item-label>
              </q-item-section>
              <q-item-section side>
                <q-item-label caption lines="1">
                  {{ item.time }}
                </q-item-label>
                <q-item-label v-if="item.new > 0" caption>
                  <q-badge color="negative">
                    {{ item.new }}
                  </q-badge>
                </q-item-label>
              </q-item-section>
            </q-item>
          </BaseScrollArea>
        </q-list>
      </template>
      <template #GROUP> GROUP </template>
      <template #FAVORITE> FAVORITE </template>
    </BaseTabs>
  </q-card>
</template>

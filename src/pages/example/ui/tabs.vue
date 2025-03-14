<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { TabTest } from '@/libs/tabs';
import { biChatDots, biMic, biMusicNote, biPlay } from '@quasar/extras/bootstrap-icons';
import BaseButtonToggle from 'src/components/base/BaseButtonToggle.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseTabs from 'src/components/base/BaseTabs.vue';
import BaseTabsRoute from 'src/components/base/BaseTabsRoute.vue';
import type { LabelValue } from 'src/types/common';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Tabs | ${t('app.name')}`);
const tabModel = ref<string>('home');
const groupTabs = ref<LabelValue<string>[]>([
  {
    label: 'Home',
    value: 'home',
  },
  {
    label: 'About',
    value: 'about',
  },
  {
    label: 'Review',
    value: 'review',
    icon: biChatDots,
  },
  {
    label: 'Photos',
    value: 'photos',
  },
  {
    label: 'Videos',
    value: 'videos',
    disable: true,
  },
]);
const toggleModel = ref<string>('music');
const toggleOptions: LabelValue<string>[] = [
  { label: 'Music', value: 'music', icon: biMusicNote },
  { label: 'Podcasts', value: 'podcasts', icon: biMic },
  { label: 'Live', value: 'live', icon: biPlay },
];
</script>
<template>
  <BasePage>
    <BaseCard flat :bordered="false" title="Tabs route">
      <q-card-section>
        <BaseTabsRoute :items="TabTest" />
      </q-card-section>
    </BaseCard>
    <BaseCard flat :bordered="false" :title="`Tab '${tabModel}'`">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-sm">
            <BaseTabs
              v-model="tabModel"
              :items="groupTabs"
              use-tab-panels
              active-color="deep-orange"
              class="q-ml-xs"
            >
              <template #app-tab="{ item }">
                <q-badge v-if="item.value == 'review'" color="deep-orange" floating>99 </q-badge>
              </template>
              <template #home>
                <BaseCard title="Home">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #about>
                <BaseCard title="About">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #review>
                <BaseCard title="Review">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #photos>
                <BaseCard title="Photos">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
              <template #videos>
                <BaseCard title="Videos">
                  <q-card-section>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </q-card-section>
                </BaseCard>
              </template>
            </BaseTabs>
          </div>
          <div class="col-12 col-md-4 q-pa-sm">
            <BaseTabs
              v-model="tabModel"
              :items="groupTabs"
              default-tab
              align="left"
              text-color="pink"
            />
          </div>
          <div class="col-12 col-md-4 q-pa-sm">
            <BaseTabs
              v-model="tabModel"
              :items="groupTabs"
              default-tab
              align="left"
              text-color="white"
              bg-color="primary"
            />
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseCard flat :bordered="false" :title="`Button toggle '${toggleModel}'`">
      <div class="q-pa-md">
        <BaseButtonToggle v-model="toggleModel" :options="toggleOptions" />
      </div>
    </BaseCard>
  </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
  width: 200px;
}
</style>

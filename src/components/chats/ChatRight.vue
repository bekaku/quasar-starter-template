<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useLang } from '@/composables/useLang';
import {
  biArrowRight,
  biBoxArrowRight,
  biCameraVideo,
  biChevronRight,
  biTelephone,
  biThreeDots,
  biVolumeUp,
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import type { LabelValue } from 'src/types/common';
import { onMounted, ref } from 'vue';
import BaseTabs from '../base/BaseTabs.vue';

const { t } = useLang();
const { dark } = useQuasar();
const { height = 450, autofocus = false } = defineProps<{
  height?: number;
  autofocus?: boolean;
}>();
const midiaTab = ref<'MEDIA' | 'FILES'>('MEDIA');
const notification = ref(true);
const midiaTabs = ref<LabelValue<'MEDIA' | 'FILES'>[]>([
  {
    label: t('chats.media'),
    value: 'MEDIA',
  },
  {
    label: t('chats.files'),
    value: 'FILES',
  },
]);
onMounted(async () => {});
const onHMidiaTabChange = (event: any) => {
  console.log('onHMidiaTabChange', event);
};
</script>
<template>
  <q-card v-bind="$attrs" flat class="">
    <q-scroll-area
      style="height: 90vh"
      content-active-style="width: 100%;"
      content-style="width: 100%;"
    >
      <q-card-section class="text-center">
        <base-avatar
          :fetch-image="false"
          src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg"
          rounded
          size="75px"
        />
        <div class="text-subtitle1 text-weight-bold q-pt-sm">Esther Howard</div>
        <div class="text-caption text-muted">@esther_howard</div>
        <div class="row justify-center">
          <q-btn flat round :icon="biTelephone" size="sm" />
          <q-btn flat round :icon="biCameraVideo" size="sm" />
          <q-btn flat round :icon="biBoxArrowRight" size="sm" />
          <q-btn flat round :icon="biThreeDots" size="sm" />
        </div>
      </q-card-section>
      <q-list dense>
        <q-item>
          <q-item-section avatar>
            <q-icon :name="biVolumeUp" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Notification</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-toggle v-model="notification" />
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label> Members(99) </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat label="See All" no-caps class="text-weight-bold q-text-black" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar
              :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Robin Jonas</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar
              :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Cameron Williamson</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar
              :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Eleanor Pena</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <base-avatar
              :fetch-image="false"
              src="https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar8.png"
            />
          </q-item-section>
          <q-item-section>
            <q-item-label>Arlene McCoy</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-btn flat round :icon="biChevronRight" />
          </q-item-section>
        </q-item>
      </q-list>

      <BaseTabs v-model="midiaTab" :items="midiaTabs" use-tab-panels class="q-ml-xs">
        <template #MEDIA>
          <div class="row">
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img
                src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image1.png"
              />
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img
                src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image2.png"
              />
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img
                src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image3.png"
              />
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img
                src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image4.png"
              />
            </div>
            <div class="col-4 q-pa-sm cursor-pointer">
              <q-img
                src="https://www.primefaces.org/cdn/primevue/images/landing/apps/chat-image5.png"
              />
            </div>
            <div class="col-4 q-pa-sm">
              <div
                v-ripple
                class="text-subtitle1 full-height row items-center justify-center relative-position q-hoverable cursor-pointer app-border-radius"
                :class="dark.isActive ? 'bg-grey-8' : 'bg-grey-3'"
              >
                <span class="q-focus-helper" />
                <div>99+</div>
              </div>
            </div>
          </div>

          <q-btn class="full-width q-mt-md" label="See more" outline :icon-right="biArrowRight" />
        </template>
        <template #FILES> DOCS </template>
      </BaseTabs>
    </q-scroll-area>
  </q-card>
</template>

<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import type { LabelValue } from '@/types/common';
import {
  biAirplane,
  biApple,
  biFacebook,
  biGear,
  biGoogle,
  biLightbulb,
  biMicrosoft,
  biPerson,
  biPhone,
  biTwitter,
  biX,
} from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseCommandPalette from 'src/components/base/BaseCommandPalette.vue';
import BaseDialog from 'src/components/base/BaseDialog.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseSelect from 'src/components/base/BaseSelect.vue';
import BaseSelectAlt from 'src/components/base/BaseSelectAlt.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Select | ${t('app.name')}`);
const singleModel = ref<number>();
const singleLazyModel = ref<number>();
const multipleModel = ref<number[]>([]);
const singleModel2 = ref<number>();
const multipleAnyModel = ref<any[]>([]);
const lazyLoading = ref(false);
const cascadeLoading = ref(false);
const commandPaletteModel = ref<number[]>([]);
const showCommandPaletteDialog = ref<boolean>(false);
const lazyItems = ref<LabelValue<number>[]>([
  {
    label: 'api_client_list',
    value: 1,
  },
]);

const simpleItems: LabelValue<number>[] = [
  {
    label: 'Google',
    value: 1,
    description: 'Fox',
    icon: biGoogle,
  },
  {
    label: 'Facebook',
    value: 2,
    icon: biFacebook,
  },
  {
    label: 'Twitter',
    value: 3,
    icon: biTwitter,
  },
  {
    label: 'Apple',
    value: 4,
    icon: biApple,
  },
  {
    label: 'Microsoft',
    value: 5,
    icon: biMicrosoft,
  },
];
const simpleItems2: LabelValue<number>[] = [
  {
    label: 'Cody Fisher',
    value: 6,
    description: 'Fisher',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar11.jpg',
  },
  {
    label: 'Robert Fox',
    value: 7,
    description: 'Fox',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar12.jpg',
  },
  {
    label: 'Esther Howard',
    value: 8,
    description: 'Howard',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
  },
  {
    label: 'Darlene Robertson',
    value: 9,
    description: 'Robertson',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar9.jpg',
  },
  {
    label: 'Ralph Edwards',
    value: 10,
    description: 'Edwards',
    avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
  },
];
const simpleItems3: any[] = [
  {
    name: 'Cody Fisher',
    id: 1,
  },
  {
    name: 'Robert Fox',
    id: 2,
  },
  {
    name: 'Esther Howard',
    id: 3,
  },
  {
    name: 'Darlene Robertson',
    id: 4,
  },
  {
    name: 'Ralph Edwards',
    id: 5,
  },
];

const items3: LabelValue<number>[] = [
  {
    label: 'Users',
    children: simpleItems2,
  },
  {
    label: 'Other',
    children: simpleItems,
  },
  {
    label: 'test',
    description: 'Just test',
    value: 55,
  },
];
const onLazyFilter = (val: string, update: any) => {
  console.log('onLazyFilter', val);
  setTimeout(() => {
    update(() => {
      for (let index = 0; index < 30; index++) {
        lazyItems.value.push({
          label: `Label ${lazyItems.value.length + 1}`,
          value: lazyItems.value.length + 1,
        });
      }
      // lazyItems.value.push({
      //     label: `Label ${lazyItems.value.length + 1}`,
      //     value: lazyItems.value.length + 1,
      // })
    });
  }, 2000);
};

const onLazyScroll = (to: number, ref: any) => {
  console.log('onScroll', to, ref);
  lazyLoading.value = true;
  setTimeout(() => {
    for (let index = 0; index < 30; index++) {
      lazyItems.value.push({
        label: `Label ${lazyItems.value.length + 1}`,
        value: lazyItems.value.length + 1,
      });
    }
    lazyLoading.value = false;
  }, 1500);
};
</script>

<template>
  <BasePage>
    <BaseCard title="Select">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-4 q-pa-md">
            <BaseTextHeader title="Single Select" />
            <BaseSelect
              v-model="singleModel"
              required
              can-filter
              clearable
              :items="simpleItems"
              dense
              :multiple="false"
              label="Select Single"
            />
            <p>simpleModel : {{ singleModel }}</p>
          </div>
          <div class="col-12 col-md-4 q-pa-md">
            <BaseTextHeader title="Single Avatar Select" />
            <BaseSelect
              v-model="singleModel2"
              can-filter
              clearable
              :items="simpleItems2"
              dense
              :multiple="false"
              label="Select user"
            />
            <p>singleModel2 : {{ singleModel2 }}</p>
          </div>
          <div class="col-12 col-md-4 q-pa-md">
            <BaseTextHeader title="Multiple Select" />
            <BaseSelect
              v-model="multipleModel"
              can-filter
              clearable
              :items="simpleItems2"
              dense
              use-chips
              multiple
              label="Select Multiple"
            />
            <p>multipleModel : {{ multipleModel }}</p>
          </div>
          <div class="col-12 col-md-4 q-pa-md">
            <BaseTextHeader title="Select Alt" />
            <BaseSelectAlt
              v-model="multipleAnyModel"
              :items="simpleItems3"
              multiple
              dense
              label="Select Any"
              option-label="name"
              option-value="id"
            />
            <p>multipleAnyModel : {{ multipleAnyModel }}</p>
          </div>
          <div class="col-12 col-md-4 q-pa-md">
            <BaseTextHeader title="Lazy loading, Virtual Scroller" />
            <BaseSelect
              v-model="singleLazyModel"
              can-filter
              clearable
              :items="lazyItems"
              dense
              :multiple="false"
              lazy
              :input-debounce="300"
              :lazy-loading="lazyLoading"
              label="Select lazy Single"
              no-options-text="Type for search"
              @on-filter="onLazyFilter"
              @on-scroll="onLazyScroll"
            />
            <p>simpleModel : {{ singleLazyModel }}</p>
          </div>
        </div>

        <div class="text-h5 q-my-sm">Command palette {{ commandPaletteModel }}</div>

        <div class="row">
          <div class="col-12 col-md-6">
            <BaseCommandPalette v-model="commandPaletteModel" multiple :items="items3" />
          </div>
          <div class="col-12 col-md-6 q-px-md">
            <div class="text-h5 q-my-sm">Command palette dialog {{ commandPaletteModel }}</div>
            <BaseButton
              outline
              label="Open Command palette dialog"
              @click="showCommandPaletteDialog = true"
            />
          </div>
        </div>
      </q-card-section>
    </BaseCard>
    <BaseDialog
      v-model="showCommandPaletteDialog"
      :padding="false"
      :show-toolbar="false"
      dialog-style="width: 756px; max-width: 80vw;"
    >
      <BaseCommandPalette
        v-model="commandPaletteModel"
        :bordered="false"
        class="q-pt-sm"
        multiple
        :items="items3"
      >
        <template #inputAppend>
          <BaseButton flat round :icon="biX" @click="showCommandPaletteDialog = false" />
        </template>
      </BaseCommandPalette>
    </BaseDialog>
  </BasePage>
</template>

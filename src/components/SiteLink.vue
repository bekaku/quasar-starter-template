<template>
  <q-card flat class="q-mt-md bg-transparent">
    <div
      class="q-px-md"
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
    >
      <div class="row items-center q-gutter-x-sm">
        <app-link
          v-for="button in buttons1"
          :label="button.text"
          :key="button.text"
          color="text-grey-7"
          color-dark="text-grey-5"
          style="font-weight: 500; font-size: 0.75rem"
        />
      </div>
    </div>
    <div
      class="q-py-md q-px-md"
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
    >
      <div class="row items-center q-gutter-x-sm">
        <app-link
          v-for="button in buttons2"
          :label="button.text"
          :key="button.text"
          color="text-grey-7"
          color-dark="text-grey-5"
          style="font-weight: 500; font-size: 0.75rem"
        />
      </div>
    </div>
    <q-separator />

    <div
      class="q-py-md q-px-md"
      :class="$q.dark.isActive ? 'text-grey-5' : 'text-grey-7'"
    >
      <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
        <q-avatar size="28px" class="q-mr-xs">
          <img src="/logo/logo-36.png" />
        </q-avatar>
        <a class="YL__drawer-footer-link" href="javascript:void(0)">
          {{ `${t('app.monogram')} @ ${getYearNow()}` }}
        </a>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { getYearNow } from 'src/utils/dateUtil';
import { useLang } from '@/composables/useLang';
import AppLink from 'src/components/base/AppLink.vue';
const { t } = useLang();
const buttons1 = [
  { text: 'About' },
  { text: 'Press' },
  { text: 'Copyright' },
  { text: 'Contact us' },
  { text: 'Creators' },
  { text: 'Help Center' },
  { text: 'Developers' },
];
const buttons2 = [
  { text: 'Terms' },
  { text: 'Privacy' },
  { text: 'Policy & Safety' },
  { text: 'Test new features' },
];
</script>
<style lang="sass">
.YL
  &__drawer-footer-link
    color: inherit
    text-decoration: none
    font-weight: 500
    font-size: .75rem
    &:hover
      text-decoration: underline
</style>

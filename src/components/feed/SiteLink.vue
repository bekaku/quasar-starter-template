<template>
  <q-card flat class="q-mt-md bg-transparent">
    <!-- <div
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
    </div> -->
    <div class="q-py-md q-px-md" :class="dark.isActive ? 'text-grey-5' : 'text-grey-7'">
      <div class="row items-center q-gutter-x-sm">
        <!-- <app-link
          v-for="button in buttons2"
          :label="t(button.text)"
          :key="button.text"
          :external="button.external"
          :href="button.link"
          color="text-grey-7"
          color-dark="text-grey-5"
          style="font-weight: 500; font-size: 0.75rem"
        /> -->
        <q-item v-for="button in buttons2" :key="button.text" :href="button.link" target="_blank">
          <q-item-section avatar>
            <q-icon :name="biShieldExclamation" />
          </q-item-section>
          <q-item-section>
            <q-item-label caption> {{ t(button.text) }}</q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
    <q-separator />

    <div class="q-py-md q-px-md" :class="dark.isActive ? 'text-grey-5' : 'text-grey-7'">
      <div class="row items-center q-gutter-x-sm q-gutter-y-xs">
        <q-avatar square size="42px" class="q-mr-xs">
          <img src="/logo/logo.png" />
        </q-avatar>
        <a class="YL__drawer-footer-link" href="javascript:void(0)">
          {{ `${t('app.monogram')} @ ${getYearNow()} V.${appVersion}` }}
        </a>
      </div>
    </div>
  </q-card>
</template>

<script setup lang="ts">
import { getYearNow } from '@/utils/dateUtil';
import { useLang } from '@/composables/useLang';
import { biShieldExclamation } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
const { dark } = useQuasar();
const { t } = useLang();
// const buttons1 = [
//   { text: 'About' },
//   { text: 'Press' },
//   { text: 'Copyright' },
//   { text: 'Contact us' },
//   { text: 'Creators' },
//   { text: 'Help Center' },
//   { text: 'Developers' },
// ];
const buttons2 = [
  {
    text: 'base.termAndprivacyPolicy',
    link: 'http://www.grandats.com/synapse-policy/policy.html',
    external: true,
  },
];
const appVersion = process.env.APP_VERSION;
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

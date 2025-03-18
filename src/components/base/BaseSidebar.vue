<script setup lang="ts">
import { biCommand, biGear, biQuestionCircle, biSearch } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { useAppStore } from 'src/stores/appStore';
import { defineAsyncComponent, onBeforeUnmount, onMounted, ref } from 'vue';
import { additionalMenu } from '@/libs/navs';
import BaseDrawer from './BaseDrawer.vue';
import BaseMenuItems from './BaseMenuItems.vue';
import { getYearNow } from '@/utils/dateUtil';
import { useDevice } from 'src/composables/useDevice';
const SearchMenu = defineAsyncComponent(() => import('@/components/search/SearchMenu.vue'));
const {
  overlay = false,
  bordered = false,
  miniToOverlay = true,
  width = 270,
  tranparent = false,
  expanAll = false,
} = defineProps<{
  overlay?: boolean;
  miniToOverlay?: boolean;
  bordered?: boolean;
  width?: number;
  tranparent?: boolean;
  expanAll?: boolean
}>();

const { version: quasarVersion } = useQuasar();
const { t } = useLang();
const { appGoto } = useBase();
const { isMobileOrTablet: checkMobileOrTablet } = useDevice();
const appStore = useAppStore();
const modelValue = defineModel<boolean>({ default: true });
const miniState = ref(true);
const isMobileOrTablet = ref<boolean>(false);
const searchTimeout = ref<any>();
const showSearch = ref(false);

onMounted(() => {
  checkMobileOrTablet().then((result) => {
    isMobileOrTablet.value = result;
    miniState.value = !result;
    appStore.setDrawerOpen(!result);
  });
});
const onOpenSearch = () => {
  showSearch.value = true;
};
const onSearchMenuClick = (to: string) => {
  showSearch.value = false;
  setTimeout(() => {
    appGoto(to);
  }, 500);
};
const onDrawerHide = () => {
  console.log('onDrawerHide', modelValue.value);
};
const onMounseover = () => {
  if (!isMobileOrTablet.value) {
    miniState.value = false;
  }
};
const onMounseout = () => {
  if (!isMobileOrTablet.value) {
    miniState.value = true;
  }
};
onBeforeUnmount(() => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value);
  }
  searchTimeout.value = null;
});
</script>
<template>
  <BaseDrawer
    v-model="modelValue"
    :mini="miniState && !appStore.expandDrawer"
    :mini-to-overlay="miniToOverlay && !appStore.expandDrawer"
    :width="width"
    :overlay="overlay"
    :bordered="bordered"
    :tranparent
    @mouseover="onMounseover"
    @mouseout="onMounseout"
    @hide="onDrawerHide"
  >
    <q-scroll-area class="fit">
      <div v-show="!miniState || appStore.expandDrawer">
        <!-- <div class="row justify-center q-pa-sm">
          <q-btn flat dense round to="/" class="btn--no-hover">
            <q-avatar style="height: auto; width: 44px" square>
              <img alt="logo" :src="!isDark ? '/logo/logo-black.png' : '/logo/logo-white.png'" />
            </q-avatar>
          </q-btn>
        </div>
        <q-separator /> -->

        <q-item clickable dense class="search-item" @click="onOpenSearch">
          <q-item-section side>
            <q-icon :name="biSearch" size="xs" class="text-muted" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-muted">
              {{ t('base.searchMenu') }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="biCommand" size="xs" class="text-muted" />
          </q-item-section>
        </q-item>
      </div>
      <!-- <BaseMenuItems :items="appStore.drawers" :expan-all /> -->
      <BaseMenuItems :items="additionalMenu" :expan-all>
        <template #after>
          <q-separator />
          <q-item clickable>
            <q-item-section side>
              <q-icon class="q-text-black" :name="biQuestionCircle" size="20px" />
            </q-item-section>
            <q-item-section>{{ t('base.help') }}</q-item-section>
          </q-item>
          <q-item clickable to="/settings">
            <q-item-section side>
              <q-icon class="q-text-black" :name="biGear" size="20px" />
            </q-item-section>
            <q-item-section>{{ t('base.setting') }}</q-item-section>
          </q-item>
          <q-separator />
          <q-item>
            <q-item-section class="text-center">
              <q-item-label caption>
                {{ `@ ${getYearNow()} ${t('app.monogram')}` }}
              </q-item-label>
              <q-item-label caption>
                {{ `Quasar ${quasarVersion}` }}
              </q-item-label>
            </q-item-section>
          </q-item>
        </template>
      </BaseMenuItems>
    </q-scroll-area>

    <SearchMenu v-if="showSearch" v-model="showSearch" @on-click="onSearchMenuClick" />
  </BaseDrawer>
</template>
<style lang="scss" scoped>
.search-item {
  padding: 10px;
  margin: 10px 10px 20px 10px;
  border-radius: 10px;
  border: var(--app-main-border-color) 1px solid;
}
</style>

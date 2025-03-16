<script setup lang="ts">
import { onMounted, defineAsyncComponent, ref, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { usePaging } from '@/composables/usePaging';
import { useSort } from '@/composables/useSort';
import type { Permission } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import PermissionService from '@/api/PermissionService';
import { biArrowLeft, biPlus } from '@quasar/extras/bootstrap-icons';
const BaseResult = defineAsyncComponent(() => import('@/components/base/BaseResult.vue'));
const BaseLoadmore = defineAsyncComponent(() => import('@/components/BaseLoadmore.vue'));
const BaseSpinner = defineAsyncComponent(() => import('@/components/base/BaseSpinner.vue'));
const { t } = useLang();
const { pages, resetPaging } = usePaging(5);
const { sort } = useSort({
  column: 'id',
  mode: 'desc',
});

const { setTitle } = useAppMeta();
setTitle(`${t('model_files_manager')} | ${t('app.name')}`);
const { findAll } = PermissionService();
const isInfiniteDisabled = ref(false);
const fristLoaded = ref(false);
const loading = ref(false);

// const reponseItem = ref<IApiListResponse<Permission>>();
const items = ref<Permission[]>([]);

const pageParam = computed(
  () =>
    `?page=${pages.value.current > 0 ? pages.value.current - 1 : 0}&size=${
      pages.value.itemsPerPage
    }&sort=${sort.value.column},${sort.value.mode}`,
);
onMounted(async () => {
  loadData();
});
const resetData = () => {
  resetPaging();
  items.value = [];
  fristLoaded.value = false;
  isInfiniteDisabled.value = false;
};
const doRefresh = async (event: any) => {
  resetData();
  await loadData();
  if (event) {
    event.target.complete();
  }
};
const loadData = async () => {
  const res = await findAll(pageParam.value);
  console.log('findAll', res);
  if (res) {
    items.value.push(...res.dataList);
    if (res.last || res.totalElements == 0) {
      isInfiniteDisabled.value = true;
    }
  } else {
    isInfiniteDisabled.value = true;
  }
  if (!fristLoaded.value) {
    fristLoaded.value = true;
  }
  return new Promise((resolve) => {
    resolve(true);
  });
};
const loadNextPage = async () => {
  pages.value.current++;
  loading.value = true;
  await loadData();
  loading.value = false;
};
</script>
<template>
  <q-page padding>
    <q-card flat bordered class="content-limit">
      <q-card-section>
        <q-toolbar>
          <q-btn flat :icon="biArrowLeft" :label="t('base.back')" to="/company-theme/view/0" />
          <q-toolbar-title> Reward Shop</q-toolbar-title>
          <q-space />
          <q-btn flat :icon="biPlus" :label="t('base.addNew')" to="/company-theme/view/0" />
        </q-toolbar>
        <q-separator />
      </q-card-section>
      <q-card-section>
        <template v-if="!fristLoaded">
          <base-spinner></base-spinner>
        </template>
        <template v-else>
          <base-result
            v-if="items.length == 0"
            status="empty"
            :description="t('error.dataNotfound')"
          />
          <template v-else>
            {{ items }}
            <base-loadmore
              v-if="!isInfiniteDisabled"
              :loading="loading"
              :frist-loaded="fristLoaded"
              :is-infinite-disabled="isInfiniteDisabled"
              :label="t('base.loadMore')"
              @on-next-page="loadNextPage"
              button
              show-icon
              full-width
            >
            </base-loadmore>
          </template>
        </template>
      </q-card-section>
    </q-card>
  </q-page>
</template>

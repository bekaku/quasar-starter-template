<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import {
  biAirplane,
  biChatLeft,
  biGear,
  biLightbulb,
  biNewspaper,
  biPerson,
  biPhone,
  biQuestionCircle,
  biRadar,
  biShop,
  biWrench,
} from '@quasar/extras/bootstrap-icons';
import UserService from 'src/api/UserService';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import CrudApiList from 'src/components/base/CrudApiList.vue';
import { useBase } from 'src/composables/useBase';
import { usePaging } from 'src/composables/usePaging';
import { useSort } from 'src/composables/useSort';
import type { ICrudListHeader, ISortModeType } from 'src/types/common';
import { CrudListDataType, ICrudListHeaderOptionSearchType } from 'src/types/common';
import type { UserDto } from 'src/types/models';
import { sortArray } from 'src/utils/appUtil';
import { computed, onMounted, ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Crud table | ${t('app.name')}`);
const headers = ref<ICrudListHeader[]>([
  {
    label: 'Image',
    translateLabel: false,
    column: 'avatar.thumbnail',
    type: CrudListDataType.AVATAR,
    options: {
      fillable: true,
      align: 'center',
      size: '55px',
    },
  },
  {
    label: 'Email',
    translateLabel: false,
    column: 'email',
    type: CrudListDataType.TEXT,
    options: {
      searchable: true,
      sortable: true,
      fillable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':',
    },
  },
  {
    label: 'Username',
    translateLabel: false,
    column: 'username',
    type: CrudListDataType.TEXT,
    options: {
      fillable: true,
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.TEXT,
      searchModel: '',
      searchOperation: ':',
    },
  },
  {
    label: 'Active',
    translateLabel: false,
    column: 'active',
    type: CrudListDataType.STATUS,
    options: {
      fillable: true,
      sortable: true,
      searchable: true,
      align: 'center',
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: true,
      searchOperation: '=',
    },
  },
  {
    label: 'Tools',
    translateLabel: false,
    type: CrudListDataType.BASE_TOOL,
    options: {
      fillable: true,
      editButton: true,
      deleteButton: true,
      copyButton: true,
      align: 'center',
    },
  },
]);
const { findAll } = UserService();
const { appConfirm } = useBase();
const { pages, resetPaging } = usePaging(5);
const { sort } = useSort({
  column: 'id',
  mode: 'desc',
});
const dataList = ref<UserDto[]>([]);
const fristLoaded = ref(false);
const loading = ref(false);
onMounted(async () => {
  fetchData();
});
const pageParam = computed<string>(
  () =>
    `?page=${pages.value.current}&size=${pages.value.itemsPerPage}&sort=${sort.value.column},${sort.value.mode}`,
);
const fetchData = async () => {
  loading.value = true;
  const response = await findAll(pageParam.value);
  console.log('findAll', response);
  if (response) {
    dataList.value = response.dataList;
    if (response.totalPages != undefined) {
      pages.value.totalPages = response.totalPages;
    }
    if (response.totalElements != undefined) {
      pages.value.totalElements = response.totalElements;
    }
    if (response.last != undefined) {
      pages.value.last = response.last;
    }
  }
  if (!fristLoaded.value) {
    fristLoaded.value = true;
  }
  loading.value = false;
  return new Promise((resolve) => resolve(true));
};
const onReload = async () => {
  resetData();
  await fetchData();
};
const resetData = () => {
  resetPaging();
  dataList.value = [];
  fristLoaded.value = false;
};

const onItemClick = (index: number) => {
  console.log('onItemClick', index);
};
const onItemCopy = (index: number) => {
  console.log('onItemCopy', index);
};
const onPageNoChange = async (no: number | undefined) => {
  console.log('onPageNoChange', no);
  if (no == undefined) {
    return;
  }
  pages.value.current = no;
  await fetchData();
};
const onItemPerPageChange = async (no: number | undefined) => {
  console.log('onItemPerPageChange', no);
  if (no == undefined) {
    return;
  }
  pages.value.itemsPerPage = no;
  await fetchData();
};
const onSort = async (column: string) => {
  if (sort.value.column === column) {
    sort.value.mode = sort.value.mode === 'asc' ? 'desc' : 'asc';
  } else {
    sort.value.column = column;
  }
  console.log('onSort', sort.value);
  onSortProcess();
  // TODO fetch data to your API
  // await fetchData();
};
const onSortProcess = async () => {
  dataList.value = await sortArray(
    dataList.value,
    sort.value.column as any,
    sort.value.mode || 'asc',
  );
};
const onSortMode = async (mode: ISortModeType) => {
  console.log('onSortMode', mode);
  sort.value.mode = mode;
  onSortProcess();
  // TODO fetch data to your API
  // await fetchData();
};
const onAdvanceSearch = async (event: any) => {
  console.log('onAdvanceSearch', event);
};
const onItemDelete = async (indexOrIds: number | number[], isSingle: boolean) => {
  const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
  if (!conf) {
    return;
  }
  console.log('onItemDelete', { indexOrIds, isSingle });
  // single or multiple single emit with index, multiple emit with ids
  if (isSingle) {
    dataList.value = dataList.value.filter((item, index) => index !== indexOrIds);
  } else if (Array.isArray(indexOrIds)) {
    dataList.value = dataList.value.filter((item) => item.id && !indexOrIds.includes(item.id));
  }
};
const onNewForm = () => {
  console.log('onNewForm');
};
</script>
<template>
  <BasePage>
    <CrudApiList
      :icon="biPerson"
      :title="t('model_user')"
      crud-name="user"
      :loading="loading"
      :frist-load="fristLoaded"
      :pages="pages"
      :headers="headers"
      :sort="sort"
      :list="dataList"
      @on-item-click="onItemClick"
      @on-item-copy="onItemCopy"
      @on-page-no-change="onPageNoChange"
      @on-items-perpage-change="onItemPerPageChange"
      @on-sort="onSort"
      @on-sort-mode="onSortMode"
      @on-reload="onReload"
      @on-advance-search="onAdvanceSearch"
      @on-item-delete="onItemDelete"
      @on-new-form="onNewForm"
    />
  </BasePage>
</template>
<style lang="scss" scoped>
.btn-fixed-width {
  width: 200px;
}
</style>

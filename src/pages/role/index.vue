<template>
  <q-page padding>
    <crud-api-list
      :icon="biPeople"
      :title="t('model_role')"
      :loading="loading"
      :crud-name="crudName"
      :frist-load="fristLoad"
      :pages="pages"
      :headers="headers"
      :sort="sort"
      :list="filteredList"
      @on-item-click="onItemClick"
      @on-item-copy="onItemCopy"
      @on-page-no-change="onPageNoChange"
      @on-items-perpage-change="onItemPerPageChange"
      @on-sort="onSort"
      @on-sort-mode="onSortMode"
      @on-reload="onReload"
      @update-search="filterText = $event"
      @on-advance-search="onAdvanceSearch"
      @on-item-delete="onItemDelete"
      @on-new-form="onNewForm"
    />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useLang } from '@/composables/useLang';
import { useCrudList } from '@/composables/useCrudList';
import type { Role } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import type { ICrudListHeader } from '@/types/common';
import { CrudListDataType, ICrudListHeaderOptionSearchType } from '@/types/common';
import CrudApiList from '@/components/base/CrudApiList.vue';
import { biPeople } from '@quasar/extras/bootstrap-icons';
useAppMeta();
const { t } = useLang();
const headers = ref<ICrudListHeader[]>([
  {
    label: 'model_role_id',
    column: 'id',
    type: CrudListDataType.NUMBER_FORMAT,
    options: {
      searchable: true,
      sortable: true,
      searchType: ICrudListHeaderOptionSearchType.NUMBER,
      searchModel: '',
      searchOperation: '=',
    },
  },
  {
    label: 'model_role_name',
    column: 'name',
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
  // {
  //   label: 'model_role_name_en',
  //   column: 'nameEn',
  //   type: CrudListDataType.TEXT,
  //   options: {
  //     fillable: true,
  //     searchable: true,
  //     sortable: true,
  //     searchType: ICrudListHeaderOptionSearchType.TEXT,
  //     searchModel: '',
  //     searchOperation: ':',
  //   },
  // },
  {
    label: 'model_permission_frontEnd',
    column: 'frontEnd',
    type: CrudListDataType.STATUS,
    options: {
      fillable: true,
      sortable: true,
      searchable: true,
      align: 'center',
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: false,
      searchOperation: '=',
    },
  },
  {
    label: 'base.enable',
    column: 'active',
    type: CrudListDataType.STATUS,
    options: {
      fillable: true,
      sortable: true,
      searchable: true,
      align: 'center',
      searchType: ICrudListHeaderOptionSearchType.BOOLEAN,
      searchModel: false,
      searchOperation: '=',
    },
  },
  {
    label: 'base.tool',
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
const {
  loading,
  crudName,
  fristLoad,
  pages,
  sort,
  filteredList,
  onItemClick,
  onItemCopy,
  onPageNoChange,
  onItemPerPageChange,
  onSort,
  onSortMode,
  onReload,
  filterText,
  onAdvanceSearch,
  onItemDelete,
  onNewForm,
} = useCrudList<Role>(
  {
    crudName: 'role',
    apiEndpoint: '/api',
    fetchListOnload: true,
    defaultSort: {
      column: 'name',
      mode: 'asc',
    },
  },
  headers,
);
</script>

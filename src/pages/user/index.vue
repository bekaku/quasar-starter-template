<template>
  <q-page padding>
    <crud-api-list
      :icon="biPerson"
      :title="t('model_user')"
      :crud-name="crudName"
      :loading="loading"
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
import type { UserDto } from '@/types/models';
import { useAppMeta } from '@/composables/useAppMeta';
import type { ICrudListHeader } from '@/types/common';
import { CrudListDataType, ICrudListHeaderOptionSearchType } from '@/types/common';
import CrudApiList from '@/components/base/CrudApiList.vue';
import { biPerson } from '@quasar/extras/bootstrap-icons';
useAppMeta();
const { t } = useLang();
const headers = ref<ICrudListHeader[]>([
  {
    label: 'model_user_img_name',
    column: 'avatar.thumbnail',
    type: CrudListDataType.AVATAR,
    options: {
      fillable: true,
      align: 'center',
      size: '55px',
    },
  },
  {
    label: 'model_user_email',
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
    label: 'model_user_username',
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
    label: 'base.enable',
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
} = useCrudList<UserDto>(
  {
    crudName: 'AppUser',
    apiEndpoint: '/api',
    fetchListOnload: true,
    defaultSort: {
      column: 'email',
      mode: 'asc',
    },
  },
  headers,
);
</script>

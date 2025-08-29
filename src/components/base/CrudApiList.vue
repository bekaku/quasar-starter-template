<script setup lang="ts">
import BaseSort from '@/components/base/BaseSort.vue';
import AppPaging from '@/components/base/Paging.vue';
import SkeletonTable from '@/components/skeleton/SkeletonTable.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import { SearchMinCharactor } from '@/libs/constant';
import { useAppStore } from '@/stores/appStore';
import type {
  ICrudAction,
  ICrudListHeader,
  IPagination,
  ISort,
  ISortModeType,
} from '@/types/common';
import { CrudListDataType, ICrudListHeaderOptionSearchType } from '@/types/common';
import { appPreventDefult, getValFromObjectByPath, isEmpty, pascalToSnake } from '@/utils/appUtil';
import { FORMAT_DATE1, FORMAT_DATETIME, formatDate, formatDateTime } from '@/utils/dateUtil';
import {
  biArrowClockwise,
  biCheckCircle,
  biChevronExpand,
  biEraser,
  biFile,
  biPlus,
  biSearch,
  biSortAlphaDown,
  biSortAlphaUpAlt,
  biThreeDotsVertical,
  biTrash,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { computed, defineAsyncComponent, ref } from 'vue';
import BaseCard from './BaseCard.vue';
import BaseCrudActionButton from './BaseCrudActionButton.vue';

const BaseResult = defineAsyncComponent(() => import('@/components/base/BaseResult.vue'));
const BaseDatePicker = defineAsyncComponent(() => import('@/components/base/BaseDatePicker.vue'));
const BaseToggle = defineAsyncComponent(() => import('@/components/base/BaseToggle.vue'));
const CrudApiListHeaderFilter = defineAsyncComponent(
  () => import('@/components/base/CrudApiListHeaderFilter.vue'),
);
const BaseSelect = defineAsyncComponent(() => import('@/components/base/BaseSelect.vue'));

const {
  icon = biFile,
  showPaging = true,
  loading = false,
  fristLoad = false,
  showCheckbox = true,
  showNewBtn = true,
  showSearchBtn = true,
  showSearchTextBox = false,
  showThreeDot = true,
  showFilter = true,
  showSort = true,
  fullWidth = true,
  pages,
  list,
  headers,
  crudName,
  viewPermission,
  managePermission,
  byPassPermission = false,
  tableSeperator = 'horizontal',
  rowClickable = true,
} = defineProps<{
  crudName?: string | undefined;
  viewPermission?: string[];
  managePermission?: string[];
  byPassPermission?: boolean;
  title?: string;
  icon?: string;
  list: any[];
  headers: ICrudListHeader[];
  sort?: ISort;
  pages?: IPagination;
  fristLoad?: boolean;
  loading?: boolean;
  showPaging?: boolean;
  showCheckbox?: boolean;
  showNewBtn?: boolean;
  showSearchBtn?: boolean;
  showSearchTextBox?: boolean;
  showThreeDot?: boolean;
  showFilter?: boolean;
  showSort?: boolean;
  fullWidth?: boolean;
  tableSeperator?: 'horizontal' | 'vertical' | 'cell' | 'none' | undefined;
  rowClickable?: boolean;
}>();
// const emit = defineEmits([
//   'on-page-no-change',
//   'on-items-perpage-change',
//   'update-search',
//   'on-sort',
//   'on-sort-mode',
//   'on-item-copy',
//   'on-item-click',
//   'on-item-delete',
//   'on-new-form',
//   'on-reload',
//   'on-advance-search',
//   'on-keyword-search',
// ]);
const emit = defineEmits<{
  'on-page-no-change': [v: number | undefined];
  'on-items-perpage-change': [v: number | undefined];
  'update-search': [v: any];
  'on-sort': [column: string | undefined];
  'on-sort-mode': [mode: ISortModeType];
  'on-item-copy': [index: number];
  'on-item-click': [index: number, type: ICrudAction];
  'on-item-delete': [indexOrIds: number | number[], isSingle: boolean];
  'on-new-form': [];
  'on-reload': [];
  'on-advance-search': [q: string];
  'on-keyword-search': [q: string];
  'on-col-click': [event: any, index: number, headerOption: any, colValue: any];
}>();
const { t, locale } = useLang();
const { searchOperations, inputSanitizeHtml } = useBase();
const appStore = useAppStore();

const crudPages = ref<IPagination | undefined>(pages);

const filterText = ref('');
const selectedAll = ref(false);
const showSearch = ref(false);
const selected = ref<number[]>([]);
// const updateSearchText = (val: any) => {
//   emit('update-search', val);
// };
const onCheckedAll = () => {
  updateSelectedAll(selectedAll.value);
};
const updateSelectedAll = (val: boolean) => {
  selected.value = [];
  if (val) {
    for (let i = 0; i < list.length; i++) {
      const item = list[i];
      if (item) {
        selected.value.push(item.id);
      }
    }
  }
};
const onDeleteItemSelected = () => {
  if (selected.value.length > 0) {
    onItemDelete(selected.value, false);
  }
};
const onItemDelete = (indexOrIds: number | number[], isSingle: boolean) => {
  emit('on-item-delete', indexOrIds, isSingle);
};
const getItemByIndex = (index: number) => {
  const itemList = list;
  const item = itemList[index];
  if (!item) {
    return;
  }
  return item;
};
const getValueByColunm = (column: string | undefined, index: number) => {
  if (column == undefined) {
    return null;
  }
  const item = getItemByIndex(index);
  if (!column || !item) {
    return null;
  }
  const path = column.split('.');
  if (path.length > 1) {
    return getValFromObjectByPath(item, column);
  }
  return !isEmpty(item[column]) ? item[column] : null;
};
const getValueBoolean = (column: string, index: number) => {
  if (!column) {
    return false;
  }
  const val = getValueByColunm(column, index);
  if (!val) {
    return false;
  }
  return val === true;
};
const sortableHeaders = computed(() => {
  const filters = headers.filter((c) => c.options && c.options.sortable === true);
  const list: any = [];
  for (const item of filters) {
    list.push({
      value: item.options.sortColunm ? item.options.sortColunm : item.column,
      label: item.translateLabel == undefined || item.translateLabel ? t(item.label) : item.label,
    });
  }
  return list;
});
const fillableHeaders = computed(() => {
  if (!headers) {
    return headers;
  }

  return headers.length > 0
    ? headers.filter((c) => c.options && c.options.fillable === true)
    : headers;
});

const searchableHeaders = computed(() => {
  if (!headers) {
    return headers;
  }

  return headers.length > 0
    ? headers.filter((c) => c.options && c.options.searchable === true)
    : headers;
});
const onClearSearch = () => {
  // showSearch.value = false;
  onClearSearchModel();
  emit('on-reload');
};
const onClearSearchModel = () => {
  if (searchableHeaders.value.length > 0) {
    for (const col of searchableHeaders.value) {
      if (col.options) {
        if (col.type == CrudListDataType.STATUS) {
          col.options.searchModel = true;
        } else {
          col.options.searchModel = null;
        }
      }
    }
  }
};
const onAdvanceSearch = () => {
  filterText.value = '';
  let q = '';
  if (searchableHeaders.value.length > 0) {
    for (const col of searchableHeaders.value) {
      if (col.options) {
        const operation = col.options.searchOperation;
        const searchVal = col.options.searchModel;
        const colunm = col.options.searchColunm ? col.options.searchColunm : col.column;
        if (operation != undefined && searchVal != undefined) {
          let val = inputSanitizeHtml(searchVal);
          if (col.type == CrudListDataType.STATUS) {
            val = searchVal;
          }
          if (q) {
            q += ',';
          }
          q += `${colunm}${operation}${val}`;
        }
      }
    }
  }
  emit('on-advance-search', q);
};
const onKeywordSearch = () => {
  if (filterText.value?.trim().length >= SearchMinCharactor) {
    emit('on-keyword-search', inputSanitizeHtml(filterText.value));
  }
};
const isHaveViewPermission = computed(() => {
  if (byPassPermission) {
    return true;
  }
  return viewPermission
    ? appStore.isHavePermission(viewPermission)
    : crudName
      ? appStore.isHavePermission([`${pascalToSnake(crudName)}_view`])
      : true;
});
const isHaveManagePermission = computed(() => {
  if (byPassPermission) {
    return true;
  }
  return managePermission
    ? appStore.isHavePermission(managePermission)
    : crudName
      ? appStore.isHavePermission([`${pascalToSnake(crudName)}_manage`])
      : true;
});
const dateForMat = (d: string, format: string | undefined = undefined) => {
  return d ? formatDate(d, format || FORMAT_DATE1, locale.value) : undefined;
};
const datetimeForMat = (d: string, format: string | undefined = undefined) => {
  return d ? formatDateTime(d, format || FORMAT_DATETIME, locale.value) : undefined;
};
const onPageChange = async (v: number | undefined) => {
  if (v && crudPages.value) {
    crudPages.value.current = v;
    emit('on-page-no-change', v);
  }
};
const onPerPageChange = async (v: number | undefined) => {
  if (v && crudPages.value) {
    crudPages.value.itemsPerPage = v;
    emit('on-items-perpage-change', v);
  }
};
const onRowClick = (event: any, index: number) => {
  if (!rowClickable && isHaveViewPermission.value) {
    return;
  }
  emit('on-item-click', index, 'view');
};
const onColClick = (event: any, index: number, headerOption: ICrudListHeader, colValue: any) => {
  if (headerOption?.options.clickable) {
    appPreventDefult(event);
    // console.log('onColClick', index, 'headerOption',headerOption, 'val', colValue);
    emit('on-col-click', event, index, headerOption, colValue);
  }
};
</script>
<template>
  <div class="row" :class="{ 'content-limit': !fullWidth }">
    <div class="col">
      <BaseCard>
        <slot name="headerCard" />
        <q-card-section>
          <q-toolbar>
            <q-toolbar-title>
              <slot name="title">
                <template v-if="title">
                  <q-icon :name="icon" />
                  {{ title }}
                </template>
              </slot>
            </q-toolbar-title>
            <div class="row items-center">
              <q-form v-if="showSearchTextBox && !showSearch" @submit="onKeywordSearch">
                <q-input
                  dense
                  outlined
                  rounded
                  clearable
                  style="width: 350px"
                  v-model="filterText"
                  :placeholder="t('base.searchHelp3')"
                >
                  <!-- @update:model-value="updateSearchText" -->
                  <template #prepend>
                    <q-icon :name="biSearch" />
                  </template>
                </q-input>
              </q-form>
              <slot name="extraBeforeInnerToolbar" />
              <q-btn
                v-if="isHaveManagePermission && showNewBtn"
                class="q-ml-xs"
                flat
                round
                :icon="biPlus"
                @click="$emit('on-new-form')"
              >
                <q-tooltip>{{ t('base.addNew') }}</q-tooltip>
              </q-btn>
              <q-btn
                v-if="showSearchBtn"
                class="q-ml-xs"
                flat
                round
                :icon="biSearch"
                @click="showSearch = !showSearch"
              >
                <q-tooltip>{{ t('base.search') }}</q-tooltip>
              </q-btn>
              <base-sort
                v-if="showSort && sort"
                :sort="sort"
                :fields="sortableHeaders"
                @on-sort-column="$emit('on-sort', $event)"
                @on-sort-mode="$emit('on-sort-mode', $event)"
              />

              <crud-api-list-header-filter v-if="showFilter" :headers="headers" />

              <q-btn v-if="showThreeDot" flat round dense :icon="biThreeDotsVertical">
                <q-menu>
                  <q-list style="min-width: 200px" dense>
                    <q-item
                      v-if="isHaveManagePermission && showNewBtn"
                      clickable
                      @click="$emit('on-new-form')"
                      v-close-popup
                    >
                      <q-item-section avatar>
                        <q-icon :name="biPlus" />
                      </q-item-section>
                      <q-item-section>{{ t('base.addNew') }}</q-item-section>
                    </q-item>
                    <q-item
                      v-if="isHaveManagePermission && showCheckbox"
                      clickable
                      @click="onDeleteItemSelected"
                      v-close-popup
                    >
                      <q-item-section avatar>
                        <q-icon :name="biTrash" />
                      </q-item-section>
                      <q-item-section>{{ t('base.deleteSeleted') }} </q-item-section>
                    </q-item>
                    <q-item v-if="showSearchBtn" clickable v-close-popup @click="showSearch = true">
                      <q-item-section avatar>
                        <q-icon :name="biSearch" />
                      </q-item-section>
                      <q-item-section>{{ t('base.searchAdvance') }} </q-item-section>
                    </q-item>
                    <q-separator />
                    <q-item clickable @click="$emit('on-reload')" v-close-popup>
                      <q-item-section avatar>
                        <q-icon :name="biArrowClockwise" />
                      </q-item-section>
                      <q-item-section>{{ t('base.reload') }}</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
              <slot name="extraInnerToolbar" />
            </div>
          </q-toolbar>
          <slot name="extraToolbar" />
        </q-card-section>
        <q-card-section v-if="showSearch" class="q-mb-lg">
          <q-card flat bordered>
            <q-card-section>
              <div class="text-h6">
                {{ t('base.search') }}
              </div>
            </q-card-section>
            <q-form @submit="onAdvanceSearch" class="q-pa-md">
              <slot name="topSearchExtra" />
              <template v-if="searchableHeaders.length > 0">
                <div class="row">
                  <slot name="topInnerSearchExtra" />
                  <template
                    v-for="(searchCol, searchIndex) in searchableHeaders"
                    :key="`advance-search-${searchIndex}`"
                  >
                    <div v-if="searchCol.options" class="col-12 col-md-4 q-pa-sm">
                      <div class="q-gutter-md row items-center justify-start">
                        <template
                          v-if="
                            searchCol.options?.searchType == ICrudListHeaderOptionSearchType.TEXT ||
                            searchCol.options?.searchType == ICrudListHeaderOptionSearchType.NUMBER
                          "
                        >
                          <q-input
                            outlined
                            dense
                            v-model="searchCol.options.searchModel"
                            :type="
                              searchCol.options?.searchType == ICrudListHeaderOptionSearchType.TEXT
                                ? 'text'
                                : 'number'
                            "
                            :label="
                              searchCol.translateLabel == undefined || searchCol.translateLabel
                                ? t(searchCol.label)
                                : searchCol.label
                            "
                            clearable
                            style="width: 100%"
                          >
                            <template #before>
                              <q-select
                                v-if="!searchCol.options.searchOperationReadonly"
                                dense
                                filled
                                :label="
                                  searchCol.translateLabel == undefined || searchCol.translateLabel
                                    ? t(searchCol.label)
                                    : searchCol.label
                                "
                                class="q-mx-lg"
                                v-model="searchCol.options.searchOperation"
                                :options="searchOperations"
                                option-value="value"
                                option-label="text"
                                emit-value
                                map-options
                                :readonly="searchCol.options.searchOperationReadonly"
                                style="min-width: 150px"
                                :dropdown-icon="biChevronExpand"
                              />
                            </template>
                          </q-input>
                        </template>
                        <template
                          v-else-if="
                            searchCol.options?.searchType == ICrudListHeaderOptionSearchType.BOOLEAN
                          "
                        >
                          <BaseToggle
                            use-checkbox
                            useLabelTitle
                            :label="
                              searchCol.translateLabel == undefined || searchCol.translateLabel
                                ? t(searchCol.label)
                                : searchCol.label
                            "
                            v-model="searchCol.options.searchModel"
                          />
                        </template>
                        <template
                          v-else-if="
                            searchCol.options?.searchType == ICrudListHeaderOptionSearchType.DATE
                          "
                        >
                          <template v-if="searchCol.options.searchModel != undefined">
                            <BaseDatePicker
                              dense
                              v-model="searchCol.options.searchModel"
                              :label="
                                searchCol.translateLabel == undefined || searchCol.translateLabel
                                  ? t(searchCol.label)
                                  : searchCol.label
                              "
                            />
                          </template>
                        </template>
                        <template
                          v-else-if="
                            searchCol.options?.searchType ==
                              ICrudListHeaderOptionSearchType.OPTIONS &&
                            searchCol.options?.selectOption
                          "
                        >
                            <BaseSelect
                              class="q-pl-lg full-width"
                              v-model="searchCol.options.searchModel"
                              can-filter
                              clearable
                              :items="searchCol.options?.selectOption.items"
                              :multiple="searchCol.options?.selectOption.multiple || false"
                              :label="
                                searchCol.translateLabel == undefined || searchCol.translateLabel
                                  ? t(searchCol.label)
                                  : searchCol.label
                              "
                            />
                        </template>
                      </div>
                    </div>
                  </template>

                  <slot name="belowInnerSearchExtra" />
                </div>

                <slot name="belowSearchExtra" />
                <q-separator />
                <q-card-actions align="center">
                  <q-btn type="submit" flat :icon="biSearch" :label="t('base.okay')" />
                  <q-btn flat :icon="biX" @click="showSearch = false" :label="t('base.close')" />
                  <q-btn flat :icon="biEraser" @click="onClearSearch" :label="t('base.clear')" />
                </q-card-actions>
              </template>
            </q-form>
          </q-card>
        </q-card-section>
        <!-- <q-markup-table v-if="list.length > 0" separator="cell" flat bordered> -->
        <template v-if="!fristLoad || loading">
          <skeleton-table />
        </template>
        <template v-else>
          <slot name="table">
            <q-markup-table
              v-if="list.length > 0"
              :separator="tableSeperator"
              flat
              dense
              bordered
              class="crud-table"
            >
              <thead>
                <slot name="theader">
                  <tr>
                    <th v-if="isHaveManagePermission && showCheckbox">
                      <q-checkbox v-model="selectedAll" @click="onCheckedAll">
                        <q-tooltip>
                          {{ !selectedAll ? t('base.selectAll') : t('base.deselectAll') }}
                        </q-tooltip>
                      </q-checkbox>
                    </th>
                    <template
                      v-for="(tblHeader, tblIndex) in fillableHeaders"
                      :key="`tblHeader-${tblIndex}`"
                    >
                      <template v-if="tblHeader.type === CrudListDataType.BASE_TOOL">
                        <th v-if="isHaveManagePermission || isHaveViewPermission">
                          {{
                            tblHeader.translateLabel == undefined || tblHeader.translateLabel
                              ? t(tblHeader.label)
                              : tblHeader.label
                          }}
                        </th>
                      </template>
                      <th v-else>
                        <template v-if="tblHeader.options && tblHeader.options.sortable">
                          <q-btn
                            class="btn--no-hover"
                            @click="
                              $emit(
                                'on-sort',
                                tblHeader.options.sortColunm
                                  ? tblHeader.options.sortColunm
                                  : tblHeader.column,
                              )
                            "
                            flat
                            no-caps
                          >
                            <template
                              v-if="
                                (sort && sort.column == tblHeader.options.sortColunm) ||
                                (sort && sort.column == tblHeader.column)
                              "
                            >
                              <q-icon
                                :name="sort.mode == 'desc' ? biSortAlphaUpAlt : biSortAlphaDown"
                                class="q-mr-xs"
                                size="18px"
                              />
                            </template>

                            {{
                              tblHeader.translateLabel == undefined || tblHeader.translateLabel
                                ? t(tblHeader.label)
                                : tblHeader.label
                            }}
                            <q-icon class="q-ml-xs" size="12px" :name="biChevronExpand" />
                          </q-btn>
                        </template>
                        <template v-else>
                          {{
                            tblHeader.translateLabel == undefined || tblHeader.translateLabel
                              ? t(tblHeader.label)
                              : tblHeader.label
                          }}
                        </template>
                      </th>
                    </template>
                  </tr>
                </slot>
              </thead>
              <tbody>
                <slot name="tbody" v-bind="{ list, fillableHeaders }">
                  <tr
                    v-for="(item, index) in list"
                    :key="`item-tr-${index}`"
                    :class="{ 'cursor-pointer': rowClickable && isHaveViewPermission }"
                    @click="onRowClick($event, index)"
                  >
                    <td v-if="isHaveManagePermission && showCheckbox" class="text-center">
                      <q-checkbox v-model="selected" :val="item.id" />
                    </td>

                    <template
                      v-for="(fillable, bodyIndex) in fillableHeaders"
                      :key="`item-body-${bodyIndex}`"
                    >
                      <template v-if="fillable.options">
                        <template v-if="fillable.type === CrudListDataType.BASE_TOOL">
                          <td class="text-center">
                            <slot name="baseTool" v-bind="{ item, index }">
                              <template v-if="isHaveManagePermission || isHaveViewPermission">
                                <BaseCrudActionButton
                                  :is-have-manage-permission="isHaveManagePermission"
                                  :is-have-view-permission="isHaveViewPermission"
                                  :edit-button="
                                    (fillable.options && fillable.options.editButton) || false
                                  "
                                  :copy-button="
                                    (fillable.options && fillable.options.copyButton) || false
                                  "
                                  :delete-button="
                                    (fillable.options && fillable.options.deleteButton) || false
                                  "
                                  @on-item-click="
                                    (clickType: ICrudAction) =>
                                      $emit('on-item-click', index, clickType)
                                  "
                                  @on-item-copy="() => $emit('on-item-copy', index)"
                                  @on-item-delete="() => onItemDelete(index, true)"
                                />
                              </template>
                            </slot>
                            <slot name="additionalBaseTool" v-bind="{ item, index }" />
                          </td>
                        </template>
                        <td
                          v-else
                          :style="{
                            maxWidth:
                              fillable.options && fillable.options.maxWidth
                                ? fillable.options.maxWidth
                                : '',
                          }"
                        >
                          <div
                            class="row"
                            :class="{
                              'justify-center':
                                fillable.options && fillable.options.align == 'center',
                              'justify-start': fillable.options && fillable.options.align == 'left',
                              'justify-end': fillable.options && fillable.options.align == 'right',
                              'long-text-break': fillable.options && fillable.options.maxWidth,
                            }"
                          >
                            <div
                              style="width: fit-content"
                              @click="
                                onColClick(
                                  $event,
                                  index,
                                  fillable,
                                  getValueByColunm(fillable.column, index),
                                )
                              "
                            >
                              <template v-if="fillable.type === CrudListDataType.TEXT">
                                <template v-if="fillable.options && fillable.options.toolTip">
                                  <span>
                                    {{
                                      fillable.column
                                        ? getValueByColunm(fillable.column, index)
                                        : ''
                                    }}
                                    <q-tooltip>
                                      {{
                                        fillable.column
                                          ? getValueByColunm(fillable.column, index)
                                          : ''
                                      }}
                                    </q-tooltip>
                                  </span>
                                </template>
                                <template v-else>
                                  {{
                                    fillable.column ? getValueByColunm(fillable.column, index) : ''
                                  }}
                                </template>
                              </template>
                              <template
                                v-else-if="
                                  fillable.type === CrudListDataType.FUNCTION &&
                                  fillable.options &&
                                  fillable.options.func
                                "
                              >
                                <template
                                  v-if="
                                    fillable.column &&
                                    getValueByColunm(fillable.column, index) != undefined
                                  "
                                >
                                  {{
                                    fillable.options.func(getValueByColunm(fillable.column, index))
                                  }}
                                </template>
                              </template>
                              <template
                                v-else-if="fillable.type === CrudListDataType.NUMBER_FORMAT"
                              >
                                {{
                                  fillable.column
                                    ? getValueByColunm(fillable.column, index).toLocaleString()
                                    : ''
                                }}
                              </template>
                              <template v-else-if="fillable.type === CrudListDataType.DATE">
                                {{
                                  fillable.column
                                    ? dateForMat(getValueByColunm(fillable.column, index))
                                    : ''
                                }}
                              </template>
                              <template v-else-if="fillable.type === CrudListDataType.DATE_TIME">
                                {{
                                  fillable.column
                                    ? datetimeForMat(getValueByColunm(fillable.column, index))
                                    : ''
                                }}
                              </template>
                              <template v-else-if="fillable.type === CrudListDataType.STATUS">
                                <q-icon
                                  size="sm"
                                  :color="
                                    fillable.column && getValueBoolean(fillable.column, index)
                                      ? 'positive'
                                      : 'grey-4'
                                  "
                                  :name="biCheckCircle"
                                />
                              </template>
                              <template v-else-if="fillable.type === CrudListDataType.AVATAR">
                                <q-avatar
                                  v-if="fillable.column && getValueByColunm(fillable.column, index)"
                                  :rounded="fillable.options.rounded"
                                  :square="fillable.options.square"
                                  :size="fillable.options.size ? fillable.options.size : '36px'"
                                >
                                  <q-img
                                    v-if="
                                      fillable.column && getValueByColunm(fillable.column, index)
                                    "
                                    :src="getValueByColunm(fillable.column, index)"
                                    :alt="'item-img-' + bodyIndex"
                                    :ratio="1"
                                  />
                                  <img
                                    v-else
                                    src="/avatar_default.png"
                                    :alt="'item-img-' + bodyIndex"
                                  />
                                </q-avatar>
                              </template>
                              <template v-else-if="fillable.type === CrudListDataType.IMAGE">
                                <q-img
                                  v-if="fillable.column && getValueByColunm(fillable.column, index)"
                                  :src="getValueByColunm(fillable.column, index)"
                                  spinner-color="white"
                                  class="bg-grey-8"
                                  :ratio="4 / 3"
                                  :style="
                                    fillable.options.size
                                      ? `width: ${fillable.options.size}; height: ${fillable.options.size}`
                                      : 'width:55px;height:55px'
                                  "
                                />
                                <q-img
                                  v-else
                                  src="/images/no_picture_thumb.jpg"
                                  spinner-color="white"
                                  class="bg-grey-8"
                                  :ratio="4 / 3"
                                  :style="
                                    fillable.options.size
                                      ? `width: ${fillable.options.size}; height: ${fillable.options.size}`
                                      : 'width:55px;height:55px'
                                  "
                                />
                              </template>
                              <template v-else-if="fillable.type === CrudListDataType.ICON">
                                <q-icon
                                  v-if="fillable.column"
                                  :name="getValueByColunm(fillable.column, index)"
                                />
                              </template>
                            </div>
                          </div>
                        </td>
                      </template>
                    </template>
                  </tr>
                </slot>
              </tbody>
            </q-markup-table>
            <q-card-section v-else class="text-center">
              <base-result status="empty" :description="t('error.dataNotfound')" />
            </q-card-section>
          </slot>
        </template>
        <slot name="paging">
          <app-paging
            v-if="crudPages && showPaging && crudPages.totalPages > 0"
            v-model="crudPages"
            :boundary-numbers="false"
            @update:current="onPageChange"
            @update:per-page="onPerPageChange"
          />
        </slot>
      </BaseCard>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.crud-table {
  .q-table__top,
  .q-table__bottom {
    display: none;
  }

  thead tr th {
    background-color: var(--color-zinc-100);
    color: var(--color-zinc-700);
    font-weight: 600 !important;
    font-size: 0.875rem;
    border-bottom: 1px solid var(--color-zinc-200);
  }

  tbody tr td {
    border-bottom: 1px solid var(--color-zinc-200);
  }

  tbody tr:hover {
    background-color: var(--color-zinc-50);
  }
}

body.body--dark {
  .crud-table {
    .q-table__top,
    .q-table__bottom {
      display: none;
    }

    thead tr th {
      background-color: var(--color-zinc-800);
      color: var(--color-zinc-50);
      border-bottom: 1px solid var(--color-zinc-700);
    }

    tbody tr td {
      border-bottom: 1px solid var(--color-zinc-700);
    }

    tbody tr:hover {
      background-color: var(--color-zinc-800);
    }
  }
}
</style>

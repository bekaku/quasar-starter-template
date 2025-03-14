<script setup lang="ts" generic="T">
import { useLang } from '@/composables/useLang';
import type { ICrudListHeader } from '@/types/common';
import { CrudListDataType } from '@/types/common';
import { numberFormat } from '@/utils/appUtil';
import { FORMAT_DATE1, FORMAT_DATETIME, formatDate, formatDateTime } from '@/utils/dateUtil';
import { biCheckCircle } from '@quasar/extras/bootstrap-icons';
import { onMounted, ref } from 'vue';

const { locale } = useLang();
const props = withDefaults(
  defineProps<{
    headers: ICrudListHeader[];
    dataList?: T[];
    rowKey?: string;
    noDataLabel?: string;
    rowsPerPage?: number; // 0 = infinite
    title?: string;
    loading?: boolean;
    customRow?: boolean;
    hideHeader?: boolean;
    hideBottom?: boolean;
  }>(),
  {
    dataList: () => [],
    rowKey: 'id',
    rowsPerPage: 10,
    loading: false,
    customRow: false,
    hideHeader: false,
    hideBottom: false,
  },
);
const { t } = useLang();
onMounted(() => {
  setHeader();
});

const columns = ref<any[]>([]);
const setHeader = () => {
  if (!props.headers || props.headers.length == 0) {
    return;
  }
  for (const h of props.headers) {
    const name = h.column;
    const label = h.label ? t(h.label) : 'untitled';
    const align = h.options?.align;
    const sortable = h.options?.sortable;
    const field = h.field ? h.field : name;
    const style = h.options?.style;
    const classes = h.options?.classes;
    const headerStyle = h.options?.headerStyle;
    const headerClasses = h.options?.headerClasses;
    columns.value.push({
      name,
      label,
      align,
      sortable,
      field,
      style,
      classes,
      headerStyle,
      headerClasses,
      config: h,
    });
  }
};
const dateForMat = (d: string, format: string | undefined = undefined) => {
  return d ? formatDate(d, format || FORMAT_DATE1, locale.value) : undefined;
};
const datetimeForMat = (d: string, format: string | undefined = undefined) => {
  return d ? formatDateTime(d, format || FORMAT_DATETIME, locale.value) : undefined;
};
const paginationLabel = (start: number, end: number, total: number) => {
  return `${start}-${end} ${t('base.from')} ${total}`;
};
</script>
<template>
  <!-- {{ columns }} -->
  <q-table
    v-bind="$attrs"
    flat
    bordered
    :title="title"
    :no-data-label="noDataLabel ? noDataLabel : t('error.dataNotfound')"
    :hide-header="hideHeader"
    :hide-bottom="hideBottom"
    :rows-per-page-label="t('paging.rowsPerPage')"
    :rows="dataList || []"
    :columns="columns"
    :row-key="rowKey"
    :pagination="{ rowsPerPage }"
    :pagination-label="paginationLabel"
    :loading="loading"
  >
    <template #body-cell="props">
      <q-td :props="props">
        <slot name="qtd" v-bind="{ col: props.col, value: props.value, index: props.rowIndex }">
          <!-- {{ props.col }} -->
          <!-- {{ props.row }} -->
          <!-- {{ props.value + ', rowIndex ' + props.rowIndex }} -->
          <!-- {{ props.col.config }} -->
          <template v-if="props.col?.config">
            <template v-if="props.col?.config.type === CrudListDataType.BASE_TOOL">
              <slot
                name="baseTool"
                v-bind="{ col: props.col, value: props.value, index: props.rowIndex }"
              />
            </template>
            <template v-if="props.col?.config.type === CrudListDataType.TEXT">
              <span>
                {{ props.value }}
                <q-tooltip v-if="props.col?.config.options && props.col?.config.options.toolTip">
                  {{ props.value }}
                </q-tooltip>
              </span>
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.NUMBER_FORMAT">
              {{ numberFormat(props.value) }}
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.DATE">
              {{ dateForMat(props.value) }}
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.DATE_TIME">
              {{ datetimeForMat(props.value) }}
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.STATUS">
              <q-icon
                size="sm"
                :color="props.value ? 'positive' : 'grey-4'"
                :name="
                  props.value
                    ? props.col?.config?.options?.trueIcon
                      ? props.col?.config?.options?.trueIcon
                      : biCheckCircle
                    : props.col?.config?.options?.falseIcon
                      ? props.col?.config?.options?.falseIcon
                      : biCheckCircle
                "
              />
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.AVATAR">
              <q-avatar
                :rounded="props.col?.config.options.rounded"
                :square="props.col?.config.options.square"
                :size="props.col?.config.options.size ? props.col?.config.options.size : '36px'"
              >
                <q-img
                  v-if="props.value"
                  :src="props.value"
                  :alt="'item-img-' + props.rowIndex"
                  :ratio="1"
                />
                <img v-else src="/avatar_default.png" :alt="'item-img-' + props.rowIndex" />
              </q-avatar>
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.IMAGE">
              <q-img
                v-if="props.value"
                :src="props.value"
                spinner
                -
                color=" white"
                class="bg-grey-8"
                :ratio="4 / 3"
                :style="
                  props.col?.config.options.size
                    ? `width: ${props.col?.config.options.size}; height: ${props.col?.config.options.size}`
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
                  props.col?.config.options.size
                    ? `width: ${props.col?.config.options.size}; height: ${props.col?.config.options.size}`
                    : 'width:55px;height:55px'
                "
              />
            </template>
            <template v-else-if="props.col?.config.type === CrudListDataType.ICON">
              <q-icon v-if="props.value" :name="props.value" />
            </template>
          </template>
          <template v-else>
            {{ props.value }}
          </template>
        </slot>
      </q-td>
    </template>

    <template #loading>
      <q-inner-loading showing color="primary" />
    </template>
  </q-table>
</template>

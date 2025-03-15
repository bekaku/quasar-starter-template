<script setup lang="ts">
import type { AppColor, IPagination } from '@/types/common';
import {
  mdiChevronLeft,
  mdiChevronRight,
  mdiSkipNext,
  mdiSkipPrevious,
} from '@quasar/extras/mdi-v7';
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
import { useQuasar } from 'quasar';
import { watch } from 'vue';
import { numberFormat } from 'src/utils/appUtil';
import SeparatorDot from './SeparatorDot.vue';
import { useDevice } from 'src/composables/useDevice';
const {
  maxPages = 7,
  boundaryNumbers = false,
  boundaryLink = false,
  directionLink = true,
  outline = false,
  canChangePerpage = true,
} = defineProps<{
  maxPages?: number;
  boundaryNumbers?: boolean;
  boundaryLink?: boolean;
  directionLink?: boolean;
  outline?: boolean;
  canChangePerpage?: boolean;
  color?: AppColor;
}>();
const { t } = useLang();
const { dark } = useQuasar();
const { isSmallScreen } = useDevice();
const modelValue = defineModel<IPagination>();
const emit = defineEmits<{
  (e: 'update:modelValue', page: IPagination | undefined): void;
  (e: 'update:current', value: number | undefined): void;
  (e: 'update:perPage', value: number | undefined): void;
}>();
watch(
  () => modelValue.value?.current,
  (v) => {
    emit('update:current', v);
  },
);
watch(
  () => modelValue.value?.itemsPerPage,
  (v) => {
    emit('update:perPage', v);
  },
);
</script>
<template>
  <div v-if="modelValue" class="row justify-between items-center bg-app-content-item">
    <div class="flex q-pa-md text-muted">
      {{ t('paging.totalRecord', { total: numberFormat(modelValue.totalElements) }) }}
      <SeparatorDot class="q-mx-sm" />
      <span>
        {{
          t('paging.noFmt', {
            current: numberFormat(modelValue.current),
            total: numberFormat(modelValue.totalPages),
          })
        }}
      </span>
    </div>
    <div class="flex q-pa-md">
      <q-select
        v-if="canChangePerpage"
        v-model="modelValue.itemsPerPage"
        dense
        outlined
        :label="t('paging.rowsPerPage')"
        :options="modelValue.perPageList"
        option-value="value"
        option-label="text"
        emit-value
        map-options
        :style=" !isSmallScreen ? 'min-width: 155px; max-width: 200px' : 'width:100%'"

        :dropdown-icon="biChevronExpand"
      />
      <q-pagination
        v-model="modelValue.current"
        :class="{ 'q-mt-md': isSmallScreen }"
        :direction-links="directionLink"
        :boundary-links="boundaryLink"
        :outline="outline"
        :boundary-numbers="boundaryNumbers"
        :max="modelValue.totalPages"
        :max-pages="maxPages"
        :color="color || (dark.isActive ? 'primary' : 'black')"
        :icon-first="mdiSkipPrevious"
        :icon-last="mdiSkipNext"
        :icon-next="mdiChevronRight"
        :icon-prev="mdiChevronLeft"
      />
    </div>
  </div>
</template>

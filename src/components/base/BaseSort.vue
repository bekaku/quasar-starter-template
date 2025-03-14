<template>
  <q-btn class="q-mx-sm" flat :round="btnRound" :icon="icon" :label="label">
    <q-menu>
      <q-list :style="`min-width: ${width}px`" :dense="listDense">
        <q-item-label header>{{ t('sort.sort') }}</q-item-label>
        <q-separator />
        <q-item
          clickable
          v-close-popup
          v-for="(f, fi) in fields"
          :key="'sort-fields-' + fi"
          @click="onSortColumn(f.value)"
        >
          <q-item-section
            ><span
              >{{ f.label
              }}<q-icon class="q-ml-sm" v-if="sort.column === f.value" :name="biCheck" /></span
          ></q-item-section>
        </q-item>
        <q-separator />
        <q-item
          clickable
          v-close-popup
          v-for="(m, mi) in sortMode"
          :key="'sort-mode-' + mi"
          @click="onSortMode(m.value)"
        >
          <q-item-section>
            <span>
              {{ m.label }}
              <q-icon class="q-ml-sm" v-if="sort.mode === m.value" :name="biCheck" /></span
          ></q-item-section>
        </q-item>
      </q-list>
    </q-menu>
    <q-tooltip>{{ t('sort.sort') }}</q-tooltip>
  </q-btn>
</template>

<script setup lang="ts">
import { useLang } from '@/composables/useLang';
import { useSort } from '@/composables/useSort';
import type { ISort, ISortModeType } from '@/types/common';
import { biCheck, biSortDown } from '@quasar/extras/bootstrap-icons';
import type { PropType } from 'vue';
const props = defineProps({
  fields: {
    type: Array as PropType<any[]>,
    default: () => [],
  },
  sort: {
    type: Object as PropType<ISort>,
    default: null,
  },
  icon: {
    type: String,
    default: biSortDown,
  },
  label: {
    type: String,
    default: undefined,
  },
  width: {
    type: Number,
    default: 200,
  },
  listDense: {
    type: Boolean,
    default: true,
  },
  btnRound: {
    type: Boolean,
    default: true,
  },
});
const emit = defineEmits(['on-sort-column', 'on-sort-mode']);
const { t } = useLang();
const { sortMode } = useSort();
const onSortColumn = (column: string | number | boolean) => {
  if (!column) {
    return;
  }
  if (props.sort.column === column) {
    return;
  }
  emit('on-sort-column', column);
};
const onSortMode = (mode: ISortModeType) => {
  if (!mode) {
    return;
  }
  if (props.sort.mode === mode) {
    return;
  }
  emit('on-sort-mode', mode);
};
</script>

<script setup lang="ts" generic="T">
import { biCheck, biChevronExpand, biX } from '@quasar/extras/bootstrap-icons';
import { useBase } from 'src/composables/useBase';
import { useLang } from 'src/composables/useLang';
import { useValidation } from 'src/composables/useValidation';
import { computed, ref, watchEffect } from 'vue';
import type { LabelValue } from '@/types/common';
import BaseAvatar from './BaseAvatar.vue';
import SkeletonItem from '../skeleton/SkeletonItem.vue';
const { isDark } = useBase();
const { requiredSelect } = useValidation();
const {
  optionValue = 'value',
  optionLabel = 'label',
  readonly = false,
  dense = true,
  items,
  canFilter = true,
  clearable = true,
  required = false,
  multiple = false,
  useChips = false,
  outlined = true,
  loading = false,
  fetchImage = false,
  inputDebounce = 0,
  lazy = false,
  lazyLoading = false,
} = defineProps<{
  items: LabelValue<T>[];
  label?: string;
  optionValue?: string;
  optionLabel?: string;
  readonly?: boolean;
  dense?: boolean;
  outlined?: boolean;
  filled?: boolean;
  canFilter?: boolean;
  clearable?: boolean;
  required?: boolean;
  multiple?: boolean;
  useChips?: boolean;
  icon?: string;
  loading?: boolean;
  fetchImage?: boolean;
  inputDebounce?: number;
  lazy?: boolean;
  noOptionsText?: string;
  lazyLoading?: boolean;
}>();
const emit = defineEmits<{
  'on-filter': [value: string, update: any];
  'on-scroll': [to: number, ref: any];
}>();
const { t } = useLang();
const modelValue = defineModel<T | T[] | null>();

const options = ref<LabelValue<T>[]>([...items]);
watchEffect(() => {
  options.value = items;
});
const getSelected = computed<undefined | LabelValue<T>>(() => {
  if (multiple || !modelValue.value) {
    return undefined;
  }
  return items.find((t) => t.value == modelValue.value);
});
const filterFn = (val: string, update: any) => {
  if (!lazy) {
    if (val === '') {
      update(() => {
        options.value = items;
      });
      return;
    }
    update(() => {
      const needle = val.toLowerCase();
      options.value = items.filter(
        (v: LabelValue<T>) => v.label && v.label.toLowerCase().includes(needle),
      );
    });
  } else {
    lazyFilter(val, update);
  }
};
const lazyFilter = (val: string, update: any) => {
  if (val === '') {
    update(() => {
      options.value = items;
    });
    return;
  }
  emit('on-filter', val, update);
};
const onScroll = ({ to, ref }: any) => {
  if (!lazy) {
    return;
  }
  const lastIndex = options.value.length - 1;
  if (loading !== true && to === lastIndex) {
    // console.log('onScroll', to, ref);
    emit('on-scroll', to, ref);
  }
};
</script>
<template>
  <skeleton-item v-if="loading" show :items="1" :show-header="false" />
  <q-select
    v-else
    v-bind="$attrs"
    v-model="modelValue"
    :label="label"
    :dense="dense"
    :outlined="outlined"
    :filled="filled"
    :option-value="optionValue"
    :option-label="optionLabel"
    :loading="lazyLoading"
    ottom-slots
    emit-value
    map-options
    :use-chips="useChips"
    :multiple="multiple"
    :readonly="readonly"
    :use-input="canFilter"
    :options="options"
    :input-debounce="inputDebounce"
    :rules="[required ? requiredSelect : ({} as any)]"
    :dropdown-icon="biChevronExpand"
    @filter="filterFn"
    @virtual-scroll="onScroll"
  >
    <template #prepend>
      <slot name="prepend">
        <template v-if="getSelected !== undefined">
          <base-avatar
            v-if="getSelected.avatar"
            :fetch-image="fetchImage"
            :src="getSelected.avatar"
          />
          <q-icon v-else-if="getSelected.icon" :name="getSelected.icon" />
        </template>
        <q-icon v-else-if="icon" :name="icon" />
      </slot>
    </template>
    <template #hint>
      <template v-if="multiple">
        {{ t('base.canChooseMoreThen1') }}
      </template>
    </template>

    <!--    <template v-slot:option="scope">-->
    <!--    <template v-slot:option="{ itemProps, opt, selected, toggleOption }">-->
    <template v-if="multiple" #selected-item="scope">
      <q-chip
        square
        :icon-remove="biX"
        :removable="clearable"
        @remove="scope.removeAtIndex(scope.index)"
        :color="isDark ? 'grey-9' : 'grey-3'"
      >
        <base-avatar
          v-if="scope.opt?.avatar"
          :fetch-image="fetchImage"
          :src="scope.opt.avatar"
          size="20px"
        />
        <q-avatar v-else-if="scope.opt?.icon" color="primary" text-color="white">
          <q-icon :name="scope.opt.icon" />
        </q-avatar>
        {{ scope.opt.label }}
      </q-chip>
    </template>
    <template #option="{ itemProps, opt, selected }">
      <q-item v-bind="itemProps">
        <q-item-section v-if="opt.avatar || opt.icon" avatar>
          <base-avatar v-if="opt.avatar" :fetch-image="fetchImage" :src="opt.avatar" />
          <q-icon v-else-if="opt.icon" :name="opt.icon" />
        </q-item-section>
        <q-item-section>
          <q-item-label>{{ opt.label }}</q-item-label>
          <q-item-label v-if="opt.description" caption>{{ opt.description }}</q-item-label>
        </q-item-section>
        <q-item-section v-if="selected" side>
          <q-icon color="primary" :name="biCheck" />
        </q-item-section>
      </q-item>
      <q-separator v-if="opt?.border" />
    </template>
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ noOptionsText || t('error.dataNotfound') }}
        </q-item-section>
      </q-item>
    </template>
    <template v-if="clearable" #append>
      <q-icon
        v-if="modelValue"
        class="cursor-pointer"
        :name="biX"
        @click.stop.prevent="!multiple ? (modelValue = null) : (modelValue = [])"
      />
    </template>
    <template #after>
      <slot name="after" />
    </template>
  </q-select>
</template>
<style scoped></style>

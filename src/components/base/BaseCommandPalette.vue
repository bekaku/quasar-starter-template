<script setup lang="ts" generic="T">
import { biCheck2, biCheckSquareFill, biSearch, biSquare } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';
import { computed, ref } from 'vue';
import type { AppColor, LabelValue } from '@/types/common';
import BaseCard from './BaseCard.vue';
import BaseInput from './BaseInput.vue';
import BaseSpinner from './BaseSpinner.vue';
import BaseScrollArea from './BaseScrollArea.vue';
import BaseLabelValueItem from './BaseLabelValueItem.vue';
import BaseResult from './BaseResult.vue';

const {
  items,
  multiple = false,
  loading = false,
  inputDebounce = 100,
  canFilter = true,
  dense = true,
  denseItem = true,
  icon = biSearch,
  scrollHeight = '420px',
  bordered = true,
  flat = true,
  readonly = false,
  color = 'primary',
  useCheckbox = false,
} = defineProps<{
  items: LabelValue<T>[];
  bordered?: boolean;
  flat?: boolean;
  label?: string;
  readonly?: boolean;
  dense?: boolean;
  denseItem?: boolean;
  canFilter?: boolean;
  multiple?: boolean;
  icon?: string;
  loading?: boolean;
  inputDebounce?: number;
  lazy?: boolean;
  noOptionsText?: string;
  placeholder?: string;
  color?: AppColor;
  iconSize?: string;
  avatarSize?: string;
  scrollHeight?: string;
  useCheckbox?: boolean;
}>();
const { t } = useLang();
const modelValue = defineModel<T | T[] | null>();
// const options = ref<LabelValue<T>[]>([...items]);
const filterText = ref<string>('');
// watchEffect(() => {
//     options.value = items;
// })
const emit = defineEmits<{
  'on-click': [val: T | undefined];
}>();
const filterItems = computed(() => {
  if (filterText.value === undefined || filterText.value.trim().length == 0) {
    return items;
  }
  return items
    .map((item) => {
      if (item.children) {
        // If the item has children, filter them
        const filteredChildren = item.children.filter(
          (child) =>
            (child.label && child.label.toLowerCase().includes(filterText.value.toLowerCase())) ||
            (child.description != undefined &&
              child.description.toLowerCase().includes(filterText.value.toLowerCase())),
        );
        return { ...item, children: filteredChildren };
      } else {
        // If no children, filter by the item's own label
        return (item.label && item.label.toLowerCase().includes(filterText.value.toLowerCase())) ||
          (item.description != undefined &&
            item.description.toLowerCase().includes(filterText.value.toLowerCase()))
          ? item
          : null;
      }
    })
    .filter((item) => item !== null && (!item.children || item.children.length > 0));
});
const onClick = (calbackItem: LabelValue<T> | undefined) => {
  if (readonly) {
    return;
  }
  const val = calbackItem?.value;
  emit('on-click', val);
  if (val == undefined) {
    return;
  }

  if (!multiple) {
    if (modelValue.value === val) {
      modelValue.value = undefined;
    } else {
      modelValue.value = val;
    }
  }
  if (modelValue.value != undefined && Array.isArray(modelValue.value)) {
    const t = getSelectedBy(val);
    if (t) {
      modelValue.value = modelValue.value.filter((v: T) => v !== val);
    } else {
      modelValue.value.push(val);
    }
  }
};
const getSelectedBy = (val: T | undefined) => {
  if (val == undefined) {
    return undefined;
  }

  if (!multiple) {
    return modelValue.value === val;
  }
  if (modelValue.value != undefined && Array.isArray(modelValue.value)) {
    return modelValue.value.find((t: T) => t == val);
  }
  return undefined;
};
</script>
<template>
  <BaseCard v-bind="$attrs" :bordered :flat>
    <template v-if="canFilter && !readonly">
      <BaseInput
        v-model="filterText"
        class="q-px-sm"
        borderless
        :dense
        :debounce="inputDebounce"
        :placeholder="placeholder || t('base.typeForsearch') + '...'"
      >
        <template #prepend>
          <template v-if="loading">
            <BaseSpinner type="defult" size="24px" class="q-mb-sm" />
          </template>
          <q-icon v-else :name="icon" class="text-muted" size="20px" />
        </template>
        <template #append>
          <slot name="inputAppend" />
        </template>
      </BaseInput>
      <q-separator />
    </template>
    <q-card-section>
      <BaseSpinner v-if="loading" />
      <q-list v-else :dense="denseItem">
        <BaseScrollArea :height="scrollHeight">
          <template v-for="(item, index) in filterItems" :key="`app-commandpalette-${index}`">
            <template v-if="item && item.children && item.children.length > 0">
              <q-item-label header>{{ item.label }}</q-item-label>
              <q-separator v-if="item.border" class="q-mb-sm" />
              <BaseLabelValueItem
                v-for="(itemLevel2, indexLevel2) in item.children"
                :key="`app-submenulevel2-${index}-${indexLevel2}`"
                :item="itemLevel2"
                :avatar-size="iconSize"
                :icon-size="iconSize"
                :high-light-text="filterText"
                :color="getSelectedBy(itemLevel2.value) ? color : undefined"
                :dense="denseItem"
                :clickable="
                  readonly
                    ? false
                    : item.value != undefined || (item.children && item.children.length > 0)
                "
                @on-click="onClick"
              >
                <q-item-section side>
                  <template v-if="useCheckbox">
                    <q-icon
                      :name="getSelectedBy(itemLevel2.value) ? biCheckSquareFill : biSquare"
                      :color="getSelectedBy(itemLevel2.value) ? color : undefined"
                      size="20px"
                    />
                  </template>
                  <template v-else-if="getSelectedBy(itemLevel2.value)">
                    <q-icon :name="biCheck2" :color size="20px" />
                  </template>
                </q-item-section>
              </BaseLabelValueItem>
            </template>
            <template v-else>
              <BaseLabelValueItem
                v-if="item"
                :item="item"
                :dense
                :avatar-size="iconSize"
                :icon-size="iconSize"
                :high-light-text="filterText"
                :clickable="item.value != undefined || (item.children && item.children.length > 0)"
                :color="getSelectedBy(item.value) ? 'primary' : undefined"
                @on-click="onClick"
              >
                <q-item-section side>
                  <template v-if="useCheckbox">
                    <q-icon
                      :name="getSelectedBy(item.value) ? biCheckSquareFill : biSquare"
                      :color="getSelectedBy(item.value) ? color : undefined"
                      size="20px"
                    />
                  </template>
                  <template v-else-if="getSelectedBy(item.value)">
                    <q-icon :name="biCheck2" :color size="20px" />
                  </template>
                </q-item-section>
              </BaseLabelValueItem>
            </template>
          </template>
          <BaseResult
            v-if="filterItems.length == 0"
            status="empty"
            :description="t('error.dataNotfound')"
          />
        </BaseScrollArea>
      </q-list>
    </q-card-section>
  </BaseCard>
</template>

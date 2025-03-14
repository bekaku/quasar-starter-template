<script setup lang="ts" generic="T">
import { biChevronExpand } from '@quasar/extras/bootstrap-icons';
import { useLang } from 'src/composables/useLang';

withDefaults(
  defineProps<{
    items: T[];
    label?: string;
    optionValue?: string;
    optionLabel?: string;
    dense?: boolean;
    outlined?: boolean;
    multiple?: boolean;
  }>(),
  {
    optionValue: 'value',
    optionLabel: 'label',
    dense: true,
    outlined: true,
    multiple: false,
  },
);

const { t } = useLang();
const modelValue = defineModel<T>();
</script>
<template>
  <q-select
    v-bind="$attrs"
    v-model="modelValue"
    :label="label"
    :dense
    :outlined
    :options="items"
    :option-value="optionValue"
    :option-label="optionLabel"
    emit-value
    map-options
    :dropdown-icon="biChevronExpand"
    :multiple
  >
    <template #no-option>
      <q-item>
        <q-item-section class="text-italic text-grey">
          {{ t('error.dataNotfound') }}
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>
<style scoped></style>

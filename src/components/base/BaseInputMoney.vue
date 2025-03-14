<script setup lang="ts" generic="T">
import type { VueMoneyConFig } from '@/types/common';
import { component as VueNumber } from '@coders-tm/vue-number-format';
const {
  config = {
    decimal: '.',
    separator: ',',
    prefix: '',
    suffix: '',
    precision: 2,
    nullValue: '',
    masked: false,
    reverseFill: false,
  },
  textAlign = 'left',
  dense = false,
  readonly = false,
  outlined = true,
} = defineProps<{
  config?: VueMoneyConFig | undefined;
  hint?: string | undefined;
  label?: string | undefined;
  dense?: boolean | undefined;
  textAlign?: 'left' | 'right' | 'center' | undefined;
  readonly?: boolean | undefined;
  outlined?: boolean | undefined;
}>();

const emit = defineEmits(['change', 'update']);
const modelValue = defineModel<string | number | null | undefined>({ default: 0 });
const updateField = (ev: any) => {
  modelValue.value = ev?.target?.unmasked;
  emit('update', ev?.target?.unmasked);
};
const changeField = (ev: any) => {
  emit('change', ev?.target?.unmasked);
};
</script>
<template>
  <q-no-ssr>
    <q-field
      v-bind="$attrs"
      v-model="modelValue"
      :outlined="outlined"
      :dense="dense"
      :hint="hint"
      :label="label"
    >
      <template #control>
        <vue-number
          v-if="modelValue != undefined"
          v-model="modelValue"
          class="q-field__input"
          :class="{
            'text-right': textAlign == 'right',
            'text-left': textAlign == 'left',
            'text-center': textAlign == 'center',
          }"
          v-bind="config"
          :disabled="readonly || false"
          @input="updateField($event)"
          @change="changeField($event)"
        />
      </template>
      <template #append>
        <slot name="append" />
      </template>
      <template #before>
        <slot name="before" />
      </template>
      <template #prepend>
        <slot name="prepend" />
      </template>
      <template #hint>
        <slot name="hint" />
      </template>
      <template #after>
        <slot name="after" />
      </template>
    </q-field>
  </q-no-ssr>
</template>

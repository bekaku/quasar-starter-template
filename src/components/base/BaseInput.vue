<script setup lang="ts">
import { biX } from '@quasar/extras/bootstrap-icons';
import type { VueMoneyConFig } from '@/types/common';
import BaseAvatar from './BaseAvatar.vue';
import { numberFormat } from '@/utils/appUtil';
import BaseInputMoney from './BaseInputMoney.vue';
const {
  dense = true,
  debounce = 0,
  counter = false,
  filled = false,
  bottomSlots = false,
  outlined = true,
  fetchImage = false,
  readonly = false,
  clearable = false,
  rounded = false,
  borderless = false,
  iconSize = '24px',
  avatarSize = '30px',
  type = 'text',
  autogrow = true,
  rows = 1,
  textareaHeight = '105px',
  editMode = true,
  viewBorderless = true,
  viewStackLabel = true,
  viewOutlined = false,
  viewShowHint = true,
  viewShowAppend = true,
  viewShowBefore = true,
  viewShowPrepend = true,
  viewShowAfter = true,
  stackLabel = false,
  required = false,
} = defineProps<{
  avatar?: string;
  avatarSize?: string;
  bottomSlots?: boolean;
  borderless?: boolean;
  autogrow?: boolean;
  counter?: boolean;
  clearable?: boolean;
  dense?: boolean;
  debounce?: number;
  disable?: boolean;
  fetchImage?: boolean;
  filled?: boolean;
  hint?: string;
  icon?: string;
  iconSize?: string;
  label?: string | undefined;
  maxlength?: number;
  min?: number;
  max?: number;
  moneyConfig?: VueMoneyConFig;
  outlined?: boolean;
  placeholder?: string;
  readonly?: boolean;
  rounded?: boolean;
  rules?: any[];
  rows?: number;
  maxRows?: number;
  required?: boolean;
  stackLabel?: boolean;
  textAlign?: 'left' | 'right' | 'center';
  textareaHeight?: string;
  type?: 'text' | 'password' | 'textarea' | 'email' | 'search' | 'tel' | 'url' | 'number';
  isMoney?: boolean;
  editMode?: boolean;
  viewBorderless?: boolean;
  viewOutlined?: boolean;
  viewStackLabel?: boolean;
  viewShowAfter?: boolean;
  viewShowAppend?: boolean;
  viewShowBefore?: boolean;
  viewShowHint?: boolean;
  viewShowPrepend?: boolean;
}>();

const modelValue = defineModel<number | string | null | undefined>();
defineEmits<{
  'update:model-value': [value: number | string | undefined | null];
  focus: [event: any];
  blur: [event: any];
  clear: [value: number | string | undefined];
}>();
</script>
<template>
  <template v-if="editMode">
    <template v-if="!isMoney">
      <q-input
        v-bind="$attrs"
        v-model="modelValue"
        :debounce
        :outlined="outlined && !borderless"
        :filled
        :bottom-slots="bottomSlots"
        :label
        :stack-label="stackLabel"
        :placeholder
        :readonly
        :disable
        :rules="rules"
        :autogrow="type == 'textarea' ? autogrow : undefined"
        :rows="type == 'textarea' ? rows : undefined"
        :max-rows="type == 'textarea' ? maxRows : undefined"
        :min="min"
        :max="max"
        :type="type"
        :counter
        :maxlength="maxlength"
        :dense="type == 'textarea' ? false : dense"
        :rounded
        :clearable
        :clear-icon="clearable ? biX : undefined"
        :hint
        :borderless="borderless"
        :input-style="{ minHeight: type == 'textarea' && autogrow ? textareaHeight : '' }"
      >
        <template #label>
          <slot name="label">
            {{ label }} <template v-if="required"><span class="text-negative">*</span></template>
          </slot>
        </template>
        <template #before>
          <slot name="before" />
        </template>
        <template #prepend>
          <slot name="prepend">
            <base-avatar v-if="avatar" :fetch-image="fetchImage" :src="avatar" :size="avatarSize" />
            <q-icon v-else-if="icon" :name="icon" :size="iconSize" />
          </slot>
        </template>
        <template #append>
          <slot name="append" />
        </template>

        <template #hint>
          <slot name="hint" />
        </template>
        <template #after>
          <slot name="after" />
        </template>
        <template #error>
          <slot name="error" />
        </template>
        <template #loading>
          <slot name="loading" />
        </template>
      </q-input>
    </template>
    <BaseInputMoney
      v-else
      v-bind="$attrs"
      v-model="modelValue"
      :outlined
      :dense
      :readonly
      :config="moneyConfig"
      :label
      :text-align="textAlign"
    >
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
    </BaseInputMoney>
  </template>
  <q-field
    v-else
    v-bind="$attrs"
    :model-value="modelValue"
    :bottom-slots="bottomSlots"
    :label
    :outlined="viewOutlined"
    :filled="filled"
    :stack-label="viewStackLabel"
    :dense
    :borderless="viewBorderless"
    :hint="viewShowHint ? hint : undefined"
  >
    <template #control>
      <div class="self-center full-width no-outline app-auto-newline" tabindex="0">
        {{ type == 'number' || isMoney ? numberFormat(modelValue) : modelValue }}
      </div>
    </template>
    <template v-if="viewShowBefore" #before>
      <slot name="before" />
    </template>
    <template v-if="viewShowPrepend" #prepend>
      <slot name="prepend">
        <base-avatar v-if="avatar" :fetch-image="fetchImage" :src="avatar" :size="avatarSize" />
        <q-icon v-else-if="icon" :name="icon" :size="iconSize" />
      </slot>
    </template>
    <template v-if="viewShowAppend" #append>
      <slot name="append" />
    </template>

    <template v-if="viewShowHint" #hint>
      <slot name="hint" />
    </template>
    <template v-if="viewShowAfter" #after>
      <slot name="after" />
    </template>
  </q-field>
</template>

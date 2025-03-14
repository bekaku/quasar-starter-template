<script setup lang="ts" generic="T">
import { useLang } from 'src/composables/useLang';

const {
  color = 'primary',
  size = 'md',
  useLabelTitle = true,
  showTitle = false,
  editMode = true,
  showLabel = true,
  keepColor = false,
  val = undefined,
} = defineProps<{
  title?: string | undefined;
  label?: string | undefined;
  trueLabel?: string | undefined;
  falseLabel?: string | undefined;
  color?: string | undefined;
  size?: string | undefined;
  useLabelTitle?: boolean | undefined;
  showTitle?: boolean | undefined;
  disable?: boolean | undefined;
  editMode?: boolean | undefined;
  showLabel?: boolean | undefined;
  keepColor?: boolean | undefined;
  val?: any;
}>();
const { t } = useLang();
const modelValue = defineModel<boolean | T[]>();
</script>
<template>
  <div v-if="showTitle && !title">
    {{ title }}
  </div>
  <q-checkbox
    v-bind="$attrs"
    v-model="modelValue"
    :val
    :keep-color="keepColor"
    :color="color"
    :size="size"
    :disable="!editMode || disable"
    :label="
      !showLabel
        ? ''
        : useLabelTitle
          ? label
            ? label
            : t('base.enable')
          : modelValue
            ? trueLabel
              ? trueLabel
              : t('base.enable')
            : falseLabel
              ? falseLabel
              : t('base.disable')
    "
  >
    <slot />
  </q-checkbox>
</template>

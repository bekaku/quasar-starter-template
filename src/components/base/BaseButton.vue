<script setup lang="ts">
import { useBase } from 'src/composables/useBase';
import type { AppColor, IHrefTarget } from '@/types/common';

const {
  outline = false,
  noCaps = true,
  unelevated = true,
  glossy = false,
  flat = false,
  stack = false,
  round = false,
  push = false,
  rounded = false,
  loading = false,
  disable = false,
  dense = false,
  full = false,
  color = 'primary',
  light = false,
  textCapitalize = true,
} = defineProps<{
  align?: 'left' | 'right' | 'center' | 'around' | 'between' | 'evenly';
  color?: AppColor;
  count?: number;
  disable?: boolean;
  dense?: boolean;
  flat?: boolean;
  full?: boolean;
  glossy?: boolean;
  href?: string;
  icon?: string;
  iconRight?: string;
  label?: string;
  light?: boolean;
  loading?: boolean;
  noCaps?: boolean;
  outline?: boolean;
  outlineColor?: AppColor;
  push?: boolean;
  round?: boolean;
  rounded?: boolean;
  size?: string;
  square?: boolean;
  stack?: boolean;
  textColor?: AppColor;
  to?: string;
  target?: IHrefTarget;
  type?: 'button' | 'a' | 'submit' | 'reset';
  unelevated?: boolean;
  textCapitalize?: boolean;
}>();
const { isDark } = useBase();
</script>
<template>
  <q-btn
    v-bind="$attrs"
    :outline
    :label="!outline ? label : undefined"
    :color="
      light
        ? isDark
          ? 'grey-9'
          : 'grey-3'
        : flat && label == undefined
          ? undefined
          : outline && outlineColor == undefined
            ? undefined
            : outlineColor || color
    "
    :text-color="light ? (isDark ? 'white' : 'black') : textColor"
    :no-caps="noCaps"
    :unelevated
    :glossy
    :flat
    :href
    :icon="!outline ? icon : undefined"
    :icon-right="!outline ? iconRight : undefined"
    :stack
    :round
    :square
    :push
    :rounded
    :align
    :size
    :loading
    :to
    :disable
    :dense
    :target
    :type
    :class="{
      'defult-outline': label && !outlineColor && outline,
      'full-width': full,
      'text-capitalize': textCapitalize,
    }"
  >
    <!-- 'default-button': !outline && !unelevated && !flat && !glossy && !stack && !push -->
    <template v-if="outline">
      <div
        :class="`text-${textColor ? textColor : outlineColor ? outlineColor : !isDark ? 'black' : 'white'}`"
      >
        <!-- <div :class="`text-${textColor ? textColor: outlineColor ? outlineColor:color ?color:  !isDark ? 'black' :'white'}`"> -->
        <q-icon v-if="icon" :name="icon" class="q-mr-sm" />{{ label }}
        <q-icon v-if="iconRight" :name="iconRight" class="q-ml-sm" />
      </div>
    </template>
    <slot />
  </q-btn>
</template>
<style scoped lang="scss">
.defult-outline {
  color: var(--app-main-border-color) !important;
}
.default-button {
  box-shadow:
    0 0 #0000,
    0 0 #0000,
    0 1px 1px 0 rgb(0 0 0 / 0.05) !important;
  // border-radius: 1rem;
}
</style>

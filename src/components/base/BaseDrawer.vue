<script setup lang="ts">
const {
  overlay = false,
  bordered = false,
  miniToOverlay = true,
  mini = false,
  width = 270,
  tranparent = true,
} = defineProps<{
  overlay?: boolean;
  miniToOverlay?: boolean;
  mini?: boolean;
  bordered?: boolean;
  width?: number;
  tranparent?: boolean;
}>();
const modelValue = defineModel<boolean>({ default: true });
defineEmits<{
  mouseover: [];
  mouseout: [];
  hide: [];
}>();
</script>
<template>
  <q-drawer
    v-model="modelValue"
    :width="width"
    :overlay="overlay"
    :bordered="bordered"
    :mini-to-overlay="miniToOverlay"
    :mini="mini"
    :class="{ 'base-sidebar': !tranparent }"
    @mouseover="$emit('mouseover')"
    @mouseout="$emit('mouseout')"
    @hide="$emit('hide')"
  >
    <slot />
  </q-drawer>
</template>

<script setup lang="ts" generic="T">
import { computed } from 'vue';
const {
  options,
  disable = false,
  readonly = false,
} = defineProps<{
  options: any[];
  disable?: boolean;
  readonly?: boolean;
}>();
const modelValue = defineModel<T>();
const mapOptions = (model: any) => {
  return (option: any) => {
    return {
      ...option,
      class: model === option.value ? 'btn-group-toggle btn-toggle-on-class' : 'btn-group-toggle btn-toggle-off-class',
    };
  };
};
const filterOptions = computed(() => options.map(mapOptions(modelValue.value)));
</script>
<template>
  <q-btn-toggle
    v-bind="$attrs"
    dense
    class="shadow-0 q-gutter-x-xs default"
    v-model="modelValue"
    no-caps
    :options="filterOptions"
    :disable
    :readonly
  />
</template>
<style lang="scss" scoped>
.default {
  padding: 5px;
  background-color: var(--color-zinc-100);
}
body.body--dark {
  .default {
    background-color: var(--color-zinc-800);
  }
}
</style>

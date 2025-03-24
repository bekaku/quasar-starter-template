<script setup lang="ts">
const { type = 'dots', color = 'primary', size = '2em', height = '150px' } = defineProps<{
  type?: 'dots' | 'clock' | 'ios' | 'rings' | 'tail' | 'defult',
  color?: string,
  size?: string,
  height?: string;
}>();
</script>
<template>
  <div class="row items-center" :style="{ minHeight: height }">
    <div class="col-12 text-center">
      <q-spinner-dots v-if="type == 'dots'" :color :size class="self-center" />
      <q-spinner v-else-if="type == 'defult'" :color :size class="self-center" />
      <q-spinner-clock v-else-if="type == 'clock'" :color :size class="self-center" />
      <q-spinner-ios v-else-if="type == 'ios'" :color :size class="self-center" />
      <q-spinner-rings v-else-if="type == 'rings'" :color :size class="self-center" />
      <q-spinner-tail v-else-if="type == 'tail'" :color :size class="self-center" />
    </div>
  </div>
</template>
<script setup lang="ts">
const { height = '150px' } = defineProps<{
  height?: string;
}>();
</script>
<template>
  <div class="row items-center" :style="{ minHeight: height }">
    <div class="col-12 text-center">
      <q-spinner-dots color="primary" size="2em" class="self-center" />
    </div>
  </div>
</template>

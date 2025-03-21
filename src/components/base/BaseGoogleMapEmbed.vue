<script setup lang="ts">
const { height = 300, zoom = 10 } = defineProps<{
  latLong?: string | undefined;
  height?: number | undefined;
  zoom?: number | undefined;
}>();
</script>
<template>
  <iframe
    v-bind="$attrs"
    v-if="latLong"
    :height="height"
    :src="`https://maps.google.com/maps?q=${latLong}&hl=es;z=14&amp;output=embed&zoom=${zoom}`"
    class="holder"
    allowfullscreen
    loading="lazy"
    referrerpolicy="no-referrer-when-downgrade"
  />
</template>

<style lang="scss" scoped>
.holder {
  width: 100%;
  border: 0;
  border-radius: 10px;
}
</style>

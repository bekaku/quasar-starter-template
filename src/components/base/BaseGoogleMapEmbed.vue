<script setup lang="ts">
import { computed } from 'vue';

const {
  height = 300,
  zoom = 10,
  latLong,
} = defineProps<{
  latLong?: string | undefined;
  height?: number | undefined;
  zoom?: number | undefined;
}>();

const mapUrl = computed(
  () => `https://maps.google.com/maps?q=${latLong}&zoom=${zoom}&output=embed`,
);
</script>
<template>
  <!-- :src="`https://maps.google.com/maps?q=${latLong}&hl=es;z=14&amp;output=embed&zoom=${zoom}`" -->
  <iframe
    v-bind="$attrs"
    v-if="latLong"
    :height="height"
    :src="mapUrl"
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

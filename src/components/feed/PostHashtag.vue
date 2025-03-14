<template>
  <q-card-section>
    <div class="q-gutter-md">
      <base-link
        v-for="(item, index) in items"
        :key="index"
        :label="`#${item.name}`"
        to="#"
        color="text-primary"
      />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import type { PropType } from 'vue';
import type { Hashtag } from '@/types/models';
import BaseLink from '@/components/base/BaseLink.vue';
defineProps({
  items: {
    type: Array as PropType<Hashtag[]>,
    default: () => [],
  },
});
</script>

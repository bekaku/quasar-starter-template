<template>
  <q-card-section>
      <q-scroll-area style="height: 40px; max-width: 100%">
        <div class="row no-wrap q-gutter-md">
          <base-link
            v-for="(item, index) in items"
            :key="index"
            :label="`#${item.name}`"
            to="#"
            color="text-primary"
          />
        </div>
      </q-scroll-area>
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

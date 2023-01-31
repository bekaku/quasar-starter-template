<template>
  <q-card-section>
    <div class="q-gutter-md">
      <app-link
        v-for="(item, index) in items"
        :key="index"
        :label="`#${item.name}`"
        color="text-primary"
      />
    </div>
  </q-card-section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { Hashtag } from '@/types/models';
import AppLink from 'src/components/base/AppLink.vue';
defineProps({
  items: {
    type: Array as PropType<Hashtag[]>,
    default: () => [],
  },
});
</script>

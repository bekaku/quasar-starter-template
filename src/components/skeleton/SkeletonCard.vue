<script setup lang="ts">
import BaseCard from '@/components/base/BaseCard.vue';
const {
  vertical = false,
  flat = true,
  height = '100px',
  no = 1,
  textNumber = 0,
  col = 'col-12 col-md-12 q-pa-xs',
} = defineProps<{
  vertical?: boolean;
  flat?: boolean;
  height?: string;
  no?: number;
  textNumber?: number;
  col?: string;
  rowCss?: string;
}>();
</script>
<template>
  <div v-if="!vertical" class="row" :class="rowCss">
    <div v-for="i in no" :key="i" :class="col">
      <BaseCard :flat="flat" :bordered="!flat">
        <q-skeleton :height />
        <q-item v-if="textNumber > 0">
          <q-item-section>
            <q-item-label v-for="tIndex in textNumber" :key="tIndex">
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>
      </BaseCard>
    </div>
  </div>
  <template v-else>
    <div v-for="i in no" :key="i" class="row" :class="rowCss">
      <div :class="col">
        <BaseCard :flat="flat" :bordered="!flat">
          <q-skeleton :height />
          <q-item v-if="textNumber > 0">
            <q-item-section>
              <q-item-label v-for="tIndex in textNumber" :key="tIndex">
                <q-skeleton type="text" animation="fade" />
              </q-item-label>
            </q-item-section>
          </q-item>
        </BaseCard>
      </div>
    </div>
  </template>
</template>

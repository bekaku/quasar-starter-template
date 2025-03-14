<script setup lang="ts">
withDefaults(defineProps<{
  show?: boolean
  flat?: boolean
  bordered?: boolean
  no?: number
  cardHeight?: string
}>(), {
  show: true,
  flat: false,
  bordered: false,
  no: 3,
  cardHeight: '200px'
})
</script>
<template>
  <div v-if="show" class="row" v-bind="$attrs">
    <div class="col-12">
      <q-card v-for="index in no" :key="index" :flat="flat" :bordered="bordered" class="q-mb-md">
        <q-item>
          <q-item-section avatar>
            <q-skeleton type="QAvatar" animation="fade" />
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
            <q-item-label caption>
              <q-skeleton type="text" animation="fade" />
            </q-item-label>
          </q-item-section>
        </q-item>

        <q-skeleton :height="cardHeight" square animation="fade" />

        <q-card-section>
          <q-skeleton type="text" class="text-subtitle2" animation="fade" />
          <q-skeleton type="text" width="50%" class="text-subtitle2" animation="fade" />
        </q-card-section>
        <q-card-actions align="around">
          <q-skeleton v-for="t in 4" :key="t" type="text" style="width: 125px; height: 45px" />
        </q-card-actions>
      </q-card>
    </div>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  show?: boolean
  vertical?: boolean
  bordered?: boolean
  flat?: boolean
  square?: boolean
  no?: number
  height?: string
  colClass?: string
}>(), {
  show: true,
  vertical: true,
  bordered: true,
  flat: true,
  square: true,
  height: '100px',
  colClass: 'col-12 col-md-12 q-pa-sm',
})
</script>
<template>
  <div v-if="vertical" class="row" v-bind="$attrs">
    <div class="col-12">
      <q-card fl:bordered="bordered" :flat="flat" :square="square">
        <q-skeleton :height square />
        <q-card-section>
          <q-skeleton type="text" />
          <q-skeleton type="text" style="width: 50%" />
        </q-card-section>
      </q-card>
    </div>
  </div>
  <div v-else :class="colClass">
    <q-card :bordered="bordered" :flat="flat" :square="square">
      <q-skeleton :height square />
      <q-card-section>
        <q-skeleton type="text" />
        <q-skeleton type="text" style="width: 50%" />
      </q-card-section>
    </q-card>
  </div>
</template>
<script setup lang="ts">
withDefaults(defineProps<{
  show?: boolean
  showHeader?: boolean
  no?: number
}>(), {
  show: true,
  showHeader: false,
  no: 3
})
</script>
<template>
  <div v-if="show" class="row">
    <div class="col-12">
      <q-item-label v-if="showHeader" header>
        <q-skeleton type="text" />
      </q-item-label>
      <q-item v-for="index in no" :key="index">
        <q-item-section avatar>
          <q-skeleton type="QAvatar" />
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <q-skeleton type="text" />
          </q-item-label>
          <q-item-label caption>
            <q-skeleton type="text" width="65%" />
          </q-item-label>
        </q-item-section>
      </q-item>
    </div>
  </div>
</template>
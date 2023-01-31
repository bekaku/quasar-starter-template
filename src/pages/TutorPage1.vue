<template>
  <q-page padding>
    <q-card>
      <q-card-section>
        <div class="text-h6">Our Changing Planet</div>
        <div class="text-subtitle2">by John Doe</div>
      </q-card-section>

      <q-card-section>
        <p>lorem : {{ lorem }}</p>
        <p>
          {{ 'booVal : ' + booVal }}
        </p>
      </q-card-section>

      <q-separator dark />

      <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions>
    </q-card>
  </q-page>
</template>
<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
} from 'vue';
import { useMeta } from 'quasar';

useMeta({ title: 'Tutor 1' });

const lorem = ref<string>('Hello world!!');
const booVal = ref<boolean>(true);
const strList = ref<string[]>(['a', 'b', 'c', 'd']);
const noList = ref<number[]>([1, 2, 3, 4, 5]);

onBeforeMount(() => {
  console.log('onBeforeMount');
});
onMounted(() => {
  console.log('onMounted');
});
onBeforeUnmount(() => {
  console.log('onBeforeUnmount');
});
onUnmounted(() => {
  console.log('onUnmounted');
});
</script>
<style scoped></style>

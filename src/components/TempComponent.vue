<template>
  <q-card flat class="full-height">
    <p>{{ t('app.name') }}</p>
    <q-icon :name="biFile" />

    <p>{{ email }}</p>

    <q-btn @click="onCLose" label="Submit" />
  </q-card>
</template>

<script setup lang="ts">
import { PropType, computed } from 'vue';
import { useLang } from '@/composables/useLang';
import { IAlert } from '@/types/common';
import { biFile } from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  modelValue: {
    type: String,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object as PropType<IAlert>,
    default: undefined,
    required: true,
  },
  todos: {
    type: Array as PropType<IAlert[]>,
    default: () => [],
  },
});
const email = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
const emit = defineEmits(['on-close', 'on-submit', 'update:modelValue']);
const { t } = useLang();
const onCLose = () => {
  emit('on-close');
};
</script>

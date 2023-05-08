<template>
  <q-card flat class="q-my-lg">
    <q-card-section>
      <p>Test Component</p>
      <q-icon :name="biFile" />

      <p>{{ email }}</p>

      <p>modelValue : {{ modelValue }}</p>
      <p>overlay : {{ overlay }}</p>
      <p>meta : {{ meta }}</p>
      <p>todos : {{ todos }}</p>

      <slot name="extra"> </slot>

      <slot name="closeBtn">
        <q-btn @click="onCLose" label="on close" />
      </slot>

      <q-btn @click="onSubmit" label="on Submit" />
      <q-btn @click="$emit('on-custom-click')" label="on direct Submit" />
      <q-btn label="Goto" @click="onGo" />
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { useLang } from '@/composables/useLang';
import useBase from '@/composables/useBase';
import { IAlert } from '@/types/common';
import { biFile } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
const props = defineProps({
  modelValue: {
    type: String,
  },
  no: {
    type: Number,
  },
  overlay: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: Object, // {id:1, name :'vee'}
    default: undefined,
    required: true,
  },
  todos: {
    type: Array, //[{id:1, name :'vee'}, {id:2, name :'vee'}]
    default: () => [],
  },
});
const { WeeGoTo } = useBase();
const $q = useQuasar();
const { t } = useLang();
const testValFromComp = ref('vvvvvvvvv');
const email = computed({
  get: () => props.modelValue,
  set: (val) => emitEvent('update:modelValue', val),
});
const emitEvent = defineEmits(['on-custom-click', 'update:modelValue']);

const onCLose = () => {
  $q.notify('onCloseClick');
  console.log('onCloseClick');
};
const onSubmit = () => {
  emitEvent('on-custom-click', testValFromComp.value);
};
const onGo = () => {
  WeeGoTo('/testPage');
};
</script>

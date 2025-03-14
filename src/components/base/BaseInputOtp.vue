<script setup lang="ts">
import { computed, onBeforeUpdate, ref, watch } from 'vue';

const { inputLength } = defineProps<{
  inputLength: number;
}>();
const emit = defineEmits<{
  'on-submit': [val: string | undefined];
}>();
const length = computed(() => inputLength);
const fields = ref<any[]>([]);
const fieldValues = ref([]);
const composite = computed(() => {
  const nonNullFields = fieldValues.value.filter((value) => value);
  if (length.value !== nonNullFields.length) {
    return '';
  }
  return nonNullFields.join('');
});
// make sure to reset the refs before each update
onBeforeUpdate(() => {
  fields.value = [];
});
const updateFieldRef = (element: any, index: number) => {
  if (element) {
    fields.value[index] = element;
  }
};
const focus = (index: number) => {
  if (index >= 0) {
    if (index < length.value) {
      fields.value[index].select();
    } else {
      if (composite.value) {
        fields.value[index - 1].blur();
      }
    }
  }
};

const onUpdate = (value: any, index: number) => {
  if (value) {
    focus(index + 1);
  }
};

const onKeyUp = (evnt: any, index: number) => {
  const key = evnt.key;

  if (['Tab', 'Shift', 'Meta', 'Control', 'Alt'].includes(key)) {
    return;
  }

  if (['Delete'].includes(key)) {
    return;
  }

  if (key === 'ArrowLeft' || key === 'Backspace') {
    focus(index - 1);
  } else if (key === 'ArrowRight') {
    focus(index + 1);
  }
};
watch(composite, () => {
  if (composite.value) {
    // You should emit this value, e.g.
    emit('on-submit', composite.value);
  }
});
</script>
<template>
  <div class="row q-gutter-x-sm justify-center">
    <q-input
      v-for="i in length"
      v-bind="$attrs"
      :ref="(el) => updateFieldRef(el, i - 1)"
      :key="i"
      v-model="fieldValues[i - 1]"
      maxlength="1"
      outlined
      input-class="text-center"
      style="width: 6ch"
      @keyup="onKeyUp($event, i - 1)"
      @update:model-value="onUpdate($event, i - 1)"
    >
      <slot />
    </q-input>
  </div>
</template>

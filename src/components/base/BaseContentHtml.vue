<script setup lang="ts">
import { escapeHtml } from '@/utils/appUtil';
import { useBase } from 'src/composables/useBase';
import { computed } from 'vue';

const {
  content,
  isEscapeHtml = false,
  highLightText,
} = defineProps<{
  content?: string;
  isEscapeHtml?: boolean;
  highLightText?: string;
}>();
const { inputSanitizeHtml } = useBase();
const emit = defineEmits(['on-press']);
const onPress = (event: any) => {
  emit('on-press', event);
  // event.stopImmediatePropagation();
};
const getSanitizeHtml = computed(() => {
  if (!content) {
    return '';
  }
  const text = isEscapeHtml ? inputSanitizeHtml(escapeHtml(content)) : inputSanitizeHtml(content);
  if (!highLightText) {
    return text;
  }
  return text.replaceAll(
    highLightText,
    `<span class='text-weight-bold text-blue'>${highLightText}</span>`,
  );
});
// const getSanitizeHtml = computed(() => inputSanitizeHtml(content));
</script>

<template>
  <q-no-ssr>
    <div v-bind="$attrs" @click="onPress($event)" v-html="getSanitizeHtml" />
  </q-no-ssr>
</template>

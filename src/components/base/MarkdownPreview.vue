<template>
  <q-no-ssr>
    <MdPreview
      v-bind="$attrs"
      v-model="contentVal"
      :theme="isDark ? 'dark' : 'light'"
      language="en-US"
      :editor-id="editorId"
      :code-theme="codeTheme"
      :preview-theme="previewTheme"
      style="text-align: left"
    />
  </q-no-ssr>
</template>
<script setup lang="ts">
import { useBase } from '@/composables/useBase';
import type { MDCodeTheme, MDPreviewTheme } from '@/types/common';
import { MdPreview } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { onMounted, ref } from 'vue';

const {
  editorId = 'mk-id-gd5',
  previewTheme = 'github',
  codeTheme = 'github',
  content,
} = defineProps<{
  editorId?: string;
  content?: string;
  preview?: boolean;
  previewTheme?: MDPreviewTheme;
  codeTheme?: MDCodeTheme;
}>();
const { isDark } = useBase();
const contentVal = ref<string>(content || '');
onMounted(() => {
  registerLinks();
});
const registerLinks = () => {
  const links = document.links;
  if (links != undefined) {
    for (let i = 0, linksLength = links.length; i < linksLength; i++) {
      if (links[i] != undefined && links[i].hostname != window.location.hostname) {
        links[i].target = '_blank';
      }
    }
  }
};
</script>
<style scoped lang="scss">
.md-editor-dark {
  --md-bk-color: var(--wee-second-bg-color-theme-dark) !important;
}
.md-editor {
  --md-bk-color: transparent !important;
}
</style>

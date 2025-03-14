<template>
  <q-btn
    v-if="showBtnHelp"
    flat
    :icon="biQuestion"
    class="text-capitalize q-pa-md"
    :label="t('base.canUseMarkdown')"
  >
    <q-tooltip>
      {{ t('base.canUseMarkdownHelp') }}
    </q-tooltip>
    <q-menu style="width: 450px">
      <markdown-help />
    </q-menu>
  </q-btn>

  <q-no-ssr>
    <MdEditor
      v-model="modelValue"
      :theme="isDark ? 'dark' : 'light'"
      language="en-US"
      :preview-theme="previewTheme"
      :code-theme="codeTheme"
      :editor-id="editorId || 'edtor' + Math.random()"
      :sanitize="sanitizer"
      :preview="preview || false"
      :htmlPreview="htmlPreview || false"
      :noUploadImg="noUploadImg || false"
      :read-only="readOnly || false"
      :disabled="disabled || false"
      :toolbars-exclude="excludToolBars"
      show-code-row-number
      @on-save="onSave"
      @on-upload-img="onUploadImg"
    />
  </q-no-ssr>
</template>
<script setup lang="ts">
import FileManagerService from '@/api/FileManagerService';
import MarkdownHelp from '@/components/base/MarkdownHelp.vue';
import { useBase } from '@/composables/useBase';
import { useLang } from '@/composables/useLang';
import type { MDCodeTheme, MDPreviewTheme } from '@/types/common';
import type { FileManagerDto } from '@/types/models';
import { biQuestion } from '@quasar/extras/bootstrap-icons';
import type { ToolbarNames } from 'md-editor-v3';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
import { ref } from 'vue';

const {
  editorId = 'mk-id-gd5',
  sanitize = false,
  htmlPreview = false,
  preview = true,
  noUploadImg = true,
  disabled = false,
  readOnly = false,
  showBtnHelp = false,
  previewTheme = 'github',
  codeTheme = 'github',
} = defineProps<{
  editorId?: string;
  sanitize?: boolean;
  htmlPreview?: boolean;
  preview?: boolean;
  noUploadImg?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  showBtnHelp?: boolean;
  previewTheme?: MDPreviewTheme;
  codeTheme?: MDCodeTheme;
}>();
const { t } = useLang();
const { uploadApi } = FileManagerService();
// const text = ref('# Hello Editor ### 🤖 Base');
const modelValue = defineModel<string>({ default: '' });
const { isDark, inputSanitizeHtml, appLoading } = useBase();
const excludToolBars = ref<ToolbarNames[]>(['save', 'github', 'htmlPreview']);
const sanitizer = (html: string) => {
  if (sanitize) {
    return inputSanitizeHtml(html);
  }
  return html;
};
const onSave = (v: any, h: any) => {
  console.log(v);
  h.then((html: any) => {
    console.log(html);
  });
};
const onUploadImg = async (files: any, callback: any) => {
  appLoading();
  const res = await Promise.all(
    files.map((file: any) => {
      // eslint-disable-next-line no-async-promise-executor
      return new Promise(async (rev, rej) => {
        const resPonse = await uploadApi(file);
        rev(resPonse);
        // const form = new FormData();
        // form.append('file', file);
        //
        // axios
        //   .post('/api/img/upload', form, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   })
        //   .then((res) => rev(res))
        //   .catch((error) => rej(error));
      });
    }),
  );

  // Approach 1
  // callback(res.map((item) => item.data.url));

  // Approach 2
  callback(
    res.map((item: FileManagerDto) => ({
      url: item.filePath,
      alt: item.id,
      title: item.fileName,
    })),
  );
  appLoading(false);
};
</script>
<style scoped lang="scss">
.md-editor-dark {
  --md-bk-color: var(--wee-second-bg-color-theme-dark) !important;
}
</style>

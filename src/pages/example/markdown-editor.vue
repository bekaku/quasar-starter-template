<script setup lang="ts">
import MarkdownEditor from '@/components/base/MarkdownEditor.vue';
import MarkdownPreview from '@/components/base/MarkdownPreview.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biCode, biEye, biPencil } from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import { ref, useId } from 'vue';
// import md from 'src/assets/data.md';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Markdown | ${t('app.name')}`);
const contentId = useId();
const contentPreviewId = useId();

const content = ref<string>(`
## 😲 md-editor-v3

Markdown Editor for Vue3, developed in jsx and typescript, support different themes、beautify content by prettier.

### 🤖 Base

**bold**, <u>underline</u>, _italic_, ~~line-through~~, superscript^26^, subscript~1~, \`inline code\`, [link](https://github.com/imzbf)
> quote: I Have a Dream

1. So even though we face the difficulties of today and tomorrow, I still have a dream.
2. It is a dream deeply rooted in the American dream.
3. I have a dream that one day this nation will rise up.

- [ ] Friday
- [ ] Saturday
- [x] Sunday
![Picture](https://imzbf.github.io/md-editor-rt/imgs/mark_emoji.gif)

## 🤗 Code
\`\`\`vue
<template>
  <MdEditor v-model="text" />
</template>
<script setup>
import { ref } from 'vue';
import { MdEditor } from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';

const text = ref('Hello Editor!');
<\/script>
\`\`\`

## 🖨 Text

The Old Man and the Sea served to reinvigorate Hemingway's literary reputation and prompted a reexamination of his entire body of work.

## 📈 Table
| THead1          |      THead2       |           THead3 |
| :-------------- | :---------------: | ---------------: |
| text-align:left | text-align:center | text-align:right |

## 📏 Formula

Inline: $x+y^{2x}$

$$
\sqrt[3]{x}
$$

## 🧬 Diagram

\`\`\`mermaid
flowchart TD
  Start --> Stop
\`\`\`

## 🪄 Alert

!!! note Supported Types

note、abstract、info、tip、success、question、warning、failure、danger、bug、example、quote、hint、caution、error、attention

!!!

## ☘️ em...
`);
</script>
<template>
  <BasePage :full="false">
    <BaseTextHeader title="Markdown">
      <template #end>
        <BaseButton
          href="https://github.com/bekaku/quasar-starter-template/blob/main/src/pages/example/markdown-editor.vue"
          target="_blank"
          :icon="biCode"
          flat
          round
        >
          <q-tooltip>View Source</q-tooltip>
        </BaseButton>
      </template>
    </BaseTextHeader>
    <q-card-section class="q-gutter-y-lg">
      <BaseCard flat class="q-pa-md" title="Editor" :icon="biPencil">
        <markdown-editor v-model="content" :editor-id="contentId" />
      </BaseCard>

      <BaseCard flat class="q-pa-md" title="Preview" :icon="biEye">
        <markdown-preview :content="content" :editor-id="contentPreviewId"></markdown-preview>
      </BaseCard>
    </q-card-section>
  </BasePage>
</template>

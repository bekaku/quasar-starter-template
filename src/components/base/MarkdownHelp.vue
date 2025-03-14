<template>
  <div class="row bg-black text-white">
    <div class="col">
      <q-list separator>
        <q-item>
          <q-item-section>
            <q-item-label>
              <a
                class="app-text-link text-primary"
                href="https://github.com/adam-p/markdown-here/wiki/Markdown-Here-Cheatsheet"
                target="_blank"
                >{{ t('base.markdownSheatsheet') }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              <a
                class="app-text-link text-primary"
                href="https://mermaid.js.org/ecosystem/tutorials.html"
                target="_blank"
                >{{ t('base.markdownMermaidSheatsheet') }}</a
              >
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ t('base.markdownCommonUse') }}
            </q-item-label>
            <q-item-label caption>
              <q-markup-table dark flat separator="horizontal">
                <tbody>
                  <tr>
                    <td class="text-left"># Header</td>
                    <td class="text-right">
                      <div class="text-h1">H1</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">## Header</td>
                    <td class="text-right">
                      <div class="text-h2">H2</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">### Header</td>
                    <td class="text-right">
                      <div class="text-h3">H3</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">###### Header</td>
                    <td class="text-right">
                      <div class="text-h6">H6</div>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">*italics* or _italics_</td>
                    <td class="text-right text-italic">italics</td>
                  </tr>
                  <tr>
                    <td class="text-left">**bold**</td>
                    <td class="text-right text-bold text-weight-bold">bold</td>
                  </tr>
                  <tr>
                    <td class="text-left">[Link](https://...)</td>
                    <td class="text-right text-bold">
                      <a class="app-text-link text-primary" href="">Link</a>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      * item 1<br />
                      * item 2<br />
                    </td>
                    <td class="text-right text-bold">
                      <ul>
                        <li>item 1</li>
                        <li>item 2</li>
                      </ul>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">> quoted text</td>
                    <td class="text-right text-bold">
                      <q> quoted text </q>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">`inline code`</td>
                    <td class="text-right text-bold">
                      <code> inline code </code>
                    </td>
                  </tr>
                  <tr>
                    <td class="text-left">
                      ```<br />
                      code block<br />
                      ```<br />
                    </td>
                    <td class="text-right text-bold">
                      <code> code block </code>
                    </td>
                  </tr>
                </tbody>
              </q-markup-table>
            </q-item-label>
          </q-item-section>
        </q-item>
        <q-item>
          <q-item-section>
            <q-item-label>
              {{ t('base.canUseMarkdownImage') }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useLang } from '@/composables/useLang';

const { t } = useLang();
</script>
<style scoped lang="scss"></style>

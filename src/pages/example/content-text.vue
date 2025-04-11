<script setup lang="ts">
import ContentItem from '@/components/base/BaseContentItem.vue';
import OpenGraphItemAlt from '@/components/base/OpenGraphItemAlt.vue';
import BaseButton from '@/components/base/BaseButton.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { useValidation } from '@/composables/useValidation';
import { extractHashtagsFromString } from '@/utils/appUtil';
import Ellipsis from '@/components/base/BaseEllipsis.vue';
import { ref, useId } from 'vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
const { required } = useValidation();
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Content Text | ${t('app.name')}`);
const contentUniqeId = useId();
const contentUniqeId2 = useId();
const content =
  ref<string>(`TypeScript has become the go-to language for many developers, providing the benefits of static typing while maintaining the flexibility of JavaScript. However, as TypeScript continues to evolve, some practices that were once considered best may now be outdated or suboptimal. In this article, we’ll cover 10 bad TypeScript habits you should break in 2024 to write cleaner, more efficient, and maintainable code.

1. Not Using strict Mode
The Problem:
Many developers disable TypeScript’s strict mode to avoid dealing with stricter type checks.

Why It’s Bad:
When strict mode is off, TypeScript becomes more lenient, reducing the effectiveness of type safety. This can lead to unexpected bugs and make refactoring more challenging in the future.

What to Do Instead:
Enable strict mode in your tsconfig.json. It will enforce better type checks and ensure that your code is more robust in the long run.

https://www.youtube.com/watch?v=PCSqrpAWq1s


DOMPurify is a DOM-only, super-fast, uber-tolerant XSS sanitizer for HTML, MathML and SVG.
https://github.com/cure53/DOMPurify
Example
<img src=x onerror=alert(1)//>
<p>abc<iframe//src=jAva&Tab;script:alert(3)>def</p>
<TABLE><tr><td>HELLO</tr></TABL>

#dev_tips #ทดสอบเท็ก`);
const showContent = ref(true);
const onPreview = () => {
  showContent.value = false;
  setTimeout(() => {
    showContent.value = true;
  }, 500);
};

const testExtractHashTag = () => {
  const contentHashTags = extractHashtagsFromString(content.value);
  console.log('contentHashTags', contentHashTags);
  // const finalText = content.value.replace(
  //     /#([a-zA-Z\p{L}\p{N}_\u0E00-\u0E7F]+)/gu,
  //     '<a class="hashtag-href">#$1</a>'
  // );
  // console.log('contentHashTags', finalText)
};
</script>

<template>
  <BasePage>
    <BaseCard title="Content Text">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md-6">
            <q-input
              outlined
              v-model="content"
              bottom-slots
              label="Content"
              type="textarea"
              :rules="[required]"
              autogrow
              class="limited-autogrow"
            >
              <template #hint>
                <span class="text-negative">*</span>
              </template>
            </q-input>

            <BaseButton @click="onPreview"> Reload Preview </BaseButton>
            <BaseButton @click="testExtractHashTag" class="q-ml-md" color="negative">
              Extract HashTag from content
            </BaseButton>
          </div>
          <div class="col-12 col-md-6 q-pa-md">
            <div class="text-h5 q-pb-sm">Ellipsis</div>

            <ellipsis class="q-mb-lg" :lines="4" clickable>
              {{ content }}
            </ellipsis>

            <div class="text-h5 q-pb-sm">Preview with sanitize html</div>
            <template v-if="showContent">
              <content-item
                wrap-text
                :content="content"
                :content-id="contentUniqeId"
                :is-escape-html="false"
                hashtagUrlify
                show-more
              >
              </content-item>
              <open-graph-item-alt :content="content" short imageSize="150px" />
            </template>
            <q-separator class="q-my-md" />

            <div class="text-h5 q-pb-sm">Preview with escape html</div>
            <template v-if="showContent">
              <content-item
                wrap-text
                :content="content"
                :content-id="contentUniqeId2"
                is-escape-html
                :limit="10"
                hashtagUrlify
                show-more
              >
              </content-item>
              <open-graph-item-alt :content="content" />
            </template>
          </div>
        </div>
      </q-card-section>
    </BaseCard>
  </BasePage>
</template>

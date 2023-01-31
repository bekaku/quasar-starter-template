<template>
  <q-card-section>
    <div
      :id="'feed-post-content-' + postId"
      :class="showMoreBtn && !showMoreText ? 'word-limit' : ''"
      v-html="urlify(content)"
    ></div>
    <app-link
      v-if="showMoreBtn && !showMoreText"
      :label="'...' + t('base.seeMore')"
      color="text-primary"
      @click="showMoreText = true"
    />
  </q-card-section>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import AppLink from 'src/components/base/AppLink.vue';
import { urlify, roundDecimal } from 'src/utils/appUtil';
import { useLang } from '@/composables/useLang';
const props = defineProps({
  content: {
    type: String,
    default: '',
  },
  postId: {
    type: Number,
    default: 0,
  },
});
const { t } = useLang();
const lineHeight = ref(0);
const limitLines = ref(4);
const showMoreBtn = ref(false);
const showMoreText = ref(false);
onMounted(() => {
  setDescHeight();
});
const setDescHeight = () => {
  var el = document.getElementById('feed-post-content-' + props.postId);
  if (el) {
    var divHeight = el.offsetHeight;
    const lineHeigth = divHeight / 17;
    lineHeight.value = roundDecimal(lineHeigth, 0);
    if (lineHeight.value > limitLines.value) {
      showMoreBtn.value = true;
    }
  }
};
</script>

<style scoped>
.word-limit {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4; /* number of lines to show */
  line-clamp: 4;
  -webkit-box-orient: vertical;
}
</style>

<template>
  <BaseCard>
    <slot name="refrenceItem">
      <template v-if="post.reference">
        <q-item>
          <q-item-section avatar>
            <q-avatar size="30px">
              <img
                class="bg-gray-8"
                src="https://i.pravatar.cc/450"
                spinner-color="white"
                no-native-menu
              />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>
              <profile-name :label="post.reference.name" color="wee-text-head" to="/user/bekaku" />

              <span class="text-caption q-ml-sm text-muted">{{
                post.reference.activity
              }}</span></q-item-label
            >
          </q-item-section>
          <q-item-section side>
            <q-icon :name="post.reference.activityIcon" />
          </q-item-section>
        </q-item>
        <q-separator />
      </template>
    </slot>
    <slot name="header">
      <q-item>
        <q-item-section avatar top>
          <q-avatar size="48px">
            <q-img
              class="bg-gray-8"
              :src="AvatarPlaceHolder128"
              spinner-color="white"
              no-native-menu
            />
            <q-badge
              floating
              color="positive"
              rounded
              transparent
              class="absolute"
              style="top: 30px"
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label class="text-weight-bold cursor-pointer">
            <profile-name
              label="Chanavee Bekaku"
              color="wee-text-head wee-text-weight-bold"
              to="/user/bekaku"
            />
          </q-item-label>
          <q-item-label caption>
            {{ appFormatDateTime(post.postDatetime, FORMAT_DATE12) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <post-menu />
        </q-item-section>
      </q-item>
    </slot>

    <slot name="description">
      <!-- <post-content :content="post.content" :post-id="post.id" /> -->
      <q-card-section>
        <content-item
          :wrap-text="true"
          :content="post.content"
          :content-id="contentUniqeId"
          :open-post-view="false"
          :show-copy-text="false"
          :show-more="false"
          :showBackground="false"
        />
      </q-card-section>
    </slot>
    <slot name="hashtag">
      <post-hashtag v-if="post.hashtag.length > 0" :items="post.hashtag" />
    </slot>

    <slot name="photos">
      <post-gallerry v-if="post.gallery.length > 0" :items="post.gallery" />
    </slot>

    <template v-if="post.gallery.length == 0 && opengraphItem">
      <OpenGraphItem :item="opengraphItem" />
    </template>

    <slot name="engaging">
      <post-engaging />
    </slot>
    <slot name="action">
      <post-action />
    </slot>
    <slot name="commentsArea">
      <comment-area />
      <comment-sort class="q-ml-sm" />
    </slot>
    <slot name="commentsList">
      <comment-items />
    </slot>
  </BaseCard>
</template>

<script setup lang="ts">
import ContentItem from '@/components/base/BaseContentItem.vue';
import CommentArea from '@/components/feed/CommentArea.vue';
import CommentItems from '@/components/feed/CommentItems.vue';
import CommentSort from '@/components/feed/CommentSort.vue';
import PostAction from '@/components/feed/PostAction.vue';
import PostEngaging from '@/components/feed/PostEngaging.vue';
import PostGallerry from '@/components/feed/PostGallerry.vue';
import PostHashtag from '@/components/feed/PostHashtag.vue';
import PostMenu from '@/components/feed/PostMenu.vue';
import ProfileName from '@/components/feed/ProfileName.vue';
import { useBase } from '@/composables/useBase';
import type { OgMeta, PostData } from '@/types/models';
import { catchUrlFromText } from '@/utils/appUtil';
import { AvatarPlaceHolder128 } from '@/libs/constant';
import { FORMAT_DATE12 } from '@/utils/dateUtil';
import { onMounted, ref, useId } from 'vue';
import BaseCard from '../base/BaseCard.vue';
import OpenGraphItem from '../base/OpenGraphItem.vue';

const { post } = defineProps<{
  post: PostData;
  index: number;
}>();
const contentUniqeId = useId();
//   const { getOgMeta } = UtilService();
const { appFormatDateTime } = useBase();
const opengraphItem = ref<OgMeta>();
onMounted(() => {
  checkOgLink();
});
const checkOgLink = async () => {
  const matches = catchUrlFromText(post.content);
  if (matches && matches.length > 0) {
    //   opengraphItem.value = await getOgMeta(matches[0]);
    opengraphItem.value = {
      domain: 'youtube.com',
      url: 'https://www.youtube.com/watch?v=-IkEMMKSqcw',
      title: 'WONDERS OF PLANET EARTH | Most Magnificent Places | Travel Documentary 4K',
      desc: 'Embark on a 90-minute cinematic voyage to Earth\'s most breathtaking and uncharted destinations. This visual odyssey transports you to the farthest corners of the globe, where nature\'s artistry surpasses the imagination, revealing landscapes and phenomena that defy belief. From mystical formations sculpted over millennia to ancient wonders where human history intertwines with geological marvels, witness landscapes plucked from fantasy, narrated with captivating detail and insight.',
      image: 'https://i.ytimg.com/vi/-IkEMMKSqcw/maxresdefault.jpg',
      imageAlt: '',
    };
  }
};
</script>

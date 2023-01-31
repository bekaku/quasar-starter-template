<template>
  <q-card flat bordered class="q-mt-md">
    <slot name="refrenceItem">
      <q-item v-if="post.reference">
        <q-item-section avatar>
          <q-avatar size="30px">
            <q-img
              class="bg-gray-8"
              src="https://placeimg.com/120/120/people"
              spinner-color="white"
              no-native-menu
            />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>
            <profile-name
              :label="post.reference.name"
              color="wee-text-head"
              to="/user/bekaku"
            />

            <span class="text-caption q-ml-sm wee-text-muted">{{
              post.reference.activity
            }}</span></q-item-label
          >
          <!-- <q-item-label caption>From hashtag #SetAlarm</q-item-label> -->
        </q-item-section>
        <q-item-section side>
          <q-icon :name="post.reference.activityIcon" />
        </q-item-section>
      </q-item>
      <q-separator />
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
            {{ AppFormatDateTime(post.postDatetime, FORMAT_DATE12) }}
          </q-item-label>
        </q-item-section>
        <q-item-section side top>
          <post-menu />
        </q-item-section>
      </q-item>
    </slot>

    <slot name="description">
      <post-content :content="post.content" :post-id="post.id" />
    </slot>
    <slot name="hashtag">
      <post-hashtag v-if="post.hashtag.length > 0" :items="post.hashtag" />
    </slot>

    <slot name="photos">
      <post-gallerry v-if="post.gallery.length > 0" :items="post.gallery" />
    </slot>

    <template v-if="post.gallery.length == 0 && opengraphItem">
      <q-card flat>
        <q-img
          spinner-color="white"
          :src="opengraphItem.image"
          style="max-height: 314px"
        />
        <q-item
          clickable
          :class="
            !$q.dark.isActive ? 'bg-grey-2' : 'wee-main-bg-color-theme-dark'
          "
          :href="opengraphItem.url"
          target="_blank"
        >
          <q-item-section>
            <q-item-label :lines="1">{{ opengraphItem.domain }}</q-item-label>
            <q-item-label :lines="1">{{ opengraphItem.title }}</q-item-label>
            <q-item-label caption :lines="2">{{
              opengraphItem.desc
            }}</q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="biBoxArrowUpRight" />
          </q-item-section>
        </q-item> </q-card
    ></template>

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
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted, PropType } from 'vue';
import { AvatarPlaceHolder128 } from 'src/utils/constant';
import CommentSort from 'src/components/feed/CommentSort.vue';
import PostAction from 'src/components/feed/PostAction.vue';
import PostEngaging from 'src/components/feed/PostEngaging.vue';
import CommentArea from 'src/components/feed/CommentArea.vue';
import CommentItems from 'src/components/feed/CommentItems.vue';
import PostGallerry from 'src/components/feed/PostGallerry.vue';
import PostHashtag from 'src/components/feed/PostHashtag.vue';
import PostContent from 'src/components/feed/PostContent.vue';
import ProfileName from 'src/components/feed/ProfileName.vue';
import PostMenu from 'src/components/feed/PostMenu.vue';
import { PostData, OgMeta } from '@/types/models';
import useBase from 'src/composables/useBase';
import { FORMAT_DATE12 } from 'src/utils/dateUtil';
import { catchUrlFromText } from 'src/utils/appUtil';
//   import UtilService from '@/api/UtilService';
import { biBoxArrowUpRight } from '@quasar/extras/bootstrap-icons';
const props = defineProps({
  post: {
    type: Object as PropType<PostData>,
    default: () => null,
    required: true,
  },
  index: {
    type: Number,
  },
});
//   const { getOgMeta } = UtilService();
const { AppFormatDateTime } = useBase();
const opengraphItem = ref<OgMeta>();
onMounted(() => {
  checkOgLink();
});
const checkOgLink = async () => {
  const matches = catchUrlFromText(props.post.content);
  if (matches && matches.length > 0) {
    //   opengraphItem.value = await getOgMeta(matches[0]);
    opengraphItem.value = {
      domain: 'youtube.com',
      url: 'https://www.youtube.com/watch?v=2qeueW4YavM',
      title: 'Solo wild camping in the rain [ASMR]',
      desc: '#ASMR #wildcamping #rainsounds  Back with another ASMR style wild camp. I had a few people ask for longer videos like this, so here you have it :) I love mak...',
      image: 'https://i.ytimg.com/vi/2qeueW4YavM/maxresdefault.jpg',
      imageAlt: '',
    };
  }
};
</script>

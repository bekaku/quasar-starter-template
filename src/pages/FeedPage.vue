<template>
  <q-page class="q-px-md">
    <q-infinite-scroll @load="onLoadRef" :offset="250">
      <q-card v-if="!$q.screen.gt.sm" flat bordered class="q-mb-md">
        <profile-card
          :avatar-image="authenStore.loginedAvatar"
          :cover-image="authenStore.loginedCover"
          :name="authenStore.loginedDisplay"
          description="Software Engineer"
          height="100px"
          avatar-top="50px"
          avatar-size="65px"
          descriptionStyle="margin-top:25px"
          show-medal
        />
      </q-card>

      <feed-post-area />
      <feed-sort />

      <template v-for="(item, index) in posts" :key="index">
        <feed-post :post="item" :index="index" />
      </template>

      <template v-slot:loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
    </q-infinite-scroll>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useAppMeta from '@/composables/useAppMeta';
import FeedPostArea from 'src/components/feed/FeedPostArea.vue';
import FeedSort from 'src/components/feed/FeedSort.vue';
import FeedPost from 'src/components/feed/FeedPost.vue';
import ProfileCard from '@/components/feed/ProfileCard.vue';
import { PostData } from '@/types/models';
import { useAuthenStore } from 'stores/authenStore';
const authenStore = useAuthenStore();
useAppMeta();
const initialPost: PostData[] = [
  {
    id: 1,
    pin: false,
    postDatetime: '2022-01-05 11:30:30',
    content:
      'Solo wild camping in the rain [ASMR] https://www.youtube.com/watch?v=2qeueW4YavM',
    gallery: [],
    hashtag: [
      { id: 1, name: 'DesperateHours' },
      { id: 2, name: 'FreeDocumentary' },
      { id: 3, name: 'Documentary' },
    ],
    reference: {
      name: 'Danial Wong',
      activity: 'likes this',
      activityIcon: 'bi-heart',
    },
  },
  {
    id: 2,
    pin: false,
    postDatetime: '2022-04-28 11:30:30',
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    gallery: [
      {
        image: 'https://loremflickr.com/500/300/dog',
        thumbnail: 'https://loremflickr.com/160/160/dog',
      },
      {
        image: 'https://loremflickr.com/500/300/brazil,rio',
        thumbnail: 'https://loremflickr.com/160/160/brazil,rio',
      },
      {
        image: 'https://loremflickr.com/500/300/paris',
        thumbnail: 'https://loremflickr.com/160/160/paris',
      },
      {
        image: 'https://loremflickr.com/500/300?random=1',
        thumbnail: 'https://loremflickr.com/160/160?random=1',
      },
      {
        image: 'https://loremflickr.com/500/300?random=2',
        thumbnail: 'https://loremflickr.com/160/160?random=2',
      },
      {
        image: 'https://loremflickr.com/500/300?random=3',
        thumbnail: 'https://loremflickr.com/160/160?random=3',
      },
      {
        image: 'https://loremflickr.com/500/300?random=4',
        thumbnail: 'https://loremflickr.com/160/160?random=4',
      },
    ],
    hashtag: [],
  },
  {
    id: 3,
    pin: false,
    postDatetime: '2022-07-05 11:30:30',
    reference: {
      name: 'Vinayak Naik',
      activity: 'prize this',
      activityIcon: 'bi-gift',
    },
    content:
      "555 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ",
    gallery: [
      {
        image: 'https://loremflickr.com/500/300?random=3',
        thumbnail: 'https://loremflickr.com/160/160?random=3',
      },
    ],
    hashtag: [{ id: 1, name: 'WeAreHearForBuil' }],
  },
  {
    id: 4,
    pin: false,
    postDatetime: '2022-01-05 11:30:30',
    reference: {
      name: 'Danial Wong',
      activity: 'share this',
      activityIcon: 'bi-share',
    },
    content:
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. https://pantip.com/topic/40388674',
    gallery: [],
    hashtag: [{ id: 1, name: 'WeAreHearForBuil' }],
  },
  {
    id: 5,
    pin: false,
    postDatetime: '2022-01-05 11:30:30',
    reference: {
      name: 'Danial Wong',
      activity: 'share this',
      activityIcon: 'bi-share',
    },
    content:
      'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham. https://pantip.com/topic/40388674',
    gallery: [],
    hashtag: [],
  },
];
const posts = ref<PostData[]>(initialPost);
const onLoadRef = (index: number, done: any) => {
  console.log('onLoadRef', index);
  setTimeout(() => {
    posts.value.push(initialPost[0]);
    done(); //done(true) Stops QInfiniteScroll if it's Boolean 'true'; Specify it in case there's nothing more to load
  }, 2000);
};
</script>

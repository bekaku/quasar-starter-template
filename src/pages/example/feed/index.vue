<script setup lang="ts">
import FeedPost from '@/components/feed/FeedPost.vue';
import FeedPostArea from '@/components/feed/FeedPostArea.vue';
import FeedSort from '@/components/feed/FeedSort.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useAuthenStore } from '@/stores/authenStore';
import type { PostData } from '@/types/models';
import { useQuasar } from 'quasar';
import BaseInfiniteScroll from 'src/components/base/BaseInfiniteScroll.vue';
import BasePage from 'src/components/base/BasePage.vue';
import UserCard from 'src/components/user/UserCard.vue';
import { ref } from 'vue';

const authenStore = useAuthenStore();
useAppMeta();
const { screen } = useQuasar();
const initialPost: PostData[] = [
  {
    id: 1,
    pin: false,
    postDatetime: '2022-01-05 11:30:30',
    content: 'Solo wild camping in the rain [ASMR] https://www.youtube.com/watch?v=2wMRYQPj7iU',
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
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
    gallery: [
      {
        id: 1,
        fileMime: 'image/jpeg',
        fileName: 'Img001.jpg',
        filePath:
          'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 2,
        fileMime: 'image/jpeg',
        fileName: 'Img002.jpg',
        filePath:
          'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 3,
        fileMime: 'image/jpeg',
        fileName: 'Img003.jpg',
        filePath:
          'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 4,
        fileMime: 'image/jpeg',
        fileName: 'Img004.jpg',
        filePath:
          'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 5,
        fileMime: 'image/jpeg',
        fileName: 'Img005.jpg',
        filePath:
          'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 6,
        fileMime: 'image/jpeg',
        fileName: 'Img006.jpg',
        filePath:
          'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 7,
        fileMime: 'image/jpeg',
        fileName: 'Img007.jpg',
        filePath:
          'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 8,
        fileMime: 'image/jpeg',
        fileName: 'Img008.jpg',
        filePath:
          'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 9,
        fileMime: 'image/jpeg',
        fileName: 'Img009.jpg',
        filePath:
          'https://images.pexels.com/photos/29008754/pexels-photo-29008754/free-photo-of-scenic-desert-highway-at-sunrise-in-utah.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 10,
        fileMime: 'image/jpeg',
        fileName: 'Img010.jpg',
        filePath:
          'https://images.pexels.com/photos/25244460/pexels-photo-25244460/free-photo-of-a-fashionable-young-woman-standing-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 11,
        fileMime: 'image/jpeg',
        fileName: 'Img011.jpg',
        filePath:
          'https://images.pexels.com/photos/27467770/pexels-photo-27467770/free-photo-of-laptop-and-camera-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
      },
      {
        id: 12,
        fileMime: 'image/jpeg',
        fileName: 'Img011.jpg',
        filePath:
          'https://images.pexels.com/photos/28271613/pexels-photo-28271613/free-photo-of-a-car-mirror-is-shown-in-the-side-view-of-a-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
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
      '555 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. ',
    gallery: [
      {
        id: 6,
        fileMime: 'image/jpeg',
        fileName: 'Img006.jpg',
        filePath:
          'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
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
    const items = initialPost.slice(0, 3);
    if (items.length > 0) {
      // posts.value.push(item);
      posts.value = [...posts.value, ...items];
    }

    done(); // done(true) Stops QInfiniteScroll if it's Boolean 'true'; Specify it in case there's nothing more to load
  }, 500);
};
</script>
<template>
  <BasePage :padding="false" class="q-px-md" scroll-event show-to-top>
    <!-- <q-infinite-scroll @load="onLoadRef" :offset="250"> -->
    <BaseInfiniteScroll :offset="500" @on-infinite="onLoadRef">
      <q-card v-if="!screen.gt.sm" flat bordered class="q-mb-md">
        <UserCard
          v-if="authenStore.auth"
          :avatar-image="authenStore.auth?.avatar?.image"
          :cover-image="authenStore.loginedCover"
          :name="authenStore.loginedDisplay"
          description="Software Engineer"
          height="100px"
          avatar-top="50px"
          avatar-size="65px"
          descriptionStyle="margin-top:25px"
        />
      </q-card>

      <feed-post-area />
      <feed-sort />

      <template v-for="(item, index) in posts" :key="`${index}-${item.id}`">
        <feed-post :post="item" :index="index" />
      </template>

      <template #loading>
        <div class="row justify-center q-my-md">
          <q-spinner-dots color="primary" size="40px" />
        </div>
      </template>
      <!-- </q-infinite-scroll> -->
    </BaseInfiniteScroll>
  </BasePage>
</template>

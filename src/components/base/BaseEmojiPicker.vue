<template>
  <q-card flat>
    <q-no-ssr>
      <div :id="pickerId" />
    </q-no-ssr>
  </q-card>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import data from '@emoji-mart/data';
// import { Picker } from 'emoji-mart';
import type { EmojiSet } from '@/types/common';
const { theme = 'light', pickerId = 'emoji-id' } = defineProps<{
  pickerId?: string;
  theme?: 'light' | 'dark';
}>();
const pickerEmoji = ref();
const iconSet = ref<EmojiSet>('native'); // native, apple, facebook, google, twitter
onMounted(() => {
  init();
});
const init = async () => {
  if (process.env.SERVER) {
    return;
  }
  const EmojiMart = await import('emoji-mart');
  pickerEmoji.value = new EmojiMart.Picker({
    // data: data,
    theme,
    data: iconSet.value != 'native' ? undefined : data,
    parent: document.querySelector('#' + pickerId),
    set: iconSet.value,
    onEmojiSelect: onSelectEmoji,
    // emojiVersion: 14,
    custom: [
      {
        emojis: [
          {
            id: 'octocat',
            name: 'Octocat',
            keywords: ['github'],
            skins: [
              {
                src: 'https://missiveapp.com/open/emoji-mart/octocat.5d6e1891.png',
              },
            ],
          },
          {
            id: 'shipit',
            name: 'Squirrel',
            keywords: ['github'],
            skins: [
              {
                src: 'https://missiveapp.com/open/emoji-mart/shipit.3a3eb70f.png',
              },
            ],
          },
          {
            id: 'party_parrot',
            name: 'Party Parrot',
            keywords: ['dance', 'dancing'],
            skins: [
              {
                src: 'https://missiveapp.com/open/emoji-mart/parrot.6a845cb2.gif',
              },
            ],
          },
        ],
      },
    ],
  });
};
const emit = defineEmits(['on-close', 'on:emojiClick']);
const onSelectEmoji = (event: any) => {
  if (event.native) {
    emit('on:emojiClick', event.native);
  }
};
</script>

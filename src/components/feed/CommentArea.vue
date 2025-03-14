<template>
  <q-item>
    <q-item-section avatar top>
      <q-avatar size="36px">
        <img :src="AvatarPlaceHolder128" />
      </q-avatar>
    </q-item-section>
    <q-item-section>
      <q-input
        dense
        outlined
        v-model="comments"
        type="textarea"
        autogrow
        label="Add comment"
        counter
        maxlength="255"
      >
        <template #append>
          <q-btn flat round :icon="biEmojiSmile" />
          <q-btn flat round :icon="biImage" />
        </template>
      </q-input>
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { AvatarPlaceHolder128 } from '@/libs/constant';
import { biEmojiSmile, biImage } from '@quasar/extras/bootstrap-icons';
import { ref } from 'vue';
const comments = ref(null);
</script>

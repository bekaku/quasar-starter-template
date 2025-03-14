<script setup lang="ts">
import { useLang } from 'src/composables/useLang';
import BaseAvatar from '../base/BaseAvatar.vue';
import { biChatSquare, biGift, biPatchCheck, biPencil } from '@quasar/extras/bootstrap-icons';
const {
  height = '250px',
  avatarTop = '75px',
  avatarSize = '120px',
  avatarFlat = false,
  flat = false,
} = defineProps<{
  coverImage?: string | undefined;
  avatarImage?: string | undefined;
  height?: string;
  avatarTop?: string;
  avatarFlat?: boolean;
  avatarSize?: string;
  descriptionStyle?: string;
  name?: string | undefined;
  description?: string | undefined;
  flat?: boolean;
}>();
const { t } = useLang();
</script>
<template>
  <q-card v-bind="$attrs" :flat class="bg-transparent">
    <q-card flat>
      <div
        :style="`height: ${height};
            background: url(${
              coverImage ? coverImage : '/cover.jpg'
            }), linear-gradient(to right, #000, #000);
            background-position: center;
            -webkit-background-size: cover;
            -moz-background-size: cover;
            -o-background-size: cover;
            background-size: cover;`"
      />
      <slot name="avatar">
        <div class="text-white absolute-center">
          <base-avatar
            v-if="avatarImage"
            :src="avatarImage"
            :size="avatarSize"
            :style="{ top: avatarTop }"
            :class="{ 'shadow-5': !avatarFlat }"
          />
        </div>
      </slot>
      <slot name="extra" />
    </q-card>
    <slot name="description">
      <q-card-section class="text-center" :style="descriptionStyle">
        <q-item dense>
          <q-item-section>
            <q-item-label class="text-weight-bold" lines="1">
              {{ name }}
              <q-icon :name="biPatchCheck" color="blue" />
            </q-item-label>
            <q-item-label caption>
              {{ description }}
            </q-item-label>
          </q-item-section>
        </q-item>
        <slot name="statistic">
          <div class="row justify-around text-center q-pt-md">
            <div>
              <div class="text-weight-bold">78</div>
              <div class="text-caption text-muted">
                <q-icon :name="biGift" class="q-mr-xs" />{{ t('prizes') }}
              </div>
            </div>
            <div>
              <div class="text-weight-bold">1.2k</div>
              <span class="text-caption text-muted">
                <q-icon :name="biPencil" class="q-mr-xs" />{{ t('posts') }}
              </span>
            </div>
            <div>
              <div class="text-weight-bold">7.5k</div>
              <span class="text-caption text-muted">
                <q-icon :name="biChatSquare" class="q-mr-xs" />{{ t('comments') }}
              </span>
            </div>
          </div>
        </slot>
      </q-card-section>
    </slot>
  </q-card>
</template>

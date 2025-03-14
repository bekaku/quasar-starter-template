<template>
  <q-item
    v-if="item"
    :dense="dense"
    :clickable="button"
    @click="$emit('on-select', item)"
    :to="to ? to : undefined"
  >
    <q-item-section avatar top class="q-pt-sm">
      <slot name="avata">
        <q-avatar :size="`${avatarSize}px`">
          <q-img
            class="bg-grey-8"
            :src="item.avatar?.thumbnail"
            spinner-color="white"
            no-native-menu
          />
          <!-- <q-badge
          floating
          color="positive"
          rounded
          transparent
          class="absolute"
          style="top: 30px"
        /> -->
        </q-avatar>
      </slot>
    </q-item-section>

    <q-item-section>
      <slot name="profilename">
        <q-item-label
          :lines="nameLines"
          class="cursor-pointer"
          :class="{ 'text-weight-bold': nameBold }"
        >
          {{ item.fullName }}
        </q-item-label>
      </slot>
      <slot name="position" />
      <slot name="extra" />
    </q-item-section>
    <q-item-section side top>
      <slot name="side" />
    </q-item-section>
  </q-item>
</template>
<script setup lang="ts">
import type { PropType } from 'vue';
import type { UserProfileDto } from '@/types/models';
// import ProfileName from '@/components/profile/ProfileName.vue';
defineProps({
  item: {
    type: Object as PropType<UserProfileDto>,
    default: () => null,
  },
  index: {
    type: Number,
    default: 0,
  },
  nameLines: {
    type: Number,
    default: 1,
  },
  positionLines: {
    type: Number,
    default: 1,
  },
  avatarSize: {
    type: Number,
    default: 42,
  },
  button: {
    type: Boolean,
    default: true,
  },
  nameBold: {
    type: Boolean,
    default: true,
  },
  dense: {
    type: Boolean,
    default: false,
  },
  to: {
    type: String as PropType<string | undefined>,
    default: undefined,
  },
});
defineEmits(['on-select']);
</script>

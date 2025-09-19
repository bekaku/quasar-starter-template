<script setup lang="ts">
import type { IAlert } from '@/types/common';
import { biX } from '@quasar/extras/bootstrap-icons';
import { mdiLightbulbOnOutline } from '@quasar/extras/mdi-v7';
import { ref } from 'vue';

const {
  icon = mdiLightbulbOnOutline,
  dense = false,
  radius = true,
  closeable = true,
  type = 'is-light',
  secondary = false,
} = defineProps<{
  message: string;
  title?: string;
  type?: IAlert;
  icon?: string;
  dense?: boolean;
  radius?: boolean;
  closeable?: boolean;
  secondary?: boolean;
}>();
const show = ref(true);
</script>
<template>
  <div
    v-show="show"
    class="v-notification"
    :class="`${type} ${secondary ? 'is-light' : ''}`"
    :style="{
      padding: dense ? '5px' : '1rem 2.25rem 1rem 1.25rem',
      borderRadius: radius ? '5px' : '',
    }"
  >
    <div>
      <slot>
        <strong> <q-icon v-if="icon" :name="icon" style="margin-right: 5px" size="md" /></strong>
        <span v-if="title" class="q-mx-sm text-weight-bold">{{ title }}</span>
        {{ message ? message : '' }}
        <div>
          <slot name="extra" />
        </div>
      </slot>
    </div>
    <q-btn v-if="closeable" class="delete" dense round flat :icon="biX" @click="show = !show" />
  </div>
</template>
<style lang="css" scoped>
.v-notification > .delete {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.v-notification {
  background-color: whitesmoke;
  /* border-radius: 4px; */
  /* padding: 1rem 2.25rem 1rem 1.25rem; */
  /* padding: 1.25rem 2.5rem 1.25rem 1.5rem; */
  position: relative;
  /* margin: 5px 0; */
}

.v-notification a:not(.button):not(.dropdown-item) {
  color: currentColor;
  text-decoration: underline;
}

.v-notification strong {
  color: currentColor;
}

.v-notification code,
.v-notification pre {
  background: white;
}

.v-notification pre code {
  background: transparent;
}

.v-notification > .delete {
  position: absolute;
  right: 0.5rem;
  top: 0.5rem;
}

.v-notification .title,
.v-notification .subtitle,
.v-notification .content {
  color: currentColor;
}

.v-notification.is-white {
  background-color: white;
  color: #0a0a0a;
}

.v-notification.is-black {
  background-color: #0a0a0a;
  color: white;
}

.v-notification.is-light {
  background-color: whitesmoke;
  color: rgba(0, 0, 0, 0.7);
}

/* body.body--dark .v-notification.is-light {
  background-color: var(--color-zinc-800);
  color: #fff;
} */

.v-notification.is-dark {
  background-color: #363636;
  color: #fff;
}

.v-notification.is-primary {
  background-color: var(--color-primary-600);
  color: #fff;
}

.v-notification.is-primary.is-light {
  background-color: #ebfffc;
  color: #00947e;
}

.v-notification.is-link {
  background-color: #3273dc;
  color: #fff;
}

.v-notification.is-link.is-light {
  background-color: #eef3fc;
  color: #2160c4;
}

.v-notification.is-info {
  background-color: #3298dc;
  color: #fff;
}

.v-notification.is-info.is-light {
  background-color: #eef6fc;
  color: #1d72aa;
}

.v-notification.is-success {
  background-color: #48c774;
  color: #fff;
}

.v-notification.is-success.is-light {
  background-color: #effaf3;
  color: #257942;
}

.v-notification.is-warning {
  background-color: #ffdd57;
  color: rgba(0, 0, 0, 0.7);
}

.v-notification.is-warning.is-light {
  background-color: #fffbeb;
  color: #947600;
}

.v-notification.is-danger {
  background-color: #f14668;
  color: #fff;
}

.v-notification.is-danger.is-light {
  background-color: #feecf0;
  color: #cc0f35;
}
</style>

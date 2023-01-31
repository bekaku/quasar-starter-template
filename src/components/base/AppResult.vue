<template>
  <div class="row items-center q-pa-md">
    <div class="col">
      <div class="column items-center">
        <div class="col text-center">
          <img
            v-if="status == 'empty'"
            src="~assets/icons/empty-box.png"
            :style="`width: ${iconSize} ; height: auto`"
          />
          <img
            v-else-if="status == 'error'"
            :style="`width: ${iconSize} ; height: auto`"
            src="~assets/icons/sad-man.png"
          />
          <img
            v-else-if="status == 'warning'"
            src="~assets/icons/warning.png"
            :style="`width: ${iconSize} ; height: auto`"
          />
          <q-avatar square v-else-if="status == 'success'" :size="iconSize">
            <img src="~assets/icons/tick.png" />
          </q-avatar>
          <q-avatar
            square
            v-else-if="status == '404'"
            style="width: 100%; height: auto"
          >
            <img src="~assets/icons/404.png" />
          </q-avatar>
          <!-- <img
            v-else-if="status == '404'"
            src="~assets/icons/error-404.png"
            spinner-color="white"
          /> -->
          <q-avatar
            v-else
            :size="iconSize"
            :color="!hideBg ? getBgColor() : ''"
            :icon="icon ? icon : getIcon()"
            :class="getIconColor()"
          />
        </div>
        <div class="col q-mt-md text-center">
          <slot name="text">
            <div
              v-if="title"
              class="text-h5 text-weight-bold q-mb-sm"
              :class="status == 'empty' ? 'text-grey-6' : ''"
              v-html="title"
            ></div>
            <div
              v-if="description"
              class="text-grey-6"
              v-html="description"
            ></div>
          </slot>
        </div>
        <div class="col q-mt-sm">
          <slot name="extra">
            <!--                        <q-btn outline label="Find Something New" />-->
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  mdiInboxRemoveOutline,
  mdiAllergy,
  mdiRobotConfused,
  mdiPaperclip,
  mdiCheckBold,
  mdiAlertBoxOutline,
  mdiAlert,
  mdiPackageVariant,
  mdiInformationVariant,
} from '@quasar/extras/mdi-v6';
import { PropType } from 'vue';
import { IResult } from '@/types/common';

const props = defineProps({
  status: {
    type: String as PropType<IResult>,
    default: 'info',
  },
  title: {
    type: String,
    default: '', //OH OH! You're lost.
  },
  description: {
    type: String,
    default: '', //The page you are looking for does not exist.
  },
  icon: {
    type: String,
    default: '',
  },
  iconSize: {
    type: String,
    default: '128px',
  },
  hideBg: {
    type: Boolean,
    default: true,
  },
});

const getIcon = (): string => {
  let icon = undefined;

  //404, 403, 500, 418, info, success, error, warning
  switch (props.status) {
    case '404':
      icon = mdiInboxRemoveOutline;
      break;
    case '403':
      icon = mdiAllergy;
      break;
    case '500':
      icon = mdiRobotConfused;
      break;
    case '418':
      icon = mdiPaperclip;
      break;
    case 'success':
      icon = mdiCheckBold;
      break;
    case 'warning':
      icon = mdiAlertBoxOutline;
      break;
    case 'error':
      icon = mdiAlert;
      break;
    case 'empty':
      icon = mdiPackageVariant;
      break;
    default:
      icon = mdiInformationVariant;
      break;
  }

  return icon;
};
const getIconColor = () => {
  let color = '';
  switch (props.status) {
    case '404':
    case '403':
    case '500':
    case '418':
      color = 'text-amber';
      break;
    case 'success':
      color = 'text-green';
      break;
    case 'warning':
      color = 'text-orange';
      break;
    case 'error':
      color = 'text-red';
      break;
    case 'empty':
      color = 'text-blue-grey-2';
      break;
    default:
      color = 'text-blue';
      break;
  }
  return color;
};
const getBgColor = () => {
  let color = '';
  switch (props.status) {
    case '404':
    case '403':
    case '500':
    case '418':
      color = 'amber-1';
      break;
    case 'success':
      color = 'green-1';
      break;
    case 'warning':
      color = 'orange-1';
      break;
    case 'error':
      color = 'red-1';
      break;
    case 'empty':
      color = 'grey-1';
      break;
    default:
      color = 'blue-1';
      break;
  }
  return color;
};
</script>

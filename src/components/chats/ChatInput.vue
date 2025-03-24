<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import BaseFilePicker from '@/components/base/BaseFilePicker.vue';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import type { FileManagerDto } from '@/types/models';
import { getImgUrlFromFile } from '@/utils/fileUtil';
import {
  biEmojiSmile,
  biGeoAlt,
  biPaperclip,
  biSend,
  biX
} from '@quasar/extras/bootstrap-icons';
import {
  computed,
  defineAsyncComponent,
  onBeforeUnmount,
  onMounted,
  ref,
  useTemplateRef,
} from 'vue';
import BaseButton from '../base/BaseButton.vue';
import BaseFilesPreviewItem from '../base/BaseFilesPreviewItem.vue';
import BaseTooltip from '../base/BaseTooltip.vue';

const {
  loading = false,
  inputDense = true,
  inputAvata = true,
  emojiPickerId = 'chat-emoji',
  miniChat = false,
} = defineProps<{
  inputId?: string | number;
  emojiPickerId?: string;
  loading?: boolean;
  inputDense?: boolean;
  inputAvata?: boolean;
  miniChat?: boolean;
}>();

const BaseEmojiPicker = defineAsyncComponent(() => import('@/components/base/BaseEmojiPicker.vue'));
const BaseMapPreview = defineAsyncComponent(() => import('@/components/base/BaseMapPreview.vue'));
const emit = defineEmits<{
  'on-submit': [
    message: string | undefined,
    files: File[] | undefined,
    mapLatlong: string | undefined,
  ];
  'on-blur': [e: any];
  'on-input-update': [e: any];
}>();
const { t } = useLang();
const message = ref<string>();
const authenStore = useAuthenStore();
const filePickerRef = ref();
const fileItems = ref<File[]>([]);
const fileTimeout = ref();
const imageFromClipboards = ref<FileManagerDto[]>([]);
const mapLatLong = ref<string | undefined>();
const showMapLatLong = ref<boolean>(false);
const chatInputRef = useTemplateRef<any>('chatInputRef');
onMounted(() => {
  if (!process.env.SERVER) {
    registerEventListener();
  }
  onInputFocus();
});
const registerEventListener = () => {
  document.addEventListener('paste', handlePaste);
};
const removeEventListener = () => {
  document.removeEventListener('paste', handlePaste);
};
const handlePaste = async (event: any) => {
  const items = event.clipboardData.items;
  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    if (item.type.includes('image')) {
      const blob = item.getAsFile();
      const url = await getImgUrlFromFile(blob);
      imageFromClipboards.value.push({
        id: null,
        fileMime: blob.type,
        fileName: blob.name,
        filePath: url || '',
        fileThumbnailPath: url || '',
        fileSize: blob.size,
        file: blob,
        isImage: true,
      });
    }
  }
};
const onRemoveClipboard = (index: number) => {
  if (imageFromClipboards.value.length > 0) {
    imageFromClipboards.value.splice(index, 1);
  }
};
const canSubmit = computed(() => {
  return !!(
    (message.value && message.value.trim().length > 0) ||
    fileItems.value.length > 0 ||
    imageFromClipboards.value.length > 0 ||
    mapLatLong.value
  );
});
const onSubmit = (ev: any) => {
  if (ev && ev.shiftKey) {
    return;
  }
  // const finalMessage = message.value && message.value.trim().length > 0 ? inputSanitizeHtml(message.value.trim()) : undefined;
  const finalMessage =
    message.value && message.value.trim().length > 0 ? message.value.trim() : undefined;
  if (!finalMessage && fileItems.value.length == 0 && imageFromClipboards.value.length == 0) {
    return;
  }
  if (imageFromClipboards.value.length > 0) {
    for (const f of imageFromClipboards.value) {
      if (f.file) {
        fileItems.value.push(f.file);
      }
    }
  }
  emitSubmit(finalMessage, fileItems.value);
  onClearMessage();
};
const emitSubmit = (
  message: string | undefined,
  files: File[] | undefined,
  mapLatlong: string | undefined = undefined,
) => {
  emit('on-submit', message, files, mapLatlong);
};
const onFileAdded = async (files: File[]) => {
  if (files && files.length > 0) {
    emitSubmit(undefined, files);
    fileTimeout.value = setTimeout(() => {
      onClearMessage();
    }, 350);
  }
};
const onShareLocation = async () => {
  if (!mapLatLong.value) {
    return;
  }
  emitSubmit(undefined, undefined, mapLatLong.value);
  onClearMessage();
};
const onCloseShareLocation = () => {
  mapLatLong.value = undefined;
  showMapLatLong.value = false;
};
const onClearMessage = () => {
  message.value = undefined;
  mapLatLong.value = undefined;
  fileItems.value = [];
  imageFromClipboards.value = [];
  showMapLatLong.value = false;
};
const onEmojiClick = (emoji: string) => {
  if (!message.value) {
    message.value = '';
  }
  message.value += emoji;
};

const onInputFocus = () => {
  if (chatInputRef.value) {
    chatInputRef.value.focus();
  }
};
const onUpdateInputMessage = (e: any) => {
  emit('on-input-update', e);
};
const onBlurInput = (e: any) => {
  emit('on-blur', e);
};
onBeforeUnmount(() => {
  if (fileTimeout.value) {
    clearTimeout(fileTimeout.value);
    fileTimeout.value = undefined;
  }
  removeEventListener();
});

defineExpose({
  onInputFocus,
});
</script>

<template>
  <div v-bind="$attrs">
    <div v-if="showMapLatLong" class="row">
      <div class="col">
        <BaseMapPreview v-model="mapLatLong" :title="t('chats.shareLocation')">
          <template #side>
            <q-btn
              :disable="loading || !canSubmit"
              @click="onShareLocation"
              flat
              round
              :icon="biSend"
              color="primary"
            >
              <q-tooltip>
                {{ t('chats.send') }}
              </q-tooltip>
            </q-btn>
            <q-btn @click="onCloseShareLocation" flat round :icon="biX">
              <q-tooltip>
                {{ t('base.close') }}
              </q-tooltip>
            </q-btn>
          </template>
        </BaseMapPreview>
      </div>
    </div>
    <div class="row q-py-sm" v-if="imageFromClipboards && imageFromClipboards.length > 0">
      <div
        class="col-3"
        v-for="(f, fileIndex) in imageFromClipboards"
        :key="`clipboardfile-${fileIndex}`"
      >
        <BaseFilesPreviewItem
          :item="f"
          :index="fileIndex"
          :fetch="false"
          dense
          image-size="100px"
          :show-delete="true"
          :show-size="false"
          :show-name="false"
          @on-remove="onRemoveClipboard"
        />
      </div>
    </div>
    <q-item v-if="!showMapLatLong" dense class="q-mt-md" :class="{ 'q-pa-none': !miniChat }">
      <q-item-section side>
        <div class="row">
          <BaseFilePicker
            ref="filePickerRef"
            multiple
            v-model="fileItems"
            wildcard
            :icon="biPaperclip"
            :show-preview="false"
            @on-file-add="onFileAdded"
          >
            <BaseButton
              :disable="loading"
              dense
              flat
              round
              :icon="biPaperclip"
              size="sm"
              class="text-capitalize"
            >
              <BaseTooltip>
                {{ t('base.chooseFile') }}
              </BaseTooltip>
            </BaseButton>
          </BaseFilePicker>
          <q-btn :disable="loading" dense flat round :icon="biEmojiSmile" size="sm">
            <q-no-ssr>
              <q-menu>
                <BaseEmojiPicker :picker-id="emojiPickerId" @on:emoji-click="onEmojiClick" />
              </q-menu>
            </q-no-ssr>
          </q-btn>
          <BaseButton
            :disable="loading"
            dense
            flat
            round
            :icon="biGeoAlt"
            size="sm"
            @click="showMapLatLong = true"
          >
            <BaseTooltip>
              {{ t('chats.shareLocation') }}
            </BaseTooltip>
          </BaseButton>
        </div>
      </q-item-section>

      <q-item-section>
        <q-item-label>
          <q-input
            ref="chatInputRef"
            :readonly="loading"
            tabindex="1"
            v-bind="$attrs"
            outlined
            v-model="message"
            type="textarea"
            autogrow
            :dense="inputDense"
            :label="t('chats.typeMessage')"
            class="input-emoji"
            @keyup.enter="onSubmit"
            @keyup.shift.enter="onSubmit"
            @update:model-value="onUpdateInputMessage"
            @blur="onBlurInput"
          >
            <template #after>
              <q-btn
                :disable="loading || !canSubmit"
                @click="onSubmit($event)"
                flat
                round
                :icon="biSend"
                :size="!miniChat ? 'md' : 'sm'"
                color="primary"
              >
                <BaseTooltip>
                  {{ t('chats.send') }}
                </BaseTooltip>
              </q-btn>
            </template>
            <template v-if="inputAvata" #prepend>
              <base-avatar
                v-if="authenStore?.auth?.avatar?.thumbnail"
                :src="authenStore?.auth?.avatar?.thumbnail"
              />
            </template>
          </q-input>
        </q-item-label>
      </q-item-section>
    </q-item>
  </div>
</template>

<style scoped lang="scss">
.input-bg {
  background-color: #fff;
  padding: 15px 15px;
  border-radius: 10px;
}
body.body--dark {
  .input-bg {
    background-color: var(--color-dark-900);
  }
}
</style>

<script setup lang="ts">
import BaseButton from '@/components/base/BaseButton.vue';
import BaseDialog from '@/components/base/BaseDialog.vue';
import BasePopConfirm from '@/components/base/BasePopConfirm.vue';
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import { biCode, biPencil, biTrash } from '@quasar/extras/bootstrap-icons';
import BaseCard from 'src/components/base/BaseCard.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BasePopover from 'src/components/base/BasePopover.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import { useBase } from 'src/composables/useBase';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Dialog | ${t('app.name')}`);

const { appConfirm } = useBase();
const dialog = ref<boolean>(false);
const dialog2 = ref<boolean>(false);

const dialogSmall = ref<boolean>(false);
const dialogMedium = ref<boolean>(false);
const dialogFullWidth = ref<boolean>(false);
const dialogFullHeight = ref<boolean>(false);
const dialogFullWidthHeight = ref<boolean>(false);
const dialogMaximize = ref<boolean>(false);
const dialogConfirmToClose = ref<boolean>(false);
const text = ref();

const onPopConfirmChange = (status: boolean) => {
  console.log('onPopConfirmChange', status);
};

const onConfirmToClose = async () => {
  const conf = await appConfirm(t('app.monogram'), 'Are you sure to close this dialog?');
  if (conf) {
    dialogConfirmToClose.value = false;
  }
};
</script>
<template>
  <BasePage>
    <BaseCard title="Dialog">
      <template #end>
        <BaseButton
          href="https://github.com/bekaku/quasar-starter-template/blob/main/src/pages/example/ui/dialog.vue"
          target="_blank"
          :icon="biCode"
          flat
          round
        >
          <q-tooltip>View Source</q-tooltip>
        </BaseButton>
      </template>
      <q-card-section class="q-gutter-md">

        <BaseButton outline label="Dialog" @click="dialog = true" />
        <BaseButton outline label="Dialog persistent" @click="dialog2 = true" />
        <BaseButton outline label="Dialog Confirm to close" @click="dialogConfirmToClose = true" />

        <BaseTextHeader title="Dialog Size" />
        <BaseButton outline label="Small" @click="dialogSmall = true" />
        <BaseButton outline label="Medium" @click="dialogMedium = true" />
        <BaseButton outline label="Full Width" @click="dialogFullWidth = true" />
        <BaseButton outline label="Full Height" @click="dialogFullHeight = true" />
        <BaseButton outline label="Full Width and Height" @click="dialogFullWidthHeight = true" />
        <BaseButton outline label="Maximize" @click="dialogMaximize = true" />
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <BaseTextHeader title="Popover confirm" />
        <BaseButton label="Delete item" color="negative" :icon="biTrash">
          <BasePopConfirm
            :title="t('base.deleteConfirm')"
            confirm-color="negative"
            @on-change="onPopConfirmChange"
          />
        </BaseButton>

        <BaseButton label="Custom label">
          <base-pop-confirm
            title="Custom label"
            confirm-color="teal"
            label-confirm="Custom confirm"
            cancel-color="grey"
            label-cancel="Blaa"
            @on-change="onPopConfirmChange"
          />
        </BaseButton>
        <BaseButton label="More custom">
          <base-pop-confirm title="Addon label" width="350px" @on-change="onPopConfirmChange">
            <q-input v-model="text" outlined label="This input overide title prop" />
            <template #bottom> bottom slot </template>
          </base-pop-confirm>
        </BaseButton>
      </q-card-section>
      <q-card-section class="q-gutter-md">
        <BaseTextHeader title="Popover" />
        <BaseButton label="Show popover">
          <BasePopover width="250px">
            <q-banner>
              <template #avatar>
                <q-icon :name="biPencil" color="primary" />
              </template>
              You have lost connection to the internet. This app is offline.
            </q-banner>
          </BasePopover>
        </BaseButton>
        <BaseButton label="Handles right-click" color="red-4">
          <BasePopover width="450px" context-menu>
            <q-banner>
              <template #avatar>
                <q-icon :name="biPencil" color="primary" />
              </template>
              You have lost connection to the internet. This app is offline.
            </q-banner>
          </BasePopover>
        </BaseButton>
      </q-card-section>
    </BaseCard>

    <base-dialog v-if="dialog" v-model="dialog" title="Dialog title" :icon="biPencil">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>

    <base-dialog v-if="dialog2" v-model="dialog2" title="Dialog persistent" :persistent="true">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
      <q-card-actions align="right">
        <BaseButton flat label="Cancel" color="primary" @click="dialog2 = false" />
        <BaseButton flat label="Turn on Wifi" color="negative" @click="dialog2 = false" />
      </q-card-actions>
    </base-dialog>

    <base-dialog
      v-if="dialogSmall"
      v-model="dialogSmall"
      title="Dialog Small"
      dialog-style="width: 300px;"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogMedium"
      v-model="dialogMedium"
      title="Dialog Medium"
      dialog-style="width: 700px; max-width: 80vw;"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogFullWidth"
      v-model="dialogFullWidth"
      title="Dialog fullWidth"
      full-width
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogFullHeight"
      v-model="dialogFullHeight"
      title="Dialog fullHeight"
      full-height
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogFullWidthHeight"
      v-model="dialogFullWidthHeight"
      title="Dialog Full Width Height"
      full-height
      full-width
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
    <base-dialog
      v-if="dialogMaximize"
      v-model="dialogMaximize"
      title="Dialog Maximize"
      maximized
      can-maximized
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>

    <base-dialog
      v-if="dialogConfirmToClose"
      v-model="dialogConfirmToClose"
      title="Confirm to close title"
      :icon="biPencil"
      :auto-close="false"
      persistent
      @on-close="onConfirmToClose"
    >
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum repellendus sit voluptate
      voluptas eveniet porro. Rerum blanditiis perferendis totam, ea at omnis vel numquam
      exercitationem aut, natus minima, porro labore.
    </base-dialog>
  </BasePage>
</template>

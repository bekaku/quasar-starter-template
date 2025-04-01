<script setup lang="ts">
import { useAppMeta } from '@/composables/useAppMeta';
import { useLang } from '@/composables/useLang';
import {
  biCoin,
  biEnvelope,
  biEye,
  biEyeSlash,
  biPencil,
  biPerson,
  biSend,
} from '@quasar/extras/bootstrap-icons';
import BaseButton from 'src/components/base/BaseButton.vue';
import BaseCard from 'src/components/base/BaseCard.vue';
import BaseDatePicker from 'src/components/base/BaseDatePicker.vue';
import BaseInput from 'src/components/base/BaseInput.vue';
import BaseInputOtp from 'src/components/base/BaseInputOtp.vue';
import BasePage from 'src/components/base/BasePage.vue';
import BaseTextHeader from 'src/components/base/BaseTextHeader.vue';
import BaseTimePicker from 'src/components/base/BaseTimePicker.vue';
import { useValidation } from 'src/composables/useValidation';
import { ref } from 'vue';
const { t } = useLang();
const { setTitle } = useAppMeta();
setTitle(`Form input | ${t('app.name')}`);
const { required, requireEmail, validateMinMaxValue } = useValidation();
const name = ref<string>('Chanavee');
const surname = ref<string>('Bekaku');
const email = ref<string>('bekaku@gmail.com');
const title = ref<string>('Test');
const amount = ref<number>(0);
const amount2 = ref<number>(0);
const money = ref<number>(5000);
const text = ref<string>(
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat',
);
const pickDate = ref<string>('');
const pickTime = ref<string>('');
const showPassword = ref<boolean>(false);
const editMode = ref<boolean>(true);
const onSubmit = () => {
  console.log('onSubmit');
};
const onOptSubmit = (otp?: string) => {
  console.log('onOptSubmit', otp);
};
const onInputUpdate = (val: string | number | undefined | null) => {
  console.log('onInputUpdate', val);
};
</script>
<template>
  <BasePage>
    <BaseTextHeader title="Input Text" />
    <div class="row">
      <div class="col-12 col-md-6 q-pa-md">
        <q-form @submit="onSubmit">
          <BaseCard>
            <q-card-section class="q-gutter-y-sm">
              <div class="text-h6">
                <q-icon :name="editMode ? biPencil : biEye" />
                {{ editMode ? 'Edit mode' : 'Viewmode' }}
              </div>
              <q-toggle v-model="editMode" label="Toggle mode" />
              <BaseInput
                v-model="name"
                :edit-mode="editMode"
                label="Name"
                required
                :icon="biPerson"
                bottom-slots
                hint="This is a hint"
                :rules="[required]"
                @update:model-value="onInputUpdate"
              >
                <template #before>
                  <q-avatar>
                    <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                  </q-avatar>
                </template>
                <template #append>
                  <q-icon
                    class="cursor-pointer"
                    :icon="showPassword ? biEye : biEyeSlash"
                    @click="showPassword = !showPassword"
                  />
                </template>
                <template #after>
                  <BaseButton flat round :icon="biSend" />
                </template>
              </BaseInput>
              <BaseInput
                v-model="surname"
                :edit-mode="editMode"
                label="Surname"
                :rules="[required]"
                :avatar="{ src: 'https://cdn.quasar.dev/img/avatar2.jpg' }"
              />
              <BaseInput
                v-model="email"
                :edit-mode="editMode"
                label="Email"
                :icon="biEnvelope"
                :rules="[required, requireEmail]"
                clearable
              />
              <BaseInput
                v-model="title"
                :edit-mode="editMode"
                label="Title"
                clearable
                counter
                :maxlength="20"
              >
                <template #prepend>
                  <q-icon :name="biPencil" />
                </template>
              </BaseInput>
              <q-no-ssr>
                <BaseInput
                  v-model="amount"
                  :edit-mode="editMode"
                  label="Amount"
                  type="number"
                  :min="0"
                  :max="10"
                  hint="Limit 0 to 10"
                />
                <BaseInput
                  v-model="amount2"
                  :edit-mode="editMode"
                  label="Amount2"
                  type="number"
                  hint="Between 1 to 50"
                  :rules="[(val: any) => validateMinMaxValue(val, 1, 50, 'Amount 2')]"
                />
              </q-no-ssr>
              <div class="text-h6">Money format</div>
              <BaseInput v-model="money" :edit-mode="editMode" label="Money format" is-money>
                <template #prepend>
                  <q-icon :name="biCoin" />
                </template>
              </BaseInput>

              <div class="text-h6">Date picker</div>
              <BaseDatePicker
                v-model="pickDate"
                :edit-mode="editMode"
                label="Select Date"
                required
              />

              <div class="text-h6">Time picker</div>
              <BaseTimePicker
                v-model="pickTime"
                :edit-mode="editMode"
                label="Select time"
                required
              />

              <div class="text-h6">Text area</div>
              <BaseInput
                v-model="text"
                :edit-mode="editMode"
                label="Test area"
                placeholder="textarea"
                type="textarea"
                :icon="biPencil"
              />

              <div class="text-h6">Input OTP</div>
              <BaseInputOtp :input-length="6" @on-submit="onOptSubmit" />
            </q-card-section>
          </BaseCard>

          <BaseButton v-if="editMode" label="Submit" type="submit" color="primary" />
        </q-form>
      </div>

      <div class="col-12 col-md-6 q-pa-md">
        <BaseCard>
          <q-card-section class="q-gutter-y-sm">
            <div class="text-h6">View mode</div>
            <BaseInput
              v-model="name"
              :edit-mode="false"
              label="Name"
              :icon="biPerson"
              bottom-slots
              hint="This is a hint"
              :view-show-after="false"
              :view-show-append="false"
            >
              <template #before>
                <q-avatar>
                  <img src="https://cdn.quasar.dev/img/avatar5.jpg" />
                </q-avatar>
              </template>
              <template #append>
                <q-icon
                  class="cursor-pointer"
                  :icon="showPassword ? biEye : biEyeSlash"
                  @click="showPassword = !showPassword"
                />
              </template>
              <template #after>
                <BaseButton flat round :icon="biSend" />
              </template>
            </BaseInput>
            <BaseInput
              v-model="surname"
              :edit-mode="false"
              label="Surname"
              :avatar="{ src: 'https://cdn.quasar.dev/img/avatar2.jpg' }"
            />
            <BaseInput
              v-model="email"
              :edit-mode="false"
              label="Email"
              :icon="biEnvelope"
              clearable
            />
            <BaseInput v-model="title" :edit-mode="false" label="Title" clearable counter>
              <template #prepend>
                <q-icon :name="biPencil" />
              </template>
            </BaseInput>
            <BaseInput
              v-model="amount"
              :edit-mode="false"
              label="Amount"
              type="number"
              hint="Limit 0 to 10"
              :view-show-hint="false"
            />
            <BaseInput
              v-model="amount2"
              :edit-mode="false"
              label="Amount2"
              type="number"
              hint="Between 1 to 50"
            />
            <div class="text-h6">Money format</div>
            <BaseInput v-model="money" :edit-mode="false" label="Money format" is-money>
              <template #prepend>
                <q-icon :name="biCoin" />
              </template>
            </BaseInput>
            <div class="text-h6">Text area</div>
            <BaseInput
              v-model="text"
              :edit-mode="false"
              label="Test area"
              type="textarea"
              :icon="biPencil"
            />
          </q-card-section>
        </BaseCard>
      </div>
    </div>
  </BasePage>
</template>

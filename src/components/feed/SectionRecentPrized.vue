<template>
  <q-card flat bordered class="q-mb-md">
    <q-list dense class="q-pb-md">
      <q-item-label header>Recent activity</q-item-label>
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-avatar size="36px">
              <q-img :src="AvatarPlaceHolder128" />
            </q-avatar>

            <q-avatar size="36px" class="q-ml-md">
              <q-img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-icon
                :name="biArrowRight"
                size="md"
                color="amber"
                class="absolute-bottom-left"
                style="left: -25px"
              />
            </q-avatar>
          </q-item-label>
          <q-item-label caption class="text-center" lines="1">
            Chanavee gives prize to Bekaku
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="biGift" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-avatar size="36px">
              <q-img :src="AvatarPlaceHolder128" />
            </q-avatar>

            <q-avatar size="36px" class="q-ml-md">
              <q-img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-icon
                :name="biArrowRight"
                size="md"
                color="amber"
                class="absolute-bottom-left"
                style="left: -25px"
              />
            </q-avatar>
          </q-item-label>
          <q-item-label caption lines="1">
            Chanavee gives love to Lisa
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="biHeart" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-avatar size="36px">
              <q-img :src="AvatarPlaceHolder128" />
            </q-avatar>

            <q-avatar size="36px" class="q-ml-md">
              <q-img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-icon
                :name="biArrowRight"
                size="md"
                color="amber"
                class="absolute-bottom-left"
                style="left: -25px"
              />
            </q-avatar>
          </q-item-label>
          <q-item-label caption lines="1">
            Chanavee comment to Lisa post
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="biChatSquareDots" />
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section>
          <q-item-label>
            <q-avatar size="36px">
              <q-img :src="AvatarPlaceHolder128" />
            </q-avatar>

            <q-avatar size="36px" class="q-ml-md">
              <q-img src="https://cdn.quasar.dev/img/avatar.png" />
              <q-icon
                :name="biArrowRight"
                size="md"
                color="amber"
                class="absolute-bottom-left"
                style="left: -25px"
              />
            </q-avatar>
          </q-item-label>
          <q-item-label caption lines="1">
            Chanavee adopted Lisa post
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <q-icon :name="biHandbag" />
        </q-item-section>
      </q-item>
    </q-list>
  </q-card>
</template>

<script setup lang="ts">
import {
  biArrowRight,
  biGift,
  biHeart,
  biChatSquareDots,
  biHandbag,
} from '@quasar/extras/bootstrap-icons';
import { AvatarPlaceHolder128 } from 'src/utils/constant';
</script>

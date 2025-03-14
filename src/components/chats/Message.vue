<script setup lang="ts">
import { biEmojiSmile, biReply, biThreeDotsVertical } from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import BaseAvatar from '../base/BaseAvatar.vue';

const props = withDefaults(
  defineProps<{
    height?: number;
    autofocus?: boolean;
  }>(),
  {
    height: 450,
    autofocus: false,
  },
);
const { dark } = useQuasar();
</script>

<template>
  <div class="row">
    <div class="col-12">
      <q-chat-message
        name="Jane"
        size="6"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['Quasar supplies a chat']"
        stamp="4 minutes ago"
        text-color="white"
        bg-color="message-sent"
        :sent="true"
      >
        <div>
          Quasar supplies a chat component called QChatMessage which is really a chat entry that
          renders the data given by
          <div class="absolute-bottom-left q-text-black" style="left: -75px">
            <q-btn flat round dense size="sm" :icon="biThreeDotsVertical">
              <q-menu>
                <q-list>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label> Menu 1 </q-item-label>
                    </q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>
                      <q-item-label> Menu 1 </q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </q-btn>
            <q-btn flat round dense size="sm" :icon="biReply" />
            <q-btn flat round dense size="sm" :icon="biEmojiSmile" />
          </div>
        </div>
      </q-chat-message>
    </div>
  </div>
  <div class="row">
    <div class="col-12">
      <q-chat-message
        name="Jane"
        size="6"
        avatar="https://cdn.quasar.dev/img/avatar3.jpg"
        :text="['Quasar supplies a chat']"
        stamp="4 minutes ago"
        :text-color="dark.isActive ? 'white' : 'black'"
        bg-color="message-received"
        :sent="false"
      >
        <div>
          Quasar supplies a chat component called QChatMessage which is really a chat entry that
          renders the data given

          <div class="absolute-bottom-right" style="right: -75px">
            <q-btn flat round dense size="sm" :icon="biEmojiSmile" />
            <q-btn flat round dense size="sm" :icon="biReply" />
            <q-btn flat round dense size="sm" :icon="biThreeDotsVertical" />
          </div>
        </div>
      </q-chat-message>
    </div>
  </div>

  <q-chat-message sent bg-color="message-sent" text-color="white" size="6">
    <template #name>me</template>
    <template #stamp>7 minutes ago</template>
    <template #avatar>
      <base-avatar
        class="q-message-avatar q-message-avatar&#45;&#45;sent"
        src="https://cdn.quasar.dev/img/avatar4.jpg"
        :fetch-image="false"
      />
    </template>
    <div>Have you seen Quasar?</div>
    <div>
      Quasar supplies a chat component called QChatMessage which is really a chat entry that renders
      the data given by the props.
    </div>
  </q-chat-message>
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar5.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
  <q-chat-message
    bg-color="message-received"
    :text-color="dark.isActive ? 'white' : 'black'"
    size="6"
  >
    <template #name>Mary</template>
    <template #stamp>7 minutes ago</template>
    <template #avatar>
      <base-avatar
        class="q-message-avatar q-message-avatar&#45;&#45;received"
        src="https://cdn.quasar.dev/img/avatar2.jpg"
        :fetch-image="false"
      />
    </template>

    <div>
      Already building an app with it...
      <div class="row">
        <div class="col-4 q-pa-xs">
          <q-img
            style="border-radius: 10px"
            :ratio="4 / 3"
            src="https://images.pexels.com/photos/19794931/pexels-photo-19794931/free-photo-of-woman-holding-a-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          >
          </q-img>
        </div>
        <div class="col-4 q-pa-xs">
          <q-img
            style="border-radius: 10px"
            :ratio="4 / 3"
            src="https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
          </q-img>
        </div>
        <div class="col-4 q-pa-xs">
          <q-img
            style="border-radius: 10px"
            :ratio="4 / 3"
            src="https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          >
          </q-img>
        </div>
      </div>
    </div>
  </q-chat-message>
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
  <q-chat-message
    name="Jane"
    avatar="https://cdn.quasar.dev/img/avatar3.jpg"
    :text="['doing fine, how r you?']"
    stamp="4 minutes ago"
    :text-color="dark.isActive ? 'white' : 'black'"
    bg-color="message-received"
  />
</template>
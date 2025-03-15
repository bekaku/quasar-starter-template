<script setup lang="ts">
import BaseAvatar from '@/components/base/BaseAvatar.vue';
import { useAuth } from '@/composables/useAuth';
import { useLang } from '@/composables/useLang';
import { useAuthenStore } from '@/stores/authenStore';
import {
  biBoxArrowRight,
  biChevronExpand,
  biChevronRight,
  biGear,
  biGlobe,
  biMoon,
  biPersonSquare,
  biQuestionCircle,
  biSun,
} from '@quasar/extras/bootstrap-icons';
import { useQuasar } from 'quasar';
import BaseLangugeSwitcher from 'src/components/base/BaseLangugeSwitcher.vue';
import BaseThemeSwitcher from 'src/components/base/BaseThemeSwitcher.vue';
import { useTheme } from 'src/composables/useTheme';
const { screen } = useQuasar();
const { t, currenLocale } = useLang();
const { isDark } = useTheme()
const authenStore = useAuthenStore();
const { signOut } = useAuth();
</script>
<template>
  <q-item v-bind="$attrs" clickable>
    <q-item-section avatar top>
      <base-avatar
        v-if="authenStore.loginedAvatar"
        class="shadow-5"
        :src="authenStore.loginedAvatar"
        size="36px"
      />
    </q-item-section>
    <q-item-section v-if="screen.gt.xs">
      <q-item-label lines="1">
        <span class="cursor-pointer text-weight-bold">
          {{ authenStore.loginedDisplay }}
        </span>
      </q-item-label>
      <q-item-label caption :lines="1"> Sofware Engineer </q-item-label>
    </q-item-section>
    <q-item-section side>
      <q-icon :name="biChevronExpand" size="16px" />
    </q-item-section>
    <q-menu>
      <q-list style="min-width: 260px">
        <q-item clickable v-close-popup :to="`/user/${authenStore.auth?.id}`">
          <q-item-section avatar>
            <base-avatar
              v-if="authenStore.loginedAvatar"
              :src="authenStore.loginedAvatar"
              size="36px"
              rounded
            />
            <q-icon v-else :name="biPersonSquare" />
          </q-item-section>
          <q-item-section>{{ t('base.yourProfile') }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon :name="isDark ? biMoon : biSun" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">
              {{ t('base.appearance') }} :
              {{ isDark ? t('theme.dark') : t('theme.light') }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="biChevronRight" />
          </q-item-section>
          <BaseThemeSwitcher
            :toggle="false"
            :anchor="!screen.gt.xs ? 'bottom left' : 'top end'"
            self="top start"
          />
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon :name="biGlobe" />
          </q-item-section>
          <q-item-section>
            <q-item-label lines="1">
              {{ t('base.language') }} :
              {{ currenLocale ? currenLocale.name : '' }}
            </q-item-label>
          </q-item-section>
          <q-item-section side>
            <q-icon :name="biChevronRight" />
          </q-item-section>
          <BaseLangugeSwitcher
            :anchor="!screen.gt.xs ? 'bottom left' : 'top end'"
            self="top start"
          />
        </q-item>

        <q-separator />
        <q-item clickable v-close-popup>
          <q-item-section avatar>
            <q-icon :name="biQuestionCircle" />
          </q-item-section>
          <q-item-section>{{ t('base.help') }}</q-item-section>
        </q-item>
        <q-item clickable v-close-popup to="/settings">
          <q-item-section avatar>
            <q-icon :name="biGear" />
          </q-item-section>
          <q-item-section>{{ t('base.setting') }}</q-item-section>
        </q-item>
        <q-item clickable v-close-popup @click="signOut">
          <q-item-section avatar>
            <q-icon :name="biBoxArrowRight" />
          </q-item-section>
          <q-item-section>{{ t('base.logout') }}</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-item>
</template>

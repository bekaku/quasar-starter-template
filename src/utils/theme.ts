import { useBase } from '@/composables/useBase';
import { useLangugeAndThemeStore } from '@/stores/langugeAndThemeStore';
import type { ITheme, IThemeSettingOptions } from '@/types/common';
import { ThemeKey } from '@/libs/constant';
import { addDateByDays } from '@/utils/dateUtil';
import {
  biMoon,
  biSun
} from '@quasar/extras/bootstrap-icons';
import { Cookies } from 'quasar';
import {
  computed,
  onBeforeUnmount,
  onMounted,
  useSSRContext,
  watch,
} from 'vue';
export const availableThemes: {
  key: IThemeSettingOptions;
  text: string;
  icon: string;
}[] = [
    { key: 'light', text: 'theme.light', icon: biSun },
    { key: 'dark', text: 'theme.dark', icon: biMoon },
    // { key: 'system', text: 'theme.systemTheme', icon: biLaptop },
    // { key: 'realtime', text: 'theme.realtimeTheme', icon: biClock },
  ];

export function ThemeManager() {
  const { isDevMode } = useBase();
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  // composable
  const langugeAndThemeStore = useLangugeAndThemeStore();

  // methods
  const getUserSetting = (): IThemeSettingOptions =>
    cookies.get(ThemeKey) || 'light';

  const getSystemTheme = (): ITheme => {
    try {
      return window
        ? window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        : 'light';
    } catch {
      return 'light';
    }
  };
  const getRealtimeTheme = (): ITheme => {
    const now = new Date();
    const hour = now.getHours();
    const isNight = hour >= 17 || hour <= 5;
    return isNight ? 'dark' : 'light';
  };

  // state
  const currentTheme = computed(() =>
    availableThemes.find((t) => t.key == langugeAndThemeStore.themeSetting)
  );

  // wathcers
  const onThemeSettingChange = (themeSetting: IThemeSettingOptions) => {
    langugeAndThemeStore.setThemeSetting(themeSetting);
    if (themeSetting === 'realtime') {
      langugeAndThemeStore.setTheme(getRealtimeTheme());
    } else if (themeSetting === 'system') {
      langugeAndThemeStore.setTheme(getSystemTheme());
    } else {
      langugeAndThemeStore.setTheme(themeSetting);
    }

    setTheme();
  };
  const setTheme = () => {
    cookies.set(ThemeKey, langugeAndThemeStore.themeSetting, {
      // maxAge: 60 * 60 * 24 * 365 * 5,
      expires: addDateByDays(365),
      path: '/',
      secure: !isDevMode(),
      sameSite: 'Strict'
    });
  };

  watch(langugeAndThemeStore, (state) => {
    onThemeSettingChange(state.themeSetting as IThemeSettingOptions);
  });

  const onThemeSystemChange = () => {
    if (langugeAndThemeStore.themeSetting === 'system') {
      langugeAndThemeStore.setTheme(getSystemTheme());
    }
  };
  const onRealtimeCheck = () => {
    if (langugeAndThemeStore.themeSetting === 'realtime') {
      langugeAndThemeStore.setTheme(getRealtimeTheme());
    }
  };

  // init theme
  const initTheme = () => {
    langugeAndThemeStore.themeSetting = getUserSetting();
    onThemeSettingChange(
      langugeAndThemeStore.themeSetting as IThemeSettingOptions
    );
  };

  // lifecycle
  let intervalCheckTime: NodeJS.Timer;
  // onBeforeMount(() => initTheme());
  onMounted(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', onThemeSystemChange);
    intervalCheckTime = setInterval(onRealtimeCheck, 1000);
  });
  onBeforeUnmount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', onThemeSystemChange);
    if (intervalCheckTime) {
      clearInterval(intervalCheckTime as any)
    };
  });

  return {
    initTheme,
    getUserSetting,
    getSystemTheme,
    getRealtimeTheme,
    currentTheme,
  };
}

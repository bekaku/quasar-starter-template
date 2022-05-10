import { useI18n } from 'vue-i18n';
import { watch, onBeforeMount } from 'vue';
import { useCookies } from '@vueuse/integrations/useCookies';
import { useLangugeAndThemeStore } from 'stores/langugeAndTheme';
import { LocaleKey } from 'src/utils/constant';
import { addDateByDays } from 'src/utils/dateUtil';
export interface ILocales {
  [key: string]: {
    name: string;
    iso: string;
    flag: string;
  };
}

export const availableLocales: ILocales = {
  en: {
    name: 'English',
    iso: 'en',
    flag: '🇺🇸',
  },
  id: {
    name: 'ไทย',
    iso: 'th',
    flag: 'TH',
  },
};

export const LanguageManager = () => {
  // composable
  const langugeAndThemeStore = useLangugeAndThemeStore();
  const { locale } = useI18n();
  const localeCookies = useCookies([LocaleKey]);
  // methods
  const getSystemLocale = (): string => {
    try {
      return window
        ? window.navigator.language.substring(0, 2)
        : availableLocales.en.iso;
    } catch (error) {
      return availableLocales.en.iso;
    }
  };
  const getUserLocale = (): string =>
    localeCookies.get(LocaleKey) || getSystemLocale();

  // watchers
  watch(langugeAndThemeStore, (state) => {
    localeCookies.set(LocaleKey, state.locale, {
      // maxAge: 60 * 60 * 24 * 365 * 5,
      expires: addDateByDays(365),
    });
    locale.value = state.locale;
  });

  // init locale
  const init = () => {
    const currentLocale = getUserLocale();
    langugeAndThemeStore.setLocale(currentLocale);
    locale.value = currentLocale;
  };

  // lifecycle
  onBeforeMount(() => init());

  return {
    init,
  };
};

import { useI18n } from 'vue-i18n';
import { watch, useSSRContext } from 'vue';
import { useLangugeAndThemeStore } from '@/stores/langugeAndThemeStore';
import { LocaleKey, DefaultLocale } from 'src/utils/constant';
import { addDateByDays } from 'src/utils/dateUtil';
import { ILocales } from '@/types/common';
// import { preFetch } from 'quasar/wrappers';
import { Cookies } from 'quasar';

export const availableLocales: ILocales[] = [
  {
    name: 'English',
    iso: 'en',
    flag: '🇺🇸',
  },
  {
    name: 'ไทย',
    iso: 'th',
    flag: 'TH',
  },
];

export const LanguageManager = () => {
  const ssrContext = process.env.SERVER ? useSSRContext() : null;
  const cookies = process.env.SERVER ? Cookies.parseSSR(ssrContext) : Cookies; // otherwise we're on client
  // composable
  const langugeAndThemeStore = useLangugeAndThemeStore();
  const { locale } = useI18n();
  // const localeCookies = useCookies([LocaleKey]);
  // methods
  // const getSystemLocale = (): string => {
  //   try {
  //     return window
  //       ? window.navigator.language.substring(0, 2)
  //       : availableLocales.en.iso;
  //   } catch (error) {
  //     return availableLocales.en.iso;
  //   }
  // };
  const getUserLocale = (): string => cookies.get(LocaleKey) || DefaultLocale;

  // watchers
  watch(langugeAndThemeStore, (state) => {
    if (state.locale) {
      setLocale(state.locale);
    }
  });

  const setLocale = (lang: string) => {
    cookies.set(LocaleKey, lang, {
      // maxAge: 60 * 60 * 24 * 365 * 5,
      expires: addDateByDays(365),
      path: '/',
    });
    locale.value = lang;
    langugeAndThemeStore.setLocale(lang);
  };

  // init locale
  const initLang = () => {
    const locale = getUserLocale();
    setLocale(locale);
  };

  // lifecycle
  // onBeforeMount(() => initLang());

  return {
    initLang,
  };
};

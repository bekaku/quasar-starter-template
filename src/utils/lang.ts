import { useI18n } from 'vue-i18n';
import { watch } from 'vue';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { useLangugeAndThemeStore } from 'stores/langugeAndTheme';
import { LocaleKey } from 'src/utils/constant';
import { addDateByDays } from 'src/utils/dateUtil';
// import { preFetch } from 'quasar/wrappers';
import { Cookies } from 'quasar';
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

export const LanguageManager = (ssrContext: any) => {
  const localeCookies = process.env.SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies; // otherwise we're on client
  // composable
  const langugeAndThemeStore = useLangugeAndThemeStore();
  const { locale } = useI18n();
  // const localeCookies = useCookies([LocaleKey]);
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
    setLocale(state.locale);
  });

  const setLocale = (lang: string) => {
    localeCookies.set(LocaleKey, lang, {
      // maxAge: 60 * 60 * 24 * 365 * 5,
      expires: addDateByDays(365),
    });
    locale.value = lang;
  };

  // init locale
  const initLang = () => {
    const currentLocale = getUserLocale();
    console.log(
      'currentLocale > ',
      currentLocale,
      ' cookies',
      localeCookies.get(LocaleKey)
    );
    langugeAndThemeStore.setLocale(currentLocale);
    locale.value = currentLocale;
  };

  // lifecycle
  // onBeforeMount(() => initLang());

  return {
    initLang,
  };
};

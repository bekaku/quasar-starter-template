import { Cookies } from 'quasar';
import { LocaleKey } from '@/libs/constant';
import type { ILocales } from '@/types/common';
import { addDateByDays } from '@/utils/dateUtil';
import { computed, useSSRContext } from 'vue';
import { useI18n } from 'vue-i18n';
export const useLang = () => {
  const defaultLocale: string = import.meta.env.QCLI_APP_DEFAULT_LOCALE || 'th';
  const availableLocales: ILocales[] = [
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
  const { t, locale } = useI18n({ useScope: 'global' });
  const ssrContext = import.meta.env.QUASAR_SERVER ? useSSRContext() : null;
  const cookies = import.meta.env.QUASAR_SERVER ? Cookies.parseSSR(ssrContext) : Cookies;
  const localeCookie = computed(() => cookies.get(LocaleKey) || defaultLocale)
  const currenLocale = computed(() =>
    availableLocales.find((t) => t.iso == locale.value),
  );

  const currentLangugeName = computed(() => {
    const l = availableLocales.find(t => t.iso == locale.value);
    return l != undefined && l?.name ? l?.name : 'unknown'
  })

  const setLocaleCookie = (lang: string) => {
    cookies.set(LocaleKey, lang, {
      // maxAge: 60 * 60 * 24 * 365 * 5,
      expires: addDateByDays(365),
      path: '/',
    });
    locale.value = lang;
  };
  const onSetLocale = (lang: string) => {
    locale.value = lang;
    setLocaleCookie(lang);
  }
  const initialLocale = () => {
    locale.value = localeCookie.value;
    setLocaleCookie(localeCookie.value);
  }
  return {
    t,
    locale,
    currenLocale,
    availableLocales,
    currentLangugeName,
    onSetLocale,
    initialLocale
  };
};

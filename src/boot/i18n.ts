import { defineBoot } from '#q-app'
import { createI18n } from 'vue-i18n';
import { Cookies } from 'quasar';
import messages from '@/i18n';
// TODO cannot use external file import in boot file >  https://github.com/quasarframework/quasar/issues/17365
import { DefaultLocale, LocaleKey } from '@/libs/constant';

export default defineBoot(({ app, ssrContext }) => {
  const localeCookies = import.meta.env.QUASAR_SERVER
    ? Cookies.parseSSR(ssrContext)
    : Cookies;
  const i18n = createI18n({
    locale: localeCookies.get(LocaleKey) || DefaultLocale,
    legacy: false,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});

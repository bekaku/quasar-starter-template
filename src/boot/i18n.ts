import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import { Cookies } from 'quasar';
import messages from 'src/i18n';
// TODO cannot use external file import in boot file >  https://github.com/quasarframework/quasar/issues/17365
import { DefaultLocale, LocaleKey } from '@/libs/constant';

export default boot(({ app, ssrContext }) => {
  const localeCookies = process.env.SERVER
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

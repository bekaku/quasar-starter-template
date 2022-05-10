import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import en from 'src/i18n/en.json';
import th from 'src/i18n/th.json';

export default boot(({ app }) => {
  const i18n = createI18n({
    locale: 'th',
    messages: {
      en,
      th,
    },
  });

  // Set i18n instance on app
  app.use(i18n);
});

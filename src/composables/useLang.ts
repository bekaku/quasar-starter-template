import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { availableLocales } from '@/utils/lang';
export const useLang = () => {
  const { t, locale } = useI18n({ useScope: 'global' });
  const currenLocale = computed(() =>
    availableLocales.find((t) => t.iso == locale.value),
  );
  return {
    t,
    locale,
    currenLocale
  };
};

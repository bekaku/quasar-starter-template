import { LanguageManager } from './lang';
import { ThemeManager } from './theme';
import useAuth from 'src/composables/useAuth';
import { onMounted } from 'vue';
export const AppSetup = () => {
  // use language manager
  const { initLang } = LanguageManager();
  const { initTheme } = ThemeManager();
  const { initAppAuthen, checkRefreshToken } = useAuth();
  initLang();
  initTheme();

  onMounted(() => {
    checkRefreshToken();
    initAppAuthen();
  });
  return {
    initAppAuthen,
  };
};

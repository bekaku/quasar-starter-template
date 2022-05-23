import { LanguageManager } from './lang';
import { ThemeManager } from './theme';
export const AppSetup = () => {
  // use language manager
  const { initLang } = LanguageManager();
  const { initTheme } = ThemeManager();
  initLang();
  initTheme();
};

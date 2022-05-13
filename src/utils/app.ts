import { LanguageManager } from './lang';
import { ThemeManager } from './theme';
export const AppSetup = (useSSRContext: any) => {
  // use language manager
  const { initLang } = LanguageManager(useSSRContext);
  const { initTheme } = ThemeManager(useSSRContext);
  initLang();
  initTheme();
};

import { LanguageManager } from './lang';
// import LanguageManager from './lang';
export const AppSetup = (useSSRContext: any) => {
  // use language manager
  const { initLang } = LanguageManager(useSSRContext);
  initLang();
  return {};
};

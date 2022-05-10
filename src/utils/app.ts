import { LanguageManager } from './lang';
export const AppSetup = () => {
  // use language manager
  const languageManager = LanguageManager();

  return {
    languageManager,
  };
};

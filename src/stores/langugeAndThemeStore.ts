import { defineStore } from 'pinia';
export interface ILocale {
  locale: string;
}
export const useLangugeAndThemeStore = defineStore('langugeAndTheme', {
  // state: (): ILocale => ({
  //   locale: '',
  // }),
  state: () => ({
    locale: '',
    theme: '',
    themeSetting: '',
    leftDrawerOpen: true,
  }),
  getters: {},
  actions: {
    setLocale(iso: string) {
      this.locale = iso;
    },
    setTheme(theme: string) {
      this.theme = theme;
    },
    setThemeSetting(themeSetting: string) {
      this.themeSetting = themeSetting;
    },
    setLeftDrawer(open: boolean) {
      this.leftDrawerOpen = open;
    },
  },
});

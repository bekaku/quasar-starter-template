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
  }),
  getters: {},
  actions: {
    setLocale(iso: string) {
      this.locale = iso;
    },
  },
});

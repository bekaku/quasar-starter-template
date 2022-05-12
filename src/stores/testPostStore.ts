import { defineStore } from 'pinia';
interface ITest {
  camelToSnake: string;
  i18nMessage: string;
  requestFrom: string;
  AUTHORIZATION: string;
  ACCEPT_LANGUGE: string;
  userAgent: string;
}
export const useTestPost = defineStore('testPostStore', {
  // state: () =>
  //   ({
  //     i18nMessage: '',
  //     requestFrom: '',
  //     AUTHORIZATION: '',
  //     ACCEPT_LANGUGE: '',
  //     userAgent: '',
  //   } as ITest),
  state: () => {
    return {
      item: undefined as ITest | undefined,
    };
  },
  getters: {},
  actions: {
    setData(item: ITest) {
      this.item = item;
    },
  },
});

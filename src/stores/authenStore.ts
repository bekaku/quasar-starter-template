import { defineStore } from 'pinia';
import { UserDto } from 'src/interface/models';
export const useAuthenStore = defineStore('authenStore', {
  state: () => {
    return {
      auth: undefined as UserDto | undefined,
    };
  },
  getters: {
    tokenKey: (state) => state.auth?.token,
  },
  actions: {
    setAuthen(item: UserDto) {
      this.auth = item;
    },
    logout() {
      this.auth = undefined;
    },
  },
});

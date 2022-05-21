import { defineStore } from 'pinia';
import { AuthenticationResponse } from 'src/interface/models';
export const useAuthenStore = defineStore('authenStore', {
  state: () => {
    return {
      auth: undefined as AuthenticationResponse | undefined,
    };
  },
  getters: {
    tokenKey: (state) => state.auth?.authenticationToken,
  },
  actions: {
    setAuthen(item: AuthenticationResponse) {
      this.auth = item;
    },
    logout() {
      this.auth = undefined;
    },
  },
});

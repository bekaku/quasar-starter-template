import { defineStore } from 'pinia';
import { UserDto } from '@/types/models';
export const useAuthenStore = defineStore('authenStore', {
  state: () => {
    return {
      auth: undefined as UserDto | undefined,
    };
  },
  getters: {
    tokenKey: (state) => state.auth?.token,
    loginedCover: (state) =>
      state.auth && state.auth.cover?.image ? state.auth.cover?.image : '',
    loginedAvatar: (state) => state.auth?.avatar?.image,
    loginedDisplay: (state) =>
      state.auth?.userData
        ? state.auth.userData.fullName
        : state.auth?.username
        ? state.auth?.username
        : state.auth?.email,
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

import { defineStore } from 'pinia';
import { AppException } from 'src/interface/common';
export const useExceptionStore = defineStore('exceptionStore', {
  state: () => {
    return {
      error: undefined as AppException | undefined,
    };
  },
  getters: {},
  actions: {
    setException(exception: AppException) {
      this.error = exception;
    },
  },
});

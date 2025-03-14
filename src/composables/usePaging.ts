import type { IPagination } from '@/types/common';
import { DEFULT_ITEM_PER_PAGET } from '@/libs/constant';
import { ref } from 'vue';
export const usePaging = (perPage?: number) => {
  const pagesInitial: IPagination = {
    current: 1,
    itemsPerPage: perPage || DEFULT_ITEM_PER_PAGET,
    totalPages: 0,
    totalElements: 0,
    last: false,
    perPageList: [
      { text: '5', value: 5 },
      { text: '10', value: 10 },
      { text: '15', value: 15 },
      { text: '20', value: 20 },
      { text: '50', value: 50 },
    ],
  };
  const pages = ref<IPagination>(Object.assign({}, pagesInitial));
  const resetPaging = () => {
    pages.value = Object.assign({}, pagesInitial);
  };
  return {
    pages,
    resetPaging,
  };
};

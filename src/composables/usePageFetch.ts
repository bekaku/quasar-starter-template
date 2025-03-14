import type { Ref } from 'vue';
import { computed, ref } from 'vue';
import { usePaging } from '@/composables/usePaging';
import { useSort } from '@/composables/useSort';
import type { ICrudListApiOptions } from '@/types/common';
import { useAxios } from '@/composables/useAxios';
import { isAppException, isArray, isEmpty, isListResponse, isServerResponseMessage } from '@/utils/appUtil';
import type { IApiListResponse } from '@/types/models';

export const usePagefecth = <T>(options: ICrudListApiOptions) => {
  const { callAxios } = useAxios();
  const { pages, resetPaging } = usePaging(options?.itemsPerPage ? options.itemsPerPage : 10);
  const { sort } = useSort(options?.defaultSort);
  const dataList = ref<T[]>([]) as Ref<T[]>;
  const isInfiniteDisabled = ref(false);
  const firstLoaded = ref(false);
  const loading = ref(false);
  const urlEndpoint = ref(options.urlEndpoint);
  const additionalUri = ref(options?.additionalUri);

  const queryParam = computed((): string | undefined => {
    let haveParam = false;
    let q = '';
    if (options.pageAble == undefined || options.pageAble) {
      q += `page=${(options.pageStartZero == undefined || options.pageStartZero) ? (pages.value.current > 0 ? pages.value.current - 1 : 0) : pages.value.current}`;
      q += `&size=${pages.value.itemsPerPage}`;
      haveParam = true;
    }
    if (options.sortAble == undefined || options.sortAble) {
      if (haveParam) {
        q += '&';
      }
      q += `${sort.value.column && sort.value.mode ? 'sort=' + sort.value.column + ',' + sort.value.mode : ''}`;
      haveParam = true;
    }
    if (additionalUri.value) {
      if (haveParam) {
        q += '&';
      }
      q += `${additionalUri.value}`;
    }
    return !isEmpty(q) ? q : undefined;
  });
  const apiEndpoint = computed(
    () => `${urlEndpoint.value}${queryParam.value ? '?' + queryParam.value : ''}`
  );
  const loadData = async () => {
    loading.value = true;
    const response = await callAxios<IApiListResponse<T>>({
      API: apiEndpoint.value,
      method: 'GET'
    });
    let list: T[] = [];
    if (!isAppException(response) && !isServerResponseMessage(response)) {
      if (isListResponse(response)) {
        if (!options.reverseList) {
          list = response.dataList;
        } else {
          list = response.dataList.reverse();
        }
        await setDataList(list);
        if (response.totalPages != undefined) {
          pages.value.totalPages = response.totalPages;
        }
        if (response.totalElements != undefined) {
          pages.value.totalElements = response.totalElements;
          if (response.totalElements == 0 || response.totalElements < pages.value.itemsPerPage) {
            isInfiniteDisabled.value = true;
          }
        }
        if (response.last != undefined) {
          pages.value.last = response.last;
          isInfiniteDisabled.value = response.last;
        }
      } else if (response && isArray(response)) {
        const responseList: T[] = response as unknown as T[];
        if (responseList.length == 0 || responseList.length < pages.value.itemsPerPage) {
          isInfiniteDisabled.value = true;
        }
        if (!options.reverseList) {
          list = responseList;
        } else {
          list = responseList.reverse();
        }
        await setDataList(list);
      }
    }
    if (!firstLoaded.value) {
      firstLoaded.value = true;
    }

    loading.value = false;
    return new Promise((resolve) => {
      resolve(true);
    });
  };
  const setDataList = (list: T[]) => {
    return new Promise((resolve) => {
      if (pages.value.current == 1) {
        dataList.value = list;
      } else {
        if (!options.concatList) {
          dataList.value = list;
        } else {
          if (!options.addUnshift) {
            dataList.value.push(...list);
          } else {
            dataList.value.unshift(...list);
          }
        }
      }
      resolve(true)
    })
  }
  const resetData = (resetPage: boolean = true) => {
    if (resetPage) {
      resetPaging();
    }
    dataList.value = [];
    firstLoaded.value = false;
    isInfiniteDisabled.value = false;
  };
  const onReload = async () => {
    resetPaging();
    if (!options.preventResetListReload) {
      firstLoaded.value = false;
      dataList.value = [];
    }
    isInfiniteDisabled.value = false;
    await loadData();
    return new Promise((resolve) => resolve(true));
  };

  const onNextPage = async () => {
    if (firstLoaded.value) {
      pages.value.current++;
      await loadData();
    }
    return new Promise((resolve) => resolve(true));
  };

  const loadPageChange = async (resetPage: boolean = false) => {
    resetData(resetPage);
    await loadData();
    return new Promise((resolve) => resolve(true));
  };

  const onPageChange = async (value: number | undefined) => {
    await loadPageChange(false);
    return new Promise((resolve) => resolve(true));
  };

  const onPerPageChange = async (value: number | undefined) => {
    await loadPageChange(false);
    return new Promise((resolve) => resolve(true));
  };
  return {
    isInfiniteDisabled,
    firstLoaded,
    loading,
    pages,
    sort,
    dataList,
    urlEndpoint,
    additionalUri,
    loadData,
    resetData,
    onPageChange,
    onPerPageChange,
    onNextPage,
    onReload
  };
};

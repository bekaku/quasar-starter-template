import type { CrudListApiOptions, ICrudListHeader, ISortModeType, ResponseMessage } from '@/types/common';
import { CrudAction, KeywordParamiter, SearchOperation, SearchParamiter } from '@/libs/constant';
import { useSort } from './useSort';
import { useAxios } from '@/composables/useAxios';
import { useBase } from './useBase';
import { useLang } from './useLang';
import type { Ref } from 'vue';
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import {
  isAppException,
  isArray,
  isEmpty,
  isListResponse, isServerException,
  isServerResponseMessage,
  pascalToCamelCase,
  pascalToKebab
} from '@/utils/appUtil';
import type { IApiListResponse } from '@/types/models';

export const useCrudList = <T>(
  options: CrudListApiOptions,
  listHeaderInit?: Ref<ICrudListHeader[]>
) => {
  const { pages, sort, resetSort } = useSort(
    options ? options.defaultSort : undefined,
    options ? options.itemsPerPage : 10
  );
  const { t } = useLang();
  const { appNavigateTo, getCurrentPath, getQuery, appConfirm, appLoading, inputSanitizeHtml } =
    useBase();
  const { callAxios } = useAxios();
  const dataList = ref<T[]>([]);
  const fristLoad = ref(false);
  const loading = ref(false);
  const manualActionList = ref<string>();
  const advanceSearchUri = ref('');
  const keywordSearchText = ref('');
  const filterText = ref('');
  const additionalUri = ref(options.additionalUri);
  const actionList = ref(options.actionList);
  const actionDelete = ref(options.actionDelete);
  const listHeader = ref(listHeaderInit != undefined ? listHeaderInit.value : []);
  const searchableHeaders = computed(() => {
    const headers: ICrudListHeader[] = [];

    if (!listHeader.value) {
      return headers;
    }

    return listHeader.value.length > 0
      ? listHeader.value.filter(
        (c) => c.options && c.options.searchable === true
      )
      : headers;
  });
  const validateColunmExist = (colnmName: string): boolean => {
    return (
      searchableHeaders.value.find((c) => c.column === colnmName) != undefined
    );
  };
  const validateQSearch = () => {
    const qParam = getQuery(SearchParamiter);
    const qParmArray = qParam?.split(',');
    const operations: any = SearchOperation;
    if (qParmArray && qParmArray.length > 0) {
      for (const q of qParmArray) {
        for (const k in operations) {
          setQSearch(q, operations[k]);
        }
      }
    }
  };
  const setQSearch = (q: any, operation: string) => {
    const qSplit = q.split(operation);
    if (qSplit.length == 2) {
      if (validateColunmExist(qSplit[0])) {
        if (!advanceSearchUri.value) {
          // advanceSearchUri.value = `&${SearchParamiter}=${q.trim()}`;
          advanceSearchUri.value = `${SearchParamiter}=${q.trim()}`;
        } else {
          advanceSearchUri.value += ',' + q.trim();
        }
      }
    }
  };

  validateQSearch();
  onMounted(async () => {
    if (options.fetchListOnload) {
      await fetchList();
    }
  });

  const listApiEndpoint = computed(() => {
    return actionList.value
      ? actionList.value
      : options.apiEndpoint && options.crudName
        ? options.apiEndpoint + '/' + pascalToCamelCase(options.crudName)
        : '';
  });
  const deleteApiEndpoint = computed(() => {
    return actionDelete.value
      ? actionDelete.value
      : options.apiEndpoint && options.crudName
        ? options.apiEndpoint + '/' + pascalToCamelCase(options.crudName)
        : '';
  });
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
    if (advanceSearchUri.value) {
      if (haveParam) {
        q += '&';
      }
      q += `${advanceSearchUri.value}`;
      haveParam = true;
    }
    if (keywordSearchText.value) {
      if (haveParam) {
        q += '&';
      }
      q += `${KeywordParamiter}=${keywordSearchText.value}`;
      haveParam = true;
    }


    if (additionalUri.value) {
      if (haveParam) {
        q += '&';
      }
      q += `${additionalUri.value}`;
      haveParam = true;
    }
    return !isEmpty(q) ? q : undefined;
  });
  const pageParam = computed(() => {
    return `${listApiEndpoint.value}${queryParam.value ? '?' + queryParam.value : ''}`;
  });
  const pathParam = computed(() => {
    if (!options) {
      return;
    }
    return `${getCurrentPath(false)}${queryParam.value ? '?' + queryParam.value : ''}`;
  });

  const fetchList = async (): Promise<boolean> => {
    if (!pageParam.value) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    loading.value = true;
    const response = await callAxios<IApiListResponse<T>>({
      API: pageParam.value,
      method: 'GET'
    });
    return new Promise((resolve) => {
      if (!isAppException(response) && !isServerResponseMessage(response)) {
        if (isListResponse(response)) {
          dataList.value = response.dataList;
          if (response.totalPages != undefined) {
            pages.value.totalPages = response.totalPages;
          }
          if (response.totalElements != undefined) {
            pages.value.totalElements = response.totalElements;
          }
          if (response.last != undefined) {
            pages.value.last = response.last;
          }
        } else if (isArray(response) && response != null) {
          dataList.value = response;
        }
      }
      if (!fristLoad.value) {
        fristLoad.value = true;
      }
      loading.value = false;
      resolve(true);
    });
  };
  const filteredList = computed(() => {
    const list = dataList.value;
    const search = filterText.value
      ? filterText.value.toLowerCase().trim()
      : null;
    if (!search) {
      return list;
    }

    let filters: any = [];
    const searchables = searchableHeaders.value;
    if (searchables.length == 0) {
      return list;
    }

    for (const header of searchables) {
      const col: string | undefined = header.column;
      if (col && list && list.length > 0) {
        const searchList = list.filter(
          (c: any) =>
            c[col] &&
            c[col].toString().toLowerCase().includes(search) &&
            !filters.find((x: any) => x.id === c.id)
        );
        filters = filters.concat(searchList);
      }
    }
    return filters;
  });
  const onPageNoChange = async (pageNo: number | undefined) => {
    if (pageNo == undefined) {
      return;
    }
    pages.value.current = pageNo;
    if (!pathParam.value) {
      return;
    }
    onPasteUrlPathParamAndFetchData();
  };
  const onItemPerPageChange = async (no: number | undefined) => {
    if (no == undefined) {
      return;
    }
    pages.value.itemsPerPage = no;
    if (!pathParam.value) {
      return;
    }
    onPasteUrlPathParamAndFetchData();
  };
  const onSort = async (column: string | undefined) => {
    if (column == undefined) {
      return;
    }
    if (sort.value.column === column) {
      sort.value.mode = sort.value.mode === 'asc' ? 'desc' : 'asc';
    } else {
      sort.value.column = column;
    }
    onPasteUrlPathParamAndFetchData();
  };
  const onSortMode = async (mode: ISortModeType) => {
    sort.value.mode = mode;
    onPasteUrlPathParamAndFetchData();
  };
  const onPasteUrlPathParamAndFetchData = async () => {
    if (!pathParam.value) {
      return;
    }
    appNavigateTo(pathParam.value);
    // onReplaceUrl(pathParam.value);
    await fetchList();
  };
  const onAdvanceSearch = (q: string) => {
    keywordSearchText.value = '';
    advanceSearchUri.value = `${SearchParamiter}=${q}`;
    onPasteUrlPathParamAndFetchData();
  };
  const onKeywordSearch = (keyword: string) => {
    keywordSearchText.value = inputSanitizeHtml(keyword);
    onPasteUrlPathParamAndFetchData();
  };
  const onReload = () => {
    advanceSearchUri.value = '';
    pages.value.current = 1;
    dataList.value = [];
    resetSort();
    onPasteUrlPathParamAndFetchData();
  };
  const getItemByIndex = (index: number) => {
    return new Promise((resolve) => {
      const item =
        filteredList.value.length > 0 ? filteredList.value[index] : null;
      resolve(item);
    });
  };
  const getItemIndexById = (id: number): Promise<number> => {
    return new Promise((resolve) => {
      resolve(dataList.value.findIndex((t: any) => t.id === id));
    });
  };
  const onItemDelete = async (
    indexOrIds: number | number[],
    isSingle: boolean
  ) => {
    const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
    if (conf) {
      if (isSingle) {
        const item: any = await getItemByIndex(indexOrIds as number);
        if (item) {
          const i: number = await getItemIndexById(item.id);
          appLoading();
          const status = await onDeleteItemSingle(item.id);
          if (status && i != -1) {
            dataList.value.splice(i, 1);
          }
          appLoading(false);
        }
      } else {
        appLoading();
        for (const id of indexOrIds as number[]) {
          await onDeleteItemSingle(id);
        }
        await fetchList();
        appLoading(false);
      }
    }
  };
  const onDeleteItemSingle = async (id: number): Promise<boolean> => {
    const apiEndpoint = `${deleteApiEndpoint.value}/${id}`;
    const response = await callAxios<ResponseMessage>({
      API: apiEndpoint,
      method: 'DELETE'
    });
    // console.log('onDeleteItemSingle', response);
    // if (isDevMode()) {
    //   console.log('useCrudList > onDeleteItemSingle : ', apiEndpoint, response);
    // }
    if (isAppException(response) || isServerException(response)) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    return new Promise((resolve) => {
      resolve(!!(response && response.status == 'OK'));
    });
  };

  const onNewForm = () => {
    if (options.apiEndpoint && options.crudName) {
      appNavigateTo(`${pascalToKebab(options.crudName)}/${CrudAction.NEW}/0`);
    }
  };
  const onItemClick = async (index: number) => {
    const item: any = await getItemByIndex(index);
    if (!item) {
      return;
    }
    if (options.apiEndpoint && options.crudName) {
      appNavigateTo(
        `${pascalToKebab(options.crudName)}/${CrudAction.VIEW}/${item.id}`
      );
    }
  };
  const onItemCopy = async (index: number) => {
    const item: any = await getItemByIndex(index);
    if (!item) {
      return;
    }
    if (options.apiEndpoint && options.crudName) {
      appNavigateTo(
        `${pascalToKebab(options.crudName)}/${CrudAction.COPY}/${item.id}`
      );
    }
  };

  onBeforeUnmount(() => {
    dataList.value = [];
    advanceSearchUri.value = '';
    keywordSearchText.value = '';
    filterText.value = '';
    manualActionList.value = undefined;
    additionalUri.value = undefined;
    actionList.value = undefined;
    actionDelete.value = undefined;
  });

  const methods = {
    onPageNoChange,
    onItemPerPageChange,
    fetchList,
    onSort,
    onSortMode,
    onReload,
    filteredList,
    onAdvanceSearch,
    onKeywordSearch,
    onItemDelete,
    onNewForm,
    onItemClick,
    onItemCopy,
    getItemByIndex
  };
  return {
    pages,
    sort,
    resetSort,
    loading,
    fristLoad,
    dataList,
    filterText,
    keywordSearchText,
    crudName: options.crudName,
    manualActionList,
    additionalUri,
    actionList,
    actionDelete,
    listHeader,
    ...methods
  };
};

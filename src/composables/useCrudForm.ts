import { useAxios } from '@/composables/useAxios';
import { useBase } from './useBase';
import { useLang } from './useLang';
import { biX } from '@quasar/extras/bootstrap-icons';
import {
  PageActionParamiter,
  PageIdParamiter,
  BackendRootPath,
  CrudAction
} from '@/libs/constant';
import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import type {
  ICrudAction,
  CrudFormApiOptions,
  RequestDto,
  ResponseMessage
} from '@/types/common';
import {
  isAppException,
  isServerResponseMessage,
  snakeToCamel,
  convertStringToNumber
} from '@/utils/appUtil';


export const useCrudForm = <T>(options: CrudFormApiOptions, initialEntity: T) => {
  const { appNavigateTo, getParam, appToast, appConfirm, isDevMode, getPreviousPath } = useBase();
  const { callAxios } = useAxios();
  const { t } = useLang();

  const previousPath = ref(getPreviousPath() as string);
  const loading = ref(false);
  const crudId = ref<number>(
    getParam(PageIdParamiter) != undefined
      ? convertStringToNumber(getParam(PageIdParamiter))
      : 0
  );

  const crudEntity = ref<any>(Object.assign({}, initialEntity) as T);
  const requestEntityName = ref<string | undefined>(
    options.requestEntityName ? options.requestEntityName : undefined
  );
  const crudAction = ref<ICrudAction>(
    getParam(PageActionParamiter) as ICrudAction
  );
  const fetchDataLink = ref(options.fetchDataLink);
  onMounted(async () => {
    if (options.fectchDataOnLoad) {
      preFectData();
    }
  });
  const preFectData = async () => {
    if (
      crudAction.value == CrudAction.VIEW ||
      crudAction.value == CrudAction.COPY
    ) {
      await fetchDataById();
      if (crudAction.value == CrudAction.COPY) {
        crudEntity.value.id = null;
      }
      return new Promise((resolve) => {
        resolve(true);
      });
    } else {
      return new Promise((resolve) => {
        resolve(true);
      });
    }
  };
  const getFetchDataLink = computed(() => {
    if (fetchDataLink.value) {
      return fetchDataLink.value;
    }
    return `${options.apiEndpoint}/${snakeToCamel(
      options.crudName ? options.crudName : ''
    )}/${crudId.value}`;
  });
  const fetchDataById = async () => {
    if (!crudId.value && (!options.apiEndpoint || !options.crudName)) {
      return new Promise((resolve) => {
        resolve(false);
      });
    }
    loading.value = true;
    const api = getFetchDataLink.value;
    const response = await callAxios<T>({
      API: api,
      method: 'GET'
    });
    // if (isDevMode()) {
    //   console.log('useCrudForm > fetchDataById :', api, response);
    // }
    loading.value = false;
    if (!isAppException(response) && !isServerResponseMessage(response)) {
      crudEntity.value = response;
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  };

  const resetEntity = () => {
    /* 3 Ways to Clone Objects in JavaScript
        // "Spread"
        { ...food }

        // "Object.assign"
        Object.assign({}, food)

        // "JSON"
        JSON.parse(JSON.stringify(food))
        */

    // crudEntity.value = JSON.parse(JSON.stringify(initialEntity)); // stop modifing passed value
    crudEntity.value = Object.assign({}, initialEntity) as T;
  };
  const onBack = () => {
    let backLink: string | undefined = '';
    if (options.backToPreviousPath != undefined && options.backToPreviousPath) {
      backLink = previousPath.value;
    }
    const basePath = options.basePath || BackendRootPath;
    if (!backLink) {
      backLink = options.backLink
        ? options.backLink
        : previousPath.value
          ? previousPath.value
          : options.crudName
            ? `${basePath ? '/' + basePath : ''}/${options.crudName.replaceAll('_', '-')}`
            : '';
    }
    if (backLink) {
      appNavigateTo(backLink);
    }
  };
  const apiEnpoint = computed(() => {
    if (!options.apiEndpoint || !options.crudName) {
      return;
    }
    if (crudAction.value === CrudAction.VIEW) {
      return options.actionPut
        ? options.actionPut
        : options.apiEndpoint + '/' + snakeToCamel(options.crudName) + (options.methodPutIncludeId === undefined || options.methodPutIncludeId === true ? '/' + crudEntity.value.id : '');
    }
    return options.actionPost
      ? options.actionPost
      : options.apiEndpoint + '/' + snakeToCamel(options.crudName);
  });
  const onSubmit = async () => {
    if (!options.apiEndpoint || !options.crudName) {
      return;
    }
    // const requestItem: { [k: string]: T } = {};
    const requestItem: RequestDto = {};
    requestItem[requestEntityName.value
      ? requestEntityName.value
      : `${snakeToCamel(options.crudName)}`] = crudEntity.value;

    const api = apiEnpoint.value;
    if (!api) {
      return;
    }
    if (isDevMode()) {
      // console.log(
      //   'useCrudFrom > onSubmit',
      //   crudAction.value === CrudAction.VIEW ? 'PUT' : 'POST',
      //   requestItem
      // );
    }

    loading.value = true;
    const response = await callAxios<any>({
      API: api,
      method: crudAction.value === CrudAction.VIEW ? 'PUT' : 'POST',
      body: requestItem
    });
    loading.value = false;
    // if (isDevMode()) {
    //   console.log('useCrudFrom > onSubmit > response', response);
    // }
    if (isAppException(response)) {
      return;
    }
    if (response && response.id) {
      if (
        crudAction.value === CrudAction.NEW ||
        crudAction.value === CrudAction.COPY
      ) {
        showToast(t('success.insertSuccesfull'));
      } else if (crudAction.value === CrudAction.VIEW) {
        showToast(t('success.updateSuccesfull'));
      }
    }

    if (!options.preventRedirectToList) {
      onBack();
    }
    return new Promise((resolve) => {
      resolve(true);
    });
  };
  const showToast = (message: string) => {
    appToast(message, {
      multiLine: false,
      html: true,
      type: 'positive',
      timeout: 3 * 1000,
      position: 'bottom',
      actions: [{ icon: biX, color: 'white' }]
    });
  };
  const deleteApiEndpoint = computed(() => {
    return options.actionDelete
      ? options.actionDelete
      : options.apiEndpoint && options.crudName
        ? `${options.apiEndpoint}/${snakeToCamel(options.crudName)}/${crudId.value
        }`
        : '';
  });
  const onDelete = async () => {
    if (
      crudAction.value != CrudAction.VIEW &&
      !crudEntity.value &&
      crudId.value == 0 &&
      !deleteApiEndpoint.value
    ) {
      return;
    }
    const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
    if (conf) {
      await callAxios<ResponseMessage>({
        API: deleteApiEndpoint.value,
        method: 'DELETE'
      });
      // if (isDevMode()) {
      //   console.log('useCrudFrom > onDelete', deleteApiEndpoint.value, res);
      // }
      onBack();
    }
  };

  onBeforeUnmount(() => {
    resetEntity();
  });

  const methods = { onBack, onSubmit, onDelete, fetchDataById, preFectData };
  return {
    loading,
    ...methods,
    crudId,
    crudAction,
    crudEntity,
    crudName: options.crudName,
    requestEntityName,
    fetchDataLink
  };
};

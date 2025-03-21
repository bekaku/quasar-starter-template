import { useRoute, useRouter } from 'vue-router';
import { computed } from 'vue';
import { useQuasar } from 'quasar';
import { useLang } from './useLang';
import type { ITextValue, NotifyOptions } from '@/types/common';
import { SearchOperation } from '@/libs/constant';
import { formatDate, formatDateTime, formatDistanceFromNow, getDateAutoFormatBy, getDateTimeAutoFormatBy } from '@/utils/dateUtil';
import {
  biCheckCircle,
  biExclamationCircle,
  biExclamationTriangle,
  biInfoCircle,
  biX
} from '@quasar/extras/bootstrap-icons';
import { DOMPurify } from 'boot/dompurify';
import { Clipboard } from '@capacitor/clipboard';

export const useBase = () => {
  const { t, locale } = useLang();
  const { dark, loading, notify, dialog } = useQuasar();
  const route = useRoute();
  const router = useRouter();

  const isDark = computed(() => dark.isActive);
  const getCurrentPath = (fullPath = true) => {
    return fullPath ? route.fullPath : route.path;
  };
  const getPreviousPath = () => {
    return router.options.history.state.back;
  };
  const getParam = (field: string): string | undefined => {
    if (!field) {
      return undefined;
    }
    return route.params ? (route.params[field] as string) : undefined;
  };
  const getParamNumber = (att: string): number => {
    const val = getParam(att);
    return val != undefined ? +val : 0;
  };
  const getQuery = (field: string): string | undefined => {
    if (!field) {
      return;
    }
    return route.query ? (route.query[field] as string) : undefined;
  };
  const getQueryNumber = (att: string): number => {
    const val = getQuery(att);
    return val != undefined ? +val : 0;
  };
  const onReplaceUrl = (url: string) => {
    history.pushState({}, '', url);
  };
  const appNavigateTo = (link: string | undefined, replace?: boolean): void => {
    if (!link) {
      return;
    }
    if (!replace) {
      router.push(link);
    } else {
      // window.location.replace(link);
      router.replace(link);
      // router.replace({ path: link });
    }
  };

  const appLoaderClose = () => {
    if (loading.isActive) {
      loading.hide();
    }
  };
  const appLoading = (open = true, message = undefined, delay = 0): void => {
    if (open) {
      appLoaderClose();
      loading.show({
        delay, // ms
        message: message || t('base.pleaseWait'),
      });
    } else {
      appLoaderClose();
    }
  };
  /* https://quasar.dev/quasar-plugins/notify
        position > top-left top-right bottom-left bottom-right top bottom left right center
    appToast('Quasar Framework Template',{type:'positive', position:'right', color:''});
    appToast('Quasar Framework Template',{caption:'5 Minutes ago', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'});
     */
  const appToast = (message: string, options: NotifyOptions | undefined = undefined) => {
    if (!message) {
      return;
    }


    let color;
    let textColor
    if (options?.color == undefined && options?.type == undefined) {
      color = !dark.isActive ? 'white' : 'black';
      textColor = !dark.isActive ? 'black' : 'white';
    }
    let icon: string | undefined = '';
    if (options && options.type) {
      const t = options.type;
      if (t === 'positive') {
        icon = biCheckCircle;
        textColor = 'white';
        color = 'positive';
      } else if (t === 'negative') {
        icon = biExclamationTriangle;
        textColor = 'white';
        color = 'negative';
      } else if (t === 'warning') {
        icon = biExclamationCircle;
        textColor = 'white';
        color = 'warning';
      } else if (t === 'info') {
        icon = biInfoCircle;
        textColor = 'white';
        color = 'info';
      }
    }
    notify(
      Object.assign(
        {
          message,
          icon,
          timeout: 5000,
          progress: true,
          position: 'bottom-left',
          multiLine: false,
          color: color || '',
          textColor: textColor || '',
          actions: !options?.hideClose
            ? [{ icon: biX, round: true, dense: false, color: textColor || 'white' }]
            : [],
        },
        options
      )
    );
  };

  /**
   * const conf = await appConfirm(t('app.monogram'), t('base.deleteConfirm'));
   */
  const appConfirm = async (
    title: string,
    text: string,
    okBtn = {}, // btn component
    cancelBtn = {} // btn component
  ) => {
    return new Promise((resolve) => {
      dialog({
        title,
        message: text,
        ok: Object.assign(
          { textColor: 'primary', flat: true, label: t('base.okay') },
          okBtn
        ),
        // ok: okText===undefined ? tc('okay') : okText,
        cancel: Object.assign(
          { textColor: 'grey', flat: true, label: t('base.cancel') },
          cancelBtn
        ),
        persistent: true,
      })
        .onOk(() => {
          resolve(true);
        })
        .onOk(() => {
          resolve(true);
        })
        .onCancel(() => {
          resolve(false);
        })
        .onDismiss(() => {
          resolve(false);
        });
    });
  };
  const searchOperations: ITextValue[] = [
    { text: t('base.match'), value: SearchOperation.MATCH },
    { text: t('base.equa'), value: SearchOperation.EQUA },
    { text: t('base.notEqua'), value: SearchOperation.NOT_EQUA },
    { text: t('base.greaterThan'), value: SearchOperation.GREATER_THAN },
    {
      text: t('base.greaterThanEqua'),
      value: SearchOperation.GREATER_THAN_EQUA,
    },
    { text: t('base.lessThan'), value: SearchOperation.LESS_THAN },
    { text: t('base.lessThanEqua'), value: SearchOperation.LESS_THAN_EQUA },
  ];

  // const datePickerLocale = {
  //   /* starting with Sunday */
  //   days: t('date.days').split('_'),
  //   daysShort: t('date.dayShorts').split('_'),
  //   months: t('date.months').split('_'),
  //   monthsShort: t('date.monthShorts').split('_'),
  //   firstDayOfWeek: 1,
  // };
  const datePickerLocale = computed(() =>
    locale.value
      ? {
        days: t('date.days').split('_'),
        daysShort: t('date.dayShorts').split('_'),
        months: t('date.months').split('_'),
        monthsShort: t('date.monthShorts').split('_'),
        firstDayOfWeek: 1,
      }
      : undefined
  );

  const appFormatDate = (d: string, fmt: string) => {
    return formatDate(d, fmt, locale.value);
  };
  const appFormatDateTime = (d: string, fmt: string) => {
    return formatDateTime(d, fmt, locale.value);
  };
  const appFormatDateDistance = (d: string) => {
    return formatDistanceFromNow(d, locale.value);
  };
  const appFormatDateAuto = (d: string) => {
    return d ? getDateAutoFormatBy(d, locale.value) : '';
  };
  const appFormatDateTimeAuto = (d: string) => {
    return d ? getDateTimeAutoFormatBy(d, locale.value) : '';
  };

  /**
   * <div ref="bottomSection"></div>
   * scrollToTop(bottomSection.value);
   * @param el
   */
  const scrollToTop = (el: Element) => {
    // window.scrollTo(0, 0);
    if (el) {
      // el.scrollIntoView({ behavior: 'smooth' });
      // el.scrollIntoView({ block: 'end', behavior: 'smooth' });
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const isDevMode = () => {
    return process.env.NODE_ENV == 'development';
  };
  const inputSanitizeHtml = (str: string) => {
    if (!str) {
      return '';
    }
    return DOMPurify.sanitize(str,
      {
        ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'a'],
        ALLOWED_ATTR: ['href', 'class']
      }
    );
  };
  const readableNumber = (num: number, digits: number) => {
    if (num < 1000) {
      return num;
    }
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
    ];
    const rx = /\.0+$|(\.\d*[1-9])0+$/;
    const item = lookup
      .slice()
      .reverse()
      .find((item) => {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') +
      (item.symbol ? t('readableNum.' + item.symbol) : '')
      : '0';
  };
  const writeToClipboard = async (text: string) => {
    await Clipboard.write({
      string: text,
    });
    appToast(t('success.copy'), { multiLine: false })
    return new Promise((resolve) => {
      resolve(true);
    });
  };
  return {
    getParam,
    getQuery,
    appNavigateTo,
    appLoading,
    appToast,
    appConfirm,
    getCurrentPath,
    searchOperations,
    datePickerLocale,
    getParamNumber,
    getQueryNumber,
    getPreviousPath,
    appFormatDate,
    scrollToTop,
    onReplaceUrl,
    isDevMode,
    inputSanitizeHtml,
    appFormatDateTime,
    appFormatDateDistance,
    readableNumber,
    isDark,
    writeToClipboard,
    appFormatDateAuto,
    appFormatDateTimeAuto
  };
};

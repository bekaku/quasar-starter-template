/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { useLang } from './useLang';
import { computed } from 'vue';
import {
  formatDateTime,
  formatDate,
  formatDistanceFromNow,
} from '@/utils/dateUtil';
import {
  biInfoCircle,
  biCheckCircle,
  biExclamationTriangle,
  biExclamationCircle,
  biX,
} from '@quasar/extras/bootstrap-icons';
import { NotifyOptions } from '@/types/common';
export default () => {
  const $q = useQuasar();
  const route = useRoute();
  const router = useRouter();
  const { t, locale } = useLang();
  const isDark = computed(() => $q.dark.isActive);
  const getCurrentPath = (fullPath = true) => {
    return fullPath ? route.fullPath : route.path;
  };
  const getPreviousPath = () => {
    return router.options.history.state.back;
  };
  const WeeGetParam = (field: string): string | undefined => {
    if (!field) {
      return undefined;
    }
    return route.params ? (route.params[field] as string) : undefined;
  };
  const WeeGetQuery = (field: string): string | undefined => {
    if (!field) {
      return;
    }
    return route.query ? (route.query[field] as string) : undefined;
  };
  const getParamNumber = (att: string): number => {
    const val = WeeGetParam(att);
    return val != undefined ? +val : 0;
  };
  const getQueryNumber = (att: string): number => {
    const val = WeeGetQuery(att);
    return val != undefined ? +val : 0;
  };
  const WeeGoTo = (link: string, replace?: boolean): void => {
    if (!link) {
      return;
    }
    if (!replace) {
      router.push(link);
    } else {
      // window.location.replace(link);
      router.replace({ path: link });
    }
  };
  const WeeLoaderClose = () => {
    if ($q.loading.isActive) {
      $q.loading.hide();
    }
  };
  const WeeLoader = (open = true, message = undefined, delay = 0): void => {
    if (open) {
      WeeLoaderClose();
      $q.loading.show({
        delay: delay, // ms
        message: message === undefined ? t('base.pleaseWait') : message,
      });
    } else {
      WeeLoaderClose();
    }
  };
  /* https://quasar.dev/quasar-plugins/notify
        position > top-left top-right bottom-left bottom-right top bottom left right center
    WeeToast('Quasar Framework Template',{type:'positive', position:'right', color:''});
    WeeToast('Quasar Framework Template',{caption:'5 Minutes ago', avatar: 'https://cdn.quasar.dev/img/boy-avatar.png'});
     */
  const WeeToast = (message: string, options: NotifyOptions | undefined) => {
    if (!message) {
      return;
    }
    let icon = undefined;
    if (options && options.type) {
      const t = options.type;
      if (t === 'positive') {
        icon = biCheckCircle;
      } else if (t === 'negative') {
        icon = biExclamationTriangle;
      } else if (t === 'warning') {
        icon = biExclamationCircle;
      } else if (t === 'info') {
        icon = biInfoCircle;
      }
    }
    $q.notify(
      Object.assign(
        {
          message,
          icon,
          timeout: 5000,
          progress: true,
          position: 'bottom',
          multiLine: true,
          actions: !options?.hideClose
            ? [{ icon: biX, color: 'white' }]
            : undefined,
        },
        options
      )
    );
  };

  /**
   * const conf = await WeeConfirm(t('app.monogram'), t('base.deleteConfirm'));
   * @param title
   * @param text
   * @param okBtn
   * @param cancelBtn
   * @returns
   */
  const WeeConfirm = async (
    title: string,
    text: string,
    okBtn = {},
    cancelBtn = {}
  ) => {
    return new Promise((resolve) => {
      $q.dialog({
        title: title,
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
  const isDevMode = () => {
    return process.env.NODE_ENV == 'development';
  };
  const AppFormatDate = (d: string, fmt: string) => {
    return formatDate(d, fmt, locale.value);
  };
  const AppFormatDateTime = (d: string, fmt: string) => {
    return formatDateTime(d, fmt, locale.value);
  };
  const AppFormatDateDistance = (d: string) => {
    return formatDistanceFromNow(d, locale.value);
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
      el.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  };
  const readableNumber = (num: number, digits: number) => {
    if (num < 1000) {
      return num;
    }
    const lookup = [
      { value: 1, symbol: '' },
      { value: 1e3, symbol: 'k' },
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    const item = lookup
      .slice()
      .reverse()
      .find(function (item) {
        return num >= item.value;
      });
    return item
      ? (num / item.value).toFixed(digits).replace(rx, '$1') +
          (item.symbol ? t('readableNum.' + item.symbol) : '')
      : '0';
  };
  return {
    WeeGetParam,
    WeeGetQuery,
    WeeGoTo,
    WeeLoader,
    WeeToast,
    WeeConfirm,
    getCurrentPath,
    getParamNumber,
    getQueryNumber,
    getPreviousPath,
    AppFormatDate,
    scrollToTop,
    isDevMode,
    AppFormatDateTime,
    AppFormatDateDistance,
    readableNumber,
    isDark,
  };
};

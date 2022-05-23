/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRouter, useRoute } from 'vue-router';
import { useQuasar } from 'quasar';
import { useLang } from './useLang';
import {
  mdiInformation,
  mdiCheckCircle,
  mdiAlert,
  mdiAlertCircle,
} from '@quasar/extras/mdi-v6';
export default () => {
  const { t } = useLang();
  const $q = useQuasar();
  const route = useRoute();
  const router = useRouter();
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
  const WeeToast = (message: string, options: any | undefined) => {
    if (!message) {
      return;
    }
    let icon = undefined;
    if (options && options.type) {
      const t = options.type;
      if (t === 'positive') {
        icon = mdiCheckCircle;
      } else if (t === 'negative') {
        icon = mdiAlert;
      } else if (t === 'warning') {
        icon = mdiAlertCircle;
      } else if (t === 'info') {
        icon = mdiInformation;
      }
    }
    $q.notify(
      Object.assign(
        {
          message,
          icon,
          timeout: 5000,
          progress: true,
          position: 'top',
          multiLine: true,
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
  return {
    WeeGetParam,
    WeeGetQuery,
    WeeGoTo,
    WeeLoader,
    WeeToast,
    WeeConfirm,
  };
};

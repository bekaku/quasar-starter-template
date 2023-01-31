/* eslint-disable @typescript-eslint/no-explicit-any */
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useMeta } from 'quasar';
import { useLang } from './useLang';
import { UseMetaOptions } from '@/types/common';
export default (options?: UseMetaOptions) => {
  const { t } = useLang();
  const route = useRoute();
  const title = ref(
    route.meta.pageName
      ? t(`${route.meta.pageName}`) +
          `${
            options && options.additionalTitle
              ? ' - ' + options.additionalTitle
              : ''
          }`
      : t('app.name')
  );
  // if (route.meta.pageName && !options?.manualSet) {
  //   useMeta({
  //     title:
  //       t(`${route.meta.pageName}`) +
  //       `${
  //         options && options.additionalTitle
  //           ? ' - ' + options.additionalTitle
  //           : ''
  //       }`,
  //   });
  // }
  useMeta(() => {
    return {
      title: title.value,
    };
  });

  const setTitle = (message: string) => {
    // useMeta({
    //   title: title,
    // });
    title.value = message;
  };
  return {
    setTitle,
  };
};

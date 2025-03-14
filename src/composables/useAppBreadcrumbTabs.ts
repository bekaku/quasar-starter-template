import type { LabelValue } from '@/types/common';
import { computed } from 'vue';
import { useRoute } from 'vue-router';
export const useAppBreadcrumbTabs = () => {
  const route = useRoute();
  const breadcrumbs = computed(() => route.meta.breadcrumbs as LabelValue<any>[]);
  const tabs = computed(() => route.meta.tabs as LabelValue<any>[]);
  return {
    breadcrumbs,
    tabs
  }
};

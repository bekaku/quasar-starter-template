import { useAppStore } from '@/stores/appStore';
export const useRbac = () => {
    const { hasPermission, hasPermissionLazy } = useAppStore();
    return {
        hasPermission,
        hasPermissionLazy
    }
};

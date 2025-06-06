import { useAppStore } from '@/stores/appStore';
export const useRBAC = () => {
    const { hasPermission, hasPermissionLazy } = useAppStore();
    return {
        hasPermission,
        hasPermissionLazy
    }
};

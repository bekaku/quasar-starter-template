import { useAppStore } from '@/stores/appStore';
export const useRoleBase = () => {
    const { hasPermission, hasPermissionLazy } = useAppStore();
    return {
        hasPermission,
        hasPermissionLazy
    }
};

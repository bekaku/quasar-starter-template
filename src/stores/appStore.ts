import type { LabelValue } from '@/types/common';
import { defineStore } from 'pinia';
import { useQuasar } from 'quasar';
import { ref } from 'vue';
export const useAppStore = defineStore('appStore', () => {
    const permissions = ref<string[]>([]);
    const drawers = ref<LabelValue<any>[]>([]);
    const drawerOpen = ref<boolean>(false);
    const expandDrawer = ref<boolean>(true);
    const isMobileOrTablet = ref<boolean>(false);

    const setPermissions = (items: string[]) => {
        permissions.value = items;
    }
    const isPermited = (code: string): boolean => {
        return permissions.value.find((t: string) => t === code) != undefined;
    }
    const isHavePermission = (codes: string[] | undefined): boolean => {
        if (codes == undefined || codes.length == 0) {
            return true;
        }
        let isHave = false;
        for (const code of codes) {
            if (!isHave) {
                isHave = isPermited(code);
                if (isHave) {
                    break;
                }
            }
        }
        return isHave
    }
    const isHavePermissionLazy = (codes: string[] | undefined): Promise<boolean> => {
        return new Promise((resolve) => {
            const isHave = isHavePermission(codes)
            resolve(isHave);
        })
    }

    const setDrawers = (items: LabelValue<any>[]) => {
        drawers.value = items;
    }
    const setDrawerOpen = (open: boolean) => {
        drawerOpen.value = open;
    }
    const setExpandDrawer = (open: boolean) => {
        expandDrawer.value = open;
    }

    const initialAppNav = async (navsItems: LabelValue<any>[]): Promise<LabelValue<any>[]> => {
        const aclFinal: LabelValue<any>[] = [];
        let menu: LabelValue<any> | null = {};
        for (const menuLevel1 of navsItems) {
            menu = {};
            // Level 1
            if (menuLevel1) {
                if (menuLevel1?.label) {
                    menu.label = menuLevel1.label;
                }
                if (menuLevel1?.border) {
                    menu.border = menuLevel1.border;
                }
                if (menuLevel1?.translateLabel != undefined) {
                    menu.translateLabel = menuLevel1.translateLabel;
                }
                // child pages
                const filterPages: LabelValue<any>[] = [];
                if (menuLevel1?.children && menuLevel1.children.length > 0) {
                    for (const p of menuLevel1.children) {
                        if (p) {
                            // if have child pages
                            if (p?.children && p.children.length > 0) {
                                const childs = await getFilterItems(p.children);
                                if (childs.length > 0) {
                                    const menuHaveChild = await setMenuPage(p);
                                    menuHaveChild.children = childs;
                                    filterPages.push(menuHaveChild);
                                }
                            } else {
                                const isPermised = !p.permissions || p.permissions.length == 0 || await isHavePermissionLazy(p.permissions);
                                if (isPermised) {
                                    filterPages.push(p);
                                }
                            }
                        }
                    }
                    menu.children = [...filterPages];
                }
                if (menu.children && menu.children.length > 0) {
                    aclFinal.push(menu);
                }
            }
        }
        // if (aclFinal && aclFinal.length > 0) {
        //     setDrawers(aclFinal);
        // }
        return new Promise((resolve) => resolve(aclFinal));
    }
    const getFilterItems = async (pageItems: LabelValue<any>[]): Promise<LabelValue<any>[]> => {
        const childs: LabelValue<any>[] = [];
        for (const item of pageItems) {
            if (item) {
                const isPermised = !item.permissions || item.permissions.length == 0 || await isHavePermissionLazy(item.permissions);
                if (isPermised) {
                    childs.push(item);
                }
            }
        }
        return new Promise((resolve) => {
            resolve(childs)
        });
    }
    const setMenuPage = (p: LabelValue<any>): Promise<LabelValue<any>> => {
        const menuHaveChild: LabelValue<any> = {};

        if (p?.label) {
            menuHaveChild.label = p.label;
        }
        if (p?.icon) {
            menuHaveChild.icon = p.icon;
        }
        if (p?.color) {
            menuHaveChild.color = p.color;
        }
        // if (p?.iconText) {
        //     menuHaveChild.iconText = p.iconText;
        // }
        if (p?.noActiveLink != undefined) {
            menuHaveChild.noActiveLink = p.noActiveLink;
        }
        if (p?.to) {
            menuHaveChild.to = p.to;
        }
        if (p?.border != undefined) {
            menuHaveChild.border = p.border;
        }
        if (p?.translateLabel != undefined) {
            menuHaveChild.translateLabel = p.translateLabel;
        }
        return new Promise((resolve) => {
            resolve(menuHaveChild)
        });
    }
    const setMobileOrTablet = (state: boolean) => {
        isMobileOrTablet.value = state;
    }
    return {
        permissions,
        setPermissions,
        isHavePermission,
        isHavePermissionLazy,
        drawers,
        setDrawers,
        drawerOpen,
        setDrawerOpen,
        expandDrawer,
        setExpandDrawer,
        initialAppNav,
        isMobileOrTablet,
        setMobileOrTablet
    }
});
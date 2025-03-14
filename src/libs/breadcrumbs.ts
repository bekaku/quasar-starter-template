import type { LabelValue } from '@/types/common';
import { PageIdParamiter } from '@/libs/constant';
import {
    biChevronExpand,
    biFile,
    biHouseDoor,
    biPencil,
    biPeople,
    biPerson,
    biShieldCheck
} from '@quasar/extras/bootstrap-icons';
export const detailItemFn = (crud: string): LabelValue<any>[] => {
    return [{
        label: 'base.detail',
        to: `/${crud}/view/:${PageIdParamiter}`,
        icon: biPencil,
        translateLabel: true,
        params: [PageIdParamiter],
    }];
}
export const PermissionFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_permission',
        to: '/permission',
        // to: `/permission/view/:${PageIdParamiter}?testQuery={testQuery}&testQuery2={testQuery2}`,
        icon: biShieldCheck,
        translateLabel: true,
        // params: [PageIdParamiter],
        // queries: ['testQuery', 'testQuery2']
    },
    ...detailItemFn('permission')
];
export const RoleFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_role',
        to: '/role',
        icon: biPeople,
        translateLabel: true,
    },
    ...detailItemFn('role')
];
// export const UserFormBreadcrumb: LabelValue<any>[] = [
//     {
//         label: 'model_user',
//         to: '/user',
//         icon: biPerson,
//         translateLabel: true,
//     },
//     {
//         label: 'base.detail',
//         to: `/user/view/:${PageIdParamiter}`,
//         icon: biPencil,
//         translateLabel: true,
//         params: [PageIdParamiter],
//     },
// ];

export const UserFormBreadcrumb: LabelValue<any>[] = [
    {
        label: 'model_user',
        to: '/user',
        // Assuming biPerson is defined elsewhere as an icon
        icon: biPerson,
        translateLabel: true,
    },
    ...detailItemFn('user')
];
export const ExampleBtnBreadcrumb: LabelValue<any>[] = [
    {
        label: 'Home',
        to: '/',
        icon: biHouseDoor,
        translateLabel: false,
    },
    {
        label: 'Button',
        to: '/example/ui/button',
        icon: biFile,
        translateLabel: false,
    },
];
export const ExampleSelectBreadcrumb: LabelValue<any>[] = [
    {
        label: 'Home',
        to: '/',
        icon: biHouseDoor,
        translateLabel: false,
    },
    {
        label: 'Select',
        to: '/example/ui/select',
        icon: biChevronExpand,
        translateLabel: false,
    },
];
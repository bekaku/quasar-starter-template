import type { LabelValue } from '@/types/common';
import {
    biCameraVideo,
    biChatDots,
    biFileImage,
    biTags,
    biTrophy
} from '@quasar/extras/bootstrap-icons';
import { PageIdParamiter } from 'src/libs/constant';
export const TabTest: LabelValue<any>[] = [
    {
        label: 'Point',
        to: `/tab-page/:${PageIdParamiter}/point`,
        icon: biTrophy,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Photo',
        to: `/tab-page/:${PageIdParamiter}/photo`,
        icon: biFileImage,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Video',
        to: `/tab-page/:${PageIdParamiter}/video`,
        icon: biCameraVideo,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Tags',
        to: `/tab-page/:${PageIdParamiter}/tags`,
        icon: biTags,
        translateLabel: false,
        params: [PageIdParamiter]
    },
    {
        label: 'Message',
        // to: `/tab-page/:${PageIdParamiter}/message`,
        to: '/example/ui/tabs',
        icon: biChatDots,
        translateLabel: false,
        params: [PageIdParamiter]
    },
];
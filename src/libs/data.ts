import type { FileManagerDto, GroupChatDto, GroupChatMsgDto, IApiListResponse, Permission, RefreshTokenResponse, UserDto } from 'src/types/models';
import { FORMAT_DATE13, getCurrentDateByFormat } from '@/utils/dateUtil'
import { biBarChart, biChatDots, biCreditCard, biCurrencyDollar, biGraphUp, biNewspaper, biPeople } from '@quasar/extras/bootstrap-icons';
import type { LabelValue } from 'src/types/common';
import type { ISeriresCategories } from 'src/types/chart';
export const userData: UserDto = {
    id: 1,
    email: 'admin@mydomain.com',
    username: 'admin',
    token: null,
    fcmToken: null,
    avatar: {
        image: 'https://i.pravatar.cc/450',
        thumbnail: 'https://i.pravatar.cc/128'
    },
    cover: {
        image: 'https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        thumbnail: 'https://images.unsplash.com/photo-1741568032886-18d3f2a694c2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    active: true,
    selectedRoles: [
        1
    ],
    defaultLocale: 'th',
    permissions: [
        'api_client_view',
        'api_client_manage',
        'permission_list',
        'permission_view',
        'permission_manage',
        'role_list',
        'role_view',
        'role_manage',
        'user_list',
        'user_view',
        'user_manage',
        'file_manager_list',
        'file_manager_view',
        'file_manager_manage',
        'backend_login'
    ]
}
export const authenResponse: RefreshTokenResponse = {
    userId: 1,
    authenticationToken: 'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlNmM1ZmVhMi1iODU4LTQ5ZWQtOWViOS0wMjc3YTNiNzQ5M2YtMTc0MTg0MDUwMTA3MCIsImV4cCI6MTc0MTg0MTQwMSwiaWF0IjoxNzQxODQwNTAxLCJ1dWlkIjoiMGQxYWYwNjMtZWQ1Yy00Mzg3LTkxYjItMDQyOTI3OTliMDZjIn0.XLnamWBWipqEmKEfD-BHsVZQQmgO0qx0SutCIeMvTzg5UsMtV0MDQpx5h2fVe1OKUfyAgfRl3FVDeUaQN5SFnQ',
    refreshToken: 'e6c5fea2-b858-49ed-9eb9-0277a3b7493f-1741840501070',
    expiresAt: '2025-03-13T04:50:01.087+00:00'
}

export const permissionListApi: IApiListResponse<Permission> = {
    dataList: [
        {
            id: 1,
            code: 'api_client_list',
            remark: null,
            description: 'Api client(List)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 3,
            code: 'api_client_manage',
            remark: null,
            description: 'Api client(Manage)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 2,
            code: 'api_client_view',
            remark: null,
            description: 'Api client(View)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 16,
            code: 'backend_login',
            remark: null,
            description: 'Login',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 13,
            code: 'file_manager_list',
            remark: null,
            description: 'File(List)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 15,
            code: 'file_manager_manage',
            remark: null,
            description: 'File(Manage)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 14,
            code: 'file_manager_view',
            remark: null,
            description: 'File(View)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 25,
            code: 'files_directory_list',
            remark: null,
            description: 'Directory(List)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 27,
            code: 'files_directory_manage',
            remark: null,
            description: 'Directory(Manage)',
            operationType: 1,
            frontEnd: false,
        },
        {
            id: 26,
            code: 'files_directory_view',
            remark: null,
            description: 'Directory(View)',
            operationType: 1,
            frontEnd: false,
        },
    ],
    totalPages: 2,
    totalElements: 20,
    last: false,
}
export const userItems: UserDto[] = [
    {
        id: 1,
        email: 'Cody@mydomain.com',
        username: 'Cody Fisher',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/1.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/1.jpg'
        },
        active: true,
    },
    {
        id: 2,
        email: 'vue@mydomain.com',
        username: 'Vue Team',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/2.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/2.jpg'
        },
        active: true,
    },
    {
        id: 3,
        email: 'fox@mydomain.com',
        username: 'Robert Fox',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/3.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/3.jpg'
        },
        active: true,
    },
    {
        id: 4,
        email: 'Esther@mydomain.com',
        username: 'Esther Howard',
        avatar: {
            image: 'https://randomuser.me/api/portraits/women/79.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/women/79.jpg'
        },
        active: true,
    },
    {
        id: 5,
        email: 'Darlene@mydomain.com',
        username: 'Darlene Robertson',
        avatar: {
            image: 'https://randomuser.me/api/portraits/women/21.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/women/21.jpg'
        },
        active: true,
    },
    {
        id: 6,
        email: 'Ralph@mydomain.com',
        username: 'Ralph Edwards',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/44.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/44.jpg'
        },
        active: true,
    },
    {
        id: 7,
        email: 'Darrell@mydomain.com',
        username: 'Darrell Steward',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/81.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/81.jpg'
        },
        active: true,
    },
    {
        id: 8,
        email: 'Chanavee@mydomain.com',
        username: 'Chanavee Steward',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/88.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/88.jpg'
        },
        active: true,
    },
    {
        id: 9,
        email: 'Fisher@mydomain.com',
        username: 'Cody Fisher',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/0.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/0.jpg'
        },
        active: true,
    },
    {
        id: 10,
        email: 'kerean@mydomain.com',
        username: 'Kerean Fisher',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/30.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/30.jpg'
        },
        active: true,
    },
    {
        id: 11,
        email: 'Fox@mydomain.com',
        username: 'Robert Fox',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/22.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/22.jpg'
        },
        active: true,
    },
    {
        id: 12,
        email: 'Howard@mydomain.com',
        username: 'Esther Howard',
        avatar: {
            image: 'https://randomuser.me/api/portraits/women/45.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/women/45.jpg'
        },
        active: true,
    },
    {
        id: 13,
        email: 'Robertson@mydomain.com',
        username: 'Darlene Robertson',
        avatar: {
            image: 'https://randomuser.me/api/portraits/women/44.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        active: true,
    },
    {
        id: 14,
        email: 'Edwards@mydomain.com',
        username: 'Ralph Edwards',
        avatar: {
            image: 'https://randomuser.me/api/portraits/women/11.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/women/11.jpg'
        },
        active: true,
    },
    {
        id: 15,
        email: 'Steward@mydomain.com',
        username: 'Darrell Steward',
        avatar: {
            image: 'https://randomuser.me/api/portraits/men/38.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/men/38.jpg'
        },
        active: true,
    },
    {
        id: 16,
        email: 'Meeyae@mydomain.com',
        username: 'Meeyae Steward',
        avatar: {
            image: 'https://randomuser.me/api/portraits/women/17.jpg',
            thumbnail: 'https://randomuser.me/api/portraits/women/17.jpg'
        },
        active: true,
    }
]
export const userListApi: IApiListResponse<UserDto> = {
    dataList: userItems,
    totalPages: 100,
    totalElements: 20000,
    last: false,
}

export const chatHistoryListApi: IApiListResponse<GroupChatDto> = {
    dataList: [
        {
            id: 1,
            dtoAvatar: {
                image: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg',
                thumbnail: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar13.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Esther Howard',
            latestMessage: 'Quick one, team! Anyone',
            latestUpdate: getCurrentDateByFormat(FORMAT_DATE13),
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: true,
            favorite: true,
            muteNotify: false,
            online: true,
        },
        {
            id: 2,
            dtoAvatar: null,
            chatType: 'GROUP',
            groupName: 'Vue Team',
            latestMessage: 'Hey there! I\'ve heard about Vue. Any cool tips for getting started?',
            latestUpdate: '2025-02-20 15:45:12',
            latestMessageType: 'TEXT',
            totalNewMessage: 9,
            totalMembers: 38,
            pin: false,
            favorite: false,
            muteNotify: false,
            online: true,
        },
        {
            id: 3,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/1.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/1.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Cody Fisher',
            latestMessage: 'Let\'s implement Vue. Elevating our UI game! 🚀',
            latestUpdate: '2025-01-21 09:42:30',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
        {
            id: 4,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/3.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/3.jpg'
            },
            chatType: 'GROUP',
            groupName: 'Robert Fox',
            latestMessage: 'Interesting! Vue sounds amazing. What\'s your favorite feature?\n',
            latestUpdate: '2024-12-02 10:28:06',
            latestMessageType: 'TEXT',
            totalNewMessage: 8,
            totalMembers: 4,
            pin: false,
            favorite: false,
            muteNotify: false,
            online: true,
        },
        {
            id: 5,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/women/79.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/women/79.jpg'
            },
            chatType: 'GROUP',
            groupName: 'Esther Howard',
            latestMessage: 'Quick one, team! Anyone',
            latestUpdate: '2024-11-30 19:48:38',
            latestMessageType: 'TEXT',
            totalNewMessage: 1,
            totalMembers: 8,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
        {
            id: 6,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/women/21.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/women/21.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Darlene Robertson',
            latestMessage: null,
            latestUpdate: '2024-11-30 19:47:16',
            latestMessageType: 'IMAGE',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
            totalImages: 1,
            totalFile: 1,
        },
        {
            id: 7,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/44.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/44.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Ralph Edwards',
            latestMessage: 'Reflecting on Vue\'s impact o',
            latestUpdate: '2024-10-28 11:54:37',
            latestMessageType: 'TEXT',
            totalNewMessage: 10,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: true,
        },
        {
            id: 8,
            dtoAvatar: null,
            chatType: 'PERSONAL',
            groupName: 'SA-Tester',
            latestMessage: 'Test\n',
            latestUpdate: '2024-09-24 17:43:41',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: false,
            online: false,
        },
        {
            id: 9,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/men/22.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/men/22.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Robert Fox',
            latestMessage: 'Interesting! Vue sounds amazing. What\'s your favorite feature?\n',
            latestUpdate: '2024-09-20 09:04:14',
            latestMessageType: 'TEXT',
            totalNewMessage: 0,
            totalMembers: 2,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
        {
            id: 10,
            dtoAvatar: {
                image: 'https://randomuser.me/api/portraits/women/44.jpg',
                thumbnail: 'https://randomuser.me/api/portraits/women/44.jpg'
            },
            chatType: 'PERSONAL',
            groupName: 'Darlene Robertson',
            latestMessage: null,
            latestUpdate: '2024-08-24 21:44:51',
            totalNewMessage: 0,
            totalMembers: 1,
            pin: false,
            favorite: false,
            muteNotify: true,
            online: false,
        },
    ],
    totalPages: 1,
    totalElements: 15,
    last: true
}

export const dashBaordStatisticItems: LabelValue<string>[] = [
    {
        label: 'Total Revenue',
        value: '$45,231.89',
        description: '+20.1% from last month',
        icon: biCurrencyDollar,
    },
    {
        label: 'Subscriptions',
        value: '+2350',
        description: '+180.1% from last month',
        icon: biPeople,
    },
    {
        label: 'Sales',
        value: '+12,234',
        description: '+19% from last month',
        icon: biCreditCard,
    },
    {
        label: 'Active Now',
        value: '+573',
        description: '+201 since last hour',
        icon: biGraphUp,
    },
];

export const dashBaordRecentSalseItems: LabelValue<string>[] = [
    {
        label: 'Olivia Martin',
        value: '+$1,999.00',
        description: 'olivia.martin@email.com',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar2.png',
    },
    {
        label: 'Jackson Lee',
        value: '+$39.00',
        description: 'jackson.lee@email.com',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar3.png',
    },
    {
        label: 'Isabella Nguyen',
        value: '+$299.00',
        description: 'isabella.nguyen@email.com',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar4.png',
    },
    {
        label: 'William Kim',
        value: '+$99.00',
        description: 'will@email.com',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar5.png',
    },
    {
        label: 'Sofia Davis',
        value: '+$39.00',
        description: 'sofia.davis@email.com',
        avatar: 'https://www.primefaces.org/cdn/primevue/images/landing/apps/avatar6.png',
    },
];

export const dashboardChartData: ISeriresCategories = {
    categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    series: [
        {
            name: 'Access',
            data: [32, 26, 57, 21, 8, 6, 14, 39, 10, 7, 9, 25],
        },
        {
            name: 'Post',
            data: [10, 8, 30, 21, 27, 10, 9, 40, 20, 10, 50, 12],
        },
        {
            name: 'Repost',
            data: [8, 10, 15, 21, 4, 15, 10, 50, 8, 0, 9, 25],
        },
        {
            name: 'Comment',
            data: [11, 20, 12, 14, 0, 10, 51, 22, 30, 10, 31, 11],
        },
        {
            name: 'Feel',
            data: [20, 10, 40, 16, 0, 5, 19, 1, 5, 0, 1, 4],
        },
        {
            name: 'Share',
            data: [1, 10, 11, 21, 17, 36, 51, 30, 15, 24, 56, 8],
        },
        {
            name: 'Read',
            data: [75, 38, 25, 70, 3, 2, 45, 35, 9, 6, 11, 24],
        },
        {
            name: 'Learn',
            data: [22, 0, 3, 2, 45, 11, 31, 20, 22, 10, 12, 21],
        },
        {
            name: 'Reward',
            data: [30, 1, 13, 1, 0, 0, 3, 0, 3, 0, 20, 15],
        },
    ],
};

export const dashboardSparkLineItems = [
    {
        label: 'Revenue Status',
        description: '12.030',
        value: '27%',
        color: '#15803d',
        bg: 'green-1',
        series: [
            {
                name: 'status',
                data: [10000, 14000, 20000, 16000, 18000, 20000, 16000, 14500, 18000],
            },
        ],
        categories: ['status'],
    },
    {
        label: 'Page View',
        description: '5592',
        value: '12%',
        color: '#f97316',
        bg: 'orange-1',
        series: [
            {
                name: 'view',
                data: [5000, 7500, 9000, 8500, 7000, 6000, 8000, 9500, 7200],
            },
        ],
        categories: ['view'],
    },
    {
        label: 'Bounce Rate',
        description: '55.56%',
        value: '22%',
        color: '#ef4444',
        bg: 'red-1',
        series: [
            {
                name: 'rate',
                data: [28000, 25000, 27000, 24000, 23000, 26000, 25000, 22000, 20000],
            },
        ],
        categories: ['rate'],
    },
    {
        label: 'Product Sale Rate',
        description: '12.56%',
        value: '17%',
        color: '#8b5cf6',
        bg: 'purple-1',
        series: [
            {
                name: 'sale',
                data: [15000, 12000, 18000, 22000, 14000, 11000, 25000, 20000, 17000],
            },
        ],
        categories: ['sale'],
    },
];

export const dashboardHeroItems: LabelValue<string>[] = [
    {
        label: 'Social Feed',
        description: 'Example Facebook feed clone',
        to: '/example/feed',
        icon: biNewspaper,
    },
    {
        label: 'Chats',
        description: 'Chat layout example',
        to: '/example/chats',
        icon: biChatDots,
    },
    {
        label: 'Charts',
        description: 'Chart components Area, Bar, Line, Pie...',
        to: '/example/charts',
        icon: biBarChart,
    },
];

export const imageItemsData: FileManagerDto[] = [
    {
        id: 1,
        fileMime: 'image/jpeg',
        fileName: 'Img001.jpg',
        filePath:
            'https://images.unsplash.com/photo-1741540420894-46bc55554fc3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 2,
        fileMime: 'image/jpeg',
        fileName: 'Img002.jpg',
        filePath:
            'https://images.unsplash.com/photo-1734983234384-5a3edcec48ce?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 3,
        fileMime: 'image/jpeg',
        fileName: 'Img003.jpg',
        filePath:
            'https://images.unsplash.com/photo-1741531472824-b3fc55e2ff9c?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 4,
        fileMime: 'image/jpeg',
        fileName: 'Img004.jpg',
        filePath:
            'https://images.unsplash.com/photo-1741509541812-5d8f3e96df23?q=80&w=2127&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 5,
        fileMime: 'image/jpeg',
        fileName: 'Img005.jpg',
        filePath:
            'https://images.unsplash.com/photo-1734630378523-c6735d798820?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 6,
        fileMime: 'image/jpeg',
        fileName: 'Img006.jpg',
        filePath:
            'https://images.pexels.com/photos/21294005/pexels-photo-21294005/free-photo-of-portrait-of-woman-blowing-dandelion-flower.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 7,
        fileMime: 'image/jpeg',
        fileName: 'Img007.jpg',
        filePath:
            'https://images.pexels.com/photos/27869817/pexels-photo-27869817/free-photo-of-two-women-sitting-on-a-couch-together.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 8,
        fileMime: 'image/jpeg',
        fileName: 'Img008.jpg',
        filePath:
            'https://images.pexels.com/photos/28924817/pexels-photo-28924817/free-photo-of-hong-kong-island-dazzling-night-skyline.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 9,
        fileMime: 'image/jpeg',
        fileName: 'Img009.jpg',
        filePath:
            'https://images.pexels.com/photos/29008754/pexels-photo-29008754/free-photo-of-scenic-desert-highway-at-sunrise-in-utah.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 10,
        fileMime: 'image/jpeg',
        fileName: 'Img010.jpg',
        filePath:
            'https://images.pexels.com/photos/25244460/pexels-photo-25244460/free-photo-of-a-fashionable-young-woman-standing-on-a-meadow.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 11,
        fileMime: 'image/jpeg',
        fileName: 'Img011.jpg',
        filePath:
            'https://images.pexels.com/photos/27467770/pexels-photo-27467770/free-photo-of-laptop-and-camera-on-desk.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
    {
        id: 12,
        fileMime: 'image/jpeg',
        fileName: 'Img011.jpg',
        filePath:
            'https://images.pexels.com/photos/28271613/pexels-photo-28271613/free-photo-of-a-car-mirror-is-shown-in-the-side-view-of-a-road.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: true,
        image: true,
    },
];

export const pdfItemsData: FileManagerDto[] = ([
    {
        id: 1,
        fileMime: 'application/pdf',
        fileName: 'Trace-based Just-in-Time Type Specialization for Dynamic Languages',
        filePath: 'https://mozilla.github.io/pdf.js/web/compressed.tracemonkey-pldi-09.pdf',
        fileThumbnailPath: '',
        fileSize: '2 MB',
        isImage: false,
        image: false,
    },
]);

export const chartData: ISeriresCategories = {
    categories: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ],
    series: [
        {
            name: 'Access',
            data: [32, 26, 57, 21, 8, 6, 14, 39, 10, 7, 9, 25],
        },
        {
            name: 'Post',
            data: [10, 8, 30, 21, 27, 10, 9, 40, 20, 10, 50, 12],
        },
        {
            name: 'Repost',
            data: [8, 10, 15, 21, 4, 15, 10, 50, 8, 0, 9, 25],
        },
        {
            name: 'Comment',
            data: [1, 0, 2, 4, 0, 0, 1, 2, 0, 0, 1, 11],
        },
        {
            name: 'Feel',
            data: [20, 10, 40, 16, 0, 5, 19, 1, 5, 0, 1, 4],
        },
        {
            name: 'Share',
            data: [1, 10, 11, 21, 17, 36, 51, 30, 15, 24, 56, 8],
        },
        {
            name: 'Read',
            data: [75, 38, 25, 70, 3, 2, 45, 35, 9, 6, 11, 24],
        },
        {
            name: 'Learn',
            data: [22, 0, 3, 2, 45, 11, 31, 20, 22, 10, 12, 21],
        },
        {
            name: 'Reward',
            data: [30, 1, 13, 1, 0, 0, 3, 0, 3, 0, 20, 15],
        },
    ],
};
export const chartData2: ISeriresCategories = {
    categories: ['January', 'February', 'March', 'April', 'May', 'June'],
    series: [
        {
            name: 'Access',
            data: [80, 50, 30, 40, 100, 20],
        },
        {
            name: 'Post',
            data: [20, 30, 40, 80, 20, 80],
        },
        {
            name: 'Repost',
            data: [44, 76, 78, 13, 43, 10],
        },
    ],
};

export const appleStockPrices: ISeriresCategories = {
    categories: ['AAPL'],
    series: [
        {
            name: 'AAPL',
            data: [
                1382.54, 1285.23, 1688.76, 1090.12, 1307.65, 1285.98, 1309.34, 1311.56, 1393.24, 1300.87,
                1188.98, 1091.45, 1193.67, 1335.23, 1302.87, 1370.98, 1103.34, 1295.78, 817.34, 1395.87,
            ],
        },
    ],
};

export const simpleSeries: number[] = [44, 55, 41, 37, 22, 43, 21];
export const simpleCategories: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];

export const chatMessageListApi: IApiListResponse<GroupChatMsgDto> =
{
    dataList: [
        {
            id: 667,
            chatMsg: 'The rest of the documentation assumes basic familiarity with HTML, CSS, and JavaScript. If you are totally new to frontend development, it might not be the best idea to jump right into a framework as your first step - grasp the basics and then come back! You can check your knowledge level with these overviews for JavaScript, HTML and CSS if needed. Prior experience with other frameworks helps, but is not required.',
            msgDateTime: '2025-03-21 13:55:25',
            groupId: 17,
            readCount: 10,
            unsend: false,
            sent: true,
            sendUser: userItems[0],
            files: [],
            liked: false,
            emojiType: 'LIKE',
            reactionEngage: [{
                total: 1,
                emojiType: 'LIKE'
            }],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 666,
            chatMsg: 'Just sent emoji \uD83D\uDCAF \uD83D\uDE0C ✨️ \uD83D\uDE42 \uD83D\uDE43 \uD83D\uDC4C \uD83D\uDCAF \uD83D\uDE0C ✨️ \uD83D\uDE42 \uD83D\uDE43',
            msgDateTime: '2025-03-21 13:55:12',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: true,
            sendUser: userItems[1],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 567,
            chatMsg: '13.9795581,100.6267777',
            msgDateTime: '2024-10-11 15:36:47',
            groupId: 17,
            readCount: 2,
            unsend: false,
            sent: true,
            sendUser: userItems[2],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'LOCATION'
        },
        {
            id: 665,
            chatMsg: 'https://www.youtube.com/watch?v=_5hAk3ic5Ok',
            msgDateTime: '2025-03-21 13:54:12',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: false,
            sendUser: userItems[2],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 664,
            chatMsg: null,
            msgDateTime: '2025-03-21 13:53:04',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: false,
            sendUser: userItems[3],
            files: [
                {
                    id: 152,
                    fileManager: pdfItemsData[0],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'FILE'
        },
        {
            id: 663,
            chatMsg: null,
            msgDateTime: '2025-03-21 13:52:48',
            groupId: 17,
            readCount: 0,
            unsend: false,
            sent: true,
            sendUser: userItems[4],
            files: [
                {
                    id: 147,
                    fileManager: imageItemsData[0],
                },
                {
                    id: 148,
                    fileManager: imageItemsData[1],
                },
                {
                    id: 149,
                    fileManager: imageItemsData[2],
                },
                {
                    id: 150,
                    fileManager: imageItemsData[3],
                },
                {
                    id: 151,
                    fileManager: imageItemsData[4],
                },
                {
                    id: 152,
                    fileManager: imageItemsData[9],
                },
                {
                    id: 153,
                    fileManager: imageItemsData[10],
                },
                {
                    id: 154,
                    fileManager: imageItemsData[11],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'LAUGH'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'IMAGE'
        },
        {
            id: 662,
            chatMsg: 'An approachable, performant and versatile framework for building web user interfaces.',
            msgDateTime: '2025-03-21 13:52:10',
            groupId: 17,
            readCount: 1,
            unsend: false,
            sent: true,
            sendUser: userItems[5],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: {
                id: 667,
                chatMsg: 'they will have to be a topic to see the deference of options and show the Silly things that the world on the way are not the same as you want me vuejs I don\'t want you change springboot I don\'t have any plans ',
                msgDateTime: '2024-10-02 19:36:56',
                groupId: 17,
                readCount: 1,
                unsend: false,
                sent: false,
                sendUser: userItems[0],
                files: [],
                liked: false,
                emojiType: null,
                reactionEngage: [],
                dtoReplyTo: null,
                chatMessageType: 'TEXT'
            },
            chatMessageType: 'TEXT'
        },
        {
            id: 646,
            chatMsg: 'Message unsent.',
            msgDateTime: '2025-01-11 11:55:03',
            groupId: 17,
            readCount: 1,
            unsend: true,
            sent: false,
            sendUser: userItems[6],
            files: [],
            liked: false,
            emojiType: null,
            reactionEngage: [],
            dtoReplyTo: null,
            chatMessageType: 'LOCATION'
        },
        {
            id: 645,
            chatMsg: 'Message with photo',
            msgDateTime: '2025-01-10 12:59:52',
            groupId: 17,
            readCount: 10,
            unsend: false,
            sent: true,
            sendUser: userItems[7],
            files: [
                {
                    id: 142,
                    fileManager: imageItemsData[5],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'SAD'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'IMAGE'
        },
        {
            id: 649,
            chatMsg: 'Vue (pronounced /vjuː/, like view) is a JavaScript framework for building user interfaces. It builds on top of standard HTML, CSS, and JavaScript and provides a declarative, component-based programming model that helps you efficiently develop user interfaces of any complexity.',
            msgDateTime: '2025-01-10 12:42:20',
            groupId: 17,
            readCount: 1,
            unsend: false,
            sent: false,
            sendUser: userItems[8],
            files: [],
            liked: true,
            emojiType: 'LIKE',
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'LIKE'
                },
                {
                    total: 10,
                    emojiType: 'CARE'
                },
                {
                    total: 2,
                    emojiType: 'FIGHTING'
                },
                {
                    total: 1,
                    emojiType: 'LAUGH'
                },
                {
                    total: 1,
                    emojiType: 'SAD'
                },
                {
                    total: 1,
                    emojiType: 'WOW'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'TEXT'
        },
        {
            id: 644,
            chatMsg: null,
            msgDateTime: '2025-01-10 12:42:20',
            groupId: 17,
            readCount: 1,
            unsend: false,
            sent: false,
            sendUser: userItems[8],
            files: [
                {
                    id: 141,
                    fileManager: imageItemsData[4],
                }
            ],
            liked: false,
            emojiType: null,
            reactionEngage: [
                {
                    total: 1,
                    emojiType: 'LAUGH'
                }
            ],
            dtoReplyTo: null,
            chatMessageType: 'IMAGE'
        }
    ],
    totalPages: 12,
    totalElements: 112,
    last: false
}


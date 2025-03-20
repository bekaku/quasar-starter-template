import type { GroupChatDto, IApiListResponse, Permission, RefreshTokenResponse, UserDto } from 'src/types/models';
import { FORMAT_DATE13, getCurrentDateByFormat } from '@/utils/dateUtil'
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
export const userListApi: IApiListResponse<UserDto> = {
    dataList: [
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
                image: 'https://www.primefaces.org/cdn/Vue/images/landing/apps/avatar13.jpg',
                thumbnail: 'https://www.primefaces.org/cdn/Vue/images/landing/apps/avatar13.jpg'
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
                image: 'https://www.primefaces.org/cdn/Vue/images/landing/apps/avatar6.png',
                thumbnail: 'https://www.primefaces.org/cdn/Vue/images/landing/apps/avatar6.png'
            },
            active: true,
        },
        {
            id: 15,
            email: 'Steward@mydomain.com',
            username: 'Darrell Steward',
            avatar: {
                image: 'https://www.primefaces.org/cdn/Vue/images/landing/apps/avatar7.png',
                thumbnail: 'https://www.primefaces.org/cdn/Vue/images/landing/apps/avatar7.png'
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
    ],
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
            fileAvatarSelectId: null,
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
            online: false,
        },
        {
            id: 2,
            dtoAvatar: null,
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
            fileAvatarSelectId: null,
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
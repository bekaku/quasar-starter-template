# Vue JS 3 + Typescript + Quasar 2 (SSR SPA mode) + Docker

A Quasar Project\
[Demo Link](https://bekaku.github.io/quasar-starter/)

![dashboard](https://bekaku.github.io/images/screenshot-quasar-starter/index01.png)

![dashboard](https://bekaku.github.io/images/screenshot-quasar-starter/index02.png)

![feed](https://bekaku.github.io/images/screenshot-quasar-starter/feed01.png)

![feed](https://bekaku.github.io/images/screenshot-quasar-starter/feed02.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat01.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat03.png)

![charts](https://bekaku.github.io/images/screenshot-quasar-starter/chart01.png)

![charts](https://bekaku.github.io/images/screenshot-quasar-starter/chart02.png)

![charts](https://bekaku.github.io/images/screenshot-quasar-starter/chart03.png)

![gallerry](https://bekaku.github.io/images/screenshot-quasar-starter/gallerry.png)

![pdf-view](https://bekaku.github.io/images/screenshot-quasar-starter/pdf-view.png)

![image-crop](https://bekaku.github.io/images/screenshot-quasar-starter/image-crop.png)

![drag-drop](https://bekaku.github.io/images/screenshot-quasar-starter/drag-drop.png)

![markdown](https://bekaku.github.io/images/screenshot-quasar-starter/md.png)

![setting](https://bekaku.github.io/images/screenshot-quasar-starter/setting.png)


# Backend Rest Api

1 Java Springboot [java-spring-boot-starter](https://github.com/bekaku/java-spring-boot-starter)


## Install the dependencies

```bash
pnpm install
# or
npm install
```

# In case you want to use my API, edit the following file.

API endpoint at `my-app/env/.env.dev` or `my-app/env/.env.prod`

```js
APP_BASE_API= 'http://localhost:8080'
APP_BASE_CDN_API= 'http://localhost:8080'
```
modify /src/App.vue
```js
defineOptions({
  async preFetch({ currentRoute, ssrContext, redirect }) {
        const refreshTokenReponse = await authenStore.refreshToken(ssrContext);
      if (refreshTokenReponse && !refreshTokenReponse.status && refreshTokenReponse.fourceLogout) {
        redirect({ path: '/auth/login' });
      }
      const userDataResponse = await callAxiosProcess<UserDto>({
        API: '/api/user/currentUserData',
        method: 'GET',
      });
    /*
     const userDataResponse: any = {
        status: 200,
        statusText: 'OK',
        data: userData,
      };
      */
  },
});
```

modify /src/api/AuthenService.ts
```js
  const singin = async (
    loginRequest: LoginRequest
  ): Promise<RefreshTokenResponse | null> => {
     return await callAxios<RefreshTokenResponse>({
       API: '/api/auth/login',
       method: 'POST',
       body: loginRequest,
     });
  };


  const singoutToServer = async (
    refreshToken: RefreshTokenRequest
  ): Promise<ResponseMessage | null> => {
     return await callAxios<ResponseMessage>({
       API: '/api/auth/logout',
       method: 'POST',
       body: refreshToken,
     });
  };

  const refreshToken = async (
    refreshToken: RefreshTokenRequest
  ): Promise<RefreshTokenResponse | null> => {
     return await callAxios<RefreshTokenResponse>({
       API: '/api/auth/refreshToken',
       method: 'POST',
      body: refreshToken,
    });
  };

  const removeAccessTokenSession = async (
    id: number
  ): Promise<ResponseMessage | null> => {
     return await callAxios<ResponseMessage>({
       API: `/api/auth/removeAccessTokenSession?id=${id}`,
      method: 'DELETE',
     });
  };

  const requestVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException> | null> => {
     return await callAxiosProcess<ResponseMessage | AppException>({
       API: '/api/auth/requestVerifyCodeToResetPwd',
       method: 'POST',
       body: {
         forgotPasswordRequest: req
       },
     });
  };
  const sendVerifyCodeToResetPwd = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException> | null> => {
    return await callAxiosProcess<ResponseMessage | AppException>({
       API: '/api/auth/sendVerifyCodeToResetPwd',
       method: 'POST',
       body: {
         forgotPasswordRequest: req
       },
     });
  };
  const resetPassword = async (
    req: ForgotPasswordRequest
  ): Promise<AxiosResponse<ResponseMessage | AppException> | null> => {
     return await callAxiosProcess<ResponseMessage | AppException>({
       API: '/api/auth/resetPassword',
       method: 'POST',
       body: {
         forgotPasswordRequest: req
       },
     });
  };
```

modify /src/api/FileManagerService.ts
```ts
const uploadApi = async (
    file: any,
    fileDirectoryId = 0,
    resizeImage = true
  ): Promise<FileManagerDto | null> => {
    const postData = new FormData();
    postData.append(FILES_UPLOAD_ATT, file);
    postData.append(FILES_DIRECTORY_ID_ATT, fileDirectoryId.toString());
    postData.append('resizeImage', resizeImage ? '1' : '0');
    return await callAxios<FileManagerDto>({
      API: '/api/fileManager/uploadApi',
      method: 'POST',
      body: postData,
      baseURL: cdnBaseApi || '',
      contentType: 'multipart/form-data'
    });
  };

  const deleteFileApi = async (fileId: number): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/deleteFileApi/${fileId}`,
      method: 'DELETE',
      baseURL: cdnBaseApi
    });
  };

  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: cdnBaseApi
    });
  };

  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/fileManager/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
      baseURL: cdnBaseApi
    });
  };
```
modify /src/api/PermissionService.ts
```ts
const userAcl = async (getMenuList = 0): Promise<IAcl | null> => {
    return await callAxios<IAcl | null>({
      API: `/api/permission/userAcl?getMenuList=${getMenuList}`,
      method: 'GET',
    });
  };

  const findAll = async (q: string): Promise<IApiListResponse<Permission> | null> => {
    return await callAxios<IApiListResponse<Permission>>({
      API: `/api/permission${q}`,
      method: 'GET',
    });
  };
  const findAllBackendPermission = async (): Promise<Permission[] | null> => {
    return await callAxios<Permission[]>({
      API: '/api/permission/findAllBackendPermission',
      method: 'GET',
    });
  };
  const findAllFrontendPermission = async (): Promise<Permission[] | null> => {
    return await callAxios<Permission[]>({
      API: '/api/permission/findAllFrontendPermission',
      method: 'GET',
    });
  };
```
modify /src/api/RoleService.ts
```ts
const findAllBackendRole = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllBackend',
      method: 'GET',
    });
  };

  const findAllSystemFrontend = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllSystemFrontend',
      method: 'GET',
    });
  };
  const findAllByCompanyAndFrontend = async (
    companyId: number
  ): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: `/api/role/findAllByCompanyAndFrontend?companyId=${companyId}`,
      method: 'GET',
    });
  };
  const findAllRoleByCompany = async (): Promise<Role[] | null> => {
    return await callAxios<Role[] | null>({
      API: '/api/role/findAllByCompany',
      method: 'GET',
    });
  };
  const findAllByAuthAndFrontend = async (): Promise<Role[] | null> => {
    return await callAxios<Role[]>({
      API: '/api/role/findAllByAuthAndFrontend',
      method: 'GET',
    });
  };
```
modify /src/api/UserService.ts
```ts
const findAll = async (q: string): Promise<IApiListResponse<UserDto> | null> => {
      console.log('UserService.ts > findAll > ', `/api/user${q}`);
      return await callAxios<IApiListResponse<UserDto>>({
        API: `/api/user${q}`,
        method: 'GET',
      });
    };
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: '/api/user/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: `/api/user/updateDefaultLocale/?locale=${locale}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/selfUpdatePassword',
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserPassword/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPasswordByAdmin = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/user/updateUserPasswordByAdmin/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const currentAuthSession = async (q: string): Promise<AccessTokenDto[] | null> => {
    return await callAxios<AccessTokenDto[]>({
      API: `/api/user/currentAuthSession${q}`,
      method: 'GET',
    });
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/updatePersonalData',
      method: 'PUT',
      body: {
        user: req,
      },
    });
  };

  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/user/updateEmail',
      method: 'PUT',
      body: {
        user: req,
      },
    });
  };
```
modify /src/api/UtilService.ts
```ts
const getOgMeta = async (link: string): Promise<OgMeta | null> => {
    return await callAxios<OgMeta>({
      API: `/api/public/getOgMeta?url=${link}`,
      method: 'GET',
    });
  };
```

Config your Project at `my-app`/quasar.config.ts

devServer
```ts
   devServer: {
      open: false, // opens browser window automatically
      port: 9000,
    },
```

### Start the app in development SPA mode (hot-code reloading, error reporting, etc.)

```bash
pnpm dev or
npm run dev or
quasar dev
```
Starting webserver at port 9000
### Start the app in development SSR mode (hot-code reloading, error reporting, etc.)

```bash
pnpm dev:ssr or
npm run dev:ssr or
quasar dev -m ssr
```
Starting webserver at port 9100
### Lint the files

```bash
pnpm lint
# or
npm run lint
```

### Format the files

```bash
pnpm format
# or
npm run format
```

### Build the SPA app for production

```bash
pnpm build or
npm run build or
quasar build
```

### Build the SSR app for production

```bash
pnpm build:ssr or
npm run build:ssr or
quasar build -m ssr
```

Docker run

```batch
docker-compose build
docker-compose up -d
```

### Customize the configuration

See [Configuring quasar.config.ts](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

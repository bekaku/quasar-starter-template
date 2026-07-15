# Vue JS 3 + Typescript + Quasar 2 (SSR SPA mode) + Docker

[Demo Link](https://bekaku.github.io/quasar-starter/)

[Nuxt + Quasar version](https://github.com/bekaku/nuxt-quasar-example-app)

# Backend Rest Api

1 Java Springboot [java-spring-boot-starter](https://github.com/bekaku/java-spring-boot-starter)

Dashboard
![dashboard](https://bekaku.github.io/images/screenshot-quasar-starter/index01.png)

![dashboard](https://bekaku.github.io/images/screenshot-quasar-starter/index02.png)

Social feed
![feed](https://bekaku.github.io/images/screenshot-quasar-starter/feed01.png)

![feed](https://bekaku.github.io/images/screenshot-quasar-starter/feed02.png)

Chat layout
![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat01.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat10.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat02.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat03.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat04.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat05.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat06.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat07.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat08.png)

![chat](https://bekaku.github.io/images/screenshot-quasar-starter/chat09.png)


Charts
![charts](https://bekaku.github.io/images/screenshot-quasar-starter/chart01.png)

![charts](https://bekaku.github.io/images/screenshot-quasar-starter/chart02.png)

![charts](https://bekaku.github.io/images/screenshot-quasar-starter/chart03.png)

Gallery
![gallerry](https://bekaku.github.io/images/screenshot-quasar-starter/gallerry.png)

Pdf view
![pdf-view](https://bekaku.github.io/images/screenshot-quasar-starter/pdf-view.png)

Image corpper
![image-crop](https://bekaku.github.io/images/screenshot-quasar-starter/image-crop.png)

Drag drop
![drag-drop](https://bekaku.github.io/images/screenshot-quasar-starter/drag-drop.png)

Markdown editor
![markdown](https://bekaku.github.io/images/screenshot-quasar-starter/md.png)

Carousel
![markdown](https://bekaku.github.io/images/screenshot-quasar-starter/swipper01.png)

Settings
![setting](https://bekaku.github.io/images/screenshot-quasar-starter/setting.png)



## Install the dependencies

```bash
pnpm install
# or
npm install
```

<!-- # In case you want to use my API, edit the following file.

API endpoint at `my-app/.env` or `my-app/.env.local`

```js
QCLI_APP_BASE_API= 'http://localhost:8080'
QCLI_APP_BASE_CDN_API= 'http://localhost:8080'
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
        API: '/api/appUser/currentUserData',
        method: 'GET',
      });
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
         data: req
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
         data: req
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
         data: req
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

  const findAll = async (q: string): Promise<ApiResponse<Permission> | null> => {
    return await callAxios<ApiResponse<Permission>>({
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
const findAll = async (q: string): Promise<ApiResponse<UserDto> | null> => {
      console.log('UserService.ts > findAll > ', `/api/appUser${q}`);
      return await callAxios<ApiResponse<UserDto>>({
        API: `/api/appUser${q}`,
        method: 'GET',
      });
    };
  const findCurrentUserData = async (): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: '/api/appUser/currentUserData',
      method: 'GET',
    });
  };
  const updateUserAvatar = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserAvatar?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateUserCover = async (
    fileManagerId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserCover?fileManagerId=${fileManagerId}`,
      method: 'PUT',
    });
  };
  const updateDefaultLocale = async (locale: AppLocale): Promise<UserDto | null> => {
    return await callAxios<UserDto>({
      API: `/api/appUser/updateDefaultLocale/?locale=${locale}`,
      method: 'PUT',
    });
  };
  const selfUpdatePassword = async (
    req: UserChangePasswordRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/appUser/selfUpdatePassword',
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPassword = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserPassword/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const updateUserPasswordByAdmin = async (
    req: UserChangePasswordRequest,
    userId: number
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: `/api/appUser/updateUserPasswordByAdmin/${userId}`,
      method: 'PUT',
      body: req,
    });
  };
  const currentAuthSession = async (q: string): Promise<AccessTokenDto[] | null> => {
    return await callAxios<AccessTokenDto[]>({
      API: `/api/appUser/currentAuthSession${q}`,
      method: 'GET',
    });
  };

  const updatePersonalData = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/appUser/updatePersonalData',
      method: 'PUT',
      body: {
        data: req,
      },
    });
  };

  const updateEmail = async (
    req: UserPersonalEditRequest
  ): Promise<ResponseMessage | null> => {
    return await callAxios<ResponseMessage>({
      API: '/api/appUser/updateEmail',
      method: 'PUT',
      body: {
        data: req,
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
``` -->

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

## Deployment

### Vercel Serverless (Default)

This starter template is pre-configured to deploy seamlessly on [Vercel](https://vercel.com/) using SSR (Server-Side Rendering) mode with Serverless Functions.

**How it works:**
- The `vercel.json` file handles route rewrites and directs traffic to the serverless function.
- The `api/index.js` file acts as the entry point for Vercel's serverless environment.
- The `package.json` includes a `postinstall` script to ensure server dependencies are installed correctly during the Vercel build phase.

**To deploy on Vercel:**
1. Import your repository into Vercel.
2. In the project settings, set the **Framework Preset** to `Other`, **Build Command** to `pnpm run build:ssr-vercel`, **Output Directory** to `dist/ssr/client`.
3. Vercel will automatically detect the configuration and deploy your Quasar SSR app.

---

### Deploying to Other Platforms

If you prefer to deploy this application to a different environment (e.g., standard Node.js server, Docker, AWS, or DigitalOcean), you **must remove** the Vercel-specific configurations to prevent conflicts.

**Follow these steps to revert to the standard Quasar SSR setup:**

1. **Delete Vercel files:** Remove the `vercel.json` file and the entire `api` directory from the root of your project.

2. **Update `quasar.config.js`:**
   Locate the `ssr` configuration block and remove the `prodScriptNamedExport` property:
   ```javascript
   ssr: {
     // Remove or comment out the following line:
     // prodScriptNamedExport: 'default',
     
     pwa: false,
     // ...
   }
   ```
3. **Update `src-ssr/server.ts`:**
```javascript
export const listen = defineSsrListen(
  async ({ app, devHttpsOptions, port }) => {

    // Remove this block entirely
    // if (import.meta.env.QUASAR_PROD) {
    //   return { default: app };
    // }

    // Keep the rest of the default listening logic...
  }
);
```
3. **Update `src-ssr/server.ts`:**
Revert the `SsrDriver` interface declaration at the top of the file back to its default state:
```javascript
declare module '#q-app' {
  interface SsrDriver {
    app: Application;
    listenResult: Server; // Remove the " | { default: Application }" part
    request: Request;
    response: Response;
  }
}
```
Once these changes are made, your project will run as a standard long-running Node.js process when built for production (`quasar build -m ssr`), ready to be deployed anywhere.

### Customize the configuration

See [Configuring quasar.config.ts](https://v2.quasar.dev/quasar-cli-vite/quasar-config-js).

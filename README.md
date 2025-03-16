# Vue JS 3 + Typescript + Quasar 2 SSR mode + Docker

A Quasar Project\
[Demo Link](https://bekaku.github.io/quasar-starter/)

# Backend Rest Api

1 Java Springboot [java-spring-boot-starter](https://github.com/bekaku/java-spring-boot-starter)

## Install the dependencies

```bash
yarn
# or
npm install
```


API endpoint at `my-app/env/.env.dev` or `my-app/env/.env.prod`

```js
APP_BASE_API= 'http://localhost:8080'
APP_BASE_CDN_API= 'http://localhost:8080'
```

Config your Project at `my-app`/quasar.config.ts

devServer
```js
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
yarn build or
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

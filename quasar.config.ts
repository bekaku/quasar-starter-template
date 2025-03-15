// Configuration for your app
// https://v2.quasar.dev/quasar-cli-vite/quasar-config-file

import { defineConfig } from '#q-app/wrappers';
import { fileURLToPath } from 'node:url';

export default defineConfig((ctx) => {
  return {
    // https://v2.quasar.dev/quasar-cli-vite/prefetch-feature
    preFetch: true,

    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    // https://v2.quasar.dev/quasar-cli-vite/boot-files
    boot: [
      'i18n',
      'axios',
      'requireAuth',
      { path: 'dompurify', server: false },
      { path: 'pdfVue', server: false },
      { path: 'vueZoomer', server: false },
      { path: 'vueApexcharts', server: false },
      { path: 'swiper', server: false },
      { path: 'cropperjs', server: false },
    ],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#css
    css: [
      'color.scss',
      'app.scss',
      'typography.scss'
    ],

    // https://github.com/quasarframework/quasar/tree/dev/extras
    extras: [
      'bootstrap-icons',
    ],

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#build
    build: {
      target: {
        browser: ['es2022', 'firefox115', 'chrome115', 'safari14'],
        node: 'node20'
      },
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
      typescript: {
        strict: true,
        vueShim: true
        // extendTsConfig (tsConfig) {}
      },

      vueRouterMode: 'hash', // available values: 'hash', 'history'
      // vueRouterBase,
      // vueDevtools,
      // vueOptionsAPI: false,

      // rebuildCache: true, // rebuilds Vite/linter/etc cache on startup
      publicPath: '/quasar-starter', // for github static deploy
      // publicPath: '/',
      // analyze: true,
      // env: {},
      // rawDefine: {}
      // ignorePublicFolder: true,
      // minify: false,
      // polyfillModulePreload: true,
      // distDir

      // extendViteConf (viteConf) {},
      // viteVuePluginOptions: {},

      // eslint-disable-next-line no-empty-pattern
      extendViteConf(viteConf, { /* isServer, isClient */ }) {
        viteConf.esbuild = {
          supported: {
            'top-level-await': true
          }
        };
        viteConf.optimizeDeps = {
          // include: ['pdfjs-dist'], // optionally specify dependency name
          esbuildOptions: {
            supported: {
              'top-level-await': true
            }
          }
        };
      },
      viteVuePluginOptions: {
        // script: {
        //   defineModel: true,
        // },
        template: {
          compilerOptions: {
            // isCustomElement: (tag) => tag.startsWith('swiper-'),
            isCustomElement: tag => [
              'swiper-container', 'swiper-slide',
              'cropper-canvas', 'cropper-image', 'cropper-shade', 'cropper-handle', 'cropper-selection', 'cropper-grid', 'cropper-crosshair', 'cropper-viewer'
            ].includes(tag),
          },
        },
      },
      vitePlugins: [
        ['@intlify/unplugin-vue-i18n/vite', {
          // if you want to use Vue I18n Legacy API, you need to set `compositionOnly: false`
          // compositionOnly: false,

          // if you want to use named tokens in your Vue I18n messages, such as 'Hello {name}',
          // you need to set `runtimeOnly: false`
          // runtimeOnly: false,

          ssr: ctx.modeName === 'ssr',

          // you need to set i18n resource including paths !
          include: [fileURLToPath(new URL('./src/i18n', import.meta.url))]
        }],

        // ['vite-plugin-checker', {
        //   vueTsc: true,
        //   eslint: {
        //     lintCommand: 'eslint -c ./eslint.config.js "./src*/**/*.{ts,js,mjs,cjs,vue}"',
        //     useFlatConfig: true
        //   }
        // }, { server: false }]
      ],
      envFolder: './env',
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#devserver
    devServer: {
      // https: true,
      port: 9000,
      open: false // opens browser window automatically
    },

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#framework
    framework: {
      config: {
        loadingBar: {
          color: 'primary',
        },
      },
      iconSet: 'bootstrap-icons', // Quasar icon set
      lang: 'en-US', // Quasar language pack
      // iconSet: 'material-icons', // Quasar icon set
      // lang: 'en-US', // Quasar language pack

      // For special cases outside of where the auto-import strategy can have an impact
      // (like functional components as one of the examples),
      // you can manually specify Quasar components/directives to be available everywhere:
      //
      // components: [],
      // directives: [],
      components: [
        'QBtn',
        'QPage',
        'QCard',
        'QCardSection',
        'QDrawer',
        'QScrollArea',
        'QList',
        'QItem',
        'QItemSection',
        'QIcon',
        'QItemLabel',
        'QSeparator',
        'QHeader',
        'QSpace',
        'QInput',
        'QTooltip',
        'QBadge',
        'QAvatar',
        'QMenu',
        'QCardActions',
        'QForm',
        'QPageContainer',
        'QLayout',
        'QToolbarTitle',
        'QToolbar',
        'QExpansionItem',
        'QInput',
        'QImg',
        'QCarousel',
        'QCarouselSlide',
        'QDialog',
        'QSpinner',
        'QSpinnerDots',
        'QMarkupTable',
        'QSkeleton',
        'QPagination',
        'QToggle',
        'QSelect',
        'QPopupProxy',
        'QDate',
        'QField',
        'QTabs',
        'QTabPanels',
        'QTabPanel',
        'QRouteTab',
        'QPageSticky',
        'QSpinnerDots',
        'QLinearProgress',
        'QNoSsr',
        'QFile',
        'QCarousel',
        'QCarouselSlide',
        'QInnerLoading',
        'QKnob',
        'QVirtualScroll',
        'QSlider',
        'QScrollObserver',
        'QOptionGroup',
        'QBreadcrumbs',
        'QBreadcrumbsEl',
      ],
      // Quasar plugins
      plugins: [
        'Loading',
        'Notify',
        'Dialog',
        'Meta',
        'Cookies',
        'LoadingBar',
        'LocalStorage',
      ]
    },

    // animations: 'all', // --- includes all animations
    // https://v2.quasar.dev/options/animations
    animations: ['heartBeat', 'hinge', 'lightSpeedInLeft'],

    // https://v2.quasar.dev/quasar-cli-vite/quasar-config-file#sourcefiles
    // sourceFiles: {
    //   rootComponent: 'src/App.vue',
    //   router: 'src/router/index',
    //   store: 'src/store/index',
    //   pwaRegisterServiceWorker: 'src-pwa/register-service-worker',
    //   pwaServiceWorker: 'src-pwa/custom-service-worker',
    //   pwaManifestFile: 'src-pwa/manifest.json',
    //   electronMain: 'src-electron/electron-main',
    //   electronPreload: 'src-electron/electron-preload'
    //   bexManifestFile: 'src-bex/manifest.json
    // },

    // https://v2.quasar.dev/quasar-cli-vite/developing-ssr/configuring-ssr
    ssr: {
      prodPort: 3000, // The default port that the production server should use
      // (gets superseded if process.env.PORT is specified at runtime)

      middlewares: [
        'render' // keep this as last one
      ],

      // extendPackageJson (json) {},
      // extendSSRWebserverConf (esbuildConf) {},

      // manualStoreSerialization: true,
      // manualStoreSsrContextInjection: true,
      // manualStoreHydration: true,
      // manualPostHydrationTrigger: true,

      pwa: false
      // pwaOfflineHtmlFilename: 'offline.html', // do NOT use index.html as name!

      // pwaExtendGenerateSWOptions (cfg) {},
      // pwaExtendInjectManifestOptions (cfg) {}
    },

    // https://v2.quasar.dev/quasar-cli-vite/developing-pwa/configuring-pwa
    pwa: {
      workboxMode: 'GenerateSW' // 'GenerateSW' or 'InjectManifest'
      // swFilename: 'sw.js',
      // manifestFilename: 'manifest.json',
      // extendManifestJson (json) {},
      // useCredentialsForManifestTag: true,
      // injectPwaMetaTags: false,
      // extendPWACustomSWConf (esbuildConf) {},
      // extendGenerateSWOptions (cfg) {},
      // extendInjectManifestOptions (cfg) {}
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-cordova-apps/configuring-cordova
    cordova: {
      // noIosLegacyBuildFlag: true, // uncomment only if you know what you are doing
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-capacitor-apps/configuring-capacitor
    capacitor: {
      hideSplashscreen: true
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-electron-apps/configuring-electron
    electron: {
      // extendElectronMainConf (esbuildConf) {},
      // extendElectronPreloadConf (esbuildConf) {},

      // extendPackageJson (json) {},

      // Electron preload scripts (if any) from /src-electron, WITHOUT file extension
      preloadScripts: ['electron-preload'],

      // specify the debugging port to use for the Electron app when running in development mode
      inspectPort: 5858,

      bundler: 'packager', // 'packager' or 'builder'

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Windows only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        appId: 'q-temp'
      }
    },

    // Full list of options: https://v2.quasar.dev/quasar-cli-vite/developing-browser-extensions/configuring-bex
    bex: {
      // extendBexScriptsConf (esbuildConf) {},
      // extendBexManifestJson (json) {},

      /**
       * The list of extra scripts (js/ts) not in your bex manifest that you want to
       * compile and use in your browser extension. Maybe dynamic use them?
       *
       * Each entry in the list should be a relative filename to /src-bex/
       *
       * @example [ 'my-script.ts', 'sub-folder/my-other-script.js' ]
       */
      extraScripts: []
    }
  }
});

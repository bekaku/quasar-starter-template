import { routes, handleHotUpdate } from 'vue-router/auto-routes'
import { defineRouter } from '#q-app';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
} from 'vue-router';
export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : createWebHistory;
  const Router = createRouter({
    routes,
    history: createHistory(import.meta.env.VUE_ROUTER_BASE),
  })

  // enable HMR for it
  if (import.meta.hot) {
    handleHotUpdate(Router)
  }

  return Router
})

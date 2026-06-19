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
    // scrollBehavior: () => ({ left: 0, top: 0 }),
    scrollBehavior: (to, from, savedPosition) => {
      if (savedPosition) {
        return savedPosition
      }

      // 2. ถ้ามี Hash ใน URL (เช่น #section2) ให้เลื่อนไปที่ Hash นั้น
      if (to.hash) {
        return { el: to.hash, behavior: 'smooth' }
      }

      // 3. นอกนั้น (เวลาคลิกเปลี่ยนหน้าปกติ) ให้เด้งกลับไปบนสุดเสมอ!
      return { left: 0, top: 0 }
    },
    routes,
    history: createHistory(import.meta.env.VUE_ROUTER_BASE),
  })

  // enable HMR for it
  if (import.meta.hot) {
    handleHotUpdate(Router)
  }

  return Router
})

import { useUserStore } from '@/stores'
import { createRouter, createWebHistory } from 'vue-router'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      component: () => import('@/views/login/index.vue'),
      meta: { title: '登录' }
    },
    {
      path: '/',
      component: () => import('@/layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: 'home',
          component: () => import('@/layout/views/Home/index.vue'),
          meta: { title: '首页' }
        },
        {
          path: 'user',
          component: () => import('@/layout/views/User/index.vue'),
          meta: { title: '我的' }
        },
        {
          path: 'notify',
          component: () => import('@/layout/views/Notify/index.vue'),
          meta: { title: '消息中心' }
        },
        {
          path: 'article',
          component: () => import('@/layout/views/Article/index.vue'),
          meta: { title: '健康百科' }
        }
      ]
    },
    {
      path: '/user/patient',
      component: () => import('@/views/patient-page/index.vue'),
      meta: {
        title: '家庭档案'
      }
    }
  ]
})

const isString = (val: any): val is string => {
  return typeof val === 'string'
}

router.beforeEach((to, form, next) => {
  Nprogress.start()

  const store = useUserStore()
  const whiteList = ['/login']
  // 如果没有登录 而且 不在白名单中 那么就到登录页
  if (!store.user?.token && !whiteList.includes(to.path)) next('/login')

  next()
})

router.afterEach((to) => {
  //建议修改标题放 后置守卫 ，切换路由完成后修改标题
  isString(to.meta.title) ? (document.title = to.meta.title) : (document.title = '优医问诊')
  Nprogress.done()
})

Nprogress.configure({
  // showSpinner: false
})

export default router

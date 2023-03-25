import axios, { type Method } from 'axios'
import { useUserStore } from '@/stores'
import { showFailToast } from 'vant'
import 'vant/es/toast/style'
import router from '@/router'

type Date<T> = {
  data: T
  code: number
  message: string
}

const instance = axios.create({
  baseURL: 'https://consult-api.itheima.net/',
  timeout: 5000
})

instance.interceptors.request.use(
  (req) => {
    const useStore = useUserStore()
    if (useStore.user?.token) {
      req.headers.Authorization = 'Bearer ' + useStore.user.token
    }
    return req
  },
  (err) => {
    Promise.reject(err)
  }
)

instance.interceptors.response.use(
  (res) => {
    // 后台约定, 响应成功, 但是code不是10000, 是业务逻辑错误
    if (res.data.code !== 10000) {
      showFailToast(res.data.message || '业务失败')
      return Promise.reject(res.data)
    }
    return res.data
  },
  (err) => {
    if (err.response.status === 401) {
      const store = useUserStore()
      store.delUser()
      // 跳转到登录页, 带上跳转前页面数据
      router.push({
        path: 'login',
        query: {
          returnUrl: router.currentRoute.value.fullPath
        }
      })
    }
    Promise.reject(err)
  }
)

// 请求工具
export const request = <T>(url: string, method: Method, submitData?: object) => {
  return instance.request<any, Date<T>>({
    url,
    method,
    [method.toLocaleUpperCase() === 'GET' ? 'params' : 'data']: submitData
  })
}

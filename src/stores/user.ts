import { defineStore } from 'pinia'
import type { User } from '@/types/user'
import { ref } from 'vue'

export const useUserStore = defineStore(
  'patient-user',
  () => {
    // 用户信息
    const user = ref<User>()
    // 设置用户信息, 登录使用
    const setUser = (u: User) => {
      user.value = u
    }
    // 清空user, 退出时使用
    const delUser = () => {
      user.value = undefined
    }

    return { user, setUser, delUser }
  },
  {
    persist: true
  }
)

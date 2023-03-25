<script setup lang="ts">
import { getMyUser } from '@/services/user'
import type { UserInfo } from '@/types/user'
import { showConfirmDialog, showToast } from 'vant'
import 'vant/lib/dialog/index.css'
import { ref } from 'vue'
import { useUserStore } from '@/stores/index'
import { useRouter } from 'vue-router'
const store = useUserStore()
// 获取个人信息
const userInfo = ref<UserInfo>()
const getUserInfo = async () => {
  const res = await getMyUser()
  console.log(res)
  userInfo.value = res.data
}

getUserInfo()

const tools = [
  { label: '我的问诊', path: '/user/consult' },
  { label: '我的处方', path: '/' },
  { label: '家庭档案', path: '/user/patient' },
  { label: '地址管理', path: '/user/address' },
  { label: '我的评价', path: '/' },
  { label: '官方客服', path: '/' },
  { label: '设置', path: '/' }
]

const router = useRouter()
const handleLogout = async () => {
  try {
    await showConfirmDialog({
      title: '温馨提示',
      message: '是否确认退出登录'
    })
    store.delUser()
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}
</script>

<template>
  <div class="user-page">
    <div class="user-page-header pt-14">
      <!-- avatar name -->
      <div class="flex items-center px-[15px]">
        <van-image round width="70px" height="70px" src="" class="mr-3" />
        <div class="flex flex-col">
          <div class="font-semibold text-md mb-3">{{ userInfo?.account }}</div>
          <cp-icon name="user-edit" class="cp-icon"></cp-icon>
        </div>
      </div>
      <!-- data -->
      <div class="mt-4">
        <van-row justify="center">
          <van-col span="6">
            <div class="flex flex-col items-center">
              <span class="text-[16px] mb-1 font-semibold">{{ userInfo?.collectionNumber }}</span>
              <span class="text-[12px] text-zinc-500">收藏</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex flex-col items-center">
              <span class="text-[16px] mb-1 font-semibold">{{ userInfo?.likeNumber }}</span>
              <span class="text-[12px] text-zinc-500">关注</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex flex-col items-center">
              <span class="text-[16px] mb-1 font-semibold">{{ userInfo?.score }}</span>
              <span class="text-[12px] text-zinc-500">积分</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex flex-col items-center">
              <span class="text-[16px] mb-1 font-semibold">{{ userInfo?.couponNumber }}</span>
              <span class="text-[12px] text-zinc-500">优惠券</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <!-- order -->
    <div class="shadow-zinc-400 mx-[15px]">
      <div class="bg-white py-[15px] rounded-md">
        <div class="flex justify-between px-[15px]">
          <span class="font-semibold text-[14px]">药品订单</span>
          <span class="text-zinc-400 text-xs">全部订单 <van-icon name="arrow"></van-icon></span>
        </div>
        <van-row justify="center">
          <van-col span="6">
            <div class="flex flex-col items-center text-[26px] pt-4">
              <van-badge :content="userInfo?.orderInfo.paidNumber || ''">
                <cp-icon name="user-paid" class="mb-2"></cp-icon>
              </van-badge>
              <span class="text-xs">待付款</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex flex-col items-center text-[26px] pt-4">
              <van-badge :content="userInfo?.orderInfo.shippedNumber || ''">
                <cp-icon name="user-shipped" class="mb-2"></cp-icon>
              </van-badge>
              <span class="text-xs">待发货</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex flex-col items-center text-[26px] pt-4">
              <van-badge :content="userInfo?.orderInfo.receivedNumber || ''">
                <cp-icon name="user-received" class="mb-2"></cp-icon>
              </van-badge>
              <span class="text-xs">待收货</span>
            </div>
          </van-col>
          <van-col span="6">
            <div class="flex flex-col items-center text-[26px] pt-4">
              <van-badge :content="userInfo?.orderInfo.finishedNumber || ''">
                <cp-icon name="user-finished" class="mb-2"></cp-icon>
              </van-badge>
              <span class="text-xs">已完成</span>
            </div>
          </van-col>
        </van-row>
      </div>
    </div>

    <div class="mt-4">
      <van-cell-group class="mx-[15px]">
        <van-cell>
          <template #title>
            <span class="text-[14px] font-bold">快捷工具</span>
          </template>
        </van-cell>
        <van-cell is-link v-for="(item, index) in tools" :key="index" :to="item.path">
          <template #title>
            <div class="text-[16px] flex items-center">
              <cp-icon :name="`user-tool-0${index + 1}`" class="mr-2"></cp-icon>
              <span class="text-[14px] leading-0">{{ item.label }}</span>
            </div>
          </template>
        </van-cell>
      </van-cell-group>
    </div>

    <a
      href="javascript:;"
      class="logout-btn mx-[15px] my-5 rounded-md flex justify-center items-center h-8 text-white"
      @click="handleLogout"
    >
      退出登录
    </a>
  </div>
</template>

<style lang="scss" scoped>
.user-page {
  background-color: var(--cp-bg);
  padding: 0 0px 65px;
  min-height: calc(100vh - 50px);
  &-header {
    height: 220px;
    background: linear-gradient(180deg, rgba(44, 181, 165, 0.46), rgba(44, 181, 165, 0));
  }

  .cp-icon {
    color: var(--cp-primary);
  }
}

.sdassdas {
  font-size: 20px;
}

.logout-btn {
  background-color: var(--cp-primary);
}
</style>

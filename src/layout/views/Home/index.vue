<script setup lang="ts">
import { ref } from 'vue'

const topNavList = [
  {
    icon: 'doctor',
    title: '问医生',
    subTitle: '按科室问医生'
  },
  {
    icon: 'graphic',
    title: '极速问诊',
    subTitle: '20s医生极速回复'
  },
  {
    icon: 'prescribe',
    title: '开药门诊',
    subTitle: '线上买药更方便'
  }
]
const bottomNavList = [
  {
    icon: 'order',
    title: '药品订单'
  },
  {
    icon: 'docs',
    title: '健康档案'
  },
  {
    icon: 'rp',
    title: '我的处方'
  },
  {
    icon: 'find',
    title: '疾病查询'
  }
]

const active = ref(1)
</script>

<template>
  <div class="home-page">
    <div class="h-28 relative rounded-b-[60px]">
      <div class="header"></div>
      <div class="text-white text-md z-10 absolute left-4 top-4 text-[16px]">艾登特</div>
      <div
        class="flex items-center shadow-lg w-[90%] mx-auto text-zinc-400 text-md p-1 rounded-full pl-5 py-2 absolute bottom-3 left-[50%] translate-x-[-50%] z-10 bg-white"
      >
        <cp-icon name="home-search" class="mr-1 text-[17px]"></cp-icon>
        搜一搜：疾病/症状/医生/健康知识
      </div>
    </div>

    <van-row class="mt-2 mb-4">
      <van-col span="8" v-for="item in topNavList" :key="item.icon">
        <div class="flex flex-col items-center">
          <cp-icon :name="`home-${item.icon}`" class="text-[40px]"></cp-icon>
          <span class="font-bold">{{ item.title }}</span>
          <span class="text-zinc-500 font-semibold text-xs">{{ item.subTitle }}</span>
        </div>
      </van-col>
    </van-row>

    <van-row>
      <van-col span="6" v-for="item in bottomNavList" :key="item.icon">
        <div class="flex flex-col items-center">
          <cp-icon :name="`home-${item.icon}`" class="text-[30px] mb-1"></cp-icon>
          <span class="text-zinc-800 font-semibold text-xs">{{ item.title }} </span>
        </div>
      </van-col>
    </van-row>

    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="item in 2" :key="item" class="p-3">
        <img src="@/assets/ad.png" alt="" />
      </van-swipe-item>
    </van-swipe>

    <van-tabs shrink sticky v-model:active="active">
      <van-tab title="关注" :name="0"> <p v-for="i in 100" :key="i">内容</p></van-tab>
      <van-tab title="推荐" :name="1">内容 2</van-tab>
      <van-tab title="减脂" :name="2">内容 3</van-tab>
      <van-tab title="饮食" :name="3">内容 4</van-tab>
    </van-tabs>
  </div>
</template>

<style lang="scss" scoped>
.header {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 90px;
  background: linear-gradient(180deg, rgba(62, 206, 197, 0.85), #26bcc6);
  border-bottom-left-radius: 150px 20px;
  border-bottom-right-radius: 150px 20px;
  z-index: 0;
}

:deep() {
  .van-tabs {
    &__line {
      width: 18px;
    }
  }

  .van-swipe__indicators {
    bottom: 20px;
  }
}
</style>

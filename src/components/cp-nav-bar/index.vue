<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const props = withDefaults(
  defineProps<{
    title?: string
    rightText?: string
    leftClick?: () => void
  }>(),
  {
    title: '',
    rightText: ''
  }
)

const emit = defineEmits<{ (e: 'click-right'): void }>()
const onClickLeft = () => {
  if (props.leftClick) {
    props.leftClick()
    return
  }

  // 判断历史记录中是否有回退
  if (history.state?.back) {
    router.back()
  } else {
    router.push('/')
  }
}

const onClickRight = () => {
  emit('click-right')
}
</script>

<template>
  <div class="nav-bar-page">
    <van-nav-bar
      :title="title"
      fixed
      :right-text="rightText"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div style="height: 50px"></div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-nav-bar {
    &__text {
      font-size: 18px;
    }
    &__arrow {
      font-size: 18px;
    }
    &__text {
      font-size: 14px;
    }
  }
}
</style>

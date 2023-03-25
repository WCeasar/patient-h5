<script setup lang="ts">
import { ref } from 'vue'
import { mobileRules, passwordRules, codeRules } from '@/utils/rules'
import { loginByPassword, sendMobileCode, loginByMobile } from '@/services/user'
import { useUserStore } from '@/stores'
import { useRoute, useRouter } from 'vue-router'
import { showFailToast, showSuccessToast, type FormInstance, showToast } from 'vant'
import { onUnmounted } from 'vue'
const route = useRoute()
const router = useRouter()

const mobile = ref('13230000001')
const password = ref('abc12345')
const code = ref('')
const show = ref(false)

const isAgree = ref(true)
const store = useUserStore()

// 表单提交
const onSubmit = async () => {
  if (!isAgree.value) {
    return showFailToast('请勾选我同意')
  }

  const res = isPass.value
    ? await loginByPassword(mobile.value, password.value)
    : await loginByMobile(mobile.value, code.value)

  store.setUser(res.data)
  route.query.returnUrl ? router.push(route.query.returnUrl as string) : router.push('/user')
  showSuccessToast('登录成功')
}

// 切换登录
const isPass = ref(true)

const handleCodeLogin = () => {
  isPass.value = !isPass.value
}

// 验证码
const form = ref<FormInstance>()
const time = ref(0)

let timeId: number
// 发送验证码
const send = async () => {
  // 倒计时大于0
  if (time.value > 0) return
  // 手机号验证
  // 验证不通过报错，阻止程序继续执行
  await form.value?.validate('mobile')
  // 发送验证码
  const res = await sendMobileCode(mobile.value, 'login')
  showToast(res.data.code)
  time.value = 60
  // 不管有没有定时器,先清除
  window.clearInterval(timeId)

  timeId = window.setInterval(() => {
    time.value--
    if (time.value <= 0) {
      window.clearInterval(timeId)
    }
  }, 1000)
}

onUnmounted(() => {
  window.clearInterval(timeId)
})
</script>

<template>
  <div class="login-page px-8">
    <cp-nav-bar title="登录" right-text="注册"></cp-nav-bar>
    <!-- title -->
    <div class="mt-8 flex items-center justify-between mb-11">
      <div class="font-semibold text-lg">{{ isPass ? '密码登录' : '短信验证码登录' }}</div>
      <div class="text-[15px]" @click="handleCodeLogin">
        <span>{{ !isPass ? '密码登录' : '短信验证码登录' }}</span>
        <van-icon name="arrow"></van-icon>
      </div>
    </div>

    <!-- field -->
    <van-form @submit="onSubmit" autocomplete="off" ref="form">
      <!-- 手机号 -->
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
        autocomplete="off"
      />
      <!-- 密码 -->
      <van-field
        v-model="password"
        name="password"
        placeholder="请输入密码"
        :rules="passwordRules"
        autocomplete="off"
        :type="show ? 'text' : 'password'"
        v-if="isPass"
      >
        <template #button>
          <cp-icon @click="show = !show" :name="`login-eye-${show ? 'on' : 'off'}`"></cp-icon>
        </template>
      </van-field>
      <!-- 验证码 -->
      <van-field
        v-else
        v-model="code"
        name="验证码"
        placeholder="请输入验证码"
        :rules="codeRules"
        autocomplete="off"
        :type="show ? 'text' : 'password'"
      >
        <template #button>
          <span class="send-code" @click="send" :class="{ 'opacity-50': time > 0 }">
            {{ time > 0 ? `还有${time}秒重新发送` : '发送验证码' }}
          </span>
        </template>
      </van-field>
      <div class="flex items-center my-5 justify-start text-left">
        <van-checkbox v-model="isAgree" class="mr-1 text-left flex justify-start">
          <div>
            我已同意
            <span class="special-text mx-[2px]">用户协议</span>
            及
            <span class="special-text mx-[2px]">隐式协议</span>
          </div>
        </van-checkbox>
      </div>
      <div class="mt-8">
        <!-- 设置native-type="submit"为点击时校验表单 -->
        <van-button round block type="primary" native-type="submit">
          <span>登 录</span>
        </van-button>
      </div>
    </van-form>
    <!-- 忘记密码 -->
    <div class="text-md mt-5">忘记密码?</div>

    <!-- 第三方协议 -->
    <div class="mt-14">
      <van-divider>第三方登录</van-divider>
      <div class="flex justify-center mt-5">
        <img class="w-10" src="@/assets/qq.svg" alt="" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
:deep() {
  .van-cell {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  .van-hairline--top-bottom:after,
  .van-hairline-unset--top-bottom:after {
    border: 0;
  }
}

.special-text {
  color: var(--cp-primary);
}

.send-code {
  color: var(--cp-primary);
  font-size: 12px;
}
</style>

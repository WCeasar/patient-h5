<script setup lang="ts">
import { addPatient, delPatient, editPatient, getPatientList } from '@/services/user'
import type { Patient, PatientList } from '@/types/user'
import { computed } from 'vue'
import { ref } from 'vue'
import { nameRules, idCardRules } from '@/utils/rules'
import { showConfirmDialog, showToast, type FormInstance } from 'vant'
import Validator from 'id-validator'

const patientList = ref<PatientList>([])

const getPatientListData = async () => {
  const res = await getPatientList()
  patientList.value = res.data
}

getPatientListData()

// 添加
const show = ref(false)
const showPopup = (item?: Patient) => {
  if (item?.id) {
    const { id, gender, name, idCard, defaultFlag } = item

    formData.value = { id, gender, name, idCard, defaultFlag }
  } else {
    formData.value = { ...initFormData }
  }

  show.value = true
}

const initFormData: Patient = {
  name: '往往',
  idCard: '110101198307212600',
  gender: 1,
  defaultFlag: 0
}

const formData = ref<Patient>({ ...initFormData })

const options = [
  {
    value: 1,
    label: '男'
  },
  {
    value: 0,
    label: '女'
  }
]

const isComputedDefault = computed({
  get() {
    return formData.value.defaultFlag === 1 ? true : false
  },
  set(newValue) {
    formData.value.defaultFlag = newValue ? 1 : 0
  }
})

const form = ref<FormInstance>()
const submit = async () => {
  await form.value?.validate()

  const validator = new Validator()

  if (!validator.isValid(formData.value.idCard)) {
    return showToast({
      message: '身份证验证不通过'
    })
  }

  if (validator.getInfo(formData.value.idCard).sex !== formData.value.gender) {
    return showToast({
      message: '身份证信息和性别信息验证不通过'
    })
  }
  formData.value.id ? await editPatient(formData.value) : await addPatient(formData.value)
  showToast(formData.value.id ? '患者档案修改成功' : '患者档案添加成功')
  await getPatientListData()
  show.value = false
}

const remove = () => {
  showConfirmDialog({
    title: '温馨提示',
    message: '是否确认'
  })
    .then(async () => {
      // on confirm
      if (formData.value.id) {
        await delPatient(formData.value.id)
        showToast('删除成功')
        show.value = false
        getPatientListData()
      }
    })
    .catch(() => {
      // on cancel
    })
}
</script>

<template>
  <div class="patient-page p-[15px] bg-white">
    <cp-navBar title="家庭档案"></cp-navBar>
    <!-- patient-item -->
    <div
      v-for="item in patientList"
      :key="item.id"
      class="bg-zinc-100 shadow-zinc-50 rounded-lg p-[15px] flex items-center justify-between mb-4"
    >
      <!-- left -->
      <div>
        <!-- top -->
        <div class="mb-3 flex items-center">
          <span
            class="text-md font-semibold mr-1 w-[45px] whitespace-nowrap overflow-hidden text-ellipsis"
            >{{ item.name }}</span
          >
          <span>{{ item.idCard.replace(/^(.{6}).+(.{4})$/, '\$1********\$2') }}</span>
          <van-tag type="primary" class="ml-8" v-if="item.defaultFlag">默认</van-tag>
        </div>
        <!-- bottom -->
        <div class="flex items-center text-zinc-400">
          <span class="text-md mr-4">{{ item.gender === 1 ? '男' : '女' }}</span>
          <span>{{ item.age }}</span>
        </div>
      </div>
      <!-- right -->
      <div class="text-zinc-500">
        <cp-icon name="user-edit" @click="showPopup(item)"></cp-icon>
      </div>
    </div>

    <!-- add patient -->
    <div
      v-if="patientList.length < 6"
      class="bg-zinc-100 shadow-zinc-50 rounded-lg p-[15px] flex flex-col items-center justify-between add-patient"
      @click="showPopup()"
    >
      <cp-icon name="user-add" class="text-lg mb-1"></cp-icon>
      <span>添加患者</span>
    </div>

    <!-- prompt -->
    <div class="text-stroke-emerald-500 mt-3 text-zinc-600">最多可添加6人</div>

    <van-popup v-model:show="show" position="right" :style="{ width: '100%', height: '100%' }">
      <cp-nav-bar
        :leftClick="() => (show = false)"
        :title="formData.id ? '编辑患者' : '添加患者'"
        rightText="提交"
        @click-right="submit()"
      ></cp-nav-bar>
      <van-form autocomplete="off" ref="form">
        <van-field
          v-model="formData.name"
          label="真实姓名"
          placeholder="请输入真实姓名"
          :rules="nameRules"
        />
        <van-field
          label="身份证号"
          :rules="idCardRules"
          v-model="formData.idCard"
          placeholder="请输入身份证号"
        />
        <van-field label="性别">
          <template #input>
            <cp-radio-btn v-model="formData.gender" :options="options"></cp-radio-btn>
          </template>
        </van-field>

        <van-field label="是否默认">
          <template #input>
            <van-checkbox v-model="isComputedDefault"></van-checkbox>
          </template>
        </van-field>
      </van-form>

      <van-action-bar v-if="formData.id">
        <van-action-bar-button @click="remove">删除</van-action-bar-button>
      </van-action-bar>
    </van-popup>
  </div>
</template>

<style lang="scss" scoped>
.add-patient {
  color: var(--cp-primary);
}

// 底部操作栏
.van-action-bar {
  padding: 0 10px;
  margin-bottom: 10px;
  .van-button {
    color: var(--cp-price);
    background-color: var(--cp-bg);
  }
}
</style>

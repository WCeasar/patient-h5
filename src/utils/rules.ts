import type { FieldRule } from 'vant'

// 表单校验
export const mobileRules = [
  { required: true, message: '请输入手机号' },
  {
    pattern: /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/,
    message: '手机号格式不正确'
  }
]

export const passwordRules = [{ required: true, message: '请输入密码' }]

export const codeRules = [
  { required: true, message: '请输入验证码' },
  { pattern: /^\d{6}$/, message: '验证码格式错误' }
]

export const nameRules: FieldRule[] = [
  { required: true, message: '真实姓名不能为空' },
  { pattern: /^(?:[\u4e00-\u9fa5·]{2,16})$/, message: '中文2-16个字符' }
]

export const idCardRules: FieldRule[] = [
  { required: true, message: '身份证号不能为空' },
  {
    pattern: /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/,
    message: '身份证号不正确'
  }
]

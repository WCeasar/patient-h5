import type { CodeType, Patient, PatientList, User, UserInfo } from '@/types/user'
import { request } from '@/utils/request'

/**
 * 密码登录
 * @param mobile 手机号
 * @param password 密码
 * @returns
 */
export const loginByPassword = (mobile: string, password: string) =>
  request<User>('/login/password', 'POST', { mobile, password })

/**
 * 发送验证码
 * @param mobile 手机号
 * @param type 验证码类型
 * @returns
 */
export const sendMobileCode = (mobile: string, type: CodeType) =>
  request<{ code: string }>('/code', 'GET', { mobile, type })

/**
 * 验证码登录
 * @param mobile 手机号
 * @param password 密码
 * @returns
 */
export const loginByMobile = (mobile: string, code: string) =>
  request<User>('/login', 'POST', { mobile, code })

/**
 * 获取个人用户信息
 */
export const getMyUser = () => {
  return request<UserInfo>('/patient/myUser', 'GET')
}

/**
 * 获取患者文档
 */
export const getPatientList = () => {
  return request<PatientList>('/patient/mylist', 'GET')
}

/**
 * 添加患者
 */
export const addPatient = (patient: Patient) => request('/patient/add', 'POST', patient)

/**
 * 编辑患者信息
 */
export const editPatient = (patient: Patient) => request('/patient/update', 'PUT', patient)

/**
 * 删除患者信息
 * @param id 患者id
 * @returns
 */
export const delPatient = (id: string) => request(`/patient/del/${id}`, 'DELETE')

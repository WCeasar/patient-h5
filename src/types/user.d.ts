// 用户信息
export type User = {
  // 用户令牌
  token: string
  // 用户id
  id: string
  // 用户名称
  account: string
  // 用户手机号
  mobile: string
  // 用户头像
  avatar: string
}

// 验证码类型， 登录|注册|修改手机号|忘记密码|绑定手机号
export type CodeType = 'login' | 'register' | 'changeMobile' | 'forgetPassword' | 'bindMobile'

export type UserInfo = Omit<User, 'token'> & {
  // 用户id
  // id: 'string'
  // 头像
  // avatar: 'string'
  // 手机号
  // mobile: 'string'
  // 用户名
  // account: 'string'
  // 关注数量
  likeNumber: number
  // 收藏数量
  collectionNumber: number
  // 我的总积分
  score: number
  // 我的优惠券数量
  couponNumber: number
  // 问诊中信息
  consultationInfo: [
    {
      // 医生id
      id: 'string'
      // 医生姓名
      name: 'string'
      // 医生头像
      avatar: 'string'
      // 科室
      depName: 'string'
      // 职称
      positionalTitles: 'string'
      // 医院名称
      hospitalName: 'string'
      // 医院等级
      gradeName: 'string'
      // 订单id
      orderId: 'string'
    }
  ]
  orderInfo: {
    // 待付款
    paidNumber: number
    // 待发货
    receivedNumber: number
    // 待收货
    shippedNumber: number
    // 已完成
    finishedNumber: number
  }
}

// 家庭档案-患者信息
export type Patient = {
  /** 患者ID */
  id?: string
  /** 患者名称 */
  name: string
  /** 身份证号 */
  idCard: string
  /** 0不默认  1默认 */
  defaultFlag: 0 | 1
  /** 0 女  1 男 */
  gender: 0 | 1
  /** 性别文字 */
  genderValue?: string
  /** 年龄 */
  age?: number
}

// 家庭档案-患者信息列表
export type PatientList = Patient[]

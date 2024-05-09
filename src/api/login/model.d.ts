declare namespace API {
  /** 登录参数 */
  type LoginParams = {
    passwd: string;
    username: string;
    verifyCodeId: string;
    verifyCode?: string;
  };
  /** 修改密码 */
  type UpdatePassParams = {
    oldPassword: string;
    password: string;
    userId: string | undefined;
  };

  /** 登录成功结果 */
  type LoginResult = {
    token: string;
    userInfo: T;
  };

  /** 获取验证码参数 */
  type CaptchaParams = {
    width?: number;
    height?: number;
  };

  /** 获取验证码结果 */
  type CaptchaResult = {
    imageBase64: string;
    uuId: string;
  };
}

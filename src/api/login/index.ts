import { request } from './../../utils/request';
import type { BaseResponse } from './../../utils/request';

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function login(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request<BaseResponse<API.LoginResult>>(
    {
      url: '/hdiFusion/user/login',
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function loginThird(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request<BaseResponse<API.LoginResult>>(
    {
      url: '/hdiFusion/user/login/third',
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}

/**
 * @description 登录
 * @param {LoginParams} data
 * @returns
 */
export function loginOnline(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request(
    {
      url: '/platformService/userOnline/getUserOnlineLogin',
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}
/**
 * @description 获取验证码
 */
export function getImageCaptcha(params?: API.CaptchaParams) {
  return request<API.CaptchaResult>(
    {
      url: '/oauthService/auth/getVerifyCode',
      method: 'get',
      params,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

/**
 * @description 修改密码
 */
export function updatePassword(data: API.UpdatePassParams) {
  return request({
    url: '/platformService/userOnline/updatePassword',
    method: 'post',
    data,
  });
}

/**
 * @description 表结构新增
 */
export function sysProjectTableInsert(data) {
  return request({
    url: '/platformService/sysProjectTable/insert',
    method: 'post',
    data,
  });
}
/**
 * @description 绑定获取二维码
 */
export function getWechatQrCodeByUxId(uxid) {
  return request({
    url: `/oauthService/scanQrCode/getWechatQrCodeByUxId/${uxid}`,
    method: 'get',
  });
}
/**
 * @description 网站变灰
 */
export function getMournData() {
  return request({
    url: `/platformService/basMournDay/getMournData`,
    method: 'get',
  });
}
/**
 * @description 解绑二维码
 */
export function unbind(data) {
  return request({
    url: `/platformService/sys/user/third/rel/unbind`,
    method: 'post',
    data,
  });
}

/**
 * @description 登录获取二维码
 */
export function getWechatQrCode() {
  return request({
    url: `/oauthService/scanQrCode/getWechatQrCode/${import.meta.env.VUE_APP_CODE}`,
    method: 'get',
  });
}
/**
 * @description 登录获取小程序二维码
 */
export function getWechatQrCodeMini() {
  return request({
    url: `/hdiFusion/pcWxScanLogin/miniCode`,
    method: 'get',
  });
}
/**
 * @description 登录获取小程序二维码
 */
export function queryQrcodeMini(qrCodeId) {
  return request({
    url: `/hdiFusion/pcWxScanLogin/queryQrcode/${qrCodeId}`,
    method: 'get',
  });
}
/**
 * @description 验证二维码状态
 */
export function queryScanCodeState(uuid) {
  return request(
    {
      url: `/oauthService/scanQrCode/queryScanCodeState/${uuid}`,
      method: 'get',
    },
    {
      isLoading: false,
    },
  );
}
/**
 * @description 表结构修改
 */
export function updateTableSetting(data) {
  return request({
    url: '/platformService/sysProjectTable/updateTableSetting',
    method: 'post',
    data,
  });
}

/**
 * @description 获取表格结构
 */
export function sysProjectTableTableSetting(data) {
  return request(
    {
      url: '/platformService/sysProjectTable/tableSetting',
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}
//刷新token
export function refresh() {
  return request(
    {
      url: `/hdiFusion/user/refresh`,
      method: 'get',
    },
    {
      isLoading: false,
    },
  );
}

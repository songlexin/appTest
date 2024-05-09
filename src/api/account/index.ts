import { request } from './../../utils/request';
import type { BaseResponse } from './../../utils/request';

export function updateAccountInfo(data: any) {
  return request<BaseResponse<any>>({
    url: 'account/update',
    method: 'post',
    data,
  });
}

export function updatePassword(data: any) {
  return request({
    url: 'account/password',
    method: 'post',
    data,
  });
}

export function getInfo() {
  return request<API.AdminUserInfo>({
    url: 'account/info',
    method: 'get',
  });
}

export function permmenu(userId: string) {
  const data = {
    userId,
    // mgrRangeId,
    // projectCode: import.meta.env.VUE_APP_CODE,
  };
  return request<API.Menu[]>(
    {
      url: '/platformService/sys/user/v2/menu/list',
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: true,
    },
  );
}

export function logout(token: string) {
  return request({
    url: `/oauthService/auth/logout/${token}`,
    method: 'get',
  });
}

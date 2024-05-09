import { request } from './../../../utils/request';

// 获取登录用户管理范围
export function listUserMgrRange(data: any) {
  return request({
    url: '/platformService/userOnline/listUserMgrRangePage',
    method: 'post',
    data,
  });
}
// 切换仓库
export function changeMgrRange(data: any) {
  return request(
    {
      url: '/platformService/userOnline/getUserOnlineLoginWithMgrRange',
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}
// 设为默认
export function updateDefault(id: string) {
  return request(
    {
      url: `/platformService/userOnline/updateUserLoginDefaultRange/${id}`,
      method: 'get',
    },
    {
      isGetDataDirectly: false,
    },
  );
}

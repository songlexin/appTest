import { request } from './../../../utils/request';
/**
 * @description 获取系统配置
 * @param {LoginParams} data
 * @returns
 */
export interface SysConfigResponseModel<T = any> {
  data: T;
  total: number;
  pageSize: number;
  pageNum: number;
}
export function getSysConfig(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/sysConfig/list`,
    method: 'post',
    data,
  });
}
export function getSysConfigByPage(data: any) {
  data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request<SysConfigResponseModel>(
    {
      url: `/platformService/sysConfig/configListVoPage`,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}
export function projectList(data: any) {
  return request<any[]>({
    url: `/platformService/sysProject/projectList`,
    method: 'post',
    data,
  });
}
export function updateById(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/sysConfig/updateById`,
    method: 'post',
    data,
  });
}

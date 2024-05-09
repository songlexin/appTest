import { request } from '@/utils/request';
/**
 * @description 获取系统配置
 * @param {LoginParams} data
 * @returns
 */
// 医院注册
export function hosRegist(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/insertHosRegistInfo`,
    method: 'post',
    data,
  });
}
// 医院审核列表
export function getRegHosList(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/listVoPage`,
    method: 'post',
    data,
  });
}
// 医院审核驳回
export function rejectRegHos(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/updateById`,
    method: 'post',
    data,
  });
}
// 医院审核通过
export function passRegHos(data) {
  // data.queryObject.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/mdmService/companyRegistBill/checkHosRegistInfo`,
    method: 'post',
    data,
  });
}

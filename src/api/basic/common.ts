import { request } from '@/utils/request';

// 省市区选择
export function getAreaList(data) {
  return request({
    url: `/platformService/basic/area/f/v1/tree/down`,
    method: 'post',
    data,
  });
}

// 字典项
export function getDictionary(dictId) {
  return request({
    url: `/platformService/dict/f/getDictionary/${dictId}`,
    method: 'get',
  });
}

//发票详情

export function getInvoiceGoodsDtl(data) {
  return request({
    url: `/aprmsService/ysInvoiceGoodsDtl/list`,
    method: 'post',
    data,
  });
}
//发票详情导出
export function account(data) {
  return request({
    url: `/aprmsService/ysInvoiceGoodsDtl/exp/account`,
    method: 'post',
    data,
    responseType: 'blob',
    timeout: 3600000,
  });
}

export function getCompanyInfoXcTreeWithRange(data) {
  return request({
    url: '/platformService/basic/company/getCompanyInfoXcTreeWithRange',
    method: 'post',
    data: {
      ...data,
      status: '1',
    },
  });
}

// 门户统一登录权限认证
export function bimLogin(code, projectCode) {
  return request({
    url: `/oauthService/auth/bimLogin/${code}/${projectCode}`,
    method: 'get',
  });
}

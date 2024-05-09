import { request } from '@/utils/request';

// 获取企业基本信息
export function getEnterpriseInfo(data) {
  return request<any>({
    url: `/hdiFusion/myInfo/companyInfo/getCompanyInfo/${data.corpId}`,
    method: 'get',
    data,
  });
}

//更新企业基本信息
export function updateEnterpriseInfo(data: API.UpdateDateEnterpriseInfo) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/reportCompanyInfo',
    method: 'post',
    data,
  });
}

// 更新企业职造
export function addProvCerts(data) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/addProvCerts',
    method: 'post',
    data,
  });
}
// 删除企业证照
export function deleteProvCerts(data) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/deleteProvCerts',
    method: 'post',
    data,
  });
}
// 更新企业证照
export function updateProvCerts(data) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/updateProvCerts',
    method: 'post',
    data,
  });
}

// 企业类型转换
// export function comanyTransreq(data) {
//   return Promise.resolve({
//     code: 0,
//     data,
//   });
// }
// ocrImage
export function ocrImage(data) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/ocrImage',
    method: 'post',
    data,
  });
}

// addImage
export function addImage(data) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/addImage',
    method: 'post',
    data,
  });
}
// addImage
export function deleteImage(data) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/deleteImage',
    method: 'post',
    data,
  });
}

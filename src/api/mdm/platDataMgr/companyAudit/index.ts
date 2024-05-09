import { request } from '../../../../utils/request';

export function queryListPage(data) {
  return request({
    url: '/mdmService/companyRegistBill/queryListPage',
    method: 'post',
    data,
  });
}

export function queryAlCompanyRegistInfo(data) {
  return request({
    url: '/mdmService/companyRegistBill/queryAlCompanyRegistInfo',
    method: 'post',
    data,
  });
}

export function unlocked(data) {
  return request({
    url: '/mdmService/companyRegistBill/updateById',
    method: 'post',
    data,
  });
}

export function approved(data) {
  return request({
    url: '/mdmService/companyRegistBill/auditCompanyRegistBill',
    method: 'post',
    data,
  });
}

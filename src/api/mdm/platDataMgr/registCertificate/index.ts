import { request } from '../../../../utils/request';

export function listVoPage(data) {
  return request({
    url: '/mdmService/mdmRegistrationInfo/listVoPage',
    method: 'post',
    data,
  });
}

export function queryMdmComapnyPage(data) {
  return request({
    url: '/mdmService/mdmCompany/queryMdmComapnyPage',
    method: 'post',
    data,
  });
}

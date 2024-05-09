import { request } from '@/utils/request';

export function listVoPage(data) {
  return request({
    url: '/mdmService/mdmCompany/listVoPage',
    method: 'post',
    data,
  });
}

export function registrantFromCompany(data) {
  return request({
    url: '/mdmService/companyRegistBill/registrantFromCompany',
    method: 'post',
    data,
  });
}

export function listVoMdmComPanyPage(data) {
  return request({
    url: '/mdmService/provMfrsInfo/listVoPage',
    method: 'post',
    data,
  });
}

export function inserMdmComPanyPerson(data) {
  return request({
    url: '/mdmService/provMfrsInfo/inserMdmComPanyPerson',
    method: 'post',
    data,
  });
}

export function queryMdmAndProdCompanyPage(data) {
  return request({
    url: '/mdmService/mdmCompany/queryMdmAndProdCompanyPage',
    method: 'post',
    data,
  });
}

export function updateById(data) {
  return request({
    url: '/mdmService/provMfrsInfo/updateById',
    method: 'post',
    data,
  });
}

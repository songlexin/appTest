import { request } from '../../utils/request';

export function saveCompanyRegistBill(data) {
  return request({
    url: '/mdmService/companyRegistBill/insertCompanyRegist',
    method: 'post',
    data,
  });
}

export function mdmCompanyList(data) {
  return request({
    url: '/mdmService/mdmCompany/upCompanyList',
    method: 'post',
    data,
  });
}

export function updateById(data) {
  return request({
    url: '/mdmService/companyRegistBill/updateById',
    method: 'post',
    data,
  });
}

export function getDictValue(data) {
  return request({
    url: '/platformService/dict/f/det',
    method: 'post',
    data,
  });
}

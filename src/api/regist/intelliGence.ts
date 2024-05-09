import { request } from '../../utils/request';

export function saveCompanyRegistCert(data) {
  return request({
    url: '/mdmService/companyRegistCert/insertCompanyRegistCertVO',
    method: 'post',
    data,
  });
}

export function companyRegistCertList(data) {
  return request({
    url: '/mdmService/companyRegistCert/listAll',
    method: 'post',
    data,
  });
}

export function updateCompanyRegistCertVO(data) {
  return request({
    url: '/mdmService/companyRegistCert/updateCompanyRegistCertVO',
    method: 'post',
    data,
  });
}

export function deleteCompanyRegistCertVO(data) {
  return request({
    url: '/mdmService/companyRegistCert/deleteCompanyRegistCertVO',
    method: 'post',
    data,
  });
}

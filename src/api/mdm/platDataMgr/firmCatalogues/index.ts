import { request } from '@/utils/request';

export function queryMdmComapnyPage(data) {
  return request({
    url: '/mdmService/mdmCompany/queryMdmComapnyPage',
    method: 'post',
    data,
  });
}

export function queryMdmCompanyPageWithFusion(data) {
  return request(
    {
      url: '/platformService/basic/company/getCompanyList',
      method: 'post',
      data,
    },
    {
      isLoading: false,
    },
  );
}

import { request } from '@/utils/request';

export function listVoPage(data) {
  return request({
    url: '/mdmService/mdmCompany/listVoPage',
    method: 'post',
    data,
  });
}

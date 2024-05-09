import { request } from '@/utils/request';

export function listVoPage(data) {
  return request({
    url: '/hdiFusion/supplyRelation/listVoPage',
    method: 'post',
    data,
  });
}

export function changeStatus(data) {
  return request({
    url: '/hdiFusion/supplyRelation/changeStatus',
    method: 'post',
    data,
  });
}

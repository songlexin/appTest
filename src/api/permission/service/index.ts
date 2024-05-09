import { request } from '@/utils/request';

// 业务范围列表查询
export function getUserHosList(data) {
  return request<API.UserListPageResult>({
    url: `/hdiFusion/userHos/getHosListsByUserId/${data.userId}`,
    method: 'get',
  });
}
//业务范围批量新增
export function insertList(data) {
  return request<API.UserListPageResult>({
    url: '/hdiFusion/userHos/insertList',
    method: 'post',
    data,
  });
}
//业务范围批量删除
export function deleteByIdList(data) {
  return request<API.UserListPageResult>({
    url: '/hdiFusion/userHos/deleteByIdList',
    method: 'post',
    data,
  });
}

//业务范围统计
export function getUserTotal() {
  return request({
    url: '/hdiFusion/userHos/total',
    method: 'get',
  });
}

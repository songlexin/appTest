import { request } from '@/utils/request';

// 分页查询系统列表
export function getDeptList(data) {
  return request<API.DeptListPageResult>({
    url: '/platformService/sys/org/v2/list/page',
    method: 'post',
    data,
  });
}
// 分页查询系统列表
export function treeDept(data) {
  return request({
    url: '/platformService/sys/org/v2/tree',
    method: 'post',
    data,
  });
}
// 新增
export function saveDept(data: API.CreateDeptParams) {
  return request({
    url: '/platformService/sys/org/v2/save',
    method: 'post',
    data,
  });
}
// 编辑
export function updateDept(data: API.UpdateDeptParams) {
  return request({
    url: '/platformService/sys/org/v2/update',
    method: 'post',
    data,
  });
}

import { request } from '@/utils/request';

// 分页查询系统列表
export function getUserPageList(data) {
  return request<API.UserListPageResult>({
    url: '/platformService/sys/user/v2/list',
    method: 'post',
    data,
  });
}
// 分页查询系统列表
export function getMenuList(data) {
  return request({
    url: '/platformService/sys/user/v2/menu/list',
    method: 'post',
    data,
  });
}
// 新增
export function saveUser(data) {
  return request({
    url: '/platformService/sys/user/v2/save',
    method: 'post',
    data,
  });
}
// 编辑
export function updateById(data) {
  return request({
    url: '/platformService/sys/user/v2/update',
    method: 'post',
    data,
  });
}
// 重置密码
export function resetPassword(userId) {
  return request({
    url: `/platformService/sys/user/v2/reset/pass/${userId}`,
    method: 'GET',
  });
}
// 授权
export function authorizeById(data) {
  return request({
    url: '/platformService/sys/user/v2/grants',
    method: 'post',
    data,
  });
}
// 用户管理范围列表
export function getGrantList(data) {
  return request({
    url: '/platformService/sys/user/v2/grant/list',
    method: 'post',
    data,
  });
}
// 删除
export function deleteById(id) {
  return request({
    url: `/warehouseService/basic/user/logic/delete/${id}`,
    method: 'post',
    data: { id },
  });
}

// 获取用户数据列表-分页
export function v2DataList(data) {
  return request({
    url: '/platformService/sys/user/v2/data/list',
    method: 'post',
    data,
  });
}

// 获取用户数据列表-分页
export function v2Import(data) {
  return request({
    url: '/platformService/sys/user/v2/import',
    method: 'post',
    data,
  });
}

// 清除数据
export function v2ClearData(batchNo) {
  return request({
    url: `/platformService/sys/user/v2/clear/data/${batchNo}`,
    method: 'get',
  });
}

export function branchDeptList(data) {
  return request({
    url: `/platformService/sys/org/v2/list/branchDept`,
    method: 'post',
    data,
  });
}

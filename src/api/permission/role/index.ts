import { request } from '@/utils/request';

export function getRoleList(data) {
  return request({
    url: '/platformService/sys/role/v2/list',
    method: 'post',
    data,
  });
}

//获取角色模板列表
export function getTemplateList(data: any) {
  return request({
    url: `/resourceMgrService/sysr/role/template/list`,
    method: 'post',
    data,
  });
}

//获取角色的所有菜单
export function getMenu(data: any) {
  return request({
    url: `/platformService/sys/role/v2/menu/all`,
    method: 'post',
    data,
  });
}
//保存角色
export function saveRole(data: any) {
  return request({
    url: `/platformService/sys/role/v2/save`,
    method: 'post',
    data,
  });
}
//编辑角色
export function updateRole(data: any) {
  return request({
    url: `/platformService/sys/role/v2/update`,
    method: 'post',
    data,
  });
}

// 保存菜单角色
export function saveRoleMenuBasic(data) {
  return request({
    url: `/platformService/sys/role/v2/menu/batch/save`,
    method: 'post',
    data,
  });
}

//保存角色目录
export function saveRoleMenu(data: any) {
  return request(
    {
      url: `/resourceMgrService/sysr/role/menu/batch/save`,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}
// 批量保存方案菜单
export function schemeBatchSave(data) {
  return request({
    url: '/resourceMgrService/sysr/scheme/v2/menu/batch/save',
    method: 'post',
    data,
  });
}

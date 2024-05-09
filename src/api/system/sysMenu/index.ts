import { request } from './../../../utils/request';

// 分页查询系统列表
export function getSysMenuList(data) {
  return request({
    url: '/platformService/sysPlatformProjectMenu/listVoPage',
    method: 'post',
    data,
  });
}
// 查询父系统列表
export function getParentMenuSysList(data) {
  return request({
    url: '/platformService/sysPlatformProjectMenu/parentMenuListVo',
    method: 'post',
    data,
  });
}
// 查询所属系统列表
export function getParentSysList(data) {
  return request({
    url: '/platformService/sysProject/projectList',
    method: 'post',
    data,
  });
}
// 新增
export function addSysrMenu(data) {
  return request({
    url: '/platformService/sysPlatformProjectMenu/insert',
    method: 'post',
    data,
  });
}
// 编辑
export function updateSysrProjectMenu(data) {
  return request({
    url: '/platformService/sysPlatformProjectMenu/updateById',
    method: 'post',
    data,
  });
}
// 编辑
export function updateSysrProjectMenuState(data) {
  return request({
    url: '/platformService/sysPlatformProjectMenu/updateStateById',
    method: 'post',
    data,
  });
}
// 查询业务主体类型
export function deleteById(data) {
  return request({
    url: `/platformService/sysProject/deleteById/${data}`,
    method: 'DELETE',
  });
}
// 校验Code是否重复
export function checkCodeExist(data) {
  return request({
    url: `/platformService/sysProject/checkCodeExist`,
    method: 'POST',
    data,
  });
}
// 按钮列表
export function btnListPage(data) {
  return request({
    url: `/platformService/sysProjectMenuBtn/listPage`,
    method: 'POST',
    data,
  });
}
// 删除按钮
export function deleteButtonById(data) {
  return request({
    url: `/platformService/sysProjectMenuBtn/deleteById/${data}`,
    method: 'DELETE',
    data,
  });
}
// 更新按钮
export function updateButtonById(data) {
  return request({
    url: `/platformService/sysProjectMenuBtn/updateById`,
    method: 'post',
    data,
  });
}
// 新增按钮
export function insertButtonById(data) {
  return request({
    url: `/platformService/sysProjectMenuBtn/insert`,
    method: 'post',
    data,
  });
}
// 编辑
export function updateProjectMenuButtonState(data) {
  return request({
    url: '/platformService/sysProjectMenuBtn/updateStateById',
    method: 'post',
    data,
  });
}

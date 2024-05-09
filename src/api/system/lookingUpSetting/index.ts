import { request } from './../../../utils/request';

// 分页查询系统列表
export function getSettingList(data) {
  return request({
    url: '/platformService/dict/list/page',
    method: 'post',
    data,
  });
}
// 字典明细列表
export function getDetailList(data) {
  return request({
    url: '/platformService/dict/value/list',
    method: 'post',
    data,
  });
}
// 新增字典信息
export function insertInfo(data) {
  return request({
    url: '/platformService/dict/save',
    method: 'post',
    data,
  });
}
//删除字典信息
export function deleteById(data) {
  return request({
    url: '/platformService/dict/del',
    method: 'post',
    data,
  });
}

//修改字典信息
export function changeInfo(data) {
  return request({
    url: '/platformService/dict/save',
    method: 'post',
    data,
  });
}
// 新增字典详情
export function insertDetail(data) {
  return request({
    url: '/platformService/dict/value/save',
    method: 'post',
    data,
  });
}
//删除字典详情
export function deleteDetail(data) {
  return request({
    url: '/platformService/dict/value/del',
    method: 'post',
    data,
  });
}
// 修改字典详情
export function changeDetail(data) {
  return request({
    url: '/platformService/dict/value/save',
    method: 'post',
    data,
  });
}

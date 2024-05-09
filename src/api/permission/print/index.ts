import { request } from './../../../utils/request';

// 保存sysr_print_head
export function sysrPrintHeadInsert(data) {
  return request({
    url: '/platformService/sysrPrintHead/insert',
    method: 'post',
    data,
  });
}
// 根据id更新sysr_print_head
export function updateById(data) {
  return request({
    url: '/platformService/sysrPrintHead/updateById',
    method: 'post',
    data,
  });
}
// // 删除字典主表
// export function deleteById(data) {
//   return request({
//     url: `/resourceMgrService/sysr/dict/v2/del/${data}`,
//     method: 'post',
//     data,
//   });
// }
// 查询多表sysr_print_head
export function printList(data) {
  return request({
    url: '/platformService/sysrPrintHead/listVo',
    method: 'post',
    data,
  });
}
// 打印明细列表
export function listVoPage(data) {
  return request({
    url: '/platformService/sysrPrint/listVoPage',
    method: 'post',
    data,
  });
}
// 保存打印样式
export function sysrPrintSave(data) {
  return request({
    url: '/platformService/sysrPrint/insert',
    method: 'post',
    data,
  });
}
// 修改打印样式
export function sysrPrintUpdateById(data) {
  return request({
    url: '/platformService/sysrPrint/updateById',
    method: 'post',
    data,
  });
}

import { request } from '@/utils/request';

//分页获取导入任务列表
export function queryImportTasksLst(data) {
  return request({
    url: '/hdiFusion/import/goods/queryImportTasksLst',
    method: 'post',
    data,
  });
}

//产品导入上传excel文件
export function uploadData(data, params) {
  return request(
    {
      url: '/hdiFusion/import/goods/importExcelGoods',
      method: 'post',
      data,
      params,
      headers: { 'Content-Type': 'multipart/form-data' },
      timeout: 3600000,
    },
    {
      isGetDataDirectly: false,
      isLoading: true,
    },
  );
}

//根据任务id导入任务
export function handleImportData(params) {
  return request({
    url: `/hdiFusion/import/goods/handleImportData`,
    method: 'get',
    params,
  });
}

//excel导入获取进度条
export function getHandleImportDataProgress(data) {
  return request({
    url: '/hdiFusion/import/goods/getHandleImportDataProgress',
    method: 'post',
    data,
  });
}
//导出
export function downloadImportGoods(data) {
  return request({
    url: `/hdiFusion/import/goods/downloadImportGoods`,
    method: 'post',
    data,
    responseType: 'blob',
    timeout: 3600000,
  });
}

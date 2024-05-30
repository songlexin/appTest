import { request } from '@/utils/request';
const operateApi = {
  //获取列表数据
  getOperateList(data) {
    return request({
      url: `/aprmsService/ysReportAnalysis/operateReceivePage`,
      method: 'post',
      data,
    });
  },
  // 导出
  operateExportFile(data) {
    return request({
      url: `/aprmsService/ysReportAnalysis/exp/operateReceive`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
  // 部门分类
  //获取列表数据
  getTypeList(data) {
    return request({
      url: `/aprmsService/ysReportAnalysis/operateReceiveTypePage`,
      method: 'post',
      data,
    });
  },
  // 导出
  operateTypeExportFile(data) {
    return request({
      url: `/aprmsService/ysReportAnalysis/exp/operateReceiveType`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
};
export default operateApi;

import { request } from '@/utils/request';
//分页查询合同预警信息
const contractWarnApi = {
  getlistPage(data) {
    return request({
      url: `/hdiFusion/contractWarn/listPage`,
      method: 'post',
      data,
    });
  },
  //费用合同预警信息导出
  exportData(data) {
    return request({
      url: `/hdiFusion/contractWarn/exportData`,
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
};
export default contractWarnApi;

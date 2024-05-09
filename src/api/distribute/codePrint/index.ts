import { request } from '@/utils/request';
const codePrintApi = {
  // 分页查询列表
  queryCodePage(data) {
    return request({
      url: '/hdiFusion/bill/barcode/page',
      method: 'post',
      data,
      timeout: 300000,
    });
  },
  // 记录打印次数
  updatePrintNum(data) {
    return request({
      url: '/hdiFusion/bill/barcode/print',
      method: 'post',
      data,
    });
  },
};
export default codePrintApi;

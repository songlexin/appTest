import { request } from '@/utils/request';
const settlementDetaiSearchApi = {
  //查询医院名称下拉列表
  listVoPage(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listVoPage`,
      method: 'post',
      data,
    });
  },
  //详情
  getDetailByBillId(billId, hosVersion) {
    return request({
      url: `/hdiFusion/fusionOutBalance/getDetailByBillId/${billId}/${hosVersion}`,
      method: 'get',
    });
  },
  //详情列表
  getDetailByBillIdPage(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/getDetailByBillIdPage`,
      method: 'post',
      data,
    });
  },

  //查询医院名称下拉列表
  listPageExport(data) {
    return request({
      url: `/hdiFusion/fusionOutBalance/listPageExport`,
      method: 'post',
      responseType: 'blob',
      data,
    });
  },
};
export default settlementDetaiSearchApi;

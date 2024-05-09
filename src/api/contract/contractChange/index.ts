import { request } from '@/utils/request';
const contractChangeApi = {
  contractChangePage(data) {
    return request({
      url: `/hdiFusion/contractChangeMain/listPage`,
      method: 'post',
      data,
    });
  },
  //根据id获取合同变更单
  getInfo(id) {
    return request({
      url: `/hdiFusion/contractChangeMain/getDetailById/${id}`,
      method: 'get',
    });
  },
  //根据id获取合同变更单明细列表
  getDetailList(id) {
    return request({
      url: `/hdiOrder/contract/change/detail/list/${id}`,
      method: 'get',
    });
  },
  //单据保存
  save(data) {
    return request({
      url: `/hdiFusion/contractChangeMain/add`,
      method: 'post',
      data,
    });
  },
  //单据提交
  update(data) {
    return request({
      url: `
/hdiFusion/contractChangeMain/update`,
      method: 'post',
      data,
    });
  },
  //单据删除
  deleteBill(data) {
    return request({
      url: `/hdiFusion/contractChangeMain/delete`,
      method: 'post',
      data,
    });
  },
  //更新变更合同（批量提交-审核）
  updateBatch(data) {
    return request({
      url: `/hdiFusion/contractChangeMain/updateBatch`,
      method: 'post',
      data,
    });
  },
  //单据通过
  reject(data) {
    return request({
      url: `/hdiOrder/contract/change/bill/reject`,
      method: 'post',
      data,
    });
  },
};
export default contractChangeApi;

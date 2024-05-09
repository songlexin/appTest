import { request } from '@/utils/request';
const contractMaintenanceApi = {
  contractlistPage(data) {
    return request({
      url: `/hdiFusion/contract/listPage`,
      method: 'post',
      data,
    });
  },
  //根据id查询费用合同详情
  getDetailById(id) {
    return request({
      url: `/hdiFusion/contract/getContractDetailById/${id}`,
      method: 'get',
    });
  },
  //根据id更新费用合同
  updateById(data) {
    return request({
      url: `/hdiFusion/contract/update`,
      method: 'post',
      data,
    });
  },
  //根据合同id分页查询费用合同明细
  supplyRelationship(data) {
    return request({
      url: `/hdiFusion/contractList/listPage`,
      method: 'post',
      data,
    });
  },
  //分页查询存在供货关系的产品
  getSupplyList(data) {
    return request({
      url: `/hdiFusion/supplyProvHosGoods/getProvHosGoodsPage`,
      method: 'post',
      data,
    });
  },
  //添加特例产品
  insertBatch(data) {
    return request({
      url: `/hdiFusion/contractList/addBatch`,
      method: 'post',
      data,
    });
  },
  //批量删除费用合同明细
  deleteBatch(data) {
    return request({
      url: `/hdiFusion/contractList/delBatch`,
      method: 'post',
      data,
    });
  },
  //删除
  deleteContract(data) {
    return request({
      url: `/hdiFusion/contract/delete`,
      method: 'post',
      data,
    });
  },
  //保存费用合同
  save(data) {
    return request({
      url: `/hdiFusion/contract/add`,
      method: 'post',
      data,
    });
  },
  //根据明细id更新费用合同明细
  updateDetailById(data) {
    return request({
      url: `/hdiFusion/contractList/updateBatch`,
      method: 'post',
      data,
    });
  },
  //根据合同id查询所有费用合同明细
  listAllDetail(id) {
    return request({
      url: `/hdiOrder/hdiContract/listAllDetail/${id}`,
      method: 'get',
    });
  },
  //续签费用合同
  renewContract(data) {
    return request({
      url: `/hdiFusion/contract/renewContract`,
      method: 'post',
      data,
    });
  },
  //获取二级商的一级商信息
  listProvInfoBySubProv(data) {
    return request({
      url: `/hdiFusion/supplyRelation/getProvInfoList`,
      method: 'post',
      data,
    });
  },
  //分页查询厂商目录Page
  listProvInfoVoPage(data) {
    return request({
      url: `/hdiFusion/supplyRelation/listProvInfoVoPage`,
      method: 'post',
      data,
    });
  },
};
export default contractMaintenanceApi;

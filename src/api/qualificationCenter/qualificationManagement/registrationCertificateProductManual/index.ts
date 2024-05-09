import { request } from '@/utils/request';
const registSpecification = {
  // 医院
  getHosProvList(params) {
    return request({
      url: `/mdqcService/mytask/audit/getHosProvList`,
      method: 'get',
      params,
    });
  },
  // 生产厂家
  getMfrsByHosId(data) {
    return request({
      url: `/hdiFusion/mcmsRegistration/getMfrsByHosId`,
      method: 'post',
      data,
    });
  },
  // 查询列表
  manualListByPage(data) {
    return request({
      url: `/hdiFusion/mcmsRegistration/manualListByPage`,
      method: 'post',
      data,
    });
  },
  // 查看信息查询列表
  getHosGoodsById(data) {
    return request({
      url: `/hdiFusion/mcmsRegistration/getHosGoodsById`,
      method: 'post',
      data,
    });
  },
  // 上传附件保存接口
  handleManual(data) {
    return request({
      url: `/hdiFusion/mcmsRegistration/handleManual`,
      method: 'post',
      data,
    });
  },
  // 导入结果查询列表
  importGoodsManual(data) {
    return request(
      {
        url: '/hdiFusion/mcmsRegistration/importGoodsManual',
        method: 'post',
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 3600000,
      },
      {
        isGetDataDirectly: false,
        isLoading: true,
      },
    );
  },
  //excel导入获取进度条
  getHandleImportDataProgress(data) {
    return request({
      url: '/hdiFusion/mcmsRegistration/getHandleGoodsManualImportProgress',
      method: 'post',
      data,
    });
  },
  // 导入结果查询列表
  getImportDataResult(data) {
    return request({
      url: `/hdiFusion/mcmsRegistration/getImportDataResult`,
      method: 'post',
      data,
    });
  },
};
export default registSpecification;

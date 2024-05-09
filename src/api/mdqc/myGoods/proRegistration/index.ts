import { request } from '@/utils/request';
const proRegistrationApi = {
  getProvCertById(data) {
    return request({
      url: '/hdiFusion/prov/provRegistration/getProvCertById',
      method: 'post',
      data,
    });
  },
  getProvCertGoodsById(data) {
    return request({
      url: '/hdiFusion/prov/provRegistration/getProvCertGoodsById',
      method: 'post',
      data,
    });
  },

  // 厂家名称下拉

  getMfrsListInProvGoods(params) {
    return request({
      url: '/hdiFusion/prov/provRegistration/getMfrsListInProvGoods',
      method: 'get',
      params,
    });
  },
  // 证件类别下拉
  getDict(params) {
    return request({
      url: '/hdiFusion/prov/provRegistration/getDict',
      method: 'get',
      params,
    });
  },
  // 子页面删除
  delProvCertGood(data) {
    return request({
      url: '/hdiFusion/prov/pprovRegistration/delProvCertGood',
      method: 'post',
      data,
    });
  },
  // 批量删除
  batchDelProvCertGood(data) {
    return request({
      url: '/hdiFusion/prov/provRegistration/batchDelProvCertGood',
      method: 'post',
      data,
    });
  },
  // 关联产品查询列表
  getMfrsProductList(data) {
    return request({
      url: '/hdiFusion/prov/provRegistration/getHosMfrsProduct',
      method: 'post',
      data,
    });
  },

  //获取系统配置，修改指定医院配置
  sysConfigList(data) {
    return request({
      url: '/hdiFusion/sys/config/sysConfigList',
      method: 'post',
      data,
    });
  },
  // 查看产品列表
  getProvGoodsUpdateLogSubs(data) {
    return request({
      url: '/hdiFusion/mytask/provGoodsUpdateLogSub/getProvGoodsUpdateLogSubs',
      method: 'post',
      data,
    });
  },
  // 注册证主页面删除
  delReg(data) {
    return request({
      url: '/hdiFusion/prov/provRegistration/delReg',
      method: 'post',
      data,
    });
  },
  // 停用或者启用
  disableOrEnable(data) {
    return request({
      url: '/hdiFusion/prov/provRegistration/disableOrEnable',
      method: 'post',
      data,
    });
  },
};
export default proRegistrationApi;

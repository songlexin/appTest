import { request } from '@/utils/request';

const commonApi = {
  // 获取字典
  dictList(data) {
    return request({
      url: `/platformService/dict/value/list`,
      method: 'post',
      data,
    });
  },
  //用户菜单权限校验
  permissionMenuId(menuId) {
    return request(
      {
        url: `/platformService/sys/user/v2/permission/${menuId}`,
        method: 'get',
      },
      {
        isLoading: false,
      },
    );
  },
  //获取枚举字典
  getRecTypeList(data) {
    return request({
      url: `/hdiOrder/enum/list/${data.name}`,
      method: 'get',
      // params: data,
    });
  },
  //获取枚举字典Map
  getStockLevelEnum(data) {
    return request({
      url: `/herpService/enum/map/${data.name}`,
      method: 'get',
      // params: data,
    });
  },
  // 字典查询map接口 table 详情中映射
  enumMap(params) {
    return request({
      url: `/herpService/enum/map/${params.name}`,
      method: 'get',
      params,
    });
  },

  // 获取进度
  getProgressInfo(id) {
    return request(
      {
        url: `/platformService/basic/progress/${id}`,
        method: 'get',
      },
      {
        isLoading: false,
      },
    );
  },
  // 根据产品id查询供应关系
  mcmsGoodsSubProvList(data) {
    return request(
      {
        url: `/herpService/basic/mcmsGoodsInfo/subProvList`,
        method: 'post',
        data,
      },
      {
        isLoading: false,
      },
    );
  },
  //查询库房库区信息
  stockInfoOut(data) {
    return request({
      url: `/herpService/dept/stock/out/stockInfo?pickType=${data.pickType}`,
      method: 'post',
      data,
    });
  },
  // 查询医院列表
  getHosList(params) {
    return request({
      url: '/hdiFusion/agreement/getHosList',
      method: 'get',
      params,
    });
  },
  //查询供应相关的医院列表
  getSupplyHosList(params) {
    return request({
      url: '/hdiFusion/supplyRelation/getSupplyHosList',
      method: 'post',
      data: params,
    });
  },
  //文件上传
  uploadData(data) {
    return request(
      {
        url: '/platformService/upload/v2',
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
  //查询未备货产品
  getProvHosGoodsPage(params) {
    return request({
      url: `/hdiFusion/supplyProvHosGoods/getProvHosGoodsPage`,
      method: 'post',
      data: params,
    });
  },

  // 查询系统全局企业信息
  getProvInfoList(data) {
    return request(
      {
        url: '/hdiFusion/attorney/getProvInfoList',
        method: 'post',
        data,
      },
      { isLoading: false },
    );
  },
  //查询mqtt
  getMqttConfig() {
    return request({
      url: '/platformService/basic/config/mqtt',
      method: 'get',
    });
  },
};

export default commonApi;

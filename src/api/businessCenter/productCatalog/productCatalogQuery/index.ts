import { request } from '@/utils/request';

const productCatalogQueryApi = {
  // 查询供应商列表
  newBasProvInfoList(data) {
    return request({
      url: '/hdiFusion/hosGoodsInfo/newBasProvInfoList',
      method: 'post',
      data,
    });
  },

  getHosGoodsList(data) {
    return request({
      url: '/hdiFusion/hosGoodsInfo/listByPage',
      method: 'post',
      data,
    });
  },

  //查询证照
  getGoodsAllCertById(data) {
    return request({
      url: '/hdiFusion/hosGoodsInfo/getGoodsAllCertById',
      method: 'post',
      data,
    });
  },
  //导出
  downloadHosGoods(data) {
    return request({
      url: '/hdiFusion/hosGoodsInfo/newDownloadHosGoods',
      method: 'post',
      data,
      responseType: 'blob',
      timeout: 3600000,
    });
  },
};

export default productCatalogQueryApi;

import { request } from '@/utils/request';
const barCoderApi = {
  // 扫码检测接口
  barCodeAnalyse(data) {
    return request({
      url: '/hdiFusion/baseData/basBarcode/barCodeAnalyseSimplify',
      method: 'post',
      data,
    });
  },
  // 扫码
  codeAnalyse(data) {
    return request({
      url: '/hdiFusion/baseData/basBarcode/codeAnalyse',
      method: 'post',
      data,
    });
  },
  getHosGood(data) {
    return request({
      url: '/hdiFusion/goods/myGoods/hosGoods/getHosGoodsByPage',
      method: 'post',
      data,
    });
  },
  //
};

export default barCoderApi;

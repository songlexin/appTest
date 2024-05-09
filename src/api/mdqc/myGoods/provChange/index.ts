import { request } from '@/utils/request';

const provChangeApi = {
  /**
   * 获取转配送分页查询列表
   */
  getProvChangeBillList(data: any) {
    return request({
      url: '/hdiFusion/myGoods/provChange/getProvChangeBillList',
      method: 'post',
      data,
    });
  },

  /**
   * 获取供应商列表
   */
  getHosProvInfoVoList() {
    return request({
      url: '/hdiFusion/myGoods/provChange/hosProvInfoVoList',
      method: 'get',
    });
  },

  /**
   * 新增转配送单
   */
  addProvChangeBill(data: any) {
    return request({
      url: '/hdiFusion/myGoods/provChange/add',
      method: 'post',
      data,
    });
  },

  /**
   * 编辑更新转配送单
   */
  updateProvChangeBill(data: any) {
    return request({
      url: '/hdiFusion/myGoods/provChange/update',
      method: 'post',
      data,
    });
  },
  /**
   * 删除转配送单
   */
  deleteProvChangeBill(data: any) {
    return request({
      url: '/hdiFusion/myGoods/provChange/delete',
      method: 'post',
      data,
    });
  },

  /**
   * 获取医院供应商产品列表
   */
  getProvGoodsList(data: any) {
    return request(
      {
        url: '/hdiFusion/myGoods/provChange/getProvGoodsList',
        method: 'post',
        data,
      },
      {
        isLoading: false,
      },
    );
  },
  /**
   * 查询变更产品列表详情
   */
  getProvChangeGoodList(id: string) {
    return request({
      url: `/hdiFusion/myGoods/provChange/getProvChangeGoodList/${id}`,
      method: 'get',
    });
  },
  /**
   * 附件管理
   */
  uploadAttachment(data) {
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
};

export default provChangeApi;

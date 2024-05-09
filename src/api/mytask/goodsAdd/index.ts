import { request } from '@/utils/request';

// 查询产品新增列表
export function getGoodsHandleInfos(data) {
  return request({
    url: `/hdiFusion/agreement/getGoodsHandleInfos`,
    method: 'get',
    data,
  });
}

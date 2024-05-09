import { request } from './../../../utils/request';

// 分页查询系统列表
export function getSysCorpList(data) {
  return request({
    url: '/platformService/sysCorp/listPage',
    method: 'post',
    data,
  });
}

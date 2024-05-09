import { request } from './../../../utils/request';

// 分页查询机构列表
export function getSysOrgTree(data) {
  return request({
    url: '/platformService/sysOrg/listTree',
    method: 'post',
    data,
  });
}

export function getSysOrgByid(id) {
  const encodeId = encodeURI(id);
  return request({
    url: `/platformService/sysOrg/getById/${encodeId}`,
    method: 'get',
  });
}

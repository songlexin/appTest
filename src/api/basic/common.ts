import { request } from '@/utils/request';
import { getUserId } from '@/utils/authUtil';

// 省市区选择
export function getAreaList(pid) {
  return request({
    url: `/platformService/basic/area/list/${pid}`,
    method: 'get',
  });
}

// 医院客户目录
export async function getHosList() {
  const userId = getUserId();
  const key = `${import.meta.env.VUE_APP_CODE}_USER_HOS_${userId}`;
  let hosStr = sessionStorage.getItem(key);
  if (hosStr == null) {
    const data = await request({
      url: `/hdiFusion/userHos/listByUserId/${userId}`,
      method: 'get',
    });
    sessionStorage.setItem(key, JSON.stringify(data));
    return data;
  } else {
    return JSON.parse(hosStr);
  }
}

export const hosFilterOption = (input: string, option: any) => {
  return option.hosName.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};

// 厂商客户目录
export function getProvList(name?: string, provId?: string, hosdId?: string) {
  const data = {
    pageNum: 1,
    pageSize: 200,
    queryObject: {
      provName: name ? name : '',
      provId: provId ? provId : '',
      hosdId: hosdId ? hosdId : '',
    },
  };
  return request({
    url: `/mdmService/supplyRelation/listProvInfoVoPage`,
    method: 'post',
    data,
  });
}

// 字典项
export function getDictionary(dictId) {
  return request({
    url: `/platformService/dict/f/getDictionary/${dictId}`,
    method: 'get',
  });
}

//hdifusion 版本的查询字典服务
export function getDictValueByDictEname(dictName: string) {
  return request({
    url: '/hdiFusion/myInfo/companyInfo/sys/dict/getDictValueByDictEname',
    method: 'post',
    data: {
      dictName,
    },
  });
}

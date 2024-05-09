import { request } from '@/utils/request';

//常用功能
function getMenuCardList(data: any) {
  return request({
    url: `/hdiFusion/portal/get/card`,
    method: 'post',
    data,
  });
}

//获取常用功能列表
function getMenuUseList(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/sys/comm/list`,
    method: 'post',
    data,
  });
}
//当前用户下的菜单列表下拉选择
function getCommSelList(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request({
    url: `/platformService/sys/comm/cur/user/menu`,
    method: 'post',
    data,
  });
}
//保存常用功能
function saveCommMenu(data: any) {
  data.projectCode = import.meta.env.VUE_APP_CODE;
  return request(
    {
      url: `/platformService/sys/comm/save`,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}
//删除常用功能
function delCommMenu(data: any) {
  return request(
    {
      url: `/platformService/sys/comm/del`,
      method: 'post',
      data,
    },
    {
      isGetDataDirectly: false,
    },
  );
}

//系统公告
//获取公告数据
function getNoticeList(data: any) {
  return request({
    url: `/platformService/sys/message/notice/page`,
    method: 'post',
    data,
  });
}

export function getNoticeContent(data) {
  return request({
    url: `/platformService/basic/notice/detail/${data}`,
    method: 'get',
  });
}

export function getNoticeMessage(data) {
  return request({
    url: `/platformService/sys/message/readNotice`,
    method: 'post',
    data,
  });
}

//待办事项
//获取待办tab
function getWorkTotal(data: any) {
  return request({
    url: `/platformService/sys/work/common/total`,
    method: 'post',
    headers: {
      'X-APP-CODE': 'hdi.pc',
    },
    data,
  });
}
//获取待办事项list
function getWorkList(data: any) {
  return request({
    url: `/platformService/sys/work/list`,
    method: 'post',
    data,
  });
}

function getAllCardInfo() {
  return request({
    url: `/hdiOrder/portal/card/getAllCardInfo`,
    method: 'post',
    data: {
      appCode: 'hdi.pc',
    },
  });
}
//查询-指标数据更新时间
function lastUpdateTime() {
  return request({
    url: `/hdiFusion/portal/card/lastUpdateTime`,
    method: 'get',
  });
}
//更新-首页卡片数据
function statistic() {
  return request({
    url: `/hdiFusion/portal/card/statistic`,
    method: 'get',
  });
}
function getSelectHost() {
  return request({
    url: `/hdiFusion/portal/get/select`,
    method: 'get',
  });
}
function listByUserId(userId) {
  return request({
    url: `/hdiFusion/userHos/listByUserId/${userId}`,
    method: 'get',
  });
}

export default {
  getMenuCardList,
  delCommMenu,
  saveCommMenu,
  getCommSelList,
  getMenuUseList,
  getNoticeList,
  getNoticeContent,
  getWorkTotal,
  getWorkList,
  getAllCardInfo,
  lastUpdateTime,
  statistic,
  getSelectHost,
  listByUserId,
  getNoticeMessage,
};

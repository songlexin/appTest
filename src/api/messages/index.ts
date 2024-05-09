import { request } from '../../utils/request';
const messages = {
  // 消息列表-分页
  getMesList(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/list/page',
      method: 'post',
      data,
    });
  },
  // 删除消息
  readMes(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/read',
      method: 'post',
      data,
    });
  },
  // 标记已读消息
  deleteMes(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/delete',
      method: 'post',
      data,
    });
  },
  //获取未读消息总数
  getUnReadCoun() {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/unReadCount',
      method: 'get',
    });
  },
  //读消息
  readMsg(id) {
    return request<API.UserListPageResult>({
      url: `/platformService/sys/message/detail/${id}`,
      method: 'get',
    });
  },
  //获取消息类型列表
  getMessageTypeList() {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/messageTypeList',
      method: 'get',
    });
  },
  //获取消息接收设置表头
  channelTypeList() {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/rule/channelTypeList',
      method: 'get',
    });
  },
  //获取消息接收设置数据
  ruleTypeList() {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/rule/type',
      method: 'get',
    });
  },
  //获取消息通知模板列表数据
  listVoPage(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/template/listVoPage',
      method: 'post',
      data,
    });
  },
  // 添加消息模板
  saveTem(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/template/save',
      method: 'post',
      data,
    });
  },
  // 编辑消息模板
  updateById(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/template/updateById',
      method: 'post',
      data,
    });
  },
  //根据id删除消息模板
  deleteById(id) {
    return request<API.UserListPageResult>({
      url: `/platformService/sys/message/template/deleteById/${id}`,
      method: 'delete',
    });
  },
  //消息类型 树形结构
  typeTree(corpId) {
    return request<API.UserListPageResult>({
      url: `/platformService/sys/message/template/tree/${corpId}`,
      method: 'get',
    });
  },
  //新增修改消息类型
  saveType(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/template/saveType',
      method: 'post',
      data,
    });
  },
  updateRule(data) {
    return request<API.UserListPageResult>({
      url: '/platformService/sys/message/rule/update',
      method: 'post',
      data,
    });
  },
};
export default messages;

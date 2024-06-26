import { WsAxios } from './WsAxios';

/**
 * @description 将websocket封装成类似axios的用法
 * @type {WsAxios}
 */
const wsAxios = new WsAxios({
  url: import.meta.env.VUE_APP_WEBSOCKET_API,
  time: 6000,
  ping: () => ({
    source: 'h5',
    userid: sessionStorage.getItem('yzkf_userid'),
    ts: new Date().getTime(),
    data: { upcmd: 'ping' },
  }),
});
// websocket请求拦截
wsAxios.intercepts.request((params) => {
  return params;
});
// websocket响应拦截
wsAxios.intercepts.response((response) => {
  return response;
});

export default wsAxios;

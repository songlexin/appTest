import mqtt from 'mqtt';
import { getUserId } from './authUtil';
class Createds {
  static url; //mqtt地址
  static oldSubscribe; //取消订阅准备
  static subscribe; //订阅地址 ‘message/user/’+ 用户id
  static client; //mqtt公共变量
  static options; //mqtt公共变量
  constructor(url, options) {
    const userId = getUserId();
    this.subscribe = `message/user/${userId}`;
    this.url = url;
    this.options = options;
  }

  //初始化mqtt
  init() {
    const options = {
      clean: true, // true: 清除会话, false: 保留会话
      connectTimeout: 4000, // 超时时间
      keepalive: 10, // 设置心跳时间
      reconnectPeriod: 20 * 1000, //重连时间
      port: this.options.port,
      username: this.options.username,
      password: this.options.password,
    };
    try {
      this.client = mqtt.connect(this.url, options);
      this.client.on('error', (err) => {
        console.log(err);
      });
      this.client.on('reconnect', () => {});
    } catch (err) {}
  }
  //取消订阅
  unsubscribes() {
    try {
      this.client.unsubscribe(this.subscribe, () => {
        // if (!error) {
        // } else {
        // }
      });
    } catch (err) {}
  }
  //结束链接
  over() {
    try {
      this.client.end();
    } catch (err) {}
  }
  //链接
  link() {
    try {
      this.client.on('connect', (msg) => {
        console.log(msg);
        this.client.subscribe(this.subscribe, () => {
          //在js代码中最简单的抛出异常方法
          // if (!error) {
          // } else {
          // }
        });
      });
    } catch (err) {}
  }
  //收到的消息
  get() {
    try {
      this.client.on('message', () => {});
    } catch (err) {}
  }
  //结束链接
  // over() {
  //   this.client.end();
  // }
}
export default Createds;

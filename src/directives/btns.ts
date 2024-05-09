// import type { App } from 'vue';
import { Storage } from './../utils/Storage';

/**
 * 注册全局自定义指令--按钮是否显示
 * 1.服务端返回唯一btnCode或all(表示全部显示)
 * 2.<a-button type="primary" v-has="`databaseExecute`" ghost @click="showPage('dataBase')">数据处理</a-button>
 * @param app
 */
const permissions = Storage.get('SYS_BTNS') || [];
export const has = {
  mounted(el, binding) {
    const value = binding.value;
    let flag = false;
    permissions.forEach((item) => {
      if (item.btnCode == value || item.btnCode == 'all') {
        flag = true;
      }
    });
    if (!flag) {
      el.parentNode && el.parentNode.removeChild(el);
    }
  },
};
// export function directivesBtn(app: App) {
//   app.directive('has', {});
// }

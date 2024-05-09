// 导入组件，组件必须声明 name
import xcPrioritySpan from './index.vue';
// 为组件提供 install 安装方法，供按需引入
xcPrioritySpan.install = function (Vue) {
  Vue.component(xcPrioritySpan.name, xcPrioritySpan);
};
// 导出组件
export default xcPrioritySpan;

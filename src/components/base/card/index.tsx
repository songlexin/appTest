import card from './cardIndex.vue';
import title from './title.vue';
import tableTitle from './tableTitle.vue';
import footer from './footer.vue';
import splitLine from './splitLine.vue';
import container from './container.vue';
import reset from './resetContainer.vue';

// card 整个
export default Object.assign(card, {
  title, // 加前缀 标题  距离底部16px
  footer, // 按钮
  tableTitle, // 用于表格 加前缀 标题  距离底部16px
  splitLine, // 分割线
  container, // 内容 padding 16px
  reset,
});

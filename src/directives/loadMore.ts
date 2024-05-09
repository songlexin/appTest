// import { onUnmounted } from 'vue';
/**
 * @param app
 */
import { nextTick } from 'vue';
export const loadMore = {
  mounted(el, binding) {
    let bindTime = null as any;
    clearTimeout(bindTime);
    bindTime = setTimeout(async () => {
      await nextTick();
      let dom = el.querySelector(binding.value.domClass || '.ant-spin-container');
      let lastScrollTop = 0;
      dom.addEventListener('scroll', function () {
        const bottom = 5;
        if (lastScrollTop !== dom.scrollTop) {
          lastScrollTop = dom.scrollTop;
          const scrollDistance = dom.scrollHeight - dom.scrollTop - dom.clientHeight;
          if (scrollDistance <= bottom) {
            binding.value.value(); // 如果距离底部小于或者等于20，直接运行这个指令绑定的方法
          }
        }
      });
    }, 400);
  },
  // onUnmounted(el, binding) {
  //   let dom = el.querySelector('.ant-spin-container');
  //   dom.rem
  // }
};
// export function directivesBtn(app: App) {
//   app.directive('has', {});
// }

import { ObjectDirective } from 'vue';

let resizeObserver: ResizeObserver;
export const vStickyAdd: ObjectDirective = {
  // updated(el: HTMLDivElement, _binding) {
  //   /**
  //    * el：指令绑定到的元素
  //    * binding：一个对象 { value,oldValue,arg,modifiers,instance,dir }
  //    *
  //    * 自定义指令参数可参考：https://cn.vuejs.org/guide/reusability/custom-directives.html#hook-arguments
  //    */
  // },

  mounted(el: HTMLElement) {
    const tfootEl = el.parentElement as HTMLElement;
    const tableBodyEl = tfootEl.parentElement?.parentElement as HTMLElement;
    const tdEl = tfootEl.querySelector('tr td') as HTMLElement;
    const stickyEl = tdEl.firstElementChild as HTMLElement;
    // 部分样式覆写
    if (tfootEl) {
      tfootEl.setAttribute('style', `z-index:0;`);
    }
    if (tdEl) {
      tdEl.setAttribute('style', `padding-left:0;padding-right:0;`);
    }

    // 元素边界尺寸变化后触发
    resizeObserver = new ResizeObserver(async () => {
      const width = tableBodyEl.clientWidth;
      stickyEl.setAttribute('style', `width:${width}px !important;position: sticky;left: 0px;`);
    });

    if (tableBodyEl) {
      // 监听元素边界尺寸变化
      resizeObserver.observe(tableBodyEl);
    }
  },
  unmounted(el: HTMLElement) {
    const tfootEl = el.parentElement as HTMLElement;
    const tableBodyEl = tfootEl.parentElement?.parentElement as HTMLElement;
    // 取消监听元素
    tableBodyEl && resizeObserver.unobserve(tableBodyEl);
  },
};

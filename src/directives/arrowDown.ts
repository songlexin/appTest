import { ObjectDirective } from 'vue';

/**
 * 替换下拉选单icon
 */
function replaceArrowDownIcon(el: HTMLElement) {
  /* 图标元素 */
  const iconContainer = el.querySelector('.ant-select-arrow') as HTMLElement;
  if (iconContainer) {
    iconContainer.classList.add('_arrow-down');
    const icon = document.createElement('i');
    icon.classList.add('iconfont', 'icon-icon_arrow_down');
    iconContainer.appendChild(icon);
  }
}

export const vArrowDown: ObjectDirective = {
  beforeMount(el: HTMLElement) {
    // transfer穿梭框
    if (el.classList.contains('ant-transfer')) {
      const iconContainers = el.querySelectorAll(
        '.ant-transfer-list-header',
      ) as NodeListOf<HTMLElement>;
      iconContainers.forEach((iconContainer) => {
        iconContainer.classList.add('_arrow-down-container');
        /* 图标元素 */
        const iconEl = iconContainer.querySelector('.anticon-down') as HTMLElement;
        iconEl.classList.add('_arrow-down');
        const icon = document.createElement('i');
        icon.classList.add('iconfont', 'icon-icon_arrow_down');
        icon.setAttribute('style', `padding-top:1px;`);
        iconEl.appendChild(icon);
      });
    }
    // select选择器
    if (el.classList.contains('ant-select')) {
      const iconContainer = el.querySelector('.ant-select .ant-select-arrow') as HTMLElement;
      if (iconContainer) {
        el.classList.add('_arrow-down-container');
      }
    }
  },
  mounted(el: HTMLElement, _binding) {
    if (el.classList.contains('_arrow-down-container')) {
      replaceArrowDownIcon(el);
    }
  },
};

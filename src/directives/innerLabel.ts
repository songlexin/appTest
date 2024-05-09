import { ObjectDirective } from 'vue';

export const MIN_FORM_WIDTH = 1064;

/**
 * 初始化表单样式
 * @param el form
 */
function initFormStyle(el: HTMLElement) {
  el.classList.add('_inner-label-form'); // 添加form自定义的class
  el.classList.remove('ant-form-inline'); // 删除form内联模式样式

  const formItemColEls = el.firstElementChild?.children as HTMLCollection;
  for (let i = 0; i < formItemColEls.length; i++) {
    const colEl = formItemColEls.item(i);
    colEl?.classList.add('_form-col');
  }
}

/**
 *  鼠标事件禁用
 * */
function disablePointer(labelEl: HTMLElement, compEl: HTMLElement, disableList) {
  let disablePointer = false;
  for (let i = 0; i < disableList.length; i++) {
    if (compEl.classList.contains(disableList[i])) {
      disablePointer = true;
      break;
    }
  }
  /* 设定鼠标事件禁用 */
  if (labelEl && disablePointer) {
    labelEl.classList.add('_disable-pointer');
  }
}

/**
 * 设定按钮组样式
 * @param contentEl 内容元素
 */
function setBtnGroupStyle(contentEl: HTMLElement) {
  const btnEls = contentEl.querySelectorAll('.ant-btn') as NodeListOf<Element>;
  if (btnEls.length) {
    const colEl = contentEl.parentElement?.parentElement;
    if (colEl) {
      colEl.classList.add('_form-col-btn-group');
    }
    btnEls.forEach((_btn, index) => {
      if (index > 0) {
        /* 按钮class */
        _btn.classList.add('_btn');
        const text = _btn.firstElementChild?.textContent;
        if (text?.trim() === '重置') {
          _btn.classList.add('ant-btn-primary', 'ant-btn-background-ghost');
        }
      }
    });
  }
}

/**
 * 获取标签内容实际宽度
 * @param labelEl 标签元素
 * @returns width 宽度
 */
function getRealLabelWidth(labelEl: HTMLElement) {
  /* 创建新元素用来获取标签宽度 */
  const tempEl = document.createElement('div');
  // const labelNode = labelEl.firstElementChild as Element;
  tempEl.appendChild(labelEl.cloneNode(true));
  document.body.appendChild(tempEl);
  /* 标签文字实际占用宽度 */
  const width = window.getComputedStyle(tempEl.firstElementChild as HTMLDivElement).width;
  tempEl.remove();

  return width;
}

/**
 * 组件类型
 */
function setCompOffset(labelEl: HTMLElement, compEl: HTMLElement) {
  const width = getRealLabelWidth(labelEl);
  const mpWidth = '12px';

  // Input
  if (
    compEl.classList.contains('ant-input-affix-wrapper') ||
    compEl.classList.contains('ant-input')
  ) {
    compEl.classList.add('_input');
    compEl.setAttribute(
      'style',
      `width:100%;padding-left:calc(${width} + ${mpWidth}) !important;padding-right:${mpWidth};`,
    );
  }
  // InputNumber
  if (compEl.classList.contains('ant-input-number')) {
    compEl.classList.add('_inputNumber');
    compEl.setAttribute(
      'style',
      `width:100%;padding-left:calc(${width} + ${mpWidth}) !important;padding-right:${mpWidth};`,
    );
    compEl
      .querySelector('._inputNumber .ant-input-number-input')
      ?.setAttribute('style', `width:100%;padding-left:0 !important;padding-right:${mpWidth};`);
  }

  // InputNumber Group
  if (compEl.classList.contains('ant-input-number-group-wrapper')) {
    compEl.classList.add('_inputNumberGroup');
    compEl
      .querySelector('._inputNumberGroup .ant-input-number-input')
      ?.setAttribute(
        'style',
        `width:100%;padding-left:calc(${width} + ${mpWidth}) !important;padding-right:${mpWidth};`,
      );
  }
  // select类
  if (compEl.classList.contains('ant-select')) {
    compEl.classList.add('_select');
    compEl.setAttribute('style', `--label-width:${width};`);
    compEl
      .querySelector('._select .ant-select-selector')
      ?.setAttribute(
        'style',
        `width:100%;padding-left:calc(${width} + ${mpWidth}) !important;padding-right:${mpWidth};`,
      );
    // 多选
    if (compEl.classList.contains('ant-select-multiple')) {
      compEl
        .querySelector('.ant-select-selection-search')
        ?.setAttribute('style', `margin-left:0 !important;`);
    } else {
      compEl
        .querySelector('.ant-select-selection-search')
        ?.setAttribute(
          'style',
          `margin-left:0 !important;padding-left:${width} !important;padding-right:${mpWidth};`,
        );
    }
  }

  // date-picker
  if (compEl.classList.contains('ant-picker')) {
    compEl.classList.add('_date-picker');
    const barEl = compEl.querySelector('.ant-picker-active-bar') as HTMLElement;
    if (barEl) {
      barEl.setAttribute('style', `margin-left:calc(${width} + ${mpWidth}) !important;`);
    }
    compEl.setAttribute(
      'style',
      `width:100%;padding-left:calc(${width} + ${mpWidth}) !important;padding-right:${mpWidth};`,
    );
  }
}

/**
 * 替换下拉选单icon
 *
 */
function replaceArrowDownIcon(el: HTMLElement) {
  /* 所有内容元素 */
  const contentEls = el.querySelectorAll(
    '._form-col .ant-form-item ._arrow-down-container',
  ) as NodeListOf<Element>;
  contentEls.forEach((contentEl) => {
    /* 图标元素 */
    const iconContainer = contentEl.querySelector(
      '.ant-form-item-control-input-content .ant-select .ant-select-arrow',
    ) as HTMLElement;
    if (iconContainer) {
      iconContainer.classList.add('_arrow-down');
      const icon = document.createElement('i');
      icon.classList.add('iconfont', 'icon-icon_arrow_down');
      iconContainer.appendChild(icon);
    }
  });
}

/**
 * 更新下拉选单icon class
 *
 */
function updateArrowDownIcon(el: HTMLElement) {
  /* 所有内容元素 */
  const contentEls = el.querySelectorAll(
    '._form-col .ant-form-item ._arrow-down-container',
  ) as NodeListOf<Element>;
  contentEls.forEach((contentEl) => {
    /* 图标元素 */
    const iconContainer = contentEl.querySelector(
      '.ant-form-item-control-input-content .ant-select .ant-select-arrow',
    ) as HTMLElement;

    if (iconContainer && !iconContainer.classList.contains('_arrow-down')) {
      iconContainer.classList.add('_arrow-down');
    }
  });
}

/**
 * 重置表单容器信息
 *
 */
function resetFormRealInfo(el: HTMLElement, formRealInfo = {} as any) {
  const width = el.offsetWidth + 16;
  const height = el.clientHeight;
  formRealInfo.height = 0;
  formRealInfo.width = 0;

  if (height !== 0) {
    formRealInfo.height = height;
  }
  if (width <= MIN_FORM_WIDTH) {
    formRealInfo.width = width;
    el.classList.add('_form-col3');
  } else {
    el.classList.remove('_form-col3');
  }
}

let resizeObserver: ResizeObserver;
export const vInnerLabel: ObjectDirective = {
  beforeMount(el: HTMLElement, _binding) {
    initFormStyle(el); // 初始化表单样式

    /* 所有表单项元素 */
    const formItemEls = el.querySelectorAll('._form-col .ant-form-item') as NodeListOf<Element>;
    formItemEls.forEach((formItemEl) => {
      /* 设定 formItem class */
      formItemEl.classList.add('_form-item');

      /* 标签元素 */
      const labelEl = formItemEl.querySelector('.ant-form-item-label') as HTMLElement;
      /* 内容元素 */
      const contentEl = formItemEl.querySelector('.ant-form-item-control') as HTMLElement;

      /* 组件元素 */
      const compEl = contentEl.querySelector('.ant-form-item-control-input-content')
        ?.firstElementChild as HTMLElement;

      if (compEl) {
        if (!compEl.classList.contains('ant-btn')) {
          compEl.classList.add('_comp');
        }

        /* 图标元素容器 */
        const iconContainer = compEl.querySelector('.ant-select .ant-select-arrow') as HTMLElement;
        if (iconContainer) {
          contentEl.classList.add('_arrow-down-container');
        }

        /* 日期选择器箭头 */
        const arrowEl = compEl.querySelector(
          '.ant-picker .ant-picker-range-separator',
        ) as HTMLElement;
        if (arrowEl) {
          arrowEl.setAttribute('style', `padding:0`);
        }

        // 设定按钮组样式
        setBtnGroupStyle(contentEl);

        // 处理内部标签
        if (labelEl) {
          labelEl.classList.add('_inner-label'); // 添加内部标签class
          // 设定标签鼠标事件禁用
          disablePointer(labelEl, compEl, [
            'ant-picker', // date-picker
            'ant-select', // select
          ]);

          // 设定组件偏移
          setCompOffset(labelEl, compEl);
        }
      }
    });
  },
  mounted(el: HTMLElement, binding) {
    // 替换下拉选单图标
    replaceArrowDownIcon(el);
    const rootEl = document.querySelector(':root');
    const formRealInfo = binding.value;
    resetFormRealInfo(el, formRealInfo);
    // 元素边界尺寸变化后触发
    resizeObserver = new ResizeObserver(async () => {
      const height = el.clientHeight;
      if (height !== 0) {
        rootEl?.setAttribute('style', `--inner-label-form-height:${height}px;`);
      }
      resetFormRealInfo(el, formRealInfo);
    });

    resizeObserver.observe(el);
  },
  updated(el: HTMLDivElement, _binding) {
    /**
     * el：指令绑定到的元素
     * binding：一个对象 { value,oldValue,arg,modifiers,instance,dir }
     *
     * 自定义指令参数可参考：https://cn.vuejs.org/guide/reusability/custom-directives.html#hook-arguments
     */
    // 调整下拉选单图标
    updateArrowDownIcon(el);
  },
  unmounted(el: HTMLElement) {
    // 取消监听元素
    resizeObserver.unobserve(el);
  },
};

import { computed, unref, watch } from 'vue';
import type { TableSearchFormEmitFn } from '../table-search-form';
// import type { ColEx } from '../types/component';
import type { TableSearchFormType } from './';
import { isBoolean, isFunction, isNumber, isObject } from '@/utils/is';
import { useBreakpoint } from '@/hooks/event/useBreakpoint';

// const BASIC_COL_LEN = 24;
const BASIC_COL_LEN = 300; // 一行为300,100%

type UseAdvancedContext = {
  instance: TableSearchFormType;
  emit: TableSearchFormEmitFn;
};

export const useAdvanced = ({ instance, emit }: UseAdvancedContext) => {
  const { realWidthRef, screenRef } = useBreakpoint();
  const {
    advanceState,
    getFormProps,
    formSchemasRef,
    formModel,
    defaultFormValues,
    baseSpan,
    formRealInfo,
  } = instance;
  const getEmptySpan = computed((): number => {
    if (!advanceState.isAdvanced) {
      return 0;
    }
    // For some special cases, you need to manually specify additional blank lines
    const emptySpan = unref(getFormProps).emptySpan || 0;

    if (isNumber(emptySpan)) {
      return emptySpan;
    }
    if (isObject(emptySpan)) {
      const { span = 0 } = emptySpan;
      const screen = unref(screenRef) as string;

      const screenSpan = (emptySpan as any)[screen.toLowerCase()];
      return screenSpan || span || 0;
    }
    return 0;
  });

  watch(
    [formSchemasRef, () => unref(realWidthRef)],
    () => {
      const { showAdvancedButton } = unref(getFormProps);
      if (showAdvancedButton) {
        updateAdvanced();
      }
    },
    { immediate: true },
  );
  watch(
    [() => advanceState.isAdvanced,() => formRealInfo.width],
    () => {
      const { showAdvancedButton } = unref(getFormProps);
      if (showAdvancedButton) {
        updateAdvanced();
      }
    },
    { immediate: true },
  );

  /**
   * 更新advance状态
   */
  function updateAdvanced() {
    let itemColSum = 0;
    let realItemColSum = 0;
    // const { baseColProps = {} } = unref(getFormProps);

    for (const schema of unref(formSchemasRef)) {
      const { vShow } = schema;
      let isShow = true;

      if (isBoolean(vShow)) {
        isShow = vShow;
      }

      if (isFunction(vShow)) {
        isShow = vShow({
          schema,
          formModel,
          field: schema.field,
          formInstance: instance,
          values: {
            ...unref(defaultFormValues),
            ...formModel,
          },
        });
      }

      if (isShow) {
        const { itemColSum: sum, isAdvanced } = getAdvanced(itemColSum);
        itemColSum = sum || 0;
        if (isAdvanced) {
          realItemColSum = itemColSum;
        }
        schema.isAdvanced = isAdvanced;
      }
    }
    advanceState.actionSpan = (realItemColSum % BASIC_COL_LEN) + unref(getEmptySpan);

    // getAdvanced(unref(getFormProps).actionColOptions || { span: BASIC_COL_LEN }, itemColSum, true);
    getAdvanced(itemColSum, true);
    emit('advanced-change');
  }

  function setBaseSpan() {
    const width = unref(realWidthRef);
    // 默认显示4列
    baseSpan.value = 75;
    if (width <= 1280) {
      // 视口1280及以下，显示3列
      baseSpan.value = 100;
    } else if (width >= 1920) {
      // 1920分辨率及以上每行显示5个
      baseSpan.value = 60;
    }
    if (formRealInfo.width) {
      baseSpan.value = 100;
    }
  }

  /* 设定表单项折叠显示 */
  function getAdvanced(itemColSum = 0, isLastAction = false) {
    // 设定列占比
    setBaseSpan();

    itemColSum += baseSpan.value;
    // 处理按钮组
    if (isLastAction) {
      advanceState.hideAdvanceBtn = false;
      if (itemColSum < BASIC_COL_LEN + baseSpan.value) {
        // 少于1行，则不显示折叠按钮
        advanceState.hideAdvanceBtn = true;
        advanceState.isAdvanced = true;
      } else if (itemColSum <= BASIC_COL_LEN * (unref(getFormProps).autoAdvancedLine || 2)) {
        advanceState.hideAdvanceBtn = false;
        // 超过2行自动折叠
      } else if (!advanceState.isLoad) {
        advanceState.isLoad = true;
        advanceState.isAdvanced = !advanceState.isAdvanced;
      }
      return { isAdvanced: advanceState.isAdvanced, itemColSum };
    }

    const needHidden =
      itemColSum > BASIC_COL_LEN * (unref(getFormProps).alwaysShowLines || 1) - baseSpan.value;
    if (needHidden) {
      return { isAdvanced: advanceState.isAdvanced, itemColSum };
    } else {
      // 第一行永远显示，若设定了alwaysShowLines的值，优先取alwaysShowLines
      return { isAdvanced: true, itemColSum };
    }
  }

  function handleToggleAdvanced() {
    advanceState.isAdvanced = !advanceState.isAdvanced;
  }

  return { handleToggleAdvanced };
};

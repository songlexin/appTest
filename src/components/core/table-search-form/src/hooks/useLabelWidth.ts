import { computed, unref } from 'vue';
import type { Ref } from 'vue';
import type { FormItemSchema } from '../types/form';
import type { TableSearchFormProps } from '../table-search-form';
import { isNumber } from '@/utils/is';

export function useItemLabelWidth(
  schemaRef: Ref<FormItemSchema>,
  formPropsRef: Ref<TableSearchFormProps>,
) {
  return computed(() => {
    const schemaItem = unref(schemaRef);
    const { labelCol = {}, wrapperCol = {} } = schemaItem.formItemProps || {};
    const { labelWidth = 64, disabledLabelWidth } = schemaItem;

    // 内部标签宽度
    const innerLabelWidth = isNumber(labelWidth) ? `${labelWidth}px` : labelWidth;
    // 内部标签是否显示
    const showInnerLabel =
      (isNumber(innerLabelWidth) && innerLabelWidth) || (labelWidth && labelWidth[0] !== '0');

    const {
      labelWidth: globalLabelWidth,
      labelCol: globalLabelCol,
      wrapperCol: globWrapperCol,
    } = unref(formPropsRef);
    // 如果labelWidth是全局设置的，则会设置所有项
    if ((!globalLabelWidth && !labelWidth && !globalLabelCol) || disabledLabelWidth) {
      labelCol.style = {
        textAlign: 'left',
      };
      return { innerLabelWidth, showInnerLabel, labelCol, wrapperCol };
    }
    let width = labelWidth || globalLabelWidth;

    const col = { ...globalLabelCol, ...labelCol };
    const wrapCol = { ...globWrapperCol, ...wrapperCol };

    if (width) {
      width = isNumber(width) ? `${width}px` : width;
    }

    return {
      innerLabelWidth,
      showInnerLabel,
      labelCol: { style: { width }, ...col },
      wrapperCol: { style: { width: `calc(100% - ${width})` }, ...wrapCol },
    };
  });
}

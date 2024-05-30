<template>
  <Col v-show="getShow.isShow" class="form-item-col" v-bind="schema.colProps" :class="getColClass">
    <Form.Item
      v-bind="{ ...schema.formItemProps }"
      :name="namePath"
      :label="renderLabelHelpMessage"
      :rules="getRules"
    >
      <component
        :class="getComponentClass"
        :is="getComponent"
        :ref="setItemRef(schema.field)"
        v-bind="getComponentProps"
        v-model:[modelValueType]="modelValue"
        :allow-clear="getAllowClear"
        :disabled="getDisable"
        :loading="schema.loading"
      >
        <template v-if="Object.is(schema.loading, true)" #notFoundContent>
          <Spin size="small" />
        </template>
      </component>
    </Form.Item>
  </Col>
</template>

<script lang="tsx">
  export default {
    name: 'TableSearchFormItem',
  };
</script>
<script setup lang="tsx">
  import { computed, unref, toRefs, isVNode, onMounted, watch, nextTick } from 'vue';
  import { cloneDeep, debounce, isUndefined } from 'lodash-es';
  import { Form, Col, Spin } from 'ant-design-vue';
  // import { useItemLabelWidth } from './hooks/useLabelWidth';
  import { innerLabelMap } from './componentMap';
  import { createPlaceholderMessage } from './helper';
  import { useFormContext } from './hooks/useFormContext';
  import { tableSearchFormItemProps } from './table-search-form-item';
  import type { ComponentMapType } from './componentMap';
  import type {
    CustomRenderFn,
    FormItemSchema,
    RenderCallbackParams,
    innerLabelComponentProps,
  } from './types/';
  // import type { RuleObject } from 'ant-design-vue/es/form/';
  import { isBoolean, isString, isFunction, isArray, isNull, isObject } from '@/utils/is';
  import BasicHelp from '@/components/basic/basic-help/index.vue';
  import { RuleObject } from 'ant-design-vue/es/form';

  // defineOptions({
  //   name: 'TableSearchFormItem',
  // });

  const props = defineProps(tableSearchFormItemProps);
  const emit = defineEmits(['update:formModel']);

  // tableSearchForm组件实例
  const formContext = useFormContext();
  const { formPropsRef, setItemRef, updateSchema, getSchemaByFiled, appendSchemaByField } =
    formContext;

  const { schema } = toRefs(props);

  // 标签
  // const renderLabel = computed(() => {
  //   return isInnerLabel.value ? (
  //     disablePoint.value ? (
  //       <span class="inner-label disable-point">{getLabel.value}</span>
  //     ) : (
  //       <span class="inner-label">{getLabel.value}</span>
  //     )
  //   ) : (
  //     <span>{getLabel.value}</span>
  //   );
  // });

  // @ts-ignore
  // const itemLabelWidthProp = useItemLabelWidth(schema, formPropsRef);

  // 标签
  const renderLabelHelpMessage = computed(() => {
    const { helpMessage, helpComponentProps, subLabel } = props.schema;
    const renderLabel = subLabel ? (
      <span>
        {getLabel.value} <span class="text-secondary">{subLabel}</span>
      </span>
    ) : (
      vnodeFactory(getLabel.value)
    );
    const getHelpMessage = isFunction(helpMessage) ? helpMessage(unref(getValues)) : helpMessage;
    if (!getHelpMessage || (Array.isArray(getHelpMessage) && getHelpMessage.length === 0)) {
      return renderLabel;
    }
    return (
      <span>
        {renderLabel}
        <BasicHelp placement="top" class="mx-1" text={getHelpMessage} {...helpComponentProps} />
      </span>
    );
  });

  const namePath = computed<string[]>(() => {
    const namePath = isArray(schema.value.field)
      ? schema.value.field
      : schema.value.field.split('.');
    return namePath;
  });

  const modelValue = computed({
    get() {
      return namePath.value.reduce((prev, field) => prev?.[field], props.formModel);
    },
    set(val) {
      const namePath = schema.value.field.split('.');
      const prop = namePath.pop()!;
      const target = namePath.reduce((prev, field) => (prev[field] ??= {}), props.formModel);
      target[prop] = val;
      emit('update:formModel', props.formModel);
    },
  });

  const modelValueType = computed<string>(() => {
    const { component, componentProps } = schema.value;
    if (!isFunction(componentProps) && componentProps?.vModelKey) {
      return componentProps.vModelKey;
    }
    const isCheck = isString(component) && ['Switch', 'Checkbox'].includes(component);
    // const isUpload = component === 'Upload';
    const isUpload = false;
    return {
      true: 'value',
      [`${isCheck}`]: 'checked',
      [`${isUpload}`]: 'file-list',
    }['true'];
  });

  const getValues = computed<RenderCallbackParams>(() => {
    const { formModel, schema, tableInstance } = props;

    // const { mergeDynamicData } = unref(formPropsRef);
    return {
      field: schema.field,
      formInstance: formContext,
      tableInstance,
      tableRowKey: props.tableRowKey,
      formModel: props.tableRowKey ? formModel[props.tableRowKey] : formModel,
      values: {
        // ...mergeDynamicData,
        ...formModel,
      } as Recordable,
      schema,
    };
  });

  const getShow = computed<{ isShow: boolean; isIfShow: boolean }>(() => {
    const { vShow, vIf, isAdvanced = false } = unref(schema);
    const { showAdvancedButton } = unref(formPropsRef); // 默认显示
    const itemIsAdvanced = showAdvancedButton ? (isBoolean(isAdvanced) ? isAdvanced : true) : true;

    let isShow = true;
    let isIfShow = true;

    if (isBoolean(vShow)) {
      isShow = vShow;
    }
    if (isBoolean(vIf)) {
      isIfShow = vIf;
    }
    if (isFunction(vShow)) {
      isShow = vShow(unref(getValues));
    }
    if (isFunction(vIf)) {
      isIfShow = vIf(unref(getValues));
    }
    isShow = isShow && itemIsAdvanced;
    return { isShow, isIfShow };
  });

  const getAllowClear = computed(() => {
    const { allowClear: itemAllowClear } = unref(getComponentProps);
    let allowClear = true;

    // 优先取组件属性,其次取默认 true
    if (isBoolean(itemAllowClear)) {
      allowClear = itemAllowClear;
    }
    return allowClear;
  });

  const getDisable = computed(() => {
    const { disabled: globDisabled } = unref(formPropsRef);
    const { dynamicDisabled } = props.schema;
    const { disabled: itemDisabled = false } = unref(getComponentProps);
    let disabled = !!globDisabled || itemDisabled;
    if (isBoolean(dynamicDisabled)) {
      disabled = dynamicDisabled;
    }
    if (isFunction(dynamicDisabled)) {
      disabled = dynamicDisabled(unref(getValues));
    }
    return disabled;
  });

  const vnodeFactory = (
    component: FormItemSchema['componentSlots'] | FormItemSchema['component'],
    values = unref(getValues),
  ) => {
    if (isString(component)) {
      return <>{component}</>;
    } else if (isVNode(component)) {
      return component;
    } else if (isFunction(component)) {
      return vnodeFactory((component as CustomRenderFn)(values));
    } else if (isObject(component)) {
      const compKeys = Object.keys(component);
      // 如果是组件对象直接return
      if (compKeys.some((n) => n.startsWith('_') || ['setup', 'render'].includes(n))) {
        return component;
      }
      return compKeys.reduce<Recordable<CustomRenderFn>>((slots, slotName) => {
        slots[slotName] = (...rest: any) => vnodeFactory(component[slotName], ...rest);
        return slots;
      }, {});
    }
    return component;
  };

  /**
   * @description 当前表单项组件
   */
  const getComponent = computed(() => {
    const component = props.schema.component;
    return isString(component)
      ? innerLabelMap[component] ?? vnodeFactory(component)
      : vnodeFactory(component);
  });

  /* 是否为内部标签 */
  // const isInnerLabel = computed(() => {
  //   const component = props.schema.component;
  //   return innerLabelMap[component] == getComponent.value;
  // });

  // const disablePoint = computed(() => {
  //   const component = props.schema.component;
  //   return disablePointMap[component] == getComponent.value;
  // });

  const getComponentClass = computed(() => {
    const component = props.schema.component as string;
    const compName = innerLabelMap[component].name;

    return `form-item-comp-${compName}`;
  });

  // 设定Col的class
  const getColClass = computed(() => {
    let { colNum = 1, colClass = '' } = props.schema;
    return `inner-label-col-${colNum} ${colClass}`;
  });
  /**
   * @description 当前表单项组件的插槽
   */
  // const getComponentSlots = computed<Recordable<CustomRenderFn>>(() => {
  //   const componentSlots = props.schema.componentSlots ?? {};
  //   return isString(componentSlots) || isVNode(componentSlots)
  //     ? {
  //         default: (...rest: any) => vnodeFactory(componentSlots, rest),
  //       }
  //     : vnodeFactory(componentSlots);
  // });

  const getLabel = computed(() => {
    const label = props.schema.label;
    return isFunction(label) ? label(unref(getValues)) : label;
  });

  /**
   * @description 表单组件props
   */
  const getComponentProps = computed(() => {
    const { schema } = props;
    let { componentProps = {}, component } = schema;

    if (isFunction(componentProps)) {
      componentProps = componentProps(unref(getValues)) ?? {};
      if (isFunction(componentProps.onChange)) {
        const { onChange } = componentProps;
        componentProps.onChange = (e) => {
          return onChange(e);
        };
      }
    }

    if (component === 'Select') {
      const { filterOption, fieldNames, showSearch } = componentProps;
      if (showSearch && isUndefined(filterOption)) {
        // 为选择器设定默认的filterOption
        componentProps.filterOption = (input: string, option: any) => {
          const key = fieldNames?.label ? fieldNames.label : 'label';
          return option?.[key]?.includes(input);
        };
      }
    }

    if (component === 'InputNumber') {
      const { name } = unref(formPropsRef);
      componentProps = Object.assign({ id: `${name}_${schema.field}` }, componentProps);
    }

    if (component !== 'RangePicker' && isString(component)) {
      componentProps.placeholder ??= createPlaceholderMessage(component);
    }
    // if (schema.component === 'Divider') {
    //   componentProps = Object.assign({ id: 'horizontal' }, componentProps, {
    //     orientation: 'left',
    //     plain: true,
    //   });
    // }
    if (isVNode(getComponent.value)) {
      Object.assign(componentProps, getComponent.value.props);
    }

    return componentProps;
  });

  /**
   * @description 表单组件事件
   */
  // const componentEvents = computed(() => {
  //   const componentProps = props.schema?.componentProps || {};
  //   const events = Object.keys(componentProps).reduce((prev, key) => {
  //     if (/on([A-Z])/.test(key)) {
  //       // eg: onChange => change
  //       const eventKey = key.replace(/on([A-Z])/, '$1').toLocaleLowerCase();
  //       prev[eventKey] = componentProps[key];
  //     }
  //     return prev;
  //   }, {});
  //   return events;
  // });

  // 设定组件校验规则类型
  function setComponentRuleType(
    rule: RuleObject,
    component: ComponentMapType,
    valueFormat: string,
  ) {
    if (['DatePicker', 'MonthPicker', 'WeekPicker', 'TimePicker'].includes(component)) {
      rule.type = valueFormat ? 'string' : 'object';
    } else if (['RangePicker', 'Upload', 'CheckboxGroup', 'TimePicker'].includes(component)) {
      rule.type = 'array';
    } else if (['InputNumber'].includes(component)) {
      rule.type = 'number';
    }
  }

  const getRules = computed(() => {
    const {
      rules: defRules = [],
      component,
      rulesMessageJoinLabel,
      dynamicRules,
      required,
    } = props.schema;

    if (isFunction(dynamicRules)) {
      return dynamicRules(unref(getValues)) as RuleObject[];
    }

    let rules = cloneDeep<RuleObject[]>(defRules);
    const { rulesMessageJoinLabel: globalRulesMessageJoinLabel } = unref(formPropsRef);

    const joinLabel = Reflect.has(unref(formPropsRef), 'rulesMessageJoinLabel')
      ? rulesMessageJoinLabel
      : globalRulesMessageJoinLabel;
    const defaultMsg = isString(component)
      ? `${createPlaceholderMessage(component, getLabel.value)}${joinLabel ? getLabel.value : ''}`
      : undefined;

    function validator(rule: any, value: any) {
      const msg = rule.message || defaultMsg;

      if (value === undefined || isNull(value)) {
        // 空值
        return Promise.reject(msg);
      } else if (Array.isArray(value) && value.length === 0) {
        // 数组类型
        return Promise.reject(msg);
      } else if (typeof value === 'string' && value.trim() === '') {
        // 空字符串
        return Promise.reject(msg);
      } else if (
        typeof value === 'object' &&
        Reflect.has(value, 'checked') &&
        Reflect.has(value, 'halfChecked') &&
        Array.isArray(value.checked) &&
        Array.isArray(value.halfChecked) &&
        value.checked.length === 0 &&
        value.halfChecked.length === 0
      ) {
        // 非关联选择的tree组件
        return Promise.reject(msg);
      }
      return Promise.resolve();
    }

    const getRequired = isFunction(required) ? required(unref(getValues)) : required;

    if ((!rules || rules.length === 0) && getRequired) {
      rules = [{ required: getRequired, validator }];
    }

    const requiredRuleIndex: number = rules.findIndex(
      (rule) => Reflect.has(rule, 'required') && !Reflect.has(rule, 'validator'),
    );

    if (requiredRuleIndex !== -1) {
      const rule = rules[requiredRuleIndex];

      if (component && isString(component)) {
        if (!Reflect.has(rule, 'type')) {
          rule.type = component === 'InputNumber' ? 'number' : 'string';
        }

        rule.message = rule.message || defaultMsg;

        if (component.includes('Input') || component.includes('Textarea')) {
          rule.whitespace = true;
        }
        const valueFormat = unref(getComponentProps)?.valueFormat;
        setComponentRuleType(rule, component, valueFormat);
      }
    }

    // Maximum input length rule check
    const characterInx = rules.findIndex((val) => val.max);
    if (characterInx !== -1 && !rules[characterInx].validator) {
      rules[characterInx].message =
        rules[characterInx].message || `字符数应小于${[rules[characterInx].max]}位`;
    }

    return rules;
  });

  const fetchRemoteData = async (request) => {
    if (request) {
      const { component } = unref(schema);

      try {
        const newSchema = {
          ...unref(schema),
          loading: true,
          componentProps: {
            ...unref(getComponentProps),
            options: [],
          } as innerLabelComponentProps,
        };
        updateSchema(newSchema);
        const result = await request(unref(getValues));
        if (['Select', 'RadioGroup', 'CheckBoxGroup'].some((n) => n === component)) {
          newSchema.componentProps.options = result;
        } else if (['TreeSelect', 'Tree'].some((n) => n === component)) {
          newSchema.componentProps.treeData = result;
        }
        if (newSchema.componentProps) {
          newSchema.componentProps.requestResult = result;
        }
        newSchema.loading = false;
        nextTick(() => {
          updateSchema(newSchema);
        });
      } finally {
        nextTick(() => {
          schema.value.loading = false;
        });
      }
    }
  };

  const initRequestConfig = () => {
    const request = getComponentProps.value.request;
    if (request) {
      if (isFunction(request)) {
        fetchRemoteData(request);
      } else {
        const { watchFields = [], options = {}, wait = 0, callback } = request;
        const params = watchFields.map((field) => () => props.formModel[field]);
        watch(
          params,
          debounce(() => {
            fetchRemoteData(callback);
          }, wait),
          {
            ...options,
          },
        );
      }
    }
  };

  onMounted(() => {
    if (!getSchemaByFiled(props.schema.field)) {
      appendSchemaByField(props.schema);
    }
    initRequestConfig();
  });
</script>

<style lang="less" scoped>
  @import './../../../../styles/mediaScreen.less';
  .inner-label-col-1 {
    #inner-label-form ._form-media-screen(1);
  }
  .inner-label-col-2 {
    #inner-label-form ._form-media-screen(2);
  }
  .inner-label-col-3 {
    #inner-label-form ._form-media-screen(3);
  }
</style>

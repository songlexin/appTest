import { unref, toRaw } from 'vue';
import { cloneDeep, uniqBy } from 'lodash-es';
import dayjs from 'dayjs';
import { dateItemType, handleInputNumberValue } from '../helper';
import type { FormItemSchema } from '../types/form';
import type { NamePath } from 'ant-design-vue/lib/form/interface';
import type { FormState, FormMethods } from './index';
import type { TableSearchFormEmitFn } from '../table-search-form';
import { isArray, isFunction, isObject, isString } from '@/utils/is';
import { deepMerge } from '@/utils';

type UseFormActionContext = FormState & {
  emit: TableSearchFormEmitFn;
  handleFormValues: FormMethods['handleFormValues'];
};

export type FormEvents = ReturnType<typeof useFormEvents>;

export function useFormEvents(formActionContext: UseFormActionContext) {
  const {
    emit,
    formPropsRef,
    formSchemasRef,
    formModel,
    cacheFormModel,
    getFormProps,
    tableSearchFormRef,
    defaultFormValues,
    originComponentPropsFnMap,
    handleFormValues,
  } = formActionContext;
  function getFieldsValue(): Recordable {
    const formEl = unref(tableSearchFormRef);
    if (!formEl) return {};
    return handleFormValues(toRaw(unref(formModel)));
  }

  /**
   * @description: Is it time
   */
  function itemIsDateType(key: string) {
    return unref(formPropsRef).schemas?.some((item) => {
      return item.field === key && isString(item.component)
        ? dateItemType.includes(item.component)
        : false;
    });
  }

  /**
   * @description: 设置表单字段值
   */
  async function setFieldsValue(values: Recordable): Promise<void> {
    const schemas = unref(formSchemasRef);
    const fields = schemas.map((item) => item.field).filter(Boolean);

    Object.assign(cacheFormModel, values);

    const validKeys: string[] = [];
    Object.keys(values).forEach((key) => {
      const schema = schemas.find((item) => item.field === key);
      let value = values[key];

      const hasKey = Reflect.has(values, key);
      if (isString(schema?.component)) {
        value = handleInputNumberValue(schema?.component, value);
      }
      // 0| '' is allow
      if (hasKey && fields.includes(key)) {
        // time type
        if (itemIsDateType(key)) {
          if (Array.isArray(value)) {
            const arr: any[] = [];
            for (const ele of value) {
              arr.push(ele ? dayjs(ele) : null);
            }
            formModel[key] = arr;
          } else {
            const { componentProps } = schema || {};
            let _props = componentProps as any;
            if (isFunction(componentProps)) {
              _props = _props({ formPropsRef, formModel });
            }
            formModel[key] = value ? (_props?.valueFormat ? value : dayjs(value)) : null;
          }
        } else {
          formModel[key] = value;
        }
        validKeys.push(key);
      }
    });
    validateFields(validKeys);
  }

  async function resetSchema(data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) {
    let updateData: Partial<FormItemSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormItemSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }
    // @ts-ignore
    unref(formPropsRef).schemas = updateData as FormItemSchema[];
  }

  /**
   * @description: 插入到指定 filed 后面，如果没传指定 field，则插入到最后,当 first = true 时插入到第一个位置
   */
  async function appendSchemaByField(
    schemaItem: FormItemSchema,
    prefixField?: string,
    first = false,
  ) {
    const schemaList = cloneDeep(unref(formSchemasRef));

    const index = schemaList.findIndex((schema) => schema.field === prefixField);

    if (!prefixField || index === -1 || first) {
      first ? schemaList.unshift(schemaItem) : schemaList.push(schemaItem);
      formModel[schemaItem.field] = schemaItem.defaultValue;
      formPropsRef.value.schemas = schemaList;
      return;
    }
    if (index !== -1) {
      schemaList.splice(index + 1, 0, schemaItem);
    }
    formModel[schemaItem.field] = schemaItem.defaultValue;
    formPropsRef.value.schemas = schemaList;
  }

  /**
   * @description: 根据 field 删除 Schema
   */
  function removeSchemaByFiled(fields: string | string[]) {
    const schemaList = cloneDeep(unref(formSchemasRef));

    if (!fields) {
      return;
    }

    let fieldList: string[] = isString(fields) ? [fields] : fields;
    if (isString(fields)) {
      fieldList = [fields];
    }
    for (const field of fieldList) {
      if (isString(field)) {
        const index = schemaList.findIndex((schema) => schema.field === field);
        if (index !== -1) {
          Reflect.deleteProperty(formModel, field);
          schemaList.splice(index, 1);
        }
      }
    }
    formPropsRef.value.schemas = schemaList;
  }

  /**
   * @description: 根据 field 查找 Schema
   */
  function getSchemaByFiled(fields: string | string[]): FormItemSchema | undefined {
    const schemaList = unref(formSchemasRef);
    const fieldList = ([] as string[]).concat(fields);
    return schemaList.find((schema) => fieldList.includes(schema.field));
  }

  /**
   * @description  更新formItemSchema
   */
  const updateSchema = (data: Partial<FormItemSchema> | Partial<FormItemSchema>[]) => {
    let updateData: Partial<FormItemSchema>[] = [];
    if (isObject(data)) {
      updateData.push(data as FormItemSchema);
    }
    if (isArray(data)) {
      updateData = [...data];
    }

    const hasField = updateData.every((item) => Reflect.has(item, 'field') && item.field);

    if (!hasField) {
      console.error(
        'All children of the form Schema array that need to be updated must contain the `field` field',
      );
      return;
    }
    const schemas: FormItemSchema[] = [];
    updateData.forEach((item) => {
      unref(formSchemasRef).forEach((val) => {
        if (val.field === item.field) {
          const newSchema = deepMerge(val, item);
          if (originComponentPropsFnMap.has(val.field)) {
            const originCompPropsFn = originComponentPropsFnMap.get(val.field)!;
            const compProps = { ...newSchema.componentProps };
            newSchema.componentProps = (opt) => {
              const res = {
                ...originCompPropsFn(opt),
                ...compProps,
              };
              return res;
            };
          }
          schemas.push(newSchema);
        } else {
          schemas.push(val);
        }
      });
    });

    unref(formPropsRef as any).schemas = uniqBy(schemas, 'field');
  };
  async function resetFieldsDefaultValue(): Promise<void> {
    Object.keys(formModel).forEach((key) => {
      formModel[key] = defaultFormValues[key];
    });
  }
  async function resetFields(): Promise<void> {
    const { resetFunc, submitOnReset } = unref(getFormProps);
    resetFunc && isFunction(resetFunc) && (await resetFunc());
    if (!resetFunc) {
      resetFieldsDefaultValue();
      emit('reset', formModel);
      submitOnReset && handleSubmit();
    }
    setTimeout(clearValidate);
  }

  async function validateFields(nameList?: NamePath[] | undefined) {
    return tableSearchFormRef.value?.validateFields(nameList);
  }

  async function validate(nameList?: NamePath[] | undefined) {
    return await tableSearchFormRef.value?.validate(nameList)!;
  }

  async function clearValidate(name?: string | string[]) {
    await tableSearchFormRef.value?.clearValidate(name);
  }

  async function scrollToField(name: NamePath, options?: ScrollOptions | undefined) {
    await tableSearchFormRef.value?.scrollToField(name, options);
  }

  async function handleSubmit(e?: Event) {
    e && e.preventDefault();
    const { submitFunc } = unref(getFormProps);
    if (submitFunc && isFunction(submitFunc)) {
      await submitFunc();
      return;
    }
    const formEl = unref(tableSearchFormRef);
    if (!formEl) return;
    try {
      const values = await validate();
      const res = handleFormValues(values);
      emit('submit', res);
      return res;
    } catch (error: any) {
      return Promise.reject(error);
    }
  }

  const handleEnterPress = (e: KeyboardEvent) => {
    const { autoSubmitOnEnter } = unref(formPropsRef);
    if (!autoSubmitOnEnter) return;
    if (e.key === 'Enter' && e.target && e.target instanceof HTMLElement) {
      const target: HTMLElement = e.target as HTMLElement;
      if (target && target.tagName && target.tagName.toUpperCase() == 'INPUT') {
        handleSubmit(e);
      }
    }
  };

  return {
    submit: handleSubmit,
    handleEnterPress,
    clearValidate,
    validate,
    validateFields,
    getFieldsValue,
    updateSchema,
    resetSchema,
    getSchemaByFiled,
    appendSchemaByField,
    removeSchemaByFiled,
    resetFields,
    setFieldsValue,
    scrollToField,
    resetFieldsDefaultValue,
  };
}

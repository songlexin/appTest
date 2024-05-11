<template>
  <div style="width: 100%">
    <c-form
      span="8"
      labelAlign="left"
      is-loading="ddd"
      ref="cformRef"
      :model="formState"
      name="basic"
      :label-col="{ span: 8 }"
      :wrapper-col="{ span: 16 }"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <c-form-item
        name="username"
        :rules="[{ required: true, message: 'Please input your username!' }]"
      >
        <template #label>
          <span>
            username
            <span class="icon iconfont icon-icon_sider_menu_ghgxsq"></span>
          </span>
        </template>
        <a-input v-model:value="formState.username" style="width: 100%" />
      </c-form-item>
      <c-form-item
        label="Password"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </c-form-item>
      <c-form-item
        label="Password2"
        name="password222"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password222" />
      </c-form-item>
      <c-form-item
        label="Password32"
        name="password23"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password23" />
      </c-form-item>
      <c-form-item :wrapper-col="{ offset: 8, span: 8 }">
        <a-button type="primary" html-type="submit">Submit</a-button>
      </c-form-item>
    </c-form>
  </div>
</template>

<script setup lang="ts">
  // import CForm from '@/components/custom/CForm';

  import { onMounted, provide, reactive, ref } from 'vue';
  import type { FormExpose } from 'ant-design-vue/es/form/Form';

  const cformRef = ref<FormExpose>();

  interface FormState {
    username: string;
    password: string;
    password222: string;
    password23: string;
    remember: boolean;
  }

  const formState = reactive<FormState>({
    username: '',
    password: '',
    password222: '',
    password23: '',
    remember: true,
  });

  const onFinish = (values: any) => {
    console.log('Success:', values);
    console.log(' cformRef.value.getFieldsValue();', cformRef.value.getFieldsValue());
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
</script>

<style lang="less" scoped></style>

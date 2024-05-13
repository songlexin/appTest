<template>
  <div style="width: 100%">
    <c-form
      span="6"
      is-loading="ddd"
      ref="cformRef"
      :model="formState"
      name="basic"
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
            合规
            <!-- <span class="icon iconfont icon-icon_sider_menu_ghgxsq"></span> -->
          </span>
        </template>
        <a-input v-model:value="formState.username" style="width: 100%" />
      </c-form-item>
      <c-form-item
        label="合规33334343453454353xs"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password" />
      </c-form-item>
      <c-form-item
        label="合规"
        name="password"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-select ref="select" v-model:value="value1" style="width: 120px">
          <a-select-option value="jack">Jack</a-select-option>
          <a-select-option value="lucy">Lucy</a-select-option>
          <a-select-option value="disabled" disabled>Disabled</a-select-option>
          <a-select-option value="Yiminghe">yiminghe</a-select-option>
        </a-select>
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
      <c-form-item
        label="Password32"
        name="password235"
        :rules="[{ required: true, message: 'Please input your password!' }]"
      >
        <a-input-password v-model:value="formState.password235" />
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
    password235: string;
    remember: boolean;
  }
  const value1 = ref('lucy');

  const formState = reactive<FormState>({
    username: '',
    password: '',
    password222: '',
    password23: '',
    password235: '',
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

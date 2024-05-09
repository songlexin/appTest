<template>
  <a-upload
    :show-upload-list="false"
    :action="url"
    :max-count="1"
    :headers="headers"
    :multiple="true"
    @change="handleChange"
  >
    <a-button type="primary">
      <!-- <upload-outlined></upload-outlined> -->
      选择文件
    </a-button>
  </a-upload>
  <p v-if="fileUrlName" class="font-cl"><paper-clip-outlined />{{ fileUrlName }}</p>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { PaperClipOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { ACCESS_TOKEN_KEY } from './../../../enums/cacheEnum';
  import { Storage } from './../../../utils/Storage';
  import { getRunProject } from './../../../utils/authUtil';
  import { useSpinStore } from './../../../store/modules/spin';
  import type { UploadChangeParam } from 'ant-design-vue';

  const isProd = ['production', 'prod'].includes(import.meta.env.NODE_ENV);
  const props = defineProps({
    actionUrl: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      required: false,
    },
    name: {
      type: String,
      required: false,
    },
  });
  const fileUrlName = computed({
    get() {
      return props.name;
    },
    set() {},
  });
  const url = computed({
    get() {
      return `${import.meta.env.VUE_APP_BASE_API + props.actionUrl}?projectCode=${getRunProject()}`;
    },
    set() {},
  });
  const emit = defineEmits<{
    (e: 'uploadSuccess', name: string): void;
    (e: 'change', name: string): void;
  }>();
  const headers = computed({
    get() {
      const obj = {};
      const token = Storage.get(ACCESS_TOKEN_KEY);
      if (token) {
        // 请求头token信息，请根据实际情况进行修改
        obj['token'] = token;
      }
      obj['X-APP-CODE'] = import.meta.env.VUE_APP_CODE;
      if (!isProd && token) {
        obj['X-SESSION-ID'] = token;
      }
      return obj;
    },
    set() {},
  });
  const handleChange = (info: UploadChangeParam) => {
    emit('change', '');
    useSpinStore().changeSpinning(true);
    if (info.file.status === 'done' && info.file.response.code == 0) {
      emit('uploadSuccess', info.file.response.data);
      useSpinStore().changeSpinning(false);
      message.success(`${info.file.name} 上传成功`);
      emit('change', info.file.name);
    } else if (info.file.status === 'error') {
      useSpinStore().changeSpinning(false);
      message.error(`${info.file.name} 上传失败`);
    }
  };
</script>
<style lang="less" scoped>
  .font-cl {
    font-size: 14px;
    margin-top: 8px;
  }
</style>

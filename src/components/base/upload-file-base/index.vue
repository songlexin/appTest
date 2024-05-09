<template>
  <a-upload
    :show-upload-list="false"
    :max-count="1"
    :headers="headers"
    :multiple="true"
    :before-upload="beforeUpload"
    :custom-request="httpRequest"
    @change="handleChange"
    class="uploadFileLimitPrintFile"
  >
    <a-button :style="props.styleObj">
      <upload-outlined></upload-outlined>
      请选择文件
    </a-button>
  </a-upload>
  <p v-if="fileUrlName" class="font-cl"><paper-clip-outlined />{{ fileUrlName }}</p>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { UploadOutlined, PaperClipOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { ACCESS_TOKEN_KEY } from './../../../enums/cacheEnum';
  import { Storage } from './../../../utils/Storage';
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
    styleObj: {
      type: Object as PropType<object>,
      default: () => {},
    },
  });
  const fileUrlName = computed({
    get() {
      return props.name;
    },
    set() {},
  });
  // const url = computed({
  //   get() {
  //     return import.meta.env.VUE_APP_BASE_API + props.actionUrl;
  //   },
  //   set() {},
  // });
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
    if (info.file.status === 'done' && info.file.response.code == 0) {
      emit('uploadSuccess', info.file.response.data);
      message.success(`${info.file.name} 上传成功`);
      emit('change', info.file.name);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} 上传失败`);
    }
  };
  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isLt100k = file.size / 1024 < 100;
    if (!isLt100k) {
      message.error('文件大小不超过100k!');
    }
    return isLt100k;
  };

  const httpRequest = (data) => {
    emit('change', '');
    const rd = new FileReader(); // 创建文件读取对象
    const file = data.file;
    rd.readAsDataURL(file); // 文件读取装换为base64类型
    rd.onloadend = function (e) {
      // this指向当前方法onloadend的作用域, this.result就是文件的base64， 这里可自由处理
      emit('uploadSuccess', e?.currentTarget?.result);
      message.success(`${file.name} 上传成功`);
      emit('change', file.name);
    };
    rd.onerror = function (_) {
      message.error(`${file.name} 上传失败`);
    };
  };
</script>
<style lang="less"></style>
<style lang="less" scoped>
  .font-cl {
    font-size: 14px;
    margin-top: 8px;
  }
  .uploadFileLimitPrintFile {
    display: inline-block;
    width: 100%;
    .ant-upload-select {
      width: 100%;
      :deep(.ant-upload) {
        display: inline-block;
        width: 100%;
        .ant-btn {
          width: 100%;
        }
      }
    }
  }
</style>

<template>
  <a-upload
    list-type="picture-card"
    class="avatar-uploader"
    :headers="headers"
    :max-count="1"
    :show-upload-list="false"
    :before-upload="beforeUpload"
    :custom-request="httpRequest"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" style="max-width: 100%; max-height: 100%" />
    <div v-else>
      <loading-outlined v-if="loading"></loading-outlined>
      <plus-outlined v-else></plus-outlined>
      <div class="ant-upload-text">上传</div>
    </div>
  </a-upload>
  <p class="font-cl"> jpg 或 png 格式，文件大小不超过 2M</p>
</template>
<script lang="ts" setup>
  import { ref, computed } from 'vue';
  import { PlusOutlined, LoadingOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { ACCESS_TOKEN_KEY } from './../../../enums/cacheEnum';
  import { Storage } from './../../../utils/Storage';
  // import { base64ImgPreview } from './../../../hooks/functions/useDownloadBase64';
  import type { UploadChangeParam, UploadProps } from 'ant-design-vue';
  const isProd = ['production', 'prod'].includes(import.meta.env.NODE_ENV);
  function getBase64(img: Blob, callback: (base64Url: string) => void) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result as string));
    reader.readAsDataURL(img);
  }
  const props = defineProps({
    url: {
      type: String,
      required: true,
    },
  });
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
  const imageUrl = computed({
    get() {
      return props.url;
    },
    set() {},
  });
  const loading = ref<boolean>(false);
  const emit = defineEmits<{
    (e: 'uploadSuccess', name: string): void;
    (e: 'change', url: string): void;
  }>();
  const handleChange = (info: UploadChangeParam) => {
    if (info.file.status === 'uploading') {
      loading.value = true;
      emit('change', '');
      return;
    }
    if (info.file.status === 'done') {
      if (info.file.response.code == 0) {
        emit('uploadSuccess', info.file.response.data);
        message.success(`${info.file.name} 上传成功`);
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, (base64Url: string) => {
          emit('change', base64Url);
        });
      } else {
        message.error(`${info.file.name} 上传失败`);
      }
      loading.value = false;
    }
    if (info.file.status === 'error') {
      loading.value = false;
      message.error(`${info.file.name} 上传失败`);
    }
  };

  const beforeUpload = (file: UploadProps['fileList'][number]) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('只支持jpg或png格式!');
    }
    const isLt600k = file.size / 1024 < 600;
    if (!isLt600k) {
      message.error('文件大小不超过600k!');
    }
    return isJpgOrPng && isLt600k;
  };
  const httpRequest = (data) => {
    emit('change', '');
    const rd = new FileReader(); // 创建文件读取对象
    const file = data.file;
    rd.readAsDataURL(file); // 文件读取装换为base64类型
    rd.onloadend = function (e) {
      // this指向当前方法onloadend的作用域, this.result就是文件的base64， 这里可自由处理
      emit('change', e?.currentTarget?.result);
      message.success(`${file.name} 上传成功`);
      // emit('change', file.name);
    };
    rd.onerror = function (_) {
      message.error(`${file.name} 上传失败`);
    };
  };
</script>
<style lang="less" scoped>
  .avatar-uploader > .ant-upload {
    width: 128px;
    height: 128px;
  }
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
  .font-cl {
    font-size: 12px;
    color: #999;
    margin-top: 0;
    overflow: hidden;
  }
</style>

<template>
  <DraggableModal
    :visible="props.visible"
    :title="props.title"
    :col-num="2"
    :centered="true"
    ref="popModel"
    @cancel="hideModal"
  >
    <vue-office-pdf :src="pdfUrl" @rendered="renderedHandler" @error="errorHandler" />
    <template #footer>
      <a-button style="margin-right: 8px" @click="hideModal">取消</a-button>
      <a-button style="margin-right: 8px" @click="download">下载</a-button>
      <a-button type="primary" @click="hideModal">确定</a-button>
    </template>
  </DraggableModal>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { DraggableModal } from '@/components/core/draggable-modal';
  const popModel = ref();
  //引入VueOfficePdf组件
  import VueOfficePdf from '@vue-office/pdf';
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    file: {
      type: Object,
      required: true,
    },
    title: {
      type: String,
      required: true,
      default: 'pdf预览',
    },
  });
  const pdfUrl = ref('');
  onMounted(() => {
    if (!props.file.url) {
      return;
    }
    const x = new XMLHttpRequest();
    console.log('props.file.url', props.file.url);
    x.open('GET', props.file.url, true);
    x.responseType = 'blob';
    x.onload = function () {
      x.response.arrayBuffer().then((res) => {
        pdfUrl.value = res;
      });
    };
    x.send();
  });
  const emit = defineEmits(['close']);
  const hideModal = () => {
    emit('close');
  };
  const renderedHandler = () => {
    popModel.value.centerModal();
    console.log('渲染完成');
  };
  const errorHandler = () => {
    console.log('渲染失败');
  };
  const download = () => {
    if (!props.file.url) {
      return;
    }
    const x = new XMLHttpRequest();
    x.open('GET', props.file.url, true);
    x.responseType = 'blob';
    x.onload = function () {
      const url = window.URL.createObjectURL(x.response);
      const a = document.createElement('a');
      a.href = url;
      a.download = props.file.name || '';
      a.click();
    };
    x.send();
  };
</script>
<style lang="less" scoped></style>

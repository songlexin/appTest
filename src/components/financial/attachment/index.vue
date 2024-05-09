<template>
  <a-button type="primary" ghost style="margin-right: 16px" @click="showModal"
    >查看附件({{ state.total }})</a-button
  >
  <DraggableModal
    title="查看附件"
    v-model:visible="state.modalVisible"
    :footer="null"
    :wrap-class-name="'modal-box'"
  >
    <div class="modal-detail-body">
      <a-table
        :columns="state.columns"
        :data-source="state.attachmenList"
        :pagination="false"
        :scroll="{ y: '100% ' }"
        :row-key="(item) => item.id"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'action'">
            <a-button type="link" @click="view(record)">查看</a-button>
          </template>
        </template>
      </a-table>
    </div>
  </DraggableModal>
  <a-image
    :style="{ display: 'none' }"
    :src="state.filePath"
    :preview="{
      visible: state.fileVisable,
      onVisibleChange: setVisible,
    }"
  />
  <XcPreviewPdf
    v-if="modalState.show"
    v-model:visible="modalState.show"
    :file="modalState.file"
    @close="() => (modalState.show = false)"
  ></XcPreviewPdf>
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import { message } from 'ant-design-vue';
  import invoiceSureApi from '@/api/financial/invoiceEnter/invoice-sure-page';
  import { DraggableModal } from '@/components/core/draggable-modal';
  import XcPreviewPdf from '@/components/xc/xc-preview/xc-preview-pdf/index.vue';
  import { convertUrl } from '@/utils/fileUrlUtil';
  const props = defineProps({
    id: {
      type: String,
      required: false,
    },
    hosVersion: {
      type: String,
      required: false,
    },
  });
  const state = reactive({
    attachmenList: [] as any[],
    total: 0,
    modalVisible: false,
    fileVisable: false, //预览图像
    filePath: '',
    columns: [
      {
        title: '文件名',
        dataIndex: 'fileName',
        ellipsis: true,
      },
      // {
      //   title: '大小(MB)',
      //   dataIndex: 'fileSize',
      //   ellipsis: true,
      //   customRender({ record }) {
      //     return (record.fileSize / 1024 / 1024).toFixed(4);
      //   },
      // },
      {
        title: '操作',
        dataIndex: 'action',
        width: 80,
      },
    ],
  });
  const getList = async () => {
    const id = props.id;
    const hosVersion = props.hosVersion;
    const res = await invoiceSureApi.getAttachList(id, hosVersion);
    if (res) {
      state.total = res.data.length;
      state.attachmenList = res.data;
    }
  };
  const setVisible = (value): void => {
    state.fileVisable = value;
  };
  const showModal = async () => {
    state.modalVisible = true;
  };
  const modalState = reactive({
    show: false,
    file: {} as any,
  });
  const view = (file) => {
    const splits = file.filePath.split('.');
    const extension = splits[splits.length - 1];
    const ext = extension.toLowerCase();
    const imageTypes = ['jpg', 'jpeg', 'png', 'gif', 'bmp'];
    if (splits.length <= 1) {
      message.error('文件格式错误');
      return false;
    }
    if (imageTypes.includes(ext)) {
      state.filePath = convertUrl(file.filePath);
      state.fileVisable = true;
      setVisible(true);
    } else if (ext === 'pdf') {
      modalState.show = true;
      modalState.file = file;
      modalState.file.url = convertUrl(file.filePath);
      modalState.file.name = file.name;
    } else {
      const link = document.createElement('a');
      link.href = convertUrl(file.filePath);
      link.download = file.fileName;
      link.click();
      URL.revokeObjectURL(link.href);
    }
  };
  onMounted(() => {
    getList();
  });
</script>
<style lang="less" scoped></style>

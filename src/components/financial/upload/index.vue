<template>
  <a-button type="primary" ghost @click="showModal">{{ state.buttonText }}</a-button>
  <!--  :ok-text="`确定（${state.fileList.length}）`"
    cancel-text="取消"
    :ok-button-props="{
      disabled: !state.fileList.length,
    }" -->
  <DraggableModal
    title="上传附件"
    v-model:visible="state.modalVisible"
    :wrap-class-name="'modal-box'"
    @ok="handleUpload"
    @cancel="handleCancel"
  >
    <div class="modal-detail-body">
      <a-upload
        :file-list="state.fileList"
        :show-upload-list="false"
        :before-upload="beforeUpload"
        :custom-request="httpRequest"
      >
        <a-button>
          <upload-outlined></upload-outlined>
          选择文件
        </a-button>
        <span>
          <InfoCircleOutlined :style="{ color: '#999', margin: '0 8px 0 16px' }" />
          <span style="font-size: 12px; color: #666"
            >仅支持JPG、PNG、BMG、PDF格式文件，单个文件不超过5M</span
          >
        </span>

        <!-- <a-popover title="仅支持JPG、PDF格式文件，单个文件不超过5M">
          <InfoCircleOutlined style="margin-right: 2px" />
        </a-popover> -->
      </a-upload>
      <a-table
        :columns="state.columns"
        :data-source="state.fileList"
        :pagination="false"
        bordered
        :scroll="{ y: '100% ' }"
        :row-key="(item) => item.id"
        @resizeColumn="handleResizeColumn"
        class="modalTable"
        :loading="state.loading"
      >
        <template #bodyCell="{ column, index }">
          <template v-if="column.dataIndex === 'action'">
            <a-popconfirm
              title="确定删除文件吗？"
              ok-text="确定"
              cancel-text="取消"
              @confirm="deleteRow(index)"
            >
              <a-button type="link">删除</a-button>
            </a-popconfirm>
          </template>
        </template>
      </a-table>
    </div>
  </DraggableModal>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { UploadOutlined, InfoCircleOutlined } from '@ant-design/icons-vue';
  import { message } from 'ant-design-vue';
  import { DraggableModal } from '@/components/core/draggable-modal';
  import invoiceEnterApi from '@/api/financial/invoiceEnter/invoice-enter-page';
  const state = reactive({
    modalVisible: false,
    fileList: [] as any[],
    buttonText: '上传附件',
    columns: [
      {
        title: '文件名',
        dataIndex: 'fileName',
        ellipsis: true,
        resizable: true,
        width: 300,
      },
      {
        title: '大小(MB)',
        dataIndex: 'fileSize',
        ellipsis: true,
        resizable: true,
        width: 100,
        customRender({ record }) {
          return (record.fileSize / 1024 / 1024).toFixed(4);
        },
      },
      {
        title: '操作',
        dataIndex: 'action',
        ellipsis: true,
        width: 80,
      },
    ],
    loading: false,
  });
  const showModal = () => {
    state.modalVisible = true;
  };
  const beforeUpload = (file) => {
    const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/bmp', 'application/pdf'];
    // fileType !== 'image/jpeg' && fileType !== 'application/pdf'
    const isJpgOrPdf = types.includes(file.type);
    if (!isJpgOrPdf) {
      message.error('仅支持JPG、PNG、BMG、PDF格式文件');
      return false;
    }
    const isLt5M = file.size / 1024 / 1024 < 5;
    if (!isLt5M) {
      message.error('文件大小不超过5M!');
      return false;
    }
    // state.fileList = [...state.fileList, file];
  };
  const deleteRow = (index) => {
    state.fileList.splice(index, 1);
  };
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  const emit = defineEmits(['uploadFileList']);
  const handleUpload = () => {
    if (state.fileList.length <= 0) {
      message.error('请先上传文件');
      return false;
    } else {
      state.buttonText = `上传附件(${state.fileList.length})`;
      emit('uploadFileList', state.fileList);
      state.modalVisible = false;
    }
  };

  const httpRequest = async (e) => {
    const param = {
      file: e.file,
    };
    state.loading = true;
    const res = await invoiceEnterApi.uploadData(param);
    if (res.code == 0) {
      const file = {
        fileName: res.data.fileName,
        fileSize: res.data.fileSize,
        filePath: res.data.filePath,
      };
      state.loading = false;
      state.fileList = [...state.fileList, file];
      // message.success('上传成功');
    } else {
      state.loading = false;
      message.error('上传失败');
    }
  };
  const handleCancel = () => {
    state.fileList = [];
  };
</script>
<style lang="less" scoped>
  .modalTable {
    margin-top: 16px;
    min-height: 200px;
    max-height: calc(80vh - 96px);
  }
</style>

<template>
  <div>
    <DraggableModal
      title="文件预览"
      :col-num="2"
      :centered="true"
      :visible="visable"
      @cancel="close"
    >
      <a-tabs type="border-card" v-model:activeKey="activeKey">
        <a-tab-pane key="1" tab="图片" v-if="state.imgTableData.length">
          <a-table
            ref="imgTable"
            :columns="columns"
            :dataSource="state.imgTableData"
            :row-key="(record) => record.url"
            :pagination="false"
          >
            <template #bodyCell="{ column, record, index }">
              <a-tooltip
                placement="topLeft"
                :title="record.url"
                color="white"
                v-if="record.url"
                overlay-class-name="multi-file-overlay-class"
              >
                <template v-if="column.dataIndex === 'index'">
                  {{ index + 1 }}
                </template>
                <template v-if="column.dataIndex === 'url'">
                  <a-button type="link" @click="showGroupImage(record.url)">
                    {{ record.url }}</a-button
                  >
                </template>
              </a-tooltip>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="文件" v-if="state.fileTableData.length">
          <a-table
            ref="imgTable"
            :columns="columns"
            :dataSource="state.fileTableData"
            :pagination="false"
            :row-key="(record) => record.url"
          >
            <template #bodyCell="{ column, record, index }">
              <template v-if="column.dataIndex === 'index'">
                {{ index + 1 }}
              </template>
              <a-tooltip
                placement="topLeft"
                :title="record.url"
                color="white"
                v-if="record.url"
                overlay-class-name="multi-file-overlay-class"
              >
                <template v-if="column.dataIndex === 'url'">
                  <a-button type="link" @click="showFile(record)"> {{ record.url }}</a-button>
                </template>
              </a-tooltip>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
      <template #footer>
        <a-button type="default" @click="close"> 取消</a-button>
      </template>
    </DraggableModal>
    <a-image-preview-group
      v-if="ifPreviewGroup"
      :preview="{
        visible: imagePrevState.visible,
        onVisibleChange: setVisibleImage,
      }"
    >
      <a-image
        :width="200"
        :fallback="imageFail"
        v-for="imagePrev in imagePrevState.list"
        :key="imagePrev.url"
        :style="{ display: 'none' }"
        :src="imagePrevState.prefix + imagePrev.url"
      />
    </a-image-preview-group>
    <XcPreviewPdf
      v-if="modalState.show"
      v-model:visible="modalState.show"
      :file="modalState.file"
      title="pdf预览"
      @close="() => (modalState.show = false)"
    ></XcPreviewPdf>
  </div>
</template>

<script setup lang="tsx">
  import { ref, reactive, watch, PropType, nextTick, toRaw } from 'vue';
  import DraggableModal from '@/components/core/draggable-modal/index.vue';
  import { columns } from './columns';
  import XcPreviewPdf from '@/components/xc/xc-preview/xc-preview-pdf/index.vue';

  const visable = ref(false);
  const activeKey = ref('1');
  const ifPreviewGroup = ref<boolean>(false);
  const imageFail =
    'data:image/png;base64,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';
  type FileInfo = {
    url: string;
    name?: string;
  };
  const modalState = reactive({
    show: false,
    file: { url: '' } as any,
  });
  const props = defineProps({
    fileInfoList: {
      type: Array as PropType<FileInfo[]>,
      default: () => [],
    },
  });
  const state = reactive({
    imgTableData: [],
    fileTableData: [],
  });
  const imagePrevState = reactive({
    visible: false,
    list: [] as FileInfo[],
    prefix: VUE_APP_BASE_API_FILE || import.meta.env.VUE_APP_BASE_API_FILE,
  });
  const filterImage = (list) => {
    state.fileTableData = list.filter((item) => isFile(item.url));
    state.imgTableData = list.filter((item) => !isFile(item.url));
  };
  watch(
    () => props.fileInfoList,
    (list) => {
      filterImage(list);
    },
    {
      immediate: true,
    },
  );
  const setVisibleImage = (isV) => (imagePrevState.visible = isV);
  const isFile = (url) => {
    const fileArr = ['.pdf', '.PDF', '.word', '.xlsx', '.xls', '.doc', '.docx'];
    return fileArr.some((sufix) => url.endsWith(sufix));
  };

  const close = () => {
    visable.value = false;
  };
  const directOpen = (item) => {
    const isF = isFile(item.url);
    if (isF) {
      showFile(item);
    } else {
      showImage(item);
    }
  };
  const show = () => {
    nextTick(_show);
  };
  const _show = () => {
    if (props.fileInfoList.length === 0) {
      return;
    }
    if (props.fileInfoList.length === 1) {
      directOpen(props.fileInfoList[0]);
      return;
    }
    visable.value = true;
  };
  const showGroupImage = (current) => {
    imagePrevState.list = [...toRaw(state.imgTableData)].sort((x: any) => {
      if (x.url === current) {
        return -1;
      }
      return 1;
    });
    imagePrevState.visible = true;
    refreshIamgeGroupPreview();
  };
  const showImage = ({ url }) => {
    imagePrevState.list = [
      {
        url,
      },
    ];
    imagePrevState.visible = true;
    refreshIamgeGroupPreview();
  };
  const showFile = ({ url }) => {
    if (url.endsWith('.pdf')) {
      modalState.file.url = import.meta.env.VUE_APP_BASE_API_FILE + url;
      modalState.show = true;
      return;
    }
    window.open(
      import.meta.env.VUE_APP_BASE_API_FILE + url,
      '_blank',
      'width=1300,height=700,top=200,left=200,menubar=no,toolbar=no,status=no',
    );
  };
  const refreshIamgeGroupPreview = () => {
    ifPreviewGroup.value = false;
    nextTick(() => (ifPreviewGroup.value = true));
  };
  defineExpose({
    show,
  });
</script>

<style lang="less">
  .multi-file-overlay-class {
    max-width: 600px;
    .ant-tooltip-inner {
      color: rgba(0, 0, 0, 0.85);
    }
  }
</style>

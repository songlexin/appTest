<template>
  <div>
    <div id="myViewerImages" ref="myViewerImages" v-show="false" v-viewer="">
      <img v-for="src in state.imgs" :src="src" :key="src" alt="图片" />
    </div>

    <a-modal title="文件预览" :visible="state.dailog" width="50%" centered class="viewDialog">
      <a-tabs type="card">
        <template v-if="state.imgs.length > 0">
          <a-tabs-tab-pane label="图片">
            <a-table
              ref="imgTable"
              :data="state.imgTableData"
              :columns="imgColumns"
              border
              style="width: 100%; height: 350px"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'url'">
                  <a-button @click="showImgs()" plain type="primary">
                    {{ urlFormatter(record.url) }}
                  </a-button>
                </template>
              </template>
            </a-table>
          </a-tabs-tab-pane>
        </template>
        <template v-if="state.files.length > 0">
          <a-tabs-tab-pane label="文件">
            <a-table
              ref="imgTable"
              :data="state.fileTableData"
              :columns="fileColumns"
              border
              style="width: 100%; height: 350px"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'url'">
                  <a-button @click="showFile(record.url)" plain type="primary">
                    {{ urlFormatter(record.url) }}
                  </a-button>
                </template>
              </template>
            </a-table>
          </a-tabs-tab-pane>
        </template>
      </a-tabs>
    </a-modal>
  </div>
</template>

<script setup lang="ts">
  import { imgColumns, fileColumns } from './columns';
  import { reactive, onMounted, ref, watch } from 'vue';
  import { message } from 'ant-design-vue';

  const props = defineProps({
    images: Array,
    fileName: String,
  });
  const state = reactive({
    dailog: false,
    imgs: [] as string[],
    files: [] as any[],
    imgTableData: [
      {
        id: '',
        url: '',
      },
    ] as any[],
    fileTableData: [
      {
        id: '',
        url: '',
      },
    ] as any[],
  });
  watch(
    () => props.images,
    (newValue: any[]) => {
      console.log(222, newValue);
      if (!newValue.length || !newValue) {
        return;
      }
      witchOpen();
    },
  );
  const witchOpen = () => {
    //判断哪个打开
    state.imgs = [];
    state.files = [] as any[];
    let photoArr: any[];
    if (!(props.images instanceof Array)) {
      photoArr = new Array(props.images);
    } else {
      photoArr = props.images;
    }
    photoArr.forEach((url: string) => {
      if (url) {
        if (
          url.endsWith('.pdf') ||
          url.endsWith('.PDF') ||
          url.endsWith('.word') ||
          url.endsWith('.xlsx') ||
          url.endsWith('.xls') ||
          url.endsWith('.doc') ||
          url.endsWith('.docx')
        ) {
          state.files.push(url);
        } else {
          state.imgs.push(url);
        }
      }
    });
    if (!state.imgs.length && !state.files.length) {
      message.warning('暂无文件可浏览');
      state.dailog = false;
      return;
    }
    if (state.files.length === 0 && state.imgs.length !== 0) {
      showImgs();
      return;
    }

    if (state.imgs.length === 0 && state.files.length === 1) {
      window.open(
        state.files[0],
        '_blank',
        'width=1300,height=700,top=200,left=200,menubar=no,toolbar=no,status=no',
      );
      return;
    }

    state.imgTableData = [];
    state.fileTableData = [];
    if (state.imgs.length) {
      state.imgs.forEach((value, index) => {
        let ele = {
          id: index,
          url: value,
        };
        state.imgTableData.push(ele);
      });
    }
    if (state.files.length) {
      state.files.forEach((value, index) => {
        let ele = {
          id: index,
          url: value,
        };
        state.fileTableData.push(ele);
      });
    }
    state.dailog = true;
  };
  const myViewerImages = ref();
  const showImgs = () => {
    setTimeout(() => {
      console.log(123, myViewerImages.value);
      let viewer = myViewerImages.value.$viewer;
      viewer.show();
    }, 100);
  };
  const showFile = (url) => {
    window.open(
      url,
      '_blank',
      'width=1300,height=700,top=200,left=200,menubar=no,toolbar=no,status=no',
    );
  };
  const urlFormatter = (url: string) => {
    if (props.fileName) {
      return props.fileName;
    }
    return url.substr(url.lastIndexOf('/') + 1);
  };
  onMounted(() => {});
</script>

<style lang="less" scoped>
  .viewDialog .a-modal--center .a-modal__body {
    text-align: initial;
    padding: 0 0 0 0;
  }
  .viewDialog .a-table__body-wrapper {
    height: calc(100% - 30px);
    overflow: auto;
  }
</style>

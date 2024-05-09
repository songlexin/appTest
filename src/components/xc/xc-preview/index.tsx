import { defineComponent, onMounted, watch, reactive } from 'vue';
import { Table, Button, message } from 'ant-design-vue';
import type { ColumnsType } from 'ant-design-vue/es/table';
import type { PropType } from 'vue';
import { api as viewerApi } from 'v-viewer';
import ViewerJs from 'viewerjs';
import { DraggableModal } from '@/components/core/draggable-modal';

const Modal: any = DraggableModal;

export default defineComponent({
  props: {
    isShow: {
      type: Boolean as PropType<boolean>,
      default: false,
    },
    urls: {
      type: Array as PropType<string[]>,
      default: [] as any,
    },
    options: {
      type: Object as PropType<ViewerJs.Options>,
      default: {} as any,
    },
  },
  setup(props, { slots, emit }) {
    const state = reactive({
      images: [] as any,
      pdfs: [] as any,
      tableData: [],
      showPdf: false,
      showImage: false,
      pdfUrl: '',
    });

    onMounted(() => {
      doUrls();
    });

    watch(
      () => props.isShow,
      (val) => {
        if (val) {
          state.images = [];
          state.pdfs = [];
          state.tableData = [];
          state.showImage = false;
          doUrls();
        }
      },
    );

    const doUrls = () => {
      const pdfs: string[] = [];
      const images: string[] = [];
      const tableData: any = [];
      let checkFlag = true;
      if (props.urls && props.urls.length > 0) {
        props.urls.forEach((item) => {
          if (item) {
            //兼容2.0 非/sfile开头
            if (!item.startsWith('/sfile/')) {
              item = `/upload/${item}`;
            }
            if (item.split('.').slice(-1)[0] === 'pdf') {
              pdfs.push(item);
            } else {
              images.push(item);
            }
          } else {
            message.info('预览地址为空！');
            checkFlag = false;
          }
        });
      } else {
        checkFlag = false;
      }

      if (checkFlag) {
        state.images = images;
        state.pdfs = pdfs;

        if (state.images.length > 0) {
          state.images.forEach((item, index) => {
            tableData.push({
              key: tableData.length + index + 1,
              sort: tableData.length + index + 1,
              type: '图片',
              path: item,
            });
          });
        }
        if (state.pdfs.length > 0) {
          state.pdfs.forEach((item, index) => {
            tableData.push({
              key: tableData.length + index + 1,
              type: 'pdf',
              path: item,
            });
          });
        }
        state.tableData = tableData;

        if (state.images.length === 0 && state.pdfs.length === 1) {
          state.pdfUrl = state.pdfs[0];
        }
      } else {
        emit('hide');
      }
    };

    const showFile = (record) => {
      if (record.type == '图片') {
        const findIndex = state.images.findIndex((item) => item == record.path);
        const splitImg = state.images.splice(findIndex, state.images.length);
        state.images = splitImg.concat(state.images);
        state.showImage = true;
      } else {
        state.showPdf = true;
        state.pdfUrl = record.path;
      }
    };

    const handleCancel = () => {
      emit('hide');
    };

    const handleOk = () => {
      emit('hide');
    };

    const columns: ColumnsType<any> = [
      {
        title: '文件类型',
        dataIndex: 'type',
        width: 60,
        resizable: true,
        align: 'center',
      },
      {
        title: '路径',
        dataIndex: 'path',
        ellipsis: true,
        resizable: true,
        width: 350,
        align: 'left',
      },
      {
        title: '操作',
        dataIndex: 'action',
        width: 60,
        resizable: true,
        align: 'center',
        customRender: ({ record }) => {
          return (
            <Button type="link" onClick={() => showFile(record)}>
              查看
            </Button>
          );
        },
      },
    ];

    const maxHeight = () => {
      return `${document.documentElement.clientHeight - 64}px`;
    };

    const maxWidth = () => {
      return `${document.documentElement.clientWidth - 64}px`;
    };

    const renderImage = () => {
      if (state.images.length > 0) {
        viewerApi({
          images: state.images,
          options: {
            hide() {
              // 若urls全为图片类型，无pdf
              if (state.pdfs.length == 0) {
                emit('hide');
              } else {
                state.showImage = false;
              }
            },
          },
        });
      }
    };

    const closePdfModal = () => {
      if (state.pdfs.length === 1 && state.images.length === 0) {
        emit('hide');
      } else {
        state.showPdf = false;
      }
    };

    const renderPdf = () => (
      <Modal
        centered={true}
        visible={true}
        title="pdf预览"
        width={maxWidth()}
        onOk={closePdfModal}
        onCancel={closePdfModal}
      >
        <iframe src={state.pdfUrl} style={{ border: 'none', width: '100%', height: maxHeight() }} />
      </Modal>
    );

    return () => (
      <div>
        {props.isShow && props.urls && props.urls.length > 0 ? (
          state.pdfs.length > 0 ? (
            state.pdfs.length === 1 && state.images.length === 0 ? (
              renderPdf()
            ) : (
              <>
                <Modal
                  centered={true}
                  visible={props.isShow}
                  title="文件预览"
                  onCancel={handleCancel}
                  onOk={handleOk}
                >
                  <Table columns={columns} dataSource={state.tableData} pagination={false} />
                </Modal>
                {state.showImage ? renderImage() : ''}
                {state.showPdf ? renderPdf() : ''}
              </>
            )
          ) : (
            renderImage()
          )
        ) : (
          <viewer {...props}>{slots.default ? slots.default() : ''}</viewer>
        )}
      </div>
    );
  },
});

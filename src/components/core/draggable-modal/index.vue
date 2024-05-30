<template>
  <teleport :to="getContainer()">
    <div ref="modalWrapRef" class="custom-modal" :class="{ fullscreen: fullscreenModel }">
      <Modal
        v-bind="omit(props, ['visible', 'onCancel', 'onOk', 'onUpdate:visible', 'width', 'height'])"
        v-model:visible="visibleModel"
        :mask-closable="props.maskClosable || false"
        :get-container="() => modalWrapRef"
        :width="innerWidth || props.width || setWidthByCols(props.colNum)"
        @ok="emit('ok')"
        @cancel="emit('cancel')"
      >
        <template #title>
          <slot name="title">{{ $attrs.title || '标题' }}</slot>
        </template>
        <template #closeIcon>
          <slot name="closeIcon">
            <Space class="ant-modal-operate" @click.stop>
              <template v-if="props.showFullScreenIcon">
                <fullscreen-outlined v-if="!fullscreenModel" @click="fullscreenModel = true" />
                <fullscreen-exit-outlined v-else @click="restore" />
              </template>
              <close-outlined @click="closeModal" />
            </Space>
          </slot>
        </template>
        <div :style="!fullscreenModel ? dymicStyle : ''">
          <slot>
            ① 窗口可以拖动；<br />
            ② 窗口可以通过八个方向改变大小；<br />
            ③ 窗口可以最小化、最大化、还原、关闭；<br />
            ④ 限制窗口最小宽度/高度。
          </slot>
        </div>
        <template v-if="$slots.footer" #footer>
          <slot name="footer"></slot>
        </template>
      </Modal>
    </div>
  </teleport>
</template>

<script lang="ts" setup>
  import { ref, watch, nextTick, reactive, onMounted, onBeforeUnmount } from 'vue';
  import { useRoute } from 'vue-router';
  import { modalProps } from 'ant-design-vue/es/modal/Modal';
  import { CloseOutlined, FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';
  import { useVModel, useResizeObserver, useDebounceFn } from '@vueuse/core';

  import { throttle, omit } from 'lodash-es';
  import { Modal, Space } from 'ant-design-vue';
  const props = defineProps({
    ...modalProps(),
    showFullScreenIcon: {
      type: Boolean,
      default: true,
    },
    destroyOnClose: {
      type: Boolean,
      default: true,
    },
    fullscreen: {
      type: Boolean,
      default: false,
    },
    colNum: {
      type: [Number, String],
      default: 2,
    },
    maxHeight: {
      type: Boolean,
      default: false,
    },
    getContainer: {
      type: Function,
      default: () => document.body,
    },
  });

  const emit = defineEmits(['update:visible', 'update:fullscreen', 'ok', 'cancel']);

  const route = useRoute();
  const visibleModel = useVModel(props, 'visible');
  const fullscreenModel = ref(props.fullscreen);
  const innerWidth = ref('');
  const state = reactive({
    inited: false, // 是否已经初始化过了
  });
  const dymicStyle = reactive({
    'max-width': `${document.documentElement.clientWidth - 64}px`,
    'max-height': `${document.documentElement.clientHeight - 64 - 60 - 32 - 32}px`,
    height: '',
  });
  props.maxHeight && (dymicStyle.height = dymicStyle['max-height']);
  const setWidthByCols = (cols) => {
    const width =
      (cols === 1 && 500) ||
      (cols === 2 && 800) ||
      (cols === 3 && 1200) ||
      (cols === 'max' && parseFloat(dymicStyle['max-width']));
    return `${width}px`;
  };
  const cursorStyle = {
    top: 'n-resize',
    left: 'w-resize',
    right: 'e-resize',
    bottom: 's-resize',
    topLeft: 'nw-resize',
    topright: 'ne-resize',
    bottomLeft: 'sw-resize',
    bottomRight: 'se-resize',
    auto: 'auto',
  } as const;

  const modalWrapRef = ref<HTMLDivElement>();

  const closeModal = () => {
    visibleModel.value = false;
    emit('cancel');
  };
  const nextTask = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 0);
    });
  };
  // 居中弹窗
  const centerModal = async () => {
    await nextTask();
    if (fullscreenModel.value) return;
    const modalEl = modalWrapRef.value?.querySelector<HTMLDivElement>('.ant-modal');
    if (modalEl) {
      let left = (document.documentElement.clientWidth - modalEl.offsetWidth) / 2;
      left = left > 10 ? left : 10;
      let top = (document.documentElement.clientHeight - modalEl.offsetHeight) / 2;
      top = top > 10 ? top : 10;
      modalEl.style.left = `${left}px`;
      modalEl.style.top = `${top}px`;
    }
  };
  onMounted(async () => {
    //  防止初始化的时候就执行

    if (visibleModel.value) {
      await nextTask();
      initDrag();
    }
  });
  onBeforeUnmount(() => {
    watcher && watcher.stop && watcher.stop();
  });
  const getModalContent = () => {
    return modalWrapRef.value?.querySelector<HTMLDivElement>('.ant-modal');
  };
  const debounceFn = useDebounceFn(() => {
    centerModal();
  }, 100);
  const addDialogWather = () => {
    const modalEl = getModalContent();
    if (!modalEl) {
      console.log('未发现监听的元素');
      return;
    }

    return useResizeObserver(modalEl, (entries) => {
      const entry = entries[0];
      const { width, height } = entry.contentRect;
      if (width != 0 && height != 0) {
        debounceFn();
      }
    });
  };
  const restore = async () => {
    fullscreenModel.value = false;
    centerModal();
  };

  const registerDragTitle = (dragEl: HTMLDivElement, handleEl: HTMLDivElement) => {
    handleEl.style.cursor = 'move';
    handleEl.onmousedown = throttle((e: MouseEvent) => {
      if (fullscreenModel.value) return;
      document.body.style.userSelect = 'none';
      const disX = e.clientX - dragEl.getBoundingClientRect().left;
      const disY = e.clientY - dragEl.getBoundingClientRect().top;
      const mousemove = (event: MouseEvent) => {
        if (fullscreenModel.value) return;
        let iL = event.clientX - disX;
        let iT = event.clientY - disY;
        const maxL = document.documentElement.clientWidth - dragEl.offsetWidth;
        const maxT = document.documentElement.clientHeight - dragEl.offsetHeight;
        iL >= maxL && (iL = maxL);
        iT >= maxT && (iT = maxT);
        iL <= 0 && (iL = 0);
        iT <= 0 && (iT = 0);
        dragEl.style.left = `${iL}px`;
        dragEl.style.top = `${iT}px`;
      };
      const mouseup = () => {
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
        document.body.style.userSelect = 'auto';
      };

      document.addEventListener('mousemove', mousemove);
      document.addEventListener('mouseup', mouseup);
    }, 20);
  };
  let watcher;
  const initDrag = async () => {
    await nextTick();
    const modalWrapRefEl = modalWrapRef.value!;
    const modalWrapEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal-wrap');
    const modalEl = modalWrapRefEl.querySelector<HTMLDivElement>('.ant-modal');
    if (modalWrapEl && modalEl) {
      await centerModal();
      watcher = addDialogWather();
      const headerEl = modalEl.querySelector<HTMLDivElement>('.ant-modal-header');
      headerEl && registerDragTitle(modalEl, headerEl);

      modalWrapEl.onmousemove = throttle((event: MouseEvent) => {
        if (fullscreenModel.value) return;
        const left = event.clientX - modalEl.offsetLeft;
        const top = event.clientY - modalEl.offsetTop;
        const right = event.clientX - modalEl.offsetWidth - modalEl.offsetLeft;
        const bottom = event.clientY - modalEl.offsetHeight - modalEl.offsetTop;
        const isLeft = left <= 0 && left > -8;
        const isTop = top < 5 && top > -8;
        const isRight = right >= 0 && right < 8;
        const isBottom = bottom > -5 && bottom < 8;
        // 向左
        if (isLeft && top > 5 && bottom < -5) {
          modalWrapEl.style.cursor = cursorStyle.left;
          // 向上
        } else if (isTop && left > 5 && right < -5) {
          modalWrapEl.style.cursor = cursorStyle.top;
          // 向右
        } else if (isRight && top > 5 && bottom < -5) {
          modalWrapEl.style.cursor = cursorStyle.right;
          // 向下
        } else if (isBottom && left > 5 && right < -5) {
          modalWrapEl.style.cursor = cursorStyle.bottom;
          // 左上角
        } else if (left > -8 && left <= 5 && top <= 5 && top > -8) {
          modalWrapEl.style.cursor = cursorStyle.topLeft;
          // 左下角
        } else if (left > -8 && left <= 5 && bottom <= 5 && bottom > -8) {
          modalWrapEl.style.cursor = cursorStyle.bottomLeft;
          // 右上角
        } else if (right < 8 && right >= -5 && top <= 5 && top > -8) {
          modalWrapEl.style.cursor = cursorStyle.topright;
          // 右下角
        } else if (right < 8 && right >= -5 && bottom <= 5 && bottom > -8) {
          modalWrapEl.style.cursor = cursorStyle.bottomRight;
        } else {
          modalWrapEl.style.cursor = cursorStyle.auto;
        }
      }, 20);
      modalWrapEl.onmousedown = (e: MouseEvent) => {
        if (fullscreenModel.value) return;
        const iParentTop = modalEl.getBoundingClientRect().top;
        const iParentLeft = modalEl.getBoundingClientRect().left;
        const disX = e.clientX - iParentLeft;
        const disY = e.clientY - iParentTop;
        const iParentWidth = modalEl.offsetWidth;
        const iParentHeight = modalEl.offsetHeight;

        const cursor = modalWrapEl.style.cursor;

        const mousemove = throttle((event: MouseEvent) => {
          if (fullscreenModel.value) return;
          if (cursor !== cursorStyle.auto) {
            document.body.style.userSelect = 'none';
          }
          // 向左边拖拽
          if (cursor === cursorStyle.left) {
            modalEl.style.left = `${event.clientX - disX}px`;
            modalEl.style.width = `${iParentWidth + iParentLeft - event.clientX}px`;
            // 向上边拖拽
          } else if (cursor === cursorStyle.top) {
            modalEl.style.top = `${event.clientY - disY}px`;
            modalEl.style.height = `${iParentHeight + iParentTop - event.clientY}px`;
            // 向右边拖拽
          } else if (cursor === cursorStyle.right) {
            modalEl.style.width = `${event.clientX - iParentLeft}px`;
            // 向下拖拽
          } else if (cursor === cursorStyle.bottom) {
            modalEl.style.height = `${event.clientY - iParentTop}px`;
            // 左上角拖拽
          } else if (cursor === cursorStyle.topLeft) {
            modalEl.style.left = `${event.clientX - disX}px`;
            modalEl.style.top = `${event.clientY - disY}px`;
            modalEl.style.height = `${iParentHeight + iParentTop - event.clientY}px`;
            modalEl.style.width = `${iParentWidth + iParentLeft - event.clientX}px`;
            // 右上角拖拽
          } else if (cursor === cursorStyle.topright) {
            modalEl.style.top = `${event.clientY - disY}px`;
            modalEl.style.width = `${event.clientX - iParentLeft}px`;
            modalEl.style.height = `${iParentHeight + iParentTop - event.clientY}px`;
            // 左下角拖拽
          } else if (cursor === cursorStyle.bottomLeft) {
            modalEl.style.left = `${event.clientX - disX}px`;
            modalEl.style.width = `${iParentWidth + iParentLeft - event.clientX}px`;
            modalEl.style.height = `${event.clientY - iParentTop}px`;
            // 右下角拖拽
          } else if (cursor === cursorStyle.bottomRight) {
            modalEl.style.width = `${event.clientX - iParentLeft}px`;
            modalEl.style.height = `${event.clientY - iParentTop}px`;
          }
          innerWidth.value = modalEl.style.width;
        }, 20);

        const mouseup = () => {
          document.removeEventListener('mousemove', mousemove);
          document.removeEventListener('mouseup', mouseup);
          document.body.style.userSelect = 'auto';
          modalWrapEl.style.cursor = cursorStyle.auto;
        };

        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
      };
    }
    state.inited = true;
  };

  watch(visibleModel, async (val) => {
    if ((val && Object.is(state.inited, false)) || props.destroyOnClose) {
      initDrag();
    }
  });

  watch(() => route.fullPath, closeModal);
  // 异步重新去计算尺寸居中
  defineExpose({
    centerModal,
  });
</script>

<style lang="less">
  .custom-modal {
    &.fullscreen {
      .ant-modal {
        top: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        left: 0 !important;
        width: 100% !important;
        height: 100% !important;
        max-width: 100vw !important;
        transform: none !important;
      }
      .ant-modal-content {
        width: 100% !important;
        height: 100% !important;
      }
    }
    .ant-modal {
      position: fixed;
      padding: 0;
      min-height: 200px;
      min-width: 200px;
      .ant-modal-close {
        right: 6px;
        &:hover,
        &:focus {
          color: rgba(0, 0, 0, 0.45);
        }
        .ant-space-item:hover .anticon,
        .ant-space-item:focus .anticon {
          color: rgba(0, 0, 0, 0.75);
          text-decoration: none;
        }
        .ant-modal-close-x {
          width: 50px;
          height: 50px;
          line-height: 44px;
          .ant-space {
            width: 100%;
            height: 100%;
          }
        }
      }
      .ant-modal-content {
        /* width: ~'v-bind("props.width")px'; */
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        min-height: 200px;
        min-width: 200px;
        overflow: hidden;
        .ant-modal-body {
          flex: auto;
          overflow: auto;
          height: 100%;
        }
        .ant-modal-footer {
        }
      }
    }
  }
</style>
<style scoped>
  .custom-modal :deep(.ant-modal-body) {
    padding: 16px;
    padding-bottom: 16px;
  }
</style>

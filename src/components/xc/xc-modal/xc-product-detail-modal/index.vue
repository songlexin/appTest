<template>
  <DraggableModal
    :visible="props.visible"
    :wrap-class-name="'modal-select-box'"
    :wrap-style="{ overflow: 'hidden' }"
    title="产品详情"
    :width="'50%'"
    @cancel="hideModal"
  >
    <div class="xc-page modal-box">
      <div class="xc-header xc-header-entry">
        <div>
          <a-divider class="divider" type="vertical" :style="{ background: selColor }" />基本信息
        </div>
        <div style="padding: 10px 10px 0">
          <a-row>
            <a-col
              v-for="item in props.modalList"
              :key="item"
              :span="12"
              style="margin-bottom: 8px; display: flex"
              class="overflow-hidden"
            >
              <span>{{ item.title }}：</span>
              <span class="info-text overflow" :title="item.val" style="flex: 1">{{
                item.val
              }}</span>
            </a-col>
          </a-row>
        </div>
        <div class="modal-title">
          <div style="padding-bottom: 4px">
            <a-divider type="vertical" class="divider" :style="{ background: selColor }" />UDI码列表
          </div>
        </div>
      </div>
      <a-table
        class="xc-content"
        :columns="props.modalColumns"
        :data-source="props.modalData"
        :pagination="false"
        :scroll="{ y: '100%' }"
        @resizeColumn="handleResizeColumn"
      >
      </a-table>
    </div>
  </DraggableModal>
</template>
<script lang="ts" setup>
  import { DraggableModal } from '@/components/core/draggable-modal';
  import { selColor } from '@/utils/getColor';
  import { PropType } from 'vue';
  const props = defineProps({
    visible: {
      type: Boolean,
      required: true,
    },
    modalList: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
    modalData: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
    modalColumns: {
      type: Array as PropType<any[]>,
      required: true,
      default: () => [],
    },
  });
  const handleResizeColumn = (w, col) => {
    col.width = w;
  };
  const emit = defineEmits(['close']);
  const hideModal = () => {
    emit('close');
  };
</script>
<style lang="less" scoped></style>

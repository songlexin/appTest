<template>
  <DraggableModal
    :visible="state.progress.visible"
    :wrap-style="{ overflow: 'hidden' }"
    width="400px"
    title="进度条"
    :footer="null"
    :closable="state.progress.closable"
    @cancel="back"
  >
    <div>
      <div style="display: flex"
        ><a-progress
          style="margin-right: 8px"
          :percent="state.progress.percent"
          :strokeColor="selColor"
          :show-info="false"
        />{{ state.progress.percent }}%
      </div>
      <div style="text-align: center; margin-top: 24px; font-weight: 500">
        <span v-if="!state.progress.closable">执行中</span>
        <span v-else>执行完毕</span>
        ，成功<span style="color: #52c41a">{{ state.progress.successNum }}</span
        >条，失败<span style="color: #ff4d4f">{{ state.progress.failNum }}</span
        >条
      </div>
    </div>
  </DraggableModal>
</template>
<script lang="ts" setup>
  import { DraggableModal } from '@/components/core/draggable-modal';
  import { selColor } from '@/utils/getColor';
  import { ProgressItem } from './type';
  import { reactive, watch } from 'vue';
  import commonApi from '@/api/common';
  const props = defineProps({
    proKey: {
      type: String,
      required: true,
      default: '',
    },
  });
  watch(
    () => props.proKey,
    (val) => {
      val && updateProgress();
    },
    {
      immediate: false,
      deep: true,
    },
  );

  const back = () => {
    state.progress.visible = false;
    emits('back');
  };
  const state = reactive({
    progress: {
      closable: false,
      visible: false,
      totalNum: 0,
      successNum: 0,
      failNum: 0,
      percent: 0,
    } as ProgressItem,
    intervalId: 0 as any,
    key: '',
  });
  const emits = defineEmits(['reloadList', 'back']);
  const updateProgress = async () => {
    state.progress.visible = true;
    clearInterval(state.intervalId);
    state.intervalId = setInterval(async function () {
      const data = await commonApi.getProgressInfo(props.proKey);
      if (data.data == null) {
        clearInterval(state.intervalId);
        state.progress.closable = true;
      } else {
        const { totalNum, successNum, failNum } = data.data;
        state.progress.totalNum = totalNum;
        state.progress.successNum = successNum;
        state.progress.failNum = failNum;
        state.progress.percent = Math.floor(((failNum + successNum) * 100) / totalNum) || 0;
        state.progress.visible = true;
        if (failNum + successNum >= totalNum) {
          clearInterval(state.intervalId);
          state.progress.closable = true;
          //   searchList();
          emits('reloadList');
        }
      }
    }, 1000);
  };
</script>
<style lang="less" scoped></style>

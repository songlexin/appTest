<template>
  <TextClamp :text="props.text" :max-lines="3" auto-resize>
    <template #after="{ toggle, expanded, clamped }">
      <a-button v-if="expanded || clamped" type="link" size="small" @click="toggle">
        {{ expanded ? '收起' : '展开全部' }}
      </a-button>
    </template>
  </TextClamp>
</template>
<script lang="ts" setup>
  import { TextClamp } from '@/components/basic/text-clamp';
  const props = defineProps({
    text: {
      required: true,
      type: String,
    },
  });
</script>
<style lang="less" scoped></style>

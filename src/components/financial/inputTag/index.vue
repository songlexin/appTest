<template>
  <div class="input-container">
    <div class="input-blocks">
      <Tag
        v-for="(tag, index) in state.tagList"
        :key="index"
        class="input-tag"
        style="margin-bottom: 4px"
        >{{ tag }}</Tag
      >
      <Input
        v-model:value="state.inputValue"
        class="real-input"
        @keyup.enter="addTag"
        @keyup.delete="deleteTag"
        @blur="addTag"
        placeholder="每个标签最多10个字，多个标签请用Enter键分隔"
      ></Input>
    </div>
    <!-- <a-button>添加</a-button> -->
  </div>
</template>
<script lang="ts" setup>
  import { reactive, onMounted } from 'vue';
  import { Tag, Input } from 'ant-design-vue';
  import { selColor, selBg } from '@/utils/getColor';
  const props = defineProps({
    value: {
      type: Array,
      require: true,
      default: () => [],
    },
  });
  const state = reactive({
    inputValue: '',
    tagList: [] as any[],
  });
  const addTag = () => {
    if (state.inputValue) {
      state.tagList.push(state.inputValue);
      state.inputValue = '';
      emit('update:value', state.tagList);
    }
  };
  const deleteTag = () => {
    state.tagList.pop();
    emit('update:value', state.tagList);
  };
  onMounted(() => {
    state.tagList = props.value;
  });
  const emit = defineEmits<{
    (e: 'update:value', value): void;
  }>();
</script>
<style lang="less" scoped>
  @color: #000;
  .input-container {
    display: flex;
  }
  .input-blocks {
    border: 1px solid #d5d5d5;
    background-color: #fff;
    padding: 4px 4px 0px 4px;
    flex: 1;
    .real-input {
      width: 50%;
      border: none;
      padding: 0 0 4px 0;
      outline: 0;
      box-shadow: none;
    }
    .input-tag {
      background-color: v-bind(selBg);
      border-color: v-bind(selColor);
      color: v-bind(selColor);
    }
    .real-input:focus {
      outline: 0 !important;
    }
  }
</style>

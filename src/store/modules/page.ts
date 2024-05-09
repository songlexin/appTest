import { defineStore } from 'pinia';

export const usePageStore = defineStore({
  id: 'page',
  persist: true, // 持久化状态，页面刷新继续保持响应
  state: () => ({
    isLoading: false,
    approvalEnable: true,
  }),
  actions: {
    setIsLoading(bool: boolean) {
      this.isLoading = bool;
    },
    setApprovalEnable(bool: boolean) {
      this.approvalEnable = bool;
    },
  },
});

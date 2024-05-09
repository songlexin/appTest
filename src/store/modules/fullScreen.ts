import { defineStore } from 'pinia';
import { store } from './../../store';
interface FullState {
  screenFullState: boolean;
}
export const useFullScreenStore = defineStore({
  id: 'screenFull',
  state: (): FullState => ({
    screenFullState: false,
  }),

  getters: {
    getScreenFull(): boolean {
      return this.screenFullState;
    },
  },
  actions: {
    changeScreenFull(status) {
      this.screenFullState = status;
    },
  },
});

// 在组件setup函数外使用
export function useFullScreenStoreWithOut() {
  return useFullScreenStore(store);
}

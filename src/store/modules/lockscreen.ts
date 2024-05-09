import { defineStore } from 'pinia';
import { IS_LOCKSCREEN, LOCK_TIME } from '@/enums/cacheEnum';
import { store } from '@/store';
import { Storage } from '@/utils/Storage';

// 长时间不操作默认锁屏时间
if (!Storage.get(LOCK_TIME)) {
  Storage.set(LOCK_TIME, 60 * 60);
}
// null代表缓存过期
if (Storage.get(IS_LOCKSCREEN) === null) {
  Storage.refresh(IS_LOCKSCREEN);
}

const isLock = Storage.get(IS_LOCKSCREEN, false);

export type LockscreenState = {
  isLock: boolean; // 是否锁屏
  lockTime: number;
};

export const useLockscreenStore = defineStore({
  id: 'lockscreen',
  state: (): LockscreenState => ({
    isLock: isLock === true, // 是否锁屏
    lockTime: isLock == 'true' ? Storage.get(LOCK_TIME) : 0,
  }),
  actions: {
    setLock(isLock) {
      this.isLock = isLock;
      Storage.set(IS_LOCKSCREEN, this.isLock);
    },
    setLockTime(lockTime?) {
      if (Storage.get(LOCK_TIME) === null) {
        Storage.refresh(LOCK_TIME);
      }
      const StorageLockTime = Storage.get(LOCK_TIME);
      if (lockTime !== undefined) {
        // 计时器赋值为0了说明一直在取计时器当中的数字 0 ！== undefined
        this.lockTime = lockTime;
      } else {
        // 没有设置时间证明需要取缓存的时间
        this.lockTime = StorageLockTime;
      }
      // this.lockTime = lockTime || StorageLockTime;
    },
  },
});
// 在组件setup函数外使用
export function useLockscreenStoreWithOut() {
  return useLockscreenStore(store);
}

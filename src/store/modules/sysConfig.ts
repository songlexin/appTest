import { defineStore } from 'pinia';
import { store } from '@/store';
import { SYS_CONFIG } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { getSysConfig } from '@/api/system/sysConfig';
interface SysConfigState {
  sysConfig: any;
}
export const useSysConfigStore = defineStore({
  id: 'sysConfig',
  state: (): SysConfigState => ({
    sysConfig: Storage.get(SYS_CONFIG),
  }),
  getters: {
    getSysConfig(confName: any): any {
      return this.sysConfig[confName];
    },
  },
  actions: {
    setSysConfig(config: any) {
      this.sysConfig = config;
      Storage.set(SYS_CONFIG, config);
    },
    initSysConfig(corpId: string) {
      const configObj = Storage.get(SYS_CONFIG);
      if (configObj == null) {
        this.getSystemConfig(corpId);
      } else {
        this.setSysConfig(configObj);
      }
    },
    async getSystemConfig(corpId: string): Promise<any> {
      try {
        const param = {
          mgrRangeId: corpId,
        };
        const data = await getSysConfig(param);
        const conObj = {};
        data.data.forEach((e) => {
          conObj[e.ename] = e.val;
        });
        this.setSysConfig(conObj);
        return conObj;
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});

// Need to be used outside the setup
export function useSysConfigStoreWithOut() {
  return useSysConfigStore(store);
}

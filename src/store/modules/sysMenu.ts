import { defineStore } from 'pinia';
import { store } from '@/store';
import { SYS_MENU } from '@/enums/cacheEnum';
import { Storage } from '@/utils/Storage';
import { permmenu } from '@/api/account';
import { LOGIN_NAME } from '@/router/constant';
import router from '@/router';
interface UserMenuState {
  userMenu: API.Menu[];
}
export const useSysMenuStore = defineStore({
  id: 'userMenu',
  state: (): UserMenuState => ({
    userMenu: Storage.get(SYS_MENU),
  }),
  getters: {
    getUserMenu(): any {
      return this.userMenu;
    },
  },
  actions: {
    setUserMenu(menus: API.Menu[]) {
      this.userMenu = menus;
      Storage.set(SYS_MENU, menus);
    },
    async initUserMenu(userId: string) {
      // let menus = Storage.get(SYS_MENU);
      let menus: API.Menu[] = [];
      if (menus == null || menus.length == 0) {
        try {
          menus = await permmenu(userId);
          this.setUserMenu(menus);
        } catch {
          router.push({
            name: LOGIN_NAME,
          });
        }
      }
      this.setUserMenu(menus);
      return menus;
    },
  },
});

// Need to be used outside the setup
export function useSysConfigStoreWithOut() {
  return useSysMenuStore(store);
}

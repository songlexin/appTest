import { defineStore } from 'pinia';
import { useRoute, useRouter } from 'vue-router';
// import { bimLogin } from '@/api/common';
import { ACCESS_TOKEN_KEY } from '@/enums';
import { usePageStore } from '@/store/modules/page';

interface UserState {
  code: string;
  token: string;
  orderNo: string;
  taskId: string;
  userInfo: {
    uxid?: string;
    projectCode?: string;
    sessionId?: string;
    traceId?: any;
    jsHash?: any;
  };
}

export const useUserStore = defineStore({
  id: 'user',
  persist: true, // 持久化状态，页面刷新继续保持响应
  state: (): UserState => ({
    code: '',
    token: '',
    orderNo: '',
    taskId: '',
    userInfo: {},
  }),
  actions: {
    setOrderNo(orderNo: string) {
      this.orderNo = orderNo;
    },
    setTaskId(taskId: string) {
      this.taskId = taskId;
    },

    // 统一门户跳转过来的登录
    async loginWithCode() {
      // 解析门户url
      const route = useRoute();
      const router = useRouter();
      const pageStore = usePageStore();
      this.code = route.query.code as string;
      console.log('this.code', this.code);
      pageStore.setIsLoading(true);
      // 登录验证
      try {
        // const { code, data, msg } = await bimLogin(
        //   route.query.code as string,
        //   import.meta.env.VITE_APP_CODE,
        // );
        // if (code == 0 && data) {
        //   localStorage.setItem(ACCESS_TOKEN_KEY, data.token);
        //   this.token = data.token;
        //   this.userInfo = data.userInfo || {};
        //   router.push({
        //     name: 'home',
        //     query: route.query,
        //   });
        // } else {
        //   localStorage.setItem(ACCESS_TOKEN_KEY, '');
        //   this.taskId = '';
        //   this.userInfo = {};
        //   showDialog({ message: msg }).then(() => {
        //     router.go(-2);
        //   });
        // }
      } catch (error) {
        localStorage.setItem(ACCESS_TOKEN_KEY, '');
        this.token = '';
        this.userInfo = {};
        console.log('await bimLogin error', error);
      } finally {
        pageStore.setIsLoading(false);
      }
    },
  },
});

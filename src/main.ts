import { createApp } from 'vue';
import App from './App';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { setupStore } from '@/store';
import { setupAntd } from '@/plugins/antd';
import { setupVant } from '@/plugins/vant';
import router from './router';
import '@/assets/iconfont/iconfont.css';
import 'virtual:svg-icons-register';

const app = createApp(App);

dayjs.locale('zh-ch');
setupStore(app);
setupAntd(app);
setupVant(app);
app.use(router);
app.mount('#app');

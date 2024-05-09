import { createApp } from 'vue';
import App from './App';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import { setupStore } from '@/store';
import { setupAntd } from '@/plugins/antd';
import router from './router';
import '@/assets/iconfont/iconfont.css';
import 'virtual:svg-icons-register';
import 'ant-design-vue/dist/antd.css'; // 或者 antd.less
import '@/styles/index.less';

const app = createApp(App);

dayjs.locale('zh-ch');
setupStore(app);
setupAntd(app);
app.use(router);
app.mount('#app');

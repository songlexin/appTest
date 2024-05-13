import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/srmApp',
    redirect: '/srmApp/test',
    children: [
      {
        name: 'test',
        path: 'test',
        component: () => import('@/views/test/index.vue'),
        meta: {
          keepAlive: true,
        },
      },
      {
        name: 'test2',
        path: 'test2',
        component: () => import('@/views/test2/index.vue'),
        meta: {
          keepAlive: true,
        },
      },
    ],
  },
];

export default routes;

import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router';
import Layout from '../layout/index.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Layout,
    redirect: '/overview',
    children: [
      {
        path: 'overview',
        name: 'Overview',
        component: () => import('../views/Overview.vue'),
        meta: { title: '概览', icon: 'Odometer' }
      },
      {
        path: 'food',
        name: 'Food',
        component: () => import('../views/Food.vue'),
        meta: { title: '食物管理', icon: 'Food' }
      },
      {
        path: 'records',
        name: 'Records',
        component: () => import('../views/Records.vue'),
        meta: { title: '识别记录', icon: 'List' }
      },
      {
        path: 'users',
        name: 'Users',
        component: () => import('../views/Users.vue'),
        meta: { title: '用户管理', icon: 'User' }
      },
      {
        path: 'system',
        name: 'System',
        component: () => import('../views/System.vue'),
        meta: { title: '系统配置', icon: 'Setting' }
      }
    ]
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

import { createRouter, createWebHistory } from 'vue-router';

import DefaultLayout from '@/layouts/user/DefaultLayout.vue';

import HomeView from '@/views/user/HomeView.vue';
import ProfileView from '@/views/user/profile/ProfileView.vue';
import PurchaseView from '@/views/user/profile/PurchaseView.vue';
import SellView from '@/views/user/profile/SellView.vue';
import AddProduct from '@/views/user/AddProductView.vue';
import EditProduct from '@/views/user/EditProductView.vue';
import ProductView from '@/views/user/ProductView.vue';
import NotFoundView from '@/views/user/NotFoundView.vue';
import OrderView from '@/views/user/OrderView.vue';

import AdminLogin from '@/views/admin/AdminLogin.vue';
import DefaultSide from '@/layouts/admin/DefaultSide.vue';
import EditUserInfoView from '@/views/admin/EditUserInfoView.vue';
import EditProductByAdminView from '@/views/admin/EditProductByAdminView.vue';
import AddProductByAdminView from '@/views/admin/AddProductByAdminView.vue';
import ManageLog from '@/views/admin/ManageLogView.vue';
import ManageUser from '@/views/admin/ManageUserView.vue';
import ManageDeclaration from '@/views/admin/ManageDeclarationView.vue';
import ManageProductByAdminView from '@/views/admin/ManageProductView.vue';
import ReceiveCodeView from '@/views/user/ReceiveCodeView.vue';
import ErrorView from '@/views/user/ErrorView.vue';
import DeclarationDeatilView from '@/views/admin/DeclarationDetailView.vue';
import { useUserInfoStore } from '@/stores/userInfo';
import { goPageWithReload } from '@/utils/goPage';

// TODO: /profile 로 접근시 profile/:id로 리다리렉트
const router = createRouter({
  scrollBehavior() {
    return { top: 0 };
  },
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'defaultLayout',
      component: DefaultLayout,
      children: [
        { path: '/', name: 'home', component: HomeView, meta: { every: true } },
        { path: 'profile/:id', name: 'profile', component: ProfileView },
        { path: 'profile/:id/purchase', name: 'purchase', component: PurchaseView },
        { path: 'profile/:id/sell', name: 'sell', component: SellView },
        { path: 'product/:id', name: 'product', component: ProductView },
        { path: 'product/:id/order', name: 'view order', component: OrderView },
        { path: 'product/add', name: 'add product', component: AddProduct },
        { path: 'product/edit/:id', name: 'edit product', component: EditProduct },
        { path: 'err/:type', name: 'login err', component: ErrorView },
        { path: '/google-callback', name: 'receive code', component: ReceiveCodeView },
        {
          path: '/404',
          name: 'notFound',
          component: NotFoundView
        },
        {
          path: '/:pathMatch(.*)*',
          redirect: '/404'
        }
      ]
    },
    {
      path: '/admin',
      name: 'admin page',
      component: AdminLogin
    },
    {
      path: '/admin',
      name: 'In admin page',
      component: DefaultSide,
      children: [
        { path: 'log', name: 'admin log', component: ManageLog },
        { path: 'manage/user', name: 'admin manage user', component: ManageUser },
        { path: 'manage/user/:id', name: 'admin manage user detail', component: EditUserInfoView },
        { path: 'product/edit/:id', name: 'admin edit product', component: EditProductByAdminView },
        {
          path: 'product/manage',
          name: 'admin manage product',
          component: ManageProductByAdminView
        },
        { path: 'product/manage/add', name: 'admin add product', component: AddProductByAdminView },
        { path: 'product/manage/:id', name: 'admin product', component: ProductView },
        { path: 'declaration', name: 'admin declaration', component: ManageDeclaration },
        {
          path: 'declaration/manage/:id',
          name: 'admin manage declaration detail',
          component: DeclarationDeatilView
        }
      ]
    }
  ]
});
router.beforeEach((to, form, next) => {
  const store = useUserInfoStore();

  if (store.id === 0 && !to.meta.every) {
    alert('로그인 후 이용해 주세요');
    goPageWithReload();
    return;
  }
  next();
});
export default router;

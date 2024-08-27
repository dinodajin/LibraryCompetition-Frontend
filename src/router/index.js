import { createRouter, createWebHistory } from 'vue-router'
import UserSearch from '@/components/pages/UserSearch.vue'
import UserDetail from '@/components/pages/UserDetail.vue'
import BookSearch from '@/components/pages/BookSearch.vue'
import BookDetail from '@/components/pages/BookDetail.vue'

const routes = [
  {
    path: '/',
    component: UserSearch
  },
  {
    path: '/userdetail',
    component: UserDetail
  },
  {
    path: '/book',
    component: BookSearch
  },
  {
    path: '/bookdetail',
    component: BookDetail
  }
]

const router = createRouter({
  history: createWebHistory(), // Use history mode
  routes
})

export default router

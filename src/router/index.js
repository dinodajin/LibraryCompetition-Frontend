import { createRouter, createWebHistory } from 'vue-router'
import MemberSearch from '@/components/pages/MemberSearch.vue'
import MemberDetail from '@/components/pages/MemberDetail.vue'
import BookSearch from '@/components/pages/BookSearch.vue'
import BookDetail from '@/components/pages/BookDetail.vue'
import ImageDetail from '@/components/pages/ImageDetail.vue'

const routes = [
  {
    path: '/member',
    component: MemberSearch
  },
  {
    path: '/memberdetail',
    component: MemberDetail,
    name: 'MemberDetail'
  },
  {
    path: '/book',
    component: BookSearch
  },
  {
    path: '/bookdetail',
    component: BookDetail
  },
  {
    path: '/image',
    component: ImageDetail
  }
]

const router = createRouter({
  history: createWebHistory(), // Use history mode
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import ResultsPage from '../views/Dashboard/Results.vue'
import Dashboard from '@/views/Dashboard/Index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Dashboard,
			children: [
				{
					path: '/',
					name: 'dashboard',
					component: Dashboard
				}, {
					path: '/result',
					name: 'dashboard',
					component: ResultsPage
				}
			]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router

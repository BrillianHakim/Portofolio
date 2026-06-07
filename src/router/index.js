import { createRouter, createWebHistory } from 'vue-router'
import { supabase } from '../lib/supabase'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import Achievements from '../pages/Achievements.vue'
import Contact from '../pages/Contact.vue'

import AdminLogin from '../pages/admin/Login.vue'
import AdminDashboard from '../pages/admin/Dashboard.vue'
import AdminProjects from '../pages/admin/Projects.vue'
import AdminAchievements from '../pages/admin/Achievements.vue'
import AdminLayout from '../layouts/AdminLayout.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/achievements', component: Achievements },
  { path: '/contact', component: Contact },

  { path: '/admin/login', component: AdminLogin },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'projects', component: AdminProjects },
      { path: 'achievements', component: AdminAchievements },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    next()
  } else {
    next('/admin/login')
  }
})

export default router
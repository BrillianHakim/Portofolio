import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import About from '../pages/About.vue'
import Projects from '../pages/Projects.vue'
import Achievements from '../pages/Achievements.vue'
import Contact from '../pages/Contact.vue'
import Chat from '../pages/Chat.vue'

import AdminLogin from '../pages/admin/Login.vue'
import AdminDashboard from '../pages/admin/Dashboard.vue'
import AdminProjects from '../pages/admin/Projects.vue'
import AdminAchievements from '../pages/admin/Achievements.vue'
import AdminLayout from '../layouts/AdminLayout.vue'
import AdminChat from '../pages/admin/Chat.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/projects', component: Projects },
  { path: '/achievements', component: Achievements },
  { path: '/contact', component: Contact },
  { path: '/chat', component: Chat },

  { path: '/admin/login', component: AdminLogin },

  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true },
    children: [
      { path: 'dashboard', component: AdminDashboard },
      { path: 'projects', component: AdminProjects },
      { path: 'achievements', component: AdminAchievements },
      { path: 'chat', component: AdminChat },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// ✅ Guard yang benar: verify token ke backend
router.beforeEach(async (to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const token = localStorage.getItem('token')

  // Tidak ada token sama sekali → langsung redirect
  if (!token) return next('/admin/login')

  try {
    // Verify token ke backend, jangan hanya cek "ada atau tidak"
    const res = await fetch('http://localhost:5000/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` }
    })

    if (res.ok) {
      next() // Token valid → izinkan masuk
    } else {
      localStorage.removeItem('token') // Buang token yang tidak valid
      next('/admin/login')
    }
  } catch (err) {
    // Jika backend tidak bisa dihubungi
    localStorage.removeItem('token')
    next('/admin/login')
  }
})

export default router
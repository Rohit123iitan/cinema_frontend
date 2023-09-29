import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import( '../views/Login.vue'),
    children: [
      {
        path: '/',
        component: () => import('../views/user_login.vue')
      },
      {
        path: '/admin_login',
        component: () => import( '../views/Admin.vue')
      },
      {
        path: '/user_reg',
        component: () => import(/* webpackChunkName: "about" */ '../components/User/user_registration.vue')
      }
    ]
  },
  
  {
    path: '/admin',
    component: () => import( '../components/Admin/Admin_Navbar.vue'),
    children: [
      {
        path: '',
        component: () => import( '../components/Admin/home.vue')
      },
      {
        path: 'theater',
        component: () => import('../components/Admin/Theater.vue')
      },
      {
        path: 'movies',
        component: () => import( '../components/Admin/Movies.vue')
      }
    ]
  },
  {
    path: '/user',
    component: () => import( '../components/User/User_navbar.vue'),
    children: [
      {
        path: '',
        component: () => import('../components/User/home.vue')
      },
      {
        path: 'movies',
        component: () => import( '../components/User/movies.vue')
      },
      {
        path: 'booking/:id',
        component: () => import( '../components/User/Booking.vue'),
        props:true
      },
      {
        path: 'my_booking',
        component: () => import('../components/User/my_booking.vue')
      },
      {
        path: 'my_booking/details/:id',
        component: () => import('../components/User/Details.vue'),
        props:true
      },
      {
        path: 'theaters',
        component: () => import('../components/User/Theater.vue'),
      },
      {
        path: 'search/movies/:id',
        component: () => import('../components/User/Search_movie_result.vue'),
        props:true
      },
      {
        path: 'search/theaters/:name',
        component: () => import('../components/User/Search_theater_result .vue'),
        props:true
      },
      {
        path: 'theaters/details/:name/:Id',
        component: () => import('../components/User/Theater_Details.vue'),
        props:true
      },
    ]
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
// import About from '../views/About.vue'

import VueRouters from '../routes'
let aaa = () => import("./../components/aaa.vue");
let bbb = () => import("./../components/bbb.vue");
let test = () => import("./../components/test.vue");
let Home = () => import("./../views/Home.vue");

const routes = [{
    path: '/',
    name: 'Home',
    // redirect:"/about",
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // beforeEnter: (to, from, next) => {
    //   console.log("执行了路由 中的beforeEnter");
    //   next();
    //   // ...
    // },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import( /* webpackChunkName: "about" */ '../views/About.vue'),
    children: [{
        path: 'aaa',
        component: aaa
      },
      {
        path: 'bbb',
        component: bbb
      }
    ]
  },
  {
    path: "/test",
    name: "test",
    component: {
      methods: {
        btn() {
          console.log(11111);
        }
      },
      render: (h) => {
        return h("button", {
          on: {
            click: function () {
              console.log(33333333)
            }
          },
        })
      }
    }
  }
]
Vue.use(VueRouters)
// // VueRouters.install();
// // moren

let routers = new VueRouters({
  mode: 'hash',
  routes
});


// Vue.use(VueRouter);
// const router = new VueRouter({
//   // mode: 'history',
//   // base: "http://www.baodu.com/",
//   routes
// })




// router.beforeEach((to, from, next) => {
//   console.log(to,from);
//   console.log(
//     "执行了”beforeEach"
//   );
//   // if (to.name !== 'Login' && !isAuthenticated) next({
//   //   name: 'Login'
//   // })
//   // 如果用户未能验证身份，则 `next` 会被调用两次
//   next()
// })


// router.afterEach((to, from) => {
//   // ...
//   console.log(
//     "执行了”afterEach"
//   );
// })

// export default router;

export default routers

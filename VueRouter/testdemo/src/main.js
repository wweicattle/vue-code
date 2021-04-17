import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
console.log();
Vue.config.productionTip = false
let about=()=>import("./views/About.vue");
// console.log(about);
// about().then(da=>{
//   console.log(da.default.render);
// })
Vue.component("my-component", {
  functional: true,
  data(){
    return {name:"wuwei"}
  },
  // Props 是可选的
  props: {
    title:"wuweinishizuibangde"
    // ...
  },
  // 为了弥补缺少的实例
  // 提供第二个参数作为上下文
  render: function (createElement, context) {
    console.log(context);
    // ...
    // debugger;
   return  createElement("button","wuwei");
  },
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

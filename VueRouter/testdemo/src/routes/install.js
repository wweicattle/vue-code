// import { debug } from "node:console";
import routerView from "./view.js"
import routerLink from "./viewLink.js"

// import Vue from "vue";
export default function install(Vue) {
  // 每个组件混入该生命周期
  Vue.mixin({
    beforeCreate() {
      // 判断是否是根组件options中才有router，在你new Vue时会传入一个router
      if (this.$options.router) {
        this._rootRouter = this;
        this._router = this.$options.router;
        // 初始化
        this._router.init(this)
        // 进行设置—router的响应式，当——route发生变化时会进行页面更新
        Vue.util.defineReactive(this, "_route", this._router.history.current);
      } else {
        this._rootRouter = this.$parent && this.$parent._rootRouter;
      }
    },
  });

  Object.defineProperty(Vue.prototype, "$route", {
    get() {
      return this._rootRouter._route;
    }
  })
  Object.defineProperty(Vue.prototype, "$router", {
    get() {
      return this._rootRouter._router;
    }
  })

  Vue.component('RouterView', routerView);
  Vue.component('RouterLink',
    routerLink
  );
}

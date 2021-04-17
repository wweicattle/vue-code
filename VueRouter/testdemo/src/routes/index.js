import Vue from "vue";
import install from "./install.js";
import createMatcher from "./createMatcher"
import HASHHistory from "./hashhistory"


export default function VueRouters(options) {
  // 返回一个match,addRoutes,
  this.matcher = createMatcher(options || [])
  this.mode = options.mode ? options.mode : "hash";
  // 如果是一个
  this.history = new HASHHistory(this);
  this.init=function(app){
    console.log("intinitinti----------");
    let setlister = function (ss) {
      let _that=ss;
      // debugger;
      _that.history.setlister();
    }
    // debugger;
    // 默认会请求一次
    //     console.log(this.history.getCurrentLocation());
    this.history.transitionTo(this.history.getCurrentLocation(), setlister(this));

    // 视图更新
    this.history.listen(route=>{
      app._route=route;
    })

    
   
  }
  this.match=function(location) {
    return this.matcher["match"](location)
  }
  this.push=function(path){
      this.history.push(path);
      return  "wuwei"
  }
  this.addRoutes=function(routes){
    this.matcher.addRoutes(routes);
  }
}
VueRouters.install = install;

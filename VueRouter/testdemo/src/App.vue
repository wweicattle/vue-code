<template>
  <div id="app">
    <div id="nav">
      app.vue
      <!-- <my-component dsf="43" name="wukai" age="27"></my-component> -->
      <router-link to="/?name=323">Homessss</router-link>
      <router-link to="/about">Aboutabout</router-link>
      <!-- <a href="http://www.baodu.com">baidu</a> -->
      <!-- <router-link to="/test">About</router-link> -->
      <!-- <a href="#/about/aaa" class="a">testest</a> -->
    </div>
    <router-view />
  </div>
</template>
<script>
export default {
  props: {
    user: {
      type: String,
      default: "wuwei",
    },
  },
  username() {
    return user;
  },
  created() {
    console.log(this.$route);
    console.log("App- create zhixing");
  },
  mounted() {
    console.log("App-mounted");
  },
  beforeRouteEnter(to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建
    console.log("App-执行了beforeRouteEnter");
    next();
  },
};
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
a {
  cursor: pointer;
  text-decoration: underline;
}
</style>

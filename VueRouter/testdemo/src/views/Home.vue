<template>
  <div class="home">
    <div>home content</div>
    <img alt="Vue logo" src="../assets/logo.png" />
    <!-- <HelloWorld msg="Welcome to Your Vue.js Home"/>
    <div>---------------</div>
    <Function></Function> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue';
// import Function from '@/components/functions.vue'
// console.log(Function.render);
export default {
  name: "Home",
  components: {
    // HelloWorld,
    // Function
  },
  created() {
    console.log(this.$route)
    console.log("HOme create zhixing");
  },
 mounted() {
   console.log("Home-mounted")
 },
  // beforeRouteEnter(to, from, next) {
  //   // 在渲染该组件的对应路由被 confirm 前调用
  //   // 不！能！获取组件实例 `this`
  //   // 因为当守卫执行前，组件实例还没被创建
  //   console.log("HOme-执行了beforeRouteEnter");
  //   next();
  // },
  // beforeRouteUpdate(to, from, next) {
  //   // 在当前路由改变，但是该组件被复用时调用
  //   // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  //   // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  //   // 可以访问组件实例 `this`
  //   console.log("HOme-zhxiinglbeforeRouteUpdate");
  //   next();
  // },
  // beforeRouteLeave(to, from, next) {
  //   // 导航离开该组件的对应路由时调用
  //   // 可以访问组件实例 `this`
  //   console.log("HOme-执行了beforeRouteLeave");
  //   next();
  // },
};
</script>

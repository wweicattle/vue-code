<template>
  <div>
    <div>{{$store.state.b.name}}</div>
    <div>{{$store.state.name}}</div>
    <div>{{$store.state.b.c.asd}}</div>
    <div>{{$store.state.newModule.aa.as}}</div>
    <!-- <div @click="$store.state.b.c=100">sas</div> -->
    <span>{{obj.as.ds}}</span>
    <span>{{obj.as.ds}}</span>
    <div @click="btn">click</div>
    <div>{{$store.getters.get}}222</div>
    <button @click="$store.commit('num',10)">click++num</button>
    <button @click="$store.commit('b/num',12)">cla/numm</button>
    <button @click="$store.dispatch('action',20)">action++num</button>
    <HE ref="sa" @hook:mounted="mountes"></HE>
    <HE ref="sa" @hook:beforeCreate="mountes">heloworld</HE>

  </div>
</template>
<script>
import HE from "./components/HelloWorld";
export default {
  name: "App",
  components: {
    HE
  },
  data() {
    return {
      obj: { as: { ds: 23 } }
    };
  },
  methods: {
    btn() {
      this.$store.state.name.f = 233;
      this.obj.as.ds = 2434;
      clearInterval(this.$children[0].timer);
      this.$children[0].timer = null;
    },
    mountes() {
      console.log("erererrrrrrrrrrrrrrrrrrr");
    }
  },
  mounted() {}
};
</script>
<style  scoped>
</style>

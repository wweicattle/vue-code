<template>
  <div>sf</div>
</template>
<script>
export default {
  name: "App",
  data() {
    return {
      timer: null
    };
  },
  beforeCreate(){
    this.$once("hook:created", () => {
      console.log("creade");
    });
  },
  // created() {
  //   this.timer = setInterval(() => {
  //     // console.log("begin");
  //   }, 1000);
   
  // },
  
  

};
</script>
<style  scoped>
</style>
<template functional>
  <div>{{ props.user }}{{ $options }}{{ data }}</div>
</template>

<script>
export default {
  // functional:true,
  data() {
    return {
      sad: 233,
    };
  },
  created(){
    console.log(this);
  },
  props: {
    user: {
      type: String,
      default: "Wuwei",
    },
  },
  created() {},
  mounted() {},
  methods: {},
  render(h, ctc) {
    console.log(22222222);
    console.log(ctc, h);
    // retur
    return h("h1", "一则头条");
  },
};
</script>

<style scoped lang="less">
</style>

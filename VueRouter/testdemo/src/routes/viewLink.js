export default {
  functional: true,
  methods: {

  },
  render(h, ctx) {
    console.log(h);
    console.log(ctx);
    return h("a", {
      'class': {
        foo: true,
        bar: false
      },
      // 与 `v-bind:style` 的 API 相同，
      // 接受一个字符串、对象，或对象组成的数组
      style: {
        color: 'red',
        fontSize: '14px'
      },
      on: {
        click: function nativeClickHandler(e) {
          console.log(111111111111111111);
          e.preventDefault();
          e.stopPropagation();
        //   window.location.hash = ctx.data.attrs.to;
          // console.log(ctx.data.attrs.to);
          // console.log( ctx.parent.$router);
          // window.location.hash="/sas"
          ctx.parent.$router.push(ctx.data.attrs.to||'/');
        }
      },
      // 普通的 HTML attribute
      attrs: {
        id: 'foo',
        // href: "/sasas"
      },
      // 组件 prop
      props: {
        myProp: 'bar'
      },
      // DOM property
      //   domProps: {
      //     innerHTML: 'baz'
      //   },
      // 事件监听器在 `on` 内，
      // 但不再支持如 `v-on:keyup.enter` 这样的修饰器。
      // 需要在处理函数中手动检查 keyCode。

      // 仅用于组件，用于监听原生事件，而不是组件内部使用
      // `vm.$emit` 触发的事件。

      // 自定义指令。注意，你无法对 `binding` 中的 `oldValue`
      // 赋值，因为 Vue 已经自动为你进行了同步。

    }, [ctx.scopedSlots.default()]);
  }
}

export default {
  functional: true,
  render(h, {
    parent,
    data
  }) {
    let route = parent.$route;
    let match = route.matched;
    data.routerViews = true;
    let depth = 0
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerViews) {
        depth++;
      }
      parent = parent.$parent;
    }
    let record = match[depth];
    if (!record) {
      return h()
    }
    let component = record.component;
    return h(component, data)
  }
}

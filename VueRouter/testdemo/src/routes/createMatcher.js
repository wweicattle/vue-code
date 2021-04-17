import createRouteMap from "./createRouteMap"

// 路由对象{path,matched 中间还可能有父组件component}
function createRoute(record, location) {
  let res = [];
  if (record) {
    while (record) {
      res.unshift(record);
      record = record.parent;
    }
  }
  return {
    ...location,
    matched: res
  }

}


// 
export default function createMatcher(options) {
  // 返回路由的列表，组件映射关系
  var {
    pathList,
    pathMap
  } = createRouteMap(options.routes);
  console.log(pathList, pathMap);

  // 添加动态路由
  function addRoutes(routes) {
    let obj = createRouteMap(routes, pathList, pathMap);
  }

  

  // 当路由发生变化的时候，会进行查找该路由 所对应的映射关系，router-view 会用到
  function match(location) {
    let record = pathMap[location];
    let local = {
      path: location
    }
    // 找到当前的记录
    // 需要 到对应的记录，并且根据记录产生一个匹配 的数组
    if (record) {
      return createRoute(record, local)
    }
    // 没有记录则返回为空
    return createRoute(null, local)

  }
  return {
    match,
    addRoutes
  }

}

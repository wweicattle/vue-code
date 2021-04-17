import router from "../router";

export default function createRouteMap(routes, pathList, pathMap) {

  // 处理routes中的路由映射
  pathList = pathList ? pathList : [];
  pathMap = pathMap ? pathMap : Object.create(null);

  //   
  routes.forEach(val => {
    addRoutesRecord(val, pathList, pathMap);
  })

  return {
    pathList,
    pathMap
  }

}

function addRoutesRecord(routes, pathList, pathMap, parent) {
  let path
  if (parent) {
    path = `${parent.path}/${routes.path}`;
  } else {
    path = routes.path;
  }
  let record = {
    path: path,
    component: routes.component,
    parent
  }
  if (!pathMap[path]) {
    pathList.push(path);
    pathMap[path] = record;
  }

  //   如果有children 就继续遍历，生成扁平化放进数组

  if (routes.children) {
    routes.children.forEach(val => {
      addRoutesRecord(val, pathList, pathMap, routes)
    })
  }


}

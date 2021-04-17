
export default function basehistory(router) {
  console.log(router);
  this.router = router;
  // 默认会有表示当前的路径
  // {/record:[abouta,about]}
  this.current = createRoute(null, {
    path: "/"
  })

  // 跳转的核心逻辑location 代表跳转 的目的地
  this.transitionTo=function(location, oncomplete) {
    // this.location="/home"
    let routes=this.router.match(location);
    console.log(routes);
    // if(!location)location="/"
    if(this.current.path==location&&this.current.matched.length==routes.matched.length){
      return;
    }
    getCurrent(this,routes)
    oncomplete && oncomplete();


    // 执行页面的更新
    this.cb&&this.cb(routes);
  }

  this.listen=function(cb){
    this.cb=cb;
  }


  // push
  this.push=function(path){
    // console.log(path);
    this.transitionTo(path);
    window.location.hash=path;

  }
}
function getCurrent(_that,routes){
  _that.current=routes;
  // console.log(this.current)
}
export function createRoute(record, location) {
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
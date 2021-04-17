import basehistory from "./basehistory";
// console.log(basehistory);

function ensure(){
  if(!window.location.hash)window.location.hash="/";
}
function getHash(){
  ensure();
  return window.location.hash.slice(1);
}

export default class HASHHistory extends basehistory {
  constructor(app) {
      super(app);
      
  }
  getCurrentLocation() {
    return getHash();
  }
  setlister() {
    // 跳转成功之后
    window.addEventListener("hashchange", () => {
      this.transitionTo(getHash());
      // console.log();
    })
  }
}

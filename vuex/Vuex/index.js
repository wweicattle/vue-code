let Vue;
// 封装一个遍历对象的方法，之后会很常调用
let forEachs = function (obj, callBack) {
    Object.keys(obj).forEach(val => {
        callBack(val, obj[val])
    })
}
var obj = { sad: 343, dsf: 343 }
forEachs(obj, function (a, b) {
    // console.log(a, b);
})
// let num=fasle;
// 对store中的state,getters,actions,进行初始化操作。
function istallInit(store, rootState, path, rawModule, keys) {
    // state初始化,对模块中的state树形结构进行响应。
    if (path.length > 0) {
        let parent = path.slice(0, -1).reduce((root, val, index) => {
            return root[val];
        }, rootState)
        // 添加新的state属性
        Vue.set(parent, path[path.length - 1], rawModule.state)
    }
    // mutations初始化
    if (rawModule._raw.mutations) {
        console.log(rawModule);
        forEachs(rawModule._raw.mutations, (key, value) => {
            // 对模块中有namspced后面可以使用commit("a/num")进行触发
            if (rawModule.namspaced) {
                let type = keys + "/" + key;
                let arr = store.mutations[type] || (store.mutations[type] = []);
                arr.push((payload) => {
                    value(rawModule._raw.state, payload)
                })
            }
            // 这段很神，收集mutations,先赋值一个空数组，下次执行就会有值不是空数组。
            let arr = store.mutations[key] || (store.mutations[key] = []);
            arr.push((payload) => {
                value(rawModule._raw.state, payload)
            })
        })
    }
    // actions初始化
    if (rawModule._raw.actions) {
        forEachs(rawModule._raw.actions, (key, value) => {
            //收集actions(与mutations逻辑一样)
            let arr = store.actions[key] || (store.actions[key] = []);
            arr.push((payload) => {
                value(store, payload);
            })
        })
    }
    // 遍历子模块中的初始化
    forEachs(rawModule._children, (key, value) => {
        istallInit(store, rootState, path.concat(key), value, key);
    })
}
class Store {
    constructor(options) {
        // 对options中state进行响应。添加一个新的vue实例
        this.vm = new Vue({
            store: this,
            data: {
                state: options.state
            }
        })

        // 设置mutations原理
        let mutations = options.mutations;
        this.mutations = {
        };
        // forEachs(mutations, (key, value) => {
        //     this.mutations[key] = (payload) => {
        //         value(this.state, payload)
        //     }
        // })

        // 设置actions原理
        let actions = options.actions;
        this.actions = {};
        // forEachs(actions, (key, value) => {
        //     this.actions[key] = (payload) => {
        //         value(this,payload);
        //     }
        // }) 
        //设置getters原理
        let getters = options.getters;
        this.getters = {};
        forEachs(getters, (key, value) => {
            // 对getters中的属性进行劫持，因为每次获取可能会有state中的属性结合。
            Object.defineProperty(this.getters, key, {
                get: () => {
                    return value(this.state);
                }
            })
        });

        // 收集实例化传入的options，给实例化一个module：由模块间的树形结构组成
        // 之后对每个模块进行初始化。
        class ModuleCollection {
            constructor(options) {
                this.rigester([], options);
                this.options = options;
            }
            addModule(moduleName, obj) {
                if (moduleName && obj) {
                    // console.log(this);
                    this.options.modules[moduleName] = obj;
                    this.addmodule = new ModuleCollection(options);
                }
            };
            rigester(path, options) {
                let rawModule = {
                    _raw: options,
                    _children: {},
                    state: options.state,
                    namspaced: options.namspaced
                };
                if (!this.root) {
                    this.root = rawModule;
                } else {
                    let parentModule = path.slice(0, -1).reduce((root, val) => {
                        return root._children[val];
                    }, this.root)
                    // console.log(parentModule);
                    // console.log(path);
                    parentModule._children[path[path.length - 1]] = rawModule;
                }

                if (options.modules) {
                    forEachs(options.modules, (key, value) => {
                        this.rigester(path.concat(key), value)
                    })
                }
            }
        }
        this.module = new ModuleCollection(options);
        istallInit(this, this.state, [], this.module.root)
    };
    get state() {
        return this.vm.state
    };

    commit = (mutationName, payload) => {
        this.mutations[mutationName].forEach(fn => fn(payload));

    };
    dispatch = (actionsName, payload) => {
        this.actions[actionsName].forEach(fn => fn(payload));
    };
    
    regesterModule(moduleName, obj) {
        this.module.addModule(moduleName, obj);
        istallInit(this, this.state, [], this.module.addmodule.root)
        // console.log(this);
    }
};


// vue.use()的开始，默认会执行插件的install方法，所以插件中必须有定义install（）；
const install = (_vue) => {
    Vue = _vue;
    // 以下代码是让所有的vue实例组件都存在$store,这样可方便存取（因为也是发布定阅模式），混入一个生命周期再
    // 任何实例中，这样就有两个生命beforecreate（）；
    Vue.mixin({
        beforeCreate() {
            // 这里面的this指向是实例组件，因为你可以看成是一个函数，之后在哪里调用，this就指向谁。
            // 由跟组件实例创建到子组件，接着判断实例上有无store（没有父类上找）
            if (this.$options.store) {
                this.$store = this.$options.store;
            } else {
                this.$store = this.$parent.$options.store;
            }
        }
    })
}
export default {
    Store,
    install
}
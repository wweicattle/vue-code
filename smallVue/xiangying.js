// 当前Vue的实例
class Vue {
    constructor(options) {
        // 当前实例上有的属性
        this.$options = options;
        this.$data = options.data;
        this.$el = options.el;

        // 1.开始执行对Vue中的data数据劫持，并设置Object.defineProperty();
        // 为每个data的属性进行对应一个Dep，发布者
        new Observer(this.$data, this);

        // 对data中的数据做一层代理
        // 暴露在该实例的属性上
        // varobj={
        // $data:
        // $options:
        // age:14,
        // name:"Wuwei"
        // }
        Object.keys(this.$data).forEach(val => {
            this.proxy(val);
        });

        // 3.进行对EL模板的编译
        new Complier(this.$el, this);


    }
    // 代理的方法
    proxy(key) {
        Object.defineProperty(this, key, {
            configurable: true,
            enumerable: true,
            set(newValue) {
                this.$data[key] = newValue;
            },
            get() {
                return this.$data[key]
            }
        })
    }


}

// 数据劫持该vue中的data数据进行Obeject.defineProperty
class Observer {
    constructor(data, vm) {
        console.log(this);
        this.data = data;
        this.dep = new Dep();
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                // 当data中的属性对应的属性值是一个数组的形式的话
                // 就执行defineArray方法
                defineArray(this.data, key, this.data[key], this);
            } else {
                this.define(this.data, key, data[key]);
            }
        });

    };
    define(data, key, val) {
        const dep = new Dep();
        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: true,
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }
                return val;
            },
            set(newValue) {
                if (newValue === val) {
                    return;
                }
                val = newValue;
                console.log(dep.notify());

            }

        })
    }
}

//发布者类
class Dep {
    constructor() {
        this.sub = [];
    };
    addSub(watch) {
        this.sub.push(watch);
    };
    notify() {
        console.log(this.sub);
        this.sub.forEach((val) => {
            val.update();
        });
        return 42224;
    }
}

// 订阅者类，
// 1.为的是以后每一个节点对应一个订阅者
// 2.每一个订阅者会被加入到发布者中的一个subs数组
class Watcher {
    constructor(node, name, vm) {
        this.node = node;
        this.name = name;
        this.vm = vm;
        // 把每一个订阅者赋值Dep.target;
        // 后会放进发布者Dep中的数组，每个数组都对应着一个该订阅者的自己update，this，等
        Dep.target = this;
        this.update();
        Dep.target = null;
        // console.log(this.vm.message1);
    };

    // 订阅者们更新自己的节点方式
    update() {
        // 如果这个节点是标签的话，一定是一个input标签
        if (this.node.nodeType === 1) {
            this.node.value = this.vm[this.name];
        } else {
            // 不然就是文本节点
            // 该节点是{{}}{{}}大于2的形式
            var reg1 = /(\{\{.*\}\}){2,}/;
            if (reg1.test(this.name)) {
                var reg1 = /\{\{\w*\}\}/g;
                var gg = this.name.match(reg1);
                var f = gg.map(val => {
                    return val.slice(2, -2);
                })
                this.node.nodeValue = "";
                f.forEach(val => {
                    // 如果该是一个输出的是一个数组的话输出到页面上的形式就不一样
                    if (Array.isArray(this.vm[val]) === true) {
                        console.log(Array.isArray(this.vm[val]));
                        var g = JSON.stringify(this.vm[val]);
                        this.node.nodeValue += g;
                    } else {
                        // 如果是一个简单的字符串的形式就直接赋值就可以了
                        this.node.nodeValue += this.vm[val];
                    }
                })
            } else {
                // 如果是{{}}一个的形式的话。。。。
                // 1.先判断这个如果是字符串的话
                if (typeof this.vm[this.name] === "string") {
                    this.node.nodeValue = this.vm[this.name];
                } else {
                    // 2.如果是一个数组的话，就先要进行一层处理后显示到页面上。
                    var g = JSON.stringify(this.vm[this.name]);
                    this.node.nodeValue = g;
                }
            }
        }
    };
}



// 进行对EL模板的编译，节点判断后加入对应的订阅者
function Complier(el, vm) {
    this.vm = vm;
    // 当前的this是vue实例
    console.log(this.vm);
    var ell = document.querySelector(el);
    var create = document.createDocumentFragment();
    let child;
    // 遍历该节点的方法
    while (child = ell.firstChild) {
        create.appendChild(child);
    }

    //有可能遍历一次节点的时候，节点的节点还有节点这时候你就
    // 使用递归的方法 重新遍历执行一次，replace的参数是该节点的childNodes
    function replace(create) {
        Array.from(create.childNodes).forEach(node => {
            // 当节点是标签的时候，你就应该知道是input元素
            if (node.nodeType === 1) {
                Array.from(node.attributes).forEach((val, index) => {
                    let { name, value } = val;
                    if (name === "v-model") {
                        node.addEventListener("input", function () {
                            vm[value] = node.value
                        })
                        new Watcher(node, value, vm)
                    }
                })
            }

            // 当前的节点{{}}{{}} 文本节点
            let text = node.nodeValue;
            let reg = /\{\{([^}]*)\}\}/g;
            if (node.nodeType === 3 && reg.test(text)) {
                var reg1 = /(\{\{.*\}\}){2,}/;
                // 是大于{{s}}{{s}}{{s}}形式
                if (reg1.test(text)) {
                    // 把text传进去，在订阅者中进行在处理。。。。
                    new Watcher(node, text, vm);
                } else {
                    // 是只有{{s}}的形式，直接把value进行订阅者
                    text.replace(reg, function (a) {
                        var reg = /\{\{.*\}\}/;
                        var value = a.match(reg)[0];
                        value = value.match(/\w+/)[0];
                        new Watcher(node, value, vm);
                    })
                }


            }
            if (node.childNodes.length >= 1) {
                // 该节点还有节点这时候就要递归了
                replace(node);
            }

        });
    }
    replace(create);
    ell.appendChild(create);
    return create;
}


const arrayProto = Array.prototype;// 获取Array的原型
var methods = Object.create(arrayProto);

// 进行拦截数组的新原型上的属性
// 好对dep进行notify（）:
function def(obj, key, newx) {
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        writable: true,
        value: function (...args) {
            // 获取原生的方法
            let original = methods[key];
            // 将开发者的参数传给原生的方法，保证数组按照开发者的想法被改变
            const result = original.apply(this, args);
            // do something 比如通知Vue视图进行更新
            console.log('我的数据被改变了，视图该更新啦');
            this.__ob__.dep.notify();
            return result;
        },

    });
}
// 数组的新原型对象
var obj = { push: {} };
def(obj, 'push');

// 这是由数据劫持后，给每个data中的属性设置对应的dep 发布者
function defineArray(data, key, val, vm) {
    // 利用闭包设置一个发布者
    var dep = new Dep();
    console.log(val);
    val.__proto__ = obj;

    // /   给每个属性值是数组的加一个属性，该属性是
    // 可以进行发布者中的订阅者进行更新，之后在数组的原型拦截
    // 后进行的节点更新
    // 为数据定义了一个 __ob__ 属性，这个属性的值就是当前 Observer 实例对象
    val.__ob__ = vm;
    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: true,
        get() {
            // 依赖收集
            if (Dep.target) {
                dep.addSub(Dep.target);
                // 如果该val.__ob__中存在，就在
                if (val.__ob__.dep) {
                    // 第二次收集，第一次收集已经存在了内存
                    // ，但因为数组变化，对val.__ob__进行notify（）
                    // 此时必须保证该发布者的订阅者中有值，才可以进行更新
                    val.__ob__.dep.addSub(Dep.target);
                }
            }
            return val;
        },
        set(newValue) {
            if (newValue === val) {
                return;
            }
            val = newValue;
            dep.notify();
        }

    })
}


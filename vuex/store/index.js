import Vue from "vue";
import vuex from "../Vuex"

Vue.use(vuex);
let store = new vuex.Store({
    state: {
        name: { f: 24 }
    },
    getters: {
        get(state) {
            return state.name.f+ "wuwei"
        }
    },
    mutations: {
        num(state, num) {
            console.log('big');

            state.name.f += num;
        }
    },
    actions: {
        action({ commit }, payload) {
            setTimeout(() => {
                commit("num", payload)
            }, 3000)
        }
    },
    modules: {
        a: {
            namspaced:true,
            state: {
                name: "Wuwei"
            },
            mutations: {
                num() {
                    console.log("you win!");
                }
            },
            getters: {
                get() {
                    return 23;
                }
            }
        },
        b: {
            namspaced:true,
            state: {
                name: 343
            },
            mutations: {
                num(s,num) {
                    s.name+=num;
                    console.log("numB");
                }
            },
            modules: {
                c: {
                    state: {
                        asd: 21
                    }
                },
                d: {
                    state: {
                        sd: 234
                    }
                }
            }
        }
    }
})
let name = "newModule";
let obj =
{
    state: {
        name: "regester"
    },
    mutations: {
        num() {
            console.log("mutate Oher")
        }
    },
    modules: {
        aa: {
            state: {
                as: 24
            },
            mutations:{
                num(){
                    console.log("newMuduleNum");
                    
                }
            }
        }
    },
    actions: {
        action() {
            console.log("sction Other");
        }
    }

}
store.regesterModule(name, obj)
export default store;
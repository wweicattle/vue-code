export default {
    state: {
        name: "moduleB"
    },
    getters: {
        achive(state) {
            return state.name;
        },
        
    },
    mutations: {
        btn1(state) {
            state.count += 5
        },
        modify(context) {
            console.log("moduleB");
        },
    },
    actions: {
        modify(context) {
            console.log("moduleB");
        },
    },
}
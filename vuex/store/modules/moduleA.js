export default {
    state: {
        count: 22,
        name: "muduleA"
    },
    getters: {
        // achive(state) {
        //     return state.name;
        // }
       
        
    },
    mutations: {
        btn1(state, f) {
            state.count += 10
        },
        modify(context) {
            console.log("modueA");
            
 
         },
    },
    actions: {
        modify(context) {
           console.log("modueA");
           

        },
    },
}
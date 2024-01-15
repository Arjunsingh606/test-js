const {createSlice} = require("@reduxjs/toolkit")

const cartSlice =  createSlice({
    name:'cart',
    initialState : [],
    reducers:{
        add(state, action) {
            state.push(action.payload);
        },
        remove(state, action) {
            return state.filter((item) => item.id !== action.payload);
        },
        increment: (state) => {
            state.count += 1
        },
        decreament(state){
            state.count -= 1 
        },
        
    },
});

export const {add, remove,increment,decreament} = cartSlice.actions;

export default cartSlice.reducer;

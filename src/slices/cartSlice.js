import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },

  reducers: {
    addItem: (state, action) => {
    //   state.items.push(action.payload);
    const existingItem = state.items.find(item => item.id === action.payload.id);
    if(existingItem) {
        existingItem.quantity += 1;
    }else {
        state.items.push({...action.payload, quantity : 1});
    }
    },
    removeItem: (state, action) => {
      //   state.items = state.items.filter((item) => item.id !== action.payload.id);

      //to handle duplicates, if cart allows multiple identical items , we need to remove by unique identifier or index , not just by id, otherwise it will remove all matching items
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      if (index > -1) {
        if(state.items[index].quantity > 1){
            state.items[index].quantity -= 1;
        }
        else {
             state.items.splice(index, 1); //removes only one item
        }

      }
    },
    clearCart: (state) => {
      state.items = [];
      //return {items : []}
    },
  },
});

export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

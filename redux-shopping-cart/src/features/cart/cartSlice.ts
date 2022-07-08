import { createSlice, createSelector, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch, Rootstate } from "../../app/store";
import { checkout, CartItems } from "../../app/api";

type CheckoutState = "LOADING" | "READY" | "ERROR";

export interface CartState {
    items: {
        [productID: string]: number
    }
    checkoutState: CheckoutState
    errorMessage: string
}

const initialState: CartState = {
    items: { },
    checkoutState: "READY",
    errorMessage: ""
};

export const checkoutCart = createAsyncThunk("cart/checkout", async (_, thunkAPI) => {
    const state = thunkAPI.getState() as Rootstate;
    const items = state.cart.items;
    const response = await checkout(items);
    return response;
});

const cartSlice = createSlice({
    name: "cart",
    initialState: initialState,
    reducers: {
        addToCart(state, action: PayloadAction<string>) {
            const id = action.payload;
            if(state.items[id])
                state.items[id]++;
            else
                state.items[id] = 1;
        },
        removeFromCard(state, action: PayloadAction<string>) {
            delete state.items[action.payload];
        },
        updateQuantity(state, action: PayloadAction<{ id: string, quantity: number }>) {
            const { id, quantity } = action.payload;
            state.items[id] = quantity;
        },
        // this is wrong
        // checkoutCart2: async (state, action: PayloadAction<{ [productID: string]: number; }>) => {
        //     const items = action.payload;
        //     const response = await checkout(items);
        //     state.items = {};
        // }
    },
    extraReducers: (builder) => {
        // builder.addCase("cart/checkout/pending", (state, action) => {
        builder.addCase(checkoutCart.pending, (state, action) => {
            state.checkoutState = "LOADING";
        });
        // builder.addCase("cart/checkout/fullfilled", (state, action) => {
        builder.addCase(checkoutCart.fulfilled, (state, action: PayloadAction<{ success: boolean }>) => {
            const { success } = action.payload;
            if(success) {
                state.checkoutState = "READY";
                state.items = {};
            }
            else {
                state.checkoutState = "ERROR";
            }
        });
        builder.addCase(checkoutCart.rejected, (state, action) => {
            state.checkoutState = "ERROR";
            state.errorMessage = action.error.message || "";
        });
    }
});

// export function checkout(){
//     return function checkoutThunk(dispatch: AppDispatch){
//         dispatch({ type: "cart/checkout/pending" });
//         setTimeout(() => {
//             dispatch({ type: "cart/checkout/fullfilled" });            
//         }, 500);
//     }
// }

export const { addToCart, removeFromCard, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;

export function getNumItems(state: Rootstate) {
    let numItems = 0;
    for (const id in state.cart.items) {        
        numItems += state.cart.items[id];
    }
    return numItems;
}

export const getMemoizedNumItems = createSelector(
    (state: Rootstate) => state.cart.items,
    (items) => {
        let numItems = 0;
        for(let id in items){
            numItems += items[id];
        }
        return numItems;
    }
);

export const getTotalPrice = createSelector(
    (state: Rootstate) => state.cart.items,
    (state: Rootstate) => state.products.products,
    (items, products) => {
        let total = 0;
        for(let id in items)
            total += products[id].price * items[id];
        return total.toFixed(2);
    }
);
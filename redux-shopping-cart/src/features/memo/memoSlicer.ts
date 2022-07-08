// import React from "react";
// import { useSelector, useDispatch } from "react-redux";
import { createSlice, createEntityAdapter, createSelector } from "@reduxjs/toolkit";
// import { batch } from "react-redux";
import { Rootstate } from "../../app/store";

const memoAdapter = createEntityAdapter();

const initialState = memoAdapter.getInitialState();


const memoSlider = createSlice({
    name: "Memo",
    initialState,
    reducers: {
        addMemo(state, action) {
            memoAdapter.addOne(state, action.payload);
        },
        removeMemo(state, action){
            memoAdapter.removeOne(state, action.payload);
        }
    }
});

export const getTotalProducts = createSelector((state: Rootstate) => state.products.products,
    products => Object.values(products).length
);

export const { addMemo, removeMemo } = memoSlider.actions;

export const {
    selectAll: selectAllMemos,
    selectById: selectMemoById
} = memoAdapter.getSelectors((state: any) => state.memos);


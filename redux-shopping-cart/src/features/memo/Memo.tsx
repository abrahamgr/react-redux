import React, { useEffect, useContext } from "react";
// import { 
//     useDispatch,
//     // useSelector,
//     batch
// } from "react-redux";
// import { createSelector } from "@reduxjs/toolkit";
import { useAppDispatch } from "../../app/hooks";
import { useAppSelector } from "../../app/hooks";
import { getProducts } from "../../app/api";
import { receivedProducts } from "../products/productsSlice";
// import { Rootstate } from "../../app/store";
import { getTotalProducts } from "./memoSlicer";
import styles from "./Memo.module.scss";

import { Theme } from "../../app/context";

export const Memo = ({  }) => {

    const dispatch = useAppDispatch();

    // const products = useAppSelector(state => state.products.products);

    const totalProducts = useAppSelector(getTotalProducts);

    const customTheme = useContext(Theme);


    useEffect(() => {
        if(totalProducts != 0)
            return;
        getProducts().then((products) => {
            // setProducts(products);
            dispatch(receivedProducts(products));
        });
    }, []);

    const onClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        // batch(() => {

        // });
    };

    return <div className={styles.memo}>
        <h2>My custom theme is:{customTheme}</h2>
        <p className={styles.title}>My title</p>
        <label>Total products {totalProducts ? totalProducts : 0}</label>
        <button onClick={onClick}>Click</button>
    </div>;
};